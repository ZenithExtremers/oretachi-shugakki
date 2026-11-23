// 問題データを書くときの小さな道具
// code`...` : 先頭と末尾の改行を取り除いたソースコード文字列（\n などはそのまま残る）
export function code(strings, ...vals) {
  const s = String.raw({ raw: strings.raw }, ...vals);
  return s.replace(/^\n/, '').replace(/\s+$/, '');
}

// 正解の位置をばらけさせる（選択肢を回転させるだけ。シャッフルを切っても正解が同じ番号に偏らないように）
// tableChoices の「エラーになる」など、最後に置きたい選択肢がある問題は fixed: true で除外できる
export function spread(groups) {
  let k = 0;
  for (const g of groups) for (const q of g.questions) {
    if (!q.choices || q.fixed) continue;
    const n = q.choices.length, target = (k++ * 3 + 1) % n, shift = (target - q.answer + n) % n;
    q.choices = q.choices.map((_, i) => q.choices[(i - shift + n) % n]);
    q.answer = target;
  }
  return groups;
}
