<!--
 * @Author: xiongziting
 * @Date: 2020-04-28 10:36:44
 * @LastEditors: xiongziting
 * @LastEditTime: 2020-04-28 16:36:26
 * @Description: ts安装使用
 * @FilePath: \AllPractice\TypeScript\hello.md
 -->

#### 一. 安装

```
npm install -g typescript
```

以上命令会在全局环境下安装 tsc 命令，安装完成之后，我们就可以在任何地方执行`tsc`命令了。  
编译一个 Typescript 文件很简单：  
`tsc hello.ts`  
我们约定使用 Typescript 编写的文件以`.ts`为后缀，用 Typescript 编写 react 时，以`.tsx`为后缀。

#### 二. Hello TypeScript

> hello.ts

```
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

然后执行：
`tsc hello.ts`  
这时候会生成一个编译好的文件`hello.js`:

```
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

Typescript 中，使用`:`指定变量的类型，`:`的前后有没有空格都可以。

上述例子中，我们用`:`指定 person 参数类型为 string。但是编译为 js 后，并没有什么检查的代码被插入进来。

**_Typescript 只会进行静态检查，如果发现有错误，编译的时候就会报错。_**
例如：

```
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = [0, 1, 2];
console.log(sayHello(user));
```

编辑器中会提示错误，编译的时候也会出错：

```
hello.ts:17:22 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

但是还是生成了 js 文件：

```
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = [0, 1, 2];
console.log(sayHello(user));
```

**_TypeScript 编译的时候即使报错了，还是会生成编译结果_**，我们仍然可以使用这个编译之后的文件。

> 如果要在报错的时候终止 js 文件的生成，可以在`tsconfig.json`中配置`noEmitOnError`即可。

#### 三. 原始数据类型

JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。  
原始数据类型包括：布尔值 数值 字符串 null undefined 以及 ES6 中的新类型 Symbol。  
此处主要介绍前五种原始数据类型在 Typescript 中的应用。

##### 1. 布尔值

布尔值是最基础的数据类型，在 Typescript 中，使用`boolean`定义布尔值类型：

```
let isDone: boolean = false;
// 编译通过
// 后面约定，未强调编译错误的代码片段，默认未编译通过
```

注意：使用构造函数`Boolean`创造的对象不是布尔值：

```
let createdByNewBoolean: boolean = new Boolean(1);

// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
```

事实上，`new Boolean()`返回的是一个 Boolean 对象：  
`let createdByNewBoolean: Boolean = new Boolean(1);`

直接调用`Boolean`也可以返回一个`boolean`类型：  
`let createdByBoolean: boolean = Boolean(1);`

在 Typescript 中，`boolean`是 JavaScript 中的基本类型，而`Boolean`是 JavaScript 中的构造函数。其他基本类型（除了 null 和 undefined）一样。

##### 2. 数值

使用`number`定义数值类型：

```
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

##### 3. 字符串

使用 string 定义字符串类型

```
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```

编译结果：

```
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
```

其中`用来定义ES6的模板字符串，`\${expr}`用来在模板字符串中嵌入表达式。

##### 4. 空值

Javascript 中没有空值（Void）的概念，在 Typescript 中，可以用 void 表示没有任何返回值的函数：

```
function alertName(): void{
    alert('My name is Tom');
}
```

声明一个 void 类型的变量没有什么用，因为你只能将他赋值给 undefined 和 null：

```
let unusable: void = undefined;
```

##### 5. Null 和 Undefined

在 Typescript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：

```
let u: undefined = undefined;
let n: null = null;
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说，undefined 类型的变量，可以赋值给 number 类型的变量：

```
// 这样不会报错
let num: number = undefined;
```

```
// 这样也不会报错
let u: undefined;
let num: number = u;
```

而 void 类型的变量不能赋值给 number 类型的变量：

```
let u: void;
let num: number = u;
// Type 'void' is not assignable to type 'number'.
```

#### 四. 任意值

任意值（Any）用来表示允许赋值为任意类型。

##### 1. 什么是任意值类型

如果是一个普通类型，在赋值过程中改变类型是不被允许的：

```
let myNumber: string = 'seven';
myNumber = 7;
// hello.ts:83:1 - error TS2322: Type '7' is not assignable to type 'string'.
```

但如果是 any 类型，则允许被赋值为任意类型。

```
let myNumber1: any = 'seven';
myNumber1 = 7;
```

##### 2. 任意值的属性和方法

在任意值上访问任何属性都是允许的：

```
let anyThingHello: any = 'hello';
console.log(anyThingHello.myName);
console.log(anyThingHello.myName.firstName);
```

也允许调用任何方法：

```
let anyThing: any = 'xzt';
anyThing.setName('xxx');
anyThing.setName('ttt');
anyThing.setName('xt').sayHello();
anyThing.setName.setFirstName('xiong');
```

可以认为，**_声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。_**

##### 3. 未声明类型的变量

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

```
let something;
something = 'xzt';
something = 23;
something.setName('xxx');
```

等价于

```
let something: any;
something = 'xzt';
something = 23;
something.setName('xxx');
```

#### 五. 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

##### 什么是类型推论

以下代码虽然没有指定类型，但是会在编译的时候报错：

```
let myNumber2 = 'xzt';
myNumber2 = 7; // hello.ts:113:1 - error TS2322: Type '7' is not assignable to type 'string'.
```

事实上，它等价于：

```
let myNumber2: string = 'xzt';
myNumber2 = 7; // hello.ts:113:1 - error TS2322: Type '7' is not assignable to type 'string'.
```

**TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。**
**_如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：_**

```
let myNumber3;
myNumber3 = 'xxx';
myNumber3 = 7;
```

#### 六. 联合类型
联合类型（Union Types）表示取值可以为多种类型中的一种。
```
let myNumber4: string | number;
myNumber4 = 'xzt';
myNumber4 = 23;
```
```
let myNumber5: string | number;
myNumber4 = true; // hello.ts:133:1 - error TS2322: Type 'true' is not assignable to type 'string | number'.
```
联合类型使用`|`分隔每个类型。
这里的`let myNumber5: string | number`的含义是，允许myNumber5的类型是string或者number，但是不能是其他类型。

##### 访问联合类型的属性和方法
当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性和方法：
```
function getLength(something: string | number): number {
    return something.length;
}
 // hello.ts:136:22 - error TS2339: Property 'length' does not exist on type 'string | number'. Property 'length' does not exist on type 'number'.
```
上例中，length不是string和number的共有属性，所以会报错。  
访问string和number的共有属性是没有问题的：
```
function getString(something: string | number): string {
    return something.toString();
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
```
let myNumber5: string | number;
myNumber5 = 'xzt';
console.log(myNumber5.length);
myNumber5 = 7;
console.log(myNumber5.length); // hello.ts:147:23 - error TS2339: Property 'length' does not exist on type 'number'.
```
上例中，第二行的myNumber5被推断成了string，访问它的length属性不会报错。
而第四行的myNumber5被推断成了number，访问它的length属性时就报错了。