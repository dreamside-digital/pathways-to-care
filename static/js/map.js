
/* --------------------------------------------
Google Map
-------------------------------------------- */

var cities = [
    {
        title: "Ottawa",
        lat: "45.41117",
        lng: "-75.69812",
    },
    {
        title: "Toronto",
        lat: "43.741667",
        lng: "-79.373333",
    },
    {
        title: "Durham Region",
        lat: "44.183333",
        lng: "-80.816667",
    },
    {
        title: "Kitchener-Waterloo",
        lat: "43.418611",
        lng: "-80.472778",
    },
    {
        title: "London",
        lat: "42.983611",
        lng: "-81.249722",
    },
    {
        title: "Windsor",
        lat: "42.283333",
        lng: "-83",
    },
]

var mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]


window.onload = MapLoadScript;
function GmapInit() {
      Gmap = $('.map-canvas');
      Gmap.each(function() {
        var $this           = $(this),
            lat             = '',
            lng             = '',
            zoom            = 12,
            scrollwheel     = false,
            zoomcontrol     = true,
            draggable       = true,
            mapType         = google.maps.MapTypeId.ROADMAP,
            title           = '',
            contentString   = '',
            dataLat         = $this.data('lat'),
            dataLng         = $this.data('lng'),
            dataZoom        = $this.data('zoom'),
            dataType        = $this.data('type'),
            dataScrollwheel = $this.data('scrollwheel'),
            dataZoomcontrol = $this.data('zoomcontrol'),
            dataTitle       = $this.data('title'),
            dataContent     = $this.data('content');

        if( dataZoom !== undefined && dataZoom !== false ) {
            zoom = parseFloat(dataZoom);
        }
        if( dataLat !== undefined && dataLat !== false ) {
            lat = parseFloat(dataLat);
        }
        if( dataLng !== undefined && dataLng !== false ) {
            lng = parseFloat(dataLng);
        }
        if( dataScrollwheel !== undefined && dataScrollwheel !== null ) {
            scrollwheel = dataScrollwheel;
        }
        if( dataZoomcontrol !== undefined && dataZoomcontrol !== null ) {
            zoomcontrol = dataZoomcontrol;
        }
        if( dataType !== undefined && dataType !== false ) {
            if( dataType == 'satellite' ) {
                mapType = google.maps.MapTypeId.SATELLITE;
            } else if( dataType == 'hybrid' ) {
                mapType = google.maps.MapTypeId.HYBRID;
            } else if( dataType == 'terrain' ) {
                mapType = google.maps.MapTypeId.TERRAIN;
            }
        }
        if( dataTitle !== undefined && dataTitle !== false ) {
            title = dataTitle;
        }
        if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
            draggable = false;
        }

        var mapOptions = {
          zoom        : zoom,
          scrollwheel : scrollwheel,
          zoomControl : zoomcontrol,
          draggable   : draggable,
          center      : new google.maps.LatLng(lat, lng),
          mapTypeId   : mapType
        };
        var map = new google.maps.Map($this[0], mapOptions);

        // var image = 'images/marker.png';
        // if( dataContent !== undefined && dataContent !== false ) {
        //     contentString = '<div class="map-data">' + '<h6>' + title + '</h6>' + '<div class="map-content">' + dataContent + '</div>' + '</div>';
        // }
        // var infowindow = new google.maps.InfoWindow({
        //     content: contentString
        // });

        var icon = {
            path: "M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z",
            fillColor: '#933238',
            fillOpacity: 1,
            anchor: new google.maps.Point(0,0),
            strokeWeight: 0,
            scale: 2
        }


        cities.forEach(function(city) {
            var marker = new google.maps.Marker({
              position : new google.maps.LatLng(city.lat, city.lng),
              map      : map,
              icon     : icon,
              title    : city.title
            });
        })

        // if( dataContent !== undefined && dataContent !== false ) {
        //     google.maps.event.addListener(marker, 'click', function() {
        //         infowindow.open(map,marker);
        //     });
        // }

        map.setOptions({styles: mapStyles});
     });
}

function MapLoadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    GmapInit();
    document.body.appendChild(script);
}

