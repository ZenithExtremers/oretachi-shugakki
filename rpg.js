// ヒマコロシ「冒険」— 問題に答えてバグ（敵）と戦うクイズRPG
// 主人公はアプリのアイコンの人。仲間はガチャで集めて育てる。キャラ・敵・物語はすべてオリジナル。
// 雑魚戦：単語帳（data/hima-words.js）の4択 ／ ボス戦：本編のその回の5択（コード・図つき）
// 保存は ヒマコロシの S.rpg（キー oretachi:hima）
import { bgm } from './bgm.js';
import { ENEMIES } from './enemies.js';
import { STAGE } from './enemies-stage.js';
import { CHAR_ART, MID_ART } from './charart.js';

/* ---------- データ ---------- */
// 仲間。subj が一致するステージでは攻撃力×1.5（'all' はどこでも×1.2）
// スキル：heal（HP回復 pow割合）／dmg（攻撃力×pow のダメージ）／time（制限時間+pow秒）／guard（次の pow 回の被ダメ半分）／hint（不正解の選択肢を2つ消す）
export const CHARS = {
  owl: { name: 'フクロウ', icon: 'owl', rar: 2, subj: 'all', hp: 70, atk: 14, skill: { kind: 'heal', pow: 0.3, cost: 3, name: 'ホーホーの歌' } },
  piyo: { name: 'ピヨ', icon: '🐣', rar: 1, subj: 'ccpp', hp: 50, atk: 10, skill: { kind: 'heal', pow: 0.15, cost: 3, name: 'ぴよぴよ' } },
  chu: { name: 'チュー', icon: '🐭', rar: 1, subj: 'ccpp', hp: 45, atk: 12, skill: { kind: 'dmg', pow: 2, cost: 3, name: 'かじりつく' } },
  kero: { name: 'ケロ', icon: '🐸', rar: 1, subj: 'db', hp: 55, atk: 10, skill: { kind: 'dmg', pow: 2, cost: 3, name: 'ケロケロ砲' } },
  mimi: { name: 'ミミ', icon: '🐰', rar: 1, subj: 'db', hp: 50, atk: 11, skill: { kind: 'heal', pow: 0.15, cost: 3, name: 'にんじん' } },
  maimai: { name: 'マイマイ', icon: '🐌', rar: 1, subj: 'sd', hp: 65, atk: 8, skill: { kind: 'time', pow: 5, cost: 3, name: 'のんびり' } },
  kame: { name: 'カメキチ', icon: '🐢', rar: 1, subj: 'sd', hp: 70, atk: 8, skill: { kind: 'guard', pow: 2, cost: 3, name: 'こうらガード' } },
  pen: { name: 'ペン', icon: '🐧', rar: 2, subj: 'ccpp', hp: 70, atk: 16, skill: { kind: 'time', pow: 8, cost: 3, name: 'ひんやり' } },
  tora: { name: 'トラ', icon: '🐯', rar: 2, subj: 'ccpp', hp: 75, atk: 20, skill: { kind: 'dmg', pow: 3, cost: 4, name: 'ツメの一撃' } },
  konko: { name: 'コンコ', icon: '🦊', rar: 2, subj: 'db', hp: 70, atk: 19, skill: { kind: 'dmg', pow: 3, cost: 4, name: 'きつね火' } },
  kuma: { name: 'クマ', icon: '🐻', rar: 2, subj: 'db', hp: 95, atk: 14, skill: { kind: 'guard', pow: 3, cost: 3, name: 'どっしり' } },
  panda: { name: 'パンダ先輩', icon: '🐼', rar: 2, subj: 'sd', hp: 85, atk: 15, skill: { kind: 'heal', pow: 0.35, cost: 4, name: 'ささの差し入れ' } },
  robo: { name: 'ロボ博士', icon: '🤖', rar: 3, subj: 'ccpp', hp: 100, atk: 28, skill: { kind: 'dmg', pow: 4, cost: 4, name: 'コンパイル砲' } },
  kujira: { name: 'クジラ', icon: '🐳', rar: 3, subj: 'db', hp: 130, atk: 22, skill: { kind: 'heal', pow: 0.6, cost: 4, name: 'しおふき' } },
  chou: { name: 'チョウ', icon: '🦋', rar: 3, subj: 'sd', hp: 90, atk: 26, skill: { kind: 'time', pow: 15, cost: 3, name: 'りんぷん' } },
  yuni: { name: 'ユニ', icon: '🦄', rar: 3, subj: 'all', hp: 110, atk: 24, skill: { kind: 'heal', pow: 1, cost: 5, name: 'にじの癒し' } },
  // 章の★をすべて集めるともらえる限定の仲間（ガチャには出ない）
  ninja: { name: 'ポインタ忍者', icon: '🥷', rar: 3, subj: 'ccpp', hp: 115, atk: 32, limited: 'ccpp', skill: { kind: 'dmg', pow: 5, cost: 4, name: 'アドレス手裏剣' } },
  kenja: { name: 'テーブル賢者', icon: '🧙', rar: 3, subj: 'db', hp: 140, atk: 24, limited: 'db', skill: { kind: 'heal', pow: 0.7, cost: 4, name: '正規化の祈り' } },
  kenchiku: { name: 'UML建築士', icon: '👷', rar: 3, subj: 'sd', hp: 125, atk: 27, limited: 'sd', skill: { kind: 'time', pow: 18, cost: 3, name: '設計図ひろげ' } },
  kyokan: { name: 'ドライブ教官', icon: '🧑‍🏫', rar: 3, subj: 'menkyo', hp: 125, atk: 27, limited: 'menkyo', skill: { kind: 'guard', pow: 3, cost: 3, name: '補助ブレーキ' } },
  kikimimi: { name: 'ききみみウサギ', icon: '🐰', rar: 3, subj: 'toeicL', hp: 115, atk: 27, limited: 'toeicL', skill: { kind: 'time', pow: 18, cost: 3, name: 'もう一回きく' } },
  senchou: { name: 'ことばの船長', icon: '🧑‍✈️', rar: 3, subj: 'toeic', hp: 120, atk: 28, limited: 'toeic', skill: { kind: 'hint', pow: 2, cost: 3, name: '辞書の羅針盤' } },
  // 中間ボスを★3でクリアすると仲間になる（ガチャには出ない）
  liner: { name: 'グランドビルドライナー', icon: '🚂', rar: 3, subj: 'ccpp', hp: 150, atk: 34, limited: 'mid', skill: { kind: 'dmg', pow: 6, cost: 5, name: '合体ビルドバスター' } },
  yankee: { name: '隣の部屋のヤンキー', icon: '😎', rar: 3, subj: 'db', hp: 160, atk: 26, limited: 'mid', skill: { kind: 'guard', pow: 2, cost: 3, name: 'ガン飛ばし' } },
  spec: { name: '設計竜スペック', icon: '🐲', rar: 3, subj: 'sd', hp: 145, atk: 33, limited: 'mid', skill: { kind: 'dmg', pow: 5, cost: 4, name: '仕様書ブレス' } },
  // ★★★★（レジェンド）：勉強に出てくる用語がモチーフ。得意科目なし。ステータスは★★★（HP120・攻撃28）をもとに決める
  tachyon: { name: 'タキオン', icon: '⚡', rar: 4, subj: null, hp: 84, atk: 20, skill: { kind: 'charge', pow: 1, cost: 2, name: '超光速チャージ' }, prof: '光より速く動くといわれる仮想の粒子。仲間のスキルの時間を早める。' },
  nyukuri: { name: 'ニュクリ', icon: '☢️', rar: 4, subj: null, hp: 1, fixHp: true, atk: 36, skill: { kind: 'nuke', pow: 6, cost: 5, name: '核分裂インパクト' }, prof: '原子核（nucleus）の化身。とてつもない力を持つが、体はHP 1しかない。' },
  homeo: { name: 'ホメオスタシス', icon: '💚', rar: 4, subj: null, hp: 144, atk: 22, skill: { kind: 'homeo', pow: 3, cost: 4, name: '恒常性の維持' }, prof: '体の中をいつも同じ状態に保つ番人。どんなに攻撃されても倒れない。' },
  inertia: { name: 'イナーシャ', icon: '⚙️', rar: 4, subj: null, hp: 108, atk: 25, skill: { kind: 'inertia', pow: 3, cost: 4, name: '止まらない勢い' }, prof: '慣性の法則の鋼のよろい。一度ついた勢いは、ミスしても止まらない。' },
  ryu: { name: 'リュウ', icon: '🐉', rar: 3, subj: 'all', hp: 120, atk: 30, skill: { kind: 'dmg', pow: 5, cost: 5, name: 'りゅうのいぶき' } },
};
const HERO = { name: '主人公', hp: 100, atk: 20, skill: { kind: 'hint', pow: 2, cost: 4, name: 'ひとさし指のひらめき' } };
// Lv.50・100・150 になるたびのステータスの倍率。Lv.150 で「同じレベルのリュウ（得意ぜんぶ×1.2込み）」の1.1倍になるように3段階でそろえる
const HERO_UP = { hp: ((120 * 1.1) / 100) ** (1 / 3), atk: ((30 * 1.2 * 1.1) / 20) ** (1 / 3) }; // HP ×約1.097、攻撃 ×約1.255（1段階あたり）
// 主人公のスキル：50レベルごとに新しいスキルを覚え、編成画面で1つを選んで装備する
const HERO_SKILLS = [
  { lv: 1, kind: 'hint', pow: 2, cost: 4, name: 'ひとさし指のひらめき' },
  { lv: 50, kind: 'dmg', pow: 6, cost: 4, name: 'セイキンショット！' },
  { lv: 100, kind: 'healguard', pow: 1, cost: 5, name: 'Keep Your Head Up' },
  { lv: 150, kind: 'stardust', pow: 7, cost: 5, name: 'オールスターダスト計画やりましょー！' },
];
// 主人公の上限開放の素材（ゲキムズで敵を倒すとたまに手に入る）
const MAT = { name: '覚醒の結晶', icon: '💎', drop: 0.05, bossDrop: 0.2, plus: 5 };
const HERO_PROFILE = '「〜していきたいと思います！」が口ぐせの、明るく丁寧な実況冒険者。おいしいものと新しいことが大好きで、何にでも全力でリアクションする。人差し指を立てたら、ひらめきの合図。';
const SKILL_DESC = {
  heal: (k) => `パーティのHPを${Math.round(k.pow * 100)}%回復`,
  dmg: (k) => `攻撃力×${k.pow} のダメージ`,
  time: (k) => `制限時間を${k.pow}秒のばす`,
  guard: (k) => `次の${k.pow}回、受けるダメージ半分`,
  hint: () => '不正解の選択肢を2つ消す',
  healguard: () => 'パーティのHPを全回復し、次の2回受けるダメージ半分',
  charge: () => 'ほかの仲間全員のスキルのゲージを1たまった状態にする（正解1回ぶん）',
  stardust: (k) => `場の敵全員に、それぞれ攻撃力×${k.pow} のダメージ（割り振らない）。かわりに仲間のHPが最大値の半分へる（倒れることもある）`,
  nuke: (k) => `場の敵全員に、それぞれ攻撃力×${k.pow} のダメージ（割り振らない）`,
  homeo: (k) => `${k.pow}ターンのあいだ、HPが30%より下がらず、毎ターンHPを5%回復`,
  inertia: (k) => `${k.pow}ターンのあいだ、間違えてもコンボが切れず、受けるダメージ半分`,
};
const RAR = ['', '★', '★★', '★★★', '★★★★'];
// レベル上限（★ごと）。ガチャでかぶると上限+1（限界突破）。主人公は上限なし（保留中）
const RCAP = { 1: 30, 2: 40, 3: 50, 4: 50 };
// 主人公のセリフ（明るく丁寧な実況風。オリジナル）
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const HLINE = {
  map: ['はい、どうもー！今日もバグ退治、やっていきたいと思います！', 'いやー、次のステージ…めちゃくちゃ気になりますね！', 'みなさん、準備はいいですか？いきますよー！'],
  start: ['はい、というわけで！今回はこちらのバグを倒していきたいと思います！', 'さっそく…いってみましょう！'],
  boss: ['出ました…！ボスです！いやー、これは強そうですね〜'],
  hard: ['今日はですね、ハードモードに挑戦していきたいと思います！'],
  geki: ['ゲキムズ…！これ、本当にクリアできるんでしょうか…！？'],
  ok: ['よっしゃー！いいですね〜！', '正解です！これはうれしい！'],
  fast: ['はやっ！今のはすごくないですか！？'],
  combo: ['いやー、止まらないです！最高です！'],
  big: ['うわっ、めちゃくちゃ入りました！'],
  miss: ['あれっ…？いやー、やられましたね〜', 'うわー！これは悔しい！', 'ｱｼﾞｬｽﾄﾞｩｰｨｯ💢'],
  timeout: ['いやー、考えすぎちゃいましたね…'],
  skill: ['ここで…使っていきたいと思います！', 'セイキンショット！'],
  hint: ['ちょっと、ひとついいですか？'],
  shot: ['セイキンショット！'],
  thanks: ['Keep Your Head Up！'],
  stardust: ['オールスターダスト計画、やりましょー！'],
  today: ['今日はこれをやっていきたいと思います！'],
  mat: ['うわっ、結晶が出ました！これはうれしい！'],
  mid: ['ここで中間ボスです！気合い入れていきたいと思います！'],
  gattai: ['え、合体した！？これはヤバいです！'],
  rev: ['あのときの借り、返させてもらいます！', 'リベンジ、やっていきたいと思います！'],
  revok: ['復讐成功です！いやー、スッキリしました！'],
  revng: ['くっ…また負けました…次こそは！'],
  heal: ['ありがとうございます、助かります！'],
  pinch: ['ちょっと待ってください、これヤバいです…！'],
  chance: ['きましたね〜！チャンスです！'],
  rare: ['えっ、金色！？これはレアですよみなさん！'],
  clear: ['いやー、楽しかったです！見てくださってありがとうございました！'],
  star3: ['完璧です！これは自分で自分をほめたいと思います！'],
  lose: ['くやしい〜！またリベンジしたいと思います！'],
  zukan: ['新しい敵、図鑑に入りました！コンプリート目指していきたいと思います！'],
  gacha3: ['出たー!出た!出たぁ…'],
  gacha4: ['ちょっと待ってください…虹色です！！出たーーー！！', 'え、虹！？これはヤバいです！！'],
  gacha1: ['まあ…こういう日もありますよね'],
  goal: ['目標達成です！ごほうび、ありがたくいただきます！'],
  rename: ['はい、名前を変えてみました！'],
};

// 敵（バグ）は enemies.js
// 難易度（周回用）：ノーマル → ハード → ゲキムズ
const DIFF = [
  { name: 'ノーマル', tag: '', hp: 1, atk: 1, time: 1, rew: 1 },
  { name: 'ハード', tag: '🔥', hp: 1.6, atk: 1.5, time: 0.85, rew: 1.8 },
  { name: 'ゲキムズ', tag: '💀', hp: 2.5, atk: 2.2, time: 0.7, rew: 3 },
];
// デイリー・ウィークリー目標
const DAILY = [
  { id: 'stage', name: 'ステージを3回クリア', n: 3, coins: 60, food: 1 },
  { id: 'zako', name: '雑魚を10体たおす', n: 10, coins: 60, food: 1 },
  { id: 'correct', name: 'バトルで20問正解', n: 20, coins: 60, food: 1 },
];
const WEEKLY = [
  { id: 'boss', name: 'ボスを5回たおす', n: 5, coins: 300, food: 3 },
  { id: 'stage', name: 'ステージを20回クリア', n: 20, coins: 300, food: 3 },
  { id: 'star3', name: '★3を5回とる', n: 5, coins: 300, food: 3 },
  { id: 'hard', name: 'ハード以上を3回クリア', n: 3, coins: 300, food: 3 },
];
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dayKey = () => ymd(new Date());
const weekKey = () => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return ymd(d); }; // 月曜はじまり
// 図鑑：科目ごとの全部の敵 [{key,name,icon,desc,kind,lec}]
function allEnemies(subj) {
  const E = ENEMIES[subj], out = [];
  for (const [k, b] of Object.entries(E.boss)) out.push({ kind: 'boss', lec: k, name: b[0], icon: b[1], desc: b[2] });
  for (const [k, zs] of Object.entries(E.lec)) for (const z of zs) out.push({ kind: 'lec', lec: k, name: z[0], icon: z[1], desc: z[2] });
  for (const [k, sts] of Object.entries(STAGE[subj] || {})) sts.forEach((tri, si) => tri.forEach((z, zi) => out.push({ kind: zi === 2 ? 'srare' : 'lec', lec: k, stage: si + 1, name: z[0], icon: z[1], desc: z[2] })));
  for (const z of E.common) out.push({ kind: 'common', name: z[0], icon: z[1], desc: z[2] });
  out.push({ kind: 'rare', name: E.rare[0], icon: E.rare[1], desc: E.rare[2] });
  for (const f of midFoes(subj)) if (!f.rush) out.push({ kind: 'mid', name: f.name, icon: f.icon, desc: f.desc });
  return out.map((x) => ({ ...x, key: `${subj}|${x.name}` }));
}

