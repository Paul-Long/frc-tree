import {ILabelValueType, layer, expanded, expandedEnable} from './PropsType';

interface IManagerProps {
  nodes?: ILabelValueType[];
}

class Manager {
  public nodes: ILabelValueType[] = [];
  public expandedKeys: string[] | number[];

  constructor(props: IManagerProps) {
    this.expandedKeys = [];
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
      n[expanded] = children.length > 0;
      n[expandedEnable] = this.expandedKeys.some(
        (k: string | number) => k === n.key
      );
      des.push(n);
      if (children.length > 0) {
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
}

export default Manager;
