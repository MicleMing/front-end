var Game={};
var Game={
	circles:[],
	lines:[],
	Levels:[],
	targetCircle:undefined,
	radius:10,
	currentLevel:0,
	thinLine:1,
	boldLine:5,
	}
 Game.Levels=[
	{
		level:0,
		circles:[
		{x:20,y:213},
		{x:34,y:121},
		{x:231,y:356},
		{x:322,y:23}
		],
		relationship:{
		0:{connectPoints:[1,2,3]},
		1:{connectPoints:[0,3]},
		2:{connectPoints:[1,3]},
		3:{connectPoints:[0,1,2]}
		}
	},
	{
		level:1,
		circles:[
		{x:410,y:73},
		{x:88,y:214},
		{x:400,y:240},
		{x:84,y:72}
		],
		relationship:{
		0:{connectPoints:[2,3]},
		1:{connectPoints:[0,2,3]},
		2:{connectPoints:[1,3]},
		3:{connectPoints:[0,1,2]}
		}		
	},
	{
		level:2,
		circles:[
		{x:92,y:85},
		{x:253,y:13},
		{x:393,y:286},
		{x:390,y:214},
		{x:248,y:275},
		{x:95,y:216}
		],
		relationship:{
		0:{connectPoints:[2,3,4]},
		1:{connectPoints:[3,5]},
		2:{connectPoints:[0,4,5]},
		3:{connectPoints:[0,1,5]},
		3:{connectPoints:[0,2]},
		3:{connectPoints:[1,2,3]}
		}				
	}
	];
//圆
function Circle(x,y,radius){
	this.x=x;
	this.y=y;
	this.radius=radius;
}

//画一个圆
function DrawCircle(ctx,x,y,radius){
	var circle_gradient=ctx.createRadialGradient(x-3,y-3,1,x,y,radius);
	circle_gradient.addColorStop(0,"#fff");
	circle_gradient.addColorStop(1,"#cc0");
	ctx.fillStyle=circle_gradient;
	
	ctx.beginPath();
	ctx.arc(x,y,radius,Math.PI*2,0,true);
	ctx.closePath();
	ctx.fill();
}

//存储圆的信息
function inputCircles(){
	var level=Game.Levels[Game.currentLevel];
    Game.circles.length=0;//清空数组
	for(var i=0;i<level.circles.length;i++){
		Game.circles.push(new Circle(level.circles[i].x,level.circles[i].y,10));
		}
}

//线
function Line(startPoint,endPoint,thickness){
	this.startPoint=startPoint;
	this.endPoint=endPoint;
	this.thickness=thickness;
}

//画线
function DrawLine(ctx,x1,y1,x2,y2,thickness){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineWidth=thickness;
	ctx.strokeStyle="#cfc";
	ctx.stroke();
}
//存储线的信息
function inputLines(){
	var level=Game.Levels[Game.currentLevel];
	//alert(level.length);
	Game.lines.length=0;
	for(var i in level.relationship){
		var connectedPoints=level.relationship[i].connectPoints;
		var startPoint=Game.circles[i];
		for(var j in connectedPoints){
			var endPoint=Game.circles[connectedPoints[j]];			
			Game.lines.push(new Line(startPoint,endPoint,Game.thinLine));
			}
		}
	//alert(Game.lines.length);
}
//按下鼠标
function onmousedown(){
	$("#game").mousedown(function(e){
		var canvasposition=$(this).offset();
		var mouseX=(e.pageX-canvasposition.left)||0;
		var mouseY=(e.pageY-canvasposition.top)||0;
		for(var i=0;i<Game.circles.length;i++){
			var circleX=Game.circles[i].x;
			var circleY=Game.circles[i].y;
			var radius=Game.circles[i].radius;
			if(Math.pow(mouseX-circleX,2)+Math.pow(mouseY-circleY,2)<Math.pow(radius,2)){
				Game.targetCircle=i;
				break;
				}
			}
		})
}

//拖动鼠标
function onmouseover(){

	$("#game").mousemove(function(e){
		if(Game.targetCircle!=undefined){			
			var canvasposition=$(this).offset();
			var mouseX=(e.pageX-canvasposition.left)||0;
			var mouseY=(e.pageY-canvasposition.top)||0;
			var radius=Game.radius;
			Game.circles[Game.targetCircle]=new Circle(mouseX,mouseY,radius);
			}			
			inputLines();
			updateLine();
			updateProgress();
		});
}

