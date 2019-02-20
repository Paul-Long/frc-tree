import {
  ILabelValueType,
  layer,
  _expanded_,
  _expandedEnable_,
  _checked_
} from './PropsType';
import {ReactText} from 'react';

interface IManagerProps {
  nodes?: ILabelValueType[];
  defaultCheckedKeys?: ReactText[];
  expandedKeys?: ReactText[];
  checkedKeys?: ReactText[];
}

class Manager {
  public nodes: ILabelValueType[] = [];
  public _nodes: ILabelValueType[] = [];
  public expandedKeys: ReactText[];
  public checkedKeys: ReactText[];
  public defaultCheckedKeys: ReactText[];

  constructor(props: IManagerProps) {
    this.expandedKeys = props.expandedKeys || [];
    this.checkedKeys = props.checkedKeys || [];
    this.defaultCheckedKeys = props.defaultCheckedKeys || [];
    this._nodes = props.nodes || [];
    this.nodes = this.fSpread(props.nodes || []);
  }

  public fSpread = (
    src: ILabelValueType[],
    des: ILabelValueType[] = [],
    current: number = 0
  ) => {
    for (let i = 0; i < src.length; i++) {
      const n = {...src[i], [layer]: current};
      let children = n.children || [];
      if (Object.prototype.hasOwnProperty.call(n, 'children')) {
        delete n.children;
      }
      n[_expanded_] = this.expandedKeys.some((k) => k === n.key);
      n[_expandedEnable_] = children.length > 0;
      n[_checked_] = this.checkedKeys.some((c) => c === n.key);
      des.push(n);
      if (children.length > 0 && n[_expanded_]) {
        des = this.fSpread(children, des, current + 1);
      }
    }
    return des;
  };

  public setNodes = (nodes?: ILabelValueType[]) => {
    nodes = nodes || [];
    this.nodes = this.fSpread(nodes);
  };

  public getNodes = () => {
    return this.nodes;
  };

  public allKeys = () => {
    return this.getNodes()
      .filter((n) => n[_expandedEnable_])
      .map((n) => n.key);
  };

  public setExpandedKeys = (keys: ReactText[]) => {
    this.expandedKeys = keys || [];
    this.nodes = this.fSpread(this._nodes);
  };

  private getKeys = (
    nodes: ILabelValueType[],
    keys: ReactText[],
    value: ReactText | ReactText[],
    selected: boolean,
    checked: boolean
  ) => {
    for (let i = 0; i < nodes.length; i++) {
      const n: ILabelValueType = nodes[i];
      const children = n.children || [];
      let flag = false;
      if (value instanceof Array) {
        if (value.some((v) => v === n.key) || selected) {
          flag = true;
          n[_checked_] = checked;
        }
      } else {
        if (n.key === value || selected) {
          flag = true;
          n[_checked_] = checked;
        }
      }
      if (children.length > 0) {
        this.getKeys(children, keys, value, flag, checked);
      }
      if ((n.children || []).length > 0) {
        n[_checked_] = !(n.children || []).some((c) => !c[_checked_]);
      }
      if (n[_checked_] && !keys.some((k) => k === n.key)) {
        keys.push(n.key);
      }
    }
  };

  public setCheckedKeys = (
    value: ReactText | ReactText[],
    checked: boolean
  ) => {
    let keys: ReactText[] = [];
    this.getKeys(this._nodes, keys, value, false, checked);
    this.checkedKeys = keys;
    this.nodes = this.fSpread(this._nodes);
    return this.checkedKeys;
  };
}

export default Manager;
