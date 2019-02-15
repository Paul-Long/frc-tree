import {ReactNode} from 'react';

export interface ILabelValueType {
  key: string | number;
  label: ReactNode | string;
  children?: ILabelValueType[];
  layer: number;
}

export type valueType =
  | number
  | number[]
  | string
  | string[]
  | ILabelValueType
  | ILabelValueType[];

export type renderNode = ReactNode;

export const currentKey = Symbol('__current__');
