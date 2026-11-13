// 第2回 変数・キーボードからの入力・if文（講義資料 ccpp_02 の List をもとにしたオリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l2-g01', lecture: 2, type: 'output',
    title: 'int型変数の宣言（List 1-7）',
    code: code`
// 二つの変数xとyの合計と平均を表示
#include <iostream>
using namespace std;
int main()
{
    int x;      // xはint型の変数
    int y;      // yはint型の変数
    x = 61;     // xに61を代入
    y = 19;     // yに19を代入
    cout << "xの値は" << x << "です。\n";
    cout << "yの値は" << y << "です。\n";
    cout << "合計は" << x + y << "です。\n";
    cout << "平均は" << (x + y) / 2 << "です。\n";
}`,
    run: [{ stdin: '', contains: ['合計は80です。', '平均は40です。'] }],
    questions: [
      {
        id: 'ccpp-l2-q01', q: '6行目 int x; の説明として適切なものはどれか。', line: 6, lineHas: 'int x;',
        choices: ['変数 x に整数を代入する', '型が整数型 int の変数 x を確保するよう宣言する', '整数を画面に表示する', 'x という関数を宣言する', '小数型の変数 x を宣言する'],
        answer: 1, exp: '「型」が整数型 int の変数 x を確保するよう「宣言」する。32/64ビットのコンピュータなら 4 バイトが確保される。',
      },
      {
        id: 'ccpp-l2-q02', q: '12行目で表示されるものはどれか。', line: 12, lineHas: '合計',
        choices: ['合計はx + yです。', '合計は6119です。', '合計は80です。', '合計は42です。', '合計は61 + 19です。'],
        answer: 2, exp: '<< x + y は x と y に格納された値の和（61+19=80）を表示する。',
      },
      {
        id: 'ccpp-l2-q03', q: '13行目で表示されるものはどれか。', line: 13, lineHas: '平均',
        choices: ['平均は40です。', '平均は40.0です。', '平均は80です。', '平均は49.5です。', '平均は39です。'],
        answer: 0, exp: '(x + y) / 2 = 80 / 2 = 40。int どうしの割り算の結果は int。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g02', lecture: 2, type: 'output',
    title: '加減乗除（List 1-10）',
    code: code`
// 二つの整数値を読み込んで加減乗除した値を表示
#include <iostream>
using namespace std;
int main()
{
    int x;  // 加減乗除する値
    int y;  // 加減乗除する値
    cout << "xとyを加減乗除します。\n";
    cout << "xの値：";   // xの値の入力を促す
    cin >> x;            // xに整数値を読み込む
    cout << "yの値：";   // yの値の入力を促す
    cin >> y;            // yに整数値を読み込む
    cout << "x + yは" << x + y << "です。\n";
    cout << "x - yは" << x - y << "です。\n";
    cout << "x * yは" << x * y << "です。\n";
    cout << "x / yは" << x / y << "です。\n";
    cout << "x % yは" << x % y << "です。\n";
}`,
    run: [{ stdin: '17\n5\n', contains: ['x / yは3です。', 'x % yは2です。', 'x - yは12です。'] }],
    questions: [
      {
        id: 'ccpp-l2-q04', q: '10行目 cin >> x; の説明として適切なものはどれか。', line: 10, lineHas: 'cin >> x;',
        choices: ['x の値を画面に表示する', 'キーボードから入力された数字を変数 x に格納する', 'x を 0 で初期化する', 'x を右に1ビットずらす', 'x と cin を比べる'],
        answer: 1, exp: 'cin は std::cin の省略形で「標準入力」（通常はキーボード）。cin >> x; はキー入力による数字を x に格納する。',
      },
      {
        id: 'ccpp-l2-q05', q: 'x に 17、y に 5 を入力したとき、16行目で表示されるものはどれか。', line: 16, lineHas: 'x / y',
        choices: ['x / yは3.4です。', 'x / yは3です。', 'x / yは4です。', 'x / yは2です。', 'x / yは3.400000です。'],
        answer: 1, exp: 'int どうしの / は商（小数部分は切り捨て）。17 / 5 = 3。',
      },
      {
        id: 'ccpp-l2-q06', q: '同じ入力で 17行目で表示されるものはどれか。', line: 17, lineHas: 'x % y',
        choices: ['x % yは3です。', 'x % yは0.4です。', 'x % yは2です。', 'x % yは85です。', 'x % yは12です。'],
        answer: 2, exp: '% は剰余（割り算の余り）。17 = 5 × 3 + 2 なので 2。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g03', lecture: 2, type: 'output',
    title: 'float型・double型（List 1-13m）',
    code: code`
// 三つの実数値を読み込んで除算の値を表示
#include <iostream>
using namespace std;
int main()
{
    float x;    // float型の変数
    double y;   // double型の変数
    int z;      // int型の変数
    cout << "x/yを計算します。\n";
    cout << "z/yを計算します。\n";
    cout << "xの値：";
    cin >> x;
    cout << "yの値：";
    cin >> y;
    cout << "zの値：";
    cin >> z;
    cout << "x / yは" << x / y << "です。\n";
    cout << "z / yは" << z / y << "です。\n";
}`,
    run: [
      { stdin: '1\n4\n2\n', contains: ['x / yは0.25です。', 'z / yは0.5です。'] },
      { stdin: '2\n3\n2.9\n', contains: ['z / yは0.666667です。'] },
    ],
    questions: [
      {
        id: 'ccpp-l2-q07', q: '7行目 double y; の説明として適切なものはどれか。', line: 7, lineHas: 'double y;',
        choices: ['単精度浮動小数点型（小数）の変数 y の宣言。4バイトの長さを確保する', '倍精度浮動小数点型（小数）の変数 y の宣言。8バイトの長さを確保する', '整数型の変数 y の宣言。8バイトの長さを確保する', '倍精度浮動小数点型（整数）の変数 y の宣言', '文字型の変数 y の宣言'],
        answer: 1, exp: 'double は倍精度浮動小数点型で 8バイト=64bit（float型4バイトの2倍の長さ）。',
      },
      {
        id: 'ccpp-l2-q08', q: 'x に 1、y に 4、z に 2 を入力したとき、18行目で表示されるものはどれか。', line: 18, lineHas: 'z / y',
        choices: ['z / yは0です。', 'z / yは0.5です。', 'z / yは2です。', 'z / yは0.500000です。', 'z / yは1/2です。'],
        answer: 1, exp: 'z は int でも y が double なので z / y は小数の割り算になり 0.5。cout は余分な 0 を表示しない。',
      },
      {
        id: 'ccpp-l2-q09', q: 'x に 2、y に 3、z に 2.9 を入力したとき、18行目で表示されるものはどれか。', line: 18, lineHas: 'z / y',
        choices: ['z / yは0.966667です。', 'z / yは0.666667です。', 'z / yは0です。', 'z / yは1です。', 'z / yは0.966666です。'],
        answer: 1, exp: 'z は int 型なので cin は「2」までしか読まない（z = 2）。2 / 3 = 0.666666… を cout は有効数字6桁で 0.666667 と表示する。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g04', lecture: 2, type: 'meaning',
    title: '乱数の生成（List 1-16）',
    code: code`
// 0～9のラッキーナンバーを乱数で生成して表示
#include <ctime>
#include <cstdlib>
#include <iostream>
using namespace std;
int main()
{
    srand(time(NULL));          // 乱数の種を設定
    int lucky = rand() % 10;    // 0～9の乱数
    cout << "今日のラッキーナンバーは" << lucky << "です。\n";
}`,
    run: [{ stdin: '', contains: ['今日のラッキーナンバーは'] }],
    questions: [
      {
        id: 'ccpp-l2-q10', q: '8行目 srand(time(NULL)); の説明として適切なものはどれか。', line: 8, lineHas: 'srand',
        choices: ['現在時刻を画面に表示する', 'プログラムが実行された時刻を入力として乱数の「種」を設定する。実行するたびに異なる種になる', '乱数を10個作る', 'プログラムを一時停止する', '乱数の最大値を時刻にする'],
        answer: 1, exp: 'rand は「種」をもとに乱数を生成する。同じ種だと同じ乱数になってしまうので、time(NULL)（現時刻）を種にする。',
      },
      {
        id: 'ccpp-l2-q11', q: '9行目で lucky に代入される値はどれか。', line: 9, lineHas: 'rand() % 10',
        choices: ['0, 1, …, 9 のどれか', '1, 2, …, 10 のどれか', '0, 1, …, 10 のどれか', '10 の倍数のどれか', '常に 0'],
        answer: 0, exp: 'rand() % 10 は乱数を10で割った余りなので 0〜9（10の剰余系）。',
      },
      {
        id: 'ccpp-l2-q12', q: '3行目 #include <cstdlib> の説明として適切なものはどれか。', line: 3, lineHas: '<cstdlib>',
        choices: ['日付・時間のライブラリ用ヘッダ', '乱数生成関数を含む汎用的な関数用のライブラリ用ヘッダ', '文字列クラスのヘッダ', '標準入出力のヘッダ', '出力幅をそろえるためのヘッダ'],
        answer: 1, exp: '<cstdlib> は rand, srand など汎用的な関数のヘッダ。<ctime> は日付・時間のヘッダ。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g05', lecture: 2, type: 'meaning',
    title: '文字と文字列の読み込み（List 1-17, 1-18）',
    code: code`
// 文字と名前を読み込む
#include <string>
#include <iostream>
using namespace std;
int main()
{
    char c;         // 文字
    string name;    // 名前
    cout << "文字を入力してください：";
    cin >> c;
    cout << "お名前は：";
    cin >> name;
    cout << "打ち込んだ文字は" << c << "です。\n";
    cout << "こんにちは" << name << "さん。\n";
}`,
    run: [
      { stdin: 'ABC\n', contains: ['打ち込んだ文字はAです。', 'こんにちはBCさん。'] },
      { stdin: 'Q\nReitaku Taro\n', contains: ['こんにちはReitakuさん。'] },
    ],
    questions: [
      {
        id: 'ccpp-l2-q13', q: '7行目 char c; の説明として適切なものはどれか。', line: 7, lineHas: 'char c;',
        choices: ['可変長の文字列を格納する変数 c の宣言', '1文字を格納する char 型の変数 c の宣言。メモリ上の大きさは1バイトで、文字コードが格納される', '整数を4バイトで格納する変数 c の宣言', '小数を格納する変数 c の宣言', '定数 c の宣言'],
        answer: 1, exp: 'char は1文字の型で1バイト。例えば「A」なら ASCII コード 16進数の 41 が格納される。',
      },
      {
        id: 'ccpp-l2-q14', q: '8行目 string name; の説明として適切なものはどれか。', line: 8, lineHas: 'string name;',
        choices: ['1文字だけを格納する変数の宣言', 'string型（文字列）変数の宣言。語長に合わせて格納場所の大きさを自動で調整する', '名前を画面に表示する', '整数型の変数 name の宣言', '<string> をインクルードする'],
        answer: 1, exp: 'std::string の省略形。可変長の文字列を格納する変数。使うには #include <string> が必要。',
      },
      {
        id: 'ccpp-l2-q15', q: '文字に Q、名前に Reitaku Taro（間にスペース）と入力したとき、14行目で表示されるものはどれか。', line: 14, lineHas: 'name',
        choices: ['こんにちはReitaku Taroさん。', 'こんにちはReitakuさん。', 'こんにちはTaroさん。', 'こんにちはQさん。', 'こんにちはReitakuTaroさん。'],
        answer: 1, exp: 'cin >> name はスペースで区切られるので「Reitaku」までしか読まない（スペースは無視）。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g06', lecture: 2, type: 'output',
    title: '正・負・ゼロの判定（List 2-5）',
    code: code`
// 読み込んだ整数値の符号（正／負／０）を判定して表示
#include <iostream>
using namespace std;
int main()
{
    int n;
    cout << "整数値：";
    cin >> n;
    if (n > 0)
        cout << "その値は正です。\n";
    else if (n < 0)
        cout << "その値は負です。\n";
    else
        cout << "その値は０です。\n";
}`,
    run: [{ stdin: '0\n', contains: ['その値は０です。'] }, { stdin: '-0.5\n', contains: ['その値は０です。'] }],
    questions: [
      {
        id: 'ccpp-l2-q16', q: 'n に 0 を入力したとき表示されるものはどれか。',
        choices: ['その値は正です。', 'その値は負です。', 'その値は０です。', 'その値は正です。(改行)その値は０です。', '何も表示されない'],
        answer: 2, exp: 'n > 0 も n < 0 も偽なので、最後の else が実行される。',
      },
      {
        id: 'ccpp-l2-q17', q: 'n に -0.5 を入力したとき表示されるものはどれか。',
        choices: ['その値は正です。', 'その値は負です。', 'その値は０です。', 'その値は-0.5です。', '何も表示されない'],
        answer: 2, exp: 'n は int 型。cin は「-0」まで読み、n には 0 が入る（.5 は読み残し）。よって「その値は０です。」。',
      },
      {
        id: 'ccpp-l2-q18', q: '11行目 else if (n < 0) の説明として適切なものはどれか。', line: 11, lineHas: 'else if',
        choices: ['n < 0 のときだけ9行目に戻る', '9行目の条件が偽のときに n < 0 を調べ、真なら12行目、偽なら13行目の else 以降を実行する', 'n < 0 なら必ずプログラムを終了する', '9行目の条件が真のときに調べる', 'n を 0 にする'],
        answer: 1, exp: 'else の条件付き実行文。前の if が偽のときに ( ) の条件を調べ、真なら次の文、偽なら下の else 以降を実行。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g07', lecture: 2, type: 'fill',
    title: '桁数の判定（List 2-7）',
    intro: '読み込んだ整数値が、ゼロ／１桁／２桁以上 のどれかを判定するプログラムである（負の数も考える）。',
    code: code`
// 読み込んだ整数値の桁数（ゼロ／１桁／２桁以上）を判定
#include <iostream>
using namespace std;
int main()
{
    int n;
    cout << "整数値：";
    cin >> n;
    if (n == 0)                         // ゼロ
        cout << "その値はゼロです。\n";
    else if (????????)                  // １桁
        cout << "その値は１桁です。\n";
    else                                // ２桁以上
        cout << "その値は２桁以上です。\n";
}`,
    fill: ['n >= -9 && n <= 9'],
    run: [{ stdin: '-7\n', contains: ['１桁'] }, { stdin: '-10\n', contains: ['２桁以上'] }, { stdin: '9\n', contains: ['１桁'] }],
    questions: [
      {
        id: 'ccpp-l2-q19', q: '11行目の ???????? に入るものはどれか。', line: 11, lineHas: '????????', mono: true,
        choices: ['n >= -9 || n <= 9', 'n >= -9 && n <= 9', 'n > 0 && n <= 9', '-9 <= n <= 9', 'n >= 1 && n <= 9'],
        answer: 1, exp: '「-9 以上 かつ 9 以下」なので論理積演算子 && を使う。|| だと全ての整数が真。-9 <= n <= 9 は C++ では意図通りに動かない。',
      },
      {
        id: 'ccpp-l2-q20', q: '&& の説明として適切なものはどれか。',
        choices: ['論理和。どちらか一方が真なら真', '論理積。両方が真のときだけ真', '左と右の値の和', 'ビットを左にずらす', '条件演算子'],
        answer: 1, exp: '&& は「論理積演算子」で「x かつ y」。|| は「論理和演算子」で「x または y」。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g08', lecture: 2, type: 'meaning',
    title: '条件演算子（List 2-11）',
    code: code`
// 読み込んだ二つの整数値の小さいほうの値を表示（条件演算子）
#include <iostream>
using namespace std;
int main()
{
    int a, b;
    cout << "整数a：";  cin >> a;
    cout << "整数b：";  cin >> b;
    int min = a < b ? a : b;    // 小さいほうの値
    cout << "小さいほうの値は" << min << "です。\n";
}`,
    run: [{ stdin: '8\n3\n', contains: ['小さいほうの値は3です。'] }],
    questions: [
      {
        id: 'ccpp-l2-q21', q: '9行目の説明として適切なものはどれか。', line: 9, lineHas: '? a : b',
        choices: ['a < b なら min = b、そうでなければ min = a', 'a < b なら min = a、そうでなければ min = b', 'a と b の和を min に代入する', 'a < b が真なら1、偽なら0を min に代入する', 'a と b を入れ替える'],
        answer: 1, exp: '? : は「条件演算子」と呼ばれる3項演算子。x ? y : z は x が真なら y、偽なら z が用いられる。',
      },
      {
        id: 'ccpp-l2-q22', q: 'a に 8、b に 3 を入力したとき10行目で表示されるものはどれか。', line: 10, lineHas: 'min',
        choices: ['小さいほうの値は8です。', '小さいほうの値は3です。', '小さいほうの値は5です。', '小さいほうの値は0です。', '小さいほうの値は1です。'],
        answer: 1, exp: '8 < 3 は偽なので min = b = 3。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g09', lecture: 2, type: 'behavior',
    title: 'if文の条件での宣言（List 2-16m）',
    code: code`
// 読み込んだ整数値は10で割り切れるか
#include <iostream>
using namespace std;
int main()
{
    int n;
    cout << "整数値：";
    cin >> n;
    if (int m = n % 10) {
        cout << "その値は10で割り切れません。\n";
        cout << "最下位桁は" << m << "です。\n";
    } else {
        cout << "その値は10で割り切れます。\n";
    }
}`,
    run: [{ stdin: '127\n', contains: ['割り切れません。\n最下位桁は7です。'] }, { stdin: '120\n', contains: ['割り切れます。'] }],
    questions: [
      {
        id: 'ccpp-l2-q23', q: '9行目 if (int m = n % 10) の説明として適切なものはどれか。', line: 9, lineHas: 'int m = n % 10',
        choices: ['m と n % 10 が等しいかどうかを調べる', 'n % 10 の値を新しく宣言した m に代入し、その値が0なら偽、0以外なら真とみなす', 'n を10で割った商を m に代入する', 'm が10未満かどうかを調べる', 'コンパイルエラーになる'],
        answer: 1, exp: 'if文の条件では値が0なら「偽」、0以外なら「真」とみなされる。= は代入で、比較は ==。',
      },
      {
        id: 'ccpp-l2-q24', q: 'n に 127 を入力したとき表示されるものはどれか。',
        choices: ['その値は10で割り切れます。(改行)', 'その値は10で割り切れません。(改行)最下位桁は7です。(改行)', 'その値は10で割り切れません。(改行)最下位桁は12です。(改行)', 'その値は10で割り切れません。(改行)', '最下位桁は7です。(改行)'],
        answer: 1, exp: '127 % 10 = 7（0以外）なので真。{ } のブロックの2文が実行される。',
      },
    ],
  },
];
