//stage site id 262
const text1 = `    !function (t, e, c, n) {
  var s = e.createElement(c);
  s.async = 1, s.src = 'https://scripts.claspo.io/scripts/' + n + '.js';
  var r = e.scripts[0];
  r.parentNode.insertBefore(s, r);
  var f = function () {
      f.c(arguments);
  };
  f.q = [];
  f.c = function () {
      f.q.push(arguments);
  };
  t['claspo'] = t['claspo'] || f;
}(window, document, 'script', 'A5AD9A9196CC4508A07B3B408883F801');`;
const text2 = `claspo('init');`;

const addScriptInDom = (code) => {
  const scriptElement = document.createElement('script');
  scriptElement.textContent = code;
  document.body.appendChild(scriptElement);
}

window.onload = function () {
  addScriptInDom(text1);
  addScriptInDom(text2);

};