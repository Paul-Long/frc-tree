import React from 'react';
import TreeNode from './TreeNode';
import {ILabelValueType, valueType, renderNode} from './PropsType';
import Manager from './Manager';

export interface ITreeProps {
  className?: string;
  indentSize?: number;
  value?: valueType;
  multiple: boolean;
  prefixCls: string;
  children: renderNode;
  nodes: ILabelValueType[];
}

class Tree extends React.Component<ITreeProps> {
  public static TreeNode: typeof TreeNode;

  public static defaultProps = {
    indentSize: 17,
    prefixCls: 'frc-tree'
  };

  public manager: Manager;

  constructor(props: ITreeProps) {
    super(props);
    this.manager = new Manager({nodes: props.nodes});
  }

  public renderNodes = () => {
    const {nodes, children} = this.props;
    if (nodes && nodes.length > 0) {
      return this.manager.getNodes().map(({key, label, layer}) => {
        return <TreeNode key={key} value={key} label={label} layer={layer} />;
      });
    }
    return children;
  };

  render() {
    const {prefixCls} = this.props;
    return <div className={prefixCls} />;
  }
}

export default Tree;
