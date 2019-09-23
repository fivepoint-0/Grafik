exports.Perceptron = class {
  constructor() {
    // Init random weights
    this.weights = [];
    this.learningRate = 0.000001;
    for (let i = 0; i < 2; i++) {
      this.weights[i] = Math.random();
    }
  }

  guess(inputs) {
    let sum = 0;
    this.weights.forEach((val, index, _) => {
      sum += inputs[index] * val;
    });

    // Math.sign is the Activation function for this example.
    let output = Math.sign(sum);

    return output;
  }

  train(inputs, target) {
    let _guess = this.guess(inputs);
    let error = target - _guess;

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += inputs[i] * error * this.learningRate;
    }
  }
}
