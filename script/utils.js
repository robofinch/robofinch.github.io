loaded.files[  'script/utils.js'  ]   =   true


//------------------------------------------------------------------------------------------------
//          Define a class similar to Array, but 2-dimensional
//------------------------------------------------------------------------------------------------

class Matrix {

   constructor(  x, y, defaultValue=undefined  ) {

      this.m  =  this.newMat( x, y, defaultValue )

      this.width   =  x
      this.height  =  y

      this.minElement  =  []
      this.maxElement  =  []
   }


   //Internally used while creating a new Matrix.
   newMat(  x, y, defaultValue=undefined ) {

      var outputMat = []
      for (var i = 0; i < y; i++) {

         outputMat.push(  new Array( x )  )
         outputMat[i].fill(  defaultValue  )

      }
      return outputMat
   }


   //Setter
   set( pos, value ) {

      if (        pos[0]  >= 0   &&   pos[0] < this.width
        &&        pos[1]  >= 0   &&   pos[1] < this.height  )  {

         this.m[  pos[1]         ][   pos[0]                ]  =  value

      }
   }


   //Getter
   at( pos ) {

      if (               pos[0]  >= 0   &&   pos[0] < this.width
        &&               pos[1]  >= 0   &&   pos[1] < this.height  ) {

         return this.m[  pos[1]         ][   pos[0]                ]

      } else {

         return null

      }
   }


   //Iterates through each index of a Matrix,
   //in place of a double for loop.
   forEach( func ) {

      doubleFor(  this.height, this.width,  ( y, x )  =>  {

         func(  this.m[y][x], x, y, this.m  )
      })
   }


   //Iterates through each index of a Matrix, with each
   //corresponding element of another Matrix as a parameter.
   matrixForEach( matrix, func ) {

      doubleFor(  this.height, this.width,  ( y, x )  =>  {

         func(  this.m[ y ][ x ],  matrix.m[  y%matrix.height  ][  x%matrix.width ],
                x, y, this.m, matrix.m  )
      })
   }


   //Calls a function on each element of the Matrix
   //and returns the results as a new Matrix.
   map( func ) {

      var outputMatrix  =  new Matrix(  this.width, this.height  )


      doubleFor(  this.height, this.width,  ( y, x )  =>  {

         outputMatrix.m[y][x]  =  func(  this.m[y][x], x, y, this.m  )
      })

      return outputMatrix
   }


   //Calls a function on each element of the Matrix
   //and returns the results as a new Matrix, with each
   //corresponding element of another Matrix as a parameter.
   matrixMap( matrix, func ) {

      var outputMatrix  =  new Matrix(  this.width, this.height  )


      doubleFor(  this.height, this.width,  ( y, x )  =>  {

         outputMatrix.m[y][x]  =  func(  this.m[ y ][ x ],
               matrix.m[  y%matrix.height  ][  x%matrix.width ], x, y, this.m, matrix.m  )
      })

      return outputMatrix
   }


   //Returns the minimum value in the Matrix.
   //Can save the index of the element with that minimum value.
   min( saveExtremes ) {

      var
            minimum     =  Infinity,
            minElement  =  []


      this.forEach(   (ele, x, y)  =>  {

         if (  ele < minimum  ) {

            minimum     =  ele
            minElement  =  [ x, y ]
         }
      })

      if ( saveExtremes ) {   this.minElement  =  minElement   }

      return minimum
   }


   //Returns the maximum value in the Matrix.
   //Can save the index of the element with that maximum value.
   max( saveExtremes ) {

      var
            maximum     =  -Infinity,
            maxElement  =  []


      this.forEach(   (ele, x, y)  =>  {

         if (ele > maximum) {

            maximum     =  ele
            maxElement  =  [ x, y ]
         }
      })

      if ( saveExtremes ) {   this.maxElement  =  maxElement   }

      return maximum
   }


   //Linearly scales the Matrix to be between 0 and 1,
   //and returns the result as a new Matrix.
   //Warning: returns a Matrix with 0.0 <= element <= 1.0;
   //It is inclusive with 1.0, NOT exclusive like Math.random()
   floatClamp( saveExtremes=false ) {
      var
            min  =  this.min( saveExtremes ),
            max  =  this.max( saveExtremes )

      if ( min  ===  max )  {
         return this.map(   () => Math.min(   1, Math.max( 0, min )   )   )

      } else {
         return this.map(  element => ( element - min )/( max-min )   )
      }

   }
}



