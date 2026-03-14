// scoring.js updated with demo values (Ethan Nwaneri) and badge expectations
const TIER_MULTIPLIERS = {
  1: 1.0,
  2: 0.92,
  3: 0.85,
  4: 0.78,
  5: 0.72
};

const ELEMENT_KEYS = {
  ground: ['pace','acceleration','strength','stamina','agility','jumping'],
  water:  ['passing','technique','ballControl','dribbling','finishing','longBalls'],
  fire:   ['workRate','pressing','tackling','determination','aggression','composure'],
  wind:   ['vision','creativity','awareness','decision','crossing','keyPasses'],
  void:   ['talent','ceiling','footballIQ','adaptability','mentality','growth']
};

const ELEMENT_COLOURS = {
  ground: '#8B7355',
  water:  '#2563EB',
  fire:   '#DC2626',
  wind:   '#64748B',
  void:   '#7C3AED'
};

function calcElementAvg(player, element) {
  const keys = ELEMENT_KEYS[element];
  const attrs = player[element];
  if (!attrs) return 0;
  const sum = keys.reduce((acc,k)=> acc + (attrs[k]||0),0);
  return Math.round((sum / keys.length) * 10) / 10;
}

function calcElementScores(player){
  const scores = {};
  for (const el of Object.keys(ELEMENT_KEYS)) scores[el] = calcElementAvg(player, el);
  return scores;
}

function calcRawScore(elementScores){
  const vals = Object.values(elementScores);
  const avg = vals.length ? (vals.reduce((a,b)=>a+b,0)/vals.length) : 0;
  return Math.round(avg * 10) / 10;
}

function calcAdjustedScore(rawScore, tier){
  const mult = TIER_MULTIPLIERS[tier]||1.0;
  return Math.round(rawScore * mult * 10) / 10;
}

function calcGrade(score){
  if (score >= 90) return 'S';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'E';
}

function calcBadges(player, elementScores, adjustedScore){
  const badges = [];
  if (player.academy) badges.push('4xO');
  if (adjustedScore >= 85) badges.push('ELITE');
  if ([3,4,5].includes(player.tier) && adjustedScore >= 70) badges.push('GEM');
  if (elementScores.fire >= 80) badges.push('ENGINE');
  if (elementScores.wind >= 80) badges.push('MAESTRO');
  if (elementScores.void >= 80 && player.age <= 21) badges.push('PROSPECT');
  if (elementScores.ground >= 80) badges.push('WALL');
  if (elementScores.water >= 80) badges.push('SILK');
  return badges;
}

function computeAll(player){
  const elementScores = calcElementScores(player);
  const rawScore = calcRawScore(elementScores);
  const adjustedScore = calcAdjustedScore(rawScore, player.tier);
  const localGrade = calcGrade(rawScore);
  const worldGrade = calcGrade(adjustedScore);
  const badges = calcBadges(player, elementScores, adjustedScore);
  return { elementScores, rawScore, adjustedScore, localGrade, worldGrade, badges };
}

window.Scoring = { computeAll };
