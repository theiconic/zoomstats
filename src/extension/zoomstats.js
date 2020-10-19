const parse = require('../parser/vtt.js');
const Messenger = require('ext-messenger');
const messenger = new Messenger();

const getUrl = (dom) => {
    const transcriptLinks = Array.prototype.filter.call(
        dom.querySelectorAll('.clips_content_list .item_list_header a'),
        (domLink) => domLink.textContent.trim().toLowerCase() === 'audio transcript'
    );

    if (transcriptLinks.length) {
        return transcriptLinks[0].getAttribute('href')
    }

    return undefined;
}

const connection = messenger.initConnection('main', (msg, from, sender, sendResponse) => {
    if (msg.cmd === 'getTranscript') {
        const url = getUrl(window.document);

        if (!url) {
            sendResponse({
                error: 'no-transcript-url'
            });
            return;
        }

        window.fetch(url).then(response => {
            response.text().then(text => sendResponse(parse(text)));
        });
    } else {
        sendResponse({
            error: 'unsupported-command',
            command: msg.cmd
        });
    }
});
