/**
 * @file 扩展 codemirror
 */
import {TextareaFormulaControlProps} from './TextareaFormulaControl';
import type {CodeMirror} from 'amis-ui';
export declare function editorFactory(
  dom: HTMLElement,
  cm: typeof CodeMirror,
  value: string,
  config?: Object
): any;
interface FormulaPluginConfig {
  getProps: () => TextareaFormulaControlProps;
  onExpressionMouseEnter?: (
    e: MouseEvent,
    expression: string,
    brace?: Array<CodeMirror.Position>
  ) => any;
  customMarkText?: (editor: CodeMirror.Editor) => void;
  onPluginInit?: (plugin: FormulaPlugin) => void;
  showPopover?: boolean;
  showClearIcon?: boolean;
}
export declare class FormulaPlugin {
  readonly editor: CodeMirror.Editor;
  config: FormulaPluginConfig;
  constructor(editor: CodeMirror.Editor, config: FormulaPluginConfig);
  autoMark(): void;
  getExpressionBrace(expression: string):
    | {
        line: number;
        ch: number;
      }[]
    | undefined;
  computedBracesPosition(exp: string): {
    begin: number;
    end: number;
  }[];
  checkStrIsInBraces(
    [from, to]: number[],
    braces: {
      begin: number;
      end: number;
    }[]
  ): boolean;
  insertBraces(
    originFrom: CodeMirror.Position,
    originTo: CodeMirror.Position
  ): void;
  setValue(value: string): void;
  getCorsur(): any;
  insertContent(
    content: string,
    type?: 'expression' | 'string',
    brace?: Array<CodeMirror.Position>
  ): void;
  markExpression(
    from: CodeMirror.Position,
    to: CodeMirror.Position,
    expression?: string,
    className?: string
  ): void;
  focus(value: string): void;
  dispose(): void;
  validate(): void;
}
export {};
