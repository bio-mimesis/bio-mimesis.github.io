const username = "biomimesis"
const feedURL = `https://status.cafe/users/${username}.atom`;

let entries = [];

const decodeHTML = function (html) {
    let textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
};

const calculateDeltatimeString = function (fromDate) {
    let delta = Date.now() - fromDate;
    let hoursDelta = Math.floor(delta / 3.6e6);
    if (hoursDelta >= 720) {
        let monthsDelta = Math.floor(delta / 2.592e9);
        return `${monthsDelta} month(s) ago`;
    } else if (hoursDelta >= 24) {
        let daysDelta = Math.floor(delta / 8.64e7);
        return `${daysDelta} day(s) ago`;
    } else if (hoursDelta <= 0) {
        let minutesDelta = Math.floor(delta / 6e4);
        return `${minutesDelta} minute(s) ago`;
    }
    return `${hoursDelta} hour(s) ago`;
};

const addStatus = function (parent, entry) {
    let status = document.createElement('div');
    status.classList.add('statuscafe-status');

    let comment = document.createElement('div');
    let deltatime = document.createElement('div');

    comment.classList.add('statuscafe-comment');
    deltatime.classList.add('statuscafe-deltatime');

    let commentText = document.createTextNode(entry.content);
    let deltatimeText = document.createTextNode(`${entry.face}, ${calculateDeltatimeString(entry.date)}`);

    status.appendChild(comment);
    status.appendChild(deltatime);

    comment.appendChild(commentText);
    deltatime.appendChild(deltatimeText);

    parent.appendChild(status);
};

// const addStatus = function (parent, entry) {
//     let status = document.createElement('div');
//     status.classList.add('statuscafe-status');

//     let face = document.createElement('div');
//     let comment = document.createElement('div');
//     let deltatime = document.createElement('div');

//     face.classList.add('statuscafe-face');
//     comment.classList.add('statuscafe-comment');
//     deltatime.classList.add('statuscafe-deltatime');

//     let faceText = document.createTextNode(entry.face);
//     let commentText = document.createTextNode(entry.content);
//     let deltatimeText = document.createTextNode(calculateDeltatimeString(entry.date));

//     status.appendChild(face);
//     status.appendChild(comment);
//     status.appendChild(deltatime);

//     face.appendChild(faceText);
//     comment.appendChild(commentText);
//     deltatime.appendChild(deltatimeText);

//     parent.appendChild(status);
// };

const main = () => {
    (async () => {
        await fetch(feedURL)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                data.querySelectorAll("entry").forEach(entry => {
                    entries.push({
                        face: decodeHTML(entry.querySelector("title").innerHTML.slice(username.length + 1, 13)),
                        content: decodeHTML(entry.querySelector("content").textContent),
                        date: Date.parse(decodeHTML(entry.querySelector("published").innerHTML)),
                    });
                });
            });

        let statusCollection = document.getElementById("statuscafe-collection");

        let statusLoading = document.getElementById("statuscafe-loading");
        if (entries.length <= 0) {
            statusLoading.textContent = "No statuses to display :(";
        } else {
            statusLoading.remove();
            for (let entry of entries) {
                addStatus(statusCollection, entry);
            }
        }
    })();
}

main();


// Bad practice to have side effects (like the fetch) on load. Define it in a function and call it from a function that manages it properly

// every click on statuscafe increments a counter
// while the counter is larger than zero and revealed is less than total, flip one tile, animate, and listen for the end to decrement counter, incremenet revealed, and start next animation
// keep a pointer to tail in script

// add margins, etc.

// The play of exploration is the lifeblood of the mind

// Add :hover, active and other button states to improve clarity
// Add a night mode slider that saves its state between pages, slides between default (day/night) and forced flip value