// ソフトウェア設計（sd）
import groups from './groups.js';
import lessons from './lessons.js';

export default {
  id: 'sd',
  name: 'ソフトウェア設計',
  lectures: {
    1: '第01回 オブジェクト指向とUML',
    2: '第02回 ユースケース図',
    4: '第04回 オブジェクト図',
    5: '第05回 クラス図',
    6: '第06回 シーケンス図',
    7: '第07回 コミュニケーション図',
  },
  types: {
    cloze: '文章の空欄補充',
    term: '用語・表記法',
    diagram: '図を読む',
  },
  pastExams: [],
  mock: {
    name: '模試（30問）',
    minutes: 60,
    note: '本番の形式が分からないため、C/C++ と同じ5択30問で作っています',
    blueprint: [
      { lecture: 1, n: 5 }, { lecture: 2, n: 5 }, { lecture: 4, n: 4 },
      { lecture: 5, n: 6 }, { lecture: 6, n: 5 }, { lecture: 7, n: 5 },
    ],
  },
  lessons,
  groups,
};
