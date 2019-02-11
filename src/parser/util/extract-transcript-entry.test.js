const extractEntry = require('./extract-transcript-entry');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test('extract-transcript-entry should return entry data as object', () => {
    const entry = JSDOM.fragment('<div class="ts-container ts-container-view" id="transcript_container_568" cue-id="568" start-ts="01:10:40.440" end-ts="01:10:43.860">\n' +
        '\n' +
        '                        <div class="ts-userinfo hideme">\n' +
        '                                <img class="ts-user-icon" src="./Frontend-services catch-up - Zoom_files/a60f1762-5e1f-456b-a005-f7356a2dc57e-5354">\n' +
        '                            <span class="ts-user-name">\n' +
        '                                Joe Test\n' +
        '                            </span>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="ts-timeline">\n' +
        '                            01:10:40\n' +
        '                        </div>\n' +
        '\n' +
        '                        <span class="ts-update-icon icomoon-edit hideme"></span>\n' +
        '\n' +
        '                        <div class="ts-text">\n' +
        '                        For today, we are over time or 10 minutes right\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="ts-text-edit">\n' +
        '                            <textarea class="ts-textarea">For today, we are over time or 10 minutes right</textarea>\n' +
        '                            <div class="ts-alert ts-alert-danger error-msg hideme"></div>\n' +
        '                            <div class="button-container">\n' +
        '                                <button class="btn btn-cancel">Cancel</button>\n' +
        '                                <button class="btn btn-save">Save</button>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                    </div>').firstChild;

    expect(extractEntry(entry)).toEqual({
        speaker: 'Joe Test',
        start: '01:10:40.440',
        end: '01:10:43.860',
        text: 'For today, we are over time or 10 minutes right'
    });
});
