// Basic enhancements for the demo site
(function () {
  // Current year in footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Helper to dynamically load a widget script into a target element
  // Usage example on widgets.html as a comment
  window.loadWidgetScript = function (src, targetId) {
    return new Promise(function (resolve, reject) {
      var el = document.getElementById(targetId);
      if (!el) return reject(new Error('Target element not found: ' + targetId));
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.body.appendChild(s);
    });
  };
})();

