# 🎓 SectionInput 表单组件 — 逐行教学

> 适合：React 初学者，已经会写简单的组件，但对「数组不可变操作」「工厂函数」「受控组件」还不太熟  
> 时间：约 4–5 天，每天 1–2 个知识点

---

## 背景：这个组件在做什么？

`SectionInput` 是一个**表单编辑器**，用来让用户动态添加/编辑/删除一个项目的 "Sections"（章节）。

一个项目可能有多个 Section，每个 Section 包含：
- **标题**（title）
- **布局类型**（layoutType）
- **文本块列表**（contentTexts）
- **图片列表**（contentImages）
- **视频列表**（contentVideos）

这个组件就是一个层层嵌套的「列表编辑器」——列表里套列表、列表里又套列表。

---

## 📋 数据长什么样？（先看图再学代码）

```
sections = [                          ← 最外层数组（所有 section）
  {                                   ← 第 0 个 section
    id: 1734567890123,
    order: 0,
    title: "项目概述",
    layoutType: "imgTopTextBottom",
    contentTexts: [                   ← 第二层数组（这个 section 的所有文本）
      { id: 1734567890456, content: "这是第一段文字" },
      { id: 1734567890789, content: "这是第二段文字" },
    ],
    contentImages: [                  ← 第二层数组（这个 section 的所有图片）
      { id: 1734567891000, url: "/img/screenshot.png", alt: "截图" },
    ],
    contentVideos: [],                ← 第二层数组（这个 section 的所有视频）
  },
  {                                   ← 第 1 个 section
    id: 1734567892000,
    order: 1,
    title: "技术架构",
    ...
  },
]
```

**层级关系：**
```
sections 数组（外层）
  └── section 对象（索引 0, 1, 2...）
        ├── title（字符串）
        ├── layoutType（字符串）
        ├── contentTexts 数组（内层）
        │     └── { id, content } 对象
        ├── contentImages 数组（内层）
        │     └── { id, url, alt } 对象
        └── contentVideos 数组（内层）
              └── { id, url } 对象
```

---

在阅读下面的知识点之前，请先把这张「地图」记在脑子里。
遇到任何看不懂的变量名时，对照这张图：「它在操作第几层？是数组还是对象？」

---

## 知识点 1：`const section = value[sectionIndex]`
> 难度：⭐ | 通过索引访问数组元素

### 代码

```ts
const addContentText = (sectionIndex: number) => {
  const section = value[sectionIndex];  // ← 这一行
  // ...
};
```

### 解释

`value` 是一个数组（所有 section 的列表）。`sectionIndex` 是一个数字（比如 `0`、`1`、`2`）。

`value[sectionIndex]` 的意思是：**从 value 这个数组里，取出第 `sectionIndex` 个元素。**

```
value = [section_0, section_1, section_2]
               ↑          ↑          ↑
         索引 0      索引 1      索引 2

value[0]  →  section_0
value[1]  →  section_1
value[2]  →  section_2
```

所以 `const section = value[sectionIndex]` 就是：「把当前要操作的那个 section 取出来，存到变量 `section` 里，方便后面用。」

### 为什么要这样写？

因为接下来要对这个 section 做操作（比如往它的 `contentTexts` 里加一条数据）。先取出来，代码更清晰——不用每次都写 `value[sectionIndex].contentTexts`，写成 `section.contentTexts` 更短更好读。

### 🔑 关键 JS 语法

| 语法 | 含义 |
|------|------|
| `arr[0]` | 取数组的第 1 个元素（索引从 0 开始） |
| `arr[i]` | 取数组的第 `i + 1` 个元素 |
| `const x = arr[i]` | 把取出来的元素存到变量 `x` 里，方便反复使用 |

---

### 📝 知识点 1 练习

**练习 1（模仿）**  
给定 `const fruits = ["苹果", "香蕉", "橙子"]`，分别用索引取出并打印三个水果。

**练习 2（变体）**  
写一个函数 `getStudent(students, index)`，接收学生数组和索引，返回对应学生的名字。

**练习 3（独立解决）**  
有一个数组 `const sections = [{ title: "A" }, { title: "B" }, { title: "C" }]`。  
写一个函数 `renameSection(sections, index, newTitle)`，修改指定索引的 section 的 title，并返回**新的数组**（不修改原数组）。

---

## 知识点 2：`createEmptySection` — 工厂函数
> 难度：⭐⭐ | 生产一个「空白的 section 模板」

