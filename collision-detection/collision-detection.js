var i, j,

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

	rd = image("../img/red-dot-3x3.png"),

	star = function (x, y, dx, dy)
	{
		var star = {
				x: x,
				y: y,
				dx: dx,
				dy: dy,
				img: image("../img/star-100x100.png"),
				vxs: function (x, y)
				{
					return [
						{x: this.x + 40,  y: this.y + 0},
						{x: this.x + 64,  y: this.y + 26},
						{x: this.x + 99, y: this.y + 23},
						{x: this.x + 81,  y: this.y + 52},
						{x: this.x + 95,  y: this.y + 84},
						{x: this.x + 61,  y: this.y + 76},
						{x: this.x + 34,  y: this.y + 100},
						{x: this.x + 31,  y: this.y + 65},
						{x: this.x + 0,   y: this.y + 47},
						{x: this.x + 33,  y: this.y + 34}
					];
				}
			};
		return star;
	},

	stars = [
		star(60, 60, 1, 1),
		star(150, 150, 1, 1)
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

		intersections = 0;
	},

	draw = function ()
	{
		var vxs;

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
			ctx.globalCompositeOperation = "xor";
			ctx.drawImage(stars[i].img, stars[i].x, stars[i].y);
			ctx.globalCompositeOperation = "source-over";
			vxs = stars[i].vxs();
			for (j = 0; j < vxs.length; j++) {
				ctx.drawImage(rd, vxs[j].x - 1, vxs[j].y - 1);
			}
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

ctx.font = "16px sans-serif";

setInterval(draw, 1000 / 30);
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
