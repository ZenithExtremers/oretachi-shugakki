// 2026年度 C/C++プログラミング 中間テスト（再現）
// ※ 解答は公式のものではありません。コードは本番の写真と講義資料から復元したものです。
import { code } from '../lib.js';

const S = 'midterm2026';

export default [
  {
    id: 'ccpp-m26-g01', source: S, lecture: 1, type: 'cloze', no: '問1〜5',
    title: 'コンパイラ言語のしくみ',
    intro: '次の文章の空欄［問1］〜［問5］に入る語句を選択肢から選べ。同じ番号の空欄には同じ語句が入る。',
    passage: '人が書いたプログラムのソースコード全体をコンパイラが一括で［問1］が解釈できる動作内容（機械語）に変換する（「［問2］する」という）。変換された形式のプログラムを［問3］という。その［問3］のプログラムに従って動作させるプログラミング言語（例：C, C++, …）をコンパイラ言語という。一般にソースコードとその［問3］はコンピュータの［問4］に保存されている。プログラムの実行時には［問3］の中の必要部分が［問5］に格納され、次に［問5］に格納された［問3］の処理内容に従い［問1］で処理が実行される。',
    sharedChoices: ['コンパイル', 'ディスク', 'CPU', 'メモリ', '実行形式'],
    questions: [
      { id: 'ccpp-m26-q01', q: '［問1］', answer: 2, exp: '機械語を解釈して処理を実行するのは CPU。' },
      { id: 'ccpp-m26-q02', q: '［問2］', answer: 0, exp: 'ソースコードを機械語に変換することを「コンパイル」という。' },
      { id: 'ccpp-m26-q03', q: '［問3］', answer: 4, exp: '変換されたプログラムを「実行形式」という（Windowsなら .exe）。' },
      { id: 'ccpp-m26-q04', q: '［問4］', answer: 1, exp: 'ファイルは電源を切っても消えないディスクに保存されている。' },
      { id: 'ccpp-m26-q05', q: '［問5］', answer: 3, exp: '実行時は必要部分がディスクからメモリに読み込まれ、CPU がメモリ上の命令を処理する。' },
    ],
  },
  {
    id: 'ccpp-m26-g02', source: S, lecture: 1, type: 'meaning', no: '問6・7',
    title: 'Hello World',
    code: code`
// Hello World を表示する
#include <iostream>
using namespace std;
int main(){
    cout << "Hello World!\n";
    return 0;
}`,
    run: [{ stdin: '', contains: ['Hello World!'] }],
    questions: [
      {
        id: 'ccpp-m26-q06', q: '4行目 int main() の int の説明として適切なものはどれか。', line: 4, lineHas: 'int main',
        choices: ['関数の別名', '関数の入力が無し', '関数の戻り値が無し', '関数の戻り値が整数型', '関数の入力が整数型'],
        answer: 3, exp: '関数名の前の型は「戻り値（返却値）の型」。int なので整数を返す。入力（引数）は ( ) の中に書く。',
      },
      {
        id: 'ccpp-m26-q07', q: '6行目 return 0; の説明として適切なものはどれか。', line: 6, lineHas: 'return 0;',
        choices: ['ソースコードの0行目に戻る', 'ソースコードの1行目に戻る', 'ソースコードの4行目に戻る', 'OSへの関数の戻り値が無し', 'OSへの関数の戻り値が0'],
        answer: 4, exp: 'main 関数の return は OS へ値を返して終了する。0 は「正常終了」を意味する。行に戻るわけではない。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g03', source: S, lecture: 2, type: 'output', no: '問8〜11',
    title: '型の違いと割り算',
    code: code`
// x/y の計算結果を表示する
#include <iostream>
using namespace std;

int main()
{
    float x;
    double y;
    int z;

    cout << "xとyの値を入力してください.\n";
    cout << "x:";
    cin >> x;
    cout << "y:";
    cin >> y;

    cout << "xは" << x << "です.\n";
    cout << "yは" << y << "です.\n";

    z = x / y;

    cout << "x/yは" << x / y << "です.\n";
    cout << "zは" << z << "です.\n";

    return 0;
}`,
    run: [{ stdin: '1\n3\n', contains: ['x/yは0.333333です.', 'zは0です.'] }],
    questions: [
      {
        id: 'ccpp-m26-q08', q: '7行目 float x; の説明として適切なものはどれか。', line: 7, lineHas: 'float x;',
        choices: ['単精度浮動小数点型（小数）の変数 x の宣言', '単精度浮動小数点型（整数）の変数 x の宣言', '倍精度浮動小数点型（小数）の変数 x の宣言', '倍精度浮動小数点型（整数）の変数 x の宣言', '整数型の変数 x の宣言'],
        answer: 0, exp: 'float は単精度、double は倍精度の浮動小数点型。どちらも小数を扱う。',
      },
      {
        id: 'ccpp-m26-q09', q: '8行目 double y; の説明として適切なものはどれか。', line: 8, lineHas: 'double y;',
        choices: ['単精度浮動小数点型（小数）の変数 y の宣言', '単精度浮動小数点型（整数）の変数 y の宣言', '倍精度浮動小数点型（小数）の変数 y の宣言', '倍精度浮動小数点型（整数）の変数 y の宣言', '整数型の変数 y の宣言'],
        answer: 2, exp: 'double は倍精度浮動小数点型（小数）。float より精度が高い。',
      },
      {
        id: 'ccpp-m26-q10', q: 'x に 1、y に 3 を入力したとき、22行目で表示されるものはどれか。', line: 22, lineHas: 'x / y',
        choices: ['x/yは1/3です.', 'x/yは0.333333です.', 'x/yは0です.', 'x/yは1です.', 'x/yはです.'],
        answer: 1, exp: 'x も y も小数の型なので 1/3 は 0.333333…。cout は標準で有効数字6桁まで表示するので 0.333333。',
      },
      {
        id: 'ccpp-m26-q11', q: 'x に 1、y に 3 を入力したとき、23行目で表示されるものはどれか。', line: 23, lineHas: 'z <<',
        choices: ['zは1/3です.', 'zは0.333333です.', 'zは0です.', 'zは1です.', 'zはです.'],
        answer: 2, exp: '20行目で 0.333333… を int 型の z に代入すると小数部分が切り捨てられて 0 になる。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g04', source: S, lecture: 2, type: 'fill', no: '問12〜15',
    title: '正の値の偶数・奇数判定（List2-6）',
    intro: '読み込んだ整数値が正であれば偶数か奇数かを表示し、そうでなければ「正でない値が入力されました.」と表示するプログラムである。',
    code: code`
// 読み込んだ整数値が正の値であれば
// 偶数か奇数かを判定して表示する
#include <iostream>

using namespace std;

int main()
{
    int n;

    cout << "整数値:";
    cin >> n;

    if (????????)
        if (????????)
            cout << "その値は偶数です.\n";
        else
            cout << "その値は奇数です.\n";
    else
        cout << "正でない値が入力されました.\n";

    return 0;
}`,
    fill: ['n > 0', 'n % 2 == 0'],
    run: [
      { stdin: '-2\n', contains: ['正でない値が入力されました.'] },
      { stdin: '1.2\n', contains: ['その値は奇数です.'] },
    ],
    questions: [
      {
        id: 'ccpp-m26-q12', q: '14行目の ???????? に入るものはどれか。', line: 14, lineHas: 'if (????????)',
        choices: ['n > 0', 'n >= 0', 'n / 2 == 0', 'n / 2 != 0', 'n % 2 == 0'], mono: true,
        answer: 0, exp: '「正なら」なので n > 0。n >= 0 だと 0 も正として扱ってしまう。',
      },
      {
        id: 'ccpp-m26-q13', q: '15行目の ???????? に入るものはどれか。', line: 15, lineHas: 'if (????????)',
        choices: ['n > 0', 'n >= 0', 'n / 2 == 0', 'n / 2 != 0', 'n % 2 == 0'], mono: true,
        answer: 4, exp: '偶数は「2で割った余りが0」。余りは % 。/ は商（割り算の答え）なので違う。',
      },
      {
        id: 'ccpp-m26-q14', q: '正しく完成させたプログラムで n に -2 を入力したとき、表示されるものはどれか。',
        choices: ['その値は偶数です.', 'その値は奇数です.', '正でない値が入力されました.', '何も表示されない', 'その値は偶数です.(改行)正でない値が入力されました.'],
        answer: 2, exp: '-2 は n > 0 が偽なので、外側の if に対応する 19行目の else が実行される。',
      },
      {
        id: 'ccpp-m26-q15', q: '正しく完成させたプログラムで n に 1.2 を入力したとき、表示されるものはどれか。',
        choices: ['その値は偶数です.', 'その値は奇数です.', '正でない値が入力されました.', '何も表示されない', 'その値は1.2です.'],
        answer: 1, exp: 'n は int 型なので cin は「1」までしか読まない（.2 は読み残し）。n = 1 は正で奇数。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g05', source: S, lecture: 3, type: 'fill', no: '問16〜18',
    title: '20までカウントアップ',
    intro: '20以下の正の整数値を読み込み、その値から20までを1つずつ表示するプログラムである。条件に合わない値が入力されたときは、もう一度入力させる。',
    code: code`
// 20以下の正の整数値を読み込んで
// その値から20までカウントアップする
#include <iostream>

using namespace std;

int main()
{
    int x;

    cout << "カウントアップします.\n";
    do {
        cout << "20以下の正の整数値:";
        cin >> x;
    } while (????????);

    while (????????) {
        cout << x << "\n";
        x++;
    }

    return 0;
}`,
    fill: ['x <= 0 || x > 20', 'x <= 20'],
    run: [{ stdin: '-1\n18\n', contains: ['18\n19\n20\n'] }],
    sharedChoices: ['x <= 20', 'x <= 0 || x > 20', 'x > 0 && x <= 20', 'x <= 0 || x > 100', 'x > 0 && x <= 100'],
    sharedMono: true,
    questions: [
      { id: 'ccpp-m26-q16', q: '15行目の ???????? に入るものはどれか。', line: 15, lineHas: '} while (????????);', answer: 1, exp: 'do-while は条件が真の間くり返す。「正しくない値（0以下 または 20より大）」の間もう一度入力させるので x <= 0 || x > 20。' },
      { id: 'ccpp-m26-q17', q: '17行目の ???????? に入るものはどれか。', line: 17, lineHas: 'while (????????) {', answer: 0, exp: '20まで表示するので x <= 20。※ここまでで x は 1〜20 に決まっているので (3) x > 0 && x <= 20 でも同じ動きになる。本番ではどちらが正解か不明な問題。' },
    ],
  },
  {
    id: 'ccpp-m26-g05b', source: S, lecture: 3, type: 'unexpected', no: '問18',
    title: '20までカウントアップ（続き）',
    intro: '問16・17 のプログラムを正しく完成させたものとする。',
    questions: [
      {
        id: 'ccpp-m26-q18', q: 'x に -1 を入力したときの動作として適切なものはどれか。',
        choices: ['-1 から 20 までが表示される', 'もう一度「20以下の正の整数値:」と表示され、入力を求められる', '何も表示されずにプログラムが終了する', '-1 だけが表示されて終了する', '「カウントアップします.」からやり直す'],
        answer: 1, exp: '-1 は x <= 0 が真なので do-while がくり返し、12行目の do の中（13行目）に戻る。11行目には戻らない。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g06', source: S, lecture: 3, type: 'shape', no: '問19',
    title: '* の三角形',
    code: code`
// 直角三角形を表示する
#include <iostream>

using namespace std;

int main()
{
    int n;

    cout << "段数:";
    cin >> n;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++)
            cout << '*';
        cout << '\n';
    }

    return 0;
}`,
    run: [{ stdin: '3\n', contains: ['*\n**\n***\n'] }],
    questions: [
      {
        id: 'ccpp-m26-q19', q: 'n に 3 を入力したとき、表示されるものはどれか。', mono: true,
        choices: ['  *\n **\n***', '*\n**\n***', '***\n**\n*', '***\n***\n***', '*\n*\n*'],
        answer: 1, exp: '外側 i=1,2,3 のそれぞれで内側が i 回 * を表示してから改行。空白は表示していないので左そろえ。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g07', source: S, lecture: 3, type: 'behavior', no: '問20・21',
    title: '負の数は加算しない（List3-19）',
    code: code`
// 読み込んだ整数を加算する（負の数は加算しない）
#include <iostream>

using namespace std;

int main()
{
    int n;
    cout << "整数を何個加算しますか:";
    cin >> n;

    int sum = 0;
    for (int i = 0; i < n; i++) {
        int t;
        cout << "整数:";
        cin >> t;
        if (t < 0) {
            cout << "負の数は加算しません.\n";
            continue;
        }
        sum += t;
    }
    cout << "合計は" << sum << "です.\n";

    return 0;
}`,
    run: [{ stdin: '3\n3\n8\n-1\n', contains: ['負の数は加算しません.\n合計は11です.\n'] }],
    questions: [
      {
        id: 'ccpp-m26-q20', q: 'n に 3、t に順に 3, 8, -1 を入力したとき、入力の催促以外に表示されるものはどれか。',
        choices: ['合計は11です.(改行)', '負の数は加算しません.合計は11です.(改行)', '負の数は加算しません.(改行)合計は10です.(改行)', '負の数は加算しません.(改行)合計は11です.(改行)', '負の数は加算しません.(改行)合計は10です.'],
        answer: 3, exp: '-1 のとき18行目が表示（最後に \\n）され continue で加算されない。合計は 3+8=11。',
      },
      {
        id: 'ccpp-m26-q21', q: '19行目 continue; が実行された後の動作として適切なものはどれか。', line: 19, lineHas: 'continue;',
        choices: ['for 文を終了して23行目に進む', 'for 文の次の繰り返しに進む（i++ をして条件を判定する）', 'プログラムを終了する', '17行目の if 文の先頭に戻る', '21行目の sum += t; を実行する'],
        answer: 1, exp: 'continue はループの残り（21行目）を飛ばして次の繰り返しへ。for 文では i++ → 条件判定と進む。終了するのは break。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g08', source: S, lecture: 4, type: 'array', no: '問22・23',
    title: '配列の反転',
    code: code`
// 配列の要素の並びを反転する
#include <iostream>

using namespace std;

int main()
{
    const int n = 7;
    int a[n];

    for (int i = 0; i < n; i++)
        a[i] = i + 1;

    for (int i = 0; i < n / 2; i++) {
        int t = a[i];
        a[i] = a[n - i - 1];
        a[n - i - 1] = t;
    }

    for (int i = 0; i < n; i++)
        cout << "a[" << i << "] = " << a[i] << '\n';

    return 0;
}`,
    run: [{ stdin: '', contains: ['a[0] = 7', 'a[6] = 1', 'a[3] = 4'] }],
    questions: [
      {
        id: 'ccpp-m26-q22', q: '12行目まで実行した時点での配列 a の中身はどれか。', line: 12, lineHas: 'a[i] = i + 1;',
        choices: ['a[1]=1, a[2]=2, …, a[7]=7', 'a[0]=0, a[1]=1, …, a[6]=6', 'a[0]=7, a[1]=6, …, a[6]=1', 'a[1]=0, a[2]=1, …, a[7]=6', 'a[0]=1, a[1]=2, …, a[6]=7'],
        answer: 4, exp: '添字は 0〜6。a[i] = i + 1 なので a[0]=1 … a[6]=7。a[7] は存在しない。',
      },
      {
        id: 'ccpp-m26-q23', q: '18行目まで実行した時点での配列 a の中身はどれか。', line: 18, lineHas: '}',
        choices: ['a[0]=7, a[1]=6, …, a[6]=1', 'a[1]=7, a[2]=6, …, a[7]=1', 'a[0]=1, a[1]=2, …, a[6]=7', 'a[0]=6, a[1]=5, …, a[6]=0', 'a[0]=1, a[1]=2, a[2]=3, a[3]=4, a[4]=3, a[5]=2, a[6]=1'],
        answer: 0, exp: 'i=0,1,2 で a[0]↔a[6]、a[1]↔a[5]、a[2]↔a[4] を交換（真ん中の a[3] はそのまま）。t を使って交換しているので値は失われない。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g09', source: S, lecture: 4, type: 'output', no: '問24',
    title: '行列の和',
    code: code`
// 2行3列の行列の和を求める
#include <iomanip>
#include <iostream>

using namespace std;

int main()
{
    int a[2][3] = { {1, 2, 3}, {4, 5, 6} };
    int b[2][3] = { {6, 3, 4}, {5, 1, 2} };
    int c[2][3];

    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 3; j++)
            c[i][j] = a[i][j] + b[i][j];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++)
            cout << setw(3) << c[i][j];
        cout << '\n';
    }

    return 0;
}`,
    run: [{ stdin: '', contains: ['  7  5  7\n  9  6  8\n'] }],
    questions: [
      {
        id: 'ccpp-m26-q24', q: 'このプログラムを実行したとき、表示されるものはどれか。', mono: true,
        choices: ['  6  6 12\n 20  5 12', '  1  2  3\n  4  5  6', '  7  5  7\n  9  6  8', '  7  9\n  5  6\n  7  8', ' -5 -1 -1\n -1  4  4'],
        answer: 2, exp: '同じ位置どうしを足す：1+6=7, 2+3=5, 3+4=7 / 4+5=9, 5+1=6, 6+2=8。setw(3) で3文字幅の右寄せ。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g10', source: S, lecture: 5, type: 'behavior', no: '問25・26',
    title: '関数と値渡し',
    code: code`
// 関数 func を使った計算
#include <iostream>
using namespace std;

double func(double x, int n)
{
    // 計算する
    double tmp = 1.0;

    while (n-- > 0)
        tmp *= x;
    return tmp;
}

int main()
{
    double a;
    int b;
    cout << "a:"; cin >> a;
    cout << "b:"; cin >> b;
    cout << "解は" << func(a, b) << "です.\n";
    cout << "bは" << b << "\n";
    return 0;
}`,
    run: [{ stdin: '2\n4\n', contains: ['解は16です.', 'bは4\n'] }],
    questions: [
      {
        id: 'ccpp-m26-q25', q: '関数 func は何を計算する関数か。',
        choices: ['a と b の和の計算', 'a と b の積の計算', 'b の a 乗の計算', 'a の b 乗の計算', 'a の階乗の計算'],
        answer: 3, exp: 'tmp=1 に x を n 回かけている → x の n 乗。main では func(a, b) なので a の b 乗。',
      },
      {
        id: 'ccpp-m26-q26', q: 'a に 2、b に 4 を入力したとき、22行目で表示されるものはどれか。', line: 22, lineHas: '"bは"',
        choices: ['bは0', 'bは-1', 'bは3', 'bは4', 'bは16'],
        answer: 3, exp: '値渡しなので、関数の中で n-- しても変わるのは n（コピー）だけ。main の b は 4 のまま。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g11', source: S, lecture: 5, type: 'fill', no: '問27',
    title: '再帰で階乗',
    code: code`
// 階乗を再帰で求める
#include <iostream>
using namespace std;

int factorial(int n)
{
    if (n > 0)
        ????????
    else
        return 1;
}

int main()
{
    int x;
    cout << "整数値:";
    cin >> x;
    cout << x << "の階乗は" << factorial(x) << "です.\n";
    return 0;
}`,
    fill: ['return n * factorial(n - 1);'],
    run: [{ stdin: '5\n', contains: ['5の階乗は120です.'] }],
    questions: [
      {
        id: 'ccpp-m26-q27', q: '8行目の ???????? に入るものはどれか。', line: 8, lineHas: '????????', mono: true,
        choices: ['n * factorial(n);', 'n * factorial(n - 1);', 'return n * factorial(n - 1);', 'return n * (n - 1);', 'n * (n - 1);'],
        answer: 2, exp: 'n! = n × (n-1)!。値を返すには return が必要。factorial(n) だと同じ値で呼び続けて終わらない。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g12', source: S, lecture: 6, type: 'fill', no: '問28',
    title: 'ポインタ引数で和と積（sum_mul）',
    code: code`
// 和と積をポインタで返す
#include <iostream>
using namespace std;

void sum_mul(int x, int y, int* sum, int* mul)
{
    *sum = x + y;
    *mul = x * y;
}

int main()
{
    int a, b;
    int wa, seki;
    cout << "a:"; cin >> a;
    cout << "b:"; cin >> b;
    ????????
    cout << "和は" << wa << "で積は" << seki << "です.\n";
    return 0;
}`,
    fill: ['sum_mul(a, b, &wa, &seki);'],
    run: [{ stdin: '3\n4\n', contains: ['和は7で積は12です.'] }],
    questions: [
      {
        id: 'ccpp-m26-q28', q: '17行目の ???????? に入るものはどれか。', line: 17, lineHas: '????????', mono: true,
        choices: ['sum_mul(a, b, wa, seki);', 'sum_mul(a, b, &wa, &seki);', 'sum_mul(a, b, *wa, *seki);', 'sum_mul(a, b, int* wa, int* seki);', 'sum_mul(a, b, int *wa, int *seki);'],
        answer: 1, exp: '仮引数が int*（ポインタ）なので、wa と seki のアドレス &wa, &seki を渡す。呼び出しで型名は書かない。',
      },
    ],
  },
  {
    id: 'ccpp-m26-g13', source: S, lecture: 6, type: 'behavior', no: '問29・30',
    title: '線形探索（List7-14）',
    code: code`
// 線形探索（ポインタ版）
#include <iostream>
using namespace std;

int seq_search(const int* a, int n, int key)
{
    for (int i = 0; i < n; i++)
    {
        if (*a++ == key)
            return i;
    }
    return -1;
}

int main()
{
    int key;
    int x[] = { 15, 7, 23, 42, 8 };
    int x_size = sizeof(x) / sizeof(x[0]);

    cout << "探す値:";
    cin >> key;
    int idx = seq_search(x, x_size, key);
    if (idx == -1)
        cout << "見つかりませんでした.\n";
    else
        cout << "x[" << idx << "]にあります.\n";
    return 0;
}`,
    run: [{ stdin: '42\n', contains: ['x[3]にあります.'] }, { stdin: '5\n', contains: ['見つかりませんでした.'] }],
    questions: [
      {
        id: 'ccpp-m26-q29', q: '23行目 seq_search(x, x_size, key) で関数に渡される x の内容はどれか。', line: 23, lineHas: 'seq_search(x, x_size, key)',
        choices: ['配列 x の要素数', '配列 x の先頭要素の値', '配列 x の全要素の値のコピー', '配列 x の最後の要素のアドレス', '配列 x の先頭のアドレス'],
        answer: 4, exp: '配列名 x は式の中では「先頭要素へのポインタ（先頭のアドレス）」になる。配列がコピーされるわけではない。',
      },
      {
        id: 'ccpp-m26-q30', q: '9行目 if (*a++ == key) の説明として適切なものはどれか。', line: 9, lineHas: '*a++ == key',
        choices: [
          'ポインタ a の値（アドレス）と key が等しければ10行目を実行する。その後、ポインタ a の値（アドレス）を1増やす。',
          'ポインタ a が指す格納場所の中身を1増やし、それが key と等しければ10行目を実行する。',
          'ポインタ a の値（アドレス）を1増やし、その指す格納場所の中身と key が等しければ10行目を実行する。',
          'ポインタ a が指す格納場所の中身と key が等しければ10行目を実行する。その後、ポインタ a の値（アドレス）を1増やす。',
          'ポインタ a が指す格納場所の中身と key が等しければ10行目を実行する。その後、その中身を1増やす。',
        ],
        answer: 3, exp: '*a++ は *(a++)。後置 ++ なので「今の a が指す中身」を比べてから a（アドレス）を1つ進める。中身は変わらない。',
      },
    ],
  },
];