### 代码

```ts
const createEmptySection = (order: number): Section => ({
  id: Date.now(),        // 临时 ID，后端会分配真实 ID
  order,
  title: "",
  layoutType: "imgTopTextBottom",
  contentTexts: [{ id: Date.now(), content: "" }],
  contentImages: [],
  contentVideos: [],
});
```

### 解释

这个函数的作用是：**每次用户点击「添加 Section」按钮时，生成一个全新的、空白的 section 对象。**

打一个比方 🍔：
> 你去汉堡店点餐，每次都给你一个「标准汉堡模板」：两片面包 + 一块肉饼 + 一片生菜。你可以自己再加芝士、培根。  
> `createEmptySection` 就是那个「标准汉堡模板」——每次调用都给你一个结构完整的空 section，你往后填内容就行。

### 逐行解析

```ts
const createEmptySection = (order: number): Section => ({
//     ↑ 函数名               ↑ 参数：这个 section 的序号  ↑ 返回值类型（TypeScript）
  id: Date.now(),  // Date.now() 返回当前时间戳（毫秒），保证临时 ID 不重复
  order,           // 等同于 order: order，ES6 简写
  title: "",       // 标题初始为空字符串
  layoutType: "imgTopTextBottom",  // 默认布局：「图片在上，文字在下」
  contentTexts: [{ id: Date.now(), content: "" }],  // 默认带一个空文本框
  contentImages: [],  // 初始没有图片
  contentVideos: [],  // 初始没有视频
});
```

#### 🔍 注意两个特殊语法：

**1. `({ ... })` — 箭头函数直接返回对象**
```ts
// ❌ 错误写法：JS 会把 { } 当成函数体
const fn = () => { name: "hello" }  // 返回 undefined

// ✅ 正确写法：用圆括号包起来
const fn = () => ({ name: "hello" })  // 返回 { name: "hello" }
```

**2. `order` — 属性简写**
```ts
// 这两个写法完全等价：
{ order: order }   // 完整写法
{ order }          // ES6 简写（当属性名和变量名相同时可用）
```

### 🔑 关键 JS 语法

| 语法 | 含义 |
|------|------|
| `Date.now()` | 获取当前时间的毫秒时间戳 |
| `() => ({ ... })` | 箭头函数返回对象字面量（必须加外层括号） |
| `{ order }` | 对象属性简写 |
| `factory function` | 「工厂函数」— 专门用来创建对象的函数 |

---

### 📝 知识点 2 练习

**练习 1（模仿）**  
写一个 `createStudent` 工厂函数，每次调用返回 `{ id: 随机数, name: "", grade: 1 }`。

**练习 2（变体）**  
写一个 `createTodo(text)` 工厂函数，返回 `{ id: 当前时间戳, text: 参数text, done: false }`。

**练习 3（独立解决）**  
不使用工厂函数的话，每次添加 section 要手动写 6 行代码。假设一个页面有 3 种地方需要创建 section（新增按钮、复制按钮、导入按钮），用工厂函数对比不用工厂函数的代码量差异。写出两种方式的代码。

---

## 知识点 3：`addSection` — 不可变添加数组元素
> 难度：⭐⭐ | 展开运算符 `...`

### 代码

```ts
const addSection = () => {
  onChange([...value, createEmptySection(value.length)]);
};
```

### 解释

这一行的意思是：「把现有的 sections 展开，再在末尾追加一个新的空 section，然后把新数组传给父组件。」

```
假设 value = [section_A, section_B]                    // 现有 2 个 section
createEmptySection(2) → section_C                      // 创建一个新的
[...value, section_C] → [section_A, section_B, section_C]  // 合并
onChange(新的数组) → 通知父组件：「数组变了！」
```

### 逐行解析

```ts
const addSection = () => {
// ↑ 函数名：添加一个 section

  onChange([...value, createEmptySection(value.length)]);
  //        ↑             ↑                        ↑
  //        |             |                        |
  //  展开运算符      工厂函数               value.length = 当前数组长度 = 新 section 的 order
};
```

#### 🔍 `...` 展开运算符（Spread Operator）

```ts
const a = [1, 2, 3];
const b = [...a, 4];  // b = [1, 2, 3, 4]
//         ↑ 把 a 的所有元素「展开」放到这里
```

#### 🔍 为什么 `value.length` 就是新 section 的 order？

