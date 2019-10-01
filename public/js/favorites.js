$(document).ready(function() {
  // Our new favorites will go inside the favoritesC$favoritesContainer
  var $favoritesContainer = $(".collection");
  // Adding event listeners for deleting, editing, and adding favorites
  $(document).on("click", "a.delete", deleteFavorite);

  // Our initial favorites array
  var favorites = [];

  // Getting favorites from database when page loads
  getFavorites();

  // This function resets the favorites displayed with new favorites from the database
  function initializeRows() {
    $favoritesContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < favorites.length; i++) {
      rowsToAdd.push(createNewRow(favorites[i]));
    }
    $favoritesContainer.prepend(rowsToAdd);
  }

  // This function grabs favorites from the database and updates the view
  function getFavorites() {
    $.get("/api/favorites", function(data) {
      favorites = data;
      initializeRows();
    });
  }

  // This function deletes a favorite when the user clicks the delete button
  function deleteFavorite(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/favorites/" + id
    }).then(getFavorites);
  }
  // This function constructs a favorite-item row
  function createNewRow(favorite) {
    var $newInputRow = `
        <li class="collection-item avatar">
            <img src="${favorite.image}" alt="${favorite.beerName}" class="circle">
            <span class="title">${favorite.breweryName}</span>
            <p>This brewery sells: ${favorite.beerName} <br>
            The brewery website is: ${favorite.webSite}
            </p>
            <a href="#!" class="secondary-content delete"><i class="material-icons">grade</i></a>
        </li>
    `;

    $newInputRow.find("a.delete").data("id", favorite.id);
    $newInputRow.data("favorite", favorite);
    return $newInputRow;
  }
});
