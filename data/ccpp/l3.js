// 第3回 switch文・do/while/for・++/--・多重ループ・break/continue/goto（講義資料 ccpp_03 の List をもとにしたオリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l3-g01', lecture: 3, type: 'output',
    title: 'switch と break（List 2-18）',
    code: code`
// switch文とbreak文の理解を深めるためのプログラム
#include <iostream>
using namespace std;
int main()
{
    int n;
    cout << "整数を入力せよ：";
    cin >> n;
    switch (n) {
        case 0 : cout << "A";
                 cout << "B";
                 break;
        case 2 : cout << "C";
        case 5 : cout << "D";
                 break;
        case 6 :
        case 7 : cout << "E";
                 break;
        default: cout << "F";
                 break;
    }
    cout << "\n";
}`,
    run: [
      { stdin: '0\n', contains: ['AB\n'] }, { stdin: '2\n', contains: ['CD\n'] }, { stdin: '6\n', contains: ['E\n'] },
      { stdin: '9\n', contains: ['F\n'] }, { stdin: '5\n', contains: ['D\n'] },
    ],
    questions: [
      {
        id: 'ccpp-l3-q01', q: 'n に 2 を入力したとき、表示されるもの（入力の催促は除く）はどれか。',
        choices: ['C', 'CD', 'CDE', 'CDEF', 'D'],
        answer: 1, exp: 'case 2: に jump し、break まで（cout << "C"; cout << "D";）が実行される。',
      },
      {
        id: 'ccpp-l3-q02', q: 'n に 6 を入力したとき、表示されるものはどれか。',
        choices: ['何も表示されない', 'E', 'F', 'EF', 'DE'],
        answer: 1, exp: 'case 6: には文が無いので、そのまま下の case 7: の cout << "E"; に進み break。',
      },
      {
        id: 'ccpp-l3-q03', q: 'n に 9 を入力したとき、表示されるものはどれか。',
        choices: ['何も表示されない', 'ABCDEF', 'E', 'F', '9'],
        answer: 3, exp: '当てはまるラベル case が無いので、ラベル default に jump する。',
      },
      {
        id: 'ccpp-l3-q04', q: '12行目 break; の説明として適切なものはどれか。', line: 12, lineHas: 'break;',
        choices: ['次の case の文を実行する', 'この switch 文での処理を終了し抜け出す（22行目に進む）', 'プログラムを終了する', 'switch 文の先頭に戻る', 'n の値を 0 にする'],
        answer: 1, exp: 'break文は switch文での処理を終了し抜け出せという意味。} の次の22行目に進む。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g02', lecture: 3, type: 'fill',
    title: '季節を表示（List 3-1）',
    intro: '入力された月の季節を表示し、Y か y が入力されたらくり返すプログラムである。',
    code: code`
// 入力された月の季節を表示（好きなだけ繰り返せる）
#include <string>
#include <iostream>
using namespace std;
int main()
{
    string retry;   // もう一度？
    do {
        int month;
        cout << "季節を求めます。\n何月ですか：";
        cin >> month;
        if (month >= 3 && month <= 5)           // 3月・4月・5月
            cout << "それは春です。\n";
        else if (month >= 6 && month <= 8)      // 6月・7月・8月
            cout << "それは夏です。\n";
        else if (month >= 9 && month <= 11)     // 9月・10月・11月
            cout << "それは秋です。\n";
        else if (????????)                      // 12月・1月・2月
            cout << "それは冬です。\n";
        cout << "もう一度？ Y…Yes／N…No：";
        cin >> retry;
    } while (retry == "Y" || retry == "y");
}`,
    fill: ['month == 12 || month == 1 || month == 2'],
    run: [{ stdin: '1\nY\n13\nn\n', contains: ['それは冬です。'], notContains: ['それは春です。'] }],
    questions: [
      {
        id: 'ccpp-l3-q05', q: '18行目の ???????? に入るものはどれか。', line: 18, lineHas: '????????', mono: true,
        choices: ['month == 12 && month == 1 && month == 2', 'month == 12 || month == 1 || month == 2', 'month >= 12 && month <= 2', 'month = 12 || month = 1 || month = 2', 'month > 11'],
        answer: 1, exp: '「12月 または 1月 または 2月」なので ||。&& だと同時に満たすことはないので常に偽。= は代入。',
      },
      {
        id: 'ccpp-l3-q06', q: '正しく完成させたプログラムで month に 13 を入力したときの動作として適切なものはどれか。',
        choices: ['「それは冬です。」と表示される', 'どの季節も表示されずに「もう一度？ Y…Yes／N…No：」と表示される', 'プログラムが終了する', 'もう一度「何月ですか：」と聞かれる', '「それは春です。」と表示される'],
        answer: 1, exp: 'どの条件にも当てはまらず、最後の else も無いので何も表示しない。その後20行目に進む。',
      },
      {
        id: 'ccpp-l3-q07', q: '22行目 while (retry == "Y" || retry == "y"); で、retry に N を入力したときの動作はどれか。', line: 22, lineHas: 'while (retry',
        choices: ['8行目の do に戻ってくり返す', 'ループから抜け出してプログラムが終わる', '21行目に戻る', 'エラーになる', '7行目に戻る'],
        answer: 1, exp: 'do文はまず中身を一通り実行し、その後 while の条件を確認。真なら do に戻り、偽なら下に進みループから抜け出す。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g03', lecture: 3, type: 'output',
    title: 'カウントダウン（List 3-4）',
    code: code`
// 正の整数値を０までカウントダウン（その１）
#include <iostream>
using namespace std;
int main()
{
    int x;
    cout << "カウントダウンします。\n";
    do {
        cout << "正の整数値：";
        cin >> x;
    } while (x <= 0);
    while (x >= 0) {
        cout << x << "\n";  // xの値を表示
        x--;                // xの値をデクリメント
    }
}`,
    run: [{ stdin: '-3\n3\n', contains: ['3\n2\n1\n0\n'] }],
    questions: [
      {
        id: 'ccpp-l3-q08', q: 'x に 3 を入力したとき、12〜15行目で表示されるものはどれか。',
        choices: ['3(改行)2(改行)1(改行)', '3(改行)2(改行)1(改行)0(改行)', '2(改行)1(改行)0(改行)', '3(改行)2(改行)1(改行)0(改行)-1(改行)', '0(改行)1(改行)2(改行)3(改行)'],
        answer: 1, exp: 'x >= 0 が真の間くり返す。x が -1 になったところで抜ける。0 も表示される。',
      },
      {
        id: 'ccpp-l3-q09', q: '14行目 x--; と同じ意味の文はどれか。', line: 14, lineHas: 'x--;',
        choices: ['x = x - 1;', 'x = -x;', 'x = x - 2;', 'x = 0;', 'x == x - 1;'],
        answer: 0, exp: '-- は「減分演算子」。x の値を1減らして x に格納する（デクリメント）。',
      },
      {
        id: 'ccpp-l3-q10', q: '12〜15行目を while (x >= 0) cout << x-- << "\\n"; と書きかえたとき、x=3 で表示されるものはどれか。',
        choices: ['3(改行)2(改行)1(改行)0(改行)', '2(改行)1(改行)0(改行)-1(改行)', '3(改行)2(改行)1(改行)', '2(改行)1(改行)0(改行)', '何も表示されない'],
        answer: 0, exp: 'x-- は後置減分演算子。「デクリメントする前の値」を表示し、その後 x を1減らす。元と同じ動作。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g04', lecture: 3, type: 'output',
    title: '前置と後置（++x と x++）',
    code: code`
// 増分演算子
#include <iostream>
using namespace std;
int main()
{
    int x = 5, y, z;
    y = x++;
    z = ++x;
    cout << "x = " << x << "\n";
    cout << "y = " << y << "\n";
    cout << "z = " << z << "\n";
}`,
    run: [{ stdin: '', contains: ['x = 7\ny = 5\nz = 7\n'] }],
    questions: [
      {
        id: 'ccpp-l3-q11', q: '10行目で表示されるものはどれか。', line: 10, lineHas: '"y = "',
        choices: ['y = 5', 'y = 6', 'y = 7', 'y = 4', 'y = 0'],
        answer: 0, exp: 'y = x++; は後置増分。x の今の値 5 を y に代入してから x を 6 にする。',
      },
      {
        id: 'ccpp-l3-q12', q: '11行目で表示されるものはどれか。', line: 11, lineHas: '"z = "',
        choices: ['z = 5', 'z = 6', 'z = 7', 'z = 8', 'z = 0'],
        answer: 2, exp: 'z = ++x; は前置増分。x を 6→7 に増やした後の値 7 を z に代入する。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g05', lecture: 3, type: 'shape',
    title: '九九の表（List 3-14）',
    code: code`
// 九九の表を表示
#include <iomanip>
#include <iostream>
using namespace std;
int main()
{
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= 9; j++)
            cout << setw(3) << i * j;
        cout << '\n';
    }
}`,
    run: [{ stdin: '', contains: ['  1  2  3  4  5  6  7  8  9\n  2  4', ' 81\n'] }],
    questions: [
      {
        id: 'ccpp-l3-q13', q: '表示の2行目として正しいものはどれか（␣は空白）。', mono: true,
        choices: ['␣␣2␣␣4␣␣6␣␣8␣10␣12␣14␣16␣18', '2 4 6 8 10 12 14 16 18', '␣␣2␣␣4␣␣6␣␣8␣␣10␣␣12␣␣14␣␣16␣␣18', '␣␣1␣␣2␣␣3␣␣4␣␣5␣␣6␣␣7␣␣8␣␣9', '␣␣2(改行)␣␣4(改行)…(改行)␣18'],
        answer: 0, exp: 'setw(3) は「少なくとも」3桁の幅で出力する。1桁は空白2つ、2桁は空白1つが前に付く。',
      },
      {
        id: 'ccpp-l3-q14', q: '9行目は全部で何回実行されるか。', line: 9, lineHas: 'setw(3)',
        choices: ['9回', '18回', '45回', '81回', '90回'],
        answer: 3, exp: '外側の for 9回 × 内側の for 9回 = 81回。内側の j は外側の各巡で j=1 に初期化される。',
      },
      {
        id: 'ccpp-l3-q15', q: '2行目 #include <iomanip> が必要な理由として適切なものはどれか。', line: 2, lineHas: '<iomanip>',
        choices: ['for 文を使うため', 'setw を使うため', 'i * j を計算するため', 'cout を使うため', '改行するため'],
        answer: 1, exp: 'setw を用いるにはヘッダ iomanip のインクルードが必要。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g06', lecture: 3, type: 'fill',
    title: '* を n 個表示（List 3-11）',
    code: code`
// 読み込んだ個数だけ*を表示（for文）
#include <iostream>
using namespace std;
int main()
{
    int n;
    cout << "何個*を表示しますか：";
    cin >> n;
    for (????????)
        cout << '*';
    cout << '\n';
}`,
    fill: ['int i = 0; i < n; i++'],
    run: [{ stdin: '4\n', contains: ['****\n'], notContains: ['*****'] }],
    questions: [
      {
        id: 'ccpp-l3-q16', q: '9行目の ???????? に入れて、ちょうど n 個の * を表示するものはどれか。', line: 9, lineHas: '????????', mono: true,
        choices: ['int i = 0; i <= n; i++', 'int i = 0; i < n; i++', 'int i = 1; i < n; i++', 'int i = 0, i < n, i++', 'int i = n; i > 0; i++'],
        answer: 1, exp: 'i = 0,1,…,n-1 の n 回。<= n だと n+1 回、i = 1 から i < n だと n-1 回。区切りは ; 。',
      },
      {
        id: 'ccpp-l3-q17', q: 'for (A; B; C) の A, B, C の説明として正しい組はどれか。',
        choices: ['A:条件式 B:初期化 C:後処理', 'A:初期化 B:条件式 C:後処理', 'A:後処理 B:条件式 C:初期化', 'A:初期化 B:後処理 C:条件式', 'A:条件式 B:後処理 C:初期化'],
        answer: 1, exp: 'A が「初期化」（1巡目だけ）、B が「条件式」、C が「後処理」。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g07', lecture: 3, type: 'behavior',
    title: '0 で終了（List 3-17 break文）',
    code: code`
// 読み込んだ整数を加算（0が入力されたら終了）
#include <iostream>
using namespace std;
int main()
{
    int n;      // 加算する個数
    cout << "整数を加算します。\n";
    cout << "何個加算しますか：";
    cin >> n;
    int sum = 0;    // 合計値
    for (int i = 0; i < n; i++) {
        int t;
        cout << "整数（0で終了）：";
        cin >> t;
        if (t == 0) break;  // for文から抜け出る
        sum += t;
    }
    cout << "合計は" << sum << "です。\n";
}`,
    run: [{ stdin: '5\n4\n6\n0\n', contains: ['合計は10です。'] }],
    questions: [
      {
        id: 'ccpp-l3-q18', q: 'n に 5、t に順に 4, 6, 0 を入力したとき、最後に表示されるものはどれか。',
        choices: ['合計は0です。', '合計は4です。', '合計は10です。', '合計は15です。', '「整数（0で終了）：」がさらに2回表示される'],
        answer: 2, exp: 't = 0 で break し for ループから抜け出す。合計は 4 + 6 = 10。',
      },
      {
        id: 'ccpp-l3-q19', q: '二重ループの内側のループの中で break が実行されたときの動作として適切なものはどれか。',
        choices: ['二重ループ全体から抜け出す', 'その break 文を直接含んでいる（内側の）ループだけから抜け出す', 'プログラムを終了する', '外側のループの先頭に戻る', '内側のループの次の繰り返しに進む'],
        answer: 1, exp: 'break は「その break 文を直接含んでいるループ」から抜け出す。多重ループ全体から抜け出すという意味ではない。',
      },
    ],
  },
  {
    id: 'ccpp-l3-g08', lecture: 3, type: 'behavior',
    title: '9999 で強制終了（List 3-20 goto文）',
    code: code`
// 読み込んだ整数を加算（9999が入力されると強制終了）
#include <iostream>
using namespace std;
int main()
{
    int n;
    cout << "整数を加算します。\n";
    cout << "何個加算しますか：";
    cin >> n;
    cout << "9999で強制終了します。\n";
    int sum = 0;
    for (int i = 0; i < n; i++) {
        int t;
        cout << "整数：";
        cin >> t;
        if (t == 9999)
            goto Exit;
        sum += t;
    }
    cout << "合計は" << sum << "です。\n";
Exit:
    ;
}`,
    run: [{ stdin: '3\n5\n9999\n', notContains: ['合計は'] }, { stdin: '2\n5\n6\n', contains: ['合計は11です。'] }],
    questions: [
      {
        id: 'ccpp-l3-q20', q: 'n に 3、t に 5, 9999 を入力したとき、20行目は実行されるか。', line: 20, lineHas: '合計',
        choices: ['実行され「合計は5です。」と表示される', '実行され「合計は10004です。」と表示される', '実行されない（21行目の Exit: に jump して何もせず終わる）', '実行され「合計は0です。」と表示される', 'もう一度「整数：」と聞かれてから実行される'],
        answer: 2, exp: 'goto Exit; でラベル Exit の付いた行に jump する。その行は「;」だけなので何も実行しない。',
      },
    ],
  },
];
