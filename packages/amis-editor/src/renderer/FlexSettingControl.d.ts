/**
 * @file icon按钮组
 */
import React from 'react';
import {FormControlProps} from 'amis';
interface PlainObject {
  [propsName: string]: any;
}
interface FlexSettingControlProps extends FormControlProps {
  onChange: (value: PlainObject) => void;
  value?: PlainObject;
}
export default class FlexSettingControl extends React.Component<FlexSettingControlProps> {
  constructor(props: any);
  setField(field: string): (val: string) => void;
  render(): React.JSX.Element;
}
export declare class FlexSettingControlRenderer extends FlexSettingControl {}
export {};
