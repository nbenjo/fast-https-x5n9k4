import React, { useState } from "react";
import "./styles.css";

const coursesList = [
  {
    id: 1,
    name: "ניהול פרויקטים בעידן הדיגיטלי",
    description: "הכשרה ממוקדת לניהול פרויקטים טכנולוגיים בסביבות משתנות",
    syllabus: "מטריקות, כלי ניהול, מתודולוגיות Agile",
    price: 550,
    dates: "3.6, 10.6",
  },
  {
    id: 2,
    name: "עקרונות תכנות בשפת Python",
    description: "יסודות התכנות בגישה פרקטית לעובדי פיתוח והנדסה",
    syllabus: "מבני נתונים, תנאים, לולאות, פונקציות",
    price: 680,
    dates: "5.6, 12.6",
  },
  {
    id: 3,
    name: "תקשורת בין אישית וניהול קונפליקטים",
    description: "שיפור מיומנויות הקשבה, שיח אפקטיבי וגישור בארגונים",
    syllabus: "ניתוח קונפליקט, תקשורת לא-אלימה, תרגולים",
    price: 470,
    dates: "7.6, 14.6",
  },
  {
    id: 4,
    name: "עקרונות UX/UI לפיתוח מערכות",
    description: "מבוא לחוויית משתמש ותכנון ממשקים לעולמות תוכנה",
    syllabus: "פרסונות, אפיון, wireframes, בדיקות שמישות",
    price: 720,
    dates: "9.6, 16.6",
  },
  {
    id: 5,
    name: "קורס יסודות הסייבר הארגוני",
    description: "מודעות, שיטות הגנה וסימולציות תקיפה לעובדים לא טכנולוגיים",
    syllabus: "Social Engineering, Phishing, סיסמאות חכמות",
    price: 620,
    dates: "11.6, 18.6",
  },
  {
    id: 6,
    name: "מבוא ל-AI ויישומים עסקיים",
    description: "סקירה של בינה מלאכותית ודרכי שילוב בארגונים",
    syllabus: "מודלים, כלים, GPT, ניתוח מקרי בוחן",
    price: 800,
    dates: "13.6, 20.6",
  },
];

const BUDGET_LIMIT = 1500;
const COURSE_LIMIT = 2;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const total = selectedCourses.reduce((sum, course) => sum + course.price, 0);
  const overBudget = total > BUDGET_LIMIT;
  const overCourses = selectedCourses.length > COURSE_LIMIT;

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>התחברות</h2>
        <input
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="סיסמה"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => {
            if (email && password) setIsLoggedIn(true);
          }}
        >
          התחבר
        </button>
      </div>
    );
  }

  function handleSend() {
    if (overBudget || overCourses) return;
    setShowConfirmation(true);
    setSelectedCourses([]);
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        {menuOpen && (
          <ul className="nav-links">
            <li>
              <a href="#">דף הבית</a>
            </li>
            <li>
              <a href="#catalog">קטלוג קורסים</a>
            </li>
            <li>
              <a href="#cart">הסל שלי</a>
            </li>
          </ul>
        )}
      </nav>

      <header className="header">
        <h1>סופטסקילז - בחירת קורסים</h1>
      </header>

      <div className="main-content">
        <aside className="cart" id="cart">
          <h3>הסל שלי</h3>
          {selectedCourses.length === 0 ? (
            <p>לא נבחרו קורסים</p>
          ) : (
            <ul>
              {selectedCourses.map((course) => (
                <li key={course.id}>
                  {course.name} ({course.price} ₪)
                  <button
                    onClick={() =>
                      setSelectedCourses(
                        selectedCourses.filter((c) => c.id !== course.id)
                      )
                    }
                  >
                    הסר
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="totals">
            <span>סה״כ: {total} ₪</span>
            <span>({selectedCourses.length} קורסים)</span>
          </div>
          {(overBudget || overCourses) && (
            <div className="error">
              {overBudget && <div>חריגה מהתקציב ({BUDGET_LIMIT} ₪)</div>}
              {overCourses && <div>חריגה ממספר הקורסים ({COURSE_LIMIT})</div>}
            </div>
          )}
          <button
            disabled={selectedCourses.length === 0 || overBudget || overCourses}
            onClick={handleSend}
          >
            שלח רשימה
          </button>
        </aside>

        <section className="catalog" id="catalog">
          <h2>קטלוג הקורסים</h2>
          {coursesList.map((course) => (
            <div key={course.id} className="course-card">
              <div
                className="course-header"
                onClick={() =>
                  setExpanded(
                    expanded.includes(course.id)
                      ? expanded.filter((id) => id !== course.id)
                      : [...expanded, course.id]
                  )
                }
              >
                <div>
                  <strong>{course.name}</strong>
                  <p className="short-desc">{course.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!selectedCourses.find((c) => c.id === course.id))
                      setSelectedCourses([...selectedCourses, course]);
                  }}
                  disabled={selectedCourses.find((c) => c.id === course.id)}
                >
                  בחר קורס
                </button>
              </div>
              {expanded.includes(course.id) && (
                <div className="course-details">
                  <p>{course.syllabus}</p>
                  <p>תאריכים: {course.dates}</p>
                </div>
              )}
              <div className="course-price">עלות הקורס: {course.price} ₪</div>
            </div>
          ))}
        </section>
      </div>

      {showConfirmation && (
        <div className="confirmation">
          <h3>הרשימה נשלחה בהצלחה!</h3>
          <button onClick={() => setShowConfirmation(false)}>סגור</button>
        </div>
      )}
    </div>
  );
}
