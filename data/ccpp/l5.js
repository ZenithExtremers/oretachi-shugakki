// 第5回 関数・関数宣言・void・再帰・デフォルト実引数・ビット演算・シフト（オリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l5-g01', lecture: 5, type: 'behavior',
    title: '値渡しでは交換できない',
    code: code`
// 2つの値を交換したい
#include <iostream>
using namespace std;

void koukan(int x, int y)
{
    int t = x;
    x = y;
    y = t;
}

int main()
{
    int a = 1, b = 2;
    koukan(a, b);
    cout << "a=" << a << ", b=" << b << "\n";
    return 0;
}`,
    run: [{ stdin: '', contains: ['a=1, b=2\n'] }],
    questions: [
      {
        id: 'ccpp-l5-q01', q: 'このプログラムを実行したとき、表示されるものはどれか。',
        choices: ['a=2, b=1', 'a=1, b=2', 'a=1, b=1', 'a=2, b=2', 'a=0, b=0'],
        answer: 1, exp: '値渡しなので x, y は a, b のコピー。関数の中で交換しても main の a, b は変わらない。',
      },
      {
        id: 'ccpp-l5-q02', q: '5行目の void の説明として適切なものはどれか。', line: 5, lineHas: 'void koukan',
        choices: ['関数の戻り値（返却値）が無い', '関数の引数が無い', '関数の戻り値が整数型', '関数を呼び出せない', '関数の名前が無い'],
        answer: 0, exp: 'void は「値を返さない」関数。引数は ( ) の中に int x, int y とある。',
      },
    ],
  },
  {
    id: 'ccpp-l5-g02', lecture: 5, type: 'output',
    title: 'デフォルト実引数と関数宣言',
    code: code`
// デフォルト実引数
#include <iostream>
using namespace std;

int add(int a, int b = 10);

int main()
{
    cout << add(3) << "\n";
    cout << add(3, 4) << "\n";
    return 0;
}

int add(int a, int b)
{
    return a + b;
}`,
    run: [{ stdin: '', contains: ['13\n7\n'] }],
    questions: [
      {
        id: 'ccpp-l5-q03', q: '9行目で表示されるものはどれか。', line: 9, lineHas: 'add(3)',
        choices: ['3', '10', '13', '7', 'エラーになり何も表示されない'],
        answer: 2, exp: '実引数を省略した b にはデフォルト値 10 が入る。3 + 10 = 13。',
      },
      {
        id: 'ccpp-l5-q04', q: '10行目で表示されるものはどれか。', line: 10, lineHas: 'add(3, 4)',
        choices: ['7', '13', '14', '17', '34'],
        answer: 0, exp: '実引数を書いたときはその値が使われる。3 + 4 = 7。',
      },
      {
        id: 'ccpp-l5-q05', q: '5行目 int add(int a, int b = 10); の役割として適切なものはどれか。', line: 5, lineHas: 'int add',
        choices: ['関数 add を呼び出す', '関数宣言。main より後ろに定義した add を main の中で使えるようにする', '変数 add を宣言する', '関数 add の処理内容を定義する', 'add の戻り値を 10 にする'],
        answer: 1, exp: '関数は使う前に宣言が必要。本体（定義）は14行目以降にある。; で終わるのが宣言。',
      },
    ],
  },
  {
    id: 'ccpp-l5-g03', lecture: 5, type: 'output',
    title: 'ビット演算とシフト',
    code: code`
// ビット演算
#include <iostream>
using namespace std;

int main()
{
    unsigned a = 12, b = 10;

    cout << (a & b) << "\n";
    cout << (a | b) << "\n";
    cout << (a ^ b) << "\n";
    cout << (a << 2) << "\n";
    cout << (a >> 2) << "\n";
    return 0;
}`,
    run: [{ stdin: '', contains: ['8\n14\n6\n48\n3\n'] }],
    questions: [
      {
        id: 'ccpp-l5-q06', q: '9行目 a & b で表示されるものはどれか（12 は 2進数で 1100、10 は 1010）。', line: 9, lineHas: 'a & b',
        choices: ['8', '14', '6', '22', '2'],
        answer: 0, exp: '& は両方 1 のビットだけ 1。1100 & 1010 = 1000 = 8。',
      },
      {
        id: 'ccpp-l5-q07', q: '10行目 a | b で表示されるものはどれか。', line: 10, lineHas: 'a | b',
        choices: ['8', '14', '6', '22', '1'],
        answer: 1, exp: '| はどちらかが 1 なら 1。1100 | 1010 = 1110 = 14。',
      },
      {
        id: 'ccpp-l5-q08', q: '11行目 a ^ b で表示されるものはどれか。', line: 11, lineHas: 'a ^ b',
        choices: ['8', '14', '6', '144', '2'],
        answer: 2, exp: '^ は排他的論理和（ビットが違えば 1）。1100 ^ 1010 = 0110 = 6。べき乗ではない。',
      },
      {
        id: 'ccpp-l5-q09', q: '12行目 a << 2 と 13行目 a >> 2 で表示されるものの組はどれか。', line: 12, lineHas: 'a << 2',
        choices: ['24 と 6', '48 と 3', '14 と 10', '3 と 48', '144 と 1'],
        answer: 1, exp: '左に1ビットずらすと2倍。2ビットで ×4 → 48。右に2ビットで ÷4 → 3。',
      },
    ],
  },
  {
    id: 'ccpp-l5-g04', lecture: 5, type: 'fill',
    title: '再帰で 1〜n の和',
    intro: '関数 sum(n) は 1 から n までの和を再帰で求める（n は 0 以上）。',
    code: code`
// 1からnまでの和を再帰で求める
#include <iostream>
using namespace std;

int sum(int n)
{
    if (n == 0)
        return 0;
    ????????
}

int main()
{
    cout << sum(4) << "\n";
    return 0;
}`,
    fill: ['return n + sum(n - 1);'],
    run: [{ stdin: '', contains: ['10\n'] }],
    questions: [
      {
        id: 'ccpp-l5-q10', q: '9行目の ???????? に入るものはどれか。', line: 9, lineHas: '????????', mono: true,
        choices: ['return n + sum(n);', 'n + sum(n - 1);', 'return n + sum(n - 1);', 'return n * sum(n - 1);', 'return sum(n - 1);'],
        answer: 2, exp: '1〜n の和 = n + (1〜n-1 の和)。return が無いと値が返らない。* にすると積（しかも sum(0)=0 なので常に 0）。',
      },
      {
        id: 'ccpp-l5-q11', q: '正しく完成させたとき、14行目で表示されるものはどれか。', line: 14, lineHas: 'sum(4)',
        choices: ['4', '6', '10', '24', '0'],
        answer: 2, exp: 'sum(4) = 4 + 3 + 2 + 1 + 0 = 10。',
      },
    ],
  },
];
