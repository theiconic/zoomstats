jest.mock('../parser/html.js', () => {
    return () => {
        return {
            title: 'test'
        };
    }
});

var connectionName = '';
var sentData = undefined;
var sentEmpty = undefined;

jest.mock('ext-messenger', () => {
    return class Messenger {
        initConnection(name, callback) {
            const sendResponseWithData = jest.fn((data) => {
                sentData = data;
            });
            const sendResponseEmpty = jest.fn((data) => {
                sentEmpty = data;
            });

            connectionName = name;
            callback({
                cmd: 'getTranscript'
            }, '', '', sendResponseWithData);
            callback({
                cmd: 'somethingElse'
            }, '', '', sendResponseEmpty);
        }
    }
});

test('zoomstats.js will initialize messenger connection', () => {
    require('./zoomstats.js');
    expect(connectionName).toBe('main');
    expect(sentData).toEqual({
        title: 'test'
    });
    expect(sentEmpty).toEqual({});
});
