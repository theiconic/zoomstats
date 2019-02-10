const byProperty = require('./by-property');

test('by-property should act as a sorter based on the given property', () => {
    const a = {
            a_lower_b: 1,
            b_lower_a: 10,
            a_equal_b: 5
        };
    const b = {
            a_lower_b: 2,
            b_lower_a: 3,
            a_equal_b: 5
        };
    const expectations = {
            a_lower_b: -1,
            b_lower_a: 7,
            a_equal_b: 0
        };

    expect(byProperty('a_lower_b')(a, b)).toBe(expectations['a_lower_b']);
    expect(byProperty('b_lower_a')(a, b)).toBe(expectations['b_lower_a']);
    expect(byProperty('a_equal_b')(a, b)).toBe(expectations['a_equal_b']);
});
