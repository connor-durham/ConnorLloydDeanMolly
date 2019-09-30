// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

$("#submit-search").on("click", function(e) {
  e.preventDefault();

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

    let LatLon = {lat: lat, lon: lon}

    globalScope = response.data[0].breweries[0].locations[0].name;
    map.setCenter({lat, lng: lon}); 

    var marker = new google.maps.Marker({
      position: LatLon,
      map: map,
      title: globalScope
    });

    marker.setMap(map);


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
