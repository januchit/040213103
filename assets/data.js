// ข้อมูลรายวิชา — แก้ไขไฟล์นี้ไฟล์เดียวเมื่อต้องการเพิ่ม/เปลี่ยนเนื้อหา
window.COURSE = {
  code: "040213103",
  term: "2/2569",
  nameTh: "การเขียนโปรแกรมคอมพิวเตอร์สำหรับคณิตศาสตร์",
  nameEn: "Computer Programming for Mathematics",
  credits: "3(2-2-5)",
  creditsNote: "บรรยาย 2 · ปฏิบัติ 2 · ศึกษาด้วยตนเอง 5 ชม./สัปดาห์",
  prereq: "ไม่มี",
  dept: "ภาควิชาคณิตศาสตร์",
  faculty: "คณะวิทยาศาสตร์ประยุกต์",
  uni: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",

  objectives: [
    "เพื่อให้นักศึกษาได้เรียนรู้ถึงกระบวนการเขียนโปรแกรมเบื้องต้น",
    "เพื่อให้นักศึกษามีทักษะในการจำลองแนวคิดการแก้ปัญหา",
    "เพื่อให้นักศึกษามีทักษะการแก้ปัญหา สามารถวิเคราะห์ปัญหา ประกาศตัวแปร ชนิดข้อมูล ตัวดำเนินการที่เกี่ยวข้องกับปัญหา",
    "เพื่อให้นักศึกษามีทักษะการแก้ปัญหาด้วยวิธีการเขียนโปรแกรมเบื้องต้น",
    "เพื่อให้นักศึกษาใช้หลักการเขียนโปรแกรมและเทคนิคในการแก้ปัญหาทางคณิตศาสตร์"
  ],

  descTh: "การเขียนโปรแกรมด้วยภาษาคอมพิวเตอร์และเทคนิคการแก้ปัญหาทางคณิตศาสตร์ การเขียนโปรแกรมแบบโครงสร้าง คำสั่งในการรับและแสดงผลข้อมูล ชนิดของข้อมูลแบบง่ายและแบบโครงสร้าง โปรแกรมย่อยและพารามิเตอร์การทำซ้ำ การใช้แฟ้มข้อมูล ขั้นตอนวิธีการเรียกซ้ำ การเขียนโปรแกรมคอมพิวเตอร์เพื่อแก้ปัญหาทางคณิตศาสตร์",
  descEn: "Programming with computer language and technique for solving mathematical problem; structural programming; receiving and displaying data commands; simple and structured data types; recursive subprogram and parameter; data file usage; recursive algorithm; computer programming for problem solving in mathematics.",

  textbooks: [
    "หนังสือสอนเขียนโปรแกรมภาษา Python ของคณะวิศวกรรมคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย"
  ],
  notes: [
    "มีเอกสารประกอบการสอนรายวิชา 040213103 การเขียนโปรแกรมคอมพิวเตอร์สำหรับคณิตศาสตร์",
    "นักศึกษาสามารถใช้ตำราหรือหนังสืออื่น ๆ ทั้งภาษาไทยและภาษาอังกฤษซึ่งมีเนื้อหาตรงตามที่กำหนด"
  ],

  // ch = รหัสบทของสไลด์ที่เกี่ยวข้อง (ตรงกับ SLIDES ด้านล่าง)
  weeks: [
    { w: 1,  title: "Introduction to Computers and Python", detail: "องค์ประกอบและสถาปัตยกรรมคอมพิวเตอร์, แนวคิดการประมวลผลข้อมูล, การติดตั้งและใช้งาน Python, การเขียนและรันโปรแกรม", ch: ["00", "01"] },
    { w: 2,  title: "Variables, Input and Output", detail: "ตัวแปร, ชนิดข้อมูลพื้นฐาน, การกำหนดค่า, <code>input()</code>, <code>print()</code>, การจัดรูปแบบผลลัพธ์", ch: ["02"] },
    { w: 3,  title: "Libraries", detail: "การ <code>import</code> โมดูล, ไลบรารี <code>math</code>, <code>random</code> และไลบรารีที่เป็นประโยชน์ทางคณิตศาสตร์", ch: ["03"] },
    { w: 4,  title: "Conditional Structure", detail: "<code>if</code> / <code>elif</code> / <code>else</code>, นิพจน์เงื่อนไขและตรรกะ, การเยื้อง (indentation) และบล็อกคำสั่ง", ch: ["04"] },
    { w: 5,  title: "Conditional Structure (ต่อ) + ฝึกปฏิบัติ", detail: "เงื่อนไขซ้อน, โจทย์ประยุกต์ทางคณิตศาสตร์", ch: ["04"] },
    { w: 6,  title: "Repetition Structure: For Loops", detail: "<code>for</code>, <code>range()</code>, การวนซ้ำ, การคำนวณผลรวม/ผลคูณ/อนุกรม", ch: ["05"] },
    { w: 7,  title: "Lists", detail: "การสร้าง/เข้าถึง/slicing, เมท็อดของลิสต์, การวนซ้ำกับลิสต์", ch: ["06"] },
    { w: 8,  title: "While Loops", detail: "<code>while</code>, เงื่อนไขหยุดการวน, การหลีกเลี่ยงการวนไม่รู้จบ, การประยุกต์เชิงตัวเลข", ch: ["07"] },
    { exam: "สอบกลางภาค" },
    { w: 9,  title: "Dictionaries and Sets", detail: "คู่ key–value, เมท็อดของดิกชันนารี, เซตและการดำเนินการเซต", ch: ["08"] },
    { w: 10, title: "Functions", detail: "การนิยามฟังก์ชัน <code>def</code>, พารามิเตอร์/อาร์กิวเมนต์, <code>return</code>, ขอบเขตตัวแปร (scope)", ch: ["09"] },
    { w: 11, title: "Functions (ต่อ)", detail: "ค่าปริยาย, การคืนค่าหลายค่า, ฟังก์ชันทางคณิตศาสตร์, แนวคิดการเรียกซ้ำเบื้องต้น", ch: ["09"] },
    { w: 12, title: "Numerical Computing (NumPy)", detail: "อาร์เรย์ (array), การคำนวณแบบเวกเตอร์ (vectorized)", ch: ["10"] },
    { w: 13, title: "Numerical Computing (ต่อ)", detail: "เมทริกซ์, การดำเนินการเชิงเส้น, การประยุกต์แก้ปัญหาทางคณิตศาสตร์", ch: ["10"] },
    { w: 14, title: "บูรณาการ / เวิร์กช็อปโครงงานย่อย", detail: "แก้โจทย์ปัญหาทางคณิตศาสตร์ด้วย Python", ch: [] },
    { w: 15, title: "ทบทวนรายวิชา + นำเสนอโครงงาน", detail: "สรุปบทเรียน", ch: [] },
    { exam: "สอบปลายภาค" }
  ],

  grading: [
    { label: "สอบกลางภาค", pct: 30 },
    { label: "สอบปลายภาค", pct: 30 },
    { label: "งานมอบหมาย / โครงงาน / ทดสอบย่อย", pct: 30 },
    { label: "การเข้าชั้นเรียนและการบ้าน", pct: 10 }
  ],
  gradingNote: "ตัดเกรดแบบอิงกลุ่มและอิงเกณฑ์ โดยพิจารณาจากค่าเฉลี่ย (x̄) และส่วนเบี่ยงเบนมาตรฐาน (S.D.)",

  instructors: [
    { name: "รศ. ดร.อภิชาต ศุรธณี", sec: "1", time: "S 08.00 – 12.00 น.", room: "78-1008", office: ["M 09.00 – 12.00 น.", "M 13.00 – 16.00 น."] },
    { name: "รศ. ดร.อนุชิต จิตพัฒนกุล", sec: "2", time: "W 08.00 – 12.00 น.", room: "75-504", office: ["W 13.00 – 16.00 น.", "F 09.00 – 12.00 น."] }
  ]
};

