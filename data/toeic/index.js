// TOEIC リーディング（Part 5〜7）と単語集。問題・単語はすべてオリジナル（リスニングは data/toeicL）
import part5 from './part5.js';
import part67 from './part67.js';
import lessons from './lessons.js';

export default {
  id: 'toeic',
  name: 'TOEIC リーディング',
  letters: true, // 選択肢の番号を (A)〜(D) で表示
  choices: 4, // 本番と同じ4択（verify.mjs のチェック用）
  lectures: {
    1: 'Lv.1 500点レベル',
    2: 'Lv.2 650点レベル',
    3: 'Lv.3 800点レベル',
    6: 'Part 6 長文穴埋め',
    7: 'Part 7 読解',
  },
  types: {
    pos: '品詞',
    verb: '動詞の形',
    prep: '前置詞・接続詞',
    pron: '代名詞・関係詞',
    vocab: '語彙',
    p6: 'Part 6 長文穴埋め',
    p7: 'Part 7 読解',
  },
  pastExams: [],
  mock: {
    name: 'Part 5 模試（30問）',
    minutes: 10,
    note: '本番の Part 5 と同じ30問・4択。1問20秒が目安',
    blueprint: [{ lecture: 1, n: 10 }, { lecture: 2, n: 10 }, { lecture: 3, n: 10 }],
  },
  mocks: [
    { name: 'リーディング ミニ模試（35問）', minutes: 25, note: 'Part 5 15問・Part 6 8問・Part 7 12問', blueprint: [{ lecture: 1, n: 5 }, { lecture: 2, n: 5 }, { lecture: 3, n: 5 }, { lecture: 6, n: 8 }, { lecture: 7, n: 12 }] },
  ],
  lessons,
  groups: [...part5, ...part67],
};
