const $ = id => document.getElementById(id);

const T = t => document.createTextNode(t);
const N = (tag, attrs, children) => {
    const n = document.createElement(tag);
    if (attrs) {
        for (const key in attrs) {
            n.setAttribute(key, attrs[key]);
        }
    }
    if (children) {
        for (const elem of children) {
            n.appendChild(elem);
        }
    }
    return n;
};
const I = t => N('I', null, [T(t)]);

function generateHandler() {
    console.log(window.location);
}

const tabInfo = {};

function main() {
    chrome.storage.local.get().then((items) => {
        const h = $("history");
        for (const key in items) {
            if (key.startsWith("h-")) {
                const val = JSON.parse(items[key]);
                const authorName = 'Author Name';
                const title = val.title;
                const url = val.url;
                h.appendChild(N('li', null, [
                    T(authorName + ", "),
                    I(title + ", "),
                    N('a', {href: url}, [
                        T(url)
                    ])
                ]));
            }
          }
    });
}

main();