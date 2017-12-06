package cache;

/**
 *  This version of the cache implements a version check, so everytime the data is fetched the external sources
 *  version is compared to the caches internal version, if it is larger the cache refreshes
 */
@:keep
class VersionedCache{

    private var data: Any;

    /**
     *  this lets someone manually trigger a refresh as well
     *  todo: make this compulsorary
     */
    private var _refresh: Void -> Any;

    //TODO make private actually work on all targets somehow
    private var isInit:Bool = true;


    private var current_version:Float = 0.0;

    private var get_version: Void->Float;

    public function new(refresh: Void->Any, get_version: Void->Float){
        this._refresh = refresh;
        this.current_version = get_version();
    }

    public function version(){
        return this.current_version;
    }

    public function get():Any{
        if(this.isInit){
            this.data = this._refresh();
            this.isInit = false;
        }
        else{
            var external_version = this.get_version();
            if(this.current_version < external_version){
                this._refresh();
                this.current_version = external_version;
            }
        }
        return this.data;
    }

    public function refresh(){
        this.data = this._refresh();
    }

    /**
     *  This callback is called everytime the cache gets emptied
     *  TODO: make this so that it defaults to setting the variable to null somehow
     *  for now it sets it to 0 which doesn't do anything useful
     */
    public var empty: Void->Void;
 

}