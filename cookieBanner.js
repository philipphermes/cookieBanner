const cookieBanner = document.getElementById('cookieBanner');

//Texts for languages
const textEn = "When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. " +
    "This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. " +
    "The information does not usually directly identify you, but it can give you a more personalized web experience. " +
    "Because we respect your right to privacy, you can choose not to allow some types of cookies. However, " +
    "blocking some types of cookies may impact your experience of the site and the services we are able to offer. " +
    "<a href='#cookies'>Learn more</a>";
const textDe = "Wenn Sie eine Website besuchen, kann diese Informationen in Ihrem Browser speichern oder abrufen, " +
    "meistens in Form von Cookies. Diese Informationen können sich auf Sie, Ihre Präferenzen oder Ihr Gerät beziehen und " +
    "werden hauptsächlich verwendet, damit die Website so funktioniert, wie Sie es erwarten. Die Informationen " +
    "identifizieren Sie normalerweise nicht direkt, können Ihnen jedoch ein personalisierteres Web-Erlebnis bieten. " +
    "Da wir Ihr Recht auf Privatsphäre respektieren, können Sie einige Arten von Cookies ablehnen. Das Blockieren " +
    "einiger Arten von Cookies kann jedoch Ihre Erfahrung mit der Website und den Diensten, " +
    "die wir anbieten können, beeinträchtigen. <a href='#cookies'>Erfahre mehr</a>"
const htmlEn = "<div class='bottom'>" +
    "<div class='text'>" + textEn + "</div>" +
    "<div class='checks'>" +
    "<div class='checkBox'><input type='checkbox' id='performanceCheckBox'><label for='performanceCheckBox'>Performance</label></div>" +
    "<div class='checkBox'><input type='checkbox' id='functionalCheckBox'><label for='functionalCheckBox'>Functional</label></div>" +
    "<div class='checkBox'><input type='checkbox' id='marketingCheckBox'><label for='marketingCheckBox'>Marketing</label></div>" +
    "<button onclick='blockBanner()' id='blockAll'>Block All</button>" +
    "<button onclick='acceptAll()' id='acceptAll'>Accept All</button>" +
    "<button onclick='saveBanner()' id='saveBanner'>Save</button>" +
    "</div></div>";

const htmlDe = "<div class='bottom'>" +
    "<div class='text'>" + textDe + "</div>" +
    "<div class='checks'>" +
    "<div class='checkBox'><input type='checkbox' id='performanceCheckBox'><label for='performanceCheckBox'>Performance</label></div>" +
    "<div class='checkBox'><input type='checkbox' id='functionalCheckBox'><label for='functionalCheckBox'>Funktionale</label></div>" +
    "<div class='checkBox'><input type='checkbox' id='marketingCheckBox'><label for='marketingCheckBox'>Marketing</label></div>" +
    "<button onclick='blockBanner()' id='blockAll'>Alle Blockieren</button>" +
    "<button onclick='acceptAll()' id='acceptAll'>Alle Akzeptieren</button>" +
    "<button onclick='saveBanner()' id='saveBanner'>Speichern</button>" +
    "</div></div>";

let html = '';

if (document.documentElement.lang === 'de') {
    html = htmlDe;
} else {
    html = htmlEn;
}

cookieBanner.innerHTML = html;

removeElements();

function removeElements() {
    const cookie = getCookie('cookieBanner');

    const performanceElements = document.getElementsByClassName("performance");
    const functionalElements = document.getElementsByClassName("functional");
    const marketingElements = document.getElementsByClassName("marketing");

    const performanceCheckBox = document.getElementById('performanceCheckBox');
    const functionalCheckbox = document.getElementById("functionalCheckBox");
    const marketingCheckbox = document.getElementById("marketingCheckBox");

    if (cookie !== '') {
        const json = JSON.parse(cookie);

        console.log(json);

        if (json['performance'] === 'block') {
            performanceCheckBox.checked = false;

            for(let i = 0; i < performanceElements.length; i++) {
                performanceElements[i].innerHTML = "<p>Blocked by Cookie Banner</p>";
            }
        } else {
            performanceCheckBox.checked = true;
        }

        if (json['functional'] === 'block') {
            functionalCheckbox.checked = false;

            for(let i = 0; i < functionalElements.length; i++) {
                functionalElements[i].innerHTML = "<p>Blocked by Cookie Banner</p>";
            }
        } else {
            functionalCheckbox.checked = true;
        }

        if (json['marketing'] === 'block') {
            marketingCheckbox.checked = false;

            for(let i = 0; i < marketingElements.length; i++) {
                marketingElements[i].innerHTML = "<p>Blocked by Cookie Banner</p>";
            }
        } else {
            marketingCheckbox.checked = true;
        }
    } else {
        performanceCheckBox.checked = true;
        functionalCheckbox.checked = true;
        marketingCheckbox.checked = true;
    }
}

function blockBanner() {
    const data = {'performance': 'block', 'functional': 'block', 'marketing': 'block'};
    const jsonData = JSON.stringify(data);

    setCookie('cookieBanner', jsonData, 365)

    window.top.location.reload();
}

function saveBanner() {
    const performance = document.getElementById('performanceCheckBox');
    const functional = document.getElementById('functionalCheckBox');
    const marketing = document.getElementById('marketingCheckBox');

    let data = {};

    if (performance.checked === true) {
        data['performance'] = 'show';
    } else {
        data['performance'] = 'block';
    }

    if (functional.checked === true) {
        data['functional'] = 'show';
    } else {
        data['functional'] = 'block';
    }

    if (marketing.checked === true) {
        data['marketing'] = 'show';
    } else {
        data['marketing'] = 'block';
    }

    const jsonData = JSON.stringify(data);

    setCookie('cookieBanner', jsonData, 365)

    window.top.location.reload();
}

function acceptAll() {
    const data = {'performance': 'show', 'functional': 'show', 'marketing': 'show'};
    const jsonData = JSON.stringify(data);

    setCookie('cookieBanner', jsonData, 365)

    window.top.location.reload();
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
}