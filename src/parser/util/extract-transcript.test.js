const extractTranscript = require('./extract-transcript');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test('extract-transcript should return all transcript nodes', () => {
    const dom = new JSDOM('<html><head></head><body>' +
        '<div class="aside-transcript" style="display: block;">\n' +
        '        <div class="alert alert-success success-msg hideme"></div>\n' +
        '<div class="ts-container ts-container-view" id="transcript_container_1" cue-id="1" start-ts="00:02:21.240" end-ts="00:02:21.750">\n' +
        '\n' +
        '                        <div class="ts-userinfo ">\n' +
        '                                <img class="ts-user-icon" src="./Frontend-services catch-up - Zoom_files/user.png">\n' +
        '                            <span class="ts-user-name">\n' +
        'Unknown Speaker                            </span>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="ts-timeline">\n' +
        '                            00:02:21\n' +
        '                        </div>\n' +
        '\n' +
        '                        <span class="ts-update-icon icomoon-edit hideme"></span>\n' +
        '\n' +
        '                        <div class="ts-text">\n' +
        '                        Hey,\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="ts-text-edit">\n' +
        '                            <textarea class="ts-textarea">Hey,</textarea>\n' +
        '                            <div class="ts-alert ts-alert-danger error-msg hideme"></div>\n' +
        '                            <div class="button-container">\n' +
        '                                <button class="btn btn-cancel">Cancel</button>\n' +
        '                                <button class="btn btn-save">Save</button>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                    </div>' +
        '<div class="ts-container ts-container-view" id="transcript_container_2" cue-id="2" start-ts="00:02:45.210" end-ts="00:02:45.420">\n' +
        '\n' +
        '                        <div class="ts-userinfo hideme">\n' +
        '                                <img class="ts-user-icon" src="./Frontend-services catch-up - Zoom_files/user.png">\n' +
        '                            <span class="ts-user-name">\n' +
        'Unknown Speaker                            </span>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="ts-timeline">\n' +
        '                            00:02:45\n' +
        '                        </div>\n' +
        '\n' +
        '                        <span class="ts-update-icon icomoon-edit hideme"></span>\n' +
        '\n' +
        '                        <div class="ts-text">\n' +
        '                        Hello.\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="ts-text-edit">\n' +
        '                            <textarea class="ts-textarea">Hello.</textarea>\n' +
        '                            <div class="ts-alert ts-alert-danger error-msg hideme"></div>\n' +
        '                            <div class="button-container">\n' +
        '                                <button class="btn btn-cancel">Cancel</button>\n' +
        '                                <button class="btn btn-save">Save</button>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                    </div>' +
        '<div class="ts-container ts-container-view" id="transcript_container_3" cue-id="3" start-ts="00:02:48.480" end-ts="00:02:49.470">\n' +
        '\n' +
        '                        <div class="ts-userinfo ">\n' +
        '                                <img class="ts-user-icon" src="./Frontend-services catch-up - Zoom_files/user.png">\n' +
        '                            <span class="ts-user-name">\n' +
        '                                Joe Test\n' +
        '                            </span>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="ts-timeline">\n' +
        '                            00:02:48\n' +
        '                        </div>\n' +
        '\n' +
        '                        <span class="ts-update-icon icomoon-edit hideme"></span>\n' +
        '\n' +
        '                        <div class="ts-text">\n' +
        '                        Everyone. Hello.\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="ts-text-edit">\n' +
        '                            <textarea class="ts-textarea">Everyone. Hello.</textarea>\n' +
        '                            <div class="ts-alert ts-alert-danger error-msg hideme"></div>\n' +
        '                            <div class="button-container">\n' +
        '                                <button class="btn btn-cancel">Cancel</button>\n' +
        '                                <button class="btn btn-save">Save</button>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                    </div>' +
        '</div></body>'
    ).window.document;

    expect(extractTranscript(dom)).toEqual(
        [
            {
                speaker: 'Unknown Speaker',
                start: '00:02:21.240',
                end: '00:02:21.750',
                text: 'Hey,'
            },
            {
                speaker: 'Unknown Speaker',
                start: '00:02:45.210',
                end: '00:02:45.420',
                text: 'Hello.'
            },
            {
                speaker: 'Joe Test',
                start: '00:02:48.480',
                end: '00:02:49.470',
                text: 'Everyone. Hello.'
            }
        ]
    )
});
