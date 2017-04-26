const { cos, PI: pi, random, sin, sqrt } = Math

const DEFAULT_CENTER = { x: 0, y: 0, z: 0 }

export default class Vec3 {
  constructor ({ x, y, z }) {
    Object.assign(this, { x, y, z })
  }

  add (other) {
    return new Vec3({
      x: this.x + other.x,
      y: this.y + other.y,
      z: this.z + other.z
    })
  }

  scale (scalar) {
    return new Vec3({
      x: this.x * scalar,
      y: this.y * scalar,
      z: this.z * scalar
    })
  }

  magnitude () {
    const { x, y, z } = this

    return sqrt(x * x + y * y + z * z)
  }

  normalize () {
    const mag = this.magnitude()

    return new Vec3({
      x: this.x / mag,
      y: this.y / mag,
      z: this.z / mag
    })
  }

  cross (other) {
    return new Vec3({
      x: this.y * other.z - other.y * this.z,
      y: this.x * other.z - other.x * this.z,
      z: this.x * other.y - other.x * this.y
    })
  }

  static randomInRadius (radius, center = DEFAULT_CENTER) {
    const ro    = random() * radius
    const theta = random() * pi * 2
    const phi   = random() * pi

    return new Vec3({
      x: center.x + ro * cos(theta) + cos(phi),
      y: center.y + ro * sin(theta) + cos(phi),
      z: center.z + ro * cos(phi)
    })
  }
}
