// 第1回 コンパイラ言語・CPU/メモリ/ディスク・Hello World・main/return（講義資料 ccpp_01 をもとにしたオリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l1-g01', lecture: 1, type: 'cloze',
    title: 'コンピュータの構成',
    intro: '次の文章の空欄［A］〜［E］に入る語句を選べ。同じ記号の空欄には同じ語句が入る。',
    passage: '［A］（中央処理装置）は、算術論理演算装置である［B］やレジスタなどの回路を組み込んだ、コンピュータの中枢部である。［C］はプログラムやデータを一時的に保存する格納場所で、［A］の指令でデータが読み書きされる。［D］（HDD, SSD など）はソースコードや実行形式、データを長期間保存する格納場所である。これらの装置の間でデータを転送する際の伝送路を［E］という。',
    sharedChoices: ['ディスク', 'CPU', 'バス', 'ALU', 'メモリ'],
    questions: [
      { id: 'ccpp-l1-q01', q: '［A］', answer: 1, exp: 'CPU (central processing unit) は中央処理装置。ALU やレジスタを含む中枢部。' },
      { id: 'ccpp-l1-q02', q: '［B］', answer: 3, exp: 'ALU (Arithmetic and Logic Unit) は算術論理演算装置。ビット列の和・論理和・論理積などを計算する。' },
      { id: 'ccpp-l1-q03', q: '［C］', answer: 4, exp: 'メモリはプログラムやデータを一時的に保存する格納場所。' },
      { id: 'ccpp-l1-q04', q: '［D］', answer: 0, exp: 'ディスク（HDD, SSD）は長期間保存する格納場所。電源を切っても消えない。' },
      { id: 'ccpp-l1-q05', q: '［E］', answer: 2, exp: 'バス (bus) は装置間でデータを転送する際の伝送路。' },
    ],
  },
  {
    id: 'ccpp-l1-g02', lecture: 1, type: 'cloze',
    title: 'インタプリタ言語とコンパイラ言語',
    intro: '次の文章の空欄［A］〜［D］に入る語句を選べ。',
    passage: '［A］言語は、人が書いたプログラムのソースコードを1行ずつ解釈して処理を行う言語である（例：Python, JavaScript）。コンパイルは不要だが動作は遅い。一方［B］言語は、ソースコード全体を一括で CPU が解釈できる機械語に変換してから実行する言語である（例：C, C++, Java）。C言語は 1972年に AT&T ベル研究所の［C］が OS である UNIX を開発するために開発した。C++ は 1983年に同研究所の Bjarne Stroustrup が開発した、C言語に［D］の機能を持たせた言語である。',
    sharedChoices: ['オブジェクト指向', 'インタプリタ', 'Dennis Ritchie', 'コンパイラ', 'マシン'],
    questions: [
      { id: 'ccpp-l1-q06', q: '［A］', answer: 1, exp: '1行ずつ解釈して処理するのはインタプリタ言語。' },
      { id: 'ccpp-l1-q07', q: '［B］', answer: 3, exp: '一括で機械語（実行形式）に変換してから実行するのがコンパイラ言語。動作が速い。' },
      { id: 'ccpp-l1-q08', q: '［C］', answer: 2, exp: 'C言語は Dennis MacAlistair Ritchie が UNIX 開発のために開発した。' },
      { id: 'ccpp-l1-q09', q: '［D］', answer: 0, exp: 'C++ は C言語にオブジェクト指向の機能を持たせた言語。' },
    ],
  },
  {
    id: 'ccpp-l1-g03', lecture: 1, type: 'meaning',
    title: '画面への出力を行うプログラム',
    code: code`
// 画面への出力を行うプログラム
#include <iostream>
using namespace std;
int main()
{
    cout << "初めてのＣ++プログラム。\n";
    cout << "画面に出力しています。\n";
    return 0;
}`,
    run: [{ stdin: '', contains: ['初めてのＣ++プログラム。\n画面に出力しています。\n'] }],
    questions: [
      {
        id: 'ccpp-l1-q10', q: '1行目の説明として適切なものはどれか。', line: 1, lineHas: '//',
        choices: ['プログラムの名前を宣言する', 'コメント文。"//" から改行までがコメントになる', '画面に文字列を表示する', '割り算の記号', 'ヘッダをインクルードする'],
        answer: 1, exp: '"//" がコメントの始まりを示し、コメントの最後は改行まで。"/* … */" もコメント文。',
      },
      {
        id: 'ccpp-l1-q11', q: '2行目 #include <iostream> の説明として適切なものはどれか。', line: 2, lineHas: '#include <iostream>',
        choices: ['<iostream> の中身をここへ挿入する。<iostream> は標準入出力を用いる際に必要な情報が記述されたヘッダ', 'iostream という名前の変数を宣言する', 'このプログラムを実行形式に変換する', '名前空間 iostream を使う', 'プログラムの終わりを表す'],
        answer: 0, exp: '<iostream> の中身をインクルードする。input/output stream の意味。',
      },
      {
        id: 'ccpp-l1-q12', q: '3行目 using namespace std; の説明として適切なものはどれか。', line: 3, lineHas: 'using namespace std;',
        choices: ['標準入出力のヘッダを挿入する', 'この行以降で std という名前空間を使う。std::cout を cout と省略表記できる', 'std という変数を宣言する', 'プログラムを正常終了させる', 'C言語でのみ必要な宣言'],
        answer: 1, exp: 'std という名前空間を使うという意味。これで std::cout, std::endl を cout, endl と書ける。C には名前空間の仕組みが無い。',
      },
      {
        id: 'ccpp-l1-q13', q: '6行目の << の説明として適切なものはどれか。', line: 6, lineHas: '<<',
        choices: ['左シフト演算子で、文字列を2ビットずらす', '挿入演算子で、cout に右側の文字列や値を渡す', '比較演算子で、左が右より小さいかを調べる', 'cin から値を読み込む', 'コメントの始まり'],
        answer: 1, exp: '<< は「挿入演算子」。cout（標準出力＝モニター）に右側の文字列リテラルや値を渡す。',
      },
      {
        id: 'ccpp-l1-q14', q: 'このプログラムの実行結果として正しいものはどれか。',
        choices: ['初めてのＣ++プログラム。画面に出力しています。', '初めてのＣ++プログラム。(改行)画面に出力しています。(改行)', '初めてのＣ++プログラム。\\n画面に出力しています。\\n', '"初めてのＣ++プログラム。"(改行)"画面に出力しています。"(改行)', '画面に出力しています。(改行)初めてのＣ++プログラム。(改行)'],
        answer: 1, exp: '文字列の最後の \\n は改行を意味する記号で、そのまま表示されるのではなく改行になる。" " は表示されない。',
      },
    ],
  },
  {
    id: 'ccpp-l1-g04', lecture: 1, type: 'output',
    title: '改行しないで表示（課題1-1）',
    intro: '課題1-1「改行せず「初めてのＣ++プログラム。画面に出力しています。」と印字する」を作ろうとしたプログラムである。',
    code: code`
// 画面への出力を行うプログラム（改訂）
#include <iostream>
using namespace std;
int main()
{
    cout << "初めてのＣ++プログラム。";
    cout << "画面に出力しています。\n";
    return 0;
    cout << "終わり\n";
}`,
    run: [{ stdin: '', contains: ['初めてのＣ++プログラム。画面に出力しています。\n'], notContains: ['終わり'] }],
    questions: [
      {
        id: 'ccpp-l1-q15', q: 'このプログラムの実行結果として正しいものはどれか。',
        choices: ['初めてのＣ++プログラム。(改行)画面に出力しています。(改行)', '初めてのＣ++プログラム。画面に出力しています。(改行)', '初めてのＣ++プログラム。画面に出力しています。(改行)終わり(改行)', '初めてのＣ++プログラム。画面に出力しています。終わり(改行)', '初めてのＣ++プログラム。(改行)画面に出力しています。(改行)終わり(改行)'],
        answer: 1, exp: '6行目には \\n が無いので改行しない。8行目の return 0; で main 関数が終わるので9行目は実行されない。',
      },
      {
        id: 'ccpp-l1-q16', q: '8行目 return 0; の説明として適切なものはどれか。', line: 8, lineHas: 'return 0;',
        choices: ['プログラムの先頭（1行目）に戻る', '画面に 0 を表示する', 'main 関数の処理の最後に 0 を OS に返す。正常に処理が完了したことを確認するために用いる', '変数 return に 0 を代入する', '次の行を 0 回くり返す'],
        answer: 2, exp: 'main 関数の処理の最後に「0」をコンピュータの OS に返す。0 は正常終了を意味する。',
      },
    ],
  },
  {
    id: 'ccpp-l1-g05', lecture: 1, type: 'meaning',
    title: 'int main()',
    code: code`
#include <iostream>
using namespace std;
int main()
{
    cout << "Hello World" << endl;
}`,
    run: [{ stdin: '', contains: ['Hello World\n'] }],
    questions: [
      {
        id: 'ccpp-l1-q17', q: '3行目 int main() の main の説明として適切なものはどれか。', line: 3, lineHas: 'int main()',
        choices: ['メイン関数の名称で、この名前以外は使えない', '好きな名前に変えてよい関数名', '変数の名前', 'ヘッダの名前', '整数型を表す'],
        answer: 0, exp: '「main」はメイン関数の名称で、この名前以外は使えない。プログラムの実行は main 関数から始まる。',
      },
      {
        id: 'ccpp-l1-q18', q: '3行目 main() の小括弧 () の中に何も書いていないことの意味として適切なものはどれか。', line: 3, lineHas: 'main()',
        choices: ['関数の返却値が無い', '関数に渡される引数が無い', '関数の中身が無い', 'プログラムがすぐに終了する', 'エラーになる'],
        answer: 1, exp: '() の中にはこの関数に渡される変数（引数）を書く。空なら渡される引数が無いという意味。',
      },
      {
        id: 'ccpp-l1-q19', q: '5行目の endl の役割として適切なものはどれか。', line: 5, lineHas: 'endl',
        choices: ['プログラムを終了する', '改行する', '文字列の終わりを表すだけで何もしない', '画面を消す', 'コメントにする'],
        answer: 1, exp: 'endl は改行（して出力を送り出す）。"\\n" と同じように改行される。std::endl の省略形。',
      },
    ],
  },
  {
    id: 'ccpp-l1-g06', lecture: 1, type: 'meaning',
    title: 'C言語版とコンパイル',
    code: code`
// 画面への出力を行うプログラム
#include <stdio.h> // 標準入出力用ヘッダをインクルード
int main()
{
    printf("初めてのＣプログラム。\n");
    printf("画面に出力しています。\n");
    return 0;
}`,
    questions: [
      {
        id: 'ccpp-l1-q20', q: '2行目 <stdio.h> の説明として適切なものはどれか。', line: 2, lineHas: '<stdio.h>',
        choices: ['C++ の <iostream> と同等の、標準入出力を用いる際にインクルードするヘッダ', '文字列を扱うクラスのヘッダ', '乱数を作るためのヘッダ', 'C++ でしか使えないヘッダ', '名前空間 std を使う宣言'],
        answer: 0, exp: '<stdio.h> は standard input/output の意味。C ではこれと printf を使う。C には using namespace std; は無い。',
      },
      {
        id: 'ccpp-l1-q21', q: 'このC言語のソースファイル test1.c をコマンドプロンプトでコンパイルし、実行ファイル test1m.exe を作るコマンドはどれか。',
        choices: ['g++ -o test1.c test1m', 'gcc -o test1m test1.c', 'gcc test1m', 'run test1.c', 'test1m -o test1.c'],
        answer: 1, exp: 'gcc は C のコンパイラ。gcc -o 実行ファイル名 ソースファイル名。C++ なら g++ -o test2m test2.cpp。',
      },
    ],
  },
];