```
value = [section_0, section_1]  → length = 2
新加的是第 2 个（索引 2），order 应该是 2 ✅

value = [section_0]             → length = 1
新加的是第 1 个（索引 1），order 应该是 1 ✅
```

数组长度恰好等于下一个 section 的 order 值。

### 🔑 关键概念：不可变更新（Immutable Update）

React 要求我们**不要直接修改原有的数组/对象**，而是要**创建新的**。

```ts
// ❌ 错误：直接 push（React 检测不到变化）
value.push(newSection);

// ✅ 正确：创建新数组
onChange([...value, newSection]);
```

为什么不直接 push？因为 React 通过比较**引用地址**来判断数据是否变了。`push` 不改变数组的引用地址，React 就会认为「没变，不用重新渲染」。而 `[...value]` 创建了一个全新的数组，新地址 ≠ 旧地址，React 就知道要更新了。

### 🔑 关键 JS 语法

| 语法 | 含义 |
|------|------|
| `[...arr, item]` | 展开 arr + 在末尾加 item，得到新数组 |
| `[item, ...arr]` | 在开头加 item |
| `[...arr1, ...arr2]` | 合并两个数组 |
| `arr.length` | 数组长度 |

---

### 📝 知识点 3 练习

**练习 1（模仿）**  
给定 `const nums = [1, 2, 3]`，用展开运算符创建新数组 `[1, 2, 3, 4]`，不修改原数组。

**练习 2（变体）**  
写一个 React 组件，有一个按钮和列表。点击按钮往列表里添加一个序号递增的项（第1项、第2项...）。使用 `useState` 和展开运算符。

**练习 3（独立解决）**  
现在有一个功能需求：「复制 section」——点击复制按钮，把当前 section 复制一份插入到它后面。  
写 `duplicateSection(index)` 函数。注意：复制的 section 的 order 需要重新计算。

---

## 知识点 4：`removeSection` — 不可变删除 + `.filter()` + `.map()`
> 难度：⭐⭐⭐ | 链式数组操作

### 代码

```ts
const removeSection = (index: number) => {
  onChange(
    value
      .filter((_, i) => i !== index)
      .map((section, i) => ({ ...section, order: i })),
  );
};
```

### 解释

这个函数做了两件事：**1. 删掉指定 section → 2. 把剩余 section 的 order 重新编号。**

```
假设删除索引 1（中间那个）：

删除前：                         删除后：
[                               [
  { order: 0, title: "A" },       { order: 0, title: "A" },
  { order: 1, title: "B" },  ← 删掉  { order: 1, title: "C" },  ← order 从 2 变成 1
  { order: 2, title: "C" },
]                               ]
```

为什么要重新编号？因为 order 必须连续（0, 1, 2, 3...），否则后端/数据库可能出问题。

### 逐行解析

```ts
const removeSection = (index: number) => {
  onChange(
    value                               // 1. 从原始数组开始
      .filter((_, i) => i !== index)    // 2. 过滤掉要删除的那一项
      .map((section, i) => ({ ...section, order: i })),  // 3. 重编号
  );
};
```

#### 🔍 `.filter()` — 过滤数组

```ts
[1, 2, 3, 4, 5].filter((num) => num > 3)  // → [4, 5]
//                       ↑ 返回 true 的保留，false 的丢掉

[a, b, c, d].filter((_, i) => i !== 2)  // → [a, b, d]  删掉索引 2
//                     ↑ _ 表示「这个参数我不用」
```

#### 🔍 `_` 下划线是什么？

```ts
.filter((_, i) => i !== index)
//       ↑
//  下划线表示「第一个参数（当前元素）我不用，但我需要第二个参数（索引 i）」
//  这只是一种命名约定，告诉读代码的人：这参数不重要。
```

#### 🔍 `.map()` — 转换数组

```ts
[1, 2, 3].map((num) => num * 2)  // → [2, 4, 6]

// 结合展开运算符，修改对象的某个属性：
[{a:1}, {a:2}].map((obj, i) => ({ ...obj, order: i }))
// → [{a:1, order:0}, {a:2, order:1}]
```

#### 🔍 链式调用 `.filter().map()`

```
value.filter(...).map(...)

就像流水线：
  原始数组 → [filter：筛掉不要的] → [map：给剩下的重新编号] → 最终数组
```

### 🔑 关键 JS 语法

