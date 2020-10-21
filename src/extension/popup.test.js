const fs = require('fs');
const { JSDOM } = require('jsdom');

jest.mock('../analyzer/talktime.js', () => {
    return jest.fn(() => {
        return {
            'Unknown Speaker': {
                total: 3600,
                turns: [3600],
                humanize: 'a few seconds'
            },
            'Joe Test': {
                total: 1200,
                turns: [1200],
                humanized: 'a few seconds'
            }
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

jest.mock('../analyzer/collaboration', () => {
    return jest.fn(() => {
        return {
            'Unknown Speaker': {
                'Joe Test': 400,
                'all': 150
            },
            'Joe Test': {
                'Unknown Speaker': 1200
            }
        };
    });
});

jest.mock('../renderer/html/wordcloud.js', () => {
    return jest.fn(() => {
        return (domNode) => {
            expect(domNode.className).toBe('tabpanel wordcloud');
        };
    });
});

jest.mock('../renderer/html/collaboration-chord.js', () => {
    return jest.fn(() => {
        return (domNode) => {
            expect(domNode.className).toBe('tabpanel collaboration');
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
    const dom = (new JSDOM(fs.readFileSync('./src/extension/popup.html', 'utf-8')));

    window.document.body.innerHTML = dom.window.document.body.innerHTML;

    require('./popup.js');
    window.onload();
    document.querySelector('.tab').dispatchEvent(new window.MouseEvent('click'));
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    jest.runAllTimers();
});
