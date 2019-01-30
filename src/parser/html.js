exports.parse = document => {
    const started = document.getElementById('r_meeting_start_time').getAttribute('value');
    const topic = document.getElementById('r_meeting_topic').getAttribute('value');
    const id = document.getElementById('recording_id').getAttribute('value');
    const transcript = document.querySelector('.aside-transcript');
    const entries = transcript.querySelectorAll('.ts-container');

    const transformEntry = entry => {
        let data = {};

        data.speaker = entry.querySelector('.ts-user-name').textContent.trim();
        data.start = entry.getAttribute('start-ts');
        data.end = entry.getAttribute('end-ts');
        data.text = entry.querySelector('.ts-text').textContent.trim();

        return data;
    }

    const transcriptData = Array.prototype.map.call(entries, transformEntry);

    return {
        topic: topic,
        id: id,
        started: started,
        duration: transcriptData[transcriptData.length - 1].end,
        transcript: transcriptData,
    };
}
