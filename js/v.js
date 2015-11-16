/*--------------*
 | Alex   | CF  |
 | Jessica| 201 |
 |     ***      |
 | VOTE TRACKER |
 *--------------*/

// Array of Delicious
var img_fn = [
              "blueMarinatedTurkey.jpg",
              "condimentSprays.jpg",
              "cornDogs.jpg",
              "cranberryCandles.jpg",
              "tteokbokki2.jpg",
              "frozenWhatAreThese.jpg",
              "heatedSoda.jpg",
              "jelloMayoTurkey.jpg",
              "pastaOnionsCandy.jpg",
              "whipcreamSoup.jpg",
              "BotChien.jpg",
              "BunBoHue.jpg",
              "OrangeChick.jpg",
              "StirfriedVeggie.jpg",
              "VNpancake.jpg",
              "bellPeper.jpg",
              "bunRieu.jpg",
              "chickenSalad.jpg",
              "kimbap.jpg",
              "frozenShrimp.jpg"
            ];

var fnPool = [];
var working_array = [];
var intermediate = [];

var user = { score: 0, count: 1 }
var score_thresh = 50;

var imgDir = "./img/"

// Elements
var imgLeftE  = $('#imgLeft')[0];
var imgRightE = $('#imgRight')[0];
var btnVote   = $('#btnVote')[0];
var btnNew    = $('#btnNew')[0];
var divStats  = $("#divStats")[0];
var myChart   = $("#myChart")[0];
var myWeather = $("#myWeather")[0];
var usr_submit = $('#usr_submit')[0];
var you_suck = $('#you_suck')[0];
var map = $('#map')[0];
var voting = $('#voting')[0];
var vacation = $('#vacation')[0];
var consolation = $('#you_suck')[0];
var barData = {};

// myChart vars
var ctx = myChart.getContext("2d");
var ctx1 = myWeather.getContext("2d");
var myChartObj = 0;


// User interaction
imgLeftE.addEventListener( "click", selectImg);
imgRightE.addEventListener("click", selectImg);
btnVote.addEventListener("click", recordVote);
btnNew.addEventListener("click", newPair);

  function resetImgs() {
    voteAllowed = true;
    imgLeftE.className  = "imgNormal";
    imgRightE.className = "imgNormal";
  }

  function resetPool() {
    resetImgs();

    if (myChartObj) { myChartObj.destroy();
    }

    fnPool  = working_array.slice();
    fnPool  = intermediate.slice();
    intermediate = [];
  }

  function img_obj (img_name, vote, score) {
    this.img_name = img_name;
    this.vote = vote;
    this.score = score;
  }

  function global_init() {
    /*vacation.style.display ="none";*/
    consolation.style.display = "none";
  //makes the game difficult to win
    var score_array = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, -50];
    var vote = getRandIntOnRange(2, 50);

    for (var jj=0; jj < img_fn.length; jj++) {
      working_array.push(new img_obj(img_fn[jj], vote, score_array[jj]));
      console.log(working_array);
    }
    intermediate = working_array.slice();
  }

  function getRandIntOnRange (a, b) {
    var r = Math.random();
    var t = a + Math.floor(r * (b-a+1));
    return t;
  }
  function showRandImg() {
    index_1 = getRandIntOnRange(0, (fnPool.length)-1);
    index_2 = getRandIntOnRange(0, (fnPool.length)-1);

    while (index_1 === index_2) {
      index_2 = getRandIntOnRange(0, (fnPool.length)-1);
    }
    imgLeftE.src = imgDir + fnPool[index_1].img_name;
    imgRightE.src =  imgDir +  fnPool[index_2].img_name;
  }

  function selectImg() {
    if (voteAllowed) {
      resetImgs();
      this.className = "imgPicked";
      if (imgLeftE.className === "imgPicked") {
        idxSelect = index_1;
      }
      else
      idxSelect = index_2;
      }
  }

  function recordVote() {
    user.count++;
    if (idxSelect == index_1) {
      console.log("voted. idxSelect="+idxSelect);
      fnPool[index_1].vote++;
      voteAllowed = false;
      btnVote.style.visibility= "hidden";
      showChart();
      user.score+=fnPool[index_1].score;
    } else {
      console.log("voted. idxSelect="+idxSelect);
      fnPool[index_2].vote++;
      voteAllowed = false;
      btnVote.style.visibility = "hidden";
      showChart();
      user.score+=fnPool[index_2].score;
      }
    if (index_1 < index_2) {
      temp1 = fnPool.splice(index_2, 1);
      intermediate.push(temp1[0]);
      temp2 = fnPool.splice(index_1, 1);
      intermediate.push(temp2[0]);
    } else {
      temp1 = fnPool.splice(index_1, 1);
      intermediate.push(temp1[0]);
      temp2 = fnPool.splice(index_2, 1);
      intermediate.push(temp2[0]);
      }
    console.log(fnPool)

// Consolation prize
    if (user.count >= 15 && user.score < score_thresh) {
      $("#prizes").css({"display": "block"});
      $("#consolation").css({"display": "block"});
      /*voting.style.display = "none";
      consolation.style.display = "inline";*/
      $("#btnNew").css({"display":"none"});
      user.their_city = "Portland Disposal & Recycling";

// Winning prize
    }
    else if (user.count <=15 && user.score >= score_thresh) {
      $("#prizes").css({"display": "block"});
      vacation.style.display ="inline";
      $("#btnNew").css({"display":"none"});
      }
    console.log(user.score);
    console.log(user.count);
  }

  function newPair() {
    resetImgs();
    console.log("newPair()");
    btnNew.style.visibility = "hidden";
    btnVote.style.visibility = "visible";
    if (myChartObj) { myChartObj.destroy();
    }
    if (fnPool.length < 2) {
      console.log("Not enough images left. Resetting pool");
      if (fnPool.length===1){
        intermediate.push(fnPool[0]);
      }
      resetPool();
    }
    voteAllowed = true;
    showRandImg();

  }

  function showChart() {
    console.log("showChart()");

    var fnL = fnPool[index_1].img_name;
    var fnR = fnPool[index_2].img_name;;
    var labelL = fnL.split(".")[0];
    var labelR = fnR.split(".")[0];

    var data = {
      labels: [labelL, labelR],

      datasets: [{  label: "Raw votes",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",

                    data: [ fnPool[index_1].vote, fnPool[index_2].vote]
                  },

                  { label: "Percentage split",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",

                    data: [fnPool[index_1].vote/(fnPool[index_1].vote+fnPool[index_2].vote)*100,
                          fnPool[index_2].vote/(fnPool[index_1].vote+fnPool[index_2].vote)*100]
                  }]

      };

      myChartObj = new Chart(ctx).Bar(data);
      btnNew.style.display = "inline";
      btnNew.style.visibility = "visible";
  }

