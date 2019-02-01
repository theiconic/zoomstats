const moment = require('moment');

module.exports = (timestamp) => {
    if (0 == timestamp) {
        return moment('1900-01-01 00:00:00');
    }

    timestamp = '' + timestamp;

    return moment('1900-01-01 ' + timestamp.substr(0, timestamp.length - 4))
        .add(timestamp.substr(timestamp.length - 3), 'ms');
}
