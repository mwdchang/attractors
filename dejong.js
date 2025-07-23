class DeJong {
  constructor() {
    this.name = 'DeJong';
    this.iterations = 12000;
    this.multiplier = 25;
    this.type = 'cloud';
    this.reset();
  }

  reset(random = false) {
    if (random === false) {
      this.x = 0; 
      this.y = 0;
      this.a = -2.0;
      this.b = -2.0;
      this.c = -1.2;
      this.d = 2.0;
    } else {
      this.x = 0;
      this.y = 0;
      this.a = -2.0 - Math.random();
      this.b = -2.0;
      this.c = -1.2;
      this.d = Math.random() + 1;
    }
  }

  getPosition() {
    return { x: this.x, y: this.y, z: 0 }
  }


  getParameters() {
    return { a: this.a, b: this.b, c: this.c, d: this.d };
  }

  next() {
    let xnew = Math.sin(this.a * this.y) - Math.cos(this.b * this.x);
    let ynew = Math.sin(this.c * this.x) - Math.cos(this.d * this.y);
    this.x = xnew;
    this.y = ynew;
  }
}
