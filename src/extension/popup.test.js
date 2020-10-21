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
    document.body.innerHTML = '<div>' +
        '<h3 id="title"></h3>' +
        '<div class="effectivenessValue"></div>' +
        '<div class="tabs">' +
        '<div class="tab active" data-tab="talktimes">Talk times</div>' +
        '<div class="tab" data-tab="collaboration">Collaboration</div>' +
        '<div class="tab" data-tab="wordcloud">Wordcloud</div>' +
        '</div>' +
        '<div class="tabpanels">' +
        '<div class="tabpanel talktimes active">' +
        '<div class="talktime-chart-legend">circumference = turns, depth = average time/turn</div>' +
        '<div class="talktime-chart"></div>' +
        '<div class="talktime-list"></div>' +
        '</div>' +
        '<div class="tabpanel wordcloud">' +
        '</div>' +
        '<div class="tabpanel collaboration">' +
        '</div>' +
        '</div>' +
        '<div class="talktimes"></div>' +
        '<div class="wordcloud"' +
        '<div class="collaboration"' +
    '</div>';

    require('./popup.js');
    window.onload();
    document.querySelector('.tab').dispatchEvent(new window.MouseEvent('click'));
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    jest.runAllTimers();
});
