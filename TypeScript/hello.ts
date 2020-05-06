/*
 * @Author: xiongziting
 * @Date: 2020-04-28 10:29:09
 * @LastEditors: xiongziting
 * @LastEditTime: 2020-05-06 14:50:03
 * @Description: 第一个ts练习
 * @FilePath: \AllPractice\TypeScript\hello.ts
 */

function sayHello(person: string) {
  return 'hello, ' + person;
}

let user = 'Tom';

/**
 * TypeScript只会进行静态检查，如果发现有错误，编译的时候就会报错
 */
// let user = [0, 1, 2]; // hello.ts:17:22 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
// 虽然编译时会报错，但还是会生成js文件
console.log(sayHello(user));

/**
 *  基本数据类型
 */

/**
 * 布尔值
 */
let isDone: boolean = false;
let createdByNewBoolean1: Boolean = new Boolean(1);
// let createdByNewBoolean2: boolean = new Boolean(1); // 注意，使用构造函数 Boolean 创造的对象不是布尔值：

/**
 * 数值
 */
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;

/**
 * 字符串
 */
// 使用string定义字符串类型
let myName: string = 'Tom';
let myAge: number = 25;
// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;

/**
 * 空值
 */
// Javascript中没有空值（Void）的概念，在Typescript中，可以用void表示没有任何返回值的函数：
function alertName(): void {
  alert('My name is Tom');
}
// 声明一个void类型的变量没有什么用，因为你只能将他赋值给undefined和null：
let unusable: void = undefined;

/**
 * Null和Undefined
 */
// 在typescript中，可以使用null和undefined来定义这两个原始数据类型：
let u1: undefined = undefined;
let n1: null = undefined;
let num1: number = undefined;
let u2: undefined;
let num2: number = u2;
// void类型的变量不能赋值给number类型的变量：
// let u3: void;
// let num3: number = u3; // hello.ts:63:5 - error TS2322: Type 'void' is not assignable to type 'number'.

/**
 * 任意值
 */
// 任意值类型
// 如果是一个普通类型，在赋值过程中改变类型是不被允许的：
// let myNumber: string = 'seven';
// myNumber = 7; // hello.ts:83:1 - error TS2322: Type '7' is not assignable to type 'string'.
// 但如果是any类型，则允许被赋值为任意类型。
let myNumber1: any = 'seven';
myNumber1 = 7;
// 任意值的属性和方法
let anyThingHello: any = 'hello';
console.log(anyThingHello.myName);
console.log(anyThingHello.myName.firstName);
// 也允许调用任何方法
let anyThing: any = 'xzt';
anyThing.setName('xxx');
anyThing.setName('ttt');
anyThing.setName('xt').sayHello();
anyThing.setName.setFirstName('xiong');
// 可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

// 未声明类型的变量
// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
let something; // 等价于let something：any;
something = 'xzt';
something = 23;
something.setName('xxx');

/**
 * 类型推论
 */
// 如果没有明确的指定类型，那么TypeScript会依照类型推论（Type Inference）的规则推断出一个类型。
// let myNumber2 = 'xzt';
// myNumber2 = 7; // hello.ts:113:1 - error TS2322: Type '7' is not assignable to type 'string'.
// 虽然以上代码没有指定类型，但是会在编译的时候报错，实际上它等价于：
let myNumber2: string = 'xzt';
// myNumber2 = 7; // hello.ts:113:1 - error TS2322: Type '7' is not assignable to type 'string'.

// TypeScript会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成any类型而完全不被类型检查：
let myNumber3;
myNumber3 = 'xxx';
myNumber3 = 7;

/**
 * 联合类型
 */
// 联合类型（Union Types）表示取值可以为多种类型中的一种。
let myNumber4: string | number; // 允许myNumber4的类型是string或者number，但是不能是其他类型。
myNumber4 = 'xzt';
myNumber4 = 23;

// let myNumber5: string | number;
// myNumber4 = true; // hello.ts:133:1 - error TS2322: Type 'true' is not assignable to type 'string | number'.

