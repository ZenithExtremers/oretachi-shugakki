// 効果音（音声ファイルを使わず Web Audio で作る）
let ctx = null;
function ac() {
  if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C(); }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}
// 1音鳴らす：周波数・開始(秒後)・長さ・波形・音量
function tone(f, at, dur, type = 'sine', vol = 0.25) {
  const c = ac(); if (!c) return;
  const t = c.currentTime + at;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t + dur + 0.02);
}
// ブザー（低い矩形波をこもらせる）
function buzz(at, dur) {
  const c = ac(); if (!c) return;
  const t = c.currentTime + at;
  const o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain();
  o.type = 'square'; o.frequency.setValueAtTime(140, t);
  f.type = 'lowpass'; f.frequency.setValueAtTime(900, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.22, t + 0.015);
  g.gain.setValueAtTime(0.22, t + dur - 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f); f.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t + dur + 0.02);
}
export const sfx = {
  enabled: true,
  ok() { if (!this.enabled) return; tone(1318.5, 0, 0.35, 'sine', 0.3); tone(1046.5, 0.16, 0.6, 'sine', 0.3); }, // ピンポン
  ng() { if (!this.enabled) return; buzz(0, 0.12); buzz(0.17, 0.5); }, // ブブー
  fanfare() { // クリア・高得点
    if (!this.enabled) return;
    [523.3, 659.3, 784, 1046.5].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle', 0.25));
    tone(1046.5, 0.44, 0.7, 'triangle', 0.25); tone(1318.5, 0.44, 0.7, 'sine', 0.12);
  },
};
