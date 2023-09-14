import {EditorNodeType} from 'amis-editor-core';
import {
  BasePlugin,
  BasicRendererInfo,
  RendererInfoResolveEventContext
} from 'amis-editor-core';
export declare class CardsPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  isListComponent: boolean;
  memberImmutable: boolean;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    columnsCount: number;
    card: {
      type: string;
      body: {
        type: string;
        body: (
          | {
              type: string;
              body: (
                | {
                    type: string;
                    icon: string;
                    vendor: string;
                    themeCss: {
                      className: {
                        'font': {
                          color: string;
                          fontSize: string;
                        };
                        'padding-and-margin:default': {
                          marginRight: string;
                        };
                      };
                    };
                    tpl?: undefined;
                    inline?: undefined;
                    wrapperComponent?: undefined;
                    editorSetting?: undefined;
                    style?: undefined;
                  }
                | {
                    type: string;
                    tpl: string;
                    inline: boolean;
                    wrapperComponent: string;
                    editorSetting: {
                      mock: {};
                    };
                    style: {
                      fontSize: string;
                      color: string;
                      fontWeight: string;
                    };
                    icon?: undefined;
                    vendor?: undefined;
                    themeCss?: undefined;
                  }
              )[];
              style: {
                position: string;
                display: string;
                flexWrap: string;
                alignItems: string;
                marginBottom: string;
                justifyContent?: undefined;
                marginTop?: undefined;
              };
              wrapperBody: boolean;
              isFixedHeight: boolean;
              isFixedWidth: boolean;
              size: string;
              className?: undefined;
              items?: undefined;
            }
          | {
              type: string;
              className: string;
              items: (
                | {
                    type: string;
                    body: (
                      | {
                          type: string;
                          body: (
                            | {
                                type: string;
                                tpl: string;
                                inline: boolean;
                                wrapperComponent: string;
                                style: {
                                  fontSize: string;
                                  color: string;
                                  fontWeight: string;
                                };
                              }
                            | {
                                type: string;
                                tpl: string;
                                inline: boolean;
                                wrapperComponent: string;
                                style: {
                                  color: string;
                                  fontSize: string;
                                  fontWeight?: undefined;
                                };
                              }
                          )[];
                          style: {
                            position: string;
                            display: string;
                            flex: string;
                            marginTop: string;
                            marginRight: string;
                            marginBottom: string;
                            marginLeft: string;
                            flexWrap?: undefined;
                            flexDirection?: undefined;
                            justifyContent?: undefined;
                            alignItems?: undefined;
                          };
                          wrapperBody: boolean;
                          isFixedWidth: boolean;
                          size: string;
                          isFixedHeight?: undefined;
                        }
                      | {
                          type: string;
                          body: {
                            type: string;
                            tpl: string;
                            inline: boolean;
                            wrapperComponent: string;
                            style: {
                              color: string;
                            };
                          }[];
                          style: {
                            position: string;
                            display: string;
                            flexWrap: string;
                            flexDirection: string;
                            justifyContent: string;
                            alignItems: string;
                            flex: string;
                            marginTop?: undefined;
                            marginRight?: undefined;
                            marginBottom?: undefined;
                            marginLeft?: undefined;
                          };
                          wrapperBody: boolean;
                          isFixedHeight: boolean;
                          isFixedWidth: boolean;
                          size: string;
                        }
                    )[];
                    size: string;
                    style: {
                      position: string;
                      display: string;
                      flex: string;
                      flexGrow: number;
                      flexBasis: string;
                      flexWrap: string;
                      flexDirection: string;
                      justifyContent: string;
                      alignItems: string;
                    };
                    wrapperBody: boolean;
                    isFixedHeight: boolean;
                    isFixedWidth: boolean;
                  }
                | {
                    type: string;
                    body: (
                      | {
                          type: string;
                          tpl: string;
                          inline: boolean;
                          wrapperComponent: string;
                          style: {
                            fontSize: string;
                            color: string;
                            fontWeight: string;
                          };
                        }
                      | {
                          type: string;
                          tpl: string;
                          inline: boolean;
                          wrapperComponent: string;
                          style: {
                            color: string;
                            fontSize?: undefined;
                            fontWeight?: undefined;
                          };
                        }
                    )[];
                    size: string;
                    style: {
                      position: string;
                      display: string;
                      flex: string;
                      flexGrow: number;
                      flexBasis: string;
                      flexWrap: string;
                      flexDirection: string;
                      justifyContent: string;
                      alignItems: string;
                    };
                    wrapperBody: boolean;
                    isFixedHeight: boolean;
                    isFixedWidth: boolean;
                  }
              )[];
              style: {
                position: string;
                display?: undefined;
                flexWrap?: undefined;
                alignItems?: undefined;
                marginBottom?: undefined;
                justifyContent?: undefined;
                marginTop?: undefined;
              };
              body?: undefined;
              wrapperBody?: undefined;
              isFixedHeight?: undefined;
              isFixedWidth?: undefined;
              size?: undefined;
            }
          | {
              type: string;
              body: {
                type: string;
                tpl: string;
                inline: boolean;
                wrapperComponent: string;
                style: {
                  fontSize: string;
                  color: string;
                };
              }[];
              style: {
                position: string;
                display: string;
                flexWrap: string;
                justifyContent: string;
                marginTop: string;
                alignItems?: undefined;
                marginBottom?: undefined;
              };
              wrapperBody: boolean;
              isFixedHeight: boolean;
              isFixedWidth: boolean;
              size?: undefined;
              className?: undefined;
              items?: undefined;
            }
        )[];
        size: string;
        style: {
          'position': string;
          'display': string;
          'paddingTop': string;
          'paddingRight': string;
          'paddingBottom': string;
          'paddingLeft': string;
          'radius': {
            'top-left-border-radius': string;
            'top-right-border-radius': string;
            'bottom-left-border-radius': string;
            'bottom-right-border-radius': string;
          };
          'top-border-width': string;
          'left-border-width': string;
          'right-border-width': string;
          'bottom-border-width': string;
          'top-border-style': string;
          'left-border-style': string;
          'right-border-style': string;
          'bottom-border-style': string;
          'top-border-color': string;
          'left-border-color': string;
          'right-border-color': string;
          'bottom-border-color': string;
          'flex': string;
          'marginRight': string;
          'flexBasis': string;
        };
        wrapperBody: boolean;
        isFixedHeight: boolean;
        isFixedWidth: boolean;
        onEvent: {
          click: {
            weight: number;
            actions: never[];
          };
        };
      }[];
      style: {
        position: string;
        display: string;
        width: string;
        margin: string;
        flexWrap: string;
        justifyContent: string;
      };
      isFixedHeight: boolean;
      isFixedWidth: boolean;
      wrapperBody: boolean;
    };
    placeholder: string;
    name: string;
    style: {
      gutterX: number;
      gutterY: number;
    };
  };
  previewSchema: {
    className: string;
    type: string;
    columnsCount: number;
    card: {
      type: string;
      body: {
        type: string;
        body: (
          | {
              type: string;
              body: (
                | {
                    type: string;
                    icon: string;
                    vendor: string;
                    themeCss: {
                      className: {
                        'font': {
                          color: string;
                          fontSize: string;
                        };
                        'padding-and-margin:default': {
                          marginRight: string;
                        };
                      };
                    };
                    tpl?: undefined;
                    inline?: undefined;
                    wrapperComponent?: undefined;
                    editorSetting?: undefined;
                    style?: undefined;
                  }
                | {
                    type: string;
                    tpl: string;
                    inline: boolean;
                    wrapperComponent: string;
                    editorSetting: {
                      mock: {};
                    };
                    style: {
                      fontSize: string;
                      color: string;
                      fontWeight: string;
                    };
                    icon?: undefined;
                    vendor?: undefined;
                    themeCss?: undefined;
                  }
              )[];
              style: {
                position: string;
                display: string;
                flexWrap: string;
                alignItems: string;
                marginBottom: string;
                justifyContent?: undefined;
                marginTop?: undefined;
              };
              wrapperBody: boolean;
              isFixedHeight: boolean;
              isFixedWidth: boolean;
              size: string;
              className?: undefined;
              items?: undefined;
            }
          | {
              type: string;
              className: string;
              items: (
                | {
                    type: string;
                    body: (
                      | {
                          type: string;
                          body: (
                            | {
                                type: string;
                                tpl: string;
                                inline: boolean;
                                wrapperComponent: string;
                                style: {
                                  fontSize: string;
                                  color: string;
                                  fontWeight: string;
                                };
                              }
                            | {
                                type: string;
                                tpl: string;
                                inline: boolean;
                                wrapperComponent: string;
                                style: {
                                  color: string;
                                  fontSize: string;
                                  fontWeight?: undefined;
                                };
                              }
                          )[];
                          style: {
                            position: string;
                            display: string;
                            flex: string;
                            marginTop: string;
                            marginRight: string;
                            marginBottom: string;
                            marginLeft: string;
                            flexWrap?: undefined;
                            flexDirection?: undefined;
                            justifyContent?: undefined;
                            alignItems?: undefined;
                          };
                          wrapperBody: boolean;
                          isFixedWidth: boolean;
                          size: string;
                          isFixedHeight?: undefined;
                        }
                      | {
                          type: string;
                          body: {
                            type: string;
                            tpl: string;
                            inline: boolean;
                            wrapperComponent: string;
                            style: {
                              color: string;
                            };
                          }[];
                          style: {
                            position: string;
                            display: string;
                            flexWrap: string;
                            flexDirection: string;
                            justifyContent: string;
                            alignItems: string;
                            flex: string;
                            marginTop?: undefined;
                            marginRight?: undefined;
                            marginBottom?: undefined;
                            marginLeft?: undefined;
                          };
                          wrapperBody: boolean;
                          isFixedHeight: boolean;
                          isFixedWidth: boolean;
                          size: string;
                        }
                    )[];
                    size: string;
                    style: {
                      position: string;
                      display: string;
                      flex: string;
                      flexGrow: number;
                      flexBasis: string;
                      flexWrap: string;
                      flexDirection: string;
                      justifyContent: string;
                      alignItems: string;
                    };
                    wrapperBody: boolean;
                    isFixedHeight: boolean;
                    isFixedWidth: boolean;
                  }
                | {
                    type: string;
                    body: (
                      | {
                          type: string;
                          tpl: string;
                          inline: boolean;
                          wrapperComponent: string;
                          style: {
                            fontSize: string;
                            color: string;
                            fontWeight: string;
                          };
                        }
                      | {
                          type: string;
                          tpl: string;
                          inline: boolean;
                          wrapperComponent: string;
                          style: {
                            color: string;
                            fontSize?: undefined;
                            fontWeight?: undefined;
                          };
                        }
                    )[];
                    size: string;
                    style: {
                      position: string;
                      display: string;
                      flex: string;
                      flexGrow: number;
                      flexBasis: string;
                      flexWrap: string;
                      flexDirection: string;
                      justifyContent: string;
                      alignItems: string;
                    };
                    wrapperBody: boolean;
                    isFixedHeight: boolean;
                    isFixedWidth: boolean;
                  }
              )[];
              style: {
                position: string;
                display?: undefined;
                flexWrap?: undefined;
                alignItems?: undefined;
                marginBottom?: undefined;
                justifyContent?: undefined;
                marginTop?: undefined;
              };
              body?: undefined;
              wrapperBody?: undefined;
              isFixedHeight?: undefined;
              isFixedWidth?: undefined;
              size?: undefined;
            }
          | {
              type: string;
              body: {
                type: string;
                tpl: string;
                inline: boolean;
                wrapperComponent: string;
                style: {
                  fontSize: string;
                  color: string;
                };
              }[];
              style: {
                position: string;
                display: string;
                flexWrap: string;
                justifyContent: string;
                marginTop: string;
                alignItems?: undefined;
                marginBottom?: undefined;
              };
              wrapperBody: boolean;
              isFixedHeight: boolean;
              isFixedWidth: boolean;
              size?: undefined;
              className?: undefined;
              items?: undefined;
            }
        )[];
        size: string;
        style: {
          'position': string;
          'display': string;
          'paddingTop': string;
          'paddingRight': string;
          'paddingBottom': string;
          'paddingLeft': string;
          'radius': {
            'top-left-border-radius': string;
            'top-right-border-radius': string;
            'bottom-left-border-radius': string;
            'bottom-right-border-radius': string;
          };
          'top-border-width': string;
          'left-border-width': string;
          'right-border-width': string;
          'bottom-border-width': string;
          'top-border-style': string;
          'left-border-style': string;
          'right-border-style': string;
          'bottom-border-style': string;
          'top-border-color': string;
          'left-border-color': string;
          'right-border-color': string;
          'bottom-border-color': string;
          'flex': string;
          'marginRight': string;
          'flexBasis': string;
        };
        wrapperBody: boolean;
        isFixedHeight: boolean;
        isFixedWidth: boolean;
        onEvent: {
          click: {
            weight: number;
            actions: never[];
          };
        };
      }[];
      style: {
        position: string;
        display: string;
        width: string;
        margin: string;
        flexWrap: string;
        justifyContent: string;
      };
      isFixedHeight: boolean;
      isFixedWidth: boolean;
      wrapperBody: boolean;
    };
    placeholder: string;
    name: string;
    style: {
      gutterX: number;
      gutterY: number;
    };
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
  buildDataSchemas(node: EditorNodeType, region: EditorNodeType): any;
  filterProps(props: any): any;
  getRendererInfo(
    context: RendererInfoResolveEventContext
  ): BasicRendererInfo | void;
}
