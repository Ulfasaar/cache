package cache;
/**
 *  This class is a convenient way to implement lazy in memory caching
  it only refreshes the cache when data is requested and the cache times out, or if refresh is called
 */
@:expose
@:keep
class TimeoutCache extends Cache{

    private var timeout: Float;

    //TODO make private actually work on all targets somehow
    /**
     *  This variable is used to check whether or not we have recently gone over the timeout
     */
    private var hasElapsed:Bool = false;

    private var current_time: Float;
    private var prev_time: Float;
    private var diff_time: Float;

    public function new(timeout_ms: Float, refresh: Void->Any, ?empty: Void->Any){
        super(refresh, empty);
        this.timeout = timeout_ms;
        this.current_time = Date.now().getTime();
        this.prev_time = this.current_time;
        this.diff_time = this.current_time - this.prev_time;
    }

    public override function get():Any{
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
}