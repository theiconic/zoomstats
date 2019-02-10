const roundTo = require('./round-to');

test('round-to rounds to given digits', () => {
    expect(roundTo(2)(2.3847)).toBe(2.38);
    expect(roundTo(2)(3.928)).toBe(3.93);
    expect(roundTo(3)(2.3847)).toBe(2.385);
    expect(roundTo(1)(2.3847)).toBe(2.4);
    expect(roundTo()(2.3847)).toBe(2);
    expect(roundTo(10)(2.3847)).toBe(2.3847);
});
