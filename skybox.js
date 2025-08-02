// skybox.vert
function boxVertexShader() {
  return `
    varying vec3 vWorldPosition;

    void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
}


function boxFragShaderSun() {
  return `
    // skybox.frag
    uniform float time;
    varying vec3 vWorldPosition;

    void main() {
        vec3 dir = normalize(vWorldPosition);

        // Simulate sun rotation based on time
        float sunAngle = mod(time * 0.1, 6.2831); // full 360° loop
        vec3 sunDir = normalize(vec3(sin(sunAngle), cos(sunAngle), 0.0));

        float sunAmount = max(dot(dir, sunDir), 0.0); // how close to sun direction
        float vertical = dir.y * 0.5 + 0.5; // Y coordinate for gradient

        // Colors
        vec3 daySky = mix(vec3(0.5, 0.7, 1.0), vec3(0.2, 0.3, 0.6), vertical); // gradient
        vec3 sunColor = vec3(0.5, 0.2, 0.2);
        vec3 nightSky = vec3(0.05, 0.05, 0.1);

        // Blend day and night based on sun position
        float sunHeight = clamp(sunDir.y, 0.0, 1.0);
        vec3 skyColor = mix(nightSky, daySky, sunHeight);

        // Add glow near the sun
        float glow = pow(sunAmount, 16.0);
        skyColor += glow * sunColor;
        gl_FragColor = vec4(skyColor, 1.0);
    }
  `;
}


function boxFragShader() {
  return `
precision highp float;
varying vec3 vWorldPosition;

uniform float time;

// Hash and noise helpers
float hash(vec3 p) {
    return fract(sin(dot(p ,vec3(127.1, 311.7, 74.7))) * 43758.5453123);
}

float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f*f*(3.0 - 2.0*f);
    
    float n000 = hash(i + vec3(0.0, 0.0, 0.0));
    float n100 = hash(i + vec3(1.0, 0.0, 0.0));
    float n010 = hash(i + vec3(0.0, 1.0, 0.0));
    float n110 = hash(i + vec3(1.0, 1.0, 0.0));
    float n001 = hash(i + vec3(0.0, 0.0, 1.0));
    float n101 = hash(i + vec3(1.0, 0.0, 1.0));
    float n011 = hash(i + vec3(0.0, 1.0, 1.0));
    float n111 = hash(i + vec3(1.0, 1.0, 1.0));

    return mix(
        mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
        mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
        f.z
    );
}

// Fractal Brownian Motion
float fbm(vec3 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amp * noise(p);
        p *= 2.0;
        amp *= 0.5;
    }
    return value;
}

void main() {
    vec3 dir = normalize(vWorldPosition);

    float speed = 0.09;
    float nebula = fbm(dir * 4.0 + time * speed);

    // density
    nebula *= 0.9;

    // Optional radial falloff from center
    // float falloff = 1.0 - pow(length(dir.xy), 2.0);
    // nebula *= falloff;

    // Color palette: soft purples and blues
    vec3 base = vec3(0.03, 0.02, 0.07);
    vec3 glow1 = vec3(0.2, 0.1, 0.4);
    vec3 glow2 = vec3(0.4, 0.3, 0.8);

    vec3 color = base + nebula * glow1 + pow(nebula, 2.0) * glow2;

    float redShift = 0.5 + 0.5 * sin(time * 0.1); // oscillates between 0 and 1
    color.r *= redShift;
    color.b *= redShift;


    gl_FragColor = vec4(color, 1.0);
}

  `;
}



function createSkybox(THREE) {
  const skyboxMaterial = new THREE.ShaderMaterial({
    vertexShader: boxVertexShader(),
    fragmentShader: boxFragShader(),
    uniforms: {
      time: { value: 0.0 }
    },
    side: THREE.BackSide,
    depthWrite: false
  });
  // const skybox = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 1000), skyboxMaterial);
  const skybox = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 32), skyboxMaterial);
  return { skyboxMaterial, skybox };
}
