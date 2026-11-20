// ソフトウェア設計の問題で使う UML 図（講義の例題・確認クイズをもとに作図）
import { usecase, classDiagram, sequence, communication, stateMachine } from '../uml.js';

// 図書館システムのユースケース図
export const ucLibrary = usecase({
  w: 640, h: 400,
  boundary: { x: 130, y: 10, w: 370, h: 380, name: '図書館システム' },
  actors: [
    { id: 'u', name: '利用者', x: 60, y: 60 },
    { id: 's', name: '学生', x: 30, y: 270 },
    { id: 't', name: '教員', x: 100, y: 270 },
    { id: 'm', name: 'メール配信システム', x: 570, y: 250 },
  ],
  cases: [
    { id: 'c1', name: '本を検索する', x: 300, y: 70 },
    { id: 'c2', name: '本を予約する', x: 300, y: 150 },
    { id: 'c3', name: '本を借りる', x: 260, y: 240 },
    { id: 'c4', name: '利用者を認証する', x: 330, y: 340 },
    { id: 'c5', name: '延滞を通知する', x: 410, y: 240, w: 140 },
  ],
  links: [
    { from: 'u', to: 'c1' }, { from: 'u', to: 'c3' },
    { from: 'c2', to: 'c1', type: 'extend' },
    { from: 'c3', to: 'c4', type: 'include' },
    { from: 's', to: 'u', type: 'gen' }, { from: 't', to: 'u', type: 'gen' },
    { from: 'm', to: 'c5' },
  ],
});

// 図書館のクラス図（第05回の冒頭の図）
export const cdLibrary = classDiagram({
  w: 640, h: 480,
  classes: [
    { id: 'lib', name: '図書館', x: 20, y: 20, attrs: ['-名称：文字列'], ops: ['+貸し出す(本, 会員)'] },
    { id: 'book', name: '本', x: 370, y: 20, attrs: ['-ISBN：文字列', '-書名：文字列'], ops: ['+貸出可能か()：真偽値'] },
    { id: 'mem', name: '会員', x: 370, y: 230, attrs: ['-会員番号：整数', '-氏名：文字列'], ops: ['+借りる(本)', '+返す(本)'] },
    { id: 'st', name: '学生会員', x: 250, y: 390, attrs: ['-学籍番号：文字列'], ops: [], w: 150 },
    { id: 'gn', name: '一般会員', x: 460, y: 390, attrs: ['-住所：文字列'], ops: [], w: 150 },
  ],
  links: [
    { from: 'lib', to: 'book', type: 'agg', toMult: '0..*' },
    { from: 'mem', to: 'book', label: '借りる', fromMult: '0..1', toMult: '0..5', multSide: -1 },
    { from: 'st', to: 'mem', type: 'gen' }, { from: 'gn', to: 'mem', type: 'gen' },
  ],
});

// 会社・部署・社員のクラス図
export const cdCompany = classDiagram({
  w: 600, h: 470,
  classes: [
    { id: 'co', name: '会社', x: 20, y: 30, attrs: [], ops: ['+雇う(氏名)'] },
    { id: 'dep', name: '部署', x: 260, y: 30, attrs: ['-部署名'], ops: [] },
    { id: 'emp', name: '社員', x: 250, y: 220, attrs: ['-氏名', '-社員番号'], ops: ['+出社する()', '+退社する()'] },
    { id: 'mgr', name: 'マネージャ', x: 430, y: 370, attrs: [], ops: ['+経費を承認する()'] },
  ],
  links: [
    { from: 'co', to: 'dep', type: 'comp', toMult: '1..*' },
    { from: 'dep', to: 'emp', label: '所属する', fromMult: '1', toMult: '1..*', multSide: -1 },
    { from: 'mgr', to: 'emp', type: 'gen' },
    { from: 'co', to: 'emp', type: 'dep', label: '«create»' },
  ],
});

// 口座クラス（可視性）
export const cdAccount = classDiagram({
  w: 320, h: 190,
  classes: [{ id: 'a', name: '口座', x: 20, y: 10, attrs: ['+口座番号：文字列', '-残高：整数 = 0'], ops: ['+入金する(金額：整数)', '+残高を照会する()：整数', '-手数料を計算する()：整数'] }],
});

// 顧客と注文（多重度）
export const cdOrder = classDiagram({
  w: 520, h: 120,
  classes: [
    { id: 'c', name: '顧客', x: 20, y: 20, attrs: ['-氏名'], ops: [] },
    { id: 'o', name: '注文', x: 360, y: 20, attrs: ['-注文日'], ops: [] },
  ],
  links: [{ from: 'c', to: 'o', label: '注文する', fromMult: '1', toMult: '0..*' }],
});

// オブジェクト図（第04回の例題）
export const odClass = classDiagram({
  w: 620, h: 230,
  classes: [
    { id: 's', name: '佐藤さん：学生', object: true, x: 20, y: 20, attrs: ['学部＝“工学部”', '学年＝“3年生”'] },
    { id: 'c', name: 'AIプロジェクト：授業', object: true, x: 230, y: 120, attrs: ['開講＝“2025年度”', '単位数＝“2単位”'] },
    { id: 't', name: '中村先生：教員', object: true, x: 440, y: 20, attrs: ['役職＝“教授”', '所属＝“工学部”'] },
    { id: 'd', name: '：部署', object: true, x: 20, y: 150, attrs: [] },
  ],
  links: [{ from: 's', to: 'c' }, { from: 't', to: 'c' }],
});

