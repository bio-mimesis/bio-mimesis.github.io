const isReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches
let charSet="\u00c0\u00c1\u00c2\u00c8\u00ca\u00cb\u00cd\u00d3\u00d4\u00d5\u00da\u00df\u00e3\u00f5\u011f\u0130\u0131\u0152\u0153\u015e\u015f\u0174\u0175\u017e\u0207" +
"        !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ \u00c7\u00fc\u00e9\u00e2" +
"\u00e4\u00e0\u00e5\u00e7\u00ea\u00eb\u00e8\u00ef\u00ee\u00ec\u00c4\u00c5\u00c9\u00e6\u00c6\u00f4\u00f6\u00f2\u00fb\u00f9\u00ff\u00d6\u00dc\u00f8\u00a3" +
"\u00d8\u00d7\u0192\u00e1\u00ed\u00f3\u00fa\u00f1\u00d1\u00aa\u00ba\u00bf\u00ae\u00ac\u00bd\u00bc\u00a1\u00ab\u00bb\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556" +
"\u2555\u2563\u2551\u2557\u255d\u255c\u255b\u2510\u2514\u2534\u252c\u251c\u2500\u253c\u255e\u255f\u255a\u2554\u2569\u2566\u2560\u2550\u256c\u2567\u2568\u2564\u2565" +
"\u2559\u2558\u2552\u2553\u256b\u256a\u2518\u250c\u2588\u2584\u258c\u2590\u2580\u03b1\u03b2\u0393\u03c0\u03a3\u03c3\u03bc\u03c4\u03a6\u0398\u03a9\u03b4\u221e\u2205" +
"\u2208\u2229\u2261\u00b1\u2265\u2264\u2320\u2321\u00f7\u2248\u00b0\u2219\u00b7\u221a\u207f\u00b2\u25a0 ";
let controlChar = '§';

const cipheredRenderer = (cleartext) => {

    let ciphertext = "";
    for (const char of cleartext) {
        ciphertext += controlChar;
    }
    return () => {
        let rendertext = "";
        let newCipher = "";
        for (let i = 0; i < ciphertext.length; i++) {
            if (ciphertext[i] === controlChar) {
                if (Math.random() < .99) {
                    rendertext += charSet.charAt(Math.floor(Math.random() * charSet.length));
                    newCipher += controlChar;
                } else {
                    newCipher += cleartext[i];
                    rendertext += cleartext[i];
                }
            } else {
                newCipher += cleartext[i];
                rendertext += cleartext[i];
            }
        }
        ciphertext = newCipher;
        return rendertext;
    };
};

const separatorRenderer = (cleartext) => {
    return () => {
        let rendertext = "";
        for (const char of cleartext) {
            if (char === controlChar) {
                rendertext += charSet.charAt(Math.floor(Math.random() * charSet.length));
            } else {
                rendertext += char;
            }
        }
        return rendertext
    }
}

const main = () => {
    if (isReducedMotion) {
        return;
    }

    document.querySelectorAll('.magic').forEach(function(node) {
        let cleartext = node.textContent;
        let cipherRenderer = cipheredRenderer(cleartext);
        let id = setInterval(() => {
            let cipher = cipherRenderer();
            node.textContent = cipher;
            if (cipher === cleartext) {
                clearInterval(id);
            }
        }, 16);
    });

    document.querySelectorAll('.separator').forEach(function(node) {
        let renderer = separatorRenderer(node.textContent);
        setInterval(() => {
            node.textContent = renderer();
        }, 16);
    });
}

main();