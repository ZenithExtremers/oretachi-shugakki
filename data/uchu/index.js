// 宇宙知識（地球と月 → 惑星 → 恒星 → 銀河 → 宇宙の始まり → 宇宙開発）。問題はすべてオリジナル（4択）
import questions from './questions.js';
import lessons from './lessons.js';

export default {
  id: 'uchu',
  name: '宇宙知識',
  choices: 4, // 4択（verify.mjs のチェック用）
  lectures: {
    1: '地球と月',
    2: '太陽系の惑星',
    3: '太陽と恒星・星座',
    4: '銀河と宇宙の大きさ',
    5: '宇宙の始まりと不思議',
    6: '宇宙開発と宇宙飛行士',
  },
  types: {
    num: '数字',
    know: 'しくみ',
    name: '名前',
    trivia: '豆知識',
  },
  pastExams: [],
  mocks: [
    { name: '宇宙知識 模試（30問）', minutes: 20, pass: 24, note: '全6回から5問ずつ。24問（8割）以上で合格', blueprint: [1, 2, 3, 4, 5, 6].map((lecture) => ({ lecture, n: 5 })) },
  ],
  lessons,
  groups: questions,
};
