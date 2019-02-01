const parse = require('../parser/html.js');
const Messenger = require('ext-messenger');
const messenger = new Messenger();

messenger.initConnection('main', (msg, from, sender, sendResponse) => {
    if (msg.cmd === 'getTranscript') {
        const dom = window.document;
        const data = parse(dom);

        sendResponse(data);
    } else {
        sendResponse({});
    }
});
