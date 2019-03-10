const getSpeakerTime = require('./get-speaker-time');

const getAdder = (key) => {
    if (key) {
        return getGroupedAdder(key);
    }

    return simpleAdder;
};

const simpleAdder = (base, time) => {
    return (base || 0) + time;
};

const getGroupedAdder = key => (base, time) => {
    if (!base[key]) {
        base[key] = 0;
    }

    base[key] += time;

    return base;
};

module.exports = (groupBy) => (talkTimes, entry) => {
    return getAdder(entry[groupBy])(talkTimes, getSpeakerTime(entry) || 0);
};
