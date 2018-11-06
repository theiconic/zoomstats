exports.parse = dom => {
    const transcript = dom.window.document.querySelector('.aside-transcript');
    const entries = transcript.querySelectorAll('.ts-container');

    const transformEntry = entry => {
        let data = {};

        data.speaker = entry.querySelector('.ts-user-name').textContent.trim();
        data.start = entry.getAttribute('start-ts');
        data.end = entry.getAttribute('end-ts');
        data.text = entry.querySelector('.ts-text').textContent.trim();

        return data;
    }

    return Array.prototype.map.call(entries, transformEntry);
}
