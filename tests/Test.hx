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

    var cache = new TimeoutCache(1200);

    //! clean this up make seperate units for each class

    // pretend database 
    var test_val = 0;

    var my_cache = new TimeoutCache(-1);
    var blah = 1;

    public function new(){
        super();
        this.cache.refresh = function(){
            // had to make it untyped to tell the compiler to shut up
            this.test_val = this.test_val + 1;
            untyped cache.store(this.test_val);
        }

        this.my_cache.refresh = function(){
            blah = blah + 1;
            my_cache.store(blah);
        }
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

        this.my_cache.empty = function(){
            this.my_cache.store(0);
        }

        // this.my_cache.refresh();
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