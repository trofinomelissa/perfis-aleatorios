class ProfileSource {
    fetch() {
        return fetch("https://randomuser.me/api?nat=br", { method: "get" })
    }
}
