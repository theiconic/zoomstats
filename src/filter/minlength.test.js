const minlength = require('./minlength');

test('minlength filter should return false for string < given minlength and true for anything else', () => {
    expect(minlength(3)('abc')).toBe(true);
    expect(minlength(3)('ab')).toBe(false);
    expect(minlength(3)('a')).toBe(false);
    expect(minlength(3)('')).toBe(false);
    expect(minlength(3)()).toBe(false);
    expect(minlength(2)('ab')).toBe(true);
    expect(minlength(1)('a')).toBe(true);
    expect(minlength(3)('abcde')).toBe(true);
    expect(minlength(3)('1.1')).toBe(true);
});
