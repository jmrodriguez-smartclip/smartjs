export default class Timing {

    static relative() {
        switch(Timing.timingType)
        {
            case 0:{return null;}
            case 1:{return Timing.timestamp()-performance.timing.navigationStart;}
            case 2:{return performance.now();}
        }
    }

    static timestamp() {
        return new Date().getTime();
    }
    static beginMeasuring()
    {
        let start=Timing.timestamp();
        return {end:function(){return Timing.timestamp()-start;}}
    }

    static getTimings(w = top) {
        if (w.performance.getEntriesByType) {
            let res = w.performance.getEntriesByType("navigation");
            if (res.length == 1) {
                return Timing.getTimingsv2(res[0]);
            }
        }
        return Timing.getTimingsv1();
    }

    static getTimingsv2(props) {
        return {
            timingsVersion: 2,
            navigationStart: Timing.timestamp()-Timing.relative(),
            loadTime: props.domComplete,
            loadEventTime: props.loadEventEnd - props.loadEventStart,
            readyTime: props.domInteractive,
            readyEventTime: props.domContentLoadedEventEnd - props.domContentLoadedEventStart,
            networkTime: props.responseEnd - props.requestStart,
            transferSize: props.transferSize,
            decodedBodySize: props.decodedBodySize
        };
    }

    static getTimingsv1() {
        let base = performance.timing;
        if (base === undefined) {
            return {
                timingsVersion: 0,
                navigationStart:null,
                loadTime: null,
                loadEventTime: null,
                readyTime: null,
                readyEventTime: null,
                networkTime: null,
                transferSize: null,
                decodedBodySize: null
            };
        }
        let reference = base.connectStart;
        return {
            timingsVersion: 1,
            navigationStart: reference,
            loadTime: base.domComplete - reference,
            loadEventTime: base.loadEventEnd - base.loadEventStart,
            readyTime: base.domInteractive - reference,
            readyEventTime: base.domContentLoadedEventEnd - base.domContentLoadedEventStart,
            networkTime: base.responseEnd - base.requestStart,
            transferSize: null,
            decodedBodySize: null
        }
    }
}
if (window.performance.getEntriesByType)
    Timing.timingType=2;
else
{
    if(window.performance.timing)
        Timing.timingType=1;
    else {
        Timing.timingType = 0;
    }
}
