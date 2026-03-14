// Minimal MVP app: render a hardcoded demo player (Ethan Nwaneri) and scores
(function(){
  const demo = {
    id:'ethan-nwaneri-01',
    name:'Ethan Nwaneri',
    club:'Arsenal',
    age:17,
    nationality:'English',
    preferredFoot:'Right',
    height:177,
    position:'CAM',
    academy:true,
    tier:1,
    currentValue:'',
    watchlist:false,
    imageURL:'',
    ground:{pace:72, acceleration:75, strength:68, stamina:70, agility:78, jumping:74},
    water:{passing:78, technique:80, ballControl:82, dribbling:85, finishing:70, longBalls:72},
    fire:{workRate:78, pressing:74, tackling:60, determination:80, aggression:70, composure:75},
    wind:{vision:82, creativity:84, awareness:78, decision:80, crossing:76, keyPasses:79},
    void:{talent:85, ceiling:87, footballIQ:78, adaptability:80, mentality:82, growth:79},
    matches:[]
  };
  const score = window.Scoring.computeAll(demo);
  demo.elementScores = score.elementScores;
  demo.rawScore = score.rawScore;
  demo.adjustedScore = score.adjustedScore;
  demo.localGrade = score.localGrade;
  demo.worldGrade = score.worldGrade;
  demo.badges = score.badges;

  const app = document.getElementById('app');
  const renderCards = ()=>{
    let html = '<h2>Demo Player</h2>';
    html += `<div><strong>${demo.name}</strong> — ${demo.club} | ${demo.age}yo | ${demo.position} | Tier ${demo.tier} | Academy: ${demo.academy? 'Yes':'No'}</div>`;
    html += '<div style="margin-top:8px;">';
    demo.badges.forEach(b=> html += `<span class="badge">${b}</span>`);
    html += '</div>';
    html += `<p class="score">Adjusted Score: ${demo.adjustedScore} | Local Grade: ${demo.localGrade} | World Grade: ${demo.worldGrade}</p>`;
    // simple radar placeholder
    html += `<canvas id="radar" width="400" height="400" style="border:1px solid #333;margin-top:12px"></canvas>`;
    app.innerHTML = html;
    // draw simple pentagon placeholder with Five Rings colors
    const c = document.getElementById('radar');
    const ctx = c.getContext('2d');
    const colors = window.Scoring.ELEMENT_COLOURS;
    const keys = ['ground','water','fire','wind','void'];
    const vals = keys.map(k=> demo.elementScores[k]||50);
    // simple spider chart
    const cx=200, cy=200, R=140;
    const pts = [];
    for(let i=0;i<5;i++){
      const ang = (Math.PI/2) + (i*(2*Math.PI/5));
      pts.push({x: cx + Math.cos(ang)*R*(vals[i]/100), y: cy + Math.sin(ang)*R*(vals[i]/100)});
    }
    ctx.clearRect(0,0,400,400);
    ctx.strokeStyle='#888';
    ctx.beginPath();
    pts.forEach((p,i)=>{ if(i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);});
    ctx.closePath();
    ctx.stroke();
    // axes
    for(let i=0;i<5;i++){
      const ang = (Math.PI/2) + (i*(2*Math.PI/5));
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(ang)*R, cy+Math.sin(ang)*R); ctx.stroke();
    }
  };
  renderCards();
})();
