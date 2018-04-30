var mods = [
  'element', 'sidebar', 'mockjs', 'select',
  'tabs', 'menu', 'route', 'utils', 'component', 'kit', 'echarts'
];

layui.define(mods, function(exports) {
  var element = layui.element,
    utils = layui.utils,
    $ = layui.jquery,
    _ = layui.lodash,
    route = layui.route,
    tabs = layui.tabs,
    layer = layui.layer,
    menu = layui.menu,
    component = layui.component,
    kit = layui.kit;


  var Admin = function() {
    this.config = {
      elem: '#app',
      loadType: 'TABS',
      remote:{
        url: '/xqsrd/menu/getMenuList', //接口地址
        type: 'GET', //请求方式
        jsonp: false //跨域
      }
    };
    this.version = '1.0.0';
  };

  Admin.prototype.ready = function(callback) {
    var that = this,
      config = that.config;

    // 初始化加载方式
    const { getItem } = utils.localStorage;
    const setting = getItem("KITADMIN_SETTING_LOADTYPE");
    if (setting !== null && setting.loadType !== undefined) {
      config.loadType = setting.loadType;
    }

    kit.set({
      type: config.loadType
    }).init();

    // 初始化路由
    _private.routeInit(config);
    // 初始化左侧菜单
    _private.menuInit(config);
    // 初始化选项卡
    if (config.loadType === 'TABS') {
      _private.tabsInit();
    }
    // 跳转至首页
    if (location.hash === '') {
      utils.setUrlState('主页', '#/');
    }

    // // 处理 sidebar
    // layui.sidebar.render({
    //   elem: '#ccleft',
    //   //content:'', 
    //   title: '这是左侧打开的栗子',
    //   shade: true,
    //   // shadeClose:false,
    //   direction: 'left',
    //   dynamicRender: true,
    //   url: 'components/table/teble2.html',
    //   width: '50%', //可以设置百分比和px
    // });

    // $('#cc').on('click', function() {
    //   var that = this;
    //   layui.sidebar.render({
    //     elem: that,
    //     //content:'', 
    //     title: '这是表单盒子',
    //     shade: true,
    //     // shadeClose:false,
    //     // direction: 'left'
    //     dynamicRender: true,
    //     url: 'components/form/index.html',
    //     width: '50%', //可以设置百分比和px
    //   });
    // });
    // 监听头部右侧 nav
    component.on('nav(header_right)', function(_that) {
      var target = _that.elem.attr('kit-target');
      if (target === 'setting') {
        // 绑定sidebar
        layui.sidebar.render({
          elem: _that.elem,
          //content:'', 
          title: '设置',
          shade: true,
          // shadeClose:false,
          // direction: 'left'
          dynamicRender: true,
          url: 'components/setting.html',
          // width: '50%', //可以设置百分比和px
        });
      }
      if (target === 'help') {
        layer.alert('QQ群：248049395，616153456');
      }
    });

    // 注入mock
    layui.mockjs.inject(APIs);

    // 初始化渲染
    if (config.loadType === 'SPA') {
      route.render();
    }
    that.render();

    // 执行回调函数
    typeof callback === 'function' && callback();
  }
  Admin.prototype.render = function() {
    var that = this;
    return that;
  }

  var _private = {
    routeInit: function(config) {
      var that = this;
      // route.set({
      //   beforeRender: function (route) {
      //     if (!utils.oneOf(route.path, ['/user/table', '/user/table2', '/'])) {
      //       return {
      //         id: new Date().getTime(),
      //         name: 'Unauthorized',
      //         path: '/exception/403',
      //         component: 'components/exception/403.html'
      //       };
      //     }
      //     return route;
      //   }
      // });
      // 配置路由
      var routeOpts = {
        // name: 'kitadmin',
        // r: [{
        //   path: '/user/index',
        //   component: '/components/user/index.html',
        //   name: '用户列表',
        //   children: [{
        //     path: '/user/create',
        //     component: 'components/user/create.html',
        //     name: '新增用户',
        //   }, {
        //     path: '/user/edit',
        //     component: 'components/user/edit.html',
        //     name: '编辑用户',
        //   }]
        // }],
        routes: [{
          path: '/user/index',
          component: '/components/user/index.html',
          name: '用户列表'
        }, {
          path: '/user/create',
          component: 'components/user/create.html',
          name: '新增用户',
        }, {
          path: '/user/edit',
          component: 'components/user/edit.html',
          name: '编辑用户',
        }, {
          path: '/cascader',
          component: 'components/cascader/index.html',
          name: 'Cascader'
        }, {
          path: '/',
          component: 'components/app.html',
          name: '主页'
        }, {
          path: '/user/my',
          component: 'components/profile.html',
          name: '用户中心'
        }, {
          path: '/inputnumber',
          component: 'components/inputnumber.html',
          name: 'InputNumber'
        }, {
          path: '/layui/grid',
          component: 'components/layui/grid.html',
          name: 'Grid'
        }, {
          path: '/layui/button',
          component: 'components/layui/button.html',
          name: '按钮'
        }, {
          path: '/layui/form',
          component: 'components/layui/form.html',
          name: '表单'
        }, {
          path: '/layui/nav',
          component: 'components/layui/nav.html',
          name: '导航/面包屑'
        }, {
          path: '/layui/tab',
          component: 'components/layui/tab.html',
          name: '选项卡'
        }, {
          path: '/layui/progress',
          component: 'components/layui/progress.html',
          name: 'progress'
        }, {
          path: '/layui/panel',
          component: 'components/layui/panel.html',
          name: 'panel'
        }, {
          path: '/layui/badge',
          component: 'components/layui/badge.html',
          name: 'badge'
        }, {
          path: '/layui/timeline',
          component: 'components/layui/timeline.html',
          name: 'timeline'
        }, {
          path: '/layui/table-element',
          component: 'components/layui/table-element.html',
          name: 'table-element'
        }, {
          path: '/layui/anim',
          component: 'components/layui/anim.html',
          name: 'anim'
        }, {
          path: '/layui/layer',
          component: 'components/layui/layer.html',
          name: 'layer'
        }, {
          path: '/layui/laydate',
          component: 'components/layui/laydate.html',
          name: 'laydate'
        }, {
          path: '/layui/table',
          component: 'components/layui/table.html',
          name: 'table'
        }, {
          path: '/layui/laypage',
          component: 'components/layui/laypage.html',
          name: 'laypage'
        }, {
          path: '/layui/upload',
          component: 'components/layui/upload.html',
          name: 'upload'
        }, {
          path: '/layui/carousel',
          component: 'components/layui/carousel.html',
          name: 'carousel'
        }, {
          path: '/layui/laytpl',
          component: 'components/layui/laytpl.html',
          name: 'laytpl'
        }, {
          path: '/layui/flow',
          component: 'components/layui/flow.html',
          name: 'flow'
        }, {
          path: '/layui/util',
          component: 'components/layui/util.html',
          name: 'util'
        }, {
          path: '/layui/code',
          component: 'components/layui/code.html',
          name: 'code'
        }, {
          path: '/user/table',
          component: '/components/table/teble.html',
          name: 'Table'
        }, {
          path: '/user/table2',
          component: '/components/table/teble2.html',
          name: '数据表格2'
        }, {
          path: '/user/table3',
          component: '/components/table/teble3.html',
          name: '数据表格3'
        }, {
          path: '/user/form',
          component: '/components/form/index.html',
          name: 'Form'
        }, {
          path: '/docs/mockjs',
          component: '/docs/mockjs.html',
          name: '拦截器(Mockjs)'
        }, {
          path: '/docs/menu',
          component: '/docs/menu.html',
          name: '左侧菜单(Menu)'
        }, {
          path: '/docs/route',
          component: '/docs/route.html',
          name: '路由配置(Route)'
        }, {
          path: '/docs/tabs',
          component: '/docs/tabs.html',
          name: '选项卡(Tabs)'
        }, {
          path: '/docs/utils',
          component: '/docs/utils.html',
          name: '工具包(Utils)'
        }, {
          path: '/components/select',
          component: 'components/select/index.html',
          name: 'Select'
        }, {
          path: '/exception/403',
          component: 'components/exception/403.html',
          name: '403'
        }, {
          path: '/exception/404',
          component: 'components/exception/404.html',
          name: '404'
        }, {
          path: '/exception/500',
          component: 'components/exception/500.html',
          name: '500'
        }]
      };
      // 判断是否使用远程数据
      if(config.data !== undefined && config.data.length > 0){
        routeOpts.routes = config.data;
      }

      if (config.loadType === 'TABS') {
        routeOpts.onChanged = function() {
          // 如果当前hash不存在选项卡列表中
          if (!tabs.existsByPath(location.hash)) {
            // 新增一个选项卡
            that.addTab(location.hash, new Date().getTime());
          } else {
            // 切换到已存在的选项卡
            tabs.switchByPath(location.hash);
          }
        }
      }
      // 设置路由
      route.setRoutes(routeOpts);
      return this;
    },
    addTab: function(href, layid) {
      var r = route.getRoute(href);
      if (r) {
        tabs.add({
          id: layid,
          // title: r.name, 不使用route.name字段，使用title和菜单名称保持一致
          title: r.title,
          path: href,
          component: r.component,
          rendered: false,
          icon: r.icon
        });
      }
    },
    menuInit: function(config) {
      var that = this;
      // 配置menu
      menu.set({
        dynamicRender: true ,
        data: config.data ,
        isJump: config.loadType === 'SPA',
        onClicked: function(obj) {
          if (config.loadType === 'TABS') {
            if (!obj.hasChild) {
              var data = obj.data;
              var href = data.href;
              var layid = data.layid;
              that.addTab(href, layid);
            }
          }
        },
        elem: '#menu-box',
        remote: {
          url: '/api/getmenus1',
          method: 'post'
        },
        cached: false
      }).render();
      return this;
    },
    tabsInit: function() {
      tabs.set({
        onChanged: function(layid) {
          // var tab = tabs.get(layid);
          // if (tab !== null) {
          //   utils.setUrlState(tab.title, tab.path);
          // }
        }
      }).render(function(obj) {
        // 如果只有首页的选项卡
        if (obj.isIndex) {
          route.render('#/');
        }
      });
    }
  }

  var admin = new Admin();
  //判断是否使用本地数据
  var navbarLoadIndex;
  _data = [];
  if (admin.config.remote.url !== undefined && admin.config.remote.url.length > 0) {
    navbarLoadIndex = layer.load(2);
    _remote = admin.config.remote;
    var dataType = _remote.jsonp ? 'jsonp' : 'json';
    var options = {
      url: _remote.url,
      type: _remote.type,
      error: function(xhr, status, thrown) {
        layui.hint().error('Navbar error:AJAX请求出错.' + thrown);
        navbarLoadIndex && layer.close(navbarLoadIndex);
      },
      success: function(res) {
        _data = res;
      }
    };
    $.extend(true, options, _remote.jsonp ? {
      dataType: 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'jsonpCallback'
    } : {
      dataType: 'json'
    });
    $.support.cors = true;
    $.ajax(options);
  }
  var tIndex = setInterval(function() {
    if (_data.length > 0) {
      clearInterval(tIndex);
      admin.config.data = _data;
      //渲染模板
      admin.ready(function() {
        console.log('Init successed.');
      });
      //关闭等待层
      navbarLoadIndex && layer.close(navbarLoadIndex);
    }
  }, 50);
  // admin.ready(function() {
  //   console.log('Init successed.');
  // });

  //输出admin接口
  exports('admin', {});
});