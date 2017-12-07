package cache;

/**
 *  This version of the cache implements a version check, so everytime the data is fetched the external sources
 *  version is compared to the caches internal version, if it is larger the cache refreshes
 */
@:keep
class VersionedCache extends Cache{

    private var current_version:Float = 0.0;

    private var get_version: Void->Float;

    public function new(refresh: Void->Any, get_version: Void->Float, ?empty: Void->Any){
        super(refresh, empty);
        this.get_version = get_version;
        this._empty = empty;
        this.current_version = this.get_version();
       
    }

    public function version(){
        return this.current_version;
    }

    public override function get():Any{
        if(this.isInit){
            this.data = this._refresh();
            this.isInit = false;
        }
        else{
            var external_version = this.get_version();
            if(this.current_version < external_version){
                this.data = this._refresh();
                this.current_version = external_version;
            }
        }
        return this.data;
    }
}