// สไลด์: เพิ่มบทใหม่ได้โดยวาง PDF ไว้ที่ slides/chXX.pdf และภาพแต่ละหน้าไว้ที่ slides/chXX/p-01.jpg ...
window.SLIDES = [
  { id: "00", title: "แนะนำรายวิชา", en: "Course Introduction", pages: 17, weeks: "สัปดาห์ 1" },
  { id: "01", title: "รู้จักคอมพิวเตอร์ Python และ Google Colab", en: "Computers, Python & Colab", pages: 20, weeks: "สัปดาห์ 1" },
  { id: "02", title: "ตัวแปร ชนิดข้อมูล และ Input/Output", en: "Variables, Data Types, I/O", pages: 21, weeks: "สัปดาห์ 2" },
  { id: "03", title: "ไลบรารี math และ random", en: "Libraries", pages: 19, weeks: "สัปดาห์ 3" },
  { id: "04", title: "เงื่อนไข if / elif / else", en: "Conditional Structure", pages: 19, weeks: "สัปดาห์ 4–5" },
  { id: "05", title: "การวนซ้ำด้วย for", en: "For Loops", pages: 21, weeks: "สัปดาห์ 6" },
  { id: "06", title: "ลิสต์ (Lists)", en: "Lists", pages: 18, weeks: "สัปดาห์ 7" },
  { id: "07", title: "การวนซ้ำด้วย while", en: "While Loops", pages: 18, weeks: "สัปดาห์ 8" },
  { id: "08", title: "ดิกชันนารีและเซต", en: "Dictionaries & Sets", pages: 16, weeks: "สัปดาห์ 9" },
  { id: "09", title: "ฟังก์ชัน", en: "Functions", pages: 19, weeks: "สัปดาห์ 10–11" },
  { id: "10", title: "NumPy", en: "Numerical Computing", pages: 21, weeks: "สัปดาห์ 12–13" }
];

