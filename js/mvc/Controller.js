class Controller{
	
	constructor(){
		this.model = new Model();
		this.view = new View(this.model, this);
	}
	
	setSearchPattern(pattern){
		this.model.setSearchPattern(pattern);
	}
	
	attachTagToBook(bookId, tagName){
		this.model.attachTagToBook(bookId, tagName);
	}
	
	addBook(book){
		this.model.addBook(book);
	}
	
	addTag(tag){
		this.model.addTag(tag);
	}
	
	setTag(tag){
		this.model.setTag(tag);
	}
	
	setFilter(filter){
		this.model.setFilter(filter);
	}
	
	addNotification(message){
		this.model.addNotification(message);
	}
	
	addHistoryMessage(message){
		this.model.addHistoryMessage(message);
	}
	
	start(){
		this.view.init();
		this.model.setTagList(tags)
		this.model.setTag(new UniversalTag());
		this.model.setFilter(new AllBookFilter());
		this.model.setBookList(books);
	}
}