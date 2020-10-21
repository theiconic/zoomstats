const chart = require('./talktime-chart');

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

test('calling collaboration-chord returns render function', () => {
    return new Promise((resolve, reject) => {
        const container = document.body;
        const renderer = chart([{
            name: 'a',
            total: 10,
            turns: [10],
            humanized: 'a few seconds'
        },{
            name: 'b',
            total: 20,
            turns: [20],
            humanized: 'a few seconds'
        },{
            name: 'c',
            total: 30,
            turns: [30],
            humanized: 'a few seconds'
        }]);
        expect(typeof (renderer)).toBe('function');
        renderer(container);
        setTimeout(() => {
            expect(container.firstChild.nodeName).toBe('svg');
            expect(container.querySelector('tspan.name').textContent).toBe('total');
            expect(container.querySelector('tspan.time').textContent).toBe('a few seconds');
            expect(container.querySelector('tspan.turns').textContent).toBe('3 turns');
            expect(container.querySelector('tspan.time-per-turn').textContent).toBe('0.020 s/turn');
            resolve();
        }, 100);
    });
});
