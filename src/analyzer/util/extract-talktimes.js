const getSpeakerTime = require('./get-speaker-time');

const getAdder = (key) => {
    if (key) {
        return getGroupedAdder(key);
    }

    return simpleAdder;
};

const simpleAdder = (summary, time) => {
    if (!summary.turns) {
        summary.turns = [];
        summary.total = 0;
    }

    if (time > 0) {
        summary.turns.push(time);
        summary.total += time;
    }

    return summary;
};

const getGroupedAdder = key => (summary, time) => {
    if (!summary[key]) {
        summary[key] = {
            turns: [],
            total: 0,
        };
    }

    if (time > 0) {
        summary[key].turns.push(time);
        summary[key].total += time;
    }

    return summary;
};

module.exports = (groupBy) => (talkTimes, entry) => {
    return getAdder(entry[groupBy])(talkTimes, getSpeakerTime(entry) || 0);
};
