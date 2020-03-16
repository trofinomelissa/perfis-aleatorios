class PerfilOrigem {
    importar() {
        return fetch("https://randomuser.me/api?nat=br", { method: "get" })
    }
}