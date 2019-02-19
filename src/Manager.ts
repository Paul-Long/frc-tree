import {ILabelValueType, layer, expanded, expandedEnable} from './PropsType';
import {ReactText} from 'react';

interface IManagerProps {
  nodes?: ILabelValueType[];
}

class Manager {
  public nodes: ILabelValueType[] = [];
  public _nodes: ILabelValueType[] = [];
  public expandedKeys: string[] | number[] | ReactText[];

  constructor(props: IManagerProps) {
    this.expandedKeys = [];
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
      n[expanded] = this.expandedKeys.some((k: string | number) => k === n.key);
      n[expandedEnable] = children.length > 0;
      des.push(n);
      if (children.length > 0 && n[expanded]) {
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
      .filter((n) => n[expandedEnable])
      .map((n) => n.key);
  };

  public setExpandedKeys = (keys: string[] | number[] | ReactText[]) => {
    this.expandedKeys = keys || [];
    this.nodes = this.fSpread(this._nodes);
  };

  public getCheckedKeys = (value: ReactText, checked: boolean) => {};
}

export default Manager;
