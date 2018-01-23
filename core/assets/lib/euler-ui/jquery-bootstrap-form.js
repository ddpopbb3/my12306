(function($) {
  $.fn.bootstrapForm = function(options) {
    var getValue = function($obj) {
      var type = $obj.attr("type");
      var result;
      switch (type) {
        case "text":
          result = $obj.val();
          break;
        default:
          result = $obj.val();
      }
      return result;
    }
    this.getData = function() {
      var result = [];
      this.find("> .form-group").each(function(id, fg) {
        $(fg).find("input").each(function(inputId, input) {
          var type = $(input).attr("type");
          var $input = $(input);
          result.push({
            name: $input.attr("id") || $input.attr("name"),
            value: getValue($input)
          })
        });
      })
      return result;
    }
    var parsley = this.parsley();
    for (var key in parsley) {
      if (key.substring(0, 1) === "_" || typeof parsley[key] !== 'function') {
        continue;
      }
      this[key] = (function(key) {
        return function() {
          return parsley[key].apply(parsley, arguments);
        }
      })(key)
    }
    return this;
  };

  $.extend(window.Parsley.options, {
    errorClass: "has-error has-danger",
    successClass: "has-success",
    classHandler: function(ParsleyField) {
      return ParsleyField.$element.parent();
    },
    errorsWrapper: '<ul class="list-unstyled"></ul>',
    errorTemplate: '<li></li>',
    errorsContainer: function(ParsleyField) {
      ParsleyField.$element.after('<div class="help-block with-errors"></div>');
      return ParsleyField.$element.next();
    },
  })

}(jQuery));
