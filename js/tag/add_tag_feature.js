
function getTagName(){
	return document.getElementById("tag-name").value.toLowerCase();
}

function setTagNameValue(val){
	document.getElementById("tag-name").value = val;
}

function getTagColor(){
	    var redBar = document.getElementById("red-bar");
		var greenBar = document.getElementById("green-bar");
		var blueBar = document.getElementById("blue-bar");
		return "rgb(" + redBar.value + ", " 
		+ greenBar.value + ", " + blueBar.value + ")";
}


function rebuildTagList(tagList){
	var tagContainer = document.getElementById("tag-list");
	tagContainer.innerHTML = "";
	for(let tag of tagList){
		let opt = document.createElement("option");
		opt.innerText = tag.name;
		opt.style.color = tag.color;
		tagContainer.appendChild(opt);
	}
}


function createTag(containerType, circleColor, tagName){
	let tagCircle = document.createElement("i");
	tagCircle.setAttribute("class", "fa fa-circle");
	tagCircle.style.color = circleColor;
	var container = document.createElement(containerType);
	container.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
	container.insertBefore(tagCircle, container.firstChild);
	container.appendChild(document.createTextNode(tagName));
	return container;
}