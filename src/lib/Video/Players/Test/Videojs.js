import Videojs from '../Videojs'
import * as Compat from '../../../Browser/CrossCompat'
import DivNode from '../../../Ads/Container/lib/DivNode'
/* Comportamientos de containers */
//import ExpandOnScroll from '../behaviours/ExpandOnScroll';


Compat.onLoad(()=>{
    let dNode=new DivNode({"id":"root"});
    let vjs=new Videojs(null,{
       src:"http://techslides.com/demos/sample-videos/small.mp4"
    });

    vjs.initialize();
    vjs.loadDependencies();
    vjs.create(dNode);
});
