const webvtt = require('node-webvtt');
const cueToTranscriptEntry = require('./vtt/cue-to-transcript-entry');

module.exports = contents => {
    const parsed = webvtt.parse(contents);
    let transcript = [];

    if (parsed.valid) {
        transcript = parsed.cues.map(cueToTranscriptEntry);
    }

    return {
        topic: null,
        id: null,
        started: 0.0,
        duration: transcript[transcript.length - 1].end,
        transcript: transcript,
    };
};
