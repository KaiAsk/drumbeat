let beat, analyzer;

function preload() {
    beat = loadSound('632218__golovlevsound__motorcycle-bmw-engine-rev-underground-garage.wav');
}

function setup() {
    let myCanvas = createCanvas(600, 400);
    myCanvas.parent('myContainer');
    analyzer = new p5.Amplitude();
    analyzer.setInput(beat);
}

function mousePressed() {
    if (beat.isPlaying()) {
        beat.stop();
    } else {
        beat.loop();
    }
}

function draw() {
    erase();
    ellipse(width / 2, height / 2, 220, 220);
    noErase();

    let rms = 0
    if (analyzer.getLevel()){
        rms = analyzer.getLevel();
    }

    fill(lerpColor(color(0, 255, 0), color(255, 0, 0), map(rms, 0, 0.3, 0, 1, true)));
    stroke(0);
    ellipse(width / 2, height / 2, 10 + rms * 200, 10 + rms * 200);
}
