import React from 'react';
import {renderNode} from './PropsType';

export interface ITreeNodeProps {
  className?: string;
  value: string | number;
  label: string | renderNode;
  layer: number;
  indentSize?: number;
}

class TreeNode extends React.Component<ITreeNodeProps> {
  render() {
    return <div />;
  }
}

export default TreeNode;
