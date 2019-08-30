class Lorenz {
  constructor() {
    this.name = 'Lorenz';
    this.iterations = 8000;
    this.multiplier = 1.0;
    this.type = 'line';
    this.reset();
  }

  reset(random = false) {
    if (random === false) {
      this.x = 0.1; 
      this.y = 0;
      this.z = 0; 
      this.a = 10.0;
      this.b = 28.0;
      this.c = 8.0 / 3.0;
    } else {
      this.x = 0.1; 
      this.y = 0;
      this.z = 0; 
      this.a = 5.0 + Math.random()*5;
      this.b = 14.0 + Math.random()*14;
      this.c = 8.0 / 3.0;
    }
  }

  getPosition() {
    return { x: this.x, y: this.y, z: this.z };
  }

  next() {
    const t = 0.01; 
    const xt = t * this.a * (this.y - this.x);
    const yt = t * (this.x * (this.b - this.z) - this.y);
    const zt = t * (this.x * this.y - this.c * this.z);
    this.x = this.x + xt;
    this.y = this.y + yt;
    this.z = this.z + zt;
  }
}
