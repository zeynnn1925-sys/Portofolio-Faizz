import * as THREE from 'three';

const textureCache = new Map<string, THREE.CanvasTexture>();

export function createWoodFloorTexture(): THREE.CanvasTexture {
  if (textureCache.has('wood_floor')) {
    return textureCache.get('wood_floor')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#E8DFD1';
  ctx.fillRect(0, 0, 1024, 1024);

  const plankHeight = 64;
  const plankWidth = 256;
  const rows = 1024 / plankHeight;

  for (let r = 0; r < rows; r++) {
    const y = r * plankHeight;
    const offset = (r % 2) * (plankWidth / 2);
    const cols = Math.ceil(1024 / plankWidth) + 1;

    for (let c = -1; c < cols; c++) {
      const x = c * plankWidth + offset;
      const toneShift = (Math.sin(r * 12.3 + c * 7.7) * 0.5 + 0.5);
      const rVal = Math.floor(226 + toneShift * 16);
      const gVal = Math.floor(212 + toneShift * 15);
      const bVal = Math.floor(194 + toneShift * 14);
      
      ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
      ctx.fillRect(x + 2, y + 2, plankWidth - 4, plankHeight - 4);

      ctx.strokeStyle = `rgba(165, 145, 120, 0.12)`;
      ctx.lineWidth = 1;
      for (let g = 0; g < 4; g++) {
        const grainY = y + 8 + g * 12 + (Math.sin(x + g) * 3);
        ctx.beginPath();
        ctx.moveTo(x + 4, grainY);
        ctx.lineTo(x + plankWidth - 4, grainY);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(90, 75, 60, 0.28)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 1, y + 1, plankWidth - 2, plankHeight - 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('wood_floor', texture);
  return texture;
}

export function createWallpaperTexture(): THREE.CanvasTexture {
  if (textureCache.has('wallpaper')) {
    return textureCache.get('wallpaper')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#F4EFE6';
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = '#EAE2D3';
  for (let x = 0; x < 512; x += 32) {
    ctx.fillRect(x, 0, 16, 512);
  }

  ctx.fillStyle = 'rgba(100, 90, 80, 0.025)';
  for (let i = 0; i < 2000; i++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 512;
    ctx.fillRect(rx, ry, 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('wallpaper', texture);
  return texture;
}

export function createRugTexture(): THREE.CanvasTexture {
  if (textureCache.has('rug')) {
    return textureCache.get('rug')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  const center = 512;

  ctx.fillStyle = '#F5EFE3';
  ctx.beginPath();
  ctx.arc(center, center, 500, 0, Math.PI * 2);
  ctx.fill();

  const rings = [
    { radius: 480, width: 14, color: '#2F5D5A' },
    { radius: 450, width: 4, color: '#C7862F' },
    { radius: 420, width: 8, color: '#E8A855' },
    { radius: 360, width: 22, color: '#2F5D5A' },
    { radius: 320, width: 6, color: '#C7862F' },
    { radius: 260, width: 16, color: '#E8A855' },
    { radius: 210, width: 5, color: '#2F5D5A' },
    { radius: 140, width: 12, color: '#C7862F' },
    { radius: 70, width: 18, color: '#2F5D5A' },
  ];

  rings.forEach((r) => {
    ctx.strokeStyle = r.color;
    ctx.lineWidth = r.width;
    ctx.beginPath();
    ctx.arc(center, center, r.radius, 0, Math.PI * 2);
    ctx.stroke();
  });

  const petals = 24;
  for (let i = 0; i < petals; i++) {
    const angle = (i * Math.PI * 2) / petals;
    const x = center + Math.cos(angle) * 390;
    const y = center + Math.sin(angle) * 390;
    ctx.fillStyle = i % 2 === 0 ? '#E8A855' : '#2F5D5A';
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = '#D9CEBD';
  ctx.lineWidth = 10;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.arc(center, center, 495, 0, Math.PI * 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('rug', texture);
  return texture;
}

/**
 * Creates authentic printed/typewritten paper sheet textures with exact real CV details,
 * OPMAZ stewardship, and competitions/achievements.
 */
export function createTypewriterSheetTexture(
  sheetType: 'profil' | 'administrasi' | 'proyek'
): THREE.CanvasTexture {
  const cacheKey = `typewriter_v2_${sheetType}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Textured ivory paper background
  ctx.fillStyle = '#FFFDF7';
  ctx.fillRect(0, 0, 768, 1024);

  // Subtle paper grain
  ctx.fillStyle = 'rgba(215, 195, 160, 0.18)';
  ctx.fillRect(0, 0, 768, 30);
  ctx.fillRect(0, 994, 768, 30);
  ctx.fillRect(0, 0, 26, 1024);
  ctx.fillRect(742, 0, 26, 1024);

  // Header separator line
  ctx.fillStyle = '#C7862F';
  ctx.fillRect(40, 50, 688, 3);

  ctx.font = 'bold 24px "Courier New", Courier, monospace';
  ctx.fillStyle = '#242B38';
  ctx.textBaseline = 'top';

  let title = '';
  let sub = '';
  let lines: string[] = [];

  if (sheetType === 'profil') {
    title = 'CURRICULUM VITAE RESMI — REKAM JEJAK';
    sub = 'MUHAMMAD FAIZ DZAHIN (ZEYNN)';
    lines = [
      '======================================================',
      'BIODATA DIRI & LATAR BELAKANG:',
      '• Nama Lengkap   : Muhammad Faiz Dzahin',
      '• Nama Panggilan : Zeynn / Faiz',
      '• Peran Keahlian : Web Developer & Pembangun Sistem',
      '• Lembaga Studi  : MAS Ma\'had Al-Zaytun (IPS)',
      '• Lokasi Domisili: Indramayu, Jawa Barat',
      '• Status         : Terbuka untuk Kolaborasi & Remote Proyek',
      '------------------------------------------------------',
      'ETOS & FILOSOFI KERJA:',
      '"Menyatukan disiplin pembukuan analog yang presisi',
      'dengan arsitektur kode web modern yang bersih."',
      '',
      'RIWAYAT PENDIDIKAN:',
      '1. MAS Ma\'had Al-Zaytun (2022 - 2025)',
      '   - Fokus: Ilmu Pengetahuan Sosial (IPS)',
      '   - Karakter: Kedisiplinan tinggi asrama, kepemimpinan,',
      '     tata tertib, serta kearifan sosiologis global.',
      '',
      'KOMPETENSI INTI:',
      '• Frontend: React 19, TypeScript, Tailwind, Three.js',
      '• Backend : Node.js, Express, PostgreSQL, Drizzle ORM',
      '• Kantor  : Word Mail Merge Massal, Formula Lanjut Excel',
      '======================================================',
      'DOKUMEN INI DICETAK ASLI UNTUK PORTOFOLIO KANDIDAT',
    ];
  } else if (sheetType === 'administrasi') {
    title = 'PENGALAMAN KEPEMIMPINAN & DOKUMEN RESMI';
    sub = 'ORGANISASI PELAJAR MA\'HAD AL-ZAYTUN (OPMAZ)';
    lines = [
      '======================================================',
      'JABATAN RESMI: SEKRETARIS UTAMA PUSAT',
      'MASA PENGABDIAN: PERIODE 2024 - 2025',
      '------------------------------------------------------',
      'RINGKASAN TANGGUNG JAWAB & CAPAIAN:',
      '',
      '[1] KEARSIPAN & PERSURATAN: 200+ DOKUMEN',
      '    - Mendokumentasikan, menata, dan mengarsipkan lebih',
      '      dari 200 surat dinas, disposisi, dan izin santri.',
      '    - Mengimplementasikan otomasi Mail Merge untuk efisiensi',
      '      pembuatan surat massal yang terbit instan tanpa keliru.',
      '',
      '[2] MANAJEMEN RAPAT & NOTULA: 30+ SESI TAHUNAN',
      '    - Mengatur jadwal, menyinkronkan agenda koordinasi,',
      '      dan menyusun notula tertulis yang transparan',
      '      didistribusikan kepada seluruh pimpinan organisasi.',
      '',
      '[3] HUBUNGAN KELEMBAGAAN & KOORDINASI: 100% TEPAT WAKTU',
      '    - Jembatan komunikasi utama antara jajaran pengurus',
      '      santri dengan dewan pembina Ma\'had Al-Zaytun.',
      '    - Tingkat perizinan 100% terlaksana tepat waktu.',
      '======================================================',
      'STATUS DOKUMEN: ARSIP SAH & TERVERIFIKASI LEMBAGA',
    ];
  } else {
    title = 'PRESTASI, LOMBA & KATALOG IMPLEMENTASI';
    sub = 'KARYA INOVASI TEKNOLOGI & PROYEK NYATA';
    lines = [
      '======================================================',
      'PENGEMBANG UTAMA: MUHAMMAD FAIZ DZAHIN (ZEYNN)',
      '------------------------------------------------------',
      'DAFTAR PROYEK & SOLUSI SISTEM:',
      '',
      '• LIFEFLOW SYSTEM (Featured Project)',
      '  Platform produktivitas & manajemen finansial pribadi',
      '  dengan AI Financial Advisor (budgeting 50/30/20), habit',
      '  streak tracker, dan target pencapaian real-time.',
      '',
      '• OPMAZ ADMIN PANEL HUB',
      '  Sistem portal kearsipan 200+ data santri terpusat',
      '  dengan verifikasi disposisi surat resmi secara digital.',
      '',
      '• DYNAMIC NOTULA & MAIL SYNC',
      '  Otomatisasi pembuatan surat massal dari berkas spreadsheet',
      '  menghasilkan draf dokumen .docx/.pdf dalam hitungan detik.',
      '',
      '• KAMEN RIDER 3D INTERACTIVE CATALOG',
      '  Visualisasi 3D perangkat transformasi interaktif Three.js.',
      '------------------------------------------------------',
      'DOKUMEN ASLI TERSEDIA: LAPORAN.DOCX & PRESENSI.XLSX',
      '======================================================',
      'VERIFIKASI: KARYA OTENTIK HASIL RISET MANDIRI',
    ];
  }

  ctx.fillText(title, 40, 65);
  ctx.font = 'bold 15px "Courier New", Courier, monospace';
  ctx.fillStyle = '#2F5D5A';
  ctx.fillText(sub, 40, 96);

  ctx.fillStyle = '#444';
  ctx.fillRect(40, 120, 688, 1.5);

  ctx.font = '15.5px "Courier New", Courier, monospace';
  ctx.fillStyle = '#1c222e';

  let y = 145;
  lines.forEach((line) => {
    ctx.fillText(line, 40, y);
    y += 28;
  });

  // Stamped Official Mark
  ctx.strokeStyle = '#C7862F';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(480, 890, 220, 70);
  ctx.font = 'bold 13px "Courier New", Courier, monospace';
  ctx.fillStyle = '#C7862F';
  ctx.fillText('TERVERIFIKASI RESMI', 505, 912);
  ctx.fillText('SEKRETARIAT OPMAZ', 510, 932);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createChalkboardTexture(): THREE.CanvasTexture {
  if (textureCache.has('chalkboard')) {
    return textureCache.get('chalkboard')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1C2624';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let i = 0; i < 400; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 40, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = 'rgba(235, 175, 95, 0.3)';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 1008, 496);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([4, 2]);

  ctx.strokeRect(60, 160, 240, 140);
  ctx.strokeRect(390, 160, 240, 140);
  ctx.strokeRect(720, 160, 240, 140);

  ctx.setLineDash([]);
  ctx.strokeStyle = 'rgba(232, 168, 85, 0.9)';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(300, 230);
  ctx.lineTo(390, 230);
  ctx.lineTo(375, 220);
  ctx.moveTo(390, 230);
  ctx.lineTo(375, 240);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(630, 230);
  ctx.lineTo(720, 230);
  ctx.lineTo(705, 220);
  ctx.moveTo(720, 230);
  ctx.lineTo(705, 240);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px "Courier New", Courier, monospace';
  ctx.fillText('ANALOG DATA', 100, 200);
  ctx.font = '14px "Courier New", Courier, monospace';
  ctx.fillText('200+ Berkas Arsip', 90, 230);
  ctx.fillText('Formula Excel Logic', 85, 255);

  ctx.font = 'bold 20px "Courier New", Courier, monospace';
  ctx.fillText('TRANSFORMASI', 430, 200);
  ctx.font = '14px "Courier New", Courier, monospace';
  ctx.fillText('Node.js & Schema', 435, 230);
  ctx.fillText('Normalisasi DB', 445, 255);

  ctx.font = 'bold 20px "Courier New", Courier, monospace';
  ctx.fillText('DIGITAL HUB', 770, 200);
  ctx.font = '14px "Courier New", Courier, monospace';
  ctx.fillText('React 19 + ThreeUI', 750, 230);
  ctx.fillText('Real-Time UI Portal', 745, 255);

  ctx.fillStyle = 'rgba(232, 168, 85, 0.95)';
  ctx.font = 'bold 26px "Courier New", Courier, monospace';
  ctx.fillText('ARSITEKTUR: DARI ARSIP KE SISTEM DIGITAL', 190, 80);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set('chalkboard', texture);
  return texture;
}

export function createScreenCodeTexture(activeCodeIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#151821';
  ctx.fillRect(0, 0, 1024, 640);

  ctx.fillStyle = '#1E2330';
  ctx.fillRect(0, 0, 1024, 48);

  ctx.fillStyle = '#FF5F56';
  ctx.beginPath();
  ctx.arc(28, 24, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFBD2E';
  ctx.beginPath();
  ctx.arc(48, 24, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#27C93F';
  ctx.beginPath();
  ctx.arc(68, 24, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#242B38';
  ctx.fillRect(100, 8, 200, 40);
  ctx.fillStyle = '#E8A855';
  ctx.font = 'bold 14px "JetBrains Mono", "Courier New", monospace';
  ctx.fillText('LifeFlowSystem.tsx', 120, 32);

  const snippetVariants = [
    [
      '// LifeFlow System — Personal Wealth & Habit Automation',
      'import { useState, useEffect } from "react";',
      'import { AIAdvisor, BudgetRule503020 } from "@lifeflow/engine";',
      '',
      'export function useLifeFlowAnalytics(userId: string) {',
      '  const [finances, setFinances] = useState<MonthlyBalance>({',
      '    needs: 0.50, // 50% Kebutuhan primer',
      '    wants: 0.30, // 30% Keinginan terukur',
      '    savings: 0.20 // 20% Investasi & tabungan',
      '  });',
      '',
      '  const verifyAuditLog = async () => {',
      '    const report = await generateComplianceReport(userId);',
      '    console.log("Status: 200+ Dokumen Tersinkronisasi");',
      '    return report.isValid;',
      '  };',
      '',
      '  return { finances, verifyAuditLog, streakCount: 42 };',
      '}',
    ],
    [
      '// OPMAZ Central Administrative Engine & Vault',
      'interface SantriRecord {',
      '  nis: string;',
      '  nama: string;',
      '  izinStatus: "DISETUJUI" | "PROSES" | "SELESAI";',
      '  nomorSurat: string;',
      '}',
      '',
      'export async function dispatchOfficialLetter(doc: SantriRecord) {',
      '  const mailMergeTemplate = await loadTemplate("dispen-pekanan.docx");',
      '  const merged = await mailMergeTemplate.injectData(doc);',
      '  await archiveVault.store("2024-2025/OPMAZ/", merged);',
      '  return { statusCode: 200, message: "100% Tepat Waktu" };',
      '}',
    ],
    [
      '// 3D Spatial Room Experience — Zeynn.dev',
      'const roomDimensions = { width: 9.0, height: 3.2, depth: 6.0 };',
      'const renderer = new THREE.WebGLRenderer({ antialias: true });',
      'renderer.toneMapping = THREE.ACESFilmicToneMapping;',
      'camera.position.set(0, 2.1, 5.8);',
      '',
      '// Momen Morph: Analog Buku Besar -> Digital Laptop',
      'function applyMorphTransition(progress: number) {',
      '  hingeAngle.current = THREE.MathUtils.lerp(Math.PI / 2, -0.22, progress);',
      '  serverRackEmissive.setRGB(0, progress * 0.9, progress * 0.4);',
      '}',
    ],
  ];

  const currentLines = snippetVariants[activeCodeIndex % snippetVariants.length];

  ctx.font = '15px "JetBrains Mono", "Courier New", monospace';
  let y = 85;

  currentLines.forEach((line, idx) => {
    ctx.fillStyle = '#4E576B';
    ctx.fillText(String(idx + 1).padStart(2, ' '), 20, y);

    if (line.startsWith('//')) {
      ctx.fillStyle = '#6A7891';
    } else if (line.includes('import') || line.includes('export') || line.includes('function') || line.includes('const') || line.includes('interface')) {
      ctx.fillStyle = '#E8A855';
    } else if (line.includes('"') || line.includes("'")) {
      ctx.fillStyle = '#4C8783';
    } else if (line.includes('return') || line.includes('await') || line.includes('async')) {
      ctx.fillStyle = '#C7862F';
    } else {
      ctx.fillStyle = '#D6DCE7';
    }

    ctx.fillText(line, 60, y);
    y += 28;
  });

  ctx.fillStyle = '#E8A855';
  ctx.fillRect(currentLines[currentLines.length - 1].length * 9.2 + 65, y - 24, 9, 18);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createBookSpineTexture(title: string, color: string): THREE.CanvasTexture {
  const cacheKey = `book_v2_${title}_${color}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // 1. Rich base leather/cloth book cover color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 256, 1024);

  // 2. Spine curvature shadow gradient (makes spine look 3D cylindrical)
  const spineGrad = ctx.createLinearGradient(0, 0, 256, 0);
  spineGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
  spineGrad.addColorStop(0.18, 'rgba(0, 0, 0, 0.08)');
  spineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.22)'); // central highlight
  spineGrad.addColorStop(0.82, 'rgba(0, 0, 0, 0.08)');
  spineGrad.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
  ctx.fillStyle = spineGrad;
  ctx.fillRect(0, 0, 256, 1024);

  // 3. Golden embossed ornamental ribs
  const drawGoldBand = (y: number, h: number) => {
    ctx.fillStyle = '#C7862F';
    ctx.fillRect(12, y, 232, h);
    ctx.fillStyle = '#FFE6A3';
    ctx.fillRect(12, y, 232, Math.max(1, Math.floor(h * 0.35)));
  };

  drawGoldBand(36, 10);
  drawGoldBand(54, 3);
  drawGoldBand(130, 4);

  drawGoldBand(890, 4);
  drawGoldBand(960, 3);
  drawGoldBand(974, 10);

  // 4. Tech icon badge on top of spine
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.arc(128, 92, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#FFE6A3';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#FFE6A3';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('◈', 128, 92);

  // 5. High-contrast bold title badge along the spine (LARGE FONT)
  ctx.save();
  ctx.translate(128, 515);
  ctx.rotate(-Math.PI / 2);

  // Contrast plaque background
  ctx.fillStyle = 'rgba(12, 16, 26, 0.55)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(-290, -56, 580, 112, 16);
  } else {
    ctx.rect(-290, -56, 580, 112);
  }
  ctx.fill();

  ctx.strokeStyle = '#E8A855';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Primary title: LARGE, BOLD, AND PROMINENT
  const displayTitle = title.length > 14 ? title : title.toUpperCase();
  const fontSize = displayTitle.length > 12 ? 46 : 56;
  ctx.font = `900 ${fontSize}px "Space Grotesk", "JetBrains Mono", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Text shadow for crisp legibility
  ctx.fillStyle = '#000000';
  ctx.fillText(displayTitle, 2, 3);

  // White crisp text fill
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(displayTitle, 0, 0);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates a richly detailed view of a serene Indonesian residential neighborhood ("Perumahan yang Asri")
 * Features: Terracotta-roof houses, lush trees, paved residential street, manicured gardens, and sunny sky or cozy night.
 */
export function createNeighborhoodViewTexture(isNight: boolean): THREE.CanvasTexture {
  const cacheKey = `neighborhood_asri_${isNight ? 'night' : 'day'}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1280;
  const ctx = canvas.getContext('2d')!;

  // 1. Sky Gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 680);
  if (!isNight) {
    skyGrad.addColorStop(0, '#4A88D0'); // Vivid blue sky
    skyGrad.addColorStop(0.45, '#7CB4EA');
    skyGrad.addColorStop(0.8, '#C4E2FA');
    skyGrad.addColorStop(1, '#FFF2D9'); // Warm golden horizon
  } else {
    skyGrad.addColorStop(0, '#060A14'); // Night dark indigo
    skyGrad.addColorStop(0.5, '#101728');
    skyGrad.addColorStop(1, '#1A253D');
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 1024, 1280);

  if (!isNight) {
    // Warm morning / afternoon sun glow
    const sunGrad = ctx.createRadialGradient(280, 220, 20, 280, 220, 220);
    sunGrad.addColorStop(0, 'rgba(255, 250, 220, 0.95)');
    sunGrad.addColorStop(0.3, 'rgba(255, 225, 140, 0.5)');
    sunGrad.addColorStop(1, 'rgba(255, 220, 120, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(280, 220, 220, 0, Math.PI * 2);
    ctx.fill();

    // Soft fluffy white clouds
    const drawCloud = (cx: number, cy: number, scale: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
      ctx.beginPath();
      ctx.arc(cx, cy, 38 * scale, 0, Math.PI * 2);
      ctx.arc(cx + 40 * scale, cy - 12 * scale, 48 * scale, 0, Math.PI * 2);
      ctx.arc(cx + 90 * scale, cy - 8 * scale, 42 * scale, 0, Math.PI * 2);
      ctx.arc(cx + 130 * scale, cy + 4 * scale, 34 * scale, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCloud(120, 180, 1.1);
    drawCloud(620, 260, 0.9);
    drawCloud(780, 160, 1.2);
  } else {
    // Night: Glowing crescent moon & stars
    ctx.fillStyle = '#FFF8D6';
    ctx.beginPath();
    ctx.arc(760, 200, 48, 0, Math.PI * 2);
    ctx.fill();
    // Shadow for crescent
    ctx.fillStyle = '#060A14';
    ctx.beginPath();
    ctx.arc(778, 192, 44, 0, Math.PI * 2);
    ctx.fill();

    // Twinkling stars
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 40; i++) {
      const sx = (i * 73) % 1000 + 12;
      const sy = (i * 47) % 380 + 20;
      const sr = (i % 3 === 0) ? 2 : 1.2;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. Distant rolling green hills / mountains
  ctx.fillStyle = !isNight ? '#558269' : '#142426';
  ctx.beginPath();
  ctx.moveTo(0, 520);
  ctx.bezierCurveTo(240, 470, 450, 440, 680, 475);
  ctx.bezierCurveTo(840, 500, 960, 490, 1024, 510);
  ctx.lineTo(1024, 700);
  ctx.lineTo(0, 700);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = !isNight ? '#3E6A51' : '#0F1D1E';
  ctx.beginPath();
  ctx.moveTo(0, 560);
  ctx.bezierCurveTo(320, 520, 550, 540, 780, 510);
  ctx.bezierCurveTo(900, 490, 980, 530, 1024, 545);
  ctx.lineTo(1024, 720);
  ctx.lineTo(0, 720);
  ctx.closePath();
  ctx.fill();

  // 3. Middleground: Charming Residential Houses ("Perumahan Asri")
  // Houses row with terracotta hip roofs, cream walls, windows, and porches
  const houses = [
    { x: 40, y: 550, w: 220, h: 140, roofColor: !isNight ? '#B85233' : '#3D1D13', wallColor: !isNight ? '#FDFBF7' : '#222838' },
    { x: 310, y: 535, w: 240, h: 155, roofColor: !isNight ? '#A0452A' : '#35180E', wallColor: !isNight ? '#F7F3E8' : '#252B3B' },
    { x: 600, y: 545, w: 210, h: 145, roofColor: !isNight ? '#C25A38' : '#421E14', wallColor: !isNight ? '#FAF6EE' : '#232939' },
    { x: 840, y: 540, w: 200, h: 150, roofColor: !isNight ? '#A84B2E' : '#381A10', wallColor: !isNight ? '#F8F4EA' : '#242A3A' },
  ];

  houses.forEach((h) => {
    // House wall
    ctx.fillStyle = h.wallColor;
    ctx.fillRect(h.x + 15, h.y + 60, h.w - 30, h.h - 60);

    // Terracotta roof (triangular / trapezoid pitched roof)
    ctx.fillStyle = h.roofColor;
    ctx.beginPath();
    ctx.moveTo(h.x, h.y + 60);
    ctx.lineTo(h.x + h.w / 2, h.y);
    ctx.lineTo(h.x + h.w, h.y + 60);
    ctx.closePath();
    ctx.fill();

    // Roof tile ridge detail
    ctx.strokeStyle = !isNight ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Second roof ridge highlight
    ctx.fillStyle = !isNight ? '#D46944' : '#4E2419';
    ctx.beginPath();
    ctx.moveTo(h.x + 30, h.y + 60);
    ctx.lineTo(h.x + h.w / 2, h.y + 12);
    ctx.lineTo(h.x + h.w - 30, h.y + 60);
    ctx.closePath();
    ctx.fill();

    // Windows with wood trim
    const winY = h.y + 80;
    const winW = 34;
    const winH = 40;

    [h.x + 35, h.x + h.w - 70].forEach((wx) => {
      ctx.fillStyle = !isNight ? '#5E412A' : '#1D1A18';
      ctx.fillRect(wx - 3, winY - 3, winW + 6, winH + 6);

      // Glass: bright sky reflection in day / warm yellow glowing light in night!
      ctx.fillStyle = !isNight ? '#98CEE8' : '#FFD966';
      ctx.fillRect(wx, winY, winW, winH);

      // Window cross
      ctx.fillStyle = !isNight ? '#5E412A' : '#33261A';
      ctx.fillRect(wx + winW / 2 - 1.5, winY, 3, winH);
      ctx.fillRect(wx, winY + winH / 2 - 1.5, winW, 3);
    });

    // Front door with awning / canopy
    const doorX = h.x + h.w / 2 - 18;
    const doorY = h.y + 90;
    ctx.fillStyle = !isNight ? '#C7862F' : '#4A341E';
    ctx.fillRect(doorX - 6, doorY - 8, 48, 8); // canopy
    ctx.fillStyle = !isNight ? '#6E4524' : '#2A1A0F';
    ctx.fillRect(doorX, doorY, 36, 50); // door

    // Porch light at night
    if (isNight) {
      ctx.fillStyle = '#FFE58F';
      ctx.beginPath();
      ctx.arc(doorX + 18, doorY - 4, 6, 0, Math.PI * 2);
      ctx.fill();

      const porchGrad = ctx.createRadialGradient(doorX + 18, doorY + 10, 5, doorX + 18, doorY + 10, 45);
      porchGrad.addColorStop(0, 'rgba(255, 230, 140, 0.45)');
      porchGrad.addColorStop(1, 'rgba(255, 230, 140, 0)');
      ctx.fillStyle = porchGrad;
      ctx.beginPath();
      ctx.arc(doorX + 18, doorY + 10, 45, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // 4. Clean Residential Street & Sidewalk (Jalan Perumahan)
  const streetY = 720;
  // Green front lawns
  ctx.fillStyle = !isNight ? '#629E52' : '#1A3317';
  ctx.fillRect(0, 680, 1024, 60);

  // Sidewalk with paving
  ctx.fillStyle = !isNight ? '#DDD4C4' : '#32302D';
  ctx.fillRect(0, 735, 1024, 35);
  ctx.fillStyle = !isNight ? '#C8BDA9' : '#282624';
  for (let px = 0; px < 1024; px += 48) {
    ctx.fillRect(px, 735, 2, 35);
  }

  // Asphalt residential street
  ctx.fillStyle = !isNight ? '#4C515B' : '#181A20';
  ctx.fillRect(0, 770, 1024, 180);

  // White dotted road center line
  ctx.fillStyle = !isNight ? '#E6E9EE' : '#555C6B';
  for (let rx = 20; rx < 1024; rx += 70) {
    ctx.fillRect(rx, 855, 42, 6);
  }

  // Lower sidewalk and green garden verge
  ctx.fillStyle = !isNight ? '#DDD4C4' : '#32302D';
  ctx.fillRect(0, 950, 1024, 30);
  ctx.fillStyle = !isNight ? '#4D823E' : '#152912';
  ctx.fillRect(0, 980, 1024, 300);

  // 5. Lush Greenery: Tropical trees, coconut palms, leafy banyans & flower bushes
  // Function to draw leafy tree
  const drawLushTree = (tx: number, ty: number, tr: number, shadeColor: string, hiColor: string) => {
    // Tree trunk
    ctx.fillStyle = !isNight ? '#5C402E' : '#1E1510';
    ctx.fillRect(tx - 10, ty, 20, 120);

    // Foliage clusters
    ctx.fillStyle = shadeColor;
    ctx.beginPath();
    ctx.arc(tx, ty - 10, tr, 0, Math.PI * 2);
    ctx.arc(tx - tr * 0.5, ty + tr * 0.1, tr * 0.75, 0, Math.PI * 2);
    ctx.arc(tx + tr * 0.5, ty + tr * 0.1, tr * 0.75, 0, Math.PI * 2);
    ctx.arc(tx, ty - tr * 0.5, tr * 0.65, 0, Math.PI * 2);
    ctx.fill();

    // Sunlight highlights on top of foliage
    if (!isNight) {
      ctx.fillStyle = hiColor;
      ctx.beginPath();
      ctx.arc(tx - tr * 0.2, ty - tr * 0.4, tr * 0.55, 0, Math.PI * 2);
      ctx.arc(tx + tr * 0.2, ty - tr * 0.35, tr * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Background trees between houses
  drawLushTree(280, 560, 65, !isNight ? '#3A6B35' : '#112210', '#63A653');
  drawLushTree(560, 550, 72, !isNight ? '#2E5D2A' : '#0D1D0C', '#549646');
  drawLushTree(820, 560, 68, !isNight ? '#3A6B35' : '#112210', '#63A653');

  // Foreground prominent lush trees & coconut palms
  drawLushTree(90, 660, 85, !isNight ? '#2A6328' : '#0B1F0A', '#5BB554');
  drawLushTree(930, 650, 95, !isNight ? '#245922' : '#091B08', '#4FA847');

  // Coconut palm tree leaning gracefully
  const drawPalm = (px: number, py: number) => {
    ctx.strokeStyle = !isNight ? '#7A5C43' : '#271D16';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(px, py + 220);
    ctx.quadraticCurveTo(px + 40, py + 100, px + 20, py);
    ctx.stroke();

    // Palm fronds
    ctx.strokeStyle = !isNight ? '#3C7E34' : '#122D0F';
    ctx.lineWidth = 6;
    for (let a = -0.8; a <= 0.8; a += 0.25) {
      ctx.beginPath();
      ctx.moveTo(px + 20, py);
      ctx.quadraticCurveTo(px + 20 + a * 120, py - 60, px + 20 + a * 180, py + 20 + Math.abs(a) * 50);
      ctx.stroke();
    }
  };
  drawPalm(430, 480);

  // Blooming colorful bougainvillea & garden bushes (Pink, Red, Yellow)
  const drawFlowerBush = (bx: number, by: number, bw: number, bh: number, leafColor: string, flowerColor: string) => {
    ctx.fillStyle = leafColor;
    ctx.beginPath();
    ctx.ellipse(bx, by, bw, bh, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flowers dots
    ctx.fillStyle = flowerColor;
    for (let f = 0; f < 16; f++) {
      const fx = bx - bw * 0.7 + Math.random() * bw * 1.4;
      const fy = by - bh * 0.7 + Math.random() * bh * 1.4;
      ctx.beginPath();
      ctx.arc(fx, fy, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  drawFlowerBush(200, 710, 48, 26, !isNight ? '#4C8E3C' : '#172E13', '#FF4081'); // Pink Bougainvillea
  drawFlowerBush(350, 715, 42, 22, !isNight ? '#5A9E48' : '#1B3516', '#FFD54F'); // Yellow Allamanda
  drawFlowerBush(680, 710, 52, 28, !isNight ? '#4C8E3C' : '#172E13', '#FF5252'); // Red Hibiscus
  drawFlowerBush(800, 718, 44, 24, !isNight ? '#5A9E48' : '#1B3516', '#E040FB'); // Purple Orchid bush

  // Streetlamp on sidewalk
  const drawStreetLamp = (lx: number, ly: number) => {
    ctx.fillStyle = !isNight ? '#2C3240' : '#10131A';
    ctx.fillRect(lx - 3, ly, 6, 95);
    ctx.fillRect(lx - 12, ly - 6, 24, 6);

    // Lamp bulb
    ctx.fillStyle = !isNight ? '#FFFFFF' : '#FFEBA0';
    ctx.beginPath();
    ctx.arc(lx, ly + 2, 8, 0, Math.PI * 2);
    ctx.fill();

    if (isNight) {
      // Radiant streetlamp glow
      const lampGlow = ctx.createRadialGradient(lx, ly + 5, 4, lx, ly + 5, 80);
      lampGlow.addColorStop(0, 'rgba(255, 235, 140, 0.6)');
      lampGlow.addColorStop(1, 'rgba(255, 235, 140, 0)');
      ctx.fillStyle = lampGlow;
      ctx.beginPath();
      ctx.arc(lx, ly + 5, 80, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  drawStreetLamp(260, 680);
  drawStreetLamp(750, 680);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(cacheKey, texture);
  return texture;
}

export function createTerminalScreenTexture(
  history: string[],
  currentInput: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0F121A';
  ctx.fillRect(0, 0, 1024, 640);

  ctx.fillStyle = '#1A1E29';
  ctx.fillRect(0, 0, 1024, 44);

  ctx.fillStyle = '#FF5F56';
  ctx.beginPath();
  ctx.arc(28, 22, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFBD2E';
  ctx.beginPath();
  ctx.arc(48, 22, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#27C93F';
  ctx.beginPath();
  ctx.arc(68, 22, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#E8A855';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('zeynn@arch-linux: ~/projects/kamar-dua-dunia (zsh)', 105, 27);

  ctx.font = '15px "JetBrains Mono", monospace';
  let y = 80;

  history.slice(-14).forEach((line) => {
    if (line.startsWith('➜') || line.startsWith('$')) {
      ctx.fillStyle = '#4C8783';
      ctx.fillText(line.substring(0, 2), 24, y);
      ctx.fillStyle = '#E8A855';
      ctx.fillText(line.substring(2), 48, y);
    } else if (line.startsWith('!')) {
      ctx.fillStyle = '#FFBD2E';
      ctx.fillText(line.substring(1), 24, y);
    } else {
      ctx.fillStyle = '#D4DCE8';
      ctx.fillText(line, 24, y);
    }
    y += 26;
  });

  ctx.fillStyle = '#4C8783';
  ctx.fillText('➜', 24, y);
  ctx.fillStyle = '#FFFDF8';
  ctx.fillText(` ${currentInput}`, 42, y);

  const cursorX = 48 + currentInput.length * 9.2;
  ctx.fillStyle = '#27C93F';
  ctx.fillRect(cursorX, y - 14, 9, 18);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
