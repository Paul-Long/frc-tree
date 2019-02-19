<p align="center">
  <a href="https://github.com/Paul-Long/frc-checkbox">
    <img width="200" src="http://houym-1254119810.picsh.myqcloud.com/logo-200_150.png">
  </a>
</p>

<h1 align="center">Tree</h1>

<div align="center">

React Component Tree

[![npm package](https://img.shields.io/npm/v/frc-tree.svg?style=flat)](https://www.npmjs.com/package/frc-tree)
[![NPM downloads](http://img.shields.io/npm/dm/frc-tree.svg?style=flat-square)](http://npmjs.com/frc-tree)
[![Dependencies](https://img.shields.io/david/paul-long/frc-tree.svg?style=flat-square)](https://david-dm.org/paul-long/frc-tree)
[![DevDependencies](https://img.shields.io/david/dev/paul-long/frc-tree.svg?style=flat-square)](https://david-dm.org/paul-long/frc-tree?type=dev)
[![Gitter](https://img.shields.io/gitter/room/paul-long/frc-tree.svg?style=flat-square)](https://gitter.im/paul-long/paul-long?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Codecov](https://img.shields.io/coveralls/github/paul-long/frc-tree.svg?style=flat-square)](https://codecov.io/gh/paul-long/frc-tree/branch/master)
[![Issues need help](https://flat.badgen.net/github/label-issues/paul-long/frc-tree/help%20wanted/open)](https://github.com/paul-long/frc-tree/issues?q=label%3A%22help+wanted%22)

</div>

# 在线 Demo

https://paul-long.github.io/react-components/#/tree

# 安装

[![rc-select](https://nodei.co/npm/frc-tree.png)](https://npmjs.org/package/frc-tree)

```bash
npm install frc-tree --save-dev
```

# Props

| props        | describe               | type     | default value      |
| ------------ | ---------------------- | -------- | ------------------ |
| className    | className              | string   |                    |
| indentSize   | indentSize             | number   |                    |
| multiple     | select multiple        | boolean  | false              |
| nodes        | tree nodes             | Array    | []                 |
| maxShowCount | max count              | number   | nodes.length or 50 |
| nodeHeight   | tree item height       | number   | 30                 |
| checkable    | checked enable         | boolean  | false              |
| expandedKeys | expanded nodes         | Array    | []                 |
| checkedKeys  | checked nodes          | Array    | []                 |
| selectedKeys | selected nodes         | Array    | []                 |
| onExpand     | listen expand          | Function |                    |
| onCheck      | listen check           | Function |                    |
| onSelect     | listen select          | Function |                    |
| showIcon     | show icon ,not default | boolean  | false              |

# 示例

```jsx harmony
import React from 'react';
import Tree from 'frc-tree';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tree nodes={[]} />
      </div>
    );
  }
}
```
