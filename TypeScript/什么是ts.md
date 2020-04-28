<!--
 * @Author: xiongziting
 * @Date: 2020-04-28 10:58:51
 * @LastEditors: xiongziting
 * @LastEditTime: 2020-04-28 10:58:52
 * @Description: ts介绍
 * @FilePath: \AllPractice\TypeScript\什么是ts.md
 -->

#### 一. 什么是TypeScript
TypeScript是JavaScript的一个超集，主要提供了类型系统和对ES6的支持。它可以编译成纯JavaScript。编译出来的JavaScript可以运行在任何浏览器上。Typescript编译工具可以运行在任何服务器和任何系统上。Typescript是开源的。

#### 二. 为什么选择Typescript
##### Typescript增加了代码的可读性和可维护性
- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
- 增强了编辑器和IDE的功能，包括代码补全 接口提示 跳转到定义 以及重构等
##### TypeScript非常包容
- Typescript是JavaScript的超集，`.js`文件可以直接重命名为`.ts`即可
- 即使不显式的定义类型，也能够自动做出类型推论
- 可以定义从简单到复杂的几乎一切类型
- 即使TypeScript编译报错，也可以生成JavaScript文件
- 兼容第三方库，即使第三方库不是用Typescript写的，也可以编写单独的类型文件供Typescript读取。
##### Typescript拥有活跃的社区
- 大部分第三方库都有提供给Typescript的类型定义文件
- Google开发的Angular2就是用Typescript编写的
- Typescript拥抱了ES6规范，也支持部分ESNext草案的规范
##### Typescript的缺点
- 有一定的学习成本，需要理解接口（Interfaces）泛型（Generics）类（Classes）枚举类型（Enums）等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，Typescript能够减少其维护成本
- 集成到构建流程需要一些工作量
- 可能和一些库结合的不是很完美