export function MainSketch(canvas) {
  canvas.looping = false;

  class Point {
    constructor() {
      this.x = Math.round(Math.random() * width);
      this.y = Math.round(Math.random() * height);

      this.label = this.x > this.y ? -1 : 1;
    }

    show() {
      canvas.stroke(0);
      this.label == 1 ? canvas.fill(255) : canvas.fill(0);
      canvas.ellipse(this.x, this.y, 16, 16);
    }
  }

  canvas.brain = new Perceptron();
  canvas.points = [];

  canvas.setupDom = function() {
    canvas.Main = canvas.createDiv();
    canvas.Main.id("MainDiv");

    canvas.setupCanvasActions(canvas.Main);
  };

  canvas.setup = function() {
    for (let i = 0; i < 250; i++) {
      canvas.points.push(new Point());
    }
    canvas.createCanvas(width, height);
    canvas.frameRate(3);
    canvas.setupDom();
    canvas.noLoop();
  };

  canvas.setupCanvasActions = function(parent) {
    let buttons = [
      {
        text: "Toggle Loop",
        onclick() {
          if (canvas.looping) {
            canvas.noLoop();
          } else {
            canvas.loop();
          }
          canvas.looping = !canvas.looping;
          
        }
      },
      {
        text: "Reset",
        onclick() {
          canvas.points = [];
          canvas.brain = new Perceptron();
          for (let i = 0; i < 250; i++) {
            canvas.points.push(new Point());
          }
          canvas.draw()
        }
      }
    ];

    buttons.forEach(button => {
      let domButton = canvas.createButton(button.text);
      domButton.mousePressed(button.onclick);
      parent.child(domButton);
    });
  };

  canvas.draw = function() {
    correct = 0;
    wrong = 0;
    canvas.background(220);
    canvas.stroke(0);
    canvas.line(0, 0, width, height);
    canvas.points.forEach(point => point.show());
    canvas.points.forEach(point => {
      let inputs = [point.x, point.y];
      let target = point.label;
      canvas.brain.train(inputs, target);
      let brainGuess = canvas.brain.guess(inputs);

      if (brainGuess == target) {
        canvas.fill(0, 255, 0);
        correct += 1;
      } else {
        canvas.fill(255, 0, 0);
        wrong += 1;
      }

      canvas.noStroke();
      canvas.ellipse(point.x, point.y, 8, 8);
    });

    notifyCurrentTime();
  };
};

function notifyCurrentTime() {
  if (delegate !== undefined) {
    const message = p5.hour() + ":" + p5.minute() + ":" + p5.second();

    delegate(message);
  }
}

export function setDelegate(_delegate) {
  delegate = _delegate;
}