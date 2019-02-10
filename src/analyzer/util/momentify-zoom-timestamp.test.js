const momentify = require('./momentify-zoom-timestamp');
const moment = require('moment');

test('momentify-zoom-timestamp should return moment instance against 1900-01-01', () => {
    expect(momentify('00:02:21.240')).toBeInstanceOf(moment);
    expect(momentify('00:02:21.240').format('YYYY MM DD, HH:mm:ss')).toBe('1900 01 01, 00:02:21');
    expect(momentify('00:02:21.240').millisecond()).toBe(240);

    expect(momentify('04:00:39.820')).toBeInstanceOf(moment);
    expect(momentify('04:00:39.820').format('YYYY MM DD, HH:mm:ss')).toBe('1900 01 01, 04:00:39');
    expect(momentify('04:00:39.820').millisecond()).toBe(820);
});

test('momentify-zoom-timestamp should return moment instance of 1900-01-01 00:00:00 for 0 timestamp', () => {
    expect(momentify(0).format('YYYY MM DD, HH:mm:ss')).toBe('1900 01 01, 00:00:00');
    expect(momentify(0).millisecond()).toBe(0);

    expect(momentify().format('YYYY MM DD, HH:mm:ss')).toBe('1900 01 01, 00:00:00');
    expect(momentify().millisecond()).toBe(0);
});
