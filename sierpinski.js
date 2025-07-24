// https://en.wikipedia.org/wiki/Barnsley_fern
class Sierpinski {
  constructor() {
    this.name = 'Sierpinski';
    this.iterations = 12000;
    this.multiplier = 15.0;
    this.type = 'cloud';
    this.reset();
  }

  reset(random = false) {
    const vary = (v) => {
      return Math.random() > 0.5 ? v * Math.random() : -v * Math.random();
    };

    this.x = 0; 
    this.y = 0;
    this.z = 0;

    this.p1 = [vary(8), vary(8), vary(8)];
    this.p2 = [vary(8), vary(8), vary(8)];
    this.p3 = [vary(8), vary(8), vary(8)];
  }

  getPosition() {
    return { x: this.x, y: this.y, z: 0 };
  }

  getParameters() {
    return { p1: this.p1, p2: this.p2, p3: this.p3 };
  }

  next() {
    const r = Math.random();
    if (r < 0.33) {
      this.x = 0.5 * (this.x + this.p1[0]);
      this.y = 0.5 * (this.y + this.p1[1]);
      this.z = 0.5 * (this.z + this.p1[2]);
    } else if (r < 0.66) {
      this.x = 0.5 * (this.x + this.p2[0]);
      this.y = 0.5 * (this.y + this.p2[1]);
      this.z = 0.5 * (this.z + this.p2[2]);
    } else {
      this.x = 0.5 * (this.x + this.p3[0]);
      this.y = 0.5 * (this.y + this.p3[1]);
      this.z = 0.5 * (this.z + this.p3[2]);
    }
  }
}
