
// Version 0.4.0

$.fn.zooomin = function(op) {

  $(this).each(function(){
    var self = this;

    var options = {
      scrollClose:    true,
      video:          false,
      videoWidth:     1920,
      videoHeight:    1080,
      videoAutoplay:  false
    };

    options = $.extend(options, op);
    new zooomin($(this), options);
  });
};


function zooomin(element, options) {
  var self = this;

  var obj = new Image();

  var element = this.build(element);
  this.options = options;
  this.objContainer = this.elm.find('.z-c');



  if(this.elm.find('img').attr('class')){
    self.el = this.elm.find('img');
    obj.src = this.elm.find('img').attr("src");
    obj.onload = function()
    {
      self.init(obj);
    };
  }else if(this.elm.find('video').attr('class')){
    self.options.video = true;
    self.el = this.elm.find('video');

    this.objContainer.find('video').attr('src');
    console.log(obj)
    self.init(obj);
  }

}

zooomin.prototype = {

  init: function(obj) {
    var self = this;

    this.setStartWidth();
    if(this.el.height() !== 0){
      self.elm.css({"height":this.el.height()+"px"});
    }
    this.resizing();

    this.elm.on('click', function(e){
      self.zooomin(obj);
      self.resizing();
    });
  },



  destroy: function() {
    //will create something here later
  },



  zooomin: function(obj) {
    var self = this;

    if(this.objContainer.hasClass('zooomin')){
      self.closeZoomin();
    } else {
      self.openZooomin(obj);
    }

  },



  build: function(element){
    this.elm = element.wrap("<div class='zooomin'><div class='z-c'></div></div>").parent().parent();
  },



  scrollClose: function() {
    var self = this;
    var previous = 10;
    var pos = $(window).scrollTop();
    var safe = 50;

    $(window).scroll(function() {

      if(self.objContainer.hasClass('zooomin')){
        var current = $(this).scrollTop();

        if(current > pos + safe || current < pos - safe){
          self.closeZoomin();
        }

        previous = current;
      }
    });
  },



  closeZoomin: function(){
    var self = this;
    self.objContainer.removeAttr('style');
    self.objContainer.addClass('zooomin-animating');


    setTimeout(function(){
      self.objContainer.removeClass('zooomin-animating');
    },400);
    self.objContainer.removeClass('zooomin');

    if(self.options.videoAutoplay){
      self.el[0].pause();
    }
    $('body').removeClass('zooomin-noscroll');
  },



  openZooomin: function(obj){
    var self = this;

    if(self.options.videoAutoplay){
      self.el[0].play();
    }

    if(self.options.video){
      var objH = self.options.videoHeight;
      var objW = self.options.videoWidth;
    }else{
      var objW = obj.naturalWidth;
      var objH = obj.naturalHeight;
    }

    var ratio = objH / objW;


    if (objH > $(window).height()){
      objH = $(window).height() - 50;
      objW = objH / ratio;
    }

    if (objW > $(window).width()){
      objW = $(window).width() - 50;
      objH = objW * ratio;
    }

    var top = $(window).scrollTop() - this.elm.offset().top + (($(window).height() - objH)/2) + "px";

    var left = this.elm.offset().left - (objW/2 - $(window).width()/2) + "px";
    this.elm.css({"height":this.el.height()+"px"});
    self.objContainer.css({
      'height':objH+"px",
      'width':objW+"px",
      "left":"-"+this.elm.offset().left - (objW/2 - $(window).width()/2) +"px",
      "top": top
    });

    if(self.options.scrollClose){
      this.scrollClose();
    }else{
      $('body').addClass('zooomin-noscroll');
    }


    self.objContainer.addClass('zooomin');
  },



  noscroll: function() {
    window.scrollTo( 0, 0 );
  },



  openActions: function(){

  },



  setStartWidth: function() {
    this.startHeight = this.el.height();
    this.startWidth = this.el.width();
  },



  resizing: function() {
    var self = this;
    $( window ).resize(function() {
      self.setStartWidth();
      self.elm.css({"height":self.startHeight+"px"});
    });
  }

};
