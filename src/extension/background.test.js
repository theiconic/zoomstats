var called = false;

jest.mock('ext-messenger', () => {
    return class Messenger {
        initBackgroundHub() {
            called = true;
        }
    }
});

test('background.js will initialize messenger background hub', () => {
    require('./background.js');
    expect(called).toBe(true);
});
