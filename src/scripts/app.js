/**
 * @file
 * Main entry point of the todo manager app
 *
 * @author christian.sany@notch-interactive.com
 */

// Import polyfills
import './polyfills/element-matches';
import './polyfills/element-closest';
import './polyfills/nodelist-foreach';
// TODO: implement object assign polyfill

// Dependencies
import pubsub from './helpers/pubsub';
// import Handlebars from 'handlebars';
const Handlebars = require('handlebars');

// App
const App = function (el) {
    console.log(el);
    this._body = document.body;
    this._view = new AppView(el);

    this._body.classList.add('theme-light');
};

const View = function () {

};

View.prototype.render = function() {
    this._el.innerHTML = this._template(this._data);
};

const AppView = function (el) {

    const _this = this;
    _this._el = el;
    _this._data = {};

    fetch('./build/templates/app.hbs')
        .then(response => response.text())
        .then(template => {
            _this._template = Handlebars.compile(template);
            _this.render();
            _this.render2();
        });

    // this._template = Handlebars.compile()
};

// Inherit functions from View
// Object.setPrototypeOf(AppView, View);

// Add inheritance from View.prototype
AppView.prototype = Object.assign({}, View.prototype, {
    render2() {
        console.log('render 2 function');
    }
});

new App(document.querySelector('app'));
