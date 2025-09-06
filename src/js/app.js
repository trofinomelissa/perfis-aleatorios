function fetchProfile() {
    const profileSource = new ProfileSource();
    const profile = new Profile();
    profileSource.fetch()
        .then(res => res.json())
        .then(data => profile.add(data))
        .catch(error => {
            console.error('Erro ao buscar ou processar o perfil:', error);
        });
}

// Primeira carga
fetchProfile();

// Delegação para botão dinâmico dentro do card
document.addEventListener('click', (e) => {
    const btn = e.target.closest('#btnNewProfile');
    if (btn) {
        fetchProfile();
    }
});