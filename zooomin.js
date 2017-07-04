
// Version 0.3.2

$.fn.zooomin = function(op) {

  $(this).each(function(){
    var self = this;
    var defaults = {
      scrollClose: true
    };
    options = $.extend(defaults, op);
    new zooomin($(this), options);
  });
};


function zooomin(element, options) {
  var self = this;
  var image = new Image();

  this.options = options;
  this.elm = element;
  this.caption = this.elm.find('.zooomin-image-container .zooomin-caption');
  this.imageContainer = this.elm.find('.zooomin-image-container');

  self.img = this.elm.find('img');
  image.src = this.elm.find('img').attr("src");
  image.onload = function()
  {
    self.init(image);
  };
}

zooomin.prototype = {

  init: function(image) {
    var self = this;

    this.setStartWidth();
    if(this.img.height() !== 0){
      self.elm.css({"height":this.img.height()+"px"});
    }
    this.resizing();

    this.elm.on('click', function(e){
      self.zooomin(image);
      self.resizing();
    });
  },

  destroy: function() {
    //will create something here later
  },

  zooomin: function(image) {
    var self = this;


    if(this.imageContainer.hasClass('zooomin')){
      self.imageContainer.removeAttr('style');
      self.imageContainer.addClass('zooomin-animating');
      self.caption.removeClass('viewable');

      $('body').removeClass('zooomin-noscroll');
      setTimeout(function(){
        self.imageContainer.removeClass('zooomin-animating');
      },400);
      self.imageContainer.removeClass('zooomin');

    } else {

      var imageW = image.naturalWidth;
      var imageH = image.naturalHeight;
      var ratio = imageH / imageW;


      if (imageH > $(window).height()){
        imageH = $(window).height() - 50;
        imageW = imageH / ratio;
      }

      if (imageW > $(window).width()){
        imageW = $(window).width() - 50;
        imageH = imageW * ratio;
      }

      var top = $(window).scrollTop() - this.elm.offset().top + (($(window).height() - imageH)/2) + "px";

      var left = this.elm.offset().left - (imageW/2 - $(window).width()/2) + "px";
      this.elm.css({"height":this.img.height()+"px"});
      self.imageContainer.css({
        'height':imageH+"px",
        'width':imageW+"px",
        "left":"-"+this.elm.offset().left - (imageW/2 - $(window).width()/2) +"px",
        "top": top
      });


      self.captions();

      if(self.options.scrollClose){
        this.scrollClose();
      }else{
        $('body').addClass('zooomin-noscroll');
      }


      self.imageContainer.addClass('zooomin');

    }

  },

  scrollClose: function() {
    var self = this;
    var previous = 10;
    var pos = $(window).scrollTop();
    var safe = 50;

    $(window).scroll(function() {

      if(self.imageContainer.hasClass('zooomin')){
        var current = $(this).scrollTop();

        if(current > pos + safe || current < pos - safe){
          self.imageContainer.removeAttr('style');
          self.imageContainer.addClass('zooomin-animating');

          self.caption.removeClass('viewable');

          setTimeout(function(){
            self.imageContainer.removeClass('zooomin-animating');
          },400);
          self.imageContainer.removeClass('zooomin');
        }

        previous = current;
      }
    });
  },

  noscroll: function() {
    window.scrollTo( 0, 0 );
  },

  captions: function() {

    var self = this;
    setTimeout(function(){
      self.caption.addClass('viewable');
    },400);


  },

  setStartWidth: function() {
    this.startHeight = this.img.height();
    this.startWidth = this.img.width();
  },

  resizing: function() {
    var self = this;
    $( window ).resize(function() {
      self.setStartWidth();
      self.elm.css({"height":self.startHeight+"px"});
    });
  }

};
