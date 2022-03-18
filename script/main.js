loaded.files[  'script/main.js'  ]   =   true

const main = function() {
try {


document.getElementById( 'body' ).onclick =  ()  =>  {

      showTop()
      document.getElementById( 'body' ).onclick = null

}

function showTop() {
   var world = document.getElementById('TopDiv')

   world.classList.remove('hidden')

   document.getElementById('questionPathAnimation1').beginElement()
   window.setTimeout(function() {

       document.getElementById('questionPathAnimation2').beginElement()

    }, 1500)
    window.setTimeout(function() {

        document.getElementById('svgGroup1').setAttribute('fill', 'black')
        document.getElementById('svgGroup2').setAttribute('fill', 'black')

    }, 3000)

}


} catch ( error ) {

   alert( error )

}}

window.addEventListener(  'load', function() {
   window.setTimeout(             function() {

      main()

   }, 10)
})