// シーケンス図：本を借りる（第06回の冒頭の図）
export const sqLend = sequence({
  w: 640,
  lifelines: [
    { id: 'm', name: '：会員', x: 60 }, { id: 'g', name: '：貸出画面', x: 190 }, { id: 'k', name: '：貸出管理', x: 330 },
    { id: 'b', name: '：本', x: 460 }, { id: 'r', name: '：貸出記録', x: 575 },
  ],
  msgs: [
    { from: 'm', to: 'g', text: '申し込む(本ID)' },
    { from: 'g', to: 'k', text: '貸し出す(本ID)' },
    { from: 'k', to: 'b', text: '貸出可能か()' },
    { from: 'b', to: 'k', text: '可否', kind: 'reply' },
    { from: 'k', to: 'b', text: '貸出中にする()' },
    { from: 'k', to: 'r', kind: 'create' },
    { from: 'k', to: 'g', text: '結果', kind: 'reply' },
  ],
  frames: [{ op: 'opt', cond: '可否 = 可', from: 4, to: 5, x1: 300, x2: 635 }],
});

// シーケンス図：検索（確認クイズ①）
export const sqSearch = sequence({
  w: 560,
  lifelines: [
    { id: 'g', name: '：検索画面', x: 70 }, { id: 'k', name: '：検索管理', x: 220 }, { id: 'r', name: '：検索結果', x: 360 }, { id: 'l', name: '：ログ', x: 490 },
  ],
  msgs: [
    { from: 'g', to: 'k', text: '① 検索する(語)' },
    { from: 'k', to: 'r', kind: 'create' },
    { from: 'k', to: 'g', text: '③ 結果', kind: 'reply' },
    { from: 'g', to: 'l', text: '④ 記録する(語)', kind: 'async' },
  ],
});

// コミュニケーション図：本を借りる（第07回の冒頭の図）
export const cmLend = communication({
  w: 660, h: 360,
  nodes: [
    { id: 'm', name: '：会員', x: 60, y: 50 }, { id: 'g', name: '：貸出画面', x: 300, y: 50 },
    { id: 'k', name: '：貸出管理', x: 300, y: 200 }, { id: 'b', name: '：本', x: 600, y: 200 }, { id: 'r', name: '：貸出記録', x: 300, y: 330 },
  ],
  links: [
    { from: 'm', to: 'g', msgs: [{ text: '1：申し込む(本ID)' }], side: -1 },
    { from: 'g', to: 'k', msgs: [{ text: '1.1：貸し出す(本ID)' }] },
    { from: 'k', to: 'b', msgs: [{ text: '1.1.1：可否 = 貸出可能か()' }, { text: '1.1.2 [可否 = 可]：貸出中にする()' }] },
    { from: 'k', to: 'r', msgs: [{ text: '1.1.3 [可否 = 可]：«create»' }] },
  ],
});

// ステートマシン図：図書館の「本」の一生（第08回の冒頭の図）
export const smBook = stateMachine({
  w: 680, h: 360,
  states: [
    { id: 'a', name: '貸出可能', x: 120, y: 60, w: 200, acts: ['entry / 棚に戻す'] },
    { id: 'b', name: '貸出中', x: 460, y: 60, w: 200, acts: ['do / 返却期限を見張る'] },
    { id: 'c', name: '延滞中', x: 460, y: 270, w: 200, acts: ['entry / 督促メールを送る'] },
  ],
  starts: [{ x: 22, y: 78 }], finals: [{ x: 180, y: 325 }],
  trans: [
    { pts: [[32, 78], [120, 78]], label: '登録する', lx: 72, ly: 66 },
    { pts: [[320, 74], [460, 74]], label: '貸し出す / 貸出記録を作る', lx: 390, ly: 50 },
    { pts: [[460, 100], [320, 100]], label: '返却する', lx: 390, ly: 120 },
    { pts: [[580, 116], [580, 270]], label: '返却期限を過ぎる', lx: 570, ly: 200, anchor: 'end' },
    { pts: [[460, 300], [270, 300], [270, 116]], label: '返却する / 延滞料を記録する', lx: 370, ly: 290 },
    { pts: [[180, 116], [180, 313]], label: '廃棄する [破損あり]', lx: 170, ly: 220, anchor: 'end' },
  ],
});

// ステートマシン図：モバイルオーダーの「注文」の一生（第08回 演習課題1をもとに作図）
export const smOrder = stateMachine({
  w: 680, h: 380,
  states: [
    { id: 'a', name: '受付済', x: 130, y: 40, w: 140 },
    { id: 'b', name: '調理中', x: 420, y: 40, w: 140 },
    { id: 'c', name: '受取待ち', x: 420, y: 170, w: 200, acts: ['entry / 通知を送る'] },
    { id: 'd', name: '保管中', x: 420, y: 310, w: 140 },
  ],
  starts: [{ x: 22, y: 57 }], finals: [{ x: 200, y: 262 }],
  trans: [
    { pts: [[32, 57], [130, 57]], label: '注文を確定する', lx: 78, ly: 30 },
    { pts: [[270, 57], [420, 57]], label: '調理を始める', lx: 345, ly: 47 },
    { pts: [[490, 74], [490, 170]], label: '調理が終わる', lx: 500, ly: 127, anchor: 'start' },
    { pts: [[510, 226], [510, 310]], label: '30分過ぎる', lx: 520, ly: 273, anchor: 'start' },
    { pts: [[200, 74], [200, 250]], label: '取り消す / 返金する', lx: 190, ly: 165, anchor: 'end' },
    { pts: [[420, 205], [290, 205], [290, 262], [212, 262]], label: '受け取る [番号が一致]', lx: 340, ly: 196 },
    { pts: [[420, 327], [200, 327], [200, 274]], label: '受け取る', lx: 310, ly: 317 },
  ],
});
