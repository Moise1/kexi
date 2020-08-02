(()=>{
    document.querySelector('#uploadButton').addEventListener('click', ()=>{
       document.querySelector('.alert').show();
    })

    document.querySelector('button').addEventListener('click', ()=>{
        document.querySelector('.alert').remove()
    })
})();




// $(document).ready(function(){
//     $('#uploadButton').click(function(){
//         $('.alert').show()
//     }); 
    
//     $('button').click(function(){
//         $(this).parents('div').remove();
//     }); 
// });