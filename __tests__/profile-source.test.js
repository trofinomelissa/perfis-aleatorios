const { RandomUserApiClient } = require('../src/js/profile-source.js');

describe('RandomUserApiClient', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('fetchProfile calls correct URL', async () => {
    // Arrange
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({}) });
    const api = new RandomUserApiClient();
    
    // Act
    await api.fetchProfile();
    
    // Assert
    expect(global.fetch).toHaveBeenCalledWith('https://randomuser.me/api?nat=br', { method: 'GET' });
  });

  test('fetchProfileJson returns parsed json', async () => {
    // Arrange
    const data = { results: [] };
    global.fetch.mockResolvedValue({ ok: true, json: async () => data });
    const api = new RandomUserApiClient();
    
    // Act
    const res = await api.fetchProfileJson();
    
    // Assert
    expect(res).toBe(data);
  });

  test('fetchProfileJson throws on non-ok response', async () => {
    // Arrange
    global.fetch.mockResolvedValue({ ok: false, status: 500 });
    const api = new RandomUserApiClient();
    
    // Act / Assert
    await expect(api.fetchProfileJson()).rejects.toThrow('HTTP 500');
  });
});
