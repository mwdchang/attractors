// https://en.wikipedia.org/wiki/Barnsley_fern
class Barnsley {
  constructor() {
    this.name = 'Barnsley';
    this.iterations = 4000;
    this.multiplier = 8.0;
    this.type = 'cloud';
    this.reset();
  }

  reset() {
    this.x = 0.0;
    this.y = 0.0;

    const vary = (v) => {
      v = Math.abs(v);
      return -v + Math.random() * v * 2.0;
    }

    let f1_a = 0;
    let f1_b = 0; 
    let f1_c = 0;
    let f1_d = 0;
    let f1_e = 16;
    let f1_f = 0;
    this.f1 = (x, y) => {
      return [
        f1_a * x + f1_b * y + f1_e,
        f1_c * x + f1_d * y + f1_f
      ];
    }

    let f2_a = 0.85 + vary(0.3);
    let f2_b = 0.04 + vary(0.3); 
    let f2_c = -0.04 + vary(0.2);
    let f2_d = 0.85 + vary(0.2);
    let f2_e = 0.0;
    let f2_f = 1.60;
    this.f2 = (x, y) => {
      return [
        f2_a * x + f2_b * y + f2_e,
        f2_c * x + f2_d * y + f2_f
      ];
    }

    let f3_a = 0.20;
    let f3_b = -0.26;
    let f3_c = 0.23;
    let f3_d = 0.22;
    let f3_e = 0.0;
    let f3_f = 1.60;
    this.f3 = (x, y) => {
      return [
        f3_a * x + f3_b * y + f3_e,
        f3_c * x + f3_d * y + f3_f
      ];
    }

    let f4_a = -0.15;
    let f4_b = 0.28;
    let f4_c = 0.26;
    let f4_d = 0.24;
    let f4_e = 0.0;
    let f4_f = 0.44;
    this.f4 = (x, y) => {
      return [
        f4_a * x + f4_b * y + f4_e,
        f4_c * x + f4_d * y + f4_f
      ];
    } }

  getPosition() {
    return { x: this.x, y: this.y, z: 0 }
  }

  next() {
    const r = Math.random();
    let newXY = [];
    if (r <= 0.01) {
      newXY = this.f1(this.x, this.y);
    } else if (r > 0.01 && r <= 0.86) {
      newXY = this.f2(this.x, this.y);
    } else if (r > 0.86 && r <= 0.93) {
      newXY = this.f3(this.x, this.y);
    } else {
      newXY = this.f4(this.x, this.y);
    }
    this.x = newXY[0];
    this.y = newXY[1];
  }
}
