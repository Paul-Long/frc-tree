import React, {ReactText} from 'react';
import classNames from 'classnames';
// @ts-ignore
import AutoSize from 'frc-auto-size';
import TreeNode from './TreeNode';
// @ts-ignore
import scrollSize from 'frc-scroll-size';
import {
  ILabelValueType,
  renderNode,
  layer,
  _expandedEnable_,
  _expanded_,
  _checked_
} from './PropsType';
import Manager from './Manager';

export interface ITreeProps {
  className?: string;
  indentSize?: number;
  multiple?: boolean;
  prefixCls?: string;
  nodes?: ILabelValueType[];
  maxShowCount?: number;
  nodeHeight?: number;
  checkable?: boolean;
  defaultExpandedAll?: boolean;
  defaultCheckedKeys?: ReactText[];
  expandedKeys?: ReactText[];
  checkedKeys?: ReactText[];
  selectedKeys?: ReactText[];
  onExpand?: Function;
  onCheck?: Function;
  onSelect?: Function;
  showIcon?: boolean;
}

interface ITreeState {
  width: number;
  height: number;
  count: number;
  start: number;
  expandedKeys: ReactText[];
  checkedKeys: ReactText[];
  selectedKeys: ReactText[];
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
    nodeHeight: 24,
    checkable: false,
    defaultExpandedAll: false,
    expandedKeys: [],
    checkedKeys: [],
    selectedKeys: [],
    showIcon: false,
    onExpand: () => {},
    onCheck: () => {},
    onSelect: () => {}
  };

  public manager: Manager;
  public tree?: HTMLDivElement;
  public content?: HTMLDivElement;

  constructor(props: ITreeProps) {
    super(props);
    this.manager = new Manager({
      nodes: props.nodes,
      expandedKeys: props.expandedKeys,
      checkedKeys: props.checkedKeys,
      defaultCheckedKeys: props.defaultCheckedKeys
    });
    this.state = {
      width: 0,
      height: 0,
      start: 0,
      count: 0,
      expandedKeys: props.defaultExpandedAll
        ? this.manager.allKeys()
        : props.expandedKeys || [],
      checkedKeys: this.manager.setCheckedKeys(
        props.defaultCheckedKeys || [],
        true
      ),
      selectedKeys: props.selectedKeys || []
    };
    this.manager.setExpandedKeys(this.state.expandedKeys);
    // @ts-ignore
    this.state.count = this.fCount();
  }

  componentDidMount() {
    const {checkedKeys} = this.props;
    this.setState({
      checkedKeys: this.manager.setCheckedKeys(checkedKeys || [], true)
    });
  }

  public componentWillReceiveProps(nextProps: ITreeProps) {
    if (nextProps.nodes !== this.props.nodes) {
      this.manager.setNodes(nextProps.nodes);
    }
    if (nextProps.expandedKeys !== this.props.expandedKeys) {
      this.setState({expandedKeys: nextProps.expandedKeys || []}, () =>
        this.manager.setExpandedKeys(this.state.expandedKeys)
      );
    }
    if (nextProps.checkedKeys !== this.props.checkedKeys) {
      this.setState({
        checkedKeys: this.manager.setCheckedKeys(
          nextProps.checkedKeys || [],
          true
        )
      });
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
    const {count} = this.state;
    const nodes = this.manager.getNodes();
    let start = Math.floor(this.tree.scrollTop / (nodeHeight || 24));
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
    let maxCount = Math.round((height || 0) / (nodeHeight || 24));
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

  public fCallback = (name: string, key: string) => () => {
    const callback = this.props[name];
    const data = this.state[key];
    if (typeof callback === 'function') {
      callback(data);
    }
  };

  public fExpand = (value: string | number, expanded: boolean) => {
    let keys = this.state.expandedKeys;
    if (expanded) {
      keys.push(value);
    } else {
      keys = keys.filter((k) => k !== value);
    }
    this.manager.setExpandedKeys(keys);
    this.setState(
      {expandedKeys: keys, count: this.fCount()},
      this.fCallback('onExpand', 'expandedKeys')
    );
  };

  public fRef = (name: string) => (node: HTMLDivElement) => {
    this[name] = node;
  };

  public fCheck = (value: ReactText, checked: boolean) => {
    this.manager.setCheckedKeys(value, checked);
    this.setState(
      {checkedKeys: this.manager.setCheckedKeys(value, checked)},
      this.fCallback('onCheck', 'checkedKeys')
    );
  };

  public fSelect = (value: ReactText) => {
    let selectedKeys = this.state.selectedKeys || [];
    const {multiple} = this.props;
    const exist = selectedKeys.some((s) => s === value);
    if (multiple) {
      if (exist) {
        selectedKeys = selectedKeys.filter((s) => s !== value);
      } else {
        selectedKeys.push(value);
      }
    } else {
      selectedKeys = exist ? [] : [value];
    }
    this.setState({selectedKeys}, this.fCallback('onSelect', 'selectedKeys'));
  };

  private getChecked = (node: ILabelValueType) => {
    const {defaultCheckedKeys} = this.props;
    if (!!node.disabled || !!node.disableCheckbox) {
      return (defaultCheckedKeys || []).some((c) => c === node.key);
    } else {
      return node[_checked_];
    }
  };

  public renderNodes = () => {
    const {children, nodeHeight, indentSize, prefixCls, checkable} = this.props;
    const {count, start, selectedKeys} = this.state;
    const nodes = this.manager.getNodes();
    if (nodes && nodes.length > 0) {
      const items = [];
      for (let i = start; i <= start + count; i++) {
        const n = nodes[i];
        if (n) {
          items.push(
            <TreeNode
              className={`${prefixCls}-node`}
              key={n.key}
              value={n.key}
              title={n.title}
              layer={n[layer]}
              height={nodeHeight}
              disabled={!!n.disabled}
              disableCheckbox={!!n.disableCheckbox}
              indentSize={indentSize}
              selectable={checkable}
              selected={(selectedKeys || []).some((s) => s === n.key)}
              checked={this.getChecked(n)}
              expanded={n[_expanded_]}
              expandedEnable={n[_expandedEnable_]}
              style={{top: i * (nodeHeight || 24)}}
              onExpand={this.fExpand}
              onCheck={this.fCheck}
              onSelect={this.fSelect}
            />
          );
        }
      }
      return items;
    }
    return children;
  };

  public renderChild = (params: IChildParams) => {
    const {prefixCls, nodeHeight, className} = this.props;
    const cls = classNames(prefixCls, className);
    const nodes = this.manager.getNodes();
    const yBarSize = scrollSize();
    const xBarSize = scrollSize('horizontal');
    return (
      <div
        className={cls}
        onScroll={this.fScroll}
        style={{
          width: params.width,
          height: params.height,
          marginRight: `-${yBarSize}px`,
          paddingRight: `${yBarSize}px`,
          marginBottom: `-${xBarSize}px`,
          paddingBottom: `${xBarSize}px`
        }}
        ref={this.fRef('tree')}
      >
        <div
          ref={this.fRef('content')}
          style={{
            minWidth: '100%',
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
