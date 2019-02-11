const html = require('./html');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test('html parser should extract meeting details from player page html', () => {
    const dom = new JSDOM('<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n' +
        '    <meta http-equiv="X-UA-Compatible" content="Chrome=1">\n' +
        '    <meta name="robots" content="noindex,nofollow">\n' +
        '    <title>Frontend-services catch-up - Zoom</title>\n' +
        '    <script type="text/javascript" id="jQStatus">if(typeof(jQuery)!==\'undefined\'){var event=new CustomEvent(\'isJQuery\',{detail:\'yes\'});document.dispatchEvent(event);};</script></head>\n' +
        '<body style="overflow: hidden;">\n' +
        '    <input type="hidden" id="r_is_video" value="true">\n' +
        '    <input type="hidden" id="r_meeting_topic" value="Some Zoom Recording">\n' +
        '    <input type="hidden" id="r_meeting_start_time" value="Nov 7, 2018 1:58 PM Canberra, Melbourne, Sydney">\n' +
        '    <input type="hidden" id="recording_id" value="abc123">\n' +
        '    <input type="hidden" id="has_cc_track" value="0">\n' +
        '    <input type="hidden" id="has_transcript_track" value="1">\n' +
        '    <input type="hidden" id="hasPermissionEdit" value="1" data-id="abc123">\n' +
        '\n' +
        '    <div id="wrap" class="recording-player">\n' +
        '        <div class="header-wrap">\n' +
        '            <div class="header">\n' +
        '                <div class="popup-title"><p>Some Zoom Recording</p></div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="main-content">\n' +
        '            <div class="player_wrap has-transcript has-chat players-useractive" id="player-wrap">\n' +
        '                <div id="player-share" class="player-share">\n' +
        '                </div>\n' +
        '                <div class="draggable">\n' +
        '                    <div id="drag"></div>\n' +
        '                </div>\n' +
        '\n' +
        '                <div id="player-view-wrap">\n' +
        '                    <div id="player-view" class="player-view">\n' +
        '\n' +
        '                        <div tabindex="-1" data-setup="{&quot;html5&quot; : { &quot;nativeTextTracks&quot; : false },&quot;controlBar&quot;: { &quot;playToggle&quot;: false }, &quot;techOrder&quot;: [&quot;html5&quot;,&quot;flash&quot;]}" mediagroup="video" id="video-view" class="video-js zoom-view-video vjs-controls-disabled vjs-workinghover vjs-playing vjs-has-started video-view-dimensions vjs-user-inactive" role="region" aria-label="video player"><video class="vjs-tech" id="video-view_html5_api" mediagroup="video" data-setup="{&quot;html5&quot; : { &quot;nativeTextTracks&quot; : false },&quot;controlBar&quot;: { &quot;playToggle&quot;: false }, &quot;techOrder&quot;: [&quot;html5&quot;,&quot;flash&quot;]}" tabindex="-1">\n' +
        '                            <source src="..." type="video/mp4">\n' +
        '\n' +
        '\n' +
        '                        </video><div></div><div class="vjs-poster vjs-hidden" tabindex="-1" aria-disabled="false"></div><div class="vjs-text-track-display" aria-live="off" aria-atomic="true"><div style="position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; margin: 1.5%;"></div></div><div class="vjs-loading-spinner" dir="ltr"></div><button class="vjs-big-play-button" type="button" aria-live="polite" title="Play Video" aria-disabled="false"><span class="vjs-control-text">Play Video</span></button><div class="placeholder"><button id="video-view-fullscreen" class="btn-fullscreen"><span class="vjs-control-text">Full Screen</span></button></div><div class="vjs-control-bar" dir="ltr" role="group"><div class="vjs-progress-control vjs-control"><div tabindex="0" class="vjs-progress-holder vjs-slider vjs-slider-horizontal" role="slider" aria-valuenow="0.97" aria-valuemin="0" aria-valuemax="100" aria-label="progress bar" aria-valuetext="0:00:42"><div class="vjs-load-progress" style="width: 6.43423%;"><span class="vjs-control-text"><span>Loaded</span>: 0%</span><div style="left: 0%; width: 100%;"></div></div><div class="vjs-mouse-display" data-current-time="0:39:25" style="left: 509px;"></div><div class="vjs-play-progress vjs-slider-bar" data-current-time="0:00:42" style="width: 0.97%;"><span class="vjs-control-text"><span>Progress</span>: 0%</span></div></div><div class="vjs-chapter-markers-bar"><div class="vjs-chapter-marker vjs-chpater-marker-chapter-1" style="left:8.48%;" data-timemark="370.44">  <div class="vjs-chapter-marker-title"> Sharing Started</div></div><div class="vjs-chapter-marker vjs-chpater-marker-chapter-2" style="left:23.77%;" data-timemark="1038.72">  <div class="vjs-chapter-marker-title"> Sharing Stopped</div></div><div class="vjs-chapter-marker vjs-chpater-marker-chapter-3" style="left:24.55%;" data-timemark="1072.68">  <div class="vjs-chapter-marker-title"> Sharing Started</div></div><div class="vjs-chapter-marker vjs-chpater-marker-chapter-4" style="left:99.99%;" data-timemark="4367.88">  <div class="vjs-chapter-marker-title"> Sharing Stopped</div></div></div></div><button class="vjs-play-control vjs-control vjs-button vjs-paused" type="button" aria-live="polite" title="Play/Pause/Replay" aria-disabled="false"><span class="vjs-control-text">Play/Pause/Replay</span></button><div class="vjs-volume-menu-button vjs-menu-button vjs-menu-button-inline vjs-control vjs-button vjs-volume-menu-button-horizontal vjs-vol-3" tabindex="0" role="button" aria-live="polite" title="Mute" aria-disabled="false"><div class="vjs-menu"><div class="vjs-menu-content"><div tabindex="0" class="vjs-volume-bar vjs-slider-bar vjs-slider vjs-slider-horizontal" role="slider" aria-valuenow="100.00" aria-valuemin="0" aria-valuemax="100" aria-label="volume level" aria-valuetext="100.00%"><div class="vjs-volume-level"><span class="vjs-control-text"></span></div></div></div></div><span class="vjs-control-text">Mute</span></div><div class="vjs-current-time vjs-time-control vjs-control"><div class="vjs-current-time-display" aria-live="off"><span class="vjs-control-text">Current Time</span> 0:00:42</div></div><div class="vjs-time-control vjs-time-divider"><div><span>/</span></div></div><div class="vjs-duration vjs-time-control vjs-control"><div class="vjs-duration-display" aria-live="off"><span class="vjs-control-text">Duration Time</span> 1:12:48</div></div><div class="vjs-live-control vjs-control vjs-hidden"><div class="vjs-live-display" aria-live="off"><span class="vjs-control-text">Stream Type</span>LIVE</div></div><div class="vjs-remaining-time vjs-time-control vjs-control"><div class="vjs-remaining-time-display" aria-live="off"><span class="vjs-control-text">Remaining Time</span> -1:12:05</div></div><div class="vjs-custom-control-spacer vjs-spacer ">&nbsp;</div><div class="vjs-playback-rate vjs-menu-button vjs-menu-button-popup vjs-control vjs-button vjs-hidden" tabindex="0" role="menuitem" aria-live="polite" title="Playback Rate" aria-disabled="false" aria-expanded="false" aria-haspopup="true"><div class="vjs-menu" role="presentation"><ul class="vjs-menu-content" role="menu"></ul></div><span class="vjs-control-text">Playback Rate</span><div class="vjs-playback-rate-value">1</div></div><div class="vjs-chapters-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button" tabindex="0" role="menuitem" aria-live="polite" title="Chapters" aria-disabled="false" aria-expanded="false" aria-haspopup="true" aria-label="Chapters Menu"><div class="vjs-menu" role="presentation"><ul class="vjs-menu-content" role="menu"><li class="vjs-menu-title" tabindex="-1">Chapters</li><li class="vjs-menu-item vjs-selected" tabindex="0" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="true"> Recording Started<span class="vjs-control-text">, selected</span></li><li class="vjs-menu-item" tabindex="0" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false"> Sharing Started<span class="vjs-control-text"> </span></li><li class="vjs-menu-item" tabindex="0" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false"> Sharing Stopped<span class="vjs-control-text"> </span></li><li class="vjs-menu-item" tabindex="0" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false"> Sharing Started<span class="vjs-control-text"> </span></li><li class="vjs-menu-item" tabindex="0" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false"> Sharing Stopped<span class="vjs-control-text"> </span></li></ul></div><span class="vjs-control-text">Chapters</span></div><div class="vjs-descriptions-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button vjs-hidden" role="menuitem" aria-live="polite" title="Descriptions" aria-disabled="false" aria-expanded="false" aria-haspopup="true" aria-label="Descriptions Menu" tabindex="0"><div class="vjs-menu" role="presentation"><ul class="vjs-menu-content" role="menu"><li class="vjs-menu-item vjs-selected" tabindex="0" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="true">descriptions off<span class="vjs-control-text">, selected</span></li></ul></div><span class="vjs-control-text">Descriptions</span></div><div class="vjs-subtitles-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button vjs-hidden" tabindex="0" role="menuitem" aria-live="polite" title="Subtitles" aria-disabled="false" aria-expanded="false" aria-haspopup="true" aria-label="Subtitles Menu"><div class="vjs-menu" role="presentation"><ul class="vjs-menu-content" role="menu"><li class="vjs-menu-item vjs-selected" tabindex="0" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="true">subtitles off<span class="vjs-control-text">, selected</span></li></ul></div><span class="vjs-control-text">Subtitles</span></div><div class="vjs-captions-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button" tabindex="0" role="menuitem" aria-live="polite" title="Captions" aria-disabled="false" aria-expanded="false" aria-haspopup="true" aria-label="Captions Menu"><div class="vjs-menu" role="presentation"><ul class="vjs-menu-content" role="menu"><li class="vjs-menu-item vjs-texttrack-settings" tabindex="0" role="menuitem" aria-live="polite" aria-disabled="false">captions settings<span class="vjs-control-text">, opens captions settings dialog</span></li><li class="vjs-menu-item vjs-selected" tabindex="0" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="true">captions off<span class="vjs-control-text">, selected</span></li><li class="vjs-menu-item" tabindex="0" role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false">en<span class="vjs-control-text"> </span></li></ul></div><span class="vjs-control-text">Captions</span></div><div class="vjs-audio-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button vjs-hidden" tabindex="0" role="menuitem" aria-live="polite" title="Audio Track" aria-disabled="false" aria-expanded="false" aria-haspopup="true" aria-label="Audio Menu"><div class="vjs-menu" role="presentation"><ul class="vjs-menu-content" role="menu"></ul></div><span class="vjs-control-text">Audio Track</span></div><button class="vjs-fullscreen-control vjs-control vjs-button" type="button" aria-live="polite" title="Fullscreen" aria-disabled="false"><span class="vjs-control-text">Fullscreen</span></button><div class="vjs-custum-time vjs-time-control vjs-control"><div class="vjs-current-time-display" aria-live="off"><span class="vjs-control-text">Current Time</span><span id="currentDisplayTime">00:00:42</span></div><span class="time-space">/</span><div class="vjs-duration-display" aria-live="off"><span class="vjs-control-text">Duration Time</span><span id="durationDisplayTime">01:12:48</span></div></div><div class="vjs-caption-toggle-control vjs-control vjs-menu-button-popup" tabindex="0" role="menuitem" aria-live="polite" aria-disabled="false" aria-expanded="false" aria-haspopup="true"><div class="vjs-menu" role="presentation"><ul class="vjs-menu-content" role="menu"></ul></div><span class="vjs-control-text"></span></div><button class="btn-clip canedit" id="btn-clip">Set Playback Range</button></div><div class="vjs-error-display vjs-modal-dialog vjs-hidden " tabindex="-1" aria-describedby="video-view_component_337_description" aria-hidden="true" aria-label="Modal Window" role="dialog"><p class="vjs-modal-dialog-description vjs-offscreen" id="video-view_component_337_description">This is a modal window.</p><div class="vjs-modal-dialog-content" role="document"></div></div><div class="vjs-caption-settings vjs-modal-overlay vjs-hidden" tabindex="-1" role="dialog" aria-labelledby="TTsettingsDialogLabel-video-view_component_342" aria-describedby="TTsettingsDialogDescription-video-view_component_342"><div role="document"><div class="vjs-control-text" id="TTsettingsDialogLabel-video-view_component_342" aria-level="1" role="heading">Caption Settings Dialog</div><div class="vjs-control-text" id="TTsettingsDialogDescription-video-view_component_342">Beginning of dialog window. Escape will cancel and close the window.</div><div class="vjs-tracksettings"><div class="vjs-tracksettings-colors"><fieldset class="vjs-fg-color vjs-tracksetting"><legend>Text</legend><label class="vjs-label" for="captions-foreground-color-video-view_component_342">Color</label><select id="captions-foreground-color-video-view_component_342"><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-text-opacity vjs-opacity"><label class="vjs-label" for="captions-foreground-opacity-video-view_component_342">Transparency</label><select id="captions-foreground-opacity-video-view_component_342"><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option></select></span></fieldset><fieldset class="vjs-bg-color vjs-tracksetting"><legend>Background</legend><label class="vjs-label" for="captions-background-color-video-view_component_342">Color</label><select id="captions-background-color-video-view_component_342"><option value="#000">Black</option><option value="#FFF">White</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-bg-opacity vjs-opacity"><label class="vjs-label" for="captions-background-opacity-video-view_component_342">Transparency</label><select id="captions-background-opacity-video-view_component_342"><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></fieldset><fieldset class="vjs-window-color vjs-tracksetting"><legend>Window</legend><label class="vjs-label" for="captions-window-color-video-view_component_342">Color</label><select id="captions-window-color-video-view_component_342"><option value="#000">Black</option><option value="#FFF">White</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-window-opacity vjs-opacity"><label class="vjs-label" for="captions-window-opacity-video-view_component_342">Transparency</label><select id="captions-window-opacity-video-view_component_342"><option value="0">Transparent</option><option value="0.5">Semi-Transparent</option><option value="1">Opaque</option></select></span></fieldset></div><div class="vjs-tracksettings-font"><div class="vjs-font-percent vjs-tracksetting"><label class="vjs-label" for="captions-font-size-video-view_component_342">Font Size</label><select id="captions-font-size-video-view_component_342"><option value="0.50">50%</option><option value="0.75">75%</option><option value="1.00">100%</option><option value="1.25">125%</option><option value="1.50">150%</option><option value="1.75">175%</option><option value="2.00">200%</option><option value="3.00">300%</option><option value="4.00">400%</option></select></div><div class="vjs-edge-style vjs-tracksetting"><label class="vjs-label" for="video-view_component_342">Text Edge Style</label><select id="video-view_component_342"><option value="none">None</option><option value="raised">Raised</option><option value="depressed">Depressed</option><option value="uniform">Uniform</option><option value="dropshadow">Dropshadow</option></select></div><div class="vjs-font-family vjs-tracksetting"><label class="vjs-label" for="captions-font-family-video-view_component_342">Font Family</label><select id="captions-font-family-video-view_component_342"><option value="proportionalSansSerif">Proportional Sans-Serif</option><option value="monospaceSansSerif">Monospace Sans-Serif</option><option value="proportionalSerif">Proportional Serif</option><option value="monospaceSerif">Monospace Serif</option><option value="casual">Casual</option><option value="script">Script</option><option value="small-caps">Small Caps</option></select></div></div><div class="vjs-tracksettings-controls"><button class="vjs-default-button">Defaults</button><button class="vjs-done-button">Done</button></div></div></div></div><div class="inactive-progress-wrap"><div id="inactive-progress" class="inactive-progress" style="width: 0.97%;"></div></div><div id="common-mask-pause" class="common-mask" style="display: none;"><i class="icomoon-play"></i> </div></div>\n' +
        '\n' +
        '                        <div class="player-control" id="clip-control" tabindex="-1">\n' +
        '                            <div class="clip-wrap">\n' +
        '                                <label class="sr-only" for="clip">Recording Playback setting</label>\n' +
        '                                <div id="clip" class="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"><div class="ui-slider-range ui-corner-all ui-widget-header" style="left: 0%; width: 100%;"></div><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 0%;"><label id="tooltipFrom" class="slider-tooltips-label">00:00:00</label></span><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 100%;"><label id="tooltipTo" class="slider-tooltips-label">01:12:48</label></span></div>\n' +
        '                            </div>\n' +
        '                            <div class="slide-range-info">\n' +
        '                                <label>Playback Range</label>\n' +
        '                                <span class="input-wrap">\n' +
        '                                        <label class="sr-only" for="range-from">Range</label>\n' +
        '                                        <input id="range-from" type="text">\n' +
        '                                    </span>\n' +
        '                                <label class="sp-wrap">\n' +
        '                                    <span>-</span>\n' +
        '                                    <p class="input-validte" id="input-validte"></p>\n' +
        '                                </label>\n' +
        '                                <span class="input-wrap">\n' +
        '                                        <label class="sr-only" for="range-from">to</label>\n' +
        '                                        <input id="range-to" type="text">\n' +
        '                                    </span>\n' +
        '                                <button id="btn-clip-save" class="btn btn-primary">Save</button>\n' +
        '                                <button id="btn-clip-cancel" class="btn btn-default">Cancel</button>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '\n' +
        '                    <div id="transcript-wrap" class="col-wrap col-wrap-hastranscript transcript-show">\n' +
        '                        <div class="operation-wrap">\n' +
        '                            <div class="btn-operation">\n' +
        '                                <button class="btn-transcript on">Audio Transcript</button>\n' +
        '                                <button class="btn-chat">Chat Messages</button>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="ts-search-fixed" align="center" style="display: block;">\n' +
        '                            <div class="ts-search-container">\n' +
        '                                <div class="ts-search-icon-container"><span class="icomoon-search"></span></div>\n' +
        '                                <div class="ts-search-input-container">\n' +
        '                                    <input type="hidden" class="link-ts" value="">\n' +
        '                                    <input class="ts-search-input" value="" placeholder="Search transcript">\n' +
        '                                    <a href="javascript:;" class="ts-clear-icon hideme" style="display: none;"></a>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="aside-transcript" style="display: block;">\n' +
        '                            <div class="alert alert-success success-msg hideme"></div>\n' +
        '\n' +
        '                            <div class="ts-container ts-container-view" id="transcript_container_1" cue-id="1" start-ts="00:02:21.240" end-ts="00:02:21.750">\n' +
        '\n' +
        '                                <div class="ts-userinfo ">\n' +
        '                                    <img class="ts-user-icon" src="...">\n' +
        '                                    <span class="ts-user-name">\n' +
        'Unknown Speaker                            </span>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="ts-timeline">\n' +
        '                                    00:02:21\n' +
        '                                </div>\n' +
        '\n' +
        '                                <span class="ts-update-icon icomoon-edit hideme"></span>\n' +
        '\n' +
        '                                <div class="ts-text">\n' +
        '                                    Hey,\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="ts-text-edit">\n' +
        '                                    <textarea class="ts-textarea">Hey,</textarea>\n' +
        '                                    <div class="ts-alert ts-alert-danger error-msg hideme"></div>\n' +
        '                                    <div class="button-container">\n' +
        '                                        <button class="btn btn-cancel">Cancel</button>\n' +
        '                                        <button class="btn btn-save">Save</button>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '\n' +
        '                            </div>\n' +
        '                            <div class="ts-container ts-container-view" id="transcript_container_2" cue-id="2" start-ts="00:02:45.210" end-ts="00:02:45.420">\n' +
        '\n' +
        '                                <div class="ts-userinfo hideme">\n' +
        '                                    <img class="ts-user-icon" src="...">\n' +
        '                                    <span class="ts-user-name">\n' +
        'Unknown Speaker                            </span>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="ts-timeline">\n' +
        '                                    00:02:45\n' +
        '                                </div>\n' +
        '\n' +
        '                                <span class="ts-update-icon icomoon-edit hideme"></span>\n' +
        '\n' +
        '                                <div class="ts-text">\n' +
        '                                    Hello.\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="ts-text-edit">\n' +
        '                                    <textarea class="ts-textarea">Hello.</textarea>\n' +
        '                                    <div class="ts-alert ts-alert-danger error-msg hideme"></div>\n' +
        '                                    <div class="button-container">\n' +
        '                                        <button class="btn btn-cancel">Cancel</button>\n' +
        '                                        <button class="btn btn-save">Save</button>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '\n' +
        '                            </div>\n' +
        '                            <div class="ts-container ts-container-view" id="transcript_container_3" cue-id="3" start-ts="00:02:48.480" end-ts="00:02:49.470">\n' +
        '\n' +
        '                                <div class="ts-userinfo ">\n' +
        '                                    <img class="ts-user-icon" src="...">\n' +
        '                                    <span class="ts-user-name">\n' +
        '                                Joe Test\n' +
        '                            </span>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="ts-timeline">\n' +
        '                                    00:02:48\n' +
        '                                </div>\n' +
        '\n' +
        '                                <span class="ts-update-icon icomoon-edit hideme"></span>\n' +
        '\n' +
        '                                <div class="ts-text">\n' +
        '                                    Everyone. Hello.\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="ts-text-edit">\n' +
        '                                    <textarea class="ts-textarea">Everyone. Hello.</textarea>\n' +
        '                                    <div class="ts-alert ts-alert-danger error-msg hideme"></div>\n' +
        '                                    <div class="button-container">\n' +
        '                                        <button class="btn btn-cancel">Cancel</button>\n' +
        '                                        <button class="btn btn-save">Save</button>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '\n' +
        '                            </div>\n' +
        '\n' +
        '                            <a class="power-by" target="_blank" href="http://aisense.com/zoom">\n' +
        '                                Powered by AISense                    <i class="tm"></i>\n' +
        '                            </a>\n' +
        '\n' +
        '                            <div class="resume-transcript-auto-scroll-container hideme" style="display: block;">\n' +
        '                                <button class="btn btn-primary btn-resume-transcript-auto-scroll">Resume Transcript Auto-Scroll</button>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="aside-chat" style="display: none;">\n' +
        '                            <div class="chat-container ts-container-view ts-past" id="transcript_container_7">\n' +
        '\n' +
        '                                <div class="chat-userinfo">\n' +
        '                                    <img class="ts-user-icon" src="...">\n' +
        '                                    <span class="ts-user-name">\n' +
        '                                Khoa Bui\n' +
        '                            </span>\n' +
        '\n' +
        '                                    <div class="chat-timeline">16:46</div>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="chat-content-wrap">\n' +
        '                                    <div class="chat-text"> ... </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="chat-container ts-container-view ts-past" id="transcript_container_7">\n' +
        '\n' +
        '                                <div class="chat-userinfo">\n' +
        '                                    <img class="ts-user-icon" src="...">\n' +
        '                                    <span class="ts-user-name">\n' +
        '                                Felipe Mesquita\n' +
        '                            </span>\n' +
        '\n' +
        '                                    <div class="chat-timeline">26:09</div>\n' +
        '                                </div>\n' +
        '\n' +
        '                                <div class="chat-content-wrap">\n' +
        '                                    <div class="chat-text"> it\'s ok for me Nootan </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div id="downloadDialog" class="modaldialog hideme">\n' +
        '        <div class="modal-dialog"><div class="modal-content"><div class="modal-header clearfix">\n' +
        '            <button class="close simplemodal-close" aria-label="close">×</button>\n' +
        '            <h3>Download</h3>\n' +
        '        </div>\n' +
        '            <div class="modal-body">\n' +
        '                <div contains="text">Please right-click the download link below\n' +
        '                    <br> and choose"Save Link As..."</div>\n' +
        '\n' +
        '                <br>\n' +
        '                <a class="download" download="" href="...">\n' +
        '                    <span class="glyphicon glyphicon-save"></span> Download </a>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '            </div></div></div>\n' +
        '    </div>\n' +
        '</body>\n' +
        '</html>\n').window.document;

    expect(html(dom)).toEqual({
            duration: '00:02:49.470',
            id: 'abc123',
            started: 'Nov 7, 2018 1:58 PM Canberra, Melbourne, Sydney',
            topic: 'Some Zoom Recording',
            transcript:
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
        }
    )
});
