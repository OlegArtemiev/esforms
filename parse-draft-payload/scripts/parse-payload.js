const parseButton = document.querySelector('.parse');

parseButton.onclick = () => {
  const payload = document.querySelector('#payload').value;
  const parsed = JSON.parse(payload);
  const doc = JSON.parse(parsed[0].document);
  const sync = JSON.parse(parsed[0].sync);

  const docElement = document.querySelector('#doc');
  docElement.innerHTML = JSON.stringify(doc, null, 2);

  const syncElement = document.querySelector('#sync');
  syncElement.innerHTML = JSON.stringify(sync, null, 2);
};