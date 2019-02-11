const printToStdout = require('./print-to-stdout');

test('print-to-stdout is console.log', () => {
    expect(printToStdout).toBe(console.log);
});
