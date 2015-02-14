(function() {

  navigator.getUserMedia = (
    navigator.getUserMedia || 
    navigator.webkitGetUserMedia
  );

  var indexMediaStream = null;

  function pushIndex() {
    var video = document.getElementById("snapshot");
    
    navigator.getUserMedia({video:true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      indexMediaStream = stream;
    }, function() {});
  }

  function pushAddMother() {
    var video = document.getElementById("snapshot");
    var canvas = document.getElementById("snapshot-still");

    if (indexMediaStream && canvas) {
      var ctx = canvas.getContext('2d');

      canvas.style.width = video.clientWidth + "px";
      canvas.style.height = video.clientHeight + "px";

      ctx.drawImage(
        video,
        0, 
        0, 
        video.clientWidth, 
        video.clientHeight
      );
    }

    document.getElementById('myModalexample').classList.remove('active');
  }

  function pushAddChild() {
    var video = document.getElementById('snapshot');
    var canvas = document.getElementById('snapshot-still');
    var take = document.getElementById('snapshot-take')
    var childMediaStream = null;

    canvas.style.width = video.clientWidth + "px";
    canvas.style.height = video.clientHeight + "px";
    canvas.style.display = "none";

    navigator.getUserMedia({video:true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      childMediaStream = stream;
    }, function() {});

    take.addEventListener('click', function() {
      canvas.getContext('2d').drawImage(
        video,
        0, 
        0, 
        video.clientWidth, 
        video.clientHeight
      );

      canvas.style.display = "block";
      video.style.display = "none";
    });
  }

  function push() {
    var wrappers = document.querySelector('[page]');
    var page = wrappers && wrappers.getAttribute('page');

    switch (page) {
      case 'index':
        pushIndex();
        break;
      case 'addMother':
        pushAddMother();
        break;
      case 'addChild':
        pushAddChild();
        break;
    }
  }

  window.addEventListener('push', push);
  window.addEventListener('DOMContentLoaded', push);

}());
