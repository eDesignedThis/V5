console.log("app is running");

$.get("../js/navigation.json", function (nav) {
  let publicPages = [];
  let privatePages = [];
  let screenTitle = $("#screen-title");
  let page = window.location.href;
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

// Populate The FAQ Page
$.get("/js/data/faq.json", function (data, i) {
  //   console.log(data);

  for (i = 0; i < data.faqs.length; i++) {
    // console.log(data.faqs[i], i);

    $("#accordion__faq").append(`
    <div class="card text-left">
            <div class="card-header" id="faq-heading-${i}">
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#faq-q-${i}" aria-expanded="false" aria-controls="faq-q-${i}">${data.faqs[i].question}</button>
              </h2>
            </div>
            <div class="collapse" id="faq-q-${i}" aria-labelledby="faq-heading-${i}" data-parent="#accordion__faq">
              <div class="card-body">${data.faqs[i].answer}</div>
            </div>
          </div>
    `);
  }
});

// Shopping Landing Populate Carousel items
$.get(
  "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=wV0fRPELYjjeNtQRT7LmdGE4&pageSize=4&format=json",
  function (items) {
    // console.log(items.products);
    let allitems = items.products;
    for (i = 0; i < allitems.length; i++) {
      let output = $(".reward-yourself-row").append(`
      <div class="col-6 col-lg-3 p-2"><a class="text-center" href="#">
      <div class='item-img d-block '>
      <img class="mx-auto img-fluid" src="${allitems[i].image}">
      </div>
                      <p class="item-title">${allitems[i].name}</p></a></div>
      `);
      // console.log(items.products[i].name);
    }
  }
);

//Populate Featured Categories
$.get(
  "https://api.bestbuy.com/v1/categories?apiKey=wV0fRPELYjjeNtQRT7LmdGE4&pageSize=9&show=name,id,subCategories.name,subCategories.id&format=json",
  function (categories) {
    let category = categories.categories;
    for (i = 0; i < category.length; i++) {
      // console.log(category[i]);
      let item = $("#categories").append(`
      <div class='col-6 col-md-4 mb-4'>
        <div class='card'>
          <div class='card-body text-center'>
              <a href='#'>
                ${category[i].name}
              </a>
          </div>
        </div>
      </div>

      `);

      // Populate Departments Filter
      $("#departments").append(`
      <li class='list-group-item border-0 pl-0 pt-0'>
        <a href='#'>${category[i].name}</a>
      </li>
      `);
    }
  }
);

$.get(
  "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=wV0fRPELYjjeNtQRT7LmdGE4&sort=bestSellingRank.asc&show=accessories.sku,addToCartUrl,bestSellingRank,categoryPath.id,categoryPath.name,color,condition,customerReviewAverage,customerReviewCount,description,details.name,details.value,dollarSavings,features.feature,freeShipping,frequentlyPurchasedWith.sku,image,includedItemList.includedItem,inStoreAvailability,inStoreAvailabilityText,longDescription,manufacturer,modelNumber,name,onlineAvailability,onlineAvailabilityText,onSale,percentSavings,preowned,regularPrice,relatedProducts.sku,salePrice,shipping,shippingCost,shortDescription,sku,thumbnailImage,type,upc,url&facet=categoryPath.id&pageSize=20&format=json",
  function (items) {
    let product = items.products;
    // console.log(product);

    for (i = 0; i < product.length; i++) {
      let name = product[i].name;
      let image = product[i].image;
      let price = product[i].salePrice;
      let dataKey = product[i].sku;

      $("#featured-products").append(`
    <div class="col-6 col-lg-3 mb-4">
      <div class="card search-result">
        <div class="card-body text-left">
          <div class="item-img d-block mx-auto"><img src="${image}"/></div><a class='item-title mb-2' href="#">${name}</a>
          <p>$${price}</p>
          <a class='btn btn-primary btn-block addtocartbtn' href='#' >Add to Cart</a>
        </div>
      </div>
    </div>
    `);

      if (product[i].onSale == true) {
        console.log(product[i]);
        for (j = 0; j < product[i].length; j++) {
          $(".card-body").append(
            '<small class="text-success">On Sale!</small>'
          );
        }
      }

      $(".item-title").each(function (index, element) {
        $clamp(element, { clamp: 2 });
      });

      $(".addtocartbtn").click(function (e) {
        let itemSku = e.target.getAttribute("dataKey");

        let activeProduct;
        console.log(product);
        for (p = 0; p < product.length; p++) {
          if (dataKey === product[p].sku) {
            activeProduct = product[p];
            // console.log(activeProduct);
          }
        }
      });
    }
  }
);
