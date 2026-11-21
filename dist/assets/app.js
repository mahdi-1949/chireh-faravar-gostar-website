(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],fa=n=>Number(n).toLocaleString('fa-IR');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=s=>String(s).replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/[\u200c\u200d]/g,' ').toLowerCase();
let selections=[];try{selections=JSON.parse(localStorage.getItem('chireh-compare')||'[]').filter(id=>PRODUCTS.some(p=>p.id===id)).slice(0,3)}catch{}
let toastTimer;function toast(t){const e=$('.toast');e.textContent=t;e.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('visible'),3200)}
const menu=$('.menu-toggle'),mobile=$('.mobile-nav');const menuIcon=open=>open?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';function closeMenu(){document.body.classList.remove('menu-open');mobile.inert=true;menu.classList.remove('is-open');menu.innerHTML=menuIcon(false);menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','باز کردن منو')}
menu.addEventListener('click',()=>{let opened=document.body.classList.toggle('menu-open');mobile.inert=!opened;if(opened)mobile.style.top=document.querySelector('header').getBoundingClientRect().bottom+'px';menu.classList.toggle('is-open',opened);menu.innerHTML=menuIcon(opened);menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'بستن منو':'باز کردن منو')});
window.addEventListener('resize',()=>{if(innerWidth>1000)closeMenu()});
const mt=$('#mega-toggle'),mp=$('.mega-parent'),mega=$('.mega');
function prepareMegaMenus(){
 if(mega&&$('.mega-intro')&&$('.mega-links')&&!mega.querySelector('.mega-products')){
  mega.classList.add('mega-enhanced');
  mt.setAttribute('aria-controls','mega-panel');
  mega.id='mega-panel';
  const intro=$('.mega-intro',mega);
  const metrics=document.createElement('div');
  metrics.className='mega-metrics';
  metrics.innerHTML='<span><b>'+fa(PRODUCTS.length)+'</b><small>مدل تجهیز</small></span><span><b>'+fa($('.mega-links a',mega).length)+'</b><small>گروه محصول</small></span>';
  intro.appendChild(metrics);
  const aliases={'cjc-200':'سنگ‌شکن فکی','crp-600':'آسیاب رینگی پنوماتیکی','cspi':'آزمون آسیاشوندگی'};
  const featured=['cjc-200','crp-600','cspi'].map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  const shelf=document.createElement('aside');
  shelf.className='mega-products';
  shelf.innerHTML='<div class="mega-products-head"><span>دستگاه‌های منتخب</span><a href="/products/">همه دستگاه‌ها</a></div>'+featured.map(p=>'<a class="mega-product-card" href="/products/'+esc(p.id)+'/"><span class="mega-product-thumb"><img src="'+esc(p.image)+'" alt="" loading="lazy"></span><span class="mega-product-copy"><small dir="ltr">'+esc(p.model)+'</small><b>'+esc(aliases[p.id]||p.name)+'</b></span><i aria-hidden="true">↖</i></a>').join('');
  mega.appendChild(shelf);
  const foot=document.createElement('div');
  foot.className='mega-foot';
  foot.innerHTML='<span><b>راهنمای انتخاب تجهیزات</b><small>براساس نوع نمونه، ظرفیت و دانه‌بندی هدف</small></span><a href="/quote/">مشاوره با کارشناس <i aria-hidden="true">↖</i></a>';
  mega.appendChild(foot);
 }
 if(mobile&&!mobile.querySelector('.mobile-menu-inner')){
  const original=Array.from(mobile.querySelectorAll(':scope > a'));
  const source=path=>original.find(a=>a.pathname===path);
  const copyLink=(path,className)=>{
   const a=source(path);
   if(!a)return '';
   const clone=a.cloneNode(true);
   if(className)clone.classList.add(className);
   return clone.outerHTML;
  };
  const topic=item=>'<a class="mobile-menu-topic" href="'+esc(item[0])+'"><span><b>'+esc(item[1])+'</b><small>'+esc(item[2])+'</small></span><i aria-hidden="true">↖</i></a>';
  const categories=$('.mega-links > a').map(a=>{const clone=a.cloneNode(true);clone.classList.add('mobile-category-card');return clone.outerHTML}).join('');
  const solutions=[
   ['/solutions/','همه راهکارها','مرور مسیرهای تجهیز آزمایشگاه'],
   ['/solutions/sample-lab/','آزمایشگاه آماده‌سازی نمونه','از خردایش اولیه تا تقسیم نمونه'],
   ['/solutions/grindability/','مطالعات آسیاشوندگی','بررسی رفتار نمونه در آسیاکنی'],
   ['/solutions/gravity/','آزمایشگاه جدایش ثقلی','ارزیابی تجهیزات و آزمون‌های ثقلی'],
   ['/solutions/flotation/','مطالعات فلوتاسیون','آماده‌سازی برای بررسی فرآیند']
  ].map(topic).join('');
  const articles=[
   ['/knowledge/','همه مطالب دانشنامه','راهنماها و نکته‌های فنی'],
   ['/knowledge/choose-mill/','راهنمای انتخاب آسیاب آزمایشگاهی','انتخاب مدل براساس هدف آزمون'],
   ['/knowledge/crusher-guide/','پیش از خرید سنگ‌شکن فکی چه بپرسیم؟','نکات مهم در انتخاب سنگ‌شکن'],
   ['/knowledge/cspi-guide/','آزمون آسیاشوندگی با دستگاه CSPI','آشنایی با مسیر انجام آزمون'],
   ['/knowledge/gravity-guide/','میز لرزان یا تغلیظ‌کننده گریز از مرکز؟','مقایسه دو روش جدایش ثقلی'],
   ['/knowledge/maintenance/','چک‌لیست نگهداری تجهیزات آزمایشگاه','بازبینی‌های دوره‌ای دستگاه‌ها'],
   ['/knowledge/sample-preparation/','خطاهای رایج در آماده‌سازی نمونه','کاهش خطا پیش از آزمون']
  ].map(topic).join('');
  const quick=[['/services/','mobile-menu-quick'],['/projects/','mobile-menu-quick'],['/catalog/','mobile-menu-quick'],['/about/','mobile-menu-quick'],['/contact/','mobile-menu-quick']].map(x=>copyLink(x[0],x[1])).join('');
  mobile.innerHTML='<div class="mobile-menu-inner"><div class="mobile-menu-top"><span><i></i><i></i><i></i> چیره فرآور گستر</span>'+copyLink('/','mobile-menu-home')+'</div><div class="mobile-menu-intro"><span>دسترسی سریع</span><h2>مسیر مناسب را پیدا کنید</h2><p>تجهیزات، راهکارها و دانش فنی در یک منو.</p></div><button type="button" class="mobile-menu-search search-open" aria-label="جست‌وجو در تجهیزات"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><span><b>جست‌وجوی تجهیزات</b><small>نام دستگاه، مدل یا کاربرد</small></span><i aria-hidden="true">⌕</i></button><div class="mobile-menu-groups"><details class="mobile-menu-group mobile-menu-products" open><summary><span><b>تجهیزات و محصولات</b><small>دسته‌بندی و مدل‌های دستگاه</small></span><i aria-hidden="true">+</i></summary><div class="mobile-menu-categories">'+categories+'</div><a class="mobile-menu-all" href="/products/">مشاهده همه محصولات <i aria-hidden="true">↖</i></a></details><details class="mobile-menu-group"><summary><span><b>راهکارهای فرآوری</b><small>انتخاب مسیر متناسب با آزمون</small></span><i aria-hidden="true">+</i></summary><div class="mobile-menu-topics">'+solutions+'</div></details><details class="mobile-menu-group"><summary><span><b>دانشنامه فنی</b><small>راهنماها و مطالب کاربردی</small></span><i aria-hidden="true">+</i></summary><div class="mobile-menu-topics">'+articles+'</div></details></div><div class="mobile-menu-quicklinks">'+quick+'</div><div class="mobile-menu-actions">'+copyLink('/quote/','mobile-menu-quote')+'<a class="mobile-menu-phone" href="tel:02155448318"><span>تماس مستقیم با چیره</span><b dir="ltr">۰۲۱ ـ ۵۵۴۴۸۳۱۸</b></a></div><p class="mobile-menu-note">مهندسی فرآوری، از نمونه تا نتیجه</p></div>';
 }
}
prepareMegaMenus();
mt.addEventListener('click',()=>{const o=mp.classList.toggle('open');mt.setAttribute('aria-expanded',String(o))});mp.addEventListener('mouseenter',()=>mt.setAttribute('aria-expanded','true'));mp.addEventListener('mouseleave',()=>{if(!mp.classList.contains('open'))mt.setAttribute('aria-expanded','false')});mp.addEventListener('focusin',()=>mt.setAttribute('aria-expanded','true'));mp.addEventListener('focusout',e=>{if(!mp.contains(e.relatedTarget)&&!mp.classList.contains('open'))mt.setAttribute('aria-expanded','false')});document.addEventListener('click',e=>{if(!mp.contains(e.target)){mp.classList.remove('open');mt.setAttribute('aria-expanded','false')}});
$$('.nav nav>a').forEach(a=>{const path=new URL(a.href).pathname;if((path==='/'&&location.pathname==='/')||(path!=='/'&&location.pathname.startsWith(path))){a.classList.add('active');a.setAttribute('aria-current','page')}});
const sd=$('#search-dialog');$$('.search-open').forEach(b=>b.onclick=()=>{closeMenu();sd.showModal();setTimeout(()=>$('#global-search').focus(),20)});$('.search-close').onclick=()=>sd.close();sd.addEventListener('click',e=>{if(e.target===sd){const r=sd.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)sd.close()}});
$('#global-search').addEventListener('input',e=>{const q=normalize(e.target.value.trim());const matches=q?PRODUCTS.filter(p=>normalize(p.name+' '+p.model+' '+CATEGORIES[p.cat][0]).includes(q)):[];$('#search-results').innerHTML=q?(matches.length?matches.slice(0,12).map(p=>`<a href="/products/${p.id}/"><img src="${p.image}" alt=""><span><b>${esc(p.name)}</b><small>${p.model}</small></span></a>`).join(''):'<p>دستگاهی پیدا نشد. عبارت دیگری را امتحان کنید یا <a href="/quote/">مشاوره بگیرید.</a></p>'):'<p>نام دستگاه یا مدل موردنظرتان را بنویسید.</p>'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();mp.classList.remove('open');mt.setAttribute('aria-expanded','false')}if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();sd.showModal();$('#global-search').focus()}});
function persist(){try{localStorage.setItem('chireh-compare',JSON.stringify(selections))}catch{}updateComparison()}
function updateComparison(){const tray=$('.compare-tray');tray.hidden=!selections.length||location.pathname==='/compare/';$$('.compare-count').forEach(e=>e.textContent=fa(selections.length));$$('[data-compare]').forEach(b=>{const selected=selections.includes(b.dataset.compare);b.setAttribute('aria-pressed',String(selected));if(b.classList.contains('outline'))b.innerHTML=selected?'حذف از مقایسه':'افزودن به مقایسه'});if($('#compare-content'))renderComparison()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-compare]');if(b){const id=b.dataset.compare;if(selections.includes(id)){selections=selections.filter(x=>x!==id);toast('دستگاه از مقایسه حذف شد.')}else if(selections.length<3){selections.push(id);toast('دستگاه به مقایسه اضافه شد.')}else{toast('برای مقایسه، حداکثر سه دستگاه انتخاب کنید.');return}persist()}
if(e.target.closest('.compare-clear')){selections=[];persist();toast('انتخاب‌های مقایسه پاک شدند.')}
const r=e.target.closest('[data-remove]');if(r){selections=selections.filter(x=>x!==r.dataset.remove);persist()}});
function renderComparison(){const root=$('#compare-content'),list=selections.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);if(!list.length){root.innerHTML='<div class="empty-state"><h2>هنوز دستگاهی انتخاب نکرده‌اید.</h2><p>در کاتالوگ، دکمه مقایسه بالای تصویر هر دستگاه را انتخاب کنید.</p><a class="btn primary" href="/products/">انتخاب دستگاه</a></div>';return}
const keys=[...new Set(list.flatMap(p=>Object.keys(p.specs)))];root.innerHTML=`${list.length===1?'<p class="note">برای مقایسه، یک یا دو دستگاه دیگر از کاتالوگ انتخاب کنید.</p>':''}${new Set(list.map(p=>p.cat)).size>1?'<p class="note">دستگاه‌های انتخاب‌شده از گروه‌های متفاوت‌اند. کاربرد هر دستگاه را در تفسیر مشخصات در نظر بگیرید.</p>':''}<div class="table-scroll"><table class="compare-table"><thead><tr><th scope="col">دستگاه‌های انتخابی</th>${list.map(p=>`<td><a href="/products/${p.id}/"><img src="${p.image}" alt="${esc(p.name)}"><h2>${esc(p.name)}</h2><b dir="ltr">${p.model}</b></a><button class="remove-compare" data-remove="${p.id}">حذف از مقایسه</button></td>`).join('')}</tr></thead><tbody>${keys.map(k=>`<tr><th scope="row">${esc(k)}</th>${list.map(p=>`<td>${esc(p.specs[k]||'در مشخصات این مدل درج نشده')}</td>`).join('')}</tr>`).join('')}<tr><th scope="row">بررسی سفارش</th>${list.map(p=>`<td><a class="btn primary" href="/quote/?product=${p.id}">درخواست پیش‌فاکتور</a></td>`).join('')}</tr></tbody></table></div>`}
updateComparison();window.addEventListener('storage',e=>{if(e.key==='chireh-compare'){try{selections=JSON.parse(e.newValue||'[]');updateComparison()}catch{}}});
// Product catalog filters and ordering
if($('#product-search')){let active='all';const ps=$('#product-search'),allCards=$$('.catalog-grid .product-card'),sort=$('#product-sort');function filter(){const q=normalize(ps.value.trim());let count=0;allCards.forEach(c=>{const show=(active==='all'||c.dataset.cat===active)&&normalize(c.dataset.search).includes(q);c.hidden=!show;if(show)count++});$('#results-count').textContent=fa(count)+' دستگاه';$('#no-products').hidden=count>0;$$('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter===active);b.setAttribute('aria-pressed',String(b.dataset.filter===active))})}const param=new URLSearchParams(location.search).get('category');if(CATEGORIES[param])active=param;filter();$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;const u=new URL(location.href);active==='all'?u.searchParams.delete('category'):u.searchParams.set('category',active);history.replaceState(null,'',u);filter()}));ps.addEventListener('input',filter);sort.addEventListener('change',()=>{const mode=sort.value;let sorted=[...allCards];if(mode!=='default')sorted.sort((a,b)=>(mode==='name'?a.dataset.search:a.querySelector('.model').textContent).localeCompare(mode==='name'?b.dataset.search:b.querySelector('.model').textContent,'fa'));sorted.forEach(c=>$('.catalog-grid').append(c))});$('#reset-filters').onclick=()=>{active='all';ps.value='';history.replaceState(null,'',location.pathname);filter()}}
// Real browser-native email preparation; no simulated submission
const form=$('#quote-form');if(form){const params=new URLSearchParams(location.search);if(PRODUCTS.some(p=>p.id===params.get('product')))form.elements.product.value=params.get('product');if(params.has('service')){const names=['انتخاب و پیکربندی تجهیزات','نصب و راه‌اندازی','آموزش بهره‌برداری','تأمین قطعات یدکی'];form.elements.message.value='درخواست '+(names[Number(params.get('service'))]||'خدمات فنی')+'\n'}if(params.has('solution')){const sol={'sample-lab':'آزمایشگاه آماده‌سازی نمونه','grindability':'مطالعات آسیاشوندگی','gravity':'آزمایشگاه جدایش ثقلی','flotation':'مطالعات فلوتاسیون'};if(sol[params.get('solution')])form.elements.message.value='درخواست بررسی راهکار '+sol[params.get('solution')]+'\n'}
function text(){const d=new FormData(form),p=PRODUCTS.find(p=>p.id===d.get('product'));return 'درخواست مشاوره و پیش‌فاکتور\n\n'+[['نام و نام خانوادگی',d.get('name')],['شرکت',d.get('company')],['شماره تماس',d.get('phone')],['ایمیل',d.get('email')],['دستگاه',p?p.name:'نیازمند مشاوره در انتخاب'],['نوع نمونه',d.get('material')],['ظرفیت / تعداد نمونه',d.get('capacity')],['ابعاد خوراک',d.get('feed')],['دانه‌بندی هدف',d.get('output')],['شرح درخواست',d.get('message')]].filter(x=>x[1]).map(x=>x[0]+': '+x[1]).join('\n')}
function result(t){$('#quote-result').hidden=false;$('#quote-result textarea').value=t}
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const t=text();result(t);const a=document.createElement('a');a.href='mailto:sales@chirehfg.com?subject='+encodeURIComponent('درخواست مشاوره و پیش‌فاکتور تجهیزات')+'&body='+encodeURIComponent(t);a.click();toast('متن درخواست آماده شد؛ ارسال را در برنامه ایمیل تأیید کنید.');$('#quote-result').scrollIntoView({behavior:'smooth',block:'center'})});$('#download-quote').onclick=()=>{if(!form.reportValidity())return;const t=text();result(t);const url=URL.createObjectURL(new Blob(['\ufeff'+t],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='chireh-quote-request.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('متن درخواست دانلود شد.')};$('#copy-quote').onclick=async()=>{try{await navigator.clipboard.writeText($('#quote-result textarea').value);toast('متن درخواست کپی شد.')}catch{$('#quote-result textarea').select();document.execCommand('copy');toast('متن درخواست انتخاب شد.')}}}

function enhanceFooter(){
 const footer=$('footer');
 const grid=footer&&$('.footer-grid',footer);
 if(!footer||!grid||footer.classList.contains('footer-enhanced'))return;
 footer.classList.add('footer-enhanced');
 const cta=document.createElement('div');
 cta.className='wrap footer-cta';
 cta.innerHTML='<div class="footer-cta-copy"><span class="footer-kicker">همراه فنی چیره</span><h2>برای انتخاب دستگاه، از نیاز آزمایشگاه شروع کنیم.</h2><p>نوع نمونه، ظرفیت و هدف آزمون را بگویید تا تجهیزات متناسب را بررسی کنیم.</p></div><div class="footer-cta-actions"><a class="btn primary" href="/quote/">درخواست مشاوره فنی <i aria-hidden="true">↖</i></a><a class="footer-cta-secondary" href="/products/">مرور تجهیزات <i aria-hidden="true">↖</i></a></div>';
 footer.insertBefore(cta,grid);
 const columns=Array.from(grid.children).slice(1);
 const descriptions=['صفحات شرکت و ارتباط','گروه‌های اصلی دستگاه‌ها','راهنماها و ابزارهای انتخاب'];
 const mobileNav=document.createElement('nav');
 mobileNav.className='wrap footer-mobile-links';
 mobileNav.setAttribute('aria-label','پیوندهای بخش‌های سایت');
 mobileNav.innerHTML=columns.map((column,index)=>{
  const title=column.querySelector('h3');
  const links=Array.from(column.querySelectorAll(':scope > a')).map(a=>{const clone=a.cloneNode(true);clone.classList.add('footer-mobile-link');return clone.outerHTML}).join('');
  return '<details class="footer-mobile-group"><summary><span><b>'+esc(title?title.textContent.trim():'پیوندهای سایت')+'</b><small>'+descriptions[index]+'</small></span><i aria-hidden="true">+</i></summary><div class="footer-mobile-link-list">'+links+'</div></details>';
 }).join('');
 const bottom=$('.footer-bottom',footer);
 if(bottom)footer.insertBefore(mobileNav,bottom);else footer.appendChild(mobileNav);
 const mobileQuote=$('.mobile-quote');
 if(mobileQuote&&'IntersectionObserver'in window){
  new IntersectionObserver(entries=>document.body.classList.toggle('footer-visible',entries[0].isIntersecting),{threshold:.03}).observe(footer);
 }
}
enhanceFooter();
const imageDialog=$('#image-dialog');if(imageDialog){$('.zoom-product').onclick=()=>imageDialog.showModal();$('.image-close').onclick=()=>imageDialog.close()}
})();
