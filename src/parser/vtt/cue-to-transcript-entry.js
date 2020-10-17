module.exports = cue => {
    const parts = cue.text.split(':');
    const speaker = (parts.length > 1) ? parts[0].trim() : 'Unknown Speaker';
    const text = (parts.length > 1) ? parts[1].trim() : parts[0].trim();

    return {
        speaker: speaker,
        start: Math.round(cue.start * 100) / 100,
        end: Math.round(cue.end * 100) / 100,
        text: text
    };
}
