const cookieBanner = document.getElementById('cookieBanner');

const text = "When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. The information does not usually directly identify you, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to find out more and change our default settings. However, blocking some types of cookies may impact your experience of the site and the services we are able to offer. <a href='#cookies'>Learn more</a>";

cookieBanner.innerHTML =
    "<div class='bottom'>" +
    "<div class='text'>" + text + "</div>" +
    "<div class='checks'>" +
    "<input type='checkbox' id='performanceCheckBox'><label for='performanceCheckBox'>Performance</label><br/>" +
    "<input type='checkbox' id='functionalCheckBox'><label for='functionalCheckBox'>Functional</label><br/>" +
    "<input type='checkbox' id='marketingCheckBox'><label for='marketingCheckBox'>Marketing</label><br/>" +
    "<button onclick='blockBanner()'>Block All</button>" +
    "<button onclick='saveBanner()'>Save</button>" +
    "</div></div>";

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