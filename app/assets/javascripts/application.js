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
  var mapdiv = document.getElementById("pano");

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
  marker.setMap(null);
  this.close();
};

function sendMarkerToYelp(map){
searchYelp(map,markerPosition);
}

function searchYelp(map, markerLatLng){
//var searchTerm = $('#address').val();
var searchTerm = "food";
var coordinates = {latitude: markerLatLng.D.toFixed(5), longitude: markerLatLng.k.toFixed(5)};
// post to the search with the search term, take the response data
// and process it
$.post('/search', { term: searchTerm, coordinates: coordinates }, function(data) {
// iterate through each business in the response capture the data
// within a closure.
data['businesses'].forEach(function(business, index) {
console.log(business.name);
//capture(index, map, business);
});
});
}