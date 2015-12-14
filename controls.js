
//play button
function playPause(btn,vid){
	var vid = document.getElementById(vid);
	if(vid.paused){
		vid.play();
		//btn.innerHTML = "Pause";
	} else {
		vid.pause();
		//btn.innerHTML = "Play";
	}
};

//click to mute:
$("#audio").click(function(){
  console.log("clicked");
       $("#video-background").prop('muted', !$("#video-background").prop('muted', true));
   });

// scroll to mute:
// var hdr = $("#section1").height();

// $(window).scroll(function() {
//   if( $(this).scrollTop() > hdr) {
//    $("#video-background").prop('muted', !$("#video-background").prop('muted'));
//   } 
// });

// Show or Hide:
function showHide(shID) {
   if (document.getElementById(shID)) {
      if (document.getElementById(shID+'-show').style.display != 'none') {
         document.getElementById(shID+'-show').style.display = 'none';
         document.getElementById(shID).style.display = 'block';
      }
      else {
         document.getElementById(shID+'-show').style.display = 'inline';
         document.getElementById(shID).style.display = 'none';
      }
   }
}

