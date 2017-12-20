window.onload = function () {
  var canvas = document.getElementById('canvas');
  var clear = document.getElementById('clear');
  var draw = canvas.getContext('2d');
  var obj = {x1:0,x2:0,x3:0,y1:0,y2:0,y3:0,cc:0};
  var shapes = [];

  clear.addEventListener("click",clearCanvas);
  canvas.addEventListener("mousedown",checkCanvas);
  canvas.addEventListener("dblclick",deleteShape);


  //On mouse down check if shape is detected and move it or else draw another shape
  function checkCanvas(event) {
    console.log("MouseDown");
    var sIndex = -1;
    var sDrag = false;
    var a = mx = event.clientX-canvas.offsetLeft;
    var b = my = event.clientY- canvas.offsetTop;
    if(shapes.length>0){
      for (var i = 0; i < shapes.length; i++) {
        var flag = calculateArea(i,mx,my);
        if (flag === true) {
          sIndex = i;
          sDrag = true;
        }
      }
    }
    if(sDrag == true) {
      canvas.onmousemove = function (event) {
        event.preventDefault();
        var cx = event.clientX - canvas.offsetLeft - a;
        var cy = event.clientY - canvas.offsetTop - b;
        moveTriangle(cx,cy,shapes,sIndex,obj);
        a = event.clientX-canvas.offsetLeft;
        b = event.clientY-canvas.offsetTop;
      }
      canvas.onmouseup = function () {
        canvas.onmousemove = null;
        sDrag = false;
      }
    } else{
      var color = randomColorCode();
        canvas.onmousemove = function (event){
          event.preventDefault();
          var cx = event.clientX - canvas.offsetLeft;
          var cy = event.clientY - canvas.offsetTop;
          draw.clearRect(0,0,canvas.width,canvas.height);
          reDraw();
          drawTraingle(mx,my,cx,cy,color);
        }
      canvas.onmouseup = function (event) {
        canvas.onmousemove = null;
          if (event.clientX - canvas.offsetLeft != mx && event.clientY - canvas.offsetTop != my) {
            shapes.push(obj);
        }
      }
    }
  }


  function calculateArea(i,mx,my) {
    var s = shapes;
    a = Math.abs(triangleArea(s[i].x1,s[i].y1,s[i].x2,s[i].y2,s[i].x3,s[i].y3));
    a1 = Math.abs(triangleArea(mx,my,s[i].x1,s[i].y1,s[i].x2,s[i].y2));
    a2 = Math.abs(triangleArea(mx,my,s[i].x2,s[i].y2,s[i].x3,s[i].y3));
    a3 = Math.abs(triangleArea(mx,my,s[i].x3,s[i].y3,s[i].x1,s[i].y1));
    var A = a1 + a2 + a3;
    if (a === A && A !== 0) {
      return true;
    }else {
      return false;
    }
  };

  function triangleArea(x1,y1,x2,y2,x3,y3) {
    return ((x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2);
  };


  function drawTraingle(mx,my,cx,cy,color) {
    var s = Math.round(Math.sqrt(Math.pow((cx-mx),2) + Math.pow((cy-my),2)));
    var h = Math.round(Math.sqrt(Math.pow(s,2) - Math.pow(s/2,2)));
    var m = h/2;
    obj = {x1:cx,x2:cx-s/2,x3:cx+s/2,y1:cy-m,y2:cy+m/2,y3:cy+m/2,cc:color};
    draw.fillStyle = color;
    draw.beginPath();
    draw.moveTo(obj.x1,obj.y1);
    draw.lineTo(obj.x2,obj.y2);
    draw.lineTo(obj.x3,obj.y3);
    draw.lineTo(obj.x1,obj.y1);
    draw.fill();
  };


  function moveTriangle(x,y,s,cv,o) {
    s[cv].x1 += x;
    s[cv].x2 += x;
    s[cv].x3 += x;
    s[cv].y1 += y;
    s[cv].y2 += y;
    s[cv].y3 += y;
    draw.clearRect(0,0,canvas.width,canvas.height);
    reDraw();
  }

  function randomColorCode() {
    var x = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    return x;
  };

  function deleteShape(event) {
    var mx = event.clientX - canvas.offsetLeft;
    var my = event.clientY - canvas.offsetTop;
    var f = false;
    var dIndex = null;
    if(shapes.length>0){
    for (var i = 0; i < shapes.length; i++) {
      var f = calculateArea(i,mx,my);
      if (f){
        dIndex = i;
        }
      }
    };
    if (dIndex!==null) {
      shapes.splice(dIndex,1);
      reDraw();
    }
  };

  function reDraw() {
    draw.clearRect(0,0,canvas.width,canvas.height);
    if(shapes.length>0){
      for (var i = 0; i < shapes.length; i++) {
        var obj = shapes[i];
        draw.fillStyle = obj.cc;
        draw.beginPath();
        draw.moveTo(obj.x1,obj.y1);
        draw.lineTo(obj.x2,obj.y2);
        draw.lineTo(obj.x3,obj.y3);
        draw.lineTo(obj.x1,obj.y1);
        draw.fill();
      }
    }
  };


  function clearCanvas() {
    draw.clearRect(0,0,canvas.width,canvas.height);
    shapes = [];
  };
};
