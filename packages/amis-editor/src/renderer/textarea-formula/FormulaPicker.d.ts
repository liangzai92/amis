import React from 'react';
export interface FormulaPickerProps {
  onConfirm: (data: string) => void;
  onClose: () => void;
  variables: any[];
  value?: string;
  initable?: boolean;
  variableMode?: 'tabs' | 'tree';
  evalMode?: boolean;
  /**
   * 弹窗顶部标题，默认为 "表达式"
   */
  header: string;
}
export interface CustomFormulaPickerProps extends FormulaPickerProps {
  [propName: string]: any;
}
declare const FormulaPicker: React.FC<FormulaPickerProps>;
export default FormulaPicker;
