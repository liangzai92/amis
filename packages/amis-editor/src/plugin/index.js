"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRegionPlugin = void 0;
var tslib_1 = require("tslib");
// 布局容器
tslib_1.__exportStar(require("./Flex"), exports); // flex布局
tslib_1.__exportStar(require("./Grid"), exports); // 分栏
tslib_1.__exportStar(require("./Container"), exports); // 容器
tslib_1.__exportStar(require("./Layout/Layout_free_container"), exports); // 自由容器
tslib_1.__exportStar(require("./Layout/Layout_sorption_container"), exports); // 吸附容器
tslib_1.__exportStar(require("./Layout/Layout_fixed"), exports); // 悬浮容器
// export * from './Layout/Layout1_2_v4';
tslib_1.__exportStar(require("./CollapseGroup"), exports); // 折叠面板
tslib_1.__exportStar(require("./Panel"), exports); // 面板
tslib_1.__exportStar(require("./Tabs"), exports); // 选项卡
// 数据容器
tslib_1.__exportStar(require("./CRUD"), exports); // 增删改查
tslib_1.__exportStar(require("./CRUD2/CRUDTable"), exports); // 增删改查v2.0
tslib_1.__exportStar(require("./Form/Form"), exports); // 表单
tslib_1.__exportStar(require("./Service"), exports); // 服务service
// 表单项
tslib_1.__exportStar(require("./Form/InputText"), exports); // 文本框
tslib_1.__exportStar(require("./Form/Textarea"), exports); // 多行文本框
tslib_1.__exportStar(require("./Form/InputNumber"), exports); // 数字框
tslib_1.__exportStar(require("./Form/Select"), exports); // 下拉框
tslib_1.__exportStar(require("./Form/NestedSelect"), exports); // 级联选择器
tslib_1.__exportStar(require("./Form/ChainedSelect"), exports); // 链式下拉框
tslib_1.__exportStar(require("./DropDownButton"), exports); // 下拉按钮
tslib_1.__exportStar(require("./Form/Checkboxes"), exports); // 复选框
tslib_1.__exportStar(require("./Form/Radios"), exports); // 单选框
tslib_1.__exportStar(require("./Form/Checkbox"), exports); // 勾选框
tslib_1.__exportStar(require("./Form/InputDate"), exports); // 日期
tslib_1.__exportStar(require("./Form/InputDateRange"), exports); // 日期范围
tslib_1.__exportStar(require("./Form/InputFile"), exports); // 文件上传
tslib_1.__exportStar(require("./Form/InputImage"), exports); // 图片上传
tslib_1.__exportStar(require("./Form/InputExcel"), exports); // 上传 Excel
tslib_1.__exportStar(require("./Form/InputTree"), exports); // 树选择器
tslib_1.__exportStar(require("./Form/InputTag"), exports); // 标签选择器
tslib_1.__exportStar(require("./Form/ListSelect"), exports); // 列表选择
tslib_1.__exportStar(require("./Form/ButtonGroupSelect"), exports); // 按钮点选
tslib_1.__exportStar(require("./Form/ButtonToolbar"), exports); // 按钮工具栏
tslib_1.__exportStar(require("./Form/Picker"), exports); // 列表选取
tslib_1.__exportStar(require("./Form/Switch"), exports); // 开关
tslib_1.__exportStar(require("./Form/InputRange"), exports); // 滑块
tslib_1.__exportStar(require("./Form/InputRating"), exports); // 评分
tslib_1.__exportStar(require("./Form/InputCity"), exports); // 城市选择
tslib_1.__exportStar(require("./Form/Transfer"), exports); // 穿梭器
tslib_1.__exportStar(require("./Form/TabsTransfer"), exports); // 组合穿梭器
tslib_1.__exportStar(require("./Form/InputColor"), exports); // 颜色框
tslib_1.__exportStar(require("./Form/ConditionBuilder"), exports); // 条件组合
tslib_1.__exportStar(require("./Form/FieldSet"), exports); // 字段集
tslib_1.__exportStar(require("./Form/Combo"), exports); // 组合输入
tslib_1.__exportStar(require("./Form/InputGroup"), exports); // 输入组合
tslib_1.__exportStar(require("./Form/InputTable"), exports); // 表格编辑器
tslib_1.__exportStar(require("./Form/MatrixCheckboxes"), exports); // 矩阵开关
tslib_1.__exportStar(require("./Form/InputRichText"), exports); // 富文本编辑器
tslib_1.__exportStar(require("./Form/DiffEditor"), exports); // diff编辑器
tslib_1.__exportStar(require("./Form/CodeEditor"), exports); // 代码编辑器
tslib_1.__exportStar(require("./SearchBox"), exports); // 搜索框
tslib_1.__exportStar(require("./Form/InputKV"), exports); // KV键值对
tslib_1.__exportStar(require("./Form/InputRepeat"), exports); // 重复周期
tslib_1.__exportStar(require("./Form/UUID"), exports); // UUID
tslib_1.__exportStar(require("./Form/LocationPicker"), exports); // 地理位置
tslib_1.__exportStar(require("./Form/InputSubForm"), exports); // 子表单项
tslib_1.__exportStar(require("./Form/Hidden"), exports); // 隐藏域
// 功能
tslib_1.__exportStar(require("./Button"), exports); // 按钮
tslib_1.__exportStar(require("./ButtonGroup"), exports); // 按钮组
tslib_1.__exportStar(require("./Nav"), exports); // 导航
tslib_1.__exportStar(require("./AnchorNav"), exports); // 锚点导航
tslib_1.__exportStar(require("./TooltipWrapper"), exports); // 文字提示
tslib_1.__exportStar(require("./Alert"), exports); // 提示
tslib_1.__exportStar(require("./Wizard"), exports); // 向导
tslib_1.__exportStar(require("./TableView"), exports); // 表格视图
tslib_1.__exportStar(require("./WebComponent"), exports);
tslib_1.__exportStar(require("./Audio"), exports); // 音频
tslib_1.__exportStar(require("./Video"), exports); // 视频
tslib_1.__exportStar(require("./Custom"), exports); // 自定义代码
tslib_1.__exportStar(require("./Tasks"), exports); // 异步任务
tslib_1.__exportStar(require("./Each"), exports); // 循环
tslib_1.__exportStar(require("./Property"), exports); // 属性表
tslib_1.__exportStar(require("./IFrame"), exports);
tslib_1.__exportStar(require("./QRCode"), exports); // 二维码
// 展示
tslib_1.__exportStar(require("./Tpl"), exports); // 文字
tslib_1.__exportStar(require("./Icon"), exports); // 图标
tslib_1.__exportStar(require("./Link"), exports); // 链接
tslib_1.__exportStar(require("./List"), exports); // 列表
tslib_1.__exportStar(require("./List2"), exports); // 列表
tslib_1.__exportStar(require("./Mapping"), exports); // 映射
tslib_1.__exportStar(require("./Avatar"), exports); // 头像
tslib_1.__exportStar(require("./Card"), exports); // 卡片
tslib_1.__exportStar(require("./Card2"), exports);
tslib_1.__exportStar(require("./Cards"), exports); // 卡片列表
tslib_1.__exportStar(require("./Table"), exports); // 表格
tslib_1.__exportStar(require("./Table2"), exports);
tslib_1.__exportStar(require("./TableCell2"), exports); // 列配置
tslib_1.__exportStar(require("./Chart"), exports); // 图表
tslib_1.__exportStar(require("./Sparkline"), exports); // 走势图
tslib_1.__exportStar(require("./Carousel"), exports); // 轮播图
tslib_1.__exportStar(require("./Image"), exports); // 图片展示
tslib_1.__exportStar(require("./Images"), exports); // 图片集
tslib_1.__exportStar(require("./Time"), exports); // 时间展示
tslib_1.__exportStar(require("./Date"), exports); // 日期展示
tslib_1.__exportStar(require("./Datetime"), exports); // 日期时间展示
tslib_1.__exportStar(require("./Tag"), exports); // 标签
tslib_1.__exportStar(require("./Json"), exports); // JSON展示
tslib_1.__exportStar(require("./Progress"), exports); // 进度展示
tslib_1.__exportStar(require("./Status"), exports); // 状态展示
tslib_1.__exportStar(require("./Steps"), exports); // 步骤条
tslib_1.__exportStar(require("./Timeline"), exports); // 时间轴
tslib_1.__exportStar(require("./Divider"), exports); // 分隔线
tslib_1.__exportStar(require("./CodeView"), exports); // 代码高亮
tslib_1.__exportStar(require("./Markdown"), exports);
tslib_1.__exportStar(require("./Collapse"), exports); // 折叠器
tslib_1.__exportStar(require("./OfficeViewer"), exports); // 文档预览
tslib_1.__exportStar(require("./Log"), exports); // 日志
// 其他
tslib_1.__exportStar(require("./Others/Action"), exports);
tslib_1.__exportStar(require("./Others/TableCell"), exports);
tslib_1.__exportStar(require("./Form/InputArray"), exports);
tslib_1.__exportStar(require("./Form/ConditionBuilder"), exports);
tslib_1.__exportStar(require("./Form/Control"), exports);
tslib_1.__exportStar(require("./Form/InputDateTime"), exports);
tslib_1.__exportStar(require("./Form/InputDateTimeRange"), exports);
tslib_1.__exportStar(require("./Form/InputEmail"), exports);
tslib_1.__exportStar(require("./Form/Formula"), exports);
tslib_1.__exportStar(require("./Form/Group"), exports);
tslib_1.__exportStar(require("./Form/Item"), exports);
tslib_1.__exportStar(require("./Form/InputMonth"), exports);
tslib_1.__exportStar(require("./Form/InputMonthRange"), exports);
tslib_1.__exportStar(require("./Form/InputPassword"), exports);
tslib_1.__exportStar(require("./Form/InputQuarter"), exports);
tslib_1.__exportStar(require("./Form/InputQuarterRange"), exports);
tslib_1.__exportStar(require("./Form/Static"), exports);
tslib_1.__exportStar(require("./Form/InputTime"), exports);
tslib_1.__exportStar(require("./Form/InputTimeRange"), exports);
tslib_1.__exportStar(require("./Form/TreeSelect"), exports);
tslib_1.__exportStar(require("./Form/InputURL"), exports);
tslib_1.__exportStar(require("./Form/InputYear"), exports);
tslib_1.__exportStar(require("./Form/InputYearRange"), exports);
tslib_1.__exportStar(require("./Breadcrumb"), exports);
var CustomRegion_1 = require("./CustomRegion");
Object.defineProperty(exports, "CustomRegionPlugin", { enumerable: true, get: function () { return CustomRegion_1.CustomPlugin; } });
tslib_1.__exportStar(require("./Dialog"), exports);
tslib_1.__exportStar(require("./Drawer"), exports);
tslib_1.__exportStar(require("./HBox"), exports);
tslib_1.__exportStar(require("./ListItem"), exports);
tslib_1.__exportStar(require("./Operation"), exports);
tslib_1.__exportStar(require("./Page"), exports);
tslib_1.__exportStar(require("./Pagination"), exports);
tslib_1.__exportStar(require("./Plain"), exports);
tslib_1.__exportStar(require("./Reset"), exports);
tslib_1.__exportStar(require("./Submit"), exports);
tslib_1.__exportStar(require("./Wrapper"), exports);
tslib_1.__exportStar(require("./ColumnToggler"), exports);
