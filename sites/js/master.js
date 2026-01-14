const scripts = [
  new URL('/sites/js/utils/clScriptDetails.js', window.location.origin).toString(),
];

scripts.forEach(script => {
  const scriptEl = document.createElement('script');
  scriptEl.src = script;
  scriptEl.async = true;
  document.head.appendChild(scriptEl);
});
  
