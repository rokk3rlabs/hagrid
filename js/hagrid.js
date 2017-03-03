'use strict';

window.hagrid = (function(){
  var $q = require('sizzle');
  //var $q = require('html.js');
  var hagrid;


  function _addClass(clss,el){
    if (el.classList){
      el.classList.add(clss);
    }else{
      el.className += ' ' + clss;
    }
  }

  function _removeClass(clss, el){
    return el.classList.remove(clss);
  }

  function _toggleClass(clss, el){
    var el = el || this.selector;
    return el.classList.toggle('active');
  }

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

  function _parentComponent(el){
    var parent = el.parentNode;
    var i = 0;
    var hasAttr = _hasAttr(parent, 'hagrid-component');
    while (!hasAttr || i > 10){
      var o = parent;
      parent = o.parentNode;
      hasAttr = _hasAttr(parent, 'hagrid-component');
      i++;
    }
    return parent;
  }

  function _getComponent(el){
    var hagridTarget = _getAttr(el, 'hagrid-target');
    var parentTarget = (!!hagridTarget) ? null : _parentComponent(el);
    var hagridRole = _getAttr(el, 'hagrid-role');
    var elTarget = (!!hagridTarget) ? $q(hagridTarget)[0] :parentTarget;
    var firstElement = elTarget;
    var componentType = _getAttr(firstElement, 'hagrid-component');
    var component = components[componentType][hagridRole];
    component(firstElement);
  }

  function _getAttr(el, attr){
    return el.getAttribute(attr);
  }

  function _getAttrs(el){
    return el.attributes;
  }

  function _hasAttr(el, attr){
    var el = el || {};
    var listAttr =  el.attributes || [];
    var exist = false;
    Array.prototype.slice.call(listAttr).forEach(function(i) {
      if(i.name == attr){
        exist = true;
      }
    });
    return exist;
  }

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
          _addClass('alert-show', el);
        },
        close: function(el){
          _removeClass('alert-show', el);
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

  var components = {
    alert: alerts()
  };

  
  var bodyEvent = (function(){
    document.body.addEventListener("click", function(e) {
      if(e.target.tagName.toLowerCase() === 'a') e.preventDefault();
      var el = e.target;
      var isHagridComponent = _hasAttr(el, 'hagrid-role');
      if(isHagridComponent){
        _getComponent(el);        
      }
    });
  })();

  var bodyChange = (function(){
    document.body.addEventListener("change", function(e) {
      console.log(e.target);
    });
  })();

  var bodyLoad = (function(){
     document.addEventListener("DOMContentLoaded", function(event) {
      console.log("DOM fully loaded and parsed 2");
    });
  })();


  hagrid = {
    createEl : function addElement () { 
      var el = '<a href="" class="btn btn-inverse" hagrid-target="#alert3" hagrid-role="open">Launch alert</a>';
      var newDiv = document.createElement("div"); 
      newDiv.innerHTML = el;
      var currentDiv = document.getElementById("div1"); 
      document.body.insertBefore(newDiv, currentDiv); 
    },
    alerts: alerts

  }

  return hagrid;

})();