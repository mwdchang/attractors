class Rossler {
  constructor() {
    this.name = 'Rossler';
    this.iterations = 10000;
    this.multiplier = 3.0;
    this.type = 'line';
    this.reset();
  }

  reset(random = false) {
    if (random === false) {
      this.x = 0.0; 
      this.y = 0.0;
      this.z = 0.0; 
      this.a = 0.2;
      this.b = 0.2;
      this.c = 14;
    } else {
      this.x = 0.0; 
      this.y = 0.0;
      this.z = 0.0; 
      this.a = 0.1 + 0.1 * Math.random();
      this.b = 0.1 + 0.2 * Math.random();
      this.c = 10 + 6 * Math.random();
    }
  }

  getPosition() {
    return { x: this.x, y: this.y, z: this.z };
  }

  getParameters() {
    return { a: this.a, b: this.b, c: this.c };
  }

  next() {
    const t = 0.02; 
    const xt = t * (-this.y - this.z);
    const yt = t * (this.x + this.a * this.y);
    const zt = t * (this.b + this.z * (this.x - this.c));
    this.x = this.x + xt;
    this.y = this.y + yt;
    this.z = this.z + zt;
  }
}
