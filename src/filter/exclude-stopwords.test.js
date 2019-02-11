const excludeStopwords = require('./exclude-stopwords');

test('eclude-stopwords filer should return false for stopwords and true for anything else', () => {
    expect(excludeStopwords('a')).toBe(false);
    expect(excludeStopwords('1')).toBe(true);
    expect(excludeStopwords(1.1)).toBe(true);
    expect(excludeStopwords('think')).toBe(false);
    expect(excludeStopwords('i')).toBe(false);
    expect(excludeStopwords('you')).toBe(false);
    expect(excludeStopwords('our')).toBe(false);
});
