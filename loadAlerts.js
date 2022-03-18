if (   loaded.ALERTS   )  {

    loaded.msg          =  '' ,
    loaded.notLoaded    =  0


    for (  let file in loaded.files  )  {

       if (  !loaded.files[ file ]   )  {

          loaded.notLoaded++

          loaded.msg      +=  '\n' + file + ' failed to be loaded.'

       }

    }

    alert(   loaded.notLoaded + ' files could not be loaded.' + loaded.msg   )

 }