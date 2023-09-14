/// <reference types="lodash" />
import {FormControlProps, RendererProps} from 'amis-core';
import React from 'react';
import {EditorManager, EditorNodeType} from 'amis-editor-core';
import type {SchemaCollection} from 'amis';
import type {DSField, DSFieldGroup} from '../builder';
export interface DataBindingProps extends FormControlProps {
  node: EditorNodeType;
  manager: EditorManager;
  onBindingChange?: (
    value: DSField,
    onBulkChange: (value: any) => void
  ) => void;
}
export interface DataBindingState {
  loading: boolean;
  hint: string | void;
  schema?: SchemaCollection;
}
export interface DataBindingPanelProps extends RendererProps {
  onSelect: (value: any) => void;
  isSelected?: (value: any) => boolean;
}
export declare class DataBindingControl extends React.Component<
  DataBindingProps,
  DataBindingState
> {
  constructor(props: DataBindingProps);
  handleConfirm(result: DSField): void;
  handlePickerOpen(): Promise<void>;
  render(): React.JSX.Element;
}
export declare class DataBindingControlRenderer extends DataBindingControl {}
export interface SimpleDataBindingProps extends DataBindingPanelProps {
  fields: DSFieldGroup[];
}
export interface SimpleDataBindingState {
  filteredFields: DSFieldGroup[];
}
export declare class SimpleDataBindingControl extends React.Component<
  SimpleDataBindingProps,
  SimpleDataBindingState
> {
  constructor(props: SimpleDataBindingProps);
  handleSearchDebounced: import('lodash').DebouncedFunc<
    (keywords: string) => Promise<void>
  >;
  handleSearch(keywords: string): Promise<void>;
  handleSelect(): void;
  render(): React.JSX.Element;
}
export declare class SimpleDataBindingControlRenderer extends SimpleDataBindingControl {}
