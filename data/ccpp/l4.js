// 第4回 配列・sizeof・反転・2次元配列・行列の加算（講義資料 ccpp_04 の List をもとにしたオリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l4-g01', lecture: 4, type: 'array',
    title: '配列への代入（List5-3, 課題5-1）',
    code: code`
// 配列の各要素に値を代入して表示（for文）
#include <iostream>
using namespace std;
int main()
{
    int a[5];   // 要素型がint型で要素数5の配列
    for (int i = 0; i < 5; i++)
        a[i] = 5 - i;
    for (int i = 0; i < 5; i++)
        cout << "a[" << i << "] = " << a[i] << '\n';
}`,
    run: [{ stdin: '', contains: ['a[0] = 5\na[1] = 4', 'a[4] = 1\n'] }],
    questions: [
      {
        id: 'ccpp-l4-q01', q: '6行目 int a[5]; の説明として適切なものはどれか。', line: 6, lineHas: 'int a[5];',
        choices: ['a に 5 を代入する', '要素型が int で要素数5の配列 a を宣言する。添字は 0〜4', '要素型が int で要素数5の配列 a を宣言する。添字は 1〜5', '要素数 6 の配列 a を宣言する', '5番目の要素 a[5] だけを宣言する'],
        answer: 1, exp: '配列は同じ名前の付いた複数のデータをまとめたもの。添字は 0 から始まり、この場合 4 まで。',
      },
      {
        id: 'ccpp-l4-q02', q: '8行目まで実行したときの配列 a の中身はどれか。', line: 8, lineHas: 'a[i] = 5 - i;',
        choices: ['a[0]=5, a[1]=4, a[2]=3, a[3]=2, a[4]=1', 'a[1]=5, a[2]=4, a[3]=3, a[4]=2, a[5]=1', 'a[0]=4, a[1]=3, a[2]=2, a[3]=1, a[4]=0', 'a[0]=1, a[1]=2, a[2]=3, a[3]=4, a[4]=5', 'a[0]=5, a[1]=5, a[2]=5, a[3]=5, a[4]=5'],
        answer: 0, exp: 'i = 0〜4 で a[i] = 5 - i。a[0]=5 … a[4]=1 と逆順になる（課題5-1）。',
      },
    ],
  },
  {
    id: 'ccpp-l4-g02', lecture: 4, type: 'array',
    title: '配列の要素数（List5-5, 課題5-2）',
    intro: 'int 型の大きさは 4 バイトとする。',
    code: code`
// 配列の各要素を初期化して表示（要素数を計算によって求める）
#include <iostream>
using namespace std;
int main()
{
    int a[] = {1, 2, 3, 4, 5};
    int a_size = sizeof(a) / sizeof(a[0]);  // 配列aの要素数
    cout << "aは" << sizeof(a) << "バイト\n";
    cout << "a[0]は" << sizeof(a[0]) << "バイト\n";
    for (int i = 0; i < a_size; i++)
        cout << "a[" << i << "] = " << a[i] << '\n';
}`,
    run: [{ stdin: '', contains: ['aは20バイト', 'a[0]は4バイト', 'a[4] = 5'] }],
    questions: [
      {
        id: 'ccpp-l4-q03', q: '8行目で表示されるものはどれか。', line: 8, lineHas: 'sizeof(a)',
        choices: ['aは5バイト', 'aは4バイト', 'aは20バイト', 'aは1バイト', 'aは15バイト'],
        answer: 2, exp: 'sizeof(a) は配列 a の格納場所全体の大きさ（バイト数）。4バイト × 5個 = 20。',
      },
      {
        id: 'ccpp-l4-q04', q: '7行目で a_size に入る値はどれか。', line: 7, lineHas: 'a_size',
        choices: ['4', '5', '20', '1', '6'],
        answer: 1, exp: 'sizeof(a) / sizeof(a[0]) = 20 / 4 = 5。配列の中の変数の個数（要素数）が計算できる。',
      },
      {
        id: 'ccpp-l4-q05', q: '6行目 int a[] = {1, 2, 3, 4, 5}; の説明として適切なものはどれか。', line: 6, lineHas: 'int a[]',
        choices: ['要素数を指定していないのでエラーになる', '要素数を指定せず宣言＆初期化する。要素数は初期値の数から5になる', '要素数0の配列になる', 'a[1]=1, …, a[5]=5 と格納される', '配列ではなく整数 12345 が格納される'],
        answer: 1, exp: '要素数を省略すると初期化子の個数が要素数になる。a[0]=1, a[1]=2, … と格納される。',
      },
    ],
  },
  {
    id: 'ccpp-l4-g03', lecture: 4, type: 'output',
    title: '合計点と平均点（List5-6）',
    code: code`
// ５人の点数を読み込んで合計点・平均点を表示
#include <iostream>
using namespace std;
int main()
{
    int tensu[5];   // ５人の点数
    int sum = 0;    // 合計
    cout << "5人の点数の合計点と平均点を求めます。\n";
    for (int i = 0; i < 5; i++) {
        cout << i + 1 << "番の点数：";
        cin >> tensu[i];    // tensu[i]を読み込んで
        sum += tensu[i];    // sumにtensu[i]を加える
    }
    cout << "合計は" << sum << "点です。\n";
    cout << "平均は" << static_cast<double>(sum) / 5 << "点です。\n";
}`,
    run: [{ stdin: '60\n70\n80\n90\n53\n', contains: ['合計は353点です。', '平均は70.6点です。', '1番の点数：'] }],
    questions: [
      {
        id: 'ccpp-l4-q06', q: '点数に 60, 70, 80, 90, 53 を入力したとき、15行目で表示されるものはどれか。', line: 15, lineHas: '平均',
        choices: ['平均は70点です。', '平均は70.6点です。', '平均は71点です。', '平均は70.600000点です。', '平均は353点です。'],
        answer: 1, exp: '合計 353。static_cast<double>(sum) で double に変換してから割るので 70.6（int のまま割ると 70）。',
      },
      {
        id: 'ccpp-l4-q07', q: '10行目で最初に表示される催促はどれか。', line: 10, lineHas: '番の点数',
        choices: ['0番の点数：', '1番の点数：', 'i + 1番の点数：', '5番の点数：', 'tensu[0]の点数：'],
        answer: 1, exp: 'i は 0 から始まるが、i + 1 を表示しているので「1番の点数：」から。',
      },
    ],
  },
  {
    id: 'ccpp-l4-g04', lecture: 4, type: 'array',
    title: '並びの反転（List5-8）',
    code: code`
// 配列の要素の並びを反転して表示
#include <iostream>
using namespace std;
int main()
{
    const int n = 6;    // 配列aの要素数
    int a[n] = {3, 8, 1, 9, 4, 7};
    for (int i = 0; i < n / 2; i++) {
        int t = a[i];
        a[i] = a[n - i - 1];
        a[n - i - 1] = t;
    }
    for (int i = 0; i < n; i++)
        cout << a[i] << ' ';
    cout << '\n';
}`,
    run: [{ stdin: '', contains: ['7 4 9 1 8 3 \n'] }],
    questions: [
      {
        id: 'ccpp-l4-q08', q: '9行目 int t = a[i]; の役割として適切なものはどれか。', line: 9, lineHas: 'int t = a[i];',
        choices: ['a[i] の値を一旦変数 t に格納して退避する', 'a[i] を 0 にする', 'a[i] と t を比べる', '配列の要素数を数える', 't を a[i] に代入する'],
        answer: 0, exp: '一旦 a[i] を t に退避 → a[i] に a[n-i-1] を上書き → a[n-i-1] に t をコピー で入れ替えが完了する。',
      },
      {
        id: 'ccpp-l4-q09', q: '13〜15行目で表示されるものはどれか。',
        choices: ['3 8 1 9 4 7', '7 4 9 1 8 3', '7 4 9 9 4 7', '1 3 4 7 8 9', '3 8 1 1 8 3'],
        answer: 1, exp: 'i = 0,1,2 で a[0]↔a[5]、a[1]↔a[4]、a[2]↔a[3] を交換。',
      },
      {
        id: 'ccpp-l4-q10', q: 'もし 9〜11行目を a[i] = a[n - i - 1]; だけにした（退避しない）とき、表示されるものはどれか。',
        choices: ['3 8 1 9 4 7', '7 4 9 1 8 3', '7 4 9 9 4 7', '3 8 1 1 8 3', '7 4 9 1 4 7'],
        answer: 2, exp: '前半に後半の値が上書きコピーされるだけで、後半はそのまま。元の前半の値は失われる。',
      },
    ],
  },
  {
    id: 'ccpp-l4-g05', lecture: 4, type: 'array',
    title: '2次元配列（List5-10）',
    code: code`
// 3行2列の２次元配列に値を代入して表示
#include <iostream>
using namespace std;
int main()
{
    int m[3][2];    // 3行2列の２次元配列
    int k = 1;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 2; j++) {
            m[i][j] = k;
            k++;
        }
    }
    cout << "m[1][0]:" << m[1][0] << '\n';
    cout << "m[2][1]:" << m[2][1] << '\n';
}`,
    run: [{ stdin: '', contains: ['m[1][0]:3\n', 'm[2][1]:6\n'] }],
    questions: [
      {
        id: 'ccpp-l4-q11', q: '14行目で表示されるものはどれか。', line: 14, lineHas: 'm[1][0]',
        choices: ['m[1][0]:1', 'm[1][0]:2', 'm[1][0]:3', 'm[1][0]:4', 'm[1][0]:5'],
        answer: 2, exp: '外側 i が「行」、内側 j が「列」。m[0][0]=1, m[0][1]=2, m[1][0]=3, … の順に代入される。',
      },
      {
        id: 'ccpp-l4-q12', q: '15行目で表示されるものはどれか。', line: 15, lineHas: 'm[2][1]',
        choices: ['m[2][1]:3', 'm[2][1]:4', 'm[2][1]:5', 'm[2][1]:6', 'm[2][1]:7'],
        answer: 3, exp: 'm[2][1] は最後の要素で 6。',
      },
      {
        id: 'ccpp-l4-q13', q: '6行目 int m[3][2]; の説明として適切なものはどれか。', line: 6, lineHas: 'int m[3][2];',
        choices: ['int を要素型とする要素数3の配列を要素型とし、その要素数が2', 'int を要素型とする要素数2の配列を要素型とし、その要素数が3（3行2列）', '要素数5の1次元配列', '要素数32の配列', '2行3列の配列'],
        answer: 1, exp: '「要素型」が「int を要素型とする要素数2の配列」であり、その要素数が3という意味。',
      },
    ],
  },
];
