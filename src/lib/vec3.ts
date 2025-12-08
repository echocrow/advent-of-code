// biome-ignore-all lint/suspicious/noUnsafeDeclarationMerging: need to narrow inherited property

import {posMod} from './math.js'
import {type Vec3 as BaseVec3, VecSet} from './vec.js'

type InputVec3 = readonly [x: number, y: number, z: number]

export interface Vec3
  extends BaseVec3,
    Omit<InstanceType<typeof Vec3Cls>, keyof Array<any>> {}

const v3 = {
  add(a: InputVec3, b: InputVec3): Vec3 {
    return vec3(a[0] + b[0], a[1] + b[1], a[2] + b[2])
  },
  subtract(a: InputVec3, b: InputVec3): Vec3 {
    return vec3(a[0] - b[0], a[1] - b[1], a[2] - b[2])
  },

  min(a: InputVec3, b: InputVec3): Vec3 {
    return vec3(
      Math.min(a[0], b[0]),
      Math.min(a[1], b[1]),
      Math.min(a[2], b[2]),
    )
  },
  max(a: InputVec3, b: InputVec3): Vec3 {
    return vec3(
      Math.max(a[0], b[0]),
      Math.max(a[1], b[1]),
      Math.max(a[2], b[2]),
    )
  },

  len(v: InputVec3): number {
    return Math.sqrt(v3.len2(v))
  },
  len2(v: InputVec3): number {
    return v[0] ** 2 + v[1] ** 2 + v[2] ** 2
  },

  taxiLen(v: InputVec3): number {
    return Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[2])
  },

  parse(s: string): Vec3 {
    const [x = '', y = '', z = ''] = s.split(',', 3)
    return vec3(Number(x), Number(y), Number(z))
  },

  via(v: InputVec3): Vec3 {
    Object.setPrototypeOf(v, Vec3Cls.prototype)
    return v as unknown as Vec3
  },
  from(v: InputVec3): Vec3 {
    return vec3(v[0], v[1], v[2])
  },
}

// biome-ignore lint/correctness/noUnusedVariables: false positive
interface Vec3Cls {
  0: number
  1: number
  2: number
  length: 3
}
class Vec3Cls extends Array {
  // Patch default string format.
  static name = 'Vec'

  add(v: InputVec3) {
    return v3.via(v3.add(this, v))
  }

  subtract(v: InputVec3) {
    return v3.via(v3.subtract(this, v))
  }

  scale(f: number) {
    return vec3(this[0] * f, this[1] * f, this[2] * f)
  }

  invert() {
    return vec3(-this[0], -this[1], -this[2])
  }

  mod(mod: InputVec3) {
    return vec3(
      posMod(this[0], mod[0]),
      posMod(this[1], mod[1]),
      posMod(this[2], mod[2]),
    )
  }

  lerp(to: InputVec3, f: number) {
    return vec3(
      this[0] + f * (to[0] - this[0]),
      this[1] + f * (to[1] - this[1]),
      this[2] + f * (to[2] - this[2]),
    )
  }

  min(v: InputVec3): Vec3 {
    return v3.via(v3.min(this, v))
  }

  max(v: InputVec3): Vec3 {
    return v3.via(v3.max(this, v))
  }

  get isZero(): boolean {
    return !this[0] && !this[1] && !this[2]
  }

  get len(): number {
    return v3.len(this)
  }
  get len2(): number {
    return v3.len2(this)
  }

  get taxiLen(): number {
    return v3.taxiLen(this)
  }

  equals(v: InputVec3): boolean {
    return this[0] === v[0] && this[1] === v[1] && this[2] === v[2]
  }

  fmt() {
    return `${this[0]},${this[1]},${this[2]}`
  }
}

export class Vec3Set extends VecSet<Vec3> {
  constructor(vecs?: Iterable<Vec3>) {
    super(vecs, v3.via)
  }
}

function vec3(x = 0, y = 0, z = 0): Vec3 {
  // @ts-expect-error TS does not support the overloaded ArrayConstructor with multiple arguments for the array items.
  return new Vec3Cls(x, y, z)
}
export default Object.assign(vec3, v3)
