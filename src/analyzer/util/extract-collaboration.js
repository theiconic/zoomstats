const getSpeakerTime = require('./get-speaker-time.js');

module.exports = () => {
    var lastSpeakers = ['all'];

    const isAudience = (lastSpeaker, speaker, audience) => {
        if (lastSpeaker === 'all' && audience.length) {
            return false;
        }

        return lastSpeaker && speaker !== lastSpeaker && -1 === audience.indexOf(lastSpeaker);
    };

    const getAudience = (lastSpeakers, speaker) => {
        let i = 0;
        let audience = [];

        while (isAudience(lastSpeakers[i], speaker, audience)) {
            audience.push(lastSpeakers[i]);
            i++;
        }

        return audience;
    };

    const addAudiences = (time) => (audiences, audience) => {
        audiences[audience] = audiences[audience] ? audiences[audience] + time : time;

        return audiences;
    };

    return (speakers, entry) => {
        const speaker = entry.speaker;
        const time = getSpeakerTime(entry);
        const audience = getAudience(lastSpeakers, speaker);

        speakers[speaker] = audience.reduce(addAudiences(time), speakers[speaker] || {});

        if (speaker !== lastSpeakers[0]) {
            lastSpeakers.unshift(speaker);
        }

        return speakers;
    }
};
