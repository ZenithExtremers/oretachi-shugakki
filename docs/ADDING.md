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

## レッスン（基礎コース）
`data/<id>/lessons.js` に `{ id, lecture, title, blocks: [...], questions: [...] }` を並べる。
blocks は 文字列（**太字** と `コード` が使える）／ `{ code, lang, numbers }` ／ `{ table: { cols, rows } }` ／ `{ svg }` ／ `{ list: [...] }` ／ `{ note }` ／ `{ h }`。
レッスンの問題は選択肢 2〜5 個。全問正解でクリアし、次のレッスンが開く。

## データベース（SQL）の問題
- 表は `data/db/tables.js` に書く。大問に `tables: [表]` を付けると画面に表が出て、verify.mjs が MariaDB に同じ表を作る。
- 実行結果を選ぶ問題は `lang: 'sql', tableChoices: true` にして、選択肢を `"列|列\n値|値"` の形で書く。`code`（または `sql`）を実行した結果と正解の選択肢を照らし合わせる。

## UML の図
`data/uml.js` の `usecase` / `classDiagram` / `sequence` / `communication` で SVG を作り、大問の `diagram` やレッスンの `{ svg }` に入れる（例：`data/sd/diagrams.js`）。

## パッチノートとバージョン
更新したら `data/patchnotes.js` の先頭に `{ version, date, items }` を足す。先頭のバージョンがアプリのバージョンとしてホームと設定に表示される。
番号：科目や大きな機能の追加 → 真ん中を上げる（1.4.0）、問題の追加・修正や小さな変更 → 右端を上げる（1.3.2）。あわせて `sw.js` の `CACHE` の番号も上げる。

## ヒマコロシ（himakoroshi.js）
- 画面は `#/hima`。保存は別キー `oretachi:hima`（本編の `oretachi:v1` とは別）。クラス名は `hk-` で始める。
- 本編の正解でエサを渡すのは `rewardCorrect(key)`（app.js の `record()` と基礎コースの `case 'lans'` から呼ぶ）。同じ key は1日1回まで。
- 講義中に使うので音は鳴らさない。
