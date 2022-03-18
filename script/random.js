loaded.files[  'script/random.js'  ]   =   true


/*
| ------------------------------------------------------------------------------------------------
|     A global object used for Perlin noise and pseudo-random number generation
|
|     The methods intended for external use are
|        setPseudorandom(),
|        twoD(),    compositeTwoD(),
|        random(),  randint(),  and   compositeRandom().
|
|     The attributes that may be used externally are
|        useTypes,  pseudorandom,  multiplier,  max,
|        and possibly  currentSeed.
|
|     Be careful if externally using other parts of the object.
|
| ------------------------------------------------------------------------------------------------
*/

const random = {

   vectorGrid   :  {}                  ,

   ratio        :  {   x: 1, y: 1   }  ,


   useTypes     :  {}                  ,
   otherType    :  false               ,


   setPseudorandom(  type  ) {

      var pr    =  this.useTypes[ type ]

if (pr === undefined) {alert('hey did you forget to add the ' + type + ' random use type?')}

      this.pseudorandom    =    ( pr === undefined )   ?   this.otherType   :   pr

   },


   //This is the PRNG

   pseudorandom :               false  ,
   currentSeed  :              131071  ,
   multiplier   :            42000011  ,
   max          :          2147483647  ,
   range        :             1000000  ,

   //Returns a random number from 0 to [range] - 1
   random(  setSeed=true, seed=this.currentSeed  )  {

      if (  !this.pseudorandom  ) {

         return  Math.floor(    Math.random() * this.range   )

      }


      if (  seed === 0  ) {   seed = 1   }

      seed  =  (  seed*this.multiplier  ) % this.max

      if ( setSeed ) {   this.currentSeed = seed   }


      return  seed % this.range
   },


   //Two methods that return a random integer from 0 to [input] - 1

   randint( num ) {
      return Math.floor(  num * this.random() / this.range  )
   },


   compositeRandom(  max, randomness=15, primes=true  ) {
      var
            primeList  =  [  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47  ]
            output     =  this.random()


      if (   ( randomness > primeList.length ) ? false : primes   ) {


         for (var i = 0; i < randomness; i++) {

            output    +=  this.random() * primeList[i]
         }


      } else {


         for (var i = 0; i < randomness; i++) {

            output    +=  this.random() * i
         }


      }

      return output % max
   },


   //The two perlin noise generation functions

   compositeTwoD(  xSize, ySize, seed=undefined, saveExtremes=false  ) {

      var outputMatrix  =  this.twoD(  xSize                   ,
                                       ySize                   ,   false  , seed,

                                       Math.ceil(  xSize / 32  ),
                                       Math.ceil(  ySize / 32  ))


      outputMatrix  =  outputMatrix.matrixMap(

                          this.twoD(   xSize                   ,
                                       ySize                   ,   true   ),

                          ( ele1, ele2 ) =>  ele1 + ele2 / 2   )

      outputMatrix  =  outputMatrix.matrixMap(

                          this.twoD(   Math.ceil(  xSize / 4   ),
                                       Math.ceil(  ySize / 4   ),  true   ),

                          ( ele1, ele2 ) =>  ele1 + ele2 / 4   ).floatClamp( saveExtremes )

      return outputMatrix

   },



   twoD(   sizeX, sizeY, repeat=false, startSeed=this.currentSeed,
           gridX=Math.ceil( sizeX / 8 ),   gridY=Math.ceil( sizeY / 8 )    ) {


      if (  startSeed === 0  ) {   startSeed = 1   }

      this.ratio.x  =  gridX / sizeX
      this.ratio.y  =  gridY / sizeY



      this.vectorGrid = this.vectorMatrix(   gridX + 1,  gridY + 1,  100, startSeed, true  )

      if ( repeat ) {


         for (var i = 0; i < this.vectorGrid.height - 1; i++) {

            this.vectorGrid.m[ i ][  this.vectorGrid.width - 1   ]  =  this.vectorGrid.m[ i ][ 0 ]
         }


         for (var j = 0; j < this.vectorGrid.width - 1;  j++) {

            this.vectorGrid.m[  this.vectorGrid.height - 1  ][ j ]  =  this.vectorGrid.m[ 0 ][ j ]
         }


         this.vectorGrid.m[  this.vectorGrid.height - 1  ]
                          [  this.vectorGrid.width  - 1  ]          =  this.vectorGrid.m[ 0 ][ 0 ]
      }



      var     outputMatrix  =  new Matrix(  sizeX, sizeY  )

              outputMatrix  =  outputMatrix.map(   (element, x, y)  =>  this.pixel( x, y )   )

      return  outputMatrix

   },


   //Internal functions

   pixel( xIn, yIn ) {
      var
            x       ,    y       ,
            X       ,    Y       ,
            topL    ,    topR    ,
            botL    ,    botR

      x     =  xIn  *  this.ratio.x
      y     =  yIn  *  this.ratio.y

      X     =  Math.floor( x )
      Y     =  Math.floor( y )

      topL  =  this.dotProduct(   x , y  ,   X     ,   Y     )
      topR  =  this.dotProduct(   x , y  ,   X+1   ,   Y     )
      botL  =  this.dotProduct(   x , y  ,   X     ,   Y+1   )
      botR  =  this.dotProduct(   x , y  ,   X+1   ,   Y+1   )

      return   interpolate(       y - Y  ,
               interpolate(       x - X  ,   topL  ,   topR  ),
               interpolate(       x - X  ,   botL  ,   botR  ))
   },


   vectorMatrix(   sizeX, sizeY, range=1000, startSeed=1973, returnSeed=true   ) {
      var
            matrix       =   new Matrix(  sizeX, sizeY  ),
            seed         =   this.currentSeed

      this.currentSeed   =   startSeed



      matrix  =  matrix.map(   () => {

         var k  =   0.02 * Math.PI    *   (  this.random()%range  )

         return [   Math.cos(  k  )   ,
                    Math.sin(  k  )   ]
      })



      if ( !returnSeed ) {   this.currentSeed  =  seed   }

      return matrix
   },


   dotProduct(  x, y, gridX, gridY  ) {

      var grid  =  this.vectorGrid.m[ gridY ][ gridX ]

      return    grid[0]  *  (  x - gridX  )
           +    grid[1]  *  (  y - gridY  )
   }

}
