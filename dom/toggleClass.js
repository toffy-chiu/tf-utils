var hasClass = require('./hasClass');
var addClass = require('./addClass');
var removeClass = require('./removeClass');

function toggleClass(element, className) {
    if (hasClass(element, className)) {
        removeClass(element, className);
    } else {
        addClass(element, className);
    }
}

module.exports = toggleClass;