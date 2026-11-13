// 第2回 変数と型・cin・割り算と剰余・乱数・if/else・&& ||・条件演算子（オリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l2-g01', lecture: 2, type: 'output',
    title: '整数どうしの割り算と剰余',
    code: code`
// 整数の割り算
#include <iostream>
using namespace std;

int main()
{
    int a, b;

    cout << "aとbを入力:";
    cin >> a >> b;

    double d = a;

    cout << "a/b = " << a / b << "\n";
    cout << "a%b = " << a % b << "\n";
    cout << "d/b = " << d / b << "\n";

    return 0;
}`,
    run: [{ stdin: '7 2\n', contains: ['a/b = 3\n', 'a%b = 1\n', 'd/b = 3.5\n'] }],
    questions: [
      {
        id: 'ccpp-l2-q01', q: 'a に 7、b に 2 を入力したとき、14行目で表示されるものはどれか。', line: 14, lineHas: 'a / b',
        choices: ['a/b = 3.5', 'a/b = 3', 'a/b = 4', 'a/b = 1', 'a/b = 3.500000'],
        answer: 1, exp: 'int どうしの割り算は小数部分が切り捨てられる。7/2 = 3。四捨五入ではない。',
      },
      {
        id: 'ccpp-l2-q02', q: '同じ入力で 15行目で表示されるものはどれか。', line: 15, lineHas: 'a % b',
        choices: ['a%b = 3', 'a%b = 0.5', 'a%b = 1', 'a%b = 2', 'a%b = 3.5'],
        answer: 2, exp: '% は割り算の余り（剰余）。7 ÷ 2 = 3 余り 1。',
      },
      {
        id: 'ccpp-l2-q03', q: '同じ入力で 16行目で表示されるものはどれか。', line: 16, lineHas: 'd / b',
        choices: ['d/b = 3', 'd/b = 3.5', 'd/b = 3.500000', 'd/b = 4', 'd/b = 1'],
        answer: 1, exp: 'd は double なので d/b は小数の割り算で 3.5。cout は余分な 0 を付けずに 3.5 と表示する。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g02', lecture: 2, type: 'unexpected',
    title: '小数を int に代入する',
    code: code`
// 実数値を整数に代入する
#include <iostream>
using namespace std;

int main()
{
    double x;
    int n;

    cout << "実数値:";
    cin >> x;
    n = x;
    cout << "nは" << n << "です.\n";
    cout << "x*2は" << x * 2 << "です.\n";

    return 0;
}`,
    run: [
      { stdin: '2.7\n', contains: ['nは2です.', 'x*2は5.4です.'] },
      { stdin: '-2.7\n', contains: ['nは-2です.'] },
    ],
    questions: [
      {
        id: 'ccpp-l2-q04', q: '12行目 n = x; の説明として適切なものはどれか。', line: 12, lineHas: 'n = x;',
        choices: ['x の値を四捨五入した整数が n に入る', 'x の小数部分を切り捨てた整数が n に入る', 'x の小数部分だけが n に入る', 'n の値が x に入る', '型が違うのでコンパイルエラーになる'],
        answer: 1, exp: '小数を int に代入すると小数部分が切り捨てられる（0 に近い方へ）。四捨五入ではない。',
      },
      {
        id: 'ccpp-l2-q05', q: 'x に 2.7 を入力したとき、13行目で表示されるものはどれか。', line: 13, lineHas: '"nは"',
        choices: ['nは2.7です.', 'nは3です.', 'nは2です.', 'nは0.7です.', 'nは0です.'],
        answer: 2, exp: '2.7 の小数部分を切り捨てて 2。',
      },
      {
        id: 'ccpp-l2-q06', q: 'x に -2.7 を入力したとき、13行目で表示されるものはどれか。', line: 13, lineHas: '"nは"',
        choices: ['nは-3です.', 'nは-2.7です.', 'nは2です.', 'nは-2です.', 'nは0です.'],
        answer: 3, exp: '切り捨ては「0 に近い方」へ。-2.7 → -2。-3 にはならない。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g03', lecture: 2, type: 'fill',
    title: '1けたの正の数の判定',
    intro: '読み込んだ整数が 1〜9 の範囲（1けたの正の数）なら「1けたの正の数です.」と表示するプログラムである。',
    code: code`
// 1けたの正の数かどうかを判定する
#include <iostream>
using namespace std;

int main()
{
    int a;

    cout << "整数値:";
    cin >> a;

    if (????????)
        cout << "1けたの正の数です.\n";
    else
        cout << "そうではありません.\n";

    return 0;
}`,
    fill: ['a >= 1 && a <= 9'],
    run: [
      { stdin: '5\n', contains: ['1けたの正の数です.'] },
      { stdin: '0\n', contains: ['そうではありません.'] },
      { stdin: '10\n', contains: ['そうではありません.'] },
    ],
    questions: [
      {
        id: 'ccpp-l2-q07', q: '12行目の ???????? に入るものはどれか。', line: 12, lineHas: 'if (????????)', mono: true,
        choices: ['a > 0 || a < 10', 'a >= 0 && a <= 10', 'a >= 1 && a <= 9', 'a > 0 && a <= 10', 'a >= 1 || a <= 9'],
        answer: 2, exp: '「1以上 かつ 9以下」なので && でつなぐ。|| だとどんな整数でも真になってしまう。',
      },
      {
        id: 'ccpp-l2-q08', q: 'もし 12行目を if (a > 0 || a < 10) にしたとき、a に 25 を入力すると表示されるものはどれか。', line: 12,
        choices: ['1けたの正の数です.', 'そうではありません.', '何も表示されない', '1けたの正の数です.(改行)そうではありません.', 'コンパイルエラーになる'],
        answer: 0, exp: '|| は「どちらか一方が真なら真」。25 > 0 が真なので条件全体が真になる。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g04', lecture: 2, type: 'meaning',
    title: '条件演算子',
    code: code`
// 大きいほうの値を表示する
#include <iostream>
using namespace std;

int main()
{
    int a, b;

    cout << "aとbを入力:";
    cin >> a >> b;
    int max = (a > b) ? a : b;
    cout << "大きいほうは" << max << "です.\n";
    cout << ((a % 2 == 0) ? "aは偶数" : "aは奇数") << "\n";

    return 0;
}`,
    run: [{ stdin: '3 8\n', contains: ['大きいほうは8です.', 'aは奇数'] }],
    questions: [
      {
        id: 'ccpp-l2-q09', q: '11行目の説明として適切なものはどれか。', line: 11, lineHas: '? a : b',
        choices: ['a > b なら max に b を、そうでなければ a を代入する', 'a > b なら max に a を、そうでなければ b を代入する', 'a と b の和を max に代入する', 'a > b かどうか（真か偽か）を max に代入する', 'a > b でなければエラーになる'],
        answer: 1, exp: '条件 ? 式1 : 式2 は、条件が真なら式1、偽なら式2 の値になる。',
      },
      {
        id: 'ccpp-l2-q10', q: 'a に 3、b に 8 を入力したとき、12行目と13行目で表示されるものはどれか。',
        choices: ['大きいほうは3です.(改行)aは奇数(改行)', '大きいほうは8です.(改行)aは偶数(改行)', '大きいほうは8です.(改行)aは奇数(改行)', '大きいほうは3です.(改行)aは偶数(改行)', '大きいほうは8です.aは奇数(改行)'],
        answer: 2, exp: '3 > 8 は偽なので max = 8。3 % 2 は 1 なので a%2==0 は偽 → 「aは奇数」。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g05', lecture: 2, type: 'meaning',
    title: '変数の型',
    code: code`
// いろいろな型の変数
#include <iostream>
#include <string>
using namespace std;

int main()
{
    char c = 'A';
    string s = "ABC";
    int i = 10;
    double d = 2.5;

    cout << c << s << i << d << "\n";
    return 0;
}`,
    run: [{ stdin: '', contains: ['AABC102.5\n'] }],
    questions: [
      {
        id: 'ccpp-l2-q11', q: '8行目 char c = \'A\'; の説明として適切なものはどれか。', line: 8, lineHas: "char c = 'A';",
        choices: ['文字列型の変数 c を宣言し "A" で初期化する', '1文字を格納する文字型の変数 c を宣言し A で初期化する', '整数型の変数 c を宣言し A で初期化する', '小数型の変数 c を宣言し A で初期化する', '変数 A に c を代入する'],
        answer: 1, exp: 'char は1文字の型。文字は \'A\'（シングルクォート）、文字列は "ABC"（ダブルクォート）。',
      },
      {
        id: 'ccpp-l2-q12', q: 'このプログラムを実行したとき、13行目で表示されるものはどれか。', line: 13, lineHas: 'cout',
        choices: ['A ABC 10 2.5', 'AABC102.5', 'cs id', 'AABC102.500000', 'AABC 10 2.5'],
        answer: 1, exp: '<< でつないだものは間に空白を入れずに続けて表示される。2.5 は 2.5 と表示される。',
      },
    ],
  },
  {
    id: 'ccpp-l2-g06', lecture: 2, type: 'meaning',
    title: '乱数',
    code: code`
// サイコロの目を乱数で決める
#include <cstdlib>
#include <ctime>
#include <iostream>
using namespace std;

int main()
{
    srand(time(NULL));
    int dice = rand() % 6 + 1;
    cout << "サイコロの目は" << dice << "です.\n";
    return 0;
}`,
    run: [{ stdin: '', contains: ['サイコロの目は'] }],
    questions: [
      {
        id: 'ccpp-l2-q13', q: '10行目で dice に入る値の範囲として正しいものはどれか。', line: 10, lineHas: 'rand() % 6 + 1',
        choices: ['0 以上 5 以下', '0 以上 6 以下', '1 以上 6 以下', '1 以上 7 以下', '6 の倍数'],
        answer: 2, exp: 'rand() % 6 は 0〜5（6で割った余り）。+1 して 1〜6。',
      },
      {
        id: 'ccpp-l2-q14', q: '9行目 srand(time(NULL)); の説明として適切なものはどれか。', line: 9, lineHas: 'srand',
        choices: ['乱数の最大値を現在時刻にする', '実行するたびに異なる乱数の列になるよう、現在時刻で乱数の種を設定する', '現在時刻を表示する', '乱数を1つ作って捨てる', 'プログラムの実行を一定時間止める'],
        answer: 1, exp: '種（seed）が同じだと rand() は毎回同じ列になる。時刻を種にすると実行ごとに変わる。',
      },
    ],
  },
];
