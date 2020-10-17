const extractTalktimes = require('./extract-talktimes');

test('extract-talktimes by speaker should add talktimes grouped by speaker', () => {
    expect(extractTalktimes('speaker')({}, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(
        {
            'Unknown Speaker': 510
        }
    );

    expect(extractTalktimes('speaker')({
        'Unknown Speaker': 620
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(
        {
            'Unknown Speaker': 1130
        }
    );

    expect(extractTalktimes('speaker')({
        'Joe Test': 620
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(
        {
            'Joe Test': 620,
            'Unknown Speaker': 510
        }
    );
});

test('extract-talktimes by text should add talktimes grouped by text', () => {
    expect(extractTalktimes('text')({}, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(
        {
            'Hey,': 510
        }
    );

    expect(extractTalktimes('text')({
        'Hey,': 620
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(
        {
            'Hey,': 1130
        }
    );

    expect(extractTalktimes('text')({
        'Hey,': 620
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hello.'
    })).toEqual(
        {
            'Hey,': 620,
            'Hello.': 510
        }
    );
});

test('extract-talktimes without grouping parameter should add talktime', () => {
    expect(extractTalktimes()(0, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(510);

    expect(extractTalktimes()(620, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual(1130);

    expect(extractTalktimes()(undefined, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hello.'
    })).toEqual(510);
});

test('extract-talktimes should gracefully handle undefined timestamps', () => {
    expect(extractTalktimes()(undefined, {
        speaker: 'Unknown Speaker',
        text: 'Hello.'
    })).toEqual(0);
});
