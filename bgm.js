// 冒険の BGM と効果音（Web Audio で作るオリジナルのチップチューン。音声ファイルは使わない）
// 「BGMモード」のときだけ鳴る。サイレントモードでは何もしない。
let ctx = null, master = null, timer = null, song = null, step = 0, nextT = 0;
let enabled = false;

const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
function ac() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
    ctx = new C(); master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}
function note(f, t, dur, type, vol, dest = master) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(dest); o.start(t); o.stop(t + dur + 0.02);
}
function noise(t, dur, vol, hp = 6000) {
  const len = Math.floor(ctx.sampleRate * dur), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = buf; f.type = 'highpass'; f.frequency.value = hp;
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f); f.connect(g); g.connect(master); s.start(t);
}
function kick(t) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
  g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.16);
}

// 曲：1マス＝8分音符。null は休み
const _ = null;
const SONGS = {
  map: { // おだやかな冒険マップ（ハ長調）
    bpm: 92, lead: 'triangle', lv: 0.16, bass: 'sine', bv: 0.14, drums: false,
    mel: [72, _, 76, _, 79, _, 76, _, 74, _, 77, _, 81, _, 77, _, 76, _, 79, _, 84, _, 79, _, 77, 76, 74, _, 72, _, _, _],
    bas: [48, _, _, _, 55, _, _, _, 53, _, _, _, 60, _, _, _, 45, _, _, _, 52, _, _, _, 43, _, _, _, 50, _, _, _],
  },
  battle: { // バトル（イ短調）
    bpm: 148, lead: 'square', lv: 0.07, bass: 'triangle', bv: 0.16, drums: true,
    mel: [69, 72, 76, 72, 74, 72, 71, _, 69, 72, 76, 79, 77, 76, 74, _, 72, 74, 76, 77, 79, 77, 76, 74, 72, 71, 69, 71, 72, _, 69, _],
    bas: [45, 57, 45, 57, 45, 57, 45, 57, 41, 53, 41, 53, 41, 53, 41, 53, 43, 55, 43, 55, 43, 55, 43, 55, 40, 52, 40, 52, 40, 52, 40, 52],
  },
  home: { // ヒマコロシのホーム：のんびり（ヘ長調）
    bpm: 84, lead: 'triangle', lv: 0.14, bass: 'sine', bv: 0.12, drums: false,
    mel: [65, _, 69, _, 72, _, 69, _, 70, _, 69, _, 67, _, _, _, 64, _, 67, _, 70, _, 69, _, 67, 65, 64, _, 65, _, _, _],
    bas: [41, _, _, _, 48, _, _, _, 46, _, _, _, 48, _, _, _, 43, _, _, _, 48, _, _, _, 41, _, _, _, 48, _, _, _],
  },
  study: { // 勉強：落ち着いた（ト長調）
    bpm: 76, lead: 'sine', lv: 0.16, bass: 'sine', bv: 0.1, drums: false,
    mel: [67, _, _, 71, 74, _, _, _, 72, _, 71, _, 69, _, _, _, 71, _, _, 74, 76, _, _, _, 74, _, 71, _, 67, _, _, _],
    bas: [43, _, _, _, _, _, _, _, 48, _, _, _, _, _, _, _, 40, _, _, _, _, _, _, _, 50, _, _, _, _, _, _, _],
  },
  game: { // ゲーム：ポップ（ハ長調）
    bpm: 132, lead: 'square', lv: 0.06, bass: 'triangle', bv: 0.14, drums: true,
    mel: [72, 72, 79, _, 76, _, 72, _, 74, 74, 77, _, 76, _, 74, _, 72, 72, 79, _, 81, _, 79, 77, 76, _, 74, _, 72, _, _, _],
    bas: [48, _, 55, _, 48, _, 55, _, 50, _, 57, _, 50, _, 57, _, 45, _, 52, _, 45, _, 52, _, 43, _, 50, _, 43, _, 50, _],
  },
  words: { // 単語：ゆったり（ニ長調）
    bpm: 70, lead: 'triangle', lv: 0.13, bass: 'sine', bv: 0.1, drums: false,
    mel: [74, _, 78, _, 81, _, _, _, 79, _, 78, _, 76, _, _, _, 74, _, 76, _, 78, _, 81, _, 79, _, 76, _, 74, _, _, _],
    bas: [50, _, _, _, 57, _, _, _, 55, _, _, _, 57, _, _, _, 47, _, _, _, 54, _, _, _, 55, _, _, _, 57, _, _, _],
  },
  boss: { // ボス（ニ短調）
    bpm: 156, lead: 'sawtooth', lv: 0.05, bass: 'square', bv: 0.07, drums: true,
    mel: [62, _, 65, 62, 69, _, 68, _, 62, _, 65, 62, 70, 69, 68, _, 62, 65, 69, 72, 70, 69, 65, 62, 61, _, 64, 67, 70, _, 69, _],
    bas: [38, 38, 50, 38, 38, 50, 38, 50, 41, 41, 53, 41, 41, 53, 41, 53, 43, 43, 55, 43, 43, 55, 43, 55, 45, 45, 57, 45, 44, 56, 45, 57],
  },
};
function schedule() {
  if (!song || !ctx) return;
  const spb = 60 / song.bpm / 2; // 8分音符の長さ
  while (nextT < ctx.currentTime + 0.15) {
    const i = step % song.mel.length;
    if (song.mel[i] != null) note(hz(song.mel[i]), nextT, spb * 0.9, song.lead, song.lv);
    if (song.bas[i] != null) note(hz(song.bas[i]), nextT, spb * 0.95, song.bass, song.bv);
    if (song.drums) { if (i % 4 === 0) kick(nextT); noise(nextT, 0.04, i % 2 ? 0.03 : 0.05); }
    nextT += spb; step++;
  }
}

