export function browserInfo() {
    let t=true;
    let ua=window.navigator.userAgent;
    let r=function(rr) {return rr.test(ua);}
    function getMatch(regex,pos)
    {
        let match = ua.match(regex);
        return (match && match.length > 1 && match[pos]) || '';
    }
    function getFirst(regex) {return getMatch(regex,1);}
    function getSecond(regex) {return getMatch(regex,2);}

    let iosdevice = getFirst(/(ipod|iphone|ipad)/i).toLowerCase()
        , android = r(/android/i)
        , chromeos = r(/CrOS/)
        , webos = r(/(web|hpw)os/i)
        , windowsphone = r(/windows phone/i)
        , windows = !windowsphone && r(/windows/i)
        , mac = !iosdevice && r(/macintosh/i)
        , linux = !android &&  !webos && r(/linux/i)
        , edgeVersion = getSecond(/edg([ea]|ios)\/(\d+(\.\d+)?)/i)
        , versionIdentifier = getFirst(/version\/(\d+(\.\d+)?)/i)
        , tablet = r(/tablet/i) && !r(/tablet pc/i)
        , mobile = !tablet && r(/[^-]mobi/i)
        , xbox = r(/xbox/i),
        name=null,version=null,osname=null,device="desktop",blackberry=false;

    if (r(/opera/i)) {
        name='Opera'; version= versionIdentifier || getFirst(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
    } else if (r(/opr\/|opios/i)) {
        name='Opera';version=getFirst(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier;
    }
    else if (r(/SamsungBrowser/i)) {
        name='Samsung Internet for Android';
        version=versionIdentifier || getFirst(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
    }
    else if (windowsphone) {
        name='Windows Phone';
        osname='Windows Phone';
        if (edgeVersion)
            version = edgeVersion;
        else
            version = getFirst(/iemobile\/(\d+(\.\d+)?)/i)
    }
    else if (r(/msie|trident/i)) {
        name= 'Internet Explorer';
        version=getFirst(/(?:msie |rv:)(\d+(\.\d+)?)/i)
    } else if (chromeos) {
        name='Chrome'
        osname= 'Chrome OS';
        chromeos= true;
        version= getFirst(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
    } else if (r(/edg([ea]|ios)/i)) {
        name='Microsoft Edge';
        version= edgeVersion;
    }
    else if (r(/firefox|iceweasel|fxios/i)) {
        name='Firefox';
        version= getFirst(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i);
        if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua))
            osname = 'Firefox OS'
    }
    else if (r(/blackberry|\bbb\d+/i) || r(/rim\stablet/i)) {
        name= 'BlackBerry';
        osname='BlackBerry OS';
        blackberry=t;
        version= versionIdentifier || getFirst(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
    }
    else if (webos) {
        name= 'WebOS';
        osname='WebOS';
        version=versionIdentifier || getFirst(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i);
    }
    else if (r(/chromium/i)) {
        name='Chromium';
        chromium= t;
        version=getFirst(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier;
    }
    else if (r(/chrome|crios|crmo/i)) {
        name= 'Chrome';
        version= getFirst(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i);
    }
    else if (android) {
        name='Android';
        version= versionIdentifier;
    }
    else if (r(/safari|applewebkit/i)) {
        name= 'Safari';
        safari= t;
        if (versionIdentifier) {
            version = versionIdentifier
        }
    }
    else if (iosdevice) {
        name = iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod';
        if (versionIdentifier) {
            version = versionIdentifier
        }
    }
    else if(r(/googlebot/i)) {
        name= 'Googlebot';
        googlebot= t;
        version= getFirst(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier;
    }
    else {
        name= getFirst(/^(.*)\/(.*) /),
            version= getSecond(/^(.*)\/(.*) /)
    }

    // set OS flags for platforms that have multiple browsers
    if (!windowsphone && android)
        osname = 'Android';
    else if (!windowsphone && iosdevice)
        osname = 'iOS';
    else if (mac)
        osname = 'macOS';
    else if (xbox)
        osname = 'Xbox';
    else if (windows)
        osname = 'Windows';
    else if (linux)
        osname = 'Linux';


    function getWindowsVersion (s) {

        let tt={
            'NT': 'NT',
            'XP': 'XP',
            'NT 5.0': '2000',
            'NT 5.1': 'XP',
            'NT 5.2': '2003',
            'NT 6.0': 'Vista',
            'NT 6.1': '7',
            'NT 6.2': '8',
            'NT 6.3': '8.1',
            'NT 10.0': '10'
        };
        return typeof tt[s]=="undefined"?null:tt[s];
    }

    // OS version extraction
    let osVersion = '';
    if (windows) {
        osVersion = getWindowsVersion(getFirst(/Windows ((NT|XP)( \d\d?.\d)?)/i))
    } else if (windowsphone) {
        osVersion = getFirst(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (mac) {
        osVersion = getFirst(/Mac OS X (\d+([_\.\s]\d+)*)/i);
        osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (iosdevice) {
        osVersion = getFirst(/os (\d+([_\s]\d+)*) like mac os x/i);
        osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
        osVersion = getFirst(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (blackberry) {
        osVersion = getFirst(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    }

    // device type extraction
    let osMajorVersion = !windows && osVersion.split('.')[0];
    if(!osMajorVersion)osMajorVersion="";
    if (
        tablet
        || iosdevice == 'ipad'
        || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
    ) {
        device="tablet";
    } else if (
        mobile
        || iosdevice == 'iphone'
        || iosdevice == 'ipod'
        || android
        || blackberry
    ) {
        device="mobile";
    }

    return {
        name:name,version:version,osName:osname,osVersion:osVersion,osMajorVersion:osMajorVersion,device:device
    }
}
