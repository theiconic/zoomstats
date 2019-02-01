const moment = require('moment');
const getTalkTime = require('./util/extract-talktimes');
const momentify = require('./util/momentify-zoom-timestamp');

module.exports = data => {
    const effectiveTime = data.transcript.reduce(getTalkTime(), 0);

    const total = momentify(data.duration)
        .diff(momentify(0));

    return Math.round((effectiveTime / total * 100) * 100) / 100;
}
