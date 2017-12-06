package cache;
/**
 *  This class is a convenient way to implement lazy in memory caching
  it only refreshes the cache when data is requested and the cache times out, or if refresh is called
 */
@:keep
class HybridCache{
    private var data: Any;

    private var timeout: Float;

    /**
     *  this lets someone manually trigger a refresh as well
     *  todo: make this compulsorary
     */

    private var _refresh: Void -> Any;

    //TODO make private actually work on all targets somehow
    private var isInit:Bool = true;

    /**
     *  This variable is used to check whether or not we have recently gone over the timeout
     */
    private var hasElapsed:Bool = false;

    private var current_time: Float;
    private var prev_time: Float;
    private var diff_time: Float;

    private var current_version: Float;
    private var get_version: Void->Float;
    /**
     *  This callback is called everytime the cache gets emptied
     *  TODO: make this so that it defaults to setting the variable to null somehow
     *  for now it sets it to 0 which doesn't do anything useful
     */
    public var empty: Void->Void;

    public function new(timeout_ms: Float, refresh: Void->Any, get_version: Void->Float){
        this.timeout = timeout_ms;
        this.current_time = Date.now().getTime();
        this.prev_time = this.current_time;
        this.diff_time = this.current_time - this.prev_time;
        this._refresh = refresh;
        this.get_version = get_version;
    }

    public function version(){
        return this.current_version;
    }
    public function get():Any{
        if(this.isInit == false){

            if(this.timeout != -1){
                this.current_time = Date.now().getTime();
                diff_time = current_time - prev_time;
    
                // time has elapsed so refresh the cache
                if(diff_time >= timeout ){
                    var external_version = this.get_version();
                    if(this.current_version < external_version){
                        this._refresh();
                        this.current_version = external_version;
                    }
                    //reset the time
                    prev_time = current_time;
                }
            }
        }
        else{
            this._refresh();
            this.isInit = false;
        }

        return this.data;
       
    }

    public function refresh(){
        this.data = this._refresh();
    }
 

}