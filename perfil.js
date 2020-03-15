class Perfil {
    constructor () {
        this.listaPerfis = document.getElementById("perfis")
    }

    adicionar(dados) {
        /*dados.result[0].name.first;
        dados.result[0].name.last;
        dados.result[0].email;
        dados.results[0].location.city;
        dados.results[0].location.state;
        dados.results[0].location.country;
        dados.results[0].picture.large;*/

        //this.listaPerfis.appendChild() ??

        let genero = "outro-genero";

        if (dados.results[0].gender == "female") {
            genero = "feminino"
        } else if (dados.results[0].gender == "male") {
            genero = "masculino"
        };

        this.listaPerfis.innerHTML = `
        <li class="perfil ${genero}">
            <ul>
                <li class="dado-principal"><h2>${dados.results[0].name.first} ${dados.results[0].name.last}</h2></li>
                <li class="imagem"><img class="foto-perfil ${genero}" src="${dados.results[0].picture.large}" alt="Foto do Perfil - ${dados.results[0].name.first} ${dados.results[0].name.last}"></li>
                <li class="dado-texto">${dados.results[0].email}</li>
                <li class="dado-texto">${dados.results[0].location.city}</li>
                <li class="dado-texto">${dados.results[0].location.state}</li>
                <li class="dado-texto">${dados.results[0].location.country}</li>            
            </ul>
        </li>
        `;
    }
}