//------------------------------------------------------------------------------------------------
//          A function that smoothly interpolates between two numbers,
//          taking an inclusive float as an input.
//------------------------------------------------------------------------------------------------
const interpolate  =  function(  x, a=0, b=1   ) {

   return  a  +  (b-a) * (  3*x*x  -  2*x*x*x  )

}


//------------------------------------------------------------------------------------------------
//          A modified version of Math.floor() used to treat a number with
//             minimum  <=  number  <=  'max'   as though it were instead
//             minimum  <=  number  <   'max' ,   exclusive at the top.
//------------------------------------------------------------------------------------------------
const floorD  =  function(  num, max  )  {

   return  (num >= max)  ?  max - 1   :  Math.floor( num )
}


//------------------------------------------------------------------------------------------------
//          The most common variant of double for loops
//------------------------------------------------------------------------------------------------
const doubleFor  =  function(  max1, max2, func  ) {

   for (var i = 0; i < max1; i++) {
   for (var j = 0; j < max2; j++) {

      func(  i , j  )
   }
   }
}


//------------------------------------------------------------------------------------------------
//          The classic function for setting multiple attributes at a time.
//          Warning: unlike some implentations,
//                   this accepts an array rather than an object.
//------------------------------------------------------------------------------------------------
const setAttributes  =  function(  element, attrArr  ) {

   for (var row of attrArr) {

      element.setAttribute(  row[0], row[1]  )
   }

}


//------------------------------------------------------------------------------------------------
//          A repeating, steep (but continuous) step function
//------------------------------------------------------------------------------------------------
const steeperStep  =   function(  num  ) {

   var
         coef      =   2 * Math.PI ,

         output    =   coef * num  -  Math.sin(  coef * num  )

   return          (   output      -  Math.sin(  output      )   ) / coef
}


//------------------------------------------------------------------------------------------------
//          Removes repeated rows from a 2d array when the
//          first 'depth' elements in a row are the same. It leaves
//          one copy of each repeated row, and only removes repeats.
//------------------------------------------------------------------------------------------------
const remRepRows   =  function(  mat, depth=mat[0].length  ) {

   var
         output    =  []  ,
         noMatch          ,      matRow           ,
         elematch         ,      outputRow


   for (         matRow of mat     )  {

      noMatch      =  true

      for (   outputRow of output  )  {

         elematch  =  true



         for (var k = 0; k < depth; k++) {

            elematch  =  elematch && (  outputRow[ k ]  ===  matRow[ k ]  )

         }

         if ( elematch ) {

            noMatch   =  false
            break
         }


      }


      if ( noMatch ) {
         output.push([  ...matRow  ])
      }

   }
   return output
}


//------------------------------------------------------------------------------------------------
//          Returns a 2d array of grid positions that are a certain manhattan distance
//          away from a given point
//------------------------------------------------------------------------------------------------
const manhattan  =  function(  x, y, distance     )  {

   var output  =   [[  x - distance  ,  y                           ]]


   for (var i  =  -distance + 1; i < distance; i++)  {

      output.push(  [  x + i         ,  y + distance - Math.abs(i)  ]  )
      output.push(  [  x + i         ,  y - distance + Math.abs(i)  ]  )

   }


   if ( distance  !==  0 )  {

      output.push(  [  x + distance  ,  y                           ]  )

   }


   return output
}


//------------------------------------------------------------------------------------------------
//          Converts an array of 8-bit RGB values to a CSS rgb color string
//------------------------------------------------------------------------------------------------
const rgbArr  =  function(  arr  )  {
   var
         r  =  arr[ 0 ].toString(16).toUpperCase()    ,
         g  =  arr[ 1 ].toString(16).toUpperCase()    ,
         b  =  arr[ 2 ].toString(16).toUpperCase()

   r        =  (  r.length  ===  1  )  ?   '0' + r    :  r
   g        =  (  g.length  ===  1  )  ?   '0' + g    :  g
   b        =  (  b.length  ===  1  )  ?   '0' + b    :  b

   return '#' + r + g + b
}


//------------------------------------------------------------------------------------------------
//          The SVG namespace
//------------------------------------------------------------------------------------------------
const SVGNS  =  'http://www.w3.org/2000/svg'

