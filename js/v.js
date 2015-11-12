var img_fn = ["blueMarinatedTurkey.jpg", "condimentSprays.jpg", "cornDogs.jpg",
"cranberryCandles.jpg", "tteokbokki2.jpg", "frozenWhatAreThese.jpg", "heatedSoda.jpg",
"jelloMayoTurkey.jpg", "pastaOnionsCandy.jpg", "whipcreamSoup.jpg",
"BotChien.jpg", "BunBoHue.jpg", "OrangeChick.jpg", "StirfriedVeggie.jpg", "VNpancake.jpg",
"bellPeper.jpg", "bunRieu.jpg", "chickenSalad.jpg", "kimbap.jpg", "frozenShrimp.jpg"];

var user = {
  score: 0,
  count: 1
}
var imgDir = "./img/"
var fnPool = [];
var working_array = [];
var intermediate = [];
var imgLeftE  = $('#imgLeft')[0];
var imgRightE = $('#imgRight')[0];
var btnVote   = $('#btnVote')[0];
var btnNew    = $('#btnNew')[0];
var divStats  = $("#divStats")[0];
var myChart   = $("#myChart")[0];
var myWeather = $("#myWeather")[0];
var usr_submit = $('#usr_submit')[0];
var register = $('#register')[0];
var you_suck = $('#you_suck')[0];
var barData = {};

var ctx = myChart.getContext("2d");
var ctx1 = myWeather.getContext("2d");
var myChartObj = 0;
var score_thresh = 50;

register.addEventListener( "click", userReg);
imgLeftE.addEventListener( "click", selectImg);
imgRightE.addEventListener("click", selectImg);
btnVote.addEventListener("click", recordVote);
btnNew.addEventListener("click", newPair);




function resetImgs() {
  voteAllowed = true;
  imgLeftE.className  = "imgNormal";
  imgRightE.className = "imgNormal";
}

function resetPool() { // Once all images have been shown, start over
  resetImgs();
  // Slice() forces copy by value (doesn't just create a reference)
  if (myChartObj) { myChartObj.destroy(); }
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
  var score_array = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, -50];
  for (var jj=0; jj < img_fn.length; jj++) {
    var vote = getRandIntOnRange(2, 50);
    working_array.push(new img_obj(img_fn[jj], vote, score_array[jj]));
    console.log(working_array);
  }
  intermediate = working_array.slice();
  /*fnPool  = working_array.slice();*/
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
    } else
    idxSelect = index_2;
  }
}

function recordVote() {
  user.count++;
  if (idxSelect == index_1) {
    console.log("voted. idxSelect="+idxSelect);
    fnPool[index_1].vote++;
    voteAllowed = false;
    btnVote.style.visibility = "hidden";
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
    var temp1, temp2;
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
  /*winning or consolation prize section*/
  if (user.count === 15 && user.score < score_thresh) {
    you_suck.style.visibility = "visible";
    voteAllowed = false;

  } else if (user.score >= score_thresh) {
    usr_submit.style.visibility = "visible";
    vac_input.style.visibility = "visible";
  }
  console.log(user.score);
  console.log(user.count);
}

function newPair() {
  console.log("newPair()");
  btnNew.style.visibility = "hidden";
  btnVote.style.visibility = "visible";
  if (myChartObj) { myChartObj.destroy(); }
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
    datasets: [
      { label: "Raw votes",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: [ fnPool[index_1].vote, fnPool[index_2].vote] // Bogus data -- use your vote counts instead
    },
    { label: "Percentage split",
    fillColor: "rgba(151,187,205,0.5)",
    strokeColor: "rgba(151,187,205,0.8)",
    highlightFill: "rgba(151,187,205,0.75)",
    highlightStroke: "rgba(151,187,205,1)",
    data: [fnPool[index_1].vote/(fnPool[index_1].vote+fnPool[index_2].vote)*100, fnPool[index_2].vote/(fnPool[index_1].vote+fnPool[index_2].vote)*100]
  }
]
};
myChartObj = new Chart(ctx).Bar(data);

btnNew.style.display = "inline";
btnNew.style.visibility = "visible";
}

global_init();
resetPool();
showRandImg();


/*AJAX*/
var weatherData = {};
var temp_min = [];
var temp_now = [];
var temp_max = [];
var k2cOffset = 273.15; // Kelvin vs. Celcius shift

function k2f(x) {
  return (x - k2cOffset) * 1.8 + 32;
}

function userReg () {
  user.their_name =  $('#usr_name').val();
  user.their_city = $('#usr_city').val();
  console.log(user.their_name);
  console.log(user.their_city);
  register.style.visibility="hidden";

  barData = {
    labels : ["0","1"],
    /*labels : [user.their_city+"Min Temp",user.their_city+"Max Temp"],*/
    datasets : [
      { fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data : [temp_min[0]]
    },
    { fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,0.8)",
      highlightFill : "rgba(151,187,205,0.75)",
      highlightStroke : "rgba(151,187,205,1)",
      data : [temp_max[0]]
//    data : temp_min.slice(0,6)
//    data : [randGen(),randGen(),randGen(),randGen(),randGen(),randGen(),randGen()]
    }
  ]
  }

$.ajax(
  { url: "http://api.openweathermap.org/data/2.5/forecast?q="+user.their_city+",us&mode=json&appid=997f0723cfa3d466db2b1cdf7bfa37d6",
  beforeSend: function(xhr) {
    //xhr.overrideMimeType("text/plain; charset=x-user-defined");
  }
})
// End of ajax(), but here we do some chaining:
.done( function(respObj) { // Success
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
