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

      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    document.getElementById('myModalexample').classList.remove('active');
  }

  function pushAddChild() {
    var video = document.getElementById('snapshot');
    var canvas = document.getElementById('snapshot-still');
    var take = document.getElementById('snapshot-take')
    var childMediaStream = null;

    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    canvas.style.display = "none";

    navigator.getUserMedia({video:true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      childMediaStream = stream;
    }, function() {});

    take.addEventListener('click', function() {
      canvas
        .getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.style.display = "block";
      video.style.display = "none";
    });
  }

  function pushChecklist() {
    // sets the contents to take up the entire width/height of the page

    $(".btn").click(function() {
        $(this).toggleClass("btn-outlined");
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
      case 'checklist':
        pushChecklist();
        break;
    }
  }

  window.addEventListener('push', push);
  window.addEventListener('DOMContentLoaded', push);

}());
