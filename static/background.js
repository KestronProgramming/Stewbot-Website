let circuitSpeed = 1;
let binSpeedDivider = 25;
let possibleXs = [];
let objs = [];
let canvas;
const designScale = [1280, 720]

class Bin {
    constructor() {
        this.x = possibleXs[floor(random(possibleXs.length))];
        this.y = -random(height);
        this.num = floor(random(2));
        this.s = floor(random(1, 25));
    }

    display() {
        fill(0, 215, 255);
        textSize(this.s);
        text(this.num, this.x, this.y);

        this.y += this.s / binSpeedDivider;
        if (this.y > height + 20) {
            this.y = -20;
        }
    }
}

class Circuit {
    constructor() {
        this.dir = floor(random(4));
        this.x1 = random(width);
        this.y1 = random(height);
        this.loc2 = random(this.dir === 0 || this.dir === 2 ? width : height);

        this.startPos = createVector(
            this.dir === 0 || this.dir === 2
                ? this.x1
                : this.dir === 1
                ? -20
                : width + 20,
            this.dir === 1 || this.dir === 3
                ? this.y1
                : this.dir === 0
                ? -20
                : height + 20
        );
        this.intsectPos = this.startPos.copy();
        this.endPos = this.startPos.copy();
        this.targetPos = this.startPos.copy();
        this.step = 0;
        this.t = 255;
    }

    display() {
        fill(0, 255, 0, this.t);
        stroke(0, 255, 0, this.t);
        strokeWeight(1);
        line(
            this.startPos.x,
            this.startPos.y,
            this.intsectPos.x,
            this.intsectPos.y
        );
        line(
            this.intsectPos.x,
            this.intsectPos.y,
            this.endPos.x,
            this.endPos.y
        );
        noStroke();

        switch (this.step) {
            case 0:
                this.endPos.set(this.intsectPos);
                this.intsectPos.x +=
                    Math.sign(this.x1 - this.intsectPos.x) * circuitSpeed;
                this.intsectPos.y +=
                    Math.sign(this.y1 - this.intsectPos.y) * circuitSpeed;

                if (
                    dist(
                        this.intsectPos.x,
                        this.intsectPos.y,
                        this.x1,
                        this.y1
                    ) < 5
                ) {
                    this.step = 1;
                    this.targetPos.set(
                        this.dir === 0 || this.dir === 2
                            ? this.loc2
                            : this.intsectPos.x,
                        this.dir === 1 || this.dir === 3
                            ? this.loc2
                            : this.intsectPos.y
                    );
                    this.endPos.set(this.intsectPos);
                }
                break;

            case 1:
                this.endPos.x +=
                    Math.sign(this.targetPos.x - this.endPos.x) * circuitSpeed;
                this.endPos.y +=
                    Math.sign(this.targetPos.y - this.endPos.y) * circuitSpeed;

                if (
                    dist(
                        this.endPos.x,
                        this.endPos.y,
                        this.targetPos.x,
                        this.targetPos.y
                    ) < 5
                ) {
                    this.step = 2;
                }
                break;

            case 2:
                ellipse(this.endPos.x, this.endPos.y, 10, 10);
                this.t -= circuitSpeed;
                break;
        }
    }
}

function setup() {
    // const canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas = createCanvas(designScale[0], designScale[1]);
    windowResized();
    canvas.elt.id = "backgroundCanvas";
    frameRate(60);

    // Initialize possible X positions
    possibleXs = [];
    for (let i = 0; i < width; i += 25) {
        possibleXs.push(i);
    }

    // Create initial objects
    objs = [];
    for (let i = 0; i < width / 10; i++) {
        objs.push(new Circuit());
    }

    textFont("monospace");

    for (let i = 0; i < width * 2; i++) {
        objs.push(new Bin());
    }
}

function windowResized() {
    // Determine min scale to fit screen
    let scaleX = designScale[0] / window.innerWidth;
    let scaleY = designScale[1] / window.innerHeight;
    let scale = Math.max(1 / scaleX, 1 / scaleY);
    canvas.style("transform-origin", "0 0");
    canvas.style("scale", scale)
    console.log("==============")
    console.log("Scale:", scale)
    console.log("scaleX:", scaleX)
    console.log("scaleY:", scaleY)
    console.log("Width:", window.innerWidth)
}

function draw() {
    background(0);

    for (let i = objs.length - 1; i >= 0; i--) {
        objs[i].display();

        if (objs[i].t !== undefined && objs[i].t < 0) {
            objs.splice(i, 1);
            objs.push(new Circuit());
        }
    }
}
