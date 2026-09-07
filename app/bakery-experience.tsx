'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, MotionConfig, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowDown, ArrowUp, Plus, X, Menu, Pause, Play, Coffee, Sun, Wheat } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { products, drinks, type Product } from './menu-data';

const MotionEnabled = createContext(true);
const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className='', delay=0 }: {children:ReactNode; className?:string; delay?:number}) {
  const enabled = useContext(MotionEnabled);
  return <motion.div className={className} initial={enabled ? {opacity:0,y:36}:false} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.12}} transition={{duration:.85,delay:enabled?delay:0,ease}}>{children}</motion.div>;
}

function MagneticLink({children,href,className=''}:{children:ReactNode;href:string;className?:string}) {
  const enabled=useContext(MotionEnabled);
  const mx=useMotionValue(0),my=useMotionValue(0);
  const x=useSpring(mx,{stiffness:220,damping:20}),y=useSpring(my,{stiffness:220,damping:20});
  return <motion.a href={href} className={className} style={{x:enabled?x:0,y:enabled?y:0}} onPointerMove={e=>{if(!enabled||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();mx.set((e.clientX-r.left-r.width/2)*.16);my.set((e.clientY-r.top-r.height/2)*.2);}} onPointerLeave={()=>{mx.set(0);my.set(0);}} whileTap={{scale:.97}}>{children}</motion.a>;
}

function Navigation(){
  const [open,setOpen]=useState(false);
  return <header id="home" className="nav"><a href="#home" className="logo" aria-label="BRUME — на головну">brume<span>пекарня повільного ранку</span></a><nav aria-label="Основна навігація"><a href="#menu">Меню</a><a href="#story">Наш підхід</a><a href="#morning">Ранок у BRUME</a></nav><MagneticLink className="nav-cta" href="#menu">Дивитися меню <span><ArrowUpRight size={18}/></span></MagneticLink>
    <Dialog open={open} onOpenChange={setOpen}><DialogTrigger className="mobile-menu icon-button" aria-label="Відкрити навігацію"><Menu size={22}/></DialogTrigger><DialogContent className="mobile-nav-dialog" showCloseButton={false}><DialogTitle className="mobile-nav-title">brume</DialogTitle><DialogDescription className="sr-only">Навігація по пекарні BRUME</DialogDescription><DialogClose className="dialog-close" aria-label="Закрити навігацію"><X/></DialogClose><nav aria-label="Мобільна навігація">{[['Меню','#menu'],['Наш підхід','#story'],['Ранок у BRUME','#morning']].map(([label,href],i)=><a href={href} key={href} onClick={()=>setOpen(false)}><span>0{i+1}</span>{label}<ArrowUpRight/></a>)}</nav><p>Випікаємо не поспішаючи.<br/>Щоб ви теж нікуди не поспішали.</p></DialogContent></Dialog>
  </header>;
}

function Hero(){
  const enabled=useContext(MotionEnabled),ref=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
  const pastryY=useTransform(scrollYProgress,[0,1],[0,180]);
  const wordY=useTransform(scrollYProgress,[0,1],[0,-90]);
  const rotate=useTransform(scrollYProgress,[0,1],[-12,10]);
  const mx=useMotionValue(0),my=useMotionValue(0);
  const x=useSpring(mx,{stiffness:55,damping:18}),y=useSpring(my,{stiffness:55,damping:18});
  const tiltX=useTransform(y,[-35,35],[5,-5]),tiltY=useTransform(x,[-35,35],[-7,7]);
  return <section ref={ref} className="hero" onPointerMove={e=>{if(!enabled||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();mx.set((e.clientX-r.left-r.width/2)/r.width*60);my.set((e.clientY-r.top-r.height/2)/r.height*50);}} onPointerLeave={()=>{mx.set(0);my.set(0);}}>
    <div className="hero-topline"><span>РЕМІСНИЧА ПЕКАРНЯ</span><span>ЧАС ДЛЯ ХОРОШОГО РАНКУ</span></div>
    <motion.h1 className="hero-word" aria-label="BRUME" style={{y:enabled?wordY:0}}>{'BRUME'.split('').map((letter,i)=><motion.span aria-hidden="true" key={i} initial={enabled?{y:'105%',rotate:6}:false} animate={{y:0,rotate:0}} transition={{duration:1.3,delay:.1+i*.07,ease}}>{letter}</motion.span>)}</motion.h1>
    <motion.div className="hero-art" style={{y:enabled?pastryY:0,rotate:enabled?rotate:-12}} initial={enabled?{opacity:0,scale:.82}:false} animate={{opacity:1,scale:1}} transition={{duration:1.5,delay:.25,ease}}>
      <motion.div className="pastry-pointer" style={{x:enabled?x:0,y:enabled?y:0,rotateX:enabled?tiltX:0,rotateY:enabled?tiltY:0}}><div className="pastry-float"><img className="hero-pastry" src="/images/croissant.webp" alt="Великий золотавий круасан з тонкими хрусткими шарами" width="1536" height="1024" fetchPriority="high"/></div></motion.div>
    </motion.div>
    <motion.div className="hero-intro" initial={enabled?{opacity:0,y:24}:false} animate={{opacity:1,y:0}} transition={{duration:1,delay:.6,ease}}><h2>Щастя.<br/>З хрусткою скоринкою.</h2><p>Випікаємо не поспішаючи.<br/>Щоб ви теж нікуди не поспішали.</p><MagneticLink href="#menu" className="button">Дивитися меню <ArrowUpRight size={20}/></MagneticLink></motion.div>
    <motion.div className="hero-stamp" initial={enabled?{opacity:0,rotate:-25,scale:.8}:false} animate={{opacity:1,rotate:0,scale:1}} transition={{duration:1,delay:.9,ease}}><span className="stamp-top">ЗРОБЛЕНО РУКАМИ</span><Sun size={34} strokeWidth={1}/><span className="stamp-bottom">З’ЇДЕНО З ЛЮБОВ’Ю</span></motion.div>
    <div className="hero-note">Вершкове масло.<br/>Багато шарів.<br/><i>І трохи магії.</i></div>
    <a className="scroll-hint" href="#menu"><span>ГОРТАЙТЕ, ТУТ ТЕПЛО</span><ArrowDown size={22}/></a>
  </section>;
}

function Marquee(){return <div className="marquee" aria-label="Повільне тісто. Свіжий ранок. Справжнє масло."><div className="marquee-track" aria-hidden="true">{Array.from({length:4},(_,i)=><span key={i}>повільне тісто <Sun/> свіжий ранок <Sun/> справжнє масло <Sun/> </span>)}</div></div>}

function ProductCard({product,index}:{product:Product;index:number}){
  const enabled=useContext(MotionEnabled);
  return <Reveal delay={index*.07} className="product"><Dialog><DialogTrigger className="product-trigger" aria-label={`${product.name} — склад та подробиці`}><div className="product-photo"><motion.img src={`/images/${product.image}.webp`} alt={product.name} width="627" height="627" loading="lazy" whileHover={enabled?{scale:1.09,rotate:-4}:undefined} transition={{duration:.65,ease}}/><span className="product-tag">{product.note}</span><span className="product-plus"><Plus size={20}/></span></div><div className="product-info"><span className="product-french">{product.french}</span><h3>{product.name}</h3><span className="product-price">{product.price} ₴ <span>/ {product.weight}</span></span></div></DialogTrigger>
    <DialogContent className="product-dialog" showCloseButton={false}><DialogClose className="dialog-close" aria-label="Закрити подробиці"><X size={22}/></DialogClose><img src={`/images/${product.image}.webp`} alt={product.name} width="627" height="627" className="dialog-photo"/><div className="dialog-copy"><span className="product-french">{product.french}</span><DialogTitle className="dialog-title">{product.name}</DialogTitle><DialogDescription className="dialog-description">{product.description}</DialogDescription><p className="dialog-price">{product.price} ₴ <span>{product.weight}</span></p><div className="ingredients"><h4>Що всередині</h4><p>{product.ingredients}</p><h4>Алергени</h4><p>{product.allergens} Усі вироби готуються на одній кухні; можливі сліди горіхів та кунжуту.</p></div><DialogClose className="button">Повернутися до меню <ArrowUpRight size={18}/></DialogClose></div></DialogContent>
  </Dialog></Reveal>
}

function MenuSection(){return <section id="menu" className="menu-section section-shell"><Reveal><div className="section-index"><span>01 / З ПЕЧІ</span><Wheat size={20} strokeWidth={1.2}/></div><h2 className="section-title">У кожного ранку<br/>є <i>свій смак.</i></h2><p className="section-lead">Знайомтеся з тими, ради кого хочеться прокинутися раніше.</p></Reveal><Tabs defaultValue="all" className="menu-tabs"><Reveal className="menu-filter-line"><TabsList className="menu-filters" aria-label="Категорії меню"><TabsTrigger value="all">Усе улюблене <span>04</span></TabsTrigger><TabsTrigger value="pastry">Випічка</TabsTrigger><TabsTrigger value="bread">Хліб</TabsTrigger><TabsTrigger value="coffee">Кава та какао</TabsTrigger></TabsList><span className="menu-tip">Щодня. Маленькими партіями.</span></Reveal>
  <TabsContent value="all"><div className="product-grid">{products.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div></TabsContent><TabsContent value="pastry"><div className="product-grid">{products.filter(p=>p.group==='pastry').map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div></TabsContent><TabsContent value="bread"><div className="bread-selection"><ProductCard product={products[2]} index={0}/><Reveal className="bread-aside"><Wheat size={42} strokeWidth={1}/><h3>Борошно. Вода.<br/>Сіль. <i>Час.</i></h3><p>Тривала ферментація розкриває смак зерна. А гарна скоринка робить усе інше.</p></Reveal></div></TabsContent><TabsContent value="coffee"><div className="coffee-menu"><div className="coffee-menu-intro"><Coffee size={42} strokeWidth={1}/><h3>І кава.<br/><i>Обов’язково кава.</i></h3><p>До випічки, до розмови,<br/>до п’яти хвилин для себе.</p></div><div className="drink-list">{drinks.map(d=><div className="drink" key={d.name}><div><h4>{d.name} <small>{d.size}</small></h4><p>{d.detail}</p></div><span>{d.price} ₴</span></div>)}<p className="milk-note">Вівсяне молоко +20 ₴ · У молочних напоях міститься молоко, у какао можлива соя.</p></div></div></TabsContent></Tabs><div className="menu-bottom"><span>Смак кращий за будь-які слова. Натисніть на випічку, щоб дізнатися про неї більше.</span><span>Ціни в гривнях</span></div></section>}

const steps=[{number:'01',title:'Усе починається\nз простого.',body:'Якісне борошно, живе тісто та справжнє вершкове масло. Ми обираємо інгредієнти, смак яких не потрібно ховати.',label:'ТІЛЬКИ ТЕ, ЩО ТРЕБА'}, {number:'02',title:'Часу\nне шкода.',body:'Тісто відпочиває, закваска працює, смак стає глибшим. Поки місто спить, починається ваш ранок.',label:'ПОВІЛЬНЕ БРОДІННЯ'}, {number:'03',title:'Останній штрих —\nваші крихти.',body:'Ми дістаємо першу партію з печі. Ви відломуєте край, робите ковток кави. Тепер усе на своєму місці.',label:'З ПЕЧІ ДО ВАС'}];
function Story(){
  const ref=useRef<HTMLElement>(null),enabled=useContext(MotionEnabled);
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const imageY=useTransform(scrollYProgress,[0,1],[-35,35]);
  const [active,setActive]=useState(0);
  return <section className="story" id="story" ref={ref}><div className="story-grid section-shell"><div className="story-visual"><div className="story-image-frame"><motion.img src="/images/hands.webp" alt="Руки пекаря дбайливо замішують тісто на притрушеному борошном дерев'яному столі" loading="lazy" width="1024" height="1536" style={{y:enabled?imageY:0}}/><span className="photo-caption">Усе хороше потребує часу.</span></div><div className="story-photo-bottom"><span>BRUME / ЗА ЛАШТУНКАМИ</span><span>РУКИ. ТІСТО. ТЕПЛО.</span></div></div><div className="story-copy"><Reveal><h2 className="section-title">Не квапити.<br/><i>Відчувати.</i></h2><p className="story-preface">Наш головний інгредієнт не знайти на полиці. Це увага до простих речей.</p></Reveal><div className="story-steps">{steps.map((step,i)=><motion.article key={step.number} className={`story-step ${active===i?'is-active':''}`} onViewportEnter={()=>setActive(i)} viewport={{amount:.55,margin:'-10% 0px -15% 0px'}}><span className="step-number">{step.number}</span><Reveal><h3>{step.title.split('\n').map((line,k)=><span key={k}>{line}{k===0&&<br/>}</span>)}</h3><p>{step.body}</p><span className="step-label">{step.label}</span></Reveal></motion.article>)}</div></div></div></section>;
}

function Morning(){
  const enabled=useContext(MotionEnabled),ref=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const x=useTransform(scrollYProgress,[0,1],[-65,65]);
  return <section id="morning" ref={ref} className="morning section-shell"><Reveal><Sun className="morning-sun" size={56} strokeWidth={1}/><p className="morning-prelude">У світі, який вічно поспішає,</p><h2>побудьте<br/><i>ще трохи.</i></h2><p className="morning-description">Теплий хліб. Улюблена кава. Жодних великих планів.<br/>Іноді для гарного дня потрібно саме стільки.</p><MagneticLink className="button" href="#menu">Дивитися меню <ArrowUpRight size={20}/></MagneticLink></Reveal><motion.div className="morning-handwritten" style={{x:enabled?x:0}}>à demain, з любов’ю</motion.div></section>
}

function Footer(){return <footer className="footer"><div className="footer-top"><p>У гарного ранку<br/>є ім’я.</p><a className="back-top" href="#home">Нагору <ArrowUp size={18}/></a></div><a href="#home" className="footer-word" aria-label="BRUME — повернутися нагору">brume<span>®</span></a><div className="footer-bottom"><span>© BRUME 2026</span><span>Концепція пекарні. Меню та ціни — частина дизайн-проєкту.</span><span>Зроблено з теплом.</span></div></footer>}

export default function BakeryExperience(){
  const systemReduced=useReducedMotion(),[paused,setPaused]=useState(false);
  const enabled=!systemReduced&&!paused;
  const {scrollYProgress}=useScroll();
  const progress=useSpring(scrollYProgress,{stiffness:120,damping:30});
  useEffect(()=>{try{setPaused(localStorage.getItem('brume-motion')==='paused');}catch{}},[]);
  useEffect(()=>{document.documentElement.dataset.motion=enabled?'on':'off';return()=>{delete document.documentElement.dataset.motion}},[enabled]);
  const toggleMotion=()=>setPaused(value=>{try{localStorage.setItem('brume-motion',value?'playing':'paused')}catch{}return !value});
  return <MotionEnabled.Provider value={enabled}><MotionConfig reducedMotion={enabled?'never':'always'} transition={{ease}}><a className="skip-link" href="#menu">Перейти до меню</a><motion.div className="reading-progress" style={{scaleX:enabled?progress:scrollYProgress}} aria-hidden="true"/><Navigation/><main><Hero/><Marquee/><MenuSection/><Story/><Morning/></main><Footer/><button className="motion-toggle" onClick={toggleMotion} aria-label={enabled?'Зупинити анімацію':'Увімкнути анімацію'} aria-pressed={!enabled} disabled={!!systemReduced} title={systemReduced?'Зменшення руху увімкнено в налаштуваннях пристрою':enabled?'Зупинити анімацію':'Увімкнути анімацію'}>{enabled?<Pause size={13}/>:<Play size={13}/>}<span>{enabled?'Рух увл.':'Спокійний режим'}</span></button></MotionConfig></MotionEnabled.Provider>
}
