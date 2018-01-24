nui.parse();

function afterGridRendered() {
    PM.validateButtonPermission();
}
var grid = nui.get("js-emp-datagrid");
var gridbook = nui.get("js-book-datagrid");
var gridorder = nui.get("js-order-datagrid");
var gridpay = nui.get("js-pay-datagrid");
var nuiWin;

function init(data, nuiComp) {
   nuiWin = nuiComp;

}
function onSearchTicket() {
    if (typeof(window.localStorage.isChanged) == "undefined") {
        window.localStorage.isChanged = '0';
    }
    var dataGrid = nui.get("js-emp-datagrid");
        var startCity = $("input[name=startCity]").val();
        var destCity = $("input[name=destCity]").val();
        var startDate = $("input[name=startDate]").val();
    if(startCity == destCity && ((startCity != "") || destCity != "") ){
        nui.alert("出发地和目的地不能相同！");
    } else  if(((startCity == "") || destCity == "") ){
        nui.alert("出发地和目的地不能为空！");
    } else  {
        nui.mask({
            el: document.body,
            cls: 'nui-mask-loading',
            html: '查询中...'
        });
      nui.ajax({
        url: "/ticket/query/"+startCity+"/"+destCity+"/"+startDate,
        type: "GET",
          async:'false',
        contentType: 'application/json',
        success: function(data) {
            dataGrid.setData(data);
        },
          complete: function() {
              nui.unmask(document.body);
          }
    })
    }
}
$(function(){
    $("#loginTag").attr("title", window.localStorage.userUid);
    $("#loginTag").attr("border-style","none");
    if(window.localStorage.startCity != "" && window.localStorage.destCity != "" && window.localStorage.startDate != ""){
        var t = nui.get("startCity");
        t.setValue(window.localStorage.startCity);
        t.setText(window.localStorage.startCity);
        var t1 = nui.get("destCity");
        t1.setValue(window.localStorage.destCity);
        t1.setText(window.localStorage.destCity);
        var startDate = nui.get("startDate");
        startDate.setValue(window.localStorage.startDate);
        onSearchTicket();
        window.localStorage.startCity = '';
        window.localStorage.destCity = "";
        window.localStorage.startDate = "";
    }
});
function book() {
    if(window.localStorage.userId == "" || window.localStorage.userId == null) {
        nui.confirm("是否登录？", "登录提示", function (action) {
            if (action !== "ok") {
                return;
            } else {
                window.localStorage.startCity = $("input[name=startCity]").val();
                window.localStorage.destCity = $("input[name=destCity]").val();
                window.localStorage.startDate =  $("input[name=startDate]").val();
                window.location.assign(location.origin+"/login");
            }
        });
    }else{
        var row = grid.getSelected();
    if(row) {
        if (row.ticketSale.actualAmount2 > 0) {
            nui.open({
                url: "/pages/admin/ticket/bookTicket.html",
                title: "车票预订",
                width: 800,
                height: 400,
                allowResize: false,
                onload: function () {
                    var row = grid.getSelected();
                    var dataInfo = new Array(1);
                    dataInfo[0] = row;
                    var gridchild = nui.get("js-book-datagrid");
                    gridchild.setData(dataInfo);
                    nui.ajax({
                        url: "/passenger/query/"+window.localStorage.userId,
                        type: "GET",
                        contentType: 'application/json',
                        success: function (res) {
                            var passBox = nui.get("pass-info");
                            passBox.loadData(res);
                        }
                    });
                }
            })
        } else if (row.ticketSale.actualAmount2 == 0) {
            nui.alert("车票已售完！");
        }
    }else{
        nui.alert("车票信息已过期，请重新搜索！");
    }
    }
}

function onCommitOrder() {
    var ticketInfo = gridbook.getRow(0);
    var row = grid.getSelected();
   var selectPass = (nui.get("pass-info")).getSelecteds();
    row.userPassList = selectPass;
    if (window.localStorage.isChanged == '1') {
        var recordModel = JSON.parse(window.localStorage.getItem("recordModel"));
        if(recordModel.changed = true){
            row.orderId=recordModel.eosSampleOrderDetailBean.orderId;
            row.changed = recordModel.changed;
        }
    }

    if (ticketInfo && (selectPass.length != 0)) {
        nui.confirm("是否确认提交？", "提交订单", function (action) {
            if (action !== "ok") {
                return;
            } else {
                nui.open({
                    url: "/pages/admin/ticket/order.html",
                    title: "订单信息",
                    width: 800,
                    height: 400,
                    allowResize: false,
                    onload: function() {
                        nui.ajax({
                            url: "/ticket/increase" ,
                            type: 'POST',
                            async:'false',
                            data: row,
                            contentType: 'application/json',
                            success: function(resOrder) {
                                nuiWin.close();
                                var gridchild = nui.get("js-order-datagrid");
                                gridchild.setData(resOrder);
                            }
                        })
                    }
                });
            }
        });
    }else if(selectPass.length == 0){
        nui.alert("请选择乘客！");
    }
}

