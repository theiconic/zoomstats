jest.mock('./analyzer/talktime.js', () => {
    return jest.fn(() => {
        return {
            'Unknown Speaker': 3600,
            'Joe Test': 1200
        };
    });
});

jest.mock('./analyzer/effectiveness.js', () => {
    return jest.fn(() => {
        return 85.3;
    });
});

jest.mock('./analyzer/words.js', () => {
    return jest.fn(() => {
        return ['abc', 'def', 'ghi'];
    });
});

jest.mock('./renderer/json/topwords.js', () => {
    return jest.fn(() => {
        return {
            'abc': 1,
            'def': 1,
            'ghi': 1
        }
    });
});

jest.mock('./util/parse-html-file.js', () => {
    return () => {
        return new Promise((resolve, reject) => {
            resolve({
                topic: 'test'
            });
        });
    };
});

test('index should run talktime', () => {
    return new Promise((resolve, reject) => {
        jest.isolateModules(() => {
            process.argv = ['node', 'index.js', 'talktime', 'test.htm'];
            const print = jest.fn();

            jest.doMock('./util/print-to-stdout', () => {
                return print;
            });

            require('./index.js');

            setTimeout(() => {
                expect(print).toHaveBeenCalledTimes(2);
                expect(print).toHaveBeenNthCalledWith(1, 'analyzing file %s', 'test.htm')
                expect(print).toHaveBeenNthCalledWith(2, {"Joe Test": 1200, "Unknown Speaker": 3600})
                resolve();
            }, 100);
        });
    })
});


test('index should run effectiveness', () => {
    return new Promise((resolve, reject) => {
        jest.isolateModules(() => {
            process.argv = ['node', 'index.js', 'effectiveness', 'test.htm'];
            const print = jest.fn();

            jest.doMock('./util/print-to-stdout', () => {
                return print;
            });

            require('./index.js');

            setTimeout(() => {
                expect(print).toHaveBeenCalledTimes(2);
                expect(print).toHaveBeenNthCalledWith(1, 'analyzing file %s', 'test.htm')
                expect(print).toHaveBeenNthCalledWith(2, 'Meeting effectiveness: 85.3%');
                resolve();
            }, 100);
        });
    });
});


test('index should run topwords', () => {
    return new Promise((resolve, reject) => {
        jest.isolateModules(() => {
            process.argv = ['node', 'index.js', 'topwords', 'test.htm'];
            const print = jest.fn();

            jest.doMock('./util/print-to-stdout', () => {
                return print;
            });

            require('./index.js');

            setTimeout(() => {
                expect(print).toHaveBeenCalledTimes(2);
                expect(print).toHaveBeenNthCalledWith(1, 'analyzing file %s', 'test.htm')
                expect(print).toHaveBeenNthCalledWith(2, {"abc": 1, "def": 1, "ghi": 1})
                resolve();
            }, 100);
        });
    });
});
