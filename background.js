//console.log("At Background.js")

var getValueFromContent = function() {
	chrome.tabs.query({active: true, currentWindow: true},function(tabs){
		chrome.tabs.sendMessage(tabs[0].id,{from:'background',command:'get-value'},function(response){
			console.log(response);
		});
	});
}
chrome.browserAction.onClicked.addListener(getValueFromContent)