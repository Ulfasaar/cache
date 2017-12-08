package tests;

import haxe.unit.TestCase;
import cache.Cache;

class CacheUnit extends TestCase{
    var cache:Cache;
    var i:Int = 0;

    public function new(){
        super();
        this.cache = new Cache(function(){
            this.i += 1;
            return i;
        });
    }

    public function test_cached(){
        // call again should be same value
        var actual = this.cache.get();
        var expected = 1;
        assertEquals(expected, actual); 
    }
    public function test_refreshed(){

        this.cache.refresh();
        var actual = this.cache.get();
        var expected = 2;
        assertEquals(expected, actual); 
    }
}
   