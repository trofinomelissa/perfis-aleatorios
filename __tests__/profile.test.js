const { sanitize, profileCardHtml } = require('../src/js/profile.js');

describe('sanitize', () => {
  test('escapes basic HTML entities', () => {
    // Arrange
    const input = '<script>';
    
    // Act
    const result = sanitize(input);
    
    // Assert
    expect(result).toBe('&lt;script&gt;');
  });

  test('returns empty string for null', () => {
    // Arrange
    const input = null;
    
    // Act
    const result = sanitize(input);
    
    // Assert
    expect(result).toBe('');
  });

  test('returns empty string for undefined', () => {
    // Arrange
    let input; // undefined
    
    // Act
    const result = sanitize(input);
    
    // Assert
    expect(result).toBe('');
  });

  test('handles double quotes', () => {
    // Arrange
    const input = '"apostrophe"';
    
    // Act
    const result = sanitize(input);
    
    // Assert
    expect(result).toBe('&quot;apostrophe&quot;');
  });

  test('handles single quotes', () => {
    // Arrange
    const input = "a'b";
    
    // Act
    const result = sanitize(input);
    
    // Assert
    expect(result).toBe('a&#39;b');
  });
});

describe('profileCardHtml', () => {
  const baseVm = {
    genderClass: 'female',
    pictureLarge: 'http://example.com/a.jpg',
    fullName: 'Ana Teste',
    email: 'ana@example.com',
    cityState: 'Cidade, Estado',
    country: 'Brasil'
  };

  test('renders required fields', () => {
    // Arrange
    const vm = { ...baseVm };
    
    // Act
    const html = profileCardHtml(vm);
    
    // Assert
    expect(html).toContain(vm.fullName);
    expect(html).toContain(vm.email);
    expect(html).toContain(vm.cityState);
    expect(html).toContain(vm.country);
    expect(html).toContain(vm.pictureLarge);
  });

  test('applies gender class', () => {
    // Arrange
    const vm = { ...baseVm, genderClass: 'female' };
    
    // Act
    const html = profileCardHtml(vm);
    
    // Assert
    expect(html).toContain('profile-card card female');
  });
});
