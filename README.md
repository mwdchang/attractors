## Attractors
A collection of strange attractors and other mathematically generated things.



### Adding attractor
An attractor class implements these methods

```js
class AttractorXYZ {
  constructor() {
    // set multiplier, type and other attributes
  }

  reset(random = false) {
    // setup the attractor's parameters and initial position
  }

  getPosition() {
    // returns xyz-coord
  }

  getParameters() {
    // returns a json or string representation of the attractor's config
  }

  next() {
    // update xyz-coord for the next iteration/step
  }
}
```
