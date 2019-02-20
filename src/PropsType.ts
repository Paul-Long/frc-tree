import {ReactNode} from 'react';

export interface ILabelValueType {
  key: string | number;
  title: ReactNode | string;
  children?: ILabelValueType[];
  layer: number;
  disabled: boolean;
  disableCheckbox: boolean;
}

export type valueType =
  | number
  | number[]
  | string
  | string[]
  | ILabelValueType
  | ILabelValueType[];

export type renderNode = ReactNode;

export const layer = Symbol('__layer__');
export const _expanded_ = Symbol('__expanded__');
export const _expandedEnable_ = Symbol('__expandedEnable__');
export const _checked_ = Symbol('__checked__');
