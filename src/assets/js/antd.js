import Vue from "vue";
import "../css/antd.less";
import {
	Icon,
	Button,
	Layout,
	Input,
	FormModel,
	Menu,
	Dropdown,
	Table,
	Breadcrumb,
	Tag,
	Pagination,
	Checkbox,
	ConfigProvider,
	Drawer,
	Spin,
	Select,
	DatePicker,
	Divider,
	InputNumber,
	Radio,
	Upload,
	Cascader,
	Card,
	Switch,
	Empty,
	Avatar,
	Modal,
	Tree,
	Steps,
	Timeline,
	List,
	Popover,
	Alert,
	Tooltip,
	PageHeader,
	Popconfirm,
	Form,
	Row,
	Col,
	TreeSelect,
	Tabs,
	Badge,
	Progress,
	Result
} from "ant-design-vue";

// 全局注册iconfont
const IconFont = Icon.createFromIconfontCN({
	// 在 iconfont.cn 上生成
	scriptUrl: "//at.alicdn.com/t/font_3250238_zsoy6sfjmv9.js",
});
Vue.component("CIcon", IconFont);

Vue.use(Icon);
Vue.use(Button);
Vue.use(Layout);
Vue.use(FormModel);
Vue.use(Input);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(Table);
Vue.use(Breadcrumb);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Checkbox);
Vue.use(ConfigProvider);
Vue.use(Drawer);
Vue.use(Spin);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Divider);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(Upload);
Vue.use(Cascader);
Vue.use(Card);
Vue.use(Switch);
Vue.use(Empty);
Vue.use(Avatar);
Vue.use(Modal);
Vue.use(Tree);
Vue.use(Steps);
Vue.use(Timeline);
Vue.use(List);
Vue.use(Popover);
Vue.use(Alert);
Vue.use(Tooltip);
Vue.use(PageHeader);
Vue.use(Popconfirm);
Vue.use(Form);
Vue.use(Row);
Vue.use(Col);
Vue.use(TreeSelect);
Vue.use(Tabs);
Vue.use(Badge);
Vue.use(Progress);
Vue.use(Result);