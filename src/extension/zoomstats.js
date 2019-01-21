const parser = require('../parser/html.js');
const Messenger = require('ext-messenger');
const messenger = new Messenger();

console.log('huhu');

messenger.initConnection('main', (msg, from, sender, sendResponse) => {
    if (msg.cmd === 'getTranscript') {
        const dom = window.document;
        const data = parser.parse(dom);

        console.log(data);

        sendResponse(data);
    } else {
        sendResponse({});
    }
});
