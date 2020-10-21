const getTalkTime = require('./util/extract-talktimes');
const roundTo = require('./util/round-to');
const roundToTwoDigits = roundTo(2);
const extractTalkTime = getTalkTime();

module.exports = data => {
    const effectiveTime = data.transcript.reduce(extractTalkTime, {}).total;
    const totalTime = data.duration * 1000;

    return roundToTwoDigits(effectiveTime / totalTime * 100);
};
