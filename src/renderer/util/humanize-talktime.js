const moment = require('moment');

module.exports = talkTime => {
    return {...talkTime, humanized: moment.duration(talkTime.total, 'ms').humanize()};
}
