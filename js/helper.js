/*
 * Based on code by Cameron Pittman
 * HTML field generalization by Ben Wiley
 * 2015
*/

var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span id="role">%data%</span>';

// begin bio fields
var HTMLcontactGeneric = '<li class="flex-item"><span class="yellow-text">%contact%</span><span class="white-text %class%"><a href="#" target="_blank">%data%</a></span></li>';
var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLskillsStart = '<h3 class="skillsH3">%data%</h3><ul class="flex-box skills"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%<span class="comma">,&nbsp;</span></span></li>';
// end bio fields

// begin general fields
var HTMLitemStart = '<div class="%type%-entry contentLimit"></div>';
var HTMLitemHeading = '<a href="#" target="_blank">%data%';
var HTMLitemTagline = ' - %data%</a>';
var HTMLitemDates = '<div class="date-text">%data%</div>';
var HTMLitemLocation = '<div class="location-text">%data%</div><br>';
var HTMLitemAttribute = '<p><b>%label%</b>: %data%</p>';
var HTMLitemDescription = '<p>%data%</p>';
var HTMLschoolCourses = '<p><b>Courses completed:</b></p><ul class="courses"></ul>';
var HTMLschoolCourse = '<li><a href="#" target="_blank">%data%</a></li>';
var HTMLexprHighlights = '<p><b>Highlights:</b></p><ul class="highlights"></ul>';
var HTMLexprHighlight = '<li>%data%</li>';
var HTMLprojectImage = '<img src="%data%">';
// end general fields

// begin map fields
var googleMap = '<div id="map" class="contentLimit"></div>';
var HTMLinfoWindow = '<a href="https://www.google.com/maps/place/%data%" target="_blank">%name%</a>';
// end map fields


/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable

var lastWindow; // the last (currently open) infoWindow

/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  // This next line makes `map` a new Google Map JavaScript Object and attaches it to
  // <div id="map">, which is appended as part of an exercise late in the course.
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    var data = octopus.getData();

    // adds the single location property from bio to the locations array
    locations.push(data.bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array
    for (var school in data.schools) {
      locations.push(data.schools[school].location);
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in data.jobs) {
      var loc = data.jobs[job].location;
      // add the location to the array if it's not already added
      if(loc && $.inArray(loc, locations) < 0)
        locations.push(data.jobs[job].location);
    }

    // removes undefined locations from list
    for (var i = 0; i < locations.length; i++) {
      if(!locations[i]) {
        locations.splice(i, 1);
      }
    }

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name,
      icon: "images/marker.png"
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: HTMLinfoWindow.replace("%data%", name).replace("%name%", name)
    });

    //console.log(name);
    //console.log(infoWindow.content);

    google.maps.event.addListener(marker, 'click', function() {
      if(lastWindow) {
        lastWindow.close();
        if(lastWindow === infoWindow)
          lastWindow = null;
        else {
          infoWindow.open(map,marker);
          lastWindow = infoWindow;
        }
      } else {
        infoWindow.open(map,marker);
        lastWindow = infoWindow;
      }
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };
      
      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/


// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  // Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});
