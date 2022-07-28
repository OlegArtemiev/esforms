//stage site id 139
const text1 = `  
!function (t, e, c, n) {
  var s = e.createElement(c);
  s.async = 1, s.src = 'https://scripts.claspo.tech/scripts/' + n + '.js';
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
}(window, document, 'script', '64C3985DA4DC438C829ECB12D7016ABB');
`;
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