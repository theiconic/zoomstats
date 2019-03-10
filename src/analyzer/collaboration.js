const extractCollaboration = require('./util/extract-collaboration');

module.exports = data => data.transcript.reduce(extractCollaboration(1800), {});
