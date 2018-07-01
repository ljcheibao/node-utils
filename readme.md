### JavaScript工具类库

从jQuery中整理的部分的工具函数以及平时积累的部分工具函数，方便开发使用

[![npm](https://img.shields.io/npm/l/heibao-utils.svg)](LICENSE)
[![NPM Version](https://img.shields.io/npm/v/heibao-utils.svg)](https://www.npmjs.com/package/heibao-utils)
[![npm](https://img.shields.io/npm/dt/heibao-utils.svg)](https://www.npmjs.com/package/heibao-utils)

###测试
```
npm run test
```

### 如何使用

- 安装

  ```
  cnpm install heibao-utils --save-dev;
  ```

- 引用

  ```
  import Utils from "heibao-utils";

  Utils.xxx
  ```

  **备注：由于该包没有添加类型定义文件，并且是commonjs的方式，所以使用typescript的话，请使用require的方式进行引入**

### 提供了哪些方法

- type(obj)

  判断js对象类型，比如：object，array，string，function等

  ```js
  let type = Utils.type([]);
  console.log(type);//返回 array

  let type = Utils.type("hello");
  console.log(type);//返回 string

  ......
  ```

- isNull(obj)

  判断对象是否为null，返回boolean值

  **参数说明：**

  ```
  obj:要判断的值
  ```

- isPlainObject(obj)

  判断值是否为字面量对象，即 {}，返回boolean值

  **参数说明：**

  ```
  obj:要判断的值
  ```

- isEmptyObject(obj)

  判断是否是空对象，比如：[],{}等，返回boolean值

  **参数说明：**

  ```
  obj:要判断的值
  ```

- isFunction(obj)

  判断是否为function，返回boolean值

  **参数说明：**

  ```
  obj:要判断的值
  ```

- isNumeric(obj)

  判断是否为数字，返回boolean值

  **参数说明：**

  ```
  obj:要判断的值
  ```

- isArray(obj)

  判断是否为数组，返回boolean值

  **参数说明：**

  ```
  obj:要判断的值
  ```

- isBoolean(obj)

  判断是否为boolen，返回boolean值

  **参数说明：**

  ```
  obj:要判断的值
  ```

- isDate(obj)

  判断是否为Date，返回boolean值

  **参数说明：**

  ```
  obj:要判断的值
  ```

- contain(ele,array,i)

  判断元素是否包含在数组中，存在反正元素在数组中的索引，不存在返回-1

  **参数说明：**

  ```
  ele:要比较的元素
  array:比较的数组
  i:比较arrary中哪个位置

  比如:
  let arr=[1,2,3];
  console.log(Utils.contain(2,arr));//返回 1
  console.log(Utils.contain(2,arr,1));//返回 1
  ```

- merge(first,second)

  数组合并，返回合并后的新数组

  **参数说明：**

  ```
  first:目标数组，即被合并的数组
  second:要合并的数组
  ```

- trim(text)

  去除字符串两端的空白，返回去除空白后的字符串

  **参数说明：**

  ```
  text:要出去空白的字符串
  ```

- makeArray(arr,results)

  合并数组或者对象，返回合并后的数组或者类数组对象

  **参数说明：**

  ```
  arr：数组或者对象
  results：数组或者对象
  ```

- unique(arr)

  数组去重，返回去重后的数组

  **参数说明：**

  ```
  返回去重后的数组
  ```

- findElementIndex(arr.element)

  查找数组中的元素，返回查找到的元素的索引

  **参数说明：**

  ```
  arr：被查询的数组
  element：要查询的元素
  ```

- removeElement(array, element)

  移除数组的元素，返回移除元素后的数组

  **参数说明：**

  ```
  array：要移除元素的数组
  element：要移除的元素
  ```

- copyDate(date)

  复制一个时间对象，返回复制后的时间对象Date

  **参数说明：**

  ```
  date:被复制的Date对象
  ```

- createCorrectDate(strFormatDate, dateArr)

  创建Date对象，返回创建成功的Date对象

  **参数说明：**

  ```
  strFormatDate:时间格式，支持的时间格式有如下几种：
  	2017-11-19 12:20:30:333
      2017/11/19 12:20:30:333
      2017.11.19 12:20:30:333
      2017-11-19
      2017/11/19
      2017.11.19
  dateArr：设置的时间格式数组，支持设置时、分、秒
  	[23,59,59]
  ```

- dateFormat(fmt, objDate)

  Date对象转换成时间字符串格式，返回转换后的时间字符串

  **参数说明：**

  ```
  fmt：格式化标识符
  	yyyy-MM-dd hh:mm:ss = 2017-01-01 21:32:32
  	yyyy-MM-dd          = 2017-01-01 21:32:32
  	yyyy年MM月dd日       = 2017年11月21日
  	
  	yyyy-MM             = 2017-01
  	yyyy-M              = 2017-1
  	MM-dd               = 01-01
  	M-d                 = 1-1
  	hh时                = 23时
  	hh                  = 23
  	
  	....
  	根据 y(年)、M(月)、d(日)、h(时)、m(分)、s(秒)、S(毫秒)、q(季度)这几个占位符的组合，可以返回任     何格式的Date对象的值
  objDate：Date时间对象
  ```

- isLeapYear(objDate)

  判断是否是闰年，返回boolean值

  **参数说明：**

  ```
  objDate：Date时间对象
  ```

- diffDate(interval, beginDate, endDate)

  比较两个时间的间隔，返回时间间隔

  **参数说明：**

  ```
  interval：时间间隔占位符
  	s：返回两个日期相差的秒数
      n：返回两个日期相差的分钟数
      h：返回两个日期相差的小时数
      d：返回两个日期相差的天数
      w：返回两个日期相差的周数
      m：返回连个日期相差的月数
      y：返回连个日期相差的年数
  beginDate：开始时间，可以是Date对象，也可以是时间字符串
  endDate：结束时间，可以是Date对象，也可以是时间字符串
  ```

- clone()

  对象拷贝

- getQuery(queryKey, target, pattern)

  查询querystring参数，返回查询到的值

  **参数说明：**

  ```
  queryKey：要查询的key
  target：从哪个目标字符串查询，可选参数，默认是window.location
  pattern：匹配的截取正则，可选参数

  一般前端只要传入第一个参数，就可以获取当前页面window.location的querystring的值
  ```

- getOffset(element)

  获取元素的offsetTop跟offsetLeft

  **参数说明：**

  ```
  element：dom元素
  ```

- getScrollOffsets(w)

  获取元素的滚动对象scrollX、scrollY

  **参数说明：**

  ```
  w:dom对象，默认为window

  我们一般也就是获取整个页面的scrollX、scrollY
  ```

- getViewPortSize(w)

  获取页面可见视口，返回width、height

  **参数说明：**

  ```
  w：dom对象，可选参数，默认window

  我们一般都是获取整个页面的可见视口
  ```

  ​

  ​

  ​

