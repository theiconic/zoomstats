const d3Chord = require('./d3-chord.js');
const d3 = require('d3');

// From http://mkweb.bcgsc.ca/circos/guide/tables/
const matrix = [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
];

function inDelta(actual, expected, delta) {
    delta = delta || 1e-6;
    return (Array.isArray(expected) ? inDeltaArray
        : typeof expected === 'object' ? inDeltaObject
            : inDeltaNumber)(actual, expected, delta);
}

function inDeltaArray(actual, expected, delta) {
    var n = expected.length, i = -1;
    if (actual.length !== n) return false;
    while (++i < n) if (!inDelta(actual[i], expected[i], delta)) return false;
    return true;
}

function inDeltaObject(actual, expected, delta) {
    for (var i in expected) if (!inDelta(actual[i], expected[i], delta)) return false;
    for (var i in actual) if (!(i in expected)) return false;
    return true;
}

function inDeltaNumber(actual, expected, delta) {
    return actual >= expected - delta && actual <= expected + delta;
}

test('d3.chord() has the epxected defaults', function() {
    const chord = d3Chord();

    expect(chord.padAngle()).toBe(0);
    expect(chord.sortGroups()).toBe(null);
    expect(chord.sortSubgroups()).toBe(null);
    expect(chord.sortChords()).toBe(null);

    const chords = chord(matrix);

    expect(inDelta(chords.groups, [
        {endAngle: 1.8617078065173112, index: 0, startAngle: 0.0000000, value: 29630},
        {endAngle: 3.1327961941597415, index: 1, startAngle: 1.8617078065173112, value: 20230},
        {endAngle: 5.664291554422397, index: 2, startAngle: 3.1327961941597415, value: 40290},
        {endAngle: 6.283185307179586, index: 3, startAngle: 5.664291554422397, value:  9850}
    ])).toBe(true);

    expect(inDelta(chords, [ { source:
            { index: 0,
                subindex: 0,
                startAngle: 1.1092963659825559,
                endAngle: 1.8617078065173112,
                value: 11975 },
        target:
            { index: 0,
                subindex: 0,
                startAngle: 1.1092963659825559,
                endAngle: 1.8617078065173112,
                value: 11975 } },
        { source:
                { index: 0,
                    subindex: 1,
                    startAngle: 0.7404105565980423,
                    endAngle: 1.1092963659825559,
                    value: 5871 },
            target:
                { index: 1,
                    subindex: 0,
                    startAngle: 1.8617078065173112,
                    endAngle: 1.9842927518603848,
                    value: 1951 } },
        { source:
                { index: 0,
                    subindex: 2,
                    startAngle: 0.1802017546099105,
                    endAngle: 0.7404105565980423,
                    value: 8916 },
            target:
                { index: 2,
                    subindex: 0,
                    startAngle: 4.147216462003885,
                    endAngle: 4.65049960510897,
                    value: 8010 } },
        { source:
                { index: 0,
                    subindex: 3,
                    startAngle: 0,
                    endAngle: 0.1802017546099105,
                    value: 2868 },
            target:
                { index: 3,
                    subindex: 0,
                    startAngle: 5.7855570308509625,
                    endAngle: 5.849205698012692,
                    value: 1013 } },
        { source:
                { index: 1,
                    subindex: 1,
                    startAngle: 2.5014617344943364,
                    endAngle: 3.132796194159741,
                    value: 10048 },
            target:
                { index: 1,
                    subindex: 1,
                    startAngle: 2.5014617344943364,
                    endAngle: 3.132796194159741,
                    value: 10048 } },
        { source:
                { index: 2,
                    subindex: 1,
                    startAngle: 3.132796194159741,
                    endAngle: 4.147216462003885,
                    value: 16145 },
            target:
                { index: 1,
                    subindex: 2,
                    startAngle: 2.372028117166437,
                    endAngle: 2.5014617344943364,
                    value: 2060 } },
        { source:
                { index: 1,
                    subindex: 3,
                    startAngle: 1.9842927518603848,
                    endAngle: 2.372028117166437,
                    value: 6171 },
            target:
                { index: 3,
                    subindex: 1,
                    startAngle: 5.723353496309884,
                    endAngle: 5.7855570308509625,
                    value: 990 } },
        { source:
                { index: 2,
                    subindex: 2,
                    startAngle: 5.155981863071568,
                    endAngle: 5.664291554422396,
                    value: 8090 },
            target:
                { index: 2,
                    subindex: 2,
                    startAngle: 5.155981863071568,
                    endAngle: 5.664291554422396,
                    value: 8090 } },
        { source:
                { index: 2,
                    subindex: 3,
                    startAngle: 4.65049960510897,
                    endAngle: 5.155981863071568,
                    value: 8045 },
            target:
                { index: 3,
                    subindex: 2,
                    startAngle: 5.664291554422396,
                    endAngle: 5.723353496309884,
                    value: 940 } },
        { source:
                { index: 3,
                    subindex: 3,
                    startAngle: 5.849205698012692,
                    endAngle: 6.283185307179585,
                    value: 6907 },
            target:
                { index: 3,
                    subindex: 3,
                    startAngle: 5.849205698012692,
                    endAngle: 6.283185307179585,
                    value: 6907 } },
        ])).toBe(true);
});

test('chord.padAngle(angle) sets the pad angle', function() {
    const chord = d3Chord().sortSubgroups(function(a, b) { return b - a; })
        .sortChords(d3.descending)
        .sortGroups(d3.ascending);

    expect(chord.padAngle(0.05)).toBe(chord);
    expect(chord.padAngle()).toBe(0.05);

    const chords = chord(matrix);

    expect(inDelta(chords.groups, [
        { index: 0,
            startAngle: 1.9298221403996196,
            endAngle: 3.732269946916931,
            value: 29630
        },
        {
            index: 1,
            startAngle: 0.6491937527571893,
            endAngle: 1.8798221403996196,
            value: 20230
        },
        {
            index: 2,
            startAngle: 3.782269946916931,
            endAngle: 6.2331853071795855,
            value: 40290
        },
        {
            index: 3,
            startAngle: 0,
            endAngle: 0.5991937527571892,
            value: 9850
        }
    ])).toBe(true);

    expect(inDelta(chords, [
        {
            source:
                {
                    index: 0,
                    subindex: 0,
                    startAngle: 1.9298221403996196,
                    endAngle: 2.6582835809343752,
                    value: 11975
                },
            target:
                {
                    index: 0,
                    subindex: 0,
                    startAngle: 1.9298221403996196,
                    endAngle: 2.6582835809343752,
                    value: 11975
                }
        },
        {
            source:
                {
                    index: 1,
                    subindex: 1,
                    startAngle: 0.6491937527571893,
                    endAngle: 1.260432212422594,
                    value: 10048
                },
            target:
                {
                    index: 1,
                    subindex: 1,
                    startAngle: 0.6491937527571893,
                    endAngle: 1.260432212422594,
                    value: 10048
                }
        },
        {
            source:
                {
                    index: 2,
                    subindex: 1,
                    startAngle: 3.782269946916931,
                    endAngle: 4.764400214761075,
                    value: 16145
                },
            target:
                {
                    index: 1,
                    subindex: 2,
                    startAngle: 1.6358255777286463,
                    endAngle: 1.7611391950565458,
                    value: 2060
                }
        },
        {
            source:
                {
                    index: 0,
                    subindex: 2,
                    startAngle: 2.6582835809343752,
                    endAngle: 3.200660382922507,
                    value: 8916
                },
            target:
                {
                    index: 2,
                    subindex: 0,
                    startAngle: 5.745922164074501,
                    endAngle: 6.2331853071795855,
                    value: 8010
                }
        },
        {
            source:
                {
                    index: 2,
                    subindex: 2,
                    startAngle: 4.764400214761075,
                    endAngle: 5.256529906111903,
                    value: 8090
                },
            target:
                {
                    index: 2,
                    subindex: 2,
                    startAngle: 4.764400214761075,
                    endAngle: 5.256529906111903,
                    value: 8090
                }
        },
        {
            source:
                {
                    index: 3,
                    subindex: 3,
                    startAngle: 0,
                    endAngle: 0.420165609166894,
                    value: 6907
                },
            target:
                {
                    index: 3,
                    subindex: 3,
                    startAngle: 0,
                    endAngle: 0.420165609166894,
                    value: 6907
                }
        },
        {
            source:
                {
                    index: 2,
                    subindex: 3,
                    startAngle: 5.256529906111903,
                    endAngle: 5.745922164074501,
                    value: 8045
                },
            target:
                {
                    index: 3,
                    subindex: 2,
                    startAngle: 0.5420118108697011,
                    endAngle: 0.5991937527571892,
                    value: 940
                }
        },
        {
            source:
                {
                    index: 0,
                    subindex: 1,
                    startAngle: 3.200660382922507,
                    endAngle: 3.5578041923070205,
                    value: 5871
                },
            target:
                {
                    index: 1,
                    subindex: 0,
                    startAngle: 1.7611391950565458,
                    endAngle: 1.8798221403996196,
                    value: 1951
                }
        },
        {
            source:
                {
                    index: 1,
                    subindex: 3,
                    startAngle: 1.260432212422594,
                    endAngle: 1.6358255777286463,
                    value: 6171
                },
            target:
                {
                    index: 3,
                    subindex: 1,
                    startAngle: 0.4817882763286232,
                    endAngle: 0.5420118108697011,
                    value: 990
                }
        },
        {
            source:
                {
                    index: 0,
                    subindex: 3,
                    startAngle: 3.5578041923070205,
                    endAngle: 3.732269946916931,
                    value: 2868
                },
            target:
                {
                    index: 3,
                    subindex: 0,
                    startAngle: 0.420165609166894,
                    endAngle: 0.4817882763286232,
                    value: 1013
                }
        },
    ])).toBe(true);
});
