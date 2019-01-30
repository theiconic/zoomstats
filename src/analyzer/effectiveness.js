const moment = require('moment');

exports.analyze = data => {
    const extractTalkTime = (talkTime, entry) => {
        const start = moment('1900-01-01 ' + entry.start.substr(0, entry.start.length - 4)).add(entry.start.substr(entry.start.length - 3), 'ms');
        const end = moment('1900-01-01 ' + entry.end.substr(0, entry.end.length - 4)).add(entry.end.substr(entry.end.length - 3), 'ms');

        talkTime += end.diff(start);

        return talkTime;
    }

    const format = stats => (formatted, key) => {
        formatted[key] = moment.duration(stats[key], 'ms').humanize();
        return formatted;
    }

    const effectiveTime = data.transcript.reduce(extractTalkTime, 0);

    const duration = '' + data.duration;

    const total = moment('1900-01-01 ' + duration.substr(0, duration.length - 4))
        .add(duration.substr(duration.length - 3), 'ms')
        .diff(moment('1900-01-01 00:00:00'));

    return Math.round((effectiveTime / total * 100) * 100) / 100;
}
