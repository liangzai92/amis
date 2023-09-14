/**
 * @file icon按钮组
 */
import React from 'react';
import {FormControlProps} from 'amis';
export interface ButtonGroupControlProps extends FormControlProps {
  options?: Array<{
    label: string;
    iconFont?: string;
    icon: string;
    value: string;
    iconClassName?: string;
  }>;
  onChange: (value: string | number) => void;
  value?: string | number;
}
export default class ButtonGroupControl extends React.Component<ButtonGroupControlProps> {
  constructor(props: any);
  render(): React.JSX.Element;
}
export declare class ButtonGroupControlRenderer extends ButtonGroupControl {}
