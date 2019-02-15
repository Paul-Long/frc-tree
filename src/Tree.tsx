import React from 'react';
import TreeNode from './TreeNode';
import {ILabelValueType, valueType, renderNode, layer} from './PropsType';
import Manager from './Manager';

export interface ITreeProps {
  className?: string;
  indentSize?: number;
  value?: valueType;
  multiple?: boolean;
  prefixCls?: string;
  children?: renderNode;
  nodes?: ILabelValueType[];
  maxShowCount?: number;
  nodeHeight?: number;
}

class Tree extends React.Component<ITreeProps> {
  public static TreeNode: typeof TreeNode;

  public static defaultProps = {
    indentSize: 17,
    prefixCls: 'frc-tree',
    maxShowCount: 50,
    nodeHeight: 20
  };

  public manager: Manager;

  constructor(props: ITreeProps) {
    super(props);
    this.manager = new Manager({nodes: props.nodes});
  }

  public componentWillReceiveProps(nextProps: ITreeProps) {
    if (nextProps.nodes !== this.props.nodes) {
      this.manager.setNodes(nextProps.nodes);
    }
  }

  public fSaveRef = (name: string) => (node: renderNode) => (this[name] = node);

  public fScroll = (event: React.UIEvent<HTMLDivElement>) => {
    console.log(event.target);
  };

  public renderNodes = () => {
    const {nodes, children, nodeHeight, indentSize, prefixCls} = this.props;
    if (nodes && nodes.length > 0) {
      return this.manager
        .getNodes()
        .map((n) => (
          <TreeNode
            className={`${prefixCls}-node`}
            key={n.key}
            value={n.key}
            label={n.label}
            layer={n[layer]}
            height={nodeHeight}
            indentSize={indentSize}
          />
        ));
    }
    return children;
  };

  render() {
    const {prefixCls} = this.props;
    return (
      <div className={prefixCls} onScroll={this.fScroll}>
        {this.renderNodes()}
      </div>
    );
  }
}

export default Tree;
