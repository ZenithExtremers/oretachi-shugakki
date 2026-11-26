// TOEIC リスニング（Part 1〜4）。問題はすべてオリジナル。英語は端末の読み上げで流す
import questions from './questions.js';
import lessons from './lessons.js';

export default {
  id: 'toeicL',
  name: 'TOEIC リスニング',
  choicesIn: [3, 4], // Part 2 は3択、ほかは4択（verify.mjs のチェック用）
  fixedChoices: true, // 音声の (A)(B)(C)(D) と並びを合わせるため入れかえない
  letters: true, // 選択肢の番号を (A)〜(D) で表示
  lectures: {
    1: 'Part 1 写真描写',
    2: 'Part 2 応答問題',
    3: 'Part 3 会話問題',
    4: 'Part 4 説明文問題',
  },
  types: { p1: '写真描写', p2: '応答', p3: '会話', p4: '説明文' },
  pastExams: [],
  mocks: [
    { name: 'リスニング ミニ模試（30問）', minutes: 25, note: 'Part 1 4問・Part 2 8問・Part 3 9問・Part 4 9問', blueprint: [{ lecture: 1, n: 4 }, { lecture: 2, n: 8 }, { lecture: 3, n: 9 }, { lecture: 4, n: 9 }] },
  ],
  lessons,
  groups: questions,
};
