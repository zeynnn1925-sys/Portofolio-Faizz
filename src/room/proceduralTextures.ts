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
  const cacheKey = `book_${title}_${color}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 128, 512);

  ctx.fillStyle = 'rgba(255, 215, 120, 0.45)';
  ctx.fillRect(0, 20, 128, 6);
  ctx.fillRect(0, 32, 128, 2);
  ctx.fillRect(0, 480, 128, 6);
  ctx.fillRect(0, 472, 128, 2);

  ctx.save();
  ctx.translate(64, 256);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "JetBrains Mono", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title.toUpperCase(), 0, 0);
  ctx.restore();

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
