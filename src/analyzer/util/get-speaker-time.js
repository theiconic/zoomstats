const momentify = require('./momentify-zoom-timestamp');

module.exports = (entry) => {
    const start = momentify(entry.start);
    const end = momentify(entry.end);

    return end.diff(start);
};
