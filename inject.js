(function () {
    window.addEventListener("load", run, false);
})();

async function run() {
    do {
        const elements = document.body.querySelectorAll('*');
        replaceEmojiInInnerTextRecursively(elements);
        replaceImg()
        await sleep(1000);
    } while (true);
}

function replaceImg() {
    const images = document.body.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const alt = img.alt;
        if (img.style.display !== 'none' && (alt.includes('π³οΈβπ') || alt.includes('π³οΈββ§οΈ') || alt.includes('πΊπ¦'))) {
            const newNode = document.createElement('span');
            newNode.innerText = 'π€‘';
            img.parentNode.insertBefore(newNode, img);
            img.style.display = 'none';
        }
    }
}


function replaceEmojiInInnerTextRecursively(nodeList) {


    for (let i = 0; i < nodeList.length; i++) {
        const node = nodeList[i];
        if (node.innerText) {
            replaceEmoji(node, 'π³οΈβπ');
            replaceEmoji(node, 'π³οΈββ§οΈ')
            replaceEmoji(node, 'πΊπ¦')
        }
        if (node.childNodes.length > 0) {
            replaceEmojiInInnerTextRecursively(node.childNodes);
        }
    }
}

function replaceEmoji(node, toReplace) {
    if (node.innerText.includes(toReplace)) {
        let text = node.innerText
        if (text.length < 1000) {
            text = text.replaceAll(toReplace, 'π€‘')
            node.innerText = text;
        }
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}