/**
 * @file mapping 映射源配置
 */
/// <reference types="lodash" />
import React from 'react';
import {FormControlProps} from 'amis-core';
import type {SchemaApi} from 'amis';
declare enum MapType {
  CUSTOM = 'custom',
  API = 'api',
  VARIABLE = 'variable'
}
export interface MapSourceControlProps extends FormControlProps {
  className?: string;
}
export interface MapSourceControlState {
  map: Object | Array<Object>;
  source: SchemaApi;
  labelField?: string;
  valueField?: string;
  mapType: MapType;
}
export default class MapSourceControl extends React.Component<
  MapSourceControlProps,
  MapSourceControlState
> {
  $comp: string;
  constructor(props: MapSourceControlProps);
  componentDidUpdate(
    prevProps: Readonly<MapSourceControlProps>,
    prevState: Readonly<MapSourceControlState>,
    snapshot?: any
  ): void;
  /**
   * 更新map字段的统一出口
   */
  onChange(): void;
  /**
   * 切换选项类型
   */
  handleMapTypeChange(mapType: MapType): void;
  renderHeader(): React.JSX.Element;
  handleMapChange(map: any): void;
  handleAPIChange(source: SchemaApi): void;
  handleLabelFieldChange(labelField: string): void;
  handleValueFieldChange(valueField: string): void;
  renderOtherFields(): (
    | {
        label: any;
        type: string;
        name: string;
        placeholder: string;
        onChange: (valueField: string) => void;
        visibleOn?: undefined;
      }
    | {
        label: any;
        type: string;
        name: string;
        placeholder: string;
        onChange: (labelField: string) => void;
        visibleOn: string;
      }
  )[];
  renderApiPanel(): any;
  renderObjectMap(): any;
  handleMapItemChange(index: number, item: any): void;
  renderArrayMap(): React.JSX.Element;
  debounceMapChange: import('lodash').DebouncedFunc<(map: any) => void>;
  renderMap(): any;
  render(): React.JSX.Element;
}
export declare class MapSourceControlRenderer extends MapSourceControl {}
export {};
