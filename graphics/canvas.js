loaded.files[  'graphics/canvas.js'  ]   =   true


class Canvas {

//------------------------------------------------------------------------------------------------
//          A class for dynamically creating a canvas, with utlity methods for it
//------------------------------------------------------------------------------------------------


   constructor(   canvasID, parentID, width, height   ) {

      this.canvas               =    document.createElement( 'canvas' )
      this.id                   =    canvasID

      this.width                =    width
      this.height               =    height

      this.gray.parent          =    this
      this. rgb.parent          =    this

      this.grayAlpha.parent     =    this
      this. rgbAlpha.parent     =    this

      this.canvas.id            =    canvasID
      this.canvas.width         =    width
      this.canvas.height        =    height

      this.canvas.style.width   =   'inherit'
      this.canvas.style.height  =   'inherit'

      this.canvas.style.imageRendering     =  'pixelated'

      if ( parentID ) { document.getElementById( parentID ).appendChild(  this.canvas  )   }

      this.ctx   =   this.canvas.getContext(  '2d'  )

   }

//------------------------------------------------------------------------------------------------
//          Methods for drawing to the canvas
//------------------------------------------------------------------------------------------------

   gray = {


      color( float ) {

         var   result  =  Math.min(   Math.max( 0, float ), 1    )

               result  =    floorD(   256 * result        , 256  ).toString(16).toUpperCase()


         if (  result.length  ===  1  )   {

               result  =  '0' + result
         }

         return  '#' + result + result + result

      },

      drawPixel(  float, x, y  ) {

         this.parent.ctx.fillStyle  =  this.color(  float  )
         this.parent.ctx.fillRect(  x, y, 1, 1  )

      },

      drawMatrix(  imageMatrix, negatives=false  ) {

         if ( negatives ) {

            imageMatrix.forEach(  ( color              ,  x , y  )   =>
               this.drawPixel(    ( color + 1 ) * 0.5  ,  x , y  )   )

         } else {

            imageMatrix.forEach(  ( color              ,  x , y  )   =>
               this.drawPixel(      color              ,  x , y  )   )
         }

      }
   }



   grayAlpha = {


      color( float, alpha ) {

         var   result  =  Math.min(   Math.max( 0, float ), 1    )

               result  =     floorD(     256 * result     , 256  )  +  ', '

         return  'rgba('  +  result + result + result     +  alpha  +  ')'

      },

      drawPixel(  float, alpha, x, y  ) {

         this.parent.ctx.fillStyle   =   this.color(  float, alpha  )

         this.parent.ctx.clearRect(  x, y, 1, 1  )
         this.parent.ctx.fillRect(   x, y, 1, 1  )

      },

      drawMatrix(  imageMatrix, colorVar, alphaVar  ) {

         imageMatrix.forEach(   (  color                ,   x , y  )   =>

            this.drawPixel(        color[  colorVar  ]  ,
                                   color[  alphaVar  ]  ,   x , y  )   )

      }
   }



   rgb = {


      drawPixel(  rgb, x, y  ) {

         this.parent.ctx.fillStyle  =  rgbArr(  rgb  )
         this.parent.ctx.fillRect(  x, y, 1, 1  )

      },

      drawMatrix(  imageMatrix  ) {

         imageMatrix.forEach(   ( color              ,  x , y  )   =>
            this.drawPixel(       color              ,  x , y  )   )

      }

   }



   rgbAlpha = {


      color( rgb, alpha ) {

         return  'rgba('   +  rgb[ 0 ]  +  ', '
                           +  rgb[ 1 ]  +  ', '
                           +  rgb[ 2 ]  +  ', '   +  alpha  +  ')'

      },

      drawPixel(  rgb, alpha, x, y  ) {

         this.parent.ctx.fillStyle  =  this.color(  rgb, alpha  )

         this.parent.ctx.clearRect(  x, y, 1, 1  )
         this.parent.ctx.fillRect(   x, y, 1, 1  )

      },

      drawMatrix(  imageMatrix, colorVar, alphaVar  ) {

         imageMatrix.forEach(   (  color                ,   x , y  )   =>

            this.drawPixel(        color[  colorVar  ]  ,
                                   color[  alphaVar  ]  ,   x , y  )   )

      }

   }
}