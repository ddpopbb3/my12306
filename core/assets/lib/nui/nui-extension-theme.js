(function() {
  var _showMessageBox_old = mini.MessageBox.show;
  mini.MessageBox.show = function(e) {
    var muid = _showMessageBox_old(e);
    var messageBox = mini.getbyUID(muid);
    messageBox && messageBox.setCls("mini-messagebox");
    return muid;
  }
  mini.TextBox.prototype.errorMode = "border";
  mini.Password.prototype.errorMode = "border";
  mini.ComboBox.prototype.errorMode = "border";
  mini.DictComboBox.prototype.errorMode = "border";

  mini.VTypes.nameErrorText = "允许输入字母、数字和特殊字符(-_.),必须以字母开头";
  mini.VTypes.name = function(v) {
    var reg = /^[a-zA-Z]+[a-zA-Z0-9\_\-\.]*$/;
    if (reg.test(v)) {
      return true;
    }
    return false;
  }
  mini.VTypes.labelErrorText = "允许输入中文、字母、数字和特殊字符(-_.#@)";
  mini.VTypes.label = function(v) {
    var reg = /^[a-zA-Z0-9\_\-\.\u4e00-\u9fa5\#\@]+$/;
    if (reg.test(v)) {
      return true;
    }
    return false;
  }
  mini.VTypes.versionErrorText = "版本规则a.b[.c],a和b为最多两位数字,c是可选,可以为字母或者数字或者_-";
  mini.VTypes.version = function(v) {
    var reg = /^\d{1,2}.\d{1,2}((\.)?([a-zA-A0-9\_\-]?))$/;
    if (reg.test(v)) {
      return true;
    }
    return false;
  }
  mini.VTypes.httpErrorText = "非法的http(s)规则";
  mini.VTypes.http = function(v) {
    var reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
    if (reg.test(v)) {
      return true;
    }
    return false;
  }
  mini.VTypes.smtpErrorText = "非法的smtp(pop)规则";
  mini.VTypes.smtp = function(v) {
    var reg = /^[smtp|pop].([\w]+\.)+[\w]+$/;
    if (reg.test(v)) {
      return true;
    }
    return false;
  }
})()