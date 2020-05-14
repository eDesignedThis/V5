// Populate Shopping Navigation Menu
$.get("/js/data/shopping-navigation.json", function (data) {
  // console.log(data.catalog);
  for (i = 0; i < data.catalog.length; i++) {
    // console.log(data.catalog[i].label);

    let topNav = `<li class='list-group-item'><a class='topNavLink' href='${data.catalog[i].url}'>${data.catalog[i].label}</a></li>`;

    $("#top-level-categories").append(topNav);

    // DeskTop Navigation
    $("#show-categories").click(function (e) {
      e.preventDefault();
      //   console.log(e);
      $("#level-two-nav").append(topNav);
    });

    let secondNav = data.catalog[i].subcategories;
    let subcategory = $(
      "<ul class='li list-group-item second-level-categories'></ul>"
    );

    if (secondNav.length > 0) {
      for (n = 0; n < secondNav.length; n++) {
        $(".topNavLink").after(subcategory[n]);
        // console.log(secondNav[n].id);
        $(subcategory).append(
          `<li class='list-group-item'><a href='${secondNav[n].url}'>${secondNav[n].label}</a></li>`
        );

        $(".topNavLink").click(function (e) {
          e.preventDefault();
          $("#level-three-nav").append(
            `<li class='list-group-item'><a href='${secondNav[n].url}'>${secondNav[n].label}</a></li>`
          );
        });
      }
    }
  }
});

// Show/Hide Mobile drill-down navigation
$("#mobile-nav").click(function (e) {
  $("#side-menu").animate(
    {
      left: 0,
    },
    300
  );
  console.log(e);
});
