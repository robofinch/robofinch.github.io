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


function initializeSVG() {

    var svg = document.createElementNS(  SVGNS, 'svg' )

    setAttributes(  svg,  [

        [  'id'           ,    'mainSVG'              ],
        [  'viewBox'      ,    '0 0 256 256'          ],
        [  'preserveAspectRatio',   'xMinYMin meet'   ]
    ])

    document.getElementById('IconDiv').appendChild(  svg  )
}

//------------------------------------------------------------------------------------------------


document.getElementById( 'body' ).addEventListener(  'click'  ,  event  =>  {

      alert('click')
      showTop()

})

function showTop() {
   var world = document.getElementById('TopDiv')

   world.classList.remove('hidden')
}


initializeSVG()
var icn = new Icon('Circle');

} catch ( error ) {

   alert( error )

}}

window.addEventListener(  'load', function() {
   window.setTimeout(             function() {

      main()

   }, 500)
})
