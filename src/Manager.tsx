import {ILabelValueType, currentKey} from './PropsType';

interface IManagerProps {
  nodes: ILabelValueType[];
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
      const n = {...src[i], [currentKey]: current};
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

  public getNodes = () => {
    return this.nodes;
  }
}

export default Manager;
