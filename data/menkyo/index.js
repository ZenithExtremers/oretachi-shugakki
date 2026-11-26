// 普通自動車免許（仮免・本免の学科試験）。問題はすべてオリジナル（○×）
import questions from './questions.js';
import lessons from './lessons.js';

export default {
  id: 'menkyo',
  name: '普通免許（学科）',
  choices: 2, // 本番と同じ○×（verify.mjs のチェック用）
  fixedChoices: true, // ○ と × の並びは入れかえない
  lectures: {
    1: '仮免 信号・標識・標示',
    2: '仮免 通行のしかた',
    3: '仮免 速度・追い越し・交差点・踏切',
    4: '仮免 歩行者・駐停車・運転者の心得',
    5: '本免 高速道路・夜間・悪天候',
    6: '本免 事故・車の知識',
    7: '本免 危険予測（イラスト）',
  },
  types: {
    signal: '信号',
    sign: '標識・標示',
    rule: '交通ルール',
    num: '数字（距離・速度）',
    care: '心得・車の知識',
    kiken: '危険予測',
  },
  pastExams: [],
  // 本番と同じ問題数・時間・合格ライン
  mocks: [
    { name: '仮免 模試（50問）', minutes: 30, pass: 45, note: '本番と同じ50問・○×。45問以上で合格', blueprint: [{ lecture: 1, n: 13 }, { lecture: 2, n: 10 }, { lecture: 3, n: 13 }, { lecture: 4, n: 14 }] },
    { name: '本免 模試（95問・100点）', minutes: 50, pass: 90, note: '文章90問（各1点）＋イラスト5問（3つ全部正解で2点）。90点以上で合格',
      blueprint: [{ lecture: 1, n: 14 }, { lecture: 2, n: 12 }, { lecture: 3, n: 16 }, { lecture: 4, n: 18 }, { lecture: 5, n: 16 }, { lecture: 6, n: 14 }, { lecture: 7, n: 15 }] },
  ],
  lessons,
  groups: questions,
};
