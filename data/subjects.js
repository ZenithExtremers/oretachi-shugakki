// 科目の一覧。科目を増やすときはここに1行足して、data/<id>/index.js を作る（docs/ADDING.md 参照）
export default [
  {
    id: 'ccpp',
    name: 'C/C++プログラミング',
    mark: 'C++',
    sub: '中間・期末 本番形式（5択）',
    color: '#2563eb',
    module: './ccpp/index.js',
  },
  {
    id: 'db',
    name: 'データベース',
    mark: 'DB',
    sub: '期末確認テスト 1/6 ・ SQL（MySQL）',
    examDate: '2027-01-06',
    color: '#0f766e',
    module: './db/index.js',
  },
  {
    id: 'sd',
    name: 'ソフトウェア設計',
    mark: 'UML',
    sub: '期末確認テスト 1/7 ・ UML の図',
    examDate: '2027-01-07',
    color: '#7c3aed',
    module: './sd/index.js',
  },
];
