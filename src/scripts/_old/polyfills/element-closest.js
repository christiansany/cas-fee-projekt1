// https://developer.mozilla.org/de/docs/Web/API/Element/closest

// Dependencies
import './element-matches';

if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (selector) {
        var element = this;

        while (element && element.nodeType === 1) {
            if (element.matches(selector)) {
                return element;
            }

            element = element.parentNode;
        }

        return null;
    };
}