| 语法 | 含义 |
|------|------|
| `arr.filter(fn)` | 返回一个新数组，只包含 `fn` 返回 `true` 的元素 |
| `arr.map(fn)` | 返回一个新数组，每个元素被 `fn` 转换 |
| `(_, i) => ...` | 用 `_` 忽略不用的参数 |
| `.filter().map()` | 链式调用——前一个的返回值传给后一个 |

---

### 📝 知识点 4 练习

**练习 1（模仿）**  
给定 `const arr = ["a", "b", "c", "d"]`。用 `.filter()` 删除索引 2（"c"），再用 `.map()` 给每项加上序号前缀，得到 `["0: a", "1: b", "2: d"]`。

**练习 2（变体）**  
写一个函数 `removeAndRenumber(arr, index)`，删除指定索引，然后把每项的 `order` 属性重新设为连续的 0, 1, 2...。输入：
```js
[
  { name: "张三", order: 5 },
  { name: "李四", order: 3 },
  { name: "王五", order: 7 },
]
```
删除索引 1（李四），结果中张三 order=0，王五 order=1。

**练习 3（独立解决）**  
为什么删除操作必须用 `.filter()` 而不能用 `.splice()`？写两段代码对比，并解释哪种是 React 推荐的做法。

---

## 知识点 5：`updateSection` — 不可变更新数组中的某一项
> 难度：⭐⭐ | `.map()` 的条件替换

### 代码

```ts
const updateSection = (index: number, updated: Partial<Section>) => {
  onChange(
    value.map((section, i) =>
      i === index ? { ...section, ...updated } : section,
    ),
  );
};
```

### 解释

这个函数的意思是：**修改第 `index` 个 section，只改你指定的字段，其他字段保持不变。**

```
假设要把索引 1 的 section 的 title 改成 "新技术栈"：

updateSection(1, { title: "新技术栈" })

操作过程：
[section_0, section_1, section_2]
     ↓ map ↓
[section_0, { ...section_1, title: "新技术栈" }, section_2]
              ↑ 只改 title，其他属性不变
```

### 逐行解析

```ts
const updateSection = (index: number, updated: Partial<Section>) => {
//  函数名          ↑ 要修改的索引  ↑ 要更新的字段（可以是部分字段）↑ Partial = "部分"

  onChange(
    value.map((section, i) =>           // 遍历每个 section
      i === index                        // 当前是我们要改的那个吗？
        ? { ...section, ...updated }    // 是：合并新值
        : section,                      // 不是：原样返回
    ),
  );
};
```

#### 🔍 `Partial<Section>` 是什么？

TypeScript 内置类型。`Partial<Section>` 表示 `Section` 的所有属性都变成**可选的**。

```ts
// Section 类型（简化）
interface Section {
  id: number;
  order: number;
  title: string;
  layoutType: string;
}

// Partial<Section> 等价于
{
  id?: number;
  order?: number;
  title?: string;
  layoutType?: string;
}
//   ↑ 问号表示：这个字段可以不给
```

所以调用 `updateSection(1, { title: "新技术" })` 时，你只传 `title` 也合法。

#### 🔍 `{ ...section, ...updated }` — 对象合并

```ts
const section = { title: "旧标题", order: 1, layoutType: "A" };
const updated = { title: "新标题" };

{ ...section, ...updated }
// → { title: "新标题", order: 1, layoutType: "A" }
//      ↑ 被后面的覆盖了      ↑ 保持不变          ↑ 保持不变
```

规则：**后面的属性覆盖前面的同名属性。** 这就是为什么只传 `{ title: "xxx" }` 就能只改 title。

### 🔑 关键概念：`updateSection` 是其他所有操作的基础

在 `SectionInput` 中，所有修改 section 的操作最终都调用了 `updateSection`：

```
addContentText     →  updateSection(sectionIndex, { contentTexts: newTexts })
removeContentText  →  updateSection(sectionIndex, { contentTexts: newTexts })
updateContentText  →  updateSection(sectionIndex, { contentTexts: newTexts })
updateContentImage →  updateSection(sectionIndex, { contentImages: newImages })
...
```

这就是「提取公共逻辑」——不要在每个函数里重复写 `.map()` 判断逻辑，抽成一个 `updateSection` 复用。

### 🔑 关键 JS 语法

