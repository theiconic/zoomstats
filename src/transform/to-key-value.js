module.exports = (keyProperty, valueProperty) => (keyValue, obj) => {
    keyValue[obj[keyProperty]] = obj[valueProperty];
    return keyValue;
}
