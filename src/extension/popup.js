const Messenger = require('ext-messenger');
const talktime = require('../analyzer/talktime.js');
const effectiveness = require('../analyzer/effectiveness.js');
const words = require('../analyzer/words.js');
const wordcloud = require('../renderer/html/wordcloud.js');
const collaboration = require('../analyzer/collaboration.js');
const collabChord = require('../renderer/html/collaboration-chord.js');
const talktimeChart = require('../renderer/html/talktime-chart.js');
const getObjectMapper = require('../util/object-map');
const { scaleOrdinal, schemeCategory10 } = require('d3');

const messenger = new Messenger();
const connection = messenger.initConnection('main', () => {return true;});

const buildSpeakerName = (name, color) => {
    const speakerName = document.createElement('dt');
    const swatch = document.createElement('span');
    swatch.setAttribute('class', 'swatch');
    swatch.setAttribute('style', 'background-color: ' + color);
    speakerName.textContent = name;
    speakerName.prepend(swatch);
    return speakerName;
};

const buildSpeakerTime = (time) => {
    const speakerTime = document.createElement('dd');
    speakerTime.textContent = time;
    return speakerTime;
};

const buildSpeaker = (data) => {
    const speaker = document.createElement('dl');
    speaker.classList.add('entry');

    speaker.appendChild(buildSpeakerName(data.name, data.color));
    speaker.appendChild(buildSpeakerTime(data.humanized));
    speaker.appendChild(buildSpeakerTime(((data.total / 1000) / data.turns.length).toPrecision(2) + ' s/turn'));
    speaker.appendChild(buildSpeakerTime(data.turns.length + ' turns'));

    return speaker;
};

const renderPopup = (data) => {
    const getColor = scaleOrdinal(schemeCategory10);
    const statsDom = document.querySelector('.talktime-list');
    const resultsDom = document.querySelector('.results');
    const times = getObjectMapper((entry, name) => ({...entry, name: name, color: getColor(name)}))(talktime(data));

    document.getElementById('title').textContent = data.topic;
    document.querySelector('.effectivenessValue').textContent = effectiveness(data);

    Object.keys(times).map((name) => {
        statsDom.appendChild(buildSpeaker(times[name]));
    });

    talktimeChart(times)(document.querySelector('.talktime-chart'));
    wordcloud(words(data))(document.querySelector('.wordcloud'));
    collabChord(collaboration(data))(document.querySelector('.collaboration'));

    resultsDom.setAttribute('style', '');
};

const renderError = (error) => {
    const errorDom = document.querySelector('.error');
    errorDom.innerHTML = 'Failed to load transcript.';
    errorDom.setAttribute('style', '');
}

window.onload = () => {
    setTimeout(function () {
        connection.sendMessage('content_script:main', {
            cmd: 'getTranscript'
        }).then(function (response) {
            document.querySelector('.loading').setAttribute('style', 'display:none');

            if (response.error) {
                renderError(response.error);
            }

            renderPopup(response);
        });
    }, 500);

    function showTab() {
        const tab = this.getAttribute('data-tab');

        document.querySelectorAll('.tab').forEach((tab) => {
            tab.classList.remove('active');
        });
        this.classList.add('active');

        document.querySelectorAll('.tabpanel').forEach((panel) => {
            panel.classList.remove('active');
        });
        document.querySelector('.tabpanel.' + tab).classList.add('active');
    }

    document.querySelectorAll('.tab').forEach((tab) => {
        tab.addEventListener('click', showTab);
    });
};
