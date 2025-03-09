console.log(
	"Hello there! Thank you for visiting my website. If you are looking for the source code, it can be found at: https://github.com/AdityaPrakash-26/AdityaPrakash-26.github.io"
);
console.log(
	"Feel free to report bugs and share your feedback. Hope to see you on my repo! :D"
);

// Tracking
var pos_x = 0,
	pos_y = 0;

// check whether tha url has a particular panel
function checkUrl(url) {
	if (url.indexOf("#") > -1) {
		var panel = url.split("#")[1];
		if (panel == "about") {
			pos_x = 1;
			pos_y = 0;
		} else if (panel == "skills") {
			pos_x = 1;
			pos_y = 1;
		} else if (panel == "work") {
			pos_x = 0;
			pos_y = 1;
		} else if (panel == "projects") {
			pos_x = -1;
			pos_y = 1;
		} else if (panel == "education") {
			pos_x = -1;
			pos_y = 0;
		} else if (panel == "contact") {
			pos_x = -1;
			pos_y = -1;
		} else if (panel == "testimonials") {
			pos_x = 0;
			pos_y = -1;
		} else if (panel == "hobbies") {
			pos_x = 1;
			pos_y = -1;
		}
		setPos();
	}
}

//hide the address bar
window.addEventListener("load", function () {
	setTimeout(function () {
		window.scrollTo(0, 1);
	}, 0);
	checkUrl(window.location.href);
});

// Global
var win = window,
	doc = document;

// Global Functions

