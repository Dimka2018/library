class EventEmmiter{
	
	constructor(){
		this.listeners = [];
	}
	
	subscribe(handler){
		this.listeners.push(handler);
	}
	
	notify(data){
		for (let handler of this.listeners) {
            handler(data);
        }
	}
}