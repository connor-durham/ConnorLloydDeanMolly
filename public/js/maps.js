let webSite;
let address;
let phone;
let breweryName;
let image;

function infoSender() {
     
  var favorite = {
    beerName: beer,
    breweryName: breweryName,
    webSite: webSite,
    image: image
  };

  console.log(favorite)

  $.post("/api/favorites", favorite);

};


$("#submit-search").on("click", function(e) {

  e.preventDefault();

  initMap()

  // eslint-disable-next-line prettier/prettier
  var beer = $("#search-bar").val().trim();

  var queryUrl =
    // eslint-disable-next-line prettier/prettier
    "https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/beers?name="+beer+"&withBreweries=Y&key=7aed8b39d23007c4acc04ff75f4a0d6e";

  console.log(beer);

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response.data[0].breweries[0].locations[0]);
    lat = response.data[0].breweries[0].locations[0].latitude;
    lon = response.data[0].breweries[0].locations[0].longitude;

    webSite = response.data[0].breweries[0].locations[0].website;
    address = response.data[0].breweries[0].locations[0].streetAddress;
    phone = response.data[0].breweries[0].locations[0].phone;
    breweryName = response.data[0].breweries[0].locations[0].name;
    image = response.data[0].breweries[0].locations[0].name;
    var myLatlng = new google.maps.LatLng(lat,lon);


    globalScope = response.data[0].breweries[0].locations[0].name;
    map.setCenter({lat, lng: lon}); 

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: globalScope
    });

    marker.setMap(map);

    var contentString = `<div id="content">
                            <div id="siteNotice">
                                <h2 id="firstHeading" class="firstHeading">${breweryName}</h2><i class="material-icons" id="favoriteButton" onclick="M.toast({html: 'Added to favorites'}); infoSender">favorite</i>  
                                <div id="bodyContent">
                                  <p>This brewery makes: ${beer}</p>
                                  <p><a href=${webSite}>Click here to visit their website</a></p>
                                  <p> Address: ${address} </p>  
                                  <p> Phone Number: ${phone} </p>
                                </div>
                            </div>
                          </div>`

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });


    $("#search-bar").empty()
      
        
  });
});

// var axios = require("axios");

// $("#submit-search").on("click", function(e) {
//   e.preventDefault();

//   axios
//     .get(
//       "https://sandbox-api.brewerydb.com/v2/beers?key=7aed8b39d23007c4acc04ff75f4a0d6e"
//     )
//     .then(function(response) {
//       // If the axios was successful...
//       // Then log the body from the site!
//       console.log(response.data);
//     })
//     .catch(function(error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an object that comes back with details pertaining to the error that occurred.
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//       }
//       console.log(error.config);
//     });
// });
