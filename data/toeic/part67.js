// TOEIC Part 6（長文穴埋め）・Part 7（読解）。文章も問題もすべてオリジナル
import { spread } from '../lib.js';

let n = 0;
const G = (lecture, title, passage, qs) => { n++; const k = String(n).padStart(2, '0'); return {
  id: `toeic-r${k}`, lecture, type: lecture === 6 ? 'p6' : 'p7', title, passage, pre: true, // 改行をそのまま見せる
  questions: qs.map(([q, choices, answer, exp], i) => ({ id: `toeic-r${k}-${i + 1}`, q, choices, answer, exp })),
}; };

export default spread([
  // ===== Part 6 =====
  G(6, 'Part 6 ① 社内メール', `To: All Staff
From: Karen Wu, Office Manager
Subject: Kitchen cleaning

Starting next Monday, the office kitchen will be cleaned every evening by a professional company. ［1］, we ask all employees to keep the kitchen tidy during the day. Please wash your cups ［2］ using them. ［3］ Any food left in the refrigerator on Friday afternoon will be thrown away. Thank you for your ［4］.`, [
    ['［1］に入るものは？', ['However', 'Therefore', 'For example', 'Instead of'], 0, '「業者が毎晩掃除する」→「しかし、日中はきれいに使ってほしい」の逆接 → However。'],
    ['［2］に入るものは？', ['after', 'during', 'since', 'until'], 0, '使ったあとにカップを洗う → after using。'],
    ['［3］に入る文は？', ['Also, please check the refrigerator regularly.', 'The cleaning company was founded in 2010.', 'Our new office opened last year.', 'Please submit your expense reports.'], 0, '次の文（金曜に冷蔵庫の食べ物は捨てる）につながる → 冷蔵庫を確認してという文。'],
    ['［4］に入るものは？', ['cooperation', 'cooperate', 'cooperative', 'cooperatively'], 0, 'your の後 → 名詞 cooperation（協力）。'],
  ]),
  G(6, 'Part 6 ② お知らせ（図書館）', `City Library Notice

The City Library will be closed from July 1 to July 14 for ［1］. During this period, new shelves and computers will be installed. Books that are due during the closure may be returned to the drop box ［2］ the main entrance. ［3］ We will also extend the due date of all borrowed items by two weeks. We ［4］ to welcoming you back to our improved library.`, [
    ['［1］に入るものは？', ['renovations', 'renovate', 'renovated', 'renovating'], 0, 'for の後 → 名詞 renovations（改装）。'],
    ['［2］に入るものは？', ['next to', 'because of', 'instead', 'among'], 0, '入口の隣のポスト → next to。'],
    ['［3］に入る文は？', ['No late fees will be charged during this time.', 'The library was built in 1985.', 'Please bring your own lunch.', 'Computers are very expensive.'], 0, '休館中の延滞料金の話 → 次の「返却期限を延ばす」ともつながる。'],
    ['［4］に入るものは？', ['look forward', 'looking forward', 'looked forward to', 'are look forward'], 0, 'We look forward to ～ing（～を楽しみにしています）。be 動詞なしの looking、to が2つになる looked forward to、are look は文法的に誤り。'],
  ]),
  G(6, 'Part 6 ③ 広告（レストラン）', `Grand Opening – Sora Kitchen

Sora Kitchen is opening its doors on April 5! Our chef, Mr. Ito, has more than twenty years of ［1］ in Japanese and French cooking. To celebrate our opening, all customers will receive a free dessert ［2］ April 5 and April 12. ［3］ Reservations are ［4］ recommended, especially on weekends.`, [
    ['［1］に入るものは？', ['experience', 'experienced', 'experiencing', 'experiences of'], 0, '「20年以上の経験」→ 名詞 experience（数えない）。'],
    ['［2］に入るものは？', ['between', 'among', 'while', 'from'], 0, 'between A and B（AとBの間）。'],
    ['［3］に入る文は？', ['Our menu changes with the seasons.', 'Mr. Ito was born in a small town.', 'Desserts are bad for your health.', 'The restaurant will close in April.'], 0, '開店の広告の流れに合う文。閉店の話や否定的な話は合わない。'],
    ['［4］に入るものは？', ['highly', 'high', 'height', 'higher'], 0, '過去分詞 recommended を修飾 → 副詞 highly（強く）。'],
  ]),
  G(6, 'Part 6 ④ 手紙（お客さまへ）', `Dear Ms. Rivera,

Thank you for your recent purchase from Bright Home Furniture. We are sorry to hear that the table you ordered ［1］ with a scratch on the surface. We will send a replacement at no extra ［2］. Our delivery team will contact you within three business days to arrange a convenient time. ［3］ Please keep the damaged table until then. We ［4］ apologize for the inconvenience.

Sincerely,
Ken Adams, Customer Service`, [
    ['［1］に入るものは？', ['arrived', 'arrives', 'will arrive', 'arriving'], 0, 'すでに傷がついて届いた → 過去形 arrived。'],
    ['［2］に入るものは？', ['cost', 'price', 'pay', 'money'], 0, 'at no extra cost（追加料金なしで）。'],
    ['［3］に入る文は？', ['At that time, they will also pick up the damaged item.', 'Our tables are made of glass.', 'We opened our first store in 1998.', 'Please pay the remaining balance.'], 0, '次の「それまで傷のある机を保管して」につながる → そのときに回収する。'],
    ['［4］に入るものは？', ['sincerely', 'sincere', 'sincerity', 'more sincere'], 0, '動詞 apologize を修飾 → 副詞 sincerely。'],
  ]),

  // ===== Part 7 =====
  G(7, 'Part 7 ① お知らせ', `NOTICE: Elevator Maintenance

The elevators in the east wing will be out of service on Saturday, June 8, from 9:00 A.M. to 3:00 P.M. for regular safety checks. During this time, please use the elevators in the west wing or the stairs. Deliveries scheduled for that day should be sent to the west entrance. We apologize for any inconvenience.

— Building Management`, [
    ['What is the purpose of the notice?', ['To announce elevator maintenance', 'To introduce a new building', 'To explain a fire drill', 'To advertise a delivery service'], 0, 'エレベーターの点検のお知らせ。'],
    ['How long will the work take?', ['Six hours', 'Three hours', 'Nine hours', 'All weekend'], 0, '9時から15時 → 6時間。'],
    ['Where should deliveries be sent on June 8?', ['To the west entrance', 'To the east wing', 'To the main office', 'To the third floor'], 0, 'Deliveries ... should be sent to the west entrance。'],
  ]),
  G(7, 'Part 7 ② メール', `From: Olivia Grant
To: Sam Park
Subject: Training session

Hi Sam,

Thank you for agreeing to lead the training session for new employees next Thursday. There will be about fifteen participants. I have reserved Room 401, which has a projector and a whiteboard. Could you send me your presentation slides by Tuesday? I would like to print copies for everyone. Also, lunch will be provided at 12:30, so please plan to finish the morning part by then.

Best,
Olivia`, [
    ['Why did Olivia write the e-mail?', ['To give details about a training session', 'To invite Sam to lunch', 'To ask Sam to reserve a room', 'To complain about a presentation'], 0, '研修の詳細を伝えている。'],
    ['What does Olivia ask Sam to do?', ['Send his slides by Tuesday', 'Print copies for everyone', 'Order lunch', 'Buy a projector'], 0, 'Could you send me your presentation slides by Tuesday?'],
    ['What is indicated about the session?', ['About fifteen people will attend.', 'It will be held on Tuesday.', 'It will end at 12:30 P.M.', 'Room 401 has no projector.'], 0, 'There will be about fifteen participants. 午前の部を12:30までに終えるのであって、研修全体が終わるとは書いていない。'],
  ]),
  G(7, 'Part 7 ③ 広告', `Maple Fitness Center — Summer Special!

Join before July 31 and get your first month free! Our center offers a swimming pool, a yoga studio, and more than fifty exercise machines. We are open from 6 A.M. to 11 P.M. every day. Members can also take free group classes in the evenings. Bring this advertisement to the front desk to receive a free water bottle.`, [
    ['What is being advertised?', ['A fitness center', 'A swimming school', 'A sports shop', 'A summer camp'], 0, 'Maple Fitness Center の広告。'],
    ['What is NOT mentioned as a feature of the center?', ['A tennis court', 'A swimming pool', 'A yoga studio', 'Exercise machines'], 0, 'テニスコートは書かれていない。NOT 問題は本文にないものを選ぶ。'],
    ['How can readers get a free water bottle?', ['By bringing the advertisement', 'By joining before July 31', 'By taking a group class', 'By visiting in the morning'], 0, 'Bring this advertisement to the front desk。'],
  ]),
  G(7, 'Part 7 ④ チャット（2人）', `[10:02] Mika Tanaka: Hi, Jason. Are you still at the client's office?
[10:03] Jason Moore: Yes, the meeting just ended. They liked our proposal.
[10:03] Mika Tanaka: Great news! Did they say anything about the budget?
[10:05] Jason Moore: They want us to reduce the cost by 10 percent. I'll discuss it with the team this afternoon.
[10:06] Mika Tanaka: OK. I'm free after 2, so I can join.
[10:06] Jason Moore: Perfect. Let's meet at 2:30 in my office.`, [
    ['Where most likely is Jason?', ['At a client\'s office', 'At the airport', 'At a restaurant', 'At home'], 0, 'Are you still at the client\'s office? → Yes。'],
    ['What did the client ask for?', ['A lower cost', 'A new design', 'A faster delivery', 'More staff'], 0, 'reduce the cost by 10 percent。'],
    ['At 10:06, what does Jason mean when he writes, "Perfect"?', ['He is happy that Mika can join the meeting.', 'He thinks the proposal has no problems.', 'He agrees to reduce the cost.', 'He has finished his work.'], 0, '直前の Mika の「2時以降なら参加できる」への返事。意図を問う問題は直前の発言を見る。'],
  ]),
  G(7, 'Part 7 ⑤ 記事', `Local Bakery Expands

Hillside Bakery, which opened in a small shop on Oak Street fifteen years ago, will open its second location downtown next month. Owner Paul Bennett says the new store will be three times larger and will include a café area with thirty seats. "Many of our customers work downtown, so we wanted to be closer to them," Mr. Bennett said. The bakery is now hiring ten new staff members, including two pastry chefs.`, [
    ['What is the article mainly about?', ['A bakery opening a new store', 'A new café on Oak Street', 'A cooking contest', 'A bakery closing down'], 0, '2店目を開くというニュース。'],
    ['Why is the bakery opening a store downtown?', ['Many customers work there.', 'The rent is cheaper there.', 'The Oak Street shop is closing.', 'The owner lives there.'], 0, 'Many of our customers work downtown。'],
    ['How many people will the bakery hire?', ['Ten', 'Two', 'Fifteen', 'Thirty'], 0, 'hiring ten new staff members（うちパティシエ2人）。'],
  ]),
]);
