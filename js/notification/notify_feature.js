const HISTORY_PANEL_ID = "history-panel";
const MAX_NOTIFICATION_NODES = 2;

function addNotification(message){
	var histPanel = document.getElementById(HISTORY_PANEL_ID);
	tryClearNotifications(histPanel);
	var icon = document.createElement("i");
	icon.setAttribute("class", "fa fa-clock-o");
	icon.setAttribute("aria-hidden", true);
	var histContainer = document.createElement("div");
	histContainer.setAttribute("class", "history-element");
	histContainer.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
	histContainer.insertBefore(icon, histContainer.firstChild);
	histContainer.appendChild(document.createTextNode(message));
	histPanel.insertBefore(histContainer, histPanel.firstChild);
}

function tryClearNotifications(notificationContainer){
	if(notificationContainer.childNodes.length == MAX_NOTIFICATION_NODES){
		notificationContainer.lastChild.remove();
	}
}

