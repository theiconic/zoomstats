const moment = require('moment');
const momentify = require('./momentify-zoom-timestamp');

module.exports = (groupBy) => (talkTimes, entry) => {
    const start = momentify(entry.start);
    const end = momentify(entry.end);
    const time = end.diff(start);

    if (groupBy && typeof talkTimes === 'object') {
        if (!talkTimes[entry[groupBy]]) {
            talkTimes[entry[groupBy]] = 0;
        }

        talkTimes[entry[groupBy]] += time;
    } else {
        talkTimes += time;
    }

    return talkTimes;
}
