console.log("app is running");

$.get("../js/navigation.json", function (nav) {
  let publicPages = [];
  let privatePages = [];
  for (i = 0; i < nav.navigation.length; i++) {
    //   Check if page is public. If not, it doesn't go into the public banner.
    if (nav.navigation[i].public === true) {
      publicPages.push(nav.navigation[i]);
    } else {
      privatePages.push(nav.navigation[i]);
    }
    // console.log(privatePages);
  }

  //   console.log(publicPages);

  for (i = 0; i < publicPages.length; i++) {
    // console.log(publicPages[i].location);
    if (publicPages[i].location === "header") {
      $(".header__public__nav").append(`
        <li class='nav-item'><a class='nav-link' href='${publicPages[i].url}'>${publicPages[i].name}</a></li>
        `);
    } else if (publicPages[i].location === "footer") {
      $(".footer__public__nav").append(`
        <li class='nav-item'><a class='nav-link' href='${publicPages[i].url}'>${publicPages[i].name}</a></li>
        `);
    }
  }
  for (i = 0; i < privatePages.length; i++) {
    // console.log(publicPages[i].location);
    if (privatePages[i].location === "header") {
      $(".header__private__nav").append(`
        <li class='nav-item'><a class='nav-link' href='${privatePages[i].url}'>${privatePages[i].name}</a></li>
        `);
    } else if (privatePages[i].location === "footer") {
      $(".footer__private__nav").append(`
        <li class='nav-item'><a class='nav-link' href='${privatePages[i].url}'>${privatePages[i].name}</a></li>
        `);
    }
  }
});
