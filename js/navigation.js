var activePage = 'homepage';

var pageNames = {
    "homepage": ['home.html', 'images/wing-chun-kali-system-houston-texas.jpg'],
    "aboutpage": ['about.html', 'images/wing-chun-school.jpg'],
    "schedulepage": ['schedule.html', 'images/martial-arts-school.jpg'],
    "contactpage": ['contact.html', 'images/wing-chun.jpg'],
    "faqpage": ['faq.html', 'images/wing-chun-training.jpg']
};

var pageHeightCache = {
    "homepage": 0,
    "aboutpage": 0,
    "schedulepage": 0,
    "contactpage": 0,
    "faqpage": 0
}

function navigate(pageType) {
    if (pageType != activePage) {
        //reset active class from other elements
        resetActive();

        //set this pagetype's elements to active
        var items = document.getElementsByClassName(pageType);
        for (let i = 0; i < items.length; i++) {
            items[i].classList.add('active');
        }

        idElement('mainFrame').setAttribute('src', pageNames[pageType][0]);
        idElement('mastheadImage').setAttribute('src', pageNames[pageType][1]);
        activePage = pageType;
    }
}

function resizeIframe() {
    var obj = idElement('mainFrame');
    
    if (pageHeightCache[activePage] != 0) {
        obj.style.height = pageHeightCache[activePage];
    }
    else {
        obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        pageHeightCache[activePage] = obj.style.height;
    }
}

function resizeIframeForPageResize() {
    //var obj = idElement('mainFrame');
    //obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    //pageHeightCache[activePage] = obj.style.height;

    const iframeElement = document.querySelector('#mainFrame');

    iframeElement.style.height = iframeElement.clientHeight + 'px';
}

function resetActive() {
    var items = classElement('active');
    for (let i = items.length - 1; i > -1;  i--) {
        items[i].classList.remove('active');
    }
}

function idElement(id) {
    return document.getElementById(id);
}

function classElement(className) {
    return document.getElementsByClassName(className);
}