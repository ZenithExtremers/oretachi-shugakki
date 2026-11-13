// C/C++プログラミング 基礎コース（レッスン形式）
// 各レッスン：説明（blocks）→ 確認問題（全問正解でクリア）
import { code } from '../lib.js';

export default [
  // ---------- 第1回 ----------
  {
    id: 'ccpp-L01', lecture: 1, title: 'CPU・メモリ・ディスク',
    blocks: [
      'コンピュータは主に **CPU**・**メモリ**・**ディスク** でできている。',
      { list: [
        '**CPU**（中央処理装置）：計算と制御をする中枢部。中に **ALU**（算術論理演算装置）や **レジスタ** がある。',
        '**メモリ**：プログラムやデータを **一時的に** 保存する。電源を切ると消える。',
        '**ディスク**（HDD, SSD）：ソースコードや実行形式を **長期間** 保存する。',
        '**バス**：装置の間でデータを運ぶ伝送路。',
      ] },
      { note: 'プログラムの実行時は、ディスクの実行形式の必要部分がメモリに読み込まれ、CPU がメモリ上の命令を処理する。' },
    ],
    questions: [
      { q: '電源を切っても内容が消えず、実行形式を長期間保存するのはどれ？', choices: ['メモリ', 'ディスク', 'レジスタ', 'ALU'], answer: 1, exp: 'ディスク（HDD, SSD）は長期間保存する格納場所。' },
      { q: 'ビット列の和・論理和・論理積などの計算をする回路は？', choices: ['ALU', 'バス', 'ディスク', 'メモリ'], answer: 0, exp: 'ALU は算術論理演算装置。CPU の中にある。' },
      { q: '実行時、CPU が直接処理する命令が置かれている場所は？', choices: ['ディスク', 'メモリ', 'キーボード', 'モニター'], answer: 1, exp: '実行形式の必要部分がメモリに格納され、CPU がそれに従って処理する。' },
    ],
  },
  {
    id: 'ccpp-L02', lecture: 1, title: 'コンパイラ言語',
    blocks: [
      '**インタプリタ言語**（Python, JavaScript など）は、ソースコードを **1行ずつ** 解釈して実行する。コンパイル不要だが遅い。',
      '**コンパイラ言語**（C, C++, Java など）は、ソースコード全体を **一括で** 機械語に変換してから実行する。この変換を **コンパイル**、変換されたものを **実行形式** という。',
      { code: 'g++ -o test2m test2.cpp', lang: 'text', numbers: false },
      'g++ は C++ のコンパイラ（C は gcc）。上のコマンドで test2.cpp から実行形式 test2m.exe ができる。',
      { note: 'C言語：1972年 Dennis Ritchie（UNIX 開発のため）。C++：1983年 Bjarne Stroustrup（C にオブジェクト指向を追加）。' },
    ],
    questions: [
      { q: 'ソースコード全体を機械語に変換することを何という？', choices: ['インタプリタ', 'コンパイル', 'インクルード', 'デクリメント'], answer: 1, exp: '変換することを「コンパイルする」という。' },
      { q: 'コンパイラ言語の例として正しいものは？', choices: ['Python', 'JavaScript', 'C++', 'basic'], answer: 2, exp: 'C, C++, Java はコンパイラ言語。他はインタプリタ言語の例。' },
      { q: 'コンパイルで作られる、CPU が解釈できる形式のプログラムを何という？', choices: ['ソースコード', 'ヘッダ', '実行形式', 'コメント'], answer: 2, exp: '変換された形式のプログラムを実行形式という。' },
    ],
  },
  {
    id: 'ccpp-L03', lecture: 1, title: '画面に表示する',
    blocks: [
      { code: code`
// 画面への出力を行うプログラム
#include <iostream>
using namespace std;
int main()
{
    cout << "初めてのＣ++プログラム。\n";
    return 0;
}` },
      { list: [
        '`//` から行末まではコメント。',
        '`#include <iostream>`：標準入出力のヘッダを挿入する。',
        '`using namespace std;`：std::cout を cout と書けるようにする。',
        '`int main()`：メインの関数。ここから実行が始まる。int は返却値の型（整数）。',
        '`cout << "…";`：<<（挿入演算子）で文字列を画面に表示。`\\n` は改行。文の終わりは `;`。',
        '`return 0;`：OS に 0 を返す（正常終了）。',
      ] },
    ],
    questions: [
      { q: '`cout << "A\\n";` を実行すると？', choices: ['A と表示して改行', 'A\\n と表示', '何も表示しない', 'A を2回表示'], answer: 0, exp: '\\n は改行を意味する記号。' },
      { q: '`int main()` の int は何を表す？', choices: ['引数の型', '返却値の型（整数型）', 'プログラムの名前', 'コメント'], answer: 1, exp: 'main 関数から返ってくる値の型が int（整数型）。' },
      { q: 'C言語で標準入出力に使うヘッダは？', choices: ['<iostream>', '<stdio.h>', '<string>', '<iomanip>'], answer: 1, exp: 'C では <stdio.h> と printf を使う。' },
    ],
  },
  // ---------- 第2回 ----------
  {
    id: 'ccpp-L04', lecture: 2, title: '変数と型',
    blocks: [
      '変数は数値や文字列の **格納場所**。使う前に **型** を決めて **宣言** する。',
      { table: { cols: ['型', '意味', '大きさ'], rows: [
        ['int', '整数型', '4バイト'], ['float', '単精度浮動小数点型（小数）', '4バイト'], ['double', '倍精度浮動小数点型（小数）', '8バイト'],
        ['char', '1文字（文字コード）', '1バイト'], ['string', '文字列（長さ自動）', '可変'],
      ] } },
      { code: code`
int x;      // 宣言
x = 61;     // 代入
cout << "xの値は" << x << "です。\n";`, numbers: false },
    ],
    questions: [
      { q: '倍精度浮動小数点型はどれ？', choices: ['int', 'float', 'double', 'char'], answer: 2, exp: 'double は倍精度（8バイト）、float は単精度（4バイト）。' },
      { q: '1文字を格納する型は？', choices: ['char', 'string', 'int', 'double'], answer: 0, exp: 'char は1バイトで1文字（文字コード）を格納。' },
      { q: '`int x; x = 61; cout << x + 1;` で表示されるのは？', choices: ['611', '62', 'x + 1', '61'], answer: 1, exp: 'x に格納された 61 に 1 を足した 62。' },
    ],
  },
  {
    id: 'ccpp-L05', lecture: 2, title: '割り算と型',
    blocks: [
      '**int どうし**の割り算 `/` は **商**（小数部分は切り捨て）、`%` は **余り**。',
      { code: code`
int a = 7, b = 2;
cout << a / b;   // 3
cout << a % b;   // 1`, numbers: false },
      'どちらかが **double や float** なら小数の割り算になる。cout は有効数字 **6桁** まで表示する（1/3 → 0.333333）。',
      '小数を **int に代入** すると小数部分が **切り捨て** られる（2.7 → 2、-2.7 → -2）。',
      { note: 'int 型の変数に cin で 1.2 を入力すると、1 までしか読まれない（.2 は読み残し）。' },
    ],
    questions: [
      { q: '`int x = 17, y = 5;` のとき `x % y` は？', choices: ['3', '2', '3.4', '0'], answer: 1, exp: '17 = 5×3 + 2。余りは 2。' },
      { q: '`float x = 1; double y = 3; int z = x / y;` のとき z は？', choices: ['0.333333', '0', '1', '3'], answer: 1, exp: 'x/y = 0.333… を int に代入すると切り捨てで 0。' },
      { q: '`double d = 1; cout << d / 3;` の表示は？', choices: ['0', '0.333333', '0.33', '1/3'], answer: 1, exp: '小数の割り算。cout は6桁で 0.333333。' },
    ],
  },
  {
    id: 'ccpp-L06', lecture: 2, title: 'cin と乱数',
    blocks: [
      '`cin >> x;` でキーボードから入力された値を x に格納する（cin は標準入力）。',
      '`string name; cin >> name;` は **スペースまで** しか読まない。',
      { code: code`
#include <ctime>
#include <cstdlib>
srand(time(NULL));          // 乱数の種を現在時刻で設定
int lucky = rand() % 10;    // 0～9 の乱数`, numbers: false },
      '同じ種だと毎回同じ乱数になるので、time(NULL)（現時刻）を種にする。',
    ],
    questions: [
      { q: '`rand() % 6 + 1` の範囲は？', choices: ['0〜5', '1〜6', '0〜6', '1〜7'], answer: 1, exp: '% 6 で 0〜5、+1 して 1〜6。' },
      { q: '`srand(time(NULL));` の目的は？', choices: ['時刻を表示する', '実行ごとに違う乱数になるよう種を設定する', '乱数を止める', 'プログラムを待たせる'], answer: 1, exp: '時刻を種にすると実行ごとに異なる種になる。' },
      { q: 'string name に「山田 太郎」と入力。name に入るのは？', choices: ['山田 太郎', '山田', '太郎', '何も入らない'], answer: 1, exp: 'cin >> はスペースで区切られる。' },
    ],
  },
  {
    id: 'ccpp-L07', lecture: 2, title: 'if文と論理演算子',
    blocks: [
      { code: code`
if (n > 0)
    cout << "正です。\n";
else if (n < 0)
    cout << "負です。\n";
else
    cout << "０です。\n";`, numbers: false },
      '条件が真なら次の文、偽なら else 以降。複数の文を実行するときは `{ }`（ブロック）で囲む。',
      { list: ['`&&`：論理積（かつ）', '`||`：論理和（または）', '`==`：等しい（`=` は代入！）', '`!=`：等しくない', '`a < b ? a : b`：条件演算子（真なら a、偽なら b）'] },
      { note: 'if の条件は値が 0 なら偽、0 以外なら真とみなされる。' },
    ],
    questions: [
      { q: 'n が 1〜9 のときだけ真になる条件は？', choices: ['n >= 1 || n <= 9', 'n >= 1 && n <= 9', 'n > 1 && n < 9', '1 <= n <= 9'], answer: 1, exp: '「1以上 かつ 9以下」なので &&。' },
      { q: '`int min = a < b ? a : b;` で a=8, b=3 のとき min は？', choices: ['8', '3', '1', '0'], answer: 1, exp: 'a < b は偽なので b。' },
      { q: '偶数かどうかの条件は？', choices: ['n / 2 == 0', 'n % 2 == 0', 'n % 2 == 1', 'n = 2'], answer: 1, exp: '2で割った余り（%）が0なら偶数。' },
    ],
  },
  // ---------- 第3回 ----------
  {
    id: 'ccpp-L08', lecture: 3, title: 'switch文',
    blocks: [
      'switch ( ) の値に従って、同じ値の **case ラベルに jump** し、**それ以降** の文を実行する。',
      { code: code`
switch (hand) {
    case 0: cout << "グー\n";   break;
    case 1: cout << "チョキ\n"; break;
    case 2: cout << "パー\n";   break;
    default: cout << "?\n";
}`, numbers: false },
      '**break** で switch から抜け出す。break が無いと **下の case の文も続けて実行** される。当てはまる case が無ければ **default** へ。',
    ],
    questions: [
      { q: 'case 1 の break を消して hand=1 を入力すると？', choices: ['チョキ', 'チョキ(改行)パー', 'パー', 'チョキ(改行)パー(改行)?'], answer: 1, exp: 'case 1 から下に進み、case 2 の break で抜ける。' },
      { q: 'hand=7 を入力すると？', choices: ['何も表示しない', 'グー', '?', 'パー'], answer: 2, exp: '当てはまらないので default へ。' },
      { q: 'break の意味は？', choices: ['プログラムを終了', 'switch での処理を終了し抜け出す', '次の case へ進む', '先頭に戻る'], answer: 1, exp: 'switch（やループ）から抜け出す。' },
    ],
  },
  {
    id: 'ccpp-L09', lecture: 3, title: 'do文と while文',
    blocks: [
      { code: code`
do {
    cout << "正の整数値：";
    cin >> x;
} while (x <= 0);       // 0以下なら、もう一度

while (x >= 0) {
    cout << x << "\n";
    x--;                // xを1減らす
}`, numbers: false },
      '**do文**：まず中身を **1回実行してから** 条件を調べる。条件が真なら do に戻る。',
      '**while文**：**先に** 条件を調べる。最初から偽なら1回も実行しない。',
      { note: '入力のやり直しは do-while で「正しくない値の間」くり返す。例：20以下の正の整数 → while (x <= 0 || x > 20);' },
    ],
    questions: [
      { q: 'x=10 のとき `do { cout << "A"; } while (x < 5);` の表示は？', choices: ['何も表示しない', 'A', 'AAAAA', 'エラー'], answer: 1, exp: 'do は先に1回実行する。' },
      { q: '1〜20 以外が入力されたらやり直す do-while の条件は？', choices: ['x > 0 && x <= 20', 'x <= 0 || x > 20', 'x <= 20', 'x > 20'], answer: 1, exp: '「正しくない値」の間くり返すので x <= 0 || x > 20。' },
      { q: 'x=2 で上の while (x >= 0) の表示は？', choices: ['2 1', '2 1 0', '1 0', '2 1 0 -1'], answer: 1, exp: 'x が -1 になったら終了。0 も表示される。' },
    ],
  },
  {
    id: 'ccpp-L10', lecture: 3, title: '増分・減分演算子',
    blocks: [
      '`x++`（インクリメント）は x を1増やす、`x--`（デクリメント）は1減らす。',
      { table: { cols: ['書き方', '名前', '動作'], rows: [
        ['y = x++;', '後置増分', 'y に今の x を代入してから x を1増やす'],
        ['y = ++x;', '前置増分', 'x を1増やしてから y に代入'],
        ['cout << x--;', '後置減分', '減らす前の値を表示し、その後 x を1減らす'],
      ] } },
    ],
    questions: [
      { q: 'x=5 で `y = x++;` の後の y と x は？', choices: ['y=5, x=6', 'y=6, x=6', 'y=6, x=5', 'y=5, x=5'], answer: 0, exp: '後置：先に代入、後で増やす。' },
      { q: 'x=5 で `y = ++x;` の後の y は？', choices: ['5', '6', '7', '4'], answer: 1, exp: '前置：先に増やしてから代入。' },
      { q: '`x--;` と同じ意味は？', choices: ['x = x - 1;', 'x = -x;', 'x == x - 1;', 'x = 0;'], answer: 0, exp: '減分演算子。' },
    ],
  },
  {
    id: 'ccpp-L11', lecture: 3, title: 'for文と多重ループ',
    blocks: [
      '`for (A; B; C)`：A＝**初期化**（最初の1回だけ）、B＝**条件式**、C＝**後処理**。',
      { code: code`
for (int i = 1; i <= n; i++) {      // 行
    for (int j = 1; j <= i; j++)    // 列
        cout << '*';
    cout << '\n';
}`, numbers: false },
      'n=3 なら `*` / `**` / `***` の左そろえの三角形になる（多重ループ）。',
      '`setw(3)`（#include <iomanip>）は次の出力を **少なくとも3桁の幅**（右寄せ）にする。',
    ],
    questions: [
      { q: '`for (int i = 0; i < 4; i++) cout << i;` の表示は？', choices: ['1234', '0123', '01234', '123'], answer: 1, exp: 'i = 0,1,2,3。' },
      { q: '外側3回・内側4回の二重ループで、内側の本体は何回実行される？', choices: ['7回', '12回', '4回', '3回'], answer: 1, exp: '3 × 4 = 12。' },
      { q: '`cout << setw(3) << 7;` の表示（␣は空白）は？', choices: ['7', '␣␣7', '7␣␣', '007'], answer: 1, exp: '3桁の幅で右寄せ。' },
    ],
  },
  {
    id: 'ccpp-L12', lecture: 3, title: 'break・continue・goto',
    blocks: [
      { list: [
        '**break**：それを **直接含むループ** から抜け出す（多重ループ全体ではない）。',
        '**continue**：残りを飛ばして **次の繰り返し** に進む。for なら i++ をして条件判定へ。',
        '**goto ラベル;**：ラベル（`Exit:` など）の付いた行に jump する。',
      ] },
      { code: code`
for (int i = 0; i < n; i++) {
    cin >> t;
    if (t < 0) {
        cout << "負の数は加算しません。\n";
        continue;   // sum += t; を飛ばす
    }
    sum += t;
}`, numbers: false },
    ],
    questions: [
      { q: '上のプログラムで n=3, t=3,8,-1 のとき sum は？', choices: ['10', '11', '3', '0'], answer: 1, exp: '-1 は加算されない。3 + 8 = 11。' },
      { q: 'continue の後、for 文では何が起こる？', choices: ['ループを終了', 'i++ をして条件を判定し次の繰り返しへ', 'プログラム終了', 'if の先頭に戻る'], answer: 1, exp: 'ループの一番最後に jump し、次の繰り返しへ。' },
      { q: '多重ループの内側で break すると？', choices: ['全部のループから抜ける', '内側のループだけから抜ける', 'プログラム終了', '外側の先頭に戻る'], answer: 1, exp: '直接含んでいるループだけ。' },
    ],
  },
  // ---------- 第4回 ----------
  {
    id: 'ccpp-L13', lecture: 4, title: '配列',
    blocks: [
      '**配列**：同じ名前で複数のデータをまとめたもの。`int a[5];` は要素型 int・要素数5。',
      '**添字は 0 から**。`a[0]`〜`a[4]`（a[5] は無い！）',
      { code: code`
int a[5] = {1, 2, 3, 4, 5};     // 宣言と初期化
for (int i = 0; i < 5; i++)
    cout << a[i] << ' ';`, numbers: false },
      '初期値が足りない要素は 0 になる。`int a[] = {…};` は要素数を省略（初期値の数になる）。',
      '`sizeof(a) / sizeof(a[0])` で要素数が計算できる（全体のバイト数 ÷ 1要素のバイト数）。',
    ],
    questions: [
      { q: '`int a[5];` の最後の要素は？', choices: ['a[5]', 'a[4]', 'a[6]', 'a[1]'], answer: 1, exp: '添字は 0〜4。' },
      { q: '`for (i=0;i<5;i++) a[i] = i + 1;` の後の a[0] は？', choices: ['0', '1', '5', '2'], answer: 1, exp: 'a[0] = 0 + 1 = 1。' },
      { q: 'int が4バイトで `int a[] = {1,2,3};` のとき sizeof(a) は？', choices: ['3', '4', '12', '1'], answer: 2, exp: '4 × 3 = 12 バイト。' },
    ],
  },
  {
    id: 'ccpp-L14', lecture: 4, title: '配列の反転',
    blocks: [
      { code: code`
const int n = 7;
for (int i = 0; i < n / 2; i++) {
    int t = a[i];           // 退避
    a[i] = a[n - i - 1];    // 上書きコピー
    a[n - i - 1] = t;       // 退避した値をコピー
}`, numbers: false },
      'a[i] と a[n-i-1] を入れ替える。n=7 なら i = 0,1,2 の3回（真ん中の a[3] はそのまま）。',
      { note: 't に退避しないと元の値が消えてしまう。' },
    ],
    questions: [
      { q: 'a = {1,2,3,4,5,6,7} を反転した後の a[0] は？', choices: ['1', '7', '6', '0'], answer: 1, exp: 'a[0] と a[6] が入れ替わる。' },
      { q: 'n=7 のとき for は何回くり返す？', choices: ['7回', '3回', '4回', '6回'], answer: 1, exp: 'n/2 = 3（int の割り算）。' },
      { q: '反転した後の a[3] は？', choices: ['3', '4', '5', '7'], answer: 1, exp: '真ん中はそのまま 4。' },
    ],
  },
  {
    id: 'ccpp-L15', lecture: 4, title: '2次元配列と行列の和',
    blocks: [
      '`int m[3][2];` は **3行2列**。m[行][列]。',
      { code: code`
int a[2][3] = { {1, 2, 3}, {4, 5, 6} };
int b[2][3] = { {6, 3, 4}, {5, 1, 2} };
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 3; j++)
        c[i][j] = a[i][j] + b[i][j];`, numbers: false },
      '行列の和は **同じ位置どうし** を足す：c = {{7,5,7},{9,6,8}}。外側の for で行、内側の for で列を変える。',
    ],
    questions: [
      { q: '上の a で a[1][0] は？', choices: ['2', '4', '1', '5'], answer: 1, exp: '2行目 {4,5,6} の 0 番目。' },
      { q: '上の c で c[0][1] は？', choices: ['5', '7', '3', '2'], answer: 0, exp: '2 + 3 = 5。' },
      { q: '`int m[3][2];` の要素の数は全部で？', choices: ['5', '6', '32', '3'], answer: 1, exp: '3 × 2 = 6。' },
    ],
  },
  // ---------- 第5回 ----------
  {
    id: 'ccpp-L16', lecture: 5, title: '関数の定義と呼び出し',
    blocks: [
      { code: code`
int calc_max(int a, int b, int c)   // 関数頭部
{                                   // ↓ 関数本体
    int max_val = a;
    if (b > max_val) max_val = b;
    if (c > max_val) max_val = c;
    return max_val;
}`, numbers: false },
      { list: ['**返却値の型**：int', '**関数名**：calc_max', '**仮引数**：a, b, c（実引数の値を受け取る）', '**実引数**：呼び出し時に渡す値。例 `calc_max(math[0], math[1], math[2])`', '**return**：関数を終了し、値を呼び出し元に返す'] },
      '関数の中で宣言した変数（max_val）は **ローカル変数** で、その関数の中でしか使えない。',
    ],
    questions: [
      { q: '`calc_max(4, 9, 2)` の値は？', choices: ['4', '9', '2', '15'], answer: 1, exp: '最大値 9 を返す。' },
      { q: '関数定義の ( ) の中の int a, int b を何という？', choices: ['実引数', '仮引数', '返却値', 'ラベル'], answer: 1, exp: '仮引数（仮引数宣言）。' },
      { q: '値を返さない関数の返却値の型は？', choices: ['int', 'void', 'null', 'bool'], answer: 1, exp: 'void は「何もない」。' },
    ],
  },
  {
    id: 'ccpp-L17', lecture: 5, title: '値渡しと関数宣言',
    blocks: [
      '**値渡し**：実引数の値が仮引数に **コピー** される。関数の中で仮引数を変えても、呼び出し元の変数は **変わらない**。',
      { code: code`
double power(double x, int n)
{
    double tmp = 1.0;
    while (n-- > 0)
        tmp *= x;
    return tmp;         // x の n 乗
}
// main：power(a, b) の後も b は変わらない`, numbers: false },
      '**関数宣言（プロトタイプ）**：定義より前で呼ぶときに必要。`int calc_max(int, int, int);`（末尾に ;、仮引数名は省略可）',
    ],
    questions: [
      { q: 'a=2, b=4 で power(a, b) の値は？', choices: ['8', '16', '6', '2'], answer: 1, exp: '2 の 4 乗 = 16。' },
      { q: 'power(a, b) を呼んだ後の b は？（b=4）', choices: ['4', '-1', '0', '3'], answer: 0, exp: '値渡しなので変わらない。' },
      { q: '関数宣言として正しいのは？', choices: ['int f(int a)', 'int f(int a);', 'f(int a);', 'int f;'], answer: 1, exp: '本体の無い頭部＋セミコロン。' },
    ],
  },
  {
    id: 'ccpp-L18', lecture: 5, title: '再帰とデフォルト実引数',
    blocks: [
      '**再帰**：関数の中で自分自身を呼ぶ。終わらせる **基底部** が必要。',
      { code: code`
int factorial(int n)
{
    if (n > 0)
        return n * factorial(n - 1);    // 再帰呼び出し
    else
        return 1;                       // 基底部
}`, numbers: false },
      '**デフォルト実引数**：`void alerts(int n = 3)` は alerts() と呼ぶと n=3。指定は **右側の仮引数から**。',
    ],
    questions: [
      { q: 'factorial(4) は？', choices: ['10', '24', '4', '12'], answer: 1, exp: '4×3×2×1 = 24。' },
      { q: '`return n * factorial(n - 1);` の return を消すと？', choices: ['同じ動き', '値が返らず正しく計算できない', '速くなる', '2倍になる'], answer: 1, exp: '値を返すには return が必要。' },
      { q: '`int add(int a, int b = 10)` で add(3) は？', choices: ['3', '10', '13', 'エラー'], answer: 2, exp: 'b はデフォルトの 10。' },
    ],
  },
  {
    id: 'ccpp-L19', lecture: 5, title: 'ビット演算とシフト',
    blocks: [
      { table: { cols: ['演算子', '名前', '1になる条件'], rows: [
        ['&', 'ビット積（AND）', '両方 1'], ['|', 'ビット和（OR）', 'どちらか 1'], ['^', '排他的論理和（XOR）', '異なるとき'], ['~', '補数', '全ビット反転'],
      ] } },
      '例：12 (1100) と 10 (1010) → `&` = 1000 = 8、`|` = 1110 = 14、`^` = 0110 = 6',
      '**シフト**：`x << n` は n ビット左（2のn乗倍）、`x >> n` は右（2のn乗で割る）。',
    ],
    questions: [
      { q: '5 (0101) & 3 (0011) は？', choices: ['1', '7', '6', '15'], answer: 0, exp: '0001 = 1。' },
      { q: '5 | 3 は？', choices: ['1', '7', '6', '8'], answer: 1, exp: '0111 = 7。' },
      { q: '3 << 2 は？', choices: ['6', '12', '1', '5'], answer: 1, exp: '3 × 4 = 12。' },
    ],
  },
  // ---------- 第6回 ----------
  {
    id: 'ccpp-L20', lecture: 6, title: 'ポインタの基本',
    blocks: [
      { code: code`
int n = 135;
int* ptr = &n;      // ptr は n を指す
cout << ptr;        // n のアドレス（番地）
cout << *ptr;       // 135`, numbers: false },
      { list: ['`&n`：**アドレス演算子**。n の格納場所のアドレス。', '`int*`：int へのポインタの型。ptr には **アドレス** が入る。', '`*ptr`：**間接演算子**。ptr が指す格納場所の **中身**（n そのもの）。'] },
      { note: '`*ptr = 999;` とすると n が 999 になる。「ポインタの値（アドレス）」と「指す中身」を区別しよう。' },
    ],
    questions: [
      { q: '`int x = 5; int* p = &x; *p = 8;` の後の x は？', choices: ['5', '8', 'x のアドレス', '13'], answer: 1, exp: '*p は x そのもの。' },
      { q: '`p` に入っているのは？', choices: ['5', 'x のアドレス', '8', 'p のアドレス'], answer: 1, exp: 'ポインタにはアドレスが入る。' },
      { q: '& の名前は？', choices: ['間接演算子', 'アドレス演算子', '添字演算子', '挿入演算子'], answer: 1, exp: '& はアドレス演算子、* は間接演算子。' },
    ],
  },
  {
    id: 'ccpp-L21', lecture: 6, title: 'ポインタを関数に渡す',
    blocks: [
      '値渡しでは呼び出し元の変数を変えられない。そこで **アドレスを渡し**、関数の中で `*` を使って書き込む。',
      { code: code`
void sum_mul(int x, int y, int* sum, int* mul)
{
    *sum = x + y;
    *mul = x * y;
}
// 呼び出し
sum_mul(a, b, &wa, &seki);`, numbers: false },
      '`&wa` で wa のアドレスを渡す。関数の中の `*sum = …` で wa の格納場所に結果が入る。',
    ],
    questions: [
      { q: 'sum_mul の呼び出しとして正しいのは？', choices: ['sum_mul(a, b, wa, seki);', 'sum_mul(a, b, &wa, &seki);', 'sum_mul(a, b, *wa, *seki);', 'sum_mul(a, b, int* wa, int* seki);'], answer: 1, exp: 'アドレス &wa, &seki を渡す。' },
      { q: 'a=3, b=4 で呼んだ後の seki は？', choices: ['7', '12', '0', '34'], answer: 1, exp: '3 × 4 = 12。' },
      { q: '関数の中で `p++;`（* なし）をすると？', choices: ['指す中身が1増える', 'ポインタ（アドレス）が進むだけ', '呼び出し元の変数が1増える', 'エラー'], answer: 1, exp: '* が無いのでポインタ自身が変わる。' },
    ],
  },
  {
    id: 'ccpp-L22', lecture: 6, title: '配列とポインタ',
    blocks: [
      '配列名 `a` は **先頭のアドレス**（`a == &a[0]`）。`int* p = a;` で p も配列のように使える。',
      { table: { cols: ['同じ意味', ''], rows: [['a[i]', '*(a + i)'], ['p[i]', '*(p + i)'], ['&a[i]', 'a + i']] } },
      '関数に配列を渡すと **先頭アドレス** が渡る（コピーではない）。だから関数の中で中身を変えると元の配列も変わる。',
      { code: code`
int seq_search(int* a, int n, int key)
{
    for (int i = 0; i < n; i++)
        if (*a++ == key)    // 中身と key を比べてから a を進める
            return i;
    return -1;
}`, numbers: false },
    ],
    questions: [
      { q: '`int a[] = {10,20,30}; int* p = a;` で *(p + 1) は？', choices: ['11', '20', '30', '10'], answer: 1, exp: 'a[1] = 20。' },
      { q: '`*a++ == key` の動作は？', choices: ['アドレスと key を比べる', '中身と key を比べてから a（アドレス）を1進める', '中身を1増やしてから比べる', 'a を進めてから比べる'], answer: 1, exp: '後置 ++ なので比べた後にポインタを進める。' },
      { q: 'seq_search(x, 8, key) で渡される x は？', choices: ['全要素のコピー', '配列 x の先頭のアドレス', 'x[0] の値', '要素数'], answer: 1, exp: '配列名は先頭アドレス。' },
    ],
  },
  {
    id: 'ccpp-L23', lecture: 6, title: 'new と delete',
    blocks: [
      '実行中に必要な分だけ記憶域を確保できる（**動的記憶域期間**）。',
      { code: code`
int* x = new int;           // int 1個を確保
delete x;                   // 解放

int* a = new int[asize];    // 要素数 asize の配列を確保
a[0] = 5;                   // 配列のように使える
delete[] a;                 // 配列は delete[] で解放`, numbers: false },
    ],
    questions: [
      { q: '`new int[n]` が返すものは？', choices: ['n の値', '確保した配列の先頭アドレス', '要素数', '0'], answer: 1, exp: '先頭アドレスをポインタに入れる。' },
      { q: 'new int[n] で確保した領域を解放するのは？', choices: ['delete a;', 'delete[] a;', 'free a;', 'a = 0;'], answer: 1, exp: '配列は delete[]。' },
      { q: '`int* a = new int[4]; for (i=0;i<4;i++) a[i] = i * i;` で a[3] は？', choices: ['3', '9', '16', '6'], answer: 1, exp: '3 × 3 = 9。' },
    ],
  },
  {
    id: 'ccpp-L24', lecture: 6, title: 'まとめ：本番の形に慣れる',
    blocks: [
      '本番は **全30問・5択**。行番号付きのコードについて2〜4問ずつ出る。',
      { list: [
        '「N行目の説明として適切なものは」→ 講義資料の言い回しで覚える（例：倍精度浮動小数点型（小数）の変数 y の宣言）。',
        '「???? に入るもの」→ 条件の向き（くり返す条件か、抜ける条件か）、`return` の有無、`&` の有無に注意。',
        '「実行結果」→ 型（int の切り捨て）、(改行) の有無、表示の順番。',
        '「配列の中身」→ 添字は 0 始まり。',
      ] },
      { note: 'このコースを終えたら「模試（30問）」に挑戦しよう！' },
    ],
    questions: [
      { q: '`int z = 7 / 2;` の z は？', choices: ['3.5', '3', '4', '1'], answer: 1, exp: 'int の割り算は切り捨て。' },
      { q: '再帰の正しい形は？', choices: ['n * factorial(n - 1);', 'return n * factorial(n - 1);', 'return n * factorial(n);', 'return n * (n - 1);'], answer: 1, exp: 'return が必要で、n-1 で呼ぶ。' },
      { q: '`const int n = 7; int a[n];` の添字の範囲は？', choices: ['1〜7', '0〜6', '0〜7', '1〜6'], answer: 1, exp: '0 から n-1 まで。' },
    ],
  },
];
