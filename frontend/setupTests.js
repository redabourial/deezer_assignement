import 'jest-environment-jsdom-global';

global.api = {
    root: "/api",
}

const noOp = () => { }

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: noOp,
        removeListener: noOp,
        addEventListener: noOp,
        removeEventListener: noOp,
        dispatchEvent: noOp,
    }),
});
