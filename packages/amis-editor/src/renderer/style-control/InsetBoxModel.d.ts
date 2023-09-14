/**
 * @file  InsetBoxModel
 * @description 盒模型控件，支持编辑 top、right、bottom、left
 */
import React from 'react';
import type {FormControlProps} from 'amis-core';
import type {PlainObject} from './types';
export type Direction = 'left' | 'right' | 'top' | 'bottom';
declare function InsetBoxModel({
  value,
  onChange
}: {
  value?: PlainObject;
  onChange: (value: PlainObject) => void;
}): React.JSX.Element;
declare const _default: typeof InsetBoxModel;
export default _default;
export declare class BoxModelRenderer extends React.Component<FormControlProps> {
  render(): React.JSX.Element;
}
