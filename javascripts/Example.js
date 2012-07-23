$(bc).on("init", function() {
  // double tap to go full screen
  // tap to close
  // scale to transform
  // three finger to close

  // one picture, double tap
  // on epicture to close
  // one picture to transform
  // pretty transform on change
  // many pictures

  var imgFullScreen = false,
      maxZoom = 5,
      minZoom = 1,
      scaleFactor = 1,
      previousScaleFactor = 1,
      originalImgWidth,
      originalImgHeight;

  bc.config.touchEventsEnabled = false;
  $("img").hammer().on("doubletap", function() {
    if (imgFullScreen) {      
      $(this).width( originalImgWidth );
      $(this).height( originalImgHeight );
    }
    else {
      originalImgWidth = $(this).width();
      originalImgHeight = $(this).height();

      $(this).width( window.innerWidth );
      $(this).height( window.innerHeight );
    }

    imgFullScreen = !imgFullScreen;
  })
  .on("transformstart", function(evt) {
      var touch1 = [evt.touches[0].x, evt.touches[0].y],
          touch2 = [evt.touches[1].x, evt.touches[1].y],
          originX = (touch1[0] + touch2[0]) / 2,
          originY = (touch1[1] + touch2[1]) / 2;

      $(this).css("-webkit-transform-origin", originX + "px " + originY + "px");
  })
  .on("transform", function(evt) {
    var transformCSS;

    scaleFactor = previousScaleFactor * evt.scale;
    scaleFactor = Math.max(minZoom, Math.min(scaleFactor, maxZoom));
    cssTransform = "scale(" + scaleFactor + ") rotate(" + evt.rotation + "deg)";
    $(this).css("-webkit-transform", cssTransform);    
    $("#debug").text("transform!");    
  })
  .on("transformend", function() {
    previousScaleFactor = scaleFactor;
  })
  .on("drag", function(evt) {
    $("#debug").text(evt.position);
  });
});
