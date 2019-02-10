const lowercase = require('./lowercase');

test('lowercase should return lowercased word', () => {
    expect(lowercase('test')).toBe('test');
    expect(lowercase('CamelCased')).toBe('camelcased');
    expect(lowercase('123ABC-/')).toBe('123abc-/');
});

test('lowercase without argument should throw', () => {
    expect(() => lowercase()).toThrow();
});
