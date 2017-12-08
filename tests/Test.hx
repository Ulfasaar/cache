package tests;

import haxe.unit.TestRunner;

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