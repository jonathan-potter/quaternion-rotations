import Vec3 from 'math/vec3'

const {sin, cos, sqrt} = Math

export default class Quaternion {
  constructor (r, i, j, k) {
    Object.assign(this, { r, i, j, k })
  }

  inverse () {
    const { r, i, j, k } = this

    return new Quaternion(r, -i, -j, -k)
  }

  add (q2) {
    const { r: a1, i: b1, j: c1, k: d1 } = this
    const { r: a2, i: b2, j: c2, k: d2 } = q2

    return new Quaternion(a1 + a2, b1 + b2, c1 + c2, d1 + d2)
  }

  multiply (q2) {
    const { r: a1, i: b1, j: c1, k: d1 } = this
    const { r: a2, i: b2, j: c2, k: d2 } = q2

    return new Quaternion(
      a1 * a2 - b1 * b2 - c1 * c2 - d1 * d2,
      a1 * b2 + b1 * a2 + c1 * d2 - d1 * c2,
      a1 * c2 - b1 * d2 + c1 * a2 + d1 * b2,
      a1 * d2 + b1 * c2 - c1 * b2 + d1 * a2
    )
  }

  magnitude () {
    const { r, i, j, k } = this
    return sqrt(r * r + i * i + j * j + k * k)
  }

  rotationVector (angle) {
    const { r, i, j, k } = this

    let magnitude = this.magnitude()
    let real = cos(angle / 2)
    let scalar = sin(angle / 2) / magnitude

    return new Quaternion(real + scalar * r, i * scalar, j * scalar, k * scalar)
  }

  rotateAroundCurrentAxis (angle, rotatedVector) {
    let u = this.rotationVector(angle)

    return u.multiply(rotatedVector).multiply(u.inverse())
  }

  toVec3 () {
    return new Vec3({
      x: this.i,
      y: this.j,
      z: this.k
    })
  }

  static fromVec3 ({ x, y, z }) {
    return new Quaternion(0, x, y, z)
  }
}
