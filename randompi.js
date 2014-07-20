/******************\
|      Randm Pi    |
| @author Anthony  |
| @version 0.1     |
| @date 2014/04/17 |
| @edit 2014/04/17 |
\******************/

/**********
 * config */
var pointsPerSecond = 10;
var canvasSel = '#canvas';
var numPointsSel = '#num-points';
var approxSel = '#pi-approx';

/*************
 * constants */
var MS_PER_POINT = 1000/pointsPerSecond;

/*********************
 * working variables */
var canvas;
var ctx;
var total;
var numInsideCircle;

/******************
 * work functions */
function initRandomPi() {
	canvas = $s(canvasSel);
	ctx = canvas.getContext('2d');
	
	total = 0;
	numInsideCircle = 0;
	
	drawPoint([0, canvas.height], canvas.height, 'rgba(255, 0, 0, 0.1)');	
	updateCanvas();
}

function updateCanvas() {
	/////////////////
	//house keeping//
	var startTime = new Date().getTime();
	
	//test another point
	var loc = getRandPoint();
	total += 1;
	if (isInsideQuarterCircle(loc)) {
		numInsideCircle += 1;
		drawPoint(loc, 2, 'rgba(255, 0, 0, 1)');
	} else drawPoint(loc, 2);
	
	//update the results
	$s(numPointsSel).innerHTML = total;
	var approx = 4*numInsideCircle/total;
	approx = round(approx, Math.max(3, 1+Math.floor(Math.log(total)/Math.log(10))));
	$s(approxSel).innerHTML = approx;
	
	/////////////////
	//call next one//
	var timeTaken = new Date().getTime() - startTime;
	if (timeTaken > MS_PER_POINT) {
		setTimeout(function() { updateCanvas(); }, 4); //slight delay for UI updates
	} else {
		setTimeout(function() { updateCanvas(); }, MS_PER_POINT - timeTaken);
	}
}

function drawPoint(loc, r, color) {
	r = r || 2
	color = color || 'rgba(0, 0, 0, 1)'
	
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(loc[0], loc[1], r, 0, 2*Math.PI, true);
	ctx.closePath();
	ctx.fill();
}

/********************
 * helper functions */
function round(n, p) {
	var d = Math.pow(10, p);
	return Math.round(d*n)/d;
}

function isInsideQuarterCircle(loc) { //unit circle
	var x = loc[0]/canvas.width;
	var y = (canvas.height-loc[1])/canvas.height;
	return x*x + y*y < 1;
}

function getRandPoint() {
	var x = canvas.width*Math.random();
	var y = canvas.height*Math.random();
	return [x, y];
}

function $s(id) { //for convenience
	if (id.charAt(0) !== '#') return false; 
	return document.getElementById(id.substring(1));
}

function currentTimeMillis() {
	return new Date().getTime();
}

window.addEventListener('load', function() {
	initRandomPi();
});