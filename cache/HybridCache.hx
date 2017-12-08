package cache;
/**
 *  This class is a convenient way to implement lazy in memory caching
  it only refreshes the cache when data is requested and the cache times out, or if refresh is called
  TODO: make this class somehow pull stuff in from both versioned cache and timeout cache also finish tests
 */
@:expose
@:keep
class HybridCache extends Cache{

    private var timeout: Float;

    /**
     *  This variable is used to check whether or not we have recently gone over the timeout
     */
    private var hasElapsed:Bool = false;

    private var current_time: Float;
    private var prev_time: Float;
    private var diff_time: Float;

    private var current_version: Float;
    private var get_version: Void->Float;


    public function new(timeout_ms: Float, refresh: Void->Any, get_version: Void->Float, ?empty: Void->Any){
        super(refresh, empty);
        this.timeout = timeout_ms;
        this.current_time = Date.now().getTime();
        this.prev_time = this.current_time;
        this.diff_time = this.current_time - this.prev_time;
        this.get_version = get_version;
        this.current_version = this.get_version();
    }

    public function version(){
        return this.current_version;
    }
    public override function get():Any{
        if(this.isInit == false){

            if(this.timeout != -1){
                this.current_time = Date.now().getTime();
                diff_time = current_time - prev_time;
    
                // time has elapsed so refresh the cache
                // ! refactor this so that it is a timeout function instead cus used here and in timeout
                if(diff_time >= timeout ){
                    var external_version = this.get_version();
                    if(this.current_version < external_version){
                        this.data = this._refresh();
                        this.current_version = external_version;
                    }
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