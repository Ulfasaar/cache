package cache;

/**
 *  This class is a convenient way to implement lazy in memory caching
  it only refreshes the cache when data is requested and the cache times out, or if refresh is called
 */
@:expose
@:keep
class Cache{

    private var data: Any;

    /**
     *  this lets someone manually trigger a refresh as well
     *  todo: make this compulsorary
     */
    // dynamic public function refresh(){}
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


    public function new(refresh: Void->Any, ?empty:Void->Any){
        this._refresh = refresh;
        this._empty = empty;
    }

    public function get():Any{
        if(this.isInit){
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