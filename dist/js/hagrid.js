(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.hagrid = (function(){
  /**
   * Depenencies
   * @type {import}
   */
  var u = require('umbrellajs').u;

  /**
   * hagrid variables
   */
  var hagrid;

  /**
   * Parents
   * @param  {String} ps Parent selector string
   * @param  {Object} t  This object
   * @return {Object}    Parent selector
   */
  function _parents(ps, t) {
    var el = t || this.selector;
    var ps = document.querySelector(componentSelectors) || document;
    var parents = [];
    var parent = el.parentNode;
    while (parent !== ps) {
      var o = parent;
      parents.push(o);
      parent = o.parentNode;
    }
    parents.push(ps);
    return parents;
  }

  /**
   * Hagrid parent root component
   * @param  {Object} el html element
   * @return {Object}    Parent element
   */
  function _parentComponent(el){
    var parent = el;
    var i = 0;
    var hasAttr = u(el).attr('hagrid-component');
    while (!hasAttr && i < 20){
      var o = parent || {};
      parent = o.parentNode;
      hasAttr = u(parent).attr('hagrid-component');
      i++;
    }
    return parent;
  }

  function getConfCompoment(el){
    var hasAttr = u(el).attr('hagrid-role');
    if(hasAttr){
      var hagridComponent = components[hasAttr];
      if(hagridComponent){
        return hagridComponent.component.set(el);
      }
    }
    return {};
  }

  /**
   * Get hagrid component
   * @param  {String} el Element string
   * @return {fn}    component function
   */
  function _getComponent(el){
    var getConf = getConfCompoment(el);
    var hagridTarget = u(el).attr('hagrid-target') || getConf.hagridTarget || u(el).attr('href'),
        parentTarget = (!!hagridTarget && hagridTarget !== '#') ? null : _parentComponent(el),
        hagridRole = getConf.hagridRole || u(el).attr('hagrid-role') || 'open',
        elTarget = (!!hagridTarget && hagridTarget !== '#') ? u(hagridTarget).first() :parentTarget,
        firstElement = elTarget,
        parentComponent =  _parentComponent(firstElement),
        componentType = u(firstElement).attr('hagrid-component') || u(parentComponent).attr('hagrid-component'),
        component = components[componentType][hagridRole];

    var _self = el;
    var _target = firstElement;

    component(_target, _self, parentComponent);
  }

  /**
   * Alert Hagrid Component
   * @return {null}
   */
  var alerts = function(){
    return {
        component: {
          tpl: function(title, message, option){
            return [
              '<div class="alert alert-show" id="alert1" hagrid-component="alert">',
                '<div class="alert-wrap">',
                  '<section class="alert-body">',
                    '<header class="alert-header">',
                      '<b class="alert-title">'+title+'</b>',
                    '</header>',
                    '<article class="alert-content">',
                      '<p>'+message+'</p>',
                    '</article>',
                    '<footer class="alert-footer">',
                      '<a href="#" hagrid-role="close">'+option.text+'</a>',
                    '</footer>',
                  '</section>',
                '</div>',
              '</div>'
            ].join('')
          },
          rootElement: '.alert',
        },
        open: function(el){
          u(el).addClass('alert-show');
        },
        close: function(el){
          u(el).removeClass('alert-show');
        },
        launch: function(options){
          var html = this.component.tpl('test', 'test', {});
          debugger;
          var el = document.createElement('div');
          el.innerHTML = html;
          while(el.firstChild) {
              document.body.appendChild(el.firstChild);
          }
          debugger;
          this.open(el);
        }
      }
  }

  /**
   * Modal Hagrid Component
   * @return {null}
   */
  var modals = function(){
    return {
        component: {
          tpl: function(title, message, option){
            return ['', ''].join('')
          },
          rootElement: '.modal',
        },
        open: function(el){
          u(el).addClass('modal-show');
        },
        close: function(el){
          u(el).removeClass('modal-show');
        },
        launch: function(options){}
      }
  }

  /**
   * Tooltip Hagrid Component
   * @return {null}
   */
  var tooltips = function(){
    return {
        component: {
          tpl: function(title, message, option){
            return ['', ''].join('')
          },
          rootElement: '.tooltip',
        },
        open: function(el){
          u(el).addClass('tooltip-show');
        },
        close: function(el){
          u(el).removeClass('tooltip-show');
        },
        launch: function(options){}
      }
  }

  /**
   * Tab Hagrid Component
   * @return {null}
   */
  var tabs = function(){
    return {
        component: {
          tpl: function(title, message, option){
            return ['', ''].join('')
          },
          rootElement: '.tab',
        },
        open: function($target, $seft, $parentComponent){
          var $childrenTabShow = u($parentComponent).find('.tab-show');
          $childrenTabShow.removeClass('tab-show');
          u($seft).addClass('tab-show');
          u($target).addClass('tab-show');
        },
        close: function($target, $seft){
          u($seft).removeClass('tab-show');
          u($target).removeClass('tab-show');
        },
        launch: function(options){}
      }
  }

  /**
   * Dropdown Hagrid Component
   * @return {null}
   */
  var dropdowns = function(){
    return {
        component: {
          tpl: function(title, message, option){
            return ['', ''].join('')
          },
          set: function(el){
            return {
              hagridTarget: u(el).siblings('.dropdown-menu').first(),
              hagridRole: 'toggle',
            }
          },
          rootElement: '.dropdown',
        },
        open: function($target, $seft, $parentComponent){
          u($parentComponent).addClass('open');
        },
        toggle: function($target, $seft, $parentComponent){
          u($parentComponent).toggleClass('open');
        },
        close: function($target, $seft){
          u($parentComponent).removeClass('open');
        },
        launch: function(options){}
      }
  }

  /**
   * Navbar Hagrid Component
   * @return {null}
   */
  var navbars = function(){
    return {
        component: {
          tpl: function(title, message, option){
            return ['', ''].join('')
          },
          set: function(el){
            return {
              hagridTarget: u(el).siblings('.navbar-menu').first(),
              hagridRole: 'toggle',
            }
          },
          rootElement: '.navbar',
        },
        open: function($target, $seft, $parentComponent){
          u($parentComponent).addClass('open');
        },
        toggle: function($target, $seft, $parentComponent){
          u($parentComponent).toggleClass('navbar-open');
        },
        close: function($target, $seft){
          u($parentComponent).removeClass('open');
        },
        launch: function(options){}
      }
  } 

  /**
   * Hagrid Components
   * @type {Object}
   */
  var components = {
    alert: alerts(),
    dropdown: dropdowns(),
    modal: modals(),
    navbar: navbars(),
    tab: tabs(),
    tooltip: tooltips(),
  };
  
  /**
   * Binding hagrid click event
   * @param  {null}
   * @return {null} 
   */
  var bodyEvent = (function(){
    var DOM = document || document.body ;
    DOM.addEventListener("click", function(e) {
      var el = e.target;
      var isHagridComponent = u(el).attr('hagrid-role');
      u('.open').each(function(el){
        u(el).removeClass('open')
      });
      if(isHagridComponent){
        if(e.target.tagName.toLowerCase() === 'a') e.preventDefault();
        _getComponent(el);        
      }
    });
  })();

  /**
   * Event body change
   * @param  {fn}
   * @return {null}
   */
  var bodyChange = (function(){
    document.body.addEventListener("change", function(e) {
      //console.log(e.target);
    });
  })();

  /**
   * Event body load
   * @param  {fn}
   * @return {null}
   */
  var bodyLoad = (function(){
     document.addEventListener("DOMContentLoaded", function(e) {
      //console.log(e.target);
      //console.log('Hagrid.js loaded!');
    });
  })();


  /**
   * Hagrid main function
   * @type {Object}
   */
  hagrid = {
    $: u,
    createEl : function addElement(htmlEl) { 
      if(!htmlEl) return 'Missing string html';
      var newDiv = document.createElement("div"); 
      newDiv.innerHTML = htmlEl;
      var currentDiv = document.getElementById("div1"); 
      document.body.insertBefore(newDiv, currentDiv); 
    },
    components: components
  }
  return hagrid;

})();
},{"umbrellajs":2}],2:[function(require,module,exports){
/* Umbrella JS 2.6.7 umbrellajs.com */
function ajax(a,b,c,d){c=c||function(){},b=b||{},b.body=b.body||{},b.method=(b.method||"GET").toUpperCase(),b.headers=b.headers||{},b.headers["X-Requested-With"]=b.headers["X-Requested-With"]||"XMLHttpRequest","undefined"!=typeof window.FormData&&b.body instanceof window.FormData||(b.headers["Content-Type"]=b.headers["Content-Type"]||"application/x-www-form-urlencoded"),/json/.test(b.headers["Content-Type"])&&(b.body=JSON.stringify(b.body)),"object"!=typeof b.body||b.body instanceof window.FormData||(b.body=u().param(b.body));var e=new window.XMLHttpRequest;u(e).on("error timeout abort",function(){c(new Error,null,e)}).on("load",function(){var a=/^(4|5)/.test(e.status)?new Error(e.status):null,b=parseJson(e.response)||e.response;return c(a,b,e)}),e.open(b.method,a);for(var f in b.headers)e.setRequestHeader(f,b.headers[f]);return d&&d(e),e.send(b.body),e}function parseJson(a){try{var b=JSON.parse(a);if(b&&"object"==typeof b)return b}catch(c){}return!1}var u=function(a,b){return this instanceof u?a instanceof u?a:("string"==typeof a&&(a=this.select(a,b)),a&&a.nodeName&&(a=[a]),void(this.nodes=this.slice(a))):new u(a,b)};u.prototype={get length(){return this.nodes.length}},u.prototype.nodes=[],u.prototype.addClass=function(){return this.eacharg(arguments,function(a,b){a.classList.add(b)})},u.prototype.adjacent=function(a,b,c){return"number"==typeof b&&(b=0===b?[]:new Array(b).join().split(",").map(Number.call,Number)),this.each(function(d,e){var f=document.createDocumentFragment();u(b||{}).map(function(b,c){var f="function"==typeof a?a.call(this,b,c,d,e):a;return"string"==typeof f?this.generate(f):u(f)}).each(function(a){this.isInPage(a)?f.appendChild(u(a).clone().first()):f.appendChild(a)}),c.call(this,d,f)})},u.prototype.after=function(a,b){return this.adjacent(a,b,function(a,b){a.parentNode.insertBefore(b,a.nextSibling)})},u.prototype.ajax=function(a,b){return this.handle("submit",function(c){ajax(u(this).attr("action"),{body:u(this).serialize(),method:u(this).attr("method")},a&&a.bind(this),b&&b.bind(this))})},u.prototype.append=function(a,b){return this.adjacent(a,b,function(a,b){a.appendChild(b)})},u.prototype.args=function(a,b,c){return"function"==typeof a&&(a=a(b,c)),"string"!=typeof a&&(a=this.slice(a).map(this.str(b,c))),a.toString().split(/[\s,]+/).filter(function(a){return a.length})},u.prototype.array=function(a){a=a;var b=this;return this.nodes.reduce(function(c,d,e){var f;return a?(f=a.call(b,d,e),f||(f=!1),"string"==typeof f&&(f=u(f)),f instanceof u&&(f=f.nodes)):f=d.innerHTML,c.concat(f!==!1?f:[])},[])},u.prototype.attr=function(a,b,c){if(c=c?"data-":"",void 0!==b){var d=a;a={},a[d]=b}return"object"==typeof a?this.each(function(b){for(var d in a)b.setAttribute(c+d,a[d])}):this.length?this.first().getAttribute(c+a):""},u.prototype.before=function(a,b){return this.adjacent(a,b,function(a,b){a.parentNode.insertBefore(b,a)})},u.prototype.children=function(a){return this.map(function(a){return this.slice(a.children)}).filter(a)},u.prototype.clone=function(){return this.map(function(a,b){var c=a.cloneNode(!0),d=this.getAll(c);return this.getAll(a).each(function(a,b){for(var c in this.mirror)this.mirror[c](a,d.nodes[b])}),c})},u.prototype.getAll=function(a){return u([a].concat(u("*",a).nodes))},u.prototype.mirror={},u.prototype.mirror.events=function(a,b){if(a._e)for(var c in a._e)a._e[c].forEach(function(a){u(b).on(c,a)})},u.prototype.mirror.select=function(a,b){u(a).is("select")&&(b.value=a.value)},u.prototype.mirror.textarea=function(a,b){u(a).is("textarea")&&(b.value=a.value)},u.prototype.closest=function(a){return this.map(function(b){do if(u(b).is(a))return b;while((b=b.parentNode)&&b!==document)})},u.prototype.data=function(a,b){return this.attr(a,b,!0)},u.prototype.each=function(a){return this.nodes.forEach(a.bind(this)),this},u.prototype.eacharg=function(a,b){return this.each(function(c,d){this.args(a,c,d).forEach(function(a){b.call(this,c,a)},this)})},u.prototype.filter=function(a){var b=function(b){return b.matches=b.matches||b.msMatchesSelector||b.webkitMatchesSelector,b.matches(a||"*")};return"function"==typeof a&&(b=a),a instanceof u&&(b=function(b){return a.nodes.indexOf(b)!==-1}),u(this.nodes.filter(b))},u.prototype.find=function(a){return this.map(function(b){return u(a||"*",b)})},u.prototype.first=function(){return this.nodes[0]||!1},u.prototype.generate=function(a){return/^\s*<t(h|r|d)/.test(a)?u(document.createElement("table")).html(a).children().nodes:/^\s*</.test(a)?u(document.createElement("div")).html(a).children().nodes:document.createTextNode(a)},u.prototype.handle=function(){var a=this.slice(arguments).map(function(a){return"function"==typeof a?function(b){b.preventDefault(),a.apply(this,arguments)}:a},this);return this.on.apply(this,a)},u.prototype.hasClass=function(){return this.is("."+this.args(arguments).join("."))},u.prototype.html=function(a){return void 0===a?this.first().innerHTML||"":this.each(function(b){b.innerHTML=a})},u.prototype.is=function(a){return this.filter(a).length>0},u.prototype.isInPage=function(a){return a!==document.body&&document.body.contains(a)},u.prototype.last=function(){return this.nodes[this.length-1]||!1},u.prototype.map=function(a){return a?u(this.array(a)).unique():this},u.prototype.not=function(a){return this.filter(function(b){return!u(b).is(a||!0)})},u.prototype.off=function(a){return this.eacharg(a,function(a,b){u(a._e?a._e[b]:[]).each(function(c){a.removeEventListener(b,c)})})},u.prototype.on=function(a,b,c){if("string"==typeof b){var d=b;b=function(a){var b=arguments;u(a.currentTarget).find(d).each(function(d){if(d===a.target||d.contains(a.target)){try{Object.defineProperty(a,"currentTarget",{get:function(){return d}})}catch(e){}c.apply(d,b)}})}}var e=function(a){return b.apply(this,[a].concat(a.detail||[]))};return this.eacharg(a,function(a,b){a.addEventListener(b,e),a._e=a._e||{},a._e[b]=a._e[b]||[],a._e[b].push(e)})},u.prototype.param=function(a){return Object.keys(a).map(function(b){return this.uri(b)+"="+this.uri(a[b])}.bind(this)).join("&")},u.prototype.parent=function(a){return this.map(function(a){return a.parentNode}).filter(a)},u.prototype.prepend=function(a,b){return this.adjacent(a,b,function(a,b){a.insertBefore(b,a.firstChild)})},u.prototype.remove=function(){return this.each(function(a){a.parentNode.removeChild(a)})},u.prototype.removeClass=function(){return this.eacharg(arguments,function(a,b){a.classList.remove(b)})},u.prototype.replace=function(a,b){var c=[];return this.adjacent(a,b,function(a,b){c=c.concat(this.slice(b.children)),a.parentNode.replaceChild(b,a)}),u(c)},u.prototype.scroll=function(){return this.first().scrollIntoView({behavior:"smooth"}),this},u.prototype.select=function(a,b){if(a=a.replace(/^\s*/,"").replace(/\s*$/,""),b)return this.select.byCss(a,b);for(var c in this.selectors)if(b=c.split("/"),new RegExp(b[1],b[2]).test(a))return this.selectors[c](a);return this.select.byCss(a)},u.prototype.select.byCss=function(a,b){return(b||document).querySelectorAll(a)},u.prototype.selectors={},u.prototype.selectors[/^\.[\w\-]+$/]=function(a){return document.getElementsByClassName(a.substring(1))},u.prototype.selectors[/^\w+$/]=function(a){return document.getElementsByTagName(a)},u.prototype.selectors[/^\#[\w\-]+$/]=function(a){return document.getElementById(a.substring(1))},u.prototype.selectors[/^</]=function(a){return u().generate(a)},u.prototype.serialize=function(){var a=this;return this.slice(this.first().elements).reduce(function(b,c){return!c.name||c.disabled||"file"===c.type?b:/(checkbox|radio)/.test(c.type)&&!c.checked?b:"select-multiple"===c.type?(u(c.options).each(function(d){d.selected&&(b+="&"+a.uri(c.name)+"="+a.uri(d.value))}),b):b+"&"+a.uri(c.name)+"="+a.uri(c.value)},"").slice(1)},u.prototype.siblings=function(a){return this.parent().children(a).not(this)},u.prototype.size=function(){return this.first().getBoundingClientRect()},u.prototype.slice=function(a){return a&&0!==a.length&&"string"!=typeof a&&"[object Function]"!==a.toString()?a.length?[].slice.call(a.nodes||a):[a]:[]},u.prototype.str=function(a,b){return function(c){return"function"==typeof c?c.call(this,a,b):c.toString()}},u.prototype.text=function(a){return void 0===a?this.first().textContent||"":this.each(function(b){b.textContent=a})},u.prototype.toggleClass=function(a,b){return!!b===b?this[b?"addClass":"removeClass"](a):this.eacharg(a,function(a,b){a.classList.toggle(b)})},u.prototype.trigger=function(a){var b=this.slice(arguments).slice(1);return this.eacharg(a,function(a,c){var d,e={bubbles:!0,cancelable:!0,detail:b};try{d=new window.CustomEvent(c,e)}catch(f){d=document.createEvent("CustomEvent"),d.initCustomEvent(c,!0,!0,b)}a.dispatchEvent(d)})},u.prototype.unique=function(){return u(this.nodes.reduce(function(a,b){var c=null!==b&&void 0!==b&&b!==!1;return c&&a.indexOf(b)===-1?a.concat(b):a},[]))},u.prototype.uri=function(a){return encodeURIComponent(a).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},u.prototype.wrap=function(a){function b(a){for(;a.firstElementChild;)a=a.firstElementChild;return u(a)}return this.map(function(c){return u(a).each(function(a){b(a).append(c.cloneNode(!0)),c.parentNode.replaceChild(a,c)})})},"object"==typeof module&&module.exports&&(module.exports={u:u,ajax:ajax});
},{}]},{},[1]);
