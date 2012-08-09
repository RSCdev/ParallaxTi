var clouds = [], hills = [], BackgroundScene, ForegroundScene, Direction = 'L', ForegroundSpeed = 0;
function createClouds() {
	var self = Ti.UI.createView({top:0,left:-250,width:1000,height:250});
	for (x=0;x<20;x++) {
		clouds[x] = Ti.UI.createView({
			width	: Math.floor(Math.random()*250),
			height	: Math.floor(Math.random()*250),
			backgroundColor	: '#33CCFF',
			top		: 10,
			left	: 50*x
		});
		self.add(clouds[x]);
	}
	return self;
}

function createHills() {
	var self = Ti.UI.createView({bottom:0,left:-250,width:1000,height:150});
	for (x=0;x<20;x++) {
		hills[x] = Ti.UI.createView({
			width	: Math.floor(Math.random()*150),
			height	: Math.floor(Math.random()*150),
			backgroundColor	: '#009966',
			bottom	: 10,
			left	: 50*x
		});
		self.add(hills[x]);
	}
	return self;
}

function changeDirection() {
	ForegroundSpeed = 0;
	if (Direction == 'L') {
		Direction = 'R';
	} else {
		Direction = 'L';
	}
	setTimeout(changeDirection,Math.floor(Math.random()*5000));
}

function handleInteractions() {
}

function renderScene() {
		ForegroundSpeed++;
		if (ForegroundSpeed == 5) {
			switch(Direction) {
				case 'L':
					ForegroundScene.left = ForegroundScene.left - 1;
					break;
				case 'R':
					ForegroundScene.left = ForegroundScene.left + 1;
					break
			}
			ForegroundSpeed = 0;
		}
		switch(Direction) {
			case 'L':
				BackgroundScene.left = BackgroundScene.left - 1;
				break;
			case 'R':
				BackgroundScene.left = BackgroundScene.left + 1;
				break
		}
}

var timeAtLastFrame = new Date().getTime();
var idealTimePerFrame = 1000 / 30;
var leftover = 0.0;
var frames = 0;
function tick() {
	var timeAtThisFrame = new Date().getTime();
    var timeSinceLastDoLogic = (timeAtThisFrame - timeAtLastFrame) + leftover;
    var catchUpFrameCount = Math.floor(timeSinceLastDoLogic / idealTimePerFrame);
    for(i = 0 ; i < catchUpFrameCount; i++){
        handleInteractions();
        frames++;
    }
    renderScene();
    leftover = timeSinceLastDoLogic - (catchUpFrameCount * idealTimePerFrame);
    timeAtLastFrame = timeAtThisFrame;
}

function runApplication() {
	BackgroundScene = createClouds();
	
	ForegroundScene = createHills();
	
	win.add(BackgroundScene);
	win.add(ForegroundScene);
	
	changeDirection();
	
    setInterval(tick, 1000/30);
}

var win = Ti.UI.createWindow();
	win.fullscreen = true;
	win.orientationModes = [Ti.UI.LANDSCAPE_LEFT,Ti.UI.LANDSCAPE_RIGHT];
	win.open();
	
runApplication();