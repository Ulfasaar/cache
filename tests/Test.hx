package tests;

import haxe.unit.TestCase;
import haxe.unit.TestRunner;
import cache.TimeoutCache;
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

        // call again should be same value
        var actual = this.cache.get();
        var expected = 2;
        assertEquals(expected, actual); 
    }
}
   


class TimeoutCacheUnit extends TestCase{

    var cache: TimeoutCache;

    var my_cache: TimeoutCache;
    var blah = 1;

    var test_val = 0;

    public function new(){
        super();
        this.cache = new TimeoutCache(1200, function(){
            test_val += 1;
            return test_val;
        });

        this.my_cache = new TimeoutCache(-1, function(){
            blah = blah + 1;
            return blah;
        }, function(){ return 0; });
    }

    public function test_get(){

        var actual = this.cache.get();
        var expected = 1;
        assertEquals(expected, actual); 
    }

    public function test_cached(){
        // call again should be same value
        var actual = this.cache.get();
        var expected = 1;
        assertEquals(expected, actual); 
    }

    public function test_refreshed(){
        // refresh then call again, should be new value
        this.cache.refresh();
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

    public function test_no_timeout(){
        var actual = this.my_cache.get();
        var expected = 2;
        assertEquals(expected, actual); 
    }

    public function test_no_timeout_no_refresh(){
        var actual = this.my_cache.get();
        var expected = 2;
        assertEquals(expected, actual); 
    }

    public function test_no_timeout_refresh(){
        this.my_cache.refresh();
        var actual = this.my_cache.get();
        var expected = 3;
        assertEquals(expected, actual); 
    }
    public function test_empty(){
        this.my_cache.empty();
        var actual = this.my_cache.get();
        var expected = 0;
        assertEquals(expected, actual); 
    }
}


class Test{
    public static function main(){
        var runner = new TestRunner();
        runner.add(new CacheUnit());
        runner.add(new TimeoutCacheUnit());
        runner.run();
    }
}