/* ---------- 計算 ---------- */
const needExp = (lv) => lv * 50;
// 1エリア＝雑魚ステージ＋ボス。TOEIC（リスニング・リーディング）だけ雑魚ステージ4つ、ほかは2つ
const nsOf = (subj) => (/^toeic/.test(subj) ? 4 : 2);
const bossOf = (subj) => nsOf(subj) + 1;
const nodesOf = (subj) => Array.from({ length: bossOf(subj) }, (_, i) => i + 1);
const statOf = (base, lv) => Math.round(base * (1 + (lv - 1) * 0.12));
const SUBJ = [['ccpp', 'C/C++'], ['db', 'DB'], ['sd', '設計'], ['toeicL', 'TOEIC L'], ['toeic', 'TOEIC R'], ['menkyo', '免許']];
// 冒険の章（科目ごと）
const CHAPTERS = [
  { id: 'ccpp', name: 'C/C++プログラミング', sub: 'コンパイルの森', color: '#2563eb' },
  { id: 'db', name: 'データベース', sub: 'テーブルの谷', color: '#0f766e' },
  { id: 'sd', name: 'ソフトウェア設計', sub: '設計図の塔', color: '#7c3aed' },
  { id: 'toeicL', name: 'TOEIC リスニング', sub: 'ききとりの灯台', color: '#0284c7' },
  { id: 'toeic', name: 'TOEIC リーディング', sub: 'ことばの港町', color: '#ea580c' },
  { id: 'menkyo', name: '普通免許（学科）', sub: 'ドライブの街道', color: '#16a34a' },
];
// 章の★集めの報酬（★はノーマル・ハード・ゲキムズの合計。p は全部の★に対する割合）
const STAR_REW = [
  { p: 0.1, coins: 300, label: '🪙300' },
  { p: 0.25, food: 5, label: '🌰5' },
  { p: 0.4, ticket: 1, label: '🎟️ガチャチケット' },
  { p: 0.5, char: true, label: '★★★章限定の仲間' },
  { p: 0.65, coins: 1000, label: '🪙1000' },
  { p: 0.8, mat: 1, ticket: 1, label: '💎結晶＋🎟️' },
  { p: 1, title: true, mat: 2, label: '称号＋💎結晶×2' },
];
const CH_TITLE = { ccpp: 'C/C++マスター', db: 'データベースマスター', sd: '設計マスター', toeicL: 'TOEICリスニングマスター', toeic: 'TOEICリーディングマスター', menkyo: '免許マスター' };
const ALL_TITLE = '秋学期の覇者';
// 中間ボスステージ：範囲の最後の回のボスのあとに出る連戦。★3でクリアすると最後の敵が仲間になる（すべてオリジナル）
const MID = {
  ccpp: { after: '6', title: '線路戦隊ビルドライナー', reward: 'liner', foes: [
    { art: 'red', name: 'ビルドレッド', lec: 1, desc: 'コンパイルを司る赤の戦士。{ } の対応を見ぬく。' },
    { art: 'blue', name: 'ビルドブルー', lec: 2, desc: '変数と型を司る青の戦士。x= で値を入れる。' },
    { art: 'yellow', name: 'ビルドイエロー', lec: 3, desc: 'ループを司る黄の戦士。↻ で何度でもくり返す。' },
    { art: 'green', name: 'ビルドグリーン', lec: 4, desc: '配列を司る緑の戦士。[ ] の添字は0から数える。' },
    { art: 'pink', name: 'ビルドピンク', lec: 6, desc: 'ポインタを司る桃の戦士。*p で指す先を読む。' },
    { art: 'liner', name: 'グランドビルドライナー', final: true, gattai: true, desc: '5人が合体した巨大な列車の戦士。第1〜6回のすべてを使ってくる。' },
  ] },
  db: { after: '7', title: '夜行列車のトラブル', reward: 'yankee', foes: [
    { art: 'ticket', name: '無賃乗車NULL', lec: 3, desc: '切符に何も書いていない（NULL）お化け。= では見つからない。' },
    { art: 'suitcase', name: '荷物ごちゃまぜORDER', lec: 4, desc: '荷物をばらばらに並べるトランク。ORDER BY で並べ直そう。' },
    { art: 'stationmaster', name: '終点の集計駅長', lec: 6, desc: '終点で乗客を GROUP BY でまとめて数える駅長。' },
    { art: 'yankee', name: '隣の部屋のヤンキー', final: true, desc: '夜中にラジカセを鳴らす隣の部屋の住人。第2〜7回のすべてで勝負を挑んでくる。' },
  ] },
  sd: { after: '7', title: '設計図の塔 ボスラッシュ', reward: 'spec', foes: [
    { boss: '1' }, { boss: '2' }, { boss: '4' }, { boss: '5' }, { boss: '6' }, { boss: '7' },
    { art: 'spec', name: '設計竜スペック', final: true, desc: '設計図の翼をもつ竜。すべての UML を操る、塔のいちばん上の主。' },
  ] },
};
const midFoes = (subj) => (MID[subj]?.foes || []).map((f) => (f.boss ? { name: ENEMIES[subj].boss[f.boss][0], icon: ENEMIES[subj].boss[f.boss][1], lec: +f.boss, desc: ENEMIES[subj].boss[f.boss][2], rush: true } : { ...f, icon: MID_ART[f.art] }));