| 语法 | 含义 |
|------|------|
| `condition ? A : B` | 三元运算符：条件为真返回 A，否则返回 B |
| `{ ...obj1, ...obj2 }` | 对象合并，后面的覆盖前面的 |
| `Partial<T>` | TypeScript：T 的所有属性都变成可选 |
| `arr.map((item, i) => i===target ? newItem : item)` | 只改数组中特定索引的元素 |

---

### 📝 知识点 5 练习

**练习 1（模仿）**  
给定 `const todos = [{id:1, text:"买菜", done:false}, {id:2, text:"洗碗", done:false}]`。写一行代码，把 id=2 的 todo 的 `done` 改为 `true`，返回新数组（不修改原数组）。使用 `.map()`。

**练习 2（变体）**  
写一个 `updateStudent(students, index, partialData)` 函数，功能同 `updateSection`。然后测试：
- 只改名字
- 只改成绩
- 同时改名字和成绩  
确认没传的字段不变。

**练习 3（独立解决）**  
如果 `updateSection` 不存在，那么 `addContentText`、`removeContentImage` 等函数会怎么写？写出 `addContentText` 的「内联版本」（不调用 `updateSection`，直接在函数里写 `.map()`）。对比两种写法，说说哪种更好维护，为什么。

---

## 知识点 6：`addContentText` — 嵌套数组操作
> 难度：⭐⭐⭐ | 操作对象里的数组

### 代码

```ts
const addContentText = (sectionIndex: number) => {
  const section = value[sectionIndex];       // 1. 取出要操作的 section
  const newTexts = [                         // 2. 构造新的 contentTexts 数组
    ...(section.contentTexts ?? []),         //    展开现有的（如果是 null/undefined 就用空数组）
    { id: Date.now(), content: "" },         //    末尾追加一个新的空文本
  ];
  updateSection(sectionIndex, { contentTexts: newTexts });  // 3. 更新这个 section
};
```

### 解释

这是在操作**第二层**：在某个 section 的 `contentTexts` 数组里添加一个新元素。

```
sections = [
  {                           ← sectionIndex = 0
    ...,
    contentTexts: [           ← 我们要往这个数组里加东西
      { id: 123, content: "文字A" },
      { id: 456, content: "文字B" },
      ← 加到这里 { id: 789, content: "" }
    ]
  }
]
```

### 逐行解析

```ts
const addContentText = (sectionIndex: number) => {
  // 1️⃣  先取出要修改的那个 section
  const section = value[sectionIndex];

  // 2️⃣  在这个 section 的 contentTexts 基础上，构造新数组
  const newTexts = [
    ...(section.contentTexts ?? []),   // 展开旧的（可能为空，用 ?? [] 兜底）
    { id: Date.now(), content: "" },   // 加一个新元素
  ];

  // 3️⃣  把新的 contentTexts 放回去
  updateSection(sectionIndex, { contentTexts: newTexts });
};
```

#### 🔍 `??` — 空值合并运算符

```ts
section.contentTexts ?? []
//        ↑                  ↑
//   如果是 null 或 undefined     就用这个默认值
```

因为 TypeScript 类型定义中，`contentTexts` 是可选的（`contentTexts?: ContentText[]`），它可能是 `undefined`。用 `??` 保证我们一定能得到一个数组来展开。

```ts
undefined ?? []  →  []       ✅ 安全
null ?? []       →  []       ✅ 安全
[1, 2] ?? []    →  [1, 2]   ✅ 有值就用原来的
```

#### 🔍 `...` 展开 + `??` 的组合

```ts
[...(section.contentTexts ?? []), newItem]

// 等价于：
const safeArray = section.contentTexts ?? [];  // 确保是数组
const result = [...safeArray, newItem];          // 展开并追加
```

### 为什么操作这么「啰嗦」？

因为你不能直接改原有的数组：

```ts
// ❌ 错误：直接 push（React 检测不到）
section.contentTexts.push(newText);

// ❌ 还是错误：你改了 section 对象，但没有通过 onChange 通知 React
section.contentTexts = [...section.contentTexts, newText];

// ✅ 正确：创建全新的对象，通过 onChange 传出去
updateSection(sectionIndex, { contentTexts: [...section.contentTexts, newText] });
```

核心原则：**React 里的数据流是单向的，修改数据必须通过 `onChange` 通知父组件**，不能「偷偷改」。

### 🔑 关键 JS 语法

| 语法 | 含义 |
|------|------|
| `a ?? b` | 如果 `a` 是 `null`/`undefined`，返回 `b`；否则返回 `a` |
| `[...arr, newItem]` | 展开数组并追加元素 |
| `obj.property ?? []` | 安全地访问可能为空的属性 |

