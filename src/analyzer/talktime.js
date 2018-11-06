const moment = require('moment');

exports.analyze = data => {
    const extractTalkTime = (talkTimes, entry) => {
        const start = moment('1900-01-01 ' + entry.start.substr(0, entry.start.length - 4)).add(entry.start.substr(entry.start.length - 3), 'ms');
        const end = moment('1900-01-01 ' + entry.end.substr(0, entry.end.length - 4)).add(entry.end.substr(entry.end.length - 3), 'ms');

        let time = end.diff(start);

        if (!talkTimes[entry.speaker]) {
            talkTimes[entry.speaker] = 0;
        }

        talkTimes[entry.speaker] += time;

        return talkTimes;
    }

    const format = stats => (formatted, key) => {
        formatted[key] = moment.duration(stats[key], 'ms').humanize();
        return formatted;
    }

    const stats = data.reduce(extractTalkTime, {});

    return Object.keys(stats).reduce(format(stats), {});
}