export function makeRPG(ctx) {
  const { S, save, openOv, closeOv, body, info, toast, setCleanup, esc, shuffle, rnd, owlSVG, DECKS, addFood, api } = ctx;
  const R = () => {
    if (!S.rpg) S.rpg = { coins: 300, hero: { lv: 1, exp: 0 }, owned: { owl: S.owl || { lv: 1, exp: 0 } }, party: ['owl'], clear: {}, subj: 'ccpp', pulls: 0 };
    const r = S.rpg;
    if (S.owl && r.owned.owl !== S.owl) r.owned.owl = S.owl; // フクロウはホームと共通
    if (!r.heroName) r.heroName = '主人公';
    if (!r.sound) r.sound = 'silent'; // 'silent' | 'bgm'（講義中に使うので最初はサイレント）
    if (!r.stars) { r.stars = {}; for (const id of Object.keys(r.clear)) r.stars[`${id}#0`] = 1; } // 前のデータのクリアは★1から
    if (!r.zukan) r.zukan = {};
    if (r.titles?.includes('TOEICマスター')) r.titles = r.titles.map((t) => (t === 'TOEICマスター' ? 'TOEICリーディングマスター' : t)); // TOEIC をリスニングとリーディングに分けた
    if (!r.st5) { // 前のデータ：TOEIC のボスは3番目だった → 5番目に移す
      const mv = (o) => { for (const key of Object.keys(o)) { const m = key.match(/^(toeic)-(\d+)-3(#\d)?$/); if (m) { o[`${m[1]}-${m[2]}-${bossOf(m[1])}${m[3] || ''}`] = o[key]; delete o[key]; } } };
      mv(r.clear); mv(r.stars); r.st5 = 1;
    }
    if (!r.wmiss) r.wmiss = {}; // 冒険の単語4択で間違えた単語（復讐の対象）
    if (!r.rev) r.rev = { n: 0, log: [] }; // 晴らした恨み
    if (r.heroLb === undefined) { r.heroLb = Math.max(0, Math.ceil((r.hero.lv - 50) / MAT.plus)); r.mats = r.mats || 0; r.heroSkill = 0; }
    if (!r.capv) { for (const [id, o] of Object.entries(r.owned)) { const b = RCAP[CHARS[id]?.rar] || 99; o.lb = Math.max(o.lb || 0, o.lv - b); } r.capv = 1; } // 前のデータで上限を超えている分は限界突破あつかい
    return r;
  };
  bgm.setEnabled(R().sound === 'bgm');
  let lectures = null; // { ccpp: {1:'第1回 …'}, … }
  const heroName = () => R().heroName;
  // 主人公のスキン（レベル50ごとに増える。編成の主人公の詳細で着替える）
  const HERO_SKINS = [{ lv: 1, name: 'いつもの', src: 'icons/icon-192.png' }, { lv: 50, name: 'レッドスーツ', src: 'icons/hero-lv50.svg' }, { lv: 100, name: 'コントローラー', src: 'icons/hero-lv100.svg' }, { lv: 150, name: 'ボーダー', src: 'icons/hero-lv150.svg' }]; // src: null は準備中（絵が来たら入れる）
  const heroSrc = () => { const r = R(), k = HERO_SKINS[r.heroSkin || 0]; return k && k.src && r.hero.lv >= k.lv ? k.src : HERO_SKINS[0].src; };

  const iconHTML = (id, cls = '') => {
    if (id === 'hero') return `<img class="rp-face ${cls}" src="${heroSrc()}" alt="">`;
    const c = CHARS[id];
    if (CHAR_ART[id]) return `<span class="rp-face rp-artf ${cls}">${CHAR_ART[id]}</span>`; // オリジナルイラスト（章限定の仲間）
    return c.icon === 'owl' ? `<span class="rp-face rp-owl ${cls}">${owlSVG(2)}</span>` : `<span class="rp-face rp-emo ${cls}">${c.icon}</span>`;
  };
  const member = (id) => {
    const r = R();
    if (id === 'hero') { const k = [50, 100, 150].filter((l) => r.hero.lv >= l).length; // Lv.50・100・150 で段階的に強くなる
      return { id, name: heroName(), lv: r.hero.lv, hp: Math.round(statOf(HERO.hp, r.hero.lv) * HERO_UP.hp ** k), atk: Math.round(statOf(HERO.atk, r.hero.lv) * HERO_UP.atk ** k), skill: HERO_SKILLS[r.heroSkill || 0] || HERO.skill, subj: null }; }
    const c = CHARS[id], o = r.owned[id];
    return { id, name: c.name, lv: o.lv, hp: c.fixHp ? c.hp : statOf(c.hp, o.lv), atk: statOf(c.atk, o.lv), skill: c.skill, subj: c.subj, rar: c.rar };
  };
  const team = () => ['hero', ...R().party.filter((id) => R().owned[id])].map(member);
  // レベル上限（主人公は上限なし）
  const capOf = (id) => (id === 'hero' ? 50 + (R().heroLb || 0) * MAT.plus : (RCAP[CHARS[id].rar] || 50) + (R().owned[id]?.lb || 0));
  // 経験値を足す（上限で止まる）。上がったレベル数を返す
  function addExp(id, o, n) {
    const cap = capOf(id); let ups = 0;
    if (o.lv >= cap) { o.exp = 0; return 0; }
    o.exp += n;
    while (o.exp >= needExp(o.lv) && o.lv < cap) { o.exp -= needExp(o.lv); o.lv++; ups++; }
    if (o.lv >= cap) o.exp = 0;
    return ups;
  }
  // 戦闘力：HP÷2 ＋ 攻撃×5（今の科目が得意なら×1.5、全科目なら×1.2）＋ スキルの強さ
  const SKW = { dmg: 25, heal: 120, time: 5, guard: 18, hint: 50, healguard: 160, charge: 90, nuke: 32, stardust: 30, homeo: 45, inertia: 40 };
  function power(id, subj = R().subj) {
    const m = member(id), k = m.skill;
    const bonus = m.subj === subj ? 1.3 : m.subj === 'all' ? 1.2 : 1;
    const sk = (k.kind === 'hint' ? SKW.hint : SKW[k.kind] * k.pow) * (3 / k.cost) * (1 + (m.lv - 1) * 0.05);
    return Math.round(m.hp / 2 + m.atk * 5 * bonus + sk);
  }
  const teamPower = (subj) => team().reduce((a, x) => a + power(x.id, subj), 0);
  const SUBJNAME = (k) => (SUBJ.find((x) => x[0] === k) || [k, k])[1];
  // 自動編成：今の科目で戦闘力の高い順に3人
  function autoParty() {
    const r = R();
    r.party = Object.keys(CHARS).filter((id) => r.owned[id]).sort((a, b) => power(b) - power(a)).slice(0, 3);
    save();
  }
  const darkOv = () => document.getElementById('hk-ov')?.classList.add('rp-ov');

  /* ---------- 冒険（ゲーム画面）：下のゲーム用タブで マップ・編成・ガチャ・図鑑・目標 ---------- */
  let gtab = 'map', $m = null, mapView = 'chapters', mapDiff = 0; // マップ：章の一覧 → ステージ（難易度タブ）
  const GTABS = [['map', '🗺️', 'マップ'], ['gacha', '🎁', 'ガチャ'], ['revenge', '👻', '復讐'], ['zukan', '📖', '図鑑'], ['goals', '🎯', '目標']];
  async function renderQuestTab(m) {
    $m = m;
    if (!lectures) lectures = await api.lectures();
    const canClaim = goalList().some((g) => g.done && !g.got);
    m.innerHTML = `<div id="rp-page"></div>
      <nav class="rp-gnav">${GTABS.map(([k, i, n]) => `<button data-gtab="${k}" class="${k === gtab ? 'on' : ''}"><span class="i">${i}</span>${n}${k === 'goals' && canClaim ? '<em class="rp-dot"></em>' : ''}</button>`).join('')}</nav>`;
    m.onclick = (e) => {
      const b = e.target.closest('[data-gtab]'); if (!b) return;
      bgm.sfx('tap'); gtab = b.dataset.gtab; renderQuestTab(m);
    };
    // 編成は戦闘力の右のボタンから開く（下のタブには置かない）
    m.addEventListener('click', (e) => { if (e.target.closest('[data-party]')) { e.stopPropagation(); bgm.sfx('tap'); gtab = 'party'; renderQuestTab(m); } }, true);
    const pg = m.querySelector('#rp-page');
    window.scrollTo(0, 0);
    if (gtab === 'map') (mapView === 'chapters' ? renderChapters(pg) : renderMap(pg));
    else if (gtab === 'party') openParty(pg);
    else if (gtab === 'gacha') openGacha(pg);
    else if (gtab === 'zukan') renderZukan(pg);
    else if (gtab === 'revenge') renderRevenge(pg);
    else renderGoals(pg);
    bgm.play('map');
  }
  const starsOf = (id) => [0, 1, 2].map((d) => R().stars[`${id}#${d}`] || 0);
  const starTxt = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);
  // 章の★：[集めた数, 全部の数]
  function chStars(cid) {
    const r = R(), lecs = Object.keys(lectures[cid] || {});
    let got = 0;
    for (const k of lecs) for (const n of nodesOf(cid)) for (const d of [0, 1, 2]) got += r.stars[`${cid}-${k}-${n}#${d}`] || 0;
    return [got, lecs.length * nodesOf(cid).length * 3 * 3];
  }
  const need = (rw, tot) => Math.ceil(tot * rw.p);
  const claimable = (cid) => { const [g, t] = chStars(cid), c = R().chRew?.[cid] || {}; return STAR_REW.some((rw, i) => !c[i] && g >= need(rw, t)); };
  function claimStar(cid, i) {
    const r = R(), rw = STAR_REW[i], [g, t] = chStars(cid);
    r.chRew = r.chRew || {}; r.chRew[cid] = r.chRew[cid] || {};
    if (r.chRew[cid][i] || g < need(rw, t)) return;
    r.chRew[cid][i] = 1;
    const got = [];
    if (rw.coins) { r.coins += rw.coins; got.push(`🪙${rw.coins}`); }
    if (rw.food) { addFood(rw.food); got.push(`🌰${rw.food}`); }
    if (rw.ticket) { r.tickets = (r.tickets || 0) + rw.ticket; got.push('🎟️ガチャチケット'); }
    if (rw.mat) { r.mats = (r.mats || 0) + rw.mat; got.push(`${MAT.icon}${MAT.name}`); }
    if (rw.char) { const id = Object.keys(CHARS).find((x) => CHARS[x].limited === cid); if (id && !r.owned[id]) { r.owned[id] = { lv: Math.max(1, Math.min(RCAP[CHARS[id].rar] || 50, Math.floor(r.hero.lv / 2))), exp: 0 }; if (r.party.length < 3) r.party.push(id); } got.push(`★★★${CHARS[id].name}（Lv.${r.owned[id].lv}）`); } // 主人公のレベルの半分で仲間になる
    if (rw.title) { r.titles = [...new Set([...(r.titles || []), CH_TITLE[cid]])]; if (CHAPTERS.every((c) => r.titles.includes(CH_TITLE[c.id]))) r.titles.push(ALL_TITLE); got.push(`称号「${CH_TITLE[cid]}」`); }
    save(); ctx.renderTop?.(); bgm.sfx(rw.char ? 'rare' : 'win');
    toast(`★の報酬：${got.join('・')} をゲット！`);
  }
  const heroTitle = () => { const t = R().titles || []; return t.includes(ALL_TITLE) ? ALL_TITLE : t[t.length - 1] || ''; };
  // 章のバナーのふち：★30%で銀、60%で金、100%で虹
  const frameOf = (cid) => { const [g, t] = chStars(cid), x = t ? g / t : 0; return x >= 1 ? ' rainbow' : x >= 0.6 ? ' gold' : x >= 0.3 ? ' silver' : ''; };
  // 章の一覧：大きなバナーを縦に並べる。タップでその章のステージ選択へ
  function renderChapters(m) {
    const r = R(), t = team();
    m.innerHTML = `
      <div class="rp-chead">
        <img class="rp-heroimg" src="${heroSrc()}" alt="" data-rp="talk">
        <div class="rp-herotxt">${heroTitle() ? `<span class="rp-title">${esc(heroTitle())}</span>` : ''}<button class="rp-name" data-rp="rename"><b>${esc(heroName())}</b><span>✏️</span></button>
          <div class="rp-lv">Lv.${r.hero.lv}<span class="rp-exp"><i style="width:${(r.hero.exp / needExp(r.hero.lv)) * 100}%"></i></span></div></div>
        <div class="rp-hudright"><span class="rp-coin">🪙 ${r.coins}</span><span class="rp-powrow"><button class="rp-btn rp-partyb" data-party>👥 編成</button><span class="rp-pow">戦闘力 <b>${teamPower(r.subj).toLocaleString()}</b></span></span></div>
      </div>
      <h3 class="rp-zsec">章を選ぶ</h3>
      <div class="rp-chapters">${CHAPTERS.map((c, i) => {
        const lecs = Object.keys(lectures[c.id] || {}), total = lecs.length * nodesOf(c.id).length;
        const done = lecs.reduce((a, k) => a + nodesOf(c.id).filter((n) => r.clear[`${c.id}-${k}-${n}`]).length, 0);
        const stars = lecs.reduce((a, k) => a + nodesOf(c.id).reduce((b, n) => b + Math.max(...starsOf(`${c.id}-${k}-${n}`)), 0), 0);
        const boss = ENEMIES[c.id].boss[lecs[lecs.length - 1]] || ['', '👑'];
        const [sg, stt] = chStars(c.id);
        return `<button class="rp-chap${r.subj === c.id ? ' last' : ''}${frameOf(c.id)}" data-chap="${c.id}" style="--c:${c.color}">${claimable(c.id) ? '<em class="rp-dot"></em>' : ''}
          <span class="rp-chno">第${i + 1}章</span>
          <span class="rp-chbody"><b>${esc(c.name)}</b><small>${esc(c.sub)} ・ ${lecs.length}エリア</small>
            <span class="rp-chbar"><i style="width:${total ? (done / total) * 100 : 0}%"></i></span>
            <small>クリア ${done}/${total}　<i class="rp-stars">★</i> ${sg}/${stt}${done === total && total ? '　🏆 制覇' : ''}</small></span>
          <span class="rp-chboss">${boss[1]}</span>
        </button>`;
      }).join('')}</div>
      <p class="rp-tip">章を選ぶと、その章のステージに挑める。</p>`;
    m.onclick = (e) => {
      const c = e.target.closest('[data-chap]');
      if (c) { e.stopPropagation(); bgm.sfx('tap'); R().subj = c.dataset.chap; save(); mapView = 'stages'; renderMap(m); window.scrollTo(0, 0); return; }
      const b = e.target.closest('[data-rp]'); if (!b) return;
      e.stopPropagation(); bgm.sfx('tap');
      if (b.dataset.rp === 'rename') openRename();
      else if (b.dataset.rp === 'talk') toast(`${heroName()}「${pick(HLINE.map)}」`);
    };
  }
  function renderMap(m) {
    const r = R();
    const t = team();
    const chapters = Object.entries(lectures[r.subj] || {});
    // 下から上へ：各章 章の看板 → ステージ（TOEIC は4つ、ほかは2つ） → ボス
    const rows = [];
    chapters.forEach(([k, v], ci) => {
      const mt = v.match(/^(第\S+?回)\s*(.*)$/) || [null, v, ''];
      rows.push({ kind: 'sign', no: mt[1], title: mt[2], ci });
      nodesOf(r.subj).forEach((n) => { const id = `${r.subj}-${k}-${n}`; rows.push({ kind: 'node', k, n, ci, open: isOpen(r.subj, k, n, ci) && (mapDiff === 0 || (r.stars[`${id}#${mapDiff - 1}`] || 0) > 0), done: (r.stars[`${id}#${mapDiff}`] || 0) > 0 }); });
      if (MID[r.subj]?.after === String(k)) { const id = `${r.subj}-mid-0`; rows.push({ kind: 'mid', k: 'mid', n: 0, ci, open: !!r.clear[`${r.subj}-${k}-${bossOf(r.subj)}`] && (mapDiff === 0 || (r.stars[`${id}#${mapDiff - 1}`] || 0) > 0), done: (r.stars[`${id}#${mapDiff}`] || 0) > 0 }); }
    });
    const nodes = rows.filter((x) => x.kind === 'node');
    const here = nodes.find((x) => x.open && !x.done) || nodes[nodes.length - 1];
    const RH = { node: 96, sign: 58, mid: 130 };
    let y = 40; const pos = [];
    for (let i = 0; i < rows.length; i++) {
      const x = rows[i];
      const h = RH[x.kind];
      pos[i] = { y: y + h / 2, x: x.kind !== 'node' ? 50 : x.n === bossOf(r.subj) ? 50 : x.n % 2 ? 28 : 72 };
      y += h;
    }
    const H = y + 30;
    const Y = (i) => H - pos[i].y; // 下から積む
    const pts = rows.map((x, i) => (x.kind !== 'sign' ? `${pos[i].x},${Y(i)}` : null)).filter(Boolean).join(' ');
    const doneIdx = rows.map((x, i) => (x.kind !== 'sign' && x.done ? i : -1)).filter((i) => i >= 0);
    const lastDone = doneIdx.length ? doneIdx[doneIdx.length - 1] : -1;
    const donePts = rows.slice(0, lastDone + 2).map((x, i) => (x.kind !== 'sign' ? `${pos[i].x},${Y(i)}` : null)).filter(Boolean).join(' ');
    const E = ENEMIES[r.subj];
    m.innerHTML = `
      <div class="rp-hud">
        <div class="rp-hudtop">
          <img class="rp-heroimg" src="${heroSrc()}" alt="" data-rp="talk">
          <div class="rp-herotxt">
            <button class="rp-name" data-rp="rename"><b>${esc(heroName())}</b><span>✏️</span></button>
            <div class="rp-lv">Lv.${r.hero.lv}<span class="rp-exp"><i style="width:${(r.hero.exp / needExp(r.hero.lv)) * 100}%"></i></span></div>
          </div>
          <div class="rp-hudright">
            <span class="rp-coin">🪙 ${r.coins}</span>
            <button class="rp-sound" data-rp="sound" aria-label="音の切り替え">${r.sound === 'bgm' ? '🎵 BGM' : '🔇 サイレント'}</button>
          </div>
        </div>
        <div class="rp-hudparty">
          <div class="rp-faces">${t.map((x) => iconHTML(x.id, 'sm')).join('')}${Array(4 - t.length).fill('<span class="rp-face sm empty">＋</span>').join('')}</div>
          <div class="rp-stat"><span class="rp-powrow"><button class="rp-btn rp-partyb" data-party>👥 編成</button><span class="rp-pow">戦闘力 <b>${teamPower(r.subj).toLocaleString()}</b></span></span><span>HP <b>${t.reduce((a, x) => a + x.hp, 0)}</b>　攻撃 <b>${t.reduce((a, x) => a + x.atk, 0)}</b></span></div>
        </div>
        <button class="rp-chback" data-rp="chapters">‹ 章の一覧<b>第${CHAPTERS.findIndex((c) => c.id === r.subj) + 1}章 ${esc((CHAPTERS.find((c) => c.id === r.subj) || {}).name || '')}</b></button>
      </div>
      <div class="rp-dtabs" role="tablist">${DIFF.map((x, i) => `<button data-rp="diff" data-d="${i}" class="d${i}${mapDiff === i ? ' on' : ''}">${x.tag}${x.name}${i ? `<small>報酬×${x.rew}</small>` : ''}</button>`).join('')}</div>
      ${(() => { const [g, t] = chStars(r.subj), c = r.chRew?.[r.subj] || {}; return `<div class="rp-starbar"><div class="rp-sbtrack"><i style="width:${(g / t) * 100}%"></i>${STAR_REW.map((rw, i) => { const ok = g >= need(rw, t); return `<button class="rp-chest${c[i] ? ' got' : ok ? ' ready' : ''}" style="left:${rw.p * 100}%" data-rp="chest" data-i="${i}" title="★${need(rw, t)}：${esc(rw.label)}">${c[i] ? '✓' : rw.char ? '🤝' : rw.title ? '👑' : '🎁'}</button>`; }).join('')}</div><span class="rp-sbtxt"><i class="rp-stars">★</i> ${g}/${t}</span></div>`; })()}
      <div class="rp-mapbox" id="rp-mapbox"><div class="rp-map" style="height:${H}px">
        <svg class="rp-road" viewBox="0 0 100 ${H}" preserveAspectRatio="none"><polyline points="${pts}" class="all"/>${donePts ? `<polyline points="${donePts}" class="done"/>` : ''}</svg>
        ${rows.map((x, i) => {
          const top = Y(i);
          if (x.kind === 'sign') return `<div class="rp-sign" style="top:${top}px"><b>${esc(x.no)}</b><span>${esc(x.title)}</span></div>`;
          if (x.kind === 'mid') { const M = MID[r.subj], sv = starsOf(`${r.subj}-mid-0`)[mapDiff]; return `<button class="rp-midspot${x.done ? ' done' : ''}" style="top:${top}px" data-rp="mid" ${x.open ? '' : 'disabled'}>
            <span class="c">${x.open ? MID_ART[M.foes[M.foes.length - 1].art] : '🔒'}</span><b>中間ボス</b><small>${esc(M.title)}${x.done ? ` <i class="rp-stars">${starTxt(sv)}</i>` : ''}</small></button>`; }
          const isHere = x === here;
          const boss = x.n === bossOf(r.subj);
          const sv = starsOf(`${r.subj}-${x.k}-${x.n}`)[mapDiff];
          return `<button class="rp-spot${boss ? ' boss' : ''}${x.done ? ' done' : ''}${isHere ? ' here' : ''}" style="left:${pos[i].x}%;top:${top}px" data-rp="stage" data-k="${x.k}" data-n="${x.n}" ${x.open ? '' : 'disabled'}>
            <span class="c">${!x.open ? '🔒' : boss ? esc(E.boss[x.k]?.[1] || '👑') : x.n}</span>
            <small>${boss ? 'BOSS' : 'STAGE ' + x.n}${x.done ? ` <i class="rp-stars">${starTxt(sv)}</i>` : ''}</small>
            ${isHere ? `<img class="rp-me" src="${heroSrc()}" alt="">` : ''}
          </button>`;
        }).join('')}
      </div></div>
      <p class="rp-tip">${mapDiff === 0 ? 'ノーマルでクリアしたステージは、ハード🔥タブで挑戦できる。' : mapDiff === 1 ? 'ハードでクリアしたステージは、ゲキムズ💀タブで挑戦できる。' : 'ゲキムズでは💎覚醒の結晶がたまに手に入る。'}　🎁をタップで★の報酬</p>`;
    m.onclick = (e) => {
      const b = e.target.closest('[data-rp]'); if (!b || b.disabled) return;
      e.stopPropagation();
      const a = b.dataset.rp;
      bgm.sfx('tap');
      if (a === 'subj') { R().subj = b.dataset.k; save(); renderMap(m); }
      else if (a === 'chapters') { mapView = 'chapters'; renderChapters(m); }
      else if (a === 'diff') { mapDiff = +b.dataset.d; renderMap(m); }
      else if (a === 'chest') {
        const i = +b.dataset.i, rw = STAR_REW[i], [g, t] = chStars(R().subj);
        if (R().chRew?.[R().subj]?.[i]) toast(`受け取り済み：${rw.label}`);
        else if (g >= need(rw, t)) { claimStar(R().subj, i); renderMap(m); }
        else toast(`★${need(rw, t)} で ${rw.label}（あと ${need(rw, t) - g}）`);
      }
      else if (a === 'rename') openRename();
      else if (a === 'talk') toast(`${heroName()}「${pick(HLINE.map)}」`);
      else if (a === 'sound') {
        const r2 = R(); r2.sound = r2.sound === 'bgm' ? 'silent' : 'bgm'; save();
        bgm.setEnabled(r2.sound === 'bgm'); ctx.onSound?.();
        if (r2.sound === 'bgm') bgm.play('map');
        toast(r2.sound === 'bgm' ? '🎵 BGMモード：音楽と効果音が鳴る' : '🔇 サイレントモード：音は鳴らない');
        renderMap(m);
      } else if (a === 'stage') openStage(m, R().subj, b.dataset.k, +b.dataset.n);
      else if (a === 'mid') openMid(m, R().subj);
    };
    // いる場所まで自動でスクロール
    requestAnimationFrame(() => {
      const box = m.querySelector('#rp-mapbox'), here2 = m.querySelector('.rp-spot.here');
      if (box && here2) box.scrollTop = here2.offsetTop - box.clientHeight / 2;
    });
  }

  // ステージをタップ：出てくる敵・難易度・★を見て出撃
  function openStage(m, subj, k, n) {
    const r = R(), id = `${subj}-${k}-${n}`, st = starsOf(id), boss = n === bossOf(subj), E = ENEMIES[subj], d = mapDiff;
    const no = (lectures[subj][k].match(/^(第\S+?回)/) || [lectures[subj][k]])[0];
    const tri = STAGE[subj]?.[k]?.[(n - 1) % 2]; // ステージ専用の敵：1・3 と 2・4 で同じ組
    const foes = boss ? [E.boss[k]] : [...(tri ? tri.slice(0, 2) : []), ...(E.lec[k] || []), ...E.common];
    const seen = (nm) => (r.zukan[`${subj}|${nm}`] || 0) > 0;
    const sh = document.createElement('div'); sh.className = 'rp-sheet';
    sh.innerHTML = `<div class="rp-sheet-in">
        <div class="rp-sheet-h"><b>${esc(no)} ${boss ? 'BOSS' : 'STAGE ' + n}　<span class="rp-dtag d${d}">${DIFF[d].tag}${DIFF[d].name}</span></b><button class="rp-x" data-sx aria-label="閉じる">✕</button></div>
        <div class="rp-sfoes">${foes.slice(0, boss ? 1 : 8).map((f) => `<span class="${seen(f[0]) ? '' : 'unk'}">${seen(f[0]) ? f[1] : '？'}</span>`).join('')}${boss ? '' : '<span class="rare">🌟?</span>'}</div>
        <div class="rp-sbest">この難易度の記録 <i class="rp-stars">${starTxt(st[d])}</i>${d ? `　報酬×${DIFF[d].rew}` : ''}</div>
        <p class="rp-starrule">★1 クリア　★2 HPを半分以上残す　★3 ノーミス</p>
        <button class="rp-btn gold big wide" data-go>出撃！</button></div>`;
    m.appendChild(sh);
    sh.onclick = (e) => {
      e.stopPropagation();
      if (e.target === sh || e.target.closest('[data-sx]')) { sh.remove(); return; }
      if (e.target.closest('[data-go]')) { sh.remove(); startBattle(subj, k, n, d); }
    };
  }

  // 中間ボス：連戦の顔ぶれと、仲間になる条件を見て出撃
  function openMid(m, subj) {
    const r = R(), M = MID[subj], d = mapDiff, st = starsOf(`${subj}-mid-0`), fs = midFoes(subj);
    const seen = (nm) => (r.zukan[`${subj}|${nm}`] || 0) > 0;
    const rw = CHARS[M.reward];
    const sh = document.createElement('div'); sh.className = 'rp-sheet';
    sh.innerHTML = `<div class="rp-sheet-in">
        <div class="rp-sheet-h"><b>中間ボス　<span class="rp-dtag d${d}">${DIFF[d].tag}${DIFF[d].name}</span></b><button class="rp-x" data-sx aria-label="閉じる">✕</button></div>
        <p class="rp-midt">${esc(M.title)}（${fs.length}連戦）</p>
        <div class="rp-sfoes mid">${fs.map((f) => `<span class="${seen(f.name) || f.rush ? '' : 'unk'}">${seen(f.name) || f.rush ? f.icon : '？'}</span>`).join('')}</div>
        <div class="rp-sbest">この難易度の記録 <i class="rp-stars">${starTxt(st[d])}</i></div>
        <p class="rp-midrw">${r.owned[M.reward] ? `✓ ${esc(rw.name)} は仲間になっている` : `★3でクリアすると <b>★★★${esc(rw.name)}</b> が仲間になる`}</p>
        <p class="rp-starrule">問題は範囲の回の本番形式。★1 クリア　★2 HP半分以上　★3 ノーミス</p>
        <button class="rp-btn gold big wide" data-go>出撃！</button></div>`;
    m.appendChild(sh);
    sh.onclick = (e) => {
      e.stopPropagation();
      if (e.target === sh || e.target.closest('[data-sx]')) { sh.remove(); return; }
      if (e.target.closest('[data-go]')) { sh.remove(); startBattle(subj, 'mid', 0, d); }
    };
  }

  /* ---------- 復讐：間違えた問題・単語が「怨念版」の敵になって襲ってくる ---------- */
  let revCache = null;
  async function revengeItems() {
    const r = R();
    const main = (await api.revengeList?.()) || [];
    const words = Object.entries(r.wmiss).map(([k, o]) => ({ word: o.w, deck: o.d, w: o.n, t: o.t, key: k }));
    const items = [...main.map((x) => ({ ...x, kind: 'q' })), ...words.map((x) => ({ ...x, kind: 'w' }))];
    items.sort((a, b) => b.w - a.w || b.t - a.t);
    if (items.length) items[0].nemesis = true; // いちばん多く負けた相手が宿敵
    return items;
  }
  function revFoe(it) {
    const subjOfDeck = (d) => (/^toeic\d$/.test(d) ? 'toeic' : d); // toeic1〜3 はリーディングの単語帳
    const sj = it.kind === 'q' ? it.sid : subjOfDeck(it.deck);
    const E = ENEMIES[sj];
    let bossName = '忘れた単語', icon = '👻';
    if (E) {
      const lec = it.kind === 'q' ? String(it.lec) : /^toeic\d$/.test(it.deck) ? it.deck.slice(5) : it.word?.[2] != null && E.boss[it.word[2]] ? String(it.word[2]) : Object.keys(E.boss)[0];
      const b = E.boss[lec] || Object.values(E.boss)[0];
      bossName = b[0]; icon = b[1];
    }
    const hp = Math.round(120 * (1 + (it.w - 1) * 0.35)), atk = Math.round(20 * (1 + (it.w - 1) * 0.25) * (it.nemesis ? 1.3 : 1));
    return { name: `怨・${bossName}`, icon, onnen: true, boss: it.kind === 'q', qid: it.qid, sid: it.sid, lec: it.lec, word: it.word, deck: it.deck, w: Math.max(1, it.w), w0: it.w, t: it.t, nemesis: !!it.nemesis,
      label: it.kind === 'q' ? `${it.title}（${it.sname}）` : `単語「${it.word[0]}」`, hp, atk };
  }
  async function renderRevenge(m) {
    m.innerHTML = '<p class="rp-tip">恨みを数えています…</p>';
    const items = revCache = await revengeItems();
    if ($m && gtab !== 'revenge') return;
    const r = R(), nq = items.filter((x) => x.kind === 'q').length, nw = items.length - nq, nem = items[0];
    const nm = (it) => (it.kind === 'q' ? `${esc(it.title)}<small>${esc(it.sname)} ・ ${esc(it.q)}</small>` : `単語「${esc(it.word[0])}」<small>${esc(it.word[1])}</small>`);
    m.innerHTML = `
      <div class="rp-revhead"><b>👻 復讐</b><span>過去に負けた問題が、怨念になって襲ってくる。正解すれば一撃で晴らせる。</span></div>
      ${items.length ? `
        <div class="rp-revcount"><span>本編の問題 <b>${nq}</b></span><span>単語 <b>${nw}</b></span><span>晴らした恨み <b>${r.rev.n}</b></span></div>
        <div class="rp-nemesis"><span class="rp-nemi">${revFoe(nem).icon}</span><div><em>☠️ 宿敵</em><b>${nm(nem)}</b><small>${nem.w ? nem.w + '回負けた' : '自分で送った'} ・ 倒すと🪙+100</small></div></div>
        <button class="rp-btn gold big wide" data-rev="5">⚔️ 復讐する（${Math.min(5, items.length)}体）</button>
        ${items.length >= 10 ? `<button class="rp-btn big wide rp-rush" data-rev="rush">😈 怨念ボスラッシュ（${Math.min(30, items.length)}体連続・全問正解で称号「復讐の鬼」）</button>` : `<p class="rp-tip">恨みが10個たまると「怨念ボスラッシュ」が解放される（あと${10 - items.length}）</p>`}
        <h3 class="rp-zsec">恨みのリスト</h3>
        <div class="rp-revlist">${items.slice(0, 40).map((it) => `<div class="rp-revitem${it.nemesis ? ' nem' : ''}"><span class="rp-revic">${revFoe(it).icon}</span><div>${nm(it)}</div><em>${it.w ? it.w + '敗' : '📨'}</em></div>`).join('')}</div>`
      : `<div class="rp-revpeace"><span>🕊️</span><b>恨みはすべて晴らした。平和です。</b><small>本編や冒険で間違えた問題・単語が、ここに復讐の相手として現れる。</small></div>`}
      ${r.rev.log.length ? `<h3 class="rp-zsec">リベンジ図鑑（晴らした恨み）</h3><div class="rp-revlist done">${r.rev.log.slice(0, 20).map((x) => `<div class="rp-revitem"><span class="rp-revic">✅</span><div>${esc(x.name)}<small>${x.w}敗からの復讐 ・ ${new Date(x.at).getMonth() + 1}/${new Date(x.at).getDate()}</small></div></div>`).join('')}</div>` : ''}`;
    m.onclick = (e) => {
      const b = e.target.closest('[data-rev]'); if (!b) return;
      e.stopPropagation(); bgm.sfx('tap');
      const rush = b.dataset.rev === 'rush';
      const pick = rush ? revCache.slice(0, 30) : [revCache.find((x) => x.nemesis), ...shuffle(revCache.filter((x) => !x.nemesis)).slice(0, 4)].filter(Boolean);
      startBattle(R().subj, 'rev', 0, 0, { foes: shuffle(pick.map(revFoe)).map((f) => ({ ...f, cur: f.hp })), rush });
    };
  }

  /* ---------- 図鑑：仲間図鑑と敵図鑑 ---------- */
  let zmode = 'ally', zsubj = null, zfil = 'all', zsel = null;
  // 図鑑の集めた割合の報酬（r.zrew に受け取り済みを記録）
  const ZREW = {
    ally: [{ p: 0.5, coins: 500, label: '🪙500' }, { p: 1, mats: 3, label: `${MAT.icon}×3` }],
    enemy: [{ p: 0.5, coins: 300, label: '🪙300' }, { p: 1, coins: 500, ticket: 1, label: '🪙500＋🎟️' }],
  };
  const allyList = () => Object.keys(CHARS).map((id) => ({ id, key: id, ...CHARS[id] }));
  function howToGet(id) {
    const c = CHARS[id];
    if (c.limited === 'mid') { const sj = Object.keys(MID).find((k) => MID[k].reward === id); return `中間ボス「${MID[sj].title}」を★3でクリア`; }
    if (c.limited) return `${CHAPTERS.find((x) => x.id === c.limited)?.name || ''} の章の★集め（50%）`;
    return c.rar === 4 ? 'ガチャでまれに出る（★★★★ 2%）' : `ガチャ（${RAR[c.rar]}）`;
  }
  function renderZukan(m) {
    const r = R(); zsubj = zsubj || r.subj; r.zrew = r.zrew || {};
    const ally = zmode === 'ally';
    const lecName = (k) => (lectures[zsubj][k] || `第${k}回`);
    // 一覧と絞り込み
    const FIL = ally
      ? [['all', 'すべて'], ['4', '★★★★'], ['3', '★★★'], ['2', '★★'], ['1', '★'], ['lim', '限定']]
      : [['all', 'すべて'], ['boss', 'ボス'], ['mid', '中間ボス'], ['rare', 'レア'], ['zako', '雑魚']];
    const full = ally ? allyList() : allEnemies(zsubj);
    const has = (x) => (ally ? !!r.owned[x.id] : !!r.zukan[x.key]);
    const pass = (x) => zfil === 'all' || (ally ? (zfil === 'lim' ? !!x.limited : String(x.rar) === zfil)
      : zfil === 'boss' ? x.kind === 'boss' : zfil === 'mid' ? x.kind === 'mid' : zfil === 'rare' ? x.kind === 'rare' || x.kind === 'srare' : x.kind === 'lec' || x.kind === 'common');
    const list = full.filter(pass);
    const got = full.filter(has).length, rate = full.length ? got / full.length : 0;
    const rkey = (i) => (ally ? `ally#${i}` : `${zsubj}#${i}`);
    const icon = (x) => (ally ? iconHTML(x.id) : `<span class="rp-zi">${x.icon}</span>`);
    const secret = (x) => ally && x.rar === 4 && !has(x); // ★★★★は出るまで影も見せない
    const cell = (x) => `<button class="rp-zk${has(x) ? '' : ' unk'}${secret(x) ? ' secret' : ''}${!ally && x.kind === 'boss' ? ' boss' : ''}${!ally && (x.kind === 'rare' || x.kind === 'srare') ? ' rare' : ''}${ally ? ' r' + x.rar : ''}" data-z="${esc(x.key)}">
        <span class="rp-zic">${secret(x) ? '<b>？</b>' : icon(x)}</span><small>${has(x) ? esc(x.name) : '？？？'}</small>${ally && !secret(x) ? `<i class="rp-zr">${RAR[x.rar]}</i>` : ''}</button>`;
    // 敵図鑑は種類ごとの見出しでまとめる（絞り込みなしのとき）
    const groups = ally
      ? [[zfil === 'all' ? '' : '', list]]
      : zfil !== 'all' ? [['', list]]
      : [['ボス', list.filter((x) => x.kind === 'boss')], ['中間ボス', list.filter((x) => x.kind === 'mid')], ['レア', list.filter((x) => x.kind === 'rare' || x.kind === 'srare')],
         ...Object.keys(lectures[zsubj]).map((k) => [lecName(k), list.filter((x) => x.kind === 'lec' && x.lec === k)]), ['どこにでも出る', list.filter((x) => x.kind === 'common')]];
    m.innerHTML = `
      <div class="seg rp-seg rp-zmode" role="group"><button data-zm="ally" aria-pressed="${ally}">🤝 仲間図鑑</button><button data-zm="enemy" aria-pressed="${!ally}">👾 敵図鑑</button></div>
      ${ally ? '' : `<div class="seg rp-seg rp-seg4 mt" role="group">${SUBJ.map(([k, n]) => `<button data-zs="${k}" aria-pressed="${zsubj === k}">${n}</button>`).join('')}</div>`}
      <div class="rp-zprog">
        <div class="rp-zhead"><b>${ally ? '仲間' : SUBJNAME(zsubj) + 'の敵'}</b><span>登録 <b>${got}</b> / ${full.length}（${Math.floor(rate * 100)}%）</span></div>
        <div class="rp-zbar"><i style="width:${rate * 100}%"></i>${ZREW[zmode].map((w) => `<em style="left:${w.p * 100}%"></em>`).join('')}</div>
        <div class="rp-zrews">${ZREW[zmode].map((w, i) => { const done = r.zrew[rkey(i)], ok = rate >= w.p; return `<button class="rp-zrw${done ? ' done' : ok ? ' ok' : ''}" data-zrw="${i}" ${done || !ok ? 'disabled' : ''}>${done ? '✓ ' : ok ? '🎁 ' : ''}${w.p === 1 ? 'コンプ' : Math.round(w.p * 100) + '%'}：${w.label}${done ? '' : ok ? '　受け取る' : ''}</button>`; }).join('')}</div>
      </div>
      <div class="rp-zfil">${FIL.map(([k, n]) => `<button data-zf="${k}" aria-pressed="${zfil === k}">${n}</button>`).join('')}</div>
      ${groups.filter(([, xs]) => xs.length).map(([h, xs]) => `${h ? `<h3 class="rp-zsec">${esc(h)}<small>${xs.filter(has).length}/${xs.length}</small></h3>` : '<div class="mt"></div>'}<div class="rp-zgrid">${xs.map(cell).join('')}</div>`).join('') || '<p class="rp-tip">この種類はいない</p>'}
      <p class="rp-tip">${ally ? 'タップで詳しく。まだ仲間にいないキャラは影だけ見える（★★★★は出るまでひみつ）。' : 'たおした敵が登録される。タップで詳しく。'}</p>`;
    // 詳しいカード（‹ › で前後へ）
    function openCard(key) {
      const order = list, i = order.findIndex((x) => x.key === key); if (i < 0) return;
      const x = order[i], own = has(x), sc = secret(x);
      let body;
      if (ally) {
        const lv = own ? r.owned[x.id].lv : 1, mm = own ? member(x.id) : { hp: x.fixHp ? x.hp : statOf(x.hp, 1), atk: statOf(x.atk, 1) };
        body = sc ? `<div class="rp-zcbig secret">？</div><b class="rp-zcname">？？？</b><span class="rp-rar r4">★★★★</span><p>ガチャでまれに出る、伝説の仲間。出るまでひみつ。</p>`
          : `<div class="rp-zcbig${own ? '' : ' sil'}">${iconHTML(x.id)}</div><b class="rp-zcname">${own ? esc(x.name) : '？？？'}</b><span class="rp-rar r${x.rar}">${RAR[x.rar]}</span>
            ${own ? `<div class="rp-tags"><em>Lv.${lv}</em><em>HP ${mm.hp}</em><em>攻撃 ${mm.atk}</em><em>得意 ${x.subj == null ? 'なし' : x.subj === 'all' ? 'ぜんぶ' : SUBJNAME(x.subj)}</em></div>
            <p class="rp-zcskill"><b>スキル「${esc(x.skill.name)}」</b>${esc(SKILL_DESC[x.skill.kind](x.skill))}（正解${x.skill.cost}回でたまる）</p>${x.prof ? `<p>${esc(x.prof)}</p>` : ''}` : '<p>まだ仲間にいない。</p>'}
            <p class="rp-zcwhere">📍 手に入れ方：${esc(howToGet(x.id))}</p>`;
      } else {
        const where = x.kind === 'mid' ? `中間ボス「${MID[zsubj].title}」` : x.kind === 'boss' ? `${lecName(x.lec)} のボス` : x.kind === 'srare' ? `${lecName(x.lec)} STAGE ${nsOf(zsubj) > 2 ? `${x.stage}・${x.stage + 2}` : x.stage} にたまに出る` : x.kind === 'lec' ? `${lecName(x.lec)} ${x.stage ? `STAGE ${nsOf(zsubj) > 2 ? `${x.stage}・${x.stage + 2}` : x.stage}` : 'のステージ'}` : x.kind === 'rare' ? 'どのステージにもたまに出る' : 'どのステージにも出る';
        const tag = x.kind === 'boss' ? '<em class="boss">BOSS</em>' : x.kind === 'mid' ? '<em class="boss">中間ボス</em>' : x.kind === 'rare' || x.kind === 'srare' ? '<em class="rare">レア</em>' : '<em>雑魚</em>';
        body = `<div class="rp-zcbig${own ? '' : ' sil'}"><span class="rp-zi">${x.icon}</span></div><b class="rp-zcname">${own ? esc(x.name) : '？？？'}</b>${tag}
          <p>${own ? esc(x.desc || '') : 'まだ出会っていない。'}</p><p class="rp-zcwhere">📍 ${esc(where)}${own ? `　⚔️ たおした数 ${r.zukan[x.key]}` : ''}</p>`;
      }
      document.querySelector('.rp-zsheet')?.remove();
      const sh = document.createElement('div'); sh.className = 'rp-zsheet';
      sh.innerHTML = `<div class="rp-zcard${ally ? ' r' + x.rar : ''}"><button class="rp-x" data-zx aria-label="閉じる">✕</button>${body}
        <div class="rp-zcnav"><button data-zn="-1" ${i ? '' : 'disabled'}>‹ 前</button><span>${i + 1} / ${order.length}</span><button data-zn="1" ${i < order.length - 1 ? '' : 'disabled'}>次 ›</button></div></div>`;
      (document.getElementById('hk-ov') || document.body).appendChild(sh);
      sh.onclick = (e) => {
        e.stopPropagation();
        if (e.target === sh || e.target.closest('[data-zx]')) { sh.remove(); return; }
        const nb = e.target.closest('[data-zn]'); if (nb && !nb.disabled) { bgm.sfx('tap'); openCard(order[i + +nb.dataset.zn].key); }
      };
    }
    m.onclick = (e) => {
      const b = e.target.closest('[data-zm],[data-zs],[data-zf],[data-zrw],[data-z]'); if (!b) return;
      e.stopPropagation(); bgm.sfx('tap');
      if (b.dataset.zm) { zmode = b.dataset.zm; zfil = 'all'; return renderZukan(m); }
      if (b.dataset.zs) { zsubj = b.dataset.zs; return renderZukan(m); }
      if (b.dataset.zf) { zfil = b.dataset.zf; return renderZukan(m); }
      if (b.dataset.zrw != null) {
        const i = +b.dataset.zrw, w = ZREW[zmode][i]; if (r.zrew[rkey(i)] || rate < w.p) return;
        r.zrew[rkey(i)] = 1; if (w.coins) r.coins += w.coins; if (w.mats) r.mats = (r.mats || 0) + w.mats; if (w.ticket) r.tickets = (r.tickets || 0) + w.ticket;
        save(); bgm.sfx('rare'); toast(`📖 図鑑の報酬：${w.label} をゲット！`); return renderZukan(m);
      }
      openCard(b.dataset.z);
    };
  }

  /* ---------- デイリー・ウィークリー目標 ---------- */
  function goalState() {
    const r = R();
    if (!r.goals || r.goals.day !== dayKey()) r.goals = { ...(r.goals || {}), day: dayKey(), d: {}, dc: {} };
    if (r.goals.week !== weekKey()) Object.assign(r.goals, { week: weekKey(), w: {}, wc: {} });
    return r.goals;
  }
  function goalList() {
    const g = goalState();
    return [...DAILY.map((x) => ({ ...x, scope: 'd', v: g.d[x.id] || 0, got: !!g.dc[x.id] })), ...WEEKLY.map((x) => ({ ...x, scope: 'w', v: g.w[x.id] || 0, got: !!g.wc[x.id] }))].map((x) => ({ ...x, done: x.v >= x.n }));
  }
  function bump(id, by = 1, scope) {
    const g = goalState();
    if (!scope || scope === 'd') if (DAILY.some((x) => x.id === id)) g.d[id] = (g.d[id] || 0) + by;
    if (!scope || scope === 'w') if (WEEKLY.some((x) => x.id === id)) g.w[id] = (g.w[id] || 0) + by;
  }
  function renderGoals(m) {
    const gl = goalList();
    const row = (x) => `<div class="rp-goal${x.got ? ' got' : x.done ? ' done' : ''}">
      <div><b>${esc(x.name)}</b><span class="rp-gbar"><i style="width:${Math.min(100, (x.v / x.n) * 100)}%"></i></span><small>${Math.min(x.v, x.n)} / ${x.n}　報酬 🪙${x.coins} 🌰${x.food}</small></div>
      ${x.got ? '<span class="rp-gok">✓ 受け取り済み</span>' : `<button class="rp-btn gold" data-claim="${x.scope}:${x.id}" ${x.done ? '' : 'disabled'}>受け取る</button>`}</div>`;
    m.innerHTML = `
      <div class="rp-zhead"><b>🎯 デイリー目標</b><span>毎日0時に更新</span></div>${gl.filter((x) => x.scope === 'd').map(row).join('')}
      <div class="rp-zhead mt"><b>🏅 ウィークリー目標</b><span>毎週月曜に更新</span></div>${gl.filter((x) => x.scope === 'w').map(row).join('')}`;
    m.onclick = (e) => {
      const b = e.target.closest('[data-claim]'); if (!b || b.disabled) return;
      e.stopPropagation();
      const [sc, id] = b.dataset.claim.split(':'), g = goalState(), x = gl.find((y) => y.scope === sc && y.id === id);
      if (!x || !x.done || x.got) return;
      g[sc + 'c'][id] = 1; R().coins += x.coins; addFood(x.food); save(); ctx.renderTop?.();
      bgm.sfx('win'); toast(`🪙${x.coins} と 🌰${x.food} をゲット！ ${heroName()}「${pick(HLINE.goal)}」`);
      renderQuestTab($m);
    };
  }
  // 解放条件：その科目の最初のステージは最初から。ほかは1つ前のステージをクリア
  function isOpen(subj, k, n, ci) {
    const r = R(), keys = Object.keys(lectures[subj]);
    if (r.clear[`${subj}-${k}-${n}`]) return true; // 一度クリアしたステージは閉じない
    if (n > 1) return !!r.clear[`${subj}-${k}-${n - 1}`];
    if (ci === 0) return true;
    if (r.clear[`${subj}-${k}-1`]) return true; // もう遊んだことのあるステージは閉じない
    // 中間ボスの次の回は、中間ボスを倒してから
    if (MID[subj]?.after === String(keys[ci - 1])) return !!r.clear[`${subj}-mid-0`];
    return !!r.clear[`${subj}-${keys[ci - 1]}-${bossOf(subj)}`];
  }

  /* ---------- 名前を変える ---------- */
  function openRename() {
    openOv('主人公の名前'); darkOv();
    body().innerHTML = `<div class="card rp-full" style="max-width:420px">
      <img class="rp-heroimg big" src="${heroSrc()}" alt="">
      <input class="hk-input rp-nameinput" id="rp-nin" maxlength="10" value="${esc(heroName())}" style="min-height:0">
      <p class="muted small">10文字まで</p>
      <button class="btn wide" id="rp-nok">決定</button></div>`;
    const inp = document.getElementById('rp-nin');
    const ok = () => { const v = inp.value.trim().slice(0, 10); if (!v) { toast('名前を入れてね'); return; } R().heroName = v; save(); toast(`${v}「${pick(HLINE.rename)}」`); closeOv(); };
    document.getElementById('rp-nok').onclick = ok;
    inp.onkeydown = (e) => { if (e.key === 'Enter') ok(); };
  }

  /* ---------- パーティ編成（上に編成枠、下に仲間のマス目。タップで詳しく・知恵の実をあげる） ---------- */
  const FEED_EXP = 20; // 🌰1つで経験値20
  function feedTo(id, o, n) { return addExp(id, o, FEED_EXP * n); }
  function openParty(B) {
    let sel = null, sort = 'pw';
    const draw = () => {
      const r = R(), t = team();
      const ownedIds = Object.keys(CHARS).filter((id) => r.owned[id]);
      const sorted = [...ownedIds].sort((a, b) => (sort === 'pw' ? power(b) - power(a) : sort === 'lv' ? r.owned[b].lv - r.owned[a].lv : CHARS[b].rar - CHARS[a].rar || r.owned[b].lv - r.owned[a].lv));
      const unknown = Object.keys(CHARS).length - ownedIds.length;
      const d = sel ? member(sel) : null;
      const o = sel === 'hero' ? r.hero : sel ? r.owned[sel] : null;
      B.innerHTML = `
        <button class="rp-chback rp-full" data-gtab="map">‹ マップに戻る<b>パーティ編成</b></button>
        <div class="rp-form rp-full">
          <div class="rp-formhead"><b>編成</b><span>戦闘力 <b>${teamPower(r.subj).toLocaleString()}</b><small>（${esc(SUBJNAME(r.subj))}）</small></span></div>
          <div class="rp-slots">
            ${['hero', ...r.party, null, null, null].slice(0, 4).map((id, i) => id
              ? `<button class="rp-slot${sel === id ? ' sel' : ''}" data-pick="${id}">${iconHTML(id)}<small>${esc(member(id).name)}</small><em>Lv.${member(id).lv}</em><span class="rp-pw">⚔${power(id)}</span>${i === 0 ? '<i class="rp-leader">リーダー</i>' : ''}</button>`
              : '<span class="rp-slot empty"><span class="rp-face empty">＋</span><small>空き</small></span>').join('')}
          </div>
          <button class="rp-btn gold wide rp-auto" data-auto>⚡ 自動編成（戦闘力順）</button>
        </div>
        <div class="rp-gridhead rp-full"><b>仲間 ${ownedIds.length}/${Object.keys(CHARS).length}</b>
          <span class="rp-sort"><button data-sort="pw" aria-pressed="${sort === 'pw'}">戦闘力順</button><button data-sort="rar" aria-pressed="${sort === 'rar'}">★順</button><button data-sort="lv" aria-pressed="${sort === 'lv'}">Lv順</button></span></div>
        <div class="rp-grid rp-full">
          ${sorted.map((id) => `<button class="rp-cell r${CHARS[id].rar}${r.party.includes(id) ? ' inp' : ''}${sel === id ? ' sel' : ''}" data-pick="${id}">${iconHTML(id)}<span class="rp-rar">${RAR[CHARS[id].rar]}</span><em>Lv.${r.owned[id].lv}</em><span class="rp-pw">⚔${power(id)}</span>${r.party.includes(id) ? '<i>編成中</i>' : ''}</button>`).join('')}
          ${Array(unknown).fill('<span class="rp-cell unknown"><span class="rp-face empty">？</span><em>未発見</em></span>').join('')}
        </div>
        <p class="muted small rp-full">🌰知恵の実はヒマコロシ全体で共通（今 🌰 ${S.food}）。🌰1つで経験値${FEED_EXP}。</p>
        ${d ? `<div class="rp-detail">
          <div class="rp-dhead">${iconHTML(sel)}<div><b>${esc(d.name)}</b> ${d.rar ? `<span class="rp-rar r${d.rar}">${RAR[d.rar]}</span>` : '<span class="rp-rar">リーダー</span>'}
            <div class="rp-lv">Lv.${d.lv}${sel === 'hero' ? '' : `<small>/${capOf(sel)}</small>`}<span class="rp-exp"><i style="width:${o.lv >= capOf(sel) ? 100 : (o.exp / needExp(o.lv)) * 100}%"></i></span><small>${o.lv >= capOf(sel) ? '上限' : `${o.exp}/${needExp(o.lv)}`}</small></div></div>
            <button class="rp-x" data-close-detail aria-label="閉じる">✕</button></div>
          <div class="rp-tags"><em class="pw">戦闘力 ${power(sel)}</em><em>HP ${d.hp}</em><em>攻撃 ${d.atk}</em>${o.lb ? `<em>突破+${o.lb}</em>` : ''}<em>得意 ${d.subj == null ? 'なし' : d.subj === 'all' ? 'ぜんぶ' : SUBJ.find((x) => x[0] === d.subj)[1]}</em></div>
          ${sel === 'hero' ? `<p class="rp-prof">${esc(HERO_PROFILE)}</p>
          <div class="rp-hskills">${HERO_SKILLS.map((k, i) => { const got = r.hero.lv >= k.lv, on = (r.heroSkill || 0) === i; return `<button class="rp-hsk${on ? ' on' : ''}" data-hsk="${i}" ${got ? '' : 'disabled'}><b>${got ? esc(k.name) : '？？？'}</b><small>${got ? SKILL_DESC[k.kind](k) : `Lv.${k.lv} で覚える`}</small>${on ? '<i>装備中</i>' : ''}</button>`; }).join('')}</div>
          <div class="rp-skins"><b>👔 スキン</b><div>${HERO_SKINS.map((k, i) => { if (!k.src) return `<button class="rp-skin" disabled><span class="rp-skinq">？</span><small>Lv.${k.lv}で解放（準備中）</small></button>`; const got = r.hero.lv >= k.lv, on = (r.heroSkin || 0) === i; return `<button class="rp-skin${on ? ' on' : ''}" data-skin="${i}" ${got ? '' : 'disabled'}><img src="${k.src}" alt="" class="${got ? '' : 'sil'}"><small>${got ? esc(k.name) : `Lv.${k.lv}で解放`}</small>${on ? '<i>着用中</i>' : ''}</button>`; }).join('')}</div></div>
          <div class="rp-mat"><span>${MAT.icon} ${MAT.name} <b>×${r.mats || 0}</b><small>ゲキムズで敵を倒すとたまに手に入る</small></span><button class="rp-btn gold" data-mat ${r.mats ? '' : 'disabled'}>使う（上限+${MAT.plus}）</button></div>` : ''}
          ${CHARS[sel]?.prof ? `<p class="rp-prof">${esc(CHARS[sel].prof)}</p>` : ''}
          ${CHARS[sel]?.limited ? `<div class="rp-mat"><span>${MAT.icon} ${MAT.name} <b>×${r.mats || 0}</b><small>ガチャに出ない仲間は、${MAT.icon}で上限開放</small></span><button class="rp-btn gold" data-mat ${r.mats ? '' : 'disabled'}>使う（上限+${MAT.plus}）</button></div>` : ''}
          <p class="rp-skill"${sel === 'hero' ? ' hidden' : ''}>スキル「${esc(d.skill.name)}」：${SKILL_DESC[d.skill.kind](d.skill)}（正解${d.skill.cost}回でたまる）</p>
          <div class="rp-dbtns">
            ${sel === 'hero' ? '<span class="muted small">リーダーはいつも出撃</span>' : `<button class="rp-btn" data-toggle>${r.party.includes(sel) ? '編成から外す' : '編成に入れる'}</button>`}
            <button class="rp-btn gold" data-feed="1" ${S.food < 1 ? 'disabled' : ''}>🌰 あげる</button>
            <button class="rp-btn gold" data-feed="5" ${S.food < 5 ? 'disabled' : ''}>🌰×5</button>
          </div></div>` : ''}`;
    };
    draw();
    B.onclick = (e) => {
      const r = R();
      const sb = e.target.closest('[data-sort]'); if (sb) { sort = sb.dataset.sort; draw(); return; }
      const hk = e.target.closest('[data-hsk]'); if (hk && !hk.disabled) { r.heroSkill = +hk.dataset.hsk; save(); bgm.sfx('skill'); toast(`スキル「${HERO_SKILLS[r.heroSkill].name}」を装備した！`); draw(); return; }
      const skb = e.target.closest('[data-skin]');
      if (skb && !skb.disabled) { r.heroSkin = +skb.dataset.skin; save(); bgm.sfx('skill'); toast(`👔 ${HERO_SKINS[r.heroSkin].name} に着替えた！`); draw(); ctx.refreshHero?.(); return; }
      if (e.target.closest('[data-mat]') && r.mats > 0) {
        r.mats--;
        if (sel === 'hero') r.heroLb = (r.heroLb || 0) + 1; else r.owned[sel].lb = (r.owned[sel].lb || 0) + MAT.plus; // 限定の仲間：💎1個で上限+5
        save(); bgm.sfx('rare'); toast(`${MAT.icon} 上限開放！ ${sel === 'hero' ? heroName() : CHARS[sel].name} のレベル上限が ${capOf(sel)} になった`); draw(); return;
      }
      if (e.target.closest('[data-auto]')) { autoParty(); bgm.sfx('skill'); toast(`戦闘力 ${teamPower(r.subj).toLocaleString()} の編成にした！（${SUBJNAME(r.subj)}）`); draw(); return; }
      if (e.target.closest('[data-close-detail]')) { sel = null; draw(); return; }
      const pk = e.target.closest('[data-pick]'); if (pk) { sel = pk.dataset.pick; bgm.sfx('tap'); draw(); return; }
      if (e.target.closest('[data-toggle]') && sel && sel !== 'hero') {
        const i = r.party.indexOf(sel);
        if (i >= 0) r.party.splice(i, 1);
        else if (r.party.length >= 3) { toast('仲間は3人まで。先にだれかを外してね'); return; }
        else r.party.push(sel);
        bgm.sfx('tap'); save(); draw(); return;
      }
      const fb = e.target.closest('[data-feed]');
      if (fb && !fb.disabled && sel) {
        const n = +fb.dataset.feed; if (S.food < n) return;
        const o = sel === 'hero' ? r.hero : r.owned[sel];
        if (o.lv >= capOf(sel)) { toast(`Lv.${capOf(sel)} が上限。ガチャでかぶると上限+1（限界突破）`); return; }
        S.food -= n;
        const ups = feedTo(sel, o, n);
        save(); ctx.renderTop?.();
        if (ups) { bgm.sfx('win'); toast(`${member(sel).name} が Lv.${o.lv} になった！`); } else { bgm.sfx('heal'); toast(`経験値 +${FEED_EXP * n}`); }
        draw();
      }
    };
  }

  /* ---------- ガチャ ---------- */
  // 確率：★★★★ 2% ・ ★★★ 4% ・ ★★ 26% ・ ★ 68%。天井：★★★が出ないまま50回目は★★★確定。10連は★★以上1体確定
  const PITY = 50;
  const poolOf = (rar) => Object.keys(CHARS).filter((id) => CHARS[id].rar === rar && !CHARS[id].limited);
  function pullOne(minRar = 1) {
    const r = R();
    // ★★★★ 2%・★★★ 4%（あわせて6%）。天井の★★★確定でも 1/3 で★★★★
    let x = Math.random(), rar = x < 0.02 ? 4 : x < 0.06 ? 3 : x < 0.32 ? 2 : 1;
    if ((r.pity || 0) + 1 >= PITY && rar < 3) rar = Math.random() < 1 / 3 ? 4 : 3;
    rar = Math.max(rar, minRar);
    r.pity = rar >= 3 ? 0 : (r.pity || 0) + 1;
    const pool = poolOf(rar);
    return pool[rnd(pool.length)];
  }
  // 召喚の演出：門が開く → 光の色でレア度を予告 → 1体ずつ登場（タップで次の1体へ・右上の「スキップ」で全部とばす）
  function playGacha(res, done) {
    const top = Math.max(...res.map(([id]) => CHARS[id].rar));
    const promo = top >= 3 && Math.random() < 0.3; // たまに青 → 金（→虹）に昇格
    const ov = document.createElement('div');
    ov.className = `rp-gfx r${top}${promo ? ' promo' : ''}`;
    ov.innerHTML = `<div class="rp-gate"><i></i><i></i></div><div class="rp-pillar"></div><div class="rp-gstage"></div>
      <button class="rp-gskipall" data-skipall>スキップ ▶▶</button><p class="rp-gskip">タップで次へ</p>`;
    document.body.appendChild(ov);
    bgm.sfx('gacha');
    const stage = ov.querySelector('.rp-gstage');
    let idx = -1, timer = null, ended = false;
    const end = () => { if (ended) return; ended = true; clearTimeout(timer); ov.remove(); done(); };
    const show = () => {
      clearTimeout(timer);
      idx++;
      if (idx >= res.length) return end();
      const [id, isNew] = res[idx], rr = CHARS[id].rar;
      ov.classList.remove('c1', 'c2', 'c3', 'c4'); void ov.offsetWidth; ov.classList.add('c' + rr);
      if (rr === 4) { // ★★★★：暗転 → 虹のひび → LEGEND → 虹の光の中から登場して名乗る
        stage.innerHTML = `<div class="rp-leg"><div class="lg-rays"></div><div class="lg-crack"></div><div class="lg-word">LEGEND</div>
          <div class="rp-confetti rb">${Array.from({ length: 40 }, (_, i) => `<b style="left:${(i * 29) % 100}%;animation-delay:${1.6 + (i % 10) * 0.07}s"></b>`).join('')}</div>
          <div class="lg-card"><div class="lg-face">${iconHTML(id)}</div><span class="rp-rar r4">${RAR[4]}</span><b>${esc(CHARS[id].name)}</b><small>${esc(CHARS[id].prof || '')}</small>${isNew ? '<em>NEW!</em>' : '<em>上限+1</em>'}</div></div>
          <p class="rp-gcount">${idx + 1} / ${res.length}</p>`;
        bgm.sfx('charge'); setTimeout(() => { if (!ended) bgm.sfx('boom'); }, 1100); setTimeout(() => { if (!ended) bgm.sfx('rare'); }, 1600);
        timer = setTimeout(show, 5200);
        return;
      }
      stage.innerHTML = `${rr === 3 ? '<div class="rp-confetti">' + Array.from({ length: 24 }, (_, i) => `<b style="left:${(i * 37) % 100}%;animation-delay:${(i % 8) * 0.06}s"></b>`).join('') + '</div>' : ''}
        <div class="rp-gcard one r${rr}"><div class="f">${iconHTML(id)}<span class="rp-rar">${RAR[rr]}</span><small>${esc(CHARS[id].name)}</small>${isNew ? '<em>NEW!</em>' : '<em>上限+1</em>'}</div></div>
        <p class="rp-gcount">${idx + 1} / ${res.length}</p>`;
      if (rr === 3) bgm.sfx('rare'); else bgm.sfx('tap');
      timer = setTimeout(show, rr === 3 ? 2400 : 1500); // 自動でも次へ進む
    };
    ov.onclick = (e) => {
      if (e.target.closest('[data-skipall]')) { e.stopPropagation(); return end(); }
      if (idx < 0) { clearTimeout(timer); ov.classList.add('open'); show(); return; } // 門の演出中のタップ → すぐ1体目
      show();
    };
    timer = setTimeout(() => { ov.classList.add('open'); show(); }, 1250);
  }
  function openGacha(B) {
    let showRates = false;
    const feat = poolOf(3).slice(0, 3);
    const draw = (res) => {
      const r = R(), left = PITY - (r.pity || 0);
      B.innerHTML = `
        <div class="rp-gbanner"><div class="rp-gbt"><b>秋学期ガチャ</b><small>★★★★ 2%・★★★ 4%　10連は★★以上1体確定</small></div>
          <div class="rp-gfeat">${feat.map((id) => `<span>${iconHTML(id)}<small>${esc(CHARS[id].name)}</small></span>`).join('')}</div></div>
        <div class="rp-pity"><span>★★★以上確定まで あと <b>${left}</b> 回</span><span class="rp-pbar"><i style="width:${((PITY - left) / PITY) * 100}%"></i></span></div>
        ${r.tickets ? `<button class="rp-btn gold big wide rp-ticket" data-g="t">🎟️ チケットで1回<small>のこり ${r.tickets}枚</small></button>` : ''}
        <div class="row rp-gbtns"><button class="rp-btn gold big" data-g="1" ${r.coins < 100 ? 'disabled' : ''}>1回<small>🪙100</small></button><button class="rp-btn gold big rp-g10" data-g="10" ${r.coins < 900 ? 'disabled' : ''}>10連<small>🪙900・★★以上確定</small></button></div>
        <p class="rp-have">持っている 🪙 <b>${r.coins}</b>　<button class="rp-link" data-rates>${showRates ? '閉じる' : '提供割合・キャラ一覧'}</button></p>
        ${showRates ? `<div class="rp-rates2">${[4, 3, 2, 1].map((k) => `<div class="rr${k}"><b>${RAR[k]}　${['', '68%', '26%', '4%', '2%'][k]}</b><span>${k === 4 ? '？？？（出るまでひみつ）' : poolOf(k).map((id) => esc(CHARS[id].name)).join('・')}</span></div>`).join('')}<p class="muted small">かぶったら限界突破（レベル上限+1）。章限定の仲間はガチャには出ない。</p></div>` : ''}
        ${res ? `<div class="rp-gres">${res.map(([id, isNew], i) => `<span class="rp-gitem r${CHARS[id].rar}" style="animation-delay:${i * 0.05}s">${iconHTML(id)}<span class="rp-rar">${RAR[CHARS[id].rar]}</span><small>${esc(CHARS[id].name)}</small><em>${isNew ? 'NEW!' : '上限+1'}</em></span>`).join('')}</div>` : ''}`;
    };
    draw();
    B.onclick = (e) => {
      if (e.target.closest('[data-rates]')) { showRates = !showRates; draw(); return; }
      const b = e.target.closest('[data-g]'); if (!b || b.disabled) return;
      const r = R(), tk = b.dataset.g === 't', n = tk ? 1 : +b.dataset.g, cost = tk ? 0 : n === 10 ? 900 : 100;
      if (tk ? !r.tickets : r.coins < cost) return;
      if (tk) r.tickets--; else r.coins -= cost;
      r.pulls += n;
      const ids = [];
      for (let i = 0; i < n; i++) ids.push(pullOne(n === 10 && i === 9 && !ids.some((x) => CHARS[x].rar >= 2) ? 2 : 1));
      const res = ids.map((id) => {
        if (r.owned[id]) { r.owned[id].lb = (r.owned[id].lb || 0) + 1; return [id, false]; } // かぶり → 限界突破（上限+1）
        r.owned[id] = { lv: 1, exp: 0 }; if (r.party.length < 3) r.party.push(id); return [id, true];
      });
      save();
      playGacha(res, () => {
        draw(res);
        const rare = res.some(([id]) => CHARS[id].rar >= 3);
        if (res.some(([id]) => CHARS[id].rar === 4)) toast(`${heroName()}「${pick(HLINE.gacha4)}」`);
        else if (rare) toast(`${heroName()}「${pick(HLINE.gacha3)}」`);
        else if (res.every(([id]) => CHARS[id].rar === 1)) toast(`${heroName()}「${pick(HLINE.gacha1)}」`);
      });
    };
  }

  /* ---------- バトル ---------- */
  async function startBattle(subj, lec, n, d = 0, rev = null) {
    const isMid = lec === 'mid', isRev = !!rev;
    const lecs = Object.keys(lectures[subj] || {});
    const ci = isRev ? 0 : isMid ? lecs.indexOf(MID[subj].after) : lecs.indexOf(String(lec));
    const boss = n === bossOf(subj) || isMid;
    const E = ENEMIES[subj], D = DIFF[d];
    // 敵の強さ：章（C/C++ → DB → 設計 → TOEIC）が進むごとに3回ぶん強く（2章の最初＝1章の中盤くらい）＋その章の中の回
    const lvIdx = ci + (isRev ? 0 : Math.max(0, CHAPTERS.findIndex((c) => c.id === subj)) * 3);
    const lvScale = 1 + lvIdx * 0.4 + (n - 1) * (0.3 / nsOf(subj)); // ボスはどの章も +0.3、雑魚ステージは少しずつ強く
    // 雑魚：そのステージ専用の2体を中心に、その回の雑魚・どこにでも出る雑魚から選ぶ。たまにレア（ステージ専用のレアが多め）
    const SG = STAGE[subj]?.[lec] || [];
    // 1ウェーブに出る敵の数：ノーマル1体、ハード2体、ゲキムズ3体。雑魚ステージは3ウェーブ（ボス戦はボス＋手下の1ウェーブ）
    const slots = isMid || isRev ? 1 : [1, 2, 3][d];
    const zakos = (cnt) => {
      const tri = SG[boss ? rnd(SG.length || 1) : (n - 1) % 2];
      const own = tri ? tri.slice(0, 2) : [];
      const pool = shuffle([...own, ...own, ...shuffle([...(E.lec[lec] || []), ...E.common])]);
      const z = []; for (let i = 0; i < cnt; i++) z.push(pool[i % pool.length]);
      const rares = [];
      if (Math.random() < (d ? 0.12 : 0.08)) { const rr = tri && Math.random() < 0.7 ? tri[2] : E.rare; z[rnd(z.length)] = rr; rares.push(rr[0]); }
      const sc = slots > 1 ? 0.75 : 1; // 敵が多いぶん1体のHPは少し低め
      return z.map(([name, icon]) => { const rare = rares.includes(name); return { name, icon, rare, hp: Math.round(100 * lvScale * D.hp * sc * (rare ? 0.7 : 1)), atk: Math.round(18 * lvScale * D.atk * (rare ? 0.5 : 1)) }; });
    };
    const rangeLecs = isMid ? lecs.slice(0, ci + 1) : [];
    const foes = isRev ? rev.foes
      : isMid
      ? midFoes(subj).map((f) => ({ ...f, boss: true, art: f.rush ? null : f.icon, lec: f.lec || +rangeLecs[rnd(rangeLecs.length)], hp: Math.round(380 * lvScale * D.hp * (f.final ? 1.4 : 0.5)), atk: Math.round(35 * lvScale * D.atk * (f.final ? 1.2 : 0.8)) }))
      : boss
      ? [{ name: E.boss[lec][0], icon: E.boss[lec][1], hp: Math.round(380 * lvScale * D.hp), atk: Math.round(35 * lvScale * D.atk), boss: true }, ...zakos(slots - 1).map((f) => ({ ...f, hp: Math.round(f.hp * 0.8) }))]
      : [...zakos(slots), ...zakos(slots), ...zakos(slots)];
    foes.forEach((f) => { f.cur = f.hp; });
    const t = team();
    const maxHp = t.reduce((a, x) => a + x.hp, 0);
    // ウェーブ：雑魚ステージは3ウェーブ、ボス戦は1ウェーブ、中間ボスは1体ずつ
    const waves = isMid || isRev ? foes.map((_, i) => [i]) : boss ? [foes.map((_, i) => i)] : [0, 1, 2].map((w) => Array.from({ length: slots }, (_, k) => w * slots + k));
    const st = { foes, waves, wave: 0, active: [...waves[0]], fi: 0, hp: maxHp, maxHp, gauge: Object.fromEntries(t.map((x) => [x.id, 0])), guard: 0, bonusT: 0, q: null, timer: null, left: 0, total: 1, limit: isRev ? 60 : Math.round((boss ? 90 : 12) * D.time), busy: false, combo: 0, correct: 0, miss: 0, over: false, turns: 0, event: null, rares: 0 };
    const deckObj = DECKS.find((d) => d.id === subj) || DECKS.find((d) => d.id === subj + lec) || (subj === 'toeic' && DECKS.find((d) => d.id === 'toeic3')) || DECKS[0]; // TOEIC リーディングはレベルごとの単語帳（Part 6・7 は Lv.3）
    const deck = deckObj.words, deckId = deckObj.id;
    // 雑魚戦の単語はその回のものだけ（単語に回の番号が付いている科目）。選択肢のハズレは科目全体から
    const lecDeck = deck.filter((w) => String(w[2]) === String(lec));
    const qDeck = lecDeck.length >= 3 ? lecDeck : deck;
    const usedW = new Set(), usedQ = new Set(); // 1回のバトルで同じ問題は全部出るまで出さない
    // ボスの前のステージ（TOEIC は STAGE 4、ほかは STAGE 2）は、その回の本番形式（ボスと同じ範囲）を必ず1〜2問まぜる：2ウェーブ目・3ウェーブ目の最初の問題
    const realAt = !isRev && !isMid && !boss && n === nsOf(subj) ? new Set(rnd(2) ? [1, 2] : [1 + rnd(2)]) : new Set();
    const no = isRev ? (rev.rush ? '怨念ボスラッシュ' : '復讐') : isMid ? '中間ボス' : (lectures[subj][lec].match(/^(第\S+?回)/) || [lectures[subj][lec]])[0];
    openOv(isRev ? `${no}（${foes.length}体）` : `${no} ${isMid ? `${foes.length}連戦` : boss ? 'BOSS' : 'STAGE ' + n}${d ? ' ' + D.tag + D.name : ''}`); darkOv();
    setCleanup(() => { clearInterval(st.timer); bgm.play('map'); });
    bgm.play(boss ? 'boss' : 'battle');

    const atkOf = (x) => x.atk * (x.subj === subj ? 1.3 : x.subj === 'all' ? 1.2 : 1); // 得意科目 ×1.3
    const partyAtk = () => t.reduce((a, x) => a + atkOf(x), 0);

    const left = () => st.active.filter((i) => foes[i].cur > 0).length + st.waves.slice(st.wave + 1).reduce((a, w) => a + w.length, 0);
    const waveTxt = () => (st.waves.length > 1 ? `WAVE ${st.wave + 1}/${st.waves.length}` : '');
    // 敵の場：1体ならこれまでどおり、2体以上ならカードを並べてタップで狙う敵を選ぶ
    function fieldHTML() {
      if (st.active.length === 1) {
        const f = foes[st.fi];
        return `<div class="rp-field${f.boss ? ' boss' : ''}${f.rare ? ' rare' : ''}${f.onnen ? ' onnen' : ''}">
              <div class="rp-enemy${f.art ? ' art' : ''}${f.onnen ? ' onnen' : ''}" id="rp-enemy" style="${f.onnen ? `--sz:${Math.min(1.45, 1 + (f.w - 1) * 0.12)}` : ''}">${f.icon}</div>
              <div class="rp-einfo">
                <div class="rp-wave">${f.onnen ? `${f.nemesis ? '☠️ 宿敵 ・ ' : ''}${f.w0 ? `この${f.word ? '単語' : '問題'}に${f.w0}回負けた` : '自分で送った相手'}${f.t ? ` ・ 最後は${new Date(f.t).getMonth() + 1}/${new Date(f.t).getDate()}` : ''}` : f.boss && !isMid ? 'BOSS' : waveTxt()}${f.rare ? '　🌟レア！' : ''}</div>
                <div class="rp-ename">${esc(f.name)} ${cdHTML(st.fi)}</div>
                <div class="rp-hpbar enemy"><i id="rp-ehp"></i><span id="rp-ehptxt"></span></div>
              </div>
              <div class="rp-pop" id="rp-pop"></div>
            </div>`;
      }
      return `<div class="rp-field multi">
              <div class="rp-wave">${waveTxt() ? waveTxt() + ' ・ ' : ''}のこり ${left()}体 ・ タップで狙う${st.active.some((i) => foes[i].rare) ? '　🌟レア！' : ''}</div>
              <div class="rp-foes c${st.active.length}">${st.active.map((i) => { const f = foes[i], tg = i === st.fi; return `<button class="rp-foe${tg ? ' tg' : ''}${f.boss ? ' boss' : ''}${f.rare ? ' rare' : ''}" data-tg="${i}">${tg ? '<em>🎯</em>' : ''}<span class="rp-enemy"${tg ? ' id="rp-enemy"' : ''}>${f.icon}</span><b>${esc(f.name)}</b><span class="rp-hpbar enemy sm"><i data-hp="${i}"></i></span>${cdHTML(i)}</button>`; }).join('')}</div>
              <div class="rp-pop" id="rp-pop"></div>
            </div>`;
    }
    function drawField() { const w = document.getElementById('rp-fw'); if (w) { w.innerHTML = fieldHTML(); drawHp(); } }
    function layout() {
      body().innerHTML = `
        <div class="rp-battle">
          <div class="rp-head">
            <div id="rp-fw">${fieldHTML()}</div>
            <div class="rp-team" id="rp-team"></div>
            <div class="rp-hpbar party"><i id="rp-php"></i><span id="rp-phptxt"></span></div>
            <div class="rp-timebar"><i id="rp-time"></i></div>
            <div class="rp-buffs" id="rp-buffs">${buffHTML()}</div>
            <div class="rp-say" id="rp-say"><img src="${heroSrc()}" alt=""><span></span></div>
            <div class="rp-event" id="rp-event" hidden></div>
          </div>
          <div id="rp-q"></div>
        </div>`;
      drawTeam(); drawHp();
    }
    function drawTeam() {
      const el = document.getElementById('rp-team'); if (!el) return;
      el.innerHTML = t.map((x) => {
        const g = st.gauge[x.id], full = g >= x.skill.cost;
        return `<button class="rp-tm${full ? ' ready' : ''}${x.rar === 4 ? ' r4' : ''}" data-skill="${x.id}" ${full ? '' : 'disabled'} title="${esc(x.skill.name)}">${iconHTML(x.id)}
          <span class="rp-gauge"><i style="width:${Math.min(100, (g / x.skill.cost) * 100)}%"></i></span><small>${full ? 'スキル!' : esc(x.name)}</small></button>`;
      }).join('');
    }
    function drawHp() {
      const f = foes[st.fi];
      const e = document.getElementById('rp-ehp'), et = document.getElementById('rp-ehptxt'), p = document.getElementById('rp-php'), pt = document.getElementById('rp-phptxt');
      if (e) e.style.width = Math.max(0, (f.cur / f.hp) * 100) + '%';
      if (et) et.textContent = `${Math.max(0, Math.round(f.cur))} / ${f.hp}`;
      document.querySelectorAll('[data-hp]').forEach((el) => { const g = foes[+el.dataset.hp]; el.style.width = Math.max(0, (g.cur / g.hp) * 100) + '%'; });
      if (p) { p.style.width = Math.max(0, (st.hp / st.maxHp) * 100) + '%'; p.classList.toggle('low', st.hp / st.maxHp < 0.3); }
      if (pt) pt.textContent = `HP ${Math.max(0, Math.round(st.hp))} / ${st.maxHp}${st.guard ? `　🛡️×${st.guard}` : ''}`;
    }
    // 主人公のひとこと（吹き出し）
    let sayT = null;
    function hsay(k) {
      const el = document.getElementById('rp-say'); if (!el || !HLINE[k]) return;
      el.querySelector('span').textContent = pick(HLINE[k]);
      el.classList.remove('in'); void el.offsetWidth; el.classList.add('in', 'show');
      clearTimeout(sayT); sayT = setTimeout(() => { el.classList.remove('show'); }, 2600);
    }
    function pop(txt, cls) {
      const p = document.getElementById('rp-pop'); if (!p) return;
      const s = document.createElement('span'); s.className = 'rp-num ' + cls; s.textContent = txt;
      s.style.left = 30 + Math.random() * 40 + '%';
      p.appendChild(s); setTimeout(() => s.remove(), 1000);
    }
    function hitEnemy(dmg, label, big, idx = st.fi) {
      dmg = Math.max(1, Math.round(dmg));
      // ヌルポには「ガッ！」（ネットのお約束「ぬるぽ」→「ガッ」）
      const gah = foes[idx].name === 'ヌルポ';
      foes[idx].cur -= dmg;
      pop((gah ? 'ガッ！ ' : '') + (label ? label + ' ' : '') + dmg, gah ? 'hit big gah' : big ? 'hit big' : 'hit');
      bgm.sfx(gah ? 'gah' : big ? 'crit' : 'hit');
      const en = st.active.length > 1 ? document.querySelector(`[data-tg="${idx}"] .rp-enemy`) : document.getElementById('rp-enemy'); if (en) { en.classList.remove('shake'); void en.offsetWidth; en.classList.add('shake'); }
      const fl = document.querySelector('.rp-field'); if (fl) { fl.classList.remove('flash'); void fl.offsetWidth; fl.classList.add('flash'); }
      drawHp();
    }
    function hitParty(mult = 1, who = null) {
      // 場にいる敵がみんなで反撃（2体以上のときは1体あたり7割）。who：攻撃してくる敵（ゲキムズのターン攻撃）
      const live = who || st.active.filter((i) => foes[i].cur > 0);
      if (!live.length) return;
      const base = live.length > 1 ? live.reduce((a, i) => a + foes[i].atk, 0) * 0.7 : foes[live[0]].atk;
      let d = base * (0.85 + Math.random() * 0.3) * mult;
      if (st.guard) { d /= 2; st.guard--; }
      if (st.inertia) d /= 2; // イナーシャ：受けるダメージ半分
      const before = st.hp;
      st.hp -= Math.round(d);
      if (st.homeo) st.hp = Math.max(st.hp, Math.min(before, Math.ceil(st.maxHp * 0.3))); // ホメオスタシス：30%より下がらない
      bgm.sfx('ouch');
      if (!st.pinched && st.hp > 0 && st.hp / st.maxHp < 0.3) { st.pinched = true; setTimeout(() => hsay('pinch'), 700); }
      const bt = document.querySelector('.rp-battle'); if (bt) { bt.classList.remove('ouch'); void bt.offsetWidth; bt.classList.add('ouch'); }
      drawHp();
    }

    const wait = (ms) => new Promise((res) => setTimeout(res, ms));
    // ゲキムズ：敵は正解・不正解に関係なく、1〜3ターンごとに攻撃してくる（不正解の反撃の0.7倍）
    const turnAtk = d === 2 && !isRev;
    const setCd = (i) => { if (turnAtk && foes[i].cd == null) foes[i].cd = 1 + rnd(3); };
    st.active.forEach(setCd);
    const cdTxt = (f) => (f.cd === 1 ? '⚠️ 次のターンで攻撃' : `⏳ あと${f.cd}ターンで攻撃`);
    const cdShort = (f) => (f.cd === 1 ? '⚠️ 次で攻撃' : `⏳ あと${f.cd}ターン`); // 敵が2体以上のときは短く
    const cdHTML = (i) => (turnAtk && foes[i].cd ? `<i class="rp-cd${foes[i].cd === 1 ? ' soon' : ''}" data-cd="${i}">${st.active.length > 1 ? cdShort(foes[i]) : cdTxt(foes[i])}</i>` : '');
    function drawCd() { document.querySelectorAll('[data-cd]').forEach((el) => { const f = foes[+el.dataset.cd]; el.textContent = st.active.length > 1 ? cdShort(f) : cdTxt(f); el.classList.toggle('soon', f.cd === 1); }); }
    function buffHTML() { return `${st.homeo ? `<span>💚 恒常性 あと${st.homeo}</span>` : ''}${st.inertia ? `<span class="in">⚙️ 慣性 あと${st.inertia}</span>` : ''}`; }
    function drawBuffs() { const el = document.getElementById('rp-buffs'); if (el) el.innerHTML = buffHTML(); }
    async function enemyTurn() {
      if (!turnAtk) return;
      const att = [];
      st.active.forEach((i) => { const f = foes[i]; if (f.cur <= 0 || f.cd == null) return; f.cd--; if (f.cd <= 0) { att.push(i); f.cd = 1 + rnd(3); } });
      drawCd();
      if (!att.length || st.hp <= 0) return;
      await wait(250);
      att.forEach((i) => { const en = st.active.length > 1 ? document.querySelector(`[data-tg="${i}"] .rp-enemy`) : document.getElementById('rp-enemy'); anim(en, 'lunge'); });
      await wait(300);
      hitParty(0.7, att); pop('⏳ ターン攻撃', 'miss'); drawCd();
    }
    // チャンス（次の攻撃2倍）／ピンチ（敵が力をためる：次に受けるダメージ2倍）
    function rollEvent() {
      st.event = null;
      if (st.turns > 0) { const x = Math.random(); st.event = x < 0.08 ? 'chance' : x < 0.22 ? 'charge'  : null; /* チャンス 8%（v4.7.1 で 16%→8%）・力をためる 14% */ }
      const ev = document.getElementById('rp-event'); if (!ev) return;
      ev.hidden = !st.event;
      ev.className = 'rp-event ' + (st.event || '');
      ev.textContent = st.event === 'chance' ? '✨ チャンス！ 次の攻撃が2倍' : st.event === 'charge' ? `⚠️ ${foes[st.fi].name}が力をためている…（ミスすると大ダメージ）` : '';
      if (st.event) bgm.sfx(st.event === 'chance' ? 'skill' : 'miss');
      if (st.event === 'chance') hsay('chance');
    }

    async function nextQuestion() {
      if (st.over) return;
      st.busy = true;
      const qEl = document.getElementById('rp-q'); if (!qEl) return;
      rollEvent();
      // Ready… GO!（問題が出てから時間が動く）
      qEl.innerHTML = '<div class="rp-ready"><span>READY…</span></div>';
      const F = foes[st.fi];
      const real = realAt.has(st.wave) && st.realW !== st.wave; if (real) st.realW = st.wave;
      const bqP = F.qid ? api.questionById(F.sid, F.qid) : F.boss || real ? api.bossQuestion(subj, F.lec || lec, usedQ) : null;
      await wait(st.event ? 900 : 550);
      if (st.over || !document.getElementById('rp-q')) return;
      qEl.innerHTML = '<div class="rp-ready go"><span>GO!</span></div>';
      bgm.sfx('tap');
      await wait(320);
      if (st.over || !document.getElementById('rp-q')) return;
      if (bqP) {
        const bq = await bqP;
        if (st.over || !document.getElementById('rp-q')) return;
        st.q = { answer: bq.answer, exp: bq.exp, n: bq.choices.length, boss: true, qid: bq.qid, choices: bq.reveal || bq.choices, reveal: bq.reveal, sid: F.sid || subj, lec: F.qid ? F.lec : F.lec || lec, real: !F.boss };
        qEl.innerHTML = `<div class="rp-bq">${st.q.real ? '<div class="rp-realtag">📝 本番形式（ボスと同じ範囲）</div>' : ''}${bq.body}<div class="q-text">${bq.q}</div>${bq.qcode}</div>
          <div class="choices">${bq.choices.map((c, i) => `<button class="choice" data-c="${i}"><span class="num">(${bq.letters ? 'ABCDE'[i] : i + 1})</span><span class="txt">${c}</span></button>`).join('')}</div>`;
      } else {
        const wd = F.word ? (DECKS.find((x) => x.id === F.deck) || { words: [F.word] }).words : deck;
        let c = F.word;
        if (!c) { let rest = qDeck.filter((x) => !usedW.has(x[0])); if (!rest.length) { usedW.clear(); rest = qDeck; } c = rest[rnd(rest.length)]; usedW.add(c[0]); }
        const others = shuffle(wd.filter((x) => x[0] !== c[0])); others.sort((x, y) => (String(y[2]) === String(c[2])) - (String(x[2]) === String(c[2]))); // ハズレもなるべく同じ回から
        const pool = [c, ...shuffle(others.slice(0, 6))]; const flip = F.word ? false : rnd(2) === 1;
        const q = flip ? c[1] : c[0], a = flip ? c[0] : c[1];
        const opts = shuffle([a, ...pool.slice(1, 4).map((x) => (flip ? x[0] : x[1]))]);
        st.q = { answer: opts.indexOf(a), exp: `<b>${esc(c[0])}</b>：${esc(c[1])}`, n: 4, word: c, deck: F.deck || deckId, choices: opts.map(esc) };
        qEl.innerHTML = `<div class="rp-zq${q.length > 14 ? ' long' : ''}">${esc(q)}</div>
          <div class="hk-choices word rp-zc">${opts.map((o, i) => `<button data-c="${i}">${esc(o)}</button>`).join('')}</div>`;
      }
      document.querySelector('#hk-obody')?.scrollTo({ top: 0 });
      st.busy = false;
      st.left = (st.q.real ? Math.round(90 * D.time) : st.limit) + st.bonusT;
      st.total = st.left;
      clearInterval(st.timer);
      const tick = () => {
        if (document.hidden) return; // 別のアプリにいるあいだは止める
        st.left -= 0.1;
        const tb = document.getElementById('rp-time');
        if (tb) { tb.style.width = Math.max(0, (st.left / st.total) * 100) + '%'; tb.classList.toggle('hurry', st.left < Math.min(5, st.total * 0.25)); }
        info(`⏱ ${Math.max(0, Math.ceil(st.left))}`);
        if (st.left <= 0) { clearInterval(st.timer); answer(-1, null); }
      };
      tick(); st.timer = setInterval(tick, 100);
    }

    // 復讐の答え合わせ：正解・自分の答え・解説・負けた回数＋その回の基礎コースの要点
    async function revDetail(i, ok) {
      const F = foes[st.fi], q = st.q;
      const strip = (h) => String(h).replace(/<(?!\/?(code|b|pre)\b)[^>]*>/g, ' ');
      const sid = q.boss ? q.sid : /^toeic\d$/.test(F.deck || '') ? 'toeic' : F.deck;
      const lec = q.boss ? q.lec : q.word?.[2] ?? DECKS.find((x) => x.id === F.deck)?.words.find((w) => w[0] === q.word?.[0])?.[2]; // 前に保存された単語は回の番号がないので単語帳から引く
      const les = lec != null ? await api.lessonDigest?.(sid, lec).catch(() => '') : '';
      const mine = i < 0 ? '（時間切れ）' : strip(q.choices[i]);
      return `<div class="rp-revexp">
        <div class="rp-rx"><em class="ok">正解</em><span>(${q.answer + 1}) ${strip(q.choices[q.answer])}</span></div>
        ${ok ? '' : `<div class="rp-rx"><em class="ng">あなた</em><span>${i < 0 ? mine : `(${i + 1}) ${mine}`}</span></div>`}
        <div class="rp-rx"><em>解説</em><span>${q.exp}</span></div>
        <div class="rp-rx"><em>因縁</em><span>${F.w0 ? `${F.w0}回負けた相手` : '自分で送った相手'}${ok ? ' ・ 今回で晴らした！' : ` → ${(F.w0 || 0) + 1}回目の負け`}</span></div>
        ${les || ''}
      </div>`;
    }
    function anim(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
    async function answer(i, btn) {
      if (st.busy || st.over) return;
      st.busy = true; clearInterval(st.timer); st.turns++;
      const ok = i === st.q.answer;
      const F = foes[st.fi];
      if (isRev) {
        if (F.qid) api.revengeResult?.(F.sid, F.qid, ok); // 正解で復習リストから消え、間違えると負けた回数が増える
        else { const r = R(), key = `${F.deck}|${F.word[0]}`; if (ok) delete r.wmiss[key]; else if (r.wmiss[key]) { r.wmiss[key].n++; r.wmiss[key].t = Date.now(); } save(); }
      } else {
        if (st.q.boss) api.bossResult?.(st.q.qid, ok); // 間違えたら本編の復習へ
        if (!ok && !st.q.boss && st.q.word) { const r = R(), key = `${st.q.deck}|${st.q.word[0]}`; const o = r.wmiss[key] || { n: 0, d: st.q.deck, w: st.q.word }; o.n++; o.t = Date.now(); r.wmiss[key] = o; save(); } // 間違えた単語は復讐の対象に
      }
      const ev = st.event; st.event = null;
      const btns = document.querySelectorAll('#rp-q [data-c]');
      btns.forEach((b) => { b.disabled = true; if (+b.dataset.c === st.q.answer) b.classList.add('ok'); if (st.q.reveal) b.querySelector('.txt').innerHTML = st.q.reveal[+b.dataset.c]; }); // Part 1・2 は答えたあとに選択肢を見せる
      if (btn && !ok) btn.classList.add('ng');
      const evEl = document.getElementById('rp-event'); if (evEl) evEl.hidden = true;
      let line = '';
      if (ok) {
        st.combo++; st.correct++;
        const speed = 1 + (Math.max(0, st.left) / st.total) * 0.4; // 答えの速さ ×1.0〜1.4
        const mult = ev === 'chance' ? 2 : 1;
        const big = speed > 1.3 || st.combo >= 3 || mult > 1;
        anim(document.getElementById('rp-team'), 'atk'); // 仲間が飛びかかる
        await wait(380);
        if (st.over) return;
        if (isRev) { // 復讐：正解すれば一撃で晴らす
          hitEnemy(F.cur, '復讐成功！', true, st.fi);
          const coins = F.w * 20 + (F.nemesis ? 100 : 0); R().coins += coins; st.revCoins = (st.revCoins || 0) + coins;
          const r = R(); r.rev.n++; r.rev.log.unshift({ name: F.label, w: F.w, at: Date.now() }); r.rev.log = r.rev.log.slice(0, 60); save();
          st.revOk = (st.revOk || 0) + 1; hsay('revok'); pop(`🪙+${coins}`, 'info');
          t.forEach((x) => { st.gauge[x.id]++; }); drawTeam();
          line = `<div class="rp-after ok"><b>復讐成功！${F.nemesis ? '（宿敵撃破）' : ''}</b></div>` + await revDetail(i, true);
        } else {
        // 仲間が1人ずつ攻撃。狙った敵が倒れたら、残りの攻撃は自動で次の敵へ
        const bonus = speed * mult * (1 + Math.min(st.combo - 1, 5) * 0.1);
        const lbl = mult > 1 ? 'チャンス！' : st.combo > 1 ? `${st.combo}コンボ` : speed > 1.3 ? 'はやい！' : '';
        for (const [k, x] of t.entries()) {
          if (st.over) return;
          if (foes[st.fi].cur <= 0) { const nx = st.active.find((i) => foes[i].cur > 0); if (nx === undefined) break; st.fi = nx; drawField(); }
          hitEnemy(atkOf(x) * bonus, k === 0 ? lbl : '', big, st.fi);
          const tm = document.querySelectorAll('.rp-tm')[k]; if (tm) { tm.classList.remove('hit1'); void tm.offsetWidth; tm.classList.add('hit1'); }
          await wait(150);
        }
        hsay(st.combo >= 3 ? 'combo' : speed > 1.3 ? 'fast' : big ? 'big' : 'ok');
        t.forEach((x) => { st.gauge[x.id]++; });
        drawTeam();
        line = st.q.boss ? `<div class="exp ok"><span class="verdict">正解</span>${st.q.exp}</div>` : `<div class="rp-after ok"><b>正解！</b><span>${st.q.exp}</span></div>`;
        }
      } else {
        if (!st.inertia) st.combo = 0; st.miss++;
        bgm.sfx('miss');
        anim(document.getElementById('rp-enemy'), 'lunge'); // 敵の反撃
        await wait(380);
        if (st.over) return;
        hitParty(ev === 'charge' ? 2 : 1); pop(ev === 'charge' ? '大ダメージ！' : i < 0 ? '時間切れ' : 'ミス', 'miss');
        if (!st.pinched || st.hp / st.maxHp >= 0.3) hsay(isRev ? 'revng' : i < 0 ? 'timeout' : 'miss');
        if (isRev) { F.cur = 0; F.fled = true; st.revNg = (st.revNg || 0) + 1; pop('また来るぞ…', 'miss'); } // 間違えたら逃げられる（また復讐リストに残る）
        line = isRev ? `<div class="rp-after ng"><b>${i < 0 ? '時間切れ…' : 'ざんねん…'} また逃げられた</b></div>` + await revDetail(i, false) : st.q.boss
          ? `<div class="exp ng"><span class="verdict">${i < 0 ? '時間切れ' : '不正解'}</span>${st.q.exp}</div>`
          : `<div class="rp-after ng"><b>${i < 0 ? '時間切れ…' : 'ざんねん…'}</b><span>${st.q.exp}</span></div>`;
      }
      await enemyTurn();
      if (st.over) return;
      // ホメオスタシス・イナーシャの残りターン
      if (st.homeo) { if (st.hp > 0) { st.hp = Math.min(st.maxHp, st.hp + st.maxHp * 0.05); pop('💚 +5%', 'heal'); } st.homeo--; }
      if (st.inertia) st.inertia--;
      drawHp(); drawBuffs();
      // 自分のペースで「つぎへ」
      const qEl = document.getElementById('rp-q'); if (!qEl) return;
      const label = st.hp <= 0 ? '結果を見る' : foes[st.fi].cur <= 0 ? (left() > 0 ? 'たおした！ つぎへ ▶' : 'たおした！ ▶') : 'つぎへ ▶';
      // 「復讐に送る」：正解した問題でも、まぐれなら自分で復讐リストへ
      const inRev = () => (st.q.boss ? false : !!R().wmiss[`${st.q.deck}|${st.q.word[0]}`]);
      const sendBtn = isRev ? '' : `<button class="rp-btn wide mt rp-send" id="rp-send" ${inRev() ? 'disabled' : ''}>${inRev() ? '👻 復讐リストに入った' : '👻 復讐に送る'}</button>`;
      qEl.insertAdjacentHTML('beforeend', `${line}${sendBtn}<button class="rp-btn gold wide mt" id="rp-next">${label}</button>`);
      const sb = document.getElementById('rp-send');
      if (sb) sb.onclick = () => {
        sb.disabled = true; sb.textContent = '👻 復讐に送った'; bgm.sfx('tap');
        if (st.q.boss) api.sendRevenge?.(st.q.qid);
        else { const r = R(), key = `${st.q.deck}|${st.q.word[0]}`; if (!r.wmiss[key]) r.wmiss[key] = { n: 0, d: st.q.deck, w: st.q.word, t: Date.now() }; save(); }
        toast('👻 復讐タブに送った');
      };
      const nb = document.getElementById('rp-next');
      nb.onclick = () => { nb.disabled = true; afterTurn(); };
      nb.scrollIntoView({ block: 'nearest' });
    }

    function koBook(f) { // 図鑑に登録・目標・素材
      const r = R(), key = `${subj}|${f.name}`; const isNew = !r.zukan[key]; r.zukan[key] = (r.zukan[key] || 0) + 1; if (f.rare) st.rares++; if (!f.boss) bump('zako');
      if (d === 2 && Math.random() < (f.boss ? MAT.bossDrop : MAT.drop)) { r.mats = (r.mats || 0) + 1; st.mats = (st.mats || 0) + 1; setTimeout(() => { toast(`${MAT.icon} ${MAT.name}を手に入れた！`); hsay('mat'); }, 1300); }
      save(); if (isNew) { setTimeout(() => toast(`📖 図鑑に「${f.name}」が登録された！`), 300); setTimeout(() => hsay('zukan'), 900); }
    }
    // 合体演出：倒した5人が集まって光り、巨大な戦士になる（タップでスキップ）
    function gattaiShow(F) {
      return new Promise((done) => {
        const parts = foes.filter((f) => !f.final && !f.gattai).slice(0, 5);
        const el = document.createElement('div');
        el.className = 'rp-gattai';
        el.innerHTML = `<div class="gt-rays"></div>
          <div class="gt-ring">${parts.map((f, k) => `<span class="gt-p" style="--a:${k * 72 - 90}deg;--d:${0.15 + k * 0.18}s">${f.icon}</span>`).join('')}</div>
          <div class="gt-word">合体！</div>
          <div class="gt-boss">${F.icon}</div>
          <div class="gt-name"><small>${parts.length}人の力がひとつに</small><b>${esc(F.name)}</b><em>${esc(F.desc || '')}</em></div>
          <button class="gt-skip">スキップ ▶</button>`;
        (document.getElementById('hk-ov') || document.body).appendChild(el);
        const ts = []; let fin = false;
        const end = () => { if (fin) return; fin = true; ts.forEach(clearTimeout); el.classList.add('out'); setTimeout(() => { el.remove(); done(); }, 300); };
        const at = (ms, fn) => ts.push(setTimeout(fn, ms));
        at(1100, () => bgm.sfx('charge'));
        at(4300, () => { el.classList.add('flash'); bgm.sfx('boom'); document.querySelector('.rp-battle')?.classList.add('quake'); });
        at(5200, () => { el.classList.add('reveal'); bgm.sfx('pose'); });
        at(8200, end);
        el.onclick = end;
      });
    }
    function afterTurn() {
      if (st.over) return;
      if (st.hp <= 0) return finish(false);
      const dead = st.active.filter((i) => foes[i].cur <= 0);
      if (dead.length) {
        dead.forEach((i) => { const en = st.active.length > 1 ? document.querySelector(`[data-tg="${i}"] .rp-enemy`) : document.getElementById('rp-enemy'); if (en) en.classList.add(foes[i].fled ? 'flee' : 'ko'); if (!isRev) koBook(foes[i]); });
        bgm.sfx('ko');
        st.busy = true;
        setTimeout(() => {
          if (st.over) return;
          st.active = st.active.filter((i) => foes[i].cur > 0);
          let comers = [];
          if (!st.active.length) { // ウェーブを全部倒したら次のウェーブ
            if (st.wave + 1 >= st.waves.length) return finish(true);
            st.wave++; st.active = [...st.waves[st.wave]]; comers = [...st.active]; st.active.forEach(setCd);
          }
          if (!st.active.includes(st.fi)) st.fi = st.active[0];
          if (comers.some((i) => foes[i].gattai)) { gattaiShow(foes[comers[0]]).then(() => { if (st.over) return; layout(); hsay('gattai'); nextQuestion(); }); return; }
          layout();
          if (comers.length) { pop(comers.some((i) => foes[i].gattai) ? '合体！' : isMid ? 'つぎの敵！' : waveTxt(), 'info'); if (comers.some((i) => foes[i].gattai)) hsay('gattai'); else if (comers.some((i) => foes[i].rare)) hsay('rare'); }
          nextQuestion();
        }, 650);
        return;
      }
      nextQuestion();
    }

    // ★★★★のスキル：虹色のカットイン
    function cutIn(x) {
      const el = document.createElement('div'); el.className = 'rp-cutin';
      el.innerHTML = `${iconHTML(x.id)}<div><b>${esc(x.skill.name)}</b><small>${esc(x.name)} ・ ${esc(SKILL_DESC[x.skill.kind](x.skill))}</small></div>`;
      document.body.appendChild(el); setTimeout(() => el.remove(), 1600);
    }
    function useSkill(id) {
      const x = t.find((m) => m.id === id); if (!x || st.gauge[id] < x.skill.cost || st.over) return;
      st.gauge[id] = 0;
      const k = x.skill;
      if (k.kind === 'heal') { st.hp = Math.min(st.maxHp, st.hp + st.maxHp * k.pow); pop('回復！', 'heal'); bgm.sfx('heal'); drawHp(); }
      else if (k.kind === 'dmg') {
        bgm.sfx('skill');
        const live = st.active.filter((i) => foes[i].cur > 0);
        if (live.length > 1) live.forEach((i) => hitEnemy((atkOf(x) * k.pow) / live.length, '割り振り', true, i)); // 敵が2体以上なら、ダメージを敵の数で割り振る
        else hitEnemy(atkOf(x) * k.pow, k.name, true);
        if (st.active.some((i) => foes[i].cur <= 0) && !st.busy) { st.busy = true; clearInterval(st.timer); document.querySelectorAll('#rp-q [data-c]').forEach((b) => { b.disabled = true; }); setTimeout(afterTurn, 600); } }
      else if (k.kind === 'time') { st.bonusT += k.pow; st.left += k.pow; st.total += k.pow; pop(`+${k.pow}秒`, 'info'); bgm.sfx('skill'); }
      else if (k.kind === 'guard') { st.guard += k.pow; pop('ガード！', 'info'); bgm.sfx('skill'); drawHp(); }
      else if (k.kind === 'charge') { t.forEach((m) => { if (m.id !== x.id) st.gauge[m.id] = (st.gauge[m.id] || 0) + k.pow; }); pop('⚡ ゲージ+1', 'info'); bgm.sfx('skill'); }
      else if (k.kind === 'nuke') {
        bgm.sfx('boom'); st.active.filter((i) => foes[i].cur > 0).forEach((i, j) => hitEnemy(atkOf(x) * k.pow, j ? '' : k.name, true, i)); // 場の敵全員に、それぞれ6倍（割り振らない）
        const fl = document.querySelector('.rp-field'); if (fl) { fl.classList.remove('nuke'); void fl.offsetWidth; fl.classList.add('nuke'); }
        if (st.active.some((i) => foes[i].cur <= 0) && !st.busy) { st.busy = true; clearInterval(st.timer); document.querySelectorAll('#rp-q [data-c]').forEach((b) => { b.disabled = true; }); setTimeout(afterTurn, 600); } }
      else if (k.kind === 'stardust') { // 主人公 Lv.150：全員に×7、そのかわり仲間のHPが最大値の半分へる
        bgm.sfx('boom'); st.active.filter((i) => foes[i].cur > 0).forEach((i, j) => hitEnemy(atkOf(x) * k.pow, j ? '' : '✨スターダスト', true, i));
        const fl = document.querySelector('.rp-field'); if (fl) { fl.classList.remove('nuke'); void fl.offsetWidth; fl.classList.add('nuke'); }
        setTimeout(() => { if (st.over) return; st.hp -= Math.round(st.maxHp / 2); bgm.sfx('ouch'); pop(`反動 -${Math.round(st.maxHp / 2)}`, 'miss'); drawHp();
          if ((st.hp <= 0 || st.active.some((i) => foes[i].cur <= 0)) && !st.busy) { st.busy = true; clearInterval(st.timer); document.querySelectorAll('#rp-q [data-c]').forEach((b) => { b.disabled = true; }); setTimeout(afterTurn, 600); } }, 450); }
      else if (k.kind === 'homeo') { st.homeo = k.pow; pop('💚 恒常性！', 'heal'); bgm.sfx('heal'); drawBuffs(); }
      else if (k.kind === 'inertia') { st.inertia = k.pow; pop('⚙️ 慣性！', 'info'); bgm.sfx('skill'); drawBuffs(); }
      else if (k.kind === 'healguard') { st.hp = st.maxHp; st.guard += 2; pop('全回復＆ガード！', 'heal'); bgm.sfx('heal'); drawHp(); }
      else if (k.kind === 'hint') {
        const wrong = [...document.querySelectorAll('#rp-q [data-c]')].filter((b) => +b.dataset.c !== st.q.answer && !b.disabled);
        shuffle(wrong).slice(0, k.pow).forEach((b) => { b.disabled = true; b.classList.add('rp-gone'); });
        pop('ひらめき！', 'info'); bgm.sfx('skill');
      }
      if (x.rar === 4) cutIn(x); else toast(`${x.name}「${k.name}」`);
      hsay(x.id === 'hero' ? (k.kind === 'hint' ? 'hint' : k.kind === 'dmg' ? 'shot' : k.kind === 'healguard' ? 'thanks' : k.kind === 'stardust' ? 'stardust' : 'today') : k.kind === 'heal' ? 'heal' : 'skill');
      drawTeam();
    }

    function finish(win) {
      st.over = true; clearInterval(st.timer);
      bgm.stop(); bgm.sfx(win ? 'win' : 'lose');
      if (isRev) {
        const ok = st.revOk || 0, all = foes.length, r = R();
        const oni = rev.rush && ok === all;
        if (oni) r.titles = [...new Set([...(r.titles || []), '復讐の鬼'])];
        bump('correct', st.correct); save(); ctx.renderTop?.();
        body().innerHTML = `<div class="rp-result${ok ? ' win' : ''}">
          <div class="rp-endicon">${ok === all ? '😈' : ok ? '👻' : '💫'}</div>
          <div class="rp-endtitle">${ok === all ? '完全復讐！' : win ? '復讐おわり' : 'GAME OVER'}</div>
          <p class="rp-endsub">晴らした恨み ${ok} / ${all}${st.revNg ? `　逃げられた ${st.revNg}` : ''}</p>
          <div class="rp-rewards"><span>🪙 ${st.revCoins || 0}<em>仕返しボーナス</em></span></div>
          ${oni ? '<p class="rp-unlock">👑 称号「復讐の鬼」を手に入れた！</p>' : ''}
          <p class="rp-starrule">正解した問題は本編の「復習」からも消えた。逃げられた敵は、また復讐リストに残る。</p>
          <div class="row"><button class="rp-btn big" id="rp-back">もどる</button></div></div>`;
        document.getElementById('rp-back').onclick = closeOv;
        return;
      }
      const r = R(), id = `${subj}-${lec}-${n}`, dk = `${id}#${d}`, first = win && !r.stars[dk];
      let coins = 0, exp = 0, food = 0, stars = 0, newBest = false;
      const ups = [];
      bump('correct', st.correct);
      if (win) {
        stars = 1 + (st.hp / st.maxHp >= 0.5 ? 1 : 0) + (st.miss === 0 ? 1 : 0);
        newBest = stars > (r.stars[dk] || 0);
        coins = Math.round((boss ? 120 : 40) * (1 + lvIdx * 0.15) * D.rew) * (first ? 2 : 1) + st.rares * 150;
        exp = Math.round((boss ? 80 : 30) * D.rew * (1 + lvIdx * 0.1)); // 強い章ほど経験値も多め
        food = first ? 2 : 1;
        r.coins += coins; r.clear[id] = 1; if (newBest) r.stars[dk] = stars;
        const grow = (id, o, name) => { if (addExp(id, o, exp)) ups.push(`${name} Lv.${o.lv}`); };
        grow('hero', r.hero, heroName());
        r.party.forEach((pid) => r.owned[pid] && grow(pid, r.owned[pid], CHARS[pid].name));
        addFood(food);
        bump('stage'); if (boss) bump('boss'); if (stars === 3) bump('star3'); if (d) bump('hard');
        if (isMid && stars === 3 && !r.owned[MID[subj].reward]) { const id = MID[subj].reward; r.owned[id] = { lv: Math.max(1, Math.min(RCAP[CHARS[id].rar] || 50, Math.floor(r.hero.lv / 2))), exp: 0 }; /* 主人公のレベルの半分で仲間に */ if (r.party.length < 3) r.party.push(id); st.joined = id; }
      }
      save();
      const nextD = win && d < 2 && first ? DIFF[d + 1] : null;
      body().innerHTML = `<div class="rp-result${win ? ' win' : ''}">
        <div class="rp-endicon">${win ? '🏆' : '💫'}</div>
        <div class="rp-endtitle">${win ? 'STAGE CLEAR!' : 'GAME OVER'}</div>
        ${win ? `<div class="rp-endstars">${[1, 2, 3].map((k) => `<span class="${k <= stars ? 'on' : ''}" style="animation-delay:${k * 0.18}s">★</span>`).join('')}</div>
        <p class="rp-starrule">★1 クリア ${'✓'}　★2 HP半分以上 ${st.hp / st.maxHp >= 0.5 ? '✓' : '✗'}　★3 ノーミス ${st.miss === 0 ? '✓' : `✗（ミス${st.miss}）`}</p>` : ''}
        <p class="rp-hline"><img src="${heroSrc()}" alt=""><span>${esc(pick(HLINE[!win ? 'lose' : stars === 3 ? 'star3' : 'clear']))}</span></p>
        <p class="rp-endsub">${win ? `${esc(foes[foes.length - 1].name)}をたおした！${newBest && !first ? ' ★の記録更新！' : ''}` : `正解 ${st.correct}問。パーティを育ててまた挑戦しよう`}</p>
        ${win ? `<div class="rp-rewards"><span>🪙 ${coins}${first ? '<em>初クリア×2</em>' : ''}${st.rares ? `<em>レア+${st.rares * 150}</em>` : ''}</span><span>EXP ${exp}</span><span>🌰 ${food}</span>${st.mats ? `<span>${MAT.icon} ×${st.mats}</span>` : ''}</div>` : ''}
        ${st.joined ? `<div class="rp-joined">${iconHTML(st.joined)}<b>★★★${esc(CHARS[st.joined].name)} が仲間になった！</b></div>` : isMid && win && !r.owned[MID[subj].reward] ? '<p class="rp-unlock">★3でクリアすると仲間になる！</p>' : ''}
        ${nextD ? `<p class="rp-unlock">${nextD.tag}${nextD.name}が解放された！</p>` : ''}
        ${ups.length ? `<div class="rp-ups"><b>LEVEL UP!</b>${ups.map((u) => `<span>${esc(u)}</span>`).join('')}</div>` : ''}
        <div class="row"><button class="rp-btn gold big" id="rp-again">${win ? 'もう一回' : 'リトライ'}</button><button class="rp-btn big" id="rp-back">マップへ</button></div></div>`;
      document.getElementById('rp-again').onclick = () => startBattle(subj, lec, n, d);
      document.getElementById('rp-back').onclick = closeOv;
    }

    body().onclick = (e) => {
      const sk = e.target.closest('[data-skill]'); if (sk && !sk.disabled) return useSkill(sk.dataset.skill);
      const tg = e.target.closest('[data-tg]'); if (tg && !st.over) { const i = +tg.dataset.tg; if (foes[i].cur > 0 && i !== st.fi) { st.fi = i; bgm.sfx('tap'); drawField(); } return; }
      const c = e.target.closest('#rp-q [data-c]'); if (c && !c.disabled) answer(+c.dataset.c, c);
    };
    layout();
    setTimeout(() => hsay(isRev ? 'rev' : isMid ? 'mid' : foes[0].rare ? 'rare' : boss ? 'boss' : d === 2 ? 'geki' : d === 1 ? 'hard' : 'start'), 200);
    nextQuestion();
  }

  // ヒマコロシの冒険タブから離れたとき
  function leave() { bgm.stop(); }

  // ヒマコロシのホームから使う：主人公・仲間の情報と記録（rec を書きかえるとレベルが変わる）
  function memberInfo(id) {
    const r = R();
    const m = member(id);
    return { ...m, rec: id === 'hero' ? r.hero : r.owned[id], cap: capOf(id) };
  }

  // 音（ヒマコロシ全体で共通）：'silent' | 'bgm'
  const sound = () => R().sound;
  function setSound(v) { R().sound = v; save(); bgm.setEnabled(v === 'bgm'); }
  return { renderQuestTab, leave, memberInfo, resetTab: () => { gtab = 'map'; mapView = 'chapters'; }, sound, setSound };
}
