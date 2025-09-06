function sanitize(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function profileCardHtml({ genderClass, pictureLarge, fullName, email, cityState, country }) {
    return `
        <div class="col-12">
            <div class="profile-card card ${genderClass}">
                <button id="btnNewProfile" class="new-profile-btn" aria-label="Gerar novo perfil" title="Novo perfil">
                    <i class="bi bi-shuffle"></i>
                    <span class="sr-only">Novo Perfil</span>
                </button>
                <div class="profile-card-content">
                    <div class="photo-col">
                        <img class="profile-photo" src="${pictureLarge}" alt="Foto - ${fullName}" loading="lazy">
                    </div>
                    <div class="text-col">
                        <div class="profile-fields-group mt-2">
                            <button class="copy-icon-btn" data-copy="name" aria-label="Copiar nome"><i class="bi bi-clipboard"></i></button>
                            <div class="profile-name profile-value" data-field="name">${fullName}</div>
                            <button class="copy-icon-btn" data-copy="email" aria-label="Copiar email"><i class="bi bi-clipboard"></i></button>
                            <div class="profile-email profile-value" data-field="email">${email}</div>
                            <button class="copy-icon-btn" data-copy="cityState" aria-label="Copiar cidade e estado"><i class="bi bi-clipboard"></i></button>
                            <div class="profile-location profile-value" data-field="cityState">${cityState}</div>
                            <button class="copy-icon-btn" data-copy="country" aria-label="Copiar país"><i class="bi bi-clipboard"></i></button>
                            <div class="profile-location profile-value" data-field="country">${country}</div>
                        </div>
                        <div class="copy-buttons mt-2"></div>
                    </div>
                </div>
            </div>
        </div>`;
}

class ProfileCardRenderer {
    constructor() {
        this.container = document.getElementById('profiles');
    }

    render(data) {
        if (!data || !Array.isArray(data.results) || data.results.length === 0) {
            console.error('Invalid data: results array is missing or empty.');
            return;
        }

        const user = data.results[0];
        const viewModel = {
            genderClass: user.gender === 'female' ? 'female' : user.gender === 'male' ? 'male' : 'other-gender',
            fullName: `${sanitize(user.name.first)} ${sanitize(user.name.last)}`,
            email: sanitize(user.email),
            cityState: `${sanitize(user.location.city)}, ${sanitize(user.location.state)}`,
            country: sanitize(user.location.country),
            pictureLarge: sanitize(user.picture.large)
        };

        this.container.innerHTML = profileCardHtml(viewModel);

        this._restartAnimation();
        this._wireCopyHandler();
    }

    _restartAnimation() {
        const content = this.container.querySelector('.profile-card-content');
        if (!content) return;
        content.classList.add('updating');
        void content.offsetWidth;
        content.classList.remove('updating');
    }

    _wireCopyHandler() {
        const card = this.container.querySelector('.profile-card');
        if (!card) return;
        const copyToClipboard = (text) => {
            if (!text) return Promise.resolve();
            if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
            return new Promise((resolve) => {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.top = '-9999px';
                document.body.appendChild(ta);
                ta.focus();
                ta.select();
                try { document.execCommand('copy'); } catch (_) {}
                document.body.removeChild(ta);
                resolve();
            });
        };

        card.addEventListener('click', async (e) => {
            const btn = e.target.closest('button[data-copy]');
            if (!btn) return;
            const field = btn.getAttribute('data-copy');
            const el = card.querySelector(`[data-field="${field}"]`);
            const value = el ? el.textContent.trim() : '';
            if (!value) return;
            await copyToClipboard(value);
            if (!btn.classList.contains('copy-icon-btn')) return;
            btn.classList.add('copied');
            const icon = btn.querySelector('i');
            if (icon) icon.className = 'bi bi-clipboard-check';
            setTimeout(() => {
                btn.classList.remove('copied');
                if (icon) icon.className = 'bi bi-clipboard';
            }, 1300);
        });
    }
}

const Profile = ProfileCardRenderer;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sanitize, profileCardHtml, ProfileCardRenderer, Profile };
}
