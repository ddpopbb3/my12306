PM.validateButtonPermission();
nui.parse();

function afterGridRendered() {
    PM.validateButtonPermission();
}
//var grid1 = nui.get("js-order-datagrid");
var data = new Object;
//var url = "/pages/admin/passenger/testDateUser.json";
//grid.setUrl(url);
//grid.load();

var nuiWin;

function init(data, nuiComp) {
    nuiWin = nuiComp;
}


function onSearchOrder() {

    //清空数据
    $("#js-record").html("");

    //获取订单数据
    nui.ajax({
        url: "/order/search/" + window.localStorage.userUid,
        type: "GET",
        async:'false',
        contentType: 'application/json',
        success: function(data) {
            if(data.length == 0){
                return;
            }
            var contentBuffer = "";
            for(var i = 0;i < data.length; i++) {
                var eosSampleOrderModel = data[i];
                var details = eosSampleOrderModel.eosSampleOrderRecordModelArrays;
                if (details.length == 0){
                    continue;
                }
                var orderDatetime = eosSampleOrderModel.eosSampleOrderBean.orderDatetime;
                var orderId = eosSampleOrderModel.eosSampleOrderBean.orderId;


                var panel = "<div id='js-recod-panel" + orderId + "' class='nui-panel' title='订单日期: " + orderDatetime + "' expanded='false' style='width:1000px;margin-bottom:20px;' collapseOnTitleClick='true' showCollapseButton='true'  showCloseButton='true'>";



                var div = "<div id='js-order-datagrid" + orderId + "' class='nui-datagrid' dataField='data' sizeList='[10,20,50,100]' showPager='false' showFilterRow='true'> "
                    + "<div property='columns'>"
                    + "<div field='eosSampleOrderDetailBean.trainCode' width='50' headerAlign='left' align='left'>车次</div>"
                    + "<div field='eosSampleTicketTypeInfoBean.startCity' width='50' headerAlign='left' align='left'>出发地</div>"
                    + "<div field='eosSampleTicketTypeInfoBean.destCity' width='50' headerAlign='left' align='left'>目的地</div>"
                    + "<div field='eosSampleUserPassengerBean.name' width='50' headerAlign='left' align='left'>旅客姓名</div>"
                    + "<div field='eosSampleOrderDetailBean.startDate' width='50' headerAlign='left' align='left'>乘车日期</div>"
                    + "<div field='eosSampleOrderDetailBean.seat' width='50' headerAlign='left' align='left'>席位</div>"
                    + "<div field='eosSampleUserPassengerBean.idtype' width='50' headerAlign='left' align='left'>证件类型</div>"
                    + "<div field='eosSampleUserPassengerBean.idnum' width='120' headerAlign='left' align='left'>证件号码</div>"
                    + "<div field='eosSampleOrderDetailBean.price' width='50' headerAlign='left' align='left'>票款金额</div>"
                    + "<div field='eosSampleOrderDetailBean.state' width='50' headerAlign='left' align='left'>车票状态</div>"
                    + "<div renderer='onOperationRenderer1' width='100'>操作</div>"
                    + "</div>"
                    + "</div>"
                    + "</div><p/>";


                panel += div;
                $("#js-record").append(panel);
                nui.parse();

                var detailGrid = nui.get("js-order-datagrid" + orderId);
                detailGrid.setData(details);
            }
        }
    });
}

function change(event) {
    var orderId = event.target.id;
    var currentGird = nui.get("js-order-datagrid" + orderId);
    var selectedRow = currentGird.getSelected();
     // employee info
    if (selectedRow) {
        selectedRow.changed=true;
        window.localStorage.isChanged = '1';
        window.localStorage.setItem("recordModel", JSON.stringify(selectedRow));
        nui.open({
            url: "/pages/admin/ticket/ticketList.html",
            title: "改签",
            width:  1010,
            height: 400,
            allowResize: false,
            onload: function () {
                var row = currentGird.getSelected();
                var startCity = nui.get("startCity");
                startCity.setValue(row.eosSampleTicketTypeInfoBean.startCity);
                startCity.setText(row.eosSampleTicketTypeInfoBean.startCity);

                var destCity = nui.get("destCity");
                destCity.setValue(row.eosSampleTicketTypeInfoBean.destCity);
                destCity.setText(row.eosSampleTicketTypeInfoBean.destCity);

                var startDate = nui.get("startDate");
                startDate.setValue(row.eosSampleOrderDetailBean.startDate);

                onSearchTicket();
            },
            ondestroy: function(action) {
                //grid.reload();
                //refreshOrgTree();
            }
        });
    } else {
        nui.alert("请选中一条记录！");
    }
}


