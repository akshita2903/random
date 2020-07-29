var can=document.getElementById("canvas");
//creating a 2d drawing object ct for can object
var ct=can.getContext("2d");
//calculating the radius of clock using height of canvas
var radius=can.height/2;
//making clock adjustable for all walls
ct.translate(radius,radius);
//reducing the radius of clock by 90% so that it can perfectly fit into canvas object
radius=radius*.90;
//creating a funcion to draw a clock
setInterval(drawclock,1000);
function drawclock()
{
  ct.arc(0,0,radius,0,2*Math.PI);
   ct.fillStyle="red";
   ct.fill();
   drawFace(ct,radius);
   drawNumber(ct,radius);
   drawTime(ct,radius);
   
}
drawclock();
function drawFace(ct,radius)
{
    //drawing the inner structure of clock using beginpath
    ct.beginPath();
    ct.arc(0,0,radius,0,2*Math.PI);
    ct.fillStyle="grey";
    ct.fill();
    grad = ct.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
/*creating 3D effect in clock by adding 3 color stops for outer,middle,inner edge
of arc*/
grad.addColorStop(0, '#333');
grad.addColorStop(0.5, 'white');
grad.addColorStop(1, '#333');
ct.strokeStyle=grad;
ct.lineWidth = radius*0.1;
  ct.stroke();
  //drawing the centre of clock
  ct.beginPath();
  ct.arc(0,0,radius*0.1,0,2*Math.PI);
  ct.fillStyle="black";
  ct.fill();
  
}
//creating function drawNumber to display numbers on clock
function drawNumber(ct,radius){
    var ang,num;
    //setting the font size of numbers
    ct.font=radius*0.15 +"px arial";
    //setting the text alignment to middle and centre of print position
    ct.textBaseline = "middle";
ct.textAlign = "center";
//Calculate the print position (for 12 numbers) to 85% of the radius, rotated (PI/6) for each number:
for(num=1;num<=12;num++)
{
    ang=num*Math.PI/6;
    ct.rotate(ang);
    ct.translate(0,-0.85*radius);
    ct.rotate(-ang);
    ct.fillText(num.toString(),0,0);
    ct.rotate(ang);
    ct.translate(0, radius * 0.85);
    ct.rotate(-ang);
}
}
function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ct, hour, radius*0.5, radius*0.07);
    //minute
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ct, minute, radius*0.8, radius*0.07);
    // second
    second = (second*Math.PI/30);
    drawHand(ct, second, radius*0.9, radius*0.02);
  }
  function drawHand(ct, pos, length, width) {
    ct.beginPath();
    ct.lineWidth = width;
    ct.lineCap = "round";
    ct.moveTo(0,0);
    ct.rotate(pos);
    ct.lineTo(0, -length);
    ct.stroke();
    ct.rotate(-pos);
  }
  