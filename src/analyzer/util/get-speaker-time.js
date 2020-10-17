module.exports = (entry) => {
    return entry.end * 1000 - entry.start * 1000;
};
