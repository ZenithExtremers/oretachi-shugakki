// TOEIC 基礎コース：Part 5 の解き方（文法）＋ 単語集（20語ずつ）
import { ALL } from './words.js';

// 単語のレッスン：20語の一覧と、確認問題3問（英語 → 意味の4択）
function wordLessons() {
  const out = [];
  let seed = 7;
  const rnd = (n) => { seed = (seed * 9301 + 49297) % 233280; return Math.floor((seed / 233280) * n); }; // 毎回同じ問題にする
  for (const [lv, words] of Object.entries(ALL)) {
    for (let u = 0; u < words.length / 20; u++) {
      const ws = words.slice(u * 20, u * 20 + 20);
      const qs = [0, 7, 14].map((k, qi) => {
        const w = ws[k + rnd(6)];
        const others = ws.filter((x) => x !== w);
        const pick = [];
        while (pick.length < 3) { const x = others[rnd(others.length)]; if (!pick.includes(x)) pick.push(x); }
        const choices = pick.map((x) => x[1]);
        const answer = (qi + u) % 4;
        choices.splice(answer, 0, w[1]);
        return { q: `**${w[0]}** の意味は？`, choices, answer, exp: `${w[0]}：${w[1]}` };
      });
      out.push({
        id: `toeic-W${lv}-${u + 1}`, lecture: +lv, title: `単語 ${u * 20 + 1}〜${u * 20 + ws.length}`,
        blocks: [
          '声に出して読みながら覚えよう。ヒマコロシの「単語」タブや単語クイズでも練習できる。',
          { table: { cols: ['英語', '意味'], rows: ws.map(([a, b]) => [a, b]) } },
        ],
        questions: qs,
      });
    }
  }
  return out;
}

