class Aizawa {
  constructor() {
    this.name = 'Aizawa';
    this.iterations = 10000;
    this.multiplier = 20.0;
    this.type = 'line';
    this.reset();
  }

  reset(random = false) {
    const vary = (v) => {
      return Math.random() > 0.5 ? v * Math.random() : -v * Math.random();
    };
    
    if (random === false) {
      this.x = 0.1; 
      this.y = 0.1;
      this.z = 0.1; 
      this.a = 0.95;
      this.b = 0.70;
      this.c = 0.60;
      this.d = 3.50;
      this.e = 0.25;
      this.f = 0.10;
    } else {
      this.x = 0.1; 
      this.y = 0.1;
      this.z = 0.1;
      this.a = 0.95 + vary(0.1);
      this.b = 0.70 + vary(0.2); 
      this.c = 0.60 + vary(0.2);
      this.d = 3.50; 
      this.e = 0.25 + vary(0.2);
      this.f = 0.10;
    }
  }

  getPosition() {
    return { x: this.x, y: this.y, z: this.z };
  }

  getParameters() {
    return { a: this.a, b: this.b, c: this.c, d: this.d, e: this.e, f: this.f };
  }

  next() {
    const t = 0.005; 
    const dx = (this.z - this.b) * this.x - this.d * this.y;
    const dy = this.d * this.x + (this.z - this.b) * this.y;
    const dz = this.c + this.a * this.z - (Math.pow(this.z, 3) / 3) - 
      ((this.x * this.x + this.y * this.y) * (1 + this.e * this.z)) + 
      this.f * this.z * Math.pow(this.x, 3);
    this.x += dx * t;
    this.y += dy * t;
    this.z += dz * t;
  }
}
