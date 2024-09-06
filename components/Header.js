// components/Header.js
export function createHeader() {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Countries & Weather';
    header.appendChild(h1);
    return header;
}