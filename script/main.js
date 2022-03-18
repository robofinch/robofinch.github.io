loaded.files[  'script/main.js'  ]   =   true

const main = function() {
try {



document.getElementById( 'consoleButton' ).addEventListener(  'click'  ,  function()  {

      try {
         eval(  document.getElementById( 'console' ).value  )

      }  catch( e ) {   alert( e )   }

})


//------------------------------------------------------------------------------------------------


Object.prototype.toString  =  function() {   return '[object ' + this.constructor.name + ']'   }


//------------------------------------------------------------------------------------------------


document.getElementById( 'TopDiv' ).addEventListener(  'click'  ,  event  =>  {

      alert('click')

})

function showTop() {
   var world = document.getElementById('TopDiv')

   world.click()
   world.classList.remove('hidden')
}




} catch ( error ) {

   alert( error )

}}

window.addEventListener(  'load', function() {
   window.setTimeout(             function() {

      main()

   }, 500)
})
