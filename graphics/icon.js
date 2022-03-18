loaded.files[  'graphics/icon.js'  ]   =   true


class Icon {

//------------------------------------------------------------------------------------------------
//          A class for dynamically creating icons
//------------------------------------------------------------------------------------------------


   static KEYS  = {

      sine    :  "0;0.147;0.238;0.25;0.262;0.353;0.5;0.647;0.738;0.75;0.762;0.853;1"  ,
      cosine  :  "0;0.048;0.173;0.25;0.327;0.452;0.5;0.548;0.673;0.75;0.827;0.952;1"  ,
      time    :  "0;0.1;  0.2;  0.25;0.3;  0.4;  0.5;0.6;  0.7;  0.75;0.8;  0.9;  1"

   }

   static num = 0


   constructor(  type, sideLength=48, posX=0, posY=0, iconID=("g" + num++), svgID="mainSVG", baseURI="graphics/question.svg", hidden=false  ) {

      this.id        =   iconID
      this.svgID     =   svgID
      this.baseURI   =   baseURI

      this.g
      this.useEls    =   []

      this.type      =   type

      this.width     =   sideLength
      this.height    =   sideLength
      this.hidden    =   hidden

      this.pos       =   {   x: posX      ,   y: posY        }
      this.ratio     =       sideLength   /      16

      this.initializeIcon()

      this[ type ]()

   }

//------------------------------------------------------------------------------------------------
//          Utility functions
//------------------------------------------------------------------------------------------------

   comID( strng ) {

      return  this.id + '.' + strng
   }

   getEl( strng ) {

      return  document.getElementById(  this.comID( strng )  )
   }


//------------------------------------------------------------------------------------------------
//          Methods for initializing an icon
//------------------------------------------------------------------------------------------------

   initializeIcon() {

      this.g  =  document.createElementNS(  SVGNS, 'g'    )

      setAttributes( this.g, [

         [  'id'      ,  this.id                                   ],
         [  'class'   ,  this.class                                ],

         [  'x'       ,  this.pos.x                                ],
         [  'y'       ,  this.pos.y                                ],
         [  'width'   ,  String( this.width  )                     ],
         [  'height'  ,  String( this.height )                     ],

         [  'display' ,  (this.hidden)   ?   'none'   :  'inline'  ]
      ])

      document.getElementById( this.svgID ).appendChild(  this.g   )

   }



   use(  id, extension, x=0, y=0, coWidth=1, coHeight=1  ) {

      var use = document.createElementNS(  SVGNS, 'use'  )

      setAttributes(   use,  [

         [  'href'     ,  this.baseURI + "#" + extension      ],
         [  'id'       ,  id                                  ],

         [  'x'        ,  this.width  *  x   +   this.pos.x   ],
         [  'y'        ,  this.height *  y   +   this.pos.y   ],
         [  'width'    ,  this.width  *  coWidth              ],
         [  'height'   ,  this.height *  coHeight             ]

      ])

      this.g.appendChild(   use   )
      this.useEls.push(     use   )
   }


//------------------------------------------------------------------------------------------------
//          Methods for changing how an icon renders
//------------------------------------------------------------------------------------------------

   animateColor(  useNum, colorArr, duration ) {
      var
            values     =  ''      ,
            animation  =  document.createElementNS(  SVGNS, 'animate'  )


      for ( var color of colorArr )  {

         values       +=  color   +  ';'

      }

      setAttributes(   animation,    [

         [  'attributeName' ,   'fill'                 ],
         [  'dur'           ,   duration               ],
         [  'repeatCount'   ,   'indefinite'           ],

         [  'values'        ,   values                 ]

      ])

      this.useEls[  useNum  ].appendChild(  animation  )

   }



   animatePath(  useNum, d, duration, keyPoints, keyTimes  ) {

      var animation = document.createElementNS(  SVGNS, 'animateMotion'  )


      setAttributes(   animation,   [

         [  'path'          ,   d                      ],
         [  'dur'           ,   duration               ],
         [  'repeatCount'   ,   'indefinite'           ],

         [  'keyPoints'     ,   keyPoints              ],
         [  'keyTimes'      ,   keyTimes               ],
         [  'calcMode'      ,   'linear'               ]

      ])

      this.useEls[  useNum  ].appendChild(  animation  )

   }



   show() {

      if (  this.hidden   ) {

         this.hidden = false
         this.g.setAttribute(   'display' , 'inline'  )
      }
   }

   hide() {

      if (  !this.hidden  ) {

         this.hidden = true
         this.g.setAttribute(   'display' , 'none'    )
      }
   }



//------------------------------------------------------------------------------------------------
//          Methods for creating specific icons
//------------------------------------------------------------------------------------------------

   Circle() {
       this.use(  this.comID(  'circle.main'  )  ,  'test'  )
   }


}