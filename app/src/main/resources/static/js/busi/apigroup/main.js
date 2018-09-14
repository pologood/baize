/*!
 * Copyright 2017 xuefeihu
 * Licensed under the Themeforest Standard Licenses
 */

(function() {
    // 初始化表格
    $('#exampleTableEvents').bootstrapTable({
        method: 'get',
        toolbar: '#exampleTableEventsToolbar',    //工具按钮用哪个容器
        striped: true,      //是否显示行间隔色
        cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,
        sortable: false,
        sortOrder: "asc",
        pageNumber:1,      //初始化加载第一页，默认第一页
        pageSize: 10,      //每页的记录行数（*）
        pageList: [10, 25, 50, 100],  //可供选择的每页的行数（*）
        url: "/apigroup/list",
        queryParamsType:'', //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
                            // 设置为 ''  在这种情况下传给服务器的参数为：pageSize,pageNumber
        //queryParams: queryParams,//前端调用服务时，会默认传递上边提到的参数，如果需要添加自定义参数，可以自定义一个函数返回请求参数
        sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
        strictSearch: true,
        //showColumns: true,     //是否显示所有的列
        //showRefresh: true,     //是否显示刷新按钮
        minimumCountColumns: 2,    //最少允许的列数
        clickToSelect: true,    //是否启用点击选中行
        searchOnEnterKey: true,
        columns: [{
            field: 'name',
            title: '分组名称',
            align: 'center'
        }, {
            field: 'type',
            title: '类型',
            align: 'center',
            formatter:function(value, row, index) {
                if (value && value == 'COMMON') {
                    return '普通';
                }
            }
        }, {
            field: 'serviceId',
            title: '服务ID',
            align: 'center'
        }, {
            field: 'info',
            title: '描述说明',
            align: 'center'
        }, {
            field: 'status',
            title: '状态',
            align: 'center',
            formatter:function(value, row, index) {
                if (value && value == 'ON') {
                    return '<span class="label label-running">已启用</span>';
                } else if (value && value == 'OFF') {
                    return '<span class="label label-down">已停用</span>';
                }
            }
        }, {
            field: 'groupId',
            title: '操作',
            align: 'center',
            formatter:function(value, row, index) {
                //value：当前field的值，即userId
                //row：当前行的数据
                var a = '<div class="btn-group">';
                a = a +     '<button data-toggle="dropdown" class="btn btn-success btn-outline btn-xs dropdown-toggle">操作 <span class="caret"></span></button>';
                a = a +     '<ul class="dropdown-menu">';

                a = a +         '<li><a href="javascript:void(0)" onclick=apiWin('+value+')>API管理</a></li>';
                if (row.status == 'ON') {
                    a = a +     '<li><a href="javascript:void(0)" onclick=statusWin('+value+',"OFF")>停用</a></li>';
                } else if (row.status == 'OFF') {
                    a = a +     '<li><a href="javascript:void(0)" onclick=editWin('+value+')>编辑</a></li>';
                    a = a +     '<li><a href="javascript:void(0)" onclick=delWin('+value+')>删除</a></li>';
                    a = a +     '<li><a href="javascript:void(0)" onclick=statusWin('+value+',"ON")>启用</a></li>';
                    a = a +     '<li><a href="javascript:void(0)" onclick=compWin('+value+')>组件配置</a></li>';
                }

                a = a +     '</ul>';
                a = a + '</div>';
                return a;
            }
        }]
    });

})();

// 新增窗口
function addWin(){
  //页面层
    parent.layer.open({
        type: 2,
        title: '新增',
        skin: 'layui-layer-rim', //加上边框
        area: ['1000px', '650px'], //宽高
        content: '/apigroup/add',
        end: function () {
            search();
        }
    });
}

// 编辑窗口
function editWin(groupId){
    parent.layer.open({
        type: 2,
        title: '编辑',
        skin: 'layui-layer-rim', //加上边框
        area: ['1000px', '650px'], //宽高
        content: '/apigroup/edit.html?groupId='+groupId,
        end: function () {
            search();
        }
    });
}

// API窗口
function apiWin(groupId){
    var dataUrl = '/api/main',
        dataIndex = '/api/main',
        menuName = 'API列表',
        iframeUrl = dataUrl + '?groupId=' + groupId;
    parent.customItem(dataUrl, dataIndex, menuName, iframeUrl);
}

// 组件配置窗口
function compWin(groupId){
    var dataUrl = '/apigroup/compconfig',
        dataIndex = '/apigroup/compconfig',
        menuName = '分组组件配置',
        iframeUrl = dataUrl + '?groupId=' + groupId;
    parent.customItem(dataUrl, dataIndex, menuName, iframeUrl);
}

/**
 * 停启用
 * @param groupId
 * @param status
 */
function statusWin(groupId, status){
    var tip = '';
    if (status == 'ON') {
        tip = '启用';
    } else {
        tip = '停用';
    }

    swal({
            title: "您确定要"+tip+"这条记录吗",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的，我要"+tip+"！",
            cancelButtonText: "让我再考虑一下…",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm){
                var param = {};
                param.groupId = groupId;
                param.status = status;
                $.post("/apigroup/option", param, function(result) {
                    if (result.code == "1000") {
                        swal(tip+"成功！", result.msg, "success");
                    } else {
                        swal(tip+"失败！", result.msg, "error");
                    }
                    search();
                }, 'json');
            }
        });
}

/**
 * 删除
 * @param groupId
 */
function delWin(groupId){
    swal({
            title: "您确定要删除这条记录吗",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的，我要删除！",
            cancelButtonText: "让我再考虑一下…",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm){
                var param = {};
                param.groupId = groupId;
                $.post("/apigroup/delete", param, function(result) {
                    if (result.code == "1000") {
                        swal("删除成功！", result.msg, "success");
                    } else {
                        swal("删除失败！", result.msg, "error");
                    }
                    search();
                }, 'json');
            }
        });
}

// 搜索
function search(){
    var param = {};
    param.name = $('#name').val();
    $('#exampleTableEvents').bootstrapTable('refresh',{query : param});
}

