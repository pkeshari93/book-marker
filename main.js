// listen for form submit
 document.getElementById('myForm').addEventListener('submit', saveBookmark);


// save bookmark
 function saveBookmark(e){

 	// get form values
 	var siteName = document.getElementById('siteName').value;
 	var siteURL = document.getElementById('siteURL').value;

 	if(!validateForm(siteName, siteURL)){
 		return false;
 	}


 	//saving bookmarks as an array of objects to sav eto local storage
 	var bookmark = {
 		name: siteName,
 		url: siteURL
 	}

 	// local storage only stores strings, so I can parse the JSON into a string to store and then
 	// parse it back to JSON when we need to get it 
 	// localStorage.setItem('test', 'hello world');
 	// console.log(localStorage.getItem('test'));
 	// localStorage.removeItem('test');
 	// console.log(localStorage.getItem('test'));

 	// test if bookmarks is null
 	if(localStorage.getItem('bookmarks') === null){

 		//init array
 		var bookmarks = [];

 		// add to the array
 		bookmarks.push(bookmark);

 		// set to local storage, making sure I save it as string and not JSON 
 		localStorage.setItem('bookmarks', JSON.stringify(bookmarks)) ;
 	}
 	// if there is something in the bookmarks
 	else{
 		//get bookmarks from local storage, making JSON out of fetched string
 		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 		//add the bookmark to the array
 		bookmarks.push(bookmark);
 		//resave in local storage
 		localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
  	}

  	// clear form after submit
  	document.getElementById('myForm').reset();

  	showBookmark();
 	// prevent default from submitting form
 	e.preventDefault();
 }


function deleteBookmark(url){
	// get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			// remove from array
			bookmarks.splice(i, 1);
		}
	}
	// reset the local storage with updated array
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	// refetch bookmarks
	showBookmark();
}

function validateForm(siteName, siteURL){
	if(!siteName || !siteURL){
 		alert('Please fill in the form completely');
 		//stop the submission
 		return false;
 	}

 	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex)){
		alert('Please use a valid URL');
		return false;
	}

	return true;
}


//show bookmarks
function showBookmark(){
	//get bookmarks from local storage, making JSON out of fetched string
 	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 	// get output id
 	var savedBookmarks = document.getElementById('savedBookmarks');
 	// build output
 	savedBookmarks.innerHTML = '';
 	for(var i = 0; i < bookmarks.length; i++){
 		var name = bookmarks[i].name;
 		var url = bookmarks[i].url;

 		savedBookmarks.innerHTML += '<div class="well">'+
 		                            '<h3>' + name +
 		                            '<a style="margin: 1em" class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
 		                            '<a onclick="deleteBookmark(\''+url+'\')" style="margin: 1em" class="btn btn-danger" href="#">Delete</a>'+
 		                            '<h3>'	+	
 		                            '</div>';
 	} 	
}












