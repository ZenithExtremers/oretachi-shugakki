// データベースの問題で使う表（verify.mjs がこの内容で MariaDB に表を作って SQL を実行する）
const t = (name, cols, rows) => ({ name, cols, rows });

export const kakeibo = t('kakeibo', ['date', 'himoku', 'memo', 'deposit', 'withdraw'], [
  ['2024-02-03', '食費', 'コーヒーを購入', 0, 380],
  ['2024-02-10', '給料', '1月の給料', 280000, 0],
  ['2024-02-11', '教養娯楽費', '書籍を購入', 0, 2800],
  ['2024-02-14', '交際費', '同期会の会費', 0, 5000],
  ['2024-02-18', '水道光熱費', '1月の電気代', 0, 7560],
]);

export const weather = t('weather', ['month', 'rainfall', 'max_temp', 'min_temp', 'humidity'], [
  [1, 50, 12, -2, 45], [2, 60, 14, 0, 48], [3, 120, 18, 3, 55], [4, 130, 22, 8, 60],
  [5, 140, 27, 13, 65], [6, 210, 29, 18, 79], [7, 160, 33, 22, 78], [8, 170, 36, 24, 75],
  [9, 230, 31, 20, 80], [10, 200, 25, 14, 70], [11, 90, 19, 7, 62], [12, null, 14, 1, 50],
]);

export const shohin = t('shohin', ['number', 'name', 'category', 'price', 'stock'], [
  [1, 'ノートPC', 'A', 98000, 5],
  [2, 'マウス', 'B', 2500, 40],
  [3, 'キーボード', 'B', 4800, 25],
  [4, 'モニター', 'A', 32000, 8],
  [5, 'USBメモリ', 'C', 1200, null],
  [6, 'ヘッドホン', 'C', 5800, 12],
]);

export const tokyo = t('tokyo_ten', ['name'], [['りんご'], ['みかん'], ['ぶどう']]);
export const osaka = t('osaka_ten', ['name'], [['みかん'], ['もも'], ['りんご'], ['なし']]);

export const shiken = t('shiken', ['id', 'am', 'pm1', 'pm2', 'paper'], [
  [1, 80, 70, 60, 65], [2, 65, 90, 80, 60], [3, 75, 55, 60, 40], [4, 90, 60, 65, 70],
]);

export const member = t('member', ['id', 'mail', 'address', 'age'], [
  [1, 'taro@example.jp', 'D', 23], [2, 'anna@example.uk', 'C', 35], [3, 'li@example.cn', 'C', 41],
]);

export const kion = t('kion', ['name', 'month', 'rainfall', 'max_temp', 'min_temp'], [
  ['東京', 1, 50, 10, 2], ['東京', 8, 150, 35, 25], ['札幌', 1, 110, -1, -8],
  ['札幌', 8, 120, 26, 18], ['那覇', 1, 100, 20, 14], ['那覇', 8, 240, 32, 27],
]);

export const nyushitsu = t('nyushitsu', ['no', 'date', 'name', 'kubun', 'taishitsu'], [
  [1, '2024-11-01', '佐藤', '1', 1], [2, '2024-11-01', '鈴木', '3', 1], [3, '2024-11-02', '佐藤', '3', 1],
  [4, '2024-11-02', '高橋', '3', 1], [5, '2024-11-03', '佐藤', '2', null], [6, '2024-11-03', '鈴木', '9', null],
]);
