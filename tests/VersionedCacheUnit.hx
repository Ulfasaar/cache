package tests;

import haxe.unit.TestCase;
import cache.VersionedCache;

class VersionedCacheUnit extends TestCase{
    var cache:VersionedCache;
    var i: Int = 0;
    var version: Float = 0.0;
    public function new(){
        super();
        this.cache = new VersionedCache(function(){
            this.i = this.i + 1;
            return this.i;
        }, function(){
            this.version = 2;
            return this.version;
        }, function(){
            return 0;
        });
    }

     public function test_get(){
        var actual = this.cache.get();
        var expected = 1;
        assertEquals(expected, actual); 
    }

    public function test_cached(){
        var actual = this.cache.get();
        var expected = 1;
        assertEquals(expected, actual); 
    }

    public function test_empty(){

        this.cache.empty();
        var actual = this.cache.get();
        var expected = 0;
        assertEquals(expected, actual); 
    }
    public function test_refreshed(){
        this.cache.refresh();
        var actual = this.cache.get();
        var expected = 2;
        assertEquals(expected, actual); 
    }

    public function test_version(){
        var actual = this.cache.version();
        var expected = 2.0;
        assertEquals(expected, actual); 
    }
    public function test_not_always_updating(){
        this.cache.get();
        this.cache.get();
        this.cache.get();
        var actual = this.cache.get();
        var expected = 2;
        assertEquals(expected, actual);
    }
}