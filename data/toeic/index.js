// TOEIC（Part 5 対策と単語集）。問題・単語はすべてオリジナル
import part5 from './part5.js';
import lessons from './lessons.js';

export default {
  id: 'toeic',
  name: 'TOEIC',
  choices: 4, // 本番と同じ4択（verify.mjs のチェック用）
  lectures: {
    1: 'Lv.1 500点レベル',
    2: 'Lv.2 650点レベル',
    3: 'Lv.3 800点レベル',
  },
  types: {
    pos: '品詞',
    verb: '動詞の形',
    prep: '前置詞・接続詞',
    pron: '代名詞・関係詞',
    vocab: '語彙',
  },
  pastExams: [],
  mock: {
    name: 'Part 5 模試（30問）',
    minutes: 10,
    note: '本番の Part 5 と同じ30問・4択。1問20秒が目安',
    blueprint: [{ lecture: 1, n: 10 }, { lecture: 2, n: 10 }, { lecture: 3, n: 10 }],
  },
  lessons,
  groups: part5,
};
