const supportedList = ['en', 'uk'];


const browserLangList = navigator.languages.map(lang => lang.split('-')[0]);


function determineLanguage(supportedList, browserLangList) {
    return browserLangList.find(lang => supportedList.includes(lang)) || supportedList[0];
}

function setLanguage() {
    const selectedLanguage = determineLanguage(supportedList, browserLangList);
    document.documentElement.setAttribute('lang', selectedLanguage);
}

document.addEventListener('DOMContentLoaded', setLanguage);
