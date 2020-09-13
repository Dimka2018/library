const MODAL_ID_POSITION = 0;

function setAsInfoCallable(img, bookList, tagList){
	img.onclick = () => {
		setupModalWindow(img, bookList, tagList);
	}
}

function setAllBooksAsInfoCallable(images){
	for(var img of images){
		setAsInfoCallable(img);
	}
}

function refreshBookTags(id, bookList){
	let book = findBookById(id, bookList);
	let tagContainer = document.getElementById("book-tag-list");
	tagContainer.innerHTML = "";
	for(let tag of book.tags){
		tagContainer.insertBefore(document.createTextNode(tag), tagContainer.firstChild);
		tagContainer.insertBefore(document.createElement("br"), tagContainer.firstChild);
	}
}

function refreshTagList(tagList){
	var tagContainer = document.getElementById("tag-list");
	tagContainer.innerHTML = "";
	for(let tag of tagList){
		let opt = document.createElement("option");
		opt.innerText = tag.name;
		opt.style.color = tag.color;
		tagContainer.appendChild(opt);
	}
}

function setupModalWindow(img, bookList, tagList){
	var imgHref = img.getAttribute("src");
	var bookInfo = img.parentNode.childNodes;
	var title = bookInfo[TITLE_POSITION].innerText;
	var author = bookInfo[AUTHOR_POSITION].innerText;
	document.getElementById("book-id").value = bookInfo[MODAL_ID_POSITION].value;
	document.getElementById("book-image").setAttribute("src", imgHref);
	document.getElementById("book-title").innerText = title;
	document.getElementById("book-author").innerText = author;
	document.getElementById("book-info-close").onclick = () => {
	document.getElementById("modal-window").style.display = "none";
	}
	refreshBookTags(bookInfo[MODAL_ID_POSITION].value, bookList);
	document.getElementById("modal-window").style.display = "flex";
	refreshTagList(tagList);
}