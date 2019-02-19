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
export const expanded = Symbol('__expanded__');
export const expandedEnable = Symbol('__expandedEnable__');
