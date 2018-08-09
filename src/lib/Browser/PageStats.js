import * as Common from 'Common.js';
import * as Compat from 'CrossCompat.js';
let i={};
let hiddenCounter=0;
let lastHide=0;
let accumHidden=0;

function relativeTimestamp()
{
    return (new Date()).getTime() - window.performance.timing.navigationStart;
}
function  updatePageShownPercentage()
{
    if(lastHide==0)
        i.pageShownPercentage=1;
    else
        i.pageShownPercentage=1-(accumHidden/relativeTimestamp());
}
function onPageShow()
{
    if(hiddenCounter == 0)
        return;
    accumHidden+=relativeTimestamp()-lastHide;
    updatePageShownPercentage();
}
function onPageHide()
{
    i.nPageHides++;
    updatePageShownPercentage();
    lastHide=relativeTimestamp();
}

function recalculateScrollTimes(){

    let w=window;
    while(w!=w.parent)
        w=w.parent;

    let r2=window.performance.now();
    let diff=r2-reference;
    reference=r2;
    let scTop=(typeof w.pageYOffset!="undefined")?w.pageYOffset:sy= r.scrollTop || b.scrollTop || 0;
    if(lastOffset==null) {
        lastOffset = scTop;
        j.pixelsScrolled=0;
    }
    j.pixelsScrolled+=Math.abs(lastOffset-scTop);
    lastOffset=scTop;
    if(j.maxScroll < scTop)
        j.maxScroll=scTop;



    let scBottom=scTop+w.innerHeight;
    let step=w.document.body.scrollHeight/5;
    let cStep=0;
    for(let k=0;k<5;k++,cStep+=step)
    {
        if(cStep+step < scTop)
            continue;
        if(cStep > scBottom)
            continue;
        let top=Math.max(scTop,cStep);
        let bottom=Math.min(scBottom,cStep+step);
        let zoneBound=bottom-top;
        let percent=zoneBound/w.innerHeight;
        viewableZones[k]+=percent*diff;
    }
    let totalTime=m.relativeTimestamp();

    j.viewableTime0=viewableZones[0]/totalTime;
    j.viewableTime20=viewableZones[1]/totalTime;
    j.viewableTime40=viewableZones[2]/totalTime;
    j.viewableTime60=viewableZones[3]/totalTime;
    j.viewableTime80=viewableZones[4]/totalTime;
};

