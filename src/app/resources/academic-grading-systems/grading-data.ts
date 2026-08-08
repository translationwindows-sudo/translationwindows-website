/**
 * International grading systems reference.
 *
 * A DELIBERATE REFUSAL, stated up front.
 *
 * This file does NOT convert grades to a US GPA, and that is the point.
 * Conversion is an evaluative judgement that belongs to a credential
 * evaluator or an admissions office, not to a translator and not to a
 * reference table. Publishing conversions would be both misleading and
 * the exact error our transcript translation page warns against.
 *
 * What this provides instead: what each scale IS, how it is read in its
 * own country, and where the passing threshold sits. That is what someone
 * looking at an unfamiliar transcript actually needs to know.
 */

export interface GradingSystem {
  id: string;
  country: string;
  scale: string;
  direction: "high-good" | "low-good";
  bands: { grade: string; meaning: string }[];
  passMark: string;
  notes: string;
  caution?: string;
}

export const SYSTEMS: GradingSystem[] = [
  {
    id: "germany",
    country: "Germany",
    scale: "1.0 – 5.0",
    direction: "low-good",
    bands: [
      { grade: "1.0 – 1.5", meaning: "sehr gut — very good" },
      { grade: "1.6 – 2.5", meaning: "gut — good" },
      { grade: "2.6 – 3.5", meaning: "befriedigend — satisfactory" },
      { grade: "3.6 – 4.0", meaning: "ausreichend — sufficient" },
      { grade: "4.1 – 5.0", meaning: "nicht ausreichend — fail" },
    ],
    passMark: "4.0",
    notes:
      "Lower is better, which reverses the intuition of anyone used to a percentage or GPA scale. A 1.3 is an excellent result; a 3.7 is a bare pass.",
    caution:
      "The most common misreading of any European transcript. A reviewer seeing 1.3 and assuming a low mark has the situation exactly backwards.",
  },
  {
    id: "france",
    country: "France",
    scale: "0 – 20",
    direction: "high-good",
    bands: [
      { grade: "16 – 20", meaning: "très bien — very good" },
      { grade: "14 – 15.9", meaning: "bien — good" },
      { grade: "12 – 13.9", meaning: "assez bien — fairly good" },
      { grade: "10 – 11.9", meaning: "passable — pass" },
      { grade: "0 – 9.9", meaning: "insuffisant — fail" },
    ],
    passMark: "10",
    notes:
      "Marks above 16 are uncommon and 18 or above is exceptional. French academic culture treats the top of the scale as largely theoretical.",
    caution:
      "A 14 out of 20 is a genuinely good result, not the 70% it superficially resembles. Reading this scale as a percentage understates every candidate.",
  },
  {
    id: "netherlands",
    country: "Netherlands",
    scale: "1 – 10",
    direction: "high-good",
    bands: [
      { grade: "9 – 10", meaning: "uitmuntend / zeer goed — outstanding" },
      { grade: "8 – 8.9", meaning: "goed — good" },
      { grade: "7 – 7.9", meaning: "ruim voldoende — more than satisfactory" },
      { grade: "6 – 6.9", meaning: "voldoende — satisfactory" },
      { grade: "1 – 5.9", meaning: "onvoldoende — fail" },
    ],
    passMark: "6",
    notes:
      "Grades of 9 and 10 are awarded very rarely. An 8 is a strong result and a 7 is solid.",
  },
  {
    id: "uk",
    country: "United Kingdom",
    scale: "Classification / percentage",
    direction: "high-good",
    bands: [
      { grade: "70%+", meaning: "First Class Honours" },
      { grade: "60 – 69%", meaning: "Upper Second (2:1)" },
      { grade: "50 – 59%", meaning: "Lower Second (2:2)" },
      { grade: "40 – 49%", meaning: "Third Class" },
      { grade: "below 40%", meaning: "Fail" },
    ],
    passMark: "40%",
    notes:
      "A First at 70% surprises reviewers used to US percentages. UK marking rarely awards above 80, and a 75 is exceptional work.",
    caution:
      "Treating 70% as a C-grade equivalent misreads the strongest classification the system awards.",
  },
  {
    id: "india",
    country: "India",
    scale: "Percentage or CGPA (varies by institution)",
    direction: "high-good",
    bands: [
      { grade: "75%+ / CGPA 7.5+", meaning: "Distinction (varies)" },
      { grade: "60 – 74%", meaning: "First Division" },
      { grade: "50 – 59%", meaning: "Second Division" },
      { grade: "40 – 49%", meaning: "Third Division / Pass" },
      { grade: "below 40%", meaning: "Fail" },
    ],
    passMark: "35 – 40% depending on institution",
    notes:
      "Standards differ substantially between universities and between state and central boards. A First Division from one institution is not directly comparable to another.",
    caution:
      "CGPA scales vary between 4, 7 and 10 point systems. The transcript should state which is in use; if it does not, ask.",
  },
  {
    id: "china",
    country: "China",
    scale: "0 – 100 percentage",
    direction: "high-good",
    bands: [
      { grade: "90 – 100", meaning: "Excellent (优秀)" },
      { grade: "80 – 89", meaning: "Good (良好)" },
      { grade: "70 – 79", meaning: "Average (中等)" },
      { grade: "60 – 69", meaning: "Pass (及格)" },
      { grade: "below 60", meaning: "Fail (不及格)" },
    ],
    passMark: "60",
    notes:
      "Some institutions also issue a 4-point GPA alongside the percentage. Where both appear, the percentage is normally the authoritative record.",
  },
  {
    id: "brazil",
    country: "Brazil",
    scale: "0 – 10",
    direction: "high-good",
    bands: [
      { grade: "9 – 10", meaning: "Excelente" },
      { grade: "7.5 – 8.9", meaning: "Bom" },
      { grade: "6 – 7.4", meaning: "Regular" },
      { grade: "5 – 5.9", meaning: "Insuficiente (some institutions pass at 5)" },
      { grade: "0 – 4.9", meaning: "Reprovado — fail" },
    ],
    passMark: "5 to 7, depending on institution",
    notes:
      "The pass mark genuinely varies between universities, so the transcript or an accompanying key should state it.",
  },
  {
    id: "mexico",
    country: "Mexico",
    scale: "0 – 10",
    direction: "high-good",
    bands: [
      { grade: "9 – 10", meaning: "Excelente" },
      { grade: "8 – 8.9", meaning: "Muy bien" },
      { grade: "7 – 7.9", meaning: "Bien" },
      { grade: "6 – 6.9", meaning: "Suficiente" },
      { grade: "0 – 5.9", meaning: "Reprobado — fail" },
    ],
    passMark: "6",
    notes:
      "Widely used across Latin America with local variation. Some institutions pass at 7 rather than 6.",
  },
  {
    id: "russia",
    country: "Russia and CIS",
    scale: "2 – 5",
    direction: "high-good",
    bands: [
      { grade: "5", meaning: "отлично — excellent" },
      { grade: "4", meaning: "хорошо — good" },
      { grade: "3", meaning: "удовлетворительно — satisfactory" },
      { grade: "2", meaning: "неудовлетворительно — fail" },
    ],
    passMark: "3",
    notes:
      "A compressed four-point scale where 1 is effectively unused. The narrow range means it distinguishes less between candidates than most systems.",
  },
  {
    id: "japan",
    country: "Japan",
    scale: "Letter grades or 0 – 100",
    direction: "high-good",
    bands: [
      { grade: "A / 優 (80 – 100)", meaning: "Excellent" },
      { grade: "B / 良 (70 – 79)", meaning: "Good" },
      { grade: "C / 可 (60 – 69)", meaning: "Pass" },
      { grade: "D / 不可 (below 60)", meaning: "Fail" },
    ],
    passMark: "60",
    notes:
      "Some institutions add an S or 秀 grade above A for outstanding work, which can be missed if only A–D is expected.",
  },
  {
    id: "spain",
    country: "Spain",
    scale: "0 – 10",
    direction: "high-good",
    bands: [
      { grade: "9 – 10", meaning: "Sobresaliente" },
      { grade: "7 – 8.9", meaning: "Notable" },
      { grade: "5 – 6.9", meaning: "Aprobado" },
      { grade: "0 – 4.9", meaning: "Suspenso — fail" },
    ],
    passMark: "5",
    notes:
      "Matrícula de Honor is a distinction awarded above Sobresaliente to a limited number of students, and should be noted where it appears.",
  },
  {
    id: "italy",
    country: "Italy",
    scale: "18 – 30 (university)",
    direction: "high-good",
    bands: [
      { grade: "30 e lode", meaning: "30 with distinction" },
      { grade: "28 – 30", meaning: "Excellent" },
      { grade: "24 – 27", meaning: "Good" },
      { grade: "18 – 23", meaning: "Pass" },
      { grade: "below 18", meaning: "Fail" },
    ],
    passMark: "18",
    notes:
      "Degree classifications use a separate 66 – 110 scale, with 110 e lode the highest. Confusing the two scales is a common error on Italian transcripts.",
    caution:
      "A transcript may show both the exam scale (18–30) and the final degree scale (66–110). They are not the same measure.",
  },
];

export const LAST_REVIEWED = "August 2026";
