document.querySelector('.tz').innerHTML = `Current timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
document.querySelector('.ldt').innerHTML = `loaded date time: ${new Date()}`;