// function getLength(something: string | number): number {
//     return something.length; // hello.ts:136:22 - error TS2339: Property 'length' does not exist on type 'string | number'. Property 'length' does not exist on type 'number'.
// }

function getString(something: string | number): string {
  return something.toString();
}
// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
let myNumber5: string | number;
myNumber5 = 'xzt';
console.log(myNumber5.length);
myNumber5 = 7;
// console.log(myNumber5.length); // hello.ts:147:23 - error TS2339: Property 'length' does not exist on type 'number'.

/**
 * 对象的类型-接口
 */
interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: 'xxx',
  age: 25,
};

// 约束了person的形状必须和接口Person一致。
// 定义的变量比接口少了一些属性是不允许的
// let person1: Person = {
//   name: 'xzt', // hello.ts:164:5 - error TS2741: Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
// };

// 多一些属性也是不允许的：
// let person2: Person = {
//   name: 'xzt',
//   age: 23,
//   gender: 'female', // hello.ts:172:3 - error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'. Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
// };

/**
 * 可选属性
 */
interface Person1 {
  name: string;
  age?: number;
}
let person3: Person1 = {
  name: 'xzt',
};
let person4: Person1 = {
  name: 'xzt',
  age: 25,
};

// 不允许添加未定义的属性
// let person5: Person1 = {
//   name: 'xzt',
//   age: 23,
//   gender: 'female', // Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person1'. Object literal may only specify known properties, and 'gender' does not exist in type 'Person1'.
// };

/**
 * 任意属性
 */
interface Person2 {
  name: string;
  age?: number;
  [propName: string]: any;
}

let person6: Person2 = {
  name: 'xzt',
  gender: 'female',
};

// interface Person3 {
//     name: string;
//     age?: number;
//     [propName: string]: string;
// }
// let tom: Person = {
//     name: 'Tom',
//     age: 25,
//     gender: 'male'
// };
// Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'. Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.

interface Person4 {
  name: string;
  age?: number;
  [propName: string]: string | number;
}
let person7: Person4 = {
  name: 'xzt',
  age: 23,
  gender: 'female',
};

/**
 * 只读属性
 */

interface Person5 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let person8: Person5 = {
  id: 1997,
  name: 'xzt',
  gender: 'femal',
};
// person8.id = 18087; // hello.ts:250:9 - error TS2540: Cannot assign to 'id' because it is a read-only property.

// let person9: Person5 = {
//   name: 'xzt',
//   gender: 'female',
// };
// // Property 'id' is missing in type '{ name: string; gender: string; }' but required in type 'Person5'.
// person9.id = 1997; // hello.ts:256:9 - error TS2540: Cannot assign to 'id' because it is a read-only property.

/**
 * 数组
 */
let tsArray: number[] = [1, 1, 2, 3, 4, 5];
tsArray.push(8);
// tsArray.push('8'); // hello.ts:264:14 - error TS2345: Argument of type '"8"' is not assignable to parameter of type 'number'.
// let tsArray1: number[] = [1, '1', 2, 3, 4, 5]; // hello.ts:265:30 - error TS2322: Type 'string' is not assignable to type 'number'.

// 数组泛型
let tsArray2: Array<number> = [1, 1, 2, 3, 4, 5];

// 用接口表示数组
interface NumberArray {
  [index: number]: number;
}
let array: NumberArray = [1, 2, 3, 4, 5];

// 类数组
// function sum() {
//   let args: number[] = arguments; // hello.ts:278:7 - error TS2740: Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 15 more.
// }

function sum1() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}

function sum2() {
  let args: IArguments = arguments;
}

// any在数组中的应用
let anyArray: any[] = ['xzt', 23, { url: 'http://localhost:8080' }];

/**
 * 函数的类型
 */
// 函数声明
// function sum3(x, y) {
//   return x + y;
// }

// function sum4(x: number, y: number) {
//   return x + y;
// }

// 注意，输入多余的（或者少于要求的）参数，是不被允许的：
// function sum5(x: number, y: number): number {
//   return x + y;
// }
// sum5(1, 2, 3);
