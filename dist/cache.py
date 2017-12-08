# Generated by Haxe 3.4.4
# coding: utf-8

from datetime import datetime as python_lib_datetime_Datetime
import time as python_lib_Time


class Date:
    __slots__ = ("date",)

    def __init__(self,year,month,day,hour,_hx_min,sec):
        if (year < python_lib_datetime_Datetime.min.year):
            year = python_lib_datetime_Datetime.min.year
        if (day == 0):
            day = 1
        self.date = python_lib_datetime_Datetime(year,(month + 1),day,hour,_hx_min,sec,0)

    @staticmethod
    def now():
        d = Date(1970,0,1,0,0,0)
        d.date = python_lib_datetime_Datetime.now()
        return d



class cache_Cache:
    __slots__ = ("data", "_refresh", "_empty", "isInit")

    def __init__(self,refresh,empty = None):
        self.data = None
        self.isInit = True
        self._refresh = refresh
        self._empty = empty

    def get(self):
        if self.isInit:
            self.data = self._refresh()
            self.isInit = False
        return self.data

    def refresh(self):
        self.data = self._refresh()

    def empty(self):
        self.data = self._empty()



class cache_HybridCache(cache_Cache):
    __slots__ = ("timeout", "hasElapsed", "current_time", "prev_time", "diff_time", "current_version", "get_version")

    def __init__(self,timeout_ms,refresh,get_version,empty = None):
        self.get_version = None
        self.current_version = None
        self.diff_time = None
        self.prev_time = None
        self.current_time = None
        self.timeout = None
        self.hasElapsed = False
        super().__init__(refresh,empty)
        self.timeout = timeout_ms
        self.current_time = (python_lib_Time.mktime(Date.now().date.timetuple()) * 1000)
        self.prev_time = self.current_time
        self.diff_time = (self.current_time - self.prev_time)
        self.get_version = get_version
        self.current_version = self.get_version()

    def version(self):
        return self.current_version

    def get(self):
        if (self.isInit == False):
            if (self.timeout != -1):
                self.current_time = (python_lib_Time.mktime(Date.now().date.timetuple()) * 1000)
                self.diff_time = (self.current_time - self.prev_time)
                if (self.diff_time >= self.timeout):
                    external_version = self.get_version()
                    if (self.current_version < external_version):
                        self._refresh()
                        self.current_version = external_version
                    self.prev_time = self.current_time
        else:
            self.data = self._refresh()
            self.isInit = False
        return self.data



class cache_TimeoutCache(cache_Cache):
    __slots__ = ("timeout", "hasElapsed", "current_time", "prev_time", "diff_time")

    def __init__(self,timeout_ms,refresh,empty = None):
        self.diff_time = None
        self.prev_time = None
        self.current_time = None
        self.timeout = None
        self.hasElapsed = False
        super().__init__(refresh,empty)
        self.timeout = timeout_ms
        self.current_time = (python_lib_Time.mktime(Date.now().date.timetuple()) * 1000)
        self.prev_time = self.current_time
        self.diff_time = (self.current_time - self.prev_time)

    def get(self):
        if (self.isInit == False):
            if (self.timeout != -1):
                self.current_time = (python_lib_Time.mktime(Date.now().date.timetuple()) * 1000)
                self.diff_time = (self.current_time - self.prev_time)
                if (self.diff_time >= self.timeout):
                    self.data = self._refresh()
                    self.prev_time = self.current_time
        else:
            self.data = self._refresh()
            self.isInit = False
        return self.data



class cache_VersionedCache(cache_Cache):
    __slots__ = ("current_version", "get_version")

    def __init__(self,refresh,get_version,empty = None):
        self.get_version = None
        self.current_version = 0.0
        super().__init__(refresh,empty)
        self.get_version = get_version
        self._empty = empty
        self.current_version = self.get_version()

    def version(self):
        return self.current_version

    def get(self):
        if self.isInit:
            self.data = self._refresh()
            self.isInit = False
        else:
            external_version = self.get_version()
            if (self.current_version < external_version):
                self.data = self._refresh()
                self.current_version = external_version
        return self.data


