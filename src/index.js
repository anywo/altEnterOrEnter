(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === "object") {
    // Node, CommonJS之类的
    module.exports = factory();
  } else {
    // 浏览器全局变量(root 即 window)
    root.altEnterOrEnter = factory();
  }
})(this, function () {
  function handleKeydown(e, binding) {
    if (
      e.keyCode == 13 ||
      (e.code && e.code.toLowerCase() == "Enter") ||
      (e.key && e.key.toLowerCase() == "Enter")
    ) {
      if (e.altKey) {
        const currI = getCursortPosition(e.target);
        const oldVal = e.target.value;
        e.target.value = `${oldVal.slice(0, currI)}\n${oldVal.slice(currI)}`;
        setCaretPosition(e.target, currI + 1);
        e.target.dispatchEvent(new CustomEvent('input'));
      } else {
        binding.value && binding.value(e);
      }
      e.preventDefault();
    }
  }

  // js文本框获取设置文本内容光标位置
  // https://jingyan.baidu.com/article/2fb0ba40e69be700f2ec5f88.html
  /**
   * 获取当前光标位置
   * @param ctrl
   * @returns {number}
   */
  function getCursortPosition(element) {
    var CaretPos = 0;
    if (document.selection) {
      //支持IE
      element.focus();
      var Sel = document.selection.createRange();
      Sel.moveStart("character", -element.value.length);
      CaretPos = Sel.text.length;
    } else if (element.selectionStart || element.selectionStart == "0")
      //支持firefox
      CaretPos = element.selectionStart;
    return CaretPos;
  }

  /**
   * 设置光标位置
   * @param ctrl  需要设置对象
   * @param pos 对象中内容的光标的所在位置小标从0开始
   */
  function setCaretPosition(element, pos) {
    if (element.setSelectionRange) {
      element.focus();
      element.setSelectionRange(pos, pos);
    } else if (element.createTextRange) {
      var range = element.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  }

  function bind(el, binding) {
    el.addEventListener("keydown", (e) => handleKeydown(e, binding));
  }
  return {
    bind,
    mounted: bind,
  };
});
