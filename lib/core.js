"use strict";
var class2type = require("../var/class2type");
var getProto = require("../var/getPrototypeOf");
var hasOwn = require("../var/hasOwnPrototype");
var array = require("../var/array");
var push = require("../var/push");
var indexOf = require("../var/indexOf");
var fnToString = require("../var/fnToString");
var objectFunctionString = require("../var/objectFunctionString");
var types = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol"];
types.map(function (name) {
  class2type["[object " + name + "]"] = name.toLowerCase();
});

module.exports = {
  type: function (obj) {
    if (obj == null) {
      return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[toString.call(obj)] || "object" :
      typeof obj;
  },
  isNull: function (obj) {
    return obj === null || typeof obj === "undefined";
  },
  isPlainObject: function (obj) {
    var proto, Ctor;
    if (!obj || toString.call(obj) !== "[object Object]") {
      return false;
    }

    proto = getProto(obj);
    if (!proto) {
      return true;
    }
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === objectFunctionString;
  },
  isEmptyObject: function (obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  },
  isFunction: function (obj) {
    return this.type(obj) === "function";
  },

  isNumeric: function (obj) {
    var type = this.type(obj);
    return (type === "number" || type === "string") &&
      // parseFloat NaNs numeric-cast false positives ("")
      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
      // subtraction forces infinities to NaN
      !isNaN(obj - parseFloat(obj));
  },
  isArray: function (obj) {
    return this.type(obj) == "array";
  },
  isBoolean: function (obj) {
    return this.type(obj) == "boolean";
  },
  isDate: function (obj) {
    return this.type(obj) == "date";
  },
  contain: function (elem, array, i) {
    return array == null ? -1 : indexOf.call(array, elem, i);
  },
  merge: function (first, second) {
    var len = +second.length,
      j = 0,
      i = first.length;
    for (; j < len; j++) {
      first[i++] = second[j];
    }
    first.length = i;
    return first;
  },
  trim: function (text) {
    return text == null ?
      "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  },

  // results is for internal usage only
  makeArray: function (arr, results) {
    var ret = results || [];
    if (arr != null) {
      if (this.isArrayLike(Object(arr))) {
        this.merge(ret,
          typeof arr === "string" ?
            [arr] : arr
        );
      } else {
        push.call(ret, arr);
      }
    }
    return ret;
  },
  isWindow: function (obj) {
    return obj != null && obj === obj.window;
  },
  isArrayLike: function (obj) {
    var length = !!obj && "length" in obj && obj.length,
      type = this.type(obj);
    if (type === "function" || this.isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
  },
  unique: function (arr) {
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
      if (!json[arr[i]]) {
        res.push(arr[i]);
        json[arr[i]] = 1;
      }
    }
    return res;
  },
  findElementIndex: function (arr, element) {
    for (var i = 0; i < arr.length; i++) {
      if (Object.prototype.toString.call(arr[i]) == "[object Object]") {
        for (var key in arr[i]) {
          if (key == element) {
            return i;
          }
        }
      } else if (element === arr[i]) {
        return i;
      }
    }
    return -1;
  },
  removeElement: function (array, element) {
    var n = this.findElementIndex(array, element);
    if (n < 0) {
      return array;
    } else {
      return array.splice(n, 1); //this.slice(0, n).concat(this.slice(n + 1, this.length));
    }
  },
  copyDate: function (date) {
    try {
      var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      newDate.setHours(date.getHours());
      newDate.setMinutes(date.getMinutes());
      newDate.setSeconds(date.getSeconds());
      newDate.setMilliseconds(date.getMilliseconds());

      return newDate;
    } catch (e) {
      throw "invalidDate";
    }
  },
  /**
   * 创建正确的Date对象
   * @param strFormatDate 日期字符串，支持格式
   *  2017-11-19 12:20:30:333
   *  2017/11/19 12:20:30:333
   *  2017.11.19 12:20:30:333
   *  2017-11-19
   *  2017/11/19
   *  2017.11.19
   * @param dateArr 时、分、秒数组，格式
   *  [23,59,59]
   */
  createCorrectDate: function (strFormatDate, dateArr) {
    if (strFormatDate == undefined || strFormatDate == null || strFormatDate == '') return 'invalidDate';
    var dateObj;
    dateArr = dateArr || [];
    try {
      var dateArray;
      if (strFormatDate.indexOf(":") > -1) {
        var dateStrSplit = strFormatDate.toString().split(" ");
        strFormatDate = dateStrSplit[0];
        if (dateArr.length <= 0) dateArr = dateStrSplit[1].split(":")
      }
      if (strFormatDate.indexOf('-') > -1) {
        dateArray = strFormatDate.toString().split('-');
        dateObj = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]));
        if (Number(dateArray[0]) != dateObj.getFullYear())
          return 'invalidDate';
        if (Number(dateArray[1]) != dateObj.getMonth() + 1)
          return 'invalidDate';
        if (Number(dateArray[2]) != dateObj.getDate())
          return 'invalidDate';
      } else if (strFormatDate.indexOf('.') > -1) {
        dateArray = strFormatDate.toString().split('.');
        dateObj = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]));
        if (Number(dateArray[0]) != dateObj.getFullYear())
          return 'invalidDate';
        if (Number(dateArray[1]) != dateObj.getMonth() + 1)
          return 'invalidDate';
        if (Number(dateArray[2]) != dateObj.getDate())
          return 'invalidDate';
      } else if (strFormatDate.indexOf('/') > -1) {
        dateArray = strFormatDate.toString().split('/');
        dateObj = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]));
        if (Number(dateArray[0]) != dateObj.getFullYear())
          return 'invalidDate';
        if (Number(dateArray[1]) != dateObj.getMonth() + 1)
          return 'invalidDate';
        if (Number(dateArray[2]) != dateObj.getDate())
          return 'invalidDate';
      }

      for (var i = 0; i < dateArr.length; i++) {
        switch (i) {
          case 0:
            dateObj.setHours(dateArr[0]);
            if (dateObj.getHours() != Number(dateArr[0]))
              return 'invalidDate';
            break;
          case 1:
            dateObj.setMinutes(dateArr[1]);
            if (dateObj.getMinutes() != Number(dateArr[1]))
              return 'invalidDate';
            break;
          case 2:
            dateObj.setSeconds(dateArr[2]);
            if (dateObj.getSeconds() != Number(dateArr[2]))
              return 'invalidDate';
            break;
          case 3:
            dateObj.setMilliseconds(dateArr[3]);
            if (dateObj.getMilliseconds() != Number(dateArr[3]))
              return 'invalidDate';
          default:
            break;
        }
      }
      if (dateArr.length <= 0) {
        dateObj.setHours(0);
        dateObj.setMinutes(0);
        dateObj.setSeconds(0);
        dateObj.setMilliseconds(0);
      }


      return dateObj;
    } catch (e) {
      return 'invalidDate';
    }
  },
  dateFormat: function (fmt, objDate) {
    var o = {
      "M+": objDate.getMonth() + 1, //月份
      "d+": objDate.getDate(), //日
      "h+": objDate.getHours(), //小时
      "m+": objDate.getMinutes(), //分
      "s+": objDate.getSeconds(), //秒
      "q+": Math.floor((objDate.getMonth() + 3) / 3), //季度
      "S": objDate.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (objDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  isLeapYear: function (objDate) {//判断闰年
    var pYear = objDate.getFullYear();
    if (!isNaN(parseInt(pYear))) {
      if ((pYear % 4 == 0 && pYear % 100 != 0) || (pYear % 100 == 0 && pYear % 400 == 0)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  /***************************************************
   *比较两个日期的间隔
   *参数说明:
   * @param interval要返回的两个日期的间隔,比如：
   *  s：返回两个日期相差的秒数
   *  n：返回两个日期相差的分钟数
   *  h：返回两个日期相差的小时数
   *  d：返回两个日期相差的天数
   *  w：返回两个日期相差的周数
   *  m：返回连个日期相差的月数
   *  y：返回连个日期相差的年数
   * @param beginDate：开始日期
   * @param endDate:结束日期
   ****************************************************/
  diffDate: function (interval, beginDate, endDate) {
    var dtBegin;
    var dtEnd;
    try {
      if (Object.prototype.toString.call(beginDate) == "[object Date]") {
        dtBegin = beginDate;
      } else if (Object.prototype.toString.call(beginDate) == "[object String]") {
        dtBegin = this.createCorrectDate(beginDate);
      }

      if (Object.prototype.toString.call(endDate) == "[object Date]") {
        dtEnd = endDate;
      } else if (Object.prototype.toString.call(endDate) == "[object String]") {
        dtEnd = this.createCorrectDate(endDate);
      }

      if (isNaN(dtEnd)) return undefined;
      switch (interval) {
        case "s":
          return parseInt((dtEnd - dtBegin) / 1000);
        case "n":
          return parseInt((dtEnd - dtBegin) / 60000);
        case "h":
          return parseInt((dtEnd - dtBegin) / 3600000);
        case "d":
          return parseInt((dtEnd - dtBegin) / 86400000);
        case "w":
          return parseInt((dtEnd - dtBegin) / (86400000 * 7));
        case "m":
          return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtBegin.getFullYear()) * 12) - (dtBegin.getMonth() + 1);
        case "y":
          return dtEnd.getFullYear() - dtBegin.getFullYear();
      }
    } catch (e) {
      throw "无效的时间格式！";
    }
  },
  /***************************************************
   *比较两个日期的间隔
   *参数说明:
   *objDate：结束日期
   *interval要返回的两个日期的间隔,比如：
   *s：返回两个日期相差的秒数
   *n：返回两个日期相差的分钟数
   *h：返回两个日期相差的小时数
   *d：返回两个日期相差的天数
   *w：返回两个日期相差的周数
   *m：返回连个日期相差的月数
   *y：返回连个日期相差的年数
   ****************************************************/
  dateDiff: function (interval, objBeginDate, objEndDate) {
    var dtBegin = new Date(objBeginDate);
    var dtEnd = new Date(objEndDate);
    if (isNaN(dtEnd)) return undefined;
    switch (interval) {
      case "s":
        return parseInt((dtEnd - dtBegin) / 1000);
      case "n":
        return parseInt((dtEnd - dtBegin) / 60000);
      case "h":
        return parseInt((dtEnd - dtBegin) / 3600000);
      case "d":
        return parseInt((dtEnd - dtBegin) / 86400000);
      case "w":
        return parseInt((dtEnd - dtBegin) / (86400000 * 7));
      case "m":
        return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtBegin.getFullYear()) * 12) - (dtBegin.getMonth() + 1);
      case "y":
        return dtEnd.getFullYear() - dtBegin.getFullYear();
    }
  },
  clone: function () {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;
      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !this.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];
          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (this.isPlainObject(copy) ||
            (copyIsArray = Array.isArray(copy)))) {

            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && this.isPlainObject(src) ? src : {};
            }
            // Never move original objects, clone them
            target[name] = this.clone(deep, clone, copy);
            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    // Return the modified object
    return target;
  },
  getQuery: function (queryKey, target, pattern) {
    var locationSearch = location.search;
    if (target) locationSearch = target;
    var regExp = new RegExp("" + queryKey + "=([^&=]+)");
    if (pattern) regExp = pattern;
    var query;
    if (regExp.test(locationSearch)) {
      query = RegExp.$1;
    }
    return query;
  },
  getOffset: function (element) {
    var left = 0, top = 0;
    var parent = element;
    while (parent != null) {
      left += parent.offsetLeft;
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return { offsetX: left, offsetY: top };
  },
  getScrollOffsets: function (w) {
    var w = w || window;
    if (w.pageXOffset != null) {
      return { scrollX: w.pageXOffset, scrollY: w.pageYOffset };
    }
    var doc = w.document;
    if (doc.compatMode == "CSS1Compat") {
      return { scrollX: doc.documentElement.scrollLeft, scrollY: doc.documentElement.scrollTop };
    }
    return { scrollX: doc.body.scrollLeft, scrollY: doc.body.scrollTop };
  },
  getViewPortSize: function (w) {
    var w = w || window;
    if (w.innerWidth) {
      return { width: w.innerWidth, height: w.innerHeight };
    }
    var d = w.document;
    if (d.compatMode == "CSS1Compat") {
      return { width: d.documentElement.clientWidth, height: d.documentElement.clientHeight };
    }
    return { width: d.body.clientWidth, height: d.body.clientHeight };
  }
};
