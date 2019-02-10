const toArray = require('./to-array');

test('to-array should convert object to array', () => {
   expect(toArray({
       'a': 1,
       'b': 'a',
       'c': {}
   })).toEqual([1, 'a', {}])
});

test('to-array without argument should throw', () => {
    expect(() => toArray()).toThrow();
});
