(function () {
    window.addEventListener("load", myMain, false);
})();

function myMain() {
    console.log('start replacing emoji...');
    run()
}

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
        if (img.style.display !== 'none' && (alt.includes('🏳️‍🌈') || alt.includes('🏳️‍⚧️') || alt.includes('🇺🇦'))) {
            const newNode = document.createElement('span');
            newNode.innerText = '🤡';
            img.parentNode.insertBefore(newNode, img);
            img.style.display = 'none';
        }
    }
}


function replaceEmojiInInnerTextRecursively(nodeList) {
    const replaceEmoji = (node, toReplace) => {
        if (node.innerText.includes(toReplace)) {
            let text = node.innerText
            if (text.length < 1000) {
                text = text.replaceAll(toReplace, '🤡')
                node.innerText = text;
            } else {
            }
        }
    }

    for (let i = 0; i < nodeList.length; i++) {
        const node = nodeList[i];
        if (node.innerText) {
            replaceEmoji(node, '🏳️‍🌈');
            replaceEmoji(node, '🏳️‍⚧️')
            replaceEmoji(node, '🇺🇦')
        }
        if (node.childNodes.length > 0) {
            replaceEmojiInInnerTextRecursively(node.childNodes);
        }
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}