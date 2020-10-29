const extractTalktimes = require('./extract-talktimes');

test('extract-talktimes by speaker should add talktimes grouped by speaker', () => {
    const bySpeaker = extractTalktimes('speaker');
    expect(bySpeaker({}, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(
        {
            'Unknown Speaker': {
                total: 510,
                turns: [510]
            }
        }
    );

    expect(bySpeaker({
        'Unknown Speaker': {
            total: 620,
            turns: [620]
        }
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(
        {
            'Unknown Speaker': {
                total: 1130,
                turns: [1130]
            }
        }
    );

    expect(bySpeaker({
        'Joe Test': {
            total: 620,
            turns: [620]
        }
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(
        {
            'Joe Test': {
                total: 620,
                turns: [620]
            },
            'Unknown Speaker': {
                total: 510,
                turns: [510]
            }
        }
    );
});

test('extract-talktimes by text should add talktimes grouped by text', () => {
    const byText =  extractTalktimes('text');
    expect(byText({}, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(
        {
            'Hey,': {
                total: 510,
                turns: [510]
            }
        }
    );

    expect(byText({
        'Hey,': {
            total: 620,
            turns: [620]
        }
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(
        {
            'Hey,': {
                total: 1130,
                turns: [1130]
            }
        }
    );

    expect(byText({
        'Hey,': {
            total: 620,
            turns: [620]
        }
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hello.'
    })).toEqual(
        {
            'Hey,': {
                total: 620,
                turns: [620]
            },
            'Hello.': {
                total: 510,
                turns: [510]
            }
        }
    );
});

test('extract-talktimes without grouping parameter should add talktime', () => {
    const ungrouped = extractTalktimes();
    expect(ungrouped({}, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toStrictEqual({
        total: 510,
        turns: [510],
    });

    expect(ungrouped({
        total: 620,
        turns: [620]
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toStrictEqual({
        total: 1130,
        turns: [1130]
    });

    expect(ungrouped({
        total: 0,
        turns: []
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hello.'
    })).toStrictEqual({
        total: 510,
        turns: [510]
    });
});

test('extract-talktimes should gracefully handle undefined timestamps', () => {
    expect(extractTalktimes()({}, {
        speaker: 'Unknown Speaker',
        text: 'Hello.'
    })).toEqual({
        total: 0,
        turns: []
    });
});
