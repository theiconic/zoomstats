const objMap = require('./object-map');

test('applying object-map runs callback for each object property value', () => {
    const mockCallback = jest.fn();
    objMap(mockCallback)({
        'a': 1,
        'b': 5,
        'c': 3,
    });

    expect(mockCallback.mock.calls.length).toBe(3);
    expect(mockCallback.mock.calls[0][0]).toBe(1);
    expect(mockCallback.mock.calls[1][0]).toBe(5);
    expect(mockCallback.mock.calls[2][0]).toBe(3);
});

test('object-map without object returns function', () => {
    expect(typeof objMap(() => '')).toBe('function');
});

test('applying object-map applies callback to each object property', () => {
    expect(objMap((a) => 2 * a + 3)({
        'a': 1,
        'b': 5,
        'c': 3,
    })).toEqual({
        'a': 5,
        'b': 13,
        'c': 9,
    });
});
