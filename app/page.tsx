'use client';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog';
const asset = (name: string) => `/assets/${name}.png`;
const labels = ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'];
const weddingTime = new Date('2026-11-14T11:00:00+05:30').getTime();
function remaining() {
  const seconds = Math.max(0, Math.floor((weddingTime - Date.now()) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
}
function Fade({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return <div className={`fade-up ${className}`} style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}
function Countdown() {
  const [time, setTime] = useState([0, 0, 0, 0]);
  useEffect(() => { setTime(remaining()); const interval = setInterval(() => setTime(remaining()), 1000); return () => clearInterval(interval); }, []);
  return <div className="countdown" aria-label="Wedding countdown">{labels.map((label, i) => <div className="count-unit" key={label}><div className="count-tile"><span key={time[i]}>{String(time[i]).padStart(2, '0')}</span></div><span className="count-label">{label}</span></div>)}</div>;
}
function Wishes() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('full_name') || '').trim();
    const wishes = String(data.get('wishes') || '').trim();
    if (!name || !wishes) { setError('Please enter your name and wishes.'); return; }
    try {
      const entries = JSON.parse(localStorage.getItem('mnm-wishes') || '[]');
      localStorage.setItem('mnm-wishes', JSON.stringify([...entries, { name, wishes, createdAt: new Date().toISOString() }]));
      setSaved(true); setError('');
    } catch { setError('Your wishes could not be saved on this device. Please try again.'); }
  }
  return <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (value) { setSaved(false); setError(''); } }}>
    <DialogTrigger className="invitation-button primary"><Heart size={16} strokeWidth={1.5} />SEND YOUR WISHES</DialogTrigger>
    <DialogContent className="wishes-dialog" showCloseButton={false}>
      <div className="dialog-ornament" aria-hidden="true"><span /><i /><span /></div>
      <DialogTitle className="wishes-title">{saved ? 'Thank You for Your Wishes' : 'Send Your Wishes'}</DialogTitle>
      <DialogDescription className="wishes-description">{saved ? 'Your blessing has been saved on this device.' : 'A blessing from you means the world to us.'}</DialogDescription>
      {saved ? <div className="wishes-success"><Heart size={28} strokeWidth={1.2} /><p>This preview saves wishes locally; they are not sent to the couple.</p><DialogClose className="invitation-button primary">CLOSE</DialogClose></div> : <form onSubmit={submit} className="wishes-form">
        <div><label htmlFor="full-name">FULL NAME</label><input id="full-name" name="full_name" autoComplete="name" maxLength={80} placeholder="Your name" required /></div>
        <div><label htmlFor="wishes">YOUR WISHES</label><textarea id="wishes" name="wishes" rows={5} maxLength={1000} placeholder="Write your blessings for the couple…" required /></div>
        {error && <p role="alert" className="form-error">{error}</p>}
        <div className="form-actions"><button type="submit" className="invitation-button primary">SEND WISHES</button><DialogClose className="invitation-button">CLOSE</DialogClose></div>
      </form>}
    </DialogContent>
  </Dialog>;
}
function Envelope() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.18 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} className={`envelope ${visible ? 'revealed' : ''}`} aria-label="Save the date keepsake"><div className="envelope-scene">
    <img className="envelope-layer envelope-back" src={asset('envelope-back')} alt="" />
    <div className="envelope-piece tilted"><img src={asset('envelope-photo-tilt')} alt="Mashoor and Mirza" /></div>
    <div className="envelope-piece oval"><img src={asset('envelope-photo-oval')} alt="Mashoor and Mirza" /></div>
    <div className="envelope-piece badge"><img src={asset('envelope-badge')} alt="Mashoor & Mirza" /></div>
    <div className="envelope-piece date-card"><img src={asset('envelope-card')} alt="Save the Date 25.07.26" /></div>
    <img className="envelope-layer envelope-front" src={asset('envelope-front')} alt="" />
  </div></section>;
}
export default function Invitation() {
  return <main className="paper-bg"><h1 className="sr-only">Nihal & Aqila — Wedding Invitation</h1>
    <div className="petals" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <span key={i} style={{ left: `${(i * 37 + 16) % 100}%`, width: `${9 + i % 9}px`, height: `${6 + i % 5}px`, animationDelay: `${(i * 1.7) % 12}s`, animationDuration: `${15 + i % 12}s` } as CSSProperties} />)}</div>
    <div className="invitation">
      <Fade delay={300} className="monogram"><img src={asset('logo-2')} alt="Mashoor & Mirza monogram" /></Fade>
      <Fade delay={600} className="groom-parents"><p>ADV. NIHAL BIN NOUSHAD<br />S/O Adv. PC NOUSHAD & Mrs. FATHIMA SHYMA</p></Fade>
      <Fade delay={900} className="names"><img src={asset('names')} alt="Mashoor & Mirza" /></Fade>
      <Fade delay={1200} className="bride-parents"><p>ADV. AQILA SHERIN<br />D/O MUJEEB C K & Mrs. FOUSIYA K K</p></Fade>
      <Fade delay={1500} className="portrait"><div className="portrait-frame"><div className="portrait-ring inner" /><div className="portrait-ring outer" /><div className="portrait-crop calligraphy-crop"><img src="/assets/arabic-monogram.jpg" alt="Nihal & Aqila Arabic calligraphy monogram" /></div></div></Fade>
      <div className="lace-panel"><img className="lace-art" src={asset('lace3')} alt="" aria-hidden="true" /><div className="event-content">
        <Fade delay={1800} className="event-date"><img src={asset('date')} alt="July 25, 2026" /></Fade>
        <Fade delay={2100} className="nikkah-details"><p className="event-copy">NIKKAH ON NOV 14, 2026 AT <span className="time">11:00</span> AM,<br />TOWN BANK AUDITORIUM, THALASSERY</p></Fade>
        <Fade delay={2200} className="location"><a className="invitation-button" href="https://www.google.com/maps/search/?api=1&query=Town+Bank+Auditorium+Thalassery" target="_blank" rel="noopener noreferrer"><MapPin size={16} strokeWidth={1.5} />NIKKAH LOCATION</a></Fade>
        <Fade delay={2700} className="countdown-wrap"><Countdown /></Fade>
      </div></div>
      <Fade delay={3150} className="wishes-section"><Wishes /><p className="honour-text">We would be honoured by your presence and prayers as we begin this new chapter.</p><p>WE SEEK YOUR DUAS AND WARMLY<br />INVITE YOU TO CELEBRATE THIS<br />SPECIAL OCCASION WITH US.</p></Fade>
      <Fade delay={3150} className="dua"><img src={asset('dua')} alt="Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fee khair" /></Fade>
      <Envelope />
      <Fade delay={3300} className="credit"><a href="https://www.instagram.com/loymir_?igsh=MWs1am9rbDBlbWdsMQ==" target="_blank" rel="noopener noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><path d="M17.5 6.5h.01" /></svg>@LOYMIR E-INVITES</a></Fade>
    </div>
  </main>;
}
