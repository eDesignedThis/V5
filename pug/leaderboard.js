// Populate Leaderboard
$.getJSON("/js/data/leaderboard.json", function (data) {
  console.log(data);

  // Sort points in desc order.
  data.leaderboard.sort(function (a, b) {
    if (a.points_awarded < b.points_awarded) {
      return 1;
    } else {
      return -1;
    }
  });

  let leader = "";

  for (i = 0; i < data.leaderboard.length; i++) {
    leader +=
      '<li class="list-group-item border-0"><div class="row mx-auto"><div class="col-3 col-sm-3 col-lg-1 order-1"><p class="font-weight-bold">Rank</p><p class="mb-0"></p></div><div class="col-5 col-sm-3 col-lg-5 order-2"><p class="font-weight-bold">Leader Name</p><p class="mb-0">' +
      data.leaderboard[i].first_name +
      " " +
      data.leaderboard[i].last_name +
      '</p></div><div class="col-4 col-sm-3 order-3 order-sm-4 text-sm-right"><p class="font-weight-bold">Points</p><p class="mb-0">' +
      data.leaderboard[i].points_awarded +
      '</p></div><div class="col-12 col-sm-3 order-4 order-sm-3 text-sm-center"><p class="font-weight-bold">Region</p><p class="mb-0">' +
      data.leaderboard[i].region +
      "</p></div></div></li>";
  }

  $("#leaderboard").html(leader);
});
