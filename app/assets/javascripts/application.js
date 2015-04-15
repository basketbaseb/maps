// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var canCreateMarker = true;

function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("pano0");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  }
}


/**
 * Context menu when right-clicking a marker
 * @constructor
 */
function ContextMenu() {
  this.div_ = document.createElement('div');
  this.div_.id = 'context-menu';
  this.div_.innerHTML = 'Delete';

  var menu = this;
  google.maps.event.addDomListener(this.div_, 'click', function() {
    menu.removeMarker();
  });
}

ContextMenu.prototype = new google.maps.OverlayView();

ContextMenu.prototype.onAdd = function() {
  var contextMenu = this;
  var map = this.getMap();
  this.getPanes().floatPane.appendChild(this.div_);

  // mousedown anywhere on the map except on the menu div will close the
  // menu.
  this.divListener_ = google.maps.event.addDomListener(map.getDiv(), 'mousedown', function(e) {
    if (e.target != contextMenu.div_) {
      contextMenu.close();
    }
  }, true);
};

ContextMenu.prototype.onRemove = function() {
  google.maps.event.removeListener(this.divListener_);
  this.div_.parentNode.removeChild(this.div_);

  // clean up
  this.set('position');
  this.set('marker');
};

ContextMenu.prototype.close = function() {
  this.setMap(null);
};

ContextMenu.prototype.draw = function() {
  var position = this.get('position');
  var projection = this.getProjection();

  if (!position || !projection) {
    return;
  }

  var point = projection.fromLatLngToDivPixel(position);
  this.div_.style.top = point.y + 'px';
  this.div_.style.left = point.x + 'px';
};

/**
 * Opens the menu at a Marker
 */
ContextMenu.prototype.open = function(map, marker) {
  this.set('position', marker.position);
  this.set('marker', marker);
  this.setMap(map);
  this.draw();
  canCreateMarker = false;
};

/**
 * Deletes the marker
 */
ContextMenu.prototype.removeMarker = function() {
  var marker = this.get('marker');
  // set map of marker to null removes it from the map
  marker.setMap(null);
  // if there is a pano for this marker
  if(marker.pano) {
    // get the div element and remove it
    elem = document.getElementById(marker.pano.myDiv);
    elem.remove();
    // remove the pano from the array
    panArray.splice(panArray.indexOf(marker.pano), 1);

    // if that is the last pano, hide the image-container
    // less than or equal to 1 to take stretch element into account
    if($("#image-container").children().length <= 1) {
      // animate it back off screen
      // for some reason this doesn't work
      $("#image-container").animate({ "bottom" : "-100px" });
      $("#image-container").toggle();
    }
  }
  // remove the marker from the array
  markerArray.splice(markerArray.indexOf(marker));

  // close the context menu
  this.close();
};
