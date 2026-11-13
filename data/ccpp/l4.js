// 第4回 配列・sizeof・配列の反転・2次元配列・行列の和（オリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l4-g01', lecture: 4, type: 'array',
    title: '配列の初期化と sizeof',
    intro: 'int 型の大きさは 4 バイトとする。',
    code: code`
// 配列の要素数を求める
#include <iostream>
using namespace std;

int main()
{
    int a[5] = { 1, 2, 3 };
    int n = sizeof(a) / sizeof(a[0]);

    cout << "要素数は" << n << "です.\n";
    for (int i = 0; i < n; i++)
        cout << "a[" << i << "] = " << a[i] << "\n";

    return 0;
}`,
    run: [{ stdin: '', contains: ['要素数は5です.', 'a[3] = 0', 'a[4] = 0'] }],
    questions: [
      {
        id: 'ccpp-l4-q01', q: '8行目で n に入る値はどれか。', line: 8, lineHas: 'sizeof(a) / sizeof(a[0])',
        choices: ['3', '4', '5', '20', '1'],
        answer: 2, exp: 'sizeof(a) は配列全体のバイト数（4×5=20）、sizeof(a[0]) は1要素（4）。20 / 4 = 5。初期値の個数（3）ではない。',
      },
      {
        id: 'ccpp-l4-q02', q: '7行目の後の配列 a の中身はどれか。', line: 7, lineHas: 'int a[5]',
        choices: ['a[0]=1, a[1]=2, a[2]=3, a[3]=0, a[4]=0', 'a[1]=1, a[2]=2, a[3]=3, a[4]=0, a[5]=0', 'a[0]=1, a[1]=2, a[2]=3, a[3]とa[4]は不定（何が入っているか分からない）', 'a[0]=1, a[1]=2, a[2]=3, a[3]=3, a[4]=3', '要素数より初期値が少ないのでコンパイルエラー'],
        answer: 0, exp: '初期値が足りない要素は 0 で初期化される。添字は 0 から。',
      },
    ],
  },
  {
    id: 'ccpp-l4-g02', lecture: 4, type: 'output',
    title: '最大値とその位置',
    code: code`
// 配列の最大値を求める
#include <iostream>
using namespace std;

int main()
{
    int a[5] = { 3, 9, 4, 9, 1 };
    int max = a[0];
    int idx = 0;

    for (int i = 1; i < 5; i++) {
        if (a[i] > max) {
            max = a[i];
            idx = i;
        }
    }
    cout << "最大値は" << max << "で, a[" << idx << "]です.\n";

    return 0;
}`,
    run: [{ stdin: '', contains: ['最大値は9で, a[1]です.'] }],
    questions: [
      {
        id: 'ccpp-l4-q03', q: 'このプログラムを実行したとき、表示されるものはどれか。',
        choices: ['最大値は9で, a[1]です.', '最大値は9で, a[2]です.', '最大値は9で, a[3]です.', '最大値は9で, a[4]です.', '最大値は1で, a[4]です.'],
        answer: 0, exp: '> なので、同じ 9 の a[3] では更新されない。最初に見つかった a[1]（2番目の要素）のまま。',
      },
      {
        id: 'ccpp-l4-q04', q: 'もし 12行目を if (a[i] >= max) にしたとき、表示されるものはどれか。', line: 12, lineHas: 'a[i] > max',
        choices: ['最大値は9で, a[1]です.', '最大値は9で, a[2]です.', '最大値は9で, a[3]です.', '最大値は9で, a[4]です.', '最大値は1で, a[4]です.'],
        answer: 2, exp: '>= だと等しいときも更新するので、後ろの 9（a[3]）が記録される。',
      },
    ],
  },
  {
    id: 'ccpp-l4-g03', lecture: 4, type: 'array',
    title: '配列の要素をずらす',
    code: code`
// 配列の要素を前にずらす
#include <iostream>
using namespace std;

int main()
{
    const int n = 5;
    int a[n] = { 1, 2, 3, 4, 5 };

    for (int i = 0; i < n - 1; i++)
        a[i] = a[i + 1];

    for (int i = 0; i < n; i++)
        cout << a[i] << " ";
    cout << "\n";

    return 0;
}`,
    run: [{ stdin: '', contains: ['2 3 4 5 5 \n'] }],
    questions: [
      {
        id: 'ccpp-l4-q05', q: '11行目までの処理が終わった後の配列 a の中身はどれか。', line: 11, lineHas: 'a[i + 1]',
        choices: ['a[0]=2, a[1]=3, a[2]=4, a[3]=5, a[4]=1', 'a[0]=2, a[1]=3, a[2]=4, a[3]=5, a[4]=5', 'a[0]=1, a[1]=1, a[2]=2, a[3]=3, a[4]=4', 'a[0]=2, a[1]=2, a[2]=2, a[3]=2, a[4]=2', 'a[0]=5, a[1]=4, a[2]=3, a[3]=2, a[4]=1'],
        answer: 1, exp: 'a[0]←a[1], …, a[3]←a[4] と1つずつ前にコピー。a[4] には何も代入しないので 5 のまま（先頭の 1 は消える）。',
      },
    ],
  },
  {
    id: 'ccpp-l4-g04', lecture: 4, type: 'array',
    title: '2次元配列',
    code: code`
// 2次元配列の合計
#include <iostream>
using namespace std;

int main()
{
    int m[2][3] = { {1, 2, 3}, {4, 5, 6} };
    int sum = 0;

    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 3; j++)
            sum += m[i][j];

    cout << "m[1][0]は" << m[1][0] << "です.\n";
    cout << "合計は" << sum << "です.\n";

    return 0;
}`,
    run: [{ stdin: '', contains: ['m[1][0]は4です.', '合計は21です.'] }],
    questions: [
      {
        id: 'ccpp-l4-q06', q: '14行目で表示されるものはどれか。', line: 14, lineHas: 'm[1][0]',
        choices: ['m[1][0]は1です.', 'm[1][0]は2です.', 'm[1][0]は4です.', 'm[1][0]は3です.', 'm[1][0]は5です.'],
        answer: 2, exp: 'm[行][列]。m[1] は2つ目の行 {4,5,6}、その [0] は 4。',
      },
      {
        id: 'ccpp-l4-q07', q: '12行目は全部で何回実行されるか。', line: 12, lineHas: 'sum += m[i][j];',
        choices: ['2回', '3回', '5回', '6回', '12回'],
        answer: 3, exp: '2行 × 3列 = 6回。',
      },
    ],
  },
];
