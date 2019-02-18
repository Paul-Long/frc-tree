import React from 'react';
// @ts-ignore
import AutoSize from 'frc-auto-size';
import TreeNode from './TreeNode';
import {
  ILabelValueType,
  valueType,
  renderNode,
  layer,
  expandedEnable,
  expanded
} from './PropsType';
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
  checkable?: boolean;
}

interface ITreeState {
  width: number;
  height: number;
  count: number;
  start: number;
}

interface IChildParams {
  width?: number;
  height?: number;
}

class Tree extends React.Component<ITreeProps, ITreeState> {
  public static TreeNode: typeof TreeNode;

  public static defaultProps = {
    indentSize: 17,
    prefixCls: 'frc-tree',
    maxShowCount: 50,
    nodeHeight: 30,
    checkable: false
  };

  public manager: Manager;
  public tree?: HTMLDivElement;
  public content?: HTMLDivElement;

  constructor(props: ITreeProps) {
    super(props);
    this.manager = new Manager({nodes: props.nodes});
    this.state = {
      width: 0,
      height: 0,
      count: props.maxShowCount || 50,
      start: 0
    };
  }

  public componentWillReceiveProps(nextProps: ITreeProps) {
    if (nextProps.nodes !== this.props.nodes) {
      this.manager.setNodes(nextProps.nodes);
    }
  }

  public fSaveRef = (name: string) => (node: renderNode) => (this[name] = node);

  public fScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target: EventTarget = event.currentTarget;
    if (target && this.tree === event.target) {
      this.fIndex();
    }
  };

  public fIndex = () => {
    const {nodeHeight} = this.props;
    if (!this.tree) {
      return;
    }

    console.log(
      ' scrollTop => ',
      this.tree.scrollTop,
      ' scrollHeight => ',
      this.tree.scrollHeight,
      ' clientHeight => ',
      this.tree.clientHeight,
      ' startIndex => ',
      Math.floor(this.tree.scrollTop / (nodeHeight || 30))
    );
    const {count} = this.state;
    const nodes = this.manager.getNodes();
    let start = Math.floor(this.tree.scrollTop / (nodeHeight || 30));
    if (start >= nodes.length - count) {
      start = nodes.length - count - 1;
    }
    if (start < 0) {
      start = 0;
    }

    this.setState({start});
  };

  public fCount = (props: ITreeProps = this.props) => {
    const {nodeHeight} = props;
    const {height} = this.state;
    const nodes = this.manager.getNodes();
    let maxCount = Math.round((height || 0) / (nodeHeight || 30));
    if (maxCount > 0) {
      maxCount += 3;
    }
    if (nodes.length <= maxCount) {
      maxCount = nodes.length;
    }
    return maxCount;
  };

  public fResize = (params: IChildParams) => {
    this.setState(
      {
        width: params.width || 0,
        height: params.height || 0
      },
      () => this.setState({count: this.fCount()})
    );
  };

  public fRef = (name: string) => (node: HTMLDivElement) => {
    this[name] = node;
  };

  public renderNodes = () => {
    const {children, nodeHeight, indentSize, prefixCls, checkable} = this.props;
    const {count, start} = this.state;
    console.log(start);
    const nodes = this.manager.getNodes();
    if (nodes && nodes.length > 0) {
      const items = [];
      for (let i = start; i <= start + count; i++) {
        const n = nodes[i];
        items.push(
          <TreeNode
            className={`${prefixCls}-node`}
            key={n.key}
            value={n.key}
            label={n.label}
            layer={n[layer]}
            height={nodeHeight}
            indentSize={indentSize}
            selectable={checkable}
            expanded={n[expanded]}
            expandedEnable={n[expandedEnable]}
            style={{top: i * (nodeHeight || 30)}}
          />
        );
      }
      return items;
    }
    return children;
  };

  public renderChild = (params: IChildParams) => {
    const {prefixCls, nodeHeight} = this.props;
    const nodes = this.manager.getNodes();
    return (
      <div
        className={prefixCls}
        onScroll={this.fScroll}
        style={{width: params.width, height: params.height}}
        ref={this.fRef('tree')}
      >
        <div
          ref={this.fRef('content')}
          style={{
            width: params.width,
            height: nodes.length * (nodeHeight || 30)
          }}
        >
          {this.renderNodes()}
        </div>
      </div>
    );
  };

  render() {
    return (
      <AutoSize style={{width: '100%'}} onResize={this.fResize}>
        {this.renderChild}
      </AutoSize>
    );
  }
}

export default Tree;
