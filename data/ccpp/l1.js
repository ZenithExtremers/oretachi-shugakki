// 第1回 コンパイラ言語・CPU/メモリ/ディスク・Hello World・main/return（オリジナル問題）
import { code } from '../lib.js';

export default [
  {
    id: 'ccpp-l1-g01', lecture: 1, type: 'cloze',
    title: 'コンピュータの装置',
    intro: '次の文章の空欄［A］〜［D］に入る語句を選べ。同じ記号の空欄には同じ語句が入る。',
    passage: '人が C++ などで書いたプログラムを［A］という。［A］はファイルとして［B］に保存されており、電源を切っても消えない。プログラムを実行すると、必要な部分が［C］に読み込まれる。［C］の内容は電源を切ると消える。［D］は［C］に格納された命令を読み出して計算や制御を行う。',
    sharedChoices: ['CPU', 'ソースコード', 'メモリ', 'コンパイラ', 'ディスク'],
    questions: [
      { id: 'ccpp-l1-q01', q: '［A］', answer: 1, exp: '人が書いたプログラムはソースコード。コンパイラはソースコードを変換する「プログラム」のこと。' },
      { id: 'ccpp-l1-q02', q: '［B］', answer: 4, exp: '電源を切っても消えない保存場所はディスク（HDD・SSD）。' },
      { id: 'ccpp-l1-q03', q: '［C］', answer: 2, exp: '実行中のプログラムとデータを置くのはメモリ。電源を切ると消える。' },
      { id: 'ccpp-l1-q04', q: '［D］', answer: 0, exp: 'メモリ上の命令を処理するのは CPU。' },
    ],
  },
  {
    id: 'ccpp-l1-g02', lecture: 1, type: 'output',
    title: 'cout と改行',
    code: code`
// 文字列を表示する
#include <iostream>
using namespace std;

int main()
{
    cout << "麗澤";
    cout << "大学\n";
    cout << "C++";
    return 0;
    cout << "終了\n";
}`,
    run: [{ stdin: '', contains: ['麗澤大学\nC++'], notContains: ['終了'] }],
    questions: [
      {
        id: 'ccpp-l1-q05', q: 'このプログラムを実行したとき、表示されるものはどれか。',
        choices: ['麗澤(改行)大学(改行)C++(改行)終了(改行)', '麗澤大学(改行)C++', '麗澤大学(改行)C++終了(改行)', '麗澤大学C++', '麗澤(改行)大学C++'],
        answer: 1, exp: '\\n を書いたところだけで改行する。10行目の return 0; で main が終わるので、11行目は実行されない。',
      },
      {
        id: 'ccpp-l1-q06', q: '2行目 #include <iostream> の説明として適切なものはどれか。', line: 2, lineHas: '#include <iostream>',
        choices: ['cin や cout などの入出力を使うための宣言を取り込む', 'main 関数を宣言する', 'ソースコードを実行形式に変換する', 'コメントを書く', '変数 iostream を宣言する'],
        answer: 0, exp: '#include <iostream> は入出力ストリーム（cin, cout）を使うためのヘッダを取り込む指示。',
      },
      {
        id: 'ccpp-l1-q07', q: '1行目 // の説明として適切なものはどれか。', line: 1, lineHas: '//',
        choices: ['// 以降の行を割り算する', '// 以降の行末までがコメントで、コンパイラは無視する', '// 以降の文字列を表示する', 'ここでプログラムが終了する', '// の次の行を2回実行する'],
        answer: 1, exp: '// から行末まではコメント。プログラムの動作には影響しない。',
      },
    ],
  },
  {
    id: 'ccpp-l1-g03', lecture: 1, type: 'meaning',
    title: 'main 関数のしくみ',
    code: code`
// main関数
#include <iostream>
using namespace std;

int main()
{
    cout << "こんにちは\n";
    return 0;
}`,
    run: [{ stdin: '', contains: ['こんにちは\n'] }],
    questions: [
      {
        id: 'ccpp-l1-q08', q: 'このプログラムを実行したとき、最初に実行される文はどれか。',
        choices: ['1行目の // main関数', '2行目の #include <iostream>', '3行目の using namespace std;', '7行目の cout << "こんにちは\\n";', '8行目の return 0;'],
        answer: 3, exp: 'プログラムの実行は main 関数の先頭の文から始まる。1〜3行目はコメントやコンパイル時の指示で「実行される文」ではない。',
      },
      {
        id: 'ccpp-l1-q09', q: '6行目の { と 9行目の } の説明として適切なものはどれか。', line: 6, lineHas: '{',
        choices: ['表示する文字列の始まりと終わり', 'コメントの始まりと終わり', 'main 関数の本体の始まりと終わり', '配列の始まりと終わり', 'ソースコードを2回実行する範囲'],
        answer: 2, exp: '{ } で囲んだ部分が関数の本体（ブロック）。',
      },
      {
        id: 'ccpp-l1-q10', q: '7行目の文の終わりの ; の説明として適切なものはどれか。', line: 7, lineHas: ';',
        choices: ['文の終わりを表す', '改行を表示する', 'コメントの始まりを表す', '関数の戻り値を表す', '画面を消去する'],
        answer: 0, exp: 'C/C++ では文の終わりに ; を書く。改行の表示は \\n。',
      },
    ],
  },
];
