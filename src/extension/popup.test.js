jest.mock('../analyzer/talktime.js', () => {
    return jest.fn(() => {
        return {
            'Unknown Speaker': 3600,
            'Joe Test': 1200
        };
    });
});

jest.mock('../analyzer/effectiveness.js', () => {
    return jest.fn(() => {
        return 85.3;
    });
});

jest.mock('../analyzer/words', () => {
    return jest.fn(() => {
        return ['abc', 'def', 'ghi'];
    });
});

jest.mock('../renderer/html/wordcloud.js', () => {
    return jest.fn(() => {
        return (domNode) => {
            expect(domNode.className).toBe('wordcloud');
        };
    });
});

jest.mock('ext-messenger', () => {
    return class Messenger {
        initConnection(name, callback) {
            callback({}, '', '', jest.fn());

            return {
                sendMessage: (connectionName, data) => {
                    expect(connectionName).toBe('content_script:main');
                    expect(data).toEqual({
                        cmd: 'getTranscript'
                    });

                    return new Promise((resolve, reject) => {
                        resolve({
                            topic: 'test'
                        });
                    });
                }
            }
        }
    }
});

jest.useFakeTimers();

test('popup.js renders popup waits 500ms on window.load event', () => {
    document.body.innerHTML = '<div>' +
        '<h3 id="title"></h3>' +
        '<div class="effectivenessValue"></div>' +
        '<div class="stats"></div>' +
        '<div class="wordcloud"' +
    '</div>';

    require('./popup.js');
    window.onload();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    jest.runAllTimers();
});
