module.exports = entry => ({
    speaker: entry.querySelector('.ts-user-name').textContent.trim(),
    start: entry.getAttribute('start-ts'),
    end: entry.getAttribute('end-ts'),
    text: entry.querySelector('.ts-text').textContent.trim()
})
