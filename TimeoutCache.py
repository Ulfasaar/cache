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



class TimeoutCache:
    __slots__ = ("data", "timeout", "refresh", "isInit", "hasElapsed", "current_time", "prev_time", "diff_time", "empty")

    def __init__(self,timeout_ms):
        self.empty = None
        self.diff_time = None
        self.prev_time = None
        self.refresh = None
        self.data = None
        self.hasElapsed = False
        self.isInit = True
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
                    self.refresh()
                    self.prev_time = self.current_time
        else:
            self.refresh()
            self.isInit = False
        return self.data

    def store(self,value):
        self.data = value


