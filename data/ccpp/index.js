// C/C++プログラミング（ccpp）
// 問題ファイルを増やしたら下の import と groups に足す
import midterm2026 from './midterm2026.js';
import l1 from './l1.js';
import l2 from './l2.js';
import l3 from './l3.js';
import l4 from './l4.js';
import l5 from './l5.js';
import l6 from './l6.js';
import lessons from './lessons.js';

export default {
  id: 'ccpp',
  name: 'C/C++プログラミング',
  lang: 'cpp', // tools/verify.mjs が g++ で実行チェックする
  yen: true,   // 講義資料と同じく \ を ¥ で表示する
  lectures: {
    1: '第1回 コンパイラ言語・Hello World',
    2: '第2回 変数と型・cin・if',
    3: '第3回 switch・ループ',
    4: '第4回 配列',
    5: '第5回 関数・再帰・ビット演算',
    6: '第6回 ポインタ・new/delete',
  },
  types: {
    cloze: '文章の空欄補充',
    meaning: '行の意味',
    output: '実行結果',
    fill: '???? に入るもの',
    unexpected: '想定外の入力',
    shape: 'ループの出力の形',
    array: '配列の中身',
    behavior: '動作の説明',
  },
  // 本番の過去問（「本番の問題」画面に出る）
  pastExams: [
    { source: 'midterm2026', name: '2026年度 中間テスト', note: '解答は公式ではありません' },
  ],
  // 模試：本番（2026中間）と同じ配分
  mock: {
    name: '模試（30問）',
    minutes: 60,
    blueprint: [
      { lecture: 1, n: 7 },
      { lecture: 2, n: 8 },
      { lecture: 3, n: 6 },
      { lecture: 4, n: 3 },
      { lecture: 5, n: 3 },
      { lecture: 6, n: 3 },
    ],
  },
  lessons,
  groups: [...l1, ...l2, ...l3, ...l4, ...l5, ...l6, ...midterm2026],
};
