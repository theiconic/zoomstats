const wordcloud = require('./wordcloud');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

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
    const container = JSDOM.fragment('<div/>').firstChild;
    const renderer = wordcloud(['abc', 'def', 'ghi']);
    expect(typeof (renderer)).toBe('function');
    renderer(container);
    expect(container.firstChild.nodeName).toBe('svg');
    expect(container.querySelectorAll('text').length).toBe(3);
    expect(container.querySelectorAll('text')[0].textContent).toBe('abc');
    expect(container.querySelectorAll('text')[1].textContent).toBe('def');
    expect(container.querySelectorAll('text')[2].textContent).toBe('ghi');
});
