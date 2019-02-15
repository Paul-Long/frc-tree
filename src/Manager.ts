import {ILabelValueType, layer} from './PropsType';

interface IManagerProps {
  nodes?: ILabelValueType[];
}

class Manager {
  public nodes: ILabelValueType[] = [];

  constructor(props: IManagerProps) {
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
