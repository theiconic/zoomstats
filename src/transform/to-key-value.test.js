const toKeyValue = require('./to-key-value');

test('to-key-value should turn object properties into key-value pairs', () => {
    expect(toKeyValue('name', 'value')(
        {
            a: 2
        },
        {
            name: 'b',
            value: 'c'
        }
    )).toEqual({
        a: 2,
        b: 'c'
    });
});
