// 第8回 文字列とポインタ・cstring ライブラリ（講義資料 ccpp_08 の List をもとにしたオリジナル問題）
import { code, spread } from '../lib.js';

export default spread([
  {
    id: 'ccpp-l8-g01', lecture: 8, type: 'output',
    title: '文字列リテラルの大きさ（List8-1）',
    code: code`
// 文字列リテラルの大きさを表示
#include <iostream>
using namespace std;
int main()
{
    cout << "\"ABC\"の大きさ：" << sizeof("ABC") << "\n";
    cout << "\"\"の大きさ：" << sizeof("") << "\n";
    cout << "\"ABC\\0DEF\"の大きさ：" << sizeof("ABC\0DEF") << "\n";
}`,
    run: [{ stdin: '', contains: ['"ABC"の大きさ：4\n', '""の大きさ：1\n', '"ABC\\0DEF"の大きさ：8\n'] }],
    questions: [
      {
        id: 'ccpp-l8-q01', q: '6行目で表示される大きさはどれか。', line: 6, lineHas: 'sizeof("ABC")',
        choices: ['3', '4', '5', '1', '8'],
        answer: 1, exp: '文字列リテラルの最後にはナル文字 \\0 が自動で付加される。"ABC" は A, B, C, \\0 の4要素の char 型配列。',
      },
      {
        id: 'ccpp-l8-q02', q: '7行目 sizeof("") で表示される大きさはどれか。', line: 7, lineHas: 'sizeof("")',
        choices: ['0', '1', '2', '4', 'エラーになる'],
        answer: 1, exp: '"" は "\\0" と同じ。ナル文字だけの要素数1の配列。',
      },
      {
        id: 'ccpp-l8-q03', q: '8行目 sizeof("ABC\\0DEF") で表示される大きさはどれか。', line: 8, lineHas: 'sizeof("ABC',
        choices: ['3', '4', '7', '8', '9'],
        answer: 3, exp: '"ABC\\0DEF" は最後にもナル文字が付いて "ABC\\0DEF\\0"。A,B,C,\\0,D,E,F,\\0 の8要素。',
      },
      {
        id: 'ccpp-l8-q04', q: '文字列リテラルの説明として正しいものはどれか。',
        choices: ['二重引用符で囲んだ文字列で、メモリ上では const char 型の配列として格納され、最後にナル文字 \\0 が自動付加される', '一重引用符で囲んだ1文字のこと', 'string 型の変数のこと', '最後にナル文字は付かない', 'メモリ上には格納されない'],
        answer: 0, exp: '"ABC" はメモリ上「ABC\\0」と格納される。\'A\' のような一重引用符は1文字（char）。',
      },
    ],
  },
  {
    id: 'ccpp-l8-g02', lecture: 8, type: 'array',
    title: '配列に文字列を格納（List8-2, 8-3）',
    code: code`
// 配列に文字列を格納して表示
#include <iostream>
using namespace std;
int main()
{
    char s[4];
    s[0] = 'A';
    s[1] = 'B';
    s[2] = 'C';
    s[3] = '\0';
    char s3[] = "ABC";
    cout << "配列sは\"" << s << "\"です。\n";
    cout << "s3の大きさは" << sizeof(s3) << "です。\n";
}`,
    run: [{ stdin: '', contains: ['配列sは"ABC"です。', 's3の大きさは4です。'] }],
    questions: [
      {
        id: 'ccpp-l8-q05', q: '10行目 s[3] = \'\\0\'; の役割として適切なものはどれか。', line: 10, lineHas: "s[3] = '",
        choices: ['文字列の最後を表すナル文字を格納する', '改行を格納する', '数字の0を表示する', 's を空にする', '何もしない（なくても同じ）'],
        answer: 0, exp: '文字列は最後がナル文字 \\0 の char 型配列。cout << s はナル文字の手前まで表示する。',
      },
      {
        id: 'ccpp-l8-q06', q: '12行目で表示されるものはどれか。', line: 12, lineHas: '配列s',
        choices: ['配列sは"ABC"です。', '配列sは"ABC\\0"です。', '配列sは"（sのアドレス）"です。', '配列sは"A"です。', '配列sは"ABCD"です。'],
        answer: 0, exp: 's は配列の先頭アドレスを表すが、cout << s とすると先頭からナル文字の手前まで、文字列として表示される。',
      },
      {
        id: 'ccpp-l8-q07', q: '13行目で表示される s3 の大きさはどれか。', line: 13, lineHas: 'sizeof(s3)',
        choices: ['3', '4', '5', '1', '16'],
        answer: 1, exp: 'char s3[] = "ABC"; は {\'A\', \'B\', \'C\', \'\\0\'} と同じ。要素数4。',
      },
      {
        id: 'ccpp-l8-q08', q: '11行目と同じ内容の配列になる初期化として誤っているものはどれか。', line: 11, lineHas: 'char s3[] = "ABC";', mono: true,
        choices: ["char s1[] = {'A', 'B', 'C', '\\0'};", 'char s2[] = {"ABC"};', 'char s4[4] = "ABC";', "char s5[] = {'A', 'B', 'C'};", 'char s6[] = "ABC";'],
        answer: 3, exp: "{'A', 'B', 'C'} だけではナル文字が入らず、要素数3の文字の並びになる（文字列ではない）。",
      },
    ],
  },
  {
    id: 'ccpp-l8-g03', lecture: 8, type: 'fill',
    title: '文字列を逆順に表示（List8-6, 課題8-2）',
    intro: '関数 put_str は文字列を表示し、rev_put_str は文字列を逆順に表示する。',
    code: code`
// 受け取った文字列を表示・逆順に表示
#include <iostream>
using namespace std;
//--- 文字列sを表示 ---//
void put_str(const char s[])
{
    for (int i = 0; s[i] != 0; i++)
        cout << s[i];
}
//--- 文字列sを逆順に表示 ---//
void rev_put_str(const char s[])
{
    int n = 0;
    while (s[n])
        n++;
    for (????????)
        cout << s[i];
}
int main()
{
    char str[36];
    put_str("文字列：");
    cin >> str;
    put_str(str);
    cout << '\n';
    rev_put_str(str);
    cout << '\n';
}`,
    fill: ['int i = n - 1; i >= 0; i--'],
    run: [{ stdin: 'ABC\n', contains: ['ABC\nCBA\n'] }],
    questions: [
      {
        id: 'ccpp-l8-q09', q: '7行目の条件 s[i] != 0 の意味として適切なものはどれか。', line: 7, lineHas: 's[i] != 0',
        choices: ['s[i] が数字の 0 でない間', 's[i] がナル文字でない間（文字列の終わりまで）', 'i が 0 でない間', 's が空でない間', 's[i] がスペースでない間'],
        answer: 1, exp: 'ナル文字 \\0 の値は 0。s[i] がナル文字になるまで1文字ずつ表示する。',
      },
      {
        id: 'ccpp-l8-q10', q: '16行目の ???????? に入るものはどれか（14〜15行目で n は文字列の長さになる）。', line: 16, lineHas: '????????', mono: true,
        choices: ['int i = n; i >= 0; i--', 'int i = n - 1; i >= 0; i--', 'int i = n - 1; i > 0; i--', 'int i = 0; i < n; i++', 'int i = n - 1; i >= 0; i++'],
        answer: 1, exp: '最後の文字は s[n-1]（s[n] はナル文字）。そこから s[0] まで i を減らしながら表示する。i > 0 だと先頭の文字が表示されない。',
      },
      {
        id: 'ccpp-l8-q11', q: '正しく完成させて ABC と入力したとき、入力の催促以外に表示されるものはどれか。',
        choices: ['ABC(改行)ABC(改行)', 'ABC(改行)CBA(改行)', 'CBA(改行)ABC(改行)', 'ABCCBA(改行)', 'ABC(改行)CB(改行)'],
        answer: 1, exp: 'put_str(str) で ABC、改行、rev_put_str(str) で CBA、改行。',
      },
    ],
  },
  {
    id: 'ccpp-l8-g04', lecture: 8, type: 'output',
    title: '文字列の配列（List8-11, 課題8-4）',
    code: code`
// 配列による文字列とポインタによる文字列
#include <iostream>
using namespace std;
int main()
{
    char a[][5] = {"LISP", "C", "Ada"};    // 配列による文字列の配列
    const char* p[] = {"PAUL", "X", "MAC"}; // ポインタによる文字列の配列
    cout << a[1] << " " << p[2] << "\n";
    for (int i = 0; i < 3; i++)
        cout << a[i][0];
    cout << "\n" << sizeof(a) << "\n";
}`,
    run: [{ stdin: '', contains: ['C MAC\nLCA\n15\n'] }],
    questions: [
      {
        id: 'ccpp-l8-q12', q: '8行目で表示されるものはどれか。', line: 8, lineHas: 'a[1]',
        choices: ['LISP PAUL', 'C MAC', 'C X', 'Ada MAC', 'I A'],
        answer: 1, exp: '添字は0から。a[1] は "C"、p[2] は "MAC"。',
      },
      {
        id: 'ccpp-l8-q13', q: '9〜10行目で表示されるもの（各文字列の頭文字）はどれか。',
        choices: ['LCA', 'LISPCAda', 'PXM', 'LIS', 'L C A'],
        answer: 0, exp: 'a[i][0] は i 番目の文字列の0文字目（頭文字）。L, C, A（課題8-4）。',
      },
      {
        id: 'ccpp-l8-q14', q: '11行目で表示される sizeof(a) はどれか。', line: 11, lineHas: 'sizeof(a)',
        choices: ['3', '9', '12', '15', '20'],
        answer: 3, exp: 'a は「要素数5の char 型配列」を要素とする要素数3の配列。5 × 3 = 15 バイト（"C" の後ろの余りもナル文字で埋まる）。',
      },
      {
        id: 'ccpp-l8-q15', q: '7行目の p の説明として適切なものはどれか。', line: 7, lineHas: 'p[]',
        choices: ['char 型の2次元配列', 'char 型のポインタの配列で、p[0] は文字列リテラル "PAUL" を指す', '3つの文字列をつなげた1つの文字列', '要素数5の配列', 'string 型の配列'],
        answer: 1, exp: 'ポインタの配列。各要素が文字列リテラルの先頭アドレスを持つ。講義資料の char* p[] は、今の C++ では const char* と書くのが正しい。',
      },
    ],
  },
  {
    id: 'ccpp-l8-g05', lecture: 8, type: 'output',
    title: 'strcpy と strncpy（List8-16）',
    code: code`
// strcpy関数とstrncpy関数の利用例
#include <cstring>
#include <iostream>
using namespace std;
int main(void)
{
    char s3[16];
    const char* x = "XXXXXXXXX";   // 9個の'X'とナル文字
    strcpy(s3, x); strncpy(s3, "12345", 3);
    cout << "s3 = " << s3 << '\n';
    strcpy(s3, x); strncpy(s3, "12345", 7);
    cout << "s3 = " << s3 << '\n';
    strcpy(s3, x); strncpy(s3, "1234567890", 9);
    cout << "s3 = " << s3 << '\n';
    cout << strlen(s3) << '\n';
}`,
    run: [{ stdin: '', contains: ['s3 = 123XXXXXX\ns3 = 12345\ns3 = 123456789\n9\n'] }],
    questions: [
      {
        id: 'ccpp-l8-q16', q: '10行目で表示されるものはどれか。', line: 10, lineHas: 's3',
        choices: ['s3 = 123', 's3 = 123XXXXXX', 's3 = 12345XXXX', 's3 = XXX123XXX', 's3 = XXXXXXXXX123'],
        answer: 1, exp: 'strncpy(s3, "12345", 3) は初めの3文字 "123" だけを s3 の先頭に上書きコピーする（ナル文字は付かない）。残りの X はそのまま。',
      },
      {
        id: 'ccpp-l8-q17', q: '12行目で表示されるものはどれか。', line: 12, lineHas: 's3',
        choices: ['s3 = 12345XX', 's3 = 12345', 's3 = 12345XXXX', 's3 = 1234567', 's3 = XXXXXXXXX'],
        answer: 1, exp: '"12345" は5文字。7文字分コピーするとき、足りない分はナル文字で埋められるので、s3 は "12345" で終わる。',
      },
      {
        id: 'ccpp-l8-q18', q: '14〜15行目で表示されるものの組はどれか。',
        choices: ['s3 = 1234567890 と 10', 's3 = 123456789 と 9', 's3 = 123456789X と 10', 's3 = 123456789 と 10', 's3 = 1234567890 と 9'],
        answer: 1, exp: '9文字 "123456789" を上書き。s3[9] はもとの x のナル文字のまま。strlen は文字列の長さ（ナル文字を含まない）で 9。',
      },
      {
        id: 'ccpp-l8-q19', q: '2行目 #include <cstring> が必要な理由として適切なものはどれか。', line: 2, lineHas: '<cstring>',
        choices: ['cout を使うため', 'strlen, strcpy など文字列を扱う関数（cstring ライブラリ）を使うため', 'string 型を使うため', '乱数を使うため', 'setw を使うため'],
        answer: 1, exp: 'cstring ライブラリを用いるためのヘッダ。string 型は <string>。',
      },
    ],
  },
  {
    id: 'ccpp-l8-g06', lecture: 8, type: 'output',
    title: 'strcat と strncat（List8-17）',
    code: code`
// strcat関数とstrncat関数の利用例
#include <cstring>
#include <iostream>
using namespace std;
int main(void)
{
    char s[10];
    strcpy(s, "QWE");
    strcat(s, "RTY");
    cout << "s = " << s << '\n';
    strcpy(s, "ABC");
    strncat(s, "123", 1);
    cout << "s = " << s << '\n';
    strcpy(s, "ABC");
    strncat(s, "123", 5);
    cout << "s = " << s << '\n';
}`,
    run: [{ stdin: '', contains: ['s = QWERTY\ns = ABC1\ns = ABC123\n'] }],
    questions: [
      {
        id: 'ccpp-l8-q20', q: '10行目で表示されるものはどれか。', line: 10, lineHas: 's = ',
        choices: ['s = QWE', 's = RTY', 's = QWERTY', 's = RTYQWE', 's = QWE RTY'],
        answer: 2, exp: 'strcat(s, "RTY") は s の後ろに "RTY" を連結する。',
      },
      {
        id: 'ccpp-l8-q21', q: '13行目と16行目で表示されるものの組はどれか。',
        choices: ['s = ABC1 と s = ABC123', 's = 1 と s = 123', 's = ABC123 と s = ABC12345', 's = A1 と s = ABC123', 's = ABC1 と s = ABC12300'],
        answer: 0, exp: 'strncat(s, "123", 1) は先頭1文字だけ連結 → "ABC1"。5文字分を指定しても "123" は3文字しかないので "ABC123"。',
      },
    ],
  },
  {
    id: 'ccpp-l8-g07', lecture: 8, type: 'fill',
    title: '2つの文字列をスペースを挟んで連結（課題8-5）',
    code: code`
// 2つの文字列をスペースを挟んで連結
#include <cstring>
#include <iostream>
using namespace std;
int main()
{
    char s[64], t[32];
    cin >> s >> t;
    strcat(s, " ");
    ????????
    cout << s << '\n';
}`,
    fill: ['strcat(s, t);'],
    run: [{ stdin: 'ABC DEF\n', contains: ['ABC DEF\n'] }],
    questions: [
      {
        id: 'ccpp-l8-q22', q: '10行目の ???????? に入り、ABC と DEF を入力したとき「ABC DEF」と表示させるものはどれか。', line: 10, lineHas: '????????', mono: true,
        choices: ['strcat(t, s);', 'strcat(s, t);', 'strcpy(s, t);', 's = s + t;', 'strlen(s, t);'],
        answer: 1, exp: 'strcat(s, t) で s の後ろに t を連結。strcpy だと s が t で上書きされる。char 配列は + では連結できない。',
      },
    ],
  },
]);
