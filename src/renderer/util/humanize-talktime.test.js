const humanizeTalktime = require('./humanize-talktime');

test('humanize-talktime should return a humanised duration string from input in ms', () => {
    expect(humanizeTalktime({
        total: 500
    })).toStrictEqual({
        total: 500,
        humanized: 'a few seconds'
    });

    expect(humanizeTalktime({
        total: 1000
    })).toStrictEqual({
        total: 1000,
        humanized: 'a few seconds'
    });

    expect(humanizeTalktime({
        total: 60000
    })).toStrictEqual({
        total: 60000,
        humanized: 'a minute'
    });

    expect(humanizeTalktime({
        total: 160000
    })).toStrictEqual({
        total: 160000,
        humanized: '3 minutes'
    });

    expect(humanizeTalktime({
        total: 660000
    })).toStrictEqual({
        total: 660000,
        humanized: '11 minutes'
    });

    expect(humanizeTalktime({
        total: 6600000
    })).toStrictEqual({
        total: 6600000,
        humanized: '2 hours'
    });
});
