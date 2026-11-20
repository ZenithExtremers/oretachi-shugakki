// データベース 第08回 テーブルの結合（講義資料をもとにしたオリジナル問題）
import { code } from '../lib.js';
import { kakeibo8, himoku, himokuDup, shiten, busyo, shain } from './tables.js';

const R = { lang: 'sql', tableChoices: true };

export default [
  {
    id: 'db-l8-g01', lecture: 8, type: 'cloze', title: 'リレーションシップと外部キー',
    intro: '次の文章の空欄［A］〜［E］に入る語句を選べ。',
    passage: '家計簿テーブルと費目テーブルのように、2つのテーブルの間に情報としての関連があるとき、その関連を［A］という。家計簿テーブルの「費目ID」列のように、ほかのテーブルの関連行を指すための値を格納する列を［B］という。［B］には費目テーブルの［C］の値が入るので、どの1行を指すかが確定する。複数のテーブルから人間が理解しやすい1つの結果表を得る機能を［D］といい、相手テーブルは JOIN 句、つなぐ条件は［E］句で指定する。',
    sharedChoices: ['主キー', 'ON', 'リレーションシップ', '結合', '外部キー'],
    questions: [
      { id: 'db-l8-q01', q: '［A］', answer: 2, exp: '2つのテーブルの間の関連をリレーションシップ（relationship）という。' },
      { id: 'db-l8-q02', q: '［B］', answer: 4, exp: '関連する他テーブルの列（主キー列など）の値を格納した列を外部キー（foreign key）という。' },
      { id: 'db-l8-q03', q: '［C］', answer: 0, exp: '費目テーブルの ID 列は主キーなので重複がなく、値が決まれば行が1つに決まる。' },
      { id: 'db-l8-q04', q: '［D］', answer: 3, exp: '結合（join）。データは管理しやすいように複数テーブルに格納し、見せるときだけ結合する。' },
      { id: 'db-l8-q05', q: '［E］', answer: 1, exp: 'SELECT … FROM 左表 JOIN 右表 ON 結合条件。' },
    ],
  },
  {
    id: 'db-l8-g02', lecture: 8, type: 'term', title: 'テーブルを分けるメリット',
    tables: [kakeibo8, himoku],
    questions: [
      {
        id: 'db-l8-q06', q: 'データを複数のテーブルに分けて格納する理由として最も適切なものはどれか。',
        choices: ['人間にとって表が読みやすくなるから', '同じ情報を何度も登録しなくてよく、安全・確実・高速にデータを管理しやすいから', 'SQL を書かなくてよくなるから', '主キーが不要になるから', 'テーブルの数に制限がないから'],
        answer: 1, exp: '人間には分かりにくくなるが、コンピュータにとっては分かれていたほうが安全・確実・高速に扱いやすい。見るときは結合すればよい。',
      },
      {
        id: 'db-l8-q07', q: '費目の名前「給料」を「給与手当」に変えたい。費目テーブルに分けてある場合の SQL として適切なものはどれか。', mono: true,
        choices: ["UPDATE himoku SET name = '給与手当' WHERE name = '給料';", "UPDATE kakeibo8 SET himoku = '給与手当' WHERE himoku = '給料';", "UPDATE himoku SET '給料' = '給与手当';", "INSERT INTO himoku VALUES (1, '給与手当');", "UPDATE kakeibo8 JOIN himoku SET name = '給与手当';"],
        answer: 0, exp: '費目テーブルの1行を書き換えるだけでよい（家計簿テーブルの何万行を調べる必要がない）。',
      },
      {
        id: 'db-l8-q08', q: '1つのテーブルに「費目」と「費目の備考」を何度も登録していると起こりやすい問題はどれか。',
        choices: ['費目だけ書き換えて備考を書き換え忘れ、矛盾した状態になる', 'SELECT が使えなくなる', '主キーが自動で消える', 'NULL が入れられなくなる', '行の数が減る'],
        answer: 0, exp: '同じ情報があちこちにあると、1つを変えるときに全部を漏れなく直さないといけない（資料の「雑収入」の例）。',
      },
    ],
  },
  {
    id: 'db-l8-g03', lecture: 8, type: 'output', title: '結合の結果（内部結合）', ...R,
    tables: [kakeibo8, himoku, himokuDup],
    questions: [
      {
        id: 'db-l8-q09', q: '次の SQL の結果はどれか。',
        code: code`
SELECT date, name
  FROM kakeibo8
  JOIN himoku
    ON kakeibo8.himoku_id = himoku.id
 ORDER BY date;`,
        choices: [
          'date|name\n2024-02-03|食費\n2024-02-05|食費\n2024-02-10|給料',
          'date|name\n2024-02-03|給料\n2024-02-05|食費\n2024-02-10|水道光熱費',
          'date|name\n2024-02-03|食費\n2024-02-05|食費\n2024-02-10|給料\n2024-02-12|NULL\n2024-02-15|NULL',
          'date|name\n2024-02-03|食費\n2024-02-05|食費\n2024-02-10|給料\n2024-02-12|水道光熱費',
          'エラーになる',
        ],
        answer: 0, exp: '左表（家計簿）の各行について、費目ID と等しい ID の費目の行をつなぐ。費目ID 4 は相手がなく、NULL は何とも等しくならないので、その2行は結果から消える。',
      },
      {
        id: 'db-l8-q10', q: '次の SQL の結果はどれか。',
        code: code`
SELECT COUNT(*) AS n
  FROM kakeibo8 AS k
  JOIN himoku AS h
    ON k.himoku_id = h.id;`,
        choices: ['n\n3', 'n\n5', 'n\n4', 'n\n15', 'n\n0'],
        answer: 0, exp: '結合相手がある行だけが残る（内部結合）。費目ID が 4 の行と NULL の行は消えるので 3 行。左右を単純にかけ合わせた 5×3=15 にはならない。',
      },
      {
        id: 'db-l8-q11', q: '費目テーブルの代わりに、ID 1 が2行ある himoku_dupと結合した。結果は何行か。',
        code: code`
SELECT COUNT(*) AS n
  FROM kakeibo8 AS k
  JOIN himoku_dup AS h
    ON k.himoku_id = h.id;`,
        choices: ['n\n3', 'n\n4', 'n\n5', 'n\n6', 'n\n2'],
        answer: 1, exp: 'つなぐ相手が2行ある 2月10日の行は、左表の行がコピーされて2行になる。2 + 2 = 4 行。右表の結合条件列が重複すると、結果は元の行数より増える。',
      },
    ],
  },
  {
    id: 'db-l8-g04', lecture: 8, type: 'output', title: '外部結合', ...R,
    tables: [kakeibo8, himoku],
    questions: [
      {
        id: 'db-l8-q12', q: '次の SQL の結果はどれか。',
        code: code`
SELECT k.memo, h.name
  FROM kakeibo8 AS k
  LEFT JOIN himoku AS h
    ON k.himoku_id = h.id
 ORDER BY k.date;`,
        choices: [
          'memo|name\nカフェラテを購入|食費\n昼食|食費\n1月の給料|給料\n映画|NULL\n不明な出費|NULL',
          'memo|name\nカフェラテを購入|食費\n昼食|食費\n1月の給料|給料',
          'memo|name\nカフェラテを購入|食費\n昼食|食費\n1月の給料|給料\nNULL|水道光熱費',
          'memo|name\nカフェラテを購入|食費\n昼食|食費\n1月の給料|給料\n映画|NULL',
          'memo|name\nカフェラテを購入|食費\n昼食|食費\n1月の給料|給料\n映画|水道光熱費\n不明な出費|NULL',
        ],
        answer: 0, exp: 'LEFT JOIN（左外部結合）は左表の行をすべて出力する。相手がない行や結合条件の列が NULL の行は、右表の列がすべて NULL になる。',
      },
      {
        id: 'db-l8-q13', q: '次の SQL の結果はどれか。',
        code: code`
SELECT h.name, k.memo
  FROM kakeibo8 AS k
 RIGHT JOIN himoku AS h
    ON k.himoku_id = h.id
 ORDER BY h.id, k.date;`,
        choices: [
          'name|memo\n給料|1月の給料\n食費|カフェラテを購入\n食費|昼食\n水道光熱費|NULL',
          'name|memo\n給料|1月の給料\n食費|カフェラテを購入\n食費|昼食',
          'name|memo\n給料|1月の給料\n食費|カフェラテを購入\n水道光熱費|NULL',
          'name|memo\n給料|1月の給料\n食費|カフェラテを購入\n食費|昼食\n水道光熱費|NULL\nNULL|映画\nNULL|不明な出費',
          'name|memo\n給料|1月の給料\n食費|昼食\n水道光熱費|NULL',
        ],
        answer: 0, exp: 'RIGHT JOIN（右外部結合）は右表（費目）の行をすべて出力する。まだ使われていない「水道光熱費」も出て、家計簿側の列は NULL。',
      },
      {
        id: 'db-l8-q14', q: '外部結合の説明として誤っているものはどれか。',
        choices: ['LEFT JOIN は LEFT OUTER JOIN と書いてもよい', '左表・右表のすべての行を必ず出力するのは FULL JOIN（完全外部結合）', '結合相手が見つからない行が消える通常の結合を内部結合という', 'LEFT JOIN では、相手がない行の右表の列は NULL になる', 'LEFT JOIN と RIGHT JOIN は、左表と右表を入れ替えても結果が変わらない'],
        answer: 4, exp: 'LEFT JOIN は左表（FROM 句の表）を、RIGHT JOIN は右表（JOIN 句の表）をすべて出す。入れ替えると出力が必ず残る表が変わる。',
      },
    ],
  },
  {
    id: 'db-l8-g05', lecture: 8, type: 'term', title: '結合のルール',
    tables: [kakeibo8, himoku],
    questions: [
      {
        id: 'db-l8-q15', q: '結合の説明として正しいものはどれか。',
        choices: ['左右のテーブルを上から順に単純にくっつける', '結合条件が満たされた行を1つひとつつなぐ', '左表と右表は対等で、どちらを FROM に書いても同じ', '右表の行が2つ見つかったら、片方だけをつなぐ', '結合条件の列が NULL どうしならつながる'],
        answer: 1, exp: '主役は FROM 句の左表。左表の各行について、右表から結合条件に合う行を探してつなぐ。NULL はどの値とも（NULL とも）等しくならない。',
      },
      {
        id: 'db-l8-q16', q: '家計簿・費目の両方に memo 列があるとき、次の SQL がエラーになる理由と直し方として適切なものはどれか。', code: 'SELECT date, memo FROM kakeibo\n  JOIN himoku ON kakeibo.himoku_id = himoku.id;', lang: 'sql',
        choices: ['どちらの memo か分からないため。kakeibo.memo のようにテーブル名とドットを付ける', 'JOIN の後に WHERE がないため', 'ON の条件の左右が逆だから', 'SELECT に * を書いていないため', 'date が予約語だから'],
        answer: 0, exp: '同じ名前の列が両方にあるときは「テーブル名.列名」で、どちらの列かを明示する。AS で別名（例: AS K）を付けると K.memo と短く書ける。',
      },
      {
        id: 'db-l8-q17', q: '同じテーブル同士を結合する（自己結合）ときに必要なことはどれか。',
        choices: ['同じテーブルに異なる別名を付ける', 'FULL JOIN を使う', 'ON 句を書かない', '副問合せにする', '主キーを2つ作る'],
        answer: 0, exp: '例: FROM kakeibo AS A LEFT JOIN kakeibo AS B ON A.関連日付 = B.日付。自己結合（再帰結合）では、どちらの列か区別するため別名が必要。',
      },
    ],
  },
  {
    id: 'db-l8-g06', lecture: 8, type: 'output', title: '社員・部署・支店の結合（演習問題）', ...R,
    intro: '社員（shain）、部署（busyo）、支店（shiten）の3つのテーブルを使う。shain の busyo_id・jyoshi_id・kinmuchi_id、busyo の kyoten_id、shiten の shitencho_id は外部キー。上司がいない社員の jyoshi_id は NULL。',
    tables: [shain, busyo, shiten],
    questions: [
      {
        id: 'db-l8-q18', q: '次の SQL の結果はどれか（3テーブルの結合）。',
        code: code`
SELECT s.name, b.busyo_name, t.shiten_name
  FROM shain AS s
  JOIN busyo AS b
    ON s.busyo_id = b.busyo_id
  JOIN shiten AS t
    ON s.kinmuchi_id = t.shiten_id
 ORDER BY s.number;`,
        choices: [
          'name|busyo_name|shiten_name\n青木|開発部|東京\n井上|企画部|東京\n上田|開発部|東京\n江藤|営業部|京都\n小野|営業部|京都',
          'name|busyo_name|shiten_name\n青木|開発部|東京\n井上|企画部|東京\n上田|開発部|京都\n江藤|営業部|京都\n小野|営業部|京都',
          'name|busyo_name|shiten_name\n青木|企画部|東京\n井上|開発部|東京\n上田|営業部|京都',
          'name|busyo_name|shiten_name\n井上|企画部|東京\n江藤|営業部|京都',
          'エラーになる',
        ],
        answer: 0, exp: 'JOIN 〜 ON 〜 をくり返すと、前から順に1つずつ結合される。まず部署、その結果に支店（勤務地）をつなぐ。',
      },
      {
        id: 'db-l8-q19', q: '上司の名前が入った全社員の一覧を出す次の SQL の結果はどれか。',
        code: code`
SELECT a.name, b.name AS jyoshi
  FROM shain AS a
  LEFT JOIN shain AS b
    ON a.jyoshi_id = b.number
 ORDER BY a.number;`,
        choices: [
          'name|jyoshi\n青木|井上\n井上|NULL\n上田|江藤\n江藤|NULL\n小野|江藤',
          'name|jyoshi\n青木|井上\n上田|江藤\n小野|江藤',
          'name|jyoshi\n青木|青木\n井上|井上\n上田|上田\n江藤|江藤\n小野|小野',
          'name|jyoshi\n青木|S002\n井上|NULL\n上田|S004\n江藤|NULL\n小野|S004',
          'name|jyoshi\n井上|青木\n江藤|上田\n江藤|小野',
        ],
        answer: 0, exp: '自己結合。a が本人、b が上司。LEFT JOIN なので上司がいない（jyoshi_id が NULL の）井上・江藤も出て、上司名は NULL。JOIN だとこの2人は消える。',
      },
      {
        id: 'db-l8-q20', q: '上司と勤務地が違う社員を探す次の SQL の結果はどれか。',
        code: code`
SELECT a.name
  FROM shain AS a
  JOIN shain AS b
    ON a.jyoshi_id = b.number
 WHERE a.kinmuchi_id <> b.kinmuchi_id;`,
        choices: ['name\n上田', 'name\n青木\n上田\n小野', 'name\n井上\n江藤', 'name\n小野', 'name'],
        answer: 0, exp: '上田（東京:12）の上司は江藤（京都:24）。青木と上司の井上はどちらも東京、小野と江藤はどちらも京都。',
      },
      {
        id: 'db-l8-q21', q: '支店ごとの支店長名と社員数を出す次の SQL の結果はどれか。',
        code: code`
SELECT t.shiten_name, c.name AS chou, COUNT(*) AS n
  FROM shiten AS t
  JOIN shain AS c
    ON t.shitencho_id = c.number
  JOIN shain AS s
    ON s.kinmuchi_id = t.shiten_id
 GROUP BY t.shiten_id, t.shiten_name, c.name
 ORDER BY t.shiten_id;`,
        choices: [
          'shiten_name|chou|n\n東京|井上|3\n京都|江藤|2',
          'shiten_name|chou|n\n東京|井上|1\n京都|江藤|1',
          'shiten_name|chou|n\n東京|井上|5\n京都|江藤|5',
          'shiten_name|chou|n\n東京|S002|3\n京都|S004|2',
          'shiten_name|chou|n\n東京|青木|3\n京都|江藤|2',
        ],
        answer: 0, exp: '支店長は shitencho_id で社員表とつなぎ、社員数は勤務地で社員表ともう一度つないで GROUP BY で数える。同じ表を2回結合するので別名 c と s を付ける。',
      },
    ],
  },
  {
    id: 'db-l8-g07', lecture: 8, type: 'output', title: '副問合せの結果との結合', ...R,
    tables: [kakeibo8, himoku],
    questions: [
      {
        id: 'db-l8-q22', q: '次の SQL の結果はどれか。',
        code: code`
SELECT k.memo, h.name
  FROM kakeibo8 AS k
  JOIN (SELECT * FROM himoku
         WHERE id >= 2) AS h
    ON k.himoku_id = h.id
 ORDER BY k.date;`,
        choices: [
          'memo|name\nカフェラテを購入|食費\n昼食|食費',
          'memo|name\n1月の給料|給料',
          'memo|name\nカフェラテを購入|食費\n昼食|食費\n映画|NULL',
          'memo|name\nカフェラテを購入|食費\n昼食|食費\n1月の給料|給料',
          'エラーになる',
        ],
        answer: 0, exp: 'JOIN 句には副問合せの結果（表）も書ける。副問合せは ID 2・3 だけなので、つながるのは費目ID 2 の2行。副問合せには別名（AS h）が必要。',
      },
    ],
  },
];
