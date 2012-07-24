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

  // background music can't touch this
  // css class on drag to bump shadow
  // border?
  var imgFullScreen = false,
      maxZoom = 5,
      minZoom = 1,
      scaleFactor = 1,
      previousScaleFactor = 1,
      originalImgWidth,
      originalImgHeight,
      lastDragX = 0,
      lastDragY = 0;

  $(".settings").bind("tap", function() {
    $("#card").toggleClass("flipped");
  });

  $("input").on("click", function() {
    this.checked ? $("#player").play()  : $("#player").pause();
  });

  bc.config.touchEventsEnabled = false;
  $(".imgContainer").hammer({
    prevent_default: true
  }).on("doubletap", function() {
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
      $(this).css("-webkit-transform-origin", evt.position.x + "px " + evt.position.y + "px");
  })
  .on("transform", function(evt) {
    var transformCSS;

    scaleFactor = previousScaleFactor * evt.scale;
    scaleFactor = Math.max(minZoom, Math.min(scaleFactor, maxZoom));
    cssTransform = "scale(" + scaleFactor + ") rotate(" + evt.rotation + "deg)";
    $(this).css("-webkit-transform", cssTransform);   

  })
  .on("transformend", function() {
    previousScaleFactor = scaleFactor;
  })
  .on("dragstart", function(evt) {
    lastDragX = evt.position.x;
    lastDragY = evt.position.y;
    $(".imgContainer").removeClass("top");
    $(this).addClass("dragging top");
  })
  .on("drag", function(evt) {
    var deltaX = (evt.position.x - lastDragX),
        deltaY = (evt.position.y - lastDragY),
        left = $(this).offset().left + deltaX,
        top = $(this).offset().top + deltaY;

    lastDragX = evt.position.x;
    lastDragY = evt.position.y;
    $(this).offset({left: left, top: top});
  })
  .on("dragend", function() {
    $(this).removeClass("dragging");
  });
});