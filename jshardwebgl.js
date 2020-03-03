"use strict";

var vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

// all shaders have a main function
void main() {

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

var fragmentShaderSource = `#version 300 es

precision mediump float;

uniform vec4 u_color;


// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = u_color;
}
`;
    var k=50;
    var l=20;
    function Easy()
    {
      k=50;
      l=20;
    }
    function Medium()
    {
      k=20;
      l=30;
    }
    function Hard()
    {
      k=10;
      l=50;
    }

function main() {
  // Get A WebGL context
  var canvas = document.getElementById("c");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  // Use our boilerplate utils to compile the shaders and link into a program
  var program = webglUtils.createProgramFromSources(gl,
      [vertexShaderSource, fragmentShaderSource]);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // look up uniform locations
  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  var colorLocation = gl.getUniformLocation(program, "u_color");

  // Create a buffer
  var positionBuffer = gl.createBuffer();

  // Create a vertex array object (attribute state)
  var vao = gl.createVertexArray();

  // and make it the one we're currently working with
  gl.bindVertexArray(vao);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset);


    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);

    // Pass in the canvas resolution so we can convert from
    // pixels to clipspace in the shader
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
 
    
    var y11=250;
    function firstrect()
    {

      setRectangle(
          gl,600,y11,5,120);

      gl.uniform4f(colorLocation,0,0.2,0.2,1);
      var primitiveType = gl.TRIANGLES;
      var offset = 0;
      var count = 6;
      gl.drawArrays(primitiveType, offset, count);

      return y11;
    }

    function otherrect()
    {
      setRectangle(
          gl, 580,200,5,220);

      gl.uniform4f(colorLocation,0,0.2,0.2,1);
      var primitiveType = gl.TRIANGLES;
      var offset = 0;
      var count = 6;
      gl.drawArrays(primitiveType, offset, count);


      setRectangle(
          gl, 820,200,5,220);

      gl.uniform4f(colorLocation,0,0.2,0.2,1);
      var primitiveType = gl.TRIANGLES;
      var offset = 0;
      var count = 6;
      gl.drawArrays(primitiveType, offset, count);
    }

    var x33=605;
    var y33=230;

    function smallrect()
    {
      setRectangle(
          gl, x33,y33,7,7);

      gl.uniform4f(colorLocation,0,0,0,1);
      var primitiveType = gl.TRIANGLES;
      var offset = 0;
      var count = 6;
      gl.drawArrays(primitiveType, offset, count);

      return(x33,y33);
    }

    firstrect();
    otherrect();
    smallrect();

    var score2=0;

    var ID1=0;
    var ID2=0;
    var ID5=0;
    var ID6=0;
    var ID7=0;
    var ID8=0;
    var ID=0;

    var seconds=0;
    function timepassed()
    {
      seconds=seconds+1;
      document.getElementById("score1").innerHTML="Seconds="+seconds;
    }

    ID=window.setInterval(timepassed,1000);
    
  

    function movedown()
    {
      window.clearInterval(ID2);
      window.clearInterval(ID1);
     ID1= window.setInterval(function(){
       otherrect();
      if(y11<300)   
       firstrect(y11=y11+10);
      else
      {
        window.clearInterval(ID1);
        firstrect();
      }
    },k);
    }

    function moveup()
    {
      window.clearInterval(ID2);
      window.clearInterval(ID1);
      ID2=window.setInterval(function(){
        otherrect();
        if(y11>200)
          firstrect(y11=y11-10);
        else
        {
          window.clearInterval(ID2);
          firstrect();
        }
      },k);
    }


   function smallright()
    {
      window.clearInterval(ID5);
      window.clearInterval(ID6); 
      ID5=window.setInterval(function(){
        otherrect();
        firstrect(y11);
        if(x33==595&&y33>=y11&&y33<y11+120)
          smallleft();
        else if(x33<815)
          smallrect(x33=x33+10,y33);
        else
        {
          window.clearInterval(ID5);
          smallleft();
        }
      },k);
   }

    function smallleft()
    {
      window.clearInterval(ID5);
      window.clearInterval(ID6);
      ID6=window.setInterval(function(){
        otherrect();
        firstrect(y11);
        if(x33>=615)
          smallrect(x33=x33-10,y33);
        else if(x33==605)
        {
          if(y33>=y11&&y33<y11+120)
          {
            window.clearInterval(ID6);
            smallright();
          }
          else
          smallrect(x33=x33-10,y33); 
        }
        else if(x33==595)
          smallrect(x33=x33-10,y33);
        else
        {
          score2=score2+1;
          window.clearInterval(ID6);
          smallright();
          document.getElementById("score2").innerHTML="Score(II)="+score2;
          if(seconds>=80)
          {
            document.getElementById("win").innerHTML="<h2>Game Over!!<h2><p>You won</p> <button onclick=\"reload()\">Play Again</button>"
            score2=0;
            seconds=0;
            window.clearInterval(ID1);
            window.clearInterval(ID2);
            window.clearInterval(ID5);
            window.clearInterval(ID6);
            window.clearInterval(ID7);
            window.clearInterval(ID8);
            window.clearInterval(ID); 
          }
          if(score2==l&&seconds<=80)
          {
            document.getElementById("win").innerHTML="<h2>Game Over!!<h2><p>You loose </p> <button onclick=\"reload()\">Play Again</button>"
            score2=0;
            seconds=0;
            window.clearInterval(ID1);
            window.clearInterval(ID2);
            window.clearInterval(ID5);
            window.clearInterval(ID6);
            window.clearInterval(ID7);
            window.clearInterval(ID8);
            window.clearInterval(ID);
          }
          
        }
      },k);
    }


    function smallup()
    {
      window.clearInterval(ID8);
      ID7=window.setInterval(function()
      {
        otherrect();
        firstrect(y11);
        if(y33>200)
          y33=y33-10;
        else
          smalldown();
      },k);
    }

    function smalldown()
    {
      window.clearInterval(ID7);
      ID8=window.setInterval(function()
      {
        otherrect();
        firstrect(y11);
        if(y33<420)
          y33=y33+10;
        else
          smallup();
      },k);
    }
  
    smallright();
    smallup();
    
    window.addEventListener("keydown",function(event)
    {
      if(event.keyCode==38)
      {
        window.clearInterval(ID1);
        moveup();
      }
      if(event.keyCode==40)
      {
        window.clearInterval(ID2);
        movedown();
      }
    });
  }
  

    


// Fill the buffer with the values that define a rectangle.
function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}
function reload(){
	location.reload();
}

