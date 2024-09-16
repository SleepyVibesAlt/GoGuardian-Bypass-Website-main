
  function playYoutube() {
    var textboxValue = document.getElementById("textbox").value;
    var videoContainer = document.getElementById("videoContainer");
    var youtubePlayer = document.getElementById("youtubePlayer");

    // Check if the entered value is a valid YouTube link
    var regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9\-_]+)/;
    var match = textboxValue.match(regex);

    if (match) {
      var videoId = match[1];
      var embedUrl = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0&fs=1&controls=1"; // Added 'controls=1' to display video controls

      youtubePlayer.setAttribute("src", embedUrl);
      videoContainer.style.display = "block";
    } else {
      alert("Invalid YouTube link!"); // Improved the error message
    }
  }