const moment = require('moment');

module.exports = talkTime => moment.duration(talkTime, 'ms').humanize();