---

### 📝 知识点 6 练习

**练习 1（模仿）**  
给定：
```ts
const school = {
  name: "阳光小学",
  classes: [
    { name: "一年级一班", students: ["小明", "小红"] },
    { name: "一年级二班", students: ["小刚"] },
  ]
};
```
用不可变方式，往「一年级一班」的 `students` 里加上「小丽」。写出完整代码（不修改原对象，返回新对象）。

**练习 2（变体）**  
在 SectionInput 中，还有 `removeContentText`、`updateContentText`、`addContentImage` 等函数。它们和 `addContentText` 的模式一模一样，只是操作的具体字段不同。请找出它们的**共同模式**，并用文字总结出来。

**练习 3（独立解决）**  
写一个函数 `addNestedItem(data, path, newItem)`，可以往任意深度的嵌套数组里添加元素。`path` 是一个索引数组，例如 `[0, "contentTexts"]` 表示 `data[0].contentTexts`。这个函数需要返回全新的对象（深拷贝）。提示：你可能需要用到递归。

---

## 知识点 7：`Controller` — react-hook-form 的「桥接」组件
> 难度：⭐⭐⭐⭐ | 连接外部组件和表单状态

### 代码（来自 NewProject.tsx）

```tsx
<div>
  <label>Sections</label>
  <Controller
    name="sections"
    control={control}
    render={({ field }) => (      
      <SectionInput
        value={field.value ?? []}
        onChange={field.onChange}
      />
    )}
  />
  <ErrorMessage>{errors.sections?.message}</ErrorMessage>
</div>
```

### 解释

`SectionInput` 是一个**非标准表单组件**——它不是 `<input>` 或 `<select>`，react-hook-form 不认识它。

`Controller` 的作用是**搭桥**：把 react-hook-form 的 `value` 和 `onChange` 「翻译」给 `SectionInput`，让这个自定义组件能接入表单系统。

### 图解

```
react-hook-form（表单状态管理）
       │
       │  「你需要帮我管理一个叫 sections 的字段」
       │
       ▼
  ┌─────────────┐
  │  Controller  │  ← 桥：负责翻译
  │  name="sections"
  │  control={control}
  │  render={({ field }) => (   ← field 就是桥传来的东西
  │    <SectionInput
  │      value={field.value}    ← 当前表单里 sections 的值
  │      onChange={field.onChange} ← 当 SectionInput 内部数据变了，通知表单
  │    />
  │  )}
  └─────────────┘
       │
       │  value / onChange（标准接口，任何组件都能实现）
       │
       ▼
  ┌──────────────────┐
  │  SectionInput     │  ← 你的自定义组件
  │  value={...}       │     「我不关心谁在用我，只要给我 value 和 onChange 就行」
  │  onChange={...}    │
  └──────────────────┘
```

### 逐行解析

```tsx
<Controller
  name="sections"           // 1. 告诉 react-hook-form：管理 "sections" 这个字段
  control={control}         // 2. 传入表单的 control 对象（从 useForm() 解构出来）
  render={({ field }) => (  // 3. render prop：Controller 把 field 对象传给你
    <SectionInput
      value={field.value ?? []}     // 4. 当前值 + 兜底（null → []）
      onChange={field.onChange}     // 5. 变更回调——SectionInput 内部调用它
    />
  )}
/>
```

#### 🔍 `render` 里的 `field` 对象

`field` 包含三个核心属性：

| 属性 | 类型 | 作用 |
|------|------|------|
| `field.value` | 任何类型 | 当前字段的值 |
| `field.onChange` | `(value) => void` | 更新字段值的函数 |
| `field.onBlur` | `() => void` | 标记字段已被触碰（用于校验） |

#### 🔍 为什么用 `??` 而不是 `||`？

```ts
field.value ?? []
//    ↑ 只在 null/undefined 时用空数组
//    如果用 || ，当 value 是空数组 [] 时（falsy），也会变成 []
//    虽然这里结果一样，但 ?? 语义更精确
```

#### 🔍 为什么要通过 Controller？不能直接写吗？

```tsx
// ❌ 不能这样写，因为 SectionInput 不是原生表单元素
<SectionInput {...register("sections")} />
// register() 返回的 onChange 接收的是 Event 对象，不是数据本身

// ✅ 必须用 Controller 做「类型翻译」
<Controller
  name="sections"
  control={control}
  render={({ field }) => (
    <SectionInput value={field.value} onChange={field.onChange} />
  )}
/>
```

