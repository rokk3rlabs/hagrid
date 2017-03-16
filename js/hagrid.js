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
    var parent = el.parentNode;
    var i = 0;
    var hasAttr = u(el).attr('hagrid-component');
    while (!hasAttr || i > 10){
      var o = parent;
      parent = o.parentNode;
      hasAttr = u(parent).attr('hagrid-component');
      i++;
    }
    return parent;
  }

  /**
   * Get hagrid component
   * @param  {String} el Element string
   * @return {fn}    component function
   */
  function _getComponent(el){
    var hagridTarget = u(el).attr('hagrid-target') || u(el).attr('href'),
        parentTarget = (!!hagridTarget) ? null : _parentComponent(el),
        hagridRole = u(el).attr('hagrid-role') || 'open',
        elTarget = (!!hagridTarget) ? u(hagridTarget).first() :parentTarget,
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
   * Hagrid Components
   * @type {Object}
   */
  var components = {
    alert: alerts(),
    modal: modals(),
    tooltip: tooltips(),
    tab: tabs(),
  };
  
  /**
   * Binding hagrid click event
   * @param  {null}
   * @return {null} 
   */
  var bodyEvent = (function(){
    document.body.addEventListener("click", function(e) {
      var el = e.target;
      var isHagridComponent = u(el).attr('hagrid-role');
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
      console.log(e.target);
    });
  })();

  /**
   * Event body load
   * @param  {fn}
   * @return {null}
   */
  var bodyLoad = (function(){
     document.addEventListener("DOMContentLoaded", function(e) {
      console.log(e.target);
    });
  })();


  /**
   * Hagrid main function
   * @type {Object}
   */
  hagrid = {
    $: u,
    createEl : function addElement () { 
      var el = '<a href="" class="btn btn-inverse" hagrid-target="#alert3" hagrid-role="open">Launch alert</a>';
      var newDiv = document.createElement("div"); 
      newDiv.innerHTML = el;
      var currentDiv = document.getElementById("div1"); 
      document.body.insertBefore(newDiv, currentDiv); 
    },
    component: components
  }
  return hagrid;

})();