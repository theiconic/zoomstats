const extractTalkTimesBy = require('./util/extract-talktimes');
const getObjectMapper = require('../util/object-map');
const humanizeTalktime = require('./util/humanize-talktime');

module.exports = data => {
    const humanizeTalktimes = getObjectMapper(humanizeTalktime);
    const stats = data.transcript.reduce(extractTalkTimesBy('speaker'), {});

    return humanizeTalktimes(stats);
}
