var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	image = function (url)
	{
		var img = new Image();
		img.src = url;
		return img;
	},
	stars= [
		{
			x: 100,
			y: 50,
			dx: 0,
			dy: 0,
			img: image("../img/star-100x100.png"),
		},
		{
			x: 201,
			y: 50,
			dx: 0,
			dy: 0,
			img: image("../img/star-100x100.png"),
		}
	],
	collision = function (objects)
	{
		if (objects[0].x + objects[0].img.width < objects[1].x) {
			return false;
		}
		if (objects[0].y + objects[0].img.height < objects[1].y) {
			return false;
		}
		if (objects[0].x > objects[1].x + objects[1].img.width) {
			return false;
		}
		if (objects[0].y > objects[1].y + objects[1].img.height) {
			return false;
		}
		return true;
	},
	draw = function ()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (i = 0; i < stars.length; i++) {
			stars[i].x += stars[i].dx;
			stars[i].y += stars[i].dy;
		}
		if (collision(stars)) {
			console.log("collision!");
		}
		for (i = 0; i < stars.length; i++) {
			ctx.drawImage(stars[i].img, stars[i].x, stars[i].y);
		}
	};

setInterval(draw, 1000 / 24);
