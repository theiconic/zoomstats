const moment = require('moment');
const getTalkTime = require('./util/extract-talktimes');
const momentify = require('./util/momentify-zoom-timestamp');
const roundTo = require('./util/round-to');
const roundToTwoDigits = roundTo(2);
const extractTalkTime = getTalkTime();

module.exports = data => {
    const effectiveTime = data.transcript.reduce(extractTalkTime, 0);
    const totalTime = momentify(data.duration).diff(momentify(0));

    return roundToTwoDigits(effectiveTime / totalTime * 100);
}
