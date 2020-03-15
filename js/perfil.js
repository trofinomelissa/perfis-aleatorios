class Perfil {
    constructor () {
        this.listaPerfis = document.getElementById("perfis")
    }

    adicionar(dados) {
        let perfil = dados.results[0];
        let genero = "outro-genero";

        if (perfil.gender == "female") {
            genero = "feminino"
        } else if (perfil.gender == "male") {
            genero = "masculino"
        };

        this.listaPerfis.innerHTML = `
        <li class="perfil ${genero}">
            <ul>
                <li class="dado-principal"><h2>${perfil.name.first} ${perfil.name.last}</h2></li>
                <li class="imagem"><img class="foto-perfil ${genero}" src="${perfil.picture.large}" alt="Foto do Perfil - ${perfil.name.first} ${perfil.name.last}"></li>
                <li class="dado-texto">${perfil.email}</li>
                <li class="dado-texto">${perfil.location.city}</li>
                <li class="dado-texto">${perfil.location.state}</li>
                <li class="dado-texto">${perfil.location.country}</li>            
            </ul>
        </li>
        `;
    }
}