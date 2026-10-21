/* A touch-friendly drawer layered over the existing icon rail. */
const phoneNavigation=window.matchMedia('(max-width: 850px)');
const navigationPanel=document.querySelector('.sidebar');
navigationPanel.id='app-navigation';
navigationPanel.setAttribute('aria-label','Main navigation');
const navigationToggle=document.createElement('button');
navigationToggle.className='mobile-nav-toggle';navigationToggle.type='button';
navigationToggle.setAttribute('aria-controls','app-navigation');
navigationToggle.setAttribute('aria-expanded','false');
navigationToggle.setAttribute('aria-label','Expand navigation menu');
navigationToggle.innerHTML='<span aria-hidden="true">☰</span><span class="toggle-label">Menu</span>';
navigationPanel.querySelector('.workspace').after(navigationToggle);
const navigationShade=document.createElement('button');
navigationShade.className='mobile-nav-shade';navigationShade.type='button';
navigationShade.setAttribute('aria-label','Close navigation menu');navigationShade.hidden=true;
document.body.append(navigationShade);
function setNavigationOpen(open,focusToggle=false){
  const expanded=Boolean(open&&phoneNavigation.matches);
  navigationPanel.classList.toggle('nav-expanded',expanded);
  document.body.classList.toggle('mobile-nav-open',expanded);
  navigationToggle.setAttribute('aria-expanded',String(expanded));
  navigationToggle.setAttribute('aria-label',expanded?'Collapse navigation menu':'Expand navigation menu');
  navigationToggle.querySelector('span').textContent=expanded?'×':'☰';
  navigationToggle.querySelector('.toggle-label').textContent=expanded?'Close menu':'Menu';
  navigationShade.hidden=!expanded;
  if(focusToggle)navigationToggle.focus();
}
navigationToggle.onclick=()=>setNavigationOpen(!navigationPanel.classList.contains('nav-expanded'));
navigationShade.onclick=()=>setNavigationOpen(false,true);
// A collapsed icon's first tap reveals its label. The next tap follows the normal route.
document.addEventListener('click',event=>{
  if(!phoneNavigation.matches)return;
  const item=event.target.closest('.sidebar [data-page],.sidebar [data-feature]');
  if(!item)return;
  if(!navigationPanel.classList.contains('nav-expanded')){
    event.preventDefault();event.stopImmediatePropagation();setNavigationOpen(true);item.focus();
  }
},true);
document.addEventListener('click',event=>{
  if(phoneNavigation.matches&&event.target.closest('.sidebar [data-page],.sidebar [data-feature],.sidebar .brand'))setNavigationOpen(false);
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&navigationPanel.classList.contains('nav-expanded')){event.preventDefault();setNavigationOpen(false,true)}
  if(event.key==='Tab'&&navigationPanel.classList.contains('nav-expanded')){
    const elements=[...navigationPanel.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.getClientRects().length);
    const first=elements[0],last=elements[elements.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
});
phoneNavigation.addEventListener('change',()=>setNavigationOpen(false));
for(const item of navigationPanel.querySelectorAll('[data-page],[data-feature]')){
  const names={overview:'Overview',logbook:'My logbook',insights:'Insights',reports:'Reports',settings:'Settings & preferences',food:'Food diary',companion:'Leo companion',devices:'Devices & apps'};
  const name=names[item.dataset.page||item.dataset.feature];
  item.setAttribute('aria-label',name);item.title=name;
}
