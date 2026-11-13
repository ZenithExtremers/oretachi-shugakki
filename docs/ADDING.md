# 問題・科目の追加のしかた

## しくみ
- `data/subjects.js` … 科目の一覧（ホーム画面に出る）
- `data/<科目id>/index.js` … その科目の回・問題の型・模試の配分・問題ファイルのまとめ
- `data/<科目id>/*.js` … 問題本体（大問の配列）
- `tools/verify.mjs` … データのチェック。C++ の科目は g++ でコンパイル・実行して答えを確認する

```
node tools/verify.mjs        # 全科目
node tools/verify.mjs ccpp   # 科目を指定
```

## 大問（group）の書き方
```js
{
  id: 'ccpp-l2-g01',          // 全体で重複しない
  lecture: 2,                 // index.js の lectures のキー
  type: 'output',             // index.js の types のキー
  source: 'midterm2026',      // 本番の問題のときだけ（pastExams の source）。省略＝オリジナル
  no: '問8〜11',              // 本番の問題番号（任意）
  title: '型の違いと割り算',
  intro: '前置きの文（任意）',
  passage: '空欄補充の文章（任意）。［問1］のように全角かっこで空欄',
  code: code`...`,            // 行番号付きで表示。???????? は黄色でハイライト
  fill: ['n > 0'],            // ???????? を順に埋める正解（実行チェック用）
  run: [{ stdin: '1\n3\n', contains: ['zは0です.'], notContains: [] }],
  sharedChoices: [...5つ],    // 大問の全小問で同じ選択肢を使うとき（空欄補充など）
  sharedMono: true,           // 選択肢を等幅で表示
  questions: [
    {
      id: 'ccpp-l2-q01',
      q: '14行目の ???????? に入るものはどれか。',  // 「N行目」はタップでコードの該当行へ飛ぶ
      line: 14, lineHas: 'if (????????)',          // 行番号のずれをチェック（任意）
      choices: [...5つ],                           // sharedChoices が無いとき
      mono: true,                                   // 選択肢がコードや図形のとき
      answer: 0,                                    // choices の何番目が正解か（0始まり）
      exp: '解説',
    },
  ],
}
```

## 決まりごと
- 選択肢は必ず5つ・すべて違う内容・正解は1つだけ。
- 実行結果を問う問題は `run` を書いて、verify で g++ の出力と照らし合わせる。
- 出力の改行は選択肢の中で `(改行)` と書く。
- 選択肢は表示時にシャッフルされる（本番の問題は設定でオンにしたときだけ）。

## 科目を増やす
1. `data/<id>/index.js` を作る（ccpp をまねる。`lang` は C++ なら `'cpp'`、それ以外は書かない）
2. `data/subjects.js` に1行足す
3. `sw.js` の `CACHE` の番号を上げる（任意。network-first なので無くても更新される）