### 🔑 核心概念：受控组件 + 表单桥接

`SectionInput` 是一个**受控组件**（Controlled Component）——它不自己管理状态，而是通过 `value` 和 `onChange` props 接收和上报数据。

这种模式的好处：
- SectionInput 可以在任何地方复用（不限于 react-hook-form）
- 状态由父组件统一管理，数据流清晰
- 容易测试：只需要传 value 和 mock onChange

---

### 📝 知识点 7 练习

**练习 1（模仿）**  
简单理解 `Controller`：写一个 `Bridge` 组件，它接收 `name` 和 `render` 两个 prop，内部维护一个 `useState`。`render` 调用时传入 `{ value, onChange }`。然后用这个 `Bridge` 包住一个 `<input>`。

**练习 2（变体）**  
在 NewProject.tsx 中，`tags`、`techItems`、`roles`、`sections` 都用了 `Controller`。它们的模式完全相同。请把这个模式抽象成一个可复用的 `FormArrayField` 组件，接收 `name`、`control`、`Component`（要渲染的子组件）、`placeholder` 等参数。

**练习 3（独立解决）**  
阅读 react-hook-form 文档中关于 `useController` hook 的部分。把当前 `Controller` 的 render prop 写法改成 `useController` hook 写法。对比两种方式在代码可读性上的差异。

---

## 🏆 综合挑战

### 场景

你要实现一个「问卷调查编辑器」：
- 每份问卷有多个问题（Question），每个问题有类型（单选/多选/填空）和多个选项（Option）
- 用户可以：添加问题、删除问题、修改问题内容、修改问题类型
- 对于选择题：可以添加选项、删除选项、修改选项文本
- 对于填空题：无选项

### 数据结构

```ts
interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  order: number;
  type: "single" | "multiple" | "fill";
  title: string;
  options: Option[];  // 填空题是空数组
}

// 问卷数据
questions: Question[]
```

### 要求

1. 写 `createEmptyQuestion(order)` 工厂函数（默认是单选，带 2 个空选项）
2. 写 `addQuestion()` — 添加新问题
3. 写 `removeQuestion(index)` — 删除问题 + 重新编号 order
4. 写 `updateQuestion(index, partial)` — 更新问题
5. 写 `addOption(questionIndex)` — 往指定问题添加选项
6. 写 `removeOption(questionIndex, optionIndex)` — 删除选项
7. 当用户把问题类型从「单选/多选」改成「填空」时，自动清空选项列表
8. 用 react-hook-form 的 `Controller` 把整个编辑器接入表单

### 提示

直接复用 SectionInput 里的所有模式！这就是你学到的知识在实际工作中的应用。

---

## 📚 附录：JavaScript 语法速查表

| 语法 | 作用 | 示例 |
|------|------|------|
| `arr[i]` | 访问数组元素 | `arr[0]` |
| `arr.length` | 数组长度 | `[1,2,3].length` → `3` |
| `Date.now()` | 当前时间戳 | `1734567890123` |
| `...arr` | 展开数组 | `[1, ...[2,3]]` → `[1,2,3]` |
| `{ ...obj }` | 展开对象 | `{ a:1, ...{ b:2 } }` → `{ a:1, b:2 }` |
| `{ key }` | 对象属性简写 | `{ name }` = `{ name: name }` |
| `arr.filter(fn)` | 过滤数组 | `[1,2,3].filter(x => x>1)` → `[2,3]` |
| `arr.map(fn)` | 转换数组 | `[1,2].map(x => x*2)` → `[2,4]` |
| `a ?? b` | 空值合并 | `null ?? "默认"` → `"默认"` |
| `a ? b : c` | 三元运算符 | `true ? 1 : 2` → `1` |
| `Partial<T>` | TS：所有属性可选 | `Partial<{a:number}>` = `{a?:number}` |
| `() => ({ ... })` | 箭头函数返回对象 | 外层括号是必须的 |

---

> 🎉 学完这些，你就能看懂 SectionInput.tsx 的全部代码了。  
> 核心要记住的只有两个大原则：
> 1. **React 数据不可变** — 用 `...`、`.filter()`、`.map()` 创建新数组/对象  
> 2. **受控组件模式** — value 进来，onChange 出去，自己不存状态