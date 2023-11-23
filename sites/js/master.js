const scripts = [
    'https://olegart.pp.ua/sites/js/utils/clScriptDetails.js',
  ];
  

  scripts.forEach(script => {
    const scriptEl = document.createElement('script');
    scriptEl.src = script;
    scriptEl.async = true;
    document.head.appendChild(scriptEl);
  });
  