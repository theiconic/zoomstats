module.exports = (fn) => (obj) => {
    const mapper = (mapped, key) => {
        mapped[key] = fn(obj[key]);
        return mapped;
    }

    return Object.keys(obj).reduce(mapper, {});
}
