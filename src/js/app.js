const apiClient = new RandomUserApiClient();
const profileRenderer = new ProfileCardRenderer();

async function loadAndRenderProfile() {
    try {
        const data = await apiClient.fetchProfileJson();
        profileRenderer.render(data);
    } catch (err) {
        console.error('Falha ao obter perfil:', err);
    }
}

loadAndRenderProfile();

document.addEventListener('click', (e) => {
    if (e.target.closest('#btnNewProfile')) loadAndRenderProfile();
});