// เอกสารประกอบการสอน: PDF อยู่ที่ docs/docXX.pdf และภาพแต่ละหน้าที่ docs/docXX/p-01.jpg ...
// slide = รหัสบทของสไลด์ที่คู่กัน
window.DOCS = [
  { id: "01", title: "แนะนำคอมพิวเตอร์ ภาษา Python และ Google Colab", en: "Introduction to Computers, Python and Google Colab", pages: 16, weeks: "สัปดาห์ 1", slide: "01" },
  { id: "02", title: "ตัวแปร การรับและการแสดงผลข้อมูล", en: "Variables, Input and Output", pages: 25, weeks: "สัปดาห์ 2", slide: "02" },
  { id: "03", title: "การใช้ไลบรารีสำเร็จรูป", en: "Libraries", pages: 20, weeks: "สัปดาห์ 3", slide: "03" },
  { id: "04", title: "โครงสร้างการตัดสินใจ", en: "Conditional Structure", pages: 19, weeks: "สัปดาห์ 4–5", slide: "04" },
  { id: "05", title: "โครงสร้างการทำซ้ำ For Loops", en: "Repetition Structure: For Loops", pages: 19, weeks: "สัปดาห์ 6", slide: "05" },
  { id: "06", title: "โครงสร้างข้อมูลแบบลิสต์", en: "Lists", pages: 14, weeks: "สัปดาห์ 7", slide: "06" },
  { id: "07", title: "โครงสร้างการทำซ้ำ While Loops", en: "While Loops", pages: 16, weeks: "สัปดาห์ 8", slide: "07" },
  { id: "08", title: "ดิกชันนารีและเซต", en: "Dictionaries and Sets", pages: 14, weeks: "สัปดาห์ 9", slide: "08" },
  { id: "09", title: "ฟังก์ชัน", en: "Functions", pages: 15, weeks: "สัปดาห์ 10–11", slide: "09" },
  { id: "10", title: "การคำนวณเชิงตัวเลขด้วย NumPy", en: "Numerical Computing with NumPy", pages: 15, weeks: "สัปดาห์ 12–13", slide: "10" }
];
