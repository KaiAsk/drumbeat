let beat, analyzer;
let trace = [];

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
    background(220);

    let rms = 0
    if (analyzer.getLevel()){
        rms = analyzer.getLevel();
    }

    trace.push(rms);
    if (trace.length > width) {
        trace.shift();
    }

    let c = lerpColor(color(0, 255, 0), color(255, 0, 0), map(rms, 0, 0.3, 0, 1, true));

    noFill();
    stroke(c);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < trace.length; i++) {
        vertex(i, height - 20 - map(trace[i], 0, 0.3, 0, 150, true));
    }
    endShape();

    strokeWeight(1);
    fill(c);
    stroke(0);
    ellipse(width / 2, height / 2 - 40, 10 + rms * 200, 10 + rms * 200);
}