/*AJAX*/
var weatherData = {};
var temp_min = [];
var temp_now = [];
var temp_max = [];
var k2cOffset = 273.15;

  function k2f(x) {
    return (x - k2cOffset) * 1.8 + 32;
  }
  function userReg () {
    user.their_city = $('#address').val();
    console.log(user.their_name);
    console.log(user.their_city);

    barData = {
      labels : ["Low temperature","High temperature"],

      datasets : [{ fillColor : "rgba(220,220,220,0.5)",
                    strokeColor : "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data : [temp_min[0]]},

                  { fillColor : "rgba(151,187,205,0.5)",
                    strokeColor : "rgba(151,187,205,0.8)",
                    highlightFill : "rgba(151,187,205,0.75)",
                    highlightStroke : "rgba(151,187,205,1)",
                    data : [temp_max[0]]}
                  ]
                }


  //AJAX STUFF
  $.ajax(
    { url: "http://api.openweathermap.org/data/2.5/forecast?q="+user.their_city+",us&mode=json&appid=997f0723cfa3d466db2b1cdf7bfa37d6",
    beforeSend: function(xhr) {
    }
  })
  .done( function(respObj) {
    console.log("respObj = ", respObj);
    processResp(respObj);
    barData.datasets[0].data = temp_min.slice(0,1);
    barData.datasets[1].data = temp_max.slice(0,1);
    window.myBar = new Chart(ctx1).Bar(barData, {responsive:true});
    console.log("Done");
  })
  .fail ( function() {
    console.log("XHR failed.");
  });
  }

  function processResp(rObj) {
    list = rObj.list;

    for (ii=0; ii < list.length; ii++) {
      main = list[ii].main;
      temp_min[ii] = k2f(main.temp_min);
      temp_max[ii] = k2f(main.temp_max);
      temp_now[ii] = Math.round(k2f(main.temp_now));
    }

    console.log("temp_min=" + temp_min);
    console.log("temp_max=" + temp_max);
  }
//USER MAP INP
  var panorama;

  function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
     zoom: 8,
     center: {lat: -34.397, lng: 150.644}
   });
   geocoder = new google.maps.Geocoder();

   document.getElementById('submit').addEventListener('click', function() {
     geocodeAddress(geocoder, map);
     map.setStreetView(panorama);
   });
  }

  function geocodeAddress(geocoder, resultsMap) {
   address = document.getElementById('address').value;
   geocoder.geocode({'address': address}, function(results, status) {
     if (status === google.maps.GeocoderStatus.OK) {
       console.log(results);
       resultsMap.setCenter(results[0].geometry.location);

       panorama = new google.maps.StreetViewPanorama(
       document.getElementById('pano'), {
         position: {lat:results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()},
         pov: {
           heading: 34,
           pitch: 10
         }
       });
       marker = new google.maps.Marker({
         map: resultsMap,
         position: results[0].geometry.location
       });
     } else {
       alert('Geocode was not successful for the following reason: ' + status);
     }
   });
  }
/// Making it ALL happen
global_init();
resetPool();
showRandImg();

//Claiming winning prize
$("#submit").on("click",initMap);
$("#submit").on("click", userReg);

