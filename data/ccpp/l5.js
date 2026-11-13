// 第5回 関数・関数宣言・値渡し・void・再帰・デフォルト実引数・ビット演算（講義資料 ccpp_05 の List をもとにしたオリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l5-g01', lecture: 5, type: 'meaning',
    title: '関数の定義と呼び出し（List 6-3）',
    code: code`
// 三つの整数の最大値を求めて表示
#include <iostream>
using namespace std;
// a, b, cの最大値を返す
int calc_max(int a, int b, int c)
{
    int max_val = a;
    if (b > max_val) max_val = b;
    if (c > max_val) max_val = c;
    return max_val;
}
int main()
{
    int a, b, c;
    cout << "整数a: "; cin >> a;
    cout << "整数b: "; cin >> b;
    cout << "整数c: "; cin >> c;
    cout << "最大値は " << calc_max(a, b, c) << " です。\n";
}`,
    run: [{ stdin: '4\n9\n2\n', contains: ['最大値は 9 です。'] }],
    questions: [
      {
        id: 'ccpp-l5-q01', q: '5行目 int calc_max(int a, int b, int c) の int a, int b, int c を何というか。', line: 5, lineHas: 'calc_max',
        choices: ['実引数', '仮引数（仮引数宣言）', '返却値の型', '関数本体', 'ローカル定数'],
        answer: 1, exp: '関数頭部は「返却値の型」「関数名」「仮引数宣言」から成る。a, b, c は実引数の値を受け取る仮引数。',
      },
      {
        id: 'ccpp-l5-q02', q: '18行目 calc_max(a, b, c) の a, b, c を何というか。', line: 18, lineHas: 'calc_max(a, b, c)',
        choices: ['実引数', '仮引数', '返却値', '関数頭部', 'グローバル変数'],
        answer: 0, exp: '関数呼び出し時に関数に渡される値が実引数。その値が仮引数にコピーされる（値渡し）。',
      },
      {
        id: 'ccpp-l5-q03', q: '7行目の max_val の説明として適切なものはどれか。', line: 7, lineHas: 'max_val',
        choices: ['main 関数からも使える変数', 'calc_max 関数の中でのみアクセスできるローカル変数', '関数の名前', '仮引数', '定数'],
        answer: 1, exp: '関数本体内で宣言された変数はローカル変数で、その関数内でのみアクセス可能。',
      },
      {
        id: 'ccpp-l5-q04', q: '10行目 return max_val; の説明として適切なものはどれか。', line: 10, lineHas: 'return max_val;',
        choices: ['max_val を画面に表示する', '関数を即座に終了し、max_val の値を呼び出し元に返す', '5行目に戻る', 'OS に max_val を返してプログラムを終了する', 'max_val を 0 にする'],
        answer: 1, exp: 'return 文が実行されると関数は即座に終了し、指定された値が呼び出し元に返される。',
      },
    ],
  },
  {
    id: 'ccpp-l5-g02', lecture: 5, type: 'behavior',
    title: '関数宣言（List 6-5）',
    code: code`
// 関数宣言の追加）三つの整数の最大値を求める
#include <iostream>
using namespace std;
// 関数宣言（関数プロトタイプ）
int calc_max(int a, int b, int c);
int main()
{
    int a, b, c;
    cout << "整数a: "; cin >> a;
    cout << "整数b: "; cin >> b;
    cout << "整数c: "; cin >> c;
    cout << "最大値は " << calc_max(a, b, c) << " です。\n";
}
// 関数定義
int calc_max(int a, int b, int c)
{
    int max_val = a;
    if (b > max_val) max_val = b;
    if (c > max_val) max_val = c;
    return max_val;
}`,
    run: [{ stdin: '-1\n-5\n-3\n', contains: ['最大値は -1 です。'] }],
    questions: [
      {
        id: 'ccpp-l5-q05', q: '5行目が無いとどうなるか。', line: 5, lineHas: 'int calc_max',
        choices: ['問題なく動く', '12行目で calc_max が宣言されていないというコンパイルエラーになる', '実行時に最大値が 0 になる', '15行目の関数定義が無視される', 'main 関数が2つあるというエラーになる'],
        answer: 1, exp: 'コンパイラは上から下に処理する。定義より前で呼び出すには関数宣言（関数プロトタイプ）が必要。',
      },
      {
        id: 'ccpp-l5-q06', q: '5行目の代わりに書いても同じ意味になるものはどれか。', line: 5, lineHas: 'int calc_max', mono: true,
        choices: ['int calc_max(int, int, int);', 'int calc_max(int a, int b, int c)', 'calc_max(int a, int b, int c);', 'int calc_max();', 'int calc_max(a, b, c);'],
        answer: 0, exp: '関数宣言では仮引数名を省略できる。末尾のセミコロンが必要。',
      },
    ],
  },
  {
    id: 'ccpp-l5-g03', lecture: 5, type: 'shape',
    title: 'void 関数（List 6-8, 6-9）',
    code: code`
// 文字cをn個連続表示
#include <iostream>
using namespace std;
void put_nchar(char c, int n)
{
    while (n-- > 0)
        cout << c;
}
int main()
{
    int n;
    cout << "何段の三角形ですか：";
    cin >> n;
    for (int i = 1; i <= n; i++) {
        put_nchar(' ', n - i);  // 空白を印字
        put_nchar('*', i);      // アスタリスクを印字
        cout << '\n';
    }
}`,
    run: [{ stdin: '3\n', contains: ['  *\n **\n***\n'] }],
    questions: [
      {
        id: 'ccpp-l5-q07', q: 'n に 3 を入力したとき表示されるもの（催促は除く）はどれか。', mono: true,
        choices: ['*\n**\n***', '  *\n **\n***', '***\n **\n  *', '***\n**\n*', ' *\n**\n***'],
        answer: 1, exp: 'i 段目は空白 n-i 個と * i 個。右下が直角の二等辺三角形になる。',
      },
      {
        id: 'ccpp-l5-q08', q: '4行目 void put_nchar の void の説明として適切なものはどれか。', line: 4, lineHas: 'void',
        choices: ['引数を受け取らない', '値を返さない（返却値が無い）関数', '何もしない関数', '整数を返す関数', 'main 関数からは呼び出せない関数'],
        answer: 1, exp: 'void は「何もない」「空」。値を返さない関数の返却値の型。cout << put_nchar(…) のような使い方はできない。',
      },
    ],
  },
  {
    id: 'ccpp-l5-g04', lecture: 5, type: 'output',
    title: 'デフォルト実引数（List 6-12）',
    code: code`
// 文字を指定回数表示する（デフォルト実引数）
#include <iostream>
using namespace std;
// n回 c を表示する
void marks(int n = 3, char c = '#')
{
    while (n-- > 0)
        cout << c;
    cout << '\n';
}
int main()
{
    marks();
    marks(5);
    marks(2, '*');
}`,
    run: [{ stdin: '', contains: ['###\n#####\n**\n'] }],
    questions: [
      {
        id: 'ccpp-l5-q09', q: 'このプログラムの実行結果はどれか。', mono: true,
        choices: ['###\n#####\n**', '\n#####\n**', '###\n###\n**', '###\n*****\n**', '#\n#####\n##'],
        answer: 0, exp: '実引数を省略した仮引数にはデフォルト値（n=3, c=\'#\'）が使われる。marks(5) は n=5, c=\'#\'。',
      },
      {
        id: 'ccpp-l5-q10', q: 'デフォルト実引数の指定として正しくない（エラーになる）ものはどれか。', mono: true,
        choices: ['void f(int a, int b = 5, int c = 10);', 'void f(int a = 1, int b, int c = 10);', 'void f(int a = 1, int b = 5, int c = 10);', 'void f(int a, int b, int c = 10);', 'void f(int a, int b, int c);'],
        answer: 1, exp: 'デフォルト実引数は仮引数リストの右側から指定する必要がある。b にデフォルトが無いのに a にあるのは誤り。',
      },
    ],
  },
  {
    id: 'ccpp-l5-g05', lecture: 5, type: 'fill',
    title: '再帰でフィボナッチ数（課題(3)）',
    intro: 'フィボナッチ数列 F(1)=1, F(2)=1, F(k)=F(k-1)+F(k-2) (k≥3) の第 n 項を再帰関数で求める。',
    code: code`
// フィボナッチ数を再帰で求める
#include <iostream>
using namespace std;
int fib(int n)
{
    if (n <= 2)
        return 1;
    ????????
}
int main()
{
    int n;
    cin >> n;
    if (n <= 0)
        cout << "無効な値\n";
    else if (n > 30)
        cout << "数値が大きすぎます\n";
    else
        cout << "F(" << n << ")=" << fib(n) << "\n";
}`,
    fill: ['return fib(n - 1) + fib(n - 2);'],
    run: [{ stdin: '10\n', contains: ['F(10)=55'] }, { stdin: '6\n', contains: ['F(6)=8'] }, { stdin: '-2\n', contains: ['無効な値'] }],
    questions: [
      {
        id: 'ccpp-l5-q11', q: '8行目の ???????? に入るものはどれか。', line: 8, lineHas: '????????', mono: true,
        choices: ['return fib(n) + fib(n - 1);', 'fib(n - 1) + fib(n - 2);', 'return fib(n - 1) + fib(n - 2);', 'return fib(n - 1) * fib(n - 2);', 'return n + fib(n - 1);'],
        answer: 2, exp: 'F(n) = F(n-1) + F(n-2) を return で返す。6〜7行目が再帰を終了させる基底部。',
      },
      {
        id: 'ccpp-l5-q12', q: '正しく完成させて n に 6 を入力したとき表示されるものはどれか。',
        choices: ['F(6)=5', 'F(6)=6', 'F(6)=8', 'F(6)=13', 'F(6)=21'],
        answer: 2, exp: '1, 1, 2, 3, 5, 8 なので F(6) = 8。',
      },
      {
        id: 'ccpp-l5-q13', q: '6〜7行目のように再帰を終了させるための部分を何というか。', line: 6, lineHas: 'n <= 2',
        choices: ['基底部', '関数頭部', '仮引数', 'デフォルト実引数', '関数プロトタイプ'],
        answer: 0, exp: '無限再帰を防ぐためには再帰を終了させるための基底部 (Base Case) が必要。',
      },
    ],
  },
  {
    id: 'ccpp-l5-g06', lecture: 5, type: 'output',
    title: 'ビット単位の演算（List 6-13）',
    intro: 'a に 13（2進数 1101）、b に 6（2進数 0110）を入力する。表示は10進数とする。',
    code: code`
// 符号無し整数の論理積・論理和・排他的論理和・シフト
#include <iostream>
using namespace std;
int main()
{
    unsigned a, b;
    cout << "a: "; cin >> a;
    cout << "b: "; cin >> b;
    cout << "a & b = " << (a & b) << '\n';
    cout << "a | b = " << (a | b) << '\n';
    cout << "a ^ b = " << (a ^ b) << '\n';
    cout << "a << 2 = " << (a << 2) << '\n';
    cout << "a >> 2 = " << (a >> 2) << '\n';
}`,
    run: [{ stdin: '13\n6\n', contains: ['a & b = 4\n', 'a | b = 15\n', 'a ^ b = 11\n', 'a << 2 = 52\n', 'a >> 2 = 3\n'] }],
    questions: [
      {
        id: 'ccpp-l5-q14', q: '9行目で表示される値はどれか。', line: 9, lineHas: 'a & b',
        choices: ['4', '15', '11', '19', '1'],
        answer: 0, exp: '& (ビット積) は両方が 1 のビットだけ 1。1101 & 0110 = 0100 = 4。',
      },
      {
        id: 'ccpp-l5-q15', q: '11行目で表示される値はどれか。', line: 11, lineHas: 'a ^ b',
        choices: ['4', '15', '11', '169', '7'],
        answer: 2, exp: '^ (排他的論理和) はビットが異なるとき 1。1101 ^ 0110 = 1011 = 11。べき乗ではない。',
      },
      {
        id: 'ccpp-l5-q16', q: '12行目と13行目で表示される値の組はどれか。', line: 12, lineHas: 'a << 2',
        choices: ['26 と 6', '52 と 3', '15 と 11', '3 と 52', '169 と 1'],
        answer: 1, exp: 'n ビットの左シフトは 2のn乗を掛けるのと同じ（13×4=52）。右シフト 2ビットは 4 で割る（13÷4=3）。',
      },
    ],
  },
];
