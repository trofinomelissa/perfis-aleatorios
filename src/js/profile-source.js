class RandomUserApiClient {
    async fetchProfile() {
        return fetch("https://randomuser.me/api?nat=br", { method: "GET" });
    }
    async fetchProfileJson() {
        const res = await this.fetchProfile();
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }
}
const ProfileSource = RandomUserApiClient;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RandomUserApiClient, ProfileSource };
}
