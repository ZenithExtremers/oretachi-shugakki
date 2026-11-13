// 第6回 ポインタ（& と *）・ポインタ引数・配列とポインタ・new/delete（オリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l6-g01', lecture: 6, type: 'meaning',
    title: 'ポインタの基本',
    code: code`
// ポインタの基本
#include <iostream>
using namespace std;

int main()
{
    int x = 5;
    int* p = &x;

    *p = 8;
    cout << x << " " << *p << "\n";
    return 0;
}`,
    run: [{ stdin: '', contains: ['8 8\n'] }],
    questions: [
      {
        id: 'ccpp-l6-q01', q: '8行目 int* p = &x; の説明として適切なものはどれか。', line: 8, lineHas: 'int* p = &x;',
        choices: ['p に x の値（5）を代入する', 'int 型へのポインタ p を宣言し、x のアドレスで初期化する', 'p と x の積を求める', 'x に p のアドレスを代入する', 'x の値を2倍して p に入れる'],
        answer: 1, exp: '& は「アドレスを取り出す」演算子。p には x の格納場所（アドレス）が入る。',
      },
      {
        id: 'ccpp-l6-q02', q: '11行目で表示されるものはどれか。', line: 11, lineHas: 'cout',
        choices: ['5 5', '5 8', '8 5', '8 8', '8 （xのアドレス）'],
        answer: 3, exp: '*p は「p が指す格納場所の中身」＝ x そのもの。*p = 8 で x も 8 になる。',
      },
    ],
  },
  {
    id: 'ccpp-l6-g02', lecture: 6, type: 'output',
    title: '配列とポインタ',
    code: code`
// 配列とポインタ
#include <iostream>
using namespace std;

int main()
{
    int a[4] = { 10, 20, 30, 40 };
    int* p = a;

    cout << *(p + 2) << "\n";
    p++;
    cout << *p << " " << p[1] << "\n";
    return 0;
}`,
    run: [{ stdin: '', contains: ['30\n20 30\n'] }],
    questions: [
      {
        id: 'ccpp-l6-q03', q: '10行目で表示されるものはどれか。', line: 10, lineHas: '*(p + 2)',
        choices: ['12', '20', '30', '40', '10'],
        answer: 2, exp: 'p は a[0] を指す。p + 2 は a[2] のアドレス、*(p + 2) は a[2] = 30。10 + 2 = 12 ではない。',
      },
      {
        id: 'ccpp-l6-q04', q: '12行目で表示されるものはどれか。', line: 12, lineHas: 'p[1]',
        choices: ['10 20', '11 21', '20 30', '20 20', '30 40'],
        answer: 2, exp: 'p++ で p は a[1] を指す。*p = a[1] = 20、p[1] は *(p+1) = a[2] = 30。',
      },
    ],
  },
  {
    id: 'ccpp-l6-g03', lecture: 6, type: 'behavior',
    title: 'new と delete',
    code: code`
// 動的に配列を確保する
#include <iostream>
using namespace std;

int main()
{
    int n;
    cout << "要素数:";
    cin >> n;

    int* a = new int[n];
    for (int i = 0; i < n; i++)
        a[i] = i * i;

    cout << "a[" << n - 1 << "]は" << a[n - 1] << "です.\n";
    delete[] a;
    return 0;
}`,
    run: [{ stdin: '4\n', contains: ['a[3]は9です.'] }],
    questions: [
      {
        id: 'ccpp-l6-q05', q: '11行目 int* a = new int[n]; の説明として適切なものはどれか。', line: 11, lineHas: 'new int[n]',
        choices: ['値が n の int 型変数を1つ作る', '要素数 n の int 型配列を動的に確保し、その先頭のアドレスを a に入れる', 'a の n 番目の要素を新しくする', '要素数 n の配列をコピーする', 'n バイトの文字列を確保する'],
        answer: 1, exp: 'new int[n] は実行中に要素数 n の配列を確保し、先頭のアドレスを返す。',
      },
      {
        id: 'ccpp-l6-q06', q: 'n に 4 を入力したとき、15行目で表示されるものはどれか。', line: 15, lineHas: 'a[n - 1]',
        choices: ['a[3]は9です.', 'a[4]は16です.', 'a[3]は16です.', 'a[4]は9です.', 'a[3]は6です.'],
        answer: 0, exp: '添字は 0〜3。a[3] = 3 × 3 = 9。',
      },
      {
        id: 'ccpp-l6-q07', q: '16行目 delete[] a; の説明として適切なものはどれか。', line: 16, lineHas: 'delete[] a;',
        choices: ['配列 a の中身をすべて 0 にする', 'new で確保した配列の領域を解放する', 'ポインタ a を削除して以後 a という名前を使えなくする', '配列 a の最後の要素を削除する', 'プログラムを終了する'],
        answer: 1, exp: 'new [] で確保した領域は delete[] で解放する。',
      },
    ],
  },
  {
    id: 'ccpp-l6-g04', lecture: 6, type: 'behavior',
    title: 'ポインタ引数',
    code: code`
// ポインタを受け取る関数
#include <iostream>
using namespace std;

void inc(int* p)
{
    (*p)++;
}

void inc2(int* p)
{
    p++;
}

int main()
{
    int a = 3;
    inc(&a);
    inc2(&a);
    cout << "aは" << a << "です.\n";
    return 0;
}`,
    run: [{ stdin: '', contains: ['aは4です.'] }],
    questions: [
      {
        id: 'ccpp-l6-q08', q: 'このプログラムを実行したとき、表示されるものはどれか。',
        choices: ['aは3です.', 'aは4です.', 'aは5です.', 'aは（aのアドレス）です.', 'aは6です.'],
        answer: 1, exp: 'inc は p が指す中身（a）を1増やす → 4。inc2 はポインタ p（アドレスのコピー）を進めるだけで a は変わらない。',
      },
      {
        id: 'ccpp-l6-q09', q: '12行目 p++; の説明として適切なものはどれか。', line: 12, lineHas: 'p++;',
        choices: ['p が指す格納場所の中身を1増やす', 'main の a を1増やす', '関数の中のポインタ p の値（アドレス）を1つ先に進める', 'p が指す中身を 0 にする', 'コンパイルエラーになる'],
        answer: 2, exp: '* が付いていないので変わるのはポインタ自身（アドレス）。しかも p はコピーなので main には影響しない。',
      },
    ],
  },
];
