// 問題データを書くときの小さな道具
// code`...` : 先頭と末尾の改行を取り除いたソースコード文字列（\n などはそのまま残る）
export function code(strings, ...vals) {
  const s = String.raw({ raw: strings.raw }, ...vals);
  return s.replace(/^\n/, '').replace(/\s+$/, '');
}
