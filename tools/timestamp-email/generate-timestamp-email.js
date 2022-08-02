console.log('Script loaded');

const prefixEl = document.querySelector('#prefix');
const timestampEl = document.querySelector('#timestamp');
const domainEl = document.querySelector('#domain');


const refreshTimestampButton = document.querySelector('.refresh');
const copyToClipboardButton = document.querySelector('.copy');
const openInboxButton = document.querySelector('.open');

const resultEmail = document.querySelector('.result-email');

const getTimestampPrefix = () => {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  const date = localISOTime.split('T')[0].split('-').join('');
  const time = localISOTime.split('T')[1].split('.')[0].split(':').join('');
  const timestampPrefix = `${date}_${time}`;
  return timestampPrefix;
};

const getEmailPrefix = () => {
  const prefixValue = prefixEl.value;
  const timestampValue = timestampEl.value;
  return `${prefixValue}${timestampValue}`;
}

const getEmail = () => {
  const emailPrefix = getEmailPrefix();
  const domainValue = domainEl.value;
  return `${emailPrefix}${domainValue}`;
};

const refreshTimestamp = () => {
  const timestampPrefix = getTimestampPrefix();
  timestampEl.value = timestampPrefix;
};

refreshTimestamp();
resultEmail.innerHTML = getEmail();

refreshTimestampButton.onclick = () => {
  refreshTimestamp();
  resultEmail.innerHTML = getEmail();
};

const copyToClipboard = () => {
  const email = getEmail();
  console.log(email);
  navigator.clipboard.writeText(email);
};

copyToClipboardButton.onclick = () => {
  copyToClipboard();
}

const openInbox = () => {
const inboxUrl = `https://qa.team/${getEmailPrefix()}`;
window.open(inboxUrl, '_blank');
};

openInboxButton.onclick = () => {
  openInbox();
};


resultEmail.onclick = () => {
  copyToClipboard();
}