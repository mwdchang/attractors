class Halvorsen {
  constructor() {
    this.name = 'Halvorsen';
    this.iterations = 15000;
    this.multiplier = 5.5;
    this.type = 'line';
    this.reset();
  }

  reset(random = false) {

    const vary = (v) => {
      return Math.random() > 0.5 ? v * Math.random() : -v * Math.random();
    };

    if (random === false) {
      this.x = 0.1; 
      this.y = 0.0;
      this.z = 0.0; 
      this.a = 1.4;
    } else {
      this.x = 0.1; 
      this.y = 0.0 + vary(0.1);
      this.z = 0.0; 
      this.a = 1.4 + vary(0.1);
    }
  }

  getPosition() {
    return { x: this.x, y: this.y, z: this.z };
  }

  getParameters() {
    return { a: this.a };
  }

  next() {
    const t = 0.002; 
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const a = this.a;
    const dx = -a * x - (4 * y) - (4 * z) - y * y;
    const dy = -a * y - (4 * z) - (4 * x) - z * z;
    const dz = -a * z - (4 * x) - (4 * y) - x * x;
    
    this.x = this.x + t * dx;
    this.y = this.y + t * dy;
    this.z = this.z + t * dz;
  }
}
