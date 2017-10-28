var n_layer = 0

var htmlstr = "<div id='calculator'>" +
          "<p>CNNCalculator</p>"  +
          "<p>" +
          "width:" +
"<input type='text' id='width' /></p>" +
"<p>" +
"<button type='button' onclick='addLayer()'>Add a new layer</button>" +
"<button type='button' onclick='calc()'>Calc</button>" +
"<button type='button' onclick='clean()'>Clear</button>" +
"</p><p>" +
"<i>kernel_size,stride,padding</i>" + "</p><div id='layers'></div></div>"

dom = document.createElement('div')
dom.id = 'calculator'
dom.innerHTML = htmlstr
var scripts = document.getElementsByTagName( 'script' );
var me = scripts[ scripts.length - 1 ];
parentNode = me.parentNode
parentNode.appendChild(dom)

function addLayer(){
  //document.getElementById("width").value=Date();
  var para = document.createElement("p")
  para.id = "p_"+n_layer.toString()
  var result = document.createElement("span")
  var newInput = document.createElement("input")

  newInput.type = "text"
  newInput.id = "input_"+n_layer.toString()
  result.id = "result_"+n_layer.toString()

  para.appendChild(newInput)
  para.appendChild(result)
  layers = document.getElementById("layers")
  layers.appendChild(para)

  n_layer += 1
}

function clean(){
  var l = document.getElementById("layers")
  var is_del = true
  var lc = l.childNodes
  for (var i =0;i<lc.length;i++){
    if (lc[i].firstChild.value!="") {lc[i].firstChild.value="";is_del=false;}
  }
  if (is_del){
    while(l.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        l.removeChild(layers.firstChild);
    }
    n_layer = 0
  }
}

function calc(){
  var layers = document.getElementById("layers")
  var lc = layers.childNodes
  var x = document.getElementById("width").value

  var xs = [x]
  var cs = [1]
  var ws = [1]

  if (isNaN(parseInt(x))){
    alert ("width must be a Integer");
    return;
  }
  for (var i=0;i<lc.length;i++){
    if (lc[i].firstChild.value=="") break;
    var ksp = lc[i].firstChild.value.split(',').map(y=>parseInt(y))
    if (ksp.length!=3) {alert("Invalid input.");break;}
    k = ksp[0]
    s = ksp[1]
    p = ksp[2]
    xs[xs.length] = parseInt((xs[xs.length-1]-k+2*p)/s) + 1
    cs[cs.length] = cs[cs.length-1]+(k-1)*ws[ws.length-1]
    ws[ws.length] = s*ws[ws.length-1]

    result = document.getElementById("result_"+i.toString())
    result.innerHTML = " size: "+xs[xs.length-1]+"    Rf: "+cs[cs.length-1]+"    stride: "+ws[ws.length-1]
  }
}
