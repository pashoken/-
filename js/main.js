$(document).ready(function() {
  $.fn.rotationInfo = function() {
  var el = $(this),
      tr = el.css("-webkit-transform") || el.css("-moz-transform") || el.css("-ms-transform") || el.css("-o-transform") || '',
      info = {rad: 0, deg: 0};
  if (tr = tr.match('matrix\\((.*)\\)')) {
      tr = tr[1].split(',');
      if(typeof tr[0] != 'undefined' && typeof tr[1] != 'undefined') {
          info.rad = Math.atan2(tr[1], tr[0]);
          info.deg = parseFloat((info.rad * 180 / Math.PI).toFixed(1));
      }
  }
  return info;
  };
  $('.spotlight').css('background-image', 'radial-gradient(circle at '+ (50) +'% '+ (50) +'%, transparent 30px, rgba(0, 0, 0, 0.99) 150px)')
  $('.lamp').each(function(i){
    var position = $(this).children('img').position();
    LampBot = position.top,
    LampRight = position.left,
    LampCentX = LampRight + $(this).children('img').width()/2,
    LampCentY = LampBot + $(this).children('img').height()/2,
    LampCentBot = LampCentY + $(this).children('img').height()/2;
  });
  $('.left img').css('transform', 'rotate(60deg)');
  $('.center img').css('transform', 'rotate(30deg)');
  $('.right img').css('transform', 'rotate(300deg)');
  $('.lamp').each(function(i){
    $('.circle'+ i).css({
      left: LampCentX,
      top: LampCentBot,
      'transform-origin': 'center ' + (-LampCentY) + 'px',
      transform: 'rotate(' + $(this).children('img').rotationInfo().deg + 'deg)',
      visibility: 'hidden'
    });
    var position = $(".circle" + i).position(),
    dotX = position.left,
    dotY = position.top;
    $('.svg' + i).css({
      left: dotX,
      top: dotY,
    });
  });


  $('.lamp img').click(function() {
    let check = $(this).attr('id')
    ch = $(this).attr('name')
    if(check == 'off'){
      $(this).css({
          transition: '1.5s ease-in-out',
          filter: 'brightness(100%) drop-shadow(0px 20px 100px #995D0A)'
        });
        if(ch == 'left'){
          $('.modal_left').delay(3000).slideToggle(1000);
          $('#path0').delay(500).animate({
            'stroke-dashoffset': 800,
          }, 3000);
        }
        if(ch == 'center'){
          $('#path1').delay(500).animate({
            'stroke-dashoffset': 0,
          }, 3000);
          $('.modal_center').delay(3000).slideToggle(800);
          $('.modal_center img').delay(3500).animate({
            opacity: 0.9
          })
        }
        if(ch == 'right'){
          $('.modal_right').delay(3000).slideToggle(800);
          $('#path2').delay(500).animate({
            'stroke-dashoffset': 800,
          }, 3000);
        }
        $(this).attr('id', 'on');
    } else if(check == 'on'){
        if(ch == 'left'){
          $('.modal_left').slideToggle(800);
          $('#path0').delay(500).animate({
            'stroke-dashoffset': 2000,
          }, 3000);
        }
        if(ch == 'center'){
          $('.modal_center').slideToggle(800);
          $('#path1').delay(500).animate({
            'stroke-dashoffset': 2000,
          }, 3000);
        }
        if(ch == 'right'){
          $('.modal_right').slideToggle(800);
          $('#path2').delay(500).animate({
            'stroke-dashoffset': 2000,
          }, 3000);
        }
        setTimeout(() => {
          $(this).css({
            transition: '1.5s ease-in-out',
            filter: 'brightness(10%) drop-shadow(0px 0px 0px black)'
          });
        }, "3000")
        $(this).attr('id', 'off');
    }
  });
  $(window).mousemove(function(e){
    let w = $('.spotlight').innerWidth(),
    h = $('.spotlight').innerHeight(),
    t = e.pageY - $('.spotlight').offset().top,
    l = e.pageX - $('.spotlight').offset().left;
    $('.spotlight').css('background-image', 'radial-gradient(circle at '+ (l / w * 100) +'% '+ (t / h * 100) +'%, transparent 30px, rgba(0, 0, 0, 0.99) 130px)');
  });

});

//$.each($('.lamp img'),function(index,element) {
//  $(element).css({
//    filter: 'brightness(100%) drop-shadow(0px 20px 100px #995D0A)'
//  });
//  $(element).attr('id', 'on')
//});
