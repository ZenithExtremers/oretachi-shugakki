// TOEIC リスニング（Part 1〜4）。問題・会話・写真はすべてオリジナル
// 音声：英語は端末の読み上げ（listen.lines）、パートの日本語の案内は audio/toeicL-p*.mp3（Open JTalk）
import { spread } from '../lib.js';
import { PHOTO } from './photos.js';

let n = 0;
const id = () => String(++n).padStart(3, '0');

// Part 1：写真（選択肢は音声だけで流れ、答えたあとに表示）
const p1 = (photo, sp, choices, answer, exp) => { const k = id(); return { id: `toeicL-g${k}`, lecture: 1, type: 'p1', title: 'Part 1 写真描写', diagram: PHOTO[photo], hideChoices: true, sp, listen: { part: 1 },
  questions: [{ id: `toeicL-q${k}`, q: '写真をもっともよく描写しているものを選んでください。', choices, answer, exp }] }; };
// Part 2：応答（質問も選択肢も音声だけ）
const p2 = (sp, ask, choices, answer, exp) => { const k = id(); return { id: `toeicL-g${k}`, lecture: 2, type: 'p2', title: 'Part 2 応答問題', hideChoices: true, sp, ask, listen: { part: 2 },
  questions: [{ id: `toeicL-q${k}`, q: '質問や発言に対する応答として、もっとも適切なものを選んでください。', choices, answer, exp }] }; };
// Part 3・4：会話・説明文＋設問3つ（設問と選択肢は画面に出る）
const set = (lecture, title, lines, qs, ja) => { const k = id(); return { id: `toeicL-g${k}`, lecture, type: lecture === 3 ? 'p3' : 'p4', title, listen: { part: lecture, lines, ja },
  questions: qs.map(([q, choices, answer, exp], i) => ({ id: `toeicL-q${k}-${i + 1}`, q, choices, answer, exp })) }; };

