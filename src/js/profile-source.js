class RandomUserApiClient {
    fetchProfile() {
        return fetch("https://randomuser.me/api?nat=br", { method: "GET" });
    }
}
const ProfileSource = RandomUserApiClient;
