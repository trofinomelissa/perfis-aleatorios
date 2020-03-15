class PerfilOrigem {
    importar() {
        return fetch("https://randomuser.me/api", { method: "get" })
    }
}