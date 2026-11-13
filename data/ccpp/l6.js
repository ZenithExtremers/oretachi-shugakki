// 第6回 ポインタ・関数とポインタ・配列とポインタ・線形探索・new/delete（講義資料 ccpp_06 の List をもとにしたオリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l6-g01', lecture: 6, type: 'meaning',
    title: 'アドレス演算子と間接演算子（List7-2）',
    code: code`
// ポインタの基本（アドレス演算子&と間接演算子*）
#include <iostream>
using namespace std;
int main()
{
    int n = 135;
    cout << "n  ：" << n << '\n';
    cout << "&n ：" << &n << "番地\n";
    int* ptr = &n;  // ptrはnを指す
    cout << "ptr ：" << ptr << "番地\n";
    cout << "*ptr：" << *ptr << '\n';
}`,
    run: [{ stdin: '', contains: ['*ptr：135\n'] }],
    questions: [
      {
        id: 'ccpp-l6-q01', q: '8行目の &n が表すものはどれか。', line: 8, lineHas: '&n',
        choices: ['変数 n の値 135', '変数 n のメモリ上の格納場所のアドレス', 'n と 1 のビット積', 'n のバイト数', 'n を指すポインタが指す中身'],
        answer: 1, exp: '& は「アドレス演算子」。&n は変数 n のメモリ上の格納場所のアドレス。',
      },
      {
        id: 'ccpp-l6-q02', q: '9行目 int* ptr = &n; の説明として適切なものはどれか。', line: 9, lineHas: 'int* ptr = &n;',
        choices: ['ptr に n の値 135 が格納される', 'int* は整数型の変数のポインタを表す型で、ptr には n のアドレス &n が格納される', 'ptr と n の積を求める', 'n に ptr のアドレスが格納される', 'ptr の中身が 0 になる'],
        answer: 1, exp: 'ポインタは格納場所のアドレスを指し示す（ポイントする）変数。',
      },
      {
        id: 'ccpp-l6-q03', q: '11行目で表示されるものはどれか。', line: 11, lineHas: '*ptr',
        choices: ['*ptr：（n のアドレス）', '*ptr：135', '*ptr：0', '*ptr：（ptr のアドレス）', '*ptr：136'],
        answer: 1, exp: '* は「間接演算子」。*ptr は「ptr が指し示す格納場所に格納されている値そのもの」で、n の値 135。',
      },
    ],
  },
  {
    id: 'ccpp-l6-g02', lecture: 6, type: 'output',
    title: 'ポインタで値を変更（List7-3）',
    code: code`
// アドレス演算子と間接参照演算子
#include <iostream>
using namespace std;
int main()
{
    int x = 123, y = 567, sw;
    cout << "値を変更する変数[0…x / 1…y]：";
    cin >> sw;
    int* ptr;
    if (sw == 0)
        ptr = &x;   // ptrはxを指す
    else
        ptr = &y;   // ptrはyを指す
    *ptr = 999;
    cout << "x = " << x << '\n';
    cout << "y = " << y << '\n';
}`,
    run: [{ stdin: '1\n', contains: ['x = 123\ny = 999\n'] }, { stdin: '0\n', contains: ['x = 999\ny = 567\n'] }],
    questions: [
      {
        id: 'ccpp-l6-q04', q: 'sw に 1 を入力したとき、15〜16行目で表示されるものはどれか。',
        choices: ['x = 999(改行)y = 567(改行)', 'x = 123(改行)y = 999(改行)', 'x = 999(改行)y = 999(改行)', 'x = 123(改行)y = 567(改行)', 'x = 1(改行)y = 999(改行)'],
        answer: 1, exp: 'sw ≠ 0 なので ptr = &y。*ptr = 999 で y の格納場所に 999 が格納される。',
      },
      {
        id: 'ccpp-l6-q05', q: '14行目 *ptr = 999; の説明として適切なものはどれか。', line: 14, lineHas: '*ptr = 999;',
        choices: ['ポインタ ptr の値（アドレス）を 999 番地にする', 'ptr が指し示す格納場所（x か y）に 999 を格納する', 'x と y の両方に 999 を格納する', '999 を画面に表示する', 'ptr と 999 を比較する'],
        answer: 1, exp: 'アクセスしたい格納場所を状況に応じて「動的」に決めて、そこに 999 を格納している。',
      },
    ],
  },
  {
    id: 'ccpp-l6-g03', lecture: 6, type: 'fill',
    title: '和と積を関数で求める（List7-5）',
    code: code`
// 二つの整数値の和と積を関数によって求める
#include <iostream>
using namespace std;
//--- xとyの和と積を*sumと*mulに求める ---//
void sum_mul(int x, int y, ????????)
{
    *sum = x + y;
    *mul = x * y;
}
int main()
{
    int a, b;
    int wa = 0, seki = 0;
    cout << "整数a："; cin >> a;
    cout << "整数b："; cin >> b;
    sum_mul(a, b, &wa, &seki);  // aとbの和と積を求める
    cout << "和は" << wa << "です。\n";
    cout << "積は" << seki << "です。\n";
}`,
    fill: ['int* sum, int* mul'],
    run: [{ stdin: '3\n5\n', contains: ['和は8です。', '積は15です。'] }],
    questions: [
      {
        id: 'ccpp-l6-q06', q: '5行目の ???????? に入るものはどれか。', line: 5, lineHas: '????????', mono: true,
        choices: ['int sum, int mul', 'int* sum, int* mul', 'int& sum, int& mul', '&sum, &mul', 'int sum[], int mul'],
        answer: 1, exp: 'wa と seki のアドレスを受け取るのでポインタ型 int*。そのアドレスの格納場所に *sum = x + y で書き込む。',
      },
      {
        id: 'ccpp-l6-q07', q: 'もし関数を void sum_mul(int x, int y, int sum, int mul) { sum = x + y; mul = x * y; } と定義し、sum_mul(a, b, wa, seki); と呼び出したとき、a=3, b=5 で表示される和はどれか。',
        choices: ['和は8です。', '和は0です。', '和は3です。', '和は15です。', 'コンパイルエラーで何も表示されない'],
        answer: 1, exp: '値渡しなので sum ← wa のコピーは行われるが、逆方向の wa ← sum は実行されない。wa は 0 のまま。',
      },
    ],
  },
  {
    id: 'ccpp-l6-g04', lecture: 6, type: 'output',
    title: '間接演算子と添字演算子（List7-7）',
    code: code`
// 配列の要素の値とアドレス
#include <iostream>
using namespace std;
int main(void)
{
    int a[5] = {1, 2, 3, 4, 5};
    int* p = a;     // pはa[0]を指す
    cout << *(a + 2) << '\n';
    cout << p[3] << '\n';
    cout << *p + 3 << '\n';
}`,
    run: [{ stdin: '', contains: ['3\n4\n4\n'] }],
    questions: [
      {
        id: 'ccpp-l6-q08', q: '7行目 int* p = a; の説明として適切なものはどれか。', line: 7, lineHas: 'int* p = a;',
        choices: ['p に配列 a の全要素がコピーされる', 'p に配列 a の先頭のアドレス（&a[0]）が代入される', 'p に a[0] の値 1 が代入される', 'p に配列 a の最後のアドレスが代入される', 'p に要素数 5 が代入される'],
        answer: 1, exp: '配列名 a はその配列の先頭のアドレスを表す（a = &a[0]）。これで p[0], p[1], … が a[0], a[1], … と同じ値を表す。',
      },
      {
        id: 'ccpp-l6-q09', q: '8〜10行目で表示されるものはどれか。',
        choices: ['3(改行)4(改行)4(改行)', '2(改行)3(改行)4(改行)', '3(改行)4(改行)3(改行)', '3(改行)3(改行)4(改行)', '4(改行)5(改行)6(改行)'],
        answer: 0, exp: '*(a+2) = a[2] = 3、p[3] = a[3] = 4、*p + 3 は (*p) + 3 = 1 + 3 = 4（*(p+3) ではない）。',
      },
    ],
  },
  {
    id: 'ccpp-l6-g05', lecture: 6, type: 'array',
    title: '配列の全要素に0を代入（List7-12）',
    code: code`
// 配列の先頭n個の要素に0を代入
#include <iostream>
using namespace std;
void fill_zero(int* p, int n)
{
    while (n-- > 0) {
        *p = 0;     // 着目要素に0を代入
        p++;        // 次の要素に着目
    }
}
int main(void)
{
    int x[5] = {1, 2, 3, 4, 5};
    fill_zero(x, 3);
    for (int i = 0; i < 5; i++)
        cout << x[i] << ' ';
    cout << '\n';
}`,
    run: [{ stdin: '', contains: ['0 0 0 4 5 \n'] }],
    questions: [
      {
        id: 'ccpp-l6-q10', q: '15〜17行目で表示されるものはどれか。',
        choices: ['0 0 0 0 0', '0 0 0 4 5', '1 2 3 0 0', '1 2 3 4 5', '0 2 3 4 5'],
        answer: 1, exp: 'x の先頭アドレスが p にコピーされ、先頭から3個に 0 を代入。配列は先頭アドレスを渡すので main の x が書き換わる。',
      },
      {
        id: 'ccpp-l6-q11', q: '8行目 p++; の説明として適切なものはどれか。', line: 8, lineHas: 'p++;',
        choices: ['p が指す格納場所の中身を1増やす', 'ポインタ p に格納されているアドレスを1つ進め、配列の次の格納場所を指すようにする', 'n を1増やす', 'x[0] を1増やす', 'p を 0 にする'],
        answer: 1, exp: '* が付いていないのでポインタ自身（アドレス）が変わる。ループの1巡目の後は x[1] のアドレスになる。',
      },
    ],
  },
  {
    id: 'ccpp-l6-g06', lecture: 6, type: 'fill',
    title: '線形探索 第２版（List7-15）',
    code: code`
// 線形探索（第２版）
#include <iostream>
using namespace std;
int seq_search(int* a, int n, int key)
{
    int* p = a;
    while (n-- > 0) {
        if (*p == key)
            return ????????;    // 探索成功
        else
            p++;
    }
    return -1;                  // 探索失敗
}
int main(void)
{
    int x[8] = {5, 3, 8, 1, 3, 9, 2, 7};
    int key = 3, idx;
    if ((idx = seq_search(x, 8, key)) != -1)
        cout << "その値をもつ要素はx[" << idx << "]です。\n";
    else
        cout << "見つかりませんでした。\n";
}`,
    fill: ['p - a'],
    run: [{ stdin: '', contains: ['x[1]です。'] }],
    questions: [
      {
        id: 'ccpp-l6-q12', q: '9行目の ???????? に入り、見つかった要素の添字を返すものはどれか。', line: 9, lineHas: '????????', mono: true,
        choices: ['p', '*p', 'p - a', 'a - p', '*p - *a'],
        answer: 2, exp: 'ポインタ p が表す現在の番地と配列の先頭アドレス a との差を返すと、前から何番目かになる。',
      },
      {
        id: 'ccpp-l6-q13', q: '正しく完成させたとき、表示されるものはどれか。',
        choices: ['その値をもつ要素はx[1]です。', 'その値をもつ要素はx[4]です。', 'その値をもつ要素はx[1]です。(改行)その値をもつ要素はx[4]です。', 'その値をもつ要素はx[2]です。', '見つかりませんでした。'],
        answer: 0, exp: '前から順に調べ、最初に見つかった x[1] で return する（同じ値の x[4] は表示されない。課題6-4で改良する点）。',
      },
    ],
  },
  {
    id: 'ccpp-l6-g07', lecture: 6, type: 'meaning',
    title: '動的な生成（List7-16, 7-18）',
    code: code`
// 整数配列オブジェクトを動的に生成
#include <iostream>
using namespace std;
int main()
{
    int asize;
    cout << "要素数：";
    cin >> asize;               // 配列の要素数
    int* a = new int[asize];    // 生成
    for (int i = 0; i < asize; i++)
        a[i] = i;
    for (int i = 0; i < asize; i++)
        cout << "a[" << i << "] = " << a[i] << '\n';
    delete[] a;                 // 破棄
}`,
    run: [{ stdin: '3\n', contains: ['a[0] = 0\na[1] = 1\na[2] = 2\n'] }],
    questions: [
      {
        id: 'ccpp-l6-q14', q: '9行目 int* a = new int[asize]; の説明として適切なものはどれか。', line: 9, lineHas: 'new int[asize]',
        choices: ['値が asize の int 型変数を1つ作る', '整数型配列のオブジェクトの領域を動的に確保し、その先頭アドレスを a に代入する', '配列 a を asize 回コピーする', 'a の asize 番目の要素を新しくする', '確保した記憶域を解放する'],
        answer: 1, exp: 'new 演算子で記憶域を確保。これでポインタ a は配列 a[asize] と同等に扱える。',
      },
      {
        id: 'ccpp-l6-q15', q: '14行目 delete[] a; の説明として適切なものはどれか。', line: 14, lineHas: 'delete[] a;',
        choices: ['配列の中身を全部 0 にする', 'ポインタ a が指し示す配列型オブジェクトの記憶域を破棄し解放する', 'a という名前を使えなくする', '配列の最後の要素だけを削除する', 'プログラムを強制終了する'],
        answer: 1, exp: '配列型オブジェクトの破棄は delete[]。int 1個を new int で確保したときは delete x; で破棄する。',
      },
      {
        id: 'ccpp-l6-q16', q: '記憶域を確保するタイミングや解放するタイミングをプログラマが強制的に定める記憶域の期間を何というか。',
        choices: ['自動記憶域期間', '静的記憶域期間', '動的記憶域期間', 'ローカル記憶域期間', '値渡し期間'],
        answer: 2, exp: 'new と delete で制御される記憶域の確保の期間を「動的記憶域期間」と呼ぶ。',
      },
    ],
  },
];
