from cache import cache_TimeoutCache as Cache

def refresh():
    print("hi") 

test = Cache(1234, refresh).refresh()