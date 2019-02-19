import React from 'react';
import classNames from 'classnames';
// @ts-ignore
import Checkbox from 'frc-checkbox';
import {renderNode} from './PropsType';

export interface ITreeNodeProps {
  className?: string;
  value: string | number;
  title: string | renderNode;
  layer: number;
  indentSize?: number;
  height?: number;
  icon?: renderNode | Function;
  selectable?: boolean;
  expanded?: boolean;
  expandedEnable: boolean;
  style?: Object;
  onExpand?: Function;
  onSelect?: Function;
  onCheck?: Function;
  checked?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selected?: boolean;
  showIcon?: boolean;
}

class TreeNode extends React.Component<ITreeNodeProps> {
  public static defaultProps = {
    height: 30,
    indentSize: 17,
    selectable: false,
    expanded: false,
    expandedEnable: false,
    onExpand: () => {},
    onSelect: () => {},
    onCheck: () => {},
    checked: false,
    disabled: false,
    disableCheckbox: false,
    selected: false,
    showIcon: false
  };

  fClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const {value, onExpand, expanded} = this.props;
    event.stopPropagation();
    if (typeof onExpand === 'function') {
      onExpand(value, !expanded);
    }
  };

  fChange = (checked: boolean) => {
    const {value, onCheck} = this.props;
    if (typeof onCheck === 'function') {
      onCheck(value, checked);
    }
  };

  fSelect = () => {
    const {value, onSelect, disabled} = this.props;
    if (typeof onSelect === 'function' && !disabled) {
      onSelect(value);
    }
  };

  renderSelect = () => {
    const {selectable, checked, disabled, disableCheckbox} = this.props;
    if (selectable) {
      return (
        <Checkbox
          className='frc-tree-checkbox'
          style={{height: 24}}
          onChange={this.fChange}
          checked={checked}
          disabled={disableCheckbox || disabled}
        />
      );
    }
    return null;
  };

  renderIcon = () => {
    const {className, showIcon} = this.props;
    if (showIcon) {
      return null;
    } else {
      return (
        <span className={`${className}-icon`} onClick={this.fClick}>
          <svg
            viewBox='0 0 1024 1024'
            width='10px'
            height='10px'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z' />
          </svg>
        </span>
      );
    }
  };

  renderTitle = () => {
    const {title, className, selected, disabled} = this.props;
    const cls = classNames(`${className}-title`, {
      [`${className}-selected`]: selected,
      [`${className}-disabled`]: disabled
    });
    return (
      <span className={cls} onClick={this.fSelect}>
        {title}
      </span>
    );
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
      [`${className}-expand-right`]: !expanded,
      [`${className}-expand-down`]: expanded,
      [`${className}-expand-enable`]: expandedEnable,
      [`${className}-expand-space`]: !expandedEnable
    });
    return (
      <div
        className={cls}
        style={{height, paddingLeft: (indentSize || 0) * layer, ...style}}
      >
        {this.renderIcon()}
        {this.renderSelect()}
        {this.renderTitle()}
      </div>
    );
  }
}

export default TreeNode;
