// 第3回 switch・while/do/for・++/--・多重ループ・break/continue・setw（オリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l3-g01', lecture: 3, type: 'output',
    title: 'switch 文と break',
    code: code`
// じゃんけんの手を表示する
#include <iostream>
using namespace std;

int main()
{
    int hand;

    cout << "手(0:グー/1:チョキ/2:パー):";
    cin >> hand;

    switch (hand) {
        case 0: cout << "グー\n"; break;
        case 1: cout << "チョキ\n";
        case 2: cout << "パー\n"; break;
        default: cout << "?\n";
    }

    return 0;
}`,
    run: [
      { stdin: '1\n', contains: ['チョキ\nパー\n'] },
      { stdin: '5\n', contains: ['?\n'] },
      { stdin: '0\n', contains: ['グー\n'], notContains: ['パー\n'] },
    ],
    questions: [
      {
        id: 'ccpp-l3-q01', q: 'hand に 1 を入力したとき、表示されるものはどれか（入力の催促は除く）。',
        choices: ['チョキ(改行)', 'チョキ(改行)パー(改行)', 'チョキ(改行)パー(改行)?(改行)', 'パー(改行)', '?(改行)'],
        answer: 1, exp: 'case 1 には break が無いので、続く case 2 の文も実行され、そこの break で switch を抜ける。',
      },
      {
        id: 'ccpp-l3-q02', q: 'hand に 5 を入力したとき、表示されるものはどれか（入力の催促は除く）。',
        choices: ['何も表示されない', 'グー(改行)', 'パー(改行)', '?(改行)', 'チョキ(改行)パー(改行)?(改行)'],
        answer: 3, exp: 'どの case にも当てはまらないときは default に進む。',
      },
      {
        id: 'ccpp-l3-q03', q: '13行目の break の説明として適切なものはどれか。', line: 13, lineHas: 'break;',
        choices: ['プログラムを終了する', 'switch 文を抜けて19行目に進む', '次の case の文を実行する', 'switch 文の先頭に戻る', 'hand の値を 0 にする'],
        answer: 1, exp: 'break は switch 文（やループ）を抜ける。抜けた後は } の次の文に進む。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g02', lecture: 3, type: 'output',
    title: 'while 文と後置 ++',
    code: code`
// 後置増分演算子
#include <iostream>
using namespace std;

int main()
{
    int i = 0;

    while (i < 3) {
        cout << i++ << " ";
    }
    cout << "\n" << i << "\n";

    return 0;
}`,
    run: [{ stdin: '', contains: ['0 1 2 \n3\n'] }],
    questions: [
      {
        id: 'ccpp-l3-q04', q: 'このプログラムを実行したとき、表示されるものはどれか。',
        choices: ['1 2 3 (改行)3(改行)', '0 1 2 (改行)2(改行)', '0 1 2 (改行)3(改行)', '1 2 3 (改行)4(改行)', '0 1 2 3 (改行)4(改行)'],
        answer: 2, exp: 'i++ は「今の値を使ってから」1増やす。0,1,2 を表示し、i が 3 になったところで i < 3 が偽になって終了。',
      },
      {
        id: 'ccpp-l3-q05', q: 'もし 10行目を cout << ++i << " "; にしたとき、1行目に表示されるものはどれか。', line: 10, lineHas: 'i++',
        choices: ['0 1 2 ', '1 2 3 ', '0 1 2 3 ', '1 2 ', '2 3 4 '],
        answer: 1, exp: '++i は「先に1増やしてから」値を使う。i=0→1 を表示 … i=2→3 を表示。i=3 で終了。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g03', lecture: 3, type: 'shape',
    title: '多重ループと setw',
    code: code`
// 九九の一部を表示する
#include <iomanip>
#include <iostream>
using namespace std;

int main()
{
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 4; j++)
            cout << setw(3) << i * j;
        cout << '\n';
    }
    return 0;
}`,
    run: [{ stdin: '', contains: ['  1  2  3  4\n  2  4  6  8\n  3  6  9 12\n'] }],
    questions: [
      {
        id: 'ccpp-l3-q06', q: 'このプログラムを実行したとき、表示されるものはどれか。', mono: true,
        choices: ['  1  2  3\n  2  4  6\n  3  6  9\n  4  8 12', '  1  2  3  4\n  2  4  6  8\n  3  6  9 12', '1 2 3 4\n2 4 6 8\n3 6 9 12', '  1  2  3  4  2  4  6  8  3  6  9 12', '  1\n  2  4\n  3  6  9'],
        answer: 1, exp: '外側 i が行（3行）、内側 j が列（4列）。setw(3) で各値を3文字幅の右寄せで表示する。',
      },
      {
        id: 'ccpp-l3-q07', q: '10行目は全部で何回実行されるか。', line: 10, lineHas: 'setw(3)',
        choices: ['3回', '4回', '7回', '12回', '16回'],
        answer: 3, exp: '外側 3回 × 内側 4回 = 12回。',
      },
      {
        id: 'ccpp-l3-q08', q: '10行目 setw(3) の説明として適切なものはどれか。', line: 10, lineHas: 'setw(3)',
        choices: ['次に表示する値を3文字分の幅で（右寄せで）表示する', '値を3倍して表示する', '3つ空白を表示してから値を表示する', '小数点以下3桁まで表示する', '3回くり返して表示する'],
        answer: 0, exp: 'setw(n) は次に表示する1つの値を n 文字幅にそろえる（足りない分は左に空白）。12 なら " 12"。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g04', lecture: 3, type: 'output',
    title: 'for 文と break',
    code: code`
// 合計が10を超えたら終了
#include <iostream>
using namespace std;

int main()
{
    int sum = 0;
    int i;

    for (i = 1; i <= 10; i++) {
        if (sum > 10)
            break;
        sum += i;
    }
    cout << "sumは" << sum << ", iは" << i << "です.\n";

    return 0;
}`,
    run: [{ stdin: '', contains: ['sumは15, iは6です.'] }],
    questions: [
      {
        id: 'ccpp-l3-q09', q: 'このプログラムを実行したとき、表示されるものはどれか。',
        choices: ['sumは10, iは4です.', 'sumは15, iは5です.', 'sumは15, iは6です.', 'sumは55, iは11です.', 'sumは21, iは6です.'],
        answer: 2, exp: 'i=4 で sum=10（まだ 10 を超えていない）→ i=5 で sum=15 → i=6 で sum > 10 なので break。i は 6 のまま。',
      },
      {
        id: 'ccpp-l3-q10', q: '12行目 break; が実行された後に実行される文はどれか。', line: 12, lineHas: 'break;',
        choices: ['10行目の i++', '11行目の if', '13行目の sum += i;', '15行目の cout', '17行目の return 0;'],
        answer: 3, exp: 'break は for 文をすぐに抜ける（i++ もしない）。for の } の次の15行目へ進む。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g05', lecture: 3, type: 'shape',
    title: '右そろえの三角形',
    code: code`
// 右そろえの直角三角形
#include <iostream>
using namespace std;

int main()
{
    int n;
    cout << "段数:";
    cin >> n;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n - i; j++)
            cout << ' ';
        for (int j = 1; j <= i; j++)
            cout << '*';
        cout << '\n';
    }
    return 0;
}`,
    run: [{ stdin: '3\n', contains: ['  *\n **\n***\n'] }],
    questions: [
      {
        id: 'ccpp-l3-q11', q: 'n に 3 を入力したとき、表示されるものはどれか（入力の催促は除く）。', mono: true,
        choices: ['*\n**\n***', '***\n **\n  *', '  *\n **\n***', '***\n**\n*', '  *\n ***\n*****'],
        answer: 2, exp: 'i 段目は空白を n-i 個、* を i 個。1段目「␣␣*」2段目「␣**」3段目「***」。',
      },
      {
        id: 'ccpp-l3-q12', q: 'n に 3 を入力したとき、i が 1 の段で 12行目の for 文は何回繰り返すか。', line: 12, lineHas: 'n - i',
        choices: ['0回', '1回', '2回', '3回', '4回'],
        answer: 2, exp: 'j は 1 から n - i = 2 まで → 2回。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g06', lecture: 3, type: 'behavior',
    title: 'do-while と while の違い',
    code: code`
// do文とwhile文
#include <iostream>
using namespace std;

int main()
{
    int x = 10;
    do {
        cout << "A" << x << "\n";
        x++;
    } while (x < 5);

    int y = 10;
    while (y < 5) {
        cout << "B" << y << "\n";
        y++;
    }
    return 0;
}`,
    run: [{ stdin: '', contains: ['A10\n'], notContains: ['B', 'A11'] }],
    questions: [
      {
        id: 'ccpp-l3-q13', q: 'このプログラムを実行したとき、表示されるものはどれか。',
        choices: ['何も表示されない', 'A10(改行)', 'B10(改行)', 'A10(改行)B10(改行)', 'A10(改行)A11(改行)A12(改行)'],
        answer: 1, exp: 'do-while は先に1回実行してから条件を調べるので A10 は表示される。while は最初に条件が偽なので1回も実行しない。',
      },
      {
        id: 'ccpp-l3-q14', q: 'do-while 文の説明として適切なものはどれか。',
        choices: ['条件が偽の間くり返す', 'ループ本体を少なくとも1回は実行する', '必ず10回くり返す', '条件を最初に調べ、偽なら1回も実行しない', 'switch 文の中でしか使えない'],
        answer: 1, exp: 'do { … } while (条件); は本体 → 条件判定 の順。条件が真の間くり返す。',
      },
    ],
  },
];
