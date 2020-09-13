class MostPopularFilter{
	
	filterArray(bookArray){
		return bookArray.filter((book) => {
			return book.rating == NUMBER_OF_STARS;
		});
	}
}

function getFilterArray(){
	return document.getElementsByClassName("filter");
}

function isRatingMax(ratingContainer){
	
	return filterNodes(ratingContainer.childNodes)[0].checked;
}

