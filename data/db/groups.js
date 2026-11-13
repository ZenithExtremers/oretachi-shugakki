// データベース 本番形式（5択）の問題。講義資料（第02〜07回）の内容をもとにしたオリジナル問題
// 実行結果の選択肢は "列|列\n値|値" の形。verify.mjs が MariaDB で実行して正解を確かめる
import { code } from '../lib.js';
import { kakeibo, weather, shohin, tokyo, osaka, shiken, member, kion, nyushitsu } from './tables.js';

const R = { lang: 'sql', tableChoices: true }; // 実行結果を表で選ぶ問題

export default [
  // ===== 第02回 データベースとは・基本文法と4大命令 =====
  {
    id: 'db-l2-g01', lecture: 2, type: 'cloze', title: 'データベースとDBMS',
    intro: '次の文章の空欄［A］〜［E］に入る語句を選べ。',
    passage: '複数の表の形式でデータを管理するデータベースをリレーショナルデータベース（RDB）という。RDB に入っているそれぞれの表を［A］という。［A］は［B］（row）と［C］（column）で構成され、1つの［B］が1件のデータに対応する。データベースの中のデータを操作するには、［D］と呼ばれるプログラムに対して、［E］で書かれた命令文を送信する。［D］は届いた命令に従ってデータベースファイルの内容を検索したり書き換えたりする。',
    sharedChoices: ['列', 'SQL', 'テーブル', 'DBMS', '行'],
    questions: [
      { id: 'db-l2-q01', q: '［A］', answer: 2, exp: 'RDB には複数の表が入っており、それぞれの表をテーブル (table) という。' },
      { id: 'db-l2-q02', q: '［B］', answer: 4, exp: '1つの行が1件のデータに対応する。行はレコードとも呼ぶ。' },
      { id: 'db-l2-q03', q: '［C］', answer: 0, exp: '列はそのデータの要素に対応する。列はカラムやフィールドとも呼ぶ。' },
      { id: 'db-l2-q04', q: '［D］', answer: 3, exp: 'データベース管理システム (DBMS: database management system)。' },
      { id: 'db-l2-q05', q: '［E］', answer: 1, exp: 'DBMS には SQL で書かれた命令文（SQL文）を送信する。' },
    ],
  },
  {
    id: 'db-l2-g02', lecture: 2, type: 'term', title: '4大命令',
    tables: [kakeibo],
    questions: [
      {
        id: 'db-l2-q06', q: 'テーブルにデータ（行）を追加する命令はどれか。',
        choices: ['SELECT', 'UPDATE', 'DELETE', 'INSERT', 'CREATE'],
        answer: 3, exp: 'INSERT INTO テーブル名 (列名…) VALUES (値…)。SELECT・UPDATE・DELETE・INSERT の4つを DML（4大命令）という。',
      },
      {
        id: 'db-l2-q07', q: '次の SQL の説明として適切なものはどれか。', code: 'DELETE FROM kakeibo;',
        choices: ['kakeibo テーブルを削除する', 'kakeibo テーブルの全データ（全行）を削除する', 'kakeibo テーブルの1行目だけを削除する', 'WHERE が無いのでエラーになる', '何もしない'],
        answer: 1, exp: 'WHERE の無い DELETE 文は全件削除！テーブル自体を消すのは DROP TABLE。',
      },
      {
        id: 'db-l2-q08', q: '費目が「食費」の行の出金額を 400 に変更する SQL はどれか。', mono: true,
        choices: ["UPDATE kakeibo SET withdraw = 400 WHERE himoku = '食費';", "UPDATE kakeibo WHERE himoku = '食費' SET withdraw = 400;", "UPDATE SET kakeibo withdraw = 400 WHERE himoku = '食費';", "INSERT INTO kakeibo SET withdraw = 400 WHERE himoku = '食費';", "UPDATE kakeibo SET withdraw == 400 WHERE himoku = '食費';"],
        answer: 0, exp: 'UPDATE テーブル名 SET 列名 = 値 WHERE 条件。SET 句の = は代入（== は使わない）。',
      },
      {
        id: 'db-l2-q09', q: '空欄に入る語の組として正しいものはどれか。「SELECT 列名 ［ア］ テーブル名」「INSERT ［イ］ テーブル名 (列名) VALUES (値)」',
        choices: ['ア:INTO イ:FROM', 'ア:FROM イ:INTO', 'ア:WHERE イ:SET', 'ア:FROM イ:SET', 'ア:SET イ:INTO'],
        answer: 1, exp: 'SELECT … FROM、DELETE FROM、INSERT INTO、UPDATE … SET。',
      },
    ],
  },
  {
    id: 'db-l2-g03', lecture: 2, type: 'output', title: '家計簿テーブルの操作', ...R,
    tables: [kakeibo],
    questions: [
      {
        id: 'db-l2-q10', q: '次の SQL を実行した結果はどれか。',
        code: code`
SELECT date, withdraw
  FROM kakeibo
 WHERE withdraw > 3000;`,
        choices: ['date|withdraw\n2024-02-14|5000\n2024-02-18|7560', 'date|withdraw\n2024-02-18|7560', 'date|withdraw\n2024-02-11|2800\n2024-02-14|5000\n2024-02-18|7560', 'date|withdraw\n2024-02-10|280000\n2024-02-14|5000\n2024-02-18|7560', 'date|withdraw'],
        answer: 0, exp: '出金額 (withdraw) が 3000 より大きい行は 5000 と 7560 の2行。280000 は入金額。',
      },
      {
        id: 'db-l2-q11', q: '次の SQL を順に実行した後の結果はどれか。',
        code: code`
DELETE FROM kakeibo WHERE date = '2024-02-03';
UPDATE kakeibo SET memo = '2月分' WHERE himoku = '給料';
SELECT himoku, memo FROM kakeibo WHERE deposit > 0;`,
        choices: ['himoku|memo\n給料|1月の給料', 'himoku|memo\n給料|2月分', 'himoku|memo\n食費|コーヒーを購入\n給料|2月分', 'himoku|memo', 'himoku|memo\n給料|2月分\n交際費|同期会の会費'],
        answer: 1, exp: 'UPDATE で給料の行の memo が「2月分」に変わる。deposit > 0 は給料の行だけ。',
      },
      {
        id: 'db-l2-q12', q: '次の SQL を順に実行した後の結果はどれか。',
        code: code`
DELETE FROM kakeibo;
SELECT date FROM kakeibo;`,
        choices: ['date', 'date\n2024-02-03', 'date\n2024-02-18', 'エラーになる', 'date\nNULL'],
        answer: 0, exp: 'WHERE の無い DELETE で全データが削除されるので、結果は0行（Empty set）。',
      },
    ],
  },
  {
    id: 'db-l2-g04', lecture: 2, type: 'term', title: 'SQLの基本ルールとリテラル',
    questions: [
      {
        id: 'db-l2-q13', q: 'SQL の基本ルールとして誤っているものはどれか。',
        choices: ['文の途中に改行を入れることができる', 'ハイフン2つ (--) から行末まではコメントになる', 'SELECT や WHERE などの予約語は大文字と小文字のどちらで書いてもよい', '予約語はテーブル名や列名にそのまま利用できる', '/* から */ まではコメントになる'],
        answer: 3, exp: 'テーブル名や列名に予約語を利用することはできない。',
      },
      {
        id: 'db-l2-q14', q: 'SQL 文に書かれたリテラルの扱いとして正しいものはどれか。',
        choices: ["'123' は数値として扱われる", '123 は文字列として扱われる', "'2024-02-25' のように一定の形式でシングルクォートでくくられたリテラルは日付情報として扱われる", '"東京" は文字列リテラルとして使える', "シングルクォートでくくられた文字列は必ずエラーになる"],
        answer: 2, exp: 'くくらない → 数値、シングルクォート → 文字列、一定形式の \'2024-02-25\' → 日付。ダブルクォートは文字列リテラルに使えない。',
      },
      {
        id: 'db-l2-q15', q: '文字列型 CHAR と VARCHAR の説明として正しいものはどれか。',
        choices: ['CHAR(10) の列に 7 バイトの文字列を格納すると、後ろに空白が追加されて 10 バイトになる', 'VARCHAR(10) の列に 7 バイトの文字列を格納すると、10 バイトの領域が確保される', 'CHAR は可変長、VARCHAR は固定長', 'VARCHAR(10) には 11 バイト以上の文字列も格納できる', '氏名を格納するには CHAR が向いている'],
        answer: 0, exp: 'CHAR は固定長（足りない分は空白で埋める）、VARCHAR は可変長（最大長まで）。郵便番号など桁数が一定のものは CHAR、氏名など一定でないものは VARCHAR。',
      },
      {
        id: 'db-l2-q16', q: '小数（例：身長 170.5）を格納するのに適したデータ型はどれか。',
        choices: ['INTEGER 型', 'DECIMAL 型', 'CHAR 型', 'DATE 型', 'VARCHAR 型'],
        answer: 1, exp: '小数は DECIMAL, NUMERIC, FLOAT, DOUBLE, REAL など。整数は INTEGER（INT）。',
      },
    ],
  },
  // ===== 第03回 データの検索 =====
  {
    id: 'db-l3-g01', lecture: 3, type: 'output', title: 'WHERE句と比較演算子', ...R,
    intro: '月ごとの気象データ weather（rainfall:降水量, max_temp:最高気温, min_temp:最低気温, humidity:湿度）。12月の降水量は NULL。',
    tables: [weather],
    questions: [
      {
        id: 'db-l3-q01', q: '次の SQL の結果はどれか。', code: 'SELECT month FROM weather WHERE rainfall > 200;',
        choices: ['month\n6\n9', 'month\n6\n9\n10', 'month\n9', 'month\n6\n8\n9\n10', 'month\n6\n9\n12'],
        answer: 0, exp: '> は「より大きい」。200 ちょうどの10月は含まない。NULL の12月は比較できないので含まない。',
      },
      {
        id: 'db-l3-q02', q: '次の SQL の結果はどれか。', code: 'SELECT month FROM weather WHERE rainfall = NULL;',
        choices: ['month\n12', 'month', 'month\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11', 'month\nNULL', 'month\n0'],
        answer: 1, exp: 'NULL は = では判定できない（結果は0行）。NULL の判定には IS NULL を使う。',
      },
      {
        id: 'db-l3-q03', q: '次の SQL の結果はどれか。', code: 'SELECT month, humidity FROM weather WHERE humidity BETWEEN 75 AND 79;',
        choices: ['month|humidity\n6|79\n7|78\n8|75', 'month|humidity\n7|78', 'month|humidity\n6|79\n7|78', 'month|humidity\n7|78\n8|75', 'month|humidity\n6|79\n7|78\n8|75\n9|80'],
        answer: 0, exp: 'BETWEEN A AND B は A 以上 B 以下（両端を含む）。',
      },
      {
        id: 'db-l3-q04', q: '次の SQL の結果はどれか。', code: 'SELECT month FROM weather WHERE month IN (3, 5, 7) AND max_temp >= 25;',
        choices: ['month\n5\n7', 'month\n3\n5\n7', 'month\n7', 'month\n5\n6\n7\n8\n9\n10', 'month\n3'],
        answer: 0, exp: 'IN (3, 5, 7) は month = 3 OR month = 5 OR month = 7 と同じ。そのうち最高気温 25 以上は 5月(27) と 7月(33)。',
      },
    ],
  },
  {
    id: 'db-l3-g02', lecture: 3, type: 'fill', title: '条件式を考える',
    tables: [weather],
    checks: [
      { sql: 'SELECT month FROM weather WHERE rainfall <= 100 AND humidity < 50;', expect: 'month\n1\n2' },
      { sql: 'SELECT month FROM weather WHERE rainfall IS NULL;', expect: 'month\n12' },
      { sql: 'SELECT month FROM weather WHERE min_temp < 5 OR max_temp > 35;', expect: 'month\n1\n2\n3\n8\n12' },
    ],
    questions: [
      {
        id: 'db-l3-q05', q: '「降水量が 100 以下 かつ 湿度が 50 未満」の月を取得する WHERE 句はどれか。', mono: true,
        choices: ['WHERE rainfall < 100 AND humidity <= 50', 'WHERE rainfall <= 100 OR humidity < 50', 'WHERE rainfall <= 100 AND humidity < 50', 'WHERE rainfall => 100 AND humidity < 50', 'WHERE rainfall <= 100, humidity < 50'],
        answer: 2, exp: '以下は <=、未満は <。「かつ」は AND。',
      },
      {
        id: 'db-l3-q06', q: '降水量が記録されていない（NULL の）月を取得する WHERE 句はどれか。', mono: true,
        choices: ['WHERE rainfall = NULL', 'WHERE rainfall IS NULL', "WHERE rainfall = ''", 'WHERE rainfall = 0', 'WHERE NULL(rainfall)'],
        answer: 1, exp: 'NULL の判定は IS NULL（NULL でないなら IS NOT NULL）。',
      },
      {
        id: 'db-l3-q07', q: '「6月以外」を取得する WHERE 句として正しくないものはどれか。', mono: true,
        choices: ['WHERE month <> 6', 'WHERE month != 6', 'WHERE NOT month = 6', 'WHERE month NOT IN (6)', 'WHERE month =! 6'],
        answer: 4, exp: '等しくないは <> または !=。=! という演算子は無い。',
      },
    ],
  },
  {
    id: 'db-l3-g03', lecture: 3, type: 'output', title: 'LIKE演算子', ...R,
    tables: [shohin],
    questions: [
      {
        id: 'db-l3-q08', q: '次の SQL の結果はどれか。', code: "SELECT name FROM shohin WHERE name LIKE '%ー%';",
        choices: ['name\nノートPC\nキーボード\nモニター', 'name\nキーボード\nモニター', 'name\nノートPC', 'name\nノートPC\nキーボード\nモニター\nヘッドホン', 'name\nモニター'],
        answer: 0, exp: '% は「任意の0文字以上の文字列」。「ー」を含む名前すべて。',
      },
      {
        id: 'db-l3-q09', q: '次の SQL の結果はどれか。', code: "SELECT name FROM shohin WHERE name LIKE '_ウ%';",
        choices: ['name\nマウス', 'name\nマウス\nUSBメモリ', 'name', 'name\nヘッドホン', 'name\nマウス\nキーボード'],
        answer: 0, exp: '_ は「任意の1文字」。2文字目が「ウ」の名前。',
      },
    ],
  },
  {
    id: 'db-l3-g04', lecture: 3, type: 'output', title: '論理演算子の優先度', ...R,
    tables: [shohin],
    questions: [
      {
        id: 'db-l3-q10', q: '次の SQL の結果はどれか。', code: "SELECT number FROM shohin\n WHERE category = 'B' OR category = 'C' AND price > 3000;",
        choices: ['number\n2\n3\n6', 'number\n3\n6', 'number\n2\n3\n5\n6', 'number\n6', 'number\n3'],
        answer: 0, exp: 'AND は OR より優先される。category = \'B\' OR (category = \'C\' AND price > 3000) なので B の2行と C の6。',
      },
      {
        id: 'db-l3-q11', q: '次の SQL の結果はどれか。', code: "SELECT number FROM shohin\n WHERE (category = 'B' OR category = 'C') AND price > 3000;",
        choices: ['number\n2\n3\n6', 'number\n3\n6', 'number\n2\n3\n5\n6', 'number\n6', 'number\n1\n3\n4\n6'],
        answer: 1, exp: 'カッコで OR を先に評価。B か C で、かつ価格 3000 超。',
      },
      {
        id: 'db-l3-q12', q: '次の SQL の結果はどれか。', code: "SELECT number FROM shohin WHERE NOT category = 'A' AND stock > 20;",
        choices: ['number\n2\n3', 'number\n2\n3\n5', 'number\n1\n4', 'number\n2\n3\n6', 'number'],
        answer: 0, exp: 'NOT は条件を反転。A 以外で在庫 20 超。在庫 NULL の5は比較できないので含まない。',
      },
    ],
  },
  {
    id: 'db-l3-g05', lecture: 3, type: 'term', title: '主キー',
    questions: [
      {
        id: 'db-l3-q13', q: '主キーの説明として正しいものはどれか。',
        choices: ['同じ値が複数の行に存在してもよい', 'NULL を格納してもよい', 'ある1行を特定するために利用される列で、重複せず NULL にならない', '必ず1つの列だけで構成しなければならない', 'テーブルに必ず2つ以上必要'],
        answer: 2, exp: '主キーは行を識別するための列。重複しない・NULL にならない。',
      },
      {
        id: 'db-l3-q14', q: '複数の列を組み合わせて主キーとするものを何というか。',
        choices: ['外部キー', '複合主キー', '候補キー', '予約語', 'インデックス'],
        answer: 1, exp: '複数の列をまとめて主キーとして扱うものを複合主キーという。',
      },
    ],
  },
  // ===== 第04回 検索結果の加工 =====
  {
    id: 'db-l4-g01', lecture: 4, type: 'output', title: 'DISTINCT と ORDER BY', ...R,
    tables: [shohin],
    questions: [
      {
        id: 'db-l4-q01', q: '次の SQL の結果はどれか。', code: 'SELECT DISTINCT category FROM shohin ORDER BY category;',
        choices: ['category\nA\nB\nC', 'category\nA\nB\nA\nC', 'category\nA\nA\nB\nB\nC\nC', 'category\nC\nB\nA', 'category\nA'],
        answer: 0, exp: 'DISTINCT は重複行を除外する。ORDER BY は既定で昇順 (ASC)。',
      },
      {
        id: 'db-l4-q02', q: '次の SQL の結果はどれか。', code: 'SELECT name, price FROM shohin ORDER BY price DESC LIMIT 3;',
        choices: ['name|price\nノートPC|98000\nモニター|32000\nヘッドホン|5800', 'name|price\nUSBメモリ|1200\nマウス|2500\nキーボード|4800', 'name|price\nノートPC|98000\nマウス|2500\nキーボード|4800', 'name|price\nノートPC|98000\nモニター|32000', 'name|price\nノートPC|98000\nモニター|32000\nヘッドホン|5800\nキーボード|4800'],
        answer: 0, exp: 'DESC は降順。LIMIT 3 で先頭から3行だけ取得する（MySQL では OFFSET-FETCH の代わりに LIMIT を使う）。',
      },
      {
        id: 'db-l4-q03', q: '次の SQL の結果はどれか。', code: 'SELECT name, price FROM shohin ORDER BY price LIMIT 2 OFFSET 1;',
        choices: ['name|price\nマウス|2500\nキーボード|4800', 'name|price\nUSBメモリ|1200\nマウス|2500', 'name|price\nマウス|2500', 'name|price\nキーボード|4800\nヘッドホン|5800', 'name|price\nモニター|32000\nヘッドホン|5800'],
        answer: 0, exp: '昇順に並べて、先頭の1行を飛ばし (OFFSET 1)、次の2行 (LIMIT 2) を取得。',
      },
      {
        id: 'db-l4-q04', q: 'MySQL で次の SQL を実行したとき、1行目に来るものはどれか。', code: 'SELECT name, stock FROM shohin ORDER BY stock;',
        choices: ['name|stock\nUSBメモリ|NULL', 'name|stock\nノートPC|5', 'name|stock\nマウス|40', 'name|stock\nモニター|8', 'name|stock\nヘッドホン|12'],
        sql: 'SELECT name, stock FROM shohin ORDER BY stock LIMIT 1;',
        answer: 0, exp: 'MySQL では昇順で並べると NULL が先頭に来る（NULL の並び順は DBMS によって異なる）。',
      },
    ],
  },
  {
    id: 'db-l4-g02', lecture: 4, type: 'output', title: '集合演算子', ...R,
    intro: '東京店と大阪店で扱っている果物の表がある。',
    tables: [tokyo, osaka],
    questions: [
      {
        id: 'db-l4-q05', q: '次の SQL の結果はどれか。',
        code: 'SELECT name FROM tokyo_ten\nUNION\nSELECT name FROM osaka_ten\nORDER BY name;',
        choices: ['name\nなし\nぶどう\nみかん\nもも\nりんご', 'name\nなし\nぶどう\nみかん\nみかん\nもも\nりんご\nりんご', 'name\nみかん\nりんご', 'name\nぶどう', 'name\nなし\nもも'],
        answer: 0, exp: 'UNION は和集合。重複する行は1つにまとめられる（重複も残すなら UNION ALL）。',
      },
      {
        id: 'db-l4-q06', q: '次の SQL の結果はどれか。',
        code: 'SELECT name FROM tokyo_ten\nINTERSECT\nSELECT name FROM osaka_ten\nORDER BY name;',
        choices: ['name\nなし\nぶどう\nみかん\nもも\nりんご', 'name\nみかん\nりんご', 'name\nぶどう', 'name\nなし\nもも', 'name\nみかん'],
        answer: 1, exp: 'INTERSECT は積集合（両方にあるもの）。',
      },
      {
        id: 'db-l4-q07', q: '次の SQL の結果はどれか。',
        code: 'SELECT name FROM tokyo_ten\nEXCEPT\nSELECT name FROM osaka_ten;',
        choices: ['name\nなし\nもも', 'name\nみかん\nりんご', 'name\nぶどう', 'name', 'name\nなし\nぶどう\nもも'],
        answer: 2, exp: 'EXCEPT (MINUS) は差集合。東京店にあって大阪店に無いもの。',
      },
    ],
  },
  {
    id: 'db-l4-g03', lecture: 4, type: 'term', title: '検索結果の加工のまとめ',
    questions: [
      {
        id: 'db-l4-q08', q: '検索結果の重複行を除外するキーワードはどれか。',
        choices: ['UNIQUE', 'DISTINCT', 'EXCEPT', 'GROUP', 'LIMIT'],
        answer: 1, exp: 'SELECT DISTINCT 列名 … で重複行を除外する。',
      },
      {
        id: 'db-l4-q09', q: 'ORDER BY の説明として誤っているものはどれか。',
        choices: ['ASC は昇順、DESC は降順', '並び順を省略すると昇順になる', 'ORDER BY 2 のように列番号で指定できる', '複数の列で並び替えるときはカンマで区切る', 'ORDER BY を指定しなくても、結果は必ず主キーの順に並ぶ'],
        answer: 4, exp: 'ORDER BY を指定しない場合、結果の並び順は保証されない。',
      },
      {
        id: 'db-l4-q10', q: '集合演算子の組合せとして正しいものはどれか。',
        choices: ['UNION:積集合 EXCEPT:和集合 INTERSECT:差集合', 'UNION:和集合 EXCEPT:差集合 INTERSECT:積集合', 'UNION:差集合 EXCEPT:積集合 INTERSECT:和集合', 'UNION:和集合 EXCEPT:積集合 INTERSECT:差集合', 'UNION:積集合 EXCEPT:差集合 INTERSECT:和集合'],
        answer: 1, exp: 'UNION（和）、EXCEPT/MINUS（差）、INTERSECT（積）。',
      },
    ],
  },
  // ===== 第05回 式・演算子・関数 =====
  {
    id: 'db-l5-g01', lecture: 5, type: 'output', title: '計算式・AS句・CASE演算子', ...R,
    intro: '試験の点数の表 shiken（am:午前, pm1:午後1, pm2:午後2, paper:論文）。',
    tables: [shiken],
    questions: [
      {
        id: 'db-l5-q01', q: '次の SQL の結果はどれか。', code: 'SELECT id, am + pm1 + pm2 AS total FROM shiken WHERE id <= 2;',
        choices: ['id|total\n1|210\n2|235', 'id|am + pm1 + pm2\n1|210\n2|235', 'id|total\n1|275\n2|295', 'id|total\n1|80\n2|65', 'id|total\n1|210'],
        answer: 0, exp: '選択列リストに計算式を書ける。AS句で列に別名 total を付ける。',
      },
      {
        id: 'db-l5-q02', q: '次の SQL の結果はどれか。',
        code: code`
SELECT id,
       CASE WHEN am >= 70 THEN '合格'
            ELSE '不合格'
       END AS am_result
  FROM shiken;`,
        choices: ['id|am_result\n1|合格\n2|不合格\n3|合格\n4|合格', 'id|am_result\n1|合格\n2|合格\n3|合格\n4|合格', 'id|am_result\n1|合格\n3|合格\n4|合格', 'id|am_result\n1|不合格\n2|合格\n3|不合格\n4|不合格', 'id|am_result\n1|合格\n2|不合格\n3|不合格\n4|合格'],
        answer: 0, exp: 'CASE は条件に応じて値を変換する。am が 70 以上なら「合格」。',
      },
      {
        id: 'db-l5-q03', q: '合格条件「am が 70 以上」「pm1 と pm2 の合計が 120 以上」「paper が am・pm1・pm2 の合計の3割以上」をすべて満たす id を取得したい。結果はどれか。',
        code: code`
SELECT id AS goukaku_id
  FROM shiken
 WHERE am >= 70
   AND pm1 + pm2 >= 120
   AND paper >= (am + pm1 + pm2) * 0.3;`,
        choices: ['goukaku_id\n1\n4', 'goukaku_id\n1', 'goukaku_id\n4', 'goukaku_id\n1\n2\n4', 'goukaku_id\n2\n4'],
        answer: 0, exp: 'id1: 80, 130, 65≧63 → 合格。id2: am 65 で不合格。id3: pm 115 で不合格。id4: 90, 125, 70≧64.5 → 合格。',
      },
    ],
  },
  {
    id: 'db-l5-g02', lecture: 5, type: 'output', title: '文字列の関数', ...R,
    intro: '会員の表 member（address は D:戸建て, C:集合住宅）。',
    tables: [member],
    questions: [
      {
        id: 'db-l5-q04', q: 'メールアドレスの最後の2文字（国コード）を取り出す SQL の結果はどれか。',
        code: 'SELECT id, SUBSTRING(mail, LENGTH(mail) - 1, 2) AS country FROM member;',
        choices: ['id|country\n1|jp\n2|uk\n3|cn', 'id|country\n1|ta\n2|an\n3|li', 'id|country\n1|.jp\n2|.uk\n3|.cn', 'id|country\n1|p\n2|k\n3|n', 'id|country\n1|j\n2|u\n3|c'],
        answer: 0, exp: 'SUBSTRING(文字列, 開始位置, 文字数)。開始位置は 1 から数える。LENGTH(mail) - 1 文字目から2文字。',
      },
      {
        id: 'db-l5-q05', q: '次の SQL の結果はどれか。',
        code: code`
SELECT CONCAT(TRUNCATE(age, -1), 's : ',
         CASE address WHEN 'D' THEN 'house'
                      ELSE 'apartment' END) AS context
  FROM member;`,
        choices: ['context\n20s : house\n30s : apartment\n40s : apartment', 'context\n23s : house\n35s : apartment\n41s : apartment', 'context\n20s : apartment\n30s : house\n40s : house', 'context\n20s : D\n30s : C\n40s : C', 'context\n20s : house\n40s : apartment\n40s : apartment'],
        answer: 0, exp: 'TRUNCATE(age, -1) は1の位を切り捨て（23→20）。CONCAT で文字列を連結。35 は 40 ではなく 30。',
      },
      {
        id: 'db-l5-q06', q: '次の SQL の結果はどれか。', code: "SELECT LENGTH(TRIM('  SQL  ')) AS a, REPLACE('2024/02/03', '/', '-') AS b;", tables: [],
        choices: ['a|b\n3|2024-02-03', 'a|b\n7|2024-02-03', 'a|b\n3|2024/02/03', 'a|b\n5|2024-02-03', 'a|b\n3|20240203'],
        answer: 0, exp: 'TRIM は前後の空白を除去 → \'SQL\'（3文字）。REPLACE(文字列, 置換前, 置換後)。',
      },
    ],
  },
  {
    id: 'db-l5-g03', lecture: 5, type: 'output', title: '数値の関数とNULL', ...R,
    tables: [],
    questions: [
      {
        id: 'db-l5-q07', q: '次の SQL の結果はどれか。', code: 'SELECT ROUND(123.456, 1) AS a, TRUNCATE(123.456, 1) AS b, ROUND(123.456, -1) AS c;',
        choices: ['a|b|c\n123.5|123.4|120', 'a|b|c\n123.4|123.5|120', 'a|b|c\n123.5|123.5|123', 'a|b|c\n123.5|123.4|123.5', 'a|b|c\n123|123|120'],
        answer: 0, exp: 'ROUND は四捨五入、TRUNCATE は切り捨て（MySQL では TRUNC ではなく TRUNCATE）。桁数 -1 は1の位で丸める。',
      },
      {
        id: 'db-l5-q08', q: '次の SQL の結果はどれか。', code: 'SELECT POWER(2, 10) AS a, 100 + NULL AS b;',
        choices: ['a|b\n1024|NULL', 'a|b\n20|100', 'a|b\n1024|100', 'a|b\n100|NULL', 'a|b\n1024|0'],
        answer: 0, exp: 'POWER(2, 10) は 2 の 10 乗。NULL を含む計算の結果は NULL になる。',
      },
    ],
  },
  {
    id: 'db-l5-g04', lecture: 5, type: 'term', title: '関数のまとめ',
    questions: [
      {
        id: 'db-l5-q09', q: '関数とその働きの組合せとして誤っているものはどれか。',
        choices: ['LENGTH：文字列の長さを求める', 'TRIM：前後の空白を除去する', 'CONCAT：文字列を連結する', 'CAST：データ型を変換する', 'CURRENT_DATE：現在の日時（日付と時刻）を求める'],
        answer: 4, exp: 'CURRENT_DATE は現在の日付。日付と時刻は CURRENT_TIMESTAMP、時刻は CURRENT_TIME。',
      },
      {
        id: 'db-l5-q10', q: 'SELECT 文で列に別名を付ける句はどれか。',
        choices: ['AS 句', 'SET 句', 'INTO 句', 'FROM 句', 'CASE 句'],
        answer: 0, exp: 'SELECT 式 AS 別名。',
      },
    ],
  },
  // ===== 第06回 集計とグループ化 =====
  {
    id: 'db-l6-g01', lecture: 6, type: 'output', title: '集計関数', ...R,
    intro: '都市ごと・月ごとの気象データ kion。',
    tables: [kion],
    questions: [
      {
        id: 'db-l6-q01', q: '次の SQL の結果はどれか。', code: 'SELECT SUM(rainfall), MAX(max_temp), MIN(min_temp) FROM kion;',
        choices: ['SUM(rainfall)|MAX(max_temp)|MIN(min_temp)\n770|35|-8', 'SUM(rainfall)|MAX(max_temp)|MIN(min_temp)\n770|35|27', 'SUM(rainfall)|MAX(max_temp)|MIN(min_temp)\n240|35|-8', 'SUM(rainfall)|MAX(max_temp)|MIN(min_temp)\n128.3333|35|-8', 'SUM(rainfall)|MAX(max_temp)|MIN(min_temp)\n770|32|-1'],
        answer: 0, exp: '集計関数は全行を集計して1行の結果を返す。',
      },
      {
        id: 'db-l6-q02', q: '次の SQL の結果はどれか。', code: "SELECT AVG(max_temp) FROM kion WHERE name = '東京';",
        choices: ['AVG(max_temp)\n22.5000', 'AVG(max_temp)\n45', 'AVG(max_temp)\n35', 'AVG(max_temp)\n20.3333', 'AVG(max_temp)\n22'],
        answer: 0, exp: 'WHERE で東京の2行に絞ってから平均 (10 + 35) / 2 = 22.5。',
      },
    ],
  },
  {
    id: 'db-l6-g02', lecture: 6, type: 'output', title: 'GROUP BY と HAVING', ...R,
    tables: [kion],
    questions: [
      {
        id: 'db-l6-q03', q: '次の SQL の結果はどれか。', code: 'SELECT name, MAX(max_temp) AS m FROM kion\n GROUP BY name\n ORDER BY m DESC;',
        choices: ['name|m\n東京|35\n那覇|32\n札幌|26', 'name|m\n東京|35', 'name|m\n東京|35\n東京|10\n那覇|32\n那覇|20\n札幌|26\n札幌|-1', 'name|m\n札幌|26\n那覇|32\n東京|35', 'name|m\n東京|22.5000\n那覇|26.0000\n札幌|12.5000'],
        answer: 0, exp: 'GROUP BY name で都市ごとにグループ化し、グループごとに MAX を求める。',
      },
      {
        id: 'db-l6-q04', q: '次の SQL の結果はどれか。', code: 'SELECT name, MIN(min_temp) FROM kion\n GROUP BY name\nHAVING MIN(min_temp) <= -5;',
        choices: ['name|MIN(min_temp)\n札幌|-8', 'name|MIN(min_temp)\n札幌|-8\n東京|2', 'name|MIN(min_temp)\n札幌|-1', 'name|MIN(min_temp)', 'name|MIN(min_temp)\n札幌|-8\n札幌|18'],
        answer: 0, exp: 'HAVING はグループ集計後の絞り込み。集計結果（MIN）を条件にするときは WHERE ではなく HAVING。',
      },
      {
        id: 'db-l6-q05', q: '次の SQL の結果はどれか。', code: 'SELECT month, AVG(rainfall) FROM kion\n GROUP BY month\n ORDER BY month;',
        choices: ['month|AVG(rainfall)\n1|86.6667\n8|170.0000', 'month|AVG(rainfall)\n1|260\n8|510', 'month|AVG(rainfall)\n1|86.6667', 'month|AVG(rainfall)\n8|170.0000\n1|86.6667', 'month|AVG(rainfall)\n1|128.3333\n8|128.3333'],
        answer: 0, exp: '月ごとにグループ化。1月 (50+110+100)/3、8月 (150+120+240)/3。',
      },
    ],
  },
  {
    id: 'db-l6-g03', lecture: 6, type: 'output', title: 'COUNT とNULL', ...R,
    intro: 'サーバルームの入退室記録 nyushitsu（kubun 1:メンテナンス, 2:リリース作業, 3:障害対応, 9:その他。taishitsu が NULL は入室中、1 は退室済）。',
    tables: [nyushitsu],
    questions: [
      {
        id: 'db-l6-q06', q: '次の SQL の結果はどれか。', code: 'SELECT COUNT(*), COUNT(taishitsu) FROM nyushitsu;',
        choices: ['COUNT(*)|COUNT(taishitsu)\n6|4', 'COUNT(*)|COUNT(taishitsu)\n6|6', 'COUNT(*)|COUNT(taishitsu)\n4|4', 'COUNT(*)|COUNT(taishitsu)\n6|2', 'COUNT(*)|COUNT(taishitsu)\n5|4'],
        answer: 0, exp: 'COUNT(*) は行数。COUNT(列名) はその列が NULL の行を数えない。',
      },
      {
        id: 'db-l6-q07', q: '社員ごとの入室回数を多い順に取得する SQL の結果はどれか。',
        code: 'SELECT name, COUNT(*) AS 入室回数 FROM nyushitsu\n GROUP BY name\n ORDER BY 2 DESC\n LIMIT 1;',
        choices: ['name|入室回数\n佐藤|3', 'name|入室回数\n鈴木|2', 'name|入室回数\n佐藤|6', 'name|入室回数\n高橋|1', 'name|入室回数\n佐藤|1'],
        answer: 0, exp: 'ORDER BY 2 は2列目（入室回数）で並べる。佐藤は3回。',
      },
      {
        id: 'db-l6-q08', q: '障害対応 (kubun = \'3\') が発生した日付と対応社員数を取得する SQL の結果はどれか。',
        code: "SELECT date, COUNT(name) AS 対応社員数 FROM nyushitsu\n WHERE kubun = '3'\n GROUP BY date;",
        choices: ['date|対応社員数\n2024-11-01|1\n2024-11-02|2', 'date|対応社員数\n2024-11-01|2\n2024-11-02|2\n2024-11-03|2', 'date|対応社員数\n2024-11-02|2', 'date|対応社員数\n2024-11-01|1\n2024-11-02|2\n2024-11-03|0', 'date|対応社員数\n2024-11-01|3'],
        answer: 0, exp: 'WHERE で障害対応の行（3行）に絞ってから日付ごとに数える。',
      },
    ],
  },
  {
    id: 'db-l6-g04', lecture: 6, type: 'term', title: 'SELECT文の全貌',
    questions: [
      {
        id: 'db-l6-q09', q: 'SELECT 文に書く句の順番として正しいものはどれか。',
        choices: ['SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY', 'SELECT → FROM → GROUP BY → WHERE → ORDER BY → HAVING', 'SELECT → WHERE → FROM → GROUP BY → HAVING → ORDER BY', 'SELECT → FROM → WHERE → HAVING → GROUP BY → ORDER BY', 'SELECT → FROM → ORDER BY → WHERE → GROUP BY → HAVING'],
        answer: 0, exp: 'WHERE（行の絞り込み）→ GROUP BY（グループ化）→ HAVING（集計後の絞り込み）→ ORDER BY（並べ替え）。',
      },
      {
        id: 'db-l6-q10', q: '集計関数についての説明として誤っているものはどれか。',
        choices: ['SUM, MAX, MIN, AVG は NULL を無視して計算する', 'COUNT(*) は NULL の行も数える', 'WHERE 句の中で集計関数を使って絞り込むことができる', 'GROUP BY で指定した列は SELECT 句に書くことができる', 'AVG は平均を求める'],
        answer: 2, exp: 'WHERE 句には集計関数を書けない。集計結果で絞り込むときは HAVING を使う。',
      },
    ],
  },
  // ===== 第07回 副問合せ =====
  {
    id: 'db-l7-g01', lecture: 7, type: 'output', title: '単一の値の代わりに副問合せ', ...R,
    tables: [shohin],
    questions: [
      {
        id: 'db-l7-q01', q: '次の SQL の結果はどれか。', code: 'SELECT name FROM shohin\n WHERE price = (SELECT MAX(price) FROM shohin);',
        choices: ['name\nノートPC', 'name\n98000', 'name\nモニター', 'name\nノートPC\nモニター', 'name'],
        answer: 0, exp: '副問合せ（カッコ内）が先に実行され 98000 になり、price = 98000 の行を取得する。',
      },
      {
        id: 'db-l7-q02', q: '次の SQL の結果はどれか。', code: 'SELECT name FROM shohin\n WHERE price > (SELECT AVG(price) FROM shohin)\n ORDER BY price DESC;',
        choices: ['name\nノートPC\nモニター', 'name\nノートPC', 'name\nノートPC\nモニター\nヘッドホン', 'name\nマウス\nキーボード\nUSBメモリ\nヘッドホン', 'name\nモニター'],
        answer: 0, exp: '平均価格は 144300 / 6 = 24050。それより高いのはノートPCとモニター。',
      },
    ],
  },
  {
    id: 'db-l7-g02', lecture: 7, type: 'output', title: '複数の値・表の代わりに副問合せ', ...R,
    tables: [shohin],
    questions: [
      {
        id: 'db-l7-q03', q: '次の SQL の結果はどれか。', code: 'SELECT name FROM shohin\n WHERE category IN (SELECT category FROM shohin WHERE stock >= 30);',
        choices: ['name\nマウス\nキーボード', 'name\nマウス', 'name\nノートPC\nモニター', 'name\nマウス\nキーボード\nヘッドホン', 'name'],
        answer: 0, exp: '副問合せの結果は B。category IN (\'B\') の行を取得する。',
      },
      {
        id: 'db-l7-q04', q: '次の SQL の結果はどれか。', code: 'SELECT name FROM shohin\n WHERE number NOT IN (SELECT stock FROM shohin);',
        choices: ['name', 'name\nノートPC\nマウス\nキーボード\nモニター\nUSBメモリ\nヘッドホン', 'name\nUSBメモリ', 'name\nマウス\nキーボード\nモニター\nUSBメモリ\nヘッドホン', 'エラーになる'],
        answer: 0, exp: '副問合せの結果に NULL が含まれると、NOT IN は真にならず結果は0行になる（副問合せと NULL の注意点）。',
      },
      {
        id: 'db-l7-q05', q: '次の SQL の結果はどれか。',
        code: code`
SELECT AVG(t.total) AS a
  FROM (SELECT category, SUM(stock) AS total
          FROM shohin
         GROUP BY category) AS t;`,
        choices: ['a\n30.0000', 'a\n18.0000', 'a\n90', 'a\n15.0000', 'a\n22.5000'],
        answer: 0, exp: 'FROM 句の副問合せは表として扱われる。A:13, B:65, C:12（NULL は無視）→ 平均 30。',
      },
    ],
  },
  {
    id: 'db-l7-g03', lecture: 7, type: 'term', title: '副問合せのしくみ',
    tables: [shohin],
    questions: [
      {
        id: 'db-l7-q06', q: '副問合せの処理の説明として正しいものはどれか。',
        choices: ['外側の SQL が先に実行され、その結果を使って副問合せが実行される', 'カッコ内の副問合せが先に実行され、その結果が外側の SQL に埋め込まれる', '副問合せは SELECT 文の中でしか使えない', '副問合せは必ず1つの値を返さなければならない', '副問合せは FROM 句には書けない'],
        answer: 1, exp: '副問合せが先に処理され、その結果が外側の SQL の一部になる。UPDATE や INSERT の中でも使える。',
      },
      {
        id: 'db-l7-q07', q: '次の SQL がエラーになる理由として適切なものはどれか。', code: "SELECT name FROM shohin\n WHERE price = (SELECT price FROM shohin WHERE category = 'A');", lang: 'sql',
        choices: ['副問合せが複数の値（2行）を返すのに = で比較しているため', '副問合せに WHERE を書いたため', 'category は文字列なのでシングルクォートが不要なため', 'FROM 句に同じテーブル名を2回書いたため', 'price という列名が予約語だから'],
        answer: 0, exp: 'category A は2行あるので副問合せが複数の値を返す。複数の値と比べるときは IN（や ANY, ALL）を使う。',
      },
    ],
  },
];
