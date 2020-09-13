	const ADD_BOOK_BUTTON_ID = "add-book-butt";
	const ALL_BOOK_FILTER_ID = "all-filter";
	const MOST_POPULAR_FILTER_ID = "rating-filter"
	const TAG_CONTAINER_ID = "mapping-panel";
	const SEARCH_INPUT_ID = "search";
	const HISTORY_BUTTON_ID = "history-button";
	const BROWSE_BUTTON_ID = "browse-button";
	const ADD_TAG_BUTTON_ID = "tag-add-button";
	const TAG_COLOR_SEEK_BAR_CLASS = "tag-color-bar";
	const ATTACH_TAG_BUTTON_ID = "set-book-tag"


class View{
	
	constructor(model, controller){
		this.model = model;
		this.controller = controller;
		
		this.addBookButton = document.getElementById(ADD_BOOK_BUTTON_ID);
		this.allBookFilter = document.getElementById(ALL_BOOK_FILTER_ID);
		this.mostPopularFilter = document.getElementById(MOST_POPULAR_FILTER_ID);
		this.tagsContainer = document.getElementById(TAG_CONTAINER_ID);
		this.searchWindow = document.getElementById(SEARCH_INPUT_ID);
		this.historyButton = document.getElementById(HISTORY_BUTTON_ID);
		this.browseButton = document.getElementById(BROWSE_BUTTON_ID);
		this.addTagButton = document.getElementById(ADD_TAG_BUTTON_ID);
		this.tagColorBars = document.getElementsByClassName(TAG_COLOR_SEEK_BAR_CLASS);
		this.attachTagButton = document.getElementById(ATTACH_TAG_BUTTON_ID);
	}
	
	init(){
		var context = this;
		
		for(let seekBar of this.tagColorBars){
			seekBar.addEventListener("input", () => {
				let colorSquare = document.getElementById("tag-color");
		        colorSquare.style.background = getTagColor();
			});
		}
		
		this.searchWindow.addEventListener('input', () => {
			this.controller.setSearchPattern(this.searchWindow.value.toLowerCase());
			let message = "You enter " + this.searchWindow.value;
			this.controller.addNotification(message);
		    this.controller.addHistoryMessage(message);
		});
		
		this.attachTagButton.addEventListener("click", (event) => {
			event.preventDefault();
			let bookId = document.getElementById("book-id").value;
		    let tagName = document.getElementById("tag-list").value;
			this.controller.attachTagToBook(bookId, tagName);
		});
		
		this.addTagButton.addEventListener("click", (event) => {
			event.preventDefault();
		    let tag = new Tag(getTagName(), getTagColor());
			this.controller.addTag(tag);
		});
		
		
		
		this.allBookFilter.addEventListener('click', () => {
			let filters = getFilterArray();
		    chooseFilter(this.allBookFilter, filters);
		    let filter = new AllBookFilter();
			this.controller.setFilter(filter);
		    let message = "You chose all book filter";
			this.controller.addNotification(message);
			this.controller.addHistoryMessage(message);
		});
		
		this.mostPopularFilter.addEventListener("click", () => {
			let filters = getFilterArray();
		    chooseFilter(this.mostPopularFilter, filters);
		    let filter = new MostPopularFilter();
			this.controller.setFilter(filter);
		    let message = "You chose most popular filter";
			this.controller.addNotification(message);
			this.controller.addHistoryMessage(message);
		});
		
		this.addBookButton.addEventListener('click', (event) => {
			event.preventDefault();
			let id = countNumberBooks() + 1 + "";
			let title = document.getElementById("title").value;
			let author =  document.getElementById("author").value;
			let img = window.URL.createObjectURL(document.getElementById("image").files[0]);
			let book = new Book(id, title, author, img);
			this.controller.addBook(book);
			let message = "You added " + title + " by " + author + " to all books";
			this.controller.addNotification(message);
			this.controller.addHistoryMessage(message);
		});
		
		this.historyButton.addEventListener("click", () => {
			hidePageContent();
		    showHistoryPage();
		});
		
		this.browseButton.addEventListener('click', () => {
			hideHistoryPage();
		    showPageContent();
		});
		
		
		this.model.onSetBookList.subscribe((bookArray) => {
			addBookArray(bookArray, this.model.tagList,changeStarRating);
		});
		
		this.model.onAddBook.subscribe((book) => {
			let newBook = createBook(book.src, book.author, book.title, NUMBER_OF_STARS, book.id
			, book.rating, this.model.bookList, this.model.tagList, changeStarRating);
			addBookToList(newBook);
            refreshBookTable(this.model.filteredBookList);
		});
		
		this.model.onAddNotification.subscribe((notification) => {
			addNotification(notification);
		});
		
		this.model.onAddHistoryMessage.subscribe((message) => {
			addHistMessage(message);
		});
		
		this.model.onSetTag.subscribe((tag) => {
			refreshBookTable(this.model.filteredBookList);
		});
		
		this.model.onSetTagList.subscribe((tagList) => {
			this.tagsContainer.innerHTML = "";
			for(let tag of tagList){
				let tagNode = createTag("button", tag.color, tag.name);
				tagNode.onclick = () => {
				    this.controller.setTag(new Tag(tag.name, tag.color));
				    refreshBookTable(this.model.filteredBookList);
			    }
				this.tagsContainer.appendChild(tagNode);
			}
		});
		
		this.model.onAddTag.subscribe((tagObj) => {
			let tag = createTag("button", getTagColor(), getTagName());
			tag.onclick = () => {
				this.controller.setTag(new Tag(tagObj.name, tagObj.color));
				refreshBookTable(this.model.filteredBookList);
			}
			this.tagsContainer.appendChild(tag);
			setTagNameValue("");
			refreshTagList(this.model.tagList);
			refreshBookTags(document.getElementById("book-id").value, this.model.bookList);
		});
		
		this.model.onAttachTagToBook.subscribe((bookId) => {
			refreshBookTags(bookId, this.model.bookList);
		});
		
		this.model.onSetFilter.subscribe((filter) => {
			refreshBookTable(this.model.filteredBookList);
		});
		
		this.model.onSearchPatternChange.subscribe((pattern) => {
			let headerNodes = getBookNodeArrayByArray(this.model.filteredBookList);
		    for(let headerNode of headerNodes){
			    if(isWanted(headerNode.firstChild.childNodes[TITLE_POSITION]
			    .innerText.toLowerCase(), pattern) > -1){
			        showWanted(headerNode);
		        }else{
				    hideUnwanted(headerNode);
			    }
		    } 
		});
		
		function changeStarRating(){
				let bookNodeId = this.parentNode.parentNode.childNodes[BOOK_ID_POSITION].value;
		        findBookById(bookNodeId, context.model.bookList).rating = this.value;
		        let title = this.parentNode.parentNode.childNodes[TITLE_POSITION];
		        let author = this.parentNode.parentNode.childNodes[AUTHOR_POSITION];
				
		        let message = "You rate " + title.innerText + " book " 
		        + author.innerText + " as " + this.value + " stars";
				context.controller.addNotification(message);
			    context.controller.addHistoryMessage(message);
		}
		
		
	}
}