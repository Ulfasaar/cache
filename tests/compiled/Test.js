// Generated by Haxe 3.4.4
(function ($hx_exports, $global) { "use strict";
$hx_exports["cache"] = $hx_exports["cache"] || {};
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw new js__$Boot_HaxeError("EReg::matched");
		}
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new _$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,__class__: List
};
var _$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
_$List_ListNode.__name__ = ["_List","ListNode"];
_$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: _$List_ListNode
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		haxe_CallStack.lastException = e;
		return null;
	}
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) {
		v = parseInt(x);
	}
	if(isNaN(v)) {
		return null;
	}
	return v;
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) {
		return s.split("\"").join("&quot;").split("'").join("&#039;");
	} else {
		return s;
	}
};
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return HxOverrides.substr(s,0,start.length) == start;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) {
		return null;
	}
	return a.join(".");
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
var cache_Cache = $hx_exports["cache"]["Cache"] = function(refresh,empty) {
	this.isInit = true;
	this._refresh = refresh;
	this._empty = empty;
};
cache_Cache.__name__ = ["cache","Cache"];
cache_Cache.prototype = {
	data: null
	,_refresh: null
	,_empty: null
	,isInit: null
	,get: function() {
		if(this.isInit) {
			this.data = this._refresh();
			this.isInit = false;
		}
		return this.data;
	}
	,refresh: function() {
		this.data = this._refresh();
	}
	,empty: function() {
		this.data = this._empty();
	}
	,__class__: cache_Cache
};
var cache_HybridCache = $hx_exports["cache"]["HybridCache"] = function(timeout_ms,refresh,get_version,empty) {
	this.hasElapsed = false;
	cache_Cache.call(this,refresh,empty);
	this.timeout = timeout_ms;
	this.current_time = new Date().getTime();
	this.prev_time = this.current_time;
	this.diff_time = this.current_time - this.prev_time;
	this.get_version = get_version;
	this.current_version = this.get_version();
};
cache_HybridCache.__name__ = ["cache","HybridCache"];
cache_HybridCache.__super__ = cache_Cache;
cache_HybridCache.prototype = $extend(cache_Cache.prototype,{
	timeout: null
	,hasElapsed: null
	,current_time: null
	,prev_time: null
	,diff_time: null
	,current_version: null
	,get_version: null
	,version: function() {
		return this.current_version;
	}
	,refresh: function() {
		this.current_version = this.get_version();
		this.diff_time = 0;
		this.current_time = new Date().getTime();
		this.prev_time = this.current_time;
		this.data = this._refresh();
	}
	,get: function() {
		if(this.isInit == false) {
			if(this.timeout != -1) {
				this.current_time = new Date().getTime();
				this.diff_time = this.current_time - this.prev_time;
				if(this.diff_time >= this.timeout) {
					var external_version = this.get_version();
					if(this.current_version < external_version) {
						this.data = this._refresh();
						this.current_version = external_version;
					}
					this.prev_time = this.current_time;
				}
			}
		} else {
			this.refresh();
			this.isInit = false;
		}
		return this.data;
	}
	,__class__: cache_HybridCache
});
var cache_TimeoutCache = $hx_exports["cache"]["TimeoutCache"] = function(timeout_ms,refresh,empty) {
	this.hasElapsed = false;
	cache_Cache.call(this,refresh,empty);
	this.timeout = timeout_ms;
	this.current_time = new Date().getTime();
	this.prev_time = this.current_time;
	this.diff_time = this.current_time - this.prev_time;
};
cache_TimeoutCache.__name__ = ["cache","TimeoutCache"];
cache_TimeoutCache.__super__ = cache_Cache;
cache_TimeoutCache.prototype = $extend(cache_Cache.prototype,{
	timeout: null
	,hasElapsed: null
	,current_time: null
	,prev_time: null
	,diff_time: null
	,refresh: function() {
		this.diff_time = 0;
		this.current_time = new Date().getTime();
		this.prev_time = this.current_time;
		this.data = this._refresh();
	}
	,get: function() {
		if(this.isInit == false) {
			if(this.timeout != -1) {
				this.current_time = new Date().getTime();
				this.diff_time = this.current_time - this.prev_time;
				if(this.diff_time >= this.timeout) {
					this.data = this._refresh();
					this.prev_time = this.current_time;
				}
			}
		} else {
			this.data = this._refresh();
			this.isInit = false;
		}
		return this.data;
	}
	,__class__: cache_TimeoutCache
});
var cache_VersionedCache = $hx_exports["cache"]["VersionedCache"] = function(refresh,get_version,empty) {
	this.current_version = 0.0;
	cache_Cache.call(this,refresh,empty);
	this.get_version = get_version;
	this._empty = empty;
	this.current_version = this.get_version();
};
cache_VersionedCache.__name__ = ["cache","VersionedCache"];
cache_VersionedCache.__super__ = cache_Cache;
cache_VersionedCache.prototype = $extend(cache_Cache.prototype,{
	current_version: null
	,get_version: null
	,version: function() {
		return this.current_version;
	}
	,refresh: function() {
		this.current_version = this.get_version();
		this.data = this._refresh();
	}
	,get: function() {
		if(this.isInit) {
			this.data = this._refresh();
			this.isInit = false;
		} else {
			var external_version = this.get_version();
			if(this.current_version < external_version) {
				this.data = this._refresh();
				this.current_version = external_version;
			}
		}
		return this.data;
	}
	,__class__: cache_VersionedCache
});
var haxe_StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.getStack = function(e) {
	if(e == null) {
		return [];
	}
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe_CallStack.wrapCallSite != null) {
				site = haxe_CallStack.wrapCallSite(site);
			}
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.exceptionStack = function() {
	return haxe_CallStack.getStack(haxe_CallStack.lastException);
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		b.b += m == null ? "null" : "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += file == null ? "null" : "" + file;
		b.b += " line ";
		b.b += line == null ? "null" : "" + line;
		if(s1 != null) {
			b.b += ")";
		}
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		b.b += cname == null ? "null" : "" + cname;
		b.b += ".";
		b.b += meth == null ? "null" : "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		b.b += n == null ? "null" : "" + n;
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(s == null) {
		return [];
	} else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") {
			stack.shift();
		}
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function" ? haxe_StackItem.LocalFunction() : meth == "Global code" ? null : haxe_StackItem.Method(path.join("."),meth),file,line1));
			} else {
				m.push(haxe_StackItem.Module(StringTools.trim(line)));
			}
		}
		return m;
	} else {
		return s;
	}
};
var haxe_Log = function() { };
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_unit_TestCase = function() {
};
haxe_unit_TestCase.__name__ = ["haxe","unit","TestCase"];
haxe_unit_TestCase.prototype = {
	currentTest: null
	,setup: function() {
	}
	,tearDown: function() {
	}
	,print: function(v) {
		haxe_unit_TestRunner.print(v);
	}
	,assertTrue: function(b,c) {
		this.currentTest.done = true;
		if(b != true) {
			this.currentTest.success = false;
			this.currentTest.error = "expected true but was false";
			this.currentTest.posInfos = c;
			throw new js__$Boot_HaxeError(this.currentTest);
		}
	}
	,assertFalse: function(b,c) {
		this.currentTest.done = true;
		if(b == true) {
			this.currentTest.success = false;
			this.currentTest.error = "expected false but was true";
			this.currentTest.posInfos = c;
			throw new js__$Boot_HaxeError(this.currentTest);
		}
	}
	,assertEquals: function(expected,actual,c) {
		this.currentTest.done = true;
		if(actual != expected) {
			this.currentTest.success = false;
			this.currentTest.error = "expected '" + Std.string(expected) + "' but was '" + Std.string(actual) + "'";
			this.currentTest.posInfos = c;
			throw new js__$Boot_HaxeError(this.currentTest);
		}
	}
	,__class__: haxe_unit_TestCase
};
var haxe_unit_TestResult = function() {
	this.m_tests = new List();
	this.success = true;
};
haxe_unit_TestResult.__name__ = ["haxe","unit","TestResult"];
haxe_unit_TestResult.prototype = {
	m_tests: null
	,success: null
	,add: function(t) {
		this.m_tests.add(t);
		if(!t.success) {
			this.success = false;
		}
	}
	,toString: function() {
		var buf_b = "";
		var failures = 0;
		var _g_head = this.m_tests.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var test = val;
			if(test.success == false) {
				buf_b += "* ";
				buf_b += Std.string(test.classname);
				buf_b += "::";
				buf_b += Std.string(test.method);
				buf_b += "()";
				buf_b += "\n";
				buf_b += "ERR: ";
				if(test.posInfos != null) {
					buf_b += Std.string(test.posInfos.fileName);
					buf_b += ":";
					buf_b += Std.string(test.posInfos.lineNumber);
					buf_b += "(";
					buf_b += Std.string(test.posInfos.className);
					buf_b += ".";
					buf_b += Std.string(test.posInfos.methodName);
					buf_b += ") - ";
				}
				buf_b += Std.string(test.error);
				buf_b += "\n";
				if(test.backtrace != null) {
					buf_b += Std.string(test.backtrace);
					buf_b += "\n";
				}
				buf_b += "\n";
				++failures;
			}
		}
		buf_b += "\n";
		if(failures == 0) {
			buf_b += "OK ";
		} else {
			buf_b += "FAILED ";
		}
		buf_b += Std.string(this.m_tests.length);
		buf_b += " tests, ";
		buf_b += failures == null ? "null" : "" + failures;
		buf_b += " failed, ";
		buf_b += Std.string(this.m_tests.length - failures);
		buf_b += " success";
		buf_b += "\n";
		return buf_b;
	}
	,__class__: haxe_unit_TestResult
};
var haxe_unit_TestRunner = function() {
	this.result = new haxe_unit_TestResult();
	this.cases = new List();
};
haxe_unit_TestRunner.__name__ = ["haxe","unit","TestRunner"];
haxe_unit_TestRunner.print = function(v) {
	var msg = js_Boot.__string_rec(v,"");
	var d;
	var tmp;
	if(typeof(document) != "undefined") {
		d = document.getElementById("haxe:trace");
		tmp = d != null;
	} else {
		tmp = false;
	}
	if(tmp) {
		msg = StringTools.htmlEscape(msg).split("\n").join("<br/>");
		d.innerHTML += msg + "<br/>";
	} else if(typeof process != "undefined" && process.stdout != null && process.stdout.write != null) {
		process.stdout.write(msg);
	} else if(typeof console != "undefined" && console.log != null) {
		console.log(msg);
	}
};
haxe_unit_TestRunner.customTrace = function(v,p) {
	haxe_unit_TestRunner.print(p.fileName + ":" + p.lineNumber + ": " + Std.string(v) + "\n");
};
haxe_unit_TestRunner.prototype = {
	result: null
	,cases: null
	,add: function(c) {
		this.cases.add(c);
	}
	,run: function() {
		this.result = new haxe_unit_TestResult();
		var _g_head = this.cases.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var c = val;
			this.runCase(c);
		}
		haxe_unit_TestRunner.print(this.result.toString());
		return this.result.success;
	}
	,runCase: function(t) {
		var old = haxe_Log.trace;
		haxe_Log.trace = haxe_unit_TestRunner.customTrace;
		var cl = t == null ? null : js_Boot.getClass(t);
		var fields = Type.getInstanceFields(cl);
		haxe_unit_TestRunner.print("Class: " + Type.getClassName(cl) + " ");
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			var fname = f;
			var field = Reflect.field(t,f);
			if(StringTools.startsWith(fname,"test") && Reflect.isFunction(field)) {
				t.currentTest = new haxe_unit_TestStatus();
				t.currentTest.classname = Type.getClassName(cl);
				t.currentTest.method = fname;
				t.setup();
				try {
					var args = [];
					field.apply(t,args);
					if(t.currentTest.done) {
						t.currentTest.success = true;
						haxe_unit_TestRunner.print(".");
					} else {
						t.currentTest.success = false;
						t.currentTest.error = "(warning) no assert";
						haxe_unit_TestRunner.print("W");
					}
				} catch( $e0 ) {
					haxe_CallStack.lastException = $e0;
					if ($e0 instanceof js__$Boot_HaxeError) $e0 = $e0.val;
					if( js_Boot.__instanceof($e0,haxe_unit_TestStatus) ) {
						var e = $e0;
						haxe_unit_TestRunner.print("F");
						var tmp = haxe_CallStack.exceptionStack();
						t.currentTest.backtrace = haxe_CallStack.toString(tmp);
					} else {
					var e1 = $e0;
					haxe_unit_TestRunner.print("E");
					if(e1.message != null) {
						t.currentTest.error = "exception thrown : " + Std.string(e1) + " [" + Std.string(e1.message) + "]";
					} else {
						t.currentTest.error = "exception thrown : " + Std.string(e1);
					}
					var tmp1 = haxe_CallStack.exceptionStack();
					t.currentTest.backtrace = haxe_CallStack.toString(tmp1);
					}
				}
				this.result.add(t.currentTest);
				t.tearDown();
			}
		}
		haxe_unit_TestRunner.print("\n");
		haxe_Log.trace = old;
	}
	,__class__: haxe_unit_TestRunner
};
var haxe_unit_TestStatus = function() {
	this.done = false;
	this.success = false;
};
haxe_unit_TestStatus.__name__ = ["haxe","unit","TestStatus"];
haxe_unit_TestStatus.prototype = {
	done: null
	,success: null
	,error: null
	,method: null
	,classname: null
	,posInfos: null
	,backtrace: null
	,__class__: haxe_unit_TestStatus
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	val: null
	,__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg = i != null ? i.fileName + ":" + i.lineNumber + ": " : "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	var tmp;
	if(typeof(document) != "undefined") {
		d = document.getElementById("haxe:trace");
		tmp = d != null;
	} else {
		tmp = false;
	}
	if(tmp) {
		d.innerHTML += js_Boot.__unhtml(msg) + "<br/>";
	} else if(typeof console != "undefined" && console.log != null) {
		console.log(msg);
	}
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			haxe_CallStack.lastException = e;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		if((o instanceof Array)) {
			return o.__enum__ == null;
		} else {
			return false;
		}
		break;
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return true;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return (o|0) === o;
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					return true;
				}
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var tests_CacheUnit = function() {
	this.i = 0;
	var _gthis = this;
	haxe_unit_TestCase.call(this);
	this.cache = new cache_Cache(function() {
		_gthis.i += 1;
		return _gthis.i;
	});
};
tests_CacheUnit.__name__ = ["tests","CacheUnit"];
tests_CacheUnit.__super__ = haxe_unit_TestCase;
tests_CacheUnit.prototype = $extend(haxe_unit_TestCase.prototype,{
	cache: null
	,i: null
	,test_cached: function() {
		var actual = this.cache.get();
		var expected = 1;
		this.assertEquals(expected,actual,{ fileName : "CacheUnit.hx", lineNumber : 22, className : "tests.CacheUnit", methodName : "test_cached"});
	}
	,test_refreshed: function() {
		this.cache.refresh();
		var actual = this.cache.get();
		var expected = 2;
		this.assertEquals(expected,actual,{ fileName : "CacheUnit.hx", lineNumber : 29, className : "tests.CacheUnit", methodName : "test_refreshed"});
	}
	,__class__: tests_CacheUnit
});
var tests_HybridCacheUnit = function() {
	this.version = 0.0;
	this.i = 0;
	var _gthis = this;
	haxe_unit_TestCase.call(this);
	this.cache = new cache_HybridCache(1200,function() {
		var _gthis1 = _gthis;
		_gthis1.i += 1;
		return _gthis1.i;
	},function() {
		_gthis.version += 1;
		return _gthis.version;
	},function() {
		return 0;
	});
};
tests_HybridCacheUnit.__name__ = ["tests","HybridCacheUnit"];
tests_HybridCacheUnit.__super__ = haxe_unit_TestCase;
tests_HybridCacheUnit.prototype = $extend(haxe_unit_TestCase.prototype,{
	cache: null
	,i: null
	,version: null
	,test_get: function() {
		var actual = this.cache.get();
		var expected = 1;
		this.assertEquals(expected,actual,{ fileName : "HybridCacheUnit.hx", lineNumber : 25, className : "tests.HybridCacheUnit", methodName : "test_get"});
	}
	,test_cached: function() {
		var actual = this.cache.get();
		actual = this.cache.get();
		var expected = 1;
		this.assertEquals(expected,actual,{ fileName : "HybridCacheUnit.hx", lineNumber : 32, className : "tests.HybridCacheUnit", methodName : "test_cached"});
	}
	,test_empty: function() {
		this.cache.empty();
		var actual = this.cache.get();
		var expected = 0;
		this.assertEquals(expected,actual,{ fileName : "HybridCacheUnit.hx", lineNumber : 40, className : "tests.HybridCacheUnit", methodName : "test_empty"});
	}
	,test_refreshed: function() {
		this.cache.refresh();
		var actual = this.cache.get();
		var expected = 2;
		this.assertEquals(expected,actual,{ fileName : "HybridCacheUnit.hx", lineNumber : 46, className : "tests.HybridCacheUnit", methodName : "test_refreshed"});
	}
	,test_version: function() {
		var actual = this.cache.version();
		var expected = 3.0;
		this.assertEquals(expected,actual,{ fileName : "HybridCacheUnit.hx", lineNumber : 54, className : "tests.HybridCacheUnit", methodName : "test_version"});
	}
	,test_not_always_updating: function() {
		this.cache.get();
		this.cache.get();
		this.cache.get();
		var actual = this.cache.get();
		var expected = 2;
		this.assertEquals(expected,actual,{ fileName : "HybridCacheUnit.hx", lineNumber : 62, className : "tests.HybridCacheUnit", methodName : "test_not_always_updating"});
	}
	,test_timed_out: function() {
		var current_time = new Date().getTime();
		var prev_time = current_time;
		var diff_time = current_time - prev_time;
		while(diff_time < 2000) {
			current_time = new Date().getTime();
			diff_time = current_time - prev_time;
		}
		var actual = this.cache.get();
		var expected = 3;
		this.assertEquals(expected,actual,{ fileName : "HybridCacheUnit.hx", lineNumber : 79, className : "tests.HybridCacheUnit", methodName : "test_timed_out"});
	}
	,__class__: tests_HybridCacheUnit
});
var tests_Test = function() { };
tests_Test.__name__ = ["tests","Test"];
tests_Test.main = function() {
	var runner = new haxe_unit_TestRunner();
	runner.add(new tests_CacheUnit());
	runner.add(new tests_TimeoutCacheUnit());
	runner.add(new tests_HybridCacheUnit());
	runner.add(new tests_VersionedCacheUnit());
	runner.run();
};
var tests_TimeoutCacheUnit = function() {
	this.test_val = 0;
	this.blah = 1;
	var _gthis = this;
	haxe_unit_TestCase.call(this);
	this.cache = new cache_TimeoutCache(1200,function() {
		_gthis.test_val += 1;
		return _gthis.test_val;
	});
	this.my_cache = new cache_TimeoutCache(-1,function() {
		var _gthis1 = _gthis;
		_gthis1.blah += 1;
		return _gthis1.blah;
	},function() {
		return 0;
	});
};
tests_TimeoutCacheUnit.__name__ = ["tests","TimeoutCacheUnit"];
tests_TimeoutCacheUnit.__super__ = haxe_unit_TestCase;
tests_TimeoutCacheUnit.prototype = $extend(haxe_unit_TestCase.prototype,{
	cache: null
	,my_cache: null
	,blah: null
	,test_val: null
	,test_get: function() {
		var actual = this.cache.get();
		var expected = 1;
		this.assertEquals(expected,actual,{ fileName : "TimeoutCacheUnit.hx", lineNumber : 32, className : "tests.TimeoutCacheUnit", methodName : "test_get"});
	}
	,test_cached: function() {
		var actual = this.cache.get();
		var expected = 1;
		this.assertEquals(expected,actual,{ fileName : "TimeoutCacheUnit.hx", lineNumber : 39, className : "tests.TimeoutCacheUnit", methodName : "test_cached"});
	}
	,test_refreshed: function() {
		this.cache.refresh();
		var actual = this.cache.get();
		var expected = 2;
		this.assertEquals(expected,actual,{ fileName : "TimeoutCacheUnit.hx", lineNumber : 47, className : "tests.TimeoutCacheUnit", methodName : "test_refreshed"});
	}
	,test_timed_out: function() {
		var current_time = new Date().getTime();
		var prev_time = current_time;
		var diff_time = current_time - prev_time;
		while(diff_time < 2000) {
			current_time = new Date().getTime();
			diff_time = current_time - prev_time;
		}
		var actual = this.cache.get();
		var expected = 3;
		this.assertEquals(expected,actual,{ fileName : "TimeoutCacheUnit.hx", lineNumber : 64, className : "tests.TimeoutCacheUnit", methodName : "test_timed_out"});
	}
	,test_no_timeout: function() {
		var actual = this.my_cache.get();
		var expected = 2;
		this.assertEquals(expected,actual,{ fileName : "TimeoutCacheUnit.hx", lineNumber : 70, className : "tests.TimeoutCacheUnit", methodName : "test_no_timeout"});
	}
	,test_no_timeout_no_refresh: function() {
		var actual = this.my_cache.get();
		var expected = 2;
		this.assertEquals(expected,actual,{ fileName : "TimeoutCacheUnit.hx", lineNumber : 76, className : "tests.TimeoutCacheUnit", methodName : "test_no_timeout_no_refresh"});
	}
	,test_no_timeout_refresh: function() {
		this.my_cache.refresh();
		var actual = this.my_cache.get();
		var expected = 3;
		this.assertEquals(expected,actual,{ fileName : "TimeoutCacheUnit.hx", lineNumber : 83, className : "tests.TimeoutCacheUnit", methodName : "test_no_timeout_refresh"});
	}
	,test_empty: function() {
		this.my_cache.empty();
		var actual = this.my_cache.get();
		var expected = 0;
		this.assertEquals(expected,actual,{ fileName : "TimeoutCacheUnit.hx", lineNumber : 89, className : "tests.TimeoutCacheUnit", methodName : "test_empty"});
	}
	,__class__: tests_TimeoutCacheUnit
});
var tests_VersionedCacheUnit = function() {
	this.version = 0.0;
	this.i = 0;
	var _gthis = this;
	haxe_unit_TestCase.call(this);
	this.cache = new cache_VersionedCache(function() {
		var _gthis1 = _gthis;
		_gthis1.i += 1;
		return _gthis1.i;
	},function() {
		_gthis.version = 2;
		return _gthis.version;
	},function() {
		return 0;
	});
};
tests_VersionedCacheUnit.__name__ = ["tests","VersionedCacheUnit"];
tests_VersionedCacheUnit.__super__ = haxe_unit_TestCase;
tests_VersionedCacheUnit.prototype = $extend(haxe_unit_TestCase.prototype,{
	cache: null
	,i: null
	,version: null
	,test_get: function() {
		var actual = this.cache.get();
		var expected = 1;
		this.assertEquals(expected,actual,{ fileName : "VersionedCacheUnit.hx", lineNumber : 26, className : "tests.VersionedCacheUnit", methodName : "test_get"});
	}
	,test_cached: function() {
		var actual = this.cache.get();
		var expected = 1;
		this.assertEquals(expected,actual,{ fileName : "VersionedCacheUnit.hx", lineNumber : 32, className : "tests.VersionedCacheUnit", methodName : "test_cached"});
	}
	,test_empty: function() {
		this.cache.empty();
		var actual = this.cache.get();
		var expected = 0;
		this.assertEquals(expected,actual,{ fileName : "VersionedCacheUnit.hx", lineNumber : 40, className : "tests.VersionedCacheUnit", methodName : "test_empty"});
	}
	,test_refreshed: function() {
		this.cache.refresh();
		var actual = this.cache.get();
		var expected = 2;
		this.assertEquals(expected,actual,{ fileName : "VersionedCacheUnit.hx", lineNumber : 46, className : "tests.VersionedCacheUnit", methodName : "test_refreshed"});
	}
	,test_version: function() {
		var actual = this.cache.version();
		var expected = 2.0;
		this.assertEquals(expected,actual,{ fileName : "VersionedCacheUnit.hx", lineNumber : 52, className : "tests.VersionedCacheUnit", methodName : "test_version"});
	}
	,test_not_always_updating: function() {
		this.cache.get();
		this.cache.get();
		this.cache.get();
		var actual = this.cache.get();
		var expected = 2;
		this.assertEquals(expected,actual,{ fileName : "VersionedCacheUnit.hx", lineNumber : 60, className : "tests.VersionedCacheUnit", methodName : "test_not_always_updating"});
	}
	,__class__: tests_VersionedCacheUnit
});
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
js_Boot.__toStr = ({ }).toString;
tests_Test.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
