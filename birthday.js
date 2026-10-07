const birthday = document.querySelector('#birthday-experience');
const shop = document.querySelector('#main-shop');
const startButton = document.querySelector('#start-birthday');
const screens = [...document.querySelectorAll('.birthday-screen')];
const laugh = document.querySelector('#laugh-audio');
const song = document.querySelector('#birthday-song');
const akiSioni = document.querySelector('#aki-sioni-song');
const openingMusic = document.querySelector('#birthday-opening-music');
const congratsBurst = document.querySelector('#congrats-burst');
const puzzleData = [
  { answer: '7 October', choices: ['7 October','8 August','14 February','Jabez forgot'], prompt: 'When is your birthday?' },
  { answer: 'Ice cream shop', choices: ['Ice cream shop','Hardware shop','A secret government office','Jabez\'s imaginary restaurant'], prompt: 'Where did Jabez last take you for ice cream?' },
  { answer: 'Jabez', choices: ['The government','A secret admirer','Jabez','A confused AI'], prompt: 'Who sent this gift?' }
];
let puzzleStep = 0;
let beads = 0;
let prankTimer;

function showScreen(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
}
function sparkleBurst(count=35){
  const layer=document.querySelector('#confetti');
  for(let i=0;i<count;i++){
    const piece=document.createElement('i');
    piece.style.left=(35+Math.random()*30)+'%';
    piece.style.top=(25+Math.random()*20)+'%';
    piece.style.setProperty('--dx',(Math.random()*2-1)*260+'px');
    piece.style.setProperty('--dy',(Math.random()*2-1)*360+'px');
    piece.style.setProperty('--r',(Math.random()*720-360)+'deg');
    piece.textContent=['✦','•','◆','●'][Math.floor(Math.random()*4)];
    layer.appendChild(piece);
    setTimeout(()=>piece.remove(),1600);
  }
}
function renderPuzzle(){
  const q=puzzleData[puzzleStep];
  document.querySelector('#puzzle-prompt').textContent=q.prompt;
  const box=document.querySelector('#puzzle-choices');
  box.innerHTML=q.choices.map(choice=>`<button class="choice" data-answer="${choice.replace(/"/g,'&quot;')}">${choice}</button>`).join('');
}
function begin(){
  birthday.classList.add('started');
  showScreen('birthday-welcome');
  sparkleBurst(95);
  congratsBurst.classList.add('show');
  setTimeout(()=>congratsBurst.classList.remove('show'),2400);
  openingMusic.currentTime=0;
  openingMusic.volume=0.34;
  openingMusic.play().catch(()=>{});
  laugh.muted=true; laugh.play().then(()=>{laugh.pause();laugh.currentTime=0;laugh.muted=false;}).catch(()=>{laugh.muted=false;});
  startButton.disabled=true;
  setTimeout(()=>showScreen('birthday-puzzle'),2500);
  renderPuzzle();
}
startButton.addEventListener('click',begin);

document.querySelector('#puzzle-choices').addEventListener('click',e=>{
  if(!e.target.matches('.choice')) return;
  const correct=e.target.dataset.answer===puzzleData[puzzleStep].answer;
  if(!correct){
    e.target.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:220});
    document.querySelector('#puzzle-note').textContent='Nope. Try again. I know you know this.';
    return;
  }
  document.querySelector('#puzzle-note').textContent='Correct.';
  sparkleBurst(20);
  puzzleStep++;
  if(puzzleStep<puzzleData.length){
    setTimeout(()=>{document.querySelector('#puzzle-note').textContent='';renderPuzzle();},500);
  }else{
    setTimeout(()=>{showScreen('birthday-game');setupGame();},650);
  }
});

function setupGame(){
  beads=0;
  const field=document.querySelector('#bead-field');
  field.innerHTML='';
  document.querySelector('#bead-score').textContent='0 / 7';
  for(let i=0;i<7;i++){
    const b=document.createElement('button');
    b.className='game-bead';
    b.setAttribute('aria-label','Collect bead');
    b.style.left=(8+Math.random()*78)+'%';
    b.style.top=(8+Math.random()*72)+'%';
    b.style.animationDelay=(Math.random()*1.5)+'s';
    b.addEventListener('click',()=>{
      if(b.disabled) return;
      b.disabled=true; b.classList.add('caught'); beads++;
      document.querySelector('#bead-score').textContent=`${beads} / 7`;
      sparkleBurst(7);
      if(beads===7) setTimeout(()=>showScreen('birthday-gift'),700);
    });
    field.appendChild(b);
  }
}

