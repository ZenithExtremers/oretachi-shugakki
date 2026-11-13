// データベース（db）
import groups from './groups.js';
import lessons from './lessons.js';

export default {
  id: 'db',
  name: 'データベース',
  lang: 'sql', // verify.mjs が MariaDB（MySQL 互換）で SQL の結果を確かめる
  lectures: {
    2: '第02回 データベースとは・4大命令',
    3: '第03回 データの検索',
    4: '第04回 検索結果の加工',
    5: '第05回 式・演算子・関数',
    6: '第06回 集計とグループ化',
    7: '第07回 副問合せ',
  },
  types: {
    cloze: '文章の空欄補充',
    term: '用語・ルール',
    output: 'SQLの実行結果',
    fill: 'SQLの空欄・正しいSQL',
  },
  pastExams: [],
  mock: {
    name: '模試（30問）',
    minutes: 60,
    note: '本番の形式が分からないため、C/C++ と同じ5択30問で作っています',
    blueprint: [
      { lecture: 2, n: 5 }, { lecture: 3, n: 6 }, { lecture: 4, n: 5 },
      { lecture: 5, n: 5 }, { lecture: 6, n: 5 }, { lecture: 7, n: 4 },
    ],
  },
  lessons,
  groups,
};
