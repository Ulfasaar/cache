package tests;

import haxe.unit.TestCase;
import haxe.unit.TestRunner;
import cache.*;

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
            this.version += 1;
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
        var expected = 3;
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
        var expected = 3;
        assertEquals(actual, expected);
    }
}

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
            this.version += 1;
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
        var expected = 3;
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
        var expected = 3;
        assertEquals(actual, expected);
    }
}


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

        // refactor this so that it is one test that we pass argument specifying type of cache?
        runner.add(new TimeoutCacheUnit());
        runner.add(new HybridCacheUnit());
        runner.add(new VersionedCacheUnit());
        runner.run();
    }
}