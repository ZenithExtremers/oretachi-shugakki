// TOEIC Part 5（短文穴埋め・4択）。すべてオリジナルの問題
import { spread } from '../lib.js';

let n = 0;
// p(レベル, 型, 問題文, 選択肢4つ, 正解の番号, 解説)
const p = (lecture, type, q, choices, answer, exp) => {
  n++;
  return { id: `toeic-g${String(n).padStart(3, '0')}`, lecture, type, title: 'Part 5 短文穴埋め', questions: [{ id: `toeic-q${String(n).padStart(3, '0')}`, q, choices, answer, exp }] };
};

export default spread([
  // ===== Lv.1（500点レベル） =====
  p(1, 'pos', 'Ms. Tanaka gave a very ------- presentation at the sales meeting.', ['inform', 'informative', 'information', 'informatively'], 1, '冠詞 a と名詞 presentation の間 → 名詞を修飾する形容詞 informative（有益な）。very は形容詞を強める。'),
  p(1, 'pos', 'Please read the instructions ------- before using the new printer.', ['careful', 'care', 'carefully', 'caring'], 2, '動詞 read the instructions を修飾するのは副詞 carefully（注意深く）。'),
  p(1, 'pos', 'The ------- of the new branch office will take place next month.', ['open', 'opened', 'opening', 'opens'], 2, '冠詞 The の後で of の前 → 名詞。opening（開設、開店）。'),
  p(1, 'verb', 'The manager ------- the report to all employees yesterday.', ['send', 'sends', 'sent', 'will send'], 2, 'yesterday があるので過去形 sent。'),
  p(1, 'verb', 'Mr. Lee ------- in the marketing department since 2019.', ['works', 'has worked', 'is working', 'worked'], 1, 'since 2019（2019年から今まで）→ 現在完了 has worked。'),
  p(1, 'verb', 'The new products ------- to stores across the country next week.', ['ship', 'were shipped', 'will be shipped', 'shipping'], 2, '製品は「出荷される」側 → 受け身。next week なので未来の受け身 will be shipped。'),
  p(1, 'verb', 'All visitors must ------- at the front desk.', ['register', 'registers', 'registered', 'registering'], 0, '助動詞 must の後は動詞の原形 register。'),
  p(1, 'prep', 'The store is open ------- 9 A.M. to 6 P.M. on weekdays.', ['at', 'from', 'by', 'until'], 1, 'from A to B（A から B まで）。'),
  p(1, 'prep', 'Please submit the form ------- Friday.', ['by', 'until', 'during', 'since'], 0, '期限「金曜日までに」は by。until は「金曜日までずっと（継続）」。'),
  p(1, 'prep', 'The meeting was postponed ------- the manager was sick.', ['because', 'because of', 'due to', 'despite'], 0, '後ろに主語＋動詞（the manager was sick）がある → 接続詞 because。because of / due to / despite の後は名詞。'),
  p(1, 'prep', 'Our office is located ------- the bank and the post office.', ['among', 'between', 'through', 'along'], 1, 'between A and B（A と B の間に）。'),
  p(1, 'pron', 'Ms. Brown asked ------- assistant to book a hotel room.', ['she', 'her', 'hers', 'herself'], 1, '名詞 assistant の前 → 所有格 her（彼女の）。'),
  p(1, 'pron', 'The customers ------- ordered online will receive a discount.', ['who', 'which', 'whose', 'what'], 0, '先行詞が人（customers）で、後ろに動詞 ordered が続く → 主格の関係代名詞 who。'),
  p(1, 'pron', 'Mr. Kato prepared the slides by -------.', ['he', 'his', 'him', 'himself'], 3, 'by oneself（ひとりで、自分で）→ by himself。'),
  p(1, 'vocab', 'Please ------- your reservation by e-mail at least two days in advance.', ['confirm', 'attend', 'deliver', 'arrive'], 0, 'confirm your reservation（予約を確認する）。'),
  p(1, 'vocab', 'The concert was ------- because of the heavy rain.', ['canceled', 'applied', 'hired', 'purchased'], 0, '大雨のため中止された → canceled。'),
  p(1, 'vocab', 'Employees can get a 20 percent ------- on all items in the store.', ['discount', 'salary', 'deadline', 'receipt'], 0, 'a 20 percent discount（2割引）。'),
  p(1, 'vocab', 'If you have any questions, please ------- our customer service team.', ['contact', 'decide', 'prefer', 'finish'], 0, 'contact（連絡する）は他動詞なので to は不要。'),
  p(1, 'vocab', 'The ------- for the job application is March 31.', ['deadline', 'destination', 'luggage', 'forecast'], 0, '応募の締め切り → deadline。'),
  p(1, 'pos', 'The hotel staff were very ------- to all of the guests.', ['help', 'helpful', 'helpfully', 'helps'], 1, 'be 動詞 were の後で「～だった」→ 形容詞 helpful。'),

  // ===== Lv.2（650点レベル） =====
  p(2, 'pos', 'The company has made ------- progress in reducing its expenses this year.', ['significance', 'significant', 'significantly', 'signify'], 1, '名詞 progress を修飾 → 形容詞 significant（かなりの）。'),
  p(2, 'pos', 'Sales increased ------- after the new advertising campaign was launched.', ['dramatic', 'drama', 'dramatically', 'dramatize'], 2, '自動詞 increased を修飾 → 副詞 dramatically（劇的に）。'),
  p(2, 'pos', 'The ------- for the sales manager position must have at least five years of experience.', ['apply', 'applicant', 'applicable', 'applied'], 1, 'The ＋ ___ ＋ for … が主語 → 名詞。人を表す applicant（応募者）。'),
  p(2, 'pos', 'Ms. Garcia is ------- for organizing the annual conference.', ['responsible', 'responsibility', 'responsibly', 'respond'], 0, 'be responsible for ～（～に責任がある、～を担当する）。'),
  p(2, 'verb', 'By the time the client arrived, the team ------- the proposal.', ['finishes', 'has finished', 'had finished', 'will finish'], 2, '過去のある時点（arrived）までに完了 → 過去完了 had finished。'),
  p(2, 'verb', 'The board members are considering ------- a new branch in Osaka.', ['open', 'to open', 'opening', 'opened'], 2, 'consider は動名詞（-ing）を目的語にとる → opening。'),
  p(2, 'verb', 'The manager asked all staff ------- the safety training.', ['complete', 'to complete', 'completing', 'completed'], 1, 'ask 人 to do（人に～するよう頼む）→ to complete。'),
  p(2, 'verb', 'If the shipment ------- late, we will contact the supplier immediately.', ['arrives', 'will arrive', 'arrived', 'arriving'], 0, '条件を表す if 節の中では、未来のことも現在形で表す → arrives。'),
  p(2, 'verb', 'The renovation work is expected ------- by the end of June.', ['complete', 'to be completed', 'completing', 'to complete'], 1, 'be expected to do。作業は「完了される」側なので受け身 to be completed。'),
  p(2, 'prep', '------- the bad weather, the outdoor event was held as scheduled.', ['Although', 'Despite', 'Because', 'Unless'], 1, '後ろが名詞（the bad weather）→ 前置詞 Despite（～にもかかわらず）。Although は後ろに主語＋動詞。'),
  p(2, 'prep', 'Please keep your receipt ------- you need to return the item.', ['in case', 'in spite of', 'so that', 'instead of'], 0, 'in case ～（～する場合に備えて）。後ろに主語＋動詞。'),
  p(2, 'prep', 'Mr. Ito will lead the meeting ------- the director is on a business trip.', ['during', 'while', 'for', 'within'], 1, '後ろに主語＋動詞 → 接続詞 while（～の間に）。during は前置詞で後ろは名詞。'),
  p(2, 'prep', 'The workshop is open to all employees, ------- of their department.', ['regardless', 'instead', 'because', 'ahead'], 0, 'regardless of ～（～に関係なく）。'),
  p(2, 'pron', 'The firm ------- designed our new office has won several awards.', ['who', 'that', 'whose', 'what'], 1, '先行詞 The firm（会社＝もの扱い）、後ろに動詞 → 主格の that（または which）。'),
  p(2, 'pron', 'We hired a consultant ------- experience in marketing is impressive.', ['who', 'whom', 'whose', 'which'], 2, '後ろの experience（名詞）とつながり「その人の経験」→ 所有格の関係代名詞 whose。'),
  p(2, 'pron', 'Of the two proposals, the board preferred the ------- submitted by Ms. Chen.', ['one', 'it', 'other', 'another'], 0, '前に出た名詞（proposal）の代わり → one。the one submitted by …（…が出したもの）。'),
  p(2, 'vocab', 'All employees are ------- to attend the annual safety seminar.', ['required', 'eligible', 'tentative', 'previous'], 0, 'be required to do（～することを求められる＝義務）。'),
  p(2, 'vocab', 'The warranty will ------- at the end of this month, so please renew it soon.', ['expire', 'negotiate', 'commute', 'install'], 0, '保証の期限が切れる → expire。'),
  p(2, 'vocab', 'Travel expenses will be ------- after you submit your receipts to the accounting department.', ['reimbursed', 'resigned', 'renovated', 'retired'], 0, '経費は払い戻される → reimbursed。'),
  p(2, 'vocab', 'The new software has made our ordering process much more -------.', ['efficient', 'mandatory', 'defective', 'temporary'], 0, '注文の手順がずっと効率的になった → efficient。'),

  // ===== Lv.3（800点レベル） =====
  p(3, 'pos', 'The proposal was approved ------- by the board of directors.', ['unanimous', 'unanimity', 'unanimously', 'unanimousness'], 2, '受け身の動詞 was approved を修飾 → 副詞 unanimously（満場一致で）。'),
  p(3, 'pos', 'The report includes a ------- analysis of the market trends over the past decade.', ['comprehend', 'comprehensive', 'comprehensively', 'comprehension'], 1, '名詞 analysis を修飾 → 形容詞 comprehensive（包括的な）。comprehensible は「理解できる」で別の語。'),
  p(3, 'pos', 'Ms. Wong\'s ------- to detail made her the ideal candidate for the audit team.', ['attentive', 'attention', 'attend', 'attentively'], 1, '所有格 Ms. Wong\'s の後 → 名詞。attention to detail（細部への注意）。'),
  p(3, 'pos', 'Customers have responded ------- to the redesigned website.', ['favorable', 'favorably', 'favor', 'favorite'], 1, '自動詞 responded を修飾 → 副詞 favorably（好意的に）。'),
  p(3, 'verb', 'Had the shipment arrived on time, the store ------- the sale as planned.', ['will hold', 'would hold', 'would have held', 'had held'], 2, 'Had the shipment arrived = If the shipment had arrived（仮定法過去完了の倒置）。帰結は would have ＋ 過去分詞。'),
  p(3, 'verb', 'The CEO insisted that the budget report ------- before the shareholders\' meeting.', ['is revised', 'be revised', 'was revised', 'revising'], 1, 'insist that ～ の中は動詞の原形（仮定法現在）→ be revised。'),
  p(3, 'verb', '------- the contract carefully, the legal team found several discrepancies.', ['Reviewed', 'Having reviewed', 'To be reviewed', 'Being reviewed'], 1, '「契約書を見直したあとで」法務チームが見つけた → 完了形の分詞構文 Having reviewed。主語は the legal team（見直す側）。'),
  p(3, 'verb', 'Not only ------- the deadline, but the team also stayed under budget.', ['the team met', 'did the team meet', 'met the team', 'the team did meet'], 1, '否定語 Not only が文頭 → 倒置（助動詞＋主語＋動詞）did the team meet。'),
  p(3, 'prep', '------- the merger is approved, the two companies will consolidate their headquarters.', ['Provided that', 'In spite of', 'Prior to', 'Regardless of'], 0, '後ろに主語＋動詞 → 接続詞。Provided that（～という条件で）。ほかは前置詞の働き。'),
  p(3, 'prep', 'All expenses must be reported ------- the company\'s travel policy.', ['in accordance with', 'on behalf of', 'in lieu of', 'by means of'], 0, '規定に従って → in accordance with。'),
  p(3, 'prep', 'The factory continued to operate ------- the power outage in the surrounding area.', ['notwithstanding', 'whereas', 'albeit', 'provided'], 0, '後ろが名詞（the power outage）→ 前置詞として使える notwithstanding（～にもかかわらず）。whereas / albeit は接続詞。'),
  p(3, 'prep', 'Sales in Asia grew by 12 percent, ------- sales in Europe remained flat.', ['whereas', 'despite', 'owing to', 'unless'], 0, '2つの文を対比 → 接続詞 whereas（～である一方）。'),
  p(3, 'pron', 'The firm hired three new analysts, ------- has a background in finance.', ['each of whom', 'each of which', 'all of them', 'whose'], 0, '人（analysts）を受け、文をつなぐ → each of whom。all of them では文がつながらない。has（単数）なので each。'),
  p(3, 'pron', 'The committee will select ------- applicant demonstrates the strongest leadership skills.', ['whoever', 'whichever', 'whomever', 'whatever'], 1, '名詞 applicant の前に置けて「どの～でも」→ whichever（＋名詞）。whoever は名詞の前に置けない。'),
  p(3, 'pron', 'The new regulations apply only to companies ------- annual revenue exceeds ten million dollars.', ['which', 'whose', 'that', 'where'], 1, '後ろの annual revenue（名詞）と「その会社の年間収益」→ 所有格 whose。'),
  p(3, 'vocab', 'To reduce costs, the company plans to ------- its two smaller warehouses into one facility.', ['consolidate', 'alleviate', 'solicit', 'endorse'], 0, '2つを1つにまとめる → consolidate（統合する）。'),
  p(3, 'vocab', 'The new procedures are designed to ------- the approval process and reduce delays.', ['streamline', 'relinquish', 'curtail', 'scrutinize'], 0, '手続きを合理化して遅れを減らす → streamline。'),
  p(3, 'vocab', 'Any ------- between the invoice and the delivery receipt should be reported immediately.', ['discrepancy', 'dividend', 'milestone', 'successor'], 0, '請求書と受領書の食い違い → discrepancy。'),
  p(3, 'vocab', 'Because demand is highly -------, the company adjusts its production every month.', ['volatile', 'adjacent', 'indispensable', 'lenient'], 0, '需要が変動しやすい → volatile。'),
  p(3, 'vocab', 'The final approval of the budget is ------- on the results of the external audit.', ['contingent', 'pertinent', 'prudent', 'conducive'], 0, 'be contingent on ～（～次第である）。'),
]);
