PM.validateButtonPermission();
nui.parse();

function afterGridRendered() {
    PM.validateButtonPermission();
}
var grid = nui.get("js-emp-datagrid");
var userId = window.localStorage.userId;
nui.ajax({
	url: "/passenger/query"+"/"+userId,
    type: "GET",
    dataType: "json",
    contentType: 'application/json',
    success: function(data) {
       grid.setData(data);
    }
});


function init(tabs) {
    parentTabs = tabs;
    var orgid = parentTabs.getActiveTab().queryParams.orgid;
    if (orgid) {
        data.parentOrgId = orgid;
        grid.load(data);
    } else {
        grid.load();
    }
}

function add() {
    nui.open({
        url: "/pages/admin/passenger/createPassenger.html",
        title: "添加乘客",
        width: 650,
        height: 535,
        allowResize: false,
    });

}

function edit() {
    var row = grid.getSelected(); // employee info
    if (row) {
        nui.open({
            url: "/pages/admin/passenger/modifyPassenger.html",
            title: "编辑乘客",
            width: 650,
            height: 535,
            allowResize: false,
            data: {
                employee: row
            }
        });
    } else {
        nui.alert("请选中一条记录！");
    }
}

function remove() {    
    var row = grid.getSelected();
    var userid = window.localStorage.userId;
    if (row) {
        nui.confirm("是否确认删除人员？", "删除人员", function(action) {
            if (action !== "ok") {
                return;
            } else {
                nui.mask({
                    el: document.body,
                    cls: 'nui-mask-loading',
                    html: '执行中...'
                });
                var id = row.passengerId;
                 nui.ajax({
                     url: "/passenger/delete/"+id+"/"+userid,
                     type: 'DELETE',
                     cache: false,
                     contentType: 'application/json',
                     success: function(text) {
                    	 if(text == true){
                    		 nui.showTips({
                                 content: "删除成功！",
                                 state: "success",
                                 x: "center",
                                 y: "center"
                             });
                    	 }else{
                    		 nui.showTips({
         						content : "删除失败",
         						state : "failure",
         						x : "center",
         						y : "center"
         					});
                    	 }
                     },
                     complete: function() {
                         nui.unmask(document.body);
                     },
                     error: function(jqXHR) {
                     }
                 });
                grid.removeRow(row, true);
                nui.unmask(document.body);
                grid.unmask();
            }
        });
    } else {
        nui.alert("请选中一条记录！");
    }
}

function onOperationRenderer(e) {
    var operHtml = "<div class='icon-row-container'>" +
        "<a onclick='edit()' title='编辑' functionCode='admin_org_emp_edit_emp'>编辑</a>" +
        // "<a onclick='auth()' title='授权' functionCode='admin_org_emp_auth_emp'>授权</a>" +
        "<a onclick='remove()' title='删除' functionCode='admin_org_emp_delete_emp'>删除</a></div>";
    return operHtml;
}

