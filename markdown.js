var build = function(str){
  var h1 = {
    reg:/((\n)\#|^\#)([^#].*?)(\n\n|\n$)/g,
    html: '$2<h1 class="title1">$3</h1>$4'
  }
  var h2 = {
    reg: /\#\#([^#].*?)(\n\n|\n$)/g,
    html: '<h2 class="title2">$1</h2>$2'
  }
  var p = {
    reg: /\n\n+?(([^\#^\`^\-]|[.])[\s\S^\n]*?)(\n)/g,
    html: function(m,a,c,b){
      return '\n\n<p class="line">'+a+'</p>' + b
    }
  }
  var title = {
    reg: /(\n\#+|^\#+)\s([^\#]*?)\n/g,
    html: function(m,a,content){
      var n = a.split('#').length - 1
      return '\n<h' + n + ' class="title'+ n +'">'+ content +'</h' + n +'>\n'
    }
  }
  var link = {
    reg: /[^\\]\[([\s\S]*?)\]\(([\s\S]*?)\)/g,
    html: function(m,txt,src){
      return '<a href="'+ src +'" target="_blank">'+ txt +'</a>'
    }
  }
  var ol = {
    reg: /(\n\n\-|^\-)\s([\s\S])*?(\n\n|\n$)/mg,
    html: function(m,a,txt,n){
      console.log(m,'mmmmmmmmmmmm');
      var rez = m.replace(/\-([\S\s]*?)\n/g,'\t<li>$1</li>\n')
      return '\n\n<ol class="items">'+ rez +'</ol>' + n
    }
  }
  var code = {
    reg: /(\n\n\`\`\`|^\`\`\`)([\s\S]*?)\n([\S\s\n]*?)\`\`\`/g,
    html: function(m,a,type,code){
      code = code.replace(/(\#[\s\S]*?)\n/g,'<span class="zs">$1</span>\n')
      return '\n\n<div class="code '+type+'">\n'+code+'</div>'
    }
  }
  var rez = str.replace(/\r\n?/g, "\n")
  .replace(p.reg,p.html)
  .replace(title.reg,title.html)
  .replace(ol.reg,ol.html)
  .replace(code.reg,code.html)
  .replace(link.reg,link.html)
              //  .replace(h1.reg,h1.html)
              //  .replace(h2.reg,h2.html)
  // var rez = str.split(/\r/)
  console.log(rez);
}
require('fs').readFile('./README.md',function(err,data){
  build(data.toString())
})
