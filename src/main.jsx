import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowRight,
  CameraOff,
  Check,
  ChevronDown,
  Clock3,
  HeartHandshake,
  Leaf,
  Lock,
  Menu,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  X
} from "lucide-react";
import yogaHero from "./assets/yoga-hero.jpg";
import yogaWhy from "./assets/yoga-why.jpg";
import "./styles.css";

const CONFIG = {
  price: "₹5,000",
  date: "To Be Announced Soon",
  sessions: [
    "7:00–8:00 AM IST",
    "8:00–9:00 AM IST",
    "5:00–6:00 PM IST",
    "6:00–7:00 PM IST"
  ],
  googleSheetsEndpoint: import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT || ""
};

const faqs = [
  [
    "Do I have to be nude?",
    "Yes. Being nude is mandatory, as that's the whole point of this workshop — exploring body acceptance and becoming comfortable in your own skin. If you feel uncomfortable showing your face, you may use an eye mask or otherwise conceal your face in a way that doesn't interfere with your yoga practice."
  ],
  ["Will the Zoom sessions be recorded?", "No. Sessions will not be recorded."],
  ["Can other participants see me?", "Yes. That's part of learning to become comfortable in your own skin."],
  [
    "Is the camera mandatory?",
    "Yes. Your camera should remain ON throughout the session. You may conceal your face with an eye mask or adjust the camera framing if needed, provided it doesn't interfere with the yoga practice."
  ],
  ["What if I feel uncomfortable?", "You can adjust your camera framing for facial privacy, but your camera should remain ON."],
  [
    "What should I wear before/after the session?",
    "Anything comfortable and easy to take off and put back on."
  ],
  ["Do I need yoga experience?", "No. This workshop is specifically designed for absolute beginners."],
  [
    "What happens after I register?",
    "You'll receive instructions to join our Telegram group. After payment, you'll be added to the confirmed batch participants group."
  ],
  [
    "Is the ₹5,000 fee refundable?",
    "No. The fee is non-refundable. However, you're eligible for future programs priced at ₹5,000 or less, subject to availability. If a future program costs more, you'll pay the difference."
  ],
  ["Will I receive the course after the workshop?", "No. Course access is not provided after the workshop."],
  [
    "Can people outside India participate?",
    "Yes. International participants are welcome. Alternative payment options such as PayPal or cryptocurrency may be available."
  ],
  [
    "Is this a sexual workshop?",
    "No. It is strictly non-sexual and focused on yoga, mindfulness, body awareness and self-acceptance."
  ]
];