const grammar = [
  {
    id: 'toeic-G1', lecture: 1, title: 'Part 5 の解き方',
    blocks: [
      'Part 5 は **短い英文の空所に入る語句を4つから選ぶ** 問題。本番は30問。**1問20秒** を目安に、迷ったら印をつけて先へ進む。',
      { list: [
        'まず **選択肢を見る**。同じ単語の形ちがい（inform / informative / information）なら **品詞の問題** → 空所の前後だけで解ける。',
        '動詞の形ちがいなら **時制・受け身・主語との一致** を見る（yesterday、since、next week などがヒント）。',
        '意味のちがう単語が並んでいたら **語彙の問題** → 文全体を読む。',
      ] },
      { note: '品詞の問題は全文を訳さなくても解ける。時間をかせげる問題から確実に取ろう。' },
    ],
    questions: [
      { q: '選択肢が careful / care / carefully / caring のとき、まず考えることは？', choices: ['空所に入る品詞', '文全体の和訳', '話の流れ', '時制'], answer: 0, exp: '形ちがいの選択肢は品詞の問題。' },
      { q: 'Part 5 の1問の目安時間は？', choices: ['約20秒', '約1分', '約2分', '約5秒'], answer: 0, exp: '30問を10分程度で解くのが目標。' },
      { q: '選択肢に意味のちがう単語が並ぶときは？', choices: ['語彙の問題なので文全体を読む', '前後1語だけ見ればよい', '必ず一番長い語を選ぶ', '品詞で決まる'], answer: 0, exp: '語彙の問題は文の意味から選ぶ。' },
    ],
  },
  {
    id: 'toeic-G2', lecture: 1, title: '品詞：空所の前後で決まる',
    blocks: [
      { table: { cols: ['空所の場所', '入る品詞', '例'], rows: [
        ['冠詞・所有格の後、前置詞の前', '名詞', 'the ____ of → opening'],
        ['冠詞と名詞の間', '形容詞', 'a very ____ presentation → informative'],
        ['be 動詞の後（補語）', '形容詞', 'were very ____ → helpful'],
        ['動詞・文全体を修飾', '副詞', 'read it ____ → carefully'],
      ] } },
      { list: ['-tion, -ment, -ness, -ity → 名詞', '-ive, -ful, -ous, -able, -al → 形容詞', '-ly → 副詞（ただし friendly, costly は形容詞）'] },
    ],
    questions: [
      { q: 'a ____ decision（冠詞と名詞の間）に入るのは？', choices: ['形容詞', '副詞', '動詞', '名詞'], answer: 0, exp: '名詞を修飾するのは形容詞。' },
      { q: 'Sales increased ____.（自動詞の後）に入るのは？', choices: ['副詞', '形容詞', '名詞', '代名詞'], answer: 0, exp: '動詞を修飾するのは副詞。' },
      { q: '-ment で終わる単語の品詞は？', choices: ['名詞', '形容詞', '副詞', '動詞'], answer: 0, exp: 'agreement, payment など。' },
    ],
  },
  {
    id: 'toeic-G3', lecture: 2, title: '動詞の形・前置詞と接続詞',
    blocks: [
      { list: [
        '**since ～ / for ～（期間）** → 現在完了（has worked）',
        '**主語が「される」側** → 受け身（be ＋ 過去分詞）',
        '**if / when 節** の中は、未来のことでも現在形',
        '**consider, finish, avoid** ＋ -ing ／ **ask 人 to do, plan to do**',
      ] },
      { table: { cols: ['意味', '前置詞（＋名詞）', '接続詞（＋主語＋動詞）'], rows: [
        ['～にもかかわらず', 'despite / in spite of', 'although / though'],
        ['～のために（理由）', 'because of / due to', 'because / since'],
        ['～の間', 'during', 'while'],
      ] } },
      { note: '空所の後ろが「名詞だけ」か「主語＋動詞」かを見れば、前置詞か接続詞かが決まる。' },
    ],
    questions: [
      { q: '____ the rain, the event was held.（後ろが名詞）', choices: ['Despite', 'Although', 'While', 'Because'], answer: 0, exp: '名詞の前は前置詞。' },
      { q: 'He has lived here ____ 2020.', choices: ['since', 'for', 'during', 'by'], answer: 0, exp: '起点は since。' },
      { q: 'They are considering ____ the plan.', choices: ['changing', 'to change', 'change', 'changed'], answer: 0, exp: 'consider ＋ -ing。' },
    ],
  },
  {
    id: 'toeic-P6', lecture: 6, title: 'Part 6 長文穴埋めのコツ',
    blocks: [
      'メールやお知らせの中に空欄が4つ。そのうち1つは **文を入れる問題**。',
      { list: ['空欄の前後の文だけでなく、**文章全体の流れ**（時制・話題）を見る', 'However / Therefore / For example など、つなぎの言葉は前後の関係（逆接・結果・例）で選ぶ', '文を入れる問題は、**次の文とつながるか** を確かめる'] },
    ],
    questions: [
      { q: '「業者が毎晩掃除します。［ ］、日中もきれいに使ってください。」に入るのは？', choices: ['However', 'For example', 'Therefore', 'Instead of'], answer: 0, exp: '前と反対の内容を続ける → However（しかし）。' },
    ],
  },
  {
    id: 'toeic-P7', lecture: 7, title: 'Part 7 読解のコツ',
    blocks: [
      'お知らせ・メール・広告・チャット・記事などを読んで設問に答える。',
      { list: ['**先に設問を読んで**、探す情報を決めてから本文を読む', 'NOT 問題（本文に書かれていないもの）は、選択肢を1つずつ本文と照らす', 'チャットの「意図」問題は、**直前の相手の発言** を見る', '言いかえに注意（hire ＝ employ、free ＝ at no cost など）'] },
    ],
    questions: [
      { q: '「What is NOT mentioned ～?」の答え方は？', choices: ['本文に書かれていないものを選ぶ', '本文に書かれているものを選ぶ'], answer: 0, exp: 'NOT 問題は、本文にないものが正解。' },
    ],
  },
];

export default [...grammar, ...wordLessons()].sort((a, b) => a.lecture - b.lecture);
