const chord = require('./collaboration-chord');

window.HTMLCanvasElement.prototype.getContext = () => {
    return {
        getImageData: () => {
            return {
                data: 'abxxx'
            }
        },
        clearRect: jest.fn(),
        save: jest.fn(),
        measureText: () => {
            return {
                width: 10,
                height: 10
            }
        },
        translate: jest.fn(),
        rotate: jest.fn(),
        fillText: jest.fn(),
        strokeText: jest.fn(),
        restore: jest.fn()
    };
};

test('calling wordcloud returns render function', () => {
    return new Promise((resolve, reject) => {
        const container = document.body;
        const renderer = chord([[1,2],[3,4],[5,6],[7,8]]);
        expect(typeof (renderer)).toBe('function');
        renderer(container);
        setTimeout(() => {
            expect(container.firstChild.nodeName).toBe('svg');
            container.querySelector('g.group').dispatchEvent(new window.MouseEvent('mouseover'));
            resolve();
        }, 100);
    });
});
