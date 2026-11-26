// TOEIC リスニング 基礎コース：パートごとの解き方
export default [
  {
    id: 'toeicL-L01', lecture: 1, title: 'Part 1 写真描写のコツ',
    blocks: [
      '写真を見て、流れる4つの英文から写真を最もよく描写しているものを選ぶ。**選択肢は印刷されていない**（音声だけ）。',
      { list: [
        '音声が流れる前に、写真の「人の動作」「物の位置」を見ておく',
        '人がいない写真で **is being ＋過去分詞**（～されているところ）は、たいてい ×',
        '**wearing**（身につけている状態）と **putting on / taking off**（着る・脱ぐ動作）を区別する',
        '写真に写っていない物の名前が出てきたら ×',
      ] },
    ],
    questions: [
      { q: '人がいない写真で「The chairs are being arranged.」は？', choices: ['たいてい正解', 'たいてい不正解'], answer: 1, exp: 'being arranged は「今だれかが並べているところ」。人がいなければ ×。' },
      { q: 'ヘルメットをかぶっている人の写真で正しいのは？', choices: ['He\'s wearing a helmet.', 'He\'s putting on a helmet.'], answer: 0, exp: 'すでにかぶっている状態は wearing。' },
    ],
  },
  {
    id: 'toeicL-L02', lecture: 2, title: 'Part 2 応答問題のコツ',
    blocks: [
      '質問や発言を聞いて、3つの応答から最も適切なものを選ぶ。**質問も選択肢も音声だけ**。',
      { table: { cols: ['最初の語', '答え方'], rows: [['Where', '場所'], ['When', '時'], ['Who', '人'], ['Why', '理由（Because ...）'], ['How long / How much / How many', '期間 / 金額 / 数']] } },
      { list: ['質問と同じ単語・似た音の単語をくり返す選択肢は、ひっかけのことが多い', 'A or B の質問には Yes / No で答えない', '「わかりません、確認します」のような答えも正解になる', 'Why don\'t you ～? は「～したらどう？」という提案'] },
    ],
    questions: [
      { q: '「When does the meeting start?」への応答は？', choices: ['At ten thirty.', 'In room B.', 'Yes, it does.'], answer: 0, exp: 'When → 時間。' },
      { q: '「Should we walk or take a taxi?」に「Yes, we should.」は？', choices: ['適切', '不適切'], answer: 1, exp: 'A or B の選択疑問文には Yes / No で答えない。' },
    ],
  },
  {
    id: 'toeicL-L03', lecture: 3, title: 'Part 3・4 会話と説明文のコツ',
    blocks: [
      '会話（Part 3）や1人の話（Part 4）を聞いて、画面の3つの設問に答える。設問と選択肢は印刷されている。',
      { list: ['**音声が流れる前に設問を読んでおく**（だれが・何を・いつ）', '1問目は最初のほう、3問目は最後のほうにヒントがあることが多い', '「What will the man do next?」は会話の最後を聞く', '言いかえに注意（e-mail → send a message など）'] },
    ],
    questions: [
      { q: '設問はいつ読むのがよい？', choices: ['音声が流れる前', '音声が全部終わってから'], answer: 0, exp: '先に読んで、聞くポイントをしぼる。' },
    ],
  },
];
