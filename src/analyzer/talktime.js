const extractTalkTimesBy = require('./util/extract-talktimes');
const getObjectMapper = require('../util/object-map');
const humanizeTalktime = require('../renderer/util/humanize-talktime');

module.exports = data => {
    const humanizeTalktimes = getObjectMapper(humanizeTalktime);
    const bySpeaker = extractTalkTimesBy('speaker');
    const stats = data.transcript.reduce(bySpeaker, {});

    return humanizeTalktimes(stats);
}
