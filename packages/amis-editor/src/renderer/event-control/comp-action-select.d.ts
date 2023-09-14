/**
 * 组件专有动作选择器
 */
import {Option} from 'amis';
import {RendererProps} from 'amis-core';
import React from 'react';
export declare const BASE_ACTION_PROPS: string[];
export default class CmptActionSelect extends React.Component<RendererProps> {
  onChange(option: Option): void;
  render(): React.JSX.Element;
}