export function PageStats()
{
    i={
        pixelsScrolled:null,
        navigationStart:null,
        bodyWidth:null,
        bodyHeight:null,
        navigatorWidth:window.innerWidth,
        navigatorHeight:window.innerHeight,
        screenWidth:window.screen.width,
        screenHeight:window.screen.height,
        processorSpeed:null,
        navigationType:null,
        loadTimerScore:null,
        networkSpeed:null,
        viewableTime0:0,
        viewableTime20:0,
        viewableTime40:0,
        viewableTime60:0,
        viewableTime80:0,
        firstScroll:null,
        maxScroll:0,
        referer:null,
        protocol:null,
        url:null,
        domain:null,
        path1:null,
        path2:null,
        pageViewStart:null,
        pageViewTime:null,
        nImages:0,
        nScripts:0,
        nVideos:0,
        browserName:'',
        browserVersion:'',
        osName:'',
        osVersion:'',
        device:'desktop',
        pageLoadTime:null,
        pageReadyTime:null,
        gotPageReady:false,
        gotPageLoad:false,
        headLength:null,
        bodyLength:null,
        pageLength:null,
        nIframes:null,
        nRemoteScripts:null,
        netInfoDownlink:null,
        netInfoEffType:null,
        netInfoRtt:null,
        netInfoType:null,
        netInfoDownlinkMax:null,
        nPageHides:0,
        pageShownPercentage:0,
        refererDomain:null
    };


    if (window.performance) {
        i.navigationStart=window.performance.timing.navigationStart;
        let j=i;
        let m=this;
        let viewableZones=[0,0,0,0,0];
        let reference=window.performance.now();
        let lastOffset=null;


        let fns=[
            function(){
                if(Common.isset(navigator.connection))
                {
                    let fields=["downlink","effectiveType","rtt","type","downlinkMax"];
                    let variables=["netInfoDownlink","netInfoEffType","netInfoRtt","netInfoType","netInfoDownlinkMax"];
                    for(let k=0;k<fields.length;k++)
                    {
                        let cV=fields[k];
                        if(Common.isset(navigator.connection[cV]))
                            j[variables[k]]=navigator.connection[cV];
                    }
                    if(isNaN(parseFloat(j.netInfoDownlink)))
                        j.netInfoDownlink=0;
                }

            },
            function(){
                let t1 = window.performance.now();
                for (let t = 0; t < 20000; t++);
                j.processorSpeed = (window.performance.now() - t1);
            },
            function(){

                switch(window.performance.navigation.type)
                {
                    case 0:{j.navigationType="link";}break;
                    case 1:{j.navigationType="reload";}break;
                    case 2:{j.navigationType="back";}break;
                    default:{j.navigationType="unknown";}break;
                }
            },
            function()
            {
                let imageAddr = "https://a482323.storage.oraclecloud.com/v1/Storage-a482323/smartclip-services/HeaderBidding/js/spt.png";
                let downloadSize = 3160; //bytes
                let startTime, downTime;
                let download = new Image();
                download.onload = function () {
                    j.networkSpeed=window.performance.now()-startTime;
                };
                let cacheBuster = "?nnn=" + (new Date()).getTime();
                download.src = imageAddr + cacheBuster;
                startTime=window.performance.now();
            },
            function()
            {
                let d= document, r= d.documentElement, b= d.body;
                window.addEventListener("scroll",function(e) {
                    if(j.firstScroll==null)
                        j.firstScroll=m.relativeTimestamp();
                    recalculateScrollTimes();
                });
            },
            function()
            {
                let bdata=SMC.browserInfo();
                j.browserName=bdata.name;
                j.browserVersion=bdata.version;
                j.osName=bdata.osName;
                j.osVersion=bdata.osVersion;
                j.device=bdata.device;
            },
            function()
            {
                j.domain=window.location.host;
                let a=document.createElement("a");
                a.href=document.location;
                j.referer=document.referrer;
                j.protocol=a.protocol;
                j.url=document.location.href;
                a.href=j.referer;
                j.refererDomain=a.hostname;
                let path=a.pathname.split("/");
                if(path.length>0)
                {
                    if(path[0]=="")
                        path.shift();
                    if(path.length > 0)
                    {
                        j.path1=path.shift();
                        if(j.path1=="")
                            j.path1=null;
                        if(path.length > 0)
                            j.path2=path.shift();
                    }
                }
            },
            function()
            {
                let counter=0;
                let timer=null;
                let start=performance.now();
                let f=function(){counter++;if(counter==5){j.loadTimerScore=(performance.now()-start)-5*100;clearInterval(timer)}}
                timer=setInterval(f,100);
            }
        ];
        for(let k=0;k<fns.length;k++) {
            try {
                fns[k].apply(this);
            }catch(e){};
        }
    }

    this.onLoad=function()
    {
        try {
            w=window;
            while(w!=w.parent)
                w=w.parent;
            i.gotPageLoad=true;
            i.pageLoadTime=relativeTimestamp();
            i.bodyWidth=Compat.getViewportWidth(w);
            i.bodyHeight=Compat.getViewportHeight(w);
            i.nScripts=w.document.getElementsByTagName("script").length;
            i.nImages=w.document.getElementsByTagName("img").length;
            i.nVideos=w.document.getElementsByTagName('video').length;
            i.nIframes=w.document.getElementsByTagName('iframe').length;
            if(w.document.querySelector)
            {
                i.nRemoteScripts=w.document.querySelectorAll("script[src]").length;
            }

            i.headLength=(w.document.head && w.document.head.innerHTML)?w.document.head.innerHTML.length:0;
            i.bodyLength=(w.document.body && w.document.body.innerHTML)?w.document.body.innerHTML.length:0;
            i.pageLength=i.headLength+i.bodyLength;
        }catch(e)
        {

        }
    };
    this.onReady=function()
    {
        try{
            i.gotPageReady=true;
            i.pageReadyTime=this.relativeTimestamp();
        }catch(e){}
    };

    this.onUnload=function()
    {
        try {
            recalculateScrollTimes();
            i.pageViewStart=window.performance.timing.navigationStart;
            i.pageViewTime=(new Date()).getTime() - i.pageViewStart;
            this.updagePageShownPercentage();
        }catch(e)
        {

        }
    };
    this.getStats=function()
    {
        return i;
    };
}