//放开鼠标
function onmouseup(){
	$("#game").mouseup(function(e){
		Game.targetCircle=undefined;
		if(checkComplete()){
			setTimeout(function(){
				setupCurrentLevel();
				inputCircles();
				inputLines();				
				},1000);			

			}
		})
}

//清除上下文内容
function clear(){
	var canvas=document.getElementById("game");
	var ctx=canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

//检查两直线是否交叉
function isIntersersect(line1,line2){
	var a1=line1.endPoint.y-line1.startPoint.y;
	var b1=line1.startPoint.x-line1.endPoint.x;
	var c1=a1*line1.startPoint.x+b1*line1.startPoint.y;
	
	var a2=line2.endPoint.y-line2.startPoint.y;
	var b2=line2.startPoint.x-line2.endPoint.x;
	var c2=a2*line2.startPoint.x+b2*line2.startPoint.y;
	
	var d=a1*b2-a2*b1;
	
	if(d==0){
		return false;
	}
	else{
		var x=(b2*c1-b1*c2)/d;
		var y=(a1*c2-a2*c1)/d;	
			//检测截点是否在两条线段之上
		if((isInBetween(line1.startPoint.x,x,line1.endPoint.x)||isInBetween(line1.startPoint.y,y,line1.endPoint.y))&&(isInBetween(line2.startPoint.x,x,line2.endPoint.x)||isInBetween(line2.startPoint.y,y,line2.endPoint.y))){
			return true;
			}
		}
}

function isInBetween(a,b,c){
	if(Math.abs(a-b)<0.000001||Math.abs(b-c)<0.000001){
		return false;
		}
	return ((a<b&&b<c)||(c<b&&b<a));
}

//如果直线相交，则显示粗线条
function updateLine(){
	for(var i=0;i<Game.lines.length;i++){
		for(var j=i;j<Game.lines.length;j++){
			var line1=Game.lines[i];
			var line2=Game.lines[j];
			if(isIntersersect(line1,line2)){
				line1.thickness=Game.boldLine;
				line2.thickness=Game.boldLine;
				}
		}
	}
}

//设置关卡
function setupCurrentLevel(){
	if(Game.currentLevel+1<Game.Levels.length)
	    Game.currentLevel++;
	else{
		alert("您已经通过全部关卡！");
		}
}

//检测是否过关
function checkComplete(){
	
	if($("#progress").html()=="100")
		return true;
	else{
		return false;
		}
}
//设置进度
function updateProgress(){
	var progress=0;
	for(var i=0;i<Game.lines.length;i++){
		if(Game.lines[i].thickness==Game.thinLine)
			progress++;
		}
	var progressPercentage=Math.floor(progress/Game.lines.length*100);
	$("#progress").html(progressPercentage);
	$("#level").html(Game.currentLevel);
}
//循环
function gameloop(){
	var canvas=document.getElementById("game");
	var ctx=canvas.getContext("2d");
	
	clear();
	
	//画线
	for(var i=0;i<Game.lines.length;i++){
		var startPoint=Game.lines[i].startPoint;
		var endPoint=Game.lines[i].endPoint;
		var thickness=Game.lines[i].thickness;
		DrawLine(ctx,startPoint.x,startPoint.y,endPoint.x,endPoint.y,thickness);		
	}
	
	//画圆	
	for(var i=0;i<Game.circles.length;i++){
		DrawCircle(ctx,Game.circles[i].x,Game.circles[i].y,Game.circles[i].radius);
		}		
}


$(document).ready(function(){
	var canvas=document.getElementById("game");
	var ctx=canvas.getContext("2d");
	//画圆
	inputCircles();
	for(var i=0;i<Game.circles.length;i++){
		DrawCircle(ctx,Game.circles[i].x,Game.circles[i].y,Game.circles[i].radius);
		}
	//画线 
	inputLines();
	for(var i=0;i<Game.lines.length;i++){
		var startPoint=Game.lines[i].startPoint;
		var endPoint=Game.lines[i].endPoint;
		DrawLine(ctx,startPoint.x,startPoint.y,endPoint.x,endPoint.y,Game.thinLine);
		}
	
	//鼠标事件
	onmousedown();
	onmouseover();
	onmouseup();
	//设置循环
	setInterval(gameloop,30);
	})
	