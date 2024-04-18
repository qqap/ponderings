// HyperMD, copyright (c) by laobubu
// Distributed under an MIT license: http://laobubu.net/HyperMD/LICENSE
//

(function (mod){ //[HyperMD] UMD patched!
    /*commonjs*/  ("object"==typeof exports&&"undefined"!=typeof module) ? mod(exports, require("mermaid"), require("hypermd/addon/fold-code")) :
    /*amd*/       ("function"==typeof define&&define.amd) ? define(["exports","mermaid","hypermd/addon/fold-code"], mod) :
    /*plain env*/ mod((this.HyperMD_PowerPack = this.HyperMD_PowerPack || {}, this.HyperMD_PowerPack.mermaid = this.HyperMD_PowerPack.mermaid || {}), HyperMD.FoldCode);
  })(function (exports, _$MOD1) {
    var registerRenderer = _$MOD1.registerRenderer;
  
//   var mermaid = mermaid__ || window['mermaid'];
  var mermaidIdPrefix = "_mermaid_" + Math.random().toString(36).slice(2, 18) + "_";
  var mermaidCounter = 0;
  var mermaidRenderer = function (code, info) {
      var id = mermaidIdPrefix + (mermaidCounter++).toString(36);
      var el = document.createElement('div');
      el.setAttribute('id', id);
      el.setAttribute('class', 'hmd-fold-code-image hmd-fold-code-mermaid');
    //   mermaid.render(id, code, function (svgCode, bindFunctions) {
    //       el.innerHTML = svgCode;
    //       el.removeAttribute('id');
    //       bindFunctions(el);
    //       info.changed();
    //   });
    el.innerHTML = "<img src='https://www.plantuml.com/plantuml/svg/" + encode64(zip_deflate(unescape(encodeURIComponent(code)), 9)) + "' />";
    
    
      return el;
  };
//   if (mermaid) {
      registerRenderer({
          name: "mermaid",
          pattern: /^plantuml$/i,
          renderer: mermaidRenderer,
          suggested: true,
      });
//   }
//   else {
//       console.error("[hypermd-mermaid] mermaid not found.");
//   }
  
  exports.mermaidRenderer = mermaidRenderer;
  });

  function encode64(data) {
    r = "";
    for (i=0; i<data.length; i+=3) {
         if (i+2==data.length) {
            r +=append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
        } else if (i+1==data.length) {
            r += append3bytes(data.charCodeAt(i), 0, 0);
        } else {
            r += append3bytes(data.charCodeAt(i), data.charCodeAt(i+1),
                data.charCodeAt(i+2));
        }
    }
    return r;
}

function append3bytes(b1, b2, b3) {
    c1 = b1 >> 2;
    c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
    c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
    c4 = b3 & 0x3F;
    r = "";
    r += encode6bit(c1 & 0x3F);
    r += encode6bit(c2 & 0x3F);
    r += encode6bit(c3 & 0x3F);
    r += encode6bit(c4 & 0x3F);
    return r;
}

function encode6bit(b) {
    if (b < 10) {
         return String.fromCharCode(48 + b);
    }
    b -= 10;
    if (b < 26) {
         return String.fromCharCode(65 + b);
    }
    b -= 26;
    if (b < 26) {
         return String.fromCharCode(97 + b);
    }
    b -= 26;
    if (b == 0) {
         return '-';
    }
    if (b == 1) {
         return '_';
    }
    return '?';
}