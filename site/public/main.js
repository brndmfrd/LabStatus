$(function() {
  var FADE_TIME = 150; // ms
  var $messages = $('.messages'); // Messages area
  var socket = io();
	
  // Log a message
  function log (message, options) {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  
  
  function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }
  
  
  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('update', function (data) {
    x = data.stationNumber;
    y = data.stationStatus;
    z = document.getElementById("A" + data.stationNumber);
    //log(x);
    //log(y);

    if(y == 'IN'){
        z.style.background = 'grey';
    }
    if(y == 'OUT'){
        z.style.background = 'green';
    }
  });


});
