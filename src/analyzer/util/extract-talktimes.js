const moment = require('moment');
const momentify = require('./momentify-zoom-timestamp');

const getAdder = (key) => {
    if (key) {
        return getGroupedAdder(key);
    }

    return simpleAdder;
}

const simpleAdder = (base, time) => {
    return (base || 0) + time;
}

const getGroupedAdder = key => (base, time) => {
    if (!base[key]) {
        base[key] = 0;
    }

    base[key] += time;

    return base;
}

module.exports = (groupBy) => (talkTimes, entry) => {
    const start = momentify(entry.start);
    const end = momentify(entry.end);
    const time = end.diff(start);

    return getAdder(entry[groupBy])(talkTimes, time || 0);
}