// スマホで別のアプリ・別のタブに移ったら止め、戻ってきたら続きから鳴らす
let paused = false;
function onVis() {
  if (!ctx) return;
  if (document.hidden) {
    if (song) { paused = true; clearInterval(timer); timer = null; }
    ctx.suspend().catch(() => {});
  } else if (paused && enabled && song) {
    paused = false;
    ctx.resume().then(() => { nextT = ctx.currentTime + 0.08; schedule(); timer = setInterval(schedule, 40); }).catch(() => {});
  }
}
if (typeof document !== 'undefined') document.addEventListener('visibilitychange', onVis);
if (typeof window !== 'undefined') window.addEventListener('pagehide', () => { if (ctx) { if (song) { paused = true; clearInterval(timer); timer = null; } ctx.suspend().catch(() => {}); } });

export const bgm = {
  get on() { return enabled; },
  setEnabled(v) { enabled = v; if (!v) this.stop(); },
  play(name) {
    if (!enabled) return;
    if (song === SONGS[name] && timer) return;
    if (!ac()) return;
    this.stop();
    song = SONGS[name]; step = 0; nextT = ctx.currentTime + 0.08;
    if (document.hidden) { paused = true; return; }
    master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(0.5, ctx.currentTime);
    schedule(); timer = setInterval(schedule, 40);
  },
  stop() {
    clearInterval(timer); timer = null; song = null; paused = false;
    if (ctx && master) { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(0, ctx.currentTime); master.gain.setValueAtTime(0.5, ctx.currentTime + 0.3); }
  },
  // 効果音
  sfx(name) {
    if (!enabled || document.hidden || !ac()) return;
    const t = ctx.currentTime + 0.01;
    const seq = (ns, gap, type, vol, dur) => ns.forEach((m, i) => note(hz(m), t + i * gap, dur || gap * 1.6, type, vol));
    switch (name) {
      case 'hit': noise(t, 0.08, 0.25, 1500); note(hz(88), t, 0.08, 'square', 0.12); note(hz(76), t + 0.05, 0.1, 'square', 0.1); break;
      case 'gah': noise(t, 0.1, 0.5, 700); note(hz(57), t, 0.05, 'square', 0.22); note(hz(43), t + 0.03, 0.14, 'square', 0.22); kick(t); break; // ガッ！
      case 'crit': noise(t, 0.12, 0.3, 1200); seq([84, 88, 91], 0.05, 'square', 0.12); break;
      case 'miss': note(hz(45), t, 0.25, 'sawtooth', 0.12); note(hz(40), t + 0.12, 0.3, 'sawtooth', 0.12); break;
      case 'ouch': noise(t, 0.2, 0.3, 300); note(hz(38), t, 0.2, 'square', 0.15); break;
      case 'ko': seq([79, 74, 71, 67, 62], 0.06, 'square', 0.12); break;
      case 'skill': seq([72, 76, 79, 84, 88], 0.05, 'triangle', 0.18); break;
      case 'heal': seq([76, 79, 84, 88], 0.08, 'sine', 0.2); break;
      case 'win': seq([72, 76, 79, 84], 0.12, 'square', 0.12, 0.2); seq([84], 0.5, 'square', 0.12, 0.6); note(hz(60), t + 0.48, 0.6, 'triangle', 0.18); break;
      case 'lose': seq([67, 63, 60, 55], 0.22, 'triangle', 0.18, 0.4); break;
      case 'gacha': for (let i = 0; i < 10; i++) noise(t + i * 0.06, 0.05, 0.12, 3000); seq([84, 88, 91, 96], 0.07, 'triangle', 0.18); break;
      case 'rare': seq([72, 76, 79, 84, 88, 91, 96], 0.07, 'square', 0.1, 0.3); break;
      case 'charge': seq([48, 52, 55, 60, 64, 67, 72, 76, 79, 84], 0.11, 'sawtooth', 0.07); break; // 合体：5人が集まる
      case 'boom': noise(t, 0.6, 0.6, 350); kick(t); note(hz(33), t, 0.9, 'sawtooth', 0.22); note(hz(45), t, 0.6, 'square', 0.12); break;
      case 'pose': seq([72, 76, 79], 0.1, 'square', 0.12); note(hz(84), t + 0.32, 0.7, 'square', 0.13); note(hz(60), t + 0.32, 0.7, 'triangle', 0.2); kick(t + 0.32); break;
      case 'tap': note(hz(84), t, 0.05, 'square', 0.06); break;
      default: break;
    }
  },
};
