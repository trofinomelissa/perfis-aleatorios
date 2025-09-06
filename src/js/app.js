function loadAndRenderProfile() {
    const api = new RandomUserApiClient();
    const renderer = new ProfileCardRenderer();
    api.fetchProfile()
        .then(r => r.json())
        .then(data => renderer.render(data))
        .catch(err => console.error('Falha ao obter perfil:', err));
}

loadAndRenderProfile();

document.addEventListener('click', (e) => {
    const newProfileBtn = e.target.closest('#btnNewProfile');
    if (newProfileBtn) loadAndRenderProfile();
});