document.querySelector('#open-gift').addEventListener('click',()=>{
  sparkleBurst(110);
  openingMusic.pause();
  openingMusic.currentTime=0;
  song.currentTime=0;
  song.volume=0.9;
  song.play().catch(()=>{});
  document.querySelector('#gift-box').classList.add('opened');
  setTimeout(()=>{
    shop.classList.add('revealed');
    document.querySelector('#birthday-experience').classList.add('hidden');
    startPrankTimer();
  },1300);
});

function startPrankTimer(){
  clearTimeout(prankTimer);
  prankTimer=setTimeout(()=>{
    shop.classList.add('prank');
    laugh.currentTime=0;
    laugh.play().catch(()=>{});
    setTimeout(()=>document.querySelector('#prank-message').classList.add('show'),1900);
    setTimeout(()=>{
    },10500);
    setTimeout(()=>{ shop.classList.remove('prank'); document.querySelector('#prank-message').classList.remove('show','final-song'); song.pause(); song.currentTime=0; startDreamBook(); },22000);
  },35000);
}

// Make the final birthday tune available after the user's first tap.
song.addEventListener('ended',()=>{ song.pause(); song.currentTime=0; });
window.addEventListener('beforeunload',()=>{ clearTimeout(prankTimer); openingMusic.pause(); song.pause(); });


// --- Imani's little dream book ---
const dreamExperience = document.querySelector('#dream-experience');
const dreamQuestion = document.querySelector('#dream-question');
const dreamHint = document.querySelector('#dream-hint');
const dreamAnswer = document.querySelector('#dream-answer');
const dreamNext = document.querySelector('#dream-next');
const dreamProgress = document.querySelector('#dream-progress');
const dreamFinish = document.querySelector('#dream-finish');
const dreamDone = document.querySelector('#dream-done');
const dreamPrincess = document.querySelector('.dream-princess');

const dreamQuestions = [
  { prompt:'If money was no problem at all, where would you love to go?', hint:'Pick the place that makes you want to pack a bag immediately.', type:'choices', options:['Coast / Diani','Serengeti','Pwani','Samburu','Somewhere else'] },
  { prompt:'What is one dream you would really love to make come true?', hint:'You can write it exactly the way you think about it.', type:'text', placeholder:'My dream is...' },
  { prompt:'What is your favourite colour?', hint:'Choose the one that feels most like you.', type:'colors', options:[['Red','#d94b4b'],['Blue','#4f82d9'],['Green','#5d9b68'],['Purple','#8b61b7'],['Pink','#e58bb4'],['Yellow','#e0bd42'],['Black','#171717'],['White','#f5f2ea']] },
  { prompt:'If you could wake up anywhere tomorrow, where would you be?', hint:'Anywhere in the world counts.', type:'text', placeholder:'I would wake up in...' },
  { prompt:'If you suddenly had KSh 100 million, what would you do first?', hint:'No sensible answers required.', type:'text', placeholder:'The first thing I would do...' },
  { prompt:'What is your biggest dream for your future?', hint:'This one is yours. Take your time.', type:'text', placeholder:'One day, I hope...' }
];
let dreamIndex=0;
let dreamAnswers=JSON.parse(localStorage.getItem('imaniDreamAnswers')||'{}');

