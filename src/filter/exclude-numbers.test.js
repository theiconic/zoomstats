const excludeNumbers = require('./exclude-numbers');

test('eclude-numbers filer should return false for numbers and true for anything else', () => {
    expect(excludeNumbers('a')).toBe(true);
    expect(excludeNumbers('1')).toBe(false);
    expect(excludeNumbers(1.1)).toBe(false);
    expect(excludeNumbers('2.6')).toBe(false);
    expect(excludeNumbers(20)).toBe(false);
    expect(excludeNumbers('a10')).toBe(true);
});
