let selDiv = "";
		
	document.addEventListener("DOMContentLoaded", init, false);
	
	function init(){
		document.querySelector('#files').addEventListener('change', handleFileSelect, false);
		selDiv = document.querySelector("#selectedFiles");
	}
		
	function handleFileSelect(e){
		
		if(!e.target.files) return;
		
		selDiv.innerHTML = "";
		
		const files = e.target.files;
		for(let i= 1; i <= files.length; i++) {

			selDiv.innerHTML = `<span style='color: #fff'>${i} file(s) selected </span>`;
	
 
		}
		
	}