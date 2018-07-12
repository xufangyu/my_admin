//myZtree组件
layui.define(['layer', 'ztree'], function(exports) {
  var _MOD = 'myZtree',
    layer = layui.layer,
    $ = layui.jquery;
  var MyZtree = function() {
    this.v = '1.0.0';
  };
  /**
   * 渲染myZtree
   */
  MyZtree.prototype.render = function(options) {
    var that = this;
    // 设置可参考ztree.js配置 URL:http://www.treejs.cn/v3/api.php
    var setting = {
      check: {
        enable: true
        // ,chkboxType: {
        //   "Y": "",
        //   "N": ""
        // }
      },
      view: {
        //双击节点时，是否自动展开父节点的标识
        dblClickExpand: true
      },
      data: {
        key:{
          name:"menuName"

        },
        simpleData: {
          enable: true,
          //idKey: "xId",
          pIdKey: "parentId",
          rootPId: 0
        }
      },
      callback: {
        // ztree 点击前发生
        // beforeClick: function(treeId, treeNode) {
        //   var zTree = $.fn.zTree.getZTreeObj(treeId);
        //   zTree.checkNode(treeNode, !treeNode.checked, null, true);
        // },
        // ztree 点击时发生,将点击事件和check事件都bind到onClick
        //onClick: onClick,
        onCheck: onClick
      }
    };
    // 获取当前时间戳
    var times = new Date().getTime();
    var eId = 'content' + times;
    var treeDOMId = 'treeDemo' + times;
    // 创建DOM
    $(options.elem)
      .parent()
      .append(['<div id="' + eId + '" class="ztree-content layui-anim layui-anim-upbit">',
        '<ul id="treeDemo' + times + '" class="ztree"></ul>',
        '</div>'
      ].join(''));
    //.children('input.layui-input').removeAttr('id');
    // 初始化zTree
    var zTree = $.fn.zTree.init($('#' + treeDOMId), setting, options.data);
    // 获取所有节点
    var nodes = zTree.getNodes();
    // 获取初始值
    //var vals = $(options.elem).parent().children('input.layui-input').val();
    var vals = $(options.elem).val();
    if ($.trim(vals).length > 0) {
      initNode(nodes);
    }
    // 初始化数据
    function initNode(nodes) {
      for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        if (findArray(vals.split(','), node.id) !== -1) {
          zTree.checkNode(node, true, false);
        }
        if (node.children !== null && node.children !== undefined && node.children.length > 0) {
          // 递归调用
          initNode(node.children);
        }
      }
    };
    //点击事件的处理
    function onClick(e, treeId, treeNode) {
      var zTree = $.fn.zTree.getZTreeObj(treeId),
        nodes = zTree.getCheckedNodes(true), //获取选中的节点
        valIds = [],
        arr = [];
      for (var i = 0, l = nodes.length; i < l; i++) {
        valIds.push(nodes[i].id);
        arr.push({
          name: nodes[i].name,
          id: nodes[i].id,
          tid: nodes[i].tId
        });
      }
      var _input = $(options.elem);
      //_input.attr("value", valIds.join(','));
      _input.val(valIds.join(','));
    }
    return that;
  };

  // Array 扩展
  Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };
  // 移除指定值
  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  /**
   * 
   * 查找数组，返回匹配到的第一个index
   * 
   * @param array 被查找的数组
   * @param feature 查找特征 或者为一个具体值，用于匹配数组遍历的值，或者为一个对象，表明所有希望被匹配的key-value
   * @param or boolean 希望命中feature全部特征或者只需命中一个特征，默认true
   * 
   * @return 数组下标  查找不到返回-1
   */
  function findArray(array, feature, all) {
    all = all || true;
    for (var index in array) {
      var cur = array[index];
      if (feature instanceof Object) {
        var allRight = true;
        for (var key in feature) {
          var value = feature[key];
          if (cur[key] == value && !all) return index;
          if (all && cur[key] != value) {
            allRight = false;
            break;
          }
        }
        if (allRight) return index;
      } else {
        if (cur == feature) {
          return index;
        }
      }
    }
    return -1;
  };
  // 导出组件
  exports(_MOD, new MyZtree());
});