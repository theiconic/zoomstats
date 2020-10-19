chrome.runtime.onInstalled.addListener(function() {
    const setIcon = new chrome.declarativeContent.SetIcon({
        path: {
            "32": "icon/enabled_32.png",
            "64": "icon/enabled_64.png",
            "128": "icon/enabled_128.png",
            "256": "icon/enabled.png"
        }
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            hostContains: '.zoom.us',
                            pathEquals: '/recording/detail'
                        },
                    })
                ],
                actions: [
                    new chrome.declarativeContent.ShowPageAction(),
                    setIcon
                ]
            }
        ]);
    });
});

const Messenger = require('ext-messenger');
const messenger = new Messenger();

messenger.initBackgroundHub();
