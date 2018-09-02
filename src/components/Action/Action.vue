<template>
  <div class="p-action">
    <!-- 需要使用v-bnid来告诉Vue, false是一个JavaScritp表达式而不是一个字符串。 -->
    <!-- Boolean类型 -->
    <nav-header v-bind:icon-back="false" :title="name" class="s_header"></nav-header>
    <div class="p-action__content">
      <button-tab v-model="btnTab">
        <button-tab-item @on-item-click="btnTabClick()">记录</button-tab-item>
        <button-tab-item @on-item-click="btnTabClick()">查看</button-tab-item>
      </button-tab>
      <div id="addActions" v-show="showAdd">
        <div class="action-items">
          <checker
          v-model="actionChecker"
          default-item-class="demo5-item"
          selected-item-class="demo5-item-selected"
          @on-change="checkAction"
          >
            <checker-item v-for="(a, i) in actions" :key="i" :value="a">{{a.action}}</checker-item>
          </checker>
        </div>
        <!-- <divider>备注</divider> -->
        <div class="p-action__content__markup">
          <group>
            <x-textarea title="备注" v-model="markup" placeholder="请输入备注"></x-textarea>
          </group>
        </div>
        <x-button @click.native="saveAction">完事儿</x-button>
        <x-button @click.native="clearAction">清空历史记录</x-button>
      </div>

      <div id="actionsHistory" v-show="showHistory">
        <div class="action-items">
          <checker
          v-model="actionHisChecker"
          default-item-class="demo5-item"
          selected-item-class="demo5-item-selected"
          @on-change="showActionHis"
          >
            <checker-item v-for="(a, i) in hisActions" :key="i" :value="a">{{a.action}}</checker-item>
          </checker>
        </div>
        <div>
          <div>
            次数：{{ currAction.action.length }}
          </div>
          <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
              <tr>
                <th>动作</th>
                <th>时间</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(a, i) in currAction.action" :key="i">
                <td>{{a.action}}</td>
                <td>{{a.time}}</td>
                <td>{{a.markup}}</td>
              </tr>
            </tbody>
          </x-table>
        </div>
      </div>
      
    </div>
    <toast 
      v-model="showPositionValue" 
      type="text" :time="800" 
      is-show-mask 
      :text="tipmsg"
      :position="position">
    </toast>
  </div>
</template>

<script>
import {
  XButton,
  Checker,
  CheckerItem,
  Divider,
  Group,
  XTextarea,
  ButtonTab,
  ButtonTabItem,
  Panel,
  XTable,
  Toast,
} from "vux";
import NavHeader from "@/components/NavHeader/NavHeader";
import moment from "moment";
const actions = [
  {
    action: "喂奶",
    type: "lactation"
  },
  {
    type: "take-medicine",
    action: "喂药"
  },
  {
    type: "pee",
    action: "尿嘘嘘"
  },
  {
    type: "shit",
    action: "拉臭臭"
  },
  {
    type: "take-bath",
    action: "洗香香"
  }
];
export default {
  data() {
    return {
      tipmsg: '',
      showPositionValue: false,
      position: 'default',
      HISACTIONS: "HIS_ACTIONS",
      ACTIONS: "ACTIONS",
      userName: "李小抱",
      name: "记录宝宝一天活动",
      actionChecker: {
        action: "喂奶",
        type: "lactation"
      },
      actionHisChecker: {
        action: "喂奶",
        type: "lactation"
      },
      btnTab: 0,
      showAdd: true,
      showHistory: false,
      actions: actions,
      hisActions: [
        ...actions,
        {
          type: "all",
          action: "全部"
        }
      ],
      action: undefined,
      markup: "",
      actionList: [],
      currAction: {
        action: [],
        name: "李小抱"
      }
    };
  },
  components: {
    XButton,
    NavHeader,
    Checker,
    CheckerItem,
    Divider,
    Group,
    XTextarea,
    ButtonTab,
    ButtonTabItem,
    Panel,
    XTable,
    Toast
  },
  mounted() {
    this.currAction = this.getCurrActions();
  },
  methods: {
    showPosition(position, tipmsg = '') {
      this.position = position;
      this.showPositionValue = true;
      this.tipmsg = tipmsg;
    },
    getCurrActions() {
      const actionsByName = localStorage.getItem(this.ACTIONS);
      let currActionsBuName = {
        action: [],
        name
      };
      if (actionsByName) {
        currActionsBuName = JSON.parse(actionsByName)[this.userName];
      }
      return currActionsBuName;
    },
    showActionHis() {
      const currActions = this.getCurrActions();
      if (this.actionHisChecker.type !== "all") {
        currActions.action = currActions.action.filter(item => {
          return item.type === this.actionHisChecker.type;
        });
      }
      this.currAction = currActions;
    },
    btnTabClick() {
      if (this.btnTab === 0) {
        this.showAdd = true;
      } else {
        this.showAdd = false;
        // 重置历史数据。走接口的时候去查询接口
        this.currAction = this.getCurrActions();
      }
      this.showHistory = !this.showAdd;
    },
    clearAction() {
      const currActions = localStorage.getItem(this.ACTIONS);
      localStorage.removeItem(this.ACTIONS);
      const hisAction = localStorage.getItem(this.HISACTIONS);
      localStorage.setItem(this.HISACTIONS, currActions);
      this.showPosition('top', '清除成功');
    },
    optionStorage(key, name, actions) {
      const actionsByName = localStorage.getItem(key);
      let currActionsBuName = {
        action: [],
        name
      };
      if (actionsByName) {
        currActionsBuName = JSON.parse(actionsByName)[name];
      }
      currActionsBuName.action = currActionsBuName.action.concat(actions);
      const actionByNameItem = {
        [name]: currActionsBuName
      };

      localStorage.setItem(this.ACTIONS, JSON.stringify(actionByNameItem));
      return actionByNameItem[name];
    },
    saveAction() {
      /* eslint-disable no-console */
      console.log(this.markup);
      const action = this.action || this.actionChecker;
      const date = moment();
      const name = this.userName;
      action.date = date.format("YYYY-MM-DD");
      action.time = date.format("YYYY-MM-DD HH:mm:ss");
      action.markup = this.markup;
      const actions = this.optionStorage(this.ACTIONS, name, [action]);
      console.log(`******: ${actions}`);
      this.currAction = actions;
      this.showPosition('top', '保存成功');
    },
    checkAction(action) {
      this.action = action;
      this.markup = "";
      /* eslint-disable no-console */
      console.log(this.action);
    }
  },
  created() {
    //		console.log(window.abcd)
  }
};
</script>

<style lang="less" >
@import url("./Action.less");

.action-items {
  margin: 20px;
}
.demo5-item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin: 6px;
}
.demo5-item-selected {
  background: #ffffff
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZDOEJBQ0E3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZDOEJBQ0I3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNkM4QkFDODc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNkM4QkFDOTc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnMGp3kAAAAJUExURf9KAP///////4Jqdw0AAAADdFJOU///ANfKDUEAAAAuSURBVHjaTMpBDgAABAPB5f+PlhLUpZMWuQcYMWLEyDN4ymqa5KS4+3g+KAEGACQmAGlKzr56AAAAAElFTkSuQmCC)
    no-repeat right bottom;
  border-color: #ff4a00;
}
</style>
