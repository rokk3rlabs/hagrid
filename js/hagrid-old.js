'use strict';
window.hagrid = (function(){

  var $DOM;

  var components = [
    {
      el: 'dropdowns',
      parent: '.dropdown',
      trigger: '.btn-dropdown'
    },
    {
      el: 'radios',
      parent: '.radio',
      trigger: 'input[type="radio"]'
    },
  ];

  var componentSelectors = '.dropdown';
  /*for(var i = 0; i < components.length; i++){
    var  component = components[i];
    var lastSelector = (i == components.length - 1);
    var end = (lastSelector) ? '' : ', ';
    componentSelectors +=  component.parent + end
  }*/


  var query = function(s){
    return document.querySelector(s);
  }

  var queryAll = function(s){
    return document.querySelectorAll(s);
  };

  var addClass = function(c,s){
    if (this.selector.classList){
      this.selector.classList.add(c);
    }else{
      this.selector.className += ' ' + c;
    }
  }

  var parents = function(ps, t) {

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

  var toggleClass = function(c,t){
    var el = t || this.selector;
    return el.classList.toggle('active');
  }

  var children = function(s, t){
    var el = t || this.selector;
    return el.querySelector(':scope > '+ s)
  }

  function addListenerActive(){
    var els = queryAll(componentSelectors);
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var trigger = children('[hagrid-trigger]', el)
      if(!trigger) return;
      trigger.hagridParent = el;
      trigger.addEventListener('click', function(e) {
        if(e.target.tagName.toLowerCase() === 'a') e.preventDefault();
        var self = this;
        var selfParent = self.hagridParent
        if(self) toggleClass('active', self);
        if(selfParent) toggleClass('active', selfParent);
      });
    }
  };


  var hagrid = {
    components: {
      dropdowns: function(){
        var dropdowns = queryAll('.dropdown');
        return hagrid.dropdowns = dropdowns;
      },
      radios: function(){
        var dropdowns = queryAll('.input-radio');
        return hagrid.radios = dropdowns;
      },
      load: function(){
        addListenerActive();
      }
    }
  }

  hagrid.components.load();
  return hagrid

}());