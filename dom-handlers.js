import { performance } from 'perf_hooks';

export function initDOM(window) {
    URL.createObjectURL = () => null;

    window.document.createElement = ((orig) => {
        return function createElement(el, tags) {
            return orig.call(this, el, tags);
        };
    })(window.document.createElement);

    window.Node.prototype.appendChild = ((orig) => {
        return function appendChild(newChild) {
            return orig.call(this, newChild);
        };
    })(window.Node.prototype.appendChild);

    Object.defineProperty(window.HTMLElement.prototype, 'offsetHeight', {
        get: function offsetHeight() {
            if (this.style.height && this.style.height.match(/^[0-9]+px/))
                return parseInt(this.style.height);
            return 0;
        }
    });
    Object.defineProperty(window.HTMLElement.prototype, 'offsetWidth', {
        get: function offsetWidth() {
            if (this.style.width && this.style.width.match(/^[0-9]+px/))
                return parseInt(this.style.width);
            return 0;
        }
    });

    window.getComputedStyle = ((orig) => {
        return function getComputedStyle(elt, pseudoElt) {
            const style = orig.call(this, elt, pseudoElt);
            for (const p of [
                'borderLeftWidth',
                'paddingLeft',
                'paddingRight',
                'borderRightWidth',
                'borderTopWidth',
                'paddingTop',
                'paddingBottom',
                'borderBottomWidth'
            ])
                if (!style[p]) style[p] = '0px';
            return style;
        };
    })(window.getComputedStyle);

    window.requestAnimationFrame = (fn) => {
        const hr = performance.now();
        return setTimeout(() => fn(hr), 0);
    };
    window.cancelAnimationFrame = (id) => clearTimeout(id);

    if (!Object.getOwnPropertyDescriptor(global, 'window'))
        Object.defineProperty(global, 'window', { value: window });
    if (!Object.getOwnPropertyDescriptor(global, 'document'))
        Object.defineProperty(global, 'document', { value: window.document });
    if (!Object.getOwnPropertyDescriptor(global, 'Blob'))
        Object.defineProperty(global, 'Blob', { value: Object });
    if (!Object.getOwnPropertyDescriptor(global, 'getComputedStyle'))
        Object.defineProperty(global, 'getComputedStyle', { value: window.getComputedStyle });
    if (!Object.getOwnPropertyDescriptor(global, 'requestAnimationFrame'))
        Object.defineProperty(global, 'requestAnimationFrame', { value: window.requestAnimationFrame });
    if (!Object.getOwnPropertyDescriptor(global, 'Image'))
        Object.defineProperty(global, 'Image', { value: window.Image });
    for (const p of Object.keys(Object.getOwnPropertyDescriptors(window)).filter(p => p.startsWith('HTML')))
        if (!Object.getOwnPropertyDescriptor(global, p))
            Object.defineProperty(global, p, { value: window[p] });
}

export function decodeDataURL(url) {
    const matches = url.match(/^data:.+\/(.+);base64,(.*)$/);
    const ext = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, 'base64');
    return buffer;
}