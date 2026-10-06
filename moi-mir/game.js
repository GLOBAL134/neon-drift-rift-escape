/**
 * Neon Drift production runtime bundle.
 * Contains the embedded Three.js runtime and the main game bootstrap.
 * The file is intentionally formatted for code review; feature-specific
 * systems are also split into the readable modules beside this bundle.
 */
(() => {
  var tu = 0, hc = 1, nu = 2;
  var uc = 1, iu = 2, Pn = 3, Wn = 0, Wt = 1, Dn = 2, Yn = 0, Ri = 1, Ur = 2, dc = 3, fc = 4, su = 5, ai = 100, ru = 101, ou = 102, au = 103, lu = 104, cu = 200, hu = 201, uu = 202, du = 203, Ro = 204, Co = 205, fu = 206, pu = 207, mu = 208, gu = 209, _u = 210, xu = 211, vu = 212, yu = 213, Mu = 214, la = 0, ca = 1, ha = 2, Ci = 3, ua = 4, da = 5, fa = 6, pa = 7, pc = 0, Su = 1, bu = 2, Zn = 0, Eu = 1, Tu = 2, wu = 3, Nr = 4, Au = 5, Ru = 6, Cu = 7;
  var mc = 300, Ui = 301, Ni = 302, ma = 303, ga = 304, Fr = 306, Io = 1e3, oi = 1001, Po = 1002, Zt = 1003, Iu = 1004;
  var Or = 1005;
  var xn = 1006, _a = 1007;
  var fi = 1008;
  var Mn = 1009, gc = 1010, _c = 1011, Ts = 1012, xa = 1013, pi = 1014, Sn = 1015, ws = 1016, va = 1017, ya = 1018, As = 1020, xc = 35902, vc = 35899, yc = 1021, Mc = 1022, hn = 1023, as = 1026, Rs = 1027, Ma = 1028, Sa = 1029, Sc = 1030, ba = 1031;
  var Ea = 1033, Br = 33776, zr = 33777, kr = 33778, Hr = 33779, Ta = 35840, wa = 35841, Aa = 35842, Ra = 35843, Ca = 36196, Ia = 37492, Pa = 37496, Da = 37808, La = 37809, Ua = 37810, Na = 37811, Fa = 37812, Oa = 37813, Ba = 37814, za = 37815, ka = 37816, Ha = 37817, Va = 37818, Ga = 37819, Wa = 37820, Xa = 37821, qa = 36492, Ya = 36494, Za = 36495, $a = 36283, Ja = 36284, Ka = 36285, Qa = 36286;
  var tr = 2300, Do = 2301, Ao = 2302, Kl = 2400, Ql = 2401, jl = 2402;
  var Pu = 3200, Du = 3201;
  var bc = 0, Lu = 1, $n = "", Vt = "srgb", Ii = "srgb-linear", nr = "linear", at = "srgb";
  var wi = 7680;
  var ec = 519, Uu = 512, Nu = 513, Fu = 514, Ec = 515, Ou = 516, Bu = 517, zu = 518, ku = 519, tc = 35044, ja = 35048;
  var Tc = "300 es", _n = 2e3, ir = 2001;
  var Xn = class {
    addEventListener(e, t) {
      this._listeners === void 0 && (this._listeners = {
      });
      let i = this._listeners;
      i[e] === void 0 && (i[e] = []), i[e].indexOf(t) === - 1 && i[e].push(t)
    }
    hasEventListener(e, t) {
      let i = this._listeners;
      return i === void 0?!1: i[e] !== void 0 && i[e].indexOf(t) !== - 1
    }
    removeEventListener(e, t) {
      let i = this._listeners;
      if (i === void 0)return;
      let s = i[e];
      if (s !== void 0) {
        let r = s.indexOf(t);
        r !== - 1 && s.splice(r, 1)
      }
    }
    dispatchEvent(e) {
      let t = this._listeners;
      if (t === void 0)return;
      let i = t[e.type];
      if (i !== void 0) {
        e.target = this;
        let s = i.slice(0);
        for (let r = 0, o = s.length;
        r < o;
        r++)s[r].call(this, e);
        e.target = null
      }
    }
  }, Nt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], Sh = 1234567, Ks = Math.PI / 180, ls = 180 / Math.PI;
  function Fi() {
    let n = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0;
    return(Nt[n & 255] + Nt[n >> 8 & 255] + Nt[n >> 16 & 255] + Nt[n >> 24 & 255] + "-" + Nt[e & 255] + Nt[e >> 8 & 255] + "-" + Nt[e >> 16 & 15 | 64] + Nt[e >> 24 & 255] + "-" + Nt[t & 63 | 128] + Nt[t >> 8 & 255] + "-" + Nt[t >> 16 & 255] + Nt[t >> 24 & 255] + Nt[i & 255] + Nt[i >> 8 & 255] + Nt[i >> 16 & 255] + Nt[i >> 24 & 255]).toLowerCase()
  }
  function Ye(n, e, t) {
    return Math.max(e, Math.min(t, n))
  }
  function wc(n, e) {
    return(n % e + e) % e
  }
  function Tf(n, e, t, i, s) {
    return i + (n - e) * (s - i) / (t - e)
  }
  function wf(n, e, t) {
    return n !== e?(t - n) / (e - n): 0
  }
  function Qs(n, e, t) {
    return(1 - t) * n + t * e
  }
  function Af(n, e, t, i) {
    return Qs(n, e, 1 - Math.exp( - t * i))
  }
  function Rf(n, e = 1) {
    return e - Math.abs(wc(n, e * 2) - e)
  }
  function Cf(n, e, t) {
    return n <= e?0: n >= t?1: (n = (n - e) / (t - e), n * n * (3 - 2 * n))
  }
  function If(n, e, t) {
    return n <= e?0: n >= t?1: (n = (n - e) / (t - e), n * n * n * (n * (n * 6 - 15) + 10))
  }
  function Pf(n, e) {
    return n + Math.floor(Math.random() * (e - n + 1))
  }
  function Df(n, e) {
    return n + Math.random() * (e - n)
  }
  function Lf(n) {
    return n * (.5 - Math.random())
  }
  function Uf(n) {
    n !== void 0 && (Sh = n);
    let e = Sh += 1831565813;
    return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296
  }
  function Nf(n) {
    return n * Ks
  }
  function Ff(n) {
    return n * ls
  }
  function Of(n) {
    return(n & n - 1) === 0 && n !== 0
  }
  function Bf(n) {
    return Math.pow(2, Math.ceil(Math.log(n) / Math.LN2))
  }
  function zf(n) {
    return Math.pow(2, Math.floor(Math.log(n) / Math.LN2))
  }
  function kf(n, e, t, i, s) {
    let r = Math.cos, o = Math.sin, a = r(t / 2), l = o(t / 2), c = r((e + i) / 2), h = o((e + i) / 2), u = r((e - i) / 2), d = o((e - i) / 2), f = r((i - e) / 2), m = o((i - e) / 2);
    switch (s) {
      case "XYX": n.set(a * h, l * u, l * d, a * c);
      break;
      case "YZY": n.set(l * d, a * h, l * u, a * c);
      break;
      case "ZXZ": n.set(l * u, l * d, a * h, a * c);
      break;
      case "XZX": n.set(a * h, l * m, l * f, a * c);
      break;
      case "YXY": n.set(l * f, a * h, l * m, a * c);
      break;
      case "ZYZ": n.set(l * m, l * f, a * h, a * c);
      break;
      default: console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + s)
    }
  }
  function rs(n, e) {
    switch (e.constructor) {
      case Float32Array: return n;
      case Uint32Array: return n / 4294967295;
      case Uint16Array: return n / 65535;
      case Uint8Array: return n / 255;
      case Int32Array: return Math.max(n / 2147483647, - 1);
      case Int16Array: return Math.max(n / 32767, - 1);
      case Int8Array: return Math.max(n / 127, - 1);
      default: throw new Error("Invalid component type.")
    }
  }
  function Ht(n, e) {
    switch (e.constructor) {
      case Float32Array: return n;
      case Uint32Array: return Math.round(n * 4294967295);
      case Uint16Array: return Math.round(n * 65535);
      case Uint8Array: return Math.round(n * 255);
      case Int32Array: return Math.round(n * 2147483647);
      case Int16Array: return Math.round(n * 32767);
      case Int8Array: return Math.round(n * 127);
      default: throw new Error("Invalid component type.")
    }
  }
  var mi = {
    DEG2RAD: Ks, RAD2DEG: ls, generateUUID: Fi, clamp: Ye, euclideanModulo: wc, mapLinear: Tf, inverseLerp: wf, lerp: Qs, damp: Af, pingpong: Rf, smoothstep: Cf, smootherstep: If, randInt: Pf, randFloat: Df, randFloatSpread: Lf, seededRandom: Uf, degToRad: Nf, radToDeg: Ff, isPowerOfTwo: Of, ceilPowerOfTwo: Bf, floorPowerOfTwo: zf, setQuaternionFromProperEuler: kf, normalize: Ht, denormalize: rs
  }, fe = class n {
    constructor(e = 0, t = 0) {
      n.prototype.isVector2 = !0, this.x = e, this.y = t
    }
    get width() {
      return this.x
    }
    set width(e) {
      this.x = e
    }
    get height() {
      return this.y
    }
    set height(e) {
      this.y = e
    }
    set(e, t) {
      return this.x = e, this.y = t, this
    }
    setScalar(e) {
      return this.x = e, this.y = e, this
    }
    setX(e) {
      return this.x = e, this
    }
    setY(e) {
      return this.y = e, this
    }
    setComponent(e, t) {
      switch (e) {
        case 0: this.x = t;
        break;
        case 1: this.y = t;
        break;
        default: throw new Error("index is out of range: " + e)
      }
      return this
    }
    getComponent(e) {
      switch (e) {
        case 0: return this.x;
        case 1: return this.y;
        default: throw new Error("index is out of range: " + e)
      }
    }
    clone() {
      return new this.constructor(this.x, this.y)
    }
    copy(e) {
      return this.x = e.x, this.y = e.y, this
    }
    add(e) {
      return this.x += e.x, this.y += e.y, this
    }
    addScalar(e) {
      return this.x += e, this.y += e, this
    }
    addVectors(e, t) {
      return this.x = e.x + t.x, this.y = e.y + t.y, this
    }
    addScaledVector(e, t) {
      return this.x += e.x * t, this.y += e.y * t, this
    }
    sub(e) {
      return this.x -= e.x, this.y -= e.y, this
    }
    subScalar(e) {
      return this.x -= e, this.y -= e, this
    }
    subVectors(e, t) {
      return this.x = e.x - t.x, this.y = e.y - t.y, this
    }
    multiply(e) {
      return this.x *= e.x, this.y *= e.y, this
    }
    multiplyScalar(e) {
      return this.x *= e, this.y *= e, this
    }
    divide(e) {
      return this.x /= e.x, this.y /= e.y, this
    }
    divideScalar(e) {
      return this.multiplyScalar(1 / e)
    }
    applyMatrix3(e) {
      let t = this.x, i = this.y, s = e.elements;
      return this.x = s[0] * t + s[3] * i + s[6], this.y = s[1] * t + s[4] * i + s[7], this
    }
    min(e) {
      return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this
    }
    max(e) {
      return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this
    }
    clamp(e, t) {
      return this.x = Ye(this.x, e.x, t.x), this.y = Ye(this.y, e.y, t.y), this
    }
    clampScalar(e, t) {
      return this.x = Ye(this.x, e, t), this.y = Ye(this.y, e, t), this
    }
    clampLength(e, t) {
      let i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(Ye(i, e, t))
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this
    }
    negate() {
      return this.x = - this.x, this.y = - this.y, this
    }
    dot(e) {
      return this.x * e.x + this.y * e.y
    }
    cross(e) {
      return this.x * e.y - this.y * e.x
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y)
    }
    normalize() {
      return this.divideScalar(this.length() || 1)
    }
    angle() {
      return Math.atan2( - this.y, - this.x) + Math.PI
    }
    angleTo(e) {
      let t = Math.sqrt(this.lengthSq() * e.lengthSq());
      if (t === 0)return Math.PI / 2;
      let i = this.dot(e) / t;
      return Math.acos(Ye(i, - 1, 1))
    }
    distanceTo(e) {
      return Math.sqrt(this.distanceToSquared(e))
    }
    distanceToSquared(e) {
      let t = this.x - e.x, i = this.y - e.y;
      return t * t + i * i
    }
    manhattanDistanceTo(e) {
      return Math.abs(this.x - e.x) + Math.abs(this.y - e.y)
    }
    setLength(e) {
      return this.normalize().multiplyScalar(e)
    }
    lerp(e, t) {
      return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
    }
    lerpVectors(e, t, i) {
      return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this
    }
    equals(e) {
      return e.x === this.x && e.y === this.y
    }
    fromArray(e, t = 0) {
      return this.x = e[t], this.y = e[t + 1], this
    }
    toArray(e = [], t = 0) {
      return e[t] = this.x, e[t + 1] = this.y, e
    }
    fromBufferAttribute(e, t) {
      return this.x = e.getX(t), this.y = e.getY(t), this
    }
    rotateAround(e, t) {
      let i = Math.cos(t), s = Math.sin(t), r = this.x - e.x, o = this.y - e.y;
      return this.x = r * i - o * s + e.x, this.y = r * s + o * i + e.y, this
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this
    } * [Symbol.iterator]() {
      yield this.x, yield this.y
    }
  }, qn = class {
    constructor(e = 0, t = 0, i = 0, s = 1) {
      this.isQuaternion = !0, this._x = e, this._y = t, this._z = i, this._w = s
    }
    static slerpFlat(e, t, i, s, r, o, a) {
      let l = i[s + 0], c = i[s + 1], h = i[s + 2], u = i[s + 3], d = r[o + 0], f = r[o + 1], m = r[o + 2], x = r[o + 3];
      if (a === 0) {
        e[t + 0] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = u;
        return
      }
      if (a === 1) {
        e[t + 0] = d, e[t + 1] = f, e[t + 2] = m, e[t + 3] = x;
        return
      }
      if (u !== x || l !== d || c !== f || h !== m) {
        let g = 1 - a, p = l * d + c * f + h * m + u * x, E = p >= 0?1: - 1, b = 1 - p * p;
        if (b > Number.EPSILON) {
          let R = Math.sqrt(b), w = Math.atan2(R, p * E);
          g = Math.sin(g * w) / R, a = Math.sin(a * w) / R
        }
        let y = a * E;
        if (l = l * g + d * y, c = c * g + f * y, h = h * g + m * y, u = u * g + x * y, g === 1 - a) {
          let R = 1 / Math.sqrt(l * l + c * c + h * h + u * u);
          l *= R, c *= R, h *= R, u *= R
        }
      }
      e[t] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = u
    }
    static multiplyQuaternionsFlat(e, t, i, s, r, o) {
      let a = i[s], l = i[s + 1], c = i[s + 2], h = i[s + 3], u = r[o], d = r[o + 1], f = r[o + 2], m = r[o + 3];
      return e[t] = a * m + h * u + l * f - c * d, e[t + 1] = l * m + h * d + c * u - a * f, e[t + 2] = c * m + h * f + a * d - l * u, e[t + 3] = h * m - a * u - l * d - c * f, e
    }
    get x() {
      return this._x
    }
    set x(e) {
      this._x = e, this._onChangeCallback()
    }
    get y() {
      return this._y
    }
    set y(e) {
      this._y = e, this._onChangeCallback()
    }
    get z() {
      return this._z
    }
    set z(e) {
      this._z = e, this._onChangeCallback()
    }
    get w() {
      return this._w
    }
    set w(e) {
      this._w = e, this._onChangeCallback()
    }
    set(e, t, i, s) {
      return this._x = e, this._y = t, this._z = i, this._w = s, this._onChangeCallback(), this
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w)
    }
    copy(e) {
      return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this
    }
    setFromEuler(e, t = !0) {
      let i = e._x, s = e._y, r = e._z, o = e._order, a = Math.cos, l = Math.sin, c = a(i / 2), h = a(s / 2), u = a(r / 2), d = l(i / 2), f = l(s / 2), m = l(r / 2);
      switch (o) {
        case "XYZ": this._x = d * h * u + c * f * m, this._y = c * f * u - d * h * m, this._z = c * h * m + d * f * u, this._w = c * h * u - d * f * m;
        break;
        case "YXZ": this._x = d * h * u + c * f * m, this._y = c * f * u - d * h * m, this._z = c * h * m - d * f * u, this._w = c * h * u + d * f * m;
        break;
        case "ZXY": this._x = d * h * u - c * f * m, this._y = c * f * u + d * h * m, this._z = c * h * m + d * f * u, this._w = c * h * u - d * f * m;
        break;
        case "ZYX": this._x = d * h * u - c * f * m, this._y = c * f * u + d * h * m, this._z = c * h * m - d * f * u, this._w = c * h * u + d * f * m;
        break;
        case "YZX": this._x = d * h * u + c * f * m, this._y = c * f * u + d * h * m, this._z = c * h * m - d * f * u, this._w = c * h * u - d * f * m;
        break;
        case "XZY": this._x = d * h * u - c * f * m, this._y = c * f * u - d * h * m, this._z = c * h * m + d * f * u, this._w = c * h * u + d * f * m;
        break;
        default: console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o)
      }
      return t === !0 && this._onChangeCallback(), this
    }
    setFromAxisAngle(e, t) {
      let i = t / 2, s = Math.sin(i);
      return this._x = e.x * s, this._y = e.y * s, this._z = e.z * s, this._w = Math.cos(i), this._onChangeCallback(), this
    }
    setFromRotationMatrix(e) {
      let t = e.elements, i = t[0], s = t[4], r = t[8], o = t[1], a = t[5], l = t[9], c = t[2], h = t[6], u = t[10], d = i + a + u;
      if (d > 0) {
        let f = .5 / Math.sqrt(d + 1);
        this._w = .25 / f, this._x = (h - l) * f, this._y = (r - c) * f, this._z = (o - s) * f
      } else if (i > a && i > u) {
        let f = 2 * Math.sqrt(1 + i - a - u);
        this._w = (h - l) / f, this._x = .25 * f, this._y = (s + o) / f, this._z = (r + c) / f
      } else if (a > u) {
        let f = 2 * Math.sqrt(1 + a - i - u);
        this._w = (r - c) / f, this._x = (s + o) / f, this._y = .25 * f, this._z = (l + h) / f
      } else {
        let f = 2 * Math.sqrt(1 + u - i - a);
        this._w = (o - s) / f, this._x = (r + c) / f, this._y = (l + h) / f, this._z = .25 * f
      }
      return this._onChangeCallback(), this
    }
    setFromUnitVectors(e, t) {
      let i = e.dot(t) + 1;
      return i < 1e-8?(i = 0, Math.abs(e.x) > Math.abs(e.z)?(this._x = - e.y, this._y = e.x, this._z = 0, this._w = i): (this._x = 0, this._y = - e.z, this._z = e.y, this._w = i)): (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = i), this.normalize()
    }
    angleTo(e) {
      return 2 * Math.acos(Math.abs(Ye(this.dot(e), - 1, 1)))
    }
    rotateTowards(e, t) {
      let i = this.angleTo(e);
      if (i === 0)return this;
      let s = Math.min(1, t / i);
      return this.slerp(e, s), this
    }
    identity() {
      return this.set(0, 0, 0, 1)
    }
    invert() {
      return this.conjugate()
    }
    conjugate() {
      return this._x *= - 1, this._y *= - 1, this._z *= - 1, this._onChangeCallback(), this
    }
    dot(e) {
      return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
    }
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
    }
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
    }
    normalize() {
      let e = this.length();
      return e === 0?(this._x = 0, this._y = 0, this._z = 0, this._w = 1): (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this
    }
    multiply(e) {
      return this.multiplyQuaternions(this, e)
    }
    premultiply(e) {
      return this.multiplyQuaternions(e, this)
    }
    multiplyQuaternions(e, t) {
      let i = e._x, s = e._y, r = e._z, o = e._w, a = t._x, l = t._y, c = t._z, h = t._w;
      return this._x = i * h + o * a + s * c - r * l, this._y = s * h + o * l + r * a - i * c, this._z = r * h + o * c + i * l - s * a, this._w = o * h - i * a - s * l - r * c, this._onChangeCallback(), this
    }
    slerp(e, t) {
      if (t === 0)return this;
      if (t === 1)return this.copy(e);
      let i = this._x, s = this._y, r = this._z, o = this._w, a = o * e._w + i * e._x + s * e._y + r * e._z;
      if (a < 0?(this._w = - e._w, this._x = - e._x, this._y = - e._y, this._z = - e._z, a = - a): this.copy(e), a >= 1)return this._w = o, this._x = i, this._y = s, this._z = r, this;
      let l = 1 - a * a;
      if (l <= Number.EPSILON) {
        let f = 1 - t;
        return this._w = f * o + t * this._w, this._x = f * i + t * this._x, this._y = f * s + t * this._y, this._z = f * r + t * this._z, this.normalize(), this
      }
      let c = Math.sqrt(l), h = Math.atan2(c, a), u = Math.sin((1 - t) * h) / c, d = Math.sin(t * h) / c;
      return this._w = o * u + this._w * d, this._x = i * u + this._x * d, this._y = s * u + this._y * d, this._z = r * u + this._z * d, this._onChangeCallback(), this
    }
    slerpQuaternions(e, t, i) {
      return this.copy(e).slerp(t, i)
    }
    random() {
      let e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), i = Math.random(), s = Math.sqrt(1 - i), r = Math.sqrt(i);
      return this.set(s * Math.sin(e), s * Math.cos(e), r * Math.sin(t), r * Math.cos(t))
    }
    equals(e) {
      return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
    }
    fromArray(e, t = 0) {
      return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this
    }
    toArray(e = [], t = 0) {
      return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e
    }
    fromBufferAttribute(e, t) {
      return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this
    }
    toJSON() {
      return this.toArray()
    }
    _onChange(e) {
      return this._onChangeCallback = e, this
    }
    _onChangeCallback() {
    } * [Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._w
    }
  }, I = class n {
    constructor(e = 0, t = 0, i = 0) {
      n.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = i
    }
    set(e, t, i) {
      return i === void 0 && (i = this.z), this.x = e, this.y = t, this.z = i, this
    }
    setScalar(e) {
      return this.x = e, this.y = e, this.z = e, this
    }
    setX(e) {
      return this.x = e, this
    }
    setY(e) {
      return this.y = e, this
    }
    setZ(e) {
      return this.z = e, this
    }
    setComponent(e, t) {
      switch (e) {
        case 0: this.x = t;
        break;
        case 1: this.y = t;
        break;
        case 2: this.z = t;
        break;
        default: throw new Error("index is out of range: " + e)
      }
      return this
    }
    getComponent(e) {
      switch (e) {
        case 0: return this.x;
        case 1: return this.y;
        case 2: return this.z;
        default: throw new Error("index is out of range: " + e)
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z)
    }
    copy(e) {
      return this.x = e.x, this.y = e.y, this.z = e.z, this
    }
    add(e) {
      return this.x += e.x, this.y += e.y, this.z += e.z, this
    }
    addScalar(e) {
      return this.x += e, this.y += e, this.z += e, this
    }
    addVectors(e, t) {
      return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
    }
    addScaledVector(e, t) {
      return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this
    }
    sub(e) {
      return this.x -= e.x, this.y -= e.y, this.z -= e.z, this
    }
    subScalar(e) {
      return this.x -= e, this.y -= e, this.z -= e, this
    }
    subVectors(e, t) {
      return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
    }
    multiply(e) {
      return this.x *= e.x, this.y *= e.y, this.z *= e.z, this
    }
    multiplyScalar(e) {
      return this.x *= e, this.y *= e, this.z *= e, this
    }
    multiplyVectors(e, t) {
      return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
    }
    applyEuler(e) {
      return this.applyQuaternion(bh.setFromEuler(e))
    }
    applyAxisAngle(e, t) {
      return this.applyQuaternion(bh.setFromAxisAngle(e, t))
    }
    applyMatrix3(e) {
      let t = this.x, i = this.y, s = this.z, r = e.elements;
      return this.x = r[0] * t + r[3] * i + r[6] * s, this.y = r[1] * t + r[4] * i + r[7] * s, this.z = r[2] * t + r[5] * i + r[8] * s, this
    }
    applyNormalMatrix(e) {
      return this.applyMatrix3(e).normalize()
    }
    applyMatrix4(e) {
      let t = this.x, i = this.y, s = this.z, r = e.elements, o = 1 / (r[3] * t + r[7] * i + r[11] * s + r[15]);
      return this.x = (r[0] * t + r[4] * i + r[8] * s + r[12]) * o, this.y = (r[1] * t + r[5] * i + r[9] * s + r[13]) * o, this.z = (r[2] * t + r[6] * i + r[10] * s + r[14]) * o, this
    }
    applyQuaternion(e) {
      let t = this.x, i = this.y, s = this.z, r = e.x, o = e.y, a = e.z, l = e.w, c = 2 * (o * s - a * i), h = 2 * (a * t - r * s), u = 2 * (r * i - o * t);
      return this.x = t + l * c + o * u - a * h, this.y = i + l * h + a * c - r * u, this.z = s + l * u + r * h - o * c, this
    }
    project(e) {
      return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)
    }
    unproject(e) {
      return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)
    }
    transformDirection(e) {
      let t = this.x, i = this.y, s = this.z, r = e.elements;
      return this.x = r[0] * t + r[4] * i + r[8] * s, this.y = r[1] * t + r[5] * i + r[9] * s, this.z = r[2] * t + r[6] * i + r[10] * s, this.normalize()
    }
    divide(e) {
      return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
    }
    divideScalar(e) {
      return this.multiplyScalar(1 / e)
    }
    min(e) {
      return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this
    }
    max(e) {
      return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this
    }
    clamp(e, t) {
      return this.x = Ye(this.x, e.x, t.x), this.y = Ye(this.y, e.y, t.y), this.z = Ye(this.z, e.z, t.z), this
    }
    clampScalar(e, t) {
      return this.x = Ye(this.x, e, t), this.y = Ye(this.y, e, t), this.z = Ye(this.z, e, t), this
    }
    clampLength(e, t) {
      let i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(Ye(i, e, t))
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this
    }
    negate() {
      return this.x = - this.x, this.y = - this.y, this.z = - this.z, this
    }
    dot(e) {
      return this.x * e.x + this.y * e.y + this.z * e.z
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    }
    normalize() {
      return this.divideScalar(this.length() || 1)
    }
    setLength(e) {
      return this.normalize().multiplyScalar(e)
    }
    lerp(e, t) {
      return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
    }
    lerpVectors(e, t, i) {
      return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this
    }
    cross(e) {
      return this.crossVectors(this, e)
    }
    crossVectors(e, t) {
      let i = e.x, s = e.y, r = e.z, o = t.x, a = t.y, l = t.z;
      return this.x = s * l - r * a, this.y = r * o - i * l, this.z = i * a - s * o, this
    }
    projectOnVector(e) {
      let t = e.lengthSq();
      if (t === 0)return this.set(0, 0, 0);
      let i = e.dot(this) / t;
      return this.copy(e).multiplyScalar(i)
    }
    projectOnPlane(e) {
      return El.copy(this).projectOnVector(e), this.sub(El)
    }
    reflect(e) {
      return this.sub(El.copy(e).multiplyScalar(2 * this.dot(e)))
    }
    angleTo(e) {
      let t = Math.sqrt(this.lengthSq() * e.lengthSq());
      if (t === 0)return Math.PI / 2;
      let i = this.dot(e) / t;
      return Math.acos(Ye(i, - 1, 1))
    }
    distanceTo(e) {
      return Math.sqrt(this.distanceToSquared(e))
    }
    distanceToSquared(e) {
      let t = this.x - e.x, i = this.y - e.y, s = this.z - e.z;
      return t * t + i * i + s * s
    }
    manhattanDistanceTo(e) {
      return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
    }
    setFromSpherical(e) {
      return this.setFromSphericalCoords(e.radius, e.phi, e.theta)
    }
    setFromSphericalCoords(e, t, i) {
      let s = Math.sin(t) * e;
      return this.x = s * Math.sin(i), this.y = Math.cos(t) * e, this.z = s * Math.cos(i), this
    }
    setFromCylindrical(e) {
      return this.setFromCylindricalCoords(e.radius, e.theta, e.y)
    }
    setFromCylindricalCoords(e, t, i) {
      return this.x = e * Math.sin(t), this.y = i, this.z = e * Math.cos(t), this
    }
    setFromMatrixPosition(e) {
      let t = e.elements;
      return this.x = t[12], this.y = t[13], this.z = t[14], this
    }
    setFromMatrixScale(e) {
      let t = this.setFromMatrixColumn(e, 0).length(), i = this.setFromMatrixColumn(e, 1).length(), s = this.setFromMatrixColumn(e, 2).length();
      return this.x = t, this.y = i, this.z = s, this
    }
    setFromMatrixColumn(e, t) {
      return this.fromArray(e.elements, t * 4)
    }
    setFromMatrix3Column(e, t) {
      return this.fromArray(e.elements, t * 3)
    }
    setFromEuler(e) {
      return this.x = e._x, this.y = e._y, this.z = e._z, this
    }
    setFromColor(e) {
      return this.x = e.r, this.y = e.g, this.z = e.b, this
    }
    equals(e) {
      return e.x === this.x && e.y === this.y && e.z === this.z
    }
    fromArray(e, t = 0) {
      return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this
    }
    toArray(e = [], t = 0) {
      return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e
    }
    fromBufferAttribute(e, t) {
      return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this
    }
    randomDirection() {
      let e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, i = Math.sqrt(1 - t * t);
      return this.x = i * Math.cos(e), this.y = t, this.z = i * Math.sin(e), this
    } * [Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z
    }
  }, El = new I, bh = new qn, We = class n {
    constructor(e, t, i, s, r, o, a, l, c) {
      n.prototype.isMatrix3 = !0, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], e !== void 0 && this.set(e, t, i, s, r, o, a, l, c)
    }
    set(e, t, i, s, r, o, a, l, c) {
      let h = this.elements;
      return h[0] = e, h[1] = s, h[2] = a, h[3] = t, h[4] = r, h[5] = l, h[6] = i, h[7] = o, h[8] = c, this
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
    }
    copy(e) {
      let t = this.elements, i = e.elements;
      return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], this
    }
    extractBasis(e, t, i) {
      return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this
    }
    setFromMatrix4(e) {
      let t = e.elements;
      return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this
    }
    multiply(e) {
      return this.multiplyMatrices(this, e)
    }
    premultiply(e) {
      return this.multiplyMatrices(e, this)
    }
    multiplyMatrices(e, t) {
      let i = e.elements, s = t.elements, r = this.elements, o = i[0], a = i[3], l = i[6], c = i[1], h = i[4], u = i[7], d = i[2], f = i[5], m = i[8], x = s[0], g = s[3], p = s[6], E = s[1], b = s[4], y = s[7], R = s[2], w = s[5], P = s[8];
      return r[0] = o * x + a * E + l * R, r[3] = o * g + a * b + l * w, r[6] = o * p + a * y + l * P, r[1] = c * x + h * E + u * R, r[4] = c * g + h * b + u * w, r[7] = c * p + h * y + u * P, r[2] = d * x + f * E + m * R, r[5] = d * g + f * b + m * w, r[8] = d * p + f * y + m * P, this
    }
    multiplyScalar(e) {
      let t = this.elements;
      return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
    }
    determinant() {
      let e = this.elements, t = e[0], i = e[1], s = e[2], r = e[3], o = e[4], a = e[5], l = e[6], c = e[7], h = e[8];
      return t * o * h - t * a * c - i * r * h + i * a * l + s * r * c - s * o * l
    }
    invert() {
      let e = this.elements, t = e[0], i = e[1], s = e[2], r = e[3], o = e[4], a = e[5], l = e[6], c = e[7], h = e[8], u = h * o - a * c, d = a * l - h * r, f = c * r - o * l, m = t * u + i * d + s * f;
      if (m === 0)return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      let x = 1 / m;
      return e[0] = u * x, e[1] = (s * c - h * i) * x, e[2] = (a * i - s * o) * x, e[3] = d * x, e[4] = (h * t - s * l) * x, e[5] = (s * r - a * t) * x, e[6] = f * x, e[7] = (i * l - c * t) * x, e[8] = (o * t - i * r) * x, this
    }
    transpose() {
      let e, t = this.elements;
      return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
    }
    getNormalMatrix(e) {
      return this.setFromMatrix4(e).invert().transpose()
    }
    transposeIntoArray(e) {
      let t = this.elements;
      return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
    }
    setUvTransform(e, t, i, s, r, o, a) {
      let l = Math.cos(r), c = Math.sin(r);
      return this.set(i * l, i * c, - i * (l * o + c * a) + o + e, - s * c, s * l, - s * ( - c * o + l * a) + a + t, 0, 0, 1), this
    }
    scale(e, t) {
      return this.premultiply(Tl.makeScale(e, t)), this
    }
    rotate(e) {
      return this.premultiply(Tl.makeRotation( - e)), this
    }
    translate(e, t) {
      return this.premultiply(Tl.makeTranslation(e, t)), this
    }
    makeTranslation(e, t) {
      return e.isVector2?this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1): this.set(1, 0, e, 0, 1, t, 0, 0, 1), this
    }
    makeRotation(e) {
      let t = Math.cos(e), i = Math.sin(e);
      return this.set(t, - i, 0, i, t, 0, 0, 0, 1), this
    }
    makeScale(e, t) {
      return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this
    }
    equals(e) {
      let t = this.elements, i = e.elements;
      for (let s = 0;
      s < 9;
      s++)if (t[s] !== i[s])return!1;
      return!0
    }
    fromArray(e, t = 0) {
      for (let i = 0;
      i < 9;
      i++)this.elements[i] = e[i + t];
      return this
    }
    toArray(e = [], t = 0) {
      let i = this.elements;
      return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e
    }
    clone() {
      return new this.constructor().fromArray(this.elements)
    }
  }, Tl = new We;
  function Ac(n) {
    for (let e = n.length - 1;
    e >= 0;
    --e)if (n[e] >= 65535)return!0;
    return!1
  }
  function sr(n) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", n)
  }
  function Hu() {
    let n = sr("canvas");
    return n.style.display = "block", n
  }
  var Eh = {
  };
  function cs(n) {
    n in Eh || (Eh[n] = !0, console.warn(n))
  }
  function Vu(n, e, t) {
    return new Promise(function(i, s) {
      function r() {
        switch (n.clientWaitSync(e, n.SYNC_FLUSH_COMMANDS_BIT, 0)) {
          case n.WAIT_FAILED: s();
          break;
          case n.TIMEOUT_EXPIRED: setTimeout(r, t);
          break;
          default: i()
        }
      }
      setTimeout(r, t)
    })
  }
  var Th = new We().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), wh = new We().set(3.2409699, - 1.5373832, - .4986108, - .9692436, 1.8759675, .0415551, .0556301, - .203977, 1.0569715);
  function Hf() {
    let n = {
      enabled: !0, workingColorSpace: Ii, spaces: {
      }, convert: function(s, r, o) {
        return this.enabled === !1 || r === o || !r || !o || (this.spaces[r].transfer === at && (s.r = Gn(s.r), s.g = Gn(s.g), s.b = Gn(s.b)), this.spaces[r].primaries !== this.spaces[o].primaries && (s.applyMatrix3(this.spaces[r].toXYZ), s.applyMatrix3(this.spaces[o].fromXYZ)), this.spaces[o].transfer === at && (s.r = os(s.r), s.g = os(s.g), s.b = os(s.b))), s
      }, workingToColorSpace: function(s, r) {
        return this.convert(s, this.workingColorSpace, r)
      }, colorSpaceToWorking: function(s, r) {
        return this.convert(s, r, this.workingColorSpace)
      }, getPrimaries: function(s) {
        return this.spaces[s].primaries
      }, getTransfer: function(s) {
        return s === $n?nr: this.spaces[s].transfer
      }, getToneMappingMode: function(s) {
        return this.spaces[s].outputColorSpaceConfig.toneMappingMode || "standard"
      }, getLuminanceCoefficients: function(s, r = this.workingColorSpace) {
        return s.fromArray(this.spaces[r].luminanceCoefficients)
      }, define: function(s) {
        Object.assign(this.spaces, s)
      }, _getMatrix: function(s, r, o) {
        return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)
      }, _getDrawingBufferColorSpace: function(s) {
        return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace
      }, _getUnpackColorSpace: function(s = this.workingColorSpace) {
        return this.spaces[s].workingColorSpaceConfig.unpackColorSpace
      }, fromWorkingColorSpace: function(s, r) {
        return cs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), n.workingToColorSpace(s, r)
      }, toWorkingColorSpace: function(s, r) {
        return cs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), n.colorSpaceToWorking(s, r)
      }
    }, e = [.64, .33, .3, .6, .15, .06], t = [.2126, .7152, .0722], i = [.3127, .329];
    return n.define({
      [Ii]: {
        primaries: e, whitePoint: i, transfer: nr, toXYZ: Th, fromXYZ: wh, luminanceCoefficients: t, workingColorSpaceConfig: {
          unpackColorSpace: Vt
        }, outputColorSpaceConfig: {
          drawingBufferColorSpace: Vt
        }
      }, [Vt]: {
        primaries: e, whitePoint: i, transfer: at, toXYZ: Th, fromXYZ: wh, luminanceCoefficients: t, outputColorSpaceConfig: {
          drawingBufferColorSpace: Vt
        }
      }
    }), n
  }
  var et = Hf();
  function Gn(n) {
    return n < .04045?n * .0773993808: Math.pow(n * .9478672986 + .0521327014, 2.4)
  }
  function os(n) {
    return n < .0031308?n * 12.92: 1.055 * Math.pow(n, .41666) - .055
  }
  var qi, Lo = class {
    static getDataURL(e, t = "image/png") {
      if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")return e.src;
      let i;
      if (e instanceof HTMLCanvasElement)i = e;
      else {
        qi === void 0 && (qi = sr("canvas")), qi.width = e.width, qi.height = e.height;
        let s = qi.getContext("2d");
        e instanceof ImageData?s.putImageData(e, 0, 0): s.drawImage(e, 0, 0, e.width, e.height), i = qi
      }
      return i.toDataURL(t)
    }
    static sRGBToLinear(e) {
      if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
        let t = sr("canvas");
        t.width = e.width, t.height = e.height;
        let i = t.getContext("2d");
        i.drawImage(e, 0, 0, e.width, e.height);
        let s = i.getImageData(0, 0, e.width, e.height), r = s.data;
        for (let o = 0;
        o < r.length;
        o++)r[o] = Gn(r[o] / 255) * 255;
        return i.putImageData(s, 0, 0), t
      } else if (e.data) {
        let t = e.data.slice(0);
        for (let i = 0;
        i < t.length;
        i++)t instanceof Uint8Array || t instanceof Uint8ClampedArray?t[i] = Math.floor(Gn(t[i] / 255) * 255): t[i] = Gn(t[i]);
        return {
          data: t, width: e.width, height: e.height
        }
      } else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e
    }
  }, Vf = 0, hs = class {
    constructor(e = null) {
      this.isSource = !0, Object.defineProperty(this, "id", {
        value: Vf++
      }), this.uuid = Fi(), this.data = e, this.dataReady = !0, this.version = 0
    }
    getSize(e) {
      let t = this.data;
      return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement?e.set(t.videoWidth, t.videoHeight, 0): t instanceof VideoFrame?e.set(t.displayHeight, t.displayWidth, 0): t !== null?e.set(t.width, t.height, t.depth || 0): e.set(0, 0, 0), e
    }
    set needsUpdate(e) {
      e === !0 && this.version++
    }
    toJSON(e) {
      let t = e === void 0 || typeof e == "string";
      if (!t && e.images[this.uuid] !== void 0)return e.images[this.uuid];
      let i = {
        uuid: this.uuid, url: ""
      }, s = this.data;
      if (s !== null) {
        let r;
        if (Array.isArray(s)) {
          r = [];
          for (let o = 0, a = s.length;
          o < a;
          o++)s[o].isDataTexture?r.push(wl(s[o].image)): r.push(wl(s[o]))
        } else r = wl(s);
        i.url = r
      }
      return t || (e.images[this.uuid] = i), i
    }
  };
  function wl(n) {
    return typeof HTMLImageElement < "u" && n instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && n instanceof ImageBitmap?Lo.getDataURL(n): n.data?{
      data: Array.from(n.data), width: n.width, height: n.height, type: n.data.constructor.name
    }: (console.warn("THREE.Texture: Unable to serialize Texture."), {
    })
  }
  var Gf = 0, Al = new I, $t = class n extends Xn {
    constructor(e = n.DEFAULT_IMAGE, t = n.DEFAULT_MAPPING, i = oi, s = oi, r = xn, o = fi, a = hn, l = Mn, c = n.DEFAULT_ANISOTROPY, h = $n) {
      super(), this.isTexture = !0, Object.defineProperty(this, "id", {
        value: Gf++
      }), this.uuid = Fi(), this.name = "", this.source = new hs(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = i, this.wrapT = s, this.magFilter = r, this.minFilter = o, this.anisotropy = c, this.format = a, this.internalFormat = null, this.type = l, this.offset = new fe(0, 0), this.repeat = new fe(1, 1), this.center = new fe(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new We, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {
      }, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0
    }
    get width() {
      return this.source.getSize(Al).x
    }
    get height() {
      return this.source.getSize(Al).y
    }
    get depth() {
      return this.source.getSize(Al).z
    }
    get image() {
      return this.source.data
    }
    set image(e = null) {
      this.source.data = e
    }
    updateMatrix() {
      this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
    }
    addUpdateRange(e, t) {
      this.updateRanges.push({
        start: e, count: t
      })
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(e) {
      return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this
    }
    setValues(e) {
      for (let t in e) {
        let i = e[t];
        if (i === void 0) {
          console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);
          continue
        }
        let s = this[t];
        if (s === void 0) {
          console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);
          continue
        }
        s && i && s.isVector2 && i.isVector2 || s && i && s.isVector3 && i.isVector3 || s && i && s.isMatrix3 && i.isMatrix3?s.copy(i): this[t] = i
      }
    }
    toJSON(e) {
      let t = e === void 0 || typeof e == "string";
      if (!t && e.textures[this.uuid] !== void 0)return e.textures[this.uuid];
      let i = {
        metadata: {
          version: 4.7, type: "Texture", generator: "Texture.toJSON"
        }, uuid: this.uuid, name: this.name, image: this.source.toJSON(e).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment
      };
      return Object.keys(this.userData).length > 0 && (i.userData = this.userData), t || (e.textures[this.uuid] = i), i
    }
    dispose() {
      this.dispatchEvent({
        type: "dispose"
      })
    }
    transformUv(e) {
      if (this.mapping !== mc)return e;
      if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)switch (this.wrapS) {
        case Io: e.x = e.x - Math.floor(e.x);
        break;
        case oi: e.x = e.x < 0?0: 1;
        break;
        case Po: Math.abs(Math.floor(e.x) % 2) === 1?e.x = Math.ceil(e.x) - e.x: e.x = e.x - Math.floor(e.x);
        break
      }
      if (e.y < 0 || e.y > 1)switch (this.wrapT) {
        case Io: e.y = e.y - Math.floor(e.y);
        break;
        case oi: e.y = e.y < 0?0: 1;
        break;
        case Po: Math.abs(Math.floor(e.y) % 2) === 1?e.y = Math.ceil(e.y) - e.y: e.y = e.y - Math.floor(e.y);
        break
      }
      return this.flipY && (e.y = 1 - e.y), e
    }
    set needsUpdate(e) {
      e === !0 && (this.version++, this.source.needsUpdate = !0)
    }
    set needsPMREMUpdate(e) {
      e === !0 && this.pmremVersion++
    }
  };
  $t.DEFAULT_IMAGE = null;
  $t.DEFAULT_MAPPING = mc;
  $t.DEFAULT_ANISOTROPY = 1;
  var ot = class n {
    constructor(e = 0, t = 0, i = 0, s = 1) {
      n.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = i, this.w = s
    }
    get width() {
      return this.z
    }
    set width(e) {
      this.z = e
    }
    get height() {
      return this.w
    }
    set height(e) {
      this.w = e
    }
    set(e, t, i, s) {
      return this.x = e, this.y = t, this.z = i, this.w = s, this
    }
    setScalar(e) {
      return this.x = e, this.y = e, this.z = e, this.w = e, this
    }
    setX(e) {
      return this.x = e, this
    }
    setY(e) {
      return this.y = e, this
    }
    setZ(e) {
      return this.z = e, this
    }
    setW(e) {
      return this.w = e, this
    }
    setComponent(e, t) {
      switch (e) {
        case 0: this.x = t;
        break;
        case 1: this.y = t;
        break;
        case 2: this.z = t;
        break;
        case 3: this.w = t;
        break;
        default: throw new Error("index is out of range: " + e)
      }
      return this
    }
    getComponent(e) {
      switch (e) {
        case 0: return this.x;
        case 1: return this.y;
        case 2: return this.z;
        case 3: return this.w;
        default: throw new Error("index is out of range: " + e)
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w)
    }
    copy(e) {
      return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0?e.w: 1, this
    }
    add(e) {
      return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this
    }
    addScalar(e) {
      return this.x += e, this.y += e, this.z += e, this.w += e, this
    }
    addVectors(e, t) {
      return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
    }
    addScaledVector(e, t) {
      return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this
    }
    sub(e) {
      return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this
    }
    subScalar(e) {
      return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this
    }
    subVectors(e, t) {
      return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
    }
    multiply(e) {
      return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this
    }
    multiplyScalar(e) {
      return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
    }
    applyMatrix4(e) {
      let t = this.x, i = this.y, s = this.z, r = this.w, o = e.elements;
      return this.x = o[0] * t + o[4] * i + o[8] * s + o[12] * r, this.y = o[1] * t + o[5] * i + o[9] * s + o[13] * r, this.z = o[2] * t + o[6] * i + o[10] * s + o[14] * r, this.w = o[3] * t + o[7] * i + o[11] * s + o[15] * r, this
    }
    divide(e) {
      return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this
    }
    divideScalar(e) {
      return this.multiplyScalar(1 / e)
    }
    setAxisAngleFromQuaternion(e) {
      this.w = 2 * Math.acos(e.w);
      let t = Math.sqrt(1 - e.w * e.w);
      return t < 1e-4?(this.x = 1, this.y = 0, this.z = 0): (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
    }
    setAxisAngleFromRotationMatrix(e) {
      let t, i, s, r, l = e.elements, c = l[0], h = l[4], u = l[8], d = l[1], f = l[5], m = l[9], x = l[2], g = l[6], p = l[10];
      if (Math.abs(h - d) < .01 && Math.abs(u - x) < .01 && Math.abs(m - g) < .01) {
        if (Math.abs(h + d) < .1 && Math.abs(u + x) < .1 && Math.abs(m + g) < .1 && Math.abs(c + f + p - 3) < .1)return this.set(1, 0, 0, 0), this;
        t = Math.PI;
        let b = (c + 1) / 2, y = (f + 1) / 2, R = (p + 1) / 2, w = (h + d) / 4, P = (u + x) / 4, D = (m + g) / 4;
        return b > y && b > R?b < .01?(i = 0, s = .707106781, r = .707106781): (i = Math.sqrt(b), s = w / i, r = P / i): y > R?y < .01?(i = .707106781, s = 0, r = .707106781): (s = Math.sqrt(y), i = w / s, r = D / s): R < .01?(i = .707106781, s = .707106781, r = 0): (r = Math.sqrt(R), i = P / r, s = D / r), this.set(i, s, r, t), this
      }
      let E = Math.sqrt((g - m) * (g - m) + (u - x) * (u - x) + (d - h) * (d - h));
      return Math.abs(E) < .001 && (E = 1), this.x = (g - m) / E, this.y = (u - x) / E, this.z = (d - h) / E, this.w = Math.acos((c + f + p - 1) / 2), this
    }
    setFromMatrixPosition(e) {
      let t = e.elements;
      return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this
    }
    min(e) {
      return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this
    }
    max(e) {
      return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this
    }
    clamp(e, t) {
      return this.x = Ye(this.x, e.x, t.x), this.y = Ye(this.y, e.y, t.y), this.z = Ye(this.z, e.z, t.z), this.w = Ye(this.w, e.w, t.w), this
    }
    clampScalar(e, t) {
      return this.x = Ye(this.x, e, t), this.y = Ye(this.y, e, t), this.z = Ye(this.z, e, t), this.w = Ye(this.w, e, t), this
    }
    clampLength(e, t) {
      let i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(Ye(i, e, t))
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this
    }
    negate() {
      return this.x = - this.x, this.y = - this.y, this.z = - this.z, this.w = - this.w, this
    }
    dot(e) {
      return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    }
    normalize() {
      return this.divideScalar(this.length() || 1)
    }
    setLength(e) {
      return this.normalize().multiplyScalar(e)
    }
    lerp(e, t) {
      return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
    }
    lerpVectors(e, t, i) {
      return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this.w = e.w + (t.w - e.w) * i, this
    }
    equals(e) {
      return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
    }
    fromArray(e, t = 0) {
      return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this
    }
    toArray(e = [], t = 0) {
      return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e
    }
    fromBufferAttribute(e, t) {
      return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this
    } * [Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z, yield this.w
    }
  }, Uo = class extends Xn {
    constructor(e = 1, t = 1, i = {
    }) {
      super(), i = Object.assign({
        generateMipmaps: !1, internalFormat: null, minFilter: xn, depthBuffer: !0, stencilBuffer: !1, resolveDepthBuffer: !0, resolveStencilBuffer: !0, depthTexture: null, samples: 0, count: 1, depth: 1, multiview: !1
      }, i), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = i.depth, this.scissor = new ot(0, 0, e, t), this.scissorTest = !1, this.viewport = new ot(0, 0, e, t);
      let s = {
        width: e, height: t, depth: i.depth
      }, r = new $t(s);
      this.textures = [];
      let o = i.count;
      for (let a = 0;
      a < o;
      a++)this.textures[a] = r.clone(), this.textures[a].isRenderTargetTexture = !0, this.textures[a].renderTarget = this;
      this._setTextureOptions(i), this.depthBuffer = i.depthBuffer, this.stencilBuffer = i.stencilBuffer, this.resolveDepthBuffer = i.resolveDepthBuffer, this.resolveStencilBuffer = i.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = i.depthTexture, this.samples = i.samples, this.multiview = i.multiview
    }
    _setTextureOptions(e = {
    }) {
      let t = {
        minFilter: xn, generateMipmaps: !1, flipY: !1, internalFormat: null
      };
      e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
      for (let i = 0;
      i < this.textures.length;
      i++)this.textures[i].setValues(t)
    }
    get texture() {
      return this.textures[0]
    }
    set texture(e) {
      this.textures[0] = e
    }
    set depthTexture(e) {
      this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e
    }
    get depthTexture() {
      return this._depthTexture
    }
    setSize(e, t, i = 1) {
      if (this.width !== e || this.height !== t || this.depth !== i) {
        this.width = e, this.height = t, this.depth = i;
        for (let s = 0, r = this.textures.length;
        s < r;
        s++)this.textures[s].image.width = e, this.textures[s].image.height = t, this.textures[s].image.depth = i, this.textures[s].isArrayTexture = this.textures[s].image.depth > 1;
        this.dispose()
      }
      this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t)
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(e) {
      this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
      for (let t = 0, i = e.textures.length;
      t < i;
      t++) {
        this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
        let s = Object.assign({
        }, e.textures[t].image);
        this.textures[t].source = new hs(s)
      }
      return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this
    }
    dispose() {
      this.dispatchEvent({
        type: "dispose"
      })
    }
  }, wn = class extends Uo {
    constructor(e = 1, t = 1, i = {
    }) {
      super(e, t, i), this.isWebGLRenderTarget = !0
    }
  }, rr = class extends $t {
    constructor(e = null, t = 1, i = 1, s = 1) {
      super(null), this.isDataArrayTexture = !0, this.image = {
        data: e, width: t, height: i, depth: s
      }, this.magFilter = Zt, this.minFilter = Zt, this.wrapR = oi, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = new Set
    }
    addLayerUpdate(e) {
      this.layerUpdates.add(e)
    }
    clearLayerUpdates() {
      this.layerUpdates.clear()
    }
  };
  var No = class extends $t {
    constructor(e = null, t = 1, i = 1, s = 1) {
      super(null), this.isData3DTexture = !0, this.image = {
        data: e, width: t, height: i, depth: s
      }, this.magFilter = Zt, this.minFilter = Zt, this.wrapR = oi, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1
    }
  };
  var An = class {
    constructor(e = new I(1 / 0, 1 / 0, 1 / 0), t = new I( - 1 / 0, - 1 / 0, - 1 / 0)) {
      this.isBox3 = !0, this.min = e, this.max = t
    }
    set(e, t) {
      return this.min.copy(e), this.max.copy(t), this
    }
    setFromArray(e) {
      this.makeEmpty();
      for (let t = 0, i = e.length;
      t < i;
      t += 3)this.expandByPoint(pn.fromArray(e, t));
      return this
    }
    setFromBufferAttribute(e) {
      this.makeEmpty();
      for (let t = 0, i = e.count;
      t < i;
      t++)this.expandByPoint(pn.fromBufferAttribute(e, t));
      return this
    }
    setFromPoints(e) {
      this.makeEmpty();
      for (let t = 0, i = e.length;
      t < i;
      t++)this.expandByPoint(e[t]);
      return this
    }
    setFromCenterAndSize(e, t) {
      let i = pn.copy(t).multiplyScalar(.5);
      return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
    }
    setFromObject(e, t = !1) {
      return this.makeEmpty(), this.expandByObject(e, t)
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(e) {
      return this.min.copy(e.min), this.max.copy(e.max), this
    }
    makeEmpty() {
      return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = - 1 / 0, this
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    }
    getCenter(e) {
      return this.isEmpty()?e.set(0, 0, 0): e.addVectors(this.min, this.max).multiplyScalar(.5)
    }
    getSize(e) {
      return this.isEmpty()?e.set(0, 0, 0): e.subVectors(this.max, this.min)
    }
    expandByPoint(e) {
      return this.min.min(e), this.max.max(e), this
    }
    expandByVector(e) {
      return this.min.sub(e), this.max.add(e), this
    }
    expandByScalar(e) {
      return this.min.addScalar( - e), this.max.addScalar(e), this
    }
    expandByObject(e, t = !1) {
      e.updateWorldMatrix(!1, !1);
      let i = e.geometry;
      if (i !== void 0) {
        let r = i.getAttribute("position");
        if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0)for (let o = 0, a = r.count;
        o < a;
        o++)e.isMesh === !0?e.getVertexPosition(o, pn): pn.fromBufferAttribute(r, o), pn.applyMatrix4(e.matrixWorld), this.expandByPoint(pn);
        else e.boundingBox !== void 0?(e.boundingBox === null && e.computeBoundingBox(), eo.copy(e.boundingBox)): (i.boundingBox === null && i.computeBoundingBox(), eo.copy(i.boundingBox)), eo.applyMatrix4(e.matrixWorld), this.union(eo)
      }
      let s = e.children;
      for (let r = 0, o = s.length;
      r < o;
      r++)this.expandByObject(s[r], t);
      return this
    }
    containsPoint(e) {
      return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z
    }
    containsBox(e) {
      return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
    }
    getParameter(e, t) {
      return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
    }
    intersectsBox(e) {
      return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z
    }
    intersectsSphere(e) {
      return this.clampPoint(e.center, pn), pn.distanceToSquared(e.center) <= e.radius * e.radius
    }
    intersectsPlane(e) {
      let t, i;
      return e.normal.x > 0?(t = e.normal.x * this.min.x, i = e.normal.x * this.max.x): (t = e.normal.x * this.max.x, i = e.normal.x * this.min.x), e.normal.y > 0?(t += e.normal.y * this.min.y, i += e.normal.y * this.max.y): (t += e.normal.y * this.max.y, i += e.normal.y * this.min.y), e.normal.z > 0?(t += e.normal.z * this.min.z, i += e.normal.z * this.max.z): (t += e.normal.z * this.max.z, i += e.normal.z * this.min.z), t <= - e.constant && i >= - e.constant
    }
    intersectsTriangle(e) {
      if (this.isEmpty())return!1;
      this.getCenter(Vs), to.subVectors(this.max, Vs), Yi.subVectors(e.a, Vs), Zi.subVectors(e.b, Vs), $i.subVectors(e.c, Vs), jn.subVectors(Zi, Yi), ei.subVectors($i, Zi), Si.subVectors(Yi, $i);
      let t = [0, - jn.z, jn.y, 0, - ei.z, ei.y, 0, - Si.z, Si.y, jn.z, 0, - jn.x, ei.z, 0, - ei.x, Si.z, 0, - Si.x, - jn.y, jn.x, 0, - ei.y, ei.x, 0, - Si.y, Si.x, 0];
      return!Rl(t, Yi, Zi, $i, to) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Rl(t, Yi, Zi, $i, to))?!1: (no.crossVectors(jn, ei), t = [no.x, no.y, no.z], Rl(t, Yi, Zi, $i, to))
    }
    clampPoint(e, t) {
      return t.copy(e).clamp(this.min, this.max)
    }
    distanceToPoint(e) {
      return this.clampPoint(e, pn).distanceTo(e)
    }
    getBoundingSphere(e) {
      return this.isEmpty()?e.makeEmpty(): (this.getCenter(e.center), e.radius = this.getSize(pn).length() * .5), e
    }
    intersect(e) {
      return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this
    }
    union(e) {
      return this.min.min(e.min), this.max.max(e.max), this
    }
    applyMatrix4(e) {
      return this.isEmpty()?this: (Bn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Bn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Bn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Bn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Bn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Bn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Bn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Bn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Bn), this)
    }
    translate(e) {
      return this.min.add(e), this.max.add(e), this
    }
    equals(e) {
      return e.min.equals(this.min) && e.max.equals(this.max)
    }
    toJSON() {
      return {
        min: this.min.toArray(), max: this.max.toArray()
      }
    }
    fromJSON(e) {
      return this.min.fromArray(e.min), this.max.fromArray(e.max), this
    }
  }, Bn = [new I, new I, new I, new I, new I, new I, new I, new I], pn = new I, eo = new An, Yi = new I, Zi = new I, $i = new I, jn = new I, ei = new I, Si = new I, Vs = new I, to = new I, no = new I, bi = new I;
  function Rl(n, e, t, i, s) {
    for (let r = 0, o = n.length - 3;
    r <= o;
    r += 3) {
      bi.fromArray(n, r);
      let a = s.x * Math.abs(bi.x) + s.y * Math.abs(bi.y) + s.z * Math.abs(bi.z), l = e.dot(bi), c = t.dot(bi), h = i.dot(bi);
      if (Math.max( - Math.max(l, c, h), Math.min(l, c, h)) > a)return!1
    }
    return!0
  }
  var Wf = new An, Gs = new I, Cl = new I, Rn = class {
    constructor(e = new I, t = - 1) {
      this.isSphere = !0, this.center = e, this.radius = t
    }
    set(e, t) {
      return this.center.copy(e), this.radius = t, this
    }
    setFromPoints(e, t) {
      let i = this.center;
      t !== void 0?i.copy(t): Wf.setFromPoints(e).getCenter(i);
      let s = 0;
      for (let r = 0, o = e.length;
      r < o;
      r++)s = Math.max(s, i.distanceToSquared(e[r]));
      return this.radius = Math.sqrt(s), this
    }
    copy(e) {
      return this.center.copy(e.center), this.radius = e.radius, this
    }
    isEmpty() {
      return this.radius < 0
    }
    makeEmpty() {
      return this.center.set(0, 0, 0), this.radius = - 1, this
    }
    containsPoint(e) {
      return e.distanceToSquared(this.center) <= this.radius * this.radius
    }
    distanceToPoint(e) {
      return e.distanceTo(this.center) - this.radius
    }
    intersectsSphere(e) {
      let t = this.radius + e.radius;
      return e.center.distanceToSquared(this.center) <= t * t
    }
    intersectsBox(e) {
      return e.intersectsSphere(this)
    }
    intersectsPlane(e) {
      return Math.abs(e.distanceToPoint(this.center)) <= this.radius
    }
    clampPoint(e, t) {
      let i = this.center.distanceToSquared(e);
      return t.copy(e), i > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t
    }
    getBoundingBox(e) {
      return this.isEmpty()?(e.makeEmpty(), e): (e.set(this.center, this.center), e.expandByScalar(this.radius), e)
    }
    applyMatrix4(e) {
      return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this
    }
    translate(e) {
      return this.center.add(e), this
    }
    expandByPoint(e) {
      if (this.isEmpty())return this.center.copy(e), this.radius = 0, this;
      Gs.subVectors(e, this.center);
      let t = Gs.lengthSq();
      if (t > this.radius * this.radius) {
        let i = Math.sqrt(t), s = (i - this.radius) * .5;
        this.center.addScaledVector(Gs, s / i), this.radius += s
      }
      return this
    }
    union(e) {
      return e.isEmpty()?this: this.isEmpty()?(this.copy(e), this): (this.center.equals(e.center) === !0?this.radius = Math.max(this.radius, e.radius): (Cl.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Gs.copy(e.center).add(Cl)), this.expandByPoint(Gs.copy(e.center).sub(Cl))), this)
    }
    equals(e) {
      return e.center.equals(this.center) && e.radius === this.radius
    }
    clone() {
      return new this.constructor().copy(this)
    }
    toJSON() {
      return {
        radius: this.radius, center: this.center.toArray()
      }
    }
    fromJSON(e) {
      return this.radius = e.radius, this.center.fromArray(e.center), this
    }
  }, zn = new I, Il = new I, io = new I, ti = new I, Pl = new I, so = new I, Dl = new I, us = class {
    constructor(e = new I, t = new I(0, 0, - 1)) {
      this.origin = e, this.direction = t
    }
    set(e, t) {
      return this.origin.copy(e), this.direction.copy(t), this
    }
    copy(e) {
      return this.origin.copy(e.origin), this.direction.copy(e.direction), this
    }
    at(e, t) {
      return t.copy(this.origin).addScaledVector(this.direction, e)
    }
    lookAt(e) {
      return this.direction.copy(e).sub(this.origin).normalize(), this
    }
    recast(e) {
      return this.origin.copy(this.at(e, zn)), this
    }
    closestPointToPoint(e, t) {
      t.subVectors(e, this.origin);
      let i = t.dot(this.direction);
      return i < 0?t.copy(this.origin): t.copy(this.origin).addScaledVector(this.direction, i)
    }
    distanceToPoint(e) {
      return Math.sqrt(this.distanceSqToPoint(e))
    }
    distanceSqToPoint(e) {
      let t = zn.subVectors(e, this.origin).dot(this.direction);
      return t < 0?this.origin.distanceToSquared(e): (zn.copy(this.origin).addScaledVector(this.direction, t), zn.distanceToSquared(e))
    }
    distanceSqToSegment(e, t, i, s) {
      Il.copy(e).add(t).multiplyScalar(.5), io.copy(t).sub(e).normalize(), ti.copy(this.origin).sub(Il);
      let r = e.distanceTo(t) * .5, o = - this.direction.dot(io), a = ti.dot(this.direction), l = - ti.dot(io), c = ti.lengthSq(), h = Math.abs(1 - o * o), u, d, f, m;
      if (h > 0)if (u = o * l - a, d = o * a - l, m = r * h, u >= 0)if (d >= - m)if (d <= m) {
        let x = 1 / h;
        u *= x, d *= x, f = u * (u + o * d + 2 * a) + d * (o * u + d + 2 * l) + c
      } else d = r, u = Math.max(0, - (o * d + a)), f = - u * u + d * (d + 2 * l) + c;
      else d = - r, u = Math.max(0, - (o * d + a)), f = - u * u + d * (d + 2 * l) + c;
      else d <= - m?(u = Math.max(0, - ( - o * r + a)), d = u > 0? - r: Math.min(Math.max( - r, - l), r), f = - u * u + d * (d + 2 * l) + c): d <= m?(u = 0, d = Math.min(Math.max( - r, - l), r), f = d * (d + 2 * l) + c): (u = Math.max(0, - (o * r + a)), d = u > 0?r: Math.min(Math.max( - r, - l), r), f = - u * u + d * (d + 2 * l) + c);
      else d = o > 0? - r: r, u = Math.max(0, - (o * d + a)), f = - u * u + d * (d + 2 * l) + c;
      return i && i.copy(this.origin).addScaledVector(this.direction, u), s && s.copy(Il).addScaledVector(io, d), f
    }
    intersectSphere(e, t) {
      zn.subVectors(e.center, this.origin);
      let i = zn.dot(this.direction), s = zn.dot(zn) - i * i, r = e.radius * e.radius;
      if (s > r)return null;
      let o = Math.sqrt(r - s), a = i - o, l = i + o;
      return l < 0?null: a < 0?this.at(l, t): this.at(a, t)
    }
    intersectsSphere(e) {
      return e.radius < 0?!1: this.distanceSqToPoint(e.center) <= e.radius * e.radius
    }
    distanceToPlane(e) {
      let t = e.normal.dot(this.direction);
      if (t === 0)return e.distanceToPoint(this.origin) === 0?0: null;
      let i = - (this.origin.dot(e.normal) + e.constant) / t;
      return i >= 0?i: null
    }
    intersectPlane(e, t) {
      let i = this.distanceToPlane(e);
      return i === null?null: this.at(i, t)
    }
    intersectsPlane(e) {
      let t = e.distanceToPoint(this.origin);
      return t === 0 || e.normal.dot(this.direction) * t < 0
    }
    intersectBox(e, t) {
      let i, s, r, o, a, l, c = 1 / this.direction.x, h = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
      return c >= 0?(i = (e.min.x - d.x) * c, s = (e.max.x - d.x) * c): (i = (e.max.x - d.x) * c, s = (e.min.x - d.x) * c), h >= 0?(r = (e.min.y - d.y) * h, o = (e.max.y - d.y) * h): (r = (e.max.y - d.y) * h, o = (e.min.y - d.y) * h), i > o || r > s || ((r > i || isNaN(i)) && (i = r), (o < s || isNaN(s)) && (s = o), u >= 0?(a = (e.min.z - d.z) * u, l = (e.max.z - d.z) * u): (a = (e.max.z - d.z) * u, l = (e.min.z - d.z) * u), i > l || a > s) || ((a > i || i !== i) && (i = a), (l < s || s !== s) && (s = l), s < 0)?null: this.at(i >= 0?i: s, t)
    }
    intersectsBox(e) {
      return this.intersectBox(e, zn) !== null
    }
    intersectTriangle(e, t, i, s, r) {
      Pl.subVectors(t, e), so.subVectors(i, e), Dl.crossVectors(Pl, so);
      let o = this.direction.dot(Dl), a;
      if (o > 0) {
        if (s)return null;
        a = 1
      } else if (o < 0)a = - 1, o = - o;
      else return null;
      ti.subVectors(this.origin, e);
      let l = a * this.direction.dot(so.crossVectors(ti, so));
      if (l < 0)return null;
      let c = a * this.direction.dot(Pl.cross(ti));
      if (c < 0 || l + c > o)return null;
      let h = - a * ti.dot(Dl);
      return h < 0?null: this.at(h / o, r)
    }
    applyMatrix4(e) {
      return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this
    }
    equals(e) {
      return e.origin.equals(this.origin) && e.direction.equals(this.direction)
    }
    clone() {
      return new this.constructor().copy(this)
    }
  }, nt = class n {
    constructor(e, t, i, s, r, o, a, l, c, h, u, d, f, m, x, g) {
      n.prototype.isMatrix4 = !0, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], e !== void 0 && this.set(e, t, i, s, r, o, a, l, c, h, u, d, f, m, x, g)
    }
    set(e, t, i, s, r, o, a, l, c, h, u, d, f, m, x, g) {
      let p = this.elements;
      return p[0] = e, p[4] = t, p[8] = i, p[12] = s, p[1] = r, p[5] = o, p[9] = a, p[13] = l, p[2] = c, p[6] = h, p[10] = u, p[14] = d, p[3] = f, p[7] = m, p[11] = x, p[15] = g, this
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    }
    clone() {
      return new n().fromArray(this.elements)
    }
    copy(e) {
      let t = this.elements, i = e.elements;
      return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], t[9] = i[9], t[10] = i[10], t[11] = i[11], t[12] = i[12], t[13] = i[13], t[14] = i[14], t[15] = i[15], this
    }
    copyPosition(e) {
      let t = this.elements, i = e.elements;
      return t[12] = i[12], t[13] = i[13], t[14] = i[14], this
    }
    setFromMatrix3(e) {
      let t = e.elements;
      return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this
    }
    extractBasis(e, t, i) {
      return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this
    }
    makeBasis(e, t, i) {
      return this.set(e.x, t.x, i.x, 0, e.y, t.y, i.y, 0, e.z, t.z, i.z, 0, 0, 0, 0, 1), this
    }
    extractRotation(e) {
      let t = this.elements, i = e.elements, s = 1 / Ji.setFromMatrixColumn(e, 0).length(), r = 1 / Ji.setFromMatrixColumn(e, 1).length(), o = 1 / Ji.setFromMatrixColumn(e, 2).length();
      return t[0] = i[0] * s, t[1] = i[1] * s, t[2] = i[2] * s, t[3] = 0, t[4] = i[4] * r, t[5] = i[5] * r, t[6] = i[6] * r, t[7] = 0, t[8] = i[8] * o, t[9] = i[9] * o, t[10] = i[10] * o, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
    }
    makeRotationFromEuler(e) {
      let t = this.elements, i = e.x, s = e.y, r = e.z, o = Math.cos(i), a = Math.sin(i), l = Math.cos(s), c = Math.sin(s), h = Math.cos(r), u = Math.sin(r);
      if (e.order === "XYZ") {
        let d = o * h, f = o * u, m = a * h, x = a * u;
        t[0] = l * h, t[4] = - l * u, t[8] = c, t[1] = f + m * c, t[5] = d - x * c, t[9] = - a * l, t[2] = x - d * c, t[6] = m + f * c, t[10] = o * l
      } else if (e.order === "YXZ") {
        let d = l * h, f = l * u, m = c * h, x = c * u;
        t[0] = d + x * a, t[4] = m * a - f, t[8] = o * c, t[1] = o * u, t[5] = o * h, t[9] = - a, t[2] = f * a - m, t[6] = x + d * a, t[10] = o * l
      } else if (e.order === "ZXY") {
        let d = l * h, f = l * u, m = c * h, x = c * u;
        t[0] = d - x * a, t[4] = - o * u, t[8] = m + f * a, t[1] = f + m * a, t[5] = o * h, t[9] = x - d * a, t[2] = - o * c, t[6] = a, t[10] = o * l
      } else if (e.order === "ZYX") {
        let d = o * h, f = o * u, m = a * h, x = a * u;
        t[0] = l * h, t[4] = m * c - f, t[8] = d * c + x, t[1] = l * u, t[5] = x * c + d, t[9] = f * c - m, t[2] = - c, t[6] = a * l, t[10] = o * l
      } else if (e.order === "YZX") {
        let d = o * l, f = o * c, m = a * l, x = a * c;
        t[0] = l * h, t[4] = x - d * u, t[8] = m * u + f, t[1] = u, t[5] = o * h, t[9] = - a * h, t[2] = - c * h, t[6] = f * u + m, t[10] = d - x * u
      } else if (e.order === "XZY") {
        let d = o * l, f = o * c, m = a * l, x = a * c;
        t[0] = l * h, t[4] = - u, t[8] = c * h, t[1] = d * u + x, t[5] = o * h, t[9] = f * u - m, t[2] = m * u - f, t[6] = a * h, t[10] = x * u + d
      }
      return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
    }
    makeRotationFromQuaternion(e) {
      return this.compose(Xf, e, qf)
    }
    lookAt(e, t, i) {
      let s = this.elements;
      return en.subVectors(e, t), en.lengthSq() === 0 && (en.z = 1), en.normalize(), ni.crossVectors(i, en), ni.lengthSq() === 0 && (Math.abs(i.z) === 1?en.x += 1e-4: en.z += 1e-4, en.normalize(), ni.crossVectors(i, en)), ni.normalize(), ro.crossVectors(en, ni), s[0] = ni.x, s[4] = ro.x, s[8] = en.x, s[1] = ni.y, s[5] = ro.y, s[9] = en.y, s[2] = ni.z, s[6] = ro.z, s[10] = en.z, this
    }
    multiply(e) {
      return this.multiplyMatrices(this, e)
    }
    premultiply(e) {
      return this.multiplyMatrices(e, this)
    }
    multiplyMatrices(e, t) {
      let i = e.elements, s = t.elements, r = this.elements, o = i[0], a = i[4], l = i[8], c = i[12], h = i[1], u = i[5], d = i[9], f = i[13], m = i[2], x = i[6], g = i[10], p = i[14], E = i[3], b = i[7], y = i[11], R = i[15], w = s[0], P = s[4], D = s[8], M = s[12], v = s[1], C = s[5], F = s[9], z = s[13], G = s[2], q = s[6], W = s[10], te = s[14], V = s[3], ue = s[7], ve = s[11], Se = s[15];
      return r[0] = o * w + a * v + l * G + c * V, r[4] = o * P + a * C + l * q + c * ue, r[8] = o * D + a * F + l * W + c * ve, r[12] = o * M + a * z + l * te + c * Se, r[1] = h * w + u * v + d * G + f * V, r[5] = h * P + u * C + d * q + f * ue, r[9] = h * D + u * F + d * W + f * ve, r[13] = h * M + u * z + d * te + f * Se, r[2] = m * w + x * v + g * G + p * V, r[6] = m * P + x * C + g * q + p * ue, r[10] = m * D + x * F + g * W + p * ve, r[14] = m * M + x * z + g * te + p * Se, r[3] = E * w + b * v + y * G + R * V, r[7] = E * P + b * C + y * q + R * ue, r[11] = E * D + b * F + y * W + R * ve, r[15] = E * M + b * z + y * te + R * Se, this
    }
    multiplyScalar(e) {
      let t = this.elements;
      return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
    }
    determinant() {
      let e = this.elements, t = e[0], i = e[4], s = e[8], r = e[12], o = e[1], a = e[5], l = e[9], c = e[13], h = e[2], u = e[6], d = e[10], f = e[14], m = e[3], x = e[7], g = e[11], p = e[15];
      return m * ( + r * l * u - s * c * u - r * a * d + i * c * d + s * a * f - i * l * f) + x * ( + t * l * f - t * c * d + r * o * d - s * o * f + s * c * h - r * l * h) + g * ( + t * c * u - t * a * f - r * o * u + i * o * f + r * a * h - i * c * h) + p * ( - s * a * h - t * l * u + t * a * d + s * o * u - i * o * d + i * l * h)
    }
    transpose() {
      let e = this.elements, t;
      return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this
    }
    setPosition(e, t, i) {
      let s = this.elements;
      return e.isVector3?(s[12] = e.x, s[13] = e.y, s[14] = e.z): (s[12] = e, s[13] = t, s[14] = i), this
    }
    invert() {
      let e = this.elements, t = e[0], i = e[1], s = e[2], r = e[3], o = e[4], a = e[5], l = e[6], c = e[7], h = e[8], u = e[9], d = e[10], f = e[11], m = e[12], x = e[13], g = e[14], p = e[15], E = u * g * c - x * d * c + x * l * f - a * g * f - u * l * p + a * d * p, b = m * d * c - h * g * c - m * l * f + o * g * f + h * l * p - o * d * p, y = h * x * c - m * u * c + m * a * f - o * x * f - h * a * p + o * u * p, R = m * u * l - h * x * l - m * a * d + o * x * d + h * a * g - o * u * g, w = t * E + i * b + s * y + r * R;
      if (w === 0)return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      let P = 1 / w;
      return e[0] = E * P, e[1] = (x * d * r - u * g * r - x * s * f + i * g * f + u * s * p - i * d * p) * P, e[2] = (a * g * r - x * l * r + x * s * c - i * g * c - a * s * p + i * l * p) * P, e[3] = (u * l * r - a * d * r - u * s * c + i * d * c + a * s * f - i * l * f) * P, e[4] = b * P, e[5] = (h * g * r - m * d * r + m * s * f - t * g * f - h * s * p + t * d * p) * P, e[6] = (m * l * r - o * g * r - m * s * c + t * g * c + o * s * p - t * l * p) * P, e[7] = (o * d * r - h * l * r + h * s * c - t * d * c - o * s * f + t * l * f) * P, e[8] = y * P, e[9] = (m * u * r - h * x * r - m * i * f + t * x * f + h * i * p - t * u * p) * P, e[10] = (o * x * r - m * a * r + m * i * c - t * x * c - o * i * p + t * a * p) * P, e[11] = (h * a * r - o * u * r - h * i * c + t * u * c + o * i * f - t * a * f) * P, e[12] = R * P, e[13] = (h * x * s - m * u * s + m * i * d - t * x * d - h * i * g + t * u * g) * P, e[14] = (m * a * s - o * x * s - m * i * l + t * x * l + o * i * g - t * a * g) * P, e[15] = (o * u * s - h * a * s + h * i * l - t * u * l - o * i * d + t * a * d) * P, this
    }
    scale(e) {
      let t = this.elements, i = e.x, s = e.y, r = e.z;
      return t[0] *= i, t[4] *= s, t[8] *= r, t[1] *= i, t[5] *= s, t[9] *= r, t[2] *= i, t[6] *= s, t[10] *= r, t[3] *= i, t[7] *= s, t[11] *= r, this
    }
    getMaxScaleOnAxis() {
      let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], s = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
      return Math.sqrt(Math.max(t, i, s))
    }
    makeTranslation(e, t, i) {
      return e.isVector3?this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1): this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1), this
    }
    makeRotationX(e) {
      let t = Math.cos(e), i = Math.sin(e);
      return this.set(1, 0, 0, 0, 0, t, - i, 0, 0, i, t, 0, 0, 0, 0, 1), this
    }
    makeRotationY(e) {
      let t = Math.cos(e), i = Math.sin(e);
      return this.set(t, 0, i, 0, 0, 1, 0, 0, - i, 0, t, 0, 0, 0, 0, 1), this
    }
    makeRotationZ(e) {
      let t = Math.cos(e), i = Math.sin(e);
      return this.set(t, - i, 0, 0, i, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    }
    makeRotationAxis(e, t) {
      let i = Math.cos(t), s = Math.sin(t), r = 1 - i, o = e.x, a = e.y, l = e.z, c = r * o, h = r * a;
      return this.set(c * o + i, c * a - s * l, c * l + s * a, 0, c * a + s * l, h * a + i, h * l - s * o, 0, c * l - s * a, h * l + s * o, r * l * l + i, 0, 0, 0, 0, 1), this
    }
    makeScale(e, t, i) {
      return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this
    }
    makeShear(e, t, i, s, r, o) {
      return this.set(1, i, r, 0, e, 1, o, 0, t, s, 1, 0, 0, 0, 0, 1), this
    }
    compose(e, t, i) {
      let s = this.elements, r = t._x, o = t._y, a = t._z, l = t._w, c = r + r, h = o + o, u = a + a, d = r * c, f = r * h, m = r * u, x = o * h, g = o * u, p = a * u, E = l * c, b = l * h, y = l * u, R = i.x, w = i.y, P = i.z;
      return s[0] = (1 - (x + p)) * R, s[1] = (f + y) * R, s[2] = (m - b) * R, s[3] = 0, s[4] = (f - y) * w, s[5] = (1 - (d + p)) * w, s[6] = (g + E) * w, s[7] = 0, s[8] = (m + b) * P, s[9] = (g - E) * P, s[10] = (1 - (d + x)) * P, s[11] = 0, s[12] = e.x, s[13] = e.y, s[14] = e.z, s[15] = 1, this
    }
    decompose(e, t, i) {
      let s = this.elements, r = Ji.set(s[0], s[1], s[2]).length(), o = Ji.set(s[4], s[5], s[6]).length(), a = Ji.set(s[8], s[9], s[10]).length();
      this.determinant() < 0 && (r = - r), e.x = s[12], e.y = s[13], e.z = s[14], mn.copy(this);
      let c = 1 / r, h = 1 / o, u = 1 / a;
      return mn.elements[0] *= c, mn.elements[1] *= c, mn.elements[2] *= c, mn.elements[4] *= h, mn.elements[5] *= h, mn.elements[6] *= h, mn.elements[8] *= u, mn.elements[9] *= u, mn.elements[10] *= u, t.setFromRotationMatrix(mn), i.x = r, i.y = o, i.z = a, this
    }
    makePerspective(e, t, i, s, r, o, a = _n, l = !1) {
      let c = this.elements, h = 2 * r / (t - e), u = 2 * r / (i - s), d = (t + e) / (t - e), f = (i + s) / (i - s), m, x;
      if (l)m = r / (o - r), x = o * r / (o - r);
      else if (a === _n)m = - (o + r) / (o - r), x = - 2 * o * r / (o - r);
      else if (a === ir)m = - o / (o - r), x = - o * r / (o - r);
      else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
      return c[0] = h, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = u, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = m, c[14] = x, c[3] = 0, c[7] = 0, c[11] = - 1, c[15] = 0, this
    }
    makeOrthographic(e, t, i, s, r, o, a = _n, l = !1) {
      let c = this.elements, h = 2 / (t - e), u = 2 / (i - s), d = - (t + e) / (t - e), f = - (i + s) / (i - s), m, x;
      if (l)m = 1 / (o - r), x = o / (o - r);
      else if (a === _n)m = - 2 / (o - r), x = - (o + r) / (o - r);
      else if (a === ir)m = - 1 / (o - r), x = - r / (o - r);
      else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
      return c[0] = h, c[4] = 0, c[8] = 0, c[12] = d, c[1] = 0, c[5] = u, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = m, c[14] = x, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this
    }
    equals(e) {
      let t = this.elements, i = e.elements;
      for (let s = 0;
      s < 16;
      s++)if (t[s] !== i[s])return!1;
      return!0
    }
    fromArray(e, t = 0) {
      for (let i = 0;
      i < 16;
      i++)this.elements[i] = e[i + t];
      return this
    }
    toArray(e = [], t = 0) {
      let i = this.elements;
      return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e[t + 9] = i[9], e[t + 10] = i[10], e[t + 11] = i[11], e[t + 12] = i[12], e[t + 13] = i[13], e[t + 14] = i[14], e[t + 15] = i[15], e
    }
  }, Ji = new I, mn = new nt, Xf = new I(0, 0, 0), qf = new I(1, 1, 1), ni = new I, ro = new I, en = new I, Ah = new nt, Rh = new qn, vn = class n {
    constructor(e = 0, t = 0, i = 0, s = n.DEFAULT_ORDER) {
      this.isEuler = !0, this._x = e, this._y = t, this._z = i, this._order = s
    }
    get x() {
      return this._x
    }
    set x(e) {
      this._x = e, this._onChangeCallback()
    }
    get y() {
      return this._y
    }
    set y(e) {
      this._y = e, this._onChangeCallback()
    }
    get z() {
      return this._z
    }
    set z(e) {
      this._z = e, this._onChangeCallback()
    }
    get order() {
      return this._order
    }
    set order(e) {
      this._order = e, this._onChangeCallback()
    }
    set(e, t, i, s = this._order) {
      return this._x = e, this._y = t, this._z = i, this._order = s, this._onChangeCallback(), this
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order)
    }
    copy(e) {
      return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this
    }
    setFromRotationMatrix(e, t = this._order, i = !0) {
      let s = e.elements, r = s[0], o = s[4], a = s[8], l = s[1], c = s[5], h = s[9], u = s[2], d = s[6], f = s[10];
      switch (t) {
        case "XYZ": this._y = Math.asin(Ye(a, - 1, 1)), Math.abs(a) < .9999999?(this._x = Math.atan2( - h, f), this._z = Math.atan2( - o, r)): (this._x = Math.atan2(d, c), this._z = 0);
        break;
        case "YXZ": this._x = Math.asin( - Ye(h, - 1, 1)), Math.abs(h) < .9999999?(this._y = Math.atan2(a, f), this._z = Math.atan2(l, c)): (this._y = Math.atan2( - u, r), this._z = 0);
        break;
        case "ZXY": this._x = Math.asin(Ye(d, - 1, 1)), Math.abs(d) < .9999999?(this._y = Math.atan2( - u, f), this._z = Math.atan2( - o, c)): (this._y = 0, this._z = Math.atan2(l, r));
        break;
        case "ZYX": this._y = Math.asin( - Ye(u, - 1, 1)), Math.abs(u) < .9999999?(this._x = Math.atan2(d, f), this._z = Math.atan2(l, r)): (this._x = 0, this._z = Math.atan2( - o, c));
        break;
        case "YZX": this._z = Math.asin(Ye(l, - 1, 1)), Math.abs(l) < .9999999?(this._x = Math.atan2( - h, c), this._y = Math.atan2( - u, r)): (this._x = 0, this._y = Math.atan2(a, f));
        break;
        case "XZY": this._z = Math.asin( - Ye(o, - 1, 1)), Math.abs(o) < .9999999?(this._x = Math.atan2(d, c), this._y = Math.atan2(a, r)): (this._x = Math.atan2( - h, f), this._y = 0);
        break;
        default: console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t)
      }
      return this._order = t, i === !0 && this._onChangeCallback(), this
    }
    setFromQuaternion(e, t, i) {
      return Ah.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Ah, t, i)
    }
    setFromVector3(e, t = this._order) {
      return this.set(e.x, e.y, e.z, t)
    }
    reorder(e) {
      return Rh.setFromEuler(this), this.setFromQuaternion(Rh, e)
    }
    equals(e) {
      return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
    }
    fromArray(e) {
      return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this
    }
    toArray(e = [], t = 0) {
      return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e
    }
    _onChange(e) {
      return this._onChangeCallback = e, this
    }
    _onChangeCallback() {
    } * [Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._order
    }
  };
  vn.DEFAULT_ORDER = "XYZ";
  var or = class {
    constructor() {
      this.mask = 1
    }
    set(e) {
      this.mask = (1 << e | 0) >>> 0
    }
    enable(e) {
      this.mask |= 1 << e | 0
    }
    enableAll() {
      this.mask = - 1
    }
    toggle(e) {
      this.mask ^= 1 << e | 0
    }
    disable(e) {
      this.mask &= ~(1 << e | 0)
    }
    disableAll() {
      this.mask = 0
    }
    test(e) {
      return(this.mask & e.mask) !== 0
    }
    isEnabled(e) {
      return(this.mask & (1 << e | 0)) !== 0
    }
  }, Yf = 0, Ch = new I, Ki = new qn, kn = new nt, oo = new I, Ws = new I, Zf = new I, $f = new qn, Ih = new I(1, 0, 0), Ph = new I(0, 1, 0), Dh = new I(0, 0, 1), Lh = {
    type: "added"
  }, Jf = {
    type: "removed"
  }, Qi = {
    type: "childadded", child: null
  }, Ll = {
    type: "childremoved", child: null
  }, bt = class n extends Xn {
    constructor() {
      super(), this.isObject3D = !0, Object.defineProperty(this, "id", {
        value: Yf++
      }), this.uuid = Fi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = n.DEFAULT_UP.clone();
      let e = new I, t = new vn, i = new qn, s = new I(1, 1, 1);
      function r() {
        i.setFromEuler(t, !1)
      }
      function o() {
        t.setFromQuaternion(i, void 0, !1)
      }
      t._onChange(r), i._onChange(o), Object.defineProperties(this, {
        position: {
          configurable: !0, enumerable: !0, value: e
        }, rotation: {
          configurable: !0, enumerable: !0, value: t
        }, quaternion: {
          configurable: !0, enumerable: !0, value: i
        }, scale: {
          configurable: !0, enumerable: !0, value: s
        }, modelViewMatrix: {
          value: new nt
        }, normalMatrix: {
          value: new We
        }
      }), this.matrix = new nt, this.matrixWorld = new nt, this.matrixAutoUpdate = n.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new or, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.userData = {
      }
    }
    onBeforeShadow() {
    }
    onAfterShadow() {
    }
    onBeforeRender() {
    }
    onAfterRender() {
    }
    applyMatrix4(e) {
      this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale)
    }
    applyQuaternion(e) {
      return this.quaternion.premultiply(e), this
    }
    setRotationFromAxisAngle(e, t) {
      this.quaternion.setFromAxisAngle(e, t)
    }
    setRotationFromEuler(e) {
      this.quaternion.setFromEuler(e, !0)
    }
    setRotationFromMatrix(e) {
      this.quaternion.setFromRotationMatrix(e)
    }
    setRotationFromQuaternion(e) {
      this.quaternion.copy(e)
    }
    rotateOnAxis(e, t) {
      return Ki.setFromAxisAngle(e, t), this.quaternion.multiply(Ki), this
    }
    rotateOnWorldAxis(e, t) {
      return Ki.setFromAxisAngle(e, t), this.quaternion.premultiply(Ki), this
    }
    rotateX(e) {
      return this.rotateOnAxis(Ih, e)
    }
    rotateY(e) {
      return this.rotateOnAxis(Ph, e)
    }
    rotateZ(e) {
      return this.rotateOnAxis(Dh, e)
    }
    translateOnAxis(e, t) {
      return Ch.copy(e).applyQuaternion(this.quaternion), this.position.add(Ch.multiplyScalar(t)), this
    }
    translateX(e) {
      return this.translateOnAxis(Ih, e)
    }
    translateY(e) {
      return this.translateOnAxis(Ph, e)
    }
    translateZ(e) {
      return this.translateOnAxis(Dh, e)
    }
    localToWorld(e) {
      return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld)
    }
    worldToLocal(e) {
      return this.updateWorldMatrix(!0, !1), e.applyMatrix4(kn.copy(this.matrixWorld).invert())
    }
    lookAt(e, t, i) {
      e.isVector3?oo.copy(e): oo.set(e, t, i);
      let s = this.parent;
      this.updateWorldMatrix(!0, !1), Ws.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight?kn.lookAt(Ws, oo, this.up): kn.lookAt(oo, Ws, this.up), this.quaternion.setFromRotationMatrix(kn), s && (kn.extractRotation(s.matrixWorld), Ki.setFromRotationMatrix(kn), this.quaternion.premultiply(Ki.invert()))
    }
    add(e) {
      if (arguments.length > 1) {
        for (let t = 0;
        t < arguments.length;
        t++)this.add(arguments[t]);
        return this
      }
      return e === this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this): (e && e.isObject3D?(e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Lh), Qi.child = e, this.dispatchEvent(Qi), Qi.child = null): console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this)
    }
    remove(e) {
      if (arguments.length > 1) {
        for (let i = 0;
        i < arguments.length;
        i++)this.remove(arguments[i]);
        return this
      }
      let t = this.children.indexOf(e);
      return t !== - 1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Jf), Ll.child = e, this.dispatchEvent(Ll), Ll.child = null), this
    }
    removeFromParent() {
      let e = this.parent;
      return e !== null && e.remove(this), this
    }
    clear() {
      return this.remove(...this.children)
    }
    attach(e) {
      return this.updateWorldMatrix(!0, !1), kn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), kn.multiply(e.parent.matrixWorld)), e.applyMatrix4(kn), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(Lh), Qi.child = e, this.dispatchEvent(Qi), Qi.child = null, this
    }
    getObjectById(e) {
      return this.getObjectByProperty("id", e)
    }
    getObjectByName(e) {
      return this.getObjectByProperty("name", e)
    }
    getObjectByProperty(e, t) {
      if (this[e] === t)return this;
      for (let i = 0, s = this.children.length;
      i < s;
      i++) {
        let o = this.children[i].getObjectByProperty(e, t);
        if (o !== void 0)return o
      }
    }
    getObjectsByProperty(e, t, i = []) {
      this[e] === t && i.push(this);
      let s = this.children;
      for (let r = 0, o = s.length;
      r < o;
      r++)s[r].getObjectsByProperty(e, t, i);
      return i
    }
    getWorldPosition(e) {
      return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld)
    }
    getWorldQuaternion(e) {
      return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ws, e, Zf), e
    }
    getWorldScale(e) {
      return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ws, $f, e), e
    }
    getWorldDirection(e) {
      this.updateWorldMatrix(!0, !1);
      let t = this.matrixWorld.elements;
      return e.set(t[8], t[9], t[10]).normalize()
    }
    raycast() {
    }
    traverse(e) {
      e(this);
      let t = this.children;
      for (let i = 0, s = t.length;
      i < s;
      i++)t[i].traverse(e)
    }
    traverseVisible(e) {
      if (this.visible === !1)return;
      e(this);
      let t = this.children;
      for (let i = 0, s = t.length;
      i < s;
      i++)t[i].traverseVisible(e)
    }
    traverseAncestors(e) {
      let t = this.parent;
      t !== null && (e(t), t.traverseAncestors(e))
    }
    updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
    }
    updateMatrixWorld(e) {
      this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null?this.matrixWorld.copy(this.matrix): this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
      let t = this.children;
      for (let i = 0, s = t.length;
      i < s;
      i++)t[i].updateMatrixWorld(e)
    }
    updateWorldMatrix(e, t) {
      let i = this.parent;
      if (e === !0 && i !== null && i.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null?this.matrixWorld.copy(this.matrix): this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) {
        let s = this.children;
        for (let r = 0, o = s.length;
        r < o;
        r++)s[r].updateWorldMatrix(!1, !0)
      }
    }
    toJSON(e) {
      let t = e === void 0 || typeof e == "string", i = {
      };
      t && (e = {
        geometries: {
        }, materials: {
        }, textures: {
        }, images: {
        }, shapes: {
        }, skeletons: {
        }, animations: {
        }, nodes: {
        }
      }, i.metadata = {
        version: 4.7, type: "Object", generator: "Object3D.toJSON"
      });
      let s = {
      };
      s.uuid = this.uuid, s.type = this.type, this.name !== "" && (s.name = this.name), this.castShadow === !0 && (s.castShadow = !0), this.receiveShadow === !0 && (s.receiveShadow = !0), this.visible === !1 && (s.visible = !1), this.frustumCulled === !1 && (s.frustumCulled = !1), this.renderOrder !== 0 && (s.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (s.userData = this.userData), s.layers = this.layers.mask, s.matrix = this.matrix.toArray(), s.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (s.matrixAutoUpdate = !1), this.isInstancedMesh && (s.type = "InstancedMesh", s.count = this.count, s.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (s.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (s.type = "BatchedMesh", s.perObjectFrustumCulled = this.perObjectFrustumCulled, s.sortObjects = this.sortObjects, s.drawRanges = this._drawRanges, s.reservedRanges = this._reservedRanges, s.geometryInfo = this._geometryInfo.map(a => ({
        ...a, boundingBox: a.boundingBox?a.boundingBox.toJSON(): void 0, boundingSphere: a.boundingSphere?a.boundingSphere.toJSON(): void 0
      })), s.instanceInfo = this._instanceInfo.map(a => ({
        ...a
      })), s.availableInstanceIds = this._availableInstanceIds.slice(), s.availableGeometryIds = this._availableGeometryIds.slice(), s.nextIndexStart = this._nextIndexStart, s.nextVertexStart = this._nextVertexStart, s.geometryCount = this._geometryCount, s.maxInstanceCount = this._maxInstanceCount, s.maxVertexCount = this._maxVertexCount, s.maxIndexCount = this._maxIndexCount, s.geometryInitialized = this._geometryInitialized, s.matricesTexture = this._matricesTexture.toJSON(e), s.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (s.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (s.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (s.boundingBox = this.boundingBox.toJSON()));
      function r(a, l) {
        return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(e)), l.uuid
      }
      if (this.isScene)this.background && (this.background.isColor?s.background = this.background.toJSON(): this.background.isTexture && (s.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (s.environment = this.environment.toJSON(e).uuid);
      else if (this.isMesh || this.isLine || this.isPoints) {
        s.geometry = r(e.geometries, this.geometry);
        let a = this.geometry.parameters;
        if (a !== void 0 && a.shapes !== void 0) {
          let l = a.shapes;
          if (Array.isArray(l))for (let c = 0, h = l.length;
          c < h;
          c++) {
            let u = l[c];
            r(e.shapes, u)
          } else r(e.shapes, l)
        }
      }
      if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(e.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0)if (Array.isArray(this.material)) {
        let a = [];
        for (let l = 0, c = this.material.length;
        l < c;
        l++)a.push(r(e.materials, this.material[l]));
        s.material = a
      } else s.material = r(e.materials, this.material);
      if (this.children.length > 0) {
        s.children = [];
        for (let a = 0;
        a < this.children.length;
        a++)s.children.push(this.children[a].toJSON(e).object)
      }
      if (this.animations.length > 0) {
        s.animations = [];
        for (let a = 0;
        a < this.animations.length;
        a++) {
          let l = this.animations[a];
          s.animations.push(r(e.animations, l))
        }
      }
      if (t) {
        let a = o(e.geometries), l = o(e.materials), c = o(e.textures), h = o(e.images), u = o(e.shapes), d = o(e.skeletons), f = o(e.animations), m = o(e.nodes);
        a.length > 0 && (i.geometries = a), l.length > 0 && (i.materials = l), c.length > 0 && (i.textures = c), h.length > 0 && (i.images = h), u.length > 0 && (i.shapes = u), d.length > 0 && (i.skeletons = d), f.length > 0 && (i.animations = f), m.length > 0 && (i.nodes = m)
      }
      return i.object = s, i;
      function o(a) {
        let l = [];
        for (let c in a) {
          let h = a[c];
          delete h.metadata, l.push(h)
        }
        return l
      }
    }
    clone(e) {
      return new this.constructor().copy(this, e)
    }
    copy(e, t = !0) {
      if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)for (let i = 0;
      i < e.children.length;
      i++) {
        let s = e.children[i];
        this.add(s.clone())
      }
      return this
    }
  };
  bt.DEFAULT_UP = new I(0, 1, 0);
  bt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
  bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
  var gn = new I, Hn = new I, Ul = new I, Vn = new I, ji = new I, es = new I, Uh = new I, Nl = new I, Fl = new I, Ol = new I, Bl = new ot, zl = new ot, kl = new ot, ri = class n {
    constructor(e = new I, t = new I, i = new I) {
      this.a = e, this.b = t, this.c = i
    }
    static getNormal(e, t, i, s) {
      s.subVectors(i, t), gn.subVectors(e, t), s.cross(gn);
      let r = s.lengthSq();
      return r > 0?s.multiplyScalar(1 / Math.sqrt(r)): s.set(0, 0, 0)
    }
    static getBarycoord(e, t, i, s, r) {
      gn.subVectors(s, t), Hn.subVectors(i, t), Ul.subVectors(e, t);
      let o = gn.dot(gn), a = gn.dot(Hn), l = gn.dot(Ul), c = Hn.dot(Hn), h = Hn.dot(Ul), u = o * c - a * a;
      if (u === 0)return r.set(0, 0, 0), null;
      let d = 1 / u, f = (c * l - a * h) * d, m = (o * h - a * l) * d;
      return r.set(1 - f - m, m, f)
    }
    static containsPoint(e, t, i, s) {
      return this.getBarycoord(e, t, i, s, Vn) === null?!1: Vn.x >= 0 && Vn.y >= 0 && Vn.x + Vn.y <= 1
    }
    static getInterpolation(e, t, i, s, r, o, a, l) {
      return this.getBarycoord(e, t, i, s, Vn) === null?(l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null): (l.setScalar(0), l.addScaledVector(r, Vn.x), l.addScaledVector(o, Vn.y), l.addScaledVector(a, Vn.z), l)
    }
    static getInterpolatedAttribute(e, t, i, s, r, o) {
      return Bl.setScalar(0), zl.setScalar(0), kl.setScalar(0), Bl.fromBufferAttribute(e, t), zl.fromBufferAttribute(e, i), kl.fromBufferAttribute(e, s), o.setScalar(0), o.addScaledVector(Bl, r.x), o.addScaledVector(zl, r.y), o.addScaledVector(kl, r.z), o
    }
    static isFrontFacing(e, t, i, s) {
      return gn.subVectors(i, t), Hn.subVectors(e, t), gn.cross(Hn).dot(s) < 0
    }
    set(e, t, i) {
      return this.a.copy(e), this.b.copy(t), this.c.copy(i), this
    }
    setFromPointsAndIndices(e, t, i, s) {
      return this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[s]), this
    }
    setFromAttributeAndIndices(e, t, i, s) {
      return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, i), this.c.fromBufferAttribute(e, s), this
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(e) {
      return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
    }
    getArea() {
      return gn.subVectors(this.c, this.b), Hn.subVectors(this.a, this.b), gn.cross(Hn).length() * .5
    }
    getMidpoint(e) {
      return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
    }
    getNormal(e) {
      return n.getNormal(this.a, this.b, this.c, e)
    }
    getPlane(e) {
      return e.setFromCoplanarPoints(this.a, this.b, this.c)
    }
    getBarycoord(e, t) {
      return n.getBarycoord(e, this.a, this.b, this.c, t)
    }
    getInterpolation(e, t, i, s, r) {
      return n.getInterpolation(e, this.a, this.b, this.c, t, i, s, r)
    }
    containsPoint(e) {
      return n.containsPoint(e, this.a, this.b, this.c)
    }
    isFrontFacing(e) {
      return n.isFrontFacing(this.a, this.b, this.c, e)
    }
    intersectsBox(e) {
      return e.intersectsTriangle(this)
    }
    closestPointToPoint(e, t) {
      let i = this.a, s = this.b, r = this.c, o, a;
      ji.subVectors(s, i), es.subVectors(r, i), Nl.subVectors(e, i);
      let l = ji.dot(Nl), c = es.dot(Nl);
      if (l <= 0 && c <= 0)return t.copy(i);
      Fl.subVectors(e, s);
      let h = ji.dot(Fl), u = es.dot(Fl);
      if (h >= 0 && u <= h)return t.copy(s);
      let d = l * u - h * c;
      if (d <= 0 && l >= 0 && h <= 0)return o = l / (l - h), t.copy(i).addScaledVector(ji, o);
      Ol.subVectors(e, r);
      let f = ji.dot(Ol), m = es.dot(Ol);
      if (m >= 0 && f <= m)return t.copy(r);
      let x = f * c - l * m;
      if (x <= 0 && c >= 0 && m <= 0)return a = c / (c - m), t.copy(i).addScaledVector(es, a);
      let g = h * m - f * u;
      if (g <= 0 && u - h >= 0 && f - m >= 0)return Uh.subVectors(r, s), a = (u - h) / (u - h + (f - m)), t.copy(s).addScaledVector(Uh, a);
      let p = 1 / (g + x + d);
      return o = x * p, a = d * p, t.copy(i).addScaledVector(ji, o).addScaledVector(es, a)
    }
    equals(e) {
      return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
    }
  }, Gu = {
    aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074
  }, ii = {
    h: 0, s: 0, l: 0
  }, ao = {
    h: 0, s: 0, l: 0
  };
  function Hl(n, e, t) {
    return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6?n + (e - n) * 6 * t: t < 1 / 2?e: t < 2 / 3?n + (e - n) * 6 * (2 / 3 - t): n
  }
  var ke = class {
    constructor(e, t, i) {
      return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, i)
    }
    set(e, t, i) {
      if (t === void 0 && i === void 0) {
        let s = e;
        s && s.isColor?this.copy(s): typeof s == "number"?this.setHex(s): typeof s == "string" && this.setStyle(s)
      } else this.setRGB(e, t, i);
      return this
    }
    setScalar(e) {
      return this.r = e, this.g = e, this.b = e, this
    }
    setHex(e, t = Vt) {
      return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, et.colorSpaceToWorking(this, t), this
    }
    setRGB(e, t, i, s = et.workingColorSpace) {
      return this.r = e, this.g = t, this.b = i, et.colorSpaceToWorking(this, s), this
    }
    setHSL(e, t, i, s = et.workingColorSpace) {
      if (e = wc(e, 1), t = Ye(t, 0, 1), i = Ye(i, 0, 1), t === 0)this.r = this.g = this.b = i;
      else {
        let r = i <= .5?i * (1 + t): i + t - i * t, o = 2 * i - r;
        this.r = Hl(o, r, e + 1 / 3), this.g = Hl(o, r, e), this.b = Hl(o, r, e - 1 / 3)
      }
      return et.colorSpaceToWorking(this, s), this
    }
    setStyle(e, t = Vt) {
      function i(r) {
        r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.")
      }
      let s;
      if (s = /^(\w+)\(([^\)]*)\)/.exec(e)) {
        let r, o = s[1], a = s[2];
        switch (o) {
          case "rgb": case "rgba": if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, t);
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, t);
          break;
          case "hsl": case "hsla": if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, t);
          break;
          default: console.warn("THREE.Color: Unknown color model " + e)
        }
      } else if (s = /^\#([A-Fa-f\d]+)$/.exec(e)) {
        let r = s[1], o = r.length;
        if (o === 3)return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t);
        if (o === 6)return this.setHex(parseInt(r, 16), t);
        console.warn("THREE.Color: Invalid hex color " + e)
      } else if (e && e.length > 0)return this.setColorName(e, t);
      return this
    }
    setColorName(e, t = Vt) {
      let i = Gu[e.toLowerCase()];
      return i !== void 0?this.setHex(i, t): console.warn("THREE.Color: Unknown color " + e), this
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b)
    }
    copy(e) {
      return this.r = e.r, this.g = e.g, this.b = e.b, this
    }
    copySRGBToLinear(e) {
      return this.r = Gn(e.r), this.g = Gn(e.g), this.b = Gn(e.b), this
    }
    copyLinearToSRGB(e) {
      return this.r = os(e.r), this.g = os(e.g), this.b = os(e.b), this
    }
    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this
    }
    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this
    }
    getHex(e = Vt) {
      return et.workingToColorSpace(Ft.copy(this), e), Math.round(Ye(Ft.r * 255, 0, 255)) * 65536 + Math.round(Ye(Ft.g * 255, 0, 255)) * 256 + Math.round(Ye(Ft.b * 255, 0, 255))
    }
    getHexString(e = Vt) {
      return("000000" + this.getHex(e).toString(16)).slice( - 6)
    }
    getHSL(e, t = et.workingColorSpace) {
      et.workingToColorSpace(Ft.copy(this), t);
      let i = Ft.r, s = Ft.g, r = Ft.b, o = Math.max(i, s, r), a = Math.min(i, s, r), l, c, h = (a + o) / 2;
      if (a === o)l = 0, c = 0;
      else {
        let u = o - a;
        switch (c = h <= .5?u / (o + a): u / (2 - o - a), o) {
          case i: l = (s - r) / u + (s < r?6: 0);
          break;
          case s: l = (r - i) / u + 2;
          break;
          case r: l = (i - s) / u + 4;
          break
        }
        l /= 6
      }
      return e.h = l, e.s = c, e.l = h, e
    }
    getRGB(e, t = et.workingColorSpace) {
      return et.workingToColorSpace(Ft.copy(this), t), e.r = Ft.r, e.g = Ft.g, e.b = Ft.b, e
    }
    getStyle(e = Vt) {
      et.workingToColorSpace(Ft.copy(this), e);
      let t = Ft.r, i = Ft.g, s = Ft.b;
      return e !== Vt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`: `rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`
    }
    offsetHSL(e, t, i) {
      return this.getHSL(ii), this.setHSL(ii.h + e, ii.s + t, ii.l + i)
    }
    add(e) {
      return this.r += e.r, this.g += e.g, this.b += e.b, this
    }
    addColors(e, t) {
      return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
    }
    addScalar(e) {
      return this.r += e, this.g += e, this.b += e, this
    }
    sub(e) {
      return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this
    }
    multiply(e) {
      return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
    }
    multiplyScalar(e) {
      return this.r *= e, this.g *= e, this.b *= e, this
    }
    lerp(e, t) {
      return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
    }
    lerpColors(e, t, i) {
      return this.r = e.r + (t.r - e.r) * i, this.g = e.g + (t.g - e.g) * i, this.b = e.b + (t.b - e.b) * i, this
    }
    lerpHSL(e, t) {
      this.getHSL(ii), e.getHSL(ao);
      let i = Qs(ii.h, ao.h, t), s = Qs(ii.s, ao.s, t), r = Qs(ii.l, ao.l, t);
      return this.setHSL(i, s, r), this
    }
    setFromVector3(e) {
      return this.r = e.x, this.g = e.y, this.b = e.z, this
    }
    applyMatrix3(e) {
      let t = this.r, i = this.g, s = this.b, r = e.elements;
      return this.r = r[0] * t + r[3] * i + r[6] * s, this.g = r[1] * t + r[4] * i + r[7] * s, this.b = r[2] * t + r[5] * i + r[8] * s, this
    }
    equals(e) {
      return e.r === this.r && e.g === this.g && e.b === this.b
    }
    fromArray(e, t = 0) {
      return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this
    }
    toArray(e = [], t = 0) {
      return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e
    }
    fromBufferAttribute(e, t) {
      return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this
    }
    toJSON() {
      return this.getHex()
    } * [Symbol.iterator]() {
      yield this.r, yield this.g, yield this.b
    }
  }, Ft = new ke;
  ke.NAMES = Gu;
  var Kf = 0, Cn = class extends Xn {
    constructor() {
      super(), this.isMaterial = !0, Object.defineProperty(this, "id", {
        value: Kf++
      }), this.uuid = Fi(), this.name = "", this.type = "Material", this.blending = Ri, this.side = Wn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = Ro, this.blendDst = Co, this.blendEquation = ai, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new ke(0, 0, 0), this.blendAlpha = 0, this.depthFunc = Ci, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = ec, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = wi, this.stencilZFail = wi, this.stencilZPass = wi, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {
      }, this.version = 0, this._alphaTest = 0
    }
    get alphaTest() {
      return this._alphaTest
    }
    set alphaTest(e) {
      this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e
    }
    onBeforeRender() {
    }
    onBeforeCompile() {
    }
    customProgramCacheKey() {
      return this.onBeforeCompile.toString()
    }
    setValues(e) {
      if (e !== void 0)for (let t in e) {
        let i = e[t];
        if (i === void 0) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue
        }
        let s = this[t];
        if (s === void 0) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue
        }
        s && s.isColor?s.set(i): s && s.isVector3 && i && i.isVector3?s.copy(i): this[t] = i
      }
    }
    toJSON(e) {
      let t = e === void 0 || typeof e == "string";
      t && (e = {
        textures: {
        }, images: {
        }
      });
      let i = {
        metadata: {
          version: 4.7, type: "Material", generator: "Material.toJSON"
        }
      };
      i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.color && this.color.isColor && (i.color = this.color.getHex()), this.roughness !== void 0 && (i.roughness = this.roughness), this.metalness !== void 0 && (i.metalness = this.metalness), this.sheen !== void 0 && (i.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (i.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (i.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (i.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (i.shininess = this.shininess), this.clearcoat !== void 0 && (i.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (i.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (i.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (i.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (i.dispersion = this.dispersion), this.iridescence !== void 0 && (i.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (i.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (i.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (i.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (i.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (i.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(e).uuid, i.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(e).uuid, i.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(e).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(e).uuid, i.normalMapType = this.normalMapType, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(e).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (i.combine = this.combine)), this.envMapRotation !== void 0 && (i.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (i.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (i.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (i.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (i.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (i.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (i.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (i.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (i.size = this.size), this.shadowSide !== null && (i.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (i.sizeAttenuation = this.sizeAttenuation), this.blending !== Ri && (i.blending = this.blending), this.side !== Wn && (i.side = this.side), this.vertexColors === !0 && (i.vertexColors = !0), this.opacity < 1 && (i.opacity = this.opacity), this.transparent === !0 && (i.transparent = !0), this.blendSrc !== Ro && (i.blendSrc = this.blendSrc), this.blendDst !== Co && (i.blendDst = this.blendDst), this.blendEquation !== ai && (i.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (i.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (i.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (i.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (i.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (i.blendAlpha = this.blendAlpha), this.depthFunc !== Ci && (i.depthFunc = this.depthFunc), this.depthTest === !1 && (i.depthTest = this.depthTest), this.depthWrite === !1 && (i.depthWrite = this.depthWrite), this.colorWrite === !1 && (i.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (i.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== ec && (i.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (i.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (i.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== wi && (i.stencilFail = this.stencilFail), this.stencilZFail !== wi && (i.stencilZFail = this.stencilZFail), this.stencilZPass !== wi && (i.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (i.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (i.rotation = this.rotation), this.polygonOffset === !0 && (i.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (i.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (i.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (i.linewidth = this.linewidth), this.dashSize !== void 0 && (i.dashSize = this.dashSize), this.gapSize !== void 0 && (i.gapSize = this.gapSize), this.scale !== void 0 && (i.scale = this.scale), this.dithering === !0 && (i.dithering = !0), this.alphaTest > 0 && (i.alphaTest = this.alphaTest), this.alphaHash === !0 && (i.alphaHash = !0), this.alphaToCoverage === !0 && (i.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (i.premultipliedAlpha = !0), this.forceSinglePass === !0 && (i.forceSinglePass = !0), this.wireframe === !0 && (i.wireframe = !0), this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (i.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (i.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (i.flatShading = !0), this.visible === !1 && (i.visible = !1), this.toneMapped === !1 && (i.toneMapped = !1), this.fog === !1 && (i.fog = !1), Object.keys(this.userData).length > 0 && (i.userData = this.userData);
      function s(r) {
        let o = [];
        for (let a in r) {
          let l = r[a];
          delete l.metadata, o.push(l)
        }
        return o
      }
      if (t) {
        let r = s(e.textures), o = s(e.images);
        r.length > 0 && (i.textures = r), o.length > 0 && (i.images = o)
      }
      return i
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(e) {
      this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
      let t = e.clippingPlanes, i = null;
      if (t !== null) {
        let s = t.length;
        i = new Array(s);
        for (let r = 0;
        r !== s;
        ++r)i[r] = t[r].clone()
      }
      return this.clippingPlanes = i, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this
    }
    dispose() {
      this.dispatchEvent({
        type: "dispose"
      })
    }
    set needsUpdate(e) {
      e === !0 && this.version++
    }
  }, ar = class extends Cn {
    constructor(e) {
      super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new ke(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new vn, this.combine = pc, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e)
    }
    copy(e) {
      return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this
    }
  };
  var St = new I, lo = new fe, Qf = 0, Ct = class {
    constructor(e, t, i = !1) {
      if (Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
      this.isBufferAttribute = !0, Object.defineProperty(this, "id", {
        value: Qf++
      }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0?e.length / t: 0, this.normalized = i, this.usage = tc, this.updateRanges = [], this.gpuType = Sn, this.version = 0
    }
    onUploadCallback() {
    }
    set needsUpdate(e) {
      e === !0 && this.version++
    }
    setUsage(e) {
      return this.usage = e, this
    }
    addUpdateRange(e, t) {
      this.updateRanges.push({
        start: e, count: t
      })
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0
    }
    copy(e) {
      return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this
    }
    copyAt(e, t, i) {
      e *= this.itemSize, i *= t.itemSize;
      for (let s = 0, r = this.itemSize;
      s < r;
      s++)this.array[e + s] = t.array[i + s];
      return this
    }
    copyArray(e) {
      return this.array.set(e), this
    }
    applyMatrix3(e) {
      if (this.itemSize === 2)for (let t = 0, i = this.count;
      t < i;
      t++)lo.fromBufferAttribute(this, t), lo.applyMatrix3(e), this.setXY(t, lo.x, lo.y);
      else if (this.itemSize === 3)for (let t = 0, i = this.count;
      t < i;
      t++)St.fromBufferAttribute(this, t), St.applyMatrix3(e), this.setXYZ(t, St.x, St.y, St.z);
      return this
    }
    applyMatrix4(e) {
      for (let t = 0, i = this.count;
      t < i;
      t++)St.fromBufferAttribute(this, t), St.applyMatrix4(e), this.setXYZ(t, St.x, St.y, St.z);
      return this
    }
    applyNormalMatrix(e) {
      for (let t = 0, i = this.count;
      t < i;
      t++)St.fromBufferAttribute(this, t), St.applyNormalMatrix(e), this.setXYZ(t, St.x, St.y, St.z);
      return this
    }
    transformDirection(e) {
      for (let t = 0, i = this.count;
      t < i;
      t++)St.fromBufferAttribute(this, t), St.transformDirection(e), this.setXYZ(t, St.x, St.y, St.z);
      return this
    }
    set(e, t = 0) {
      return this.array.set(e, t), this
    }
    getComponent(e, t) {
      let i = this.array[e * this.itemSize + t];
      return this.normalized && (i = rs(i, this.array)), i
    }
    setComponent(e, t, i) {
      return this.normalized && (i = Ht(i, this.array)), this.array[e * this.itemSize + t] = i, this
    }
    getX(e) {
      let t = this.array[e * this.itemSize];
      return this.normalized && (t = rs(t, this.array)), t
    }
    setX(e, t) {
      return this.normalized && (t = Ht(t, this.array)), this.array[e * this.itemSize] = t, this
    }
    getY(e) {
      let t = this.array[e * this.itemSize + 1];
      return this.normalized && (t = rs(t, this.array)), t
    }
    setY(e, t) {
      return this.normalized && (t = Ht(t, this.array)), this.array[e * this.itemSize + 1] = t, this
    }
    getZ(e) {
      let t = this.array[e * this.itemSize + 2];
      return this.normalized && (t = rs(t, this.array)), t
    }
    setZ(e, t) {
      return this.normalized && (t = Ht(t, this.array)), this.array[e * this.itemSize + 2] = t, this
    }
    getW(e) {
      let t = this.array[e * this.itemSize + 3];
      return this.normalized && (t = rs(t, this.array)), t
    }
    setW(e, t) {
      return this.normalized && (t = Ht(t, this.array)), this.array[e * this.itemSize + 3] = t, this
    }
    setXY(e, t, i) {
      return e *= this.itemSize, this.normalized && (t = Ht(t, this.array), i = Ht(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this
    }
    setXYZ(e, t, i, s) {
      return e *= this.itemSize, this.normalized && (t = Ht(t, this.array), i = Ht(i, this.array), s = Ht(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = s, this
    }
    setXYZW(e, t, i, s, r) {
      return e *= this.itemSize, this.normalized && (t = Ht(t, this.array), i = Ht(i, this.array), s = Ht(s, this.array), r = Ht(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = s, this.array[e + 3] = r, this
    }
    onUpload(e) {
      return this.onUploadCallback = e, this
    }
    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this)
    }
    toJSON() {
      let e = {
        itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized
      };
      return this.name !== "" && (e.name = this.name), this.usage !== tc && (e.usage = this.usage), e
    }
  };
  var lr = class extends Ct {
    constructor(e, t, i) {
      super(new Uint16Array(e), t, i)
    }
  };
  var cr = class extends Ct {
    constructor(e, t, i) {
      super(new Uint32Array(e), t, i)
    }
  };
  var Qe = class extends Ct {
    constructor(e, t, i) {
      super(new Float32Array(e), t, i)
    }
  }, jf = 0, ln = new nt, Vl = new bt, ts = new I, tn = new An, Xs = new An, At = new I, mt = class n extends Xn {
    constructor() {
      super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", {
        value: jf++
      }), this.uuid = Fi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {
      }, this.morphAttributes = {
      }, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
        start: 0, count: 1 / 0
      }, this.userData = {
      }
    }
    getIndex() {
      return this.index
    }
    setIndex(e) {
      return Array.isArray(e)?this.index = new(Ac(e)?cr: lr)(e, 1): this.index = e, this
    }
    setIndirect(e) {
      return this.indirect = e, this
    }
    getIndirect() {
      return this.indirect
    }
    getAttribute(e) {
      return this.attributes[e]
    }
    setAttribute(e, t) {
      return this.attributes[e] = t, this
    }
    deleteAttribute(e) {
      return delete this.attributes[e], this
    }
    hasAttribute(e) {
      return this.attributes[e] !== void 0
    }
    addGroup(e, t, i = 0) {
      this.groups.push({
        start: e, count: t, materialIndex: i
      })
    }
    clearGroups() {
      this.groups = []
    }
    setDrawRange(e, t) {
      this.drawRange.start = e, this.drawRange.count = t
    }
    applyMatrix4(e) {
      let t = this.attributes.position;
      t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
      let i = this.attributes.normal;
      if (i !== void 0) {
        let r = new We().getNormalMatrix(e);
        i.applyNormalMatrix(r), i.needsUpdate = !0
      }
      let s = this.attributes.tangent;
      return s !== void 0 && (s.transformDirection(e), s.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this
    }
    applyQuaternion(e) {
      return ln.makeRotationFromQuaternion(e), this.applyMatrix4(ln), this
    }
    rotateX(e) {
      return ln.makeRotationX(e), this.applyMatrix4(ln), this
    }
    rotateY(e) {
      return ln.makeRotationY(e), this.applyMatrix4(ln), this
    }
    rotateZ(e) {
      return ln.makeRotationZ(e), this.applyMatrix4(ln), this
    }
    translate(e, t, i) {
      return ln.makeTranslation(e, t, i), this.applyMatrix4(ln), this
    }
    scale(e, t, i) {
      return ln.makeScale(e, t, i), this.applyMatrix4(ln), this
    }
    lookAt(e) {
      return Vl.lookAt(e), Vl.updateMatrix(), this.applyMatrix4(Vl.matrix), this
    }
    center() {
      return this.computeBoundingBox(), this.boundingBox.getCenter(ts).negate(), this.translate(ts.x, ts.y, ts.z), this
    }
    setFromPoints(e) {
      let t = this.getAttribute("position");
      if (t === void 0) {
        let i = [];
        for (let s = 0, r = e.length;
        s < r;
        s++) {
          let o = e[s];
          i.push(o.x, o.y, o.z || 0)
        }
        this.setAttribute("position", new Qe(i, 3))
      } else {
        let i = Math.min(e.length, t.count);
        for (let s = 0;
        s < i;
        s++) {
          let r = e[s];
          t.setXYZ(s, r.x, r.y, r.z || 0)
        }
        e.length > t.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0
      }
      return this
    }
    computeBoundingBox() {
      this.boundingBox === null && (this.boundingBox = new An);
      let e = this.attributes.position, t = this.morphAttributes.position;
      if (e && e.isGLBufferAttribute) {
        console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new I( - 1 / 0, - 1 / 0, - 1 / 0), new I(1 / 0, 1 / 0, 1 / 0));
        return
      }
      if (e !== void 0) {
        if (this.boundingBox.setFromBufferAttribute(e), t)for (let i = 0, s = t.length;
        i < s;
        i++) {
          let r = t[i];
          tn.setFromBufferAttribute(r), this.morphTargetsRelative?(At.addVectors(this.boundingBox.min, tn.min), this.boundingBox.expandByPoint(At), At.addVectors(this.boundingBox.max, tn.max), this.boundingBox.expandByPoint(At)): (this.boundingBox.expandByPoint(tn.min), this.boundingBox.expandByPoint(tn.max))
        }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
    }
    computeBoundingSphere() {
      this.boundingSphere === null && (this.boundingSphere = new Rn);
      let e = this.attributes.position, t = this.morphAttributes.position;
      if (e && e.isGLBufferAttribute) {
        console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new I, 1 / 0);
        return
      }
      if (e) {
        let i = this.boundingSphere.center;
        if (tn.setFromBufferAttribute(e), t)for (let r = 0, o = t.length;
        r < o;
        r++) {
          let a = t[r];
          Xs.setFromBufferAttribute(a), this.morphTargetsRelative?(At.addVectors(tn.min, Xs.min), tn.expandByPoint(At), At.addVectors(tn.max, Xs.max), tn.expandByPoint(At)): (tn.expandByPoint(Xs.min), tn.expandByPoint(Xs.max))
        }
        tn.getCenter(i);
        let s = 0;
        for (let r = 0, o = e.count;
        r < o;
        r++)At.fromBufferAttribute(e, r), s = Math.max(s, i.distanceToSquared(At));
        if (t)for (let r = 0, o = t.length;
        r < o;
        r++) {
          let a = t[r], l = this.morphTargetsRelative;
          for (let c = 0, h = a.count;
          c < h;
          c++)At.fromBufferAttribute(a, c), l && (ts.fromBufferAttribute(e, c), At.add(ts)), s = Math.max(s, i.distanceToSquared(At))
        }
        this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
      }
    }
    computeTangents() {
      let e = this.index, t = this.attributes;
      if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
        console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
        return
      }
      let i = t.position, s = t.normal, r = t.uv;
      this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ct(new Float32Array(4 * i.count), 4));
      let o = this.getAttribute("tangent"), a = [], l = [];
      for (let D = 0;
      D < i.count;
      D++)a[D] = new I, l[D] = new I;
      let c = new I, h = new I, u = new I, d = new fe, f = new fe, m = new fe, x = new I, g = new I;
      function p(D, M, v) {
        c.fromBufferAttribute(i, D), h.fromBufferAttribute(i, M), u.fromBufferAttribute(i, v), d.fromBufferAttribute(r, D), f.fromBufferAttribute(r, M), m.fromBufferAttribute(r, v), h.sub(c), u.sub(c), f.sub(d), m.sub(d);
        let C = 1 / (f.x * m.y - m.x * f.y);
        isFinite(C) && (x.copy(h).multiplyScalar(m.y).addScaledVector(u, - f.y).multiplyScalar(C), g.copy(u).multiplyScalar(f.x).addScaledVector(h, - m.x).multiplyScalar(C), a[D].add(x), a[M].add(x), a[v].add(x), l[D].add(g), l[M].add(g), l[v].add(g))
      }
      let E = this.groups;
      E.length === 0 && (E = [{
        start: 0, count: e.count
      }]);
      for (let D = 0, M = E.length;
      D < M;
      ++D) {
        let v = E[D], C = v.start, F = v.count;
        for (let z = C, G = C + F;
        z < G;
        z += 3)p(e.getX(z + 0), e.getX(z + 1), e.getX(z + 2))
      }
      let b = new I, y = new I, R = new I, w = new I;
      function P(D) {
        R.fromBufferAttribute(s, D), w.copy(R);
        let M = a[D];
        b.copy(M), b.sub(R.multiplyScalar(R.dot(M))).normalize(), y.crossVectors(w, M);
        let C = y.dot(l[D]) < 0? - 1: 1;
        o.setXYZW(D, b.x, b.y, b.z, C)
      }
      for (let D = 0, M = E.length;
      D < M;
      ++D) {
        let v = E[D], C = v.start, F = v.count;
        for (let z = C, G = C + F;
        z < G;
        z += 3)P(e.getX(z + 0)), P(e.getX(z + 1)), P(e.getX(z + 2))
      }
    }
    computeVertexNormals() {
      let e = this.index, t = this.getAttribute("position");
      if (t !== void 0) {
        let i = this.getAttribute("normal");
        if (i === void 0)i = new Ct(new Float32Array(t.count * 3), 3), this.setAttribute("normal", i);
        else for (let d = 0, f = i.count;
        d < f;
        d++)i.setXYZ(d, 0, 0, 0);
        let s = new I, r = new I, o = new I, a = new I, l = new I, c = new I, h = new I, u = new I;
        if (e)for (let d = 0, f = e.count;
        d < f;
        d += 3) {
          let m = e.getX(d + 0), x = e.getX(d + 1), g = e.getX(d + 2);
          s.fromBufferAttribute(t, m), r.fromBufferAttribute(t, x), o.fromBufferAttribute(t, g), h.subVectors(o, r), u.subVectors(s, r), h.cross(u), a.fromBufferAttribute(i, m), l.fromBufferAttribute(i, x), c.fromBufferAttribute(i, g), a.add(h), l.add(h), c.add(h), i.setXYZ(m, a.x, a.y, a.z), i.setXYZ(x, l.x, l.y, l.z), i.setXYZ(g, c.x, c.y, c.z)
        } else for (let d = 0, f = t.count;
        d < f;
        d += 3)s.fromBufferAttribute(t, d + 0), r.fromBufferAttribute(t, d + 1), o.fromBufferAttribute(t, d + 2), h.subVectors(o, r), u.subVectors(s, r), h.cross(u), i.setXYZ(d + 0, h.x, h.y, h.z), i.setXYZ(d + 1, h.x, h.y, h.z), i.setXYZ(d + 2, h.x, h.y, h.z);
        this.normalizeNormals(), i.needsUpdate = !0
      }
    }
    normalizeNormals() {
      let e = this.attributes.normal;
      for (let t = 0, i = e.count;
      t < i;
      t++)At.fromBufferAttribute(e, t), At.normalize(), e.setXYZ(t, At.x, At.y, At.z)
    }
    toNonIndexed() {
      function e(a, l) {
        let c = a.array, h = a.itemSize, u = a.normalized, d = new c.constructor(l.length * h), f = 0, m = 0;
        for (let x = 0, g = l.length;
        x < g;
        x++) {
          a.isInterleavedBufferAttribute?f = l[x] * a.data.stride + a.offset: f = l[x] * h;
          for (let p = 0;
          p < h;
          p++)d[m++] = c[f++]
        }
        return new Ct(d, h, u)
      }
      if (this.index === null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
      let t = new n, i = this.index.array, s = this.attributes;
      for (let a in s) {
        let l = s[a], c = e(l, i);
        t.setAttribute(a, c)
      }
      let r = this.morphAttributes;
      for (let a in r) {
        let l = [], c = r[a];
        for (let h = 0, u = c.length;
        h < u;
        h++) {
          let d = c[h], f = e(d, i);
          l.push(f)
        }
        t.morphAttributes[a] = l
      }
      t.morphTargetsRelative = this.morphTargetsRelative;
      let o = this.groups;
      for (let a = 0, l = o.length;
      a < l;
      a++) {
        let c = o[a];
        t.addGroup(c.start, c.count, c.materialIndex)
      }
      return t
    }
    toJSON() {
      let e = {
        metadata: {
          version: 4.7, type: "BufferGeometry", generator: "BufferGeometry.toJSON"
        }
      };
      if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
        let l = this.parameters;
        for (let c in l)l[c] !== void 0 && (e[c] = l[c]);
        return e
      }
      e.data = {
        attributes: {
        }
      };
      let t = this.index;
      t !== null && (e.data.index = {
        type: t.array.constructor.name, array: Array.prototype.slice.call(t.array)
      });
      let i = this.attributes;
      for (let l in i) {
        let c = i[l];
        e.data.attributes[l] = c.toJSON(e.data)
      }
      let s = {
      }, r = !1;
      for (let l in this.morphAttributes) {
        let c = this.morphAttributes[l], h = [];
        for (let u = 0, d = c.length;
        u < d;
        u++) {
          let f = c[u];
          h.push(f.toJSON(e.data))
        }
        h.length > 0 && (s[l] = h, r = !0)
      }
      r && (e.data.morphAttributes = s, e.data.morphTargetsRelative = this.morphTargetsRelative);
      let o = this.groups;
      o.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(o)));
      let a = this.boundingSphere;
      return a !== null && (e.data.boundingSphere = a.toJSON()), e
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(e) {
      this.index = null, this.attributes = {
      }, this.morphAttributes = {
      }, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
      let t = {
      };
      this.name = e.name;
      let i = e.index;
      i !== null && this.setIndex(i.clone());
      let s = e.attributes;
      for (let c in s) {
        let h = s[c];
        this.setAttribute(c, h.clone(t))
      }
      let r = e.morphAttributes;
      for (let c in r) {
        let h = [], u = r[c];
        for (let d = 0, f = u.length;
        d < f;
        d++)h.push(u[d].clone(t));
        this.morphAttributes[c] = h
      }
      this.morphTargetsRelative = e.morphTargetsRelative;
      let o = e.groups;
      for (let c = 0, h = o.length;
      c < h;
      c++) {
        let u = o[c];
        this.addGroup(u.start, u.count, u.materialIndex)
      }
      let a = e.boundingBox;
      a !== null && (this.boundingBox = a.clone());
      let l = e.boundingSphere;
      return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this
    }
    dispose() {
      this.dispatchEvent({
        type: "dispose"
      })
    }
  }, Nh = new nt, Ei = new us, co = new Rn, Fh = new I, ho = new I, uo = new I, fo = new I, Gl = new I, po = new I, Oh = new I, mo = new I, Et = class extends bt {
    constructor(e = new mt, t = new ar) {
      super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets()
    }
    copy(e, t) {
      return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({
      }, e.morphTargetDictionary)), this.material = Array.isArray(e.material)?e.material.slice(): e.material, this.geometry = e.geometry, this
    }
    updateMorphTargets() {
      let t = this.geometry.morphAttributes, i = Object.keys(t);
      if (i.length > 0) {
        let s = t[i[0]];
        if (s !== void 0) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {
          };
          for (let r = 0, o = s.length;
          r < o;
          r++) {
            let a = s[r].name || String(r);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r
          }
        }
      }
    }
    getVertexPosition(e, t) {
      let i = this.geometry, s = i.attributes.position, r = i.morphAttributes.position, o = i.morphTargetsRelative;
      t.fromBufferAttribute(s, e);
      let a = this.morphTargetInfluences;
      if (r && a) {
        po.set(0, 0, 0);
        for (let l = 0, c = r.length;
        l < c;
        l++) {
          let h = a[l], u = r[l];
          h !== 0 && (Gl.fromBufferAttribute(u, e), o?po.addScaledVector(Gl, h): po.addScaledVector(Gl.sub(t), h))
        }
        t.add(po)
      }
      return t
    }
    raycast(e, t) {
      let i = this.geometry, s = this.material, r = this.matrixWorld;
      s !== void 0 && (i.boundingSphere === null && i.computeBoundingSphere(), co.copy(i.boundingSphere), co.applyMatrix4(r), Ei.copy(e.ray).recast(e.near), !(co.containsPoint(Ei.origin) === !1 && (Ei.intersectSphere(co, Fh) === null || Ei.origin.distanceToSquared(Fh) > (e.far - e.near) ** 2)) && (Nh.copy(r).invert(), Ei.copy(e.ray).applyMatrix4(Nh), !(i.boundingBox !== null && Ei.intersectsBox(i.boundingBox) === !1) && this._computeIntersections(e, t, Ei)))
    }
    _computeIntersections(e, t, i) {
      let s, r = this.geometry, o = this.material, a = r.index, l = r.attributes.position, c = r.attributes.uv, h = r.attributes.uv1, u = r.attributes.normal, d = r.groups, f = r.drawRange;
      if (a !== null)if (Array.isArray(o))for (let m = 0, x = d.length;
      m < x;
      m++) {
        let g = d[m], p = o[g.materialIndex], E = Math.max(g.start, f.start), b = Math.min(a.count, Math.min(g.start + g.count, f.start + f.count));
        for (let y = E, R = b;
        y < R;
        y += 3) {
          let w = a.getX(y), P = a.getX(y + 1), D = a.getX(y + 2);
          s = go(this, p, e, i, c, h, u, w, P, D), s && (s.faceIndex = Math.floor(y / 3), s.face.materialIndex = g.materialIndex, t.push(s))
        }
      } else {
        let m = Math.max(0, f.start), x = Math.min(a.count, f.start + f.count);
        for (let g = m, p = x;
        g < p;
        g += 3) {
          let E = a.getX(g), b = a.getX(g + 1), y = a.getX(g + 2);
          s = go(this, o, e, i, c, h, u, E, b, y), s && (s.faceIndex = Math.floor(g / 3), t.push(s))
        }
      } else if (l !== void 0)if (Array.isArray(o))for (let m = 0, x = d.length;
      m < x;
      m++) {
        let g = d[m], p = o[g.materialIndex], E = Math.max(g.start, f.start), b = Math.min(l.count, Math.min(g.start + g.count, f.start + f.count));
        for (let y = E, R = b;
        y < R;
        y += 3) {
          let w = y, P = y + 1, D = y + 2;
          s = go(this, p, e, i, c, h, u, w, P, D), s && (s.faceIndex = Math.floor(y / 3), s.face.materialIndex = g.materialIndex, t.push(s))
        }
      } else {
        let m = Math.max(0, f.start), x = Math.min(l.count, f.start + f.count);
        for (let g = m, p = x;
        g < p;
        g += 3) {
          let E = g, b = g + 1, y = g + 2;
          s = go(this, o, e, i, c, h, u, E, b, y), s && (s.faceIndex = Math.floor(g / 3), t.push(s))
        }
      }
    }
  };
  function ep(n, e, t, i, s, r, o, a) {
    let l;
    if (e.side === Wt?l = i.intersectTriangle(o, r, s, !0, a): l = i.intersectTriangle(s, r, o, e.side === Wn, a), l === null)return null;
    mo.copy(a), mo.applyMatrix4(n.matrixWorld);
    let c = t.ray.origin.distanceTo(mo);
    return c < t.near || c > t.far?null: {
      distance: c, point: mo.clone(), object: n
    }
  }
  function go(n, e, t, i, s, r, o, a, l, c) {
    n.getVertexPosition(a, ho), n.getVertexPosition(l, uo), n.getVertexPosition(c, fo);
    let h = ep(n, e, t, i, ho, uo, fo, Oh);
    if (h) {
      let u = new I;
      ri.getBarycoord(Oh, ho, uo, fo, u), s && (h.uv = ri.getInterpolatedAttribute(s, a, l, c, u, new fe)), r && (h.uv1 = ri.getInterpolatedAttribute(r, a, l, c, u, new fe)), o && (h.normal = ri.getInterpolatedAttribute(o, a, l, c, u, new I), h.normal.dot(i.direction) > 0 && h.normal.multiplyScalar( - 1));
      let d = {
        a, b: l, c, normal: new I, materialIndex: 0
      };
      ri.getNormal(ho, uo, fo, d.normal), h.face = d, h.barycoord = u
    }
    return h
  }
  var In = class n extends mt {
    constructor(e = 1, t = 1, i = 1, s = 1, r = 1, o = 1) {
      super(), this.type = "BoxGeometry", this.parameters = {
        width: e, height: t, depth: i, widthSegments: s, heightSegments: r, depthSegments: o
      };
      let a = this;
      s = Math.floor(s), r = Math.floor(r), o = Math.floor(o);
      let l = [], c = [], h = [], u = [], d = 0, f = 0;
      m("z", "y", "x", - 1, - 1, i, t, e, o, r, 0), m("z", "y", "x", 1, - 1, i, t, - e, o, r, 1), m("x", "z", "y", 1, 1, e, i, t, s, o, 2), m("x", "z", "y", 1, - 1, e, i, - t, s, o, 3), m("x", "y", "z", 1, - 1, e, t, i, s, r, 4), m("x", "y", "z", - 1, - 1, e, t, - i, s, r, 5), this.setIndex(l), this.setAttribute("position", new Qe(c, 3)), this.setAttribute("normal", new Qe(h, 3)), this.setAttribute("uv", new Qe(u, 2));
      function m(x, g, p, E, b, y, R, w, P, D, M) {
        let v = y / P, C = R / D, F = y / 2, z = R / 2, G = w / 2, q = P + 1, W = D + 1, te = 0, V = 0, ue = new I;
        for (let ve = 0;
        ve < W;
        ve++) {
          let Se = ve * C - z;
          for (let Ge = 0;
          Ge < q;
          Ge++) {
            let Ke = Ge * v - F;
            ue[x] = Ke * E, ue[g] = Se * b, ue[p] = G, c.push(ue.x, ue.y, ue.z), ue[x] = 0, ue[g] = 0, ue[p] = w > 0?1: - 1, h.push(ue.x, ue.y, ue.z), u.push(Ge / P), u.push(1 - ve / D), te += 1
          }
        }
        for (let ve = 0;
        ve < D;
        ve++)for (let Se = 0;
        Se < P;
        Se++) {
          let Ge = d + Se + q * ve, Ke = d + Se + q * (ve + 1), rt = d + (Se + 1) + q * (ve + 1), je = d + (Se + 1) + q * ve;
          l.push(Ge, Ke, je), l.push(Ke, rt, je), V += 6
        }
        a.addGroup(f, V, M), f += V, d += te
      }
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({
      }, e.parameters), this
    }
    static fromJSON(e) {
      return new n(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments)
    }
  };
  function Oi(n) {
    let e = {
    };
    for (let t in n) {
      e[t] = {
      };
      for (let i in n[t]) {
        let s = n[t][i];
        s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture || s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][i] = null): e[t][i] = s.clone(): Array.isArray(s)?e[t][i] = s.slice(): e[t][i] = s
      }
    }
    return e
  }
  function Ot(n) {
    let e = {
    };
    for (let t = 0;
    t < n.length;
    t++) {
      let i = Oi(n[t]);
      for (let s in i)e[s] = i[s]
    }
    return e
  }
  function tp(n) {
    let e = [];
    for (let t = 0;
    t < n.length;
    t++)e.push(n[t].clone());
    return e
  }
  function Rc(n) {
    let e = n.getRenderTarget();
    return e === null?n.outputColorSpace: e.isXRRenderTarget === !0?e.texture.colorSpace: et.workingColorSpace
  }
  var Wu = {
    clone: Oi, merge: Ot
  }, np = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, ip = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, yn = class extends Cn {
    constructor(e) {
      super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {
      }, this.uniforms = {
      }, this.uniformsGroups = [], this.vertexShader = np, this.fragmentShader = ip, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
        clipCullDistance: !1, multiDraw: !1
      }, this.defaultAttributeValues = {
        color: [1, 1, 1], uv: [0, 0], uv1: [0, 0]
      }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e)
    }
    copy(e) {
      return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Oi(e.uniforms), this.uniformsGroups = tp(e.uniformsGroups), this.defines = Object.assign({
      }, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({
      }, e.extensions), this.glslVersion = e.glslVersion, this
    }
    toJSON(e) {
      let t = super.toJSON(e);
      t.glslVersion = this.glslVersion, t.uniforms = {
      };
      for (let s in this.uniforms) {
        let o = this.uniforms[s].value;
        o && o.isTexture?t.uniforms[s] = {
          type: "t", value: o.toJSON(e).uuid
        }: o && o.isColor?t.uniforms[s] = {
          type: "c", value: o.getHex()
        }: o && o.isVector2?t.uniforms[s] = {
          type: "v2", value: o.toArray()
        }: o && o.isVector3?t.uniforms[s] = {
          type: "v3", value: o.toArray()
        }: o && o.isVector4?t.uniforms[s] = {
          type: "v4", value: o.toArray()
        }: o && o.isMatrix3?t.uniforms[s] = {
          type: "m3", value: o.toArray()
        }: o && o.isMatrix4?t.uniforms[s] = {
          type: "m4", value: o.toArray()
        }: t.uniforms[s] = {
          value: o
        }
      }
      Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
      let i = {
      };
      for (let s in this.extensions)this.extensions[s] === !0 && (i[s] = !0);
      return Object.keys(i).length > 0 && (t.extensions = i), t
    }
  }, hr = class extends bt {
    constructor() {
      super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new nt, this.projectionMatrix = new nt, this.projectionMatrixInverse = new nt, this.coordinateSystem = _n, this._reversedDepth = !1
    }
    get reversedDepth() {
      return this._reversedDepth
    }
    copy(e, t) {
      return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this
    }
    getWorldDirection(e) {
      return super.getWorldDirection(e).negate()
    }
    updateMatrixWorld(e) {
      super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert()
    }
    updateWorldMatrix(e, t) {
      super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert()
    }
    clone() {
      return new this.constructor().copy(this)
    }
  }, si = new I, Bh = new fe, zh = new fe, Rt = class extends hr {
    constructor(e = 50, t = 1, i = .1, s = 2e3) {
      super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = i, this.far = s, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
    }
    copy(e, t) {
      return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null?null: Object.assign({
      }, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this
    }
    setFocalLength(e) {
      let t = .5 * this.getFilmHeight() / e;
      this.fov = ls * 2 * Math.atan(t), this.updateProjectionMatrix()
    }
    getFocalLength() {
      let e = Math.tan(Ks * .5 * this.fov);
      return .5 * this.getFilmHeight() / e
    }
    getEffectiveFOV() {
      return ls * 2 * Math.atan(Math.tan(Ks * .5 * this.fov) / this.zoom)
    }
    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1)
    }
    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1)
    }
    getViewBounds(e, t, i) {
      si.set( - 1, - 1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(si.x, si.y).multiplyScalar( - e / si.z), si.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), i.set(si.x, si.y).multiplyScalar( - e / si.z)
    }
    getViewSize(e, t) {
      return this.getViewBounds(e, Bh, zh), t.subVectors(zh, Bh)
    }
    setViewOffset(e, t, i, s, r, o) {
      this.aspect = e / t, this.view === null && (this.view = {
        enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1
      }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = s, this.view.width = r, this.view.height = o, this.updateProjectionMatrix()
    }
    clearViewOffset() {
      this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix()
    }
    updateProjectionMatrix() {
      let e = this.near, t = e * Math.tan(Ks * .5 * this.fov) / this.zoom, i = 2 * t, s = this.aspect * i, r = - .5 * s, o = this.view;
      if (this.view !== null && this.view.enabled) {
        let l = o.fullWidth, c = o.fullHeight;
        r += o.offsetX * s / l, t -= o.offsetY * i / c, s *= o.width / l, i *= o.height / c
      }
      let a = this.filmOffset;
      a !== 0 && (r += e * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + s, t, t - i, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({
      }, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t
    }
  }, ns = - 90, is = 1, Fo = class extends bt {
    constructor(e, t, i) {
      super(), this.type = "CubeCamera", this.renderTarget = i, this.coordinateSystem = null, this.activeMipmapLevel = 0;
      let s = new Rt(ns, is, e, t);
      s.layers = this.layers, this.add(s);
      let r = new Rt(ns, is, e, t);
      r.layers = this.layers, this.add(r);
      let o = new Rt(ns, is, e, t);
      o.layers = this.layers, this.add(o);
      let a = new Rt(ns, is, e, t);
      a.layers = this.layers, this.add(a);
      let l = new Rt(ns, is, e, t);
      l.layers = this.layers, this.add(l);
      let c = new Rt(ns, is, e, t);
      c.layers = this.layers, this.add(c)
    }
    updateCoordinateSystem() {
      let e = this.coordinateSystem, t = this.children.concat(), [i, s, r, o, a, l] = t;
      for (let c of t)this.remove(c);
      if (e === _n)i.up.set(0, 1, 0), i.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt( - 1, 0, 0), r.up.set(0, 0, - 1), r.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, - 1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, - 1);
      else if (e === ir)i.up.set(0, - 1, 0), i.lookAt( - 1, 0, 0), s.up.set(0, - 1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), o.up.set(0, 0, - 1), o.lookAt(0, - 1, 0), a.up.set(0, - 1, 0), a.lookAt(0, 0, 1), l.up.set(0, - 1, 0), l.lookAt(0, 0, - 1);
      else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
      for (let c of t)this.add(c), c.updateMatrixWorld()
    }
    update(e, t) {
      this.parent === null && this.updateMatrixWorld();
      let {
        renderTarget: i, activeMipmapLevel: s
      } = this;
      this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
      let[r, o, a, l, c, h] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), m = e.xr.enabled;
      e.xr.enabled = !1;
      let x = i.texture.generateMipmaps;
      i.texture.generateMipmaps = !1, e.setRenderTarget(i, 0, s), e.render(t, r), e.setRenderTarget(i, 1, s), e.render(t, o), e.setRenderTarget(i, 2, s), e.render(t, a), e.setRenderTarget(i, 3, s), e.render(t, l), e.setRenderTarget(i, 4, s), e.render(t, c), i.texture.generateMipmaps = x, e.setRenderTarget(i, 5, s), e.render(t, h), e.setRenderTarget(u, d, f), e.xr.enabled = m, i.texture.needsPMREMUpdate = !0
    }
  }, ur = class extends $t {
    constructor(e = [], t = Ui, i, s, r, o, a, l, c, h) {
      super(e, t, i, s, r, o, a, l, c, h), this.isCubeTexture = !0, this.flipY = !1
    }
    get images() {
      return this.image
    }
    set images(e) {
      this.image = e
    }
  }, Oo = class extends wn {
    constructor(e = 1, t = {
    }) {
      super(e, e, t), this.isWebGLCubeRenderTarget = !0;
      let i = {
        width: e, height: e, depth: 1
      }, s = [i, i, i, i, i, i];
      this.texture = new ur(s), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0
    }
    fromEquirectangularTexture(e, t) {
      this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
      let i = {
        uniforms: {
          tEquirect: {
            value: null
          }
        }, vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`, fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      }, s = new In(5, 5, 5), r = new yn({
        name: "CubemapFromEquirect", uniforms: Oi(i.uniforms), vertexShader: i.vertexShader, fragmentShader: i.fragmentShader, side: Wt, blending: Yn
      });
      r.uniforms.tEquirect.value = t;
      let o = new Et(s, r), a = t.minFilter;
      return t.minFilter === fi && (t.minFilter = xn), new Fo(1, 10, this).update(e, o), t.minFilter = a, o.geometry.dispose(), o.material.dispose(), this
    }
    clear(e, t = !0, i = !0, s = !0) {
      let r = e.getRenderTarget();
      for (let o = 0;
      o < 6;
      o++)e.setRenderTarget(this, o), e.clear(t, i, s);
      e.setRenderTarget(r)
    }
  }, Gt = class extends bt {
    constructor() {
      super(), this.isGroup = !0, this.type = "Group"
    }
  }, sp = {
    type: "move"
  }, ds = class {
    constructor() {
      this._targetRay = null, this._grip = null, this._hand = null
    }
    getHandSpace() {
      return this._hand === null && (this._hand = new Gt, this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {
      }, this._hand.inputState = {
        pinching: !1
      }), this._hand
    }
    getTargetRaySpace() {
      return this._targetRay === null && (this._targetRay = new Gt, this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new I, this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new I), this._targetRay
    }
    getGripSpace() {
      return this._grip === null && (this._grip = new Gt, this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new I, this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new I), this._grip
    }
    dispatchEvent(e) {
      return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this
    }
    connect(e) {
      if (e && e.hand) {
        let t = this._hand;
        if (t)for (let i of e.hand.values())this._getHandJoint(t, i)
      }
      return this.dispatchEvent({
        type: "connected", data: e
      }), this
    }
    disconnect(e) {
      return this.dispatchEvent({
        type: "disconnected", data: e
      }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this
    }
    update(e, t, i) {
      let s = null, r = null, o = null, a = this._targetRay, l = this._grip, c = this._hand;
      if (e && t.session.visibilityState !== "visible-blurred") {
        if (c && e.hand) {
          o = !0;
          for (let x of e.hand.values()) {
            let g = t.getJointPose(x, i), p = this._getHandJoint(c, x);
            g !== null && (p.matrix.fromArray(g.transform.matrix), p.matrix.decompose(p.position, p.rotation, p.scale), p.matrixWorldNeedsUpdate = !0, p.jointRadius = g.radius), p.visible = g !== null
          }
          let h = c.joints["index-finger-tip"], u = c.joints["thumb-tip"], d = h.position.distanceTo(u.position), f = .02, m = .005;
          c.inputState.pinching && d > f + m?(c.inputState.pinching = !1, this.dispatchEvent({
            type: "pinchend", handedness: e.handedness, target: this
          })): !c.inputState.pinching && d <= f - m && (c.inputState.pinching = !0, this.dispatchEvent({
            type: "pinchstart", handedness: e.handedness, target: this
          }))
        } else l !== null && e.gripSpace && (r = t.getPose(e.gripSpace, i), r !== null && (l.matrix.fromArray(r.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, r.linearVelocity?(l.hasLinearVelocity = !0, l.linearVelocity.copy(r.linearVelocity)): l.hasLinearVelocity = !1, r.angularVelocity?(l.hasAngularVelocity = !0, l.angularVelocity.copy(r.angularVelocity)): l.hasAngularVelocity = !1));
        a !== null && (s = t.getPose(e.targetRaySpace, i), s === null && r !== null && (s = r), s !== null && (a.matrix.fromArray(s.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, s.linearVelocity?(a.hasLinearVelocity = !0, a.linearVelocity.copy(s.linearVelocity)): a.hasLinearVelocity = !1, s.angularVelocity?(a.hasAngularVelocity = !0, a.angularVelocity.copy(s.angularVelocity)): a.hasAngularVelocity = !1, this.dispatchEvent(sp)))
      }
      return a !== null && (a.visible = s !== null), l !== null && (l.visible = r !== null), c !== null && (c.visible = o !== null), this
    }
    _getHandJoint(e, t) {
      if (e.joints[t.jointName] === void 0) {
        let i = new Gt;
        i.matrixAutoUpdate = !1, i.visible = !1, e.joints[t.jointName] = i, e.add(i)
      }
      return e.joints[t.jointName]
    }
  }, dr = class n {
    constructor(e, t = 25e-5) {
      this.isFogExp2 = !0, this.name = "", this.color = new ke(e), this.density = t
    }
    clone() {
      return new n(this.color, this.density)
    }
    toJSON() {
      return {
        type: "FogExp2", name: this.name, color: this.color.getHex(), density: this.density
      }
    }
  };
  var fs = class extends bt {
    constructor() {
      super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new vn, this.environmentIntensity = 1, this.environmentRotation = new vn, this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
        detail: this
      }))
    }
    copy(e, t) {
      return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t
    }
  };
  var Bo = class extends $t {
    constructor(e = null, t = 1, i = 1, s, r, o, a, l, c = Zt, h = Zt, u, d) {
      super(null, o, a, l, c, h, s, r, u, d), this.isDataTexture = !0, this.image = {
        data: e, width: t, height: i
      }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1
    }
  };
  var ps = class extends Ct {
    constructor(e, t, i, s = 1) {
      super(e, t, i), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = s
    }
    copy(e) {
      return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this
    }
    toJSON() {
      let e = super.toJSON();
      return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e
    }
  }, ss = new nt, kh = new nt, _o = [], Hh = new An, rp = new nt, qs = new Et, Ys = new Rn, ms = class extends Et {
    constructor(e, t, i) {
      super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new ps(new Float32Array(i * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = i, this.boundingBox = null, this.boundingSphere = null;
      for (let s = 0;
      s < i;
      s++)this.setMatrixAt(s, rp)
    }
    computeBoundingBox() {
      let e = this.geometry, t = this.count;
      this.boundingBox === null && (this.boundingBox = new An), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
      for (let i = 0;
      i < t;
      i++)this.getMatrixAt(i, ss), Hh.copy(e.boundingBox).applyMatrix4(ss), this.boundingBox.union(Hh)
    }
    computeBoundingSphere() {
      let e = this.geometry, t = this.count;
      this.boundingSphere === null && (this.boundingSphere = new Rn), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
      for (let i = 0;
      i < t;
      i++)this.getMatrixAt(i, ss), Ys.copy(e.boundingSphere).applyMatrix4(ss), this.boundingSphere.union(Ys)
    }
    copy(e, t) {
      return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this
    }
    getColorAt(e, t) {
      t.fromArray(this.instanceColor.array, e * 3)
    }
    getMatrixAt(e, t) {
      t.fromArray(this.instanceMatrix.array, e * 16)
    }
    getMorphAt(e, t) {
      let i = t.morphTargetInfluences, s = this.morphTexture.source.data.data, r = i.length + 1, o = e * r + 1;
      for (let a = 0;
      a < i.length;
      a++)i[a] = s[o + a]
    }
    raycast(e, t) {
      let i = this.matrixWorld, s = this.count;
      if (qs.geometry = this.geometry, qs.material = this.material, qs.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Ys.copy(this.boundingSphere), Ys.applyMatrix4(i), e.ray.intersectsSphere(Ys) !== !1))for (let r = 0;
      r < s;
      r++) {
        this.getMatrixAt(r, ss), kh.multiplyMatrices(i, ss), qs.matrixWorld = kh, qs.raycast(e, _o);
        for (let o = 0, a = _o.length;
        o < a;
        o++) {
          let l = _o[o];
          l.instanceId = r, l.object = this, t.push(l)
        }
        _o.length = 0
      }
    }
    setColorAt(e, t) {
      this.instanceColor === null && (this.instanceColor = new ps(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3)
    }
    setMatrixAt(e, t) {
      t.toArray(this.instanceMatrix.array, e * 16)
    }
    setMorphAt(e, t) {
      let i = t.morphTargetInfluences, s = i.length + 1;
      this.morphTexture === null && (this.morphTexture = new Bo(new Float32Array(s * this.count), s, this.count, Ma, Sn));
      let r = this.morphTexture.source.data.data, o = 0;
      for (let c = 0;
      c < i.length;
      c++)o += i[c];
      let a = this.geometry.morphTargetsRelative?1: 1 - o, l = s * e;
      r[l] = a, r.set(i, l + 1)
    }
    updateMorphTargets() {
    }
    dispose() {
      this.dispatchEvent({
        type: "dispose"
      }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null)
    }
  }, Wl = new I, op = new I, ap = new We, Tn = class {
    constructor(e = new I(1, 0, 0), t = 0) {
      this.isPlane = !0, this.normal = e, this.constant = t
    }
    set(e, t) {
      return this.normal.copy(e), this.constant = t, this
    }
    setComponents(e, t, i, s) {
      return this.normal.set(e, t, i), this.constant = s, this
    }
    setFromNormalAndCoplanarPoint(e, t) {
      return this.normal.copy(e), this.constant = - t.dot(this.normal), this
    }
    setFromCoplanarPoints(e, t, i) {
      let s = Wl.subVectors(i, t).cross(op.subVectors(e, t)).normalize();
      return this.setFromNormalAndCoplanarPoint(s, e), this
    }
    copy(e) {
      return this.normal.copy(e.normal), this.constant = e.constant, this
    }
    normalize() {
      let e = 1 / this.normal.length();
      return this.normal.multiplyScalar(e), this.constant *= e, this
    }
    negate() {
      return this.constant *= - 1, this.normal.negate(), this
    }
    distanceToPoint(e) {
      return this.normal.dot(e) + this.constant
    }
    distanceToSphere(e) {
      return this.distanceToPoint(e.center) - e.radius
    }
    projectPoint(e, t) {
      return t.copy(e).addScaledVector(this.normal, - this.distanceToPoint(e))
    }
    intersectLine(e, t) {
      let i = e.delta(Wl), s = this.normal.dot(i);
      if (s === 0)return this.distanceToPoint(e.start) === 0?t.copy(e.start): null;
      let r = - (e.start.dot(this.normal) + this.constant) / s;
      return r < 0 || r > 1?null: t.copy(e.start).addScaledVector(i, r)
    }
    intersectsLine(e) {
      let t = this.distanceToPoint(e.start), i = this.distanceToPoint(e.end);
      return t < 0 && i > 0 || i < 0 && t > 0
    }
    intersectsBox(e) {
      return e.intersectsPlane(this)
    }
    intersectsSphere(e) {
      return e.intersectsPlane(this)
    }
    coplanarPoint(e) {
      return e.copy(this.normal).multiplyScalar( - this.constant)
    }
    applyMatrix4(e, t) {
      let i = t || ap.getNormalMatrix(e), s = this.coplanarPoint(Wl).applyMatrix4(e), r = this.normal.applyMatrix3(i).normalize();
      return this.constant = - s.dot(r), this
    }
    translate(e) {
      return this.constant -= e.dot(this.normal), this
    }
    equals(e) {
      return e.normal.equals(this.normal) && e.constant === this.constant
    }
    clone() {
      return new this.constructor().copy(this)
    }
  }, Ti = new Rn, lp = new fe(.5, .5), xo = new I, gs = class {
    constructor(e = new Tn, t = new Tn, i = new Tn, s = new Tn, r = new Tn, o = new Tn) {
      this.planes = [e, t, i, s, r, o]
    }
    set(e, t, i, s, r, o) {
      let a = this.planes;
      return a[0].copy(e), a[1].copy(t), a[2].copy(i), a[3].copy(s), a[4].copy(r), a[5].copy(o), this
    }
    copy(e) {
      let t = this.planes;
      for (let i = 0;
      i < 6;
      i++)t[i].copy(e.planes[i]);
      return this
    }
    setFromProjectionMatrix(e, t = _n, i = !1) {
      let s = this.planes, r = e.elements, o = r[0], a = r[1], l = r[2], c = r[3], h = r[4], u = r[5], d = r[6], f = r[7], m = r[8], x = r[9], g = r[10], p = r[11], E = r[12], b = r[13], y = r[14], R = r[15];
      if (s[0].setComponents(c - o, f - h, p - m, R - E).normalize(), s[1].setComponents(c + o, f + h, p + m, R + E).normalize(), s[2].setComponents(c + a, f + u, p + x, R + b).normalize(), s[3].setComponents(c - a, f - u, p - x, R - b).normalize(), i)s[4].setComponents(l, d, g, y).normalize(), s[5].setComponents(c - l, f - d, p - g, R - y).normalize();
      else if (s[4].setComponents(c - l, f - d, p - g, R - y).normalize(), t === _n)s[5].setComponents(c + l, f + d, p + g, R + y).normalize();
      else if (t === ir)s[5].setComponents(l, d, g, y).normalize();
      else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
      return this
    }
    intersectsObject(e) {
      if (e.boundingSphere !== void 0)e.boundingSphere === null && e.computeBoundingSphere(), Ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
      else {
        let t = e.geometry;
        t.boundingSphere === null && t.computeBoundingSphere(), Ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)
      }
      return this.intersectsSphere(Ti)
    }
    intersectsSprite(e) {
      Ti.center.set(0, 0, 0);
      let t = lp.distanceTo(e.center);
      return Ti.radius = .7071067811865476 + t, Ti.applyMatrix4(e.matrixWorld), this.intersectsSphere(Ti)
    }
    intersectsSphere(e) {
      let t = this.planes, i = e.center, s = - e.radius;
      for (let r = 0;
      r < 6;
      r++)if (t[r].distanceToPoint(i) < s)return!1;
      return!0
    }
    intersectsBox(e) {
      let t = this.planes;
      for (let i = 0;
      i < 6;
      i++) {
        let s = t[i];
        if (xo.x = s.normal.x > 0?e.max.x: e.min.x, xo.y = s.normal.y > 0?e.max.y: e.min.y, xo.z = s.normal.z > 0?e.max.z: e.min.z, s.distanceToPoint(xo) < 0)return!1
      }
      return!0
    }
    containsPoint(e) {
      let t = this.planes;
      for (let i = 0;
      i < 6;
      i++)if (t[i].distanceToPoint(e) < 0)return!1;
      return!0
    }
    clone() {
      return new this.constructor().copy(this)
    }
  };
  var fr = class extends Cn {
    constructor(e) {
      super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new ke(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e)
    }
    copy(e) {
      return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this
    }
  }, zo = new I, ko = new I, Vh = new nt, Zs = new us, vo = new Rn, Xl = new I, Gh = new I, Ho = class extends bt {
    constructor(e = new mt, t = new fr) {
      super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets()
    }
    copy(e, t) {
      return super.copy(e, t), this.material = Array.isArray(e.material)?e.material.slice(): e.material, this.geometry = e.geometry, this
    }
    computeLineDistances() {
      let e = this.geometry;
      if (e.index === null) {
        let t = e.attributes.position, i = [0];
        for (let s = 1, r = t.count;
        s < r;
        s++)zo.fromBufferAttribute(t, s - 1), ko.fromBufferAttribute(t, s), i[s] = i[s - 1], i[s] += zo.distanceTo(ko);
        e.setAttribute("lineDistance", new Qe(i, 1))
      } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
      return this
    }
    raycast(e, t) {
      let i = this.geometry, s = this.matrixWorld, r = e.params.Line.threshold, o = i.drawRange;
      if (i.boundingSphere === null && i.computeBoundingSphere(), vo.copy(i.boundingSphere), vo.applyMatrix4(s), vo.radius += r, e.ray.intersectsSphere(vo) === !1)return;
      Vh.copy(s).invert(), Zs.copy(e.ray).applyMatrix4(Vh);
      let a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = a * a, c = this.isLineSegments?2: 1, h = i.index, d = i.attributes.position;
      if (h !== null) {
        let f = Math.max(0, o.start), m = Math.min(h.count, o.start + o.count);
        for (let x = f, g = m - 1;
        x < g;
        x += c) {
          let p = h.getX(x), E = h.getX(x + 1), b = yo(this, e, Zs, l, p, E, x);
          b && t.push(b)
        }
        if (this.isLineLoop) {
          let x = h.getX(m - 1), g = h.getX(f), p = yo(this, e, Zs, l, x, g, m - 1);
          p && t.push(p)
        }
      } else {
        let f = Math.max(0, o.start), m = Math.min(d.count, o.start + o.count);
        for (let x = f, g = m - 1;
        x < g;
        x += c) {
          let p = yo(this, e, Zs, l, x, x + 1, x);
          p && t.push(p)
        }
        if (this.isLineLoop) {
          let x = yo(this, e, Zs, l, m - 1, f, m - 1);
          x && t.push(x)
        }
      }
    }
    updateMorphTargets() {
      let t = this.geometry.morphAttributes, i = Object.keys(t);
      if (i.length > 0) {
        let s = t[i[0]];
        if (s !== void 0) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {
          };
          for (let r = 0, o = s.length;
          r < o;
          r++) {
            let a = s[r].name || String(r);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r
          }
        }
      }
    }
  };
  function yo(n, e, t, i, s, r, o) {
    let a = n.geometry.attributes.position;
    if (zo.fromBufferAttribute(a, s), ko.fromBufferAttribute(a, r), t.distanceSqToSegment(zo, ko, Xl, Gh) > i)return;
    Xl.applyMatrix4(n.matrixWorld);
    let c = e.ray.origin.distanceTo(Xl);
    if (!(c < e.near || c > e.far))return {
      distance: c, point: Gh.clone().applyMatrix4(n.matrixWorld), index: o, face: null, faceIndex: null, barycoord: null, object: n
    }
  }
  var Wh = new I, Xh = new I, Vo = class extends Ho {
    constructor(e, t) {
      super(e, t), this.isLineSegments = !0, this.type = "LineSegments"
    }
    computeLineDistances() {
      let e = this.geometry;
      if (e.index === null) {
        let t = e.attributes.position, i = [];
        for (let s = 0, r = t.count;
        s < r;
        s += 2)Wh.fromBufferAttribute(t, s), Xh.fromBufferAttribute(t, s + 1), i[s] = s === 0?0: i[s - 1], i[s + 1] = i[s] + Wh.distanceTo(Xh);
        e.setAttribute("lineDistance", new Qe(i, 1))
      } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
      return this
    }
  };
  var _s = class extends Cn {
    constructor(e) {
      super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new ke(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e)
    }
    copy(e) {
      return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this
    }
  }, qh = new nt, nc = new us, Mo = new Rn, So = new I, pr = class extends bt {
    constructor(e = new mt, t = new _s) {
      super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets()
    }
    copy(e, t) {
      return super.copy(e, t), this.material = Array.isArray(e.material)?e.material.slice(): e.material, this.geometry = e.geometry, this
    }
    raycast(e, t) {
      let i = this.geometry, s = this.matrixWorld, r = e.params.Points.threshold, o = i.drawRange;
      if (i.boundingSphere === null && i.computeBoundingSphere(), Mo.copy(i.boundingSphere), Mo.applyMatrix4(s), Mo.radius += r, e.ray.intersectsSphere(Mo) === !1)return;
      qh.copy(s).invert(), nc.copy(e.ray).applyMatrix4(qh);
      let a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = a * a, c = i.index, u = i.attributes.position;
      if (c !== null) {
        let d = Math.max(0, o.start), f = Math.min(c.count, o.start + o.count);
        for (let m = d, x = f;
        m < x;
        m++) {
          let g = c.getX(m);
          So.fromBufferAttribute(u, g), Yh(So, g, l, s, e, t, this)
        }
      } else {
        let d = Math.max(0, o.start), f = Math.min(u.count, o.start + o.count);
        for (let m = d, x = f;
        m < x;
        m++)So.fromBufferAttribute(u, m), Yh(So, m, l, s, e, t, this)
      }
    }
    updateMorphTargets() {
      let t = this.geometry.morphAttributes, i = Object.keys(t);
      if (i.length > 0) {
        let s = t[i[0]];
        if (s !== void 0) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {
          };
          for (let r = 0, o = s.length;
          r < o;
          r++) {
            let a = s[r].name || String(r);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r
          }
        }
      }
    }
  };
  function Yh(n, e, t, i, s, r, o) {
    let a = nc.distanceSqToPoint(n);
    if (a < t) {
      let l = new I;
      nc.closestPointToPoint(n, l), l.applyMatrix4(i);
      let c = s.ray.origin.distanceTo(l);
      if (c < s.near || c > s.far)return;
      r.push({
        distance: c, distanceToRay: Math.sqrt(a), point: l, index: e, face: null, faceIndex: null, barycoord: null, object: o
      })
    }
  }
  var mr = class extends $t {
    constructor(e, t, i = pi, s, r, o, a = Zt, l = Zt, c, h = as, u = 1) {
      if (h !== as && h !== Rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
      let d = {
        width: e, height: t, depth: u
      };
      super(d, s, r, o, a, l, h, i, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null
    }
    copy(e) {
      return super.copy(e), this.source = new hs(Object.assign({
      }, e.image)), this.compareFunction = e.compareFunction, this
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t
    }
  }, gr = class extends $t {
    constructor(e = null) {
      super(), this.sourceTexture = e, this.isExternalTexture = !0
    }
    copy(e) {
      return super.copy(e), this.sourceTexture = e.sourceTexture, this
    }
  }, _r = class n extends mt {
    constructor(e = 1, t = 1, i = 4, s = 8, r = 1) {
      super(), this.type = "CapsuleGeometry", this.parameters = {
        radius: e, height: t, capSegments: i, radialSegments: s, heightSegments: r
      }, t = Math.max(0, t), i = Math.max(1, Math.floor(i)), s = Math.max(3, Math.floor(s)), r = Math.max(1, Math.floor(r));
      let o = [], a = [], l = [], c = [], h = t / 2, u = Math.PI / 2 * e, d = t, f = 2 * u + d, m = i * 2 + r, x = s + 1, g = new I, p = new I;
      for (let E = 0;
      E <= m;
      E++) {
        let b = 0, y = 0, R = 0, w = 0;
        if (E <= i) {
          let M = E / i, v = M * Math.PI / 2;
          y = - h - e * Math.cos(v), R = e * Math.sin(v), w = - e * Math.cos(v), b = M * u
        } else if (E <= i + r) {
          let M = (E - i) / r;
          y = - h + M * t, R = e, w = 0, b = u + M * d
        } else {
          let M = (E - i - r) / i, v = M * Math.PI / 2;
          y = h + e * Math.sin(v), R = e * Math.cos(v), w = e * Math.sin(v), b = u + d + M * u
        }
        let P = Math.max(0, Math.min(1, b / f)), D = 0;
        E === 0?D = .5 / s: E === m && (D = - .5 / s);
        for (let M = 0;
        M <= s;
        M++) {
          let v = M / s, C = v * Math.PI * 2, F = Math.sin(C), z = Math.cos(C);
          p.x = - R * z, p.y = y, p.z = R * F, a.push(p.x, p.y, p.z), g.set( - R * z, w, R * F), g.normalize(), l.push(g.x, g.y, g.z), c.push(v + D, P)
        }
        if (E > 0) {
          let M = (E - 1) * x;
          for (let v = 0;
          v < s;
          v++) {
            let C = M + v, F = M + v + 1, z = E * x + v, G = E * x + v + 1;
            o.push(C, F, z), o.push(F, G, z)
          }
        }
      }
      this.setIndex(o), this.setAttribute("position", new Qe(a, 3)), this.setAttribute("normal", new Qe(l, 3)), this.setAttribute("uv", new Qe(c, 2))
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({
      }, e.parameters), this
    }
    static fromJSON(e) {
      return new n(e.radius, e.height, e.capSegments, e.radialSegments, e.heightSegments)
    }
  }, xr = class n extends mt {
    constructor(e = 1, t = 32, i = 0, s = Math.PI * 2) {
      super(), this.type = "CircleGeometry", this.parameters = {
        radius: e, segments: t, thetaStart: i, thetaLength: s
      }, t = Math.max(3, t);
      let r = [], o = [], a = [], l = [], c = new I, h = new fe;
      o.push(0, 0, 0), a.push(0, 0, 1), l.push(.5, .5);
      for (let u = 0, d = 3;
      u <= t;
      u++, d += 3) {
        let f = i + u / t * s;
        c.x = e * Math.cos(f), c.y = e * Math.sin(f), o.push(c.x, c.y, c.z), a.push(0, 0, 1), h.x = (o[d] / e + 1) / 2, h.y = (o[d + 1] / e + 1) / 2, l.push(h.x, h.y)
      }
      for (let u = 1;
      u <= t;
      u++)r.push(u, u + 1, 0);
      this.setIndex(r), this.setAttribute("position", new Qe(o, 3)), this.setAttribute("normal", new Qe(a, 3)), this.setAttribute("uv", new Qe(l, 2))
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({
      }, e.parameters), this
    }
    static fromJSON(e) {
      return new n(e.radius, e.segments, e.thetaStart, e.thetaLength)
    }
  }, nn = class n extends mt {
    constructor(e = 1, t = 1, i = 1, s = 32, r = 1, o = !1, a = 0, l = Math.PI * 2) {
      super(), this.type = "CylinderGeometry", this.parameters = {
        radiusTop: e, radiusBottom: t, height: i, radialSegments: s, heightSegments: r, openEnded: o, thetaStart: a, thetaLength: l
      };
      let c = this;
      s = Math.floor(s), r = Math.floor(r);
      let h = [], u = [], d = [], f = [], m = 0, x = [], g = i / 2, p = 0;
      E(), o === !1 && (e > 0 && b(!0), t > 0 && b(!1)), this.setIndex(h), this.setAttribute("position", new Qe(u, 3)), this.setAttribute("normal", new Qe(d, 3)), this.setAttribute("uv", new Qe(f, 2));
      function E() {
        let y = new I, R = new I, w = 0, P = (t - e) / i;
        for (let D = 0;
        D <= r;
        D++) {
          let M = [], v = D / r, C = v * (t - e) + e;
          for (let F = 0;
          F <= s;
          F++) {
            let z = F / s, G = z * l + a, q = Math.sin(G), W = Math.cos(G);
            R.x = C * q, R.y = - v * i + g, R.z = C * W, u.push(R.x, R.y, R.z), y.set(q, P, W).normalize(), d.push(y.x, y.y, y.z), f.push(z, 1 - v), M.push(m++)
          }
          x.push(M)
        }
        for (let D = 0;
        D < s;
        D++)for (let M = 0;
        M < r;
        M++) {
          let v = x[M][D], C = x[M + 1][D], F = x[M + 1][D + 1], z = x[M][D + 1];
          (e > 0 || M !== 0) && (h.push(v, C, z), w += 3), (t > 0 || M !== r - 1) && (h.push(C, F, z), w += 3)
        }
        c.addGroup(p, w, 0), p += w
      }
      function b(y) {
        let R = m, w = new fe, P = new I, D = 0, M = y === !0?e: t, v = y === !0?1: - 1;
        for (let F = 1;
        F <= s;
        F++)u.push(0, g * v, 0), d.push(0, v, 0), f.push(.5, .5), m++;
        let C = m;
        for (let F = 0;
        F <= s;
        F++) {
          let G = F / s * l + a, q = Math.cos(G), W = Math.sin(G);
          P.x = M * W, P.y = g * v, P.z = M * q, u.push(P.x, P.y, P.z), d.push(0, v, 0), w.x = q * .5 + .5, w.y = W * .5 * v + .5, f.push(w.x, w.y), m++
        }
        for (let F = 0;
        F < s;
        F++) {
          let z = R + F, G = C + F;
          y === !0?h.push(G, G + 1, z): h.push(G + 1, G, z), D += 3
        }
        c.addGroup(p, D, y === !0?1: 2), p += D
      }
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({
      }, e.parameters), this
    }
    static fromJSON(e) {
      return new n(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength)
    }
  }, li = class n extends nn {
    constructor(e = 1, t = 1, i = 32, s = 1, r = !1, o = 0, a = Math.PI * 2) {
      super(0, e, t, i, s, r, o, a), this.type = "ConeGeometry", this.parameters = {
        radius: e, height: t, radialSegments: i, heightSegments: s, openEnded: r, thetaStart: o, thetaLength: a
      }
    }
    static fromJSON(e) {
      return new n(e.radius, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength)
    }
  }, xs = class n extends mt {
    constructor(e = [], t = [], i = 1, s = 0) {
      super(), this.type = "PolyhedronGeometry", this.parameters = {
        vertices: e, indices: t, radius: i, detail: s
      };
      let r = [], o = [];
      a(s), c(i), h(), this.setAttribute("position", new Qe(r, 3)), this.setAttribute("normal", new Qe(r.slice(), 3)), this.setAttribute("uv", new Qe(o, 2)), s === 0?this.computeVertexNormals(): this.normalizeNormals();
      function a(E) {
        let b = new I, y = new I, R = new I;
        for (let w = 0;
        w < t.length;
        w += 3)f(t[w + 0], b), f(t[w + 1], y), f(t[w + 2], R), l(b, y, R, E)
      }
      function l(E, b, y, R) {
        let w = R + 1, P = [];
        for (let D = 0;
        D <= w;
        D++) {
          P[D] = [];
          let M = E.clone().lerp(y, D / w), v = b.clone().lerp(y, D / w), C = w - D;
          for (let F = 0;
          F <= C;
          F++)F === 0 && D === w?P[D][F] = M: P[D][F] = M.clone().lerp(v, F / C)
        }
        for (let D = 0;
        D < w;
        D++)for (let M = 0;
        M < 2 * (w - D) - 1;
        M++) {
          let v = Math.floor(M / 2);
          M % 2 === 0?(d(P[D][v + 1]), d(P[D + 1][v]), d(P[D][v])): (d(P[D][v + 1]), d(P[D + 1][v + 1]), d(P[D + 1][v]))
        }
      }
      function c(E) {
        let b = new I;
        for (let y = 0;
        y < r.length;
        y += 3)b.x = r[y + 0], b.y = r[y + 1], b.z = r[y + 2], b.normalize().multiplyScalar(E), r[y + 0] = b.x, r[y + 1] = b.y, r[y + 2] = b.z
      }
      function h() {
        let E = new I;
        for (let b = 0;
        b < r.length;
        b += 3) {
          E.x = r[b + 0], E.y = r[b + 1], E.z = r[b + 2];
          let y = g(E) / 2 / Math.PI + .5, R = p(E) / Math.PI + .5;
          o.push(y, 1 - R)
        }
        m(), u()
      }
      function u() {
        for (let E = 0;
        E < o.length;
        E += 6) {
          let b = o[E + 0], y = o[E + 2], R = o[E + 4], w = Math.max(b, y, R), P = Math.min(b, y, R);
          w > .9 && P < .1 && (b < .2 && (o[E + 0] += 1), y < .2 && (o[E + 2] += 1), R < .2 && (o[E + 4] += 1))
        }
      }
      function d(E) {
        r.push(E.x, E.y, E.z)
      }
      function f(E, b) {
        let y = E * 3;
        b.x = e[y + 0], b.y = e[y + 1], b.z = e[y + 2]
      }
      function m() {
        let E = new I, b = new I, y = new I, R = new I, w = new fe, P = new fe, D = new fe;
        for (let M = 0, v = 0;
        M < r.length;
        M += 9, v += 6) {
          E.set(r[M + 0], r[M + 1], r[M + 2]), b.set(r[M + 3], r[M + 4], r[M + 5]), y.set(r[M + 6], r[M + 7], r[M + 8]), w.set(o[v + 0], o[v + 1]), P.set(o[v + 2], o[v + 3]), D.set(o[v + 4], o[v + 5]), R.copy(E).add(b).add(y).divideScalar(3);
          let C = g(R);
          x(w, v + 0, E, C), x(P, v + 2, b, C), x(D, v + 4, y, C)
        }
      }
      function x(E, b, y, R) {
        R < 0 && E.x === 1 && (o[b] = E.x - 1), y.x === 0 && y.z === 0 && (o[b] = R / 2 / Math.PI + .5)
      }
      function g(E) {
        return Math.atan2(E.z, - E.x)
      }
      function p(E) {
        return Math.atan2( - E.y, Math.sqrt(E.x * E.x + E.z * E.z))
      }
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({
      }, e.parameters), this
    }
    static fromJSON(e) {
      return new n(e.vertices, e.indices, e.radius, e.details)
    }
  }, vr = class n extends xs {
    constructor(e = 1, t = 0) {
      let i = (1 + Math.sqrt(5)) / 2, s = 1 / i, r = [ - 1, - 1, - 1, - 1, - 1, 1, - 1, 1, - 1, - 1, 1, 1, 1, - 1, - 1, 1, - 1, 1, 1, 1, - 1, 1, 1, 1, 0, - s, - i, 0, - s, i, 0, s, - i, 0, s, i, - s, - i, 0, - s, i, 0, s, - i, 0, s, i, 0, - i, 0, - s, i, 0, - s, - i, 0, s, i, 0, s], o = [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9];
      super(r, o, e, t), this.type = "DodecahedronGeometry", this.parameters = {
        radius: e, detail: t
      }
    }
    static fromJSON(e) {
      return new n(e.radius, e.detail)
    }
  };
  var sn = class {
    constructor() {
      this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = !1, this.cacheArcLengths = null
    }
    getPoint() {
      console.warn("THREE.Curve: .getPoint() not implemented.")
    }
    getPointAt(e, t) {
      let i = this.getUtoTmapping(e);
      return this.getPoint(i, t)
    }
    getPoints(e = 5) {
      let t = [];
      for (let i = 0;
      i <= e;
      i++)t.push(this.getPoint(i / e));
      return t
    }
    getSpacedPoints(e = 5) {
      let t = [];
      for (let i = 0;
      i <= e;
      i++)t.push(this.getPointAt(i / e));
      return t
    }
    getLength() {
      let e = this.getLengths();
      return e[e.length - 1]
    }
    getLengths(e = this.arcLengthDivisions) {
      if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate)return this.cacheArcLengths;
      this.needsUpdate = !1;
      let t = [], i, s = this.getPoint(0), r = 0;
      t.push(0);
      for (let o = 1;
      o <= e;
      o++)i = this.getPoint(o / e), r += i.distanceTo(s), t.push(r), s = i;
      return this.cacheArcLengths = t, t
    }
    updateArcLengths() {
      this.needsUpdate = !0, this.getLengths()
    }
    getUtoTmapping(e, t = null) {
      let i = this.getLengths(), s = 0, r = i.length, o;
      t?o = t: o = e * i[r - 1];
      let a = 0, l = r - 1, c;
      for (;
      a <= l;
      )if (s = Math.floor(a + (l - a) / 2), c = i[s] - o, c < 0)a = s + 1;
      else if (c > 0)l = s - 1;
      else {
        l = s;
        break
      }
      if (s = l, i[s] === o)return s / (r - 1);
      let h = i[s], d = i[s + 1] - h, f = (o - h) / d;
      return(s + f) / (r - 1)
    }
    getTangent(e, t) {
      let s = e - 1e-4, r = e + 1e-4;
      s < 0 && (s = 0), r > 1 && (r = 1);
      let o = this.getPoint(s), a = this.getPoint(r), l = t || (o.isVector2?new fe: new I);
      return l.copy(a).sub(o).normalize(), l
    }
    getTangentAt(e, t) {
      let i = this.getUtoTmapping(e);
      return this.getTangent(i, t)
    }
    computeFrenetFrames(e, t = !1) {
      let i = new I, s = [], r = [], o = [], a = new I, l = new nt;
      for (let f = 0;
      f <= e;
      f++) {
        let m = f / e;
        s[f] = this.getTangentAt(m, new I)
      }
      r[0] = new I, o[0] = new I;
      let c = Number.MAX_VALUE, h = Math.abs(s[0].x), u = Math.abs(s[0].y), d = Math.abs(s[0].z);
      h <= c && (c = h, i.set(1, 0, 0)), u <= c && (c = u, i.set(0, 1, 0)), d <= c && i.set(0, 0, 1), a.crossVectors(s[0], i).normalize(), r[0].crossVectors(s[0], a), o[0].crossVectors(s[0], r[0]);
      for (let f = 1;
      f <= e;
      f++) {
        if (r[f] = r[f - 1].clone(), o[f] = o[f - 1].clone(), a.crossVectors(s[f - 1], s[f]), a.length() > Number.EPSILON) {
          a.normalize();
          let m = Math.acos(Ye(s[f - 1].dot(s[f]), - 1, 1));
          r[f].applyMatrix4(l.makeRotationAxis(a, m))
        }
        o[f].crossVectors(s[f], r[f])
      }
      if (t === !0) {
        let f = Math.acos(Ye(r[0].dot(r[e]), - 1, 1));
        f /= e, s[0].dot(a.crossVectors(r[0], r[e])) > 0 && (f = - f);
        for (let m = 1;
        m <= e;
        m++)r[m].applyMatrix4(l.makeRotationAxis(s[m], f * m)), o[m].crossVectors(s[m], r[m])
      }
      return {
        tangents: s, normals: r, binormals: o
      }
    }
    clone() {
      return new this.constructor().copy(this)
    }
    copy(e) {
      return this.arcLengthDivisions = e.arcLengthDivisions, this
    }
    toJSON() {
      let e = {
        metadata: {
          version: 4.7, type: "Curve", generator: "Curve.toJSON"
        }
      };
      return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e
    }
    fromJSON(e) {
      return this.arcLengthDivisions = e.arcLengthDivisions, this
    }
  }, vs = class extends sn {
    constructor(e = 0, t = 0, i = 1, s = 1, r = 0, o = Math.PI * 2, a = !1, l = 0) {
      super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = i, this.yRadius = s, this.aStartAngle = r, this.aEndAngle = o, this.aClockwise = a, this.aRotation = l
    }
    getPoint(e, t = new fe) {
      let i = t, s = Math.PI * 2, r = this.aEndAngle - this.aStartAngle, o = Math.abs(r) < Number.EPSILON;
      for (;
      r < 0;
      )r += s;
      for (;
      r > s;
      )r -= s;
      r < Number.EPSILON && (o?r = 0: r = s), this.aClockwise === !0 && !o && (r === s?r = - s: r = r - s);
      let a = this.aStartAngle + e * r, l = this.aX + this.xRadius * Math.cos(a), c = this.aY + this.yRadius * Math.sin(a);
      if (this.aRotation !== 0) {
        let h = Math.cos(this.aRotation), u = Math.sin(this.aRotation), d = l - this.aX, f = c - this.aY;
        l = d * h - f * u + this.aX, c = d * u + f * h + this.aY
      }
      return i.set(l, c)
    }
    copy(e) {
      return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this
    }
    toJSON() {
      let e = super.toJSON();
      return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e
    }
    fromJSON(e) {
      return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this
    }
  }, Go = class extends vs {
    constructor(e, t, i, s, r, o) {
      super(e, t, i, i, s, r, o), this.isArcCurve = !0, this.type = "ArcCurve"
    }
  };
  function Cc() {
    let n = 0, e = 0, t = 0, i = 0;
    function s(r, o, a, l) {
      n = r, e = a, t = - 3 * r + 3 * o - 2 * a - l, i = 2 * r - 2 * o + a + l
    }
    return {
      initCatmullRom: function(r, o, a, l, c) {
        s(o, a, c * (a - r), c * (l - o))
      }, initNonuniformCatmullRom: function(r, o, a, l, c, h, u) {
        let d = (o - r) / c - (a - r) / (c + h) + (a - o) / h, f = (a - o) / h - (l - o) / (h + u) + (l - a) / u;
        d *= h, f *= h, s(o, a, d, f)
      }, calc: function(r) {
        let o = r * r, a = o * r;
        return n + e * r + t * o + i * a
      }
    }
  }
  var bo = new I, ql = new Cc, Yl = new Cc, Zl = new Cc, Wo = class extends sn {
    constructor(e = [], t = !1, i = "centripetal", s = .5) {
      super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = i, this.tension = s
    }
    getPoint(e, t = new I) {
      let i = t, s = this.points, r = s.length, o = (r - (this.closed?0: 1)) * e, a = Math.floor(o), l = o - a;
      this.closed?a += a > 0?0: (Math.floor(Math.abs(a) / r) + 1) * r: l === 0 && a === r - 1 && (a = r - 2, l = 1);
      let c, h;
      this.closed || a > 0?c = s[(a - 1) % r]: (bo.subVectors(s[0], s[1]).add(s[0]), c = bo);
      let u = s[a % r], d = s[(a + 1) % r];
      if (this.closed || a + 2 < r?h = s[(a + 2) % r]: (bo.subVectors(s[r - 1], s[r - 2]).add(s[r - 1]), h = bo), this.curveType === "centripetal" || this.curveType === "chordal") {
        let f = this.curveType === "chordal"?.5: .25, m = Math.pow(c.distanceToSquared(u), f), x = Math.pow(u.distanceToSquared(d), f), g = Math.pow(d.distanceToSquared(h), f);
        x < 1e-4 && (x = 1), m < 1e-4 && (m = x), g < 1e-4 && (g = x), ql.initNonuniformCatmullRom(c.x, u.x, d.x, h.x, m, x, g), Yl.initNonuniformCatmullRom(c.y, u.y, d.y, h.y, m, x, g), Zl.initNonuniformCatmullRom(c.z, u.z, d.z, h.z, m, x, g)
      } else this.curveType === "catmullrom" && (ql.initCatmullRom(c.x, u.x, d.x, h.x, this.tension), Yl.initCatmullRom(c.y, u.y, d.y, h.y, this.tension), Zl.initCatmullRom(c.z, u.z, d.z, h.z, this.tension));
      return i.set(ql.calc(l), Yl.calc(l), Zl.calc(l)), i
    }
    copy(e) {
      super.copy(e), this.points = [];
      for (let t = 0, i = e.points.length;
      t < i;
      t++) {
        let s = e.points[t];
        this.points.push(s.clone())
      }
      return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this
    }
    toJSON() {
      let e = super.toJSON();
      e.points = [];
      for (let t = 0, i = this.points.length;
      t < i;
      t++) {
        let s = this.points[t];
        e.points.push(s.toArray())
      }
      return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e
    }
    fromJSON(e) {
      super.fromJSON(e), this.points = [];
      for (let t = 0, i = e.points.length;
      t < i;
      t++) {
        let s = e.points[t];
        this.points.push(new I().fromArray(s))
      }
      return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this
    }
  };
  function Zh(n, e, t, i, s) {
    let r = (i - e) * .5, o = (s - t) * .5, a = n * n, l = n * a;
    return(2 * t - 2 * i + r + o) * l + ( - 3 * t + 3 * i - 2 * r - o) * a + r * n + t
  }
  function cp(n, e) {
    let t = 1 - n;
    return t * t * e
  }
  function hp(n, e) {
    return 2 * (1 - n) * n * e
  }
  function up(n, e) {
    return n * n * e
  }
  function js(n, e, t, i) {
    return cp(n, e) + hp(n, t) + up(n, i)
  }
  function dp(n, e) {
    let t = 1 - n;
    return t * t * t * e
  }
  function fp(n, e) {
    let t = 1 - n;
    return 3 * t * t * n * e
  }
  function pp(n, e) {
    return 3 * (1 - n) * n * n * e
  }
  function mp(n, e) {
    return n * n * n * e
  }
  function er(n, e, t, i, s) {
    return dp(n, e) + fp(n, t) + pp(n, i) + mp(n, s)
  }
  var yr = class extends sn {
    constructor(e = new fe, t = new fe, i = new fe, s = new fe) {
      super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = i, this.v3 = s
    }
    getPoint(e, t = new fe) {
      let i = t, s = this.v0, r = this.v1, o = this.v2, a = this.v3;
      return i.set(er(e, s.x, r.x, o.x, a.x), er(e, s.y, r.y, o.y, a.y)), i
    }
    copy(e) {
      return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this
    }
    toJSON() {
      let e = super.toJSON();
      return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e
    }
    fromJSON(e) {
      return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this
    }
  }, Xo = class extends sn {
    constructor(e = new I, t = new I, i = new I, s = new I) {
      super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = i, this.v3 = s
    }
    getPoint(e, t = new I) {
      let i = t, s = this.v0, r = this.v1, o = this.v2, a = this.v3;
      return i.set(er(e, s.x, r.x, o.x, a.x), er(e, s.y, r.y, o.y, a.y), er(e, s.z, r.z, o.z, a.z)), i
    }
    copy(e) {
      return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this
    }
    toJSON() {
      let e = super.toJSON();
      return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e
    }
    fromJSON(e) {
      return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this
    }
  }, Mr = class extends sn {
    constructor(e = new fe, t = new fe) {
      super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = e, this.v2 = t
    }
    getPoint(e, t = new fe) {
      let i = t;
      return e === 1?i.copy(this.v2): (i.copy(this.v2).sub(this.v1), i.multiplyScalar(e).add(this.v1)), i
    }
    getPointAt(e, t) {
      return this.getPoint(e, t)
    }
    getTangent(e, t = new fe) {
      return t.subVectors(this.v2, this.v1).normalize()
    }
    getTangentAt(e, t) {
      return this.getTangent(e, t)
    }
    copy(e) {
      return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this
    }
    toJSON() {
      let e = super.toJSON();
      return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
    }
    fromJSON(e) {
      return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
    }
  }, qo = class extends sn {
    constructor(e = new I, t = new I) {
      super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = e, this.v2 = t
    }
    getPoint(e, t = new I) {
      let i = t;
      return e === 1?i.copy(this.v2): (i.copy(this.v2).sub(this.v1), i.multiplyScalar(e).add(this.v1)), i
    }
    getPointAt(e, t) {
      return this.getPoint(e, t)
    }
    getTangent(e, t = new I) {
      return t.subVectors(this.v2, this.v1).normalize()
    }
    getTangentAt(e, t) {
      return this.getTangent(e, t)
    }
    copy(e) {
      return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this
    }
    toJSON() {
      let e = super.toJSON();
      return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
    }
    fromJSON(e) {
      return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
    }
  }, Sr = class extends sn {
    constructor(e = new fe, t = new fe, i = new fe) {
      super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = i
    }
    getPoint(e, t = new fe) {
      let i = t, s = this.v0, r = this.v1, o = this.v2;
      return i.set(js(e, s.x, r.x, o.x), js(e, s.y, r.y, o.y)), i
    }
    copy(e) {
      return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this
    }
    toJSON() {
      let e = super.toJSON();
      return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
    }
    fromJSON(e) {
      return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
    }
  }, Yo = class extends sn {
    constructor(e = new I, t = new I, i = new I) {
      super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = i
    }
    getPoint(e, t = new I) {
      let i = t, s = this.v0, r = this.v1, o = this.v2;
      return i.set(js(e, s.x, r.x, o.x), js(e, s.y, r.y, o.y), js(e, s.z, r.z, o.z)), i
    }
    copy(e) {
      return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this
    }
    toJSON() {
      let e = super.toJSON();
      return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e
    }
    fromJSON(e) {
      return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this
    }
  }, br = class extends sn {
    constructor(e = []) {
      super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = e
    }
    getPoint(e, t = new fe) {
      let i = t, s = this.points, r = (s.length - 1) * e, o = Math.floor(r), a = r - o, l = s[o === 0?o: o - 1], c = s[o], h = s[o > s.length - 2?s.length - 1: o + 1], u = s[o > s.length - 3?s.length - 1: o + 2];
      return i.set(Zh(a, l.x, c.x, h.x, u.x), Zh(a, l.y, c.y, h.y, u.y)), i
    }
    copy(e) {
      super.copy(e), this.points = [];
      for (let t = 0, i = e.points.length;
      t < i;
      t++) {
        let s = e.points[t];
        this.points.push(s.clone())
      }
      return this
    }
    toJSON() {
      let e = super.toJSON();
      e.points = [];
      for (let t = 0, i = this.points.length;
      t < i;
      t++) {
        let s = this.points[t];
        e.points.push(s.toArray())
      }
      return e
    }
    fromJSON(e) {
      super.fromJSON(e), this.points = [];
      for (let t = 0, i = e.points.length;
      t < i;
      t++) {
        let s = e.points[t];
        this.points.push(new fe().fromArray(s))
      }
      return this
    }
  }, ic = Object.freeze({
    __proto__: null, ArcCurve: Go, CatmullRomCurve3: Wo, CubicBezierCurve: yr, CubicBezierCurve3: Xo, EllipseCurve: vs, LineCurve: Mr, LineCurve3: qo, QuadraticBezierCurve: Sr, QuadraticBezierCurve3: Yo, SplineCurve: br
  }), Zo = class extends sn {
    constructor() {
      super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1
    }
    add(e) {
      this.curves.push(e)
    }
    closePath() {
      let e = this.curves[0].getPoint(0), t = this.curves[this.curves.length - 1].getPoint(1);
      if (!e.equals(t)) {
        let i = e.isVector2 === !0?"LineCurve": "LineCurve3";
        this.curves.push(new ic[i](t, e))
      }
      return this
    }
    getPoint(e, t) {
      let i = e * this.getLength(), s = this.getCurveLengths(), r = 0;
      for (;
      r < s.length;
      ) {
        if (s[r] >= i) {
          let o = s[r] - i, a = this.curves[r], l = a.getLength(), c = l === 0?0: 1 - o / l;
          return a.getPointAt(c, t)
        }
        r++
      }
      return null
    }
    getLength() {
      let e = this.getCurveLengths();
      return e[e.length - 1]
    }
    updateArcLengths() {
      this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths()
    }
    getCurveLengths() {
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length)return this.cacheLengths;
      let e = [], t = 0;
      for (let i = 0, s = this.curves.length;
      i < s;
      i++)t += this.curves[i].getLength(), e.push(t);
      return this.cacheLengths = e, e
    }
    getSpacedPoints(e = 40) {
      let t = [];
      for (let i = 0;
      i <= e;
      i++)t.push(this.getPoint(i / e));
      return this.autoClose && t.push(t[0]), t
    }
    getPoints(e = 12) {
      let t = [], i;
      for (let s = 0, r = this.curves;
      s < r.length;
      s++) {
        let o = r[s], a = o.isEllipseCurve?e * 2: o.isLineCurve || o.isLineCurve3?1: o.isSplineCurve?e * o.points.length: e, l = o.getPoints(a);
        for (let c = 0;
        c < l.length;
        c++) {
          let h = l[c];
          i && i.equals(h) || (t.push(h), i = h)
        }
      }
      return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t
    }
    copy(e) {
      super.copy(e), this.curves = [];
      for (let t = 0, i = e.curves.length;
      t < i;
      t++) {
        let s = e.curves[t];
        this.curves.push(s.clone())
      }
      return this.autoClose = e.autoClose, this
    }
    toJSON() {
      let e = super.toJSON();
      e.autoClose = this.autoClose, e.curves = [];
      for (let t = 0, i = this.curves.length;
      t < i;
      t++) {
        let s = this.curves[t];
        e.curves.push(s.toJSON())
      }
      return e
    }
    fromJSON(e) {
      super.fromJSON(e), this.autoClose = e.autoClose, this.curves = [];
      for (let t = 0, i = e.curves.length;
      t < i;
      t++) {
        let s = e.curves[t];
        this.curves.push(new ic[s.type]().fromJSON(s))
      }
      return this
    }
  }, Er = class extends Zo {
    constructor(e) {
      super(), this.type = "Path", this.currentPoint = new fe, e && this.setFromPoints(e)
    }
    setFromPoints(e) {
      this.moveTo(e[0].x, e[0].y);
      for (let t = 1, i = e.length;
      t < i;
      t++)this.lineTo(e[t].x, e[t].y);
      return this
    }
    moveTo(e, t) {
      return this.currentPoint.set(e, t), this
    }
    lineTo(e, t) {
      let i = new Mr(this.currentPoint.clone(), new fe(e, t));
      return this.curves.push(i), this.currentPoint.set(e, t), this
    }
    quadraticCurveTo(e, t, i, s) {
      let r = new Sr(this.currentPoint.clone(), new fe(e, t), new fe(i, s));
      return this.curves.push(r), this.currentPoint.set(i, s), this
    }
    bezierCurveTo(e, t, i, s, r, o) {
      let a = new yr(this.currentPoint.clone(), new fe(e, t), new fe(i, s), new fe(r, o));
      return this.curves.push(a), this.currentPoint.set(r, o), this
    }
    splineThru(e) {
      let t = [this.currentPoint.clone()].concat(e), i = new br(t);
      return this.curves.push(i), this.currentPoint.copy(e[e.length - 1]), this
    }
    arc(e, t, i, s, r, o) {
      let a = this.currentPoint.x, l = this.currentPoint.y;
      return this.absarc(e + a, t + l, i, s, r, o), this
    }
    absarc(e, t, i, s, r, o) {
      return this.absellipse(e, t, i, i, s, r, o), this
    }
    ellipse(e, t, i, s, r, o, a, l) {
      let c = this.currentPoint.x, h = this.currentPoint.y;
      return this.absellipse(e + c, t + h, i, s, r, o, a, l), this
    }
    absellipse(e, t, i, s, r, o, a, l) {
      let c = new vs(e, t, i, s, r, o, a, l);
      if (this.curves.length > 0) {
        let u = c.getPoint(0);
        u.equals(this.currentPoint) || this.lineTo(u.x, u.y)
      }
      this.curves.push(c);
      let h = c.getPoint(1);
      return this.currentPoint.copy(h), this
    }
    copy(e) {
      return super.copy(e), this.currentPoint.copy(e.currentPoint), this
    }
    toJSON() {
      let e = super.toJSON();
      return e.currentPoint = this.currentPoint.toArray(), e
    }
    fromJSON(e) {
      return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this
    }
  }, Pi = class extends Er {
    constructor(e) {
      super(e), this.uuid = Fi(), this.type = "Shape", this.holes = []
    }
    getPointsHoles(e) {
      let t = [];
      for (let i = 0, s = this.holes.length;
      i < s;
      i++)t[i] = this.holes[i].getPoints(e);
      return t
    }
    extractPoints(e) {
      return {
        shape: this.getPoints(e), holes: this.getPointsHoles(e)
      }
    }
    copy(e) {
      super.copy(e), this.holes = [];
      for (let t = 0, i = e.holes.length;
      t < i;
      t++) {
        let s = e.holes[t];
        this.holes.push(s.clone())
      }
      return this
    }
    toJSON() {
      let e = super.toJSON();
      e.uuid = this.uuid, e.holes = [];
      for (let t = 0, i = this.holes.length;
      t < i;
      t++) {
        let s = this.holes[t];
        e.holes.push(s.toJSON())
      }
      return e
    }
    fromJSON(e) {
      super.fromJSON(e), this.uuid = e.uuid, this.holes = [];
      for (let t = 0, i = e.holes.length;
      t < i;
      t++) {
        let s = e.holes[t];
        this.holes.push(new Er().fromJSON(s))
      }
      return this
    }
  };
  function gp(n, e, t = 2) {
    let i = e && e.length, s = i?e[0] * t: n.length, r = Xu(n, 0, s, t, !0), o = [];
    if (!r || r.next === r.prev)return o;
    let a, l, c;
    if (i && (r = Mp(n, e, r, t)), n.length > 80 * t) {
      a = 1 / 0, l = 1 / 0;
      let h = - 1 / 0, u = - 1 / 0;
      for (let d = t;
      d < s;
      d += t) {
        let f = n[d], m = n[d + 1];
        f < a && (a = f), m < l && (l = m), f > h && (h = f), m > u && (u = m)
      }
      c = Math.max(h - a, u - l), c = c !== 0?32767 / c: 0
    }
    return Tr(r, o, t, a, l, c, 0), o
  }
  function Xu(n, e, t, i, s) {
    let r;
    if (s === Dp(n, e, t, i) > 0)for (let o = e;
    o < t;
    o += i)r = $h(o / i | 0, n[o], n[o + 1], r);
    else for (let o = t - i;
    o >= e;
    o -= i)r = $h(o / i | 0, n[o], n[o + 1], r);
    return r && ys(r, r.next) && (Ar(r), r = r.next), r
  }
  function Di(n, e) {
    if (!n)return n;
    e || (e = n);
    let t = n, i;
    do if (i = !1, !t.steiner && (ys(t, t.next) || xt(t.prev, t, t.next) === 0)) {
      if (Ar(t), t = e = t.prev, t === t.next)break;
      i = !0
    } else t = t.next;
    while (i || t !== e);
    return e
  }
  function Tr(n, e, t, i, s, r, o) {
    if (!n)return;
    !o && r && wp(n, i, s, r);
    let a = n;
    for (;
    n.prev !== n.next;
    ) {
      let l = n.prev, c = n.next;
      if (r?xp(n, i, s, r): _p(n)) {
        e.push(l.i, n.i, c.i), Ar(n), n = c.next, a = c.next;
        continue
      }
      if (n = c, n === a) {
        o?o === 1?(n = vp(Di(n), e), Tr(n, e, t, i, s, r, 2)): o === 2 && yp(n, e, t, i, s, r): Tr(Di(n), e, t, i, s, r, 1);
        break
      }
    }
  }
  function _p(n) {
    let e = n.prev, t = n, i = n.next;
    if (xt(e, t, i) >= 0)return!1;
    let s = e.x, r = t.x, o = i.x, a = e.y, l = t.y, c = i.y, h = Math.min(s, r, o), u = Math.min(a, l, c), d = Math.max(s, r, o), f = Math.max(a, l, c), m = i.next;
    for (;
    m !== e;
    ) {
      if (m.x >= h && m.x <= d && m.y >= u && m.y <= f && Js(s, a, r, l, o, c, m.x, m.y) && xt(m.prev, m, m.next) >= 0)return!1;
      m = m.next
    }
    return!0
  }
  function xp(n, e, t, i) {
    let s = n.prev, r = n, o = n.next;
    if (xt(s, r, o) >= 0)return!1;
    let a = s.x, l = r.x, c = o.x, h = s.y, u = r.y, d = o.y, f = Math.min(a, l, c), m = Math.min(h, u, d), x = Math.max(a, l, c), g = Math.max(h, u, d), p = sc(f, m, e, t, i), E = sc(x, g, e, t, i), b = n.prevZ, y = n.nextZ;
    for (;
    b && b.z >= p && y && y.z <= E;
    ) {
      if (b.x >= f && b.x <= x && b.y >= m && b.y <= g && b !== s && b !== o && Js(a, h, l, u, c, d, b.x, b.y) && xt(b.prev, b, b.next) >= 0 || (b = b.prevZ, y.x >= f && y.x <= x && y.y >= m && y.y <= g && y !== s && y !== o && Js(a, h, l, u, c, d, y.x, y.y) && xt(y.prev, y, y.next) >= 0))return!1;
      y = y.nextZ
    }
    for (;
    b && b.z >= p;
    ) {
      if (b.x >= f && b.x <= x && b.y >= m && b.y <= g && b !== s && b !== o && Js(a, h, l, u, c, d, b.x, b.y) && xt(b.prev, b, b.next) >= 0)return!1;
      b = b.prevZ
    }
    for (;
    y && y.z <= E;
    ) {
      if (y.x >= f && y.x <= x && y.y >= m && y.y <= g && y !== s && y !== o && Js(a, h, l, u, c, d, y.x, y.y) && xt(y.prev, y, y.next) >= 0)return!1;
      y = y.nextZ
    }
    return!0
  }
  function vp(n, e) {
    let t = n;
    do {
      let i = t.prev, s = t.next.next;
      !ys(i, s) && Yu(i, t, t.next, s) && wr(i, s) && wr(s, i) && (e.push(i.i, t.i, s.i), Ar(t), Ar(t.next), t = n = s), t = t.next
    } while (t !== n);
    return Di(t)
  }
  function yp(n, e, t, i, s, r) {
    let o = n;
    do {
      let a = o.next.next;
      for (;
      a !== o.prev;
      ) {
        if (o.i !== a.i && Cp(o, a)) {
          let l = Zu(o, a);
          o = Di(o, o.next), l = Di(l, l.next), Tr(o, e, t, i, s, r, 0), Tr(l, e, t, i, s, r, 0);
          return
        }
        a = a.next
      }
      o = o.next
    } while (o !== n)
  }
  function Mp(n, e, t, i) {
    let s = [];
    for (let r = 0, o = e.length;
    r < o;
    r++) {
      let a = e[r] * i, l = r < o - 1?e[r + 1] * i: n.length, c = Xu(n, a, l, i, !1);
      c === c.next && (c.steiner = !0), s.push(Rp(c))
    }
    s.sort(Sp);
    for (let r = 0;
    r < s.length;
    r++)t = bp(s[r], t);
    return t
  }
  function Sp(n, e) {
    let t = n.x - e.x;
    if (t === 0 && (t = n.y - e.y, t === 0)) {
      let i = (n.next.y - n.y) / (n.next.x - n.x), s = (e.next.y - e.y) / (e.next.x - e.x);
      t = i - s
    }
    return t
  }
  function bp(n, e) {
    let t = Ep(n, e);
    if (!t)return e;
    let i = Zu(t, n);
    return Di(i, i.next), Di(t, t.next)
  }
  function Ep(n, e) {
    let t = e, i = n.x, s = n.y, r = - 1 / 0, o;
    if (ys(n, t))return t;
    do {
      if (ys(n, t.next))return t.next;
      if (s <= t.y && s >= t.next.y && t.next.y !== t.y) {
        let u = t.x + (s - t.y) * (t.next.x - t.x) / (t.next.y - t.y);
        if (u <= i && u > r && (r = u, o = t.x < t.next.x?t: t.next, u === i))return o
      }
      t = t.next
    } while (t !== e);
    if (!o)return null;
    let a = o, l = o.x, c = o.y, h = 1 / 0;
    t = o;
    do {
      if (i >= t.x && t.x >= l && i !== t.x && qu(s < c?i: r, s, l, c, s < c?r: i, s, t.x, t.y)) {
        let u = Math.abs(s - t.y) / (i - t.x);
        wr(t, n) && (u < h || u === h && (t.x > o.x || t.x === o.x && Tp(o, t))) && (o = t, h = u)
      }
      t = t.next
    } while (t !== a);
    return o
  }
  function Tp(n, e) {
    return xt(n.prev, n, e.prev) < 0 && xt(e.next, n, n.next) < 0
  }
  function wp(n, e, t, i) {
    let s = n;
    do s.z === 0 && (s.z = sc(s.x, s.y, e, t, i)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
    while (s !== n);
    s.prevZ.nextZ = null, s.prevZ = null, Ap(s)
  }
  function Ap(n) {
    let e, t = 1;
    do {
      let i = n, s;
      n = null;
      let r = null;
      for (e = 0;
      i;
      ) {
        e++;
        let o = i, a = 0;
        for (let c = 0;
        c < t && (a++, o = o.nextZ, !!o);
        c++);
        let l = t;
        for (;
        a > 0 || l > 0 && o;
        )a !== 0 && (l === 0 || !o || i.z <= o.z)?(s = i, i = i.nextZ, a--): (s = o, o = o.nextZ, l--), r?r.nextZ = s: n = s, s.prevZ = r, r = s;
        i = o
      }
      r.nextZ = null, t *= 2
    } while (e > 1);
    return n
  }
  function sc(n, e, t, i, s) {
    return n = (n - t) * s | 0, e = (e - i) * s | 0, n = (n | n << 8) & 16711935, n = (n | n << 4) & 252645135, n = (n | n << 2) & 858993459, n = (n | n << 1) & 1431655765, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, n | e << 1
  }
  function Rp(n) {
    let e = n, t = n;
    do(e.x < t.x || e.x === t.x && e.y < t.y) && (t = e), e = e.next;
    while (e !== n);
    return t
  }
  function qu(n, e, t, i, s, r, o, a) {
    return(s - o) * (e - a) >= (n - o) * (r - a) && (n - o) * (i - a) >= (t - o) * (e - a) && (t - o) * (r - a) >= (s - o) * (i - a)
  }
  function Js(n, e, t, i, s, r, o, a) {
    return!(n === o && e === a) && qu(n, e, t, i, s, r, o, a)
  }
  function Cp(n, e) {
    return n.next.i !== e.i && n.prev.i !== e.i && !Ip(n, e) && (wr(n, e) && wr(e, n) && Pp(n, e) && (xt(n.prev, n, e.prev) || xt(n, e.prev, e)) || ys(n, e) && xt(n.prev, n, n.next) > 0 && xt(e.prev, e, e.next) > 0)
  }
  function xt(n, e, t) {
    return(e.y - n.y) * (t.x - e.x) - (e.x - n.x) * (t.y - e.y)
  }
  function ys(n, e) {
    return n.x === e.x && n.y === e.y
  }
  function Yu(n, e, t, i) {
    let s = To(xt(n, e, t)), r = To(xt(n, e, i)), o = To(xt(t, i, n)), a = To(xt(t, i, e));
    return!!(s !== r && o !== a || s === 0 && Eo(n, t, e) || r === 0 && Eo(n, i, e) || o === 0 && Eo(t, n, i) || a === 0 && Eo(t, e, i))
  }
  function Eo(n, e, t) {
    return e.x <= Math.max(n.x, t.x) && e.x >= Math.min(n.x, t.x) && e.y <= Math.max(n.y, t.y) && e.y >= Math.min(n.y, t.y)
  }
  function To(n) {
    return n > 0?1: n < 0? - 1: 0
  }
  function Ip(n, e) {
    let t = n;
    do {
      if (t.i !== n.i && t.next.i !== n.i && t.i !== e.i && t.next.i !== e.i && Yu(t, t.next, n, e))return!0;
      t = t.next
    } while (t !== n);
    return!1
  }
  function wr(n, e) {
    return xt(n.prev, n, n.next) < 0?xt(n, e, n.next) >= 0 && xt(n, n.prev, e) >= 0: xt(n, e, n.prev) < 0 || xt(n, n.next, e) < 0
  }
  function Pp(n, e) {
    let t = n, i = !1, s = (n.x + e.x) / 2, r = (n.y + e.y) / 2;
    do t.y > r != t.next.y > r && t.next.y !== t.y && s < (t.next.x - t.x) * (r - t.y) / (t.next.y - t.y) + t.x && (i = !i), t = t.next;
    while (t !== n);
    return i
  }
  function Zu(n, e) {
    let t = rc(n.i, n.x, n.y), i = rc(e.i, e.x, e.y), s = n.next, r = e.prev;
    return n.next = e, e.prev = n, t.next = s, s.prev = t, i.next = t, t.prev = i, r.next = i, i.prev = r, i
  }
  function $h(n, e, t, i) {
    let s = rc(n, e, t);
    return i?(s.next = i.next, s.prev = i, i.next.prev = s, i.next = s): (s.prev = s, s.next = s), s
  }
  function Ar(n) {
    n.next.prev = n.prev, n.prev.next = n.next, n.prevZ && (n.prevZ.nextZ = n.nextZ), n.nextZ && (n.nextZ.prevZ = n.prevZ)
  }
  function rc(n, e, t) {
    return {
      i: n, x: e, y: t, prev: null, next: null, z: 0, prevZ: null, nextZ: null, steiner: !1
    }
  }
  function Dp(n, e, t, i) {
    let s = 0;
    for (let r = e, o = t - i;
    r < t;
    r += i)s += (n[o] - n[r]) * (n[r + 1] + n[o + 1]), o = r;
    return s
  }
  var oc = class {
    static triangulate(e, t, i = 2) {
      return gp(e, t, i)
    }
  }, Ai = class n {
    static area(e) {
      let t = e.length, i = 0;
      for (let s = t - 1, r = 0;
      r < t;
      s = r++)i += e[s].x * e[r].y - e[r].x * e[s].y;
      return i * .5
    }
    static isClockWise(e) {
      return n.area(e) < 0
    }
    static triangulateShape(e, t) {
      let i = [], s = [], r = [];
      Jh(e), Kh(i, e);
      let o = e.length;
      t.forEach(Jh);
      for (let l = 0;
      l < t.length;
      l++)s.push(o), o += t[l].length, Kh(i, t[l]);
      let a = oc.triangulate(i, s);
      for (let l = 0;
      l < a.length;
      l += 3)r.push(a.slice(l, l + 3));
      return r
    }
  };
  function Jh(n) {
    let e = n.length;
    e > 2 && n[e - 1].equals(n[0]) && n.pop()
  }
  function Kh(n, e) {
    for (let t = 0;
    t < e.length;
    t++)n.push(e[t].x), n.push(e[t].y)
  }
  var Ms = class n extends mt {
    constructor(e = new Pi([new fe(.5, .5), new fe( - .5, .5), new fe( - .5, - .5), new fe(.5, - .5)]), t = {
    }) {
      super(), this.type = "ExtrudeGeometry", this.parameters = {
        shapes: e, options: t
      }, e = Array.isArray(e)?e: [e];
      let i = this, s = [], r = [];
      for (let a = 0, l = e.length;
      a < l;
      a++) {
        let c = e[a];
        o(c)
      }
      this.setAttribute("position", new Qe(s, 3)), this.setAttribute("uv", new Qe(r, 2)), this.computeVertexNormals();
      function o(a) {
        let l = [], c = t.curveSegments !== void 0?t.curveSegments: 12, h = t.steps !== void 0?t.steps: 1, u = t.depth !== void 0?t.depth: 1, d = t.bevelEnabled !== void 0?t.bevelEnabled: !0, f = t.bevelThickness !== void 0?t.bevelThickness: .2, m = t.bevelSize !== void 0?t.bevelSize: f - .1, x = t.bevelOffset !== void 0?t.bevelOffset: 0, g = t.bevelSegments !== void 0?t.bevelSegments: 3, p = t.extrudePath, E = t.UVGenerator !== void 0?t.UVGenerator: Lp, b, y = !1, R, w, P, D;
        p && (b = p.getSpacedPoints(h), y = !0, d = !1, R = p.computeFrenetFrames(h, !1), w = new I, P = new I, D = new I), d || (g = 0, f = 0, m = 0, x = 0);
        let M = a.extractPoints(c), v = M.shape, C = M.holes;
        if (!Ai.isClockWise(v)) {
          v = v.reverse();
          for (let j = 0, J = C.length;
          j < J;
          j++) {
            let $ = C[j];
            Ai.isClockWise($) && (C[j] = $.reverse())
          }
        }
        function z(j) {
          let $ = 10000000000000001e-36, Z = j[0];
          for (let ce = 1;
          ce <= j.length;
          ce++) {
            let ie = ce % j.length, he = j[ie], He = he.x - Z.x, ze = he.y - Z.y, T = He * He + ze * ze, _ = Math.max(Math.abs(he.x), Math.abs(he.y), Math.abs(Z.x), Math.abs(Z.y)), O = $ * _ * _;
            if (T <= O) {
              j.splice(ie, 1), ce--;
              continue
            }
            Z = he
          }
        }
        z(v), C.forEach(z);
        let G = C.length, q = v;
        for (let j = 0;
        j < G;
        j++) {
          let J = C[j];
          v = v.concat(J)
        }
        function W(j, J, $) {
          return J || console.error("THREE.ExtrudeGeometry: vec does not exist"), j.clone().addScaledVector(J, $)
        }
        let te = v.length;
        function V(j, J, $) {
          let Z, ce, ie, he = j.x - J.x, He = j.y - J.y, ze = $.x - j.x, T = $.y - j.y, _ = he * he + He * He, O = he * T - He * ze;
          if (Math.abs(O) > Number.EPSILON) {
            let H = Math.sqrt(_), Q = Math.sqrt(ze * ze + T * T), X = J.x - He / H, Ie = J.y + he / H, le = $.x - T / Q, Ae = $.y + ze / Q, Re = ((le - X) * T - (Ae - Ie) * ze) / (he * T - He * ze);
            Z = X + he * Re - j.x, ce = Ie + He * Re - j.y;
            let se = Z * Z + ce * ce;
            if (se <= 2)return new fe(Z, ce);
            ie = Math.sqrt(se / 2)
          } else {
            let H = !1;
            he > Number.EPSILON?ze > Number.EPSILON && (H = !0): he < - Number.EPSILON?ze < - Number.EPSILON && (H = !0): Math.sign(He) === Math.sign(T) && (H = !0), H?(Z = - He, ce = he, ie = Math.sqrt(_)): (Z = he, ce = He, ie = Math.sqrt(_ / 2))
          }
          return new fe(Z / ie, ce / ie)
        }
        let ue = [];
        for (let j = 0, J = q.length, $ = J - 1, Z = j + 1;
        j < J;
        j++, $++, Z++)$ === J && ($ = 0), Z === J && (Z = 0), ue[j] = V(q[j], q[$], q[Z]);
        let ve = [], Se, Ge = ue.concat();
        for (let j = 0, J = G;
        j < J;
        j++) {
          let $ = C[j];
          Se = [];
          for (let Z = 0, ce = $.length, ie = ce - 1, he = Z + 1;
          Z < ce;
          Z++, ie++, he++)ie === ce && (ie = 0), he === ce && (he = 0), Se[Z] = V($[Z], $[ie], $[he]);
          ve.push(Se), Ge = Ge.concat(Se)
        }
        let Ke;
        if (g === 0)Ke = Ai.triangulateShape(q, C);
        else {
          let j = [], J = [];
          for (let $ = 0;
          $ < g;
          $++) {
            let Z = $ / g, ce = f * Math.cos(Z * Math.PI / 2), ie = m * Math.sin(Z * Math.PI / 2) + x;
            for (let he = 0, He = q.length;
            he < He;
            he++) {
              let ze = W(q[he], ue[he], ie);
              De(ze.x, ze.y, - ce), Z === 0 && j.push(ze)
            }
            for (let he = 0, He = G;
            he < He;
            he++) {
              let ze = C[he];
              Se = ve[he];
              let T = [];
              for (let _ = 0, O = ze.length;
              _ < O;
              _++) {
                let H = W(ze[_], Se[_], ie);
                De(H.x, H.y, - ce), Z === 0 && T.push(H)
              }
              Z === 0 && J.push(T)
            }
          }
          Ke = Ai.triangulateShape(j, J)
        }
        let rt = Ke.length, je = m + x;
        for (let j = 0;
        j < te;
        j++) {
          let J = d?W(v[j], Ge[j], je): v[j];
          y?(P.copy(R.normals[0]).multiplyScalar(J.x), w.copy(R.binormals[0]).multiplyScalar(J.y), D.copy(b[0]).add(P).add(w), De(D.x, D.y, D.z)): De(J.x, J.y, 0)
        }
        for (let j = 1;
        j <= h;
        j++)for (let J = 0;
        J < te;
        J++) {
          let $ = d?W(v[J], Ge[J], je): v[J];
          y?(P.copy(R.normals[j]).multiplyScalar($.x), w.copy(R.binormals[j]).multiplyScalar($.y), D.copy(b[j]).add(P).add(w), De(D.x, D.y, D.z)): De($.x, $.y, u / h * j)
        }
        for (let j = g - 1;
        j >= 0;
        j--) {
          let J = j / g, $ = f * Math.cos(J * Math.PI / 2), Z = m * Math.sin(J * Math.PI / 2) + x;
          for (let ce = 0, ie = q.length;
          ce < ie;
          ce++) {
            let he = W(q[ce], ue[ce], Z);
            De(he.x, he.y, u + $)
          }
          for (let ce = 0, ie = C.length;
          ce < ie;
          ce++) {
            let he = C[ce];
            Se = ve[ce];
            for (let He = 0, ze = he.length;
            He < ze;
            He++) {
              let T = W(he[He], Se[He], Z);
              y?De(T.x, T.y + b[h - 1].y, b[h - 1].x + $): De(T.x, T.y, u + $)
            }
          }
        }
        Y(), ee();
        function Y() {
          let j = s.length / 3;
          if (d) {
            let J = 0, $ = te * J;
            for (let Z = 0;
            Z < rt;
            Z++) {
              let ce = Ke[Z];
              we(ce[2] + $, ce[1] + $, ce[0] + $)
            }
            J = h + g * 2, $ = te * J;
            for (let Z = 0;
            Z < rt;
            Z++) {
              let ce = Ke[Z];
              we(ce[0] + $, ce[1] + $, ce[2] + $)
            }
          } else {
            for (let J = 0;
            J < rt;
            J++) {
              let $ = Ke[J];
              we($[2], $[1], $[0])
            }
            for (let J = 0;
            J < rt;
            J++) {
              let $ = Ke[J];
              we($[0] + te * h, $[1] + te * h, $[2] + te * h)
            }
          }
          i.addGroup(j, s.length / 3 - j, 0)
        }
        function ee() {
          let j = s.length / 3, J = 0;
          Me(q, J), J += q.length;
          for (let $ = 0, Z = C.length;
          $ < Z;
          $++) {
            let ce = C[$];
            Me(ce, J), J += ce.length
          }
          i.addGroup(j, s.length / 3 - j, 1)
        }
        function Me(j, J) {
          let $ = j.length;
          for (;
          --$ >= 0;
          ) {
            let Z = $, ce = $ - 1;
            ce < 0 && (ce = j.length - 1);
            for (let ie = 0, he = h + g * 2;
            ie < he;
            ie++) {
              let He = te * ie, ze = te * (ie + 1), T = J + Z + He, _ = J + ce + He, O = J + ce + ze, H = J + Z + ze;
              Ze(T, _, O, H)
            }
          }
        }
        function De(j, J, $) {
          l.push(j), l.push(J), l.push($)
        }
        function we(j, J, $) {
          ut(j), ut(J), ut($);
          let Z = s.length / 3, ce = E.generateTopUV(i, s, Z - 3, Z - 2, Z - 1);
          A(ce[0]), A(ce[1]), A(ce[2])
        }
        function Ze(j, J, $, Z) {
          ut(j), ut(J), ut(Z), ut(J), ut($), ut(Z);
          let ce = s.length / 3, ie = E.generateSideWallUV(i, s, ce - 6, ce - 3, ce - 2, ce - 1);
          A(ie[0]), A(ie[1]), A(ie[3]), A(ie[1]), A(ie[2]), A(ie[3])
        }
        function ut(j) {
          s.push(l[j * 3 + 0]), s.push(l[j * 3 + 1]), s.push(l[j * 3 + 2])
        }
        function A(j) {
          r.push(j.x), r.push(j.y)
        }
      }
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({
      }, e.parameters), this
    }
    toJSON() {
      let e = super.toJSON(), t = this.parameters.shapes, i = this.parameters.options;
      return Up(t, i, e)
    }
    static fromJSON(e, t) {
      let i = [];
      for (let r = 0, o = e.shapes.length;
      r < o;
      r++) {
        let a = t[e.shapes[r]];
        i.push(a)
      }
      let s = e.options.extrudePath;
      return s !== void 0 && (e.options.extrudePath = new ic[s.type]().fromJSON(s)), new n(i, e.options)
    }
  }, Lp = {
    generateTopUV: function(n, e, t, i, s) {
      let r = e[t * 3], o = e[t * 3 + 1], a = e[i * 3], l = e[i * 3 + 1], c = e[s * 3], h = e[s * 3 + 1];
      return[new fe(r, o), new fe(a, l), new fe(c, h)]
    }, generateSideWallUV: function(n, e, t, i, s, r) {
      let o = e[t * 3], a = e[t * 3 + 1], l = e[t * 3 + 2], c = e[i * 3], h = e[i * 3 + 1], u = e[i * 3 + 2], d = e[s * 3], f = e[s * 3 + 1], m = e[s * 3 + 2], x = e[r * 3], g = e[r * 3 + 1], p = e[r * 3 + 2];
      return Math.abs(a - h) < Math.abs(o - c)?[new fe(o, 1 - l), new fe(c, 1 - u), new fe(d, 1 - m), new fe(x, 1 - p)]: [new fe(a, 1 - l), new fe(h, 1 - u), new fe(f, 1 - m), new fe(g, 1 - p)]
    }
  };
  function Up(n, e, t) {
    if (t.shapes = [], Array.isArray(n))for (let i = 0, s = n.length;
    i < s;
    i++) {
      let r = n[i];
      t.shapes.push(r.uuid)
    } else t.shapes.push(n.uuid);
    return t.options = Object.assign({
    }, e), e.extrudePath !== void 0 && (t.options.extrudePath = e.extrudePath.toJSON()), t
  }
  var Rr = class n extends xs {
    constructor(e = 1, t = 0) {
      let i = (1 + Math.sqrt(5)) / 2, s = [ - 1, i, 0, 1, i, 0, - 1, - i, 0, 1, - i, 0, 0, - 1, i, 0, 1, i, 0, - 1, - i, 0, 1, - i, i, 0, - 1, i, 0, 1, - i, 0, - 1, - i, 0, 1], r = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];
      super(s, r, e, t), this.type = "IcosahedronGeometry", this.parameters = {
        radius: e, detail: t
      }
    }
    static fromJSON(e) {
      return new n(e.radius, e.detail)
    }
  };
  var ci = class n extends xs {
    constructor(e = 1, t = 0) {
      let i = [1, 0, 0, - 1, 0, 0, 0, 1, 0, 0, - 1, 0, 0, 0, 1, 0, 0, - 1], s = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
      super(i, s, e, t), this.type = "OctahedronGeometry", this.parameters = {
        radius: e, detail: t
      }
    }
    static fromJSON(e) {
      return new n(e.radius, e.detail)
    }
  }, Cr = class n extends mt {
    constructor(e = 1, t = 1, i = 1, s = 1) {
      super(), this.type = "PlaneGeometry", this.parameters = {
        width: e, height: t, widthSegments: i, heightSegments: s
      };
      let r = e / 2, o = t / 2, a = Math.floor(i), l = Math.floor(s), c = a + 1, h = l + 1, u = e / a, d = t / l, f = [], m = [], x = [], g = [];
      for (let p = 0;
      p < h;
      p++) {
        let E = p * d - o;
        for (let b = 0;
        b < c;
        b++) {
          let y = b * u - r;
          m.push(y, - E, 0), x.push(0, 0, 1), g.push(b / a), g.push(1 - p / l)
        }
      }
      for (let p = 0;
      p < l;
      p++)for (let E = 0;
      E < a;
      E++) {
        let b = E + c * p, y = E + c * (p + 1), R = E + 1 + c * (p + 1), w = E + 1 + c * p;
        f.push(b, y, w), f.push(y, R, w)
      }
      this.setIndex(f), this.setAttribute("position", new Qe(m, 3)), this.setAttribute("normal", new Qe(x, 3)), this.setAttribute("uv", new Qe(g, 2))
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({
      }, e.parameters), this
    }
    static fromJSON(e) {
      return new n(e.width, e.height, e.widthSegments, e.heightSegments)
    }
  };
  var cn = class n extends mt {
    constructor(e = 1, t = .4, i = 12, s = 48, r = Math.PI * 2) {
      super(), this.type = "TorusGeometry", this.parameters = {
        radius: e, tube: t, radialSegments: i, tubularSegments: s, arc: r
      }, i = Math.floor(i), s = Math.floor(s);
      let o = [], a = [], l = [], c = [], h = new I, u = new I, d = new I;
      for (let f = 0;
      f <= i;
      f++)for (let m = 0;
      m <= s;
      m++) {
        let x = m / s * r, g = f / i * Math.PI * 2;
        u.x = (e + t * Math.cos(g)) * Math.cos(x), u.y = (e + t * Math.cos(g)) * Math.sin(x), u.z = t * Math.sin(g), a.push(u.x, u.y, u.z), h.x = e * Math.cos(x), h.y = e * Math.sin(x), d.subVectors(u, h).normalize(), l.push(d.x, d.y, d.z), c.push(m / s), c.push(f / i)
      }
      for (let f = 1;
      f <= i;
      f++)for (let m = 1;
      m <= s;
      m++) {
        let x = (s + 1) * f + m - 1, g = (s + 1) * (f - 1) + m - 1, p = (s + 1) * (f - 1) + m, E = (s + 1) * f + m;
        o.push(x, g, E), o.push(g, p, E)
      }
      this.setIndex(o), this.setAttribute("position", new Qe(a, 3)), this.setAttribute("normal", new Qe(l, 3)), this.setAttribute("uv", new Qe(c, 2))
    }
    copy(e) {
      return super.copy(e), this.parameters = Object.assign({
      }, e.parameters), this
    }
    static fromJSON(e) {
      return new n(e.radius, e.tube, e.radialSegments, e.tubularSegments, e.arc)
    }
  };
  var hi = class extends Cn {
    constructor(e) {
      super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = {
        STANDARD: ""
      }, this.color = new ke(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new ke(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = bc, this.normalScale = new fe(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new vn, this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e)
    }
    copy(e) {
      return super.copy(e), this.defines = {
        STANDARD: ""
      }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this
    }
  };
  var $o = class extends Cn {
    constructor(e) {
      super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Pu, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e)
    }
    copy(e) {
      return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this
    }
  }, Jo = class extends Cn {
    constructor(e) {
      super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e)
    }
    copy(e) {
      return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this
    }
  };
  function wo(n, e) {
    return!n || n.constructor === e?n: typeof e.BYTES_PER_ELEMENT == "number"?new e(n): Array.prototype.slice.call(n)
  }
  function Np(n) {
    return ArrayBuffer.isView(n) && !(n instanceof DataView)
  }
  var Li = class {
    constructor(e, t, i, s) {
      this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = s !== void 0?s: new t.constructor(i), this.sampleValues = t, this.valueSize = i, this.settings = null, this.DefaultSettings_ = {
      }
    }
    evaluate(e) {
      let t = this.parameterPositions, i = this._cachedIndex, s = t[i], r = t[i - 1];
      n: {
        e: {
          let o;
          t: {
            i: if (!(e < s)) {
              for (let a = i + 2;
              ;
              ) {
                if (s === void 0) {
                  if (e < r)break i;
                  return i = t.length, this._cachedIndex = i, this.copySampleValue_(i - 1)
                }
                if (i === a)break;
                if (r = s, s = t[++i], e < s)break e
              }
              o = t.length;
              break t
            }
            if (!(e >= r)) {
              let a = t[1];
              e < a && (i = 2, r = a);
              for (let l = i - 2;
              ;
              ) {
                if (r === void 0)return this._cachedIndex = 0, this.copySampleValue_(0);
                if (i === l)break;
                if (s = r, r = t[--i - 1], e >= r)break e
              }
              o = i, i = 0;
              break t
            }
            break n
          }
          for (;
          i < o;
          ) {
            let a = i + o >>> 1;
            e < t[a]?o = a: i = a + 1
          }
          if (s = t[i], r = t[i - 1], r === void 0)return this._cachedIndex = 0, this.copySampleValue_(0);
          if (s === void 0)return i = t.length, this._cachedIndex = i, this.copySampleValue_(i - 1)
        }
        this._cachedIndex = i, this.intervalChanged_(i, r, s)
      }
      return this.interpolate_(i, r, e, s)
    }
    getSettings_() {
      return this.settings || this.DefaultSettings_
    }
    copySampleValue_(e) {
      let t = this.resultBuffer, i = this.sampleValues, s = this.valueSize, r = e * s;
      for (let o = 0;
      o !== s;
      ++o)t[o] = i[r + o];
      return t
    }
    interpolate_() {
      throw new Error("call to abstract method")
    }
    intervalChanged_() {
    }
  }, Ko = class extends Li {
    constructor(e, t, i, s) {
      super(e, t, i, s), this._weightPrev = - 0, this._offsetPrev = - 0, this._weightNext = - 0, this._offsetNext = - 0, this.DefaultSettings_ = {
        endingStart: Kl, endingEnd: Kl
      }
    }
    intervalChanged_(e, t, i) {
      let s = this.parameterPositions, r = e - 2, o = e + 1, a = s[r], l = s[o];
      if (a === void 0)switch (this.getSettings_().endingStart) {
        case Ql: r = e, a = 2 * t - i;
        break;
        case jl: r = s.length - 2, a = t + s[r] - s[r + 1];
        break;
        default: r = e, a = i
      }
      if (l === void 0)switch (this.getSettings_().endingEnd) {
        case Ql: o = e, l = 2 * i - t;
        break;
        case jl: o = 1, l = i + s[1] - s[0];
        break;
        default: o = e - 1, l = t
      }
      let c = (i - t) * .5, h = this.valueSize;
      this._weightPrev = c / (t - a), this._weightNext = c / (l - i), this._offsetPrev = r * h, this._offsetNext = o * h
    }
    interpolate_(e, t, i, s) {
      let r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = e * a, c = l - a, h = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, m = (i - t) / (s - t), x = m * m, g = x * m, p = - d * g + 2 * d * x - d * m, E = (1 + d) * g + ( - 1.5 - 2 * d) * x + ( - .5 + d) * m + 1, b = ( - 1 - f) * g + (1.5 + f) * x + .5 * m, y = f * g - f * x;
      for (let R = 0;
      R !== a;
      ++R)r[R] = p * o[h + R] + E * o[c + R] + b * o[l + R] + y * o[u + R];
      return r
    }
  }, Qo = class extends Li {
    constructor(e, t, i, s) {
      super(e, t, i, s)
    }
    interpolate_(e, t, i, s) {
      let r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = e * a, c = l - a, h = (i - t) / (s - t), u = 1 - h;
      for (let d = 0;
      d !== a;
      ++d)r[d] = o[c + d] * u + o[l + d] * h;
      return r
    }
  }, jo = class extends Li {
    constructor(e, t, i, s) {
      super(e, t, i, s)
    }
    interpolate_(e) {
      return this.copySampleValue_(e - 1)
    }
  }, rn = class {
    constructor(e, t, i, s) {
      if (e === void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");
      if (t === void 0 || t.length === 0)throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
      this.name = e, this.times = wo(t, this.TimeBufferType), this.values = wo(i, this.ValueBufferType), this.setInterpolation(s || this.DefaultInterpolation)
    }
    static toJSON(e) {
      let t = e.constructor, i;
      if (t.toJSON !== this.toJSON)i = t.toJSON(e);
      else {
        i = {
          name: e.name, times: wo(e.times, Array), values: wo(e.values, Array)
        };
        let s = e.getInterpolation();
        s !== e.DefaultInterpolation && (i.interpolation = s)
      }
      return i.type = e.ValueTypeName, i
    }
    InterpolantFactoryMethodDiscrete(e) {
      return new jo(this.times, this.values, this.getValueSize(), e)
    }
    InterpolantFactoryMethodLinear(e) {
      return new Qo(this.times, this.values, this.getValueSize(), e)
    }
    InterpolantFactoryMethodSmooth(e) {
      return new Ko(this.times, this.values, this.getValueSize(), e)
    }
    setInterpolation(e) {
      let t;
      switch (e) {
        case tr: t = this.InterpolantFactoryMethodDiscrete;
        break;
        case Do: t = this.InterpolantFactoryMethodLinear;
        break;
        case Ao: t = this.InterpolantFactoryMethodSmooth;
        break
      }
      if (t === void 0) {
        let i = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
        if (this.createInterpolant === void 0)if (e !== this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);
        else throw new Error(i);
        return console.warn("THREE.KeyframeTrack:", i), this
      }
      return this.createInterpolant = t, this
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete: return tr;
        case this.InterpolantFactoryMethodLinear: return Do;
        case this.InterpolantFactoryMethodSmooth: return Ao
      }
    }
    getValueSize() {
      return this.values.length / this.times.length
    }
    shift(e) {
      if (e !== 0) {
        let t = this.times;
        for (let i = 0, s = t.length;
        i !== s;
        ++i)t[i] += e
      }
      return this
    }
    scale(e) {
      if (e !== 1) {
        let t = this.times;
        for (let i = 0, s = t.length;
        i !== s;
        ++i)t[i] *= e
      }
      return this
    }
    trim(e, t) {
      let i = this.times, s = i.length, r = 0, o = s - 1;
      for (;
      r !== s && i[r] < e;
      )++r;
      for (;
      o !== - 1 && i[o] > t;
      )--o;
      if (++o, r !== 0 || o !== s) {
        r >= o && (o = Math.max(o, 1), r = o - 1);
        let a = this.getValueSize();
        this.times = i.slice(r, o), this.values = this.values.slice(r * a, o * a)
      }
      return this
    }
    validate() {
      let e = !0, t = this.getValueSize();
      t - Math.floor(t) !== 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), e = !1);
      let i = this.times, s = this.values, r = i.length;
      r === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), e = !1);
      let o = null;
      for (let a = 0;
      a !== r;
      a++) {
        let l = i[a];
        if (typeof l == "number" && isNaN(l)) {
          console.error("THREE.KeyframeTrack: Time is not a valid number.", this, a, l), e = !1;
          break
        }
        if (o !== null && o > l) {
          console.error("THREE.KeyframeTrack: Out of order keys.", this, a, l, o), e = !1;
          break
        }
        o = l
      }
      if (s !== void 0 && Np(s))for (let a = 0, l = s.length;
      a !== l;
      ++a) {
        let c = s[a];
        if (isNaN(c)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, a, c), e = !1;
          break
        }
      }
      return e
    }
    optimize() {
      let e = this.times.slice(), t = this.values.slice(), i = this.getValueSize(), s = this.getInterpolation() === Ao, r = e.length - 1, o = 1;
      for (let a = 1;
      a < r;
      ++a) {
        let l = !1, c = e[a], h = e[a + 1];
        if (c !== h && (a !== 1 || c !== e[0]))if (s)l = !0;
        else {
          let u = a * i, d = u - i, f = u + i;
          for (let m = 0;
          m !== i;
          ++m) {
            let x = t[u + m];
            if (x !== t[d + m] || x !== t[f + m]) {
              l = !0;
              break
            }
          }
        }
        if (l) {
          if (a !== o) {
            e[o] = e[a];
            let u = a * i, d = o * i;
            for (let f = 0;
            f !== i;
            ++f)t[d + f] = t[u + f]
          }
          ++o
        }
      }
      if (r > 0) {
        e[o] = e[r];
        for (let a = r * i, l = o * i, c = 0;
        c !== i;
        ++c)t[l + c] = t[a + c];
        ++o
      }
      return o !== e.length?(this.times = e.slice(0, o), this.values = t.slice(0, o * i)): (this.times = e, this.values = t), this
    }
    clone() {
      let e = this.times.slice(), t = this.values.slice(), i = this.constructor, s = new i(this.name, e, t);
      return s.createInterpolant = this.createInterpolant, s
    }
  };
  rn.prototype.ValueTypeName = "";
  rn.prototype.TimeBufferType = Float32Array;
  rn.prototype.ValueBufferType = Float32Array;
  rn.prototype.DefaultInterpolation = Do;
  var ui = class extends rn {
    constructor(e, t, i) {
      super(e, t, i)
    }
  };
  ui.prototype.ValueTypeName = "bool";
  ui.prototype.ValueBufferType = Array;
  ui.prototype.DefaultInterpolation = tr;
  ui.prototype.InterpolantFactoryMethodLinear = void 0;
  ui.prototype.InterpolantFactoryMethodSmooth = void 0;
  var ea = class extends rn {
    constructor(e, t, i, s) {
      super(e, t, i, s)
    }
  };
  ea.prototype.ValueTypeName = "color";
  var ta = class extends rn {
    constructor(e, t, i, s) {
      super(e, t, i, s)
    }
  };
  ta.prototype.ValueTypeName = "number";
  var na = class extends Li {
    constructor(e, t, i, s) {
      super(e, t, i, s)
    }
    interpolate_(e, t, i, s) {
      let r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = (i - t) / (s - t), c = e * a;
      for (let h = c + a;
      c !== h;
      c += 4)qn.slerpFlat(r, 0, o, c - a, o, c, l);
      return r
    }
  }, Ir = class extends rn {
    constructor(e, t, i, s) {
      super(e, t, i, s)
    }
    InterpolantFactoryMethodLinear(e) {
      return new na(this.times, this.values, this.getValueSize(), e)
    }
  };
  Ir.prototype.ValueTypeName = "quaternion";
  Ir.prototype.InterpolantFactoryMethodSmooth = void 0;
  var di = class extends rn {
    constructor(e, t, i) {
      super(e, t, i)
    }
  };
  di.prototype.ValueTypeName = "string";
  di.prototype.ValueBufferType = Array;
  di.prototype.DefaultInterpolation = tr;
  di.prototype.InterpolantFactoryMethodLinear = void 0;
  di.prototype.InterpolantFactoryMethodSmooth = void 0;
  var ia = class extends rn {
    constructor(e, t, i, s) {
      super(e, t, i, s)
    }
  };
  ia.prototype.ValueTypeName = "vector";
  var sa = class {
    constructor(e, t, i) {
      let s = this, r = !1, o = 0, a = 0, l, c = [];
      this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = i, this.abortController = new AbortController, this.itemStart = function(h) {
        a++, r === !1 && s.onStart !== void 0 && s.onStart(h, o, a), r = !0
      }, this.itemEnd = function(h) {
        o++, s.onProgress !== void 0 && s.onProgress(h, o, a), o === a && (r = !1, s.onLoad !== void 0 && s.onLoad())
      }, this.itemError = function(h) {
        s.onError !== void 0 && s.onError(h)
      }, this.resolveURL = function(h) {
        return l?l(h): h
      }, this.setURLModifier = function(h) {
        return l = h, this
      }, this.addHandler = function(h, u) {
        return c.push(h, u), this
      }, this.removeHandler = function(h) {
        let u = c.indexOf(h);
        return u !== - 1 && c.splice(u, 2), this
      }, this.getHandler = function(h) {
        for (let u = 0, d = c.length;
        u < d;
        u += 2) {
          let f = c[u], m = c[u + 1];
          if (f.global && (f.lastIndex = 0), f.test(h))return m
        }
        return null
      }, this.abort = function() {
        return this.abortController.abort(), this.abortController = new AbortController, this
      }
    }
  }, $u = new sa, ra = class {
    constructor(e) {
      this.manager = e !== void 0?e: $u, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {
      }
    }
    load() {
    }
    loadAsync(e, t) {
      let i = this;
      return new Promise(function(s, r) {
        i.load(e, s, t, r)
      })
    }
    parse() {
    }
    setCrossOrigin(e) {
      return this.crossOrigin = e, this
    }
    setWithCredentials(e) {
      return this.withCredentials = e, this
    }
    setPath(e) {
      return this.path = e, this
    }
    setResourcePath(e) {
      return this.resourcePath = e, this
    }
    setRequestHeader(e) {
      return this.requestHeader = e, this
    }
    abort() {
      return this
    }
  };
  ra.DEFAULT_MATERIAL_NAME = "__DEFAULT";
  var Ss = class extends bt {
    constructor(e, t = 1) {
      super(), this.isLight = !0, this.type = "Light", this.color = new ke(e), this.intensity = t
    }
    dispose() {
    }
    copy(e, t) {
      return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (t.object.distance = this.distance), this.angle !== void 0 && (t.object.angle = this.angle), this.decay !== void 0 && (t.object.decay = this.decay), this.penumbra !== void 0 && (t.object.penumbra = this.penumbra), this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (t.object.target = this.target.uuid), t
    }
  }, bs = class extends Ss {
    constructor(e, t, i) {
      super(e, i), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(bt.DEFAULT_UP), this.updateMatrix(), this.groundColor = new ke(t)
    }
    copy(e, t) {
      return super.copy(e, t), this.groundColor.copy(e.groundColor), this
    }
  }, $l = new nt, Qh = new I, jh = new I, oa = class {
    constructor(e) {
      this.camera = e, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new fe(512, 512), this.mapType = Mn, this.map = null, this.mapPass = null, this.matrix = new nt, this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new gs, this._frameExtents = new fe(1, 1), this._viewportCount = 1, this._viewports = [new ot(0, 0, 1, 1)]
    }
    getViewportCount() {
      return this._viewportCount
    }
    getFrustum() {
      return this._frustum
    }
    updateMatrices(e) {
      let t = this.camera, i = this.matrix;
      Qh.setFromMatrixPosition(e.matrixWorld), t.position.copy(Qh), jh.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(jh), t.updateMatrixWorld(), $l.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix($l, t.coordinateSystem, t.reversedDepth), t.reversedDepth?i.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, 1, 0, 0, 0, 0, 1): i.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), i.multiply($l)
    }
    getViewport(e) {
      return this._viewports[e]
    }
    getFrameExtents() {
      return this._frameExtents
    }
    dispose() {
      this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose()
    }
    copy(e) {
      return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this
    }
    clone() {
      return new this.constructor().copy(this)
    }
    toJSON() {
      let e = {
      };
      return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e
    }
  };
  var eu = new nt, $s = new I, Jl = new I, ac = class extends oa {
    constructor() {
      super(new Rt(90, 1, .5, 500)), this.isPointLightShadow = !0, this._frameExtents = new fe(4, 2), this._viewportCount = 6, this._viewports = [new ot(2, 1, 1, 1), new ot(0, 1, 1, 1), new ot(3, 1, 1, 1), new ot(1, 1, 1, 1), new ot(3, 0, 1, 1), new ot(1, 0, 1, 1)], this._cubeDirections = [new I(1, 0, 0), new I( - 1, 0, 0), new I(0, 0, 1), new I(0, 0, - 1), new I(0, 1, 0), new I(0, - 1, 0)], this._cubeUps = [new I(0, 1, 0), new I(0, 1, 0), new I(0, 1, 0), new I(0, 1, 0), new I(0, 0, 1), new I(0, 0, - 1)]
    }
    updateMatrices(e, t = 0) {
      let i = this.camera, s = this.matrix, r = e.distance || i.far;
      r !== i.far && (i.far = r, i.updateProjectionMatrix()), $s.setFromMatrixPosition(e.matrixWorld), i.position.copy($s), Jl.copy(i.position), Jl.add(this._cubeDirections[t]), i.up.copy(this._cubeUps[t]), i.lookAt(Jl), i.updateMatrixWorld(), s.makeTranslation( - $s.x, - $s.y, - $s.z), eu.multiplyMatrices(i.projectionMatrix, i.matrixWorldInverse), this._frustum.setFromProjectionMatrix(eu, i.coordinateSystem, i.reversedDepth)
    }
  }, Pr = class extends Ss {
    constructor(e, t, i = 0, s = 2) {
      super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = i, this.decay = s, this.shadow = new ac
    }
    get power() {
      return this.intensity * 4 * Math.PI
    }
    set power(e) {
      this.intensity = e / (4 * Math.PI)
    }
    dispose() {
      this.shadow.dispose()
    }
    copy(e, t) {
      return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this
    }
  }, Dr = class extends hr {
    constructor(e = - 1, t = 1, i = 1, s = - 1, r = .1, o = 2e3) {
      super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = i, this.bottom = s, this.near = r, this.far = o, this.updateProjectionMatrix()
    }
    copy(e, t) {
      return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null?null: Object.assign({
      }, e.view), this
    }
    setViewOffset(e, t, i, s, r, o) {
      this.view === null && (this.view = {
        enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1
      }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = s, this.view.width = r, this.view.height = o, this.updateProjectionMatrix()
    }
    clearViewOffset() {
      this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix()
    }
    updateProjectionMatrix() {
      let e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), i = (this.right + this.left) / 2, s = (this.top + this.bottom) / 2, r = i - e, o = i + e, a = s + t, l = s - t;
      if (this.view !== null && this.view.enabled) {
        let c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        r += c * this.view.offsetX, o = r + c * this.view.width, a -= h * this.view.offsetY, l = a - h * this.view.height
      }
      this.projectionMatrix.makeOrthographic(r, o, a, l, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({
      }, this.view)), t
    }
  }, lc = class extends oa {
    constructor() {
      super(new Dr( - 5, 5, 5, - 5, .5, 500)), this.isDirectionalLightShadow = !0
    }
  }, Es = class extends Ss {
    constructor(e, t) {
      super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(bt.DEFAULT_UP), this.updateMatrix(), this.target = new bt, this.shadow = new lc
    }
    dispose() {
      this.shadow.dispose()
    }
    copy(e) {
      return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this
    }
  };
  var aa = class extends Rt {
    constructor(e = []) {
      super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e
    }
  };
  var Ic = "\\[\\]\\.:\\/", Fp = new RegExp("[" + Ic + "]", "g"), Pc = "[^" + Ic + "]", Op = "[^" + Ic.replace("\\.", "") + "]", Bp = /((?:WC+[\/:])*)/.source.replace("WC", Pc), zp = /(WCOD+)?/.source.replace("WCOD", Op), kp = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Pc), Hp = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Pc), Vp = new RegExp("^" + Bp + zp + kp + Hp + "$"), Gp = ["material", "materials", "bones", "map"], cc = class {
    constructor(e, t, i) {
      let s = i || pt.parseTrackName(t);
      this._targetGroup = e, this._bindings = e.subscribe_(t, s)
    }
    getValue(e, t) {
      this.bind();
      let i = this._targetGroup.nCachedObjects_, s = this._bindings[i];
      s !== void 0 && s.getValue(e, t)
    }
    setValue(e, t) {
      let i = this._bindings;
      for (let s = this._targetGroup.nCachedObjects_, r = i.length;
      s !== r;
      ++s)i[s].setValue(e, t)
    }
    bind() {
      let e = this._bindings;
      for (let t = this._targetGroup.nCachedObjects_, i = e.length;
      t !== i;
      ++t)e[t].bind()
    }
    unbind() {
      let e = this._bindings;
      for (let t = this._targetGroup.nCachedObjects_, i = e.length;
      t !== i;
      ++t)e[t].unbind()
    }
  }, pt = class n {
    constructor(e, t, i) {
      this.path = t, this.parsedPath = i || n.parseTrackName(t), this.node = n.findNode(e, this.parsedPath.nodeName), this.rootNode = e, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound
    }
    static create(e, t, i) {
      return e && e.isAnimationObjectGroup?new n.Composite(e, t, i): new n(e, t, i)
    }
    static sanitizeNodeName(e) {
      return e.replace(/\s/g, "_").replace(Fp, "")
    }
    static parseTrackName(e) {
      let t = Vp.exec(e);
      if (t === null)throw new Error("PropertyBinding: Cannot parse trackName: " + e);
      let i = {
        nodeName: t[2], objectName: t[3], objectIndex: t[4], propertyName: t[5], propertyIndex: t[6]
      }, s = i.nodeName && i.nodeName.lastIndexOf(".");
      if (s !== void 0 && s !== - 1) {
        let r = i.nodeName.substring(s + 1);
        Gp.indexOf(r) !== - 1 && (i.nodeName = i.nodeName.substring(0, s), i.objectName = r)
      }
      if (i.propertyName === null || i.propertyName.length === 0)throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e);
      return i
    }
    static findNode(e, t) {
      if (t === void 0 || t === "" || t === "." || t === - 1 || t === e.name || t === e.uuid)return e;
      if (e.skeleton) {
        let i = e.skeleton.getBoneByName(t);
        if (i !== void 0)return i
      }
      if (e.children) {
        let i = function(r) {
          for (let o = 0;
          o < r.length;
          o++) {
            let a = r[o];
            if (a.name === t || a.uuid === t)return a;
            let l = i(a.children);
            if (l)return l
          }
          return null
        }, s = i(e.children);
        if (s)return s
      }
      return null
    }
    _getValue_unavailable() {
    }
    _setValue_unavailable() {
    }
    _getValue_direct(e, t) {
      e[t] = this.targetObject[this.propertyName]
    }
    _getValue_array(e, t) {
      let i = this.resolvedProperty;
      for (let s = 0, r = i.length;
      s !== r;
      ++s)e[t++] = i[s]
    }
    _getValue_arrayElement(e, t) {
      e[t] = this.resolvedProperty[this.propertyIndex]
    }
    _getValue_toArray(e, t) {
      this.resolvedProperty.toArray(e, t)
    }
    _setValue_direct(e, t) {
      this.targetObject[this.propertyName] = e[t]
    }
    _setValue_direct_setNeedsUpdate(e, t) {
      this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
      this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0
    }
    _setValue_array(e, t) {
      let i = this.resolvedProperty;
      for (let s = 0, r = i.length;
      s !== r;
      ++s)i[s] = e[t++]
    }
    _setValue_array_setNeedsUpdate(e, t) {
      let i = this.resolvedProperty;
      for (let s = 0, r = i.length;
      s !== r;
      ++s)i[s] = e[t++];
      this.targetObject.needsUpdate = !0
    }
    _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
      let i = this.resolvedProperty;
      for (let s = 0, r = i.length;
      s !== r;
      ++s)i[s] = e[t++];
      this.targetObject.matrixWorldNeedsUpdate = !0
    }
    _setValue_arrayElement(e, t) {
      this.resolvedProperty[this.propertyIndex] = e[t]
    }
    _setValue_arrayElement_setNeedsUpdate(e, t) {
      this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
      this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0
    }
    _setValue_fromArray(e, t) {
      this.resolvedProperty.fromArray(e, t)
    }
    _setValue_fromArray_setNeedsUpdate(e, t) {
      this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
      this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0
    }
    _getValue_unbound(e, t) {
      this.bind(), this.getValue(e, t)
    }
    _setValue_unbound(e, t) {
      this.bind(), this.setValue(e, t)
    }
    bind() {
      let e = this.node, t = this.parsedPath, i = t.objectName, s = t.propertyName, r = t.propertyIndex;
      if (e || (e = n.findNode(this.rootNode, t.nodeName), this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) {
        console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
        return
      }
      if (i) {
        let c = t.objectIndex;
        switch (i) {
          case "materials": if (!e.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return
          }
          if (!e.material.materials) {
            console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return
          }
          e = e.material.materials;
          break;
          case "bones": if (!e.skeleton) {
            console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return
          }
          e = e.skeleton.bones;
          for (let h = 0;
          h < e.length;
          h++)if (e[h].name === c) {
            c = h;
            break
          }
          break;
          case "map": if ("map" in e) {
            e = e.map;
            break
          }
          if (!e.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return
          }
          if (!e.material.map) {
            console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return
          }
          e = e.material.map;
          break;
          default: if (e[i] === void 0) {
            console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
            return
          }
          e = e[i]
        }
        if (c !== void 0) {
          if (e[c] === void 0) {
            console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
            return
          }
          e = e[c]
        }
      }
      let o = e[s];
      if (o === void 0) {
        let c = t.nodeName;
        console.error("THREE.PropertyBinding: Trying to update property for track: " + c + "." + s + " but it wasn't found.", e);
        return
      }
      let a = this.Versioning.None;
      this.targetObject = e, e.isMaterial === !0?a = this.Versioning.NeedsUpdate: e.isObject3D === !0 && (a = this.Versioning.MatrixWorldNeedsUpdate);
      let l = this.BindingType.Direct;
      if (r !== void 0) {
        if (s === "morphTargetInfluences") {
          if (!e.geometry) {
            console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
            return
          }
          if (!e.geometry.morphAttributes) {
            console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
            return
          }
          e.morphTargetDictionary[r] !== void 0 && (r = e.morphTargetDictionary[r])
        }
        l = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = r
      } else o.fromArray !== void 0 && o.toArray !== void 0?(l = this.BindingType.HasFromToArray, this.resolvedProperty = o): Array.isArray(o)?(l = this.BindingType.EntireArray, this.resolvedProperty = o): this.propertyName = s;
      this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][a]
    }
    unbind() {
      this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound
    }
  };
  pt.Composite = cc;
  pt.prototype.BindingType = {
    Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3
  };
  pt.prototype.Versioning = {
    None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2
  };
  pt.prototype.GetterByBindingType = [pt.prototype._getValue_direct, pt.prototype._getValue_array, pt.prototype._getValue_arrayElement, pt.prototype._getValue_toArray];
  pt.prototype.SetterByBindingTypeAndVersioning = [[pt.prototype._setValue_direct, pt.prototype._setValue_direct_setNeedsUpdate, pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [pt.prototype._setValue_array, pt.prototype._setValue_array_setNeedsUpdate, pt.prototype._setValue_array_setMatrixWorldNeedsUpdate], [pt.prototype._setValue_arrayElement, pt.prototype._setValue_arrayElement_setNeedsUpdate, pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [pt.prototype._setValue_fromArray, pt.prototype._setValue_fromArray_setNeedsUpdate, pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
  var Jx = new Float32Array(1);
  var Lr = class extends Vo {
    constructor(e = 10, t = 10, i = 4473924, s = 8947848) {
      i = new ke(i), s = new ke(s);
      let r = t / 2, o = e / t, a = e / 2, l = [], c = [];
      for (let d = 0, f = 0, m = - a;
      d <= t;
      d++, m += o) {
        l.push( - a, 0, m, a, 0, m), l.push(m, 0, - a, m, 0, a);
        let x = d === r?i: s;
        x.toArray(c, f), f += 3, x.toArray(c, f), f += 3, x.toArray(c, f), f += 3, x.toArray(c, f), f += 3
      }
      let h = new mt;
      h.setAttribute("position", new Qe(l, 3)), h.setAttribute("color", new Qe(c, 3));
      let u = new fr({
        vertexColors: !0, toneMapped: !1
      });
      super(h, u), this.type = "GridHelper"
    }
    dispose() {
      this.geometry.dispose(), this.material.dispose()
    }
  };
  function Dc(n, e, t, i) {
    let s = Wp(i);
    switch (t) {
      case yc: return n * e;
      case Ma: return n * e / s.components * s.byteLength;
      case Sa: return n * e / s.components * s.byteLength;
      case Sc: return n * e * 2 / s.components * s.byteLength;
      case ba: return n * e * 2 / s.components * s.byteLength;
      case Mc: return n * e * 3 / s.components * s.byteLength;
      case hn: return n * e * 4 / s.components * s.byteLength;
      case Ea: return n * e * 4 / s.components * s.byteLength;
      case Br: case zr: return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 8;
      case kr: case Hr: return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
      case wa: case Ra: return Math.max(n, 16) * Math.max(e, 8) / 4;
      case Ta: case Aa: return Math.max(n, 8) * Math.max(e, 8) / 2;
      case Ca: case Ia: return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 8;
      case Pa: return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
      case Da: return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
      case La: return Math.floor((n + 4) / 5) * Math.floor((e + 3) / 4) * 16;
      case Ua: return Math.floor((n + 4) / 5) * Math.floor((e + 4) / 5) * 16;
      case Na: return Math.floor((n + 5) / 6) * Math.floor((e + 4) / 5) * 16;
      case Fa: return Math.floor((n + 5) / 6) * Math.floor((e + 5) / 6) * 16;
      case Oa: return Math.floor((n + 7) / 8) * Math.floor((e + 4) / 5) * 16;
      case Ba: return Math.floor((n + 7) / 8) * Math.floor((e + 5) / 6) * 16;
      case za: return Math.floor((n + 7) / 8) * Math.floor((e + 7) / 8) * 16;
      case ka: return Math.floor((n + 9) / 10) * Math.floor((e + 4) / 5) * 16;
      case Ha: return Math.floor((n + 9) / 10) * Math.floor((e + 5) / 6) * 16;
      case Va: return Math.floor((n + 9) / 10) * Math.floor((e + 7) / 8) * 16;
      case Ga: return Math.floor((n + 9) / 10) * Math.floor((e + 9) / 10) * 16;
      case Wa: return Math.floor((n + 11) / 12) * Math.floor((e + 9) / 10) * 16;
      case Xa: return Math.floor((n + 11) / 12) * Math.floor((e + 11) / 12) * 16;
      case qa: case Ya: case Za: return Math.ceil(n / 4) * Math.ceil(e / 4) * 16;
      case $a: case Ja: return Math.ceil(n / 4) * Math.ceil(e / 4) * 8;
      case Ka: case Qa: return Math.ceil(n / 4) * Math.ceil(e / 4) * 16
    }
    throw new Error(`Unable to determine texture byte length for ${t} format.`)
  }
  function Wp(n) {
    switch (n) {
      case Mn: case gc: return {
        byteLength: 1, components: 1
      };
      case Ts: case _c: case ws: return {
        byteLength: 2, components: 1
      };
      case va: case ya: return {
        byteLength: 2, components: 4
      };
      case pi: case xa: case Sn: return {
        byteLength: 4, components: 1
      };
      case xc: case vc: return {
        byteLength: 4, components: 3
      }
    }
    throw new Error(`Unknown texture type ${n}.`)
  }
  typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", {
    detail: {
      revision: "180"
    }
  }));
  typeof window < "u" && (window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."): window.__THREE__ = "180");
  function vd() {
    let n = null, e = !1, t = null, i = null;
    function s(r, o) {
      t(r, o), i = n.requestAnimationFrame(s)
    }
    return {
      start: function() {
        e !== !0 && t !== null && (i = n.requestAnimationFrame(s), e = !0)
      }, stop: function() {
        n.cancelAnimationFrame(i), e = !1
      }, setAnimationLoop: function(r) {
        t = r
      }, setContext: function(r) {
        n = r
      }
    }
  }
  function Kp(n) {
    let e = new WeakMap;
    function t(a, l) {
      let c = a.array, h = a.usage, u = c.byteLength, d = n.createBuffer();
      n.bindBuffer(l, d), n.bufferData(l, c, h), a.onUploadCallback();
      let f;
      if (c instanceof Float32Array)f = n.FLOAT;
      else if (typeof Float16Array < "u" && c instanceof Float16Array)f = n.HALF_FLOAT;
      else if (c instanceof Uint16Array)a.isFloat16BufferAttribute?f = n.HALF_FLOAT: f = n.UNSIGNED_SHORT;
      else if (c instanceof Int16Array)f = n.SHORT;
      else if (c instanceof Uint32Array)f = n.UNSIGNED_INT;
      else if (c instanceof Int32Array)f = n.INT;
      else if (c instanceof Int8Array)f = n.BYTE;
      else if (c instanceof Uint8Array)f = n.UNSIGNED_BYTE;
      else if (c instanceof Uint8ClampedArray)f = n.UNSIGNED_BYTE;
      else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
      return {
        buffer: d, type: f, bytesPerElement: c.BYTES_PER_ELEMENT, version: a.version, size: u
      }
    }
    function i(a, l, c) {
      let h = l.array, u = l.updateRanges;
      if (n.bindBuffer(c, a), u.length === 0)n.bufferSubData(c, 0, h);
      else {
        u.sort((f, m) => f.start - m.start);
        let d = 0;
        for (let f = 1;
        f < u.length;
        f++) {
          let m = u[d], x = u[f];
          x.start <= m.start + m.count + 1?m.count = Math.max(m.count, x.start + x.count - m.start): (++d, u[d] = x)
        }
        u.length = d + 1;
        for (let f = 0, m = u.length;
        f < m;
        f++) {
          let x = u[f];
          n.bufferSubData(c, x.start * h.BYTES_PER_ELEMENT, h, x.start, x.count)
        }
        l.clearUpdateRanges()
      }
      l.onUploadCallback()
    }
    function s(a) {
      return a.isInterleavedBufferAttribute && (a = a.data), e.get(a)
    }
    function r(a) {
      a.isInterleavedBufferAttribute && (a = a.data);
      let l = e.get(a);
      l && (n.deleteBuffer(l.buffer), e.delete(a))
    }
    function o(a, l) {
      if (a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute) {
        let h = e.get(a);
        (!h || h.version < a.version) && e.set(a, {
          buffer: a.buffer, type: a.type, bytesPerElement: a.elementSize, version: a.version
        });
        return
      }
      let c = e.get(a);
      if (c === void 0)e.set(a, t(a, l));
      else if (c.version < a.version) {
        if (c.size !== a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
        i(c.buffer, a, l), c.version = a.version
      }
    }
    return {
      get: s, remove: r, update: o
    }
  }
  var Qp = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, jp = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, em = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, tm = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, nm = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, im = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, sm = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, rm = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, om = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, am = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, lm = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, cm = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, hm = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, um = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, dm = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, fm = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, pm = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, mm = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, gm = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, _m = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, xm = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, vm = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, ym = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, Mm = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Sm = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, bm = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, Em = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Tm = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, wm = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Am = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Rm = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Cm = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Im = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Pm = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Dm = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Lm = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Um = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Nm = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Fm = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Om = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Bm = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, zm = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, km = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Hm = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Vm = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Gm = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, Wm = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Xm = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, qm = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Ym = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Zm = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, $m = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, Jm = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Km = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Qm = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, jm = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, eg = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, tg = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, ng = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, ig = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, sg = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, rg = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, og = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, ag = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, lg = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, cg = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, hg = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, ug = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, dg = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, fg = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, pg = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, mg = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, gg = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, _g = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, xg = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, vg = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, yg = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Mg = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Sg = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, bg = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Eg = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Tg = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, wg = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, Ag = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Rg = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Cg = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Ig = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Pg = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Dg = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Lg = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, Ug = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Ng = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Fg = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Og = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Bg = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, zg = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, kg = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Hg = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Vg = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Gg = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Wg = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Xg = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, qg = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Yg = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Zg = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, $g = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, Jg = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`, Kg = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Qg = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, jg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, e0 = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, t0 = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, n0 = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, i0 = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, s0 = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, r0 = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, o0 = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, a0 = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, l0 = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, c0 = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, h0 = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, u0 = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, d0 = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, f0 = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, p0 = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, m0 = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, g0 = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, _0 = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, x0 = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, v0 = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, y0 = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, M0 = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, S0 = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, b0 = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, E0 = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, T0 = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, w0 = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, A0 = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, R0 = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, C0 = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, I0 = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, qe = {
    alphahash_fragment: Qp, alphahash_pars_fragment: jp, alphamap_fragment: em, alphamap_pars_fragment: tm, alphatest_fragment: nm, alphatest_pars_fragment: im, aomap_fragment: sm, aomap_pars_fragment: rm, batching_pars_vertex: om, batching_vertex: am, begin_vertex: lm, beginnormal_vertex: cm, bsdfs: hm, iridescence_fragment: um, bumpmap_pars_fragment: dm, clipping_planes_fragment: fm, clipping_planes_pars_fragment: pm, clipping_planes_pars_vertex: mm, clipping_planes_vertex: gm, color_fragment: _m, color_pars_fragment: xm, color_pars_vertex: vm, color_vertex: ym, common: Mm, cube_uv_reflection_fragment: Sm, defaultnormal_vertex: bm, displacementmap_pars_vertex: Em, displacementmap_vertex: Tm, emissivemap_fragment: wm, emissivemap_pars_fragment: Am, colorspace_fragment: Rm, colorspace_pars_fragment: Cm, envmap_fragment: Im, envmap_common_pars_fragment: Pm, envmap_pars_fragment: Dm, envmap_pars_vertex: Lm, envmap_physical_pars_fragment: Wm, envmap_vertex: Um, fog_vertex: Nm, fog_pars_vertex: Fm, fog_fragment: Om, fog_pars_fragment: Bm, gradientmap_pars_fragment: zm, lightmap_pars_fragment: km, lights_lambert_fragment: Hm, lights_lambert_pars_fragment: Vm, lights_pars_begin: Gm, lights_toon_fragment: Xm, lights_toon_pars_fragment: qm, lights_phong_fragment: Ym, lights_phong_pars_fragment: Zm, lights_physical_fragment: $m, lights_physical_pars_fragment: Jm, lights_fragment_begin: Km, lights_fragment_maps: Qm, lights_fragment_end: jm, logdepthbuf_fragment: eg, logdepthbuf_pars_fragment: tg, logdepthbuf_pars_vertex: ng, logdepthbuf_vertex: ig, map_fragment: sg, map_pars_fragment: rg, map_particle_fragment: og, map_particle_pars_fragment: ag, metalnessmap_fragment: lg, metalnessmap_pars_fragment: cg, morphinstance_vertex: hg, morphcolor_vertex: ug, morphnormal_vertex: dg, morphtarget_pars_vertex: fg, morphtarget_vertex: pg, normal_fragment_begin: mg, normal_fragment_maps: gg, normal_pars_fragment: _g, normal_pars_vertex: xg, normal_vertex: vg, normalmap_pars_fragment: yg, clearcoat_normal_fragment_begin: Mg, clearcoat_normal_fragment_maps: Sg, clearcoat_pars_fragment: bg, iridescence_pars_fragment: Eg, opaque_fragment: Tg, packing: wg, premultiplied_alpha_fragment: Ag, project_vertex: Rg, dithering_fragment: Cg, dithering_pars_fragment: Ig, roughnessmap_fragment: Pg, roughnessmap_pars_fragment: Dg, shadowmap_pars_fragment: Lg, shadowmap_pars_vertex: Ug, shadowmap_vertex: Ng, shadowmask_pars_fragment: Fg, skinbase_vertex: Og, skinning_pars_vertex: Bg, skinning_vertex: zg, skinnormal_vertex: kg, specularmap_fragment: Hg, specularmap_pars_fragment: Vg, tonemapping_fragment: Gg, tonemapping_pars_fragment: Wg, transmission_fragment: Xg, transmission_pars_fragment: qg, uv_pars_fragment: Yg, uv_pars_vertex: Zg, uv_vertex: $g, worldpos_vertex: Jg, background_vert: Kg, background_frag: Qg, backgroundCube_vert: jg, backgroundCube_frag: e0, cube_vert: t0, cube_frag: n0, depth_vert: i0, depth_frag: s0, distanceRGBA_vert: r0, distanceRGBA_frag: o0, equirect_vert: a0, equirect_frag: l0, linedashed_vert: c0, linedashed_frag: h0, meshbasic_vert: u0, meshbasic_frag: d0, meshlambert_vert: f0, meshlambert_frag: p0, meshmatcap_vert: m0, meshmatcap_frag: g0, meshnormal_vert: _0, meshnormal_frag: x0, meshphong_vert: v0, meshphong_frag: y0, meshphysical_vert: M0, meshphysical_frag: S0, meshtoon_vert: b0, meshtoon_frag: E0, points_vert: T0, points_frag: w0, shadow_vert: A0, shadow_frag: R0, sprite_vert: C0, sprite_frag: I0
  }, pe = {
    common: {
      diffuse: {
        value: new ke(16777215)
      }, opacity: {
        value: 1
      }, map: {
        value: null
      }, mapTransform: {
        value: new We
      }, alphaMap: {
        value: null
      }, alphaMapTransform: {
        value: new We
      }, alphaTest: {
        value: 0
      }
    }, specularmap: {
      specularMap: {
        value: null
      }, specularMapTransform: {
        value: new We
      }
    }, envmap: {
      envMap: {
        value: null
      }, envMapRotation: {
        value: new We
      }, flipEnvMap: {
        value: - 1
      }, reflectivity: {
        value: 1
      }, ior: {
        value: 1.5
      }, refractionRatio: {
        value: .98
      }
    }, aomap: {
      aoMap: {
        value: null
      }, aoMapIntensity: {
        value: 1
      }, aoMapTransform: {
        value: new We
      }
    }, lightmap: {
      lightMap: {
        value: null
      }, lightMapIntensity: {
        value: 1
      }, lightMapTransform: {
        value: new We
      }
    }, bumpmap: {
      bumpMap: {
        value: null
      }, bumpMapTransform: {
        value: new We
      }, bumpScale: {
        value: 1
      }
    }, normalmap: {
      normalMap: {
        value: null
      }, normalMapTransform: {
        value: new We
      }, normalScale: {
        value: new fe(1, 1)
      }
    }, displacementmap: {
      displacementMap: {
        value: null
      }, displacementMapTransform: {
        value: new We
      }, displacementScale: {
        value: 1
      }, displacementBias: {
        value: 0
      }
    }, emissivemap: {
      emissiveMap: {
        value: null
      }, emissiveMapTransform: {
        value: new We
      }
    }, metalnessmap: {
      metalnessMap: {
        value: null
      }, metalnessMapTransform: {
        value: new We
      }
    }, roughnessmap: {
      roughnessMap: {
        value: null
      }, roughnessMapTransform: {
        value: new We
      }
    }, gradientmap: {
      gradientMap: {
        value: null
      }
    }, fog: {
      fogDensity: {
        value: 25e-5
      }, fogNear: {
        value: 1
      }, fogFar: {
        value: 2e3
      }, fogColor: {
        value: new ke(16777215)
      }
    }, lights: {
      ambientLightColor: {
        value: []
      }, lightProbe: {
        value: []
      }, directionalLights: {
        value: [], properties: {
          direction: {
          }, color: {
          }
        }
      }, directionalLightShadows: {
        value: [], properties: {
          shadowIntensity: 1, shadowBias: {
          }, shadowNormalBias: {
          }, shadowRadius: {
          }, shadowMapSize: {
          }
        }
      }, directionalShadowMap: {
        value: []
      }, directionalShadowMatrix: {
        value: []
      }, spotLights: {
        value: [], properties: {
          color: {
          }, position: {
          }, direction: {
          }, distance: {
          }, coneCos: {
          }, penumbraCos: {
          }, decay: {
          }
        }
      }, spotLightShadows: {
        value: [], properties: {
          shadowIntensity: 1, shadowBias: {
          }, shadowNormalBias: {
          }, shadowRadius: {
          }, shadowMapSize: {
          }
        }
      }, spotLightMap: {
        value: []
      }, spotShadowMap: {
        value: []
      }, spotLightMatrix: {
        value: []
      }, pointLights: {
        value: [], properties: {
          color: {
          }, position: {
          }, decay: {
          }, distance: {
          }
        }
      }, pointLightShadows: {
        value: [], properties: {
          shadowIntensity: 1, shadowBias: {
          }, shadowNormalBias: {
          }, shadowRadius: {
          }, shadowMapSize: {
          }, shadowCameraNear: {
          }, shadowCameraFar: {
          }
        }
      }, pointShadowMap: {
        value: []
      }, pointShadowMatrix: {
        value: []
      }, hemisphereLights: {
        value: [], properties: {
          direction: {
          }, skyColor: {
          }, groundColor: {
          }
        }
      }, rectAreaLights: {
        value: [], properties: {
          color: {
          }, position: {
          }, width: {
          }, height: {
          }
        }
      }, ltc_1: {
        value: null
      }, ltc_2: {
        value: null
      }
    }, points: {
      diffuse: {
        value: new ke(16777215)
      }, opacity: {
        value: 1
      }, size: {
        value: 1
      }, scale: {
        value: 1
      }, map: {
        value: null
      }, alphaMap: {
        value: null
      }, alphaMapTransform: {
        value: new We
      }, alphaTest: {
        value: 0
      }, uvTransform: {
        value: new We
      }
    }, sprite: {
      diffuse: {
        value: new ke(16777215)
      }, opacity: {
        value: 1
      }, center: {
        value: new fe(.5, .5)
      }, rotation: {
        value: 0
      }, map: {
        value: null
      }, mapTransform: {
        value: new We
      }, alphaMap: {
        value: null
      }, alphaMapTransform: {
        value: new We
      }, alphaTest: {
        value: 0
      }
    }
  }, Ln = {
    basic: {
      uniforms: Ot([pe.common, pe.specularmap, pe.envmap, pe.aomap, pe.lightmap, pe.fog]), vertexShader: qe.meshbasic_vert, fragmentShader: qe.meshbasic_frag
    }, lambert: {
      uniforms: Ot([pe.common, pe.specularmap, pe.envmap, pe.aomap, pe.lightmap, pe.emissivemap, pe.bumpmap, pe.normalmap, pe.displacementmap, pe.fog, pe.lights, {
        emissive: {
          value: new ke(0)
        }
      }]), vertexShader: qe.meshlambert_vert, fragmentShader: qe.meshlambert_frag
    }, phong: {
      uniforms: Ot([pe.common, pe.specularmap, pe.envmap, pe.aomap, pe.lightmap, pe.emissivemap, pe.bumpmap, pe.normalmap, pe.displacementmap, pe.fog, pe.lights, {
        emissive: {
          value: new ke(0)
        }, specular: {
          value: new ke(1118481)
        }, shininess: {
          value: 30
        }
      }]), vertexShader: qe.meshphong_vert, fragmentShader: qe.meshphong_frag
    }, standard: {
      uniforms: Ot([pe.common, pe.envmap, pe.aomap, pe.lightmap, pe.emissivemap, pe.bumpmap, pe.normalmap, pe.displacementmap, pe.roughnessmap, pe.metalnessmap, pe.fog, pe.lights, {
        emissive: {
          value: new ke(0)
        }, roughness: {
          value: 1
        }, metalness: {
          value: 0
        }, envMapIntensity: {
          value: 1
        }
      }]), vertexShader: qe.meshphysical_vert, fragmentShader: qe.meshphysical_frag
    }, toon: {
      uniforms: Ot([pe.common, pe.aomap, pe.lightmap, pe.emissivemap, pe.bumpmap, pe.normalmap, pe.displacementmap, pe.gradientmap, pe.fog, pe.lights, {
        emissive: {
          value: new ke(0)
        }
      }]), vertexShader: qe.meshtoon_vert, fragmentShader: qe.meshtoon_frag
    }, matcap: {
      uniforms: Ot([pe.common, pe.bumpmap, pe.normalmap, pe.displacementmap, pe.fog, {
        matcap: {
          value: null
        }
      }]), vertexShader: qe.meshmatcap_vert, fragmentShader: qe.meshmatcap_frag
    }, points: {
      uniforms: Ot([pe.points, pe.fog]), vertexShader: qe.points_vert, fragmentShader: qe.points_frag
    }, dashed: {
      uniforms: Ot([pe.common, pe.fog, {
        scale: {
          value: 1
        }, dashSize: {
          value: 1
        }, totalSize: {
          value: 2
        }
      }]), vertexShader: qe.linedashed_vert, fragmentShader: qe.linedashed_frag
    }, depth: {
      uniforms: Ot([pe.common, pe.displacementmap]), vertexShader: qe.depth_vert, fragmentShader: qe.depth_frag
    }, normal: {
      uniforms: Ot([pe.common, pe.bumpmap, pe.normalmap, pe.displacementmap, {
        opacity: {
          value: 1
        }
      }]), vertexShader: qe.meshnormal_vert, fragmentShader: qe.meshnormal_frag
    }, sprite: {
      uniforms: Ot([pe.sprite, pe.fog]), vertexShader: qe.sprite_vert, fragmentShader: qe.sprite_frag
    }, background: {
      uniforms: {
        uvTransform: {
          value: new We
        }, t2D: {
          value: null
        }, backgroundIntensity: {
          value: 1
        }
      }, vertexShader: qe.background_vert, fragmentShader: qe.background_frag
    }, backgroundCube: {
      uniforms: {
        envMap: {
          value: null
        }, flipEnvMap: {
          value: - 1
        }, backgroundBlurriness: {
          value: 0
        }, backgroundIntensity: {
          value: 1
        }, backgroundRotation: {
          value: new We
        }
      }, vertexShader: qe.backgroundCube_vert, fragmentShader: qe.backgroundCube_frag
    }, cube: {
      uniforms: {
        tCube: {
          value: null
        }, tFlip: {
          value: - 1
        }, opacity: {
          value: 1
        }
      }, vertexShader: qe.cube_vert, fragmentShader: qe.cube_frag
    }, equirect: {
      uniforms: {
        tEquirect: {
          value: null
        }
      }, vertexShader: qe.equirect_vert, fragmentShader: qe.equirect_frag
    }, distanceRGBA: {
      uniforms: Ot([pe.common, pe.displacementmap, {
        referencePosition: {
          value: new I
        }, nearDistance: {
          value: 1
        }, farDistance: {
          value: 1e3
        }
      }]), vertexShader: qe.distanceRGBA_vert, fragmentShader: qe.distanceRGBA_frag
    }, shadow: {
      uniforms: Ot([pe.lights, pe.fog, {
        color: {
          value: new ke(0)
        }, opacity: {
          value: 1
        }
      }]), vertexShader: qe.shadow_vert, fragmentShader: qe.shadow_frag
    }
  };
  Ln.physical = {
    uniforms: Ot([Ln.standard.uniforms, {
      clearcoat: {
        value: 0
      }, clearcoatMap: {
        value: null
      }, clearcoatMapTransform: {
        value: new We
      }, clearcoatNormalMap: {
        value: null
      }, clearcoatNormalMapTransform: {
        value: new We
      }, clearcoatNormalScale: {
        value: new fe(1, 1)
      }, clearcoatRoughness: {
        value: 0
      }, clearcoatRoughnessMap: {
        value: null
      }, clearcoatRoughnessMapTransform: {
        value: new We
      }, dispersion: {
        value: 0
      }, iridescence: {
        value: 0
      }, iridescenceMap: {
        value: null
      }, iridescenceMapTransform: {
        value: new We
      }, iridescenceIOR: {
        value: 1.3
      }, iridescenceThicknessMinimum: {
        value: 100
      }, iridescenceThicknessMaximum: {
        value: 400
      }, iridescenceThicknessMap: {
        value: null
      }, iridescenceThicknessMapTransform: {
        value: new We
      }, sheen: {
        value: 0
      }, sheenColor: {
        value: new ke(0)
      }, sheenColorMap: {
        value: null
      }, sheenColorMapTransform: {
        value: new We
      }, sheenRoughness: {
        value: 1
      }, sheenRoughnessMap: {
        value: null
      }, sheenRoughnessMapTransform: {
        value: new We
      }, transmission: {
        value: 0
      }, transmissionMap: {
        value: null
      }, transmissionMapTransform: {
        value: new We
      }, transmissionSamplerSize: {
        value: new fe
      }, transmissionSamplerMap: {
        value: null
      }, thickness: {
        value: 0
      }, thicknessMap: {
        value: null
      }, thicknessMapTransform: {
        value: new We
      }, attenuationDistance: {
        value: 0
      }, attenuationColor: {
        value: new ke(0)
      }, specularColor: {
        value: new ke(1, 1, 1)
      }, specularColorMap: {
        value: null
      }, specularColorMapTransform: {
        value: new We
      }, specularIntensity: {
        value: 1
      }, specularIntensityMap: {
        value: null
      }, specularIntensityMapTransform: {
        value: new We
      }, anisotropyVector: {
        value: new fe
      }, anisotropyMap: {
        value: null
      }, anisotropyMapTransform: {
        value: new We
      }
    }]), vertexShader: qe.meshphysical_vert, fragmentShader: qe.meshphysical_frag
  };
  var el = {
    r: 0, b: 0, g: 0
  }, Bi = new vn, P0 = new nt;
  function D0(n, e, t, i, s, r, o) {
    let a = new ke(0), l = r === !0?0: 1, c, h, u = null, d = 0, f = null;
    function m(b) {
      let y = b.isScene === !0?b.background: null;
      return y && y.isTexture && (y = (b.backgroundBlurriness > 0?t: e).get(y)), y
    }
    function x(b) {
      let y = !1, R = m(b);
      R === null?p(a, l): R && R.isColor && (p(R, 1), y = !0);
      let w = n.xr.getEnvironmentBlendMode();
      w === "additive"?i.buffers.color.setClear(0, 0, 0, 1, o): w === "alpha-blend" && i.buffers.color.setClear(0, 0, 0, 0, o), (n.autoClear || y) && (i.buffers.depth.setTest(!0), i.buffers.depth.setMask(!0), i.buffers.color.setMask(!0), n.clear(n.autoClearColor, n.autoClearDepth, n.autoClearStencil))
    }
    function g(b, y) {
      let R = m(y);
      R && (R.isCubeTexture || R.mapping === Fr)?(h === void 0 && (h = new Et(new In(1, 1, 1), new yn({
        name: "BackgroundCubeMaterial", uniforms: Oi(Ln.backgroundCube.uniforms), vertexShader: Ln.backgroundCube.vertexShader, fragmentShader: Ln.backgroundCube.fragmentShader, side: Wt, depthTest: !1, depthWrite: !1, fog: !1, allowOverride: !1
      })), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(w, P, D) {
        this.matrixWorld.copyPosition(D.matrixWorld)
      }, Object.defineProperty(h.material, "envMap", {
        get: function() {
          return this.uniforms.envMap.value
        }
      }), s.update(h)), Bi.copy(y.backgroundRotation), Bi.x *= - 1, Bi.y *= - 1, Bi.z *= - 1, R.isCubeTexture && R.isRenderTargetTexture === !1 && (Bi.y *= - 1, Bi.z *= - 1), h.material.uniforms.envMap.value = R, h.material.uniforms.flipEnvMap.value = R.isCubeTexture && R.isRenderTargetTexture === !1? - 1: 1, h.material.uniforms.backgroundBlurriness.value = y.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(P0.makeRotationFromEuler(Bi)), h.material.toneMapped = et.getTransfer(R.colorSpace) !== at, (u !== R || d !== R.version || f !== n.toneMapping) && (h.material.needsUpdate = !0, u = R, d = R.version, f = n.toneMapping), h.layers.enableAll(), b.unshift(h, h.geometry, h.material, 0, 0, null)): R && R.isTexture && (c === void 0 && (c = new Et(new Cr(2, 2), new yn({
        name: "BackgroundMaterial", uniforms: Oi(Ln.background.uniforms), vertexShader: Ln.background.vertexShader, fragmentShader: Ln.background.fragmentShader, side: Wn, depthTest: !1, depthWrite: !1, fog: !1, allowOverride: !1
      })), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
        get: function() {
          return this.uniforms.t2D.value
        }
      }), s.update(c)), c.material.uniforms.t2D.value = R, c.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, c.material.toneMapped = et.getTransfer(R.colorSpace) !== at, R.matrixAutoUpdate === !0 && R.updateMatrix(), c.material.uniforms.uvTransform.value.copy(R.matrix), (u !== R || d !== R.version || f !== n.toneMapping) && (c.material.needsUpdate = !0, u = R, d = R.version, f = n.toneMapping), c.layers.enableAll(), b.unshift(c, c.geometry, c.material, 0, 0, null))
    }
    function p(b, y) {
      b.getRGB(el, Rc(n)), i.buffers.color.setClear(el.r, el.g, el.b, y, o)
    }
    function E() {
      h !== void 0 && (h.geometry.dispose(), h.material.dispose(), h = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0)
    }
    return {
      getClearColor: function() {
        return a
      }, setClearColor: function(b, y = 1) {
        a.set(b), l = y, p(a, l)
      }, getClearAlpha: function() {
        return l
      }, setClearAlpha: function(b) {
        l = b, p(a, l)
      }, render: x, addToRenderList: g, dispose: E
    }
  }
  function L0(n, e) {
    let t = n.getParameter(n.MAX_VERTEX_ATTRIBS), i = {
    }, s = d(null), r = s, o = !1;
    function a(v, C, F, z, G) {
      let q = !1, W = u(z, F, C);
      r !== W && (r = W, c(r.object)), q = f(v, z, F, G), q && m(v, z, F, G), G !== null && e.update(G, n.ELEMENT_ARRAY_BUFFER), (q || o) && (o = !1, y(v, C, F, z), G !== null && n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, e.get(G).buffer))
    }
    function l() {
      return n.createVertexArray()
    }
    function c(v) {
      return n.bindVertexArray(v)
    }
    function h(v) {
      return n.deleteVertexArray(v)
    }
    function u(v, C, F) {
      let z = F.wireframe === !0, G = i[v.id];
      G === void 0 && (G = {
      }, i[v.id] = G);
      let q = G[C.id];
      q === void 0 && (q = {
      }, G[C.id] = q);
      let W = q[z];
      return W === void 0 && (W = d(l()), q[z] = W), W
    }
    function d(v) {
      let C = [], F = [], z = [];
      for (let G = 0;
      G < t;
      G++)C[G] = 0, F[G] = 0, z[G] = 0;
      return {
        geometry: null, program: null, wireframe: !1, newAttributes: C, enabledAttributes: F, attributeDivisors: z, object: v, attributes: {
        }, index: null
      }
    }
    function f(v, C, F, z) {
      let G = r.attributes, q = C.attributes, W = 0, te = F.getAttributes();
      for (let V in te)if (te[V].location >= 0) {
        let ve = G[V], Se = q[V];
        if (Se === void 0 && (V === "instanceMatrix" && v.instanceMatrix && (Se = v.instanceMatrix), V === "instanceColor" && v.instanceColor && (Se = v.instanceColor)), ve === void 0 || ve.attribute !== Se || Se && ve.data !== Se.data)return!0;
        W++
      }
      return r.attributesNum !== W || r.index !== z
    }
    function m(v, C, F, z) {
      let G = {
      }, q = C.attributes, W = 0, te = F.getAttributes();
      for (let V in te)if (te[V].location >= 0) {
        let ve = q[V];
        ve === void 0 && (V === "instanceMatrix" && v.instanceMatrix && (ve = v.instanceMatrix), V === "instanceColor" && v.instanceColor && (ve = v.instanceColor));
        let Se = {
        };
        Se.attribute = ve, ve && ve.data && (Se.data = ve.data), G[V] = Se, W++
      }
      r.attributes = G, r.attributesNum = W, r.index = z
    }
    function x() {
      let v = r.newAttributes;
      for (let C = 0, F = v.length;
      C < F;
      C++)v[C] = 0
    }
    function g(v) {
      p(v, 0)
    }
    function p(v, C) {
      let F = r.newAttributes, z = r.enabledAttributes, G = r.attributeDivisors;
      F[v] = 1, z[v] === 0 && (n.enableVertexAttribArray(v), z[v] = 1), G[v] !== C && (n.vertexAttribDivisor(v, C), G[v] = C)
    }
    function E() {
      let v = r.newAttributes, C = r.enabledAttributes;
      for (let F = 0, z = C.length;
      F < z;
      F++)C[F] !== v[F] && (n.disableVertexAttribArray(F), C[F] = 0)
    }
    function b(v, C, F, z, G, q, W) {
      W === !0?n.vertexAttribIPointer(v, C, F, G, q): n.vertexAttribPointer(v, C, F, z, G, q)
    }
    function y(v, C, F, z) {
      x();
      let G = z.attributes, q = F.getAttributes(), W = C.defaultAttributeValues;
      for (let te in q) {
        let V = q[te];
        if (V.location >= 0) {
          let ue = G[te];
          if (ue === void 0 && (te === "instanceMatrix" && v.instanceMatrix && (ue = v.instanceMatrix), te === "instanceColor" && v.instanceColor && (ue = v.instanceColor)), ue !== void 0) {
            let ve = ue.normalized, Se = ue.itemSize, Ge = e.get(ue);
            if (Ge === void 0)continue;
            let Ke = Ge.buffer, rt = Ge.type, je = Ge.bytesPerElement, Y = rt === n.INT || rt === n.UNSIGNED_INT || ue.gpuType === xa;
            if (ue.isInterleavedBufferAttribute) {
              let ee = ue.data, Me = ee.stride, De = ue.offset;
              if (ee.isInstancedInterleavedBuffer) {
                for (let we = 0;
                we < V.locationSize;
                we++)p(V.location + we, ee.meshPerAttribute);
                v.isInstancedMesh !== !0 && z._maxInstanceCount === void 0 && (z._maxInstanceCount = ee.meshPerAttribute * ee.count)
              } else for (let we = 0;
              we < V.locationSize;
              we++)g(V.location + we);
              n.bindBuffer(n.ARRAY_BUFFER, Ke);
              for (let we = 0;
              we < V.locationSize;
              we++)b(V.location + we, Se / V.locationSize, rt, ve, Me * je, (De + Se / V.locationSize * we) * je, Y)
            } else {
              if (ue.isInstancedBufferAttribute) {
                for (let ee = 0;
                ee < V.locationSize;
                ee++)p(V.location + ee, ue.meshPerAttribute);
                v.isInstancedMesh !== !0 && z._maxInstanceCount === void 0 && (z._maxInstanceCount = ue.meshPerAttribute * ue.count)
              } else for (let ee = 0;
              ee < V.locationSize;
              ee++)g(V.location + ee);
              n.bindBuffer(n.ARRAY_BUFFER, Ke);
              for (let ee = 0;
              ee < V.locationSize;
              ee++)b(V.location + ee, Se / V.locationSize, rt, ve, Se * je, Se / V.locationSize * ee * je, Y)
            }
          } else if (W !== void 0) {
            let ve = W[te];
            if (ve !== void 0)switch (ve.length) {
              case 2: n.vertexAttrib2fv(V.location, ve);
              break;
              case 3: n.vertexAttrib3fv(V.location, ve);
              break;
              case 4: n.vertexAttrib4fv(V.location, ve);
              break;
              default: n.vertexAttrib1fv(V.location, ve)
            }
          }
        }
      }
      E()
    }
    function R() {
      D();
      for (let v in i) {
        let C = i[v];
        for (let F in C) {
          let z = C[F];
          for (let G in z)h(z[G].object), delete z[G];
          delete C[F]
        }
        delete i[v]
      }
    }
    function w(v) {
      if (i[v.id] === void 0)return;
      let C = i[v.id];
      for (let F in C) {
        let z = C[F];
        for (let G in z)h(z[G].object), delete z[G];
        delete C[F]
      }
      delete i[v.id]
    }
    function P(v) {
      for (let C in i) {
        let F = i[C];
        if (F[v.id] === void 0)continue;
        let z = F[v.id];
        for (let G in z)h(z[G].object), delete z[G];
        delete F[v.id]
      }
    }
    function D() {
      M(), o = !0, r !== s && (r = s, c(r.object))
    }
    function M() {
      s.geometry = null, s.program = null, s.wireframe = !1
    }
    return {
      setup: a, reset: D, resetDefaultState: M, dispose: R, releaseStatesOfGeometry: w, releaseStatesOfProgram: P, initAttributes: x, enableAttribute: g, disableUnusedAttributes: E
    }
  }
  function U0(n, e, t) {
    let i;
    function s(c) {
      i = c
    }
    function r(c, h) {
      n.drawArrays(i, c, h), t.update(h, i, 1)
    }
    function o(c, h, u) {
      u !== 0 && (n.drawArraysInstanced(i, c, h, u), t.update(h, i, u))
    }
    function a(c, h, u) {
      if (u === 0)return;
      e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, c, 0, h, 0, u);
      let f = 0;
      for (let m = 0;
      m < u;
      m++)f += h[m];
      t.update(f, i, 1)
    }
    function l(c, h, u, d) {
      if (u === 0)return;
      let f = e.get("WEBGL_multi_draw");
      if (f === null)for (let m = 0;
      m < c.length;
      m++)o(c[m], h[m], d[m]);
      else {
        f.multiDrawArraysInstancedWEBGL(i, c, 0, h, 0, d, 0, u);
        let m = 0;
        for (let x = 0;
        x < u;
        x++)m += h[x] * d[x];
        t.update(m, i, 1)
      }
    }
    this.setMode = s, this.render = r, this.renderInstances = o, this.renderMultiDraw = a, this.renderMultiDrawInstances = l
  }
  function N0(n, e, t, i) {
    let s;
    function r() {
      if (s !== void 0)return s;
      if (e.has("EXT_texture_filter_anisotropic") === !0) {
        let P = e.get("EXT_texture_filter_anisotropic");
        s = n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
      } else s = 0;
      return s
    }
    function o(P) {
      return!(P !== hn && i.convert(P) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))
    }
    function a(P) {
      let D = P === ws && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
      return!(P !== Mn && i.convert(P) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE) && P !== Sn && !D)
    }
    function l(P) {
      if (P === "highp") {
        if (n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.HIGH_FLOAT).precision > 0 && n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.HIGH_FLOAT).precision > 0)return "highp";
        P = "mediump"
      }
      return P === "mediump" && n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.MEDIUM_FLOAT).precision > 0 && n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.MEDIUM_FLOAT).precision > 0?"mediump": "lowp"
    }
    let c = t.precision !== void 0?t.precision: "highp", h = l(c);
    h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
    let u = t.logarithmicDepthBuffer === !0, d = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control"), f = n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS), m = n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS), x = n.getParameter(n.MAX_TEXTURE_SIZE), g = n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE), p = n.getParameter(n.MAX_VERTEX_ATTRIBS), E = n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS), b = n.getParameter(n.MAX_VARYING_VECTORS), y = n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS), R = m > 0, w = n.getParameter(n.MAX_SAMPLES);
    return {
      isWebGL2: !0, getMaxAnisotropy: r, getMaxPrecision: l, textureFormatReadable: o, textureTypeReadable: a, precision: c, logarithmicDepthBuffer: u, reversedDepthBuffer: d, maxTextures: f, maxVertexTextures: m, maxTextureSize: x, maxCubemapSize: g, maxAttributes: p, maxVertexUniforms: E, maxVaryings: b, maxFragmentUniforms: y, vertexTextures: R, maxSamples: w
    }
  }
  function F0(n) {
    let e = this, t = null, i = 0, s = !1, r = !1, o = new Tn, a = new We, l = {
      value: null, needsUpdate: !1
    };
    this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, d) {
      let f = u.length !== 0 || d || i !== 0 || s;
      return s = d, i = u.length, f
    }, this.beginShadows = function() {
      r = !0, h(null)
    }, this.endShadows = function() {
      r = !1
    }, this.setGlobalState = function(u, d) {
      t = h(u, d, 0)
    }, this.setState = function(u, d, f) {
      let m = u.clippingPlanes, x = u.clipIntersection, g = u.clipShadows, p = n.get(u);
      if (!s || m === null || m.length === 0 || r && !g)r?h(null): c();
      else {
        let E = r?0: i, b = E * 4, y = p.clippingState || null;
        l.value = y, y = h(m, d, b, f);
        for (let R = 0;
        R !== b;
        ++R)y[R] = t[R];
        p.clippingState = y, this.numIntersection = x?this.numPlanes: 0, this.numPlanes += E
      }
    };
    function c() {
      l.value !== t && (l.value = t, l.needsUpdate = i > 0), e.numPlanes = i, e.numIntersection = 0
    }
    function h(u, d, f, m) {
      let x = u !== null?u.length: 0, g = null;
      if (x !== 0) {
        if (g = l.value, m !== !0 || g === null) {
          let p = f + x * 4, E = d.matrixWorldInverse;
          a.getNormalMatrix(E), (g === null || g.length < p) && (g = new Float32Array(p));
          for (let b = 0, y = f;
          b !== x;
          ++b, y += 4)o.copy(u[b]).applyMatrix4(E, a), o.normal.toArray(g, y), g[y + 3] = o.constant
        }
        l.value = g, l.needsUpdate = !0
      }
      return e.numPlanes = x, e.numIntersection = 0, g
    }
  }
  function O0(n) {
    let e = new WeakMap;
    function t(o, a) {
      return a === ma?o.mapping = Ui: a === ga && (o.mapping = Ni), o
    }
    function i(o) {
      if (o && o.isTexture) {
        let a = o.mapping;
        if (a === ma || a === ga)if (e.has(o)) {
          let l = e.get(o).texture;
          return t(l, o.mapping)
        } else {
          let l = o.image;
          if (l && l.height > 0) {
            let c = new Oo(l.height);
            return c.fromEquirectangularTexture(n, o), e.set(o, c), o.addEventListener("dispose", s), t(c.texture, o.mapping)
          } else return null
        }
      }
      return o
    }
    function s(o) {
      let a = o.target;
      a.removeEventListener("dispose", s);
      let l = e.get(a);
      l !== void 0 && (e.delete(a), l.dispose())
    }
    function r() {
      e = new WeakMap
    }
    return {
      get: i, dispose: r
    }
  }
  var Is = 4, Ju = [.125, .215, .35, .446, .526, .582], Hi = 20, Lc = new Dr, Ku = new ke, Uc = null, Nc = 0, Fc = 0, Oc = !1, ki = (1 + Math.sqrt(5)) / 2, Cs = 1 / ki, Qu = [new I( - ki, Cs, 0), new I(ki, Cs, 0), new I( - Cs, 0, ki), new I(Cs, 0, ki), new I(0, ki, - Cs), new I(0, ki, Cs), new I( - 1, 1, - 1), new I(1, 1, - 1), new I( - 1, 1, 1), new I(1, 1, 1)], B0 = new I, il = class {
    constructor(e) {
      this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial)
    }
    fromScene(e, t = 0, i = .1, s = 100, r = {
    }) {
      let {
        size: o = 256, position: a = B0
      } = r;
      Uc = this._renderer.getRenderTarget(), Nc = this._renderer.getActiveCubeFace(), Fc = this._renderer.getActiveMipmapLevel(), Oc = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(o);
      let l = this._allocateTargets();
      return l.depthBuffer = !0, this._sceneToCubeUV(e, i, s, l, a), t > 0 && this._blur(l, 0, 0, t), this._applyPMREM(l), this._cleanup(l), l
    }
    fromEquirectangular(e, t = null) {
      return this._fromTexture(e, t)
    }
    fromCubemap(e, t = null) {
      return this._fromTexture(e, t)
    }
    compileCubemapShader() {
      this._cubemapMaterial === null && (this._cubemapMaterial = td(), this._compileMaterial(this._cubemapMaterial))
    }
    compileEquirectangularShader() {
      this._equirectMaterial === null && (this._equirectMaterial = ed(), this._compileMaterial(this._equirectMaterial))
    }
    dispose() {
      this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose()
    }
    _setSize(e) {
      this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax)
    }
    _dispose() {
      this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
      for (let e = 0;
      e < this._lodPlanes.length;
      e++)this._lodPlanes[e].dispose()
    }
    _cleanup(e) {
      this._renderer.setRenderTarget(Uc, Nc, Fc), this._renderer.xr.enabled = Oc, e.scissorTest = !1, tl(e, 0, 0, e.width, e.height)
    }
    _fromTexture(e, t) {
      e.mapping === Ui || e.mapping === Ni?this._setSize(e.image.length === 0?16: e.image[0].width || e.image[0].image.width): this._setSize(e.image.width / 4), Uc = this._renderer.getRenderTarget(), Nc = this._renderer.getActiveCubeFace(), Fc = this._renderer.getActiveMipmapLevel(), Oc = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
      let i = t || this._allocateTargets();
      return this._textureToCubeUV(e, i), this._applyPMREM(i), this._cleanup(i), i
    }
    _allocateTargets() {
      let e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, i = {
        magFilter: xn, minFilter: xn, generateMipmaps: !1, type: ws, format: hn, colorSpace: Ii, depthBuffer: !1
      }, s = ju(e, t, i);
      if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
        this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = ju(e, t, i);
        let {
          _lodMax: r
        } = this;
        ({
          sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas
        } = z0(r)), this._blurMaterial = k0(r, e, t)
      }
      return s
    }
    _compileMaterial(e) {
      let t = new Et(this._lodPlanes[0], e);
      this._renderer.compile(t, Lc)
    }
    _sceneToCubeUV(e, t, i, s, r) {
      let l = new Rt(90, 1, t, i), c = [1, - 1, 1, 1, 1, 1], h = [1, 1, 1, - 1, - 1, - 1], u = this._renderer, d = u.autoClear, f = u.toneMapping;
      u.getClearColor(Ku), u.toneMapping = Zn, u.autoClear = !1, u.state.buffers.depth.getReversed() && (u.setRenderTarget(s), u.clearDepth(), u.setRenderTarget(null));
      let x = new ar({
        name: "PMREM.Background", side: Wt, depthWrite: !1, depthTest: !1
      }), g = new Et(new In, x), p = !1, E = e.background;
      E?E.isColor && (x.color.copy(E), e.background = null, p = !0): (x.color.copy(Ku), p = !0);
      for (let b = 0;
      b < 6;
      b++) {
        let y = b % 3;
        y === 0?(l.up.set(0, c[b], 0), l.position.set(r.x, r.y, r.z), l.lookAt(r.x + h[b], r.y, r.z)): y === 1?(l.up.set(0, 0, c[b]), l.position.set(r.x, r.y, r.z), l.lookAt(r.x, r.y + h[b], r.z)): (l.up.set(0, c[b], 0), l.position.set(r.x, r.y, r.z), l.lookAt(r.x, r.y, r.z + h[b]));
        let R = this._cubeSize;
        tl(s, y * R, b > 2?R: 0, R, R), u.setRenderTarget(s), p && u.render(g, l), u.render(e, l)
      }
      g.geometry.dispose(), g.material.dispose(), u.toneMapping = f, u.autoClear = d, e.background = E
    }
    _textureToCubeUV(e, t) {
      let i = this._renderer, s = e.mapping === Ui || e.mapping === Ni;
      s?(this._cubemapMaterial === null && (this._cubemapMaterial = td()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1? - 1: 1): this._equirectMaterial === null && (this._equirectMaterial = ed());
      let r = s?this._cubemapMaterial: this._equirectMaterial, o = new Et(this._lodPlanes[0], r), a = r.uniforms;
      a.envMap.value = e;
      let l = this._cubeSize;
      tl(t, 0, 0, 3 * l, 2 * l), i.setRenderTarget(t), i.render(o, Lc)
    }
    _applyPMREM(e) {
      let t = this._renderer, i = t.autoClear;
      t.autoClear = !1;
      let s = this._lodPlanes.length;
      for (let r = 1;
      r < s;
      r++) {
        let o = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), a = Qu[(s - r - 1) % Qu.length];
        this._blur(e, r - 1, r, o, a)
      }
      t.autoClear = i
    }
    _blur(e, t, i, s, r) {
      let o = this._pingPongRenderTarget;
      this._halfBlur(e, o, t, i, s, "latitudinal", r), this._halfBlur(o, e, i, i, s, "longitudinal", r)
    }
    _halfBlur(e, t, i, s, r, o, a) {
      let l = this._renderer, c = this._blurMaterial;
      o !== "latitudinal" && o !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
      let h = 3, u = new Et(this._lodPlanes[s], c), d = c.uniforms, f = this._sizeLods[i] - 1, m = isFinite(r)?Math.PI / (2 * f): 2 * Math.PI / (2 * Hi - 1), x = r / m, g = isFinite(r)?1 + Math.floor(h * x): Hi;
      g > Hi && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Hi}`);
      let p = [], E = 0;
      for (let P = 0;
      P < Hi;
      ++P) {
        let D = P / x, M = Math.exp( - D * D / 2);
        p.push(M), P === 0?E += M: P < g && (E += 2 * M)
      }
      for (let P = 0;
      P < p.length;
      P++)p[P] = p[P] / E;
      d.envMap.value = e.texture, d.samples.value = g, d.weights.value = p, d.latitudinal.value = o === "latitudinal", a && (d.poleAxis.value = a);
      let {
        _lodMax: b
      } = this;
      d.dTheta.value = m, d.mipInt.value = b - i;
      let y = this._sizeLods[s], R = 3 * y * (s > b - Is?s - b + Is: 0), w = 4 * (this._cubeSize - y);
      tl(t, R, w, 3 * y, 2 * y), l.setRenderTarget(t), l.render(u, Lc)
    }
  };
  function z0(n) {
    let e = [], t = [], i = [], s = n, r = n - Is + 1 + Ju.length;
    for (let o = 0;
    o < r;
    o++) {
      let a = Math.pow(2, s);
      t.push(a);
      let l = 1 / a;
      o > n - Is?l = Ju[o - n + Is - 1]: o === 0 && (l = 0), i.push(l);
      let c = 1 / (a - 2), h = - c, u = 1 + c, d = [h, h, u, h, u, u, h, h, u, u, h, u], f = 6, m = 6, x = 3, g = 2, p = 1, E = new Float32Array(x * m * f), b = new Float32Array(g * m * f), y = new Float32Array(p * m * f);
      for (let w = 0;
      w < f;
      w++) {
        let P = w % 3 * 2 / 3 - 1, D = w > 2?0: - 1, M = [P, D, 0, P + 2 / 3, D, 0, P + 2 / 3, D + 1, 0, P, D, 0, P + 2 / 3, D + 1, 0, P, D + 1, 0];
        E.set(M, x * m * w), b.set(d, g * m * w);
        let v = [w, w, w, w, w, w];
        y.set(v, p * m * w)
      }
      let R = new mt;
      R.setAttribute("position", new Ct(E, x)), R.setAttribute("uv", new Ct(b, g)), R.setAttribute("faceIndex", new Ct(y, p)), e.push(R), s > Is && s--
    }
    return {
      lodPlanes: e, sizeLods: t, sigmas: i
    }
  }
  function ju(n, e, t) {
    let i = new wn(n, e, t);
    return i.texture.mapping = Fr, i.texture.name = "PMREM.cubeUv", i.scissorTest = !0, i
  }
  function tl(n, e, t, i, s) {
    n.viewport.set(e, t, i, s), n.scissor.set(e, t, i, s)
  }
  function k0(n, e, t) {
    let i = new Float32Array(Hi), s = new I(0, 1, 0);
    return new yn({
      name: "SphericalGaussianBlur", defines: {
        n: Hi, CUBEUV_TEXEL_WIDTH: 1 / e, CUBEUV_TEXEL_HEIGHT: 1 / t, CUBEUV_MAX_MIP: `${n}.0`
      }, uniforms: {
        envMap: {
          value: null
        }, samples: {
          value: 1
        }, weights: {
          value: i
        }, latitudinal: {
          value: !1
        }, dTheta: {
          value: 0
        }, mipInt: {
          value: 0
        }, poleAxis: {
          value: s
        }
      }, vertexShader: Yc(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`, blending: Yn, depthTest: !1, depthWrite: !1
    })
  }
  function ed() {
    return new yn({
      name: "EquirectangularToCubeUV", uniforms: {
        envMap: {
          value: null
        }
      }, vertexShader: Yc(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`, blending: Yn, depthTest: !1, depthWrite: !1
    })
  }
  function td() {
    return new yn({
      name: "CubemapToCubeUV", uniforms: {
        envMap: {
          value: null
        }, flipEnvMap: {
          value: - 1
        }
      }, vertexShader: Yc(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`, blending: Yn, depthTest: !1, depthWrite: !1
    })
  }
  function Yc() {
    return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  }
  function H0(n) {
    let e = new WeakMap, t = null;
    function i(a) {
      if (a && a.isTexture) {
        let l = a.mapping, c = l === ma || l === ga, h = l === Ui || l === Ni;
        if (c || h) {
          let u = e.get(a), d = u !== void 0?u.texture.pmremVersion: 0;
          if (a.isRenderTargetTexture && a.pmremVersion !== d)return t === null && (t = new il(n)), u = c?t.fromEquirectangular(a, u): t.fromCubemap(a, u), u.texture.pmremVersion = a.pmremVersion, e.set(a, u), u.texture;
          if (u !== void 0)return u.texture;
          {
            let f = a.image;
            return c && f && f.height > 0 || h && f && s(f)?(t === null && (t = new il(n)), u = c?t.fromEquirectangular(a): t.fromCubemap(a), u.texture.pmremVersion = a.pmremVersion, e.set(a, u), a.addEventListener("dispose", r), u.texture): null
          }
        }
      }
      return a
    }
    function s(a) {
      let l = 0, c = 6;
      for (let h = 0;
      h < c;
      h++)a[h] !== void 0 && l++;
      return l === c
    }
    function r(a) {
      let l = a.target;
      l.removeEventListener("dispose", r);
      let c = e.get(l);
      c !== void 0 && (e.delete(l), c.dispose())
    }
    function o() {
      e = new WeakMap, t !== null && (t.dispose(), t = null)
    }
    return {
      get: i, dispose: o
    }
  }
  function V0(n) {
    let e = {
    };
    function t(i) {
      if (e[i] !== void 0)return e[i];
      let s;
      switch (i) {
        case "WEBGL_depth_texture": s = n.getExtension("WEBGL_depth_texture") || n.getExtension("MOZ_WEBGL_depth_texture") || n.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
        case "EXT_texture_filter_anisotropic": s = n.getExtension("EXT_texture_filter_anisotropic") || n.getExtension("MOZ_EXT_texture_filter_anisotropic") || n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
        case "WEBGL_compressed_texture_s3tc": s = n.getExtension("WEBGL_compressed_texture_s3tc") || n.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
        case "WEBGL_compressed_texture_pvrtc": s = n.getExtension("WEBGL_compressed_texture_pvrtc") || n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
        default: s = n.getExtension(i)
      }
      return e[i] = s, s
    }
    return {
      has: function(i) {
        return t(i) !== null
      }, init: function() {
        t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent")
      }, get: function(i) {
        let s = t(i);
        return s === null && cs("THREE.WebGLRenderer: " + i + " extension not supported."), s
      }
    }
  }
  function G0(n, e, t, i) {
    let s = {
    }, r = new WeakMap;
    function o(u) {
      let d = u.target;
      d.index !== null && e.remove(d.index);
      for (let m in d.attributes)e.remove(d.attributes[m]);
      d.removeEventListener("dispose", o), delete s[d.id];
      let f = r.get(d);
      f && (e.remove(f), r.delete(d)), i.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, t.memory.geometries--
    }
    function a(u, d) {
      return s[d.id] === !0 || (d.addEventListener("dispose", o), s[d.id] = !0, t.memory.geometries++), d
    }
    function l(u) {
      let d = u.attributes;
      for (let f in d)e.update(d[f], n.ARRAY_BUFFER)
    }
    function c(u) {
      let d = [], f = u.index, m = u.attributes.position, x = 0;
      if (f !== null) {
        let E = f.array;
        x = f.version;
        for (let b = 0, y = E.length;
        b < y;
        b += 3) {
          let R = E[b + 0], w = E[b + 1], P = E[b + 2];
          d.push(R, w, w, P, P, R)
        }
      } else if (m !== void 0) {
        let E = m.array;
        x = m.version;
        for (let b = 0, y = E.length / 3 - 1;
        b < y;
        b += 3) {
          let R = b + 0, w = b + 1, P = b + 2;
          d.push(R, w, w, P, P, R)
        }
      } else return;
      let g = new(Ac(d)?cr: lr)(d, 1);
      g.version = x;
      let p = r.get(u);
      p && e.remove(p), r.set(u, g)
    }
    function h(u) {
      let d = r.get(u);
      if (d) {
        let f = u.index;
        f !== null && d.version < f.version && c(u)
      } else c(u);
      return r.get(u)
    }
    return {
      get: a, update: l, getWireframeAttribute: h
    }
  }
  function W0(n, e, t) {
    let i;
    function s(d) {
      i = d
    }
    let r, o;
    function a(d) {
      r = d.type, o = d.bytesPerElement
    }
    function l(d, f) {
      n.drawElements(i, f, r, d * o), t.update(f, i, 1)
    }
    function c(d, f, m) {
      m !== 0 && (n.drawElementsInstanced(i, f, r, d * o, m), t.update(f, i, m))
    }
    function h(d, f, m) {
      if (m === 0)return;
      e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, f, 0, r, d, 0, m);
      let g = 0;
      for (let p = 0;
      p < m;
      p++)g += f[p];
      t.update(g, i, 1)
    }
    function u(d, f, m, x) {
      if (m === 0)return;
      let g = e.get("WEBGL_multi_draw");
      if (g === null)for (let p = 0;
      p < d.length;
      p++)c(d[p] / o, f[p], x[p]);
      else {
        g.multiDrawElementsInstancedWEBGL(i, f, 0, r, d, 0, x, 0, m);
        let p = 0;
        for (let E = 0;
        E < m;
        E++)p += f[E] * x[E];
        t.update(p, i, 1)
      }
    }
    this.setMode = s, this.setIndex = a, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = u
  }
  function X0(n) {
    let e = {
      geometries: 0, textures: 0
    }, t = {
      frame: 0, calls: 0, triangles: 0, points: 0, lines: 0
    };
    function i(r, o, a) {
      switch (t.calls++, o) {
        case n.TRIANGLES: t.triangles += a * (r / 3);
        break;
        case n.LINES: t.lines += a * (r / 2);
        break;
        case n.LINE_STRIP: t.lines += a * (r - 1);
        break;
        case n.LINE_LOOP: t.lines += a * r;
        break;
        case n.POINTS: t.points += a * r;
        break;
        default: console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break
      }
    }
    function s() {
      t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0
    }
    return {
      memory: e, render: t, programs: null, autoReset: !0, reset: s, update: i
    }
  }
  function q0(n, e, t) {
    let i = new WeakMap, s = new ot;
    function r(o, a, l) {
      let c = o.morphTargetInfluences, h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, u = h !== void 0?h.length: 0, d = i.get(a);
      if (d === void 0 || d.count !== u) {
        let M = function() {
          P.dispose(), i.delete(a), a.removeEventListener("dispose", M)
        };
        d !== void 0 && d.texture.dispose();
        let f = a.morphAttributes.position !== void 0, m = a.morphAttributes.normal !== void 0, x = a.morphAttributes.color !== void 0, g = a.morphAttributes.position || [], p = a.morphAttributes.normal || [], E = a.morphAttributes.color || [], b = 0;
        f === !0 && (b = 1), m === !0 && (b = 2), x === !0 && (b = 3);
        let y = a.attributes.position.count * b, R = 1;
        y > e.maxTextureSize && (R = Math.ceil(y / e.maxTextureSize), y = e.maxTextureSize);
        let w = new Float32Array(y * R * 4 * u), P = new rr(w, y, R, u);
        P.type = Sn, P.needsUpdate = !0;
        let D = b * 4;
        for (let v = 0;
        v < u;
        v++) {
          let C = g[v], F = p[v], z = E[v], G = y * R * 4 * v;
          for (let q = 0;
          q < C.count;
          q++) {
            let W = q * D;
            f === !0 && (s.fromBufferAttribute(C, q), w[G + W + 0] = s.x, w[G + W + 1] = s.y, w[G + W + 2] = s.z, w[G + W + 3] = 0), m === !0 && (s.fromBufferAttribute(F, q), w[G + W + 4] = s.x, w[G + W + 5] = s.y, w[G + W + 6] = s.z, w[G + W + 7] = 0), x === !0 && (s.fromBufferAttribute(z, q), w[G + W + 8] = s.x, w[G + W + 9] = s.y, w[G + W + 10] = s.z, w[G + W + 11] = z.itemSize === 4?s.w: 1)
          }
        }
        d = {
          count: u, texture: P, size: new fe(y, R)
        }, i.set(a, d), a.addEventListener("dispose", M)
      }
      if (o.isInstancedMesh === !0 && o.morphTexture !== null)l.getUniforms().setValue(n, "morphTexture", o.morphTexture, t);
      else {
        let f = 0;
        for (let x = 0;
        x < c.length;
        x++)f += c[x];
        let m = a.morphTargetsRelative?1: 1 - f;
        l.getUniforms().setValue(n, "morphTargetBaseInfluence", m), l.getUniforms().setValue(n, "morphTargetInfluences", c)
      }
      l.getUniforms().setValue(n, "morphTargetsTexture", d.texture, t), l.getUniforms().setValue(n, "morphTargetsTextureSize", d.size)
    }
    return {
      update: r
    }
  }
  function Y0(n, e, t, i) {
    let s = new WeakMap;
    function r(l) {
      let c = i.render.frame, h = l.geometry, u = e.get(l, h);
      if (s.get(u) !== c && (e.update(u), s.set(u, c)), l.isInstancedMesh && (l.hasEventListener("dispose", a) === !1 && l.addEventListener("dispose", a), s.get(l) !== c && (t.update(l.instanceMatrix, n.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, n.ARRAY_BUFFER), s.set(l, c))), l.isSkinnedMesh) {
        let d = l.skeleton;
        s.get(d) !== c && (d.update(), s.set(d, c))
      }
      return u
    }
    function o() {
      s = new WeakMap
    }
    function a(l) {
      let c = l.target;
      c.removeEventListener("dispose", a), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor)
    }
    return {
      update: r, dispose: o
    }
  }
  var yd = new $t, nd = new mr(1, 1), Md = new rr, Sd = new No, bd = new ur, id = [], sd = [], rd = new Float32Array(16), od = new Float32Array(9), ad = new Float32Array(4);
  function Ds(n, e, t) {
    let i = n[0];
    if (i <= 0 || i > 0)return n;
    let s = e * t, r = id[s];
    if (r === void 0 && (r = new Float32Array(s), id[s] = r), e !== 0) {
      i.toArray(r, 0);
      for (let o = 1, a = 0;
      o !== e;
      ++o)a += t, n[o].toArray(r, a)
    }
    return r
  }
  function Tt(n, e) {
    if (n.length !== e.length)return!1;
    for (let t = 0, i = n.length;
    t < i;
    t++)if (n[t] !== e[t])return!1;
    return!0
  }
  function wt(n, e) {
    for (let t = 0, i = e.length;
    t < i;
    t++)n[t] = e[t]
  }
  function sl(n, e) {
    let t = sd[e];
    t === void 0 && (t = new Int32Array(e), sd[e] = t);
    for (let i = 0;
    i !== e;
    ++i)t[i] = n.allocateTextureUnit();
    return t
  }
  function Z0(n, e) {
    let t = this.cache;
    t[0] !== e && (n.uniform1f(this.addr, e), t[0] = e)
  }
  function $0(n, e) {
    let t = this.cache;
    if (e.x !== void 0)(t[0] !== e.x || t[1] !== e.y) && (n.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
    else {
      if (Tt(t, e))return;
      n.uniform2fv(this.addr, e), wt(t, e)
    }
  }
  function J0(n, e) {
    let t = this.cache;
    if (e.x !== void 0)(t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (n.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
    else if (e.r !== void 0)(t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (n.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
    else {
      if (Tt(t, e))return;
      n.uniform3fv(this.addr, e), wt(t, e)
    }
  }
  function K0(n, e) {
    let t = this.cache;
    if (e.x !== void 0)(t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (n.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
    else {
      if (Tt(t, e))return;
      n.uniform4fv(this.addr, e), wt(t, e)
    }
  }
  function Q0(n, e) {
    let t = this.cache, i = e.elements;
    if (i === void 0) {
      if (Tt(t, e))return;
      n.uniformMatrix2fv(this.addr, !1, e), wt(t, e)
    } else {
      if (Tt(t, i))return;
      ad.set(i), n.uniformMatrix2fv(this.addr, !1, ad), wt(t, i)
    }
  }
  function j0(n, e) {
    let t = this.cache, i = e.elements;
    if (i === void 0) {
      if (Tt(t, e))return;
      n.uniformMatrix3fv(this.addr, !1, e), wt(t, e)
    } else {
      if (Tt(t, i))return;
      od.set(i), n.uniformMatrix3fv(this.addr, !1, od), wt(t, i)
    }
  }
  function e_(n, e) {
    let t = this.cache, i = e.elements;
    if (i === void 0) {
      if (Tt(t, e))return;
      n.uniformMatrix4fv(this.addr, !1, e), wt(t, e)
    } else {
      if (Tt(t, i))return;
      rd.set(i), n.uniformMatrix4fv(this.addr, !1, rd), wt(t, i)
    }
  }
  function t_(n, e) {
    let t = this.cache;
    t[0] !== e && (n.uniform1i(this.addr, e), t[0] = e)
  }
  function n_(n, e) {
    let t = this.cache;
    if (e.x !== void 0)(t[0] !== e.x || t[1] !== e.y) && (n.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
    else {
      if (Tt(t, e))return;
      n.uniform2iv(this.addr, e), wt(t, e)
    }
  }
  function i_(n, e) {
    let t = this.cache;
    if (e.x !== void 0)(t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (n.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
    else {
      if (Tt(t, e))return;
      n.uniform3iv(this.addr, e), wt(t, e)
    }
  }
  function s_(n, e) {
    let t = this.cache;
    if (e.x !== void 0)(t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (n.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
    else {
      if (Tt(t, e))return;
      n.uniform4iv(this.addr, e), wt(t, e)
    }
  }
  function r_(n, e) {
    let t = this.cache;
    t[0] !== e && (n.uniform1ui(this.addr, e), t[0] = e)
  }
  function o_(n, e) {
    let t = this.cache;
    if (e.x !== void 0)(t[0] !== e.x || t[1] !== e.y) && (n.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
    else {
      if (Tt(t, e))return;
      n.uniform2uiv(this.addr, e), wt(t, e)
    }
  }
  function a_(n, e) {
    let t = this.cache;
    if (e.x !== void 0)(t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (n.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
    else {
      if (Tt(t, e))return;
      n.uniform3uiv(this.addr, e), wt(t, e)
    }
  }
  function l_(n, e) {
    let t = this.cache;
    if (e.x !== void 0)(t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (n.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
    else {
      if (Tt(t, e))return;
      n.uniform4uiv(this.addr, e), wt(t, e)
    }
  }
  function c_(n, e, t) {
    let i = this.cache, s = t.allocateTextureUnit();
    i[0] !== s && (n.uniform1i(this.addr, s), i[0] = s);
    let r;
    this.type === n.SAMPLER_2D_SHADOW?(nd.compareFunction = Ec, r = nd): r = yd, t.setTexture2D(e || r, s)
  }
  function h_(n, e, t) {
    let i = this.cache, s = t.allocateTextureUnit();
    i[0] !== s && (n.uniform1i(this.addr, s), i[0] = s), t.setTexture3D(e || Sd, s)
  }
  function u_(n, e, t) {
    let i = this.cache, s = t.allocateTextureUnit();
    i[0] !== s && (n.uniform1i(this.addr, s), i[0] = s), t.setTextureCube(e || bd, s)
  }
  function d_(n, e, t) {
    let i = this.cache, s = t.allocateTextureUnit();
    i[0] !== s && (n.uniform1i(this.addr, s), i[0] = s), t.setTexture2DArray(e || Md, s)
  }
  function f_(n) {
    switch (n) {
      case 5126: return Z0;
      case 35664: return $0;
      case 35665: return J0;
      case 35666: return K0;
      case 35674: return Q0;
      case 35675: return j0;
      case 35676: return e_;
      case 5124: case 35670: return t_;
      case 35667: case 35671: return n_;
      case 35668: case 35672: return i_;
      case 35669: case 35673: return s_;
      case 5125: return r_;
      case 36294: return o_;
      case 36295: return a_;
      case 36296: return l_;
      case 35678: case 36198: case 36298: case 36306: case 35682: return c_;
      case 35679: case 36299: case 36307: return h_;
      case 35680: case 36300: case 36308: case 36293: return u_;
      case 36289: case 36303: case 36311: case 36292: return d_
    }
  }
  function p_(n, e) {
    n.uniform1fv(this.addr, e)
  }
  function m_(n, e) {
    let t = Ds(e, this.size, 2);
    n.uniform2fv(this.addr, t)
  }
  function g_(n, e) {
    let t = Ds(e, this.size, 3);
    n.uniform3fv(this.addr, t)
  }
  function __(n, e) {
    let t = Ds(e, this.size, 4);
    n.uniform4fv(this.addr, t)
  }
  function x_(n, e) {
    let t = Ds(e, this.size, 4);
    n.uniformMatrix2fv(this.addr, !1, t)
  }
  function v_(n, e) {
    let t = Ds(e, this.size, 9);
    n.uniformMatrix3fv(this.addr, !1, t)
  }
  function y_(n, e) {
    let t = Ds(e, this.size, 16);
    n.uniformMatrix4fv(this.addr, !1, t)
  }
  function M_(n, e) {
    n.uniform1iv(this.addr, e)
  }
  function S_(n, e) {
    n.uniform2iv(this.addr, e)
  }
  function b_(n, e) {
    n.uniform3iv(this.addr, e)
  }
  function E_(n, e) {
    n.uniform4iv(this.addr, e)
  }
  function T_(n, e) {
    n.uniform1uiv(this.addr, e)
  }
  function w_(n, e) {
    n.uniform2uiv(this.addr, e)
  }
  function A_(n, e) {
    n.uniform3uiv(this.addr, e)
  }
  function R_(n, e) {
    n.uniform4uiv(this.addr, e)
  }
  function C_(n, e, t) {
    let i = this.cache, s = e.length, r = sl(t, s);
    Tt(i, r) || (n.uniform1iv(this.addr, r), wt(i, r));
    for (let o = 0;
    o !== s;
    ++o)t.setTexture2D(e[o] || yd, r[o])
  }
  function I_(n, e, t) {
    let i = this.cache, s = e.length, r = sl(t, s);
    Tt(i, r) || (n.uniform1iv(this.addr, r), wt(i, r));
    for (let o = 0;
    o !== s;
    ++o)t.setTexture3D(e[o] || Sd, r[o])
  }
  function P_(n, e, t) {
    let i = this.cache, s = e.length, r = sl(t, s);
    Tt(i, r) || (n.uniform1iv(this.addr, r), wt(i, r));
    for (let o = 0;
    o !== s;
    ++o)t.setTextureCube(e[o] || bd, r[o])
  }
  function D_(n, e, t) {
    let i = this.cache, s = e.length, r = sl(t, s);
    Tt(i, r) || (n.uniform1iv(this.addr, r), wt(i, r));
    for (let o = 0;
    o !== s;
    ++o)t.setTexture2DArray(e[o] || Md, r[o])
  }
  function L_(n) {
    switch (n) {
      case 5126: return p_;
      case 35664: return m_;
      case 35665: return g_;
      case 35666: return __;
      case 35674: return x_;
      case 35675: return v_;
      case 35676: return y_;
      case 5124: case 35670: return M_;
      case 35667: case 35671: return S_;
      case 35668: case 35672: return b_;
      case 35669: case 35673: return E_;
      case 5125: return T_;
      case 36294: return w_;
      case 36295: return A_;
      case 36296: return R_;
      case 35678: case 36198: case 36298: case 36306: case 35682: return C_;
      case 35679: case 36299: case 36307: return I_;
      case 35680: case 36300: case 36308: case 36293: return P_;
      case 36289: case 36303: case 36311: case 36292: return D_
    }
  }
  var zc = class {
    constructor(e, t, i) {
      this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.setValue = f_(t.type)
    }
  }, kc = class {
    constructor(e, t, i) {
      this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = L_(t.type)
    }
  }, Hc = class {
    constructor(e) {
      this.id = e, this.seq = [], this.map = {
      }
    }
    setValue(e, t, i) {
      let s = this.seq;
      for (let r = 0, o = s.length;
      r !== o;
      ++r) {
        let a = s[r];
        a.setValue(e, t[a.id], i)
      }
    }
  }, Bc = /(\w+)(\])?(\[|\.)?/g;
  function ld(n, e) {
    n.seq.push(e), n.map[e.id] = e
  }
  function U_(n, e, t) {
    let i = n.name, s = i.length;
    for (Bc.lastIndex = 0;
    ;
    ) {
      let r = Bc.exec(i), o = Bc.lastIndex, a = r[1], l = r[2] === "]", c = r[3];
      if (l && (a = a | 0), c === void 0 || c === "[" && o + 2 === s) {
        ld(t, c === void 0?new zc(a, n, e): new kc(a, n, e));
        break
      } else {
        let u = t.map[a];
        u === void 0 && (u = new Hc(a), ld(t, u)), t = u
      }
    }
  }
  var Ps = class {
    constructor(e, t) {
      this.seq = [], this.map = {
      };
      let i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
      for (let s = 0;
      s < i;
      ++s) {
        let r = e.getActiveUniform(t, s), o = e.getUniformLocation(t, r.name);
        U_(r, o, this)
      }
    }
    setValue(e, t, i, s) {
      let r = this.map[t];
      r !== void 0 && r.setValue(e, i, s)
    }
    setOptional(e, t, i) {
      let s = t[i];
      s !== void 0 && this.setValue(e, i, s)
    }
    static upload(e, t, i, s) {
      for (let r = 0, o = t.length;
      r !== o;
      ++r) {
        let a = t[r], l = i[a.id];
        l.needsUpdate !== !1 && a.setValue(e, l.value, s)
      }
    }
    static seqWithValue(e, t) {
      let i = [];
      for (let s = 0, r = e.length;
      s !== r;
      ++s) {
        let o = e[s];
        o.id in t && i.push(o)
      }
      return i
    }
  };
  function cd(n, e, t) {
    let i = n.createShader(e);
    return n.shaderSource(i, t), n.compileShader(i), i
  }
  var N_ = 37297, F_ = 0;
  function O_(n, e) {
    let t = n.split(`
`), i = [], s = Math.max(e - 6, 0), r = Math.min(e + 6, t.length);
    for (let o = s;
    o < r;
    o++) {
      let a = o + 1;
      i.push(`${a===e?">":" "} ${a}: ${t[o]}`)
    }
    return i.join(`
`)
  }
  var hd = new We;
  function B_(n) {
    et._getMatrix(hd, et.workingColorSpace, n);
    let e = `mat3( ${hd.elements.map(t=>t.toFixed(4))} )`;
    switch (et.getTransfer(n)) {
      case nr: return[e, "LinearTransferOETF"];
      case at: return[e, "sRGBTransferOETF"];
      default: return console.warn("THREE.WebGLProgram: Unsupported color space: ", n), [e, "LinearTransferOETF"]
    }
  }
  function ud(n, e, t) {
    let i = n.getShaderParameter(e, n.COMPILE_STATUS), r = (n.getShaderInfoLog(e) || "").trim();
    if (i && r === "")return "";
    let o = /ERROR: 0:(\d+)/.exec(r);
    if (o) {
      let a = parseInt(o[1]);
      return t.toUpperCase() + `

` + r + `

` + O_(n.getShaderSource(e), a)
    } else return r
  }
  function z_(n, e) {
    let t = B_(e);
    return[`vec4 ${n}( vec4 value ) {`, `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`, "}"].join(`
`)
  }
  function k_(n, e) {
    let t;
    switch (e) {
      case Eu: t = "Linear";
      break;
      case Tu: t = "Reinhard";
      break;
      case wu: t = "Cineon";
      break;
      case Nr: t = "ACESFilmic";
      break;
      case Ru: t = "AgX";
      break;
      case Cu: t = "Neutral";
      break;
      case Au: t = "Custom";
      break;
      default: console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear"
    }
    return "vec3 " + n + "( vec3 color ) { return " + t + "ToneMapping( color ); }"
  }
  var nl = new I;
  function H_() {
    et.getLuminanceCoefficients(nl);
    let n = nl.x.toFixed(4), e = nl.y.toFixed(4), t = nl.z.toFixed(4);
    return["float luminance( const in vec3 rgb ) {", `	const vec3 weights = vec3( ${n}, ${e}, ${t} );`, "	return dot( weights, rgb );", "}"].join(`
`)
  }
  function V_(n) {
    return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require": "", n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require": ""].filter(Vr).join(`
`)
  }
  function G_(n) {
    let e = [];
    for (let t in n) {
      let i = n[t];
      i !== !1 && e.push("#define " + t + " " + i)
    }
    return e.join(`
`)
  }
  function W_(n, e) {
    let t = {
    }, i = n.getProgramParameter(e, n.ACTIVE_ATTRIBUTES);
    for (let s = 0;
    s < i;
    s++) {
      let r = n.getActiveAttrib(e, s), o = r.name, a = 1;
      r.type === n.FLOAT_MAT2 && (a = 2), r.type === n.FLOAT_MAT3 && (a = 3), r.type === n.FLOAT_MAT4 && (a = 4), t[o] = {
        type: r.type, location: n.getAttribLocation(e, o), locationSize: a
      }
    }
    return t
  }
  function Vr(n) {
    return n !== ""
  }
  function dd(n, e) {
    let t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
    return n.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows)
  }
  function fd(n, e) {
    return n.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection)
  }
  var X_ = /^[ 	]*#include +<([\w\d./]+)>/gm;
  function Vc(n) {
    return n.replace(X_, Y_)
  }
  var q_ = new Map;
  function Y_(n, e) {
    let t = qe[e];
    if (t === void 0) {
      let i = q_.get(e);
      if (i !== void 0)t = qe[i], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, i);
      else throw new Error("Can not resolve #include <" + e + ">")
    }
    return Vc(t)
  }
  var Z_ = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
  function pd(n) {
    return n.replace(Z_, $_)
  }
  function $_(n, e, t, i) {
    let s = "";
    for (let r = parseInt(e);
    r < parseInt(t);
    r++)s += i.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
    return s
  }
  function md(n) {
    let e = `precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;
    return n.precision === "highp"?e += `
#define HIGH_PRECISION`: n.precision === "mediump"?e += `
#define MEDIUM_PRECISION`: n.precision === "lowp" && (e += `
#define LOW_PRECISION`), e
  }
  function J_(n) {
    let e = "SHADOWMAP_TYPE_BASIC";
    return n.shadowMapType === uc?e = "SHADOWMAP_TYPE_PCF": n.shadowMapType === iu?e = "SHADOWMAP_TYPE_PCF_SOFT": n.shadowMapType === Pn && (e = "SHADOWMAP_TYPE_VSM"), e
  }
  function K_(n) {
    let e = "ENVMAP_TYPE_CUBE";
    if (n.envMap)switch (n.envMapMode) {
      case Ui: case Ni: e = "ENVMAP_TYPE_CUBE";
      break;
      case Fr: e = "ENVMAP_TYPE_CUBE_UV";
      break
    }
    return e
  }
  function Q_(n) {
    let e = "ENVMAP_MODE_REFLECTION";
    if (n.envMap)switch (n.envMapMode) {
      case Ni: e = "ENVMAP_MODE_REFRACTION";
      break
    }
    return e
  }
  function j_(n) {
    let e = "ENVMAP_BLENDING_NONE";
    if (n.envMap)switch (n.combine) {
      case pc: e = "ENVMAP_BLENDING_MULTIPLY";
      break;
      case Su: e = "ENVMAP_BLENDING_MIX";
      break;
      case bu: e = "ENVMAP_BLENDING_ADD";
      break
    }
    return e
  }
  function ex(n) {
    let e = n.envMapCubeUVHeight;
    if (e === null)return null;
    let t = Math.log2(e) - 2, i = 1 / e;
    return {
      texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: i, maxMip: t
    }
  }
  function tx(n, e, t, i) {
    let s = n.getContext(), r = t.defines, o = t.vertexShader, a = t.fragmentShader, l = J_(t), c = K_(t), h = Q_(t), u = j_(t), d = ex(t), f = V_(t), m = G_(r), x = s.createProgram(), g, p, E = t.glslVersion?"#version " + t.glslVersion + `
`: "";
    t.isRawShaderMaterial?(g = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, m].filter(Vr).join(`
`), g.length > 0 && (g += `
`), p = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, m].filter(Vr).join(`
`), p.length > 0 && (p += `
`)): (g = [md(t), "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, m, t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE": "", t.batching?"#define USE_BATCHING": "", t.batchingColor?"#define USE_BATCHING_COLOR": "", t.instancing?"#define USE_INSTANCING": "", t.instancingColor?"#define USE_INSTANCING_COLOR": "", t.instancingMorph?"#define USE_INSTANCING_MORPH": "", t.useFog && t.fog?"#define USE_FOG": "", t.useFog && t.fogExp2?"#define FOG_EXP2": "", t.map?"#define USE_MAP": "", t.envMap?"#define USE_ENVMAP": "", t.envMap?"#define " + h: "", t.lightMap?"#define USE_LIGHTMAP": "", t.aoMap?"#define USE_AOMAP": "", t.bumpMap?"#define USE_BUMPMAP": "", t.normalMap?"#define USE_NORMALMAP": "", t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE": "", t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE": "", t.displacementMap?"#define USE_DISPLACEMENTMAP": "", t.emissiveMap?"#define USE_EMISSIVEMAP": "", t.anisotropy?"#define USE_ANISOTROPY": "", t.anisotropyMap?"#define USE_ANISOTROPYMAP": "", t.clearcoatMap?"#define USE_CLEARCOATMAP": "", t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP": "", t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP": "", t.iridescenceMap?"#define USE_IRIDESCENCEMAP": "", t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP": "", t.specularMap?"#define USE_SPECULARMAP": "", t.specularColorMap?"#define USE_SPECULAR_COLORMAP": "", t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP": "", t.roughnessMap?"#define USE_ROUGHNESSMAP": "", t.metalnessMap?"#define USE_METALNESSMAP": "", t.alphaMap?"#define USE_ALPHAMAP": "", t.alphaHash?"#define USE_ALPHAHASH": "", t.transmission?"#define USE_TRANSMISSION": "", t.transmissionMap?"#define USE_TRANSMISSIONMAP": "", t.thicknessMap?"#define USE_THICKNESSMAP": "", t.sheenColorMap?"#define USE_SHEEN_COLORMAP": "", t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP": "", t.mapUv?"#define MAP_UV " + t.mapUv: "", t.alphaMapUv?"#define ALPHAMAP_UV " + t.alphaMapUv: "", t.lightMapUv?"#define LIGHTMAP_UV " + t.lightMapUv: "", t.aoMapUv?"#define AOMAP_UV " + t.aoMapUv: "", t.emissiveMapUv?"#define EMISSIVEMAP_UV " + t.emissiveMapUv: "", t.bumpMapUv?"#define BUMPMAP_UV " + t.bumpMapUv: "", t.normalMapUv?"#define NORMALMAP_UV " + t.normalMapUv: "", t.displacementMapUv?"#define DISPLACEMENTMAP_UV " + t.displacementMapUv: "", t.metalnessMapUv?"#define METALNESSMAP_UV " + t.metalnessMapUv: "", t.roughnessMapUv?"#define ROUGHNESSMAP_UV " + t.roughnessMapUv: "", t.anisotropyMapUv?"#define ANISOTROPYMAP_UV " + t.anisotropyMapUv: "", t.clearcoatMapUv?"#define CLEARCOATMAP_UV " + t.clearcoatMapUv: "", t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv: "", t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv: "", t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv: "", t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv: "", t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv: "", t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv: "", t.specularMapUv?"#define SPECULARMAP_UV " + t.specularMapUv: "", t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv: "", t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv: "", t.transmissionMapUv?"#define TRANSMISSIONMAP_UV " + t.transmissionMapUv: "", t.thicknessMapUv?"#define THICKNESSMAP_UV " + t.thicknessMapUv: "", t.vertexTangents && t.flatShading === !1?"#define USE_TANGENT": "", t.vertexColors?"#define USE_COLOR": "", t.vertexAlphas?"#define USE_COLOR_ALPHA": "", t.vertexUv1s?"#define USE_UV1": "", t.vertexUv2s?"#define USE_UV2": "", t.vertexUv3s?"#define USE_UV3": "", t.pointsUvs?"#define USE_POINTS_UV": "", t.flatShading?"#define FLAT_SHADED": "", t.skinning?"#define USE_SKINNING": "", t.morphTargets?"#define USE_MORPHTARGETS": "", t.morphNormals && t.flatShading === !1?"#define USE_MORPHNORMALS": "", t.morphColors?"#define USE_MORPHCOLORS": "", t.morphTargetsCount > 0?"#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride: "", t.morphTargetsCount > 0?"#define MORPHTARGETS_COUNT " + t.morphTargetsCount: "", t.doubleSided?"#define DOUBLE_SIDED": "", t.flipSided?"#define FLIP_SIDED": "", t.shadowMapEnabled?"#define USE_SHADOWMAP": "", t.shadowMapEnabled?"#define " + l: "", t.sizeAttenuation?"#define USE_SIZEATTENUATION": "", t.numLightProbes > 0?"#define USE_LIGHT_PROBES": "", t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER": "", t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER": "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(Vr).join(`
`), p = [md(t), "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, m, t.useFog && t.fog?"#define USE_FOG": "", t.useFog && t.fogExp2?"#define FOG_EXP2": "", t.alphaToCoverage?"#define ALPHA_TO_COVERAGE": "", t.map?"#define USE_MAP": "", t.matcap?"#define USE_MATCAP": "", t.envMap?"#define USE_ENVMAP": "", t.envMap?"#define " + c: "", t.envMap?"#define " + h: "", t.envMap?"#define " + u: "", d?"#define CUBEUV_TEXEL_WIDTH " + d.texelWidth: "", d?"#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight: "", d?"#define CUBEUV_MAX_MIP " + d.maxMip + ".0": "", t.lightMap?"#define USE_LIGHTMAP": "", t.aoMap?"#define USE_AOMAP": "", t.bumpMap?"#define USE_BUMPMAP": "", t.normalMap?"#define USE_NORMALMAP": "", t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE": "", t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE": "", t.emissiveMap?"#define USE_EMISSIVEMAP": "", t.anisotropy?"#define USE_ANISOTROPY": "", t.anisotropyMap?"#define USE_ANISOTROPYMAP": "", t.clearcoat?"#define USE_CLEARCOAT": "", t.clearcoatMap?"#define USE_CLEARCOATMAP": "", t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP": "", t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP": "", t.dispersion?"#define USE_DISPERSION": "", t.iridescence?"#define USE_IRIDESCENCE": "", t.iridescenceMap?"#define USE_IRIDESCENCEMAP": "", t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP": "", t.specularMap?"#define USE_SPECULARMAP": "", t.specularColorMap?"#define USE_SPECULAR_COLORMAP": "", t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP": "", t.roughnessMap?"#define USE_ROUGHNESSMAP": "", t.metalnessMap?"#define USE_METALNESSMAP": "", t.alphaMap?"#define USE_ALPHAMAP": "", t.alphaTest?"#define USE_ALPHATEST": "", t.alphaHash?"#define USE_ALPHAHASH": "", t.sheen?"#define USE_SHEEN": "", t.sheenColorMap?"#define USE_SHEEN_COLORMAP": "", t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP": "", t.transmission?"#define USE_TRANSMISSION": "", t.transmissionMap?"#define USE_TRANSMISSIONMAP": "", t.thicknessMap?"#define USE_THICKNESSMAP": "", t.vertexTangents && t.flatShading === !1?"#define USE_TANGENT": "", t.vertexColors || t.instancingColor || t.batchingColor?"#define USE_COLOR": "", t.vertexAlphas?"#define USE_COLOR_ALPHA": "", t.vertexUv1s?"#define USE_UV1": "", t.vertexUv2s?"#define USE_UV2": "", t.vertexUv3s?"#define USE_UV3": "", t.pointsUvs?"#define USE_POINTS_UV": "", t.gradientMap?"#define USE_GRADIENTMAP": "", t.flatShading?"#define FLAT_SHADED": "", t.doubleSided?"#define DOUBLE_SIDED": "", t.flipSided?"#define FLIP_SIDED": "", t.shadowMapEnabled?"#define USE_SHADOWMAP": "", t.shadowMapEnabled?"#define " + l: "", t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA": "", t.numLightProbes > 0?"#define USE_LIGHT_PROBES": "", t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE": "", t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE": "", t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER": "", t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER": "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", t.toneMapping !== Zn?"#define TONE_MAPPING": "", t.toneMapping !== Zn?qe.tonemapping_pars_fragment: "", t.toneMapping !== Zn?k_("toneMapping", t.toneMapping): "", t.dithering?"#define DITHERING": "", t.opaque?"#define OPAQUE": "", qe.colorspace_pars_fragment, z_("linearToOutputTexel", t.outputColorSpace), H_(), t.useDepthPacking?"#define DEPTH_PACKING " + t.depthPacking: "", `
`].filter(Vr).join(`
`)), o = Vc(o), o = dd(o, t), o = fd(o, t), a = Vc(a), a = dd(a, t), a = fd(a, t), o = pd(o), a = pd(a), t.isRawShaderMaterial !== !0 && (E = `#version 300 es
`, g = [f, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
` + g, p = ["#define varying in", t.glslVersion === Tc?"": "layout(location = 0) out highp vec4 pc_fragColor;", t.glslVersion === Tc?"": "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
` + p);
    let b = E + g + o, y = E + p + a, R = cd(s, s.VERTEX_SHADER, b), w = cd(s, s.FRAGMENT_SHADER, y);
    s.attachShader(x, R), s.attachShader(x, w), t.index0AttributeName !== void 0?s.bindAttribLocation(x, 0, t.index0AttributeName): t.morphTargets === !0 && s.bindAttribLocation(x, 0, "position"), s.linkProgram(x);
    function P(C) {
      if (n.debug.checkShaderErrors) {
        let F = s.getProgramInfoLog(x) || "", z = s.getShaderInfoLog(R) || "", G = s.getShaderInfoLog(w) || "", q = F.trim(), W = z.trim(), te = G.trim(), V = !0, ue = !0;
        if (s.getProgramParameter(x, s.LINK_STATUS) === !1)if (V = !1, typeof n.debug.onShaderError == "function")n.debug.onShaderError(s, x, R, w);
        else {
          let ve = ud(s, R, "vertex"), Se = ud(s, w, "fragment");
          console.error("THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(x, s.VALIDATE_STATUS) + `

Material Name: ` + C.name + `
Material Type: ` + C.type + `

Program Info Log: ` + q + `
` + ve + `
` + Se)
        } else q !== ""?console.warn("THREE.WebGLProgram: Program Info Log:", q): (W === "" || te === "") && (ue = !1);
        ue && (C.diagnostics = {
          runnable: V, programLog: q, vertexShader: {
            log: W, prefix: g
          }, fragmentShader: {
            log: te, prefix: p
          }
        })
      }
      s.deleteShader(R), s.deleteShader(w), D = new Ps(s, x), M = W_(s, x)
    }
    let D;
    this.getUniforms = function() {
      return D === void 0 && P(this), D
    };
    let M;
    this.getAttributes = function() {
      return M === void 0 && P(this), M
    };
    let v = t.rendererExtensionParallelShaderCompile === !1;
    return this.isReady = function() {
      return v === !1 && (v = s.getProgramParameter(x, N_)), v
    }, this.destroy = function() {
      i.releaseStatesOfProgram(this), s.deleteProgram(x), this.program = void 0
    }, this.type = t.shaderType, this.name = t.shaderName, this.id = F_++, this.cacheKey = e, this.usedTimes = 1, this.program = x, this.vertexShader = R, this.fragmentShader = w, this
  }
  var nx = 0, Gc = class {
    constructor() {
      this.shaderCache = new Map, this.materialCache = new Map
    }
    update(e) {
      let t = e.vertexShader, i = e.fragmentShader, s = this._getShaderStage(t), r = this._getShaderStage(i), o = this._getShaderCacheForMaterial(e);
      return o.has(s) === !1 && (o.add(s), s.usedTimes++), o.has(r) === !1 && (o.add(r), r.usedTimes++), this
    }
    remove(e) {
      let t = this.materialCache.get(e);
      for (let i of t)i.usedTimes--, i.usedTimes === 0 && this.shaderCache.delete(i.code);
      return this.materialCache.delete(e), this
    }
    getVertexShaderID(e) {
      return this._getShaderStage(e.vertexShader).id
    }
    getFragmentShaderID(e) {
      return this._getShaderStage(e.fragmentShader).id
    }
    dispose() {
      this.shaderCache.clear(), this.materialCache.clear()
    }
    _getShaderCacheForMaterial(e) {
      let t = this.materialCache, i = t.get(e);
      return i === void 0 && (i = new Set, t.set(e, i)), i
    }
    _getShaderStage(e) {
      let t = this.shaderCache, i = t.get(e);
      return i === void 0 && (i = new Wc(e), t.set(e, i)), i
    }
  }, Wc = class {
    constructor(e) {
      this.id = nx++, this.code = e, this.usedTimes = 0
    }
  };
  function ix(n, e, t, i, s, r, o) {
    let a = new or, l = new Gc, c = new Set, h = [], u = s.logarithmicDepthBuffer, d = s.vertexTextures, f = s.precision, m = {
      MeshDepthMaterial: "depth", MeshDistanceMaterial: "distanceRGBA", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite"
    };
    function x(M) {
      return c.add(M), M === 0?"uv": `uv${M}`
    }
    function g(M, v, C, F, z) {
      let G = F.fog, q = z.geometry, W = M.isMeshStandardMaterial?F.environment: null, te = (M.isMeshStandardMaterial?t: e).get(M.envMap || W), V = te && te.mapping === Fr?te.image.height: null, ue = m[M.type];
      M.precision !== null && (f = s.getMaxPrecision(M.precision), f !== M.precision && console.warn("THREE.WebGLProgram.getParameters:", M.precision, "not supported, using", f, "instead."));
      let ve = q.morphAttributes.position || q.morphAttributes.normal || q.morphAttributes.color, Se = ve !== void 0?ve.length: 0, Ge = 0;
      q.morphAttributes.position !== void 0 && (Ge = 1), q.morphAttributes.normal !== void 0 && (Ge = 2), q.morphAttributes.color !== void 0 && (Ge = 3);
      let Ke, rt, je, Y;
      if (ue) {
        let it = Ln[ue];
        Ke = it.vertexShader, rt = it.fragmentShader
      } else Ke = M.vertexShader, rt = M.fragmentShader, l.update(M), je = l.getVertexShaderID(M), Y = l.getFragmentShaderID(M);
      let ee = n.getRenderTarget(), Me = n.state.buffers.depth.getReversed(), De = z.isInstancedMesh === !0, we = z.isBatchedMesh === !0, Ze = !!M.map, ut = !!M.matcap, A = !!te, j = !!M.aoMap, J = !!M.lightMap, $ = !!M.bumpMap, Z = !!M.normalMap, ce = !!M.displacementMap, ie = !!M.emissiveMap, he = !!M.metalnessMap, He = !!M.roughnessMap, ze = M.anisotropy > 0, T = M.clearcoat > 0, _ = M.dispersion > 0, O = M.iridescence > 0, H = M.sheen > 0, Q = M.transmission > 0, X = ze && !!M.anisotropyMap, Ie = T && !!M.clearcoatMap, le = T && !!M.clearcoatNormalMap, Ae = T && !!M.clearcoatRoughnessMap, Re = O && !!M.iridescenceMap, se = O && !!M.iridescenceThicknessMap, xe = H && !!M.sheenColorMap, Fe = H && !!M.sheenRoughnessMap, Pe = !!M.specularMap, me = !!M.specularColorMap, Xe = !!M.specularIntensityMap, L = Q && !!M.transmissionMap, ae = Q && !!M.thicknessMap, de = !!M.gradientMap, be = !!M.alphaMap, re = M.alphaTest > 0, K = !!M.alphaHash, Ce = !!M.extensions, Ve = Zn;
      M.toneMapped && (ee === null || ee.isXRRenderTarget === !0) && (Ve = n.toneMapping);
      let dt = {
        shaderID: ue, shaderType: M.type, shaderName: M.name, vertexShader: Ke, fragmentShader: rt, defines: M.defines, customVertexShaderID: je, customFragmentShaderID: Y, isRawShaderMaterial: M.isRawShaderMaterial === !0, glslVersion: M.glslVersion, precision: f, batching: we, batchingColor: we && z._colorsTexture !== null, instancing: De, instancingColor: De && z.instanceColor !== null, instancingMorph: De && z.morphTexture !== null, supportsVertexTextures: d, outputColorSpace: ee === null?n.outputColorSpace: ee.isXRRenderTarget === !0?ee.texture.colorSpace: Ii, alphaToCoverage: !!M.alphaToCoverage, map: Ze, matcap: ut, envMap: A, envMapMode: A && te.mapping, envMapCubeUVHeight: V, aoMap: j, lightMap: J, bumpMap: $, normalMap: Z, displacementMap: d && ce, emissiveMap: ie, normalMapObjectSpace: Z && M.normalMapType === Lu, normalMapTangentSpace: Z && M.normalMapType === bc, metalnessMap: he, roughnessMap: He, anisotropy: ze, anisotropyMap: X, clearcoat: T, clearcoatMap: Ie, clearcoatNormalMap: le, clearcoatRoughnessMap: Ae, dispersion: _, iridescence: O, iridescenceMap: Re, iridescenceThicknessMap: se, sheen: H, sheenColorMap: xe, sheenRoughnessMap: Fe, specularMap: Pe, specularColorMap: me, specularIntensityMap: Xe, transmission: Q, transmissionMap: L, thicknessMap: ae, gradientMap: de, opaque: M.transparent === !1 && M.blending === Ri && M.alphaToCoverage === !1, alphaMap: be, alphaTest: re, alphaHash: K, combine: M.combine, mapUv: Ze && x(M.map.channel), aoMapUv: j && x(M.aoMap.channel), lightMapUv: J && x(M.lightMap.channel), bumpMapUv: $ && x(M.bumpMap.channel), normalMapUv: Z && x(M.normalMap.channel), displacementMapUv: ce && x(M.displacementMap.channel), emissiveMapUv: ie && x(M.emissiveMap.channel), metalnessMapUv: he && x(M.metalnessMap.channel), roughnessMapUv: He && x(M.roughnessMap.channel), anisotropyMapUv: X && x(M.anisotropyMap.channel), clearcoatMapUv: Ie && x(M.clearcoatMap.channel), clearcoatNormalMapUv: le && x(M.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: Ae && x(M.clearcoatRoughnessMap.channel), iridescenceMapUv: Re && x(M.iridescenceMap.channel), iridescenceThicknessMapUv: se && x(M.iridescenceThicknessMap.channel), sheenColorMapUv: xe && x(M.sheenColorMap.channel), sheenRoughnessMapUv: Fe && x(M.sheenRoughnessMap.channel), specularMapUv: Pe && x(M.specularMap.channel), specularColorMapUv: me && x(M.specularColorMap.channel), specularIntensityMapUv: Xe && x(M.specularIntensityMap.channel), transmissionMapUv: L && x(M.transmissionMap.channel), thicknessMapUv: ae && x(M.thicknessMap.channel), alphaMapUv: be && x(M.alphaMap.channel), vertexTangents: !!q.attributes.tangent && (Z || ze), vertexColors: M.vertexColors, vertexAlphas: M.vertexColors === !0 && !!q.attributes.color && q.attributes.color.itemSize === 4, pointsUvs: z.isPoints === !0 && !!q.attributes.uv && (Ze || be), fog: !!G, useFog: M.fog === !0, fogExp2: !!G && G.isFogExp2, flatShading: M.flatShading === !0 && M.wireframe === !1, sizeAttenuation: M.sizeAttenuation === !0, logarithmicDepthBuffer: u, reversedDepthBuffer: Me, skinning: z.isSkinnedMesh === !0, morphTargets: q.morphAttributes.position !== void 0, morphNormals: q.morphAttributes.normal !== void 0, morphColors: q.morphAttributes.color !== void 0, morphTargetsCount: Se, morphTextureStride: Ge, numDirLights: v.directional.length, numPointLights: v.point.length, numSpotLights: v.spot.length, numSpotLightMaps: v.spotLightMap.length, numRectAreaLights: v.rectArea.length, numHemiLights: v.hemi.length, numDirLightShadows: v.directionalShadowMap.length, numPointLightShadows: v.pointShadowMap.length, numSpotLightShadows: v.spotShadowMap.length, numSpotLightShadowsWithMaps: v.numSpotLightShadowsWithMaps, numLightProbes: v.numLightProbes, numClippingPlanes: o.numPlanes, numClipIntersection: o.numIntersection, dithering: M.dithering, shadowMapEnabled: n.shadowMap.enabled && C.length > 0, shadowMapType: n.shadowMap.type, toneMapping: Ve, decodeVideoTexture: Ze && M.map.isVideoTexture === !0 && et.getTransfer(M.map.colorSpace) === at, decodeVideoTextureEmissive: ie && M.emissiveMap.isVideoTexture === !0 && et.getTransfer(M.emissiveMap.colorSpace) === at, premultipliedAlpha: M.premultipliedAlpha, doubleSided: M.side === Dn, flipSided: M.side === Wt, useDepthPacking: M.depthPacking >= 0, depthPacking: M.depthPacking || 0, index0AttributeName: M.index0AttributeName, extensionClipCullDistance: Ce && M.extensions.clipCullDistance === !0 && i.has("WEBGL_clip_cull_distance"), extensionMultiDraw: (Ce && M.extensions.multiDraw === !0 || we) && i.has("WEBGL_multi_draw"), rendererExtensionParallelShaderCompile: i.has("KHR_parallel_shader_compile"), customProgramCacheKey: M.customProgramCacheKey()
      };
      return dt.vertexUv1s = c.has(1), dt.vertexUv2s = c.has(2), dt.vertexUv3s = c.has(3), c.clear(), dt
    }
    function p(M) {
      let v = [];
      if (M.shaderID?v.push(M.shaderID): (v.push(M.customVertexShaderID), v.push(M.customFragmentShaderID)), M.defines !== void 0)for (let C in M.defines)v.push(C), v.push(M.defines[C]);
      return M.isRawShaderMaterial === !1 && (E(v, M), b(v, M), v.push(n.outputColorSpace)), v.push(M.customProgramCacheKey), v.join()
    }
    function E(M, v) {
      M.push(v.precision), M.push(v.outputColorSpace), M.push(v.envMapMode), M.push(v.envMapCubeUVHeight), M.push(v.mapUv), M.push(v.alphaMapUv), M.push(v.lightMapUv), M.push(v.aoMapUv), M.push(v.bumpMapUv), M.push(v.normalMapUv), M.push(v.displacementMapUv), M.push(v.emissiveMapUv), M.push(v.metalnessMapUv), M.push(v.roughnessMapUv), M.push(v.anisotropyMapUv), M.push(v.clearcoatMapUv), M.push(v.clearcoatNormalMapUv), M.push(v.clearcoatRoughnessMapUv), M.push(v.iridescenceMapUv), M.push(v.iridescenceThicknessMapUv), M.push(v.sheenColorMapUv), M.push(v.sheenRoughnessMapUv), M.push(v.specularMapUv), M.push(v.specularColorMapUv), M.push(v.specularIntensityMapUv), M.push(v.transmissionMapUv), M.push(v.thicknessMapUv), M.push(v.combine), M.push(v.fogExp2), M.push(v.sizeAttenuation), M.push(v.morphTargetsCount), M.push(v.morphAttributeCount), M.push(v.numDirLights), M.push(v.numPointLights), M.push(v.numSpotLights), M.push(v.numSpotLightMaps), M.push(v.numHemiLights), M.push(v.numRectAreaLights), M.push(v.numDirLightShadows), M.push(v.numPointLightShadows), M.push(v.numSpotLightShadows), M.push(v.numSpotLightShadowsWithMaps), M.push(v.numLightProbes), M.push(v.shadowMapType), M.push(v.toneMapping), M.push(v.numClippingPlanes), M.push(v.numClipIntersection), M.push(v.depthPacking)
    }
    function b(M, v) {
      a.disableAll(), v.supportsVertexTextures && a.enable(0), v.instancing && a.enable(1), v.instancingColor && a.enable(2), v.instancingMorph && a.enable(3), v.matcap && a.enable(4), v.envMap && a.enable(5), v.normalMapObjectSpace && a.enable(6), v.normalMapTangentSpace && a.enable(7), v.clearcoat && a.enable(8), v.iridescence && a.enable(9), v.alphaTest && a.enable(10), v.vertexColors && a.enable(11), v.vertexAlphas && a.enable(12), v.vertexUv1s && a.enable(13), v.vertexUv2s && a.enable(14), v.vertexUv3s && a.enable(15), v.vertexTangents && a.enable(16), v.anisotropy && a.enable(17), v.alphaHash && a.enable(18), v.batching && a.enable(19), v.dispersion && a.enable(20), v.batchingColor && a.enable(21), v.gradientMap && a.enable(22), M.push(a.mask), a.disableAll(), v.fog && a.enable(0), v.useFog && a.enable(1), v.flatShading && a.enable(2), v.logarithmicDepthBuffer && a.enable(3), v.reversedDepthBuffer && a.enable(4), v.skinning && a.enable(5), v.morphTargets && a.enable(6), v.morphNormals && a.enable(7), v.morphColors && a.enable(8), v.premultipliedAlpha && a.enable(9), v.shadowMapEnabled && a.enable(10), v.doubleSided && a.enable(11), v.flipSided && a.enable(12), v.useDepthPacking && a.enable(13), v.dithering && a.enable(14), v.transmission && a.enable(15), v.sheen && a.enable(16), v.opaque && a.enable(17), v.pointsUvs && a.enable(18), v.decodeVideoTexture && a.enable(19), v.decodeVideoTextureEmissive && a.enable(20), v.alphaToCoverage && a.enable(21), M.push(a.mask)
    }
    function y(M) {
      let v = m[M.type], C;
      if (v) {
        let F = Ln[v];
        C = Wu.clone(F.uniforms)
      } else C = M.uniforms;
      return C
    }
    function R(M, v) {
      let C;
      for (let F = 0, z = h.length;
      F < z;
      F++) {
        let G = h[F];
        if (G.cacheKey === v) {
          C = G, ++C.usedTimes;
          break
        }
      }
      return C === void 0 && (C = new tx(n, v, M, r), h.push(C)), C
    }
    function w(M) {
      if (--M.usedTimes === 0) {
        let v = h.indexOf(M);
        h[v] = h[h.length - 1], h.pop(), M.destroy()
      }
    }
    function P(M) {
      l.remove(M)
    }
    function D() {
      l.dispose()
    }
    return {
      getParameters: g, getProgramCacheKey: p, getUniforms: y, acquireProgram: R, releaseProgram: w, releaseShaderCache: P, programs: h, dispose: D
    }
  }
  function sx() {
    let n = new WeakMap;
    function e(o) {
      return n.has(o)
    }
    function t(o) {
      let a = n.get(o);
      return a === void 0 && (a = {
      }, n.set(o, a)), a
    }
    function i(o) {
      n.delete(o)
    }
    function s(o, a, l) {
      n.get(o)[a] = l
    }
    function r() {
      n = new WeakMap
    }
    return {
      has: e, get: t, remove: i, update: s, dispose: r
    }
  }
  function rx(n, e) {
    return n.groupOrder !== e.groupOrder?n.groupOrder - e.groupOrder: n.renderOrder !== e.renderOrder?n.renderOrder - e.renderOrder: n.material.id !== e.material.id?n.material.id - e.material.id: n.z !== e.z?n.z - e.z: n.id - e.id
  }
  function gd(n, e) {
    return n.groupOrder !== e.groupOrder?n.groupOrder - e.groupOrder: n.renderOrder !== e.renderOrder?n.renderOrder - e.renderOrder: n.z !== e.z?e.z - n.z: n.id - e.id
  }
  function _d() {
    let n = [], e = 0, t = [], i = [], s = [];
    function r() {
      e = 0, t.length = 0, i.length = 0, s.length = 0
    }
    function o(u, d, f, m, x, g) {
      let p = n[e];
      return p === void 0?(p = {
        id: u.id, object: u, geometry: d, material: f, groupOrder: m, renderOrder: u.renderOrder, z: x, group: g
      }, n[e] = p): (p.id = u.id, p.object = u, p.geometry = d, p.material = f, p.groupOrder = m, p.renderOrder = u.renderOrder, p.z = x, p.group = g), e++, p
    }
    function a(u, d, f, m, x, g) {
      let p = o(u, d, f, m, x, g);
      f.transmission > 0?i.push(p): f.transparent === !0?s.push(p): t.push(p)
    }
    function l(u, d, f, m, x, g) {
      let p = o(u, d, f, m, x, g);
      f.transmission > 0?i.unshift(p): f.transparent === !0?s.unshift(p): t.unshift(p)
    }
    function c(u, d) {
      t.length > 1 && t.sort(u || rx), i.length > 1 && i.sort(d || gd), s.length > 1 && s.sort(d || gd)
    }
    function h() {
      for (let u = e, d = n.length;
      u < d;
      u++) {
        let f = n[u];
        if (f.id === null)break;
        f.id = null, f.object = null, f.geometry = null, f.material = null, f.group = null
      }
    }
    return {
      opaque: t, transmissive: i, transparent: s, init: r, push: a, unshift: l, finish: h, sort: c
    }
  }
  function ox() {
    let n = new WeakMap;
    function e(i, s) {
      let r = n.get(i), o;
      return r === void 0?(o = new _d, n.set(i, [o])): s >= r.length?(o = new _d, r.push(o)): o = r[s], o
    }
    function t() {
      n = new WeakMap
    }
    return {
      get: e, dispose: t
    }
  }
  function ax() {
    let n = {
    };
    return {
      get: function(e) {
        if (n[e.id] !== void 0)return n[e.id];
        let t;
        switch (e.type) {
          case "DirectionalLight": t = {
            direction: new I, color: new ke
          };
          break;
          case "SpotLight": t = {
            position: new I, direction: new I, color: new ke, distance: 0, coneCos: 0, penumbraCos: 0, decay: 0
          };
          break;
          case "PointLight": t = {
            position: new I, color: new ke, distance: 0, decay: 0
          };
          break;
          case "HemisphereLight": t = {
            direction: new I, skyColor: new ke, groundColor: new ke
          };
          break;
          case "RectAreaLight": t = {
            color: new ke, position: new I, halfWidth: new I, halfHeight: new I
          };
          break
        }
        return n[e.id] = t, t
      }
    }
  }
  function lx() {
    let n = {
    };
    return {
      get: function(e) {
        if (n[e.id] !== void 0)return n[e.id];
        let t;
        switch (e.type) {
          case "DirectionalLight": t = {
            shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new fe
          };
          break;
          case "SpotLight": t = {
            shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new fe
          };
          break;
          case "PointLight": t = {
            shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new fe, shadowCameraNear: 1, shadowCameraFar: 1e3
          };
          break
        }
        return n[e.id] = t, t
      }
    }
  }
  var cx = 0;
  function hx(n, e) {
    return(e.castShadow?2: 0) - (n.castShadow?2: 0) + (e.map?1: 0) - (n.map?1: 0)
  }
  function ux(n) {
    let e = new ax, t = lx(), i = {
      version: 0, hash: {
        directionalLength: - 1, pointLength: - 1, spotLength: - 1, rectAreaLength: - 1, hemiLength: - 1, numDirectionalShadows: - 1, numPointShadows: - 1, numSpotShadows: - 1, numSpotMaps: - 1, numLightProbes: - 1
      }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0
    };
    for (let c = 0;
    c < 9;
    c++)i.probe.push(new I);
    let s = new I, r = new nt, o = new nt;
    function a(c) {
      let h = 0, u = 0, d = 0;
      for (let M = 0;
      M < 9;
      M++)i.probe[M].set(0, 0, 0);
      let f = 0, m = 0, x = 0, g = 0, p = 0, E = 0, b = 0, y = 0, R = 0, w = 0, P = 0;
      c.sort(hx);
      for (let M = 0, v = c.length;
      M < v;
      M++) {
        let C = c[M], F = C.color, z = C.intensity, G = C.distance, q = C.shadow && C.shadow.map?C.shadow.map.texture: null;
        if (C.isAmbientLight)h += F.r * z, u += F.g * z, d += F.b * z;
        else if (C.isLightProbe) {
          for (let W = 0;
          W < 9;
          W++)i.probe[W].addScaledVector(C.sh.coefficients[W], z);
          P++
        } else if (C.isDirectionalLight) {
          let W = e.get(C);
          if (W.color.copy(C.color).multiplyScalar(C.intensity), C.castShadow) {
            let te = C.shadow, V = t.get(C);
            V.shadowIntensity = te.intensity, V.shadowBias = te.bias, V.shadowNormalBias = te.normalBias, V.shadowRadius = te.radius, V.shadowMapSize = te.mapSize, i.directionalShadow[f] = V, i.directionalShadowMap[f] = q, i.directionalShadowMatrix[f] = C.shadow.matrix, E++
          }
          i.directional[f] = W, f++
        } else if (C.isSpotLight) {
          let W = e.get(C);
          W.position.setFromMatrixPosition(C.matrixWorld), W.color.copy(F).multiplyScalar(z), W.distance = G, W.coneCos = Math.cos(C.angle), W.penumbraCos = Math.cos(C.angle * (1 - C.penumbra)), W.decay = C.decay, i.spot[x] = W;
          let te = C.shadow;
          if (C.map && (i.spotLightMap[R] = C.map, R++, te.updateMatrices(C), C.castShadow && w++), i.spotLightMatrix[x] = te.matrix, C.castShadow) {
            let V = t.get(C);
            V.shadowIntensity = te.intensity, V.shadowBias = te.bias, V.shadowNormalBias = te.normalBias, V.shadowRadius = te.radius, V.shadowMapSize = te.mapSize, i.spotShadow[x] = V, i.spotShadowMap[x] = q, y++
          }
          x++
        } else if (C.isRectAreaLight) {
          let W = e.get(C);
          W.color.copy(F).multiplyScalar(z), W.halfWidth.set(C.width * .5, 0, 0), W.halfHeight.set(0, C.height * .5, 0), i.rectArea[g] = W, g++
        } else if (C.isPointLight) {
          let W = e.get(C);
          if (W.color.copy(C.color).multiplyScalar(C.intensity), W.distance = C.distance, W.decay = C.decay, C.castShadow) {
            let te = C.shadow, V = t.get(C);
            V.shadowIntensity = te.intensity, V.shadowBias = te.bias, V.shadowNormalBias = te.normalBias, V.shadowRadius = te.radius, V.shadowMapSize = te.mapSize, V.shadowCameraNear = te.camera.near, V.shadowCameraFar = te.camera.far, i.pointShadow[m] = V, i.pointShadowMap[m] = q, i.pointShadowMatrix[m] = C.shadow.matrix, b++
          }
          i.point[m] = W, m++
        } else if (C.isHemisphereLight) {
          let W = e.get(C);
          W.skyColor.copy(C.color).multiplyScalar(z), W.groundColor.copy(C.groundColor).multiplyScalar(z), i.hemi[p] = W, p++
        }
      }
      g > 0 && (n.has("OES_texture_float_linear") === !0?(i.rectAreaLTC1 = pe.LTC_FLOAT_1, i.rectAreaLTC2 = pe.LTC_FLOAT_2): (i.rectAreaLTC1 = pe.LTC_HALF_1, i.rectAreaLTC2 = pe.LTC_HALF_2)), i.ambient[0] = h, i.ambient[1] = u, i.ambient[2] = d;
      let D = i.hash;
      (D.directionalLength !== f || D.pointLength !== m || D.spotLength !== x || D.rectAreaLength !== g || D.hemiLength !== p || D.numDirectionalShadows !== E || D.numPointShadows !== b || D.numSpotShadows !== y || D.numSpotMaps !== R || D.numLightProbes !== P) && (i.directional.length = f, i.spot.length = x, i.rectArea.length = g, i.point.length = m, i.hemi.length = p, i.directionalShadow.length = E, i.directionalShadowMap.length = E, i.pointShadow.length = b, i.pointShadowMap.length = b, i.spotShadow.length = y, i.spotShadowMap.length = y, i.directionalShadowMatrix.length = E, i.pointShadowMatrix.length = b, i.spotLightMatrix.length = y + R - w, i.spotLightMap.length = R, i.numSpotLightShadowsWithMaps = w, i.numLightProbes = P, D.directionalLength = f, D.pointLength = m, D.spotLength = x, D.rectAreaLength = g, D.hemiLength = p, D.numDirectionalShadows = E, D.numPointShadows = b, D.numSpotShadows = y, D.numSpotMaps = R, D.numLightProbes = P, i.version = cx++)
    }
    function l(c, h) {
      let u = 0, d = 0, f = 0, m = 0, x = 0, g = h.matrixWorldInverse;
      for (let p = 0, E = c.length;
      p < E;
      p++) {
        let b = c[p];
        if (b.isDirectionalLight) {
          let y = i.directional[u];
          y.direction.setFromMatrixPosition(b.matrixWorld), s.setFromMatrixPosition(b.target.matrixWorld), y.direction.sub(s), y.direction.transformDirection(g), u++
        } else if (b.isSpotLight) {
          let y = i.spot[f];
          y.position.setFromMatrixPosition(b.matrixWorld), y.position.applyMatrix4(g), y.direction.setFromMatrixPosition(b.matrixWorld), s.setFromMatrixPosition(b.target.matrixWorld), y.direction.sub(s), y.direction.transformDirection(g), f++
        } else if (b.isRectAreaLight) {
          let y = i.rectArea[m];
          y.position.setFromMatrixPosition(b.matrixWorld), y.position.applyMatrix4(g), o.identity(), r.copy(b.matrixWorld), r.premultiply(g), o.extractRotation(r), y.halfWidth.set(b.width * .5, 0, 0), y.halfHeight.set(0, b.height * .5, 0), y.halfWidth.applyMatrix4(o), y.halfHeight.applyMatrix4(o), m++
        } else if (b.isPointLight) {
          let y = i.point[d];
          y.position.setFromMatrixPosition(b.matrixWorld), y.position.applyMatrix4(g), d++
        } else if (b.isHemisphereLight) {
          let y = i.hemi[x];
          y.direction.setFromMatrixPosition(b.matrixWorld), y.direction.transformDirection(g), x++
        }
      }
    }
    return {
      setup: a, setupView: l, state: i
    }
  }
  function xd(n) {
    let e = new ux(n), t = [], i = [];
    function s(h) {
      c.camera = h, t.length = 0, i.length = 0
    }
    function r(h) {
      t.push(h)
    }
    function o(h) {
      i.push(h)
    }
    function a() {
      e.setup(t)
    }
    function l(h) {
      e.setupView(t, h)
    }
    let c = {
      lightsArray: t, shadowsArray: i, camera: null, lights: e, transmissionRenderTarget: {
      }
    };
    return {
      init: s, state: c, setupLights: a, setupLightsView: l, pushLight: r, pushShadow: o
    }
  }
  function dx(n) {
    let e = new WeakMap;
    function t(s, r = 0) {
      let o = e.get(s), a;
      return o === void 0?(a = new xd(n), e.set(s, [a])): r >= o.length?(a = new xd(n), o.push(a)): a = o[r], a
    }
    function i() {
      e = new WeakMap
    }
    return {
      get: t, dispose: i
    }
  }
  var fx = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, px = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
  function mx(n, e, t) {
    let i = new gs, s = new fe, r = new fe, o = new ot, a = new $o({
      depthPacking: Du
    }), l = new Jo, c = {
    }, h = t.maxTextureSize, u = {
      [Wn]: Wt, [Wt]: Wn, [Dn]: Dn
    }, d = new yn({
      defines: {
        VSM_SAMPLES: 8
      }, uniforms: {
        shadow_pass: {
          value: null
        }, resolution: {
          value: new fe
        }, radius: {
          value: 4
        }
      }, vertexShader: fx, fragmentShader: px
    }), f = d.clone();
    f.defines.HORIZONTAL_PASS = 1;
    let m = new mt;
    m.setAttribute("position", new Ct(new Float32Array([ - 1, - 1, .5, 3, - 1, .5, - 1, 3, .5]), 3));
    let x = new Et(m, d), g = this;
    this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = uc;
    let p = this.type;
    this.render = function(w, P, D) {
      if (g.enabled === !1 || g.autoUpdate === !1 && g.needsUpdate === !1 || w.length === 0)return;
      let M = n.getRenderTarget(), v = n.getActiveCubeFace(), C = n.getActiveMipmapLevel(), F = n.state;
      F.setBlending(Yn), F.buffers.depth.getReversed() === !0?F.buffers.color.setClear(0, 0, 0, 0): F.buffers.color.setClear(1, 1, 1, 1), F.buffers.depth.setTest(!0), F.setScissorTest(!1);
      let z = p !== Pn && this.type === Pn, G = p === Pn && this.type !== Pn;
      for (let q = 0, W = w.length;
      q < W;
      q++) {
        let te = w[q], V = te.shadow;
        if (V === void 0) {
          console.warn("THREE.WebGLShadowMap:", te, "has no shadow.");
          continue
        }
        if (V.autoUpdate === !1 && V.needsUpdate === !1)continue;
        s.copy(V.mapSize);
        let ue = V.getFrameExtents();
        if (s.multiply(ue), r.copy(V.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / ue.x), s.x = r.x * ue.x, V.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / ue.y), s.y = r.y * ue.y, V.mapSize.y = r.y)), V.map === null || z === !0 || G === !0) {
          let Se = this.type !== Pn?{
            minFilter: Zt, magFilter: Zt
          }: {
          };
          V.map !== null && V.map.dispose(), V.map = new wn(s.x, s.y, Se), V.map.texture.name = te.name + ".shadowMap", V.camera.updateProjectionMatrix()
        }
        n.setRenderTarget(V.map), n.clear();
        let ve = V.getViewportCount();
        for (let Se = 0;
        Se < ve;
        Se++) {
          let Ge = V.getViewport(Se);
          o.set(r.x * Ge.x, r.y * Ge.y, r.x * Ge.z, r.y * Ge.w), F.viewport(o), V.updateMatrices(te, Se), i = V.getFrustum(), y(P, D, V.camera, te, this.type)
        }
        V.isPointLightShadow !== !0 && this.type === Pn && E(V, D), V.needsUpdate = !1
      }
      p = this.type, g.needsUpdate = !1, n.setRenderTarget(M, v, C)
    };
    function E(w, P) {
      let D = e.update(x);
      d.defines.VSM_SAMPLES !== w.blurSamples && (d.defines.VSM_SAMPLES = w.blurSamples, f.defines.VSM_SAMPLES = w.blurSamples, d.needsUpdate = !0, f.needsUpdate = !0), w.mapPass === null && (w.mapPass = new wn(s.x, s.y)), d.uniforms.shadow_pass.value = w.map.texture, d.uniforms.resolution.value = w.mapSize, d.uniforms.radius.value = w.radius, n.setRenderTarget(w.mapPass), n.clear(), n.renderBufferDirect(P, null, D, d, x, null), f.uniforms.shadow_pass.value = w.mapPass.texture, f.uniforms.resolution.value = w.mapSize, f.uniforms.radius.value = w.radius, n.setRenderTarget(w.map), n.clear(), n.renderBufferDirect(P, null, D, f, x, null)
    }
    function b(w, P, D, M) {
      let v = null, C = D.isPointLight === !0?w.customDistanceMaterial: w.customDepthMaterial;
      if (C !== void 0)v = C;
      else if (v = D.isPointLight === !0?l: a, n.localClippingEnabled && P.clipShadows === !0 && Array.isArray(P.clippingPlanes) && P.clippingPlanes.length !== 0 || P.displacementMap && P.displacementScale !== 0 || P.alphaMap && P.alphaTest > 0 || P.map && P.alphaTest > 0 || P.alphaToCoverage === !0) {
        let F = v.uuid, z = P.uuid, G = c[F];
        G === void 0 && (G = {
        }, c[F] = G);
        let q = G[z];
        q === void 0 && (q = v.clone(), G[z] = q, P.addEventListener("dispose", R)), v = q
      }
      if (v.visible = P.visible, v.wireframe = P.wireframe, M === Pn?v.side = P.shadowSide !== null?P.shadowSide: P.side: v.side = P.shadowSide !== null?P.shadowSide: u[P.side], v.alphaMap = P.alphaMap, v.alphaTest = P.alphaToCoverage === !0?.5: P.alphaTest, v.map = P.map, v.clipShadows = P.clipShadows, v.clippingPlanes = P.clippingPlanes, v.clipIntersection = P.clipIntersection, v.displacementMap = P.displacementMap, v.displacementScale = P.displacementScale, v.displacementBias = P.displacementBias, v.wireframeLinewidth = P.wireframeLinewidth, v.linewidth = P.linewidth, D.isPointLight === !0 && v.isMeshDistanceMaterial === !0) {
        let F = n.properties.get(v);
        F.light = D
      }
      return v
    }
    function y(w, P, D, M, v) {
      if (w.visible === !1)return;
      if (w.layers.test(P.layers) && (w.isMesh || w.isLine || w.isPoints) && (w.castShadow || w.receiveShadow && v === Pn) && (!w.frustumCulled || i.intersectsObject(w))) {
        w.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse, w.matrixWorld);
        let z = e.update(w), G = w.material;
        if (Array.isArray(G)) {
          let q = z.groups;
          for (let W = 0, te = q.length;
          W < te;
          W++) {
            let V = q[W], ue = G[V.materialIndex];
            if (ue && ue.visible) {
              let ve = b(w, ue, M, v);
              w.onBeforeShadow(n, w, P, D, z, ve, V), n.renderBufferDirect(D, null, z, ve, w, V), w.onAfterShadow(n, w, P, D, z, ve, V)
            }
          }
        } else if (G.visible) {
          let q = b(w, G, M, v);
          w.onBeforeShadow(n, w, P, D, z, q, null), n.renderBufferDirect(D, null, z, q, w, null), w.onAfterShadow(n, w, P, D, z, q, null)
        }
      }
      let F = w.children;
      for (let z = 0, G = F.length;
      z < G;
      z++)y(F[z], P, D, M, v)
    }
    function R(w) {
      w.target.removeEventListener("dispose", R);
      for (let D in c) {
        let M = c[D], v = w.target.uuid;
        v in M && (M[v].dispose(), delete M[v])
      }
    }
  }
  var gx = {
    [la]: ca, [ha]: fa, [ua]: pa, [Ci]: da, [ca]: la, [fa]: ha, [pa]: ua, [da]: Ci
  };
  function _x(n, e) {
    function t() {
      let L = !1, ae = new ot, de = null, be = new ot(0, 0, 0, 0);
      return {
        setMask: function(re) {
          de !== re && !L && (n.colorMask(re, re, re, re), de = re)
        }, setLocked: function(re) {
          L = re
        }, setClear: function(re, K, Ce, Ve, dt) {
          dt === !0 && (re *= Ve, K *= Ve, Ce *= Ve), ae.set(re, K, Ce, Ve), be.equals(ae) === !1 && (n.clearColor(re, K, Ce, Ve), be.copy(ae))
        }, reset: function() {
          L = !1, de = null, be.set( - 1, 0, 0, 0)
        }
      }
    }
    function i() {
      let L = !1, ae = !1, de = null, be = null, re = null;
      return {
        setReversed: function(K) {
          if (ae !== K) {
            let Ce = e.get("EXT_clip_control");
            K?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT, Ce.ZERO_TO_ONE_EXT): Ce.clipControlEXT(Ce.LOWER_LEFT_EXT, Ce.NEGATIVE_ONE_TO_ONE_EXT), ae = K;
            let Ve = re;
            re = null, this.setClear(Ve)
          }
        }, getReversed: function() {
          return ae
        }, setTest: function(K) {
          K?ee(n.DEPTH_TEST): Me(n.DEPTH_TEST)
        }, setMask: function(K) {
          de !== K && !L && (n.depthMask(K), de = K)
        }, setFunc: function(K) {
          if (ae && (K = gx[K]), be !== K) {
            switch (K) {
              case la: n.depthFunc(n.NEVER);
              break;
              case ca: n.depthFunc(n.ALWAYS);
              break;
              case ha: n.depthFunc(n.LESS);
              break;
              case Ci: n.depthFunc(n.LEQUAL);
              break;
              case ua: n.depthFunc(n.EQUAL);
              break;
              case da: n.depthFunc(n.GEQUAL);
              break;
              case fa: n.depthFunc(n.GREATER);
              break;
              case pa: n.depthFunc(n.NOTEQUAL);
              break;
              default: n.depthFunc(n.LEQUAL)
            }
            be = K
          }
        }, setLocked: function(K) {
          L = K
        }, setClear: function(K) {
          re !== K && (ae && (K = 1 - K), n.clearDepth(K), re = K)
        }, reset: function() {
          L = !1, de = null, be = null, re = null, ae = !1
        }
      }
    }
    function s() {
      let L = !1, ae = null, de = null, be = null, re = null, K = null, Ce = null, Ve = null, dt = null;
      return {
        setTest: function(it) {
          L || (it?ee(n.STENCIL_TEST): Me(n.STENCIL_TEST))
        }, setMask: function(it) {
          ae !== it && !L && (n.stencilMask(it), ae = it)
        }, setFunc: function(it, On, En) {
          (de !== it || be !== On || re !== En) && (n.stencilFunc(it, On, En), de = it, be = On, re = En)
        }, setOp: function(it, On, En) {
          (K !== it || Ce !== On || Ve !== En) && (n.stencilOp(it, On, En), K = it, Ce = On, Ve = En)
        }, setLocked: function(it) {
          L = it
        }, setClear: function(it) {
          dt !== it && (n.clearStencil(it), dt = it)
        }, reset: function() {
          L = !1, ae = null, de = null, be = null, re = null, K = null, Ce = null, Ve = null, dt = null
        }
      }
    }
    let r = new t, o = new i, a = new s, l = new WeakMap, c = new WeakMap, h = {
    }, u = {
    }, d = new WeakMap, f = [], m = null, x = !1, g = null, p = null, E = null, b = null, y = null, R = null, w = null, P = new ke(0, 0, 0), D = 0, M = !1, v = null, C = null, F = null, z = null, G = null, q = n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS), W = !1, te = 0, V = n.getParameter(n.VERSION);
    V.indexOf("WebGL") !== - 1?(te = parseFloat(/^WebGL (\d)/.exec(V)[1]), W = te >= 1): V.indexOf("OpenGL ES") !== - 1 && (te = parseFloat(/^OpenGL ES (\d)/.exec(V)[1]), W = te >= 2);
    let ue = null, ve = {
    }, Se = n.getParameter(n.SCISSOR_BOX), Ge = n.getParameter(n.VIEWPORT), Ke = new ot().fromArray(Se), rt = new ot().fromArray(Ge);
    function je(L, ae, de, be) {
      let re = new Uint8Array(4), K = n.createTexture();
      n.bindTexture(L, K), n.texParameteri(L, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(L, n.TEXTURE_MAG_FILTER, n.NEAREST);
      for (let Ce = 0;
      Ce < de;
      Ce++)L === n.TEXTURE_3D || L === n.TEXTURE_2D_ARRAY?n.texImage3D(ae, 0, n.RGBA, 1, 1, be, 0, n.RGBA, n.UNSIGNED_BYTE, re): n.texImage2D(ae + Ce, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, re);
      return K
    }
    let Y = {
    };
    Y[n.TEXTURE_2D] = je(n.TEXTURE_2D, n.TEXTURE_2D, 1), Y[n.TEXTURE_CUBE_MAP] = je(n.TEXTURE_CUBE_MAP, n.TEXTURE_CUBE_MAP_POSITIVE_X, 6), Y[n.TEXTURE_2D_ARRAY] = je(n.TEXTURE_2D_ARRAY, n.TEXTURE_2D_ARRAY, 1, 1), Y[n.TEXTURE_3D] = je(n.TEXTURE_3D, n.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), o.setClear(1), a.setClear(0), ee(n.DEPTH_TEST), o.setFunc(Ci), $(!1), Z(hc), ee(n.CULL_FACE), j(Yn);
    function ee(L) {
      h[L] !== !0 && (n.enable(L), h[L] = !0)
    }
    function Me(L) {
      h[L] !== !1 && (n.disable(L), h[L] = !1)
    }
    function De(L, ae) {
      return u[L] !== ae?(n.bindFramebuffer(L, ae), u[L] = ae, L === n.DRAW_FRAMEBUFFER && (u[n.FRAMEBUFFER] = ae), L === n.FRAMEBUFFER && (u[n.DRAW_FRAMEBUFFER] = ae), !0): !1
    }
    function we(L, ae) {
      let de = f, be = !1;
      if (L) {
        de = d.get(ae), de === void 0 && (de = [], d.set(ae, de));
        let re = L.textures;
        if (de.length !== re.length || de[0] !== n.COLOR_ATTACHMENT0) {
          for (let K = 0, Ce = re.length;
          K < Ce;
          K++)de[K] = n.COLOR_ATTACHMENT0 + K;
          de.length = re.length, be = !0
        }
      } else de[0] !== n.BACK && (de[0] = n.BACK, be = !0);
      be && n.drawBuffers(de)
    }
    function Ze(L) {
      return m !== L?(n.useProgram(L), m = L, !0): !1
    }
    let ut = {
      [ai]: n.FUNC_ADD, [ru]: n.FUNC_SUBTRACT, [ou]: n.FUNC_REVERSE_SUBTRACT
    };
    ut[au] = n.MIN, ut[lu] = n.MAX;
    let A = {
      [cu]: n.ZERO, [hu]: n.ONE, [uu]: n.SRC_COLOR, [Ro]: n.SRC_ALPHA, [_u]: n.SRC_ALPHA_SATURATE, [mu]: n.DST_COLOR, [fu]: n.DST_ALPHA, [du]: n.ONE_MINUS_SRC_COLOR, [Co]: n.ONE_MINUS_SRC_ALPHA, [gu]: n.ONE_MINUS_DST_COLOR, [pu]: n.ONE_MINUS_DST_ALPHA, [xu]: n.CONSTANT_COLOR, [vu]: n.ONE_MINUS_CONSTANT_COLOR, [yu]: n.CONSTANT_ALPHA, [Mu]: n.ONE_MINUS_CONSTANT_ALPHA
    };
    function j(L, ae, de, be, re, K, Ce, Ve, dt, it) {
      if (L === Yn) {
        x === !0 && (Me(n.BLEND), x = !1);
        return
      }
      if (x === !1 && (ee(n.BLEND), x = !0), L !== su) {
        if (L !== g || it !== M) {
          if ((p !== ai || y !== ai) && (n.blendEquation(n.FUNC_ADD), p = ai, y = ai), it)switch (L) {
            case Ri: n.blendFuncSeparate(n.ONE, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
            break;
            case Ur: n.blendFunc(n.ONE, n.ONE);
            break;
            case dc: n.blendFuncSeparate(n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ZERO, n.ONE);
            break;
            case fc: n.blendFuncSeparate(n.DST_COLOR, n.ONE_MINUS_SRC_ALPHA, n.ZERO, n.ONE);
            break;
            default: console.error("THREE.WebGLState: Invalid blending: ", L);
            break
          } else switch (L) {
            case Ri: n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
            break;
            case Ur: n.blendFuncSeparate(n.SRC_ALPHA, n.ONE, n.ONE, n.ONE);
            break;
            case dc: console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
            break;
            case fc: console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
            break;
            default: console.error("THREE.WebGLState: Invalid blending: ", L);
            break
          }
          E = null, b = null, R = null, w = null, P.set(0, 0, 0), D = 0, g = L, M = it
        }
        return
      }
      re = re || ae, K = K || de, Ce = Ce || be, (ae !== p || re !== y) && (n.blendEquationSeparate(ut[ae], ut[re]), p = ae, y = re), (de !== E || be !== b || K !== R || Ce !== w) && (n.blendFuncSeparate(A[de], A[be], A[K], A[Ce]), E = de, b = be, R = K, w = Ce), (Ve.equals(P) === !1 || dt !== D) && (n.blendColor(Ve.r, Ve.g, Ve.b, dt), P.copy(Ve), D = dt), g = L, M = !1
    }
    function J(L, ae) {
      L.side === Dn?Me(n.CULL_FACE): ee(n.CULL_FACE);
      let de = L.side === Wt;
      ae && (de = !de), $(de), L.blending === Ri && L.transparent === !1?j(Yn): j(L.blending, L.blendEquation, L.blendSrc, L.blendDst, L.blendEquationAlpha, L.blendSrcAlpha, L.blendDstAlpha, L.blendColor, L.blendAlpha, L.premultipliedAlpha), o.setFunc(L.depthFunc), o.setTest(L.depthTest), o.setMask(L.depthWrite), r.setMask(L.colorWrite);
      let be = L.stencilWrite;
      a.setTest(be), be && (a.setMask(L.stencilWriteMask), a.setFunc(L.stencilFunc, L.stencilRef, L.stencilFuncMask), a.setOp(L.stencilFail, L.stencilZFail, L.stencilZPass)), ie(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits), L.alphaToCoverage === !0?ee(n.SAMPLE_ALPHA_TO_COVERAGE): Me(n.SAMPLE_ALPHA_TO_COVERAGE)
    }
    function $(L) {
      v !== L && (L?n.frontFace(n.CW): n.frontFace(n.CCW), v = L)
    }
    function Z(L) {
      L !== tu?(ee(n.CULL_FACE), L !== C && (L === hc?n.cullFace(n.BACK): L === nu?n.cullFace(n.FRONT): n.cullFace(n.FRONT_AND_BACK))): Me(n.CULL_FACE), C = L
    }
    function ce(L) {
      L !== F && (W && n.lineWidth(L), F = L)
    }
    function ie(L, ae, de) {
      L?(ee(n.POLYGON_OFFSET_FILL), (z !== ae || G !== de) && (n.polygonOffset(ae, de), z = ae, G = de)): Me(n.POLYGON_OFFSET_FILL)
    }
    function he(L) {
      L?ee(n.SCISSOR_TEST): Me(n.SCISSOR_TEST)
    }
    function He(L) {
      L === void 0 && (L = n.TEXTURE0 + q - 1), ue !== L && (n.activeTexture(L), ue = L)
    }
    function ze(L, ae, de) {
      de === void 0 && (ue === null?de = n.TEXTURE0 + q - 1: de = ue);
      let be = ve[de];
      be === void 0 && (be = {
        type: void 0, texture: void 0
      }, ve[de] = be), (be.type !== L || be.texture !== ae) && (ue !== de && (n.activeTexture(de), ue = de), n.bindTexture(L, ae || Y[L]), be.type = L, be.texture = ae)
    }
    function T() {
      let L = ve[ue];
      L !== void 0 && L.type !== void 0 && (n.bindTexture(L.type, null), L.type = void 0, L.texture = void 0)
    }
    function _() {
      try {
        n.compressedTexImage2D(...arguments)
      } catch (L) {
        console.error("THREE.WebGLState:", L)
      }
    }
    function O() {
      try {
        n.compressedTexImage3D(...arguments)
      } catch (L) {
        console.error("THREE.WebGLState:", L)
      }
    }
    function H() {
      try {
        n.texSubImage2D(...arguments)
      } catch (L) {
        console.error("THREE.WebGLState:", L)
      }
    }
    function Q() {
      try {
        n.texSubImage3D(...arguments)
      } catch (L) {
        console.error("THREE.WebGLState:", L)
      }
    }
    function X() {
      try {
        n.compressedTexSubImage2D(...arguments)
      } catch (L) {
        console.error("THREE.WebGLState:", L)
      }
    }
    function Ie() {
      try {
        n.compressedTexSubImage3D(...arguments)
      } catch (L) {
        console.error("THREE.WebGLState:", L)
      }
    }
    function le() {
      try {
        n.texStorage2D(...arguments)
      } catch (L) {
        console.error("THREE.WebGLState:", L)
      }
    }
    function Ae() {
      try {
        n.texStorage3D(...arguments)
      } catch (L) {
        console.error("THREE.WebGLState:", L)
      }
    }
    function Re() {
      try {
        n.texImage2D(...arguments)
      } catch (L) {
        console.error("THREE.WebGLState:", L)
      }
    }
    function se() {
      try {
        n.texImage3D(...arguments)
      } catch (L) {
        console.error("THREE.WebGLState:", L)
      }
    }
    function xe(L) {
      Ke.equals(L) === !1 && (n.scissor(L.x, L.y, L.z, L.w), Ke.copy(L))
    }
    function Fe(L) {
      rt.equals(L) === !1 && (n.viewport(L.x, L.y, L.z, L.w), rt.copy(L))
    }
    function Pe(L, ae) {
      let de = c.get(ae);
      de === void 0 && (de = new WeakMap, c.set(ae, de));
      let be = de.get(L);
      be === void 0 && (be = n.getUniformBlockIndex(ae, L.name), de.set(L, be))
    }
    function me(L, ae) {
      let be = c.get(ae).get(L);
      l.get(ae) !== be && (n.uniformBlockBinding(ae, be, L.__bindingPointIndex), l.set(ae, be))
    }
    function Xe() {
      n.disable(n.BLEND), n.disable(n.CULL_FACE), n.disable(n.DEPTH_TEST), n.disable(n.POLYGON_OFFSET_FILL), n.disable(n.SCISSOR_TEST), n.disable(n.STENCIL_TEST), n.disable(n.SAMPLE_ALPHA_TO_COVERAGE), n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ONE, n.ZERO), n.blendFuncSeparate(n.ONE, n.ZERO, n.ONE, n.ZERO), n.blendColor(0, 0, 0, 0), n.colorMask(!0, !0, !0, !0), n.clearColor(0, 0, 0, 0), n.depthMask(!0), n.depthFunc(n.LESS), o.setReversed(!1), n.clearDepth(1), n.stencilMask(4294967295), n.stencilFunc(n.ALWAYS, 0, 4294967295), n.stencilOp(n.KEEP, n.KEEP, n.KEEP), n.clearStencil(0), n.cullFace(n.BACK), n.frontFace(n.CCW), n.polygonOffset(0, 0), n.activeTexture(n.TEXTURE0), n.bindFramebuffer(n.FRAMEBUFFER, null), n.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), n.bindFramebuffer(n.READ_FRAMEBUFFER, null), n.useProgram(null), n.lineWidth(1), n.scissor(0, 0, n.canvas.width, n.canvas.height), n.viewport(0, 0, n.canvas.width, n.canvas.height), h = {
      }, ue = null, ve = {
      }, u = {
      }, d = new WeakMap, f = [], m = null, x = !1, g = null, p = null, E = null, b = null, y = null, R = null, w = null, P = new ke(0, 0, 0), D = 0, M = !1, v = null, C = null, F = null, z = null, G = null, Ke.set(0, 0, n.canvas.width, n.canvas.height), rt.set(0, 0, n.canvas.width, n.canvas.height), r.reset(), o.reset(), a.reset()
    }
    return {
      buffers: {
        color: r, depth: o, stencil: a
      }, enable: ee, disable: Me, bindFramebuffer: De, drawBuffers: we, useProgram: Ze, setBlending: j, setMaterial: J, setFlipSided: $, setCullFace: Z, setLineWidth: ce, setPolygonOffset: ie, setScissorTest: he, activeTexture: He, bindTexture: ze, unbindTexture: T, compressedTexImage2D: _, compressedTexImage3D: O, texImage2D: Re, texImage3D: se, updateUBOMapping: Pe, uniformBlockBinding: me, texStorage2D: le, texStorage3D: Ae, texSubImage2D: H, texSubImage3D: Q, compressedTexSubImage2D: X, compressedTexSubImage3D: Ie, scissor: xe, viewport: Fe, reset: Xe
    }
  }
  function xx(n, e, t, i, s, r, o) {
    let a = e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"): null, l = typeof navigator > "u"?!1: /OculusBrowser/g.test(navigator.userAgent), c = new fe, h = new WeakMap, u, d = new WeakMap, f = !1;
    try {
      f = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null
    } catch {
    }
    function m(T, _) {
      return f?new OffscreenCanvas(T, _): sr("canvas")
    }
    function x(T, _, O) {
      let H = 1, Q = ze(T);
      if ((Q.width > O || Q.height > O) && (H = O / Math.max(Q.width, Q.height)), H < 1)if (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && T instanceof ImageBitmap || typeof VideoFrame < "u" && T instanceof VideoFrame) {
        let X = Math.floor(H * Q.width), Ie = Math.floor(H * Q.height);
        u === void 0 && (u = m(X, Ie));
        let le = _?m(X, Ie): u;
        return le.width = X, le.height = Ie, le.getContext("2d").drawImage(T, 0, 0, X, Ie), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + Q.width + "x" + Q.height + ") to (" + X + "x" + Ie + ")."), le
      } else return "data" in T && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + Q.width + "x" + Q.height + ")."), T;
      return T
    }
    function g(T) {
      return T.generateMipmaps
    }
    function p(T) {
      n.generateMipmap(T)
    }
    function E(T) {
      return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP: T.isWebGL3DRenderTarget?n.TEXTURE_3D: T.isWebGLArrayRenderTarget || T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY: n.TEXTURE_2D
    }
    function b(T, _, O, H, Q = !1) {
      if (T !== null) {
        if (n[T] !== void 0)return n[T];
        console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + T + "'")
      }
      let X = _;
      if (_ === n.RED && (O === n.FLOAT && (X = n.R32F), O === n.HALF_FLOAT && (X = n.R16F), O === n.UNSIGNED_BYTE && (X = n.R8)), _ === n.RED_INTEGER && (O === n.UNSIGNED_BYTE && (X = n.R8UI), O === n.UNSIGNED_SHORT && (X = n.R16UI), O === n.UNSIGNED_INT && (X = n.R32UI), O === n.BYTE && (X = n.R8I), O === n.SHORT && (X = n.R16I), O === n.INT && (X = n.R32I)), _ === n.RG && (O === n.FLOAT && (X = n.RG32F), O === n.HALF_FLOAT && (X = n.RG16F), O === n.UNSIGNED_BYTE && (X = n.RG8)), _ === n.RG_INTEGER && (O === n.UNSIGNED_BYTE && (X = n.RG8UI), O === n.UNSIGNED_SHORT && (X = n.RG16UI), O === n.UNSIGNED_INT && (X = n.RG32UI), O === n.BYTE && (X = n.RG8I), O === n.SHORT && (X = n.RG16I), O === n.INT && (X = n.RG32I)), _ === n.RGB_INTEGER && (O === n.UNSIGNED_BYTE && (X = n.RGB8UI), O === n.UNSIGNED_SHORT && (X = n.RGB16UI), O === n.UNSIGNED_INT && (X = n.RGB32UI), O === n.BYTE && (X = n.RGB8I), O === n.SHORT && (X = n.RGB16I), O === n.INT && (X = n.RGB32I)), _ === n.RGBA_INTEGER && (O === n.UNSIGNED_BYTE && (X = n.RGBA8UI), O === n.UNSIGNED_SHORT && (X = n.RGBA16UI), O === n.UNSIGNED_INT && (X = n.RGBA32UI), O === n.BYTE && (X = n.RGBA8I), O === n.SHORT && (X = n.RGBA16I), O === n.INT && (X = n.RGBA32I)), _ === n.RGB && (O === n.UNSIGNED_INT_5_9_9_9_REV && (X = n.RGB9_E5), O === n.UNSIGNED_INT_10F_11F_11F_REV && (X = n.R11F_G11F_B10F)), _ === n.RGBA) {
        let Ie = Q?nr: et.getTransfer(H);
        O === n.FLOAT && (X = n.RGBA32F), O === n.HALF_FLOAT && (X = n.RGBA16F), O === n.UNSIGNED_BYTE && (X = Ie === at?n.SRGB8_ALPHA8: n.RGBA8), O === n.UNSIGNED_SHORT_4_4_4_4 && (X = n.RGBA4), O === n.UNSIGNED_SHORT_5_5_5_1 && (X = n.RGB5_A1)
      }
      return(X === n.R16F || X === n.R32F || X === n.RG16F || X === n.RG32F || X === n.RGBA16F || X === n.RGBA32F) && e.get("EXT_color_buffer_float"), X
    }
    function y(T, _) {
      let O;
      return T?_ === null || _ === pi || _ === As?O = n.DEPTH24_STENCIL8: _ === Sn?O = n.DEPTH32F_STENCIL8: _ === Ts && (O = n.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")): _ === null || _ === pi || _ === As?O = n.DEPTH_COMPONENT24: _ === Sn?O = n.DEPTH_COMPONENT32F: _ === Ts && (O = n.DEPTH_COMPONENT16), O
    }
    function R(T, _) {
      return g(T) === !0 || T.isFramebufferTexture && T.minFilter !== Zt && T.minFilter !== xn?Math.log2(Math.max(_.width, _.height)) + 1: T.mipmaps !== void 0 && T.mipmaps.length > 0?T.mipmaps.length: T.isCompressedTexture && Array.isArray(T.image)?_.mipmaps.length: 1
    }
    function w(T) {
      let _ = T.target;
      _.removeEventListener("dispose", w), D(_), _.isVideoTexture && h.delete(_)
    }
    function P(T) {
      let _ = T.target;
      _.removeEventListener("dispose", P), v(_)
    }
    function D(T) {
      let _ = i.get(T);
      if (_.__webglInit === void 0)return;
      let O = T.source, H = d.get(O);
      if (H) {
        let Q = H[_.__cacheKey];
        Q.usedTimes--, Q.usedTimes === 0 && M(T), Object.keys(H).length === 0 && d.delete(O)
      }
      i.remove(T)
    }
    function M(T) {
      let _ = i.get(T);
      n.deleteTexture(_.__webglTexture);
      let O = T.source, H = d.get(O);
      delete H[_.__cacheKey], o.memory.textures--
    }
    function v(T) {
      let _ = i.get(T);
      if (T.depthTexture && (T.depthTexture.dispose(), i.remove(T.depthTexture)), T.isWebGLCubeRenderTarget)for (let H = 0;
      H < 6;
      H++) {
        if (Array.isArray(_.__webglFramebuffer[H]))for (let Q = 0;
        Q < _.__webglFramebuffer[H].length;
        Q++)n.deleteFramebuffer(_.__webglFramebuffer[H][Q]);
        else n.deleteFramebuffer(_.__webglFramebuffer[H]);
        _.__webglDepthbuffer && n.deleteRenderbuffer(_.__webglDepthbuffer[H])
      } else {
        if (Array.isArray(_.__webglFramebuffer))for (let H = 0;
        H < _.__webglFramebuffer.length;
        H++)n.deleteFramebuffer(_.__webglFramebuffer[H]);
        else n.deleteFramebuffer(_.__webglFramebuffer);
        if (_.__webglDepthbuffer && n.deleteRenderbuffer(_.__webglDepthbuffer), _.__webglMultisampledFramebuffer && n.deleteFramebuffer(_.__webglMultisampledFramebuffer), _.__webglColorRenderbuffer)for (let H = 0;
        H < _.__webglColorRenderbuffer.length;
        H++)_.__webglColorRenderbuffer[H] && n.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);
        _.__webglDepthRenderbuffer && n.deleteRenderbuffer(_.__webglDepthRenderbuffer)
      }
      let O = T.textures;
      for (let H = 0, Q = O.length;
      H < Q;
      H++) {
        let X = i.get(O[H]);
        X.__webglTexture && (n.deleteTexture(X.__webglTexture), o.memory.textures--), i.remove(O[H])
      }
      i.remove(T)
    }
    let C = 0;
    function F() {
      C = 0
    }
    function z() {
      let T = C;
      return T >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + T + " texture units while this GPU supports only " + s.maxTextures), C += 1, T
    }
    function G(T) {
      let _ = [];
      return _.push(T.wrapS), _.push(T.wrapT), _.push(T.wrapR || 0), _.push(T.magFilter), _.push(T.minFilter), _.push(T.anisotropy), _.push(T.internalFormat), _.push(T.format), _.push(T.type), _.push(T.generateMipmaps), _.push(T.premultiplyAlpha), _.push(T.flipY), _.push(T.unpackAlignment), _.push(T.colorSpace), _.join()
    }
    function q(T, _) {
      let O = i.get(T);
      if (T.isVideoTexture && he(T), T.isRenderTargetTexture === !1 && T.isExternalTexture !== !0 && T.version > 0 && O.__version !== T.version) {
        let H = T.image;
        if (H === null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
        else if (H.complete === !1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
        else {
          Y(O, T, _);
          return
        }
      } else T.isExternalTexture && (O.__webglTexture = T.sourceTexture?T.sourceTexture: null);
      t.bindTexture(n.TEXTURE_2D, O.__webglTexture, n.TEXTURE0 + _)
    }
    function W(T, _) {
      let O = i.get(T);
      if (T.isRenderTargetTexture === !1 && T.version > 0 && O.__version !== T.version) {
        Y(O, T, _);
        return
      }
      t.bindTexture(n.TEXTURE_2D_ARRAY, O.__webglTexture, n.TEXTURE0 + _)
    }
    function te(T, _) {
      let O = i.get(T);
      if (T.isRenderTargetTexture === !1 && T.version > 0 && O.__version !== T.version) {
        Y(O, T, _);
        return
      }
      t.bindTexture(n.TEXTURE_3D, O.__webglTexture, n.TEXTURE0 + _)
    }
    function V(T, _) {
      let O = i.get(T);
      if (T.version > 0 && O.__version !== T.version) {
        ee(O, T, _);
        return
      }
      t.bindTexture(n.TEXTURE_CUBE_MAP, O.__webglTexture, n.TEXTURE0 + _)
    }
    let ue = {
      [Io]: n.REPEAT, [oi]: n.CLAMP_TO_EDGE, [Po]: n.MIRRORED_REPEAT
    }, ve = {
      [Zt]: n.NEAREST, [Iu]: n.NEAREST_MIPMAP_NEAREST, [Or]: n.NEAREST_MIPMAP_LINEAR, [xn]: n.LINEAR, [_a]: n.LINEAR_MIPMAP_NEAREST, [fi]: n.LINEAR_MIPMAP_LINEAR
    }, Se = {
      [Uu]: n.NEVER, [ku]: n.ALWAYS, [Nu]: n.LESS, [Ec]: n.LEQUAL, [Fu]: n.EQUAL, [zu]: n.GEQUAL, [Ou]: n.GREATER, [Bu]: n.NOTEQUAL
    };
    function Ge(T, _) {
      if (_.type === Sn && e.has("OES_texture_float_linear") === !1 && (_.magFilter === xn || _.magFilter === _a || _.magFilter === Or || _.magFilter === fi || _.minFilter === xn || _.minFilter === _a || _.minFilter === Or || _.minFilter === fi) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), n.texParameteri(T, n.TEXTURE_WRAP_S, ue[_.wrapS]), n.texParameteri(T, n.TEXTURE_WRAP_T, ue[_.wrapT]), (T === n.TEXTURE_3D || T === n.TEXTURE_2D_ARRAY) && n.texParameteri(T, n.TEXTURE_WRAP_R, ue[_.wrapR]), n.texParameteri(T, n.TEXTURE_MAG_FILTER, ve[_.magFilter]), n.texParameteri(T, n.TEXTURE_MIN_FILTER, ve[_.minFilter]), _.compareFunction && (n.texParameteri(T, n.TEXTURE_COMPARE_MODE, n.COMPARE_REF_TO_TEXTURE), n.texParameteri(T, n.TEXTURE_COMPARE_FUNC, Se[_.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
        if (_.magFilter === Zt || _.minFilter !== Or && _.minFilter !== fi || _.type === Sn && e.has("OES_texture_float_linear") === !1)return;
        if (_.anisotropy > 1 || i.get(_).__currentAnisotropy) {
          let O = e.get("EXT_texture_filter_anisotropic");
          n.texParameterf(T, O.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(_.anisotropy, s.getMaxAnisotropy())), i.get(_).__currentAnisotropy = _.anisotropy
        }
      }
    }
    function Ke(T, _) {
      let O = !1;
      T.__webglInit === void 0 && (T.__webglInit = !0, _.addEventListener("dispose", w));
      let H = _.source, Q = d.get(H);
      Q === void 0 && (Q = {
      }, d.set(H, Q));
      let X = G(_);
      if (X !== T.__cacheKey) {
        Q[X] === void 0 && (Q[X] = {
          texture: n.createTexture(), usedTimes: 0
        }, o.memory.textures++, O = !0), Q[X].usedTimes++;
        let Ie = Q[T.__cacheKey];
        Ie !== void 0 && (Q[T.__cacheKey].usedTimes--, Ie.usedTimes === 0 && M(_)), T.__cacheKey = X, T.__webglTexture = Q[X].texture
      }
      return O
    }
    function rt(T, _, O) {
      return Math.floor(Math.floor(T / O) / _)
    }
    function je(T, _, O, H) {
      let X = T.updateRanges;
      if (X.length === 0)t.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, _.width, _.height, O, H, _.data);
      else {
        X.sort((se, xe) => se.start - xe.start);
        let Ie = 0;
        for (let se = 1;
        se < X.length;
        se++) {
          let xe = X[Ie], Fe = X[se], Pe = xe.start + xe.count, me = rt(Fe.start, _.width, 4), Xe = rt(xe.start, _.width, 4);
          Fe.start <= Pe + 1 && me === Xe && rt(Fe.start + Fe.count - 1, _.width, 4) === me?xe.count = Math.max(xe.count, Fe.start + Fe.count - xe.start): (++Ie, X[Ie] = Fe)
        }
        X.length = Ie + 1;
        let le = n.getParameter(n.UNPACK_ROW_LENGTH), Ae = n.getParameter(n.UNPACK_SKIP_PIXELS), Re = n.getParameter(n.UNPACK_SKIP_ROWS);
        n.pixelStorei(n.UNPACK_ROW_LENGTH, _.width);
        for (let se = 0, xe = X.length;
        se < xe;
        se++) {
          let Fe = X[se], Pe = Math.floor(Fe.start / 4), me = Math.ceil(Fe.count / 4), Xe = Pe % _.width, L = Math.floor(Pe / _.width), ae = me, de = 1;
          n.pixelStorei(n.UNPACK_SKIP_PIXELS, Xe), n.pixelStorei(n.UNPACK_SKIP_ROWS, L), t.texSubImage2D(n.TEXTURE_2D, 0, Xe, L, ae, de, O, H, _.data)
        }
        T.clearUpdateRanges(), n.pixelStorei(n.UNPACK_ROW_LENGTH, le), n.pixelStorei(n.UNPACK_SKIP_PIXELS, Ae), n.pixelStorei(n.UNPACK_SKIP_ROWS, Re)
      }
    }
    function Y(T, _, O) {
      let H = n.TEXTURE_2D;
      (_.isDataArrayTexture || _.isCompressedArrayTexture) && (H = n.TEXTURE_2D_ARRAY), _.isData3DTexture && (H = n.TEXTURE_3D);
      let Q = Ke(T, _), X = _.source;
      t.bindTexture(H, T.__webglTexture, n.TEXTURE0 + O);
      let Ie = i.get(X);
      if (X.version !== Ie.__version || Q === !0) {
        t.activeTexture(n.TEXTURE0 + O);
        let le = et.getPrimaries(et.workingColorSpace), Ae = _.colorSpace === $n?null: et.getPrimaries(_.colorSpace), Re = _.colorSpace === $n || le === Ae?n.NONE: n.BROWSER_DEFAULT_WEBGL;
        n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, _.flipY), n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), n.pixelStorei(n.UNPACK_ALIGNMENT, _.unpackAlignment), n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, Re);
        let se = x(_.image, !1, s.maxTextureSize);
        se = He(_, se);
        let xe = r.convert(_.format, _.colorSpace), Fe = r.convert(_.type), Pe = b(_.internalFormat, xe, Fe, _.colorSpace, _.isVideoTexture);
        Ge(H, _);
        let me, Xe = _.mipmaps, L = _.isVideoTexture !== !0, ae = Ie.__version === void 0 || Q === !0, de = X.dataReady, be = R(_, se);
        if (_.isDepthTexture)Pe = y(_.format === Rs, _.type), ae && (L?t.texStorage2D(n.TEXTURE_2D, 1, Pe, se.width, se.height): t.texImage2D(n.TEXTURE_2D, 0, Pe, se.width, se.height, 0, xe, Fe, null));
        else if (_.isDataTexture)if (Xe.length > 0) {
          L && ae && t.texStorage2D(n.TEXTURE_2D, be, Pe, Xe[0].width, Xe[0].height);
          for (let re = 0, K = Xe.length;
          re < K;
          re++)me = Xe[re], L?de && t.texSubImage2D(n.TEXTURE_2D, re, 0, 0, me.width, me.height, xe, Fe, me.data): t.texImage2D(n.TEXTURE_2D, re, Pe, me.width, me.height, 0, xe, Fe, me.data);
          _.generateMipmaps = !1
        } else L?(ae && t.texStorage2D(n.TEXTURE_2D, be, Pe, se.width, se.height), de && je(_, se, xe, Fe)): t.texImage2D(n.TEXTURE_2D, 0, Pe, se.width, se.height, 0, xe, Fe, se.data);
        else if (_.isCompressedTexture)if (_.isCompressedArrayTexture) {
          L && ae && t.texStorage3D(n.TEXTURE_2D_ARRAY, be, Pe, Xe[0].width, Xe[0].height, se.depth);
          for (let re = 0, K = Xe.length;
          re < K;
          re++)if (me = Xe[re], _.format !== hn)if (xe !== null)if (L) {
            if (de)if (_.layerUpdates.size > 0) {
              let Ce = Dc(me.width, me.height, _.format, _.type);
              for (let Ve of _.layerUpdates) {
                let dt = me.data.subarray(Ve * Ce / me.data.BYTES_PER_ELEMENT, (Ve + 1) * Ce / me.data.BYTES_PER_ELEMENT);
                t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY, re, 0, 0, Ve, me.width, me.height, 1, xe, dt)
              }
              _.clearLayerUpdates()
            } else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY, re, 0, 0, 0, me.width, me.height, se.depth, xe, me.data)
          } else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY, re, Pe, me.width, me.height, se.depth, 0, me.data, 0, 0);
          else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else L?de && t.texSubImage3D(n.TEXTURE_2D_ARRAY, re, 0, 0, 0, me.width, me.height, se.depth, xe, Fe, me.data): t.texImage3D(n.TEXTURE_2D_ARRAY, re, Pe, me.width, me.height, se.depth, 0, xe, Fe, me.data)
        } else {
          L && ae && t.texStorage2D(n.TEXTURE_2D, be, Pe, Xe[0].width, Xe[0].height);
          for (let re = 0, K = Xe.length;
          re < K;
          re++)me = Xe[re], _.format !== hn?xe !== null?L?de && t.compressedTexSubImage2D(n.TEXTURE_2D, re, 0, 0, me.width, me.height, xe, me.data): t.compressedTexImage2D(n.TEXTURE_2D, re, Pe, me.width, me.height, 0, me.data): console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"): L?de && t.texSubImage2D(n.TEXTURE_2D, re, 0, 0, me.width, me.height, xe, Fe, me.data): t.texImage2D(n.TEXTURE_2D, re, Pe, me.width, me.height, 0, xe, Fe, me.data)
        } else if (_.isDataArrayTexture)if (L) {
          if (ae && t.texStorage3D(n.TEXTURE_2D_ARRAY, be, Pe, se.width, se.height, se.depth), de)if (_.layerUpdates.size > 0) {
            let re = Dc(se.width, se.height, _.format, _.type);
            for (let K of _.layerUpdates) {
              let Ce = se.data.subarray(K * re / se.data.BYTES_PER_ELEMENT, (K + 1) * re / se.data.BYTES_PER_ELEMENT);
              t.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, K, se.width, se.height, 1, xe, Fe, Ce)
            }
            _.clearLayerUpdates()
          } else t.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, 0, se.width, se.height, se.depth, xe, Fe, se.data)
        } else t.texImage3D(n.TEXTURE_2D_ARRAY, 0, Pe, se.width, se.height, se.depth, 0, xe, Fe, se.data);
        else if (_.isData3DTexture)L?(ae && t.texStorage3D(n.TEXTURE_3D, be, Pe, se.width, se.height, se.depth), de && t.texSubImage3D(n.TEXTURE_3D, 0, 0, 0, 0, se.width, se.height, se.depth, xe, Fe, se.data)): t.texImage3D(n.TEXTURE_3D, 0, Pe, se.width, se.height, se.depth, 0, xe, Fe, se.data);
        else if (_.isFramebufferTexture) {
          if (ae)if (L)t.texStorage2D(n.TEXTURE_2D, be, Pe, se.width, se.height);
          else {
            let re = se.width, K = se.height;
            for (let Ce = 0;
            Ce < be;
            Ce++)t.texImage2D(n.TEXTURE_2D, Ce, Pe, re, K, 0, xe, Fe, null), re >>= 1, K >>= 1
          }
        } else if (Xe.length > 0) {
          if (L && ae) {
            let re = ze(Xe[0]);
            t.texStorage2D(n.TEXTURE_2D, be, Pe, re.width, re.height)
          }
          for (let re = 0, K = Xe.length;
          re < K;
          re++)me = Xe[re], L?de && t.texSubImage2D(n.TEXTURE_2D, re, 0, 0, xe, Fe, me): t.texImage2D(n.TEXTURE_2D, re, Pe, xe, Fe, me);
          _.generateMipmaps = !1
        } else if (L) {
          if (ae) {
            let re = ze(se);
            t.texStorage2D(n.TEXTURE_2D, be, Pe, re.width, re.height)
          }
          de && t.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, xe, Fe, se)
        } else t.texImage2D(n.TEXTURE_2D, 0, Pe, xe, Fe, se);
        g(_) && p(H), Ie.__version = X.version, _.onUpdate && _.onUpdate(_)
      }
      T.__version = _.version
    }
    function ee(T, _, O) {
      if (_.image.length !== 6)return;
      let H = Ke(T, _), Q = _.source;
      t.bindTexture(n.TEXTURE_CUBE_MAP, T.__webglTexture, n.TEXTURE0 + O);
      let X = i.get(Q);
      if (Q.version !== X.__version || H === !0) {
        t.activeTexture(n.TEXTURE0 + O);
        let Ie = et.getPrimaries(et.workingColorSpace), le = _.colorSpace === $n?null: et.getPrimaries(_.colorSpace), Ae = _.colorSpace === $n || Ie === le?n.NONE: n.BROWSER_DEFAULT_WEBGL;
        n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, _.flipY), n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), n.pixelStorei(n.UNPACK_ALIGNMENT, _.unpackAlignment), n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ae);
        let Re = _.isCompressedTexture || _.image[0].isCompressedTexture, se = _.image[0] && _.image[0].isDataTexture, xe = [];
        for (let K = 0;
        K < 6;
        K++)!Re && !se?xe[K] = x(_.image[K], !0, s.maxCubemapSize): xe[K] = se?_.image[K].image: _.image[K], xe[K] = He(_, xe[K]);
        let Fe = xe[0], Pe = r.convert(_.format, _.colorSpace), me = r.convert(_.type), Xe = b(_.internalFormat, Pe, me, _.colorSpace), L = _.isVideoTexture !== !0, ae = X.__version === void 0 || H === !0, de = Q.dataReady, be = R(_, Fe);
        Ge(n.TEXTURE_CUBE_MAP, _);
        let re;
        if (Re) {
          L && ae && t.texStorage2D(n.TEXTURE_CUBE_MAP, be, Xe, Fe.width, Fe.height);
          for (let K = 0;
          K < 6;
          K++) {
            re = xe[K].mipmaps;
            for (let Ce = 0;
            Ce < re.length;
            Ce++) {
              let Ve = re[Ce];
              _.format !== hn?Pe !== null?L?de && t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, Ce, 0, 0, Ve.width, Ve.height, Pe, Ve.data): t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, Ce, Xe, Ve.width, Ve.height, 0, Ve.data): console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"): L?de && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, Ce, 0, 0, Ve.width, Ve.height, Pe, me, Ve.data): t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, Ce, Xe, Ve.width, Ve.height, 0, Pe, me, Ve.data)
            }
          }
        } else {
          if (re = _.mipmaps, L && ae) {
            re.length > 0 && be++;
            let K = ze(xe[0]);
            t.texStorage2D(n.TEXTURE_CUBE_MAP, be, Xe, K.width, K.height)
          }
          for (let K = 0;
          K < 6;
          K++)if (se) {
            L?de && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, xe[K].width, xe[K].height, Pe, me, xe[K].data): t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, Xe, xe[K].width, xe[K].height, 0, Pe, me, xe[K].data);
            for (let Ce = 0;
            Ce < re.length;
            Ce++) {
              let dt = re[Ce].image[K].image;
              L?de && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, Ce + 1, 0, 0, dt.width, dt.height, Pe, me, dt.data): t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, Ce + 1, Xe, dt.width, dt.height, 0, Pe, me, dt.data)
            }
          } else {
            L?de && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, Pe, me, xe[K]): t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, Xe, Pe, me, xe[K]);
            for (let Ce = 0;
            Ce < re.length;
            Ce++) {
              let Ve = re[Ce];
              L?de && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, Ce + 1, 0, 0, Pe, me, Ve.image[K]): t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + K, Ce + 1, Xe, Pe, me, Ve.image[K])
            }
          }
        }
        g(_) && p(n.TEXTURE_CUBE_MAP), X.__version = Q.version, _.onUpdate && _.onUpdate(_)
      }
      T.__version = _.version
    }
    function Me(T, _, O, H, Q, X) {
      let Ie = r.convert(O.format, O.colorSpace), le = r.convert(O.type), Ae = b(O.internalFormat, Ie, le, O.colorSpace), Re = i.get(_), se = i.get(O);
      if (se.__renderTarget = _, !Re.__hasExternalTextures) {
        let xe = Math.max(1, _.width >> X), Fe = Math.max(1, _.height >> X);
        Q === n.TEXTURE_3D || Q === n.TEXTURE_2D_ARRAY?t.texImage3D(Q, X, Ae, xe, Fe, _.depth, 0, Ie, le, null): t.texImage2D(Q, X, Ae, xe, Fe, 0, Ie, le, null)
      }
      t.bindFramebuffer(n.FRAMEBUFFER, T), ie(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, H, Q, se.__webglTexture, 0, ce(_)): (Q === n.TEXTURE_2D || Q >= n.TEXTURE_CUBE_MAP_POSITIVE_X && Q <= n.TEXTURE_CUBE_MAP_NEGATIVE_Z) && n.framebufferTexture2D(n.FRAMEBUFFER, H, Q, se.__webglTexture, X), t.bindFramebuffer(n.FRAMEBUFFER, null)
    }
    function De(T, _, O) {
      if (n.bindRenderbuffer(n.RENDERBUFFER, T), _.depthBuffer) {
        let H = _.depthTexture, Q = H && H.isDepthTexture?H.type: null, X = y(_.stencilBuffer, Q), Ie = _.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT: n.DEPTH_ATTACHMENT, le = ce(_);
        ie(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, le, X, _.width, _.height): O?n.renderbufferStorageMultisample(n.RENDERBUFFER, le, X, _.width, _.height): n.renderbufferStorage(n.RENDERBUFFER, X, _.width, _.height), n.framebufferRenderbuffer(n.FRAMEBUFFER, Ie, n.RENDERBUFFER, T)
      } else {
        let H = _.textures;
        for (let Q = 0;
        Q < H.length;
        Q++) {
          let X = H[Q], Ie = r.convert(X.format, X.colorSpace), le = r.convert(X.type), Ae = b(X.internalFormat, Ie, le, X.colorSpace), Re = ce(_);
          O && ie(_) === !1?n.renderbufferStorageMultisample(n.RENDERBUFFER, Re, Ae, _.width, _.height): ie(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, Re, Ae, _.width, _.height): n.renderbufferStorage(n.RENDERBUFFER, Ae, _.width, _.height)
        }
      }
      n.bindRenderbuffer(n.RENDERBUFFER, null)
    }
    function we(T, _) {
      if (_ && _.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");
      if (t.bindFramebuffer(n.FRAMEBUFFER, T), !(_.depthTexture && _.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
      let H = i.get(_.depthTexture);
      H.__renderTarget = _, (!H.__webglTexture || _.depthTexture.image.width !== _.width || _.depthTexture.image.height !== _.height) && (_.depthTexture.image.width = _.width, _.depthTexture.image.height = _.height, _.depthTexture.needsUpdate = !0), q(_.depthTexture, 0);
      let Q = H.__webglTexture, X = ce(_);
      if (_.depthTexture.format === as)ie(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, Q, 0, X): n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, Q, 0);
      else if (_.depthTexture.format === Rs)ie(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.TEXTURE_2D, Q, 0, X): n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.TEXTURE_2D, Q, 0);
      else throw new Error("Unknown depthTexture format")
    }
    function Ze(T) {
      let _ = i.get(T), O = T.isWebGLCubeRenderTarget === !0;
      if (_.__boundDepthTexture !== T.depthTexture) {
        let H = T.depthTexture;
        if (_.__depthDisposeCallback && _.__depthDisposeCallback(), H) {
          let Q = () => {
            delete _.__boundDepthTexture, delete _.__depthDisposeCallback, H.removeEventListener("dispose", Q)
          };
          H.addEventListener("dispose", Q), _.__depthDisposeCallback = Q
        }
        _.__boundDepthTexture = H
      }
      if (T.depthTexture && !_.__autoAllocateDepthBuffer) {
        if (O)throw new Error("target.depthTexture not supported in Cube render targets");
        let H = T.texture.mipmaps;
        H && H.length > 0?we(_.__webglFramebuffer[0], T): we(_.__webglFramebuffer, T)
      } else if (O) {
        _.__webglDepthbuffer = [];
        for (let H = 0;
        H < 6;
        H++)if (t.bindFramebuffer(n.FRAMEBUFFER, _.__webglFramebuffer[H]), _.__webglDepthbuffer[H] === void 0)_.__webglDepthbuffer[H] = n.createRenderbuffer(), De(_.__webglDepthbuffer[H], T, !1);
        else {
          let Q = T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT: n.DEPTH_ATTACHMENT, X = _.__webglDepthbuffer[H];
          n.bindRenderbuffer(n.RENDERBUFFER, X), n.framebufferRenderbuffer(n.FRAMEBUFFER, Q, n.RENDERBUFFER, X)
        }
      } else {
        let H = T.texture.mipmaps;
        if (H && H.length > 0?t.bindFramebuffer(n.FRAMEBUFFER, _.__webglFramebuffer[0]): t.bindFramebuffer(n.FRAMEBUFFER, _.__webglFramebuffer), _.__webglDepthbuffer === void 0)_.__webglDepthbuffer = n.createRenderbuffer(), De(_.__webglDepthbuffer, T, !1);
        else {
          let Q = T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT: n.DEPTH_ATTACHMENT, X = _.__webglDepthbuffer;
          n.bindRenderbuffer(n.RENDERBUFFER, X), n.framebufferRenderbuffer(n.FRAMEBUFFER, Q, n.RENDERBUFFER, X)
        }
      }
      t.bindFramebuffer(n.FRAMEBUFFER, null)
    }
    function ut(T, _, O) {
      let H = i.get(T);
      _ !== void 0 && Me(H.__webglFramebuffer, T, T.texture, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, 0), O !== void 0 && Ze(T)
    }
    function A(T) {
      let _ = T.texture, O = i.get(T), H = i.get(_);
      T.addEventListener("dispose", P);
      let Q = T.textures, X = T.isWebGLCubeRenderTarget === !0, Ie = Q.length > 1;
      if (Ie || (H.__webglTexture === void 0 && (H.__webglTexture = n.createTexture()), H.__version = _.version, o.memory.textures++), X) {
        O.__webglFramebuffer = [];
        for (let le = 0;
        le < 6;
        le++)if (_.mipmaps && _.mipmaps.length > 0) {
          O.__webglFramebuffer[le] = [];
          for (let Ae = 0;
          Ae < _.mipmaps.length;
          Ae++)O.__webglFramebuffer[le][Ae] = n.createFramebuffer()
        } else O.__webglFramebuffer[le] = n.createFramebuffer()
      } else {
        if (_.mipmaps && _.mipmaps.length > 0) {
          O.__webglFramebuffer = [];
          for (let le = 0;
          le < _.mipmaps.length;
          le++)O.__webglFramebuffer[le] = n.createFramebuffer()
        } else O.__webglFramebuffer = n.createFramebuffer();
        if (Ie)for (let le = 0, Ae = Q.length;
        le < Ae;
        le++) {
          let Re = i.get(Q[le]);
          Re.__webglTexture === void 0 && (Re.__webglTexture = n.createTexture(), o.memory.textures++)
        }
        if (T.samples > 0 && ie(T) === !1) {
          O.__webglMultisampledFramebuffer = n.createFramebuffer(), O.__webglColorRenderbuffer = [], t.bindFramebuffer(n.FRAMEBUFFER, O.__webglMultisampledFramebuffer);
          for (let le = 0;
          le < Q.length;
          le++) {
            let Ae = Q[le];
            O.__webglColorRenderbuffer[le] = n.createRenderbuffer(), n.bindRenderbuffer(n.RENDERBUFFER, O.__webglColorRenderbuffer[le]);
            let Re = r.convert(Ae.format, Ae.colorSpace), se = r.convert(Ae.type), xe = b(Ae.internalFormat, Re, se, Ae.colorSpace, T.isXRRenderTarget === !0), Fe = ce(T);
            n.renderbufferStorageMultisample(n.RENDERBUFFER, Fe, xe, T.width, T.height), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + le, n.RENDERBUFFER, O.__webglColorRenderbuffer[le])
          }
          n.bindRenderbuffer(n.RENDERBUFFER, null), T.depthBuffer && (O.__webglDepthRenderbuffer = n.createRenderbuffer(), De(O.__webglDepthRenderbuffer, T, !0)), t.bindFramebuffer(n.FRAMEBUFFER, null)
        }
      }
      if (X) {
        t.bindTexture(n.TEXTURE_CUBE_MAP, H.__webglTexture), Ge(n.TEXTURE_CUBE_MAP, _);
        for (let le = 0;
        le < 6;
        le++)if (_.mipmaps && _.mipmaps.length > 0)for (let Ae = 0;
        Ae < _.mipmaps.length;
        Ae++)Me(O.__webglFramebuffer[le][Ae], T, _, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + le, Ae);
        else Me(O.__webglFramebuffer[le], T, _, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + le, 0);
        g(_) && p(n.TEXTURE_CUBE_MAP), t.unbindTexture()
      } else if (Ie) {
        for (let le = 0, Ae = Q.length;
        le < Ae;
        le++) {
          let Re = Q[le], se = i.get(Re), xe = n.TEXTURE_2D;
          (T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (xe = T.isWebGL3DRenderTarget?n.TEXTURE_3D: n.TEXTURE_2D_ARRAY), t.bindTexture(xe, se.__webglTexture), Ge(xe, Re), Me(O.__webglFramebuffer, T, Re, n.COLOR_ATTACHMENT0 + le, xe, 0), g(Re) && p(xe)
        }
        t.unbindTexture()
      } else {
        let le = n.TEXTURE_2D;
        if ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (le = T.isWebGL3DRenderTarget?n.TEXTURE_3D: n.TEXTURE_2D_ARRAY), t.bindTexture(le, H.__webglTexture), Ge(le, _), _.mipmaps && _.mipmaps.length > 0)for (let Ae = 0;
        Ae < _.mipmaps.length;
        Ae++)Me(O.__webglFramebuffer[Ae], T, _, n.COLOR_ATTACHMENT0, le, Ae);
        else Me(O.__webglFramebuffer, T, _, n.COLOR_ATTACHMENT0, le, 0);
        g(_) && p(le), t.unbindTexture()
      }
      T.depthBuffer && Ze(T)
    }
    function j(T) {
      let _ = T.textures;
      for (let O = 0, H = _.length;
      O < H;
      O++) {
        let Q = _[O];
        if (g(Q)) {
          let X = E(T), Ie = i.get(Q).__webglTexture;
          t.bindTexture(X, Ie), p(X), t.unbindTexture()
        }
      }
    }
    let J = [], $ = [];
    function Z(T) {
      if (T.samples > 0) {
        if (ie(T) === !1) {
          let _ = T.textures, O = T.width, H = T.height, Q = n.COLOR_BUFFER_BIT, X = T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT: n.DEPTH_ATTACHMENT, Ie = i.get(T), le = _.length > 1;
          if (le)for (let Re = 0;
          Re < _.length;
          Re++)t.bindFramebuffer(n.FRAMEBUFFER, Ie.__webglMultisampledFramebuffer), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Re, n.RENDERBUFFER, null), t.bindFramebuffer(n.FRAMEBUFFER, Ie.__webglFramebuffer), n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Re, n.TEXTURE_2D, null, 0);
          t.bindFramebuffer(n.READ_FRAMEBUFFER, Ie.__webglMultisampledFramebuffer);
          let Ae = T.texture.mipmaps;
          Ae && Ae.length > 0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER, Ie.__webglFramebuffer[0]): t.bindFramebuffer(n.DRAW_FRAMEBUFFER, Ie.__webglFramebuffer);
          for (let Re = 0;
          Re < _.length;
          Re++) {
            if (T.resolveDepthBuffer && (T.depthBuffer && (Q |= n.DEPTH_BUFFER_BIT), T.stencilBuffer && T.resolveStencilBuffer && (Q |= n.STENCIL_BUFFER_BIT)), le) {
              n.framebufferRenderbuffer(n.READ_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.RENDERBUFFER, Ie.__webglColorRenderbuffer[Re]);
              let se = i.get(_[Re]).__webglTexture;
              n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, se, 0)
            }
            n.blitFramebuffer(0, 0, O, H, 0, 0, O, H, Q, n.NEAREST), l === !0 && (J.length = 0, $.length = 0, J.push(n.COLOR_ATTACHMENT0 + Re), T.depthBuffer && T.resolveDepthBuffer === !1 && (J.push(X), $.push(X), n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, $)), n.invalidateFramebuffer(n.READ_FRAMEBUFFER, J))
          }
          if (t.bindFramebuffer(n.READ_FRAMEBUFFER, null), t.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), le)for (let Re = 0;
          Re < _.length;
          Re++) {
            t.bindFramebuffer(n.FRAMEBUFFER, Ie.__webglMultisampledFramebuffer), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Re, n.RENDERBUFFER, Ie.__webglColorRenderbuffer[Re]);
            let se = i.get(_[Re]).__webglTexture;
            t.bindFramebuffer(n.FRAMEBUFFER, Ie.__webglFramebuffer), n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Re, n.TEXTURE_2D, se, 0)
          }
          t.bindFramebuffer(n.DRAW_FRAMEBUFFER, Ie.__webglMultisampledFramebuffer)
        } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && l) {
          let _ = T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT: n.DEPTH_ATTACHMENT;
          n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, [_])
        }
      }
    }
    function ce(T) {
      return Math.min(s.maxSamples, T.samples)
    }
    function ie(T) {
      let _ = i.get(T);
      return T.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && _.__useRenderToTexture !== !1
    }
    function he(T) {
      let _ = o.render.frame;
      h.get(T) !== _ && (h.set(T, _), T.update())
    }
    function He(T, _) {
      let O = T.colorSpace, H = T.format, Q = T.type;
      return T.isCompressedTexture === !0 || T.isVideoTexture === !0 || O !== Ii && O !== $n && (et.getTransfer(O) === at?(H !== hn || Q !== Mn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."): console.error("THREE.WebGLTextures: Unsupported texture color space:", O)), _
    }
    function ze(T) {
      return typeof HTMLImageElement < "u" && T instanceof HTMLImageElement?(c.width = T.naturalWidth || T.width, c.height = T.naturalHeight || T.height): typeof VideoFrame < "u" && T instanceof VideoFrame?(c.width = T.displayWidth, c.height = T.displayHeight): (c.width = T.width, c.height = T.height), c
    }
    this.allocateTextureUnit = z, this.resetTextureUnits = F, this.setTexture2D = q, this.setTexture2DArray = W, this.setTexture3D = te, this.setTextureCube = V, this.rebindTextures = ut, this.setupRenderTarget = A, this.updateRenderTargetMipmap = j, this.updateMultisampleRenderTarget = Z, this.setupDepthRenderbuffer = Ze, this.setupFrameBufferTexture = Me, this.useMultisampledRTT = ie
  }
  function vx(n, e) {
    function t(i, s = $n) {
      let r, o = et.getTransfer(s);
      if (i === Mn)return n.UNSIGNED_BYTE;
      if (i === va)return n.UNSIGNED_SHORT_4_4_4_4;
      if (i === ya)return n.UNSIGNED_SHORT_5_5_5_1;
      if (i === xc)return n.UNSIGNED_INT_5_9_9_9_REV;
      if (i === vc)return n.UNSIGNED_INT_10F_11F_11F_REV;
      if (i === gc)return n.BYTE;
      if (i === _c)return n.SHORT;
      if (i === Ts)return n.UNSIGNED_SHORT;
      if (i === xa)return n.INT;
      if (i === pi)return n.UNSIGNED_INT;
      if (i === Sn)return n.FLOAT;
      if (i === ws)return n.HALF_FLOAT;
      if (i === yc)return n.ALPHA;
      if (i === Mc)return n.RGB;
      if (i === hn)return n.RGBA;
      if (i === as)return n.DEPTH_COMPONENT;
      if (i === Rs)return n.DEPTH_STENCIL;
      if (i === Ma)return n.RED;
      if (i === Sa)return n.RED_INTEGER;
      if (i === Sc)return n.RG;
      if (i === ba)return n.RG_INTEGER;
      if (i === Ea)return n.RGBA_INTEGER;
      if (i === Br || i === zr || i === kr || i === Hr)if (o === at)if (r = e.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
        if (i === Br)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (i === zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (i === kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (i === Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
      } else return null;
      else if (r = e.get("WEBGL_compressed_texture_s3tc"), r !== null) {
        if (i === Br)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (i === zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (i === kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (i === Hr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT
      } else return null;
      if (i === Ta || i === wa || i === Aa || i === Ra)if (r = e.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (i === Ta)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === wa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === Aa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === Ra)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
      } else return null;
      if (i === Ca || i === Ia || i === Pa)if (r = e.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (i === Ca || i === Ia)return o === at?r.COMPRESSED_SRGB8_ETC2: r.COMPRESSED_RGB8_ETC2;
        if (i === Pa)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: r.COMPRESSED_RGBA8_ETC2_EAC
      } else return null;
      if (i === Da || i === La || i === Ua || i === Na || i === Fa || i === Oa || i === Ba || i === za || i === ka || i === Ha || i === Va || i === Ga || i === Wa || i === Xa)if (r = e.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (i === Da)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR: r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === La)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR: r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === Ua)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR: r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === Na)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR: r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === Fa)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR: r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === Oa)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR: r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === Ba)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR: r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === za)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR: r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === ka)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR: r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === Ha)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR: r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === Va)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR: r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === Ga)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR: r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === Wa)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR: r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === Xa)return o === at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR: r.COMPRESSED_RGBA_ASTC_12x12_KHR
      } else return null;
      if (i === qa || i === Ya || i === Za)if (r = e.get("EXT_texture_compression_bptc"), r !== null) {
        if (i === qa)return o === at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT: r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (i === Ya)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (i === Za)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT
      } else return null;
      if (i === $a || i === Ja || i === Ka || i === Qa)if (r = e.get("EXT_texture_compression_rgtc"), r !== null) {
        if (i === $a)return r.COMPRESSED_RED_RGTC1_EXT;
        if (i === Ja)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === Ka)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === Qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT
      } else return null;
      return i === As?n.UNSIGNED_INT_24_8: n[i] !== void 0?n[i]: null
    }
    return {
      convert: t
    }
  }
  var yx = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Mx = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`, Xc = class {
    constructor() {
      this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0
    }
    init(e, t) {
      if (this.texture === null) {
        let i = new gr(e.texture);
        (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = i
      }
    }
    getMesh(e) {
      if (this.texture !== null && this.mesh === null) {
        let t = e.cameras[0].viewport, i = new yn({
          vertexShader: yx, fragmentShader: Mx, uniforms: {
            depthColor: {
              value: this.texture
            }, depthWidth: {
              value: t.z
            }, depthHeight: {
              value: t.w
            }
          }
        });
        this.mesh = new Et(new Cr(20, 20), i)
      }
      return this.mesh
    }
    reset() {
      this.texture = null, this.mesh = null
    }
    getDepthTexture() {
      return this.texture
    }
  }, qc = class extends Xn {
    constructor(e, t) {
      super();
      let i = this, s = null, r = 1, o = null, a = "local-floor", l = 1, c = null, h = null, u = null, d = null, f = null, m = null, x = typeof XRWebGLBinding < "u", g = new Xc, p = {
      }, E = t.getContextAttributes(), b = null, y = null, R = [], w = [], P = new fe, D = null, M = new Rt;
      M.viewport = new ot;
      let v = new Rt;
      v.viewport = new ot;
      let C = [M, v], F = new aa, z = null, G = null;
      this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Y) {
        let ee = R[Y];
        return ee === void 0 && (ee = new ds, R[Y] = ee), ee.getTargetRaySpace()
      }, this.getControllerGrip = function(Y) {
        let ee = R[Y];
        return ee === void 0 && (ee = new ds, R[Y] = ee), ee.getGripSpace()
      }, this.getHand = function(Y) {
        let ee = R[Y];
        return ee === void 0 && (ee = new ds, R[Y] = ee), ee.getHandSpace()
      };
      function q(Y) {
        let ee = w.indexOf(Y.inputSource);
        if (ee === - 1)return;
        let Me = R[ee];
        Me !== void 0 && (Me.update(Y.inputSource, Y.frame, c || o), Me.dispatchEvent({
          type: Y.type, data: Y.inputSource
        }))
      }
      function W() {
        s.removeEventListener("select", q), s.removeEventListener("selectstart", q), s.removeEventListener("selectend", q), s.removeEventListener("squeeze", q), s.removeEventListener("squeezestart", q), s.removeEventListener("squeezeend", q), s.removeEventListener("end", W), s.removeEventListener("inputsourceschange", te);
        for (let Y = 0;
        Y < R.length;
        Y++) {
          let ee = w[Y];
          ee !== null && (w[Y] = null, R[Y].disconnect(ee))
        }
        z = null, G = null, g.reset();
        for (let Y in p)delete p[Y];
        e.setRenderTarget(b), f = null, d = null, u = null, s = null, y = null, je.stop(), i.isPresenting = !1, e.setPixelRatio(D), e.setSize(P.width, P.height, !1), i.dispatchEvent({
          type: "sessionend"
        })
      }
      this.setFramebufferScaleFactor = function(Y) {
        r = Y, i.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")
      }, this.setReferenceSpaceType = function(Y) {
        a = Y, i.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")
      }, this.getReferenceSpace = function() {
        return c || o
      }, this.setReferenceSpace = function(Y) {
        c = Y
      }, this.getBaseLayer = function() {
        return d !== null?d: f
      }, this.getBinding = function() {
        return u === null && x && (u = new XRWebGLBinding(s, t)), u
      }, this.getFrame = function() {
        return m
      }, this.getSession = function() {
        return s
      }, this.setSession = async function(Y) {
        if (s = Y, s !== null) {
          if (b = e.getRenderTarget(), s.addEventListener("select", q), s.addEventListener("selectstart", q), s.addEventListener("selectend", q), s.addEventListener("squeeze", q), s.addEventListener("squeezestart", q), s.addEventListener("squeezeend", q), s.addEventListener("end", W), s.addEventListener("inputsourceschange", te), E.xrCompatible !== !0 && await t.makeXRCompatible(), D = e.getPixelRatio(), e.getSize(P), x && "createProjectionLayer" in XRWebGLBinding.prototype) {
            let Me = null, De = null, we = null;
            E.depth && (we = E.stencil?t.DEPTH24_STENCIL8: t.DEPTH_COMPONENT24, Me = E.stencil?Rs: as, De = E.stencil?As: pi);
            let Ze = {
              colorFormat: t.RGBA8, depthFormat: we, scaleFactor: r
            };
            u = this.getBinding(), d = u.createProjectionLayer(Ze), s.updateRenderState({
              layers: [d]
            }), e.setPixelRatio(1), e.setSize(d.textureWidth, d.textureHeight, !1), y = new wn(d.textureWidth, d.textureHeight, {
              format: hn, type: Mn, depthTexture: new mr(d.textureWidth, d.textureHeight, De, void 0, void 0, void 0, void 0, void 0, void 0, Me), stencilBuffer: E.stencil, colorSpace: e.outputColorSpace, samples: E.antialias?4: 0, resolveDepthBuffer: d.ignoreDepthValues === !1, resolveStencilBuffer: d.ignoreDepthValues === !1
            })
          } else {
            let Me = {
              antialias: E.antialias, alpha: !0, depth: E.depth, stencil: E.stencil, framebufferScaleFactor: r
            };
            f = new XRWebGLLayer(s, t, Me), s.updateRenderState({
              baseLayer: f
            }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, !1), y = new wn(f.framebufferWidth, f.framebufferHeight, {
              format: hn, type: Mn, colorSpace: e.outputColorSpace, stencilBuffer: E.stencil, resolveDepthBuffer: f.ignoreDepthValues === !1, resolveStencilBuffer: f.ignoreDepthValues === !1
            })
          }
          y.isXRRenderTarget = !0, this.setFoveation(l), c = null, o = await s.requestReferenceSpace(a), je.setContext(s), je.start(), i.isPresenting = !0, i.dispatchEvent({
            type: "sessionstart"
          })
        }
      }, this.getEnvironmentBlendMode = function() {
        if (s !== null)return s.environmentBlendMode
      }, this.getDepthTexture = function() {
        return g.getDepthTexture()
      };
      function te(Y) {
        for (let ee = 0;
        ee < Y.removed.length;
        ee++) {
          let Me = Y.removed[ee], De = w.indexOf(Me);
          De >= 0 && (w[De] = null, R[De].disconnect(Me))
        }
        for (let ee = 0;
        ee < Y.added.length;
        ee++) {
          let Me = Y.added[ee], De = w.indexOf(Me);
          if (De === - 1) {
            for (let Ze = 0;
            Ze < R.length;
            Ze++)if (Ze >= w.length) {
              w.push(Me), De = Ze;
              break
            } else if (w[Ze] === null) {
              w[Ze] = Me, De = Ze;
              break
            }
            if (De === - 1)break
          }
          let we = R[De];
          we && we.connect(Me)
        }
      }
      let V = new I, ue = new I;
      function ve(Y, ee, Me) {
        V.setFromMatrixPosition(ee.matrixWorld), ue.setFromMatrixPosition(Me.matrixWorld);
        let De = V.distanceTo(ue), we = ee.projectionMatrix.elements, Ze = Me.projectionMatrix.elements, ut = we[14] / (we[10] - 1), A = we[14] / (we[10] + 1), j = (we[9] + 1) / we[5], J = (we[9] - 1) / we[5], $ = (we[8] - 1) / we[0], Z = (Ze[8] + 1) / Ze[0], ce = ut * $, ie = ut * Z, he = De / ( - $ + Z), He = he * - $;
        if (ee.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(He), Y.translateZ(he), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), we[10] === - 1)Y.projectionMatrix.copy(ee.projectionMatrix), Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse);
        else {
          let ze = ut + he, T = A + he, _ = ce - He, O = ie + (De - He), H = j * A / T * ze, Q = J * A / T * ze;
          Y.projectionMatrix.makePerspective(_, O, H, Q, ze, T), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()
        }
      }
      function Se(Y, ee) {
        ee === null?Y.matrixWorld.copy(Y.matrix): Y.matrixWorld.multiplyMatrices(ee.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert()
      }
      this.updateCamera = function(Y) {
        if (s === null)return;
        let ee = Y.near, Me = Y.far;
        g.texture !== null && (g.depthNear > 0 && (ee = g.depthNear), g.depthFar > 0 && (Me = g.depthFar)), F.near = v.near = M.near = ee, F.far = v.far = M.far = Me, (z !== F.near || G !== F.far) && (s.updateRenderState({
          depthNear: F.near, depthFar: F.far
        }), z = F.near, G = F.far), F.layers.mask = Y.layers.mask | 6, M.layers.mask = F.layers.mask & 3, v.layers.mask = F.layers.mask & 5;
        let De = Y.parent, we = F.cameras;
        Se(F, De);
        for (let Ze = 0;
        Ze < we.length;
        Ze++)Se(we[Ze], De);
        we.length === 2?ve(F, M, v): F.projectionMatrix.copy(M.projectionMatrix), Ge(Y, F, De)
      };
      function Ge(Y, ee, Me) {
        Me === null?Y.matrix.copy(ee.matrixWorld): (Y.matrix.copy(Me.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(ee.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(ee.projectionMatrix), Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = ls * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1)
      }
      this.getCamera = function() {
        return F
      }, this.getFoveation = function() {
        if (!(d === null && f === null))return l
      }, this.setFoveation = function(Y) {
        l = Y, d !== null && (d.fixedFoveation = Y), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = Y)
      }, this.hasDepthSensing = function() {
        return g.texture !== null
      }, this.getDepthSensingMesh = function() {
        return g.getMesh(F)
      }, this.getCameraTexture = function(Y) {
        return p[Y]
      };
      let Ke = null;
      function rt(Y, ee) {
        if (h = ee.getViewerPose(c || o), m = ee, h !== null) {
          let Me = h.views;
          f !== null && (e.setRenderTargetFramebuffer(y, f.framebuffer), e.setRenderTarget(y));
          let De = !1;
          Me.length !== F.cameras.length && (F.cameras.length = 0, De = !0);
          for (let A = 0;
          A < Me.length;
          A++) {
            let j = Me[A], J = null;
            if (f !== null)J = f.getViewport(j);
            else {
              let Z = u.getViewSubImage(d, j);
              J = Z.viewport, A === 0 && (e.setRenderTargetTextures(y, Z.colorTexture, Z.depthStencilTexture), e.setRenderTarget(y))
            }
            let $ = C[A];
            $ === void 0 && ($ = new Rt, $.layers.enable(A), $.viewport = new ot, C[A] = $), $.matrix.fromArray(j.transform.matrix), $.matrix.decompose($.position, $.quaternion, $.scale), $.projectionMatrix.fromArray(j.projectionMatrix), $.projectionMatrixInverse.copy($.projectionMatrix).invert(), $.viewport.set(J.x, J.y, J.width, J.height), A === 0 && (F.matrix.copy($.matrix), F.matrix.decompose(F.position, F.quaternion, F.scale)), De === !0 && F.cameras.push($)
          }
          let we = s.enabledFeatures;
          if (we && we.includes("depth-sensing") && s.depthUsage == "gpu-optimized" && x) {
            u = i.getBinding();
            let A = u.getDepthInformation(Me[0]);
            A && A.isValid && A.texture && g.init(A, s.renderState)
          }
          if (we && we.includes("camera-access") && x) {
            e.state.unbindTexture(), u = i.getBinding();
            for (let A = 0;
            A < Me.length;
            A++) {
              let j = Me[A].camera;
              if (j) {
                let J = p[j];
                J || (J = new gr, p[j] = J);
                let $ = u.getCameraImage(j);
                J.sourceTexture = $
              }
            }
          }
        }
        for (let Me = 0;
        Me < R.length;
        Me++) {
          let De = w[Me], we = R[Me];
          De !== null && we !== void 0 && we.update(De, ee, c || o)
        }
        Ke && Ke(Y, ee), ee.detectedPlanes && i.dispatchEvent({
          type: "planesdetected", data: ee
        }), m = null
      }
      let je = new vd;
      je.setAnimationLoop(rt), this.setAnimationLoop = function(Y) {
        Ke = Y
      }, this.dispose = function() {
      }
    }
  }, zi = new vn, Sx = new nt;
  function bx(n, e) {
    function t(g, p) {
      g.matrixAutoUpdate === !0 && g.updateMatrix(), p.value.copy(g.matrix)
    }
    function i(g, p) {
      p.color.getRGB(g.fogColor.value, Rc(n)), p.isFog?(g.fogNear.value = p.near, g.fogFar.value = p.far): p.isFogExp2 && (g.fogDensity.value = p.density)
    }
    function s(g, p, E, b, y) {
      p.isMeshBasicMaterial || p.isMeshLambertMaterial?r(g, p): p.isMeshToonMaterial?(r(g, p), u(g, p)): p.isMeshPhongMaterial?(r(g, p), h(g, p)): p.isMeshStandardMaterial?(r(g, p), d(g, p), p.isMeshPhysicalMaterial && f(g, p, y)): p.isMeshMatcapMaterial?(r(g, p), m(g, p)): p.isMeshDepthMaterial?r(g, p): p.isMeshDistanceMaterial?(r(g, p), x(g, p)): p.isMeshNormalMaterial?r(g, p): p.isLineBasicMaterial?(o(g, p), p.isLineDashedMaterial && a(g, p)): p.isPointsMaterial?l(g, p, E, b): p.isSpriteMaterial?c(g, p): p.isShadowMaterial?(g.color.value.copy(p.color), g.opacity.value = p.opacity): p.isShaderMaterial && (p.uniformsNeedUpdate = !1)
    }
    function r(g, p) {
      g.opacity.value = p.opacity, p.color && g.diffuse.value.copy(p.color), p.emissive && g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity), p.map && (g.map.value = p.map, t(p.map, g.mapTransform)), p.alphaMap && (g.alphaMap.value = p.alphaMap, t(p.alphaMap, g.alphaMapTransform)), p.bumpMap && (g.bumpMap.value = p.bumpMap, t(p.bumpMap, g.bumpMapTransform), g.bumpScale.value = p.bumpScale, p.side === Wt && (g.bumpScale.value *= - 1)), p.normalMap && (g.normalMap.value = p.normalMap, t(p.normalMap, g.normalMapTransform), g.normalScale.value.copy(p.normalScale), p.side === Wt && g.normalScale.value.negate()), p.displacementMap && (g.displacementMap.value = p.displacementMap, t(p.displacementMap, g.displacementMapTransform), g.displacementScale.value = p.displacementScale, g.displacementBias.value = p.displacementBias), p.emissiveMap && (g.emissiveMap.value = p.emissiveMap, t(p.emissiveMap, g.emissiveMapTransform)), p.specularMap && (g.specularMap.value = p.specularMap, t(p.specularMap, g.specularMapTransform)), p.alphaTest > 0 && (g.alphaTest.value = p.alphaTest);
      let E = e.get(p), b = E.envMap, y = E.envMapRotation;
      b && (g.envMap.value = b, zi.copy(y), zi.x *= - 1, zi.y *= - 1, zi.z *= - 1, b.isCubeTexture && b.isRenderTargetTexture === !1 && (zi.y *= - 1, zi.z *= - 1), g.envMapRotation.value.setFromMatrix4(Sx.makeRotationFromEuler(zi)), g.flipEnvMap.value = b.isCubeTexture && b.isRenderTargetTexture === !1? - 1: 1, g.reflectivity.value = p.reflectivity, g.ior.value = p.ior, g.refractionRatio.value = p.refractionRatio), p.lightMap && (g.lightMap.value = p.lightMap, g.lightMapIntensity.value = p.lightMapIntensity, t(p.lightMap, g.lightMapTransform)), p.aoMap && (g.aoMap.value = p.aoMap, g.aoMapIntensity.value = p.aoMapIntensity, t(p.aoMap, g.aoMapTransform))
    }
    function o(g, p) {
      g.diffuse.value.copy(p.color), g.opacity.value = p.opacity, p.map && (g.map.value = p.map, t(p.map, g.mapTransform))
    }
    function a(g, p) {
      g.dashSize.value = p.dashSize, g.totalSize.value = p.dashSize + p.gapSize, g.scale.value = p.scale
    }
    function l(g, p, E, b) {
      g.diffuse.value.copy(p.color), g.opacity.value = p.opacity, g.size.value = p.size * E, g.scale.value = b * .5, p.map && (g.map.value = p.map, t(p.map, g.uvTransform)), p.alphaMap && (g.alphaMap.value = p.alphaMap, t(p.alphaMap, g.alphaMapTransform)), p.alphaTest > 0 && (g.alphaTest.value = p.alphaTest)
    }
    function c(g, p) {
      g.diffuse.value.copy(p.color), g.opacity.value = p.opacity, g.rotation.value = p.rotation, p.map && (g.map.value = p.map, t(p.map, g.mapTransform)), p.alphaMap && (g.alphaMap.value = p.alphaMap, t(p.alphaMap, g.alphaMapTransform)), p.alphaTest > 0 && (g.alphaTest.value = p.alphaTest)
    }
    function h(g, p) {
      g.specular.value.copy(p.specular), g.shininess.value = Math.max(p.shininess, 1e-4)
    }
    function u(g, p) {
      p.gradientMap && (g.gradientMap.value = p.gradientMap)
    }
    function d(g, p) {
      g.metalness.value = p.metalness, p.metalnessMap && (g.metalnessMap.value = p.metalnessMap, t(p.metalnessMap, g.metalnessMapTransform)), g.roughness.value = p.roughness, p.roughnessMap && (g.roughnessMap.value = p.roughnessMap, t(p.roughnessMap, g.roughnessMapTransform)), p.envMap && (g.envMapIntensity.value = p.envMapIntensity)
    }
    function f(g, p, E) {
      g.ior.value = p.ior, p.sheen > 0 && (g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen), g.sheenRoughness.value = p.sheenRoughness, p.sheenColorMap && (g.sheenColorMap.value = p.sheenColorMap, t(p.sheenColorMap, g.sheenColorMapTransform)), p.sheenRoughnessMap && (g.sheenRoughnessMap.value = p.sheenRoughnessMap, t(p.sheenRoughnessMap, g.sheenRoughnessMapTransform))), p.clearcoat > 0 && (g.clearcoat.value = p.clearcoat, g.clearcoatRoughness.value = p.clearcoatRoughness, p.clearcoatMap && (g.clearcoatMap.value = p.clearcoatMap, t(p.clearcoatMap, g.clearcoatMapTransform)), p.clearcoatRoughnessMap && (g.clearcoatRoughnessMap.value = p.clearcoatRoughnessMap, t(p.clearcoatRoughnessMap, g.clearcoatRoughnessMapTransform)), p.clearcoatNormalMap && (g.clearcoatNormalMap.value = p.clearcoatNormalMap, t(p.clearcoatNormalMap, g.clearcoatNormalMapTransform), g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale), p.side === Wt && g.clearcoatNormalScale.value.negate())), p.dispersion > 0 && (g.dispersion.value = p.dispersion), p.iridescence > 0 && (g.iridescence.value = p.iridescence, g.iridescenceIOR.value = p.iridescenceIOR, g.iridescenceThicknessMinimum.value = p.iridescenceThicknessRange[0], g.iridescenceThicknessMaximum.value = p.iridescenceThicknessRange[1], p.iridescenceMap && (g.iridescenceMap.value = p.iridescenceMap, t(p.iridescenceMap, g.iridescenceMapTransform)), p.iridescenceThicknessMap && (g.iridescenceThicknessMap.value = p.iridescenceThicknessMap, t(p.iridescenceThicknessMap, g.iridescenceThicknessMapTransform))), p.transmission > 0 && (g.transmission.value = p.transmission, g.transmissionSamplerMap.value = E.texture, g.transmissionSamplerSize.value.set(E.width, E.height), p.transmissionMap && (g.transmissionMap.value = p.transmissionMap, t(p.transmissionMap, g.transmissionMapTransform)), g.thickness.value = p.thickness, p.thicknessMap && (g.thicknessMap.value = p.thicknessMap, t(p.thicknessMap, g.thicknessMapTransform)), g.attenuationDistance.value = p.attenuationDistance, g.attenuationColor.value.copy(p.attenuationColor)), p.anisotropy > 0 && (g.anisotropyVector.value.set(p.anisotropy * Math.cos(p.anisotropyRotation), p.anisotropy * Math.sin(p.anisotropyRotation)), p.anisotropyMap && (g.anisotropyMap.value = p.anisotropyMap, t(p.anisotropyMap, g.anisotropyMapTransform))), g.specularIntensity.value = p.specularIntensity, g.specularColor.value.copy(p.specularColor), p.specularColorMap && (g.specularColorMap.value = p.specularColorMap, t(p.specularColorMap, g.specularColorMapTransform)), p.specularIntensityMap && (g.specularIntensityMap.value = p.specularIntensityMap, t(p.specularIntensityMap, g.specularIntensityMapTransform))
    }
    function m(g, p) {
      p.matcap && (g.matcap.value = p.matcap)
    }
    function x(g, p) {
      let E = e.get(p).light;
      g.referencePosition.value.setFromMatrixPosition(E.matrixWorld), g.nearDistance.value = E.shadow.camera.near, g.farDistance.value = E.shadow.camera.far
    }
    return {
      refreshFogUniforms: i, refreshMaterialUniforms: s
    }
  }
  function Ex(n, e, t, i) {
    let s = {
    }, r = {
    }, o = [], a = n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);
    function l(E, b) {
      let y = b.program;
      i.uniformBlockBinding(E, y)
    }
    function c(E, b) {
      let y = s[E.id];
      y === void 0 && (m(E), y = h(E), s[E.id] = y, E.addEventListener("dispose", g));
      let R = b.program;
      i.updateUBOMapping(E, R);
      let w = e.render.frame;
      r[E.id] !== w && (d(E), r[E.id] = w)
    }
    function h(E) {
      let b = u();
      E.__bindingPointIndex = b;
      let y = n.createBuffer(), R = E.__size, w = E.usage;
      return n.bindBuffer(n.UNIFORM_BUFFER, y), n.bufferData(n.UNIFORM_BUFFER, R, w), n.bindBuffer(n.UNIFORM_BUFFER, null), n.bindBufferBase(n.UNIFORM_BUFFER, b, y), y
    }
    function u() {
      for (let E = 0;
      E < a;
      E++)if (o.indexOf(E) === - 1)return o.push(E), E;
      return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0
    }
    function d(E) {
      let b = s[E.id], y = E.uniforms, R = E.__cache;
      n.bindBuffer(n.UNIFORM_BUFFER, b);
      for (let w = 0, P = y.length;
      w < P;
      w++) {
        let D = Array.isArray(y[w])?y[w]: [y[w]];
        for (let M = 0, v = D.length;
        M < v;
        M++) {
          let C = D[M];
          if (f(C, w, M, R) === !0) {
            let F = C.__offset, z = Array.isArray(C.value)?C.value: [C.value], G = 0;
            for (let q = 0;
            q < z.length;
            q++) {
              let W = z[q], te = x(W);
              typeof W == "number" || typeof W == "boolean"?(C.__data[0] = W, n.bufferSubData(n.UNIFORM_BUFFER, F + G, C.__data)): W.isMatrix3?(C.__data[0] = W.elements[0], C.__data[1] = W.elements[1], C.__data[2] = W.elements[2], C.__data[3] = 0, C.__data[4] = W.elements[3], C.__data[5] = W.elements[4], C.__data[6] = W.elements[5], C.__data[7] = 0, C.__data[8] = W.elements[6], C.__data[9] = W.elements[7], C.__data[10] = W.elements[8], C.__data[11] = 0): (W.toArray(C.__data, G), G += te.storage / Float32Array.BYTES_PER_ELEMENT)
            }
            n.bufferSubData(n.UNIFORM_BUFFER, F, C.__data)
          }
        }
      }
      n.bindBuffer(n.UNIFORM_BUFFER, null)
    }
    function f(E, b, y, R) {
      let w = E.value, P = b + "_" + y;
      if (R[P] === void 0)return typeof w == "number" || typeof w == "boolean"?R[P] = w: R[P] = w.clone(), !0;
      {
        let D = R[P];
        if (typeof w == "number" || typeof w == "boolean") {
          if (D !== w)return R[P] = w, !0
        } else if (D.equals(w) === !1)return D.copy(w), !0
      }
      return!1
    }
    function m(E) {
      let b = E.uniforms, y = 0, R = 16;
      for (let P = 0, D = b.length;
      P < D;
      P++) {
        let M = Array.isArray(b[P])?b[P]: [b[P]];
        for (let v = 0, C = M.length;
        v < C;
        v++) {
          let F = M[v], z = Array.isArray(F.value)?F.value: [F.value];
          for (let G = 0, q = z.length;
          G < q;
          G++) {
            let W = z[G], te = x(W), V = y % R, ue = V % te.boundary, ve = V + ue;
            y += ue, ve !== 0 && R - ve < te.storage && (y += R - ve), F.__data = new Float32Array(te.storage / Float32Array.BYTES_PER_ELEMENT), F.__offset = y, y += te.storage
          }
        }
      }
      let w = y % R;
      return w > 0 && (y += R - w), E.__size = y, E.__cache = {
      }, this
    }
    function x(E) {
      let b = {
        boundary: 0, storage: 0
      };
      return typeof E == "number" || typeof E == "boolean"?(b.boundary = 4, b.storage = 4): E.isVector2?(b.boundary = 8, b.storage = 8): E.isVector3 || E.isColor?(b.boundary = 16, b.storage = 12): E.isVector4?(b.boundary = 16, b.storage = 16): E.isMatrix3?(b.boundary = 48, b.storage = 48): E.isMatrix4?(b.boundary = 64, b.storage = 64): E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."): console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", E), b
    }
    function g(E) {
      let b = E.target;
      b.removeEventListener("dispose", g);
      let y = o.indexOf(b.__bindingPointIndex);
      o.splice(y, 1), n.deleteBuffer(s[b.id]), delete s[b.id], delete r[b.id]
    }
    function p() {
      for (let E in s)n.deleteBuffer(s[E]);
      o = [], s = {
      }, r = {
      }
    }
    return {
      bind: l, update: c, dispose: p
    }
  }
  var Gr = class {
    constructor(e = {
    }) {
      let {
        canvas: t = Hu(), context: i = null, depth: s = !0, stencil: r = !1, alpha: o = !1, antialias: a = !1, premultipliedAlpha: l = !0, preserveDrawingBuffer: c = !1, powerPreference: h = "default", failIfMajorPerformanceCaveat: u = !1, reversedDepthBuffer: d = !1
      } = e;
      this.isWebGLRenderer = !0;
      let f;
      if (i !== null) {
        if (typeof WebGLRenderingContext < "u" && i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
        f = i.getContextAttributes().alpha
      } else f = o;
      let m = new Uint32Array(4), x = new Int32Array(4), g = null, p = null, E = [], b = [];
      this.domElement = t, this.debug = {
        checkShaderErrors: !0, onShaderError: null
      }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = Zn, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
      let y = this, R = !1;
      this._outputColorSpace = Vt;
      let w = 0, P = 0, D = null, M = - 1, v = null, C = new ot, F = new ot, z = null, G = new ke(0), q = 0, W = t.width, te = t.height, V = 1, ue = null, ve = null, Se = new ot(0, 0, W, te), Ge = new ot(0, 0, W, te), Ke = !1, rt = new gs, je = !1, Y = !1, ee = new nt, Me = new I, De = new ot, we = {
        background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0
      }, Ze = !1;
      function ut() {
        return D === null?V: 1
      }
      let A = i;
      function j(S, U) {
        return t.getContext(S, U)
      }
      try {
        let S = {
          alpha: !0, depth: s, stencil: r, antialias: a, premultipliedAlpha: l, preserveDrawingBuffer: c, powerPreference: h, failIfMajorPerformanceCaveat: u
        };
        if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${"180"}`), t.addEventListener("webglcontextlost", de, !1), t.addEventListener("webglcontextrestored", be, !1), t.addEventListener("webglcontextcreationerror", re, !1), A === null) {
          let U = "webgl2";
          if (A = j(U, S), A === null)throw j(U)?new Error("Error creating WebGL context with your selected attributes."): new Error("Error creating WebGL context.")
        }
      } catch (S) {
        throw console.error("THREE.WebGLRenderer: " + S.message), S
      }
      let J, $, Z, ce, ie, he, He, ze, T, _, O, H, Q, X, Ie, le, Ae, Re, se, xe, Fe, Pe, me, Xe;
      function L() {
        J = new V0(A), J.init(), Pe = new vx(A, J), $ = new N0(A, J, e, Pe), Z = new _x(A, J), $.reversedDepthBuffer && d && Z.buffers.depth.setReversed(!0), ce = new X0(A), ie = new sx, he = new xx(A, J, Z, ie, $, Pe, ce), He = new O0(y), ze = new H0(y), T = new Kp(A), me = new L0(A, T), _ = new G0(A, T, ce, me), O = new Y0(A, _, T, ce), se = new q0(A, $, he), le = new F0(ie), H = new ix(y, He, ze, J, $, me, le), Q = new bx(y, ie), X = new ox, Ie = new dx(J), Re = new D0(y, He, ze, Z, O, f, l), Ae = new mx(y, O, $), Xe = new Ex(A, ce, $, Z), xe = new U0(A, J, ce), Fe = new W0(A, J, ce), ce.programs = H.programs, y.capabilities = $, y.extensions = J, y.properties = ie, y.renderLists = X, y.shadowMap = Ae, y.state = Z, y.info = ce
      }
      L();
      let ae = new qc(y, A);
      this.xr = ae, this.getContext = function() {
        return A
      }, this.getContextAttributes = function() {
        return A.getContextAttributes()
      }, this.forceContextLoss = function() {
        let S = J.get("WEBGL_lose_context");
        S && S.loseContext()
      }, this.forceContextRestore = function() {
        let S = J.get("WEBGL_lose_context");
        S && S.restoreContext()
      }, this.getPixelRatio = function() {
        return V
      }, this.setPixelRatio = function(S) {
        S !== void 0 && (V = S, this.setSize(W, te, !1))
      }, this.getSize = function(S) {
        return S.set(W, te)
      }, this.setSize = function(S, U, B = !0) {
        if (ae.isPresenting) {
          console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
          return
        }
        W = S, te = U, t.width = Math.floor(S * V), t.height = Math.floor(U * V), B === !0 && (t.style.width = S + "px", t.style.height = U + "px"), this.setViewport(0, 0, S, U)
      }, this.getDrawingBufferSize = function(S) {
        return S.set(W * V, te * V).floor()
      }, this.setDrawingBufferSize = function(S, U, B) {
        W = S, te = U, V = B, t.width = Math.floor(S * B), t.height = Math.floor(U * B), this.setViewport(0, 0, S, U)
      }, this.getCurrentViewport = function(S) {
        return S.copy(C)
      }, this.getViewport = function(S) {
        return S.copy(Se)
      }, this.setViewport = function(S, U, B, k) {
        S.isVector4?Se.set(S.x, S.y, S.z, S.w): Se.set(S, U, B, k), Z.viewport(C.copy(Se).multiplyScalar(V).round())
      }, this.getScissor = function(S) {
        return S.copy(Ge)
      }, this.setScissor = function(S, U, B, k) {
        S.isVector4?Ge.set(S.x, S.y, S.z, S.w): Ge.set(S, U, B, k), Z.scissor(F.copy(Ge).multiplyScalar(V).round())
      }, this.getScissorTest = function() {
        return Ke
      }, this.setScissorTest = function(S) {
        Z.setScissorTest(Ke = S)
      }, this.setOpaqueSort = function(S) {
        ue = S
      }, this.setTransparentSort = function(S) {
        ve = S
      }, this.getClearColor = function(S) {
        return S.copy(Re.getClearColor())
      }, this.setClearColor = function() {
        Re.setClearColor(...arguments)
      }, this.getClearAlpha = function() {
        return Re.getClearAlpha()
      }, this.setClearAlpha = function() {
        Re.setClearAlpha(...arguments)
      }, this.clear = function(S = !0, U = !0, B = !0) {
        let k = 0;
        if (S) {
          let N = !1;
          if (D !== null) {
            let oe = D.texture.format;
            N = oe === Ea || oe === ba || oe === Sa
          }
          if (N) {
            let oe = D.texture.type, _e = oe === Mn || oe === pi || oe === Ts || oe === As || oe === va || oe === ya, Ee = Re.getClearColor(), ye = Re.getClearAlpha(), Ne = Ee.r, Be = Ee.g, Le = Ee.b;
            _e?(m[0] = Ne, m[1] = Be, m[2] = Le, m[3] = ye, A.clearBufferuiv(A.COLOR, 0, m)): (x[0] = Ne, x[1] = Be, x[2] = Le, x[3] = ye, A.clearBufferiv(A.COLOR, 0, x))
          } else k |= A.COLOR_BUFFER_BIT
        }
        U && (k |= A.DEPTH_BUFFER_BIT), B && (k |= A.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), A.clear(k)
      }, this.clearColor = function() {
        this.clear(!0, !1, !1)
      }, this.clearDepth = function() {
        this.clear(!1, !0, !1)
      }, this.clearStencil = function() {
        this.clear(!1, !1, !0)
      }, this.dispose = function() {
        t.removeEventListener("webglcontextlost", de, !1), t.removeEventListener("webglcontextrestored", be, !1), t.removeEventListener("webglcontextcreationerror", re, !1), Re.dispose(), X.dispose(), Ie.dispose(), ie.dispose(), He.dispose(), ze.dispose(), O.dispose(), me.dispose(), Xe.dispose(), H.dispose(), ae.dispose(), ae.removeEventListener("sessionstart", En), ae.removeEventListener("sessionend", gh), yi.stop()
      };
      function de(S) {
        S.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), R = !0
      }
      function be() {
        console.log("THREE.WebGLRenderer: Context Restored."), R = !1;
        let S = ce.autoReset, U = Ae.enabled, B = Ae.autoUpdate, k = Ae.needsUpdate, N = Ae.type;
        L(), ce.autoReset = S, Ae.enabled = U, Ae.autoUpdate = B, Ae.needsUpdate = k, Ae.type = N
      }
      function re(S) {
        console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", S.statusMessage)
      }
      function K(S) {
        let U = S.target;
        U.removeEventListener("dispose", K), Ce(U)
      }
      function Ce(S) {
        Ve(S), ie.remove(S)
      }
      function Ve(S) {
        let U = ie.get(S).programs;
        U !== void 0 && (U.forEach(function(B) {
          H.releaseProgram(B)
        }), S.isShaderMaterial && H.releaseShaderCache(S))
      }
      this.renderBufferDirect = function(S, U, B, k, N, oe) {
        U === null && (U = we);
        let _e = N.isMesh && N.matrixWorld.determinant() < 0, Ee = vf(S, U, B, k, N);
        Z.setMaterial(k, _e);
        let ye = B.index, Ne = 1;
        if (k.wireframe === !0) {
          if (ye = _.getWireframeAttribute(B), ye === void 0)return;
          Ne = 2
        }
        let Be = B.drawRange, Le = B.attributes.position, $e = Be.start * Ne, ct = (Be.start + Be.count) * Ne;
        oe !== null && ($e = Math.max($e, oe.start * Ne), ct = Math.min(ct, (oe.start + oe.count) * Ne)), ye !== null?($e = Math.max($e, 0), ct = Math.min(ct, ye.count)): Le != null && ($e = Math.max($e, 0), ct = Math.min(ct, Le.count));
        let yt = ct - $e;
        if (yt < 0 || yt === 1 / 0)return;
        me.setup(N, k, Ee, B, ye);
        let ft, ht = xe;
        if (ye !== null && (ft = T.get(ye), ht = Fe, ht.setIndex(ft)), N.isMesh)k.wireframe === !0?(Z.setLineWidth(k.wireframeLinewidth * ut()), ht.setMode(A.LINES)): ht.setMode(A.TRIANGLES);
        else if (N.isLine) {
          let Ue = k.linewidth;
          Ue === void 0 && (Ue = 1), Z.setLineWidth(Ue * ut()), N.isLineSegments?ht.setMode(A.LINES): N.isLineLoop?ht.setMode(A.LINE_LOOP): ht.setMode(A.LINE_STRIP)
        } else N.isPoints?ht.setMode(A.POINTS): N.isSprite && ht.setMode(A.TRIANGLES);
        if (N.isBatchedMesh)if (N._multiDrawInstances !== null)cs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."), ht.renderMultiDrawInstances(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount, N._multiDrawInstances);
        else if (J.get("WEBGL_multi_draw"))ht.renderMultiDraw(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount);
        else {
          let Ue = N._multiDrawStarts, gt = N._multiDrawCounts, tt = N._multiDrawCount, Qt = ye?T.get(ye).bytesPerElement: 1, Xi = ie.get(k).currentProgram.getUniforms();
          for (let jt = 0;
          jt < tt;
          jt++)Xi.setValue(A, "_gl_DrawID", jt), ht.render(Ue[jt] / Qt, gt[jt])
        } else if (N.isInstancedMesh)ht.renderInstances($e, yt, N.count);
        else if (B.isInstancedBufferGeometry) {
          let Ue = B._maxInstanceCount !== void 0?B._maxInstanceCount: 1 / 0, gt = Math.min(B.instanceCount, Ue);
          ht.renderInstances($e, yt, gt)
        } else ht.render($e, yt)
      };
      function dt(S, U, B) {
        S.transparent === !0 && S.side === Dn && S.forceSinglePass === !1?(S.side = Wt, S.needsUpdate = !0, jr(S, U, B), S.side = Wn, S.needsUpdate = !0, jr(S, U, B), S.side = Dn): jr(S, U, B)
      }
      this.compile = function(S, U, B = null) {
        B === null && (B = S), p = Ie.get(B), p.init(U), b.push(p), B.traverseVisible(function(N) {
          N.isLight && N.layers.test(U.layers) && (p.pushLight(N), N.castShadow && p.pushShadow(N))
        }), S !== B && S.traverseVisible(function(N) {
          N.isLight && N.layers.test(U.layers) && (p.pushLight(N), N.castShadow && p.pushShadow(N))
        }), p.setupLights();
        let k = new Set;
        return S.traverse(function(N) {
          if (!(N.isMesh || N.isPoints || N.isLine || N.isSprite))return;
          let oe = N.material;
          if (oe)if (Array.isArray(oe))for (let _e = 0;
          _e < oe.length;
          _e++) {
            let Ee = oe[_e];
            dt(Ee, B, N), k.add(Ee)
          } else dt(oe, B, N), k.add(oe)
        }), p = b.pop(), k
      }, this.compileAsync = function(S, U, B = null) {
        let k = this.compile(S, U, B);
        return new Promise(N => {
          function oe() {
            if (k.forEach(function(_e) {
              ie.get(_e).currentProgram.isReady() && k.delete(_e)
            }), k.size === 0) {
              N(S);
              return
            }
            setTimeout(oe, 10)
          }
          J.get("KHR_parallel_shader_compile") !== null?oe(): setTimeout(oe, 10)
        })
      };
      let it = null;
      function On(S) {
        it && it(S)
      }
      function En() {
        yi.stop()
      }
      function gh() {
        yi.start()
      }
      let yi = new vd;
      yi.setAnimationLoop(On), typeof self < "u" && yi.setContext(self), this.setAnimationLoop = function(S) {
        it = S, ae.setAnimationLoop(S), S === null?yi.stop(): yi.start()
      }, ae.addEventListener("sessionstart", En), ae.addEventListener("sessionend", gh), this.render = function(S, U) {
        if (U !== void 0 && U.isCamera !== !0) {
          console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
          return
        }
        if (R === !0)return;
        if (S.matrixWorldAutoUpdate === !0 && S.updateMatrixWorld(), U.parent === null && U.matrixWorldAutoUpdate === !0 && U.updateMatrixWorld(), ae.enabled === !0 && ae.isPresenting === !0 && (ae.cameraAutoUpdate === !0 && ae.updateCamera(U), U = ae.getCamera()), S.isScene === !0 && S.onBeforeRender(y, S, U, D), p = Ie.get(S, b.length), p.init(U), b.push(p), ee.multiplyMatrices(U.projectionMatrix, U.matrixWorldInverse), rt.setFromProjectionMatrix(ee, _n, U.reversedDepth), Y = this.localClippingEnabled, je = le.init(this.clippingPlanes, Y), g = X.get(S, E.length), g.init(), E.push(g), ae.enabled === !0 && ae.isPresenting === !0) {
          let oe = y.xr.getDepthSensingMesh();
          oe !== null && Sl(oe, U, - 1 / 0, y.sortObjects)
        }
        Sl(S, U, 0, y.sortObjects), g.finish(), y.sortObjects === !0 && g.sort(ue, ve), Ze = ae.enabled === !1 || ae.isPresenting === !1 || ae.hasDepthSensing() === !1, Ze && Re.addToRenderList(g, S), this.info.render.frame++, je === !0 && le.beginShadows();
        let B = p.state.shadowsArray;
        Ae.render(B, S, U), je === !0 && le.endShadows(), this.info.autoReset === !0 && this.info.reset();
        let k = g.opaque, N = g.transmissive;
        if (p.setupLights(), U.isArrayCamera) {
          let oe = U.cameras;
          if (N.length > 0)for (let _e = 0, Ee = oe.length;
          _e < Ee;
          _e++) {
            let ye = oe[_e];
            xh(k, N, S, ye)
          }
          Ze && Re.render(S);
          for (let _e = 0, Ee = oe.length;
          _e < Ee;
          _e++) {
            let ye = oe[_e];
            _h(g, S, ye, ye.viewport)
          }
        } else N.length > 0 && xh(k, N, S, U), Ze && Re.render(S), _h(g, S, U);
        D !== null && P === 0 && (he.updateMultisampleRenderTarget(D), he.updateRenderTargetMipmap(D)), S.isScene === !0 && S.onAfterRender(y, S, U), me.resetDefaultState(), M = - 1, v = null, b.pop(), b.length > 0?(p = b[b.length - 1], je === !0 && le.setGlobalState(y.clippingPlanes, p.state.camera)): p = null, E.pop(), E.length > 0?g = E[E.length - 1]: g = null
      };
      function Sl(S, U, B, k) {
        if (S.visible === !1)return;
        if (S.layers.test(U.layers)) {
          if (S.isGroup)B = S.renderOrder;
          else if (S.isLOD)S.autoUpdate === !0 && S.update(U);
          else if (S.isLight)p.pushLight(S), S.castShadow && p.pushShadow(S);
          else if (S.isSprite) {
            if (!S.frustumCulled || rt.intersectsSprite(S)) {
              k && De.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ee);
              let _e = O.update(S), Ee = S.material;
              Ee.visible && g.push(S, _e, Ee, B, De.z, null)
            }
          } else if ((S.isMesh || S.isLine || S.isPoints) && (!S.frustumCulled || rt.intersectsObject(S))) {
            let _e = O.update(S), Ee = S.material;
            if (k && (S.boundingSphere !== void 0?(S.boundingSphere === null && S.computeBoundingSphere(), De.copy(S.boundingSphere.center)): (_e.boundingSphere === null && _e.computeBoundingSphere(), De.copy(_e.boundingSphere.center)), De.applyMatrix4(S.matrixWorld).applyMatrix4(ee)), Array.isArray(Ee)) {
              let ye = _e.groups;
              for (let Ne = 0, Be = ye.length;
              Ne < Be;
              Ne++) {
                let Le = ye[Ne], $e = Ee[Le.materialIndex];
                $e && $e.visible && g.push(S, _e, $e, B, De.z, Le)
              }
            } else Ee.visible && g.push(S, _e, Ee, B, De.z, null)
          }
        }
        let oe = S.children;
        for (let _e = 0, Ee = oe.length;
        _e < Ee;
        _e++)Sl(oe[_e], U, B, k)
      }
      function _h(S, U, B, k) {
        let N = S.opaque, oe = S.transmissive, _e = S.transparent;
        p.setupLightsView(B), je === !0 && le.setGlobalState(y.clippingPlanes, B), k && Z.viewport(C.copy(k)), N.length > 0 && Qr(N, U, B), oe.length > 0 && Qr(oe, U, B), _e.length > 0 && Qr(_e, U, B), Z.buffers.depth.setTest(!0), Z.buffers.depth.setMask(!0), Z.buffers.color.setMask(!0), Z.setPolygonOffset(!1)
      }
      function xh(S, U, B, k) {
        if ((B.isScene === !0?B.overrideMaterial: null) !== null)return;
        p.state.transmissionRenderTarget[k.id] === void 0 && (p.state.transmissionRenderTarget[k.id] = new wn(1, 1, {
          generateMipmaps: !0, type: J.has("EXT_color_buffer_half_float") || J.has("EXT_color_buffer_float")?ws: Mn, minFilter: fi, samples: 4, stencilBuffer: r, resolveDepthBuffer: !1, resolveStencilBuffer: !1, colorSpace: et.workingColorSpace
        }));
        let oe = p.state.transmissionRenderTarget[k.id], _e = k.viewport || C;
        oe.setSize(_e.z * y.transmissionResolutionScale, _e.w * y.transmissionResolutionScale);
        let Ee = y.getRenderTarget(), ye = y.getActiveCubeFace(), Ne = y.getActiveMipmapLevel();
        y.setRenderTarget(oe), y.getClearColor(G), q = y.getClearAlpha(), q < 1 && y.setClearColor(16777215, .5), y.clear(), Ze && Re.render(B);
        let Be = y.toneMapping;
        y.toneMapping = Zn;
        let Le = k.viewport;
        if (k.viewport !== void 0 && (k.viewport = void 0), p.setupLightsView(k), je === !0 && le.setGlobalState(y.clippingPlanes, k), Qr(S, B, k), he.updateMultisampleRenderTarget(oe), he.updateRenderTargetMipmap(oe), J.has("WEBGL_multisampled_render_to_texture") === !1) {
          let $e = !1;
          for (let ct = 0, yt = U.length;
          ct < yt;
          ct++) {
            let ft = U[ct], ht = ft.object, Ue = ft.geometry, gt = ft.material, tt = ft.group;
            if (gt.side === Dn && ht.layers.test(k.layers)) {
              let Qt = gt.side;
              gt.side = Wt, gt.needsUpdate = !0, vh(ht, B, k, Ue, gt, tt), gt.side = Qt, gt.needsUpdate = !0, $e = !0
            }
          }
          $e === !0 && (he.updateMultisampleRenderTarget(oe), he.updateRenderTargetMipmap(oe))
        }
        y.setRenderTarget(Ee, ye, Ne), y.setClearColor(G, q), Le !== void 0 && (k.viewport = Le), y.toneMapping = Be
      }
      function Qr(S, U, B) {
        let k = U.isScene === !0?U.overrideMaterial: null;
        for (let N = 0, oe = S.length;
        N < oe;
        N++) {
          let _e = S[N], Ee = _e.object, ye = _e.geometry, Ne = _e.group, Be = _e.material;
          Be.allowOverride === !0 && k !== null && (Be = k), Ee.layers.test(B.layers) && vh(Ee, U, B, ye, Be, Ne)
        }
      }
      function vh(S, U, B, k, N, oe) {
        S.onBeforeRender(y, U, B, k, N, oe), S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse, S.matrixWorld), S.normalMatrix.getNormalMatrix(S.modelViewMatrix), N.onBeforeRender(y, U, B, k, S, oe), N.transparent === !0 && N.side === Dn && N.forceSinglePass === !1?(N.side = Wt, N.needsUpdate = !0, y.renderBufferDirect(B, U, k, N, S, oe), N.side = Wn, N.needsUpdate = !0, y.renderBufferDirect(B, U, k, N, S, oe), N.side = Dn): y.renderBufferDirect(B, U, k, N, S, oe), S.onAfterRender(y, U, B, k, N, oe)
      }
      function jr(S, U, B) {
        U.isScene !== !0 && (U = we);
        let k = ie.get(S), N = p.state.lights, oe = p.state.shadowsArray, _e = N.state.version, Ee = H.getParameters(S, N.state, oe, U, B), ye = H.getProgramCacheKey(Ee), Ne = k.programs;
        k.environment = S.isMeshStandardMaterial?U.environment: null, k.fog = U.fog, k.envMap = (S.isMeshStandardMaterial?ze: He).get(S.envMap || k.environment), k.envMapRotation = k.environment !== null && S.envMap === null?U.environmentRotation: S.envMapRotation, Ne === void 0 && (S.addEventListener("dispose", K), Ne = new Map, k.programs = Ne);
        let Be = Ne.get(ye);
        if (Be !== void 0) {
          if (k.currentProgram === Be && k.lightsStateVersion === _e)return Mh(S, Ee), Be
        } else Ee.uniforms = H.getUniforms(S), S.onBeforeCompile(Ee, y), Be = H.acquireProgram(Ee, ye), Ne.set(ye, Be), k.uniforms = Ee.uniforms;
        let Le = k.uniforms;
        return(!S.isShaderMaterial && !S.isRawShaderMaterial || S.clipping === !0) && (Le.clippingPlanes = le.uniform), Mh(S, Ee), k.needsLights = Mf(S), k.lightsStateVersion = _e, k.needsLights && (Le.ambientLightColor.value = N.state.ambient, Le.lightProbe.value = N.state.probe, Le.directionalLights.value = N.state.directional, Le.directionalLightShadows.value = N.state.directionalShadow, Le.spotLights.value = N.state.spot, Le.spotLightShadows.value = N.state.spotShadow, Le.rectAreaLights.value = N.state.rectArea, Le.ltc_1.value = N.state.rectAreaLTC1, Le.ltc_2.value = N.state.rectAreaLTC2, Le.pointLights.value = N.state.point, Le.pointLightShadows.value = N.state.pointShadow, Le.hemisphereLights.value = N.state.hemi, Le.directionalShadowMap.value = N.state.directionalShadowMap, Le.directionalShadowMatrix.value = N.state.directionalShadowMatrix, Le.spotShadowMap.value = N.state.spotShadowMap, Le.spotLightMatrix.value = N.state.spotLightMatrix, Le.spotLightMap.value = N.state.spotLightMap, Le.pointShadowMap.value = N.state.pointShadowMap, Le.pointShadowMatrix.value = N.state.pointShadowMatrix), k.currentProgram = Be, k.uniformsList = null, Be
      }
      function yh(S) {
        if (S.uniformsList === null) {
          let U = S.currentProgram.getUniforms();
          S.uniformsList = Ps.seqWithValue(U.seq, S.uniforms)
        }
        return S.uniformsList
      }
      function Mh(S, U) {
        let B = ie.get(S);
        B.outputColorSpace = U.outputColorSpace, B.batching = U.batching, B.batchingColor = U.batchingColor, B.instancing = U.instancing, B.instancingColor = U.instancingColor, B.instancingMorph = U.instancingMorph, B.skinning = U.skinning, B.morphTargets = U.morphTargets, B.morphNormals = U.morphNormals, B.morphColors = U.morphColors, B.morphTargetsCount = U.morphTargetsCount, B.numClippingPlanes = U.numClippingPlanes, B.numIntersection = U.numClipIntersection, B.vertexAlphas = U.vertexAlphas, B.vertexTangents = U.vertexTangents, B.toneMapping = U.toneMapping
      }
      function vf(S, U, B, k, N) {
        U.isScene !== !0 && (U = we), he.resetTextureUnits();
        let oe = U.fog, _e = k.isMeshStandardMaterial?U.environment: null, Ee = D === null?y.outputColorSpace: D.isXRRenderTarget === !0?D.texture.colorSpace: Ii, ye = (k.isMeshStandardMaterial?ze: He).get(k.envMap || _e), Ne = k.vertexColors === !0 && !!B.attributes.color && B.attributes.color.itemSize === 4, Be = !!B.attributes.tangent && (!!k.normalMap || k.anisotropy > 0), Le = !!B.morphAttributes.position, $e = !!B.morphAttributes.normal, ct = !!B.morphAttributes.color, yt = Zn;
        k.toneMapped && (D === null || D.isXRRenderTarget === !0) && (yt = y.toneMapping);
        let ft = B.morphAttributes.position || B.morphAttributes.normal || B.morphAttributes.color, ht = ft !== void 0?ft.length: 0, Ue = ie.get(k), gt = p.state.lights;
        if (je === !0 && (Y === !0 || S !== v)) {
          let kt = S === v && k.id === M;
          le.setState(k, S, kt)
        }
        let tt = !1;
        k.version === Ue.__version?(Ue.needsLights && Ue.lightsStateVersion !== gt.state.version || Ue.outputColorSpace !== Ee || N.isBatchedMesh && Ue.batching === !1 || !N.isBatchedMesh && Ue.batching === !0 || N.isBatchedMesh && Ue.batchingColor === !0 && N.colorTexture === null || N.isBatchedMesh && Ue.batchingColor === !1 && N.colorTexture !== null || N.isInstancedMesh && Ue.instancing === !1 || !N.isInstancedMesh && Ue.instancing === !0 || N.isSkinnedMesh && Ue.skinning === !1 || !N.isSkinnedMesh && Ue.skinning === !0 || N.isInstancedMesh && Ue.instancingColor === !0 && N.instanceColor === null || N.isInstancedMesh && Ue.instancingColor === !1 && N.instanceColor !== null || N.isInstancedMesh && Ue.instancingMorph === !0 && N.morphTexture === null || N.isInstancedMesh && Ue.instancingMorph === !1 && N.morphTexture !== null || Ue.envMap !== ye || k.fog === !0 && Ue.fog !== oe || Ue.numClippingPlanes !== void 0 && (Ue.numClippingPlanes !== le.numPlanes || Ue.numIntersection !== le.numIntersection) || Ue.vertexAlphas !== Ne || Ue.vertexTangents !== Be || Ue.morphTargets !== Le || Ue.morphNormals !== $e || Ue.morphColors !== ct || Ue.toneMapping !== yt || Ue.morphTargetsCount !== ht) && (tt = !0): (tt = !0, Ue.__version = k.version);
        let Qt = Ue.currentProgram;
        tt === !0 && (Qt = jr(k, U, N));
        let Xi = !1, jt = !1, Hs = !1, _t = Qt.getUniforms(), on = Ue.uniforms;
        if (Z.useProgram(Qt.program) && (Xi = !0, jt = !0, Hs = !0), k.id !== M && (M = k.id, jt = !0), Xi || v !== S) {
          Z.buffers.depth.getReversed() && S.reversedDepth !== !0 && (S._reversedDepth = !0, S.updateProjectionMatrix()), _t.setValue(A, "projectionMatrix", S.projectionMatrix), _t.setValue(A, "viewMatrix", S.matrixWorldInverse);
          let Yt = _t.map.cameraPosition;
          Yt !== void 0 && Yt.setValue(A, Me.setFromMatrixPosition(S.matrixWorld)), $.logarithmicDepthBuffer && _t.setValue(A, "logDepthBufFC", 2 / (Math.log(S.far + 1) / Math.LN2)), (k.isMeshPhongMaterial || k.isMeshToonMaterial || k.isMeshLambertMaterial || k.isMeshBasicMaterial || k.isMeshStandardMaterial || k.isShaderMaterial) && _t.setValue(A, "isOrthographic", S.isOrthographicCamera === !0), v !== S && (v = S, jt = !0, Hs = !0)
        }
        if (N.isSkinnedMesh) {
          _t.setOptional(A, N, "bindMatrix"), _t.setOptional(A, N, "bindMatrixInverse");
          let kt = N.skeleton;
          kt && (kt.boneTexture === null && kt.computeBoneTexture(), _t.setValue(A, "boneTexture", kt.boneTexture, he))
        }
        N.isBatchedMesh && (_t.setOptional(A, N, "batchingTexture"), _t.setValue(A, "batchingTexture", N._matricesTexture, he), _t.setOptional(A, N, "batchingIdTexture"), _t.setValue(A, "batchingIdTexture", N._indirectTexture, he), _t.setOptional(A, N, "batchingColorTexture"), N._colorsTexture !== null && _t.setValue(A, "batchingColorTexture", N._colorsTexture, he));
        let an = B.morphAttributes;
        if ((an.position !== void 0 || an.normal !== void 0 || an.color !== void 0) && se.update(N, B, Qt), (jt || Ue.receiveShadow !== N.receiveShadow) && (Ue.receiveShadow = N.receiveShadow, _t.setValue(A, "receiveShadow", N.receiveShadow)), k.isMeshGouraudMaterial && k.envMap !== null && (on.envMap.value = ye, on.flipEnvMap.value = ye.isCubeTexture && ye.isRenderTargetTexture === !1? - 1: 1), k.isMeshStandardMaterial && k.envMap === null && U.environment !== null && (on.envMapIntensity.value = U.environmentIntensity), jt && (_t.setValue(A, "toneMappingExposure", y.toneMappingExposure), Ue.needsLights && yf(on, Hs), oe && k.fog === !0 && Q.refreshFogUniforms(on, oe), Q.refreshMaterialUniforms(on, k, V, te, p.state.transmissionRenderTarget[S.id]), Ps.upload(A, yh(Ue), on, he)), k.isShaderMaterial && k.uniformsNeedUpdate === !0 && (Ps.upload(A, yh(Ue), on, he), k.uniformsNeedUpdate = !1), k.isSpriteMaterial && _t.setValue(A, "center", N.center), _t.setValue(A, "modelViewMatrix", N.modelViewMatrix), _t.setValue(A, "normalMatrix", N.normalMatrix), _t.setValue(A, "modelMatrix", N.matrixWorld), k.isShaderMaterial || k.isRawShaderMaterial) {
          let kt = k.uniformsGroups;
          for (let Yt = 0, bl = kt.length;
          Yt < bl;
          Yt++) {
            let Mi = kt[Yt];
            Xe.update(Mi, Qt), Xe.bind(Mi, Qt)
          }
        }
        return Qt
      }
      function yf(S, U) {
        S.ambientLightColor.needsUpdate = U, S.lightProbe.needsUpdate = U, S.directionalLights.needsUpdate = U, S.directionalLightShadows.needsUpdate = U, S.pointLights.needsUpdate = U, S.pointLightShadows.needsUpdate = U, S.spotLights.needsUpdate = U, S.spotLightShadows.needsUpdate = U, S.rectAreaLights.needsUpdate = U, S.hemisphereLights.needsUpdate = U
      }
      function Mf(S) {
        return S.isMeshLambertMaterial || S.isMeshToonMaterial || S.isMeshPhongMaterial || S.isMeshStandardMaterial || S.isShadowMaterial || S.isShaderMaterial && S.lights === !0
      }
      this.getActiveCubeFace = function() {
        return w
      }, this.getActiveMipmapLevel = function() {
        return P
      }, this.getRenderTarget = function() {
        return D
      }, this.setRenderTargetTextures = function(S, U, B) {
        let k = ie.get(S);
        k.__autoAllocateDepthBuffer = S.resolveDepthBuffer === !1, k.__autoAllocateDepthBuffer === !1 && (k.__useRenderToTexture = !1), ie.get(S.texture).__webglTexture = U, ie.get(S.depthTexture).__webglTexture = k.__autoAllocateDepthBuffer?void 0: B, k.__hasExternalTextures = !0
      }, this.setRenderTargetFramebuffer = function(S, U) {
        let B = ie.get(S);
        B.__webglFramebuffer = U, B.__useDefaultFramebuffer = U === void 0
      };
      let Sf = A.createFramebuffer();
      this.setRenderTarget = function(S, U = 0, B = 0) {
        D = S, w = U, P = B;
        let k = !0, N = null, oe = !1, _e = !1;
        if (S) {
          let ye = ie.get(S);
          if (ye.__useDefaultFramebuffer !== void 0)Z.bindFramebuffer(A.FRAMEBUFFER, null), k = !1;
          else if (ye.__webglFramebuffer === void 0)he.setupRenderTarget(S);
          else if (ye.__hasExternalTextures)he.rebindTextures(S, ie.get(S.texture).__webglTexture, ie.get(S.depthTexture).__webglTexture);
          else if (S.depthBuffer) {
            let Le = S.depthTexture;
            if (ye.__boundDepthTexture !== Le) {
              if (Le !== null && ie.has(Le) && (S.width !== Le.image.width || S.height !== Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
              he.setupDepthRenderbuffer(S)
            }
          }
          let Ne = S.texture;
          (Ne.isData3DTexture || Ne.isDataArrayTexture || Ne.isCompressedArrayTexture) && (_e = !0);
          let Be = ie.get(S).__webglFramebuffer;
          S.isWebGLCubeRenderTarget?(Array.isArray(Be[U])?N = Be[U][B]: N = Be[U], oe = !0): S.samples > 0 && he.useMultisampledRTT(S) === !1?N = ie.get(S).__webglMultisampledFramebuffer: Array.isArray(Be)?N = Be[B]: N = Be, C.copy(S.viewport), F.copy(S.scissor), z = S.scissorTest
        } else C.copy(Se).multiplyScalar(V).floor(), F.copy(Ge).multiplyScalar(V).floor(), z = Ke;
        if (B !== 0 && (N = Sf), Z.bindFramebuffer(A.FRAMEBUFFER, N) && k && Z.drawBuffers(S, N), Z.viewport(C), Z.scissor(F), Z.setScissorTest(z), oe) {
          let ye = ie.get(S.texture);
          A.framebufferTexture2D(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_CUBE_MAP_POSITIVE_X + U, ye.__webglTexture, B)
        } else if (_e) {
          let ye = U;
          for (let Ne = 0;
          Ne < S.textures.length;
          Ne++) {
            let Be = ie.get(S.textures[Ne]);
            A.framebufferTextureLayer(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0 + Ne, Be.__webglTexture, B, ye)
          }
        } else if (S !== null && B !== 0) {
          let ye = ie.get(S.texture);
          A.framebufferTexture2D(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, ye.__webglTexture, B)
        }
        M = - 1
      }, this.readRenderTargetPixels = function(S, U, B, k, N, oe, _e, Ee = 0) {
        if (!(S && S.isWebGLRenderTarget)) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
          return
        }
        let ye = ie.get(S).__webglFramebuffer;
        if (S.isWebGLCubeRenderTarget && _e !== void 0 && (ye = ye[_e]), ye) {
          Z.bindFramebuffer(A.FRAMEBUFFER, ye);
          try {
            let Ne = S.textures[Ee], Be = Ne.format, Le = Ne.type;
            if (!$.textureFormatReadable(Be)) {
              console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
              return
            }
            if (!$.textureTypeReadable(Le)) {
              console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
              return
            }
            U >= 0 && U <= S.width - k && B >= 0 && B <= S.height - N && (S.textures.length > 1 && A.readBuffer(A.COLOR_ATTACHMENT0 + Ee), A.readPixels(U, B, k, N, Pe.convert(Be), Pe.convert(Le), oe))
          } finally {
            let Ne = D !== null?ie.get(D).__webglFramebuffer: null;
            Z.bindFramebuffer(A.FRAMEBUFFER, Ne)
          }
        }
      }, this.readRenderTargetPixelsAsync = async function(S, U, B, k, N, oe, _e, Ee = 0) {
        if (!(S && S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        let ye = ie.get(S).__webglFramebuffer;
        if (S.isWebGLCubeRenderTarget && _e !== void 0 && (ye = ye[_e]), ye)if (U >= 0 && U <= S.width - k && B >= 0 && B <= S.height - N) {
          Z.bindFramebuffer(A.FRAMEBUFFER, ye);
          let Ne = S.textures[Ee], Be = Ne.format, Le = Ne.type;
          if (!$.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!$.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          let $e = A.createBuffer();
          A.bindBuffer(A.PIXEL_PACK_BUFFER, $e), A.bufferData(A.PIXEL_PACK_BUFFER, oe.byteLength, A.STREAM_READ), S.textures.length > 1 && A.readBuffer(A.COLOR_ATTACHMENT0 + Ee), A.readPixels(U, B, k, N, Pe.convert(Be), Pe.convert(Le), 0);
          let ct = D !== null?ie.get(D).__webglFramebuffer: null;
          Z.bindFramebuffer(A.FRAMEBUFFER, ct);
          let yt = A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return A.flush(), await Vu(A, yt, 4), A.bindBuffer(A.PIXEL_PACK_BUFFER, $e), A.getBufferSubData(A.PIXEL_PACK_BUFFER, 0, oe), A.deleteBuffer($e), A.deleteSync(yt), oe
        } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")
      }, this.copyFramebufferToTexture = function(S, U = null, B = 0) {
        let k = Math.pow(2, - B), N = Math.floor(S.image.width * k), oe = Math.floor(S.image.height * k), _e = U !== null?U.x: 0, Ee = U !== null?U.y: 0;
        he.setTexture2D(S, 0), A.copyTexSubImage2D(A.TEXTURE_2D, B, 0, 0, _e, Ee, N, oe), Z.unbindTexture()
      };
      let bf = A.createFramebuffer(), Ef = A.createFramebuffer();
      this.copyTextureToTexture = function(S, U, B = null, k = null, N = 0, oe = null) {
        oe === null && (N !== 0?(cs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."), oe = N, N = 0): oe = 0);
        let _e, Ee, ye, Ne, Be, Le, $e, ct, yt, ft = S.isCompressedTexture?S.mipmaps[oe]: S.image;
        if (B !== null)_e = B.max.x - B.min.x, Ee = B.max.y - B.min.y, ye = B.isBox3?B.max.z - B.min.z: 1, Ne = B.min.x, Be = B.min.y, Le = B.isBox3?B.min.z: 0;
        else {
          let an = Math.pow(2, - N);
          _e = Math.floor(ft.width * an), Ee = Math.floor(ft.height * an), S.isDataArrayTexture?ye = ft.depth: S.isData3DTexture?ye = Math.floor(ft.depth * an): ye = 1, Ne = 0, Be = 0, Le = 0
        }
        k !== null?($e = k.x, ct = k.y, yt = k.z): ($e = 0, ct = 0, yt = 0);
        let ht = Pe.convert(U.format), Ue = Pe.convert(U.type), gt;
        U.isData3DTexture?(he.setTexture3D(U, 0), gt = A.TEXTURE_3D): U.isDataArrayTexture || U.isCompressedArrayTexture?(he.setTexture2DArray(U, 0), gt = A.TEXTURE_2D_ARRAY): (he.setTexture2D(U, 0), gt = A.TEXTURE_2D), A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL, U.flipY), A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL, U.premultiplyAlpha), A.pixelStorei(A.UNPACK_ALIGNMENT, U.unpackAlignment);
        let tt = A.getParameter(A.UNPACK_ROW_LENGTH), Qt = A.getParameter(A.UNPACK_IMAGE_HEIGHT), Xi = A.getParameter(A.UNPACK_SKIP_PIXELS), jt = A.getParameter(A.UNPACK_SKIP_ROWS), Hs = A.getParameter(A.UNPACK_SKIP_IMAGES);
        A.pixelStorei(A.UNPACK_ROW_LENGTH, ft.width), A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, ft.height), A.pixelStorei(A.UNPACK_SKIP_PIXELS, Ne), A.pixelStorei(A.UNPACK_SKIP_ROWS, Be), A.pixelStorei(A.UNPACK_SKIP_IMAGES, Le);
        let _t = S.isDataArrayTexture || S.isData3DTexture, on = U.isDataArrayTexture || U.isData3DTexture;
        if (S.isDepthTexture) {
          let an = ie.get(S), kt = ie.get(U), Yt = ie.get(an.__renderTarget), bl = ie.get(kt.__renderTarget);
          Z.bindFramebuffer(A.READ_FRAMEBUFFER, Yt.__webglFramebuffer), Z.bindFramebuffer(A.DRAW_FRAMEBUFFER, bl.__webglFramebuffer);
          for (let Mi = 0;
          Mi < ye;
          Mi++)_t && (A.framebufferTextureLayer(A.READ_FRAMEBUFFER, A.COLOR_ATTACHMENT0, ie.get(S).__webglTexture, N, Le + Mi), A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0, ie.get(U).__webglTexture, oe, yt + Mi)), A.blitFramebuffer(Ne, Be, _e, Ee, $e, ct, _e, Ee, A.DEPTH_BUFFER_BIT, A.NEAREST);
          Z.bindFramebuffer(A.READ_FRAMEBUFFER, null), Z.bindFramebuffer(A.DRAW_FRAMEBUFFER, null)
        } else if (N !== 0 || S.isRenderTargetTexture || ie.has(S)) {
          let an = ie.get(S), kt = ie.get(U);
          Z.bindFramebuffer(A.READ_FRAMEBUFFER, bf), Z.bindFramebuffer(A.DRAW_FRAMEBUFFER, Ef);
          for (let Yt = 0;
          Yt < ye;
          Yt++)_t?A.framebufferTextureLayer(A.READ_FRAMEBUFFER, A.COLOR_ATTACHMENT0, an.__webglTexture, N, Le + Yt): A.framebufferTexture2D(A.READ_FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, an.__webglTexture, N), on?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0, kt.__webglTexture, oe, yt + Yt): A.framebufferTexture2D(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, kt.__webglTexture, oe), N !== 0?A.blitFramebuffer(Ne, Be, _e, Ee, $e, ct, _e, Ee, A.COLOR_BUFFER_BIT, A.NEAREST): on?A.copyTexSubImage3D(gt, oe, $e, ct, yt + Yt, Ne, Be, _e, Ee): A.copyTexSubImage2D(gt, oe, $e, ct, Ne, Be, _e, Ee);
          Z.bindFramebuffer(A.READ_FRAMEBUFFER, null), Z.bindFramebuffer(A.DRAW_FRAMEBUFFER, null)
        } else on?S.isDataTexture || S.isData3DTexture?A.texSubImage3D(gt, oe, $e, ct, yt, _e, Ee, ye, ht, Ue, ft.data): U.isCompressedArrayTexture?A.compressedTexSubImage3D(gt, oe, $e, ct, yt, _e, Ee, ye, ht, ft.data): A.texSubImage3D(gt, oe, $e, ct, yt, _e, Ee, ye, ht, Ue, ft): S.isDataTexture?A.texSubImage2D(A.TEXTURE_2D, oe, $e, ct, _e, Ee, ht, Ue, ft.data): S.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D, oe, $e, ct, ft.width, ft.height, ht, ft.data): A.texSubImage2D(A.TEXTURE_2D, oe, $e, ct, _e, Ee, ht, Ue, ft);
        A.pixelStorei(A.UNPACK_ROW_LENGTH, tt), A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, Qt), A.pixelStorei(A.UNPACK_SKIP_PIXELS, Xi), A.pixelStorei(A.UNPACK_SKIP_ROWS, jt), A.pixelStorei(A.UNPACK_SKIP_IMAGES, Hs), oe === 0 && U.generateMipmaps && A.generateMipmap(gt), Z.unbindTexture()
      }, this.initRenderTarget = function(S) {
        ie.get(S).__webglFramebuffer === void 0 && he.setupRenderTarget(S)
      }, this.initTexture = function(S) {
        S.isCubeTexture?he.setTextureCube(S, 0): S.isData3DTexture?he.setTexture3D(S, 0): S.isDataArrayTexture || S.isCompressedArrayTexture?he.setTexture2DArray(S, 0): he.setTexture2D(S, 0), Z.unbindTexture()
      }, this.resetState = function() {
        w = 0, P = 0, D = null, Z.reset(), me.reset()
      }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
        detail: this
      }))
    }
    get coordinateSystem() {
      return _n
    }
    get outputColorSpace() {
      return this._outputColorSpace
    }
    set outputColorSpace(e) {
      this._outputColorSpace = e;
      let t = this.getContext();
      t.drawingBufferColorSpace = et._getDrawingBufferColorSpace(e), t.unpackColorSpace = et._getUnpackColorSpace()
    }
  };
  function Td(n) {
    let e = 2166136261;
    for (let t of n)e = Math.imul(e ^ t.charCodeAt(0), 16777619);
    return e >>> 0
  }
  var rl = n => 250 * (n + 1), Vi = {
    flightBoost: 400, shieldBoost: 300
  }, un = {
    vector: {
      name: "VECTOR / 01", color: "#36efff", cost: 0, description: "Balanced street runner", silhouette: "wedge", speed: 0, accel: 0, steer: 0, armor: 0, nitro: 0
    }, spectre: {
      name: "SPECTRE / 02", color: "#f354df", cost: 700, description: "Legacy agile racer", silhouette: "spectre", speed: 6, accel: 4, steer: 2, armor: 0, nitro: 2
    }, phantom: {
      name: "PHANTOM GT", color: "#e858c9", cost: 900, description: "Low aerodynamic racer", silhouette: "gt", speed: 7, accel: 4, steer: 2, armor: 0, nitro: 2
    }, nightfall: {
      name: "NIGHTFALL", color: "#ff6b45", cost: 1100, description: "Aggressive neon muscle", silhouette: "muscle", speed: 3, accel: 3, steer: - 1, armor: .12, nitro: 1
    }, cyberx: {
      name: "CYBER X", color: "#a36cff", cost: 1700, description: "Angular future supercar", silhouette: "cyber", speed: 10, accel: 5, steer: 1, armor: .04, nitro: 3
    }, interceptor: {
      name: "INTERCEPTOR", color: "#f4f7ff", cost: 2200, description: "Police pursuit specialist", silhouette: "police", speed: 7, accel: 3, steer: 2, armor: .14, nitro: 2
    }, vortex: {
      name: "VORTEX", color: "#ffb642", cost: 2700, description: "Ultra-light cornering machine", silhouette: "open", speed: 4, accel: 6, steer: 4, armor: - .04, nitro: 3
    }, titan: {
      name: "TITAN", color: "#9cff57", cost: 3400, description: "Heavy armored survivor", silhouette: "armor", speed: - 3, accel: - 2, steer: - 2, armor: .3, nitro: 0
    }, nova: {
      name: "NOVA", color: "#fff05a", cost: 5200, description: "Endgame hypercar", silhouette: "hyper", speed: 14, accel: 7, steer: 3, armor: .1, nitro: 5
    }
  };
  function wd(n, e) {
    if (Object.hasOwn(n.upgrades, e)) {
      let t = n.upgrades[e], i = rl(t);
      return t >= 5 || n.credits < i?!1: (n.credits -= i, n.upgrades[e]++, !0)
    }
    if (Object.hasOwn(Vi, e)) {
      let t = e === "flightBoost"?"flight": "shield", i = Vi[e];
      return n.credits < i?!1: (n.credits -= i, n.boosters[t] = (n.boosters[t] || 0) + 1, !0)
    }
    if (Object.hasOwn(un, e)) {
      if (!n.owned.includes(e)) {
        if (n.credits < un[e].cost)return!1;
        n.credits -= un[e].cost, n.owned.push(e)
      }
      return n.car = e, !0
    }
    return!1
  }
  function Ad(n, e, t = "") {
    if (e.claimed || !["escaped", "wrecked"].includes(e.status))return 0;
    e.claimed = !0;
    let i = Math.floor(e.distance / 55) + (e.status === "escaped"?180: 0) + e.smashed * 7 + e.near * 2 + Math.floor((e.score || 0) / 65) + (e.runCredits || 0);
    n.bestScore = Math.max(n.bestScore || 0, e.score || 0), n.credits += i, n.runs++, n.best = Math.max(n.best, Math.floor(e.distance)), t && (n.dailyDate !== t && (n.dailyBest = 0), n.dailyDate = t, n.dailyBest = Math.max(n.dailyBest, Math.floor(e.distance)));
    let s = {
      escape: e.time >= 180 || e.status === "escaped", smash: e.smashed >= 3, air: e.jumps >= 3, boost: e.boostTime >= 30, clean: e.score >= 2e4 && e.damageTaken === 0
    };
    for (let r of Object.keys(s))s[r] && !n.achievements.includes(r) && n.achievements.push(r);
    return i
  }
  var Zc = {
    speed: {
      name: "ENGINE", effect: "+3 m/s maximum speed per level"
    }, handling: {
      name: "HANDLING", effect: "+1.2 lateral response per level"
    }, nitro: {
      name: "NITRO", effect: "Lower consumption and stronger boost"
    }, armor: {
      name: "ARMOR", effect: "-7% incoming damage per level"
    }, collector: {
      name: "MAGNET", effect: "+0.18 pickup range per level"
    }, drone: {
      name: "DRONE AI", effect: "Faster obstacle targeting and fire rate"
    }, medic: {
      name: "REPAIR SYSTEM", effect: "+1 hull restored per heart"
    }, booster: {
      name: "BOOST CAPACITOR", effect: "Faster Nitro recharge; Flight / Shield remain 15 seconds"
    }, dronePower: {
      name: "DRONE WEAPONS", effect: "More score per overcharged destruction; power lasts 15 seconds"
    }
  };
  function ol(n = {
  }, e = "vector") {
    let t = un[e] || un.vector, caps = {
      vector: 460, spectre: 505, phantom: 525, nightfall: 490, cyberx: 565, interceptor: 540, vortex: 525, titan: 450, nova: 600
    }, normalCap = Math.min(700, (caps[e] || 460) + (n.speed || 0) * 20) / 3.6;
    return {
      speed: 62 + t.speed + (n.speed || 0) * 3, normalCap, accel: 1 + t.accel * .04 + (n.speed || 0) * .02, steer: 12 + t.steer + (n.handling || 0) * 1.2, nitroDrain: Math.max(8, 26 - t.nitro - (n.nitro || 0) * 3), damageScale: Math.max(.4, 1 - t.armor - (n.armor || 0) * .07), pickupRange: 2.05 + (n.collector || 0) * .18, repair: 6 + (n.medic || 0), droneCooldown: NeonFeel.DRONE_ATTACK_SECONDS, droneTargets: 1, droneRange: 130 + (n.drone || 0) * 16, droneBonus: 50 + (n.dronePower || 0) * 25, flightDuration: NeonFeel.POWER_SECONDS, shieldDuration: NeonFeel.POWER_SECONDS
    }
  }
  var Wr = {
    escape: "Long haul \xB7 Survive 3 minutes", smash: "Breaker \xB7 Shatter 3 barriers", air: "Airborne \xB7 Take 3 ramps", boost: "Nitro addict \xB7 Boost for 30 seconds", clean: "Untouchable \xB7 20k without damage"
  }, Bt = (n, e) => Number.isFinite(n)?Math.max(0, Math.min(e, Math.floor(n))): 0;
  function sanitizeProgression(value) {
    const p = value && typeof value === "object" ? value : {};
    return {
      level: Math.max(1, Math.min(999, Math.floor(Number(p.level) || 1))),
      xp: Bt(Number(p.xp) || 0, 99999999),
      totalXp: Bt(Number(p.totalXp) || 0, 999999999),
      driftHinted: p.driftHinted === true
    };
  }
  function sanitizeGhost(value) {
    if (!value || typeof value !== "object") return null;
    const rawPath = Array.isArray(value.path) ? value.path : [];
    const path = [];
    for (const point of rawPath.slice(-2400)) {
      const t = Array.isArray(point) ? point[0] : point?.t;
      const d = Array.isArray(point) ? point[1] : point?.d;
      const x = Array.isArray(point) ? point[2] : point?.x;
      if (![t, d, x].every(Number.isFinite)) continue;
      path.push([+t.toFixed(2), +d.toFixed(1), +x.toFixed(2)]);
    }
    if (!path.length) return null;
    const car = Object.hasOwn(un, value.car) ? value.car : "vector";
    return {
      bestDistance: Math.max(0, Number(value.bestDistance) || 0),
      car,
      path
    };
  }
  function Ls(n) {
    let e;
    try {
      e = JSON.parse(n);
    } catch {
    }
    e = e && typeof e === "object" ? e : {};
    e.owned = Array.isArray(e.owned) ? e.owned : [];
    const owned = [...new Set(["vector", ...e.owned.filter((id) => Object.hasOwn(un, id))])];
    const selectedCar = e.car;
    const updatedAt = Number.isFinite(Number(e.updatedAt)) ? Math.max(0, Math.floor(Number(e.updatedAt))) : 0;
    return {
      version: 3,
      updatedAt,
      credits: Bt(e.credits, 9999999),
      upgrades: {
        speed: Bt(e.upgrades?.speed, 5),
        handling: Bt(e.upgrades?.handling, 5),
        nitro: Bt(e.upgrades?.nitro, 5),
        armor: Bt(e.upgrades?.armor, 5),
        collector: Bt(e.upgrades?.collector, 5),
        drone: Bt(e.upgrades?.drone, 5),
        medic: Bt(e.upgrades?.medic, 5),
        booster: Bt(e.upgrades?.booster, 5),
        dronePower: Bt(e.upgrades?.dronePower, 5)
      },
      boosters: {
        flight: Bt(e.boosters?.flight, 99),
        shield: Bt(e.boosters?.shield, 99)
      },
      owned,
      car: Object.hasOwn(un, selectedCar) && owned.includes(selectedCar) ? selectedCar : "vector",
      skin: ["cyan", "pink", "gold"].includes(e.skin) ? e.skin : "cyan",
      achievements: Array.isArray(e.achievements)
        ? [...new Set(e.achievements.filter((id) => Object.hasOwn(Wr, id)))]
        : [],
      best: Bt(e.best, 9999999),
      bestScore: Bt(e.bestScore, 99999999),
      runs: Bt(e.runs, 999999),
      dailyBest: Bt(e.dailyBest, 9999999),
      dailyDate: typeof e.dailyDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(e.dailyDate) ? e.dailyDate : "",
      missionClaims: Array.isArray(e.missionClaims)
        ? [...new Set(e.missionClaims.filter((id) => typeof id === "string" && /^\d{4}-\d{2}-\d{2}:[a-z]+$/.test(id)))].slice(-14)
        : [],
      progression: sanitizeProgression(e.progression),
      ghost: sanitizeGhost(e.ghost),
      processedPurchases: Array.isArray(e.processedPurchases)
        ? [...new Set(e.processedPurchases.filter((id) => typeof id === "string" && id.length > 0))].slice(-100)
        : [],
      mute: e.mute === true,
      music: e.music !== false,
      graphics: ["low", "auto", "high"].includes(e.graphics) ? e.graphics : "auto"
    };
  }

  var It = 1 / 60, Cd = NeonCollision.danger, Rd = ["roadblock", "nitroRush", "bonusZone", "riftStorm", "meteorShower", "gravityWave", "timeFracture"];
  function qr(n) {
    let e = n >>> 0;
    return() => {
      e += 1831565813;
      let t = e;
      return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296
    }
  }
  function Tx(n, e, t = 0) {
    return {
      index: e, distance: 170 + e * 85, safeX: 0, objects: [], tier: t
    }
  }
  function Xr(n, e = n.next) {
    if (n.rows.has(e))return n.rows.get(e);
    if (e < n.next)return null;
    n.plannedIndex < n.next - 1 && (n.plannedIndex = n.next - 1, n.plannedDistance = Math.max(85 + n.next * 85, n.distance + 85));
    for (let t = n.plannedIndex + 1;
    t <= e;
    t++) {
      let i = Tx(n.seed, t, n.tier);
      n.plannedDistance += NeonExpansion.difficulty(n.plannedDistance, n.speed || n.stats.speed, n.time).gap, i.distance = n.plannedDistance, NeonExpansion.row(n, i), wx(n, i), NeonExpansion.sanitizeRow?.(n, i), NeonCollision.fairRow(n, i), NeonExpansion.sanitizeRow?.(n, i), n.rows.set(t, i), n.plannedIndex = t
    }
    return n.rows.get(e)
  }
  function wx(n, e) {
    if (!n.event)return;
    let t = [ - 5, 0, 5];
    if (n.event.type === "roadblock") {
      e.objects = e.objects.filter(i => i.type !== "barrier");
      for (let i of t)i !== e.safeX && e.objects.push({
        x: i, type: "barrier"
      })
    } else n.event.type === "nitroRush"?e.objects.push({
      x: e.safeX, type: "nitro"
    }): n.event.type === "bonusZone" && e.objects.push({
      x: e.safeX, type: e.index % 2?"coin": "scoreBoost"
    }), ["riftStorm", "meteorShower"].includes(n.event.type) && e.index % 2 === 0 && e.objects.push({
      x: e.safeX === - 5?5: - 5, type: n.event.type === "meteorShower"?"rock": "laser"
    })
  }
  function Id(n) {
    let e = qr(n.seed + n.eventCount * 104729);
    n.nextEventAt = n.time + 38 + e() * 20
  }
  function Ax(n) {
    let e = qr(n.seed + n.eventCount * 65537), t = (n.distance < 700?Rd.slice(0, 3): Rd)[Math.floor(e() * (n.distance < 700?3: Rd.length))];
    n.event = {
      type: t, until: n.time + 8 + (t === "dangerZone"?4: 0)
    };
    for (let k of NeonExpansion.applyRunEvent(n, t))Jr(k);
    n.eventCount++, n.events.push({
      type: "run-event", event: t
    }), Id(n)
  }
  function Pd(n = 1, e = {
  }, t = "vector") {
    let i = {
      seed: n >>> 0, ticks: 0, acc: 0, time: 0, distance: 0, speed: 0, x: 0, vx: 0, health: 100, nitro: 100, status: "running", sector: 0, upgrades: e, car: t, stats: ol(e, t), air: 0, smashed: 0, jumps: 0, cells: 0, near: 0, next: 0, events: [], boostTime: 0, boost: !1, nitroLocked: !1, combo: 0, comboLeft: 0, bestCombo: 0, score: 0, overdrive: 0, wave: "cruise", waveStart: 16, tier: 0, distanceScore: 0, targetSpeed: 62, rows: new Map, plannedIndex: - 1, plannedDistance: 85, shield: 0, timedShield: 0, shieldGrace: 0, damageTaken: 0, mirrorGrace: 0, event: null, eventCount: 0, nextEventAt: 0, runCredits: 0, magnet: 0, doubleScore: 0, superNitro: 0, dronePower: 0, cleanTime: 0, overdriveCharge: 0, overdriveReady: !1, maxSpeedSeen: 0
    };
    return Id(i), NeonUpperRoute?.init(i), NeonExpansion.init(i)
  }
  function Dd(n, e, t = {
  }) {
    if (n.status === "running")for (n.acc += Math.min(.1, Math.max(0, e));
    n.acc + 1e-9 >= It && n.status === "running";
    ) {
      const previous = NeonCollision.capture(n);
      n.acc -= It, n.ticks++, n.time = n.ticks * It, !n.event && !n.dimension && n.time >= n.nextEventAt && (n.portals > 0 || n.time >= 90) && Ax(n), n.event && n.time >= n.event.until && (n.events.push({
        type: "run-event-end", event: n.event.type
      }), n.event = null);
      let i = Math.floor(n.score / 1e4);
      i !== n.tier && (n.tier = i, n.events.push({
        type: "tier", tier: i
      })), n.sector = n.tier % 3, n.overdrive = Math.max(0, n.overdrive - It), n.comboLeft = Math.max(0, n.comboLeft - It), n.shieldGrace = Math.max(0, n.shieldGrace - It), n.mirrorGrace = Math.max(0, (n.mirrorGrace || 0) - It), t.jump && !n._jumpHeld && n.air <= 0 && n.flight <= 0 && Date.now() >= (n._jumpReadyAt || 0) && (n.air = 1.55, n._rampAir = 0, n.jumps++, Xt(n, 180), n.events.push({
        type: "free-jump"
      }), n._jumpReadyAt = Date.now() + 3000), n._jumpHeld = !!t.jump, n.invulnerable = Math.max(0, (n.invulnerable || 0) - It), n.magnet = Math.max(0, n.magnet - It), n.doubleScore = Math.max(0, n.doubleScore - It), n.superNitro = Math.max(0, n.superNitro - It), n.dronePower = Math.max(0, n.dronePower - It), n.cleanTime += It, n.cleanTime >= 12 && (n.cleanTime = 0, Xt(n, 100)), n.comboLeft === 0 && (n.combo = 0), n.waveStart = Math.max(10, 16 - n.tier);
      let rhythm = n.rows.get(n.next)?.rhythm, seconds = n.time % 72, r = n.tutorialMode === true?(n.time < 118?"cruise": seconds >= 48 && seconds < 60?"hot": "cruise"): rhythm === "chase"?"hot": rhythm === "speed" && n.rows.get(n.next)?.index % 36 >= 23?"warning": "cruise";
      NeonFeel.policeWave(n, r), t.nitro || (n.nitroLocked = !1), n.boost = !!t.nitro && !n.nitroLocked && (n.boost?n.nitro > 0: n.nitro >= 20), n.nitro = Math.max(0, Math.min(100, n.nitro + (n.boost?(n.superNitro > 0?0: - n.stats.nitroDrain): 12 + (n.upgrades?.booster || 0) * .8) * It)), n.boost && n.nitro === 0 && (n.boost = !1, n.nitroLocked = !0);
      let o = 0, a = 1;
      NeonFeel.powerTick(n, It, NeonExpansion.difficulty(n.distance, n.speed, n.time).speed, NeonFeel.MAX_SPEED, n.boost);
      NeonFeel.portalTick(n, It);
      let l = 1 - .16 * Math.min(1, n.speed / NeonFeel.MAX_SPEED), c = Math.max( - 1, Math.min(1, t.steer || 0)) * n.stats.steer * l, h = 1 - Math.exp( - It * (t.steer?22: 16));
      n.vx += (c - n.vx) * h, n.bodyYaw = (n.bodyYaw || 0) + (Math.max( - .14, Math.min(.14, - n.vx * .012)) - (n.bodyYaw || 0)) * (1 - Math.exp( - It * 10)), n.x = Math.max( - 6.8, Math.min(6.8, n.x + n.vx * It)), n.air = Math.max(0, n.air - It), n.boost && (n.boostTime += It), n.distance += n.speed * It, NeonExpansion.tick(n, It), n.speed = NeonFeel.clamp(n.speed), n.maxSpeedSeen = Math.max(n.maxSpeedSeen || 0, n.speed);
      let u = (n.doubleScore > 0?2: 1) * (n.event?.type === "bonusZone"?2: 1) * (NeonUpperRoute?.scoreMultiplier(n) || 1), d = Math.floor(n.distance * 2);
      n.score += (d - n.distanceScore) * u, n.distanceScore = d, Xr(n, n.next + NeonFeel.lookahead(n.speed));
      NeonRamp.launchAtFrontContact(n, previous.distance, n.distance, (f, m, x) => {
        let outcome = Rx(n, m);
        n.events.push({
          type: "ramp", index: f.index, j: x, x: m.x, outcome
        });
      });
      for (const row of n.rows.values()) {
        const maxOffset = row.objects.reduce((m, o) => Math.max(m, Number(o.distanceOffset) || 0), 0);
        if (row.distance + maxOffset < previous.distance - 18)continue;
        if (row.distance > n.distance + (n.magnet > 0?52: 26))break;
        row.objects.forEach((object, j) => {
          if (n.status !== "running" || object.x === 99 || object.resolved || object.type === "ramp" || (NeonUpperRoute && !NeonUpperRoute.activeFor(n, object)))return;
          if (NeonCollision.danger.includes(object.type)) {
            const hit = NeonCollision.contact(n, previous, row, object);
            if (hit !== null) {
              object.resolved = true;
              const outcome = Rx(n, object);
              n.events.push({
                type: object.type, index: row.index, j, x: NeonCollision.objectX(n, row, object), outcome, contact: hit
              });
              if (outcome === "damage")n.impactTime = .12;
              return;
            }
            const cfg = NeonCollision.collider(object), body = NeonCollision.chassis(n.car), objectDistance = NeonCollision.objectDistance(row, object);
            if (NeonCollision.crossed(previous, n, objectDistance + cfg.maxZ + body.hz)) {
              object.resolved = true;
              if (object.tutorial && object.lesson === "dodge")n.events.push({
                type: "dodge", index: row.index, j, x: object.x, outcome: "dodge"
              });
              if (NeonCollision.near(n, previous, row, object)) {
                NeonExpansion.nearMiss(n);
                n.events.push({
                  type: "near", index: row.index, j, x: object.x
                });
              } else if (n.air > 0 && Math.abs(n.x - object.x) < body.hx + Math.max(...cfg.parts.map(b => b.hx))) {
                n.jumpDodges++;
                Xt(n, 110);
                n.events.push({
                  type: "jump-dodge", index: row.index, j, x: object.x, outcome: "jump"
                });
              }
            }
          } else {
            if (object.type === "coin" && n.magnet > 0) {
              const dz = NeonCollision.objectDistance(row, object) - n.distance;
              if (dz < 48 && dz > - 6)object.x += (n.x - object.x) * (1 - Math.exp( - It * 5));
            }
            if (NeonCollision.trigger(n, previous, row, object)) {
              const outcome = Rx(n, object);
              object.resolved = true;
              object.x = 99;
              n.events.push({
                type: object.type, index: row.index, j, x: n.x, outcome
              });
            }
          }
        });
      } while (Xr(n).distance < n.distance - 14 && n.status === "running") {
        n.next++;
        n.rows.delete(n.next - 3);
      }
    }
  }
  function Xt(n, e) {
    n.combo++, n.bestCombo = Math.max(n.bestCombo, n.combo), n.comboLeft = 5;
    let t = [1, 2, 3, 5, 8][Math.min(4, Math.floor(n.combo / 3))], o = n.overdrive > 0?1.65: 1;
    n.score += e * t * (n.doubleScore > 0?2: 1) * o, n.nitro = Math.min(100, n.nitro + 4), n.overdriveCharge = Math.min(100, (n.overdriveCharge || 0) + Math.min(16, 4 + t * 2)), n.overdriveCharge >= 100 && !n.overdriveReady && (n.overdriveReady = !0, n.events.push({
      type: "overdrive-ready"
    }))
  }
  function Ld(n, e) {
    return!n || !e || !Cd.includes(e.type) || (NeonUpperRoute && !NeonUpperRoute.activeFor(n, e)) || !NeonFeel.destroyObstacle(n, e)?!1: (n.statsDestroyedByDrone = (n.statsDestroyedByDrone || 0) + 1, n.smashed = (n.smashed || 0) + 1, Xt(n, n.dronePower > 0?360: 180), n.events?.push?.({
      type: "drone-shot", target: e.type, index: e.index, j: e.j, x: e.x
    }), !0)
  }
  function Rx(n, e) {
    if (n.status !== "running")return "ignored";
    if (NeonExpansion.hazards.includes(e.type) || ["portal", "phaseShard", "risk", "chain"].includes(e.type)) {
      let result = NeonExpansion.hit(n, e);
      if (e.type === "portal" && result === "portal") {
        NeonFeel.portalEnter(n);
        if (n.dimension === "mirror")n.mirrorGrace = 1;
      }
      return result;
    }
    if (e.type === "ramp") {
      if (e.routeAction === "ENTER_UPPER" && NeonUpperRoute?.take(n, e))return Xt(n, 250), "upper-route";
      return n.air = Math.max(n.air, 1.9), n._rampAir = 1, n.jumps++, Xt(n, 250), "jump"
    }
    if (e.type === "cell")return n.health = Math.min(100, n.health + n.stats.repair), n.cells++, Xt(n, 100), "pickup";
    if (e.type === "nitro")return n.nitro = Math.min(100, n.nitro + 45), Xt(n, 120), "pickup";
    if (e.type === "energyShield")return NeonFeel.activateShield(n), Xt(n, 150), "pickup";
    if (e.type === "coin") {
      const count = Math.max(1, Math.min(10, e.trailCount | 0 || 1));
      return n.runCredits += 5 * count, Xt(n, 120 * count), "pickup";
    }
    if (e.type === "magnet")return n.magnet = 10, Xt(n, 140), "pickup";
    if (e.type === "double")return n.doubleScore = NeonFeel.SCORE_SECONDS, Xt(n, 160), "pickup";
    if (e.type === "superNitro")return n.superNitro = 6, n.nitro = Math.min(100, n.nitro + 30), Xt(n, 220), "pickup";
    if (e.type === "flight" || e.type === "flightBoost")return NeonFeel.activateFlight(n), Xt(n, 180), "pickup";
    if (e.type === "dronePower")return n.dronePower = NeonFeel.DRONE_POWER_SECONDS, Xt(n, 220), "pickup";
    if (e.type === "scoreBoost")return n.doubleScore = NeonFeel.SCORE_SECONDS, Xt(n, 180), "pickup";
    return "ignored";
  }
  function Nd(n, e = !1) {
    let t = n[0].index !== null, i = new Set(Object.keys(n[0].attributes)), s = new Set(Object.keys(n[0].morphAttributes)), r = {
    }, o = {
    }, a = n[0].morphTargetsRelative, l = new mt, c = 0;
    for (let h = 0;
    h < n.length;
    ++h) {
      let u = n[h], d = 0;
      if (t !== (u.index !== null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
      for (let f in u.attributes) {
        if (!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + '. All geometries must have compatible attributes; make sure "' + f + '" attribute exists among all geometries, or in none of them.'), null;
        r[f] === void 0 && (r[f] = []), r[f].push(u.attributes[f]), d++
      }
      if (d !== i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". Make sure all geometries have the same number of attributes."), null;
      if (a !== u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
      for (let f in u.morphAttributes) {
        if (!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ".  .morphAttributes must be consistent throughout all geometries."), null;
        o[f] === void 0 && (o[f] = []), o[f].push(u.morphAttributes[f])
      }
      if (e) {
        let f;
        if (t)f = u.index.count;
        else if (u.attributes.position !== void 0)f = u.attributes.position.count;
        else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". The geometry must have either an index or a position attribute"), null;
        l.addGroup(c, f, h), c += f
      }
    }
    if (t) {
      let h = 0, u = [];
      for (let d = 0;
      d < n.length;
      ++d) {
        let f = n[d].index;
        for (let m = 0;
        m < f.count;
        ++m)u.push(f.getX(m) + h);
        h += n[d].attributes.position.count
      }
      l.setIndex(u)
    }
    for (let h in r) {
      let u = Ud(r[h]);
      if (!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + h + " attribute."), null;
      l.setAttribute(h, u)
    }
    for (let h in o) {
      let u = o[h][0].length;
      if (u === 0)break;
      l.morphAttributes = l.morphAttributes || {
      }, l.morphAttributes[h] = [];
      for (let d = 0;
      d < u;
      ++d) {
        let f = [];
        for (let x = 0;
        x < o[h].length;
        ++x)f.push(o[h][x][d]);
        let m = Ud(f);
        if (!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + h + " morphAttribute."), null;
        l.morphAttributes[h].push(m)
      }
    }
    return l
  }
  function Ud(n) {
    let e, t, i, s = - 1, r = 0;
    for (let c = 0;
    c < n.length;
    ++c) {
      let h = n[c];
      if (e === void 0 && (e = h.array.constructor), e !== h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
      if (t === void 0 && (t = h.itemSize), t !== h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
      if (i === void 0 && (i = h.normalized), i !== h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
      if (s === - 1 && (s = h.gpuType), s !== h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
      r += h.count * t
    }
    let o = new e(r), a = new Ct(o, t, i), l = 0;
    for (let c = 0;
    c < n.length;
    ++c) {
      let h = n[c];
      if (h.isInterleavedBufferAttribute) {
        let u = l / t;
        for (let d = 0, f = h.count;
        d < f;
        d++)for (let m = 0;
        m < t;
        m++) {
          let x = h.getComponent(d, m);
          a.setComponent(d + u, m, x)
        }
      } else o.set(h.array, l);
      l += h.count * t
    }
    return s !== void 0 && (a.gpuType = s), a
  }
  var al = {
    pink: 16727977, cyan: 2154495, magenta: 16727977, gold: 16761421, lime: 10485587, violet: 9857791, red: 16729422
  };
  function Mt(n, e = 0, t = .65) {
    return new hi({
      color: n, emissive: n, emissiveIntensity: e, metalness: t, roughness: .36, flatShading: !0
    })
  }
  function Je(n, e, t, i, s = 0, r = 0, o = 0, a) {
    let l = new Et(t, i);
    return l.name = e, l.position.set(s, r, o), a && l.rotation.set(...a), l.castShadow = !0, l.receiveShadow = !0, n.add(l), l
  }
  function Oe(n, e, t, i, s, r, o = 0, a = 0, l = 0, c) {
    return Je(n, e, new In(i, s, r), t, o, a, l, c)
  }
  function Jn(n) {
    let e = n.flatMap(([o, a, l, c]) => [ - a, l, o, a, l, o, a, c, o, - a, c, o]), t = [0, 2, 1, 0, 3, 2];
    for (let o = 0;
    o < n.length - 1;
    o++)for (let a = 0;
    a < 4;
    a++) {
      let l = o * 4 + a, c = o * 4 + (a + 1) % 4, h = c + 4, u = l + 4;
      t.push(l, c, h, l, h, u)
    }
    let i = (n.length - 1) * 4;
    t.push(i, i + 1, i + 2, i, i + 2, i + 3);
    let s = new mt;
    s.setAttribute("position", new Qe(e, 3)), s.setIndex(t);
    let r = s.toNonIndexed();
    return s.dispose(), r.computeVertexNormals(), r
  }
  function dn(n, e, t, i) {
    let s = t.map(o => {
      o.updateMatrix();
      let a = o.geometry.index?o.geometry.toNonIndexed(): o.geometry.clone();
      return a.applyMatrix4(o.matrix), o.geometry.dispose(), n.remove(o), a
    }), r = Nd(s, !1);
    return s.forEach(o => o.dispose()), Je(n, e, r, i)
  }
  function $c(n, e, t, i, s, r = .36) {
    let o = [], a = [];
    for (let l of s)for (let c of[ - 1, 1])o.push(Je(n, "tire", new nn(r, r, .25, 12), e, c * i, r, l, [0, 0, Math.PI / 2])), a.push(Je(n, "hub", new nn(r * .55, r * .55, .035, 6), t, c * (i + .135), r, l, [0, 0, Math.PI / 2]));
    dn(n, "wheels", o, e), dn(n, "hubs", a, t)
  }
  window.NeonArtKit = {
    Group: Gt, Mesh: Et, Shape: Pi, ExtrudeGeometry: Ms, BufferGeometry: mt, Float32BufferAttribute: Qe, Color: ke, skinColors: al, BoxGeometry: In, TorusGeometry: cn, CylinderGeometry: nn, ConeGeometry: li, IcosahedronGeometry: ci, SphereGeometry: xr, StandardMaterial: hi, InstancedMesh: ms, Matrix4: nt, material: Mt, mesh: Je, box: Oe, wedge: Jn
  };
  function Jc(n) {
    let e = new Gt;
    e.name = `obstacle-${n}`, e.userData.type = n;
    if (window.NeonPickups?.has(n))return window.NeonPickups.create(e, n);
    if (n === "rock")return NeonHazards.rock(e);
    if (["portal", "hurdle", "barrier", "drone", "ramp", "roadwork", "laser", "gate"].includes(n)) {
      if (["laser", "gate"].includes(n))e.userData.boostBreakable = false;
      NeonArt.decorateObject(e, n);
      return e;
    }
    let t = Mt(1516603), i = Mt(16055295, .8), s = Mt(6321033), r = Mt(16759860, .4), o = Mt(2157311, 2.5), a = Mt(16726058, 3), l = Mt(3505663, 3), c = new Set;
    if (n === "chain") {
      e.userData.visualFamily = "pickup";
      Je(e, "energy-chain", new cn(.60, .045, 6, 20), Mt(0x62f4ff, 1.7, 0), 0, 1.75, 0);
      Je(e, "energy-chain-link", new cn(.42, .05, 6, 16), Mt(0xffd56d, 1.5, 0), 0, 1.75, .08);
    } else if (n === "risk") {
      e.userData.visualFamily = "optional-risk";
      for (const side of[ - 1, 1])Oe(e, "risk-warning-post", r, .15, 2.4, .18, side * 1.65, 1.2, 0);
      Oe(e, "risk-reward-chevron", r, 1.2, .13, .1, 0, 2.35, 0);
    } else if (["traffic", "police"].includes(n))Je(e, n + "-body", Jn([[ - 2, 1.15, .25, .55], [ - 1.25, 1.25, .25, .85], [1.55, 1.15, .25, .72], [2, 1, .25, .55]]), n === "police"?i: r), $c(e, Mt(527379), s, 1.1, [ - 1.25, 1.2], .38), n === "police" && (Oe(e, "police-red", a, .5, .12, .25, - .3, 1.05), Oe(e, "police-blue", l, .5, .12, .25, .3, 1.05));
    else if (n === "falling")Je(e, "falling-crate", new ci(1.25, 0), s, 0, 1.25), Oe(e, "falling-core", a, .45, .45, .45, 0, 1.25);
    else if (n === "truck") {
      e.userData.unbreakable = !0, e.userData.boostBreakable = !1, Je(e, "armored-cargo", Jn([[ - .7, 1.48, .45, 2.8], [2.5, 1.48, .45, 2.8]]), t), Je(e, "cab", Jn([[ - 2.5, 1.4, .4, 1.45], [ - 1.9, 1.44, .4, 2.5], [ - .7, 1.48, .4, 2.65]]), s), Je(e, "cab-windows", Jn([[ - 2.32, 1.29, 1.55, 1.65], [ - 1.88, 1.3, 1.6, 2.36], [ - .85, 1.3, 1.6, 2.42]]), Mt(1129300, .35)), $c(e, Mt(527379, 0, .05), s, 1.4, [ - 1.65, 1.4], .48), Oe(e, "bumper", s, 3.05, .23, .3, 0, .5, - 2.43), Oe(e, "rear-door", s, 2.5, 1.95, .05, 0, 1.65, 2.53);
      let h = [];
      for (let d = - 3;
      d <= 3;
      d++)h.push(Oe(e, "stripe", r, .19, .55, .06, d * .34, .91, 2.57, [0, 0, .5]));
      dn(e, "hazard-rear", h, r);
      let u = [];
      for (let d of[ - .5, .8, 2.1])u.push(Oe(e, "rib", s, 3.03, .11, .13, 0, 2.75, d));
      dn(e, "armor-ribs", u, s);
      for (let d of[ - 1, 1])Oe(e, "headlight", o, .6, .15, .06, d * .88, 1.14, - 2.43), Oe(e, "rear-light", a, .18, .7, .06, d * 1.33, 1.65, 2.56)
    } else if (n === "mine") {
      e.userData.type = "rock";
      return NeonHazards.rock(e)
    } else throw new RangeError(`Unknown obstacle type: ${n}`);
    e.userData.visualFamily = e.userData.visualFamily || "hazard";
    e.userData.silhouette = n;
    e.traverse(h => {
      h.isMesh && c.add(h.material)
    });
    for (let h of[t, s, r, o, a, l])c.has(h) || h.dispose();
    window.NeonArt?.decorateObject?.(e, n);
    return e
  }
  function ll(n) {
    if (!n || n.userData.disposed)return;
    let e = new Set;
    n.traverse(t => {
      if (t.isMesh) {
        if (t.geometry !== uh && !t.geometry.userData?.neonShared)e.add(t.geometry);
        for (let i of Array.isArray(t.material)?t.material: [t.material])if (!Object.values(lt).includes(i) && !i?.userData?.neonShared)e.add(i)
      }
    }), e.forEach(t => t.dispose()), n.userData.disposed = !0
  }
  function Kc(n = "vector", e = "cyan") {
    const t = window.NeonVehicles.create(n, e);
    window.NeonArt?.decorateVehicle?.(t, n, e);
    return t
  }
  var Fd = [{
    id: "score", label: "Score 12,000 points", target: 12e3, reward: 180
  }, {
    id: "distance", label: "Drive 3.0 km", target: 3e3, reward: 160
  }, {
    id: "cells", label: "Collect 8 energy cells", target: 8, reward: 140
  }, {
    id: "ramps", label: "Hit 5 ramps", target: 5, reward: 150
  }, {
    id: "combo", label: "Reach a \xD74 chain", target: 4, reward: 170
  }];
  function Cx(n) {
    let e = 2166136261;
    for (let t of n)e ^= t.charCodeAt(0), e = Math.imul(e, 16777619);
    return e >>> 0
  }
  function Qc(n) {
    return {
      ...Fd[Cx(n) % Fd.length]
    }
  }
  function Ix(n, e) {
    let t = 0;
    return n.id === "score"?t = e.score || 0: n.id === "distance"?t = e.distance || 0: n.id === "cells"?t = e.stats?.cells || 0: n.id === "ramps"?t = e.stats?.ramps || 0: n.id === "combo" && (t = e.bestCombo || 0), Math.min(n.target, Math.max(0, t))
  }
  function Od(n, e, t, i) {
    n.missionClaims = Array.isArray(n.missionClaims)?n.missionClaims: [];
    let s = e + ":" + t.id;
    return n.missionClaims.includes(s) || Ix(t, i) < t.target?0: (n.missionClaims.push(s), n.missionClaims = n.missionClaims.slice( - 14), n.credits = (n.credits || 0) + t.reward, t.reward)
  }
  var jc = {
    start: "START RUN", daily: "DAILY RUN", garage: "GARAGE", pause: "PAUSE", resume: "RESUME", endRun: "END RUN & RETURN", retry: "RUN IT BACK", garageHome: "GARAGE & HOME", mission: "TODAY\u2019S MISSION", missionState: "Complete it in any run", claimed: "CLAIMED", personalBest: "PERSONAL BEST", runTime: "RUN TIME", distance: "DISTANCE", score: "SCORE", pursuit: "POLICE PURSUIT", hull: "HULL INTEGRITY", shieldOff: "SHIELD OFFLINE", shieldOn: "SHIELD ARMED \xB7 1 HIT", nitro: "NITRO", chooseRide: "CHOOSE YOUR RIDE", performance: "PERFORMANCE", achievements: "ACHIEVEMENTS", credits: "CREDITS", endless: "ENDLESS", dailyMode: "DAILY", noFinish: "NO FINISH LINE / BEAT YOUR BEST", steer: "HOLD \u25C0 / \u25B6 TO STEER \xB7 REACH THE NEXT RIFT", boost: "HOLD NITRO TO BOOST; DODGE SOLID BLOCKS"
  }, eh = {
    start: "\u041D\u0410\u0427\u0410\u0422\u042C \u0417\u0410\u0415\u0417\u0414", daily: "\u0415\u0416\u0415\u0414\u041D\u0415\u0412\u041D\u042B\u0419 \u0417\u0410\u0415\u0417\u0414", garage: "\u0413\u0410\u0420\u0410\u0416", pause: "\u041F\u0410\u0423\u0417\u0410", resume: "\u041F\u0420\u041E\u0414\u041E\u041B\u0416\u0418\u0422\u042C", endRun: "\u0417\u0410\u0412\u0415\u0420\u0428\u0418\u0422\u042C \u0417\u0410\u0415\u0417\u0414", retry: "\u0415\u0429\u0401 \u0420\u0410\u0417", garageHome: "\u0413\u0410\u0420\u0410\u0416 \u0418 \u0413\u041B\u0410\u0412\u041D\u0410\u042F", mission: "\u0417\u0410\u0414\u0410\u041D\u0418\u0415 \u041D\u0410 \u0421\u0415\u0413\u041E\u0414\u041D\u042F", missionState: "\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432 \u043B\u044E\u0431\u043E\u043C \u0437\u0430\u0435\u0437\u0434\u0435", claimed: "\u041F\u041E\u041B\u0423\u0427\u0415\u041D\u041E", personalBest: "\u041B\u0418\u0427\u041D\u042B\u0419 \u0420\u0415\u041A\u041E\u0420\u0414", runTime: "\u0412\u0420\u0415\u041C\u042F", distance: "\u0414\u0418\u0421\u0422\u0410\u041D\u0426\u0418\u042F", score: "\u041E\u0427\u041A\u0418", pursuit: "\u041F\u041E\u0413\u041E\u041D\u042F", hull: "\u041F\u0420\u041E\u0427\u041D\u041E\u0421\u0422\u042C", shieldOff: "\u0429\u0418\u0422 \u041E\u0422\u041A\u041B\u042E\u0427\u0401\u041D", shieldOn: "\u0429\u0418\u0422 \u0410\u041A\u0422\u0418\u0412\u0415\u041D \xB7 1 \u0423\u0414\u0410\u0420", nitro: "\u041D\u0418\u0422\u0420\u041E", chooseRide: "\u0412\u042B\u0411\u0415\u0420\u0418\u0422\u0415 \u041C\u0410\u0428\u0418\u041D\u0423", performance: "\u0423\u041B\u0423\u0427\u0428\u0415\u041D\u0418\u042F", achievements: "\u0414\u041E\u0421\u0422\u0418\u0416\u0415\u041D\u0418\u042F", credits: "\u041A\u0420\u0415\u0414\u0418\u0422\u041E\u0412", endless: "\u0411\u0415\u0421\u041A\u041E\u041D\u0415\u0427\u041D\u042B\u0419", dailyMode: "\u0415\u0416\u0415\u0414\u041D\u0415\u0412\u041D\u042B\u0419", noFinish: "\u0424\u0418\u041D\u0418\u0428\u0410 \u041D\u0415\u0422 \xB7 \u041F\u041E\u0411\u0415\u0419\u0422\u0415 \u0420\u0415\u041A\u041E\u0420\u0414", steer: "\u0423\u0414\u0415\u0420\u0416\u0418\u0412\u0410\u0419\u0422\u0415 \u25C0 / \u25B6 \u0414\u041B\u042F \u041F\u041E\u0412\u041E\u0420\u041E\u0422\u0410", boost: "\u0423\u0414\u0415\u0420\u0416\u0418\u0412\u0410\u0419\u0422\u0415 \u041D\u0418\u0422\u0420\u041E, \u0427\u0422\u041E\u0411\u042B \u0420\u0410\u0417\u0411\u0418\u0412\u0410\u0422\u042C \u0411\u0410\u0420\u042C\u0415\u0420\u042B"
  }, Bd = {
    ...eh, start: "\u041F\u041E\u0427\u0410\u0422\u0418 \u0417\u0410\u0407\u0417\u0414", daily: "\u0429\u041E\u0414\u0415\u041D\u041D\u0418\u0419 \u0417\u0410\u0407\u0417\u0414", garage: "\u0413\u0410\u0420\u0410\u0416", resume: "\u041F\u0420\u041E\u0414\u041E\u0412\u0416\u0418\u0422\u0418", endRun: "\u0417\u0410\u0412\u0415\u0420\u0428\u0418\u0422\u0418 \u0417\u0410\u0407\u0417\u0414", retry: "\u0429\u0415 \u0420\u0410\u0417", mission: "\u0417\u0410\u0412\u0414\u0410\u041D\u041D\u042F \u041D\u0410 \u0421\u042C\u041E\u0413\u041E\u0414\u041D\u0406", missionState: "\u0412\u0438\u043A\u043E\u043D\u0430\u0439\u0442\u0435 \u0443 \u0431\u0443\u0434\u044C-\u044F\u043A\u043E\u043C\u0443 \u0437\u0430\u0457\u0437\u0434\u0456", claimed: "\u041E\u0422\u0420\u0418\u041C\u0410\u041D\u041E", personalBest: "\u041E\u0421\u041E\u0411\u0418\u0421\u0422\u0418\u0419 \u0420\u0415\u041A\u041E\u0420\u0414", runTime: "\u0427\u0410\u0421", distance: "\u0414\u0418\u0421\u0422\u0410\u041D\u0426\u0406\u042F", score: "\u041E\u0427\u041A\u0418", pursuit: "\u041F\u0415\u0420\u0415\u0421\u041B\u0406\u0414\u0423\u0412\u0410\u041D\u041D\u042F", hull: "\u041C\u0406\u0426\u041D\u0406\u0421\u0422\u042C", shieldOff: "\u0429\u0418\u0422 \u0412\u0418\u041C\u041A\u041D\u0415\u041D\u041E", shieldOn: "\u0429\u0418\u0422 \u0410\u041A\u0422\u0418\u0412\u041D\u0418\u0419 \xB7 1 \u0423\u0414\u0410\u0420", chooseRide: "\u041E\u0411\u0415\u0420\u0406\u0422\u042C \u0410\u0412\u0422\u041E", performance: "\u041F\u041E\u041A\u0420\u0410\u0429\u0415\u041D\u041D\u042F", achievements: "\u0414\u041E\u0421\u042F\u0413\u041D\u0415\u041D\u041D\u042F", endless: "\u041D\u0415\u0421\u041A\u0406\u041D\u0427\u0415\u041D\u041D\u0418\u0419", dailyMode: "\u0429\u041E\u0414\u0415\u041D\u041D\u0418\u0419", noFinish: "\u0424\u0406\u041D\u0406\u0428\u0423 \u041D\u0415\u041C\u0410\u0404 \xB7 \u041F\u041E\u0411\u0418\u0419\u0422\u0415 \u0420\u0415\u041A\u041E\u0420\u0414", steer: "\u0423\u0422\u0420\u0418\u041C\u0423\u0419\u0422\u0415 \u25C0 / \u25B6 \u0414\u041B\u042F \u041F\u041E\u0412\u041E\u0420\u041E\u0422\u0423", boost: "\u0423\u0422\u0420\u0418\u041C\u0423\u0419\u0422\u0415 \u041D\u0406\u0422\u0420\u041E, \u0429\u041E\u0411 \u0420\u041E\u0417\u0411\u0418\u0412\u0410\u0422\u0418 \u0411\u0410\u0420\u2019\u0404\u0420\u0418"
  }, Px = {
    overdrive: "OVERDRIVE", chainActions: "CHAIN 5 ACTIONS", policePursuit: "POLICE PURSUIT", surgeIncoming: "SURGE INCOMING", shieldTimed: "TIMED SHIELD", flightBoost: "FLIGHT BOOSTER", watchAd: "WATCH AD", noThanks: "NO THANKS", runComplete: "RUN COMPLETE", selectedChassis: "SELECTED CHASSIS"
  }, Dx = {
    overdrive: "\u0424\u041E\u0420\u0421\u0410\u0416", chainActions: "\u0426\u0415\u041F\u041E\u0427\u041A\u0410: 5 \u0414\u0415\u0419\u0421\u0422\u0412\u0418\u0419", policePursuit: "\u041F\u041E\u041B\u0418\u0426\u0415\u0419\u0421\u041A\u0410\u042F \u041F\u041E\u0413\u041E\u041D\u042F", surgeIncoming: "\u0423\u0421\u0418\u041B\u0415\u041D\u0418\u0415 \u041F\u041E\u0413\u041E\u041D\u0418", shieldTimed: "\u0412\u0420\u0415\u041C\u0415\u041D\u041D\u042B\u0419 \u0429\u0418\u0422", flightBoost: "\u041F\u041E\u041B\u0401\u0422\u041D\u042B\u0419 \u0411\u0423\u0421\u0422\u0415\u0420", watchAd: "\u0421\u041C\u041E\u0422\u0420\u0415\u0422\u042C \u0420\u0415\u041A\u041B\u0410\u041C\u0423", noThanks: "\u041D\u0415\u0422, \u0421\u041F\u0410\u0421\u0418\u0411\u041E", runComplete: "\u0417\u0410\u0415\u0417\u0414 \u0417\u0410\u0412\u0415\u0420\u0428\u0401\u041D", selectedChassis: "\u0412\u042B\u0411\u0420\u0410\u041D\u041D\u0410\u042F \u041C\u0410\u0428\u0418\u041D\u0410"
  }, Lx = {
    overdrive: "\u0424\u041E\u0420\u0421\u0410\u0416", chainActions: "\u041B\u0410\u041D\u0426\u042E\u0413: 5 \u0414\u0406\u0419", policePursuit: "\u041F\u041E\u041B\u0406\u0426\u0415\u0419\u0421\u042C\u041A\u0410 \u041F\u041E\u0413\u041E\u041D\u042F", surgeIncoming: "\u041F\u041E\u0421\u0418\u041B\u0415\u041D\u041D\u042F \u041F\u041E\u0413\u041E\u041D\u0406", shieldTimed: "\u0422\u0418\u041C\u0427\u0410\u0421\u041E\u0412\u0418\u0419 \u0429\u0418\u0422", flightBoost: "\u041F\u041E\u041B\u0406\u0422\u041D\u0418\u0419 \u0411\u0423\u0421\u0422\u0415\u0420", watchAd: "\u0414\u0418\u0412\u0418\u0422\u0418\u0421\u042F \u0420\u0415\u041A\u041B\u0410\u041C\u0423", noThanks: "\u041D\u0406, \u0414\u042F\u041A\u0423\u042E", runComplete: "\u0417\u0410\u0407\u0417\u0414 \u0417\u0410\u0412\u0415\u0420\u0428\u0415\u041D\u041E", selectedChassis: "\u0412\u0418\u0411\u0420\u0410\u041D\u0415 \u0410\u0412\u0422\u041E"
  };
  Object.assign(jc, Px);
  Object.assign(eh, Dx);
  Object.assign(Bd, Lx);
  var zd = {
    en: jc, ru: eh, uk: Bd
  };
  function kd(n = []) {
    for (let e of n || []) {
      let t = String(e).toLowerCase().split("-")[0];
      if (zd[t])return t
    }
    return "en"
  }
  function Un(n, e) {
    return zd[n]?.[e] ?? jc[e] ?? e
  }
  function Hd(n, e) {
    let t = e.target || 0, i = n === "ru", s = n === "uk";
    return e.id === "score"?i?`\u041D\u0430\u0431\u0440\u0430\u0442\u044C ${t.toLocaleString("ru-RU")} \u043E\u0447\u043A\u043E\u0432`: s?`\u041D\u0430\u0431\u0440\u0430\u0442\u0438 ${t.toLocaleString("uk-UA")} \u043E\u0447\u043E\u043A`: `Score ${t.toLocaleString("en-US")} points`: e.id === "distance"?i?`\u041F\u0440\u043E\u0435\u0445\u0430\u0442\u044C ${(t/1e3).toFixed(1).replace(".",",")} \u043A\u043C`: s?`\u041F\u0440\u043E\u0457\u0445\u0430\u0442\u0438 ${(t/1e3).toFixed(1).replace(".",",")} \u043A\u043C`: `Drive ${(t/1e3).toFixed(1)} km`: e.id === "cells"?i?`\u0421\u043E\u0431\u0440\u0430\u0442\u044C ${t} \u044D\u043D\u0435\u0440\u0433\u043E\u044F\u0447\u0435\u0435\u043A`: s?`\u0417\u0456\u0431\u0440\u0430\u0442\u0438 ${t} \u0435\u043D\u0435\u0440\u0433\u043E\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432`: `Collect ${t} energy cells`: e.id === "ramps"?i?`\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C ${t} \u0442\u0440\u0430\u043C\u043F\u043B\u0438\u043D\u043E\u0432`: s?`\u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0442\u0438 ${t} \u0442\u0440\u0430\u043C\u043F\u043B\u0456\u043D\u0456\u0432`: `Hit ${t} ramps`: e.id === "combo"?i?`\u0414\u043E\u0441\u0442\u0438\u0447\u044C \u0441\u0435\u0440\u0438\u0438 \xD7${t}`: s?`\u0414\u043E\u0441\u044F\u0433\u0442\u0438 \u0441\u0435\u0440\u0456\u0457 \xD7${t}`: `Reach a \xD7${t} chain`: e.label || ""
  }
  function th(n, e = document) {
    e.documentElement.lang = n;
    for (let t of e.querySelectorAll("[data-i18n]")) t.textContent = Un(n, t.dataset.i18n);
    for (let t of e.querySelectorAll("[data-i18n-aria]")) t.setAttribute("aria-label", Un(n, t.dataset.i18nAria));
    let localized = false;
    try {
      if (typeof window.NeonI18n?.apply === 'function') {
        window.NeonI18n.apply(n);
        localized = true;
      }
    } catch {}
    if (!localized) {
      try { window.dispatchEvent(new CustomEvent('neondrift:language-changed', { detail: { language: n } })); } catch {}
    }
  }
  function Vd(n) {
    return n?n.status === "wrecked" && (n.revives || 0) < 1?{
      id: "revive", label: "REVIVE", description: "Restore 55% hull, full rescue kit and continue"
    }: n.status === "running" && n.health <= 30 && !n.shield && (n.rewardTier ?? - 1) < n.tier?{
      id: "rescue", label: "EMERGENCY KIT", description: "Repair hull, refill nitro and arm a shield"
    }: null: null
  }
  function nh(n, e) {
    return n.adBoosts = n.adBoosts || {
    }, e === "nitro" && n.status === "running"?(n.nitro = 100, n.nitroLocked = false, true): e === "flight" && n.status === "running" && !n.adBoosts.flight?(NeonFeel.activateFlight(n), n.adBoosts.flight = !0, !0): e === "shield-time" && n.status === "running" && !n.adBoosts.shield?(NeonFeel.activateShield(n), n.adBoosts.shield = !0, !0): e === "revive" && n.status === "wrecked" && (n.revives || 0) < 1?(n.status = "running", n.health = 55, n.nitro = 70, NeonFeel.activateShield(n), n.revives = (n.revives || 0) + 1, n.x = 0, n.vx = 0, n.invulnerable = Math.max(n.invulnerable || 0, 3), !0): e === "rescue" && n.status === "running" && n.health <= 30 && !n.shield && (n.rewardTier ?? - 1) < n.tier?(n.health = Math.min(100, n.health + 40), n.nitro = 100, NeonFeel.activateShield(n), n.rewardTier = n.tier, n.invulnerable = Math.max(n.invulnerable || 0, 2), !0): !1
  }
  var Gd = ["en", "ru", "uk"], Wd = n => String(n || "").toLowerCase().replace("_", "-").split("-")[0];
  function Xd(n, e = []) {
    let t = Wd(n?.language || n?.locale || n?.player?.language);
    if (t)return Gd.includes(t)?t: "en";
    for (let i of e) {
      let s = Wd(i);
      if (Gd.includes(s))return s
    }
    return "en"
  }
  function Us(n) {
    let e = n?.ads?.isRewardedAvailable;
    if (typeof e == "function")try {
      return!!e.call(n.ads)
    } catch {
      return!1
    }
    return typeof e == "boolean"?e: !!n?.ads?.showRewardedVideo
  }
  function saveProgressScore(save) {
    if (!save) return 0;
    const upgradeScore = Object.values(save.upgrades || {}).reduce((sum, value) => sum + (Number(value) || 0), 0);
    return (save.runs || 0) * 1000000
      + (save.best || 0) * 100
      + (save.bestScore || 0)
      + Math.max(0, (save.owned?.length || 1) - 1) * 500000
      + upgradeScore * 10000
      + (save.progression?.totalXp || 0);
  }
  function hasMeaningfulProgress(save) {
    if (!save) return false;
    return (save.credits || 0) > 0
      || (save.runs || 0) > 0
      || (save.best || 0) > 0
      || (save.bestScore || 0) > 0
      || (save.dailyBest || 0) > 0
      || (save.owned?.length || 1) > 1
      || Object.values(save.upgrades || {}).some((value) => Number(value) > 0)
      || Object.values(save.boosters || {}).some((value) => Number(value) > 0)
      || (save.progression?.totalXp || 0) > 0
      || (save.processedPurchases?.length || 0) > 0;
  }
  function qd(localSave = {}, cloudSave = {}) {
    const local = Ls(JSON.stringify(localSave));
    const cloud = Ls(JSON.stringify(cloudSave));
    const localHasProgress = hasMeaningfulProgress(local);
    const cloudHasProgress = hasMeaningfulProgress(cloud);

    if (!cloudHasProgress && localHasProgress) return local;
    if (!localHasProgress && cloudHasProgress) return cloud;
    if (!localHasProgress && !cloudHasProgress) return cloud.updatedAt >= local.updatedAt ? cloud : local;

    if (cloud.updatedAt > 0 || local.updatedAt > 0) {
      return cloud.updatedAt >= local.updatedAt ? cloud : local;
    }

    // Legacy v1/v2 saves did not have timestamps. Choose one complete snapshot rather than
    // taking max() per field, which could resurrect already-spent credits or boosters.
    return saveProgressScore(cloud) >= saveProgressScore(local) ? cloud : local;
  }

  async function cl(n, e, ...t) {
    for (let i of e) {
      let s = i.split(".").reduce((r, o) => r?.[o], n);
      if (typeof s == "function")return await s.apply(i.includes(".")?i.split(".").slice(0, - 1).reduce((r, o) => r?.[o], n): n, t)
    }
  }
  var Yr = [{
    location: "neon-harbor", label: "NEON HARBOR", weather: "rain", time: "night", sky: 263189, fog: 928777, road: 591899, accent: 3600383, architecture: "harbor cranes", roadside: "cargo lights", horizon: "ocean arcology"
  }, {
    location: "hyper-tunnel", label: "HYPER TUNNEL", weather: "fog", time: "night", sky: 131332, fog: 1046906, road: 394267, accent: 16730839, architecture: "tunnel rings", roadside: "pulse strips", horizon: "reactor core"
  }, {
    location: "industrial-core", label: "INDUSTRIAL CORE", weather: "heavy-rain", time: "dawn", sky: 1115562, fog: 2102970, road: 1182685, accent: 16757575, architecture: "refineries", roadside: "pipes and furnaces", horizon: "cooling towers"
  }, {
    location: "storm-downtown", label: "STORM DOWNTOWN", weather: "thunderstorm", time: "night", sky: 394501, fog: 1542681, road: 491837, accent: 7528447, architecture: "dense megablocks", roadside: "wet holograms", horizon: "electric skyline"
  }, {
    location: "solar-desert", label: "SOLAR DESERT", weather: "sand", time: "sunset", sky: 4808548, fog: 8096628, road: 3295201, accent: 16761421, architecture: "solar fields", roadside: "dunes and turbines", horizon: "red mesas"
  }, {
    location: "frozen-pass", label: "FROZEN PASS", weather: "snow", time: "midnight", sky: 612073, fog: 8902898, road: 1937181, accent: 12186623, architecture: "ice cliffs", roadside: "frozen pylons", horizon: "glacier peaks"
  }, {
    location: "sky-megacity", label: "SKY MEGACITY", weather: "clear", time: "night", sky: 253483, fog: 1238539, road: 620035, accent: 11041279, architecture: "vertical arcologies", roadside: "air lanes", horizon: "orbital towers"
  }, {
    location: "sunrise-viaduct", label: "SUNRISE VIADUCT", weather: "clear", time: "day", sky: 6455752, fog: 11160922, road: 2081869, accent: 10485587, architecture: "elevated bridges", roadside: "solar fins", horizon: "floating transit rings"
  }, {
    location: "volcanic-bypass", label: "VOLCANIC BYPASS", weather: "sand", time: "night", sky: 852224, fog: 4014080, road: 1118481, accent: 16724787, architecture: "black rock arches", roadside: "lava vents", horizon: "volcanic ridge"
  }, {
    location: "aurora-freeway", label: "AURORA FREEWAY", weather: "snow", time: "night", sky: 330790, fog: 2118783, road: 660510, accent: 65407, architecture: "glass causeways", roadside: "aurora pylons", horizon: "polar city"
  }], hl = 1800, JM = Yr.length, Yd = {
    clear: {
      far: 1120, fogDensity: .0035, particle: "none", count: 0, speed: 0, size: 0, sunIntensity: .8
    }, sun: {
      far: 1200, fogDensity: .003, particle: "none", count: 0, speed: 0, size: 0, sunIntensity: 2.2
    }, rain: {
      far: 940, fogDensity: .0052, particle: "rain", count: 420, speed: 42, size: .055, sunIntensity: .35
    }, "heavy-rain": {
      far: 860, fogDensity: .006, particle: "rain", count: 620, speed: 55, size: .07, sunIntensity: .22
    }, thunderstorm: {
      far: 880, fogDensity: .0058, particle: "rain", count: 560, speed: 50, size: .065, sunIntensity: .28
    }, snow: {
      far: 900, fogDensity: .0058, particle: "snow", count: 360, speed: 7, size: .16, sunIntensity: .45
    }, fog: {
      far: 820, fogDensity: .0075, particle: "mist", count: 100, speed: 2, size: .35, sunIntensity: .3
    }, sand: {
      far: 850, fogDensity: .0066, particle: "sand", count: 400, speed: 13, size: .11, sunIntensity: 1.3
    }
  };
  function ih(n, e = "night") {
    let t = n === "clear" && ["day", "sunset"].includes(e)?"sun": n;
    return {
      ...Yd[t] || Yd.clear
    }
  }
  function Zd(n = 0) {
    let e = hl * Yr.length, t = (n % e + e) % e, i = Math.floor(t / hl), s = t % hl / hl, r = Math.max(0, Math.min(1, (s - .72) / .28));
    return {
      ...Yr[i], index: i, progress: s, blend: r, next: Yr[(i + 1) % Yr.length]
    }
  }
  function $d({
    width: n = 1280, height: e = 720, dpr: t = 1, cores: i = 8, reducedMotion: s = !1
  } = {
  }) {
    const pixelLoad = n * e * t * t;
    const mobile = Math.min(n, e) < 700;
    const weakCpu = i > 0 && i <= 4;
    const constrainedDesktop = !mobile && (weakCpu || pixelLoad > 8e6);

    // Mobile used to render at 0.85 DPR with antialiasing disabled. That was fast, but visibly
    // pixelated and harsh. Keep a sharper native-ish buffer and recover performance by reducing
    // decorative load instead of reducing road/obstacle readability.
    if (s) return {
      pixelRatio: Math.min(t, mobile ? 1.05 : 1.0), weatherScale: .22, sceneryRate: 1,
      speedLines: !1, lowPower: !0, antialias: !0, exposure: mobile ? 1.20 : 1.24,
      particleCap: mobile ? 36 : 48, sceneryCullStep: mobile ? 3 : 4
    };
    if (mobile) return {
      pixelRatio: Math.min(t, weakCpu ? 1.08 : 1.18), weatherScale: weakCpu ? .28 : .36,
      sceneryRate: 1, speedLines: !0, lowPower: !0, antialias: !0, exposure: 1.22,
      particleCap: weakCpu ? 42 : 54, sceneryCullStep: weakCpu ? 3 : 4
    };
    if (constrainedDesktop) return {
      pixelRatio: Math.min(t, 1.08), weatherScale: .45, sceneryRate: 1,
      speedLines: !0, lowPower: !0, antialias: !0, exposure: 1.28,
      particleCap: 72, sceneryCullStep: 0
    };
    return {
      pixelRatio: Math.min(t, 1.30), weatherScale: .72, sceneryRate: 1,
      speedLines: !0, lowPower: !1, antialias: !0, exposure: 1.30,
      particleCap: 96, sceneryCullStep: 0
    };
  }
  var Ux = new Set(["barrier", "truck", "laser", "rock", "gate"]), Jd = () => NeonFeel.DRONE_ATTACK_SECONDS;
  function Kd(n, e = 1, t = Math.random, x = 0) {
    return n.filter(([, o]) => Cd.includes(o.userData?.type) && o.position.z < 0 && o.position.z > - 1000 && o.userData.x !== 99 && (!NeonUpperRoute || NeonUpperRoute.activeFor(ge, o.userData))).sort((a, b) => Math.abs(a[1].position.x - x) - Math.abs(b[1].position.x - x) || b[1].position.z - a[1].position.z).slice(0, Math.min(2, Math.max(1, e)))
  }
  function Qd(n) {
    return n === "KeyQ"?"flight": n === "KeyE"?"shield": null
  }
  var ne = n => document.getElementById(n), oh = "neondrift.save.v1", Dt = kd(navigator.languages?.length?navigator.languages: [navigator.language]);
  th(Dt);
  var Te;
  try {
    Te = Ls(localStorage.getItem(oh))
  } catch {
    Te = Ls(null)
  }
  var ge = null, qt = !1, ml = !1, Fs = "", fl = 0, Lt = "home", jd = 0, Jt = 0, lf = 0, rh = - 1, gl = !1, Ut = null, sh = !1, Kn = new Set, Wi = {
    left: !1, right: !1, nitro: !1
  }, __gpPreloaderShown = !1, __gpGameplayActive = !1, __gpPlatformPausedRun = !1, __gpPlayerReady = !1, __gpInitialized = !1, __gpGameStarted = !1;
  async function __gpGameplayStart() {
    if (__gpGameplayActive) return;
    try {
      await cl(Ut, ["gameplayStart", "gameplay.start"]);
      __gpGameplayActive = true;
    } catch {
      __gpGameplayActive = false;
    }
  }
  async function __gpGameplayStop() {
    if (!__gpGameplayActive) return;
    try {
      await cl(Ut, ["gameplayStop", "gameplay.stop"]);
    } catch {
    } finally {
      __gpGameplayActive = false;
    }
  }
  function __gpGoal(n, e = 0) {
    try {
      return Ut?.analytics?.goal?.(n, e)
    } catch {
    }
  }
  function __saveLocalProgress() {
    try {
      localStorage.setItem(oh, JSON.stringify(Te));
      ne("save-status").textContent = "";
      return true;
    } catch {
      ne("save-status").textContent = "Saving unavailable";
      return false;
    }
  }
  const __gpProgressField = "progress";
  const __gpStorageKey = "neondrift.progress.v1";
  let __gpSaveMode = "storage";
  let __gpSaveQueue = Promise.resolve(true);

  function __parsePlayerProgress(raw) {
    if (typeof raw !== "string" || !raw.trim()) return null;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
      return Ls(JSON.stringify(parsed));
    } catch {
      return null;
    }
  }

  async function __gpStorage(method, value) {
    const storage = Ut?.storage;
    if (!storage?.[method]) throw new Error('GamePush Storage unavailable');
    return storage[method](__gpStorageKey, value);
  }

  async function __syncPlayerProgress() {
    if (!__gpPlayerReady) return false;
    const payload = JSON.stringify(Te);
    if (__gpSaveMode === 'player') {
      try {
        Ut.player.set(__gpProgressField, payload);
        await Ut.player.sync();
        return true;
      } catch {
        __gpSaveMode = 'storage';
      }
    }
    try {
      await __gpStorage('set', payload);
      return true;
    } catch (error) {
      console.warn('[GamePush] Storage unavailable; local snapshot retained.', error);
      return false;
    }
  }

  function __queuePlayerProgressSync() {
    __gpSaveQueue = __gpSaveQueue
      .catch(() => false)
      .then(() => __syncPlayerProgress());
    return __gpSaveQueue;
  }

  function $r() {
    Te.updatedAt = Date.now();
    __saveLocalProgress();
    void __queuePlayerProgressSync();
  }

  async function __saveProgressNow() {
    Te.updatedAt = Date.now();
    __saveLocalProgress();
    return __queuePlayerProgressSync();
  }
  function vi() {
    Kn.clear();
    for (let n in Wi)Wi[n] = !1
  }
  function __gpBindLifecycle(n) {
    if (!n || n.__neonLifecycleBound)return;
    n.__neonLifecycleBound = !0;
    try {
      n.on?.("pause", () => {
        __gpPlatformPausedRun = Lt === "hud" && !qt;
        if (__gpPlatformPausedRun)Kr();
        else vi();
        vt?.volume?.()
      });
      n.on?.("resume", () => {
        vt?.volume?.();
        if (__gpPlatformPausedRun && Lt === "pause") {
          __gpPlatformPausedRun = !1;
          mf()
        }
      });
      n.on?.("change:language", (event) => {
        const eventLanguage = typeof event === 'string' ? event : (event?.language || event?.lang || '');
        const applyLanguage = () => {
          Dt = Xd({ language: eventLanguage || n.language || n.locale }, []);
          th(Dt);
          Ml();
          try { window.NeonMenu?.renderMissions?.(); } catch {}
        };
        applyLanguage();
        // Some platform adapters update gp.language immediately after emitting the event.
        // Re-read it on the next task so the UI cannot remain on the previous language.
        setTimeout(() => {
          const latest = Xd(n, []);
          if (latest !== Dt) {
            Dt = latest;
            th(Dt);
            Ml();
            try { window.NeonMenu?.renderMissions?.(); } catch {}
          }
        }, 0);
      });
      n.sounds?.on?.("mute", () => vt?.volume?.());
      n.sounds?.on?.("mute:sfx", () => vt?.volume?.());
      n.sounds?.on?.("mute:music", () => vt?.volume?.())
    } catch {
    }
  }
  async function __handleGamePushInit(n) {
    if (!n || (__gpInitialized && Ut === n)) return;
    __gpInitialized = true;
    Ut = n;
    __gpBindLifecycle(n);

    try {
      await Ut.player?.ready;
      __gpPlayerReady = true;
    } catch {
      __gpPlayerReady = false;
    }

    Dt = Xd(Ut, navigator.languages);
    th(Dt);

    try {
      const localSnapshot = Ls(JSON.stringify(Te));
      let cloudRaw = null;

      // A custom player field is optional. Prefer it if configured, otherwise use
      // GamePush Storage; if neither is readable, retain the local snapshot.
      try {
        cloudRaw = Ut.player?.get?.(__gpProgressField);
        if (typeof cloudRaw === 'string') __gpSaveMode = 'player';
      } catch {
        __gpSaveMode = 'storage';
      }
      if (__gpSaveMode !== 'player') {
        try { cloudRaw = await __gpStorage('get'); } catch { cloudRaw = null; }
      }
      const cloudSave = __parsePlayerProgress(cloudRaw);
      if (cloudSave) {
        // Select one whole snapshot. Never merge maxima: spent credits/boosters
        // must not be recreated by an older local cache.
        Te = cloudSave.updatedAt >= localSnapshot.updatedAt ? cloudSave
          : qd(localSnapshot, cloudSave);
        __saveLocalProgress();
      }
      await __syncPlayerProgress();
    } catch (error) {
      console.warn('[GamePush] Progress load failed; using the local fallback for this session.', error);
    }

    window.dispatchEvent(new CustomEvent("neondrift:save-loaded", {
      detail: structuredClone(Te)
    }));

    // GamePush moderation requires the preloader method itself to be called once.
    // Do not gate the call behind isPreloaderAvailable: on some test/platform
    // environments that flag can be false even though the integration checker
    // still expects one showPreloader() invocation before gameStart().
    if (!window.__NEON_PRELOADER_PROMISE__) {
      __gpPreloaderShown = true;
      window.__NEON_PRELOADER_PROMISE__ = (async () => {
        try {
          if (typeof Ut?.ads?.showPreloader !== "function") return false;
          await Ut.ads.showPreloader();
          return true;
        } catch (error) {
          console.warn("[GamePush] preloader call failed", error);
          return false;
        }
      })();
    }
    await window.__NEON_PRELOADER_PROMISE__;

    // Let the platform layer restore/consume unfinished purchases before announcing game readiness.
    try {
      const platform = await Promise.race([
        window.__NEON_PLATFORM_READY__,
        new Promise((resolve) => setTimeout(() => resolve(window.NeonPlatform || null), 1500))
      ]);
      await platform?.initialize?.(Ut);
    } catch {
    }

    window.dispatchEvent(new CustomEvent("neondrift:gp-ready", { detail: Ut }));
    vt.volume();
    Ml();
    ne("ad-status").textContent = "";

    if (!__gpGameStarted) {
      __gpGameStarted = true;
      await cl(Ut, ["gameStart", "gameReady", "game.ready"]);
    }
  }

  function ah(n) {
    if (!ge || ge.status !== "running" || (ge.manualBoosts = ge.manualBoosts || {
    }, ge.manualBoosts[n]))return;
    let e = n === "flight"?"flight": "shield";
    if ((Te.boosters?.[e] || 0) < 1)return;
    Te.boosters[e]--, nh(ge, n === "flight"?"flight": "shield-time") && (ge.manualBoosts[n] = !0, $r(), fn(n === "flight"?"FLIGHT BOOST ACTIVATED": "SHIELD ACTIVATED")), _f()
  }
  function cf(n) {
    if (!ge || ge.status !== "running" || !Us(Ut))return;
    let e = n === "flight"?{
      id: n, label: Un(Dt, "flightBoost"), description: Dt === "ru"?"Полёт: 15 секунд. Скорость зависит от машины и Nitro.": Dt === "uk"?"Політ: 15 секунд. Швидкість залежить від машини та Nitro.": "Fly over ground obstacles for 15 seconds. Speed follows the car and Nitro."
    }: {
      id: n, label: Un(Dt, "shieldTimed"), description: Dt === "ru"?"Щит: блокирует один удар до 15 секунд. Скорость не изменяет.": Dt === "uk"?"Щит: блокує один удар до 15 секунд. Швидкість не змінює.": "Block one collision for up to 15 seconds. Does not change speed."
    };
    ne("reward-ad").dataset.offer = n, hf(e)
  }
  function hf(n) {
    if (!n || !Us(Ut)) return false;
    const wasGameplay = Lt === "hud" && ge?.status === "running" && !qt;
    qt = true;
    vi();
    if (wasGameplay) void __gpGameplayStop();
    ne("reward-title").textContent = n.label;
    ne("reward-copy").textContent = n.description;
    ne("reward-ad").hidden = false;
    ne("reward-ad").disabled = false;
    ne("reward-ad").textContent = Un(Dt, "watchAd");
    Fn("reward");
    return true
  }
  async function Nx() {
    if (sh || !Ut || !ge)return;
    sh = !0, ne("reward-ad").disabled = !0, ne("ad-status").textContent = "Loading advertisement\u2026";
    let n = !1, e = Te.mute;
    Te.mute = !0, vt.volume();
    try {
      if (n = await NeonFeel.confirmedReward(Ut), n && nh(ge, ne("reward-ad").dataset.offer))gl = !1, qt = !1, dh(), Fn("hud"), __gpGameplayStart(), fn("REWARD ACTIVATED");
      else throw Error("Reward was not confirmed")
    } catch {
      ne("ad-status").textContent = "Advertisement unavailable. Try again later."
    } finally {
      Te.mute = e, vt.volume(), sh = !1, Lt === "reward" && (ne("reward-ad").disabled = !Us(Ut));
      window.NeonPlatform?.refreshFeatureVisibility?.();
    }
  }
  function Fx() {
    if (gl) {
      gl = false;
      ph(true);
      return;
    }
    qt = false;
    Fn("hud");
    if (ge?.status === "running") void __gpGameplayStart();
  }
  var vt = {
    ctx: null, gain: null, engine: null, eg: null, beat: 0, next: 0, init() {
      try {
        if (!this.ctx) {
          this.ctx = new AudioContext, this.gain = this.ctx.createGain(), this.gain.connect(this.ctx.destination), this.engine = this.ctx.createOscillator(), this.engine.type = "sawtooth", this.eg = this.ctx.createGain(), this.eg.gain.value = 0;
          let n = this.ctx.createBiquadFilter();
          n.frequency.value = 260, this.engine.connect(n), n.connect(this.eg), this.eg.connect(this.gain), this.engine.start()
        }
        this.ctx.resume().catch (() => {
        }), this.volume()
      } catch {
      }
    }, volume() {
      if (this.gain) {
        let n = !!Te.mute, e = !!Ut?.sounds?.isSFXMuted, t = !!Ut?.sounds?.isMusicMuted;
        this.gain.gain.setTargetAtTime(n?0: .32, this.ctx.currentTime, .06), ne("mute").textContent = n || e && t?"♪̸": "♫", ne("mute").setAttribute("aria-label", n?"Unmute audio": "Mute audio")
      }
    }, tone(n, e = .12, t = "triangle", i = .12, s = n, r = null, o = !1) {
      if (!this.ctx || this.ctx.state !== "running" || Te.mute || (o?!!(Te.music === false || Ut?.sounds?.isMusicMuted): !!Ut?.sounds?.isSFXMuted))return;
      let a = Number.isFinite(r)?Math.max(this.ctx.currentTime, r): this.ctx.currentTime, l = this.ctx.createOscillator(), c = this.ctx.createGain();
      l.type = t, l.frequency.setValueAtTime(n, a), l.frequency.exponentialRampToValueAtTime(Math.max(20, s), a + e), c.gain.setValueAtTime(i, a), c.gain.exponentialRampToValueAtTime(1e-4, a + e), l.connect(c), c.connect(this.gain), l.start(a), l.stop(a + e), l.onended = () => {
        l.disconnect(), c.disconnect()
      }
    }, tick(n, e) {
      if (!this.ctx)return;
      let t = this.ctx.currentTime, i = !!(e && !Te.mute && !Ut?.sounds?.isSFXMuted);
      if (this.engine.frequency.setTargetAtTime(35 + n * 1.3, t, .1), this.eg.gain.setTargetAtTime(i?.07: 0, t, .1), !(!e || Te.mute || Te.music === false || Ut?.sounds?.isMusicMuted) && t >= this.next) {
        this.next = t + .24;
        let s = [55, 55, 82.41, 55, 65.41, 55, 98, 82.41];
        this.tone(s[this.beat % 8], .19, "sawtooth", .045, s[this.beat % 8], null, !0), this.beat % 2 === 0 && this.tone(120, .1, "sine", .25, 30, null, !0), this.beat % 4 === 2 && this.tone(650, .07, "triangle", .06, 90, null, !0), this.beat % 8 === 7 && this.tone(440, .3, "sine", .055, 440, null, !0), this.beat++
      }
    }, fx(n) {
      n === "cell"?(this.tone(660, .14), setTimeout(() => this.tone(990, .16), 90)): n === "ramp"?this.tone(180, .4, "sine", .18, 620): n === "near"?this.tone(520, .06, "sine", .07): this.tone(100, .25, "sawtooth", .28, 22)
    }, music(n) {
      if (!(!n || !this.ctx || Te.mute || Te.music === false || Ut?.sounds?.isMusicMuted))for (;
      this.next < this.ctx.currentTime + .12;
      ) {
        let e = this.beat++ % 16, t = [55, 65.41, 73.42, 49][Math.floor(e / 4)], i = [220, 261.63, 329.63, 293.66][e % 4];
        e % 4 === 0 && this.tone(135, .075, "sine", .18, 34, this.next, !0), e % 4 === 2 && this.tone(720, .055, "triangle", .07, 120, this.next, !0), this.tone(e % 2 === 0?t: t * 2, .075, "sawtooth", .04, t * .72, this.next, !0), e % 4 !== 0 && this.tone(i, .045, "square", .018, i * .9, this.next, !0), this.next += .1
      }
    }
  }, Qn, st, Kt, Pt, uf, df = [], lh = [], ug = [], Os = [], _i = new Map, _l = [], ul = [], ef = 0, zs, ff = [], xi, bn, tf = - 1, pf = matchMedia("(prefers-reduced-motion:reduce)").matches, yl = $d({
    width: innerWidth, height: innerHeight, dpr: devicePixelRatio, cores: navigator.hardwareConcurrency || 8, reducedMotion: pf
  }), Ox = 0, nf = new I, sf = new I, rf = new ke, of = new ke, fS = new nt, dl = new bt;
  function Bx(n, e) {
    if (xi.visible = !!(e && yl.speedLines), !!xi.visible) {
      for (let t = 0;
      t < 28;
      t++)dl.position.set((t % 2?1: - 1) * (7.6 + t % 4 * .8), .6 + t % 5 * .6, (n * 1.8 + t * 13) % 80 - 64), dl.scale.set(.025, .025, ge?.overdrive > 0?5: 3), dl.updateMatrix(), xi.setMatrixAt(t, dl.matrix);
      xi.instanceMatrix.needsUpdate = !0
    }
  }
  function zx(distance, dt, playing) {
    const p = Zd(distance), q = p.next, blend = p.blend, w = ih(p.weather, p.time), nextWeather = ih(q.weather, q.time), smooth = 1 - Math.exp( - dt * 1.8);
    const skies = [0x070e20, 0x050d18, 0x111721, 0x090f22, 0x191525, 0x071529, 0x071121, 0x1c2637, 0x130f18, 0x07172b], fogs = [0x16293b, 0x132637, 0x272a2d, 0x1c253b, 0x3b3040, 0x253b51, 0x172b42, 0x344557, 0x291a20, 0x173444];
    rf.setHex(skies[p.index]).lerp(of.setHex(skies[q.index]), blend);
    if (ge?.dimension)rf.setHex(ge.dimension === "gravity"?0x060918: 0x110b24);
    st.background.lerp(rf, smooth);
    rf.setHex(fogs[p.index]).lerp(of.setHex(fogs[q.index]), blend);
    if (ge?.dimension)rf.setHex(0x19172f);
    st.fog.color.lerp(rf, smooth);
    lt.road.color.lerp(rf.setHex(0x111b26).lerp(of.setHex(0x172131), p.index === 5 || p.index === 9?.30: 0), smooth);
    lt.edge.color.lerp(rf.set(p.accent).lerp(of.set(q.accent), blend), smooth);
    st.fog.density = Math.min(mi.lerp(w.fogDensity, nextWeather.fogDensity, blend) * .55, .85 / NeonFeel.drawDistance(ge?.speed || 0));
    Kt.far = Math.max(1200, NeonFeel.drawDistance(ge?.speed || 0) + 320);
    Kt.updateProjectionMatrix();
    if (zs) {
      zs.intensity = 1.25;
      zs.color.setHex(0xa1c7e1);
    }
    if (bn) {
      const kind = w.particle, count = Math.floor(w.count * yl.weatherScale);
      bn.visible = playing && kind !== "none";
      bn.geometry.setDrawRange(0, count);
      bn.material.size = w.size;
      bn.material.color.set(kind === "rain"?0x73c8ff: kind === "snow"?0xe9f5ff: kind === "sand"?0xc4a178: 0x799ba9);
      bn.material.opacity = kind === "mist"?.10: kind === "snow"?.52: .35;
      const pos = bn.geometry.attributes.position.array;
      for (let j = 0;
      j < count * 3;
      j += 3) {
        pos[j + 1] -= w.speed * dt;
        pos[j] += kind === "snow"?Math.sin(Jt * 1.7 + j) * .012: kind === "sand"?.05: 0;
        pos[j + 2] += (ge?.speed || 28) * dt * .40;
        if (pos[j + 1] < - 1) {
          pos[j] = (Math.random() - .5) * 46;
          pos[j + 1] = 20 + Math.random() * 30;
        }
        if (pos[j + 2] > 24)pos[j + 2] = - 145 - Math.random() * 35;
      }
      bn.geometry.attributes.position.needsUpdate = true;
    }
    const biomeLabel = ge?.dimension?(ge.dimension === "gravity"?"VOID": "RIFT HIGHWAY"): p.label, key = p.index + ":" + (ge?.dimension || "");
    if (playing && key !== tf) {
      tf = key;
      fn(biomeLabel);
      ne("environment").textContent = biomeLabel;
    }
  }
  function kx() {
    let n = new Map;
    for (let e of lh.concat(ug)) {
      e.updateMatrix();
      for (let t of e.children) {
        t.updateMatrix();
        let i = t.material, s = n.get(i);
        s || (s = [], n.set(i, s)), s.push({
          group: e, local: t.matrix.clone()
        })
      }
      st.remove(e)
    }
    for (let[e, t]of n) {
      let i = new ms(uh, e, t.length);
      i.instanceMatrix.setUsage(ja), i.frustumCulled = !1, st.add(i), ff.push({
        mesh: i, items: t
      })
    }
  }
  var Zr = new nt;
  function Hx() {
    for (let { mesh: n, items: e } of ff) {
      e.forEach(({ group: t, local: i }, s) => {
        // On mobile, permanently cull a fraction of purely decorative instanced scenery.
        // Visible scenery still updates every frame, so motion is smoother than the old 30-fps
        // matrix update while the CPU/GPU cost remains lower overall.
        if (yl.lowPower && yl.sceneryCullStep > 0 && s % yl.sceneryCullStep === yl.sceneryCullStep - 1) {
          if (!t.userData.mobileCulled) {
            Zr.identity();
            Zr.elements.fill(0, 0, 12);
            n.setMatrixAt(s, Zr);
            t.userData.mobileCulled = !0;
          }
          return;
        }
        t.updateMatrix();
        Zr.multiplyMatrices(t.matrix, i);
        if (t.visible === false) Zr.elements.fill(0, 0, 12);
        n.setMatrixAt(s, Zr);
      });
      n.instanceMatrix.needsUpdate = !0;
    }
  }
  var Nn = (n, e = 0, t = 1) => new hi({
    color: n, emissive: e, emissiveIntensity: t, roughness: .48, metalness: .45
  }), lt = {
    road: Nn(1054499), edge: Nn(1519936), cyan: Nn(3795967, 765131, 1.7), pink: Nn(16730839, 14358415, 2), white: Nn(15269375, 8318719, 2), dark: Nn(463389), glass: Nn(1190982, 473427, .6), tire: Nn(198155), barrier: Nn(2364198), gold: Nn(16757575, 16741137, 1.7)
  }, uh = new In(1, 1, 1);
  function zt(n, e, t, i, s = 0, r = 0, o = 0, a = st) {
    let l = new Et(uh, i);
    return l.scale.set(n, e, t), l.position.set(s, r, o), a.add(l), l
  }
  function xl(n = Te.car) {
    Pt && (st.remove(Pt), ll(Pt)), Pt = Kc(n, Te.skin), Pt.userData.collider = NeonCollision.chassis(n), uf = Pt.userData.bodyMaterial, df = Pt.userData.flames;
    Pt.position.z = 8, st.add(Pt)
  }
  function Vx(n = st) {
    let e = NeonDrones.create("ally");
    return n.add(e), e
  }
  function Gx() {
    Qn = new Gr({
      canvas: ne("world"), antialias: yl.antialias !== false, powerPreference: "high-performance"
    }), Qn.setPixelRatio(yl.pixelRatio), Qn.outputColorSpace = Vt, Qn.toneMapping = Nr, Qn.toneMappingExposure = yl.exposure || 1.3, st = new fs, st.background = new ke(527387), st.fog = new dr(659492, .0085), Kt = new Rt(58, innerWidth / innerHeight, .1, yl.lowPower?480: 650), st.add(new bs(8698111, 1443873, 2)), zs = new Es(12377855, 2.8), zs.position.set( - 8, 18, 10), st.add(zs);
    let n = new Pr(16394960, 75, 40);
    n.position.set(5, 6, 5), st.add(n), Kt.position.set(10, 4.2, 19);
    for (let r = 0;
    r < 72;
    r++) {
      let o = new Gt;
      st.add(o), o.userData.base = - r * 20, lh.push(o), zt(18, .2, 20, lt.road, 0, - .12, 0, o), zt(28, .12, 20, lt.dark, 0, - .28, 0, o);
      for (let a of[ - 1, 1])zt(.14, .04, 20, lt.cyan, a * 8.8, .02, 0, o), zt(.3, .65, 20, lt.edge, a * 10, .22, 0, o), zt(.08, .055, 20, lt.pink, a * 10, .57, 0, o);
      for (let a of[ - 2.5, 2.5])zt(.09, .025, 7, lt.white, a, .015, 0, o);
      zt(18, .015, .045, lt.edge, 0, .02, 9, o);
      for (const side of[ - 1, 1]) {
        zt(.045, .018, 11, lt.glass, side * 6.7, .01, - 3, o);
        zt(.045, .018, 5, lt.edge, side * 3.4, .008, 3, o);
        zt(.35, .05, .55, lt.cyan, side * 8.55, .08, 6, o);
        zt(.12, .1, .8, lt.gold, side * 9.65, .66, 5, o)
      }
    }
    for (let r = 0;
    r < (yl.lowPower?72: 112);
    r++) {
      let o = new Gt;
      st.add(o), o.userData.upperIndex = r, ug.push(o), zt(14, .24, 20, lt.road, 0, - .12, 0, o), zt(16, .16, 20, lt.dark, 0, - .32, 0, o);
      for (let a of[ - 1, 1])zt(.16, .08, 20, lt.cyan, a * 6.9, .08, 0, o), zt(.34, 1.05, 20, lt.edge, a * 7.4, .5, 0, o), zt(.1, .08, 20, lt.gold, a * 7.38, 1.1, 0, o);
      for (let a of[ - 2.25, 2.25])zt(.11, .035, 7, lt.white, a, .03, 0, o);
      if (r % 4 === 0)for (let a of[ - 1, 1])zt(.9, 16, .9, lt.barrier, a * 5.8, - 8.2, 0, o)
    }
    for (let r = 0;
    r < 2;
    r++) {
      let o = Vx();
      o.position.set(r?1.65: - 1.65, 1.65, 9.5), _l.push(o)
    }
    xi = new ms(uh, lt.white, 28), xi.frustumCulled = !1, xi.instanceMatrix.setUsage(ja), st.add(xi);
    let i = new mt, s = new Float32Array(720 * 3);
    for (let r = 0;
    r < s.length;
    r += 3)s[r] = (Math.random() - .5) * 46, s[r + 1] = - 1 + Math.random() * 50, s[r + 2] = - 180 + Math.random() * 204;
    i.setAttribute("position", new Ct(s, 3)), i.setDrawRange(0, 0), bn = new pr(i, new _s({
      color: 7589887, size: .08, transparent: !0, opacity: .68, depthWrite: !1, blending: Ur
    })), bn.visible = !1, st.add(bn), kx(), xl(), af(), window.addEventListener("resize", af)
  }
  function af() {
    Qn && (Qn.setSize(innerWidth, innerHeight, !1), Kt.aspect = innerWidth / innerHeight, Kt.updateProjectionMatrix())
  }
  function Jr(n) {
    let e = _i.get(n);
    e && (st.remove(e), ll(e), _i.delete(n))
  }
  function dh() {
    for (let n of _i.keys())Jr(n)
  }
  function Wx(n, e, t, i) {
    let s = Jc(n.type);
    if (n.specialRamp) {
      s.scale.x *= 1.38, s.scale.y *= 1.24, s.scale.z *= 1.72, s.userData.specialUpperRamp = !0;
    }
    return s.userData = {
      ...s.userData, ...n, index: e, j: t, distance: NeonCollision.objectDistance(i, n)
    }, s.position.x = n.x, s.position.y = NeonCollision.objectY(n, 0, e, ge), ["barrier", "police", "traffic"].includes(n.type) && (s.rotation.y = Math.PI), s.userData.collider = NeonCollision.collider(n), st.add(s), s
  }
  function Xx() {
    if (!ge)return;
    for (let[key, mesh]of _i) {
      let row = ge.rows.get(mesh.userData.index), physical = row?.objects?.[mesh.userData.j];
      if (mesh.userData.distance < ge.distance - 18 || (mesh.userData.index >= ge.next && (!physical || physical.x === 99 || physical.type !== mesh.userData.type)))Jr(key);
      else if (physical && row) {
        mesh.userData.distance = NeonCollision.objectDistance(row, physical);
        mesh.userData.x = physical.x;
        mesh.userData.routeY = physical.routeY;
        mesh.userData.routeLevel = physical.routeLevel;
        mesh.userData.distanceOffset = physical.distanceOffset || 0;
      }
    }
    for (let index = ge.next;
    index < ge.next + NeonFeel.lookahead(ge.speed);
    index++) {
      let row = Xr(ge, index);
      row.objects.forEach((object, j) => {
        if (!object?.type || object.x === 99)return;
        let key = index + ":" + j;
        _i.has(key) || _i.set(key, Wx(object, index, j, row))
      })
    }
    for (let mesh of _i.values()) {
      const active = !NeonUpperRoute || NeonUpperRoute.activeFor(ge, mesh.userData);
      mesh.visible = active;
      if (!active)continue;
      mesh.position.z = 8 - (mesh.userData.distance - ge.distance);
      mesh.position.y = NeonCollision.objectY(mesh.userData, ge.time, mesh.userData.index, ge);
      mesh.userData.type === "coin" && (mesh.position.x = mesh.userData.x);
      ["cell", "nitro", "coin", "magnet", "double", "energyShield", "superNitro", "dronePower", "scoreBoost", "flight", "flightBoost", "phaseShard", "chain", "risk"].includes(mesh.userData.type) && !mesh.userData.artIdle && (mesh.rotation.y = Jt * 1.4);
      mesh.userData.type === "traffic" && (mesh.position.x = mesh.userData.x + Math.sin(ge.time * .8 + mesh.userData.index) * 2.1)
    }
  }
  function qx(dt, active) {
    if (!active)return;
    const powered = ge.dronePower > 0;
    for (let i = ul.length - 1;
    i >= 0;
    i--) {
      const shot = ul[i];
      shot.life += dt;
      const target = _i.get(shot.key);
      if (!target || target !== shot.target || target.userData.distance < ge.distance + 8) {
        for (const m of[shot.mesh, ...shot.reticle]) {
          st.remove(m);
          ll(m);
        }
        ul.splice(i, 1);
        continue;
      }
      const emitter = shot.drone.getObjectByName("drone-laser-aperture"), origin = emitter?emitter.getWorldPosition(new I()): shot.drone.position, tx = target.position.x, ty = target.position.y + 1.1, tz = target.position.z;
      shot.reticle[0].position.set(tx, ty + .5, tz + .5);
      shot.reticle[1].position.set(tx, ty, tz + .5);
      if (shot.life < .32) {
        shot.mesh.visible = true;
        shot.mesh.material.opacity = .16;
        const mid = new I(tx, ty, tz);
        shot.mesh.position.copy(origin).lerp(mid, .5);
        shot.mesh.lookAt(mid);
        shot.mesh.scale.z = origin.distanceTo(mid);
        continue;
      }
      if (!shot.fired) {
        shot.fired = true;
        shot.fireOrigin = origin.clone();
        shot.flightSeconds = Math.min(.18, Math.max(.085, origin.distanceTo(new I(tx, ty, tz)) / 1800));
        vt.tone(1200, .11, "sine", .09, 300);
      }
      const t = Math.min(1, (shot.life - .32) / shot.flightSeconds), head = new I(tx, ty, tz), tail = shot.fireOrigin;
      // Visible growing beam from actual muzzle to moving target. Impact only at t=1.
      shot.mesh.visible = true;
      shot.mesh.material.opacity = .95;
      const tip = tail.clone().lerp(head, t);
      shot.mesh.position.copy(tail).lerp(tip, .5);
      shot.mesh.lookAt(tip);
      shot.mesh.scale.z = Math.max(.05, tail.distanceTo(tip));
      if (t >= 1) {
        const pos = head.clone();
        if (Ld(ge, target.userData)) {
          ge.score += powered?(ge.stats.droneBonus || 50): 0;
          pl(pos.x, lt.cyan);
          for (const p of Os.slice( - (yl.lowPower?5: 12))) {
            p.position.z = pos.z;
            p.position.y = pos.y;
          }
          Jr(shot.key);
          vt.tone(120, .12, "sawtooth", .06, 25);
        }
        for (const m of[shot.mesh, ...shot.reticle]) {
          st.remove(m);
          ll(m);
        }
        ul.splice(i, 1);
      }
    }
    if (ge.time < ef || ul.length)return;
    const lead = Math.max(32, ge.speed * .95), range = Math.max(ge.stats.droneRange || 130, ge.speed * 2.4);
    const candidates = [..._i.entries()].filter(([k, o]) => {
      const physical = ge.rows.get(o.userData.index)?.objects[o.userData.j];
      return physical && (!physical.tutorial || physical.lesson === "drones") && physical.x !== 99 && !physical.resolved && o.userData.distance - ge.distance > lead && o.userData.distance - ge.distance < range && !o.userData.unbreakable && o.userData.type !== "laser" && o.userData.type !== "gate";
    });
    const targets = Kd(candidates, powered?2: 1, Math.random, ge.x);
    ef = ge.time + (targets.length?NeonFeel.DRONE_ATTACK_SECONDS: 1);
    for (let i = 0;
    i < targets.length;
    i++) {
      const[key, target] = targets[i], drone = _l[i % _l.length], laser = zt(.035, .035, 1, powered?lt.gold: lt.cyan, drone.position.x, drone.position.y, drone.position.z);
      laser.material = laser.material.clone();
      laser.material.transparent = true;
      laser.material.depthWrite = false;
      const reticle = [zt(1.25, .035, .05, lt.cyan), zt(.035, .75, .05, lt.cyan)];
      ul.push({
        mesh: laser, target, key, drone, reticle, life: 0
      });
    }
    if (targets.length) {
      fn(powered?"DRONES / DUAL LOCK": "DRONE / TARGET LOCK");
      vt.tone(920, .06, "square", .04, 180);
    }
  }
  function pl(n, e) {
    const burstCount = yl.lowPower ? 4 : 10;
    for (let t = 0; t < burstCount; t++) {
      let i = zt(.1, .1, .24, e, n, .8, 8);
      i.userData = {
        vx: (Math.random() - .5) * 13, vy: Math.random() * 9, vz: (Math.random() - .5) * 15, life: .7
      };
      Os.push(i);
    }
    const cap = yl.particleCap || (yl.lowPower ? 48 : 96);
    while (Os.length > cap) {
      const old = Os.shift();
      if (old) {
        st.remove(old);
        ll(old);
      }
    }
  }
  function Yx(n) {
    let e = ge && Lt !== "home" && Lt !== "garage", t = e?ge.distance: Jt * 15, profile = Zd(t), zone = ge?.dimension?2: [0, 3, 1, 0, 1, 3, 0, 0, 2, 4][profile.index];
    if (ge) {
      ge.environmentZone = zone;
      ge.environmentWorld = ge.dimension?(ge.dimension === "gravity"?"void": "rift"): ["cityviaduct", "tunnel", "factory", "cityviaduct", "desert", "frozen", "cityviaduct", "cityviaduct", "desert", "aurora"][profile.index];
    }
    if (document.body.dataset.biome !== String(zone))document.body.dataset.biome = String(zone);
    for (let d of lh)d.position.z = ((d.userData.base + t) % 1440 + 1440) % 1440 - 1400;
    const upperPlan = e && NeonUpperRoute?.getVisualPlan(ge);
    if (upperPlan) {
      const anchor = Math.floor(ge.distance / 20) * 20 - 200;
      for (const d of ug) {
        const world = anchor + d.userData.upperIndex * 20, y = NeonUpperRoute.roadY(upperPlan, world), nextY = NeonUpperRoute.roadY(upperPlan, world + 10);
        d.visible = world + 12 >= upperPlan.start && world - 12 <= upperPlan.end, d.position.set(0, y, 8 - (world - ge.distance)), d.rotation.x = Math.atan2(nextY - y, 10)
      }
    } else for (const d of ug)d.visible = !1;
    let i = e?ge.x: 2.4, s = e && ge.flight > 0, r = e && ge.invulnerable > 0 && ge.invulnerable < 3, o = !r || Math.floor(Jt * 8) % 2 === 0;
    Pt.visible = o, Pt.position.set(i, e?NeonCollision.height(ge): 0, 8);
    let a = Pt.children.find(d => d.userData?.flightWings);
    a && (a.visible = s), Pt.rotation.z = mi.damp(Pt.rotation.z, e?Math.max( - .06, Math.min(.06, - ge.vx * .006)): 0, 6, n), Pt.rotation.y = e?ge.bodyYaw || 0: mi.damp(Pt.rotation.y, - .12, 5, n), Pt.rotation.x = mi.damp(Pt.rotation.x, e && ge.air > 0? - .1: 0, 6, n);
    for (let d of df)d.visible = !!(e && (ge.boost || ge.overdrive > 0 || ge.shield || ge.flight > 0) && !qt), d.scale.z = .8 + Math.sin(Jt * 50) * .22;
    let l = e, fast = l?Math.min(1, ge.speed / NeonFeel.MAX_SPEED): 0, c = l?ge.x * .42: innerWidth < 700?7: 10, roadY = l?NeonUpperRoute.surfaceY(ge): 0, heightY = l?NeonCollision.height(ge): 0, airY = Math.max(0, heightY - roadY), h = l?4.8 + roadY + airY * .55: 4.2;
    if (l)ge.impactTime = Math.max(0, (ge.impactTime || 0) - n);
    nf.set(c, h, 17.3 + fast * 1.0 + (l?ge.impactTime * .7: 0)), Kt.position.lerp(nf, 1 - Math.exp( - n * 4)), sf.set(l?ge.x * .25: innerWidth < 700?1: - 3, l?1 + roadY + airY * .35: 1.3, l? - 35 - fast * 16: 0), Kt.lookAt(sf), Kt.fov += ((innerWidth < 700?66: 56) + fast * 7 + (l && ge.overdrive > 0?4: l && ge.boost?4: 0) + (l && (ge.shield || ge.flight > 0)?3: 0) + (l && ge.dimension === "hyper"?5: 0) - Kt.fov) * (1 - Math.exp( - 8 * n)), Kt.updateProjectionMatrix();
    if (e) {
      NeonDrones.formation(_l, Pt, ge, n, ul);
      NeonArt.frame(ge, Pt, _i);
    } else _l.forEach(d => d.visible = false);
    for (let d = Os.length - 1;
    d >= 0;
    d--) {
      let f = Os[d], m = f.userData;
      m.life -= n, f.position.x += m.vx * n, f.position.y += m.vy * n, f.position.z += m.vz * n, m.vy -= 20 * n, f.rotation.x += n * 7, m.life <= 0 && (st.remove(f), ll(f), Os.splice(d, 1))
    }
    e && Xx(), qx(n, e), Bx(t, e && (ge.boost || ge.overdrive > 0 || ge.shield || ge.flight > 0 || ge.speed > 194.44)), zx(t, n, e), window.NeonEnvironmentGeometry?.update(ge || {
      distance: t, time: Jt, environmentWorld: "cityviaduct"
    }, n, st);
    uf.emissiveIntensity = e && ge.phaseTime > 0?1.25: e && ge.overdrive > 0?.65: .24, (upperPlan || ++Ox % yl.sceneryRate === 0) && Hx(), Qn.render(st, Kt)
  }
  function Fn(n) {
    Lt = n, n !== "hud" && ne("game").classList.remove("overdrive", "heat");
    for (let e of["home", "hud", "pause", "result", "garage", "reward"])ne(e).hidden = e !== n;
    ne("home-footer").hidden = n !== "home", ne("pause-button").hidden = n !== "hud";
    window.NeonPlatform?.refreshFeatureVisibility?.();
  }
  function fn(n) {
    if (NeonUI.notice) {
      NeonUI.notice(n);
      return;
    }
    ne("toast").textContent = n, lf = Jt + 2.2
  }
  function fh(n = !1, e = !1) {
    vt.init(), vi(), e?__gpGoal("LEVEL_REPLAY", n?1: 0): __gpGoal("LEVEL_START", n?1: 0), ml = n, Fs = new Date().toISOString().slice(0, 10), ge = Pd(n?Td(Fs): Math.random() * 4294967296 >>> 0, n?{
    }: {
      ...Te.upgrades
    }, n?"vector": Te.car), NeonUI.start(ge, Te), qt = !1, rh = - 1, fl = 0, lf = 0, dh();
    for (let e of Os) {
      st.remove(e);
      ll(e);
    }
    Os = [];
    for (let e of ul) {
      for (let m of [e.mesh, ...(e.reticle || [])]) {
        st.remove(m);
        ll(m);
      }
    }
    ul = [];
    ef = NeonFeel.DRONE_ATTACK_SECONDS;
    xl(ge.car), _l.forEach((d, i) => {
      d.position.set(i?1.65: - 1.65, 1.65, 9.5);
      d.rotation.set(0, 0, 0)
    }), Kt.position.set(0, 5, 19), Fn("hud"), ne("mode").textContent = n?"DAILY / " + Fs: "ENDLESS", ne("flash").style.opacity = 0, __gpGameplayStart()
  }
  function Kr() {
    if (Lt !== "hud") return;
    qt = true;
    vi();
    Fn("pause");
    vt.tick(0, false);
    void __gpGameplayStop();
  }
  function mf() {
    if (Lt !== "pause") return;
    vt.init();
    qt = false;
    vi();
    Fn("hud");
    if (ge?.status === "running") void __gpGameplayStart();
  }
  function ph(n = !1) {
    __gpGameplayStop();
    if (!n) {
      let r = Vd(ge);
      if (r?.id === "revive" && (gl = !0, ne("reward-ad").dataset.offer = r.id, hf(r)))return
    }
    let e = new Set(Te.achievements), t = ge.score > Te.bestScore;
    fl = Ad(Te, ge, ml?Fs: "") + NeonUI.finish(ge, Te);
    let i = Qc(Fs), s = Od(Te, Fs, i, ge);
    fl += s, $r(), Fn("result"), vi();
    const uiText = (key, fallback) => window.NeonI18n?.t?.(key, Dt) || fallback;
    ne("result-tag").textContent = ml ? uiText("dailyComplete", "DAILY RUN COMPLETE") : uiText("endlessComplete", "ENDLESS RUN COMPLETE");
    ne("result-title").textContent = t ? uiText("newBest", "NEW PERSONAL BEST.") : uiText("signalLost", "SIGNAL LOST.");
    ne("result-copy").textContent = (ge.distance / 1e3).toFixed(2) + " km · " + Math.floor(ge.time / 60) + ":" + String(Math.floor(ge.time % 60)).padStart(2, "0") + " " + uiText("survived", "survived") + " · " + uiText("bestChain", "Best chain") + " " + ge.bestCombo;
    ne("result-stats").innerHTML = `<div><span>${uiText("score", "SCORE")}</span><b>${ge.score}</b></div><div><span>${uiText("distance", "DISTANCE")}</span><b>${(ge.distance/1e3).toFixed(2)} KM</b></div><div><span>${uiText("credits", "CREDITS")}</span><b>+${fl}</b></div>`;
    ne("unlocks").textContent = (s ? uiText("missionComplete", "MISSION COMPLETE") + ": +" + s + " CR · " : "") + Te.achievements.filter(r => !e.has(r)).map(r => uiText("unlocked", "UNLOCKED") + ": " + Wr[r]).join(" · ");
    vt.tone(t ? 880 : 110, .5, "triangle");
    Ml()
  }
  function Ml() {
    ne("car-name").textContent = un[Te.car].name, ne("best").textContent = Un(Dt, "personalBest") + " " + (Te.best / 1e3).toFixed(2) + " KM \xB7 STYLE " + Te.bestScore;
    let n = new Date().toISOString().slice(0, 10), e = Qc(n), t = Te.missionClaims.includes(n + ":" + e.id);
    ne("mission-title").textContent = Hd(Dt, e), ne("mission-reward").textContent = t?Un(Dt, "claimed"): e.reward + " CR", ne("mission-state").textContent = t?Un(Dt, "claimed"): Un(Dt, "missionState")
  }
  function mh() {
    qt = !1, ge = null, vi(), dh();
    for (let e of Os) {
      st.remove(e);
      ll(e)
    }
    Os = [];
    for (let e of ul)for (let m of [e.mesh, ...(e.reticle || [])]) {
      st.remove(m);
      ll(m)
    }
    ul = [];
    lf = 0;
    Fn("home"), Ml()
  }
  var gi, Gi, ks, Ns;
  function Zx() {
    if (!gi) {
      gi = new Gr({
        canvas: ne("garage-preview"), antialias: !0, alpha: !0
      }), gi.setPixelRatio(Math.min(devicePixelRatio, 1.5)), gi.toneMapping = Nr, gi.toneMappingExposure = 1.4, Gi = new fs, Gi.add(new bs(12381951, 2234414, 3));
      let n = new Es(16777215, 3);
      n.position.set(4, 6, - 3), Gi.add(n), ks = new Rt(42, 1, .1, 30), ks.position.set(4, 2.8, - 6), ks.lookAt(0, .6, 0);
      let e = new Lr(12, 12, 2249316, 1320243);
      Gi.add(e)
    }
    Ns && (Gi.remove(Ns), ll(Ns)), Ns = Kc(Te.car, Te.skin), Gi.add(Ns), gf(0)
  }
  function gf(n) {
    if (!gi || Lt !== "garage")return;
    let e = ne("garage-preview").getBoundingClientRect(), t = Math.max(1, Math.round(e.width)), i = Math.max(1, Math.round(e.height));
    gi.setSize(t, i, !1), ks.aspect = t / i, ks.updateProjectionMatrix(), pf || (Ns.rotation.y += n * .22), gi.render(Gi, ks)
  }
  function vl() {
    Fn("garage"), ne("credits").textContent = Te.credits, ne("garage-car-title").textContent = un[Te.car].name;
    let n = ol(Te.upgrades, Te.car), e = un[Te.car], t = [["SPEED", e.speed + 10, 24], ["ACCELERATION", e.accel + 3, 12], ["HANDLING", e.steer + 4, 10], ["ARMOR", Math.round((e.armor + .05) * 20), 8], ["NITRO", e.nitro + 3, 10]];
    ne("garage-stats").innerHTML = t.map(([i, s, r]) => `<span>${i}<i><em style="width:${Math.max(8,Math.min(100,s/r*100))}%"></em></i><b>${Math.round(Math.max(0,s)/r*100)}</b></span>`).join(""), ne("cars").innerHTML = Object.entries(un).map(([i, s]) => `<button class="car-option ${Te.car===i?"selected":""}" data-car="${i}" ${!Te.owned.includes(i)&&Te.credits<s.cost?"disabled":""}><span><b>${s.name}</b><small>${s.description}</small></span><span>${Te.car===i?"EQUIPPED":Te.owned.includes(i)?"EQUIP":s.cost+" CR"}</span></button>`).join(""), ne("skins").innerHTML = ["cyan", "pink", "gold"].map(i => `<button class="skin ${Te.skin===i?"selected":""}" data-skin="${i}" aria-label="${i} light signature" style="--swatch:${{cyan:"#39ebff",pink:"#ff4ad7",gold:"#ffb347"}[i]}">${i.toUpperCase()}</button>`).join(""), ne("upgrades").innerHTML = Object.entries(Te.upgrades).map(([i, s]) => `<button class="upgrade" data-upgrade="${i}" ${s>=5||Te.credits<rl(s)?"disabled":""}><span><b>${Zc[i].name} <span class="levels">${"\u25B0".repeat(s)}${"\u25B1".repeat(5-s)}</span></b><small>${Zc[i].effect}</small><small class="upgrade-level">LEVEL ${s} / 5${s<5?" \u2192 "+(s+1):" \xB7 FULLY TUNED"}</small></span><span>${s>=5?"MAX":rl(s)+" CR"}</span></button>`).join(""), ne("booster-shop").innerHTML = `<button class="upgrade" data-upgrade="flightBoost" ${Te.credits<Vi.flightBoost?"disabled":""}><span><b>FLIGHT BOOST</b><small>Fly above obstacles \xB7 Owned ${Te.boosters.flight}</small></span><span>${Vi.flightBoost} CR</span></button><button class="upgrade" data-upgrade="shieldBoost" ${Te.credits<Vi.shieldBoost?"disabled":""}><span><b>ONE-HIT SHIELD</b><small>Blocks one collision \xB7 Owned ${Te.boosters.shield}</small></span><span>${Vi.shieldBoost} CR</span></button>`, ne("achievement-count").textContent = Te.achievements.length + " / " + Object.keys(Wr).length, ne("achievements").innerHTML = Object.entries(Wr).map(([i, s]) => `<span class="${Te.achievements.includes(i)?"unlocked":""}">${Te.achievements.includes(i)?"\u25C6":"\u25C7"} ${s}</span>`).join(""), Zx()
  }
  function $x() {
    let n = ge;
    ne("pursuit-hud").hidden = n.wave !== "hot" && n.wave !== "warning";
    let e = n.overdrive > 0, t = [1, 2, 3, 5, 8][Math.min(4, Math.floor(n.combo / 3))];
    ne("action-score").textContent = n.score, ne("action-status").textContent = e?"OVERDRIVE " + n.overdrive.toFixed(1) + "s": n.combo?"COMBO x" + t + " \xB7 " + n.combo + " ACTIONS": "BUILD YOUR COMBO", ne("chain-meter").style.width = (e?n.overdrive / 4: n.comboLeft / 5) * 100 + "%", ne("combo-label").textContent = n.event?{
      roadblock: "ROADBLOCK", nitroRush: "NITRO RUSH", bonusZone: "BONUS ZONE"
    }[n.event.type] + " \xB7 " + Math.ceil(n.event.until - n.time) + "s": e?"Free boost \xB7 break barriers": n.combo?"Keep moving \xB7 collision breaks combo": "Pickups \xB7 jumps \xB7 close calls", ne("pursuit-state").textContent = n.wave === "hot"?"LOCKDOWN": n.wave === "warning"?"SURGE INCOMING": "ON YOUR TAIL", ne("pursuit-clock").textContent = n.wave === "hot"?"KEEP A SAFE LANE": n.wave === "warning"?"CHASE SECTION AHEAD": n.tutorialMode?"LEARN THE HIGHWAY": "PATROL SCANNING", ne("game").classList.toggle("overdrive", e), ne("game").classList.toggle("heat", n.wave === "hot"), ne("nitro").classList.toggle("recharging", n.nitro < 20 || n.nitroLocked)
  }
  function _f() {
    let n = ge;
    $x();
    let e = Math.floor(n.time);
    ne("time").textContent = Math.floor(e / 60) + ":" + String(e % 60).padStart(2, "0"), ne("distance").innerHTML = (n.distance / 1e3).toFixed(2) + " <small>KM</small>", ne("speed").textContent = String(Math.min(1500, Math.round(n.speed * 3.6))).padStart(3, "0"), ne("health-text").textContent = Math.ceil(n.health) + " / 100", ne("health").style.width = n.health + "%", ne("nitro").style.width = n.nitro + "%", ne("progress").style.width = n.score % 1e4 / 100 + "%";
    let z = Zd(n.distance);
    ne("sector").textContent = "HEAT " + (n.tier + 1) + " / " + z.label, ne("environment").textContent = z.label + " / " + String(z.weather).replaceAll("-", " ").toUpperCase() + " / " + String(z.time).toUpperCase();
    let t = document.querySelectorAll(".route-points span");
    t[0].textContent = (n.tier * 1e4).toLocaleString("en-US") + " PTS", t[2].textContent = ((n.tier + 1) * 1e4).toLocaleString("en-US") + " PTS", n.tier !== rh && (rh = n.tier, fn(n.tier === 0?"NO FINISH LINE / BEAT YOUR BEST": n.tier === 1?"HEAT 2 / ARMORED TRUCKS AHEAD": n.tier === 2?"HEAT 3 / LASER GATES AHEAD": "HEAT " + (n.tier + 1) + " / SPEED INCREASED")), ne("flight-ad").disabled = !Us(Ut) || !n.manualBoosts?.flight, ne("shield-ad").disabled = !Us(Ut) || !n.manualBoosts?.shield, ne("flight-count").textContent = Te.boosters.flight, ne("shield-count").textContent = Te.boosters.shield, ne("flight-owned").disabled = Te.boosters.flight < 1 || !!n.manualBoosts?.flight, ne("shield-owned").disabled = Te.boosters.shield < 1 || !!n.manualBoosts?.shield;
    ne("toast").style.opacity = Jt < lf?"1": "0"
  }
  ne("start").onclick = () => fh(!1);
  ne("daily").onclick = () => fh(!0);
  ne("flight-ad").onclick = () => cf("flight");
  ne("shield-ad").onclick = () => cf("shield-time");
  ne("flight-owned").onclick = () => ah("flight");
  ne("shield-owned").onclick = () => ah("shield");
  ne("reward-ad").onclick = Nx;
  ne("reward-skip").onclick = Fx;
  ne("retry").onclick = () => fh(ml, !0);
  ne("garage-open").onclick = vl;
  ne("garage-close").onclick = mh;
  ne("result-home").onclick = () => {
    mh(), vl()
  };
  ne("pause-button").onclick = Kr;
  ne("resume").onclick = mf;
  ne("abandon").onclick = () => {
    ge.status = "wrecked", ph(!0)
  };
  document.querySelector(".brand").onclick = n => {
    n.preventDefault(), Lt === "hud" && Kr()
  };
  ne("mute").onclick = () => {
    vt.init(), Te.mute = !Te.mute, vt.volume(), $r()
  };
  ne("garage").onclick = n => {
    let e = n.target.closest("button");
    if (!e)return;
    let t = e.dataset.car || e.dataset.upgrade;
    t && (wd(Te, t)?($r(), xl(), vl(), vt.tone(660, .08)): vt.tone(90, .12)), e.dataset.skin && (Te.skin = e.dataset.skin, $r(), xl(), vl())
  };
  function yh() {
    if (Lt !== "hud" || qt || !ge || ge.status !== "running" || ge._jumpHeld || ge.air > 0 || ge.flight > 0 || Date.now() < (ge._jumpReadyAt || 0))return;
    ge.air = 1.55, ge._rampAir = 0, ge.jumps++, Xt(ge, 180), ge.events.push({
      type: "free-jump"
    }), ge._jumpHeld = !0, ge._jumpReadyAt = Date.now() + 3000
  }
  window.addEventListener("keydown", n => {
    if (n.target?.closest?.("input,select,textarea,[contenteditable=true]"))return;
    Lt === "hud" && !qt && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"].includes(n.code) && n.preventDefault();
    n.code === "Space" && !n.repeat && yh();
    let e = Qd(n.code);
    e && Lt === "hud" && !qt && !n.repeat && (n.preventDefault(), ah(e)), n.code === "Escape" && !n.repeat && (Lt === "hud"?Kr(): Lt === "pause"?mf(): Lt === "garage" && mh()), Kn.add(n.code)
  });
  window.addEventListener("keyup", n => Kn.delete(n.code));
  window.addEventListener("blur", () => {
    vi(), Kr()
  });
  document.addEventListener("visibilitychange", () => {
    document.hidden && (vi(), Kr())
  });
  for (let n of document.querySelectorAll("[data-touch]"))n.onpointerdown = e => {
    e.preventDefault(), vt.init(), Wi[n.dataset.touch] = !0, n.dataset.touch === "jump" && yh(), n.setPointerCapture(e.pointerId)
  }, n.onpointerup = n.onpointercancel = n.onlostpointercapture = () => {
    Wi[n.dataset.touch] = !1
  };
  window.__NEON__ = {
    actions: {
      start: () => fh(false), daily: () => fh(true), garage: vl, home: mh, pause: Kr, resume: mf, activate: ah, save: $r,
      updateMeta: (meta = {}) => {
        if (meta.progression) Te.progression = sanitizeProgression(meta.progression);
        if (Object.hasOwn(meta, "ghost")) Te.ghost = sanitizeGhost(meta.ghost);
        $r();
        return true;
      },
      grantPurchase: async (grant = {}) => {
        const purchaseId = String(grant.purchaseId || "").trim();
        if (!purchaseId) return { ok: false, reason: "missing_purchase_id" };
        Te.processedPurchases = Array.isArray(Te.processedPurchases) ? Te.processedPurchases : [];
        if (Te.processedPurchases.includes(purchaseId)) {
          return { ok: true, alreadyProcessed: true };
        }
        const credits = Math.max(0, Math.floor(Number(grant.credits) || 0));
        const flight = Math.max(0, Math.floor(Number(grant.flight) || 0));
        const shield = Math.max(0, Math.floor(Number(grant.shield) || 0));
        if (!credits && !flight && !shield) return { ok: false, reason: "empty_reward" };
        Te.credits = Math.min(9999999, (Te.credits || 0) + credits);
        Te.boosters.flight = Math.min(99, (Te.boosters.flight || 0) + flight);
        Te.boosters.shield = Math.min(99, (Te.boosters.shield || 0) + shield);
        Te.processedPurchases.push(purchaseId);
        Te.processedPurchases = [...new Set(Te.processedPurchases)].slice(-100);
        await __saveProgressNow();
        Ml();
        return { ok: true, alreadyProcessed: false, credits, flight, shield };
      },
      reward: async(type) => {
        if (type === "double") {
          if (Lt !== "result" || ge?._doubleRewardPaid || sh || !Us(Ut))return false;
          sh = true;
          const previousMute = Te.mute;
          Te.mute = true;
          vt.volume();
          try {
            const ok = await NeonFeel.confirmedReward(Ut);
            if (!ok || Lt !== "result" || ge._doubleRewardPaid)return false;
            ge._doubleRewardPaid = true;
            Te.credits += fl;
            $r();
            fn("DOUBLE REWARD / +" + fl + " CR");
            return true;
          } finally {
            Te.mute = previousMute;
            vt.volume();
            sh = false;
            window.NeonPlatform?.refreshFeatureVisibility?.();
          }
        }
        if (!ge || ge.status !== "running" || !Us(Ut))return false;
        const offer = type === "nitro"?{
          id: "nitro", label: "FULL NITRO", description: "Refill Nitro after completing a rewarded advertisement."
        }: {
          id: type === "shield"?"shield-time": type, label: type === "flight"?"FLIGHT BOOST": "SHIELD", description: type === "flight"?"Fly over ground obstacles for 15 seconds.": "Protect one collision for up to 15 seconds. Does not change speed."
        };
        ne("reward-ad").dataset.offer = offer.id;
        return hf(offer);
      }, settings: (changes) => {
        if (typeof changes.sound === "boolean")Te.mute = !changes.sound;
        if (typeof changes.music === "boolean")Te.music = changes.music;
        if (["low", "auto", "high"].includes(changes.graphics))Te.graphics = changes.graphics;
        vt.volume();
        $r();
        return true;
      }
    }, get audioSettings() {
      return {
        sound: !Te.mute, music: Te.music !== false, graphics: Te.graphics || "auto"
      }
    }, get state() {
      return ge
    }, get paused() {
      return qt
    }, get saved() {
      return structuredClone(Te)
    }, purchaseRiftCosmetic(cost) {
      if (![550, 900].includes(cost) || Te.credits < cost)return false;
      Te.credits -= cost;
      $r();
      return true
    }, get view() {
      return Lt
    }, get locale() {
      return Dt
    }, get sdkReady() {
      return!!Ut
    }, get cameraFov() {
      return Kt?.fov
    }, get renderCalls() {
      return Qn?.info.render.calls
    }, get playerCar() {
      return Pt
    }, get scene() {
      return st
    }, get camera() {
      return Kt
    }, get sceneStats() {
      return {
        memory: {
          ...Qn?.info.memory
        }, render: {
          ...Qn?.info.render
        }, visibleInstances: ff.reduce((sum, batch) => sum + batch.items.filter(item => item.group.visible !== false).length, 0), hiddenInstances: ff.reduce((sum, batch) => sum + batch.items.filter(item => item.group.visible === false).length, 0), carHeight: Pt?.position.y, sky: st?.background?.getHex?.(), fog: st?.fog?.color?.getHex?.(), road: lt.road?.color?.getHex?.(), lasers: ul.length, particles: Os.length, policeDrones: _l.map(d => ({
          visible: d.visible, x: d.position.x, y: d.position.y, z: d.position.z
        }))
      }
    }, get worldObjects() {
      return _i
    }, get review() {
      return new URLSearchParams(location.search).has("devReview")?{
        createPickup: Jc, createVehicle: Kc, scene: st, camera: Kt, renderer: Qn, colliders: (on) => NeonCollision.debug(st, Pt, _i, ge, !!on), render: () => Qn.render(st, Kt)
      }: null
    }, get pickupIcons() {
      let n = !1, e = !1;
      return st?.traverse(t => {
        n || (n = t.name === "health-heart" && t.visible), e || (e = t.name === "nitro-flame" && t.visible)
      }), {
        health: n, nitro: e
      }
    }
  };
  function xf(n) {
    let e = Math.min(.05, (n - jd) / 1e3 || 0);
    if (jd = n, qt || (Jt += e), ge && Lt === "hud" && !qt) {
      let t = {
        steer: (ge.dimension === "mirror" && !(ge.mirrorGrace > 0)? - 1: 1) * ((Kn.has("KeyD") || Kn.has("ArrowRight") || Wi.right?1: 0) - (Kn.has("KeyA") || Kn.has("ArrowLeft") || Wi.left?1: 0)), jump: Kn.has("Space") || Wi.jump, nitro: Kn.has("ShiftLeft") || Kn.has("ShiftRight") || Wi.nitro
      }, i = ge.health;
      Dd(ge, e, t);
      for (let s of ge.events)if (s.type !== "tier") {
        if (NeonUI.event(s, ge, vt, fn, pl, Jr, lt))continue;
        if (s.type === "run-event") {
          fn({
            roadblock: "ROADBLOCK", nitroRush: "NITRO RUSH", bonusZone: "BONUS ZONE"
          }[s.event] + " / EVENT ACTIVE"), vt.tone(330, .55, "sawtooth", .16, 90);
          continue
        }
        if (s.type === "run-event-end") {
          fn("EVENT COMPLETE");
          continue
        }
        if (["overdrive", "heat", "warning", "cool", "shield-save"].includes(s.type)) {
          fn({
            overdrive: "OVERDRIVE / 4 SECONDS", heat: "LOCKDOWN / STAY SHARP", warning: "POLICE SURGE INCOMING", cool: "PURSUIT EASING", "shield-save": "SHIELD ABSORBED IMPACT"
          }[s.type]), vt.tone(s.type === "overdrive"?880: s.type === "shield-save"?700: 220, .3, "triangle");
          continue
        }["cell", "nitro", "coin", "magnet", "double", "energyShield", "superNitro", "dronePower", "scoreBoost"].includes(s.type)?(vt.fx("cell"), fn({
          cell: "HEALTH RESTORED", nitro: "NITRO REFILLED", coin: "+5 CREDITS", magnet: "MAGNET / 10 SECONDS", double: "DOUBLE SCORE / 12 SECONDS", energyShield: "ENERGY SHIELD ARMED", superNitro: "SUPER NITRO / 6 SECONDS", dronePower: "DRONE POWER / 15 SECONDS", scoreBoost: "×2 SCORE / 12 SECONDS"
        }[s.type]), pl(s.x, s.type === "cell"?lt.pink: s.type === "nitro" || s.type === "superNitro"?lt.cyan: lt.gold), Jr(s.index + ":" + s.j)): (s.type === "ramp" || s.type === "free-jump")?(vt.fx("ramp"), fn(s.type === "free-jump"?"JUMP": "AIRBORNE")): s.type === "near"?(vt.fx("near"), Jt > (ge._nearNotice || 0)?(ge._nearNotice = Jt + 1.8, fn("NEAR MISS / +SCORE")): 0): s.outcome === "break"?(vt.fx("barrier"), pl(s.x, lt.gold), Jr(s.index + ":" + s.j), fn("BARRIER SHATTERED")): s.outcome === "damage" && (vt.fx("barrier"), pl(s.x, lt.pink), fn("DAMAGE / -" + Math.max(1, Math.round(i - ge.health)) + " HP"))
      }
      ge.events.length = 0, ge.health < i && (ne("flash").style.opacity = 1, setTimeout(() => ne("flash").style.opacity = 0, 100)), _f(), NeonUI.frame(ge, e, Pt, Kt, vt), ge.status !== "running" && ph();
      let jc = ne("jump-cooldown"), jm = ne("jump-cooldown-meter"), jt = ne("jump-cooldown-text");
      if (jc && jm && jt) {
        let jr = Math.max(0, ((ge?._jumpReadyAt || 0) - Date.now()) / 1000);
        jm.style.width = (100 - Math.min(100, jr / 3 * 100)) + "%", jt.textContent = jr > 0?jr.toFixed(1) + "s": "READY", jc.classList.toggle("ready", jr <= 0)
      }
    }
    document.body.classList.toggle("shield-active", !!(ge && ge.shield && Lt === "hud"));
    document.body.classList.toggle("nitro-active", !!(ge && ge.boost && Lt === "hud"));
    document.body.classList.toggle("portal-warp", !!(ge && ge.portalPhase === "entry" && Lt === "hud"));
    document.body.classList.toggle("portal-exit", !!(ge && ge.portalPhase === "exit" && Lt === "hud"));
    document.body.classList.toggle("portal-approach", !!(ge && ge.portalPhase !== "entry" && ge.portalPhase !== "exit" && ge.rows && Array.from(ge.rows.values()).some(r => r.distance > ge.distance && r.distance - ge.distance < 160 && r.objects.some(o => o.type === "portal")) && Lt === "hud"));
    vt.tick(ge?.speed || 0, Lt === "hud" && !qt), vt.music(Lt === "hud" && !qt), Lt === "garage"?gf(e): Yx(qt?0: e), requestAnimationFrame(xf)
  }
  try {
    Gx(), Ml(), vt.volume(), Fn("home"), requestAnimationFrame(xf)
  } catch (n) {
    console.error("Neon Drift initialization failed", n);
    ne("failure").hidden = !1, ne("failure-message").textContent = "WebGL 2 graphics could not start. Enable hardware acceleration and reopen the game from the platform, or try Chrome / Edge. " + n.message, console.error(n)
  }

  window.__NEON_GP_HANDLE__ = __handleGamePushInit;
  if (window.__NEON_GP_PENDING__) {
    const pendingGamePush = window.__NEON_GP_PENDING__;
    window.__NEON_GP_PENDING__ = null;
    void __handleGamePushInit(pendingGamePush);
  }
})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
