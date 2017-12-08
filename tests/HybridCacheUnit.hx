package tests;

import haxe.unit.TestCase;
import cache.HybridCache;

class HybridCacheUnit extends TestCase{
    var cache:HybridCache;
    var i: Int = 0;
    var version: Float = 0.0;
    public function new(){
        super();
        this.cache = new HybridCache(1200, function(){
            this.i = this.i + 1;
            return this.i;
        }, function(){
            this.version = this.version + 1;
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
        actual = this.cache.get();
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

        // Get version is also called once in the constructor to get initial version
        var actual = this.cache.version();
        var expected = 3.0;
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

    public function test_timed_out(){

        // wait 2 seconds
        var current_time = Date.now().getTime();
        var prev_time = current_time;
        var diff_time = current_time - prev_time;

        while(diff_time < 2000){
            current_time = Date.now().getTime();
            diff_time = current_time - prev_time;
        }

        var actual = this.cache.get();
        var expected = 3;
        assertEquals(expected, actual); 
    }
}