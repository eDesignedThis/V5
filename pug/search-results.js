// Populate search results/category items
let currentPage = 1;
let pageLimit = 20;
let totalPages = 0;

getPages();

$(".prev-btn").click(function () {
  if (currentPage > 1) {
    currentPage--;
    getPages();
  }
  console.log("Prev Page: " + currentPage);
});
$(".page-1").click(function () {
  if (currentPage * 1 < totalPages) {
    currentPage = 1;
    getPages();
  }
});
$(".page-2").click(function () {
  if (currentPage * 1 < totalPages) {
    currentPage = 2;
    getPages();
  }
});
$(".page-3").click(function () {
  if (currentPage * 1 < totalPages) {
    currentPage = 3;
    getPages();
  }
});
$(".next-btn").click(function () {
  if (currentPage * pageLimit < totalPages) {
    currentPage++;
    getPages();
  }
  console.log("Next Page: " + currentPage);
});

function getPages() {
  $.ajax({
    url:
      "https://api.bestbuy.com/v1/products?apiKey=wV0fRPELYjjeNtQRT7LmdGE4&sort=bestSellingRank.asc&show=accessories.sku,addToCartUrl,bestSellingRank,categoryPath.id,categoryPath.name,color,condition,customerReviewAverage,customerReviewCount,description,details.name,details.value,dollarSavings,features.feature,freeShipping,frequentlyPurchasedWith.sku,image,includedItemList.includedItem,inStoreAvailability,inStoreAvailabilityText,longDescription,manufacturer,modelNumber,name,onlineAvailability,onlineAvailabilityText,onSale,percentSavings,preowned,regularPrice,relatedProducts.sku,salePrice,shipping,shippingCost,shortDescription,sku,thumbnailImage,type,upc,url&facet=categoryPath.id&pageSize=20&format=json",
    type: "GET",
    data: {
      page: currentPage,
      pageLimit: totalPages,
    },
    success: function (data) {
      console.log(data);
      if (data.products) {
        totalPages = data.totalPages;

        let productArr = data.products;
        // let productArr = data.products;
        // console.log(productArr);
        product = "";

        for (i = 0; i < productArr.length; i++) {
          price = Math.round(productArr[i].salePrice * 0.53) * 100;

          // If item is on sale
          if (productArr[i].onSale === true) {
          }

          product +=
            '<div class="col-6 col-lg-4 mb-4"><div class="card search-result"><div class="card-body text-left"><div class="is-on-sale text-success"><span class="fas fa-certificate"></span><span>On Sale Now!</span></div><div class="item-img d-block mx-auto"><img src= "' +
            productArr[i].image +
            '"/></div><a class="item-title mb-2" href="#">' +
            productArr[i].name +
            "</a><p>" +
            "<span class='mr-1'><small>From</small></span>" +
            price +
            '<span class="ml-1"><small>Points</small></span></p><a class="btn btn-primary btn-block addtocartbtn" href="/html/item-detail.html" >Add to Cart</a></div></div></div>';

          $("#featured-products").html(product);

          // Clamp page titles
          $(".item-title").each(function (index, element) {
            $clamp(element, { clamp: 2 });
          });
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
}
