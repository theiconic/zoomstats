module.exports = (digits) => (number) => {
    const factor = Math.pow(10, digits);

    return Math.round(number * factor) / factor;
}