const benefits = [
  ["Basic yoga asanas", "Slow, approachable movement that welcomes complete beginners."],
  ["Gentle movement", "Learn to notice tension, balance and ease without chasing flexibility."],
  ["Simple breathing", "Use steady breathing to settle attention and connect with the body."],
  ["Mindfulness", "Practice staying with the present moment rather than judging appearance."],
  ["Body awareness", "Shift attention from how you look toward how you feel."],
  ["Relaxation", "Finish with calm, restorative practices and a quieter nervous system."]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState("");
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const mobileCtaText = useMemo(() => (regSubmitted ? "REGISTERED" : "RESERVE MY SPOT"), [regSubmitted]);

  function scrollTo(id) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function postToSheet(payload) {
    if (!CONFIG.googleSheetsEndpoint) {
      await new Promise((resolve) => setTimeout(resolve, 650));
      console.info("Demo mode: Google Sheets endpoint is not configured.", payload);
      return;
    }

    await fetch(CONFIG.googleSheetsEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    await new Promise((resolve) => setTimeout(resolve, 450));
  }

  async function submitRegistration(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const age = Number(form.get("age"));

    setRegError("");

    if (age < 18) {
      setRegError("This workshop is for adults aged 18 and above.");
      return;
    }
    if (!form.get("session")) {
      setRegError("Please choose your preferred session.");
      return;
    }

    setRegLoading(true);

    try {
      await postToSheet({
  type: "registration",
  timestamp: new Date().toISOString(),
  name: form.get("name"),
  age: Number(form.get("age")),
  phone: form.get("phone"),
  email: form.get("email"),
  country: form.get("country"),
  preferredSession: form.get("session"),
  paymentStatus: "Pending",
  telegramStatus: "Pending",
  registrationStatus: "Inquiry"
});

      setRegSubmitted(true);
      e.currentTarget.reset();
      setSession("");
      setTimeout(() => document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch {
      setRegError("We couldn't submit your request. Please try again.");
    } finally {
      setRegLoading(false);
    }
  }

  async function submitQuestion(e) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);

  setQuestionLoading(true);

  try {
    await postToSheet({
      type: "question",
      timestamp: new Date().toISOString(),
      name: form.get("name"),
      contact: form.get("contact"),
      question: form.get("question")
    });

    // Apps Script has received the request.
    // Don't attempt to read its cross-origin response.
    setQuestionSubmitted(true);
    e.currentTarget.reset();

  } catch (error) {
    console.error("Question submission error:", error);
    setQuestionSubmitted(false);
  } finally {
    setQuestionLoading(false);
  }
}

  return (
    <div className="site" id="top">
      <header className="topbar">
        <div className="shell topbar-inner">
          <button className="brand" onClick={() => scrollTo("top")} aria-label="Return to top">
            <span className="brand-mark"><Leaf size={17} strokeWidth={1.8} /></span>
            <span>
              <strong>NATURIST YOGA</strong>
              <small>YOGA & BODY ACCEPTANCE</small>
            </span>
          </button>

          <nav className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <button onClick={() => scrollTo("experience")}>Workshop</button>
            <button onClick={() => scrollTo("experience")}>Experience</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
            <button onClick={() => scrollTo("questions")}>Contact</button>
            <button className="nav-cta" onClick={() => scrollTo("reserve")}>RESERVE MY SPOT <ArrowRight size={16}/></button>
          </nav>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23}/> : <Menu size={23}/>}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-orb orb-1"></div>
          <div className="hero-orb orb-2"></div>
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span></span> PRIVATE ONLINE EXPERIENCE · 18+</div>
              <h1>Feel At Home<br /><em>In Your Own Skin.</em></h1>
              <p className="hero-lede">
                A 3-day beginner-friendly naturist yoga experience combining simple yoga,
                mindfulness and body acceptance — designed to help you become more comfortable with your body.
              </p>

              <div className="hero-meta">
                <span><Users size={15}/> 18+ only</span>
                <span><Clock3 size={15}/> 60 min/day</span>
                <span><Video size={15}/> Online via Zoom</span>
              </div>

              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => scrollTo("reserve")}>
                  RESERVE MY SPOT <ArrowRight size={17}/>
                </button>
                <button className="text-link" onClick={() => scrollTo("experience")}>
                  Explore the experience <ArrowDown size={16}/>
                </button>
              </div>

              <div className="hero-trust">
                <Lock size={16}/>
                <span>Strictly non-sexual · Private · No recording</span>
              </div>
            </div>

            <div className="hero-card-wrap">
              <div className="hero-card">
                <div className="image-panel" role="img" aria-label="Adult European woman practicing yoga in a serene room" style={{ backgroundImage: `url(${yogaHero})` }}>
                  <div className="image-overlay"></div>
                  <div className="image-caption">
                    <span>3-DAY EXPERIENCE</span>
                    <strong>Yoga · Presence · Acceptance</strong>
                  </div>
                </div>
                <div className="hero-card-bottom">
                  <div>
                    <small>WORKSHOP FEE</small>
                    <strong>Rs 5000</strong>
                  </div>
                  <div className="date-pill">
                    <small>DATES</small>
                    <span>{CONFIG.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-band">
          <div className="shell trust-grid">
            <TrustItem icon={<ShieldCheck size={21}/>} title="18+ Only" text="Adult participants" />
            <TrustItem icon={<HeartHandshake size={21}/>} title="Judgment-Free" text="Respectful environment" />
            <TrustItem icon={<CameraOff size={21}/>} title="No Recording" text="Privacy comes first" />
            <TrustItem icon={<Sparkles size={21}/>} title="Beginners" text="No experience needed" />
          </div>
        </section>

        <section className="section intro" id="workshop">
          <div className="shell why-grid">
            <div className="why-image-card">
              <img
                src={yogaWhy}
                alt="Adult European woman practicing Warrior II yoga in a bright, serene room"
                loading="lazy"
              />
              <div className="why-image-caption">
                <span>BODY AWARENESS</span>
                <strong>Feel, don't judge.</strong>
              </div>
            </div>

            <div className="why-copy">
              <div className="section-kicker">WHY NATURIST YOGA?</div>
              <h2>Yoga. Mindfulness.<br /><em>Self-Acceptance.</em></h2>
              <p className="lead">
                Many of us spend too much time worrying about how our bodies look.
              </p>
              <p>
                Naturist yoga offers an opportunity to step away from comparison and self-consciousness
                and focus on how your body <strong>feels</strong> rather than how it looks.
              </p>
              <div className="quote-card">
                <span className="quote-mark">“</span>
                <p>You don't need to change your body to feel comfortable in it.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section soft-section" id="experience">
          <div className="shell">
            <div className="section-heading centered">
              <div className="section-kicker">START WHERE YOU ARE</div>
              <h2>Never Done Yoga Before? <em>Perfect.</em></h2>
              <p>This workshop is designed for absolute beginners.</p>
            </div>

            <div className="benefit-grid">
              {benefits.map(([title, text], i) => (
                <div className="benefit-card" key={title}>
                  <span className="card-number">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            <div className="center-note">No flexibility or previous yoga experience required.</div>
            <div className="future-note">Advanced workshops coming soon.</div>
          </div>
        </section>

        <section className="section experience-days">
          <div className="shell">
            <div className="section-heading">
              <div className="section-kicker">THE 3-DAY EXPERIENCE</div>
              <h2>A gentler way to <em>connect.</em></h2>
            </div>

            <div className="day-grid">
              <DayCard day="01" title="RECONNECT" body="Basic yoga + body awareness" />
              <DayCard day="02" title="ACCEPT" body="Mindful movement + self-acceptance" />
              <DayCard day="03" title="EMBRACE" body="Yoga flow + confidence + reflection" />
            </div>
          </div>
        </section>

        <section className="section schedule-section">
          <div className="shell schedule-wrap">
            <div className="schedule-intro">
              <div className="section-kicker">SESSION TIMES</div>
              <h2>Choose your <em>time.</em></h2>
              <p>60 minutes per day · Same selected slot for all 3 days</p>
              <div className="ist-note"><Moon size={15}/> All timings are IST.</div>
            </div>

            <div className="schedule-options">
              <span className="schedule-label">MORNING</span>
              {CONFIG.sessions.slice(0, 2).map((value) => (
                <SessionDisplay key={value} value={value} />
              ))}
              <span className="schedule-label evening-label">EVENING</span>
              {CONFIG.sessions.slice(2).map((value) => (
                <SessionDisplay key={value} value={value} />
              ))}
            </div>
          </div>
        </section>

        <section className="section safety">
          <div className="shell safety-grid">
            <div>
              <div className="section-kicker">A SAFE & RESPECTFUL SPACE</div>
              <h2>Private. Respectful.<br /><em>Judgment-Free.</em></h2>
              <p className="lead">A clear container makes it easier to be present.</p>
            </div>
            <div className="safety-list">
              {[
                "18+ only",
                "Strictly non-sexual",
                "No recording",
                "No screenshots",
                "No photography",
                "No redistribution",
                "Respect everyone's boundaries",
                "Join from a private environment"
              ].map(item => (
                <div className="safety-item" key={item}><Check size={17}/><span>{item}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section steps-section">
          <div className="shell">
            <div className="section-heading centered">
              <div className="section-kicker">HOW IT WORKS</div>
              <h2>Simple from <em>start to finish.</em></h2>
            </div>
            <div className="steps-grid">
              <Step num="01" title="Reserve Your Spot" text="Submit your basic details and preferred time." />
              <Step num="02" title="Join Telegram" text="You'll receive instructions to join our Telegram group." />
              <Step num="03" title="Complete Payment" text="Payment instructions will be shared after registration." />
              <Step num="04" title="Join Zoom" text="Attend your selected 60-minute session each day." />
            </div>
            <div className="confirmation-note">
              <ShieldCheck size={18}/>
              <span>Registration is not confirmed until payment is received.</span>
            </div>
          </div>
        </section>

        <section className="section reserve-section" id="reserve">
          <div className="shell reserve-grid">
            <div className="reserve-copy">
              <div className="section-kicker">RESERVE YOUR SPOT</div>
              <h2>Ready to try<br /><em>something different?</em></h2>
              <div className="price-block">
                <span>Workshop fee</span>
                <strong>{CONFIG.price}</strong>
              </div>
              <div className="reserve-details">
                <span>{CONFIG.date}</span>
                <span>3 Days</span>
                <span>60 Minutes / Day</span>
                <span>Online</span>
              </div>
              <p>Choose one session time and attend that same slot for all three days.</p>
            </div>

            <div className="form-card">
              {regSubmitted ? (
                <div className="success-state">
                  <div className="success-icon"><Check size={24}/></div>
                  <div className="section-kicker">REQUEST RECEIVED</div>
                  <h3>Thank you.</h3>
                  <p>We've received your request. We'll contact you with payment and joining instructions.</p>
                  <span className="fine-print">Your registration is not confirmed until payment is received.</span>
                </div>
              ) : (
                <form onSubmit={submitRegistration}>
                  <div className="form-header">
                    <span>Step 01</span>
                    <strong>Your details</strong>
                  </div>
                  <div className="field-grid">
                    <Field label="Name" name="name" required placeholder="Your name" />
                    <Field label="Age" name="age" required type="number" min="18" placeholder="18+" />
                  </div>
                  <div className="field-grid">
                    <Field label="Phone Number" name="phone" required type="tel" placeholder="+91 ..." />
                    <Field label="Email" name="email" required type="email" placeholder="you@example.com" />
                  </div>
                  <Field label="Country" name="country" required placeholder="India" />
                  <label className="field-label">
                    Preferred Session
                    <select name="session" value={session} onChange={e => setSession(e.target.value)} required>
                      <option value="">Choose a time</option>
                      {CONFIG.sessions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>

                  <label className="check-row">
                    <input type="checkbox" required />
                    <span>I confirm that I am 18 or older.</span>
                  </label>
                  <label className="check-row">
                    <input type="checkbox" required />
                    <span>I understand this is a strictly non-sexual yoga and body-acceptance workshop.</span>
                  </label>
                  <label className="check-row">
                    <input type="checkbox" required />
                    <span>I agree to respect the privacy and boundaries of other participants.</span>
                  </label>

                  {regError && <div className="form-error">{regError}</div>}

                  <button className="btn btn-primary full" disabled={regLoading}>
                    {regLoading ? "SENDING..." : "RESERVE MY SPOT"} <ArrowRight size={17}/>
                  </button>

                  <p className="form-footnote">Your information is used only for registration and workshop communication.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="shell faq-grid">
            <div className="faq-intro">
              <div className="section-kicker">FAQ</div>
              <h2>Questions,<br /><em>answered.</em></h2>
              <p>Clear expectations create a better experience for everyone.</p>
            </div>

            <div className="faq-list">
              {faqs.map(([q, a], i) => (
                <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={q}>
                  <button
                    className="faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{q}</span>
                    <ChevronDown size={18}/>
                  </button>
                  <div className="faq-a">
                    <p>{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section question-section" id="questions">
          <div className="shell question-card">
            <div>
              <div className="section-kicker">STILL HAVE QUESTIONS?</div>
              <h2>Ask us before you <em>reserve.</em></h2>
              <p>We're happy to clarify anything about the experience.</p>
            </div>

            {questionSubmitted ? (
              <div className="question-success"><Check size={20}/> Your question has been received.</div>
            ) : (
              <form className="question-form" onSubmit={submitQuestion}>
                <Field label="Name" name="name" required placeholder="Your name" />
                <Field label="Email / Phone" name="contact" required placeholder="How should we reach you?" />
                <label className="field-label">
                  Question
                  <textarea name="question" rows="4" required placeholder="What would you like to know?"></textarea>
                </label>
                <button className="btn btn-secondary" disabled={questionLoading}>
                  {questionLoading ? "SENDING..." : "ASK MY QUESTION"} <MessageCircle size={17}/>
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="final-cta">
          <div className="final-orb"></div>
          <div className="shell final-inner">
            <div className="section-kicker">ONE SMALL STEP</div>
            <h2>Your Body. Your Practice.<br /><em>Your Journey.</em></h2>
            <p>Take three days to explore yoga, mindfulness and a different relationship with your body.</p>
            <div className="final-meta">{CONFIG.date} · {CONFIG.price} · 18+ · Beginners Welcome</div>
            <button className="btn btn-light" onClick={() => scrollTo("reserve")}>
              RESERVE MY SPOT <ArrowRight size={17}/>
            </button>
            <small>Strictly non-sexual · No recording · Respectful environment</small>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-top">
          <div className="footer-brand">
            <div className="brand footer-brand-lockup">
              <span className="brand-mark"><Leaf size={17}/></span>
              <span><strong>NATURIST YOGA</strong><small>YOGA & BODY ACCEPTANCE</small></span>
            </div>
            <p>Online yoga, mindfulness and body acceptance for adults.</p>
          </div>
          <div className="footer-links">
            <button onClick={() => scrollTo("workshop")}>Workshop</button>
            <button onClick={() => scrollTo("faq")}>FAQ</button>
            <button onClick={() => scrollTo("questions")}>Contact</button>
            <a href="/privacy-policy.html">Privacy Policy</a>
            <a href="/terms.html">Terms & Conditions</a>
            <a href="/refund-policy.html">Refund Policy</a>
            <a href="/code-of-conduct.html">Code of Conduct</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 Nudely Yoga. All rights reserved.</span>
          <span>18+ only · Strictly non-sexual yoga and wellness workshop.</span>
        </div>
      </footer>

      <button className="mobile-sticky-cta" onClick={() => scrollTo("reserve")}>{mobileCtaText} <ArrowRight size={16}/></button>
    </div>
  );
}

function TrustItem({ icon, title, text }) {
  return (
    <div className="trust-item">
      <span className="trust-icon">{icon}</span>
      <span><strong>{title}</strong><small>{text}</small></span>
    </div>
  );
}

function DayCard({ day, title, body }) {
  return (
    <article className="day-card">
      <span className="day-number">{day}</span>
      <div>
        <div className="section-kicker">DAY {day}</div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <ArrowRight size={18}/>
    </article>
  );
}

function SessionDisplay({ value }) {
  return (
    <div className="session-option" aria-label={`Workshop session: ${value}`}>
      <span>{value}</span>
      <span className="session-dot" aria-hidden="true"></span>
    </div>
  );
}

function Step({ num, title, text }) {
  return (
    <div className="step">
      <span className="step-num">{num}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Field({ label, name, required, type = "text", placeholder, min }) {
  return (
    <label className="field-label">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} min={min} />
    </label>
  );
}

createRoot(document.getElementById("root")).render(<App />);