const groups = spread([
  // ===== Part 1 =====
  p1('laptop', 'W', ['She\'s typing on a laptop.', 'She\'s opening a window.', 'She\'s putting on a jacket.', 'She\'s carrying a computer.'], 0, '女性は机でノートパソコンを打っている（typing on a laptop）。持ち運んではいない。'),
  p1('box', 'M', ['A man is carrying a box.', 'A man is painting a door.', 'A man is sitting on a box.', 'A man is opening a closet.'], 0, '男性は箱を持って運んでいる。'),
  p1('bikes', 'W', ['Some bicycles have been parked in a row.', 'A man is riding a bicycle.', 'The bicycles are being repaired.', 'Some cars are parked along the street.'], 0, '人はいない。自転車が一列にとめてある（have been parked）。人がいない写真で「being ＋過去分詞（～されているところ）」は ×。'),
  p1('water', 'M', ['He\'s watering some plants.', 'He\'s planting a tree.', 'He\'s mowing the lawn.', 'He\'s carrying a ladder.'], 0, 'じょうろで植物に水をやっている。'),
  p1('shake', 'W', ['They\'re shaking hands.', 'They\'re sitting at a table.', 'They\'re looking at a map.', 'They\'re waving goodbye.'], 0, '2人が握手している。'),
  p1('bench', 'M', ['A woman is reading on a bench.', 'A woman is jogging in a park.', 'A woman is buying a newspaper.', 'The bench is being painted.'], 0, '公園のベンチで本を読んでいる。'),
  p1('chop', 'W', ['A cook is cutting some vegetables.', 'A cook is washing the dishes.', 'A cook is serving customers.', 'A cook is opening an oven.'], 0, '料理人が野菜を切っている。'),
  p1('bus', 'M', ['Some people are standing next to a bus.', 'A bus is being washed.', 'The bus stop is empty.', 'People are crossing a bridge.'], 0, 'バスのそばに人が立っている。'),
  p1('meeting', 'W', ['Some chairs have been placed near a table.', 'People are having a meeting.', 'A table is being carried.', 'Some chairs are stacked in a corner.'], 0, '人はいない。いすがテーブルのそばに置いてある。'),
  p1('ladder', 'M', ['A man is climbing a ladder.', 'A man is fixing a car.', 'A man is holding an umbrella.', 'A man is sweeping the floor.'], 0, 'はしごを上っている。'),
  p1('chart', 'W', ['A woman is pointing at a chart.', 'A woman is erasing a whiteboard.', 'A woman is handing out documents.', 'A woman is turning off the lights.'], 0, 'グラフを指さしている。'),
  p1('boats', 'M', ['Some boats are tied up at a pier.', 'People are swimming in the sea.', 'A boat is sailing on the ocean.', 'A pier is being built.'], 0, 'ボートが桟橋につないである。人はいない。'),
  p1('cart', 'W', ['A man is pushing a shopping cart.', 'A man is stacking some boxes.', 'A man is paying at a register.', 'A man is looking at a menu.'], 0, '買い物カートを押している。'),
  p1('library', 'M', ['Books have been placed on the shelves.', 'A woman is reading a book.', 'The shelves are being assembled.', 'Some books are lying on the floor.'], 0, '本が棚に並べてある。人はいない。'),
  p1('phone', 'W', ['A woman is talking on the phone.', 'A woman is drinking some coffee.', 'A woman is writing on a whiteboard.', 'A woman is leaving the office.'], 0, '電話で話している。'),
  p1('helmet', 'M', ['He\'s wearing a helmet.', 'He\'s taking off his helmet.', 'He\'s lifting a heavy box.', 'He\'s climbing some stairs.'], 0, 'ヘルメットを「かぶっている状態」は wearing。taking off（脱いでいる動作）は ×。'),

  // ===== Part 2 =====
  p2(['W', 'M'], 'Where is the nearest post office?', ['It\'s across from the bank.', 'At three o\'clock.', 'Yes, I posted it.'], 0, 'Where（どこ）→ 場所で答える。'),
  p2(['M', 'W'], 'When does the meeting start?', ['At ten thirty.', 'In conference room B.', 'Mr. Smith will lead it.'], 0, 'When（いつ）→ 時間で答える。'),
  p2(['W', 'M'], 'Who is in charge of the new project?', ['Ms. Patel is.', 'It\'s due next week.', 'In the main office.'], 0, 'Who（だれ）→ 人で答える。'),
  p2(['M', 'W'], 'Why was the train delayed?', ['Because of the heavy snow.', 'It arrives at platform two.', 'By train, I think.'], 0, 'Why（なぜ）→ 理由で答える。'),
  p2(['W', 'M'], 'How long will the repairs take?', ['About two hours.', 'The repair shop on Main Street.', 'Yes, they\'re very long.'], 0, 'How long（どのくらいの時間）→ 期間で答える。'),
  p2(['M', 'W'], 'Would you like some coffee?', ['Yes, please. With milk.', 'I liked it a lot.', 'The coffee shop is closed.'], 0, '勧められたら Yes, please / No, thank you。'),
  p2(['W', 'M'], 'Could you send me the report by Friday?', ['Sure, I\'ll e-mail it to you.', 'It was a long report.', 'Every Friday.'], 0, '依頼 → 引き受ける・断る。'),
  p2(['M', 'W'], 'Did you finish the sales presentation?', ['Not yet, but I\'ll finish it today.', 'The sales were good.', 'In the presentation room.'], 0, 'Yes/No 疑問文。Not yet（まだ）で答えている。同じ単語（sales, presentation）をくり返す選択肢はひっかけが多い。'),
  p2(['W', 'M'], 'Should we take a taxi or walk to the station?', ['Let\'s walk. It\'s not far.', 'Yes, we should.', 'The station is very old.'], 0, 'A or B の選択疑問文 → どちらかを選ぶ。Yes/No では答えない。'),
  p2(['M', 'W'], 'The printer on the third floor isn\'t working.', ['I\'ll call the repair service.', 'Print three copies.', 'It works on the third floor.'], 0, '問題を伝える発言 → 対応を答える。'),
  p2(['W', 'M'], 'You\'ve been to the Tokyo office, haven\'t you?', ['Yes, twice last year.', 'It\'s a large office.', 'I\'ll go there by train.'], 0, '付加疑問文。行ったことがあるか → Yes, twice。'),
  p2(['M', 'W'], 'How about having lunch at the new Italian restaurant?', ['That sounds great.', 'It opened at noon.', 'I had pasta.'], 0, '提案（How about ～?）→ 賛成・反対で答える。'),
  p2(['W', 'M'], 'Which bus goes to the airport?', ['The number 12.', 'It leaves every hour.', 'Yes, it does.'], 0, 'Which（どれ）→ 具体的なものを答える。'),
  p2(['M', 'W'], 'Isn\'t the store open on Sundays?', ['No, it\'s closed on weekends.', 'I bought it on Sunday.', 'Open the door, please.'], 0, '否定疑問文も、ふつうの疑問文と同じように「開いていない」なら No で答える。'),
  p2(['W', 'M'], 'Who should I give this package to?', ['Just leave it at the front desk.', 'It\'s a heavy package.', 'I gave it yesterday.'], 0, '直接「人」を答えず「受付に置いて」と答えるパターン。'),
  p2(['M', 'W'], 'What time does the store close tonight?', ['I\'m not sure. Let me check.', 'Close to the station.', 'Tonight is fine.'], 0, '「わからない、調べます」も正解になる。close（近い）の言葉のひっかけに注意。'),
  p2(['W', 'M'], 'Where can I find the meeting agenda?', ['It\'s on the shared drive.', 'We met last week.', 'At two o\'clock.'], 0, '場所 → 共有フォルダにある。'),
  p2(['M', 'W'], 'Why don\'t you ask Kevin for help?', ['Good idea. I\'ll talk to him.', 'Because he was busy.', 'He helped me last year.'], 0, 'Why don\'t you ～? は「～したらどう？」という提案。理由（Because）では答えない。'),
  p2(['W', 'M'], 'Has the shipment arrived yet?', ['It\'s expected tomorrow morning.', 'I shipped it by air.', 'Yes, I\'d like one.'], 0, 'まだなら「明日の朝の予定」。'),
  p2(['M', 'W'], 'How much does the conference cost?', ['It\'s 200 dollars per person.', 'About fifty people.', 'For three days.'], 0, 'How much（いくら）→ 金額。How many（何人）と区別する。'),

  // ===== Part 3 =====
  set(3, 'Part 3 会話 ① 会議室の予約', [
    ['W', 'Hi, Tom. I\'d like to reserve the large meeting room for Thursday afternoon. Is it available?'],
    ['M', 'Let me check. Hmm, it\'s already booked from one to three. But it\'s free after three o\'clock.'],
    ['W', 'That works. Our clients are arriving at three thirty anyway. Could you also set up the projector?'],
    ['M', 'Sure. I\'ll make sure everything is ready by three fifteen.'],
  ], [
    ['What does the woman want to do?', ['Reserve a meeting room', 'Cancel an appointment', 'Buy a projector', 'Meet a new employee'], 0, '冒頭で reserve the large meeting room と言っている。'],
    ['When will the clients arrive?', ['At 3:30', 'At 1:00', 'At 3:00', 'At 3:15'], 0, 'Our clients are arriving at three thirty.'],
    ['What will the man do?', ['Prepare a projector', 'Call the clients', 'Change the date', 'Order lunch'], 0, 'set up the projector を頼まれ、Sure と引き受けている。'],
  ], '会議室の予約の会話'),
  set(3, 'Part 3 会話 ② 注文した商品', [
    ['M', 'Good morning, this is Green Office Supplies. How can I help you?'],
    ['W', 'Hi. I ordered fifty boxes of printer paper last week, but only thirty boxes were delivered.'],
    ['M', 'I\'m sorry about that. It looks like the rest were sent separately. They should arrive tomorrow.'],
    ['W', 'OK. We need them for a big printing job on Friday, so tomorrow is fine.'],
  ], [
    ['Who most likely is the man?', ['A customer service representative', 'A delivery driver', 'A printer technician', 'A bank clerk'], 0, '会社名を名乗り How can I help you? と言っている → お客さま係。'],
    ['What problem does the woman mention?', ['Part of her order has not arrived.', 'The paper is the wrong size.', 'Her printer is broken.', 'She was charged twice.'], 0, '50箱注文したのに30箱しか届いていない。'],
    ['When does the woman need the items?', ['On Friday', 'Today', 'Next week', 'On Monday'], 0, 'We need them for a big printing job on Friday.'],
  ], '事務用品の注文の会話'),
  set(3, 'Part 3 会話 ③ 新しいスケジュール（3人）', [
    ['W', 'Did you two hear that the office will open at eight from next month?'],
    ['M', 'Yes. That\'s thirty minutes earlier than now. I think it\'s because of the new overseas clients.'],
    ['M2', 'Right. Their working hours are different from ours. But we\'ll be able to leave earlier, too.'],
    ['W', 'Good. Then I can take the four forty-five train home.'],
  ], [
    ['What change are the speakers discussing?', ['A new opening time', 'A new office location', 'A new manager', 'A new train line'], 0, 'the office will open at eight from next month。'],
    ['According to the man, why is the change being made?', ['To work with overseas clients', 'To save electricity', 'To reduce overtime', 'Because of train delays'], 0, 'because of the new overseas clients。'],
    ['What does the woman say she will do?', ['Take an earlier train home', 'Move to a new apartment', 'Start work at nine', 'Visit a client'], 0, '早く帰れるので4時45分の電車に乗れる。'],
  ], '3人の会話'),
  set(3, 'Part 3 会話 ④ 店で', [
    ['W', 'Excuse me, I\'m looking for this jacket in a medium size. I only see small and large on the rack.'],
    ['M', 'Let me check our stock room. ... I\'m sorry, we\'re out of mediums. But our downtown store has two.'],
    ['W', 'Oh, I work near the downtown store. Could you ask them to hold one for me?'],
    ['M', 'Of course. I\'ll call them now. They can keep it until Saturday.'],
  ], [
    ['Where most likely are the speakers?', ['At a clothing store', 'At a restaurant', 'At a post office', 'At a train station'], 0, 'ジャケットのサイズを探している → 服の店。'],
    ['What is the problem?', ['A size is out of stock.', 'The jacket is damaged.', 'The store is closing.', 'The price is wrong.'], 0, 'we\'re out of mediums（Mサイズが品切れ）。'],
    ['What does the man offer to do?', ['Call another store', 'Give a discount', 'Deliver the item', 'Order a new color'], 0, 'I\'ll call them now.'],
  ], '店員と客の会話'),
  set(3, 'Part 3 会話 ⑤ 出張の準備', [
    ['M', 'Lisa, are you ready for the trip to Singapore next week?'],
    ['W', 'Almost. I booked the flight and the hotel, but I still need to prepare the slides for the trade show.'],
    ['M', 'I can help with that. I have some photos of our new products that you could use.'],
    ['W', 'That would be great. Could you send them to me this afternoon?'],
  ], [
    ['Why is the woman going to Singapore?', ['To attend a trade show', 'To visit her family', 'To open a new office', 'To interview a candidate'], 0, 'slides for the trade show（展示会）。'],
    ['What has the woman NOT done yet?', ['Prepare her slides', 'Book a flight', 'Reserve a hotel', 'Get a passport'], 0, '飛行機とホテルは予約済み。スライドがまだ。'],
    ['What will the man send?', ['Product photos', 'A plane ticket', 'A hotel map', 'A price list'], 0, 'some photos of our new products。'],
  ], '出張の準備の会話'),

  // ===== Part 4 =====
  set(4, 'Part 4 説明文 ① 空港のアナウンス', [
    ['W', 'Attention, passengers on Flight 208 to Vancouver. Due to bad weather, the departure time has been changed from 2:15 to 4:30. The boarding gate has also changed from Gate 12 to Gate 18. We apologize for the inconvenience. Passengers can receive a free meal voucher at the information desk.'],
  ], [
    ['Why has the flight been delayed?', ['Because of bad weather', 'Because of a mechanical problem', 'Because the crew is late', 'Because of a strike'], 0, 'Due to bad weather。'],
    ['What is the new departure time?', ['4:30', '2:15', '12:00', '6:18'], 0, 'from 2:15 to 4:30。'],
    ['What can passengers get at the information desk?', ['A meal voucher', 'A new ticket', 'A city map', 'A blanket'], 0, 'a free meal voucher（無料の食事券）。'],
  ], '空港のアナウンス'),
  set(4, 'Part 4 説明文 ② 留守番電話のメッセージ', [
    ['M', 'Hello, this is David Lee from Sunrise Dental Clinic. I\'m calling to remind you of your appointment tomorrow at 11 A.M. If you need to change the time, please call us back at 555-0142 before 5 P.M. today. Also, please bring your insurance card with you. Thank you.'],
  ], [
    ['Where does the speaker work?', ['At a dental clinic', 'At an insurance company', 'At a hotel', 'At a bank'], 0, 'Sunrise Dental Clinic（歯科医院）。'],
    ['What is the purpose of the call?', ['To remind the listener of an appointment', 'To cancel an appointment', 'To advertise a service', 'To ask for a payment'], 0, 'to remind you of your appointment。'],
    ['What should the listener bring?', ['An insurance card', 'A passport', 'A payment receipt', 'A doctor\'s letter'], 0, 'please bring your insurance card。'],
  ], '留守番電話のメッセージ'),
  set(4, 'Part 4 説明文 ③ 社内のお知らせ', [
    ['W', 'Good morning, everyone. As you know, we\'re moving to the new building next month. To prepare, please pack the items on your desk into the boxes by Friday, May 20. The moving company will pick them up on Saturday. On Monday, you\'ll find your boxes at your new desks. If you have any questions, please contact Maria in the General Affairs department.'],
  ], [
    ['What is the talk mainly about?', ['An office move', 'A new product', 'A company party', 'A training session'], 0, 'moving to the new building（引っ越し）。'],
    ['What are listeners asked to do by Friday?', ['Pack their items', 'Clean the new building', 'Submit a report', 'Choose a new desk'], 0, 'pack the items on your desk into the boxes by Friday。'],
    ['Who should listeners contact with questions?', ['Maria', 'The moving company', 'The building manager', 'Their customers'], 0, 'please contact Maria。'],
  ], '社内の連絡'),
  set(4, 'Part 4 説明文 ④ ラジオの天気予報', [
    ['M', 'And now for the weekend weather. Saturday will be sunny and warm, with a high of 25 degrees, perfect for the city marathon in the morning. But on Sunday, heavy rain is expected in the afternoon, so if you\'re planning to go to the outdoor music festival, don\'t forget your umbrella. Stay tuned for the traffic report after this short break.'],
  ], [
    ['What event will take place on Saturday?', ['A marathon', 'A music festival', 'A food fair', 'A soccer game'], 0, 'the city marathon in the morning。'],
    ['What does the speaker recommend for Sunday?', ['Bringing an umbrella', 'Wearing sunscreen', 'Taking the train', 'Staying home'], 0, 'don\'t forget your umbrella。'],
    ['What will listeners hear next?', ['A traffic report', 'A music program', 'The news', 'An interview'], 0, 'the traffic report after this short break。'],
  ], 'ラジオの天気予報'),
  set(4, 'Part 4 説明文 ⑤ 工場見学のガイド', [
    ['W', 'Welcome to the Blue River Chocolate Factory. My name is Emma, and I\'ll be your guide today. The tour will take about one hour. First, we\'ll see how the cacao beans are roasted. Then, we\'ll visit the packaging area. For safety reasons, please do not touch any of the machines. At the end of the tour, you can try free samples in our gift shop.'],
  ], [
    ['Who is the speaker?', ['A tour guide', 'A factory manager', 'A chef', 'A shop owner'], 0, 'I\'ll be your guide today。'],
    ['How long will the tour take?', ['About one hour', 'About thirty minutes', 'About two hours', 'All day'], 0, 'about one hour。'],
    ['What are the listeners asked NOT to do?', ['Touch the machines', 'Take photos', 'Eat in the factory', 'Talk loudly'], 0, 'please do not touch any of the machines。'],
  ], '工場見学'),
]);

// Part 1・2 の音声：spread で選択肢の並びが決まってから組み立てる
for (const g of groups) {
  if (g.lecture === 1) g.listen.lines = g.questions[0].choices.map((c, i) => [g.sp, `(${'ABCD'[i]}) ${c}`]);
  if (g.lecture === 2) g.listen.lines = [[g.sp[0], g.ask], ...g.questions[0].choices.map((c, i) => [g.sp[1], `(${'ABC'[i]}) ${c}`])];
}
export default groups;
