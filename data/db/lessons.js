// データベース 基礎コース（レッスン形式）
import { code } from '../lib.js';
import { shohin } from './tables.js';

const small = { name: 'shohin', cols: shohin.cols, rows: shohin.rows };

export default [
  {
    id: 'db-L01', lecture: 2, title: 'データベースとDBMS',
    blocks: [
      '**データベース**（DB）は、検索や書き換えなどのデータ管理を目的として蓄積された情報。',
      '複数の表の形式でデータを管理するものを **リレーショナルデータベース（RDB）** という。',
      { list: ['RDB の中のそれぞれの表を **テーブル** という。', 'テーブルは **行**（row、レコード）と **列**（column、カラム・フィールド）でできている。', '**1つの行が1件のデータ**。列はそのデータの要素。'] },
      'データを操作するには **DBMS**（データベース管理システム）に **SQL** で書いた命令文（SQL文）を送る。DBMS がデータベースファイルを読み書きする。',
      { note: '代表的な RDBMS：Oracle Database、SQL Server、Db2（商用）／ MySQL、MariaDB、PostgreSQL、SQLite（OSS）。授業では MySQL を使う。' },
    ],
    questions: [
      { q: '1件のデータに対応するのは？', choices: ['行', '列', 'テーブル', 'DBMS'], answer: 0, exp: '1つの行（レコード）が1件のデータ。' },
      { q: 'SQL文を受け取ってデータベースを操作するプログラムは？', choices: ['SQL', 'DBMS', 'テーブル', 'カラム'], answer: 1, exp: 'DBMS（database management system）。' },
      { q: 'オープンソース（OSS）の RDBMS は？', choices: ['Oracle Database', 'SQL Server', 'MySQL', 'Db2'], answer: 2, exp: 'MySQL, PostgreSQL, SQLite などが OSS。' },
    ],
  },
  {
    id: 'db-L02', lecture: 2, title: '4大命令',
    blocks: [
      'データ操作は **SELECT・UPDATE・DELETE・INSERT** の4つでほとんどできる（DML、4大命令）。',
      { code: code`
SELECT 列名, … FROM テーブル名 WHERE 条件;
UPDATE テーブル名 SET 列名 = 値, … WHERE 条件;
DELETE FROM テーブル名 WHERE 条件;
INSERT INTO テーブル名 (列名, …) VALUES (値, …);`, numbers: false },
      { note: 'WHERE の無い UPDATE は全行を書き換え、WHERE の無い DELETE は全件削除！' },
      '`SELECT *` はすべての列。テーブルを新しく作るのは `CREATE TABLE`、テーブル自体を消すのは `DROP TABLE`。',
    ],
    questions: [
      { q: 'データを削除する命令は？', choices: ['DROP', 'DELETE', 'REMOVE', 'UPDATE'], answer: 1, exp: 'DELETE FROM テーブル名 WHERE …。' },
      { q: '`INSERT ［ア］ kakeibo VALUES (…)` の［ア］は？', choices: ['FROM', 'INTO', 'SET', 'TO'], answer: 1, exp: 'INSERT INTO。' },
      { q: '`DELETE FROM kakeibo;` を実行すると？', choices: ['エラー', '全データが削除される', '1行目だけ削除', 'テーブルが消える'], answer: 1, exp: 'WHERE が無いので全件削除。' },
    ],
  },
  {
    id: 'db-L03', lecture: 2, title: 'SQLのルールとデータ型',
    blocks: [
      { list: ['文の途中で改行・空白を入れてよい。', '`--` から行末、`/* … */` はコメント。', 'SELECT などの **予約語** は大文字・小文字どちらでもよい。テーブル名や列名には使えない。'] },
      { table: { cols: ['書き方', '扱い'], rows: [['123', '数値'], ["'123'", '文字列'], ["'2024-02-25'", '日付']] } },
      'ダブルクォート（"）は文字列リテラルには使えない。',
      { table: { cols: ['種類', '型'], rows: [['整数', 'INTEGER, INT'], ['小数', 'DECIMAL, NUMERIC, FLOAT, DOUBLE, REAL'], ['文字列（固定長）', 'CHAR'], ['文字列（可変長）', 'VARCHAR'], ['日付と時刻', 'DATE, TIME, DATETIME, TIMESTAMP']] } },
      '**CHAR(10)** は常に10バイト（足りない分は空白で埋める）。**VARCHAR(10)** は中身の長さだけ（最大10）。郵便番号は CHAR、氏名は VARCHAR が向いている。',
    ],
    questions: [
      { q: "`'2024-02-25'` はどう扱われる？", choices: ['数値', '日付', 'コメント', 'エラー'], answer: 1, exp: '一定の形式の文字列は日付情報。' },
      { q: "CHAR(10) に 'SUKKIRI'（7バイト）を入れると？", choices: ['7バイトで格納', '空白3バイトが追加され10バイト', 'エラー', '3バイト切り捨て'], answer: 1, exp: 'CHAR は固定長。' },
      { q: 'SQL のコメントの書き方は？', choices: ['// から行末', '-- から行末', '# だけ', "' から行末"], answer: 1, exp: '-- と /* */。' },
    ],
  },
  {
    id: 'db-L04', lecture: 3, title: 'WHERE句と比較演算子',
    blocks: [
      '`WHERE 条件式` で対象の行を絞り込む。',
      { table: { cols: ['演算子', '意味'], rows: [['=', '等しい'], ['<>（!=）', '等しくない'], ['>', 'より大きい'], ['>=', '以上'], ['<', 'より小さい（未満）'], ['<=', '以下']] } },
      { code: "SELECT * FROM weather WHERE month <> 6;\nSELECT * FROM weather WHERE rainfall < 100;", numbers: false },
      { note: '「以上・以下」は = を含む、「より大きい・未満」は含まない。' },
    ],
    questions: [
      { q: '「最高気温が30以上」は？', choices: ['max_temp > 30', 'max_temp >= 30', 'max_temp => 30', 'max_temp = 30'], answer: 1, exp: '以上は >=。' },
      { q: '「6月以外」は？', choices: ['month = 6', 'month <> 6', 'month >< 6', 'month =! 6'], answer: 1, exp: '<> または !=。' },
      { q: 'rainfall > 200 で 200 の行は？', choices: ['含まれる', '含まれない'], answer: 1, exp: '> は「より大きい」。' },
    ],
  },
  {
    id: 'db-L05', lecture: 3, title: 'NULL・LIKE・BETWEEN・IN',
    blocks: [
      { list: [
        '**IS NULL / IS NOT NULL**：NULL（値が無い）の判定。`= NULL` では判定できない。',
        "**LIKE**：パターン一致。`%` は任意の0文字以上、`_` は任意の1文字。例 `name LIKE '%ー%'`",
        '**BETWEEN A AND B**：A 以上 B 以下（両端を含む）。',
        '**IN (値, …)**：どれかと等しい。`NOT IN` はどれとも等しくない。',
      ] },
      { code: "SELECT * FROM weather WHERE humidity BETWEEN 60 AND 79;\nSELECT * FROM weather WHERE month IN (3, 5, 7);", numbers: false },
    ],
    questions: [
      { q: "`name LIKE 'A_'` に一致するのは？", choices: ['A', 'AB', 'ABC', 'BA'], answer: 1, exp: '_ はちょうど1文字。' },
      { q: '`BETWEEN 60 AND 79` に 79 は含まれる？', choices: ['含まれる', '含まれない'], answer: 0, exp: '両端を含む。' },
      { q: '値が NULL の行を探す条件は？', choices: ['col = NULL', 'col IS NULL', "col = ''", 'col = 0'], answer: 1, exp: 'IS NULL。' },
    ],
  },
  {
    id: 'db-L06', lecture: 3, title: '論理演算子と主キー',
    blocks: [
      '**AND**（かつ）・**OR**（または）・**NOT**（ではない）で条件を組み合わせる。',
      { note: '優先度は NOT ＞ AND ＞ OR。OR を先に計算したいときはカッコで囲む。' },
      { code: "WHERE category = 'B' OR category = 'C' AND price > 3000\n-- これは B OR (C AND price > 3000) の意味", numbers: false, lang: 'sql' },
      '**主キー**：ある1行を特定（識別）するための列。**重複しない**・**NULL にならない**。複数の列を組み合わせたものを **複合主キー** という。',
    ],
    questions: [
      { q: 'AND と OR はどちらが先に評価される？', choices: ['AND', 'OR', '書いた順'], answer: 0, exp: 'AND が優先。' },
      { q: '主キーの性質として正しいのは？', choices: ['重複してよい', 'NULL でもよい', '重複せず NULL にならない', '必ず数値'], answer: 2, exp: '行を識別するため。' },
      { q: '複数の列を組み合わせた主キーは？', choices: ['複合主キー', '外部キー', '副キー', '多重キー'], answer: 0, exp: '複合主キー。' },
    ],
  },
  {
    id: 'db-L07', lecture: 4, title: 'DISTINCT・ORDER BY・LIMIT',
    blocks: [
      { table: small },
      { list: [
        '**DISTINCT**：重複行を除外。`SELECT DISTINCT category FROM shohin;` → A, B, C',
        '**ORDER BY 列 ASC / DESC**：並べ替え（省略すると昇順 ASC）。列番号 `ORDER BY 2` も可。',
        '**LIMIT n OFFSET m**：m 行飛ばして n 行取得（MySQL）。標準 SQL の OFFSET-FETCH は MySQL では使えない。',
      ] },
      { note: 'MySQL では昇順に並べると NULL が先頭に来る。ORDER BY を書かないと並び順は保証されない。' },
    ],
    questions: [
      { q: '上の表で `SELECT name FROM shohin ORDER BY price DESC LIMIT 1;` は？', choices: ['ノートPC', 'USBメモリ', 'モニター', 'マウス'], answer: 0, exp: '一番高いもの。' },
      { q: '重複行を除外するのは？', choices: ['DISTINCT', 'UNIQUE', 'LIMIT', 'EXCEPT'], answer: 0, exp: 'SELECT DISTINCT。' },
      { q: 'ORDER BY price の並び順は？', choices: ['昇順', '降順', 'バラバラ'], answer: 0, exp: '省略時は ASC（昇順）。' },
    ],
  },
  {
    id: 'db-L08', lecture: 4, title: '集合演算子',
    blocks: [
      '2つの SELECT の結果を集合として演算する（列の数と型をそろえる）。',
      { table: { cols: ['演算子', '意味'], rows: [['UNION', '和集合（重複は1つに。残すなら UNION ALL）'], ['EXCEPT（MINUS）', '差集合（前にあって後ろに無い）'], ['INTERSECT', '積集合（両方にある）']] } },
      { code: 'SELECT name FROM tokyo_ten\nUNION\nSELECT name FROM osaka_ten;', numbers: false },
    ],
    questions: [
      { q: '東京店 {りんご,みかん,ぶどう}、大阪店 {みかん,もも,りんご,なし} の INTERSECT は？', choices: ['みかん, りんご', 'ぶどう', 'なし, もも', '全部'], answer: 0, exp: '両方にあるもの。' },
      { q: '同じく 東京店 EXCEPT 大阪店 は？', choices: ['ぶどう', 'なし, もも', 'みかん', 'りんご'], answer: 0, exp: '東京にだけあるもの。' },
      { q: 'UNION で重複行を残したいときは？', choices: ['UNION ALL', 'UNION DISTINCT', 'UNION KEEP', 'INTERSECT'], answer: 0, exp: 'UNION ALL。' },
    ],
  },
  {
    id: 'db-L09', lecture: 5, title: '計算式・AS句・CASE',
    blocks: [
      'SELECT の列に計算式を書ける。`AS` で列に **別名** を付ける。',
      { code: 'SELECT id, am + pm1 + pm2 AS total FROM shiken;', numbers: false },
      { code: code`
SELECT id,
       CASE WHEN am >= 70 THEN '合格'
            ELSE '不合格'
       END AS am_result
  FROM shiken;`, numbers: false },
      '**CASE** は条件に応じて値を変換する。`CASE 列 WHEN 値 THEN … END` の形もある。',
      { note: 'NULL を含む計算の結果は NULL（100 + NULL → NULL）。' },
    ],
    questions: [
      { q: '列に別名を付けるのは？', choices: ['AS', 'SET', 'NAME', 'ALIAS ='], answer: 0, exp: 'AS 別名。' },
      { q: 'am=65 のとき上の CASE の結果は？', choices: ['合格', '不合格', 'NULL', '65'], answer: 1, exp: '70 未満なので ELSE。' },
      { q: '`SELECT 10 * NULL;` の結果は？', choices: ['0', '10', 'NULL', 'エラー'], answer: 2, exp: 'NULL を含む計算は NULL。' },
    ],
  },
  {
    id: 'db-L10', lecture: 5, title: '文字列・数値の関数',
    blocks: [
      { table: { cols: ['関数', '働き', '例'], rows: [
        ['LENGTH', '長さ', "LENGTH('abc') → 3"], ['TRIM', '前後の空白を除去', "TRIM('  a ') → 'a'"], ['REPLACE', '置換', "REPLACE('a/b', '/', '-') → 'a-b'"],
        ['SUBSTRING', '一部を取り出す', "SUBSTRING('abcde', 2, 3) → 'bcd'"], ['CONCAT', '連結', "CONCAT('a', 'b') → 'ab'"],
        ['ROUND', '四捨五入', 'ROUND(12.35, 1) → 12.4'], ['TRUNCATE', '切り捨て（MySQL）', 'TRUNCATE(12.35, 1) → 12.3'], ['POWER', 'べき乗', 'POWER(2, 3) → 8'],
      ] } },
      'SUBSTRING の開始位置は **1** から数える。ROUND・TRUNCATE の桁数を **-1** にすると1の位で丸める（123 → 120）。',
      { note: '日付：CURRENT_DATE（日付）、CURRENT_TIME（時刻）、CURRENT_TIMESTAMP（日時）。型変換：CAST。' },
    ],
    questions: [
      { q: "SUBSTRING('database', 1, 4) は？", choices: ['data', 'atab', 'base', 'dat'], answer: 0, exp: '1文字目から4文字。' },
      { q: 'TRUNCATE(37, -1) は？', choices: ['30', '40', '37', '3'], answer: 0, exp: '1の位を切り捨て。' },
      { q: '現在の日付を求めるのは？', choices: ['CURRENT_DATE', 'CURRENT_TIME', 'NOW_DAY', 'TODAY()'], answer: 0, exp: 'CURRENT_DATE。' },
    ],
  },
  {
    id: 'db-L11', lecture: 6, title: '集計関数',
    blocks: [
      { table: { cols: ['関数', '求めるもの'], rows: [['SUM', '合計'], ['MAX', '最大値'], ['MIN', '最小値'], ['AVG', '平均'], ['COUNT', '行数']] } },
      '集計関数は複数の行をまとめて **1つの値** を返す。',
      { list: ['SUM・MAX・MIN・AVG は **NULL を無視** する。', '`COUNT(*)` は行数（NULL の行も数える）、`COUNT(列名)` は NULL を数えない。', '**WHERE 句には集計関数を書けない**。'] },
    ],
    questions: [
      { q: 'stock が 5, 40, NULL の3行。COUNT(stock) は？', choices: ['3', '2', '45', '0'], answer: 1, exp: 'NULL は数えない。' },
      { q: '同じく AVG(stock) は？', choices: ['15', '22.5', '45', 'NULL'], answer: 1, exp: 'NULL を無視して (5+40)/2。' },
      { q: '同じく COUNT(*) は？', choices: ['3', '2', '1', '0'], answer: 0, exp: '行数。' },
    ],
  },
  {
    id: 'db-L12', lecture: 6, title: 'GROUP BY と HAVING',
    blocks: [
      '**GROUP BY 列** で同じ値の行をグループにまとめ、グループごとに集計する。',
      { code: code`
SELECT name, MAX(max_temp)
  FROM kion
 GROUP BY name
HAVING MAX(max_temp) >= 33;`, numbers: false },
      '**HAVING** はグループ集計 **後** の絞り込み（集計結果を条件にできる）。**WHERE** は集計 **前** の行の絞り込み。',
      { note: '句の順番：SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY' },
    ],
    questions: [
      { q: '「入室回数が10回を超える社員」を絞り込むのは？', choices: ['WHERE COUNT(*) > 10', 'HAVING COUNT(*) > 10', 'ORDER BY COUNT(*) > 10', 'GROUP BY COUNT(*) > 10'], answer: 1, exp: '集計結果の条件は HAVING。' },
      { q: 'WHERE と GROUP BY、先に書くのは？', choices: ['WHERE', 'GROUP BY'], answer: 0, exp: 'WHERE → GROUP BY → HAVING。' },
      { q: 'GROUP BY name で東京・札幌・那覇の3都市。結果は何行？', choices: ['1行', '3行', '6行'], answer: 1, exp: 'グループの数だけ。' },
    ],
  },
  {
    id: 'db-L13', lecture: 7, title: '副問合せ（1）値の代わり',
    blocks: [
      'SQL の中のカッコで囲んだ SELECT を **副問合せ** という。**副問合せが先に** 実行され、その結果が外側の SQL に埋め込まれる。',
      { code: code`
SELECT name FROM shohin
 WHERE price = (SELECT MAX(price) FROM shohin);
-- ↓ 副問合せが先に 98000 になる
SELECT name FROM shohin WHERE price = 98000;`, numbers: false },
      '副問合せが **複数の値** を返すときは `=` ではなく **IN**（や ANY・ALL）を使う。= で比べるとエラー。',
    ],
    questions: [
      { q: '副問合せはいつ実行される？', choices: ['外側より先', '外側の後', '同時'], answer: 0, exp: '先に実行されて結果が埋め込まれる。' },
      { q: '副問合せが3行を返す。使える演算子は？', choices: ['=', 'IN', '>', '<>'], answer: 1, exp: '複数の値は IN。' },
      { q: '平均より高い商品を探す WHERE は？', choices: ['price > AVG(price)', 'price > (SELECT AVG(price) FROM shohin)', 'HAVING price > AVG', 'price IN AVG(price)'], answer: 1, exp: 'WHERE に集計関数は書けないので副問合せを使う。' },
    ],
  },
  {
    id: 'db-L14', lecture: 7, title: '副問合せ（2）表の代わり・NULL',
    blocks: [
      'FROM 句に副問合せを書くと、その結果を **表** として使える（別名を付ける）。',
      { code: code`
SELECT AVG(t.total)
  FROM (SELECT category, SUM(stock) AS total
          FROM shohin GROUP BY category) AS t;`, numbers: false },
      { note: '副問合せの結果に NULL が含まれると、NOT IN は真にならず結果が0行になる。NULL を除く（WHERE … IS NOT NULL）などの注意が必要。' },
      '副問合せは SELECT だけでなく UPDATE・DELETE・INSERT の中でも使える。',
    ],
    questions: [
      { q: 'FROM 句の副問合せの結果は何として扱われる？', choices: ['1つの値', '表', 'エラー', '列名'], answer: 1, exp: '表として扱う。' },
      { q: 'NOT IN (5, 40, NULL) で絞り込むと？', choices: ['NULL 以外で比較', '結果が0行になる', 'エラー', '全行'], answer: 1, exp: 'NULL が含まれると NOT IN は真にならない。' },
      { q: '副問合せが使えないのは？', choices: ['SELECT', 'UPDATE', 'INSERT', 'どれでも使える'], answer: 3, exp: 'どの命令でも使える。' },
    ],
  },
  {
    id: 'db-L15', lecture: 8, title: '結合（1）外部キーと JOIN',
    blocks: [
      'データは**複数のテーブルに分けて**格納するのが定石。人間には分かりにくいが、同じ情報をくり返し登録しなくてよく、安全・確実・高速に管理できる。',
      { table: { cols: ['用語', '意味'], rows: [
        ['リレーションシップ', '2つのテーブルの間の関連'],
        ['外部キー', '他テーブルの行を指す値を入れる列'],
        ['結合（join）', '複数テーブルから1つの結果表を得る'],
      ] } },
      { code: code`
SELECT 日付, 名前 AS 費目, メモ
  FROM 家計簿                       -- 左表（主役）
  JOIN 費目                         -- 右表
    ON 家計簿.費目ID = 費目.ID      -- 結合条件`, numbers: false },
      '結合は左右を単純にくっつけるのではなく、**左表の各行について、結合条件に合う右表の行を探して1つずつつなぐ**。',
    ],
    questions: [
      { q: '他のテーブルの行を指す値を入れる列は？', choices: ['主キー', '外部キー', '結合条件', '別名'], answer: 1, exp: '外部キー（foreign key）。' },
      { q: '結合条件を書く句は？', choices: ['JOIN', 'ON', 'WHERE', 'AS'], answer: 1, exp: 'JOIN 右表 ON 結合条件。' },
      { q: '結合の主役（左表）は？', choices: ['FROM 句の表', 'JOIN 句の表', '行の多い表', 'どちらも対等'], answer: 0, exp: 'FROM 句の表が左表。' },
    ],
  },
  {
    id: 'db-L16', lecture: 8, title: '結合（2）相手がいない・重複する',
    blocks: [
      { list: [
        '右表につなぐ行が**2つ以上**ある → 左表の行がコピーされ、結果の行数が**増える**。',
        '右表に相手が**ない**、または結合条件の列が **NULL** → その行は結果から**消える**（NULL はどの値とも等しくならない）。',
      ] },
      '消えると困るときは**外部結合**を使う。相手がない行の、反対側の列はすべて NULL になる。',
      { table: { cols: ['書き方', '必ず全部出る表'], rows: [
        ['JOIN（内部結合）', 'なし（相手がない行は消える）'],
        ['LEFT JOIN', '左表（FROM の表）'],
        ['RIGHT JOIN', '右表（JOIN の表）'],
        ['FULL JOIN', '左右の両方'],
      ] } },
      { note: 'LEFT JOIN は LEFT OUTER JOIN と書いてもよい。' },
    ],
    questions: [
      { q: '左表5行、相手がない行1つ・NULLの行1つ。JOIN の結果は（重複なし）？', choices: ['5行', '3行', '4行', '0行'], answer: 1, exp: '2行が消える。' },
      { q: '同じ条件で LEFT JOIN だと？', choices: ['5行', '3行', '4行', '7行'], answer: 0, exp: '左表は全部出る。' },
      { q: '右表で、つなぐ相手が2行ある左表の行は？', choices: ['2行になる', '消える', '1行だけつなぐ', 'エラー'], answer: 0, exp: '左表の行をコピーしてつなぐ。' },
    ],
  },
  {
    id: 'db-L17', lecture: 8, title: '結合（3）別名・3表・自己結合',
    blocks: [
      '同じ名前の列が両方にあるときは **テーブル名.列名** で区別する。**AS** で別名を付けると短く書ける。',
      { code: code`
SELECT 日付, K.メモ, H.メモ
  FROM 家計簿 AS K
  JOIN 費目 AS H ON K.費目ID = H.ID`, numbers: false },
      { list: [
        '**3表以上**：JOIN 〜 ON 〜 をくり返す。前から順に1つずつ結合される。',
        '**副問合せの結果**とも結合できる：JOIN (SELECT …) AS 別名 ON …',
        '**自己結合**（再帰結合）：同じテーブルに**異なる別名**を付けて結合する。',
      ] },
      { code: code`
-- 社員とその上司の名前
SELECT a.name, b.name AS jyoshi
  FROM shain AS a
  LEFT JOIN shain AS b ON a.jyoshi_id = b.number`, numbers: false },
    ],
    questions: [
      { q: '自己結合で必要なのは？', choices: ['異なる別名', 'FULL JOIN', '副問合せ', 'GROUP BY'], answer: 0, exp: 'どちらの列か区別するため。' },
      { q: '3つのテーブルの結合はどう処理される？', choices: ['一度に3つ', '前から順に1つずつ', '後ろから順に', 'できない'], answer: 1, exp: '前から順に1つずつ。' },
      { q: 'JOIN の後に副問合せを書くときに必要なのは？', choices: ['別名', 'ORDER BY', 'DISTINCT', '何もいらない'], answer: 0, exp: 'AS 別名を付ける。' },
    ],
  },
];
