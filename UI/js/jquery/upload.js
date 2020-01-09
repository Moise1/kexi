(()=>{
    document.querySelector('#uploadButton').addEventListener('click', ()=>{
        return document.querySelector('#message').innerHTML = `<div class="alert alert-success fade in">
        <div class="close close-alert" data-dismiss="alert" aria-hidden="true">&times;</div>
            Files Successfully uploaded! Please refresh the page.
        </div>`;
    })
})();