$(function() {
  var FADE_TIME = 150; // ms
  var $messages = $('.messages'); // Messages area
  var socket = io();
	/*
  var div = document.getElementById( 'div_id' );
  div.onmouseover = function() {
    this.style.backgroundColor = 'green';
    var h2s = this.getElementsByTagName( 'h2' );
    h2s[0].style.backgroundColor = 'blue';
  };
	*/
	
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
  
  

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {
    connected = true;
    // Display the welcome message
    var message = "Welcome to Lab Status – " + data;
    log(message, {
      prepend: true
    });
  });
  
  
  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    //log(data + ' joined');
	document.getElementById("A00").style.background = 'green';
  });


});
