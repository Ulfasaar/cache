package cache;
/**
 *  This class is a convenient way to implement lazy in memory caching
  it only refreshes the cache when data is requested and the cache times out, or if refresh is called
 */
@:keep
class TimeoutCache{
    private var data: Any;

    private var timeout: Float;

    /**
     *  this lets someone manually trigger a refresh as well
     *  todo: make this compulsorary
     */

    private var _refresh: Void -> Any;

        /**
     *  This callback is called everytime the cache gets emptied
     *  TODO: make this so that it defaults to setting the variable to null somehow
     *  for now it sets it to 0 which doesn't do anything useful
     */
    private var _empty: Void->Any;

    //TODO make private actually work on all targets somehow
    private var isInit:Bool = true;

    /**
     *  This variable is used to check whether or not we have recently gone over the timeout
     */
    private var hasElapsed:Bool = false;

    private var current_time: Float;
    private var prev_time: Float;
    private var diff_time: Float;

    public function new(timeout_ms: Float, refresh: Void->Any, ?empty: Void->Any){
        this.timeout = timeout_ms;
        this.current_time = Date.now().getTime();
        this.prev_time = this.current_time;
        this.diff_time = this.current_time - this.prev_time;
        this._refresh = refresh;
        this._empty = empty;
    }

    public function get():Any{
        if(this.isInit == false){

            if(this.timeout != -1){
                this.current_time = Date.now().getTime();
                diff_time = current_time - prev_time;
    
                // time has elapsed so refresh the cache
                if(diff_time >= timeout ){
                    this.data = this._refresh();
                    //reset the time
                    prev_time = current_time;
                }
            }
        }
        else{
            this.data = this._refresh();
            this.isInit = false;
        }

        return this.data;
       
    }

    public function refresh(){
        this.data = this._refresh();
    }

    public function empty(){
        this.data = this._empty();
    }
 
}