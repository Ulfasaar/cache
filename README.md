# Cache

This library constains classes that are intended to be used to make caching easier in projects where data is reused more often than it is invalidated. This makes it useful for performance critical situations where certain tasks take a long time to run.

This library is also particularly useful when you want a cross platform solution that can work the same way consistently 
across multiple languages without the overhead of running another process and then having to use IPC or TCP to communicate with it, like you do with Memcached and Redis.

This library is also fairly unopionated, you can refresh each cache whenever you want, each class type just provides a nice way to bundle the refreshing of the cache with the data itself and automatically refreshes it for you when you pull
data out of it.

The library also allows the user to store any object inside the cache, and does not force the user to asdign a key for the data as part of a dictionary or hash map. Instead it is encouraged to make a seperate global variable with a appropriate name for each item of data. For instance you might have a instance of cache called user cache, that simply stores a user object.

Since you can store any data however, that means you are free to store collections, dictionaries or whatever you want.

## Suggested use conventions

- Use the most optimal cache type for the job! The basic cache should be used for cases where the data becomes stale due to unpredictable external events such as user input. It also allows you to create your own cache types fairly easily by extending off of it or by wrapping it.

- The timeout cache is intended for data that gets invalidated periodically and consistently. It can also handle small inconsistences by allowing you to call refresh as necessary. Avoid using it for unpredictable events like the ones mentioned above as it could cause headaches by helpfully refreshing the data more often than it needs to.

- The versioned cache is ideal for situations similiar to the simple cache, except it operates under the assumption that the data has distinct versions. So it will only refresh the data once there is a new version of it availble on the external source. The downside of this type is that it requires checking the version of the external data every time data is retrieved, which adds additional overhead.

- The last cache type is the hybrid cache. As the name implies it is a combination of the timeout cache and the version cache. The way it works is it will only check the version of the external source once it times out. This allows it to achieve the best performance by doing the least expensive updates. However it also has the downsides of both types. Namely that it assumes the external data has some version information available and that the data becomes invalid in a mostly consistent manner.

- Avoid mutating external state inside your refresh functions, such as other global variablse, database tables etc! This is of course is not always possible, however if it can be achieved then it will make maintenance and troubleshooting a lot easier as you would not have to hunt around your caches to find what caused a particular change.

## UNDER CONSTRUCTION

This library is currently in am alpha state and is prone to frequent breaking changes.

## Usage

To use this library for now just downlad the file inside the dist folder for your particular platform and then import it as if it was a class you wrote yourself.

If your target is not in the dist folder then feel free to clone the repo and adjust the Build.hxml file to compile to
your target and then use the haXe compiler to compile it. The comments in said file show some examples for how to compile to different targets that haXe supports.

## Todo

- Move all the distributions to the platforms package managers eg: NPM, pip etc