let princessVoice=null;
function choosePrincessVoice(){
  if(!('speechSynthesis' in window)) return;
  const voices=speechSynthesis.getVoices();
  const preferred=['Samantha','Victoria','Karen','Moira','Tessa','Microsoft Zira','Microsoft Aria','Google UK English Female','Google US English Female','English (United States)'];
  princessVoice=voices.find(v=>preferred.some(n=>v.name.toLowerCase().includes(n.toLowerCase()))) || voices.find(v=>/female|woman|zira|aria|samantha|karen|victoria/i.test(v.name)) || voices.find(v=>/^en(-|_)/i.test(v.lang));
}
if('speechSynthesis' in window){ choosePrincessVoice(); speechSynthesis.addEventListener('voiceschanged',choosePrincessVoice); }
function speakPrincess(text){
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(text);
  if(princessVoice) utterance.voice=princessVoice;
  utterance.lang=princessVoice?.lang || 'en-GB';
  utterance.rate=.80;
  utterance.pitch=1.42;
  utterance.volume=.9;
  speechSynthesis.speak(utterance);
}
function saveDreamAnswer(value){
  dreamAnswers[dreamIndex]=value;
  localStorage.setItem('imaniDreamAnswers',JSON.stringify(dreamAnswers));
}
function renderDreamQuestion(){
  const q=dreamQuestions[dreamIndex];
  dreamProgress.textContent=`${dreamIndex+1} / ${dreamQuestions.length}`;
  dreamQuestion.textContent=q.prompt;
  dreamHint.textContent=q.hint||'';
  dreamAnswer.innerHTML='';
  dreamAnswer.classList.toggle('is-colors',q.type==='colors');
  dreamNext.disabled=true;
  dreamPrincess.classList.remove('ask');
  void dreamPrincess.offsetWidth;
  dreamPrincess.classList.add('ask');

  if(q.type==='choices'){
    const old=dreamAnswers[dreamIndex];
    q.options.forEach(option=>{
      const b=document.createElement('button'); b.className='dream-option'; b.textContent=option;
      if(old===option)b.classList.add('selected');
      b.onclick=()=>{document.querySelectorAll('.dream-option').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');saveDreamAnswer(option);dreamNext.disabled=false;};
      dreamAnswer.appendChild(b);
    });
    if(old) dreamNext.disabled=false;
  } else if(q.type==='colors'){
    const old=dreamAnswers[dreamIndex];
    q.options.forEach(([name,color])=>{
      const b=document.createElement('button'); b.className='dream-color'; b.style.setProperty('--pick',color); b.title=name; b.setAttribute('aria-label',name);
      if(old===name)b.classList.add('selected');
      b.onclick=()=>{document.querySelectorAll('.dream-color').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');saveDreamAnswer(name);dreamNext.disabled=false;};
      dreamAnswer.appendChild(b);
    });
    if(old) dreamNext.disabled=false;
  } else {
    const input=document.createElement('textarea'); input.className='dream-input'; input.placeholder=q.placeholder||''; input.value=dreamAnswers[dreamIndex]||'';
    input.addEventListener('input',()=>{saveDreamAnswer(input.value);dreamNext.disabled=!input.value.trim();});
    dreamAnswer.appendChild(input);
    if(input.value.trim())dreamNext.disabled=false;
    if(!window.matchMedia('(pointer:coarse)').matches) setTimeout(()=>input.focus(),250);
  }
  setTimeout(()=>speakPrincess(q.prompt),350);
}
function startDreamBook(){
  dreamExperience.classList.add('active');
  dreamFinish.classList.remove('show');
  dreamExperience.classList.remove('finished');
  dreamIndex=0;
  renderDreamQuestion();
}
dreamNext.addEventListener('click',()=>{
  if(dreamIndex<dreamQuestions.length-1){dreamIndex++;renderDreamQuestion();}
  else {dreamExperience.classList.add('finished');dreamFinish.classList.add('show');speakPrincess('Thank you, Imani. I wanted to know what you dream about.');}
});
function playFinalSong(){
  if(!akiSioni) return;
  song.pause();
  openingMusic.pause();
  laugh.pause();
  akiSioni.currentTime=0;
  akiSioni.loop=true;
  akiSioni.volume=0.9;
  akiSioni.play().catch(()=>{});
}

dreamDone.addEventListener('click',()=>{
  dreamExperience.classList.remove('active','finished');
  dreamFinish.classList.remove('show');
  playFinalSong();
});

akiSioni.addEventListener('ended',()=>{
  // Safety fallback: keep the final song looping if a browser ignores the loop attribute.
  akiSioni.currentTime=0;
  akiSioni.play().catch(()=>{});
});

window.addEventListener('beforeunload',()=>{
  clearTimeout(prankTimer);
  openingMusic.pause();
  song.pause();
  akiSioni.pause();
});
