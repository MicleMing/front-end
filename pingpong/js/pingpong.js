// JavaScript Document
var key={
    up:38,
	down:40,
	w:87,
	s:83
	};
var pingpong={};
pingpong.presskeys=[];
pingpong.ball={
	speed:3,
	x:150,
	y:100,
	width:20,
	derctionX:1,
	derctionY:1
	};
var score={
	scoreA:0,
	scoreB:0
	}
function init(){
	$("#paddleA").css("top","70px");
	$("#paddleB").css("top","100px");
}
function game()
{
	pingpong.timer=setInterval(gameloop,30);
	$(document).keydown(function(e){
		
		pingpong.presskeys[e.which]=true;
		});
	$(document).keyup(function(e){
		pingpong.presskeys[e.which]=false;
		});
}
function gameloop(){
	movePaddles();
	moveBall();
	}
function movePaddles()
{
	//alert(key.up+":"+pingpong.presskeys[key.up]);
	var paddleTop=parseInt($("#playground").css("height"))-parseInt($(".paddle").css("height"));
	if(pingpong.presskeys[key.up])
	{
		
		var top=parseInt($("#paddleA").css("top"));
		if(top>0)
		{
			$("#paddleA").css("top",top-5);
		}
		
	}
	if(pingpong.presskeys[key.down])
	{
		var down=parseInt($("#paddleA").css("top"));
		if(down<paddleTop){
			$("#paddleA").css("top",down+5);
			}
		
	}
		if(pingpong.presskeys[key.w])
	{
		var top=parseInt($("#paddleB").css("top"));
		if(top>0){
			$("#paddleB").css("top",top-5);
			}
		
	}
	if(pingpong.presskeys[key.s])
	{
		var down=parseInt($("#paddleB").css("top"));
		if(down<paddleTop)
		{
			$("#paddleB").css("top",down+5);
		}		
	}
}
function moveBall(){
	var playwidth=parseInt($("#playground").css("width"));
	var playheight=parseInt($("#playground").css("height"));
	var paddleAleft=parseInt($("#paddleA").css("left"))+parseInt($("#paddleA").css("width"));
	var paddleBleft=parseInt($("#paddleB").css("left"));
	var paddleAtop=parseInt($("#paddleA").css("top"));
	var paddleBtop=parseInt($("#paddleB").css("top"))
	var paddleAbottom=parseInt($("#paddleA").css("top"))+parseInt($("#paddleA").css("height"));
	var paddleBbottom=parseInt($("#paddleB").css("top"))+parseInt($("#paddleB").css("height"));
	var ballLeft=pingpong.ball.x+pingpong.ball.speed*pingpong.ball.derctionX;
	var ballTop=pingpong.ball.y+pingpong.ball.speed*pingpong.ball.derctionY;
	//碰到右边边界，A赢一球
	if(ballLeft+pingpong.ball.width>=playwidth)
	{
		pingpong.ball.x=300;
		pingpong.ball.y=150;
		$("#ball").css({"top":pingpong.ball.y,"left":pingpong.ball.x});
		pingpong.ball.derctionX*=1;
		score.scoreA++;
		$("#A").html("A:"+score.scoreA);
	}
	//B赢一球
	if(ballLeft<=0)
	{
		pingpong.ball.x=300;
		pingpong.ball.y=150;
		$("#ball").css({"top":pingpong.ball.y,"left":pingpong.ball.x});
		pingpong.ball.derctionX*=-1;
		score.scoreB++;
		$("#B").html("B:"+score.scoreB);
	}
	
	if(ballTop<=0||ballTop+pingpong.ball.width>=playheight)
	{
		pingpong.ball.derctionY*=-1;
	}
	if(ballLeft<=paddleAleft)
	{
		if(ballTop>=paddleAtop&&ballTop<=paddleAbottom)
		{
			
			pingpong.ball.derctionX=1;
		}
	}
	if(ballLeft+pingpong.ball.width>=paddleBleft)
	{
		if(ballTop>=paddleBtop&&ballTop<=paddleBbottom)
		{
			pingpong.ball.derctionX=-1;
		}
	}
   pingpong.ball.x=pingpong.ball.x+pingpong.ball.speed*pingpong.ball.derctionX;
   pingpong.ball.y=pingpong.ball.y+pingpong.ball.speed*pingpong.ball.derctionY; 
   $("#ball").css({"left":pingpong.ball.x,"top":pingpong.ball.y});

}
$(document).ready(function(){
	init()
	game();
	}
)