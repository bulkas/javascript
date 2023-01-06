/*

// code of keys
https://gcctech.org/csc/javascript/javascript_keycodes.htm

arrow left 	37
arrow up 	38
arrow right 39
arrow down 	40

w 	87
s 	83
a 	65
d 	68

*/


x1 = 20;
y1 = 80;

/*
const img = new Image();
img.crossOrigin = 'anonymous';
img.src = 'tlo.jpg';
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
img.addEventListener('load', () => {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
});
*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.beginPath();

// generuje linie - labirynt
for (let index = 0; index < 100; index+=10) {
	for (let i = 0; i < 10; i++) {
		//if (i == 0){
			// 1 - 10
			x = Math.floor(Math.random() * 1000) + 1;
			y = Math.floor(Math.random() * 600) + 1;
			ctx.moveTo(x, y);
		//}
		x = Math.floor(Math.random() * 150) + x;
		y = Math.floor(Math.random() * 150) + y;
		ctx.lineTo(x, y);
	}
}


//ctx.moveTo(50, 50);
//ctx.lineTo(60, 60);
//ctx.lineTo(60, 70);
//ctx.lineTo(70, 70);
//ctx.lineTo(70, 100);
ctx.strokeStyle = "#FF0000";
ctx.stroke();
//ctx.fillRect(0,0,50,50);

document.onkeydown = function(e) {
	let info = document.getElementById("info");
	let infoColor = document.getElementById("infoColor");
	
	let napis1 = document.getElementById("napis1");
	
	switch (e.keyCode) {
		case 37:
			//alert('left');
			x1 -= 1;
			break;
		case 38:
			//alert('up');
			y1 -= 1;
			break;
		case 39:
			//alert('right');
			x1 +=1;
			break;
		case 40:
			//alert('down');
			y1 +=1;
			break;
	}
	//napis1.style.left = x1;

	napis1.style.setProperty("left", x1 + "px");
	napis1.style.setProperty("top", y1 + "px");

	

	// collision
	// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

	// wymiary elementu
	// https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

	let rect1 = napis1.getBoundingClientRect();

	info.innerHTML = Math.round(rect1.width) + " " + Math.round(rect1.height) + " " + rect1.left + " " +  rect1.top + "<br>";

	collisionUpFlag = checkXCollision(x1, y1, rect1.width);
	collisionDownFlag = checkXCollision(x1, y1 + rect1.height, rect1.width);
	collisionLeftFlag = checkYCollision(x1, y1, rect1.height);
	collisionRightFlag = checkYCollision(x1 + rect1.width, y1, rect1.height);

	if(collisionUpFlag || collisionDownFlag || collisionLeftFlag || collisionRightFlag){
		infoColor.innerHTML += " collision";
		// wraca do początku
		x1=0;
		y1=0;
	}

	

	

	/*
	var leftToRight = x1 + rect1.width > x2;
	var rightToLeft = x2 + rect2.width > x1;
	var upToDown = y1 + rect1.height > y2;
	var DownToUp = y2 + rect2.height > y1;

	if (leftToRight && rightToLeft && upToDown && DownToUp){
		//alert("collision");
		napis2.style.display = "none";
		napis1.style.display = "none";		
	}
	*/
}

// sprawdź kolizję po x (boki góra i dół)
checkXCollision = function(x, y, width){
	for (let i= x; i< x + width; i++) {
		//const pixel = ctx.getImageData(x, y, width, height);
		const pixel = ctx.getImageData(i, y, 1, 1);
		const data = pixel.data;
		//const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
		// R G B ALPHA
		infoColor.innerHTML = data[0] + " " + data[1] + " " + data[2] + " " + data[3];

		if (data[0] == 255){
			//infoColor.innerHTML += " collision";
			return true;
			//break;
		}
	}
} 

// sprawdź kolizję po y (boki lewy i prawy)
checkYCollision = function(x, y, height){
	for (let i= y; i< y + height; i++) {
		//const pixel = ctx.getImageData(x, y, width, height);
		const pixel = ctx.getImageData(x, i, 1, 1);
		const data = pixel.data;
		//const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
		infoColor.innerHTML = data[0] + " " + data[1] + " " + data[2] + " " + data[3];

		if (data[0] == 255){
			//infoColor.innerHTML += " collision";
			return true;
			//break;
		}
	}
} 