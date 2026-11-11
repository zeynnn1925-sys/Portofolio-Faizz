/**
 * window-view.ts — Pemandangan jendela: kompleks perumahan yang asri
 * drawWindowView(ctx, W, H, v, t)
 * - ctx: CanvasRenderingContext2D (canvas 512x560)
 * - v  : 0 = malam, 1 = siang (pecahan = transisi halus)
 * - t  : waktu dalam detik (animasi awan & kerlip bintang)
 */
export function drawWindowView(
  x: CanvasRenderingContext2D,
  W: number,
  H: number,
  v: number,
  t: number
) {
  t = t || 0;
  x.setTransform(1, 0, 0, 1, 0, 0);
  x.globalAlpha = 1;
  const n = 1 - v;
  const S = (k: number) => Math.abs(Math.sin(k * 12.9898) * 43758.5453) % 1;
  const mx = (a: string, b: string) => {
    const expand = (h: string) => {
      if (!h) return '#000000';
      if (h.length === 4) {
        return '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
      }
      return h;
    };
    const p = (h: string) => {
      const full = expand(h);
      return [1, 3, 5].map((i) => parseInt(full.slice(i, i + 2), 16) || 0);
    };
    const A = p(a);
    const B = p(b);
    const r = Math.round(A[0] + (B[0] - A[0]) * v);
    const gr = Math.round(A[1] + (B[1] - A[1]) * v);
    const bl = Math.round(A[2] + (B[2] - A[2]) * v);
    return `rgb(${Math.max(0, Math.min(255, r))}, ${Math.max(0, Math.min(255, gr))}, ${Math.max(0, Math.min(255, bl))})`;
  };
  const R = (c: string, a: number, b: number, w: number, h: number) => {
    x.fillStyle = c;
    x.fillRect(a, b, w, h);
  };
  const O = (
    c: string,
    a: number,
    b: number,
    rx: number,
    ry: number,
    al?: number
  ) => {
    const alpha = al == null ? 1 : Math.max(0, Math.min(1, al));
    if (alpha <= 0.001) return;
    const radX = Math.max(0.1, Math.abs(rx));
    const radY = Math.max(0.1, Math.abs(ry));
    x.globalAlpha = alpha;
    x.fillStyle = c;
    x.beginPath();
    x.ellipse(a, b, radX, radY, 0, 0, Math.PI * 2);
    x.fill();
    x.globalAlpha = 1;
  };
  const GL = (
    a: number,
    b: number,
    r: number,
    c: string,
    al: number
  ) => {
    if (al < 0.02 || r <= 0) return;
    const alpha = Math.max(0, Math.min(1, al));
    const rad = Math.max(0.1, r);
    const g = x.createRadialGradient(a, b, 0, a, b, rad);
    g.addColorStop(0, c);
    g.addColorStop(1, 'rgba(255,200,100,0)');
    x.globalAlpha = alpha;
    x.fillStyle = g;
    x.fillRect(a - rad, b - rad, 2 * rad, 2 * rad);
    x.globalAlpha = 1;
  };

  // langit, bintang, bulan, matahari, awan
  let g = x.createLinearGradient(0, 0, 0, 360);
  g.addColorStop(0, mx('#0b1230', '#3f93e0'));
  g.addColorStop(0.7, mx('#2b3a6b', '#8cc8f2'));
  g.addColorStop(1, mx('#6a5a78', '#e2f1f7'));
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);

  for (let i = 0; i < 46; i++) {
    x.globalAlpha = n * (0.35 + 0.55 * Math.sin(t * 2 + i) ** 2);
    R('#fff', S(i) * W, S(i + 9) * 230, 2, 2);
  }
  x.globalAlpha = 1;

  GL(110, 85, 90, 'rgba(190,210,255,.8)', n * 0.8);
  O('#fff6d8', 110, 85, 17, 17, n);

  GL(405, 100, 170, 'rgba(255,240,170,.95)', v * 0.9);
  O('#fffbe0', 405, 100, 25, 25, v);

  for (let i = 0; i < 4; i++) {
    const cx = (t * 7 + i * 190) % (W + 260) - 130;
    const cy = 60 + ((i * 47) % 120);
    [
      [0, 0, 46, 15],
      [-30, 6, 30, 11],
      [32, 7, 34, 12],
    ].forEach((a) => O('#fff', cx + a[0], cy + a[1], a[2], a[3], v * 0.85));
  }

  // bukit hijau di kejauhan
  [
    [360, '#10241f', '#8fc08a', 0],
    [378, '#14302a', '#5e9e5c', 20],
  ].forEach((r) => {
    x.fillStyle = mx(r[1] as string, r[2] as string);
    x.beginPath();
    x.moveTo(0, r[0] as number);
    for (let i = 0; i < 8; i++) {
      x.quadraticCurveTo(
        i * 64 + 32,
        (r[0] as number) - 25 + S(i + (r[3] as number)) * 22,
        (i + 1) * 64,
        r[0] as number
      );
    }
    x.lineTo(W, H);
    x.lineTo(0, H);
    x.fill();
  });

  // pohon kelapa/palem
  const palm = (px: number, b: number, h: number, l: number, c: string) => {
    x.lineCap = 'round';
    x.strokeStyle = mx('#1a1410', '#6b4a2a');
    x.lineWidth = 7;
    x.beginPath();
    x.moveTo(px, b);
    x.quadraticCurveTo(px + l * 0.2, b - h * 0.55, px + l, b - h);
    x.stroke();
    const tx = px + l;
    const ty = b - h;
    for (let k = 0; k < 9; k++) {
      const a = -3.05 + k * 0.36;
      const len = 58 + S(k + px) * 16;
      const ex = tx + Math.cos(a) * len;
      const ey = ty + Math.sin(a) * len + 20;
      const qx = tx + Math.cos(a) * len * 0.6;
      const qy = ty + Math.sin(a) * len * 0.6 - 12;
      x.strokeStyle = c;
      x.lineWidth = 7;
      x.beginPath();
      x.moveTo(tx, ty);
      x.quadraticCurveTo(qx, qy, ex, ey);
      x.stroke();
      x.strokeStyle = mx('#1c4a30', '#7cc46a');
      x.lineWidth = 2.5;
      x.beginPath();
      x.moveTo(tx, ty);
      x.quadraticCurveTo(qx, qy, ex, ey);
      x.stroke();
    }
    O('#4a2f1a', tx - 4, ty + 5, 4.5, 4.5);
    O('#4a2f1a', tx + 4, ty + 6, 4.5, 4.5);
  };
  palm(262, 432, 150, -10, mx('#12301f', '#3f8f4a'));

  // rumah: dinding krem, atap genteng terakota, teras berkanopi kayu
  const house = (
    hx: number,
    hw: number,
    hh: number,
    rh: number,
    lit: number
  ) => {
    const b = 428;
    const cx = hx + hw / 2;
    R(mx('#3a3548', '#f0e2c2'), hx, b - hh, hw, hh);
    R('rgba(0,0,0,.12)', hx + hw - 20, b - hh, 20, hh);
    x.save();
    x.beginPath();
    x.moveTo(hx - 9, b - hh);
    x.lineTo(hx + hw + 9, b - hh);
    x.lineTo(hx + hw - 20, b - hh - rh);
    x.lineTo(hx + 20, b - hh - rh);
    x.closePath();
    x.fillStyle = mx('#5a2a28', '#c4623b');
    x.fill();
    x.clip();
    for (let y = b - hh - rh; y < b - hh; y += 7) {
      R('rgba(0,0,0,.2)', hx - 10, y, hw + 20, 1.6);
    }
    x.restore();
    R(mx('#2a2530', '#d9c9a6'), cx - 46, b - 4, 92, 4);
    R(mx('#2a1d15', '#8a5a2f'), cx - 40, b - 54, 80, 6);
    R(mx('#2a1d15', '#8a5a2f'), cx - 38, b - 48, 5, 44);
    R(mx('#2a1d15', '#8a5a2f'), cx + 33, b - 48, 5, 44);
    R(mx('#2b2230', '#6b4a2f'), cx - 11, b - 38, 22, 34);
    GL(cx, b - 56, 40, 'rgba(255,210,130,.8)', n * 0.6);
    [0, 1].forEach((i) => {
      const wx = i ? hx + hw - 40 : hx + 14;
      const wy = b - hh + 20;
      const on = (lit >> i) & 1;
      R(mx('#e9dcc0', '#fffaf0'), wx - 3, wy - 3, 32, 36);
      R(mx(on ? '#ffd27a' : '#1b2540', '#a9d3ee'), wx, wy, 26, 30);
      R(mx('#e9dcc0', '#fffaf0'), wx + 12, wy, 2, 30);
      GL(wx + 13, wy + 15, 46, 'rgba(255,205,110,.85)', n * on);
    });
  };
  house(-20, 150, 92, 40, 1);
  house(175, 165, 104, 46, 3);
  house(370, 160, 88, 38, 2);

  // jalan beraspal, trotoar berpaving, bahu rumput
  R(mx('#0f2418', '#5fa04c'), 0, 446, W, 26);
  R(mx('#2e2e38', '#cfc8bb'), 0, 470, W, 27);
  x.globalAlpha = 0.22;
  for (let i = 0; i < W; i += 30) R('#000', i, 470, 1.5, 27);
  R('#000', 0, 483, W, 1.5);
  x.globalAlpha = 1;
  R(mx('#3a3a44', '#e6e0d4'), 0, 497, W, 5);
  R(mx('#1d1e26', '#4a4d55'), 0, 502, W, H - 502);
  for (let i = -20; i < W; i += 64) {
    R('rgba(255,255,255,.55)', i, 536, 34, 4);
  }
  R(mx('#2a2530', '#e8dcc0'), 0, 440, W, 10);
  R(mx('#3a3342', '#f6eedd'), 0, 438, W, 3);

  // pohon rindang
  const tree = (cx: number, b: number, s: number) => {
    R(mx('#150f0b', '#5a3a22'), cx - 5, b - s * 0.5, 10, s * 0.5);
    for (let i = 0; i < 9; i++) {
      const a = S(cx + i) * 6.28;
      const r = s * 0.22 + S(i + cx * 3) * s * 0.12;
      O(
        mx(i % 2 ? '#0e2a1e' : '#143826', '#2f7d3a'),
        cx + Math.cos(a) * s * 0.3,
        b - s * 0.72 + Math.sin(a) * s * 0.22,
        r,
        r * 0.9
      );
    }
    for (let i = 0; i < 7; i++) {
      O(
        mx('#1c4a30', '#5cb85c'),
        cx - s * 0.12 + S(i + cx) * s * 0.28,
        b - s * 0.85 + S(i * 5 + cx) * s * 0.28,
        s * 0.1,
        s * 0.08
      );
    }
  };
  tree(150, 446, 110);
  tree(352, 446, 100);
  tree(25, 450, 140);
  tree(488, 448, 115);

  // semak bugenvil (magenta) dan alamanda (kuning)
  const bush = (
    cx: number,
    cy: number,
    r: number,
    f1: string[],
    f2: string[]
  ) => {
    for (let i = 0; i < 4; i++) {
      O(
        mx('#10281b', '#2d7a37'),
        cx + (i - 1.5) * r * 0.5,
        cy + (i % 2) * 3,
        r * 0.6,
        r * 0.5
      );
    }
    for (let i = 0; i < 12; i++) {
      O(
        mx(f1[0], f1[1]),
        cx + (S(i + cx) - 0.5) * r * 2,
        cy - S(i * 3 + cx) * r * 0.7,
        r * 0.2,
        r * 0.2
      );
    }
    for (let i = 0; i < 6; i++) {
      O(
        mx(f2[0], f2[1]),
        cx + (S(i * 7 + cx) - 0.5) * r * 1.8,
        cy - S(i * 5 + cx) * r * 0.6,
        r * 0.14,
        r * 0.14
      );
    }
  };
  const BG = [
    ['#6a1a3a', '#d6336c'],
    ['#8a3a5a', '#ff7aa8'],
  ];
  const AL = [
    ['#7a6310', '#f6c915'],
    ['#a88e2a', '#ffe066'],
  ];
  [
    [45, 438, 22, BG],
    [100, 440, 18, AL],
    [205, 440, 20, BG],
    [262, 441, 17, AL],
    [310, 440, 21, BG],
    [405, 440, 18, AL],
    [448, 441, 20, BG],
    [505, 440, 16, AL],
  ].forEach((b) =>
    bush(
      b[0] as number,
      b[1] as number,
      b[2] as number,
      b[3][0] as string[],
      b[3][1] as string[]
    )
  );
  palm(458, 470, 230, 14, mx('#12301f', '#3f8f4a'));

  // tiang lampu taman
  [110, 305, 470].forEach((lx) => {
    R(mx('#16161c', '#2b2b32'), lx - 2, 418, 4, 72);
    O(mx('#555', '#d8d2c4'), lx, 418, 9, 4);
    O(mx('#ffe39a', '#f3eee0'), lx, 411, 7, 9);
    GL(lx, 411, 75, 'rgba(255,215,120,.95)', n * 0.95);
    x.save();
    x.translate(lx, 492);
    x.scale(1, 0.22);
    GL(0, 0, 90, 'rgba(255,215,120,.8)', n * 0.8);
    x.restore();
  });

  // sapuan sinar matahari hangat
  x.globalAlpha = 0.1 * v;
  x.fillStyle = '#fff6c0';
  x.beginPath();
  x.moveTo(405, 100);
  x.lineTo(250, H);
  x.lineTo(340, H);
  x.closePath();
  x.fill();
  x.beginPath();
  x.moveTo(415, 100);
  x.lineTo(380, H);
  x.lineTo(470, H);
  x.closePath();
  x.fill();
  x.globalAlpha = 1;
}