function openPay(){
    var orderInfo = gridorder.getRow(0);
    if (orderInfo) {
        nui.open({
            url: "/pages/admin/ticket/pay.html",
            title: "支付页面",
            width: 800,
            height: 400,
            allowResize: false,
            showModal: Boolean,
            onload: function() {
                $("#realOrderDetailId").val(orderInfo.orderDetail.orderDetailId);
                var gridtemp = nui.get("js-order-datagrid");
                var pageInfo = gridtemp.getRow(0);
                nuiWin.close();
                if(window.localStorage.isChanged == '1'){
                    //var recordModel = JSON.parse(window.localStorage.getItem("recordModel"));
                    $("input[name=code]").attr("value", pageInfo.orderDetail.detailCode);
                } else {
                    $("input[name=code]").attr("value",pageInfo.order.code);
                }

                $("input[name=price]").attr("value",(nui.encode(pageInfo.order.price)+" 元"));
                nui.ajax({
                    url: "/pay/query/"+window.localStorage.userId,
                    type: "GET",
                    async:'false',
                    contentType: 'application/json',
                    success: function(text) {
                        var gridchild = nui.get("js-pay-datagrid");
                        gridchild.setData(text);
                    }
                })
            }
        })
    } else {
        nui.alert("订单生成失败！");
    }
}
function onPay() {
    var num = ($("input[name=price]").val()).split(" ");
    var code = ($("input[name=code]").val());
    var accountInfo = gridpay.getSelected();
    if (accountInfo) {
        var realOrderDetailId = $("#realOrderDetailId").val();
        nui.ajax({
            url: "/coordinator/pay/"+accountInfo.accountId+"/"+num[0]+"/"+realOrderDetailId,
            type: "POST",
            async:'false',
            contentType: 'application/json',
            success: function(res) {
                if(res=="0"){

                    var statusCode = "0";
                    if (window.localStorage.isChanged == '1') {
                        var recordModel = JSON.parse(window.localStorage.getItem("recordModel"));
                        statusCode = '10';
                        nui.ajax({
                            url: "/order/refund",
                            type: "PUT",
                            async:'false',
                            data: recordModel,
                            contentType: 'application/json',
                            success: function(res) {
                                window.localStorage.isChanged = '0';
                                recordModel.changed = false;
                                nui.ajax({
                                    url: "/ticket/modify/"+ code +"/" + statusCode,
                                    type: "PUT",
                                    async:'false',
                                    contentType: 'application/json',
                                    success: function(res) {
                                        if(res=="0"){
                                            //退票成
                                            window.localStorage.isChanged = '0';
                                            recordModel.changed = '0';
                                            nui.confirm("是否跳转到订单页面","支付完成",function (action){
                                                if(action != "ok"){
                                                    nuiWin.close();
                                                    onSearchTicket();
                                                    return;
                                                }else {
                                                    window.location.assign(location.origin+"/admin/ordermgr");
                                                }
                                            });
                                        }
                                    }
                                })
                            }
                        });

                    } else {
                        nui.ajax({
                            url: "/ticket/modify/"+code+"/" + statusCode,
                            type: "PUT",
                            async:'false',
                            contentType: 'application/json',
                            success: function(res) {
                                if(res=="0"){
                                    nui.confirm("是否跳转到订单页面","支付完成",function (action){
                                        if(action != "ok"){
                                            nuiWin.close();
                                            onSearchTicket();
                                            return;
                                        }else {
                                            window.location.assign(location.origin+"/admin/ordermgr");
                                        }
                                    });
                                }
                            }
                        })
                    }

                } else if(res == "2"){
                    nui.alert("支付失败，此订单取消！", "提示", function(){
                        nuiWin.close();
                        onSearchTicket();
                    });
                }else {
                    nui.alert("余额不足，请选择其他账号！");
                }
            }
        })
    }else{
        nui.alert("请选择账户！");
    }
}

function onOperationRenderer(e) {
    var operHtml = "<div class='icon-row-container'>" +
        "<a onclick='book()' title='预订' functionCode='admin_org_emp_edit_emp'>预订</a>"
    return operHtml;
}
