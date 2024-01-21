function getColor(amound) {
    if (amound <= 50) {
        return `red`
    } else if (amound > 50 && amound < 100) {
        return `orange`
    } else {
        return `green`
    }
}
function returnAmound(amound) {
    if (amound > 1) return amound; else return 'Vol';
}


// ===========================================================================

const API_URL = 'https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20'

async function getApiData(callback) {
    const response = await fetch(API_URL);
    var data = await response.json();
    callback(data);
}

function addAvailabilityLines(data) {
    //Find DOM element
    $availabilityBoardElement = document.querySelector('.availability-board-lines');

    //Generate content
    const boardLines = data.results.map((result) => {
        return `
            <li class="availability-board-line">
                <div class="availability-board-line-left">
                    <img class="arrow" src="./images/arrows/arrow-${Math.floor(Math.random() * 8) + 1}.svg" alt="arrow">
                    <h3>${result.name}</h3>
                </div>
                <p style="color: ${getColor(result.availablecapacity)}; font-family: 'VT323', monospace; font-size: 2.2rem;">${returnAmound(result.availablecapacity)}</p>
            </li>
        `
    }).join('');

    //Add content to DOM
    $availabilityBoardElement.innerHTML = boardLines;
}
function addFooter(data) {
    $footerElement = document.querySelector('.footer');
    date = new Date(data.results[0].lastupdate)

    let str = `<p>Last updated: ${date}</p>`

    $footerElement.innerHTML += str;
}



function init() {
    getApiData((data) => {
        addAvailabilityLines(data);
        addFooter(data);
    })
}

init();