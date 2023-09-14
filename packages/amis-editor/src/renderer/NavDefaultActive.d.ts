/**
 * @file 角标控件
 */
import React from 'react';
import type {FormControlProps} from 'amis-core';
export interface BadgeControlProps extends FormControlProps {}
interface BadgeControlState {}
export default class NavDefaultActiveControl extends React.Component<
  BadgeControlProps,
  BadgeControlState
> {
  activeKey: string;
  constructor(props: BadgeControlProps);
  deleteActive(data: any): void;
  findActiveKey(data: any, index?: string): void;
  render(): any;
}
export declare class NavDefaultActive extends NavDefaultActiveControl {}
export {};
