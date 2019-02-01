const extractTranscript = require('./util/extract-transcript');

module.exports = document => {
    const transcript = extractTranscript(document);

    return {
        topic: document.getElementById('r_meeting_topic').getAttribute('value'),
        id: document.getElementById('recording_id').getAttribute('value'),
        started: document.getElementById('r_meeting_start_time').getAttribute('value'),
        duration: transcript[transcript.length - 1].end,
        transcript: transcript,
    };
}
