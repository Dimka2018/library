class Model{
	
	constructor(){
		this.currentTag = null;
		this.currentFilter = null;
		this.bookList = null;
		this.tagList = null;
		this.filteredBookList = null;
		
		this.onAddBook = new EventEmmiter();
		this.onSetBookList = new EventEmmiter();
		this.onSetTag = new EventEmmiter();
		this.onAddTag = new EventEmmiter();
		this.onSetTagList = new EventEmmiter();
		this.onAttachTagToBook = new EventEmmiter();
		this.onSetFilter = new EventEmmiter();
		this.onTagListChange = new EventEmmiter();
		this.onSearchPatternChange = new EventEmmiter();
		this.onAddNotification = new EventEmmiter();
		this.onAddHistoryMessage = new EventEmmiter();
	}
	
	refilterBookList(){
		if(this.currentTag != null && this.currentFilter != null){
			this.filteredBookList = this.currentTag.filterArray(this.currentFilter.filterArray(this.bookList));
		}
	}
	
	setBookList(bookList){
		this.bookList = bookList;
		this.onSetBookList.notify(this.bookList);
		this.refilterBookList();
	}
	
	addBook(book){
		this.bookList.push(book);
		this.refilterBookList();
		this.onAddBook.notify(book);
	}
	
	setTagList(tagList){
		this.tagList = tagList;
		this.onSetTagList.notify(this.tagList);
	}
	
	attachTagToBook(bookId, tagName){
		let book = findBookById(bookId, this.bookList);
		book.tags.push(tagName);
		this.onAttachTagToBook.notify(bookId);
	}
	
	addTag(tag){
		this.tagList.push(tag);
		this.onAddTag.notify(tag);
	}
	
	setTag(tag){
		this.currentTag = tag;
		this.refilterBookList();
		this.onSetTag.notify(this.currentTag);
	}
	
	setFilter(filter){
		this.currentFilter = filter;
		this.refilterBookList();
		this.onSetFilter.notify(this.currentFilter);
	}
	
	setSearchPattern(pattern){
		this.onSearchPatternChange.notify(pattern);
	}
	
	addHistoryMessage(message){
		this.onAddHistoryMessage.notify(message);
	}
	
	addNotification(notification){
		this.onAddNotification.notify(notification);
	}
}