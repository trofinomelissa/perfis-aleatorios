// Utilitário simples para evitar inserção de HTML indevido
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

class Profile {
    constructor() {
        this.profileList = document.getElementById('profiles');
    }

    add(data) {
        // Validação básica dos dados
        if (!data || !Array.isArray(data.results) || data.results.length === 0) {
            console.error('Invalid data: results array is missing or empty.');
            return;
        }

        const profile = data.results[0];

        // Determina classe de gênero
        let genderClass = 'other-gender';
        if (profile.gender === 'female') genderClass = 'female';
        else if (profile.gender === 'male') genderClass = 'male';

        // Campos tratados
        const fullName = `${escapeHTML(profile.name.first)} ${escapeHTML(profile.name.last)}`;
        const email = escapeHTML(profile.email);
        const cityState = `${escapeHTML(profile.location.city)}, ${escapeHTML(profile.location.state)}`;
        const country = escapeHTML(profile.location.country);
        const pictureLarge = escapeHTML(profile.picture.large);

        // Monta HTML do card
        this.profileList.innerHTML = `
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

        // Reinicia animação (aplicamos classe no próprio content)
        const content = this.profileList.querySelector('.profile-card-content');
        if (content) {
            content.classList.add('updating');
            void content.offsetWidth; // força reflow
            content.classList.remove('updating');
        }

        const card = this.profileList.querySelector('.profile-card');
        if (!card) return;

        const copyValue = (text) => {
            if (!text) return Promise.resolve();
            if (navigator.clipboard?.writeText) {
                return navigator.clipboard.writeText(text);
            }
            // Fallback para browsers antigos
            return new Promise((resolve) => {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.top = '-9999px';
                document.body.appendChild(ta);
                ta.focus();
                ta.select();
                try { document.execCommand('copy'); } catch (_) { /* ignore */ }
                document.body.removeChild(ta);
                resolve();
            });
        };

        // Delegação de cópia dentro do card
    card.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-copy]');
            if (!btn) return;
            const type = btn.getAttribute('data-copy');
            const el = card.querySelector(`[data-field="${type}"]`);
            const value = el ? el.textContent.trim() : '';
            if (!value) return;
            copyValue(value).then(() => {
                if (btn.classList.contains('copy-icon-btn')) {
                    btn.classList.add('copied');
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = 'bi bi-clipboard-check';
                    setTimeout(() => {
                        btn.classList.remove('copied');
                        if (icon) icon.className = 'bi bi-clipboard';
                    }, 1300);
                }
            });
        }); // listener permanente dentro do card, não empilha pois o card é recriado a cada novo perfil
    }
}
