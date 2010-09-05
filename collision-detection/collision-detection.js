var i,

	canvas = document.getElementById("canvas"),

	keypress = {
		left: false,
		up: false,
		right: false,
		down: false
	},

	ctx = canvas.getContext("2d"),

	image = function (url)
	{
		var img = new Image();
		img.src = url;
		return img;
	},

	stars = [
		{
			x: 150,
			y: 50,
			dx: 1,
			dy: 1,
			img: image("../img/star-100x100.png")
		},
		{
			x: 350,
			y: 150,
			dx: 0,
			dy: 0,
			img: image("../img/star-100x100.png")
		}
	],

	collision = function (objects)
	{
		if (objects[0].x + objects[0].img.width < objects[1].x) {
			return "";
		}
		if (objects[0].y + objects[0].img.height < objects[1].y) {
			return "";
		}
		if (objects[0].x > objects[1].x + objects[1].img.width) {
			return "";
		}
		if (objects[0].y > objects[1].y + objects[1].img.height) {
			return "";
		}
		return "bounding box collision";
	},

	draw = function ()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (keypress.left) {
			stars[0].x -= stars[0].dx;
		}
		if (keypress.up) {
			stars[0].y -= stars[0].dy;
		}
		if (keypress.right) {
			stars[0].x += stars[0].dx;
		}
		if (keypress.down) {
			stars[0].y += stars[0].dy;
		}

		ctx.fillText(collision(stars), 10, 30);

		for (i = 0; i < stars.length; i++) {
			ctx.drawImage(stars[i].img, stars[i].x, stars[i].y);
		}
	},

	onKeyDown = function (evt)
	{
		switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
			keypress.up = true;
			break;
		case 40:  /* Down arrow was pressed */
			keypress.down = true;
			break;
		case 37:  /* Left arrow was pressed */
			keypress.left = true;
			break;
		case 39:  /* Right arrow was pressed */
			keypress.right = true;
			break;
		}
	},

	onKeyUp = function (evt)
	{
		switch (evt.keyCode) {
		case 38:  /* Up arrow was released */
			keypress.up = false;
			break;
		case 40:  /* Down arrow was released */
			keypress.down = false;
			break;
		case 37:  /* Left arrow was released */
			keypress.left = false;
			break;
		case 39:  /* Right arrow was released */
			keypress.right = false;
			break;
		}
	};

ctx.globalCompositeOperation = "xor";
ctx.font = "30px sans-serif";

setInterval(draw, 1000 / 30);
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