function refund() {
    var orderId = event.target.id;
    var currentGird = nui.get("js-order-datagrid" + orderId);
    var row = currentGird.getSelected();
    if (row) {
        nui.confirm("是否确认退票？", "确认退票", function(action) {
            if (action !== "ok") {
                return;
            } else {
                row.changed = false;
                nui.ajax({
                    url: "/order/refund",
                    type: "PUT",
                    async:'false',
                    data: row,
                    contentType: 'application/json',
                    success: function(res) {
                    }
                });
            }
        });
    } else {
        nui.alert("请选中一条记录！");
    }
}

//function edit() {
//    var row = grid.getSelected(); // employee info
//    if (row) {
//        nui.open({
//            url: "/pages/admin/userpermgr/user/modifyUser.html",
//            title: "编辑平台用户",
//            width: 650,
//            height: 535,
//            allowResize: false,
//            data: {
//                employee: row
//            },
//            ondestroy: function(action) {
//                grid.reload();
//                //refreshOrgTree();
//            }
//        });
//    } else {
//        nui.alert("请选中一条记录！");
//    }
//}
//
//function auth() {
//    var row = grid.getSelected(); // employee info
//    if (row) {
//        nui.open({
//            url: "uc/org/employees/authorizeEmployee.html",
//            title: "授权人员权限",
//            width: 650,
//            height: 465,
//            allowResize: false,
//            data: {
//                employee: row
//            },
//            ondestroy: function(action) {
//                nui.unmask();
//                grid.reload();
//            }
//        });
//    } else {
//        nui.alert("请选中一条记录！");
//    }
//}
//
//function remove() {
//    var row = grid.getSelected();
//    if (row) {
//        nui.confirm("是否确认删除人员？", "删除人员", function(action) {
//            if (action !== "ok") {
//                return;
//            } else {
//                nui.mask({
//                    el: document.body,
//                    cls: 'nui-mask-loading',
//                    html: '执行中...'
//                });
//                var empId = row.empid;
//                // nui.ajax({
//                //     url: "api/uc/employees/" + empId,
//                //     type: 'DELETE',
//                //     cache: false,
//                //     contentType: 'application/json',
//                //     success: function(text) {
//                //         nui.showTips({
//                //             content: "删除成功！",
//                //             state: "success",
//                //             x: "center",
//                //             y: "center"
//                //         });
//                //         grid.reload();
//                //         refreshOrgTree();
//                //     },
//                //     complete: function() {
//                //         nui.unmask(document.body);
//                //     },
//                //     error: function(jqXHR) {
//                //         //nui.handleAjaxError(jqXHR, PM.operation.organization["REMOVE_EMPLOYEE"]);
//                //     }
//                // });
//                grid.removeRow(row, true);
//                nui.unmask(document.body);
//                grid.unmask();
//            }
//        });
//    } else {
//        nui.alert("请选中一条记录！");
//    }
//}

function renderGender(e) {
    //return nui.getDictText("COF_GENDER", e.row.gender);
}

function renderEmpStatus(e) {
    // return nui.getDictText("COF_EMPSTATUS", e.row.empstatus);
}

function onOperationRenderer1(e) {
    //debugger;
    var operHtml = "<div class='icon-row-container'>" +
            //e.row.orderId
        "<a id= '" + e.row.eosSampleOrderDetailBean.orderId + "' onclick='refund()' title='退票' functionCode='admin_org_emp_edit_emp'>退票</a>" +
            // "<a onclick='auth()' title='授权' functionCode='admin_org_emp_auth_emp'>授权</a>" +
        "<a id= '" + e.row.eosSampleOrderDetailBean.orderId + "' onclick='change()' title='改签' functionCode='admin_org_emp_delete_emp'>改签</a></div>";
    return operHtml;
}


