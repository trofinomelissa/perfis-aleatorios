function buscarPerfil() {

    const perfilOrigem = new PerfilOrigem()
    const perfil = new Perfil()
    
    perfilOrigem.importar()
        .then(function (resposta) {
            resposta.json()
                .then(function (dados) {
                    perfil.adicionar(dados)
                })
        });

}

buscarPerfil();

document.getElementById("btnNovoPerfil").addEventListener("click", function() {
    buscarPerfil();
});