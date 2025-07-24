// https://en.wikipedia.org/wiki/Barnsley_fern
class Clifford{
  constructor() {
    this.name = 'Clifford';
    this.iterations = 9000;
    this.multiplier = 30.0;
    this.type = 'cloud';
    this.reset();
  }

  reset(random = false) {
    const vary = (v) => {
      return Math.random() > 0.5 ? v * Math.random() : -v * Math.random();
    };

    if (random === false) {
      this.x = 0; 
      this.y = 0;
      this.a = -1.4;
      this.b = 1.6;
      this.c = 1.0;
      this.d = 0.7;
    } else {
      this.x = 0;
      this.y = 0;
      this.a = -1.4 + vary(0.2);
      this.b = 1.6 + vary(0.2);
      this.c = 1.0;
      this.d = 0.7 + vary(0.2);
    }

  }

  getPosition() {
    return { x: this.x, y: this.y, z: 0 };
  }

  getParameters() {
    return { a: this.a, b: this.b, c: this.c, d: this.d };
  }

  next() {
    const xnew = Math.sin(this.a * this.y) + this.c * Math.cos(this.a * this.x);
    const ynew = Math.sin(this.b * this.x) + this.d * Math.cos(this.b * this.y);
    this.x = xnew;
    this.y = ynew;
  }
}
