module.exports = (digits) => (number) => {
    const factor = Math.pow(10, (digits || 0));

    return Math.round(number * factor) / factor;
};
