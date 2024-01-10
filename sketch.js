
function setup() {
  createCanvas(windowWidth, windowHeight);
  hg=new HexGrid(12)
  // colorMode(HSB);
}

function draw() {
  // blendMode(BLEND)
  background(0);
  colorMode(HSB)
  hg.run()
  colorMode(RGB)
}

function HexGrid(w){
  var h;
  var step,vStep;
  var spots=[];
  w=12;
  step=width/w;
  vStep=step*sin(PI/3);
  h=floor(height/vStep);

  this.run=function(){
    blendMode(ADD)
    noFill();
    var s,sw;
    strokeJoin(ROUND)
    for(var j=0; j<h; j++){
      for(var i=0; i<w; i++){
        var r1=noise(i/10, j/10+frameCount/80)*step*1;
        var r2=noise(i/10, j/10-frameCount/90)*step*1;
        var r3=noise(i/10+frameCount/100, j/10)*step*1;
        var sw1=r2/3;
        var sw2=r3/3;
        var sw3=r1/3;
        push();
        stroke(340,80,80);
        strokeWeight(sw1);
        dhex((i+(j%2===0?0.75:0.25))*step, (j+0.75)*vStep, r1);
        stroke(50,80,80);
        strokeWeight(sw2);
        dhex((i+(j%2===0?0.75:0.25))*step, (j+0.75)*vStep, r2);
        stroke(200,80,80);
        strokeWeight(sw3);
        dhex((i+(j%2===0?0.75:0.25)  )*step, (j+0.75)*vStep, r3);
        pop();
      }
    }
    blendMode(BLEND)
  }
}

function dhex(x,y,r){
  r*=0.75
  beginShape()
  let aStep=PI/3
  for(let i=0; i<6; i++){
    a=aStep*i
    vertex(x+cos(a+PI/2)*r, y+sin(a+PI/2)*r)
  }
  endShape(CLOSE)
  // ellipse(x,y,r)
}