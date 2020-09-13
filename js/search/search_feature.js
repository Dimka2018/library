function hideUnwanted(elem){
	elem.style.display = "none";
}

function showWanted(elem){
	elem.style.display = "inline-block";
}

function isWanted(header, searchField){
	return header.search(new RegExp(searchField));
}
