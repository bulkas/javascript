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


x1 = 10;
y1 = 10;

// prędkośc
var speed = 1;

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
			x1 -= speed;
			break;
		case 38:
			//alert('up');
			y1 -= speed;
			break;
		case 39:
			//alert('right');
			x1 += speed;
			break;
		case 40:
			//alert('down');
			y1 += speed;
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
		napis1.style.setProperty("left", x1 + "px");
		napis1.style.setProperty("top", y1 + "px");
	}

}

// sprawdź kolizję po x (boki góra i dół)
checkXCollision = function(x, y, width){
	const imageData = ctx.getImageData(x, y, width, 1);  // tylko raz kopiuje dane - szybciej działa
	for (let i = 0; i < imageData.data.length; i += 4) {
		var r = imageData.data[i];
		//const data = imageData.data;
		//const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
		// R G B ALPHA
		//infoColor.innerHTML = data[0] + " " + data[1] + " " + data[2] + " " + data[3];
		infoColor.innerHTML = "red = " + r;

		if (r == 255){
			//infoColor.innerHTML += " collision";
			return true;
			break;
		}
	}
} 

// sprawdź kolizję po y (boki lewy i prawy)
checkYCollision = function(x, y, height){
	const imageData = ctx.getImageData(x, y, 1, height);
	//for (let i= y; i< y + height; i++) {
	for (let i = 0; i < imageData.data.length; i += 4) {
		//const pixel = ctx.getImageData(x, y, width, height);
		//var index = (x + i * imageData.width) * 4;
		var r = imageData.data[i];
		console.log(r);
		//const data = pixel.data;
		//const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
		//infoColor.innerHTML = data[0] + " " + data[1] + " " + data[2] + " " + data[3];
		infoColor.innerHTML = "red = " + r;


		if (r == 255){
			//infoColor.innerHTML += " collision";
			return true;
			break;
		}
		
	}
} 