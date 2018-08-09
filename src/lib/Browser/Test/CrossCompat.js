import * as Compat from '../CrossCompat.js';

let accept=function(id){acceptText(id,"SI");}
let acceptDate=function(id){acceptText(id,(new Date()).toString());}
let acceptText=function(id,t){document.getElementById(id).innerHTML=t;}
let reject=function(id){acceptText(id,"NO");}

Compat.onLoad(()=>accept("load"));
Compat.onReady(()=>accept("ready"));
setTimeout(()=> Compat.onLoad(()=>accept("loadDelayed")),4000);
setTimeout(()=> Compat.onReady(()=>accept("readyDelayed")),4000);
let prevVis=null;

Compat.onLoad(()=>{
    let coords=Compat.getElementCoordinates(document.getElementById("trackedDiv"));

    acceptText("coords","top:"+coords.top+"<br>bottom:"+coords.bottom+"<br>left:"+coords.left+"<br>right:"+coords.right);
    Compat.onVisibilityChange(()=>{
        if(prevVis!=null)
            acceptText("prevVisibilityChange",prevVis.toString());
        prevVis=new Date();
        acceptText("visibilityChange",prevVis.toString());
    });
    acceptText("browserWidth",Compat.getViewportWidth());
    acceptText("browserHeight",Compat.getViewportHeight())
    Compat.onResize(()=>{acceptDate("lastResize");acceptText("browserWidth",Compat.getViewportWidth());acceptText("browserHeight",Compat.getViewportHeight())})

    Compat.onScroll(()=>{

        let ids=[document.getElementById("trackedDiv"),document.getElementById("trackedDiv1")];
        acceptText("yscroll",Compat.getYScroll());
        let t1="";
        let t2="";
        let t3="";
        let t4="";
        ids.map((e)=>{
            console.log("SCROLL");
            if(Compat.isInViewport (e))
                t1+=e.id+"<br>";
            else
            {
                if(Compat.isPartiallyInViewport(e))
                    t2+=e.id+"<br>";
                else
                {
                    if(Compat.isInViewport (e,100))
                        t3+=e.id+"<br>";
                    else
                    {
                        if(Compat.isPartiallyInViewport(e,100))
                            t4+=e.id+"<br>";
                    }
                }
            }


        });

        acceptText("Visible",t1);
        acceptText("PartiallyVisible",t2);
        acceptText("Visiblewithin",t3);
        acceptText("PartiallyVisiblewithin",t4);

    })
});
