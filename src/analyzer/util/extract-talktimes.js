const getSpeakerTime = require('./get-speaker-time');

const simpleGetter = summary => summary;

const groupedGetter = (summary, key) => {
    if (!summary[key]) {
        summary[key] = {};
    }

    return summary[key];
};

const resolveGetter = (groupBy) => {
    if (groupBy) {
        return groupedGetter;
    }

    return simpleGetter;
}

const init = (summary) => {
    if (!summary.turns) {
        summary.turns = [];
        summary.total = 0;
    }

    return summary;
}

const update = (summary, time, group, lastGroup) => {
    if (time < 0.001) {
        return summary;
    }

    if (lastGroup !== group || summary.turns.length === 0) {
        summary.turns.push(0);
    }

    summary.turns[summary.turns.length - 1] += time;
    summary.total += time;

    return summary;
}

module.exports = (groupBy) => {
    const get = resolveGetter(groupBy);
    let lastGroup = undefined;

    return (talkTimes, entry) => {
        const group = entry[groupBy];

        update(init(get(talkTimes, group)), getSpeakerTime(entry) || 0, group, lastGroup);

        lastGroup = group;

        return talkTimes;
    }
}
