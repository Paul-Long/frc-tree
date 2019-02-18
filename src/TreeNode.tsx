import React from 'react';
import classNames from 'classnames';
// @ts-ignore
import Checkbox from 'frc-checkbox';
import {renderNode} from './PropsType';

export interface ITreeNodeProps {
  className?: string;
  value: string | number;
  label: string | renderNode;
  layer: number;
  indentSize?: number;
  height?: number;
  icon?: renderNode | Function;
  selectable?: boolean;
  expanded?: boolean;
  expandedEnable: boolean;
  style?: Object;
}

class TreeNode extends React.Component<ITreeNodeProps> {
  public static defaultProps = {
    height: 30,
    indentSize: 17,
    selectable: false,
    expanded: false,
    expandedEnable: false
  };

  renderSelect = () => {
    const {selectable, label} = this.props;
    if (selectable) {
      return (
        <Checkbox
          className='frc-tree-checkbox'
          style={{width: '100%', height: 24}}
        >
          {label}
        </Checkbox>
      );
    }
    return label;
  };

  renderIcon = () => {
    return <div />;
  };

  render() {
    const {
      height,
      indentSize,
      layer,
      className,
      expanded,
      expandedEnable,
      style
    } = this.props;
    const cls = classNames(className, {
      [`${className}-expand`]: expanded,
      [`${className}-expand-enable`]: expandedEnable
    });
    return (
      <div
        className={cls}
        style={{height, paddingLeft: (indentSize || 0) * layer, ...style}}
      >
        {this.renderSelect()}
      </div>
    );
  }
}

export default TreeNode;
