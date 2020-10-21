module.exports = (fn) => (obj) => {
    const mapper = (mapped, key) => {
        return {...mapped, [key]: fn(obj[key], key)};
    }

    return Object.keys(obj).reduce(mapper, {});
}
