#### 1. String对象

String对象用于处理已有的字符块。

String对象创建方法：new String()

#### 2. 语法
var text = new String("string")

或者

var text = "string"


#### 3. 属性

- constructor：对创建该对象的函数的引用，即返回对String对象属性创建的函数
- length：字符串的长度，即返回字符串的字符数
- prototype：允许您向对象添加属性和方法


#### 4. String对象的方法

##### 字符串截取

> - **substring()**   

`xString.substring(start,end)`

> subString()是最常用的字符串截取方法，它可以接收两个参数（且参数不能为负值），分别要截取的开始位置和结束位置，它将返回一个新的字符串，其内容是从start
到end-1处的所有字符串。若结束参数省略，则表示从start位置一直截取到最后。

> - **slice()**    

`stringObject.slice(start,end)`

> slice()方法与substring()非常类似，它传入的两个参数也分别对应着开始位置和结束位置。而区别在于slice()中的参数可以为负值，如果参数为负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1指字符串的最后一个字符

> 注：start必须小于end

> - **substr()**

`stringObject().substr(start),length`

> substr()方法可在字符串抽取start下标开始的指定数目的字符。其返回值为一个字符串，包含stringObject的start（包括start所指的字符）处开始的length个字符。如果没有指定length，那么返回的字符串
包含从start到stringObject的结尾的字符。灵位如果start为负数，则表示从字符串尾部开始算起。


> - **split()**

`str.split([separator][,limit])`
> separator指定用来分隔字符串的字符（或字符串）。separator可以是一个字符串或正则表达式。如果忽略separator，则返回整个字符串的数组形式。如果separator是一个空字符串，则str则会将原字符串中每个字符的数组形式返回。
>
> limit是一个整数，限定返回的分割片段的数量。split方法仍然分割每一个separator，但是返回的数组只会截取最多limit个元素。




##### 查找类方法

> - **indexOf() & includes()** 
`stringObkect.indexOf(searchValue,fromIndex)`  
> 
> indexOf()用来检索指定的字符串值在字符串中首次出现的位置。它可以接收两个参数，searchValue表示要查找的子字符串，fromIndex表示查找的开始位置，省略的话则从开始位置进行检索。  
> 
> 虽然indexOf()用来检索指定的字符串值在字符串中首次出现的位置，然而很多时候，使用它的场景在于判断字符串中是否存在指定字符串，因此代码就会如下：
`if(str.indexOf('yoursPecifiedStr') !== -1){}`
> 
> 而在这样的场景下，ES6语言中的includes()就显得更优雅许多；
> includes()方法用于判断一个字符串是否被包含在另一个字符串中，如果是返回true，否则返回false

`str.includes(searchString, [, position])`

> searchString是将要搜寻的字符串，position是可选的，表示从当前字符串的哪个索引位置开始搜寻子字符串，默认为0；

> 注：includes()是区分大小写的


> - **lastIndex
Of()**  
> 与indexOf()类似，它返回的是一个指定的子字符串值最后出现的位置，因为其检索顺序是由后向前。

> - **search()**  
> search()方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配你的子字符串。它会返回第一个匹配的子字符串的起始位置，如果没有匹配的，则返回-1  

```
let str = 'www.jeffjade.com'
console.log(str.search('w')) // 0
console.log(str.search(/j/g)) // 4
console.log(str.search(/\./g)) // 3
```



