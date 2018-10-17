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
    Compat.onBrowserVisibilityChange(()=>{
        if(prevVis!=null)
            acceptText("prevVisibilityChange",prevVis.toString());
        prevVis=new Date();
        acceptText("visibilityChange",prevVis.toString());
    });
    acceptText("browserWidth",Compat.getViewportWidth());
    acceptText("browserHeight",Compat.getViewportHeight())
    Compat.onResize(()=>{acceptDate("lastResize");acceptText("browserWidth",Compat.getViewportWidth());acceptText("browserHeight",Compat.getViewportHeight())})
    //Compat.onScroll(()=>{});
    setInterval(()=>{

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

            if(Compat.isPartiallyInViewport(e))
                t2+=e.id+"<br>";

            if(Compat.isInViewport (e,100))
                t3+=e.id+"<br>";

            if(Compat.isPartiallyInViewport(e,100))
                t4+=e.id+"<br>";


        });
        acceptText("div1VisArea",Compat.getVisiblePercentage(ids[0]));
        acceptText("div2VisArea",Compat.getVisiblePercentage(ids[1]));
        acceptText("div1ScreenArea",Compat.getScreenPercentage(ids[0]));
        acceptText("div2ScreenArea",Compat.getScreenPercentage(ids[1]));
        acceptText("Visible",t1);
        acceptText("PartiallyVisible",t2);
        acceptText("Visiblewithin",t3);
        acceptText("PartiallyVisiblewithin",t4);
        let allVars=
            [
                ["Screen Width","screen.width"],
                ["Screen height","screen.height"],
                ["Screen orientation","screen.orientation.type"],
                ["Screen angle","screen.orientation.angle"],
                ["Visual viewport width","innerWidth"],
                ["Visual viewport height","innerHeight"],
                ["Layout viewport width","document.documentElement.clientWidth"],
                ["Layout viewport height","document.documentElement.clientHeight"],
                ["PageX scroll","pageXOffset"],
                ["PageY scroll","pageYOffset"]
            ];
        if(document.getElementById("custom0")==null) {
            for (let k = 0; k < allVars.length; k++) {
                let newTr=document.createElement("tr");
                let newTd1=document.createElement("td");
                let newTd2=document.createElement("td");
                newTd1.innerHTML=allVars[k][0];
                newTd2.id="custom"+k;
                newTr.appendChild(newTd1);
                newTr.appendChild(newTd2);
                document.getElementById("mainTableBody").appendChild(newTr);
            }
        }
        for (let k = 0; k < allVars.length; k++) {
            let curId="custom"+k;
            let curVar=allVars[k][1].split(".");
            let curTarget=window;
            for(let j=0;j<curVar.length;j++)
            {
                curTarget=curTarget[curVar[j]];
                if(curTarget == undefined)
                    break;
            }
            let text="[[undefined]]";
            if(curTarget!=undefined)
                text=curVar;
            document.getElementById(curId).innerHTML=curTarget;
        }


    },500);
});
