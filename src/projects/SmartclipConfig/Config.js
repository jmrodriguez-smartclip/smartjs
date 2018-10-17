let cloudUrl="https://a482323.storage.oraclecloud.com/v1/Storage-a482323/smartclip-services/HeaderBidding/js/";
const Config={
    Services:{
        "Logger":{
            instance:"lib.Log.KibanaLogger",
            config: {
                KibanaLogger: 'https://stats.smartclip-services.com:8889/j4.php'
            }
        },
        "PageStats":{
            instance:"lib.Browser.PageStats",
            config: {
                cloudUrl: cloudUrl,
                sampleFile: "spt.png",
                // Numero de bytes del fichero de sampling de red
                sampleSize: 3160
            }
        },
        "Scheduler":{
            instance:"lib.Browser.Scheduler"
        }
    },
};
export default Config;