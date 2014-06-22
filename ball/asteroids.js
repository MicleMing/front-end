// JavaScript Document
$(document).ready(function(){
	var canvas=$("#mycanvas");
	var context=canvas.get(0).getContext("2d");
	
	var canvasWidth=canvas.width();
	var canvasHeight=canvas.height();
	
	$(window).resize(resizeCanvas);
	
	function resizeCanvas()
	{
		canvas.attr("width",$(window).get(0).innerWidth);
		canvas.attr("height",$(window).get(0).innerHeight);
		
		canvasWidth=canvas.width();
		canvasHeight=canvas.height();
	};
	resizeCanvas();	
	
	var playAinimation=true;
	
	var startButton=$("#startAnimation");
	var stopButton=$("#stopAnimation");
	
	startButton.hide();
	startButton.click(function(){
		$(this).hide();
		stopButton.show();
		playAinimation=true;
		animation();
		}
	);
		stopButton.click(function(){
		$(this).hide();
		startButton.show();
		playAinimation=false;
		}
	);
	var asteroid=function(x,y,vx,vy,ax,ay,radius){
		this.x=x;
		this.y=y;
		this.vx=vx;
		this.vy=vy;
		this.ax=ax;
		this.ay=ay;
		this.radius=radius;
		};
		
	var asteroids=new Array();
	for(var i=0;i<10;i++)
	{
		var x=20+(Math.random()*canvasWidth-40);
		var y=20+(Math.random()*canvasHeight-40);
		var vx=Math.random()*4-2;
		var vy=Math.random()*4-2;
		var ax=Math.random()*0.2-0.1;
		var ay=Math.random()*0.2-0.1;
		var radius=5+Math.random()*10;
		asteroids.push(new asteroid(x,y,vx,vy,ax,ay,radius));
	};
	
	function animation(){
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context.fillStyle="rgb(255,255,255)";
		
		var asteroidsLength=asteroids.length;
		for(var i=0;i<asteroidsLength;i++){
			var tempasteroid=asteroids[i];
			if(tempasteroid.x-tempasteroid.radius<0)
			{
				tempasteroid.x=tempasteroid.radius;
				tempasteroid.vx*=-1;
			}
			else if(tempasteroid.x+tempasteroid.radius>canvasWidth)
			{
				tempasteroid.x=canvasWidth-tempasteroid.radius;
				tempasteroid.vx*=-1;
			};
			if(tempasteroid.y-tempasteroid.radius<0)
			{
				tempasteroid.y=tempasteroid.radius;
				tempasteroid.vy*=-1;
			}
			else if(tempasteroid.y+tempasteroid.radius>canvasHeight)
			{
			    tempasteroid.y=canvasHeight-tempasteroid.radius;
				tempasteroid.vy*=-1;
			}
			tempasteroid.vx+=tempasteroid.ax;
			tempasteroid.vy+=tempasteroid.ay;
			tempasteroid.x+=tempasteroid.vx;
			tempasteroid.y+=tempasteroid.vy;
			context.beginPath();
			context.arc(tempasteroid.x,tempasteroid.y,tempasteroid.radius,0,Math.PI*2,false);
			context.closePath();
			context.fill();
			}
			if(playAinimation)
			{
				setTimeout(animation,33);
			}
			
		};
		animation();
});


	
	