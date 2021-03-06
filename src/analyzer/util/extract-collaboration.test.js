const extractCollaboration = require('./extract-collaboration');

test('extract-collaboration should add time by speaker and audience', () => {
    let fn = extractCollaboration();
    expect(fn({}, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual({
        'Unknown Speaker': {
            'all': 510
        }
    });

    fn = extractCollaboration();
    expect(fn({
        'Unknown Speaker': {
            'all': 1400
        },
        'Joe Test': {
            'Unknown Speaker': 350
        }
    }, {
        speaker: 'Unknown Speaker',
        start: 141.24,
        end: 141.75,
        text: 'Hey,'
    })).toEqual({
        'Unknown Speaker': {
            'all': 1910
        },
        'Joe Test': {
            'Unknown Speaker': 350
        }
    });

    expect(fn({
        'Unknown Speaker': {
            'all': 1910
        },
        'Joe Test': {
            'Unknown Speaker': 350
        }
    }, {
        speaker: 'Joe Test',
        start: 141.65,
        end: 141.75,
        text: 'Hey,'
    })).toEqual({
        'Unknown Speaker': {
            'all': 1910
        },
        'Joe Test': {
            'Unknown Speaker': 450,
        }
    });

    expect(fn({
        'Unknown Speaker': {
            'all': 1910
        },
        'Joe Test': {
            'Unknown Speaker': 450,
            'all': 100
        }
    }, {
        speaker: 'Unknown Speaker',
        start: 141.65,
        end: 141.85,
        text: 'Hey,'
    })).toEqual({
        'Unknown Speaker': {
            'all': 1910,
            'Joe Test': 200
        },
        'Joe Test': {
            'Unknown Speaker': 450,
            'all': 100
        }
    });
});