function hasClass(el, cls) {
	return el.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

function addClass(el, cls) {
	if (!this.hasClass(el, cls)) {
		el.className += " " + cls;
	}
}

function removeClass(el, cls) {
	if (this.hasClass(el, cls)) {
		var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
		el.className = el.className.replace(reg, " ");
	}
}

// Elements

var site = doc.getElementsByClassName("site-wrap")[0];
var wrap = doc.getElementsByClassName("panel-wrap")[0];

var panel = doc.getElementsByClassName("panel");

var zoom = doc.getElementsByClassName("js-zoom");

var nav_up = doc.getElementsByClassName("js-up"),
	nav_left = doc.getElementsByClassName("js-left"),
	nav_right = doc.getElementsByClassName("js-right"),
	nav_down = doc.getElementsByClassName("js-down"),
	nav_left_twice = doc.getElementsByClassName("js-left-twice");

function setPos() {
	wrap.style.transform =
		"translateX(" + pos_x + "00%) translateY(" + pos_y + "00%)";
	setTimeout(function () {
		removeClass(wrap, "animate");
	}, 600);
}

setPos();

function moveUp() {
	addClass(wrap, "animate");
	pos_y++;
	setPos();
}

function moveLeft() {
	addClass(wrap, "animate");
	pos_x++;
	setPos();
}

function moveLeftTwice() {
	addClass(wrap, "animate");
	pos_x += 2;
	setPos();
}

function moveDownTwice() {
	addClass(wrap, "animate");
	pos_y -= 2;
	setPos();
}

function moveRight() {
	addClass(wrap, "animate");
	pos_x--;
	setPos();
}

function moveDown() {
	addClass(wrap, "animate");
	pos_y--;
	setPos();
}

for (var x = 0; x < nav_up.length; x++) {
	nav_up[x].addEventListener("click", moveUp);
}

for (var x = 0; x < nav_left.length; x++) {
	nav_left[x].addEventListener("click", moveLeft);
}

for (var x = 0; x < nav_left_twice.length; x++) {
	nav_left_twice[x].addEventListener("click", moveLeftTwice);
}

for (var x = 0; x < nav_right.length; x++) {
	nav_right[x].addEventListener("click", moveRight);
}

for (var x = 0; x < nav_down.length; x++) {
	nav_down[x].addEventListener("click", moveDown);
}

for (var x = 0; x < zoom.length; x++) {
	zoom[x].addEventListener("click", zoomOut);
}

function zoomOut(e) {
	e.stopPropagation();
	addClass(site, "show-all");
	pos_x = 0;
	pos_y = 0;
	setPos();
	for (var x = 0; x < panel.length; x++) {
		(function (_x) {
			panel[_x].addEventListener("click", setPanelAndZoom);
		})(x);
	}
	// remove zoom out event listener
	for (var x = 0; x < zoom.length; x++) {
		zoom[x].removeEventListener("click", zoomOut);
	}

	for (var x = 0; x < zoom.length; x++) {
		zoom[x].addEventListener("click", zoomIn);
	}

	// change the icon
	removeClass(doc.getElementById("zoom-icon"), "fa-search-minus");
	addClass(doc.getElementById("zoom-icon"), "fa-search-plus");
}

function setPanelAndZoom(e) {
	(pos_x = -e.target.getAttribute("data-x-pos")),
		(pos_y = e.target.getAttribute("data-y-pos"));
	setPos();
	zoomIn();
}

function zoomIn() {
	for (var x = 0; x < panel.length; x++) {
		panel[x].removeEventListener("click", setPanelAndZoom);
	}
	removeClass(site, "show-all");

	// remove zoom in event listener
	for (var x = 0; x < zoom.length; x++) {
		zoom[x].removeEventListener("click", zoomIn);
	}

	for (var x = 0; x < zoom.length; x++) {
		zoom[x].addEventListener("click", zoomOut);
	}

	// change the icon
	removeClass(doc.getElementById("zoom-icon"), "fa-search-plus");
	addClass(doc.getElementById("zoom-icon"), "fa-search-minus");
}

doc.addEventListener("wheel", function (e) {
	if (e.target.classList.contains("no-scroll") || e.target.closest(".no-scroll")) {
		// always allow zoom in
		if (e.deltaY < 0) {
			// get the slide on which the cursor currently is
			var slide = document.elementFromPoint(
				e.clientX,
				e.clientY
			).closest(".panel");
			pos_x = -slide.getAttribute("data-x-pos");
			pos_y = slide.getAttribute("data-y-pos");
			setPos();
			zoomIn();
		}

		var parent = e.target.closest(".paraHolder");
		if (parent.scrollHeight > parent.clientHeight) {
			// if scrolling down
			if (e.deltaY > 0) {
				if (localStorage.getItem("scroll-tooltip") === "false") {
					return;
				}
				var toolTip = doc.createElement("div");
				toolTip.setAttribute("class", "scroll-tooltip");
				toolTip.innerHTML = "Zoomout not possible on this panel. Please click the magnifying glass icon to zoom out. <span style='color: #fff; cursor: pointer;'><u><span id='noclick'>Don't show again.</span></u></span>";

				toolTip.addEventListener("click", function (e) {
					console.log(e.target.id);
					if (e.target.id === "noclick") {
						localStorage.setItem("scroll-tooltip", "false");
						parent.removeChild(toolTip);
					}
					return;
				});

				parent.appendChild(toolTip);
				setTimeout(function () {
					toolTip.style.opacity = 1;
				}, 1000);
				setTimeout(function () {
					toolTip.style.opacity = 0.8;
				}, 1200);
				setTimeout(function () {
					toolTip.style.opacity = 0.6;
				}, 1400);
				setTimeout(function () {
					toolTip.style.opacity = 0.4;
				}, 1600);
				setTimeout(function () {
					toolTip.style.opacity = 0.2;
				}, 1800);
				setTimeout(function () {
					toolTip.style.opacity = 0.0;
				}, 2000);
				setTimeout(function () {
					parent.removeChild(toolTip);
				}, 2100);
			}
			return;
		}
	}
	if (e.deltaY > 0) {
		zoomOut(e);
	}

	if (e.deltaY < 0) {
		// get the slide on which the cursor currently is
		var slide = document.elementFromPoint(
			e.clientX,
			e.clientY
		).closest(".panel");
		pos_x = -slide.getAttribute("data-x-pos");
		pos_y = slide.getAttribute("data-y-pos");
		setPos();
		zoomIn();
	}
});

function changeState() {
	var mobileStateOne = doc.getElementById("mobile-state-one");
	var mobileStateTwo = doc.getElementById("mobile-state-two");

	if (mobileStateOne.style.display === "none") {
		mobileStateOne.style.display = "block";
		mobileStateTwo.style.display = "none";
	} else {
		mobileStateOne.style.display = "none";
		mobileStateTwo.style.display = "block";
	}
}

function isOverflown(element) {
	return element.scrollHeight > element.clientHeight;
}

var paraHolders = document.getElementsByClassName("paraHolder");

for (var i = 0; i < paraHolders.length; i++) {
	var para = paraHolders[i];
	if (isOverflown(para)) {
		para.classList.add("scrollbarStyle");
	}
}

function toggleDescription(id) {
	if (
		!document.getElementById(id).style.display ||
		document.getElementById(id).style.display === "none"
	) {
		document.getElementById(id).style.display = "block";
		document.getElementById(`${id}-toggle-arrow-up`).style.display =
			"inline-block";
		document.getElementById(`${id}-toggle-arrow-down`).style.display =
			"none";
	} else {
		document.getElementById(id).style.display = "none";
		document.getElementById(`${id}-toggle-arrow-up`).style.display = "none";
		document.getElementById(`${id}-toggle-arrow-down`).style.display =
			"inline-block";
	}
}
