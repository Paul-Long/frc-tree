import React from 'react';
import {renderNode} from './PropsType';

export interface ITreeNodeProps {
  className?: string;
  value: string | number;
  label: string | renderNode;
  layer: number;
  indentSize?: number;
  height?: number;
}

class TreeNode extends React.Component<ITreeNodeProps> {
  public static defaultProps = {
    height: 20,
    indentSize: 17
  };

  render() {
    const {label, height, indentSize, layer, className} = this.props;
    return (
      <div
        className={className}
        style={{height, paddingLeft: (indentSize || 0) * layer}}
      >
        {label}
      </div>
    );
  }
}

export default TreeNode;
