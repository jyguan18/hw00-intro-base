import Drawable from "../rendering/gl/Drawable";
import { vec3, vec4 } from "gl-matrix";
import { gl } from "../globals";

class Cube extends Drawable {
  buffer: ArrayBuffer;
  indices: Uint32Array;
  positions: Float32Array;
  normals: Float32Array;
  center: vec4;

  constructor(center: vec3) {
    super();
    this.center = vec4.fromValues(center[0], center[1], center[2], 1);
  }

  create() {
    this.positions = new Float32Array([
      // Front (+Z)
      -1, -1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1,

      // Back (-Z)
      -1, -1, -1, 1, -1, 1, -1, 1, 1, 1, -1, 1, 1, -1, -1, 1,

      // Top (+Y)
      -1, 1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1,

      // Bottom (-Y)
      -1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, -1, -1, 1, 1,

      // Right (+X)
      1, -1, -1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, -1, 1, 1,

      // Left (-X)
      -1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, 1, -1, 1,
    ]);

    this.normals = new Float32Array([
      // Front (+Z)
      0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,

      // Back (-Z)
      0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,

      // Top (+Y)
      0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0,

      // Bottom (-Y)
      0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0,

      // Right (+X)
      1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,

      // Left (-X)
      1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
    ]);

    this.indices = new Uint32Array([
      0,
      1,
      2,
      0,
      2,
      3,
      // front

      4,
      7,
      6,
      4,
      6,
      5, // back

      8,
      9,
      10,
      8,
      10,
      11, // top

      12,
      15,
      14,
      12,
      14,
      13, // bottom

      16,
      17,
      18,
      16,
      18,
      19, // right

      20,
      23,
      22,
      20,
      22,
      21, // left
    ]);

    this.generateIdx();
    this.generatePos();
    this.generateNor();

    this.count = this.indices.length;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
    gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

    console.log(`Created cube`);
  }
}

export default Cube;
