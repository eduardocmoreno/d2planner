import properties from "./properties.js";
import itemStatCost from "./itemStatCost.js";
import convStrings from "./strings.js";
import uniqueItems from "./uniqueItems.js";
import rwItems from "./runewords.js";
import armor from "./armor.js";
import weapons from "./weapons.js";
import { sets, setItems } from "./setItems.js";
import { modCodeRename, charClasses, chanceSkillEvents, misc, baseQuality, missiles } from "./misc.js";
import gems from "./gems.js";
import { skills, skillDesc } from "./skills.js";

//https://docs.google.com/spreadsheets/d/1JrMKz_q-DjkPxYmrnn95oKF2HLi8bEMkRHj1SIxy85I/pubhtml?widget=true&headers=false#gid=


const modsRef = Object.keys(modCodeRename).map(p => {
  let propstat1 = properties[p].stat1;
  let currentProp = modCodeRename[p] || p;

  if (p === 'dmg-min') {
    propstat1 = 'mindamage'
  }

  if (p === 'dmg-max') {
    propstat1 = 'maxdamage'
  }

  let descfunc = itemStatCost[propstat1]?.descfunc;
  let order = itemStatCost[propstat1]?.descpriority;
  let stringfind = convStrings[itemStatCost[propstat1]?.descstrpos];
  let descr = stringfind || 'NO-CODE-NAME';
  let name = descr;
  let position = itemStatCost[propstat1]?.descval || 0; //0: don`t apply, 1: before descr, 2: after descr
  let sign = 0; //0: no sign, 1: floats (+-), 2: (+), 3: (-)
  let unit = 0; //0: no unit, 1: adds unit (%)

  if (currentProp === 'dmg%') {
    order = 130
  }
  if (['dmg-min', 'dmg-max'].includes(currentProp)) {
    order = 127
  }
  if (['pois-len'].includes(currentProp)) {
    order = 93
  }
  if (['indestructible'].includes(currentProp)) {
    order = 160
  }
  if (['dur'].includes(currentProp)) {
    order = 1
  }
  if (['ethereal', 'sock'].includes(currentProp)) {
    order = -1
  }

  if ([1, 6].includes(descfunc)) {
    //descr = descr.replace('{a}', '+{a}')
    sign = 1;
  }
  else if ([2, 5, 7, 23].includes(descfunc)) {
    //descr = descr.replace('{a}', '{a}%')
    unit = 1;
  }

  else if ([4, 8].includes(descfunc)) {
    //descr = descr.replace('{a}', '+{a}%')
    sign = 2;
    unit = 1;
  }

  else if ([20].includes(descfunc)) {
    //descr = descr.replace('{a}', '-{a}%')
    sign = 3;
    unit = 1;
  }

  name = name
    .replace(/^to /g, '')
    .replace(/ of$/g, '')
    .replace(/ by$/g, '')
    .replace(/ as:$/g, '')

  if (currentProp === 'tab-skill') {
    descr = 'To {tree} ({class} Only)';
    name = 'Tree/Tab Skills';
    sign = 3;
    position = 1;
  }

  if (currentProp === 'dmg-norm') {
    descr = 'Adds {min}-{max} Damage';
    name = 'Adds min-max Damage';
    position = 0;
  }

  if (currentProp === 'dmg-fire') {
    descr = 'Adds {min}-{max} Fire Damage';
    name = 'Adds min-max Fire Damage';
    position = 0;
  }

  if (currentProp === 'dmg-cold') {
    descr = 'Adds {min}-{max} Cold Damage';
    name = 'Adds min-max Cold Damage';
    position = 0;
  }

  if (currentProp === 'cold-len') {
    descr = 'Chills Target for {a} Seconds';
    name = 'Cold Length';
    position = 0;
    order = 94;
  }

  if (currentProp === 'dmg-ltng') {
    descr = 'Adds {min}-{max} Lightning Damage';
    name = 'Adds min-max Lightning Damage';
    position = 0;
  }

  if (currentProp === 'dmg-mag') {
    descr = 'Adds {min}-{max} Magic Damage';
    name = 'Adds min-max Magic Damage';
    position = 0;
  }

  if (currentProp === 'dmg-pois') {
    descr = 'Poison Damage Over {a} Seconds';
    name = 'Poison Damage';
    position = 1;
    sign = 3;
  }

  if (currentProp === 'pois-len') {
    descr = 'Poisons Target for {a} Seconds';
    name = 'Poison Length';
    position = 0;
    order = 90;
  }

  if (currentProp === 'dmg%') {
    descr = 'Enhanced Damage';
    name = 'Enhanced Damage';
    position = 1;
    sign = 3;
    unit = 1;
  }

  if (currentProp === 'dur') {
    descr = 'Durability';
    name = 'Durability';
    position = 1;
    sign = 3;
  }

  if (currentProp === 'rep-dur') {
    descr = 'Repairs {a} Durability In {b} Seconds';
    name = 'Repairs Durability';
    position = 0;
  }

  if (currentProp === 'class-skills') {
    descr = 'To {class} Skill Levels';
    name = 'All Class Skills';
    position = 1;
    sign = 3;
  }

  if (currentProp === 'single-skill') {
    descr = 'To {skill} ({class} Only)';
    name = 'Class Single Skill';
    position = 1;
    sign = 3;
  }

  if (currentProp === 'charged-skill') {
    descr = 'Level {a} {skill} ({b}/{b} Charges)';
    name = 'Charged Skill';
    position = 0;
  }

  if (currentProp === 'o-skill') {
    descr = 'To {skill}';
    name = 'Non-Class Skill';
    position = 1;
    sign = 3;
  }

  if (currentProp === 'aura') {
    descr = 'Level {a} {aura} Aura When Equiped';
    name = 'Aura';
    position = 0;
  }

  if (currentProp === 'cast-skill') {
    descr = 'Chance To Cast Level {a} {skill} {event}';
    name = 'Chance To Cast Skill';
    position = 1;
    unit = 1;
  }

  if (currentProp === 'indestructible') {
    descr = name = 'Indestructible';
    position = 0;
  }

  if (currentProp === 'all-stats') {
    descr = 'To All Attributes';
    name = 'All Attributes';
    position = 1;
    sign = 3;
  }

  if (currentProp === 'res-all') {
    descr = 'All Resistances';
    name = 'All Resistances';
    position = 2;
    sign = 3;
    unit = 1;
  }

  if (currentProp === 'sock') {
    descr = 'Socketed ({a})';
    name = 'Add Sockets';
    position = 0;
  }

  if (currentProp === 'freeze') {
    descr += ' (VAL > 1 && +VAL)';
    position = 0;
    sign = 3;
  }

  if (currentProp === 'ethereal') {
    descr = 'Ethereal (Cannot Be Repaired)';
    name = 'Ethereal';
    position = 0;
  }

  if (currentProp.includes('lvl')) {
    descr += ' ({a}/lvl)';
    name += ' / lvl';
  }

  if (['red-dmg%', 'abs-fire%', 'abs-cold%', 'abs-ltng%'].includes(currentProp)) {
    name += ' %';
  }

  /* if (currentProp === 'skillOnAttack') {
    shortDescr = 'Cast Skill On Attack';
  }

  if (currentProp === 'skillOnStriking') {
    shortDescr = 'Cast Skill On Striking';
  }

  if (currentProp === 'skillWhenStruck') {
    shortDescr = 'Cast Skill When Struck';
  }

  if (currentProp === 'skillWhenKill') {
    shortDescr = 'Cast Skill When You Kill An Enemy';
  }

  if (currentProp === 'skillWhenDie') {
    shortDescr = 'Cast Skill When You Die';
  }

  if (currentProp === 'skillWhenLvlUp') {
    shortDescr = 'Cast Skill When You Level Up';
  } */

  let obj = {};

  let objProps = {
    code: currentProp,
    name,
    descr,
    order,
    position,
    sign,
    unit
  }

  obj[currentProp] = objProps;

  return obj;
})
  .reduce((a, b) => {
    return { ...a, ...b }
  });

//console.log(modsRef);

//ARMOR
const convArmor = Object.values(armor).map(a => {
  let item = {
    //index: a.name,
    name: convStrings[a.code],
    type: a.type,
    code: a.code,
    variants: [a.normcode, a.ubercode, a.ultracode],
    quality: [a.normcode, a.ubercode, a.ultracode].indexOf(a.code) + 1,
    def: [a.minac, a.maxac],
    dmg: [a.mindam, a.maxdam],
    durability: a.durability,
    indestructible: a.nodurability,
    lvl: a.level,
    reqLvl: a.levelreq,
    reqStr: a.reqstr,
    block: a.block,
    speed: a.speed,
    sockets: a.gemsockets,
    image: a.hd
  }

  if (a.magiclvl) {
    item.magLvl = a.magiclvl;
  }

  return item;
})
//.map(a => a.sockets)

//console.log(convArmor);

//WEAPONS
const convWeapons = Object.values(weapons).map(w => {
  let item = {
    //index: a.name,
    name: convStrings[w.code],
    type: w.type,
    code: w.code,
    quality: [w.normcode, w.ubercode, w.ultracode].indexOf(w.code) + 1,
    dmg: [w.mindam, w.maxdam],
    weaponClass: w.wclass,
    twoHanded: w["2handed"] || 0,
    oneOrTwoHanded: w["1or2handed"] || 0,
    twoHandedWeaponClass: w["2handedwclass"],
    durability: w.durability,
    indestructible: w.nodurability || 0,
    lvl: w.level,
    reqLvl: w.levelreq,
    reqStr: w.reqstr || 0,
    reqDex: w.reqdex || 0,
    strBonus: w.strbonus || 0,
    dexBonus: w.dexbonus || 0,
    speed: w.speed || 0,
    sockets: w.gemsockets || 0,
    image: w.hd
  }

  if (w.ubercode && w.ultracode) {
    item.variants = [w.normcode, w.ubercode, w.ultracode];
  }

  if (w["2handmindam"]) {
    item.twoHandedDmg = [w["2handmindam"], w["2handmaxdam"]];
  }

  if (w.minmisdam) {
    item.throwDmg = [w.minmisdam, w.maxmisdam];
  }

  if (w.type === 'tpot') {
    item.dmg = missiles[w.missiletype].emin;
    if (missiles[w.missiletype].elen) {
      item.dmgLen = missiles[w.missiletype].elen;
    }
    //calc = dmg/dmgLen *yes, that simple!!!
  }

  if (w.missiletype) {
    item.missileType = w.missiletype;
  }

  if (w.strbonus) {
    item.strBonus = w.strbonus;
  }

  if (w.magiclvl) {
    item.magLvl = w.magiclvl;
  }

  return item;
})
  .filter(w => w.type === 'tpot')

//console.log(convWeapons);

//UNIQUES
const uniquesConv = Object.values(uniqueItems).filter(u => !!u.enabled).map((u, i) => {
  return {
    //idx: i,
    //costMult: u.costmult,
    name: convStrings[u.index],
    code: u.code,
    rarity: 7,
    lvl: u.lvl,
    lvlReq: u.lvlreq,
    image: u.hd ? (u.hd[0] || u.hd) : null,
    mods: convertItemMods(u, 'prop')
  }
})
  .filter(u => u.mods.some(m => m.code === 'dmg-pois'))
//.filter(u => u.mods.some(m => m.code.includes('/lvl')))
//.slice(0, 5)
//.map(u => u.mods)
//.map(u => [u.name, u.mods])
//.map(u => [u.idx, u.name, u.mods])

//console.log(uniquesConv);

//RUNEWORDS
const rwConv = Object.values(rwItems).map(u => {
  let type = [];

  for (var i = 1; i <= 3; i++) {
    if (u[`itype${i}`]) {
      type.push(u[`itype${i}`]);
    }
  }

  if (type.length === 1) {
    type = type[0]
  }

  let runes = [];

  for (var i = 1; i <= 6; i++) {
    if (u[`rune${i}`]) {
      runes.push(u[`rune${i}`]);
    }
  }

  return {
    //rwcode: u.name,
    name: convStrings[u.name],
    type,
    rarity: 8,
    runes,
    mods: convertItemMods(u, 't1code')
  }
})
//.filter(r => r.type instanceof Array)
//.sort()
//.slice(60, 80)
//.map(u => u.type)
//.map(u => u.mods)
//.map(u => [u.name, u.rwcode, u.mods]);

//console.log(rwConv);

//SETS
const convSets = Object.values(sets).map(s => {
  return {
    name: s.name,
    bonus: {
      partial: convertItemMods(s, 'pcode'),
      full: convertItemMods(s, 'fcode')
    }
  }
});

//console.log(convSets);

//SET ITEMS
const convSetItems = Object.values(setItems).map(s => {
  //return convertItemMods(s, 'aprop')
  const setItem = {
    name: s.index,
    code: s.item,
    set: s.set,
    rarity: 6,
    lvlReq: s.lvlreq,
    mods: convertItemMods(s, 'prop')
  }

  const bonus = convertItemMods(s, 'aprop');

  if (bonus.length) {
    setItem.bonus = bonus;
  }

  return setItem;
});

//console.log(convSetItems);


//GEMS AND RUNES
const gemsConv = Object.keys(gems).map(g => {
  //return convertGemsMods(gems[g], 'weaponmod');
  return {
    [g]: {
      code: g,
      name: misc[g].name,
      lvl: misc[g].level,
      bonus: {
        weapon: convertGemsMods(gems[g], 'weaponmod'),
        shield: convertGemsMods(gems[g], 'helmmod'),
        armor: convertGemsMods(gems[g], 'shieldmod')
      }
    }
  };
});
/* 
Re: my previous question - is there some other factor that I'm missing with the Venom runeword? Runes.txt gives 175/312/312 for the parameters, which works out to 312 / 256 * 175 = 213[.28125].
Damn, I just figured it out. The Tal rune itself gives 75 over 5 seconds. That is, 125/154/154, or 154 / 256 * 125 = 75[.1953125] But adding that to 213 gives 288, and it's still over 7 seconds, not 6. So I didn't figure it out, but it's a lead.
Can anyone offer a clue as to how the display value for the Venom runeword are calculated using the game data?
Hmm... (312 + 154) / 256 * ((125 + 175) / 2) = 273.046875 over ((125 + 175) / 2) frames, which is 6 seconds.
It's the average of the times, total of the damage.
*/

//Poison damage rendering Idea for custom items:
//+100 (143) Poison Damage Over 7 (179) Seconds

//console.log(gemsConv);


//SKILLS
const classSkills = Object.values(skills).filter(s => !!s.charclass);

const convSkills = classSkills.map(s => {
  let skDescProps = skillDesc[s.skilldesc];



  let id = s.id;
  let cls = s.charclass;
  let name = `${convStrings[skDescProps.strname]} (${id}) (${cls}) (${s.skilldesc})`;//convStrings[skDescProps.strname];// + ` (${s.skilldesc})`;
  let descr = convStrings[skDescProps.strlong].split(/\n/).reverse().join(' ').trim().replace(/\s+/g, ' ');//.split(/(\n)/).reverse().join(' ').replace(/^ \n /, '').replace(/ \n  \n /, ' \n ');
  let preReq = Object.keys(s).filter(p => p.match(/^reqskill\d/g)).map(p => s[p]);
  let postReq = classSkills.filter(s => s.charclass === cls).filter(s => s.reqskill1 === id || s.reqskill2 === id).map(s => s.id);

  const minLevDmg = [s.mindam || 0, s.minlevdam1 || 0, s.minlevdam2 || 0, s.minlevdam3 || 0, s.minlevdam4 || 0, s.minlevdam5 || 0];
  const maxLevDmg = [s.maxdam || 0, s.maxlevdam1 || 0, s.maxlevdam2 || 0, s.maxlevdam3 || 0, s.maxlevdam4 || 0, s.maxlevdam5 || 0];

  const eMinLev = [s.emin || 0, s.eminlev1 || 0, s.eminlev2 || 0, s.eminlev3 || 0, s.eminlev4 || 0, s.eminlev5 || 0];
  const eMaxLev = [s.emax || 0, s.emaxlev1 || 0, s.emaxlev2 || 0, s.emaxlev3 || 0, s.emaxlev4 || 0, s.emaxlev5 || 0];
  const eLen = [s.elen || 0, s.elevlen1 || 0, s.elevlen2 || 0, s.elevlen3 || 0];

  const attrStrings = Object.keys(skDescProps).filter(p => p.includes(`desctext`)).map(p => convStrings[skDescProps[p]].toLowerCase());
  const synStrings = Object.keys(skDescProps).filter(p => p.match(/^dsc3text(a|b)[2-7]/g)).map(p => convStrings[skDescProps[p]].toLowerCase());
  const descLineCodes = Object.keys(skDescProps).filter(p => p.match(/descline|dsc\dline/g)).map(p => skDescProps[p]);
  
  
  const dmgStr = Object.values(skDescProps).some(p => p === `StrSkill4`);
  
  const dmgProp = Object.entries(skDescProps).filter(([k,v]) => !!k.toString().match(/^desctext/g)).find(([k,v]) => v === `StrSkill4`)?.[0];
  const dmgPropIdx = dmgProp?.slice(-2);
  
  const dmgSynProp = Object.entries(skDescProps).filter(([k,v]) => !!k.toString().match(/^dsc\dtext/g)).find(([k,v]) => v === `StrSkill4`)?.[0];
  const dmgSynIdx = dmgSynProp?.match(/dsc\d/g)[0].match(/\d/g)[0];
  const dmgSynPropIdx = dmgSynProp?.slice(-2);
  
  const dmgCalcStr = skDescProps[`desccalc${dmgPropIdx}`] || skDescProps[`dsc${dmgSynIdx}calc${dmgSynPropIdx}`];

  if(s.etype && s.etype !== 'stun' && s.emin){
    //let calc = skDescProps[`desccalc${dmgPropIdx}`] || skDescProps[`dsc${dmgSynIdx}calc${dmgSynPropIdx}`];
    //let prop = dmgProp || dmgSynProp;
    
    return {
      //calc, 
      //prop,
      //code: `dmg-${s.etype}`,
      args: [eMinLev, eMaxLev],
      aType: s.anim,
      name
    }
  }
  
  return null;

  let attributes = [];

  //sign ==> 0: no sign, 1: floats (+-), 2: (+), 3: (-)
  //unit ==> 0: no unit, 1: '%', 2: 'sec', 3: 'yards', 4: 'pts', 5: 'hits'

  //STUN LENGTH [OK] ================================================ //
  if (s.etype === 'stun' || attrStrings.join(' ').includes(`stun length`) || [139].includes(id)) {
    let obj = {
      //name,
      code: `stun-len`
    }

    let calcStr = s.elensympercalc || null;

    //Smite (97) (pal)
    if ([97].includes(id)) {
      calcStr = s.calc2;
    }

    //War Cry (154) (bar)
    if ([154].includes(id)) {
      calcStr = skDescProps.desccalca2;
    }

    //Maul (233) (dru)
    if ([233].includes(id)) {
      calcStr = s.aurastatcalc2;
    }

    //Shock Wave (243) (dru)
    if ([243].includes(id)) {
      calcStr = skDescProps.desccalca4;
    }
    
    if (calcStr) {
      obj.calc = convCalc(s, calcStr);
    }

    if (s.elen) {
      obj.args = eLen;
    }

    //attributes.push(obj);
  }

  //COLD LENGTH AND/OR FREEZE DURATION [OK] ================================================ //
  if ((s.etype === 'cold' || [40].includes(id)) && ![114].includes(id)) {
    let obj = {
      //name,
      code: `cold-len`
    }

    let calcStr = s.elensympercalc || null;

    //Frozen Armor (40) (sor)
    if ([40].includes(id)) {
      calcStr = s.calc1;
    }
    
    //Glacial Spike (55) (sor)
    if ([55].includes(id)) {
      calcStr = s.auralencalc;
    }

    if (calcStr) {
      obj.calc = convCalc(s, calcStr);
    }

    if (s.elen) {
      obj.args = eLen;
    }

    //attributes.push(obj);
  }

  //POISON LENGTH [OK] ================================================ //
  if(s.etype === 'pois' && ![222].includes(id)){
    let obj = {
      //name,
      code: `pois-len`
    }

    let calcStr = s.elensympercalc || null;

    if (calcStr) {
      obj.calc = convCalc(s, calcStr);
    }

    if (s.elen) {
      obj.args = eLen;
    }

    //attributes.push(obj);
  }

  //FIRE DURATION ================================================ //
  if(attrStrings.join(' ').includes(`fire duration`)){
    let elen = {
      //name,
      code: `fire-len`
    }
    
    //Immolation Arrow (27) (ama)
    if ([27].includes(id)) {
      elen.params = [getMissileProps(`immolationfire`).range, getMissileProps(`immolationfire`).levrange || 0];
    }

    //Blaze (46) (sor)
    if ([46].includes(id)) {
      elen.params = [getMissileProps(`blaze`).range, getMissileProps(`blaze`).levrange || 0];
    }

    //Fire Wall (51) (sor)
    if ([51].includes(id)) {
      elen.params = [getMissileProps(`firewall`).range, getMissileProps(`firewall`).levrange || 0];
    }

    //attributes.push(elen);
  }

  //ATTACK RATING [OK] ===================================================== //
  if((s.tohit || s.tohitcalc) && !s.pettype && ![149, 274].includes(id)){
    let ar = {
      //name,
      code: 'att%'
    }

    if (s.tohit) {
      ar.args = [s.tohit, s.levtohit]
    }

    if (s.tohitcalc) {
      ar.calc = convCalc(s, s.tohitcalc);
    }

    //Summon Spirit Wolf (227)  doesn`t provide att% to Druid, only for itself, but it must display
    // if ([227].includes(id)) {
    //   ar.code = 'pet-att%';
    //   ar.params = [s.param1, s.param2];
    // }

    //Summon Dire Wolf (237) doesn`t provide att% to Druid, only for itself, but it must display
    //Summon Grizzly (247) doesn`t provide att% to Druid, only for itself, but it must display
    // if ([237, 247].includes(id)) {
    //   ar.code = 'pet-att%';
    //   ar.calc = `getSkillAttr('${getSkName('Summon Spirit Wolf')}', 'pet-att%').value`;
    //   delete ar.params;
    // }

    //Valkyrie (32) doesn`t provide att to Amazon, only for itself, but it must display
    // if ([32].includes(id)) {
    //   ar.code = 'pet-att';
    //   ar.params = [40, 1];
    //   ar.calc = `getSkill('Penetrate').lvl`;
    // }

    //attributes.push(ar);
  }
  
  //PHYSICAL DAMAGE X-Y [OK] ===================================================== //
  if((s.mindam || s.maxdam) && ![249].includes(id)){
    let dmg = {
      //name,
      code: `dmg`,
      args: [minLevDmg, maxLevDmg]
    }

    if(s.dmgsympercalc){
      dmg.calc = convCalc(s, s.dmgsympercalc);
    }

    //attributes.push(dmg);
  }

  //PHYSICAL DAMAGE % [OK] ===================================================== //
  if((dmgStr || [254].includes(id)) && !s.mindam && !s.pettype && ![69].includes(id)){
    let dmg = {
      //name,
      code: 'dmg%'
    }

    let calcStr = dmgCalcStr;

    if(dmgCalcStr === 'clc1'){
      calcStr = s.calc1;
    }

    if(dmgCalcStr === 'madm'){
      calcStr = s.passivecalc2;
    }

    if(calcStr) {
      dmg.calc = convCalc(s, calcStr);
    }

    //Corpse Explosion (74) (nec)
    if ([74].includes(id)) {
      dmg.calc = [convCalc(s, s.calc1), convCalc(s, s.calc2)];
    }

    //Maul (233) (dru)
    if ([233].includes(id)) {
      dmg.calc = [convCalc(s, skDescProps[`desccalca2`]), convCalc(s, skDescProps[`desccalcb2`])];
    }

    //Tiger Strike (254) (ass) - (charge 2 = charge 1 * 2), and (charge 3 = charge 1 * 3)
    if ([254].includes(id)) {
      dmg = [
        {
          ...dmg,
          calc: convCalc(s, skDescProps[`desccalca5`])
          //charge: 1
        },
        {
          ...dmg,
          calc: convCalc(s, skDescProps[`desccalca4`])
          //charge: 2
        },
        {
          ...dmg,
          calc: convCalc(s, skDescProps[`desccalca3`])
          //charge: 3
        }
      ]
    }

    //Push/Concat to attrs
    if (dmg instanceof Array) {
      //dmg.forEach(d => attributes.push(d));
    }

    else {
      //attributes.push(dmg);
    }
  }

  //ELEMENTAL DAMAGE ===================================================== //
  if ((s.etype && s.etype !== 'stun' && ![37, 42, 74, 222].includes(id)) || [6, 63, 65].includes(id)) {
    const etypes = {
      fire: {
        code: 'dmg-fire',
        name: 'Fire Damage'
      },
      cold: {
        code: 'dmg-cold',
        name: 'Cold Damage'
      },
      ltng: {
        code: 'dmg-ltng',
        name: 'Lightning Damage'
      },
      pois: {
        code: 'dmg-pois',
        name: 'Poison Damage'
      },
      mag: {
        code: 'dmg-mag',
        name: 'Magic Damage'
      }
    }

    let edmg = {
      //sk: `${name} (${id}) (${cls}) (hitShift: ${s.hitshift})`,
      code: etypes[s.etype]?.code,
      params: [eMinLev, eMaxLev]
    }

    if (s.edmgsympercalc) {
      edmg.calc = convCalc(s, s.edmgsympercalc);
    }

    /* 
      fire: {
        damage: "StrSkill5"
      },
      ltng: {
        damage: "StrSkill7"
      },
      mag: {
        damage: "StrSkill39"
      },
      cold: {
        damage: "StrSkill6",
        length: "StrSkill13"
      },
      pois: {
        damage: "StrSkill8",
        length: "StrSkill14"
      }
    */

    /* 
      totalPhysDmg = wDmg * srcDmg * (offWeapDmg% + dmg%)/100
    */

    /* 
      plus-elem%
      - {wDmg} * {srcDmg} * ({ln} + {syn})/100
      - vengeance
    */

    /* 
      phys-to-elem%
      - {wDmg} * {srcDmg} * {offWeapDmg/100} * ({ln} + {syn})/100
      - mag arrow, ltng bolt
    */

    //Lightning Bolt (20) (ama)
    if ([20].includes(id)) {
      edmg = [
        { ...edmg },
        {
          code: `phys-to-${s.etype}%`,
          params: [getMissileProps(s.srvmissile).dparam1, getMissileProps(s.srvmissile).dparam2]
        }
      ]
    }

    //Magic Arrow (6) (ama)
    //calc = totalPhysDmg * ln/100
    if ([6].includes(id)) {
      edmg = {
        ...edmg,
        code: `phys-to-mag%`,
        params: [getMissileProps(s.srvmissile).dparam1, getMissileProps(s.srvmissile).dparam2]
      }
    }

    //Fire Arrow (7) (ama)
    //Cold Arrow (11) (ama)
    if ([7, 11].includes(id)) {
      edmg = [
        { ...edmg },
        {
          code: `phy-to-${s.etype}%`,
          params: [getMissileProps(s.srvmissile).dparam1, getMissileProps(s.srvmissile).dparam2]
        }
      ]
    }

    //AVERAGE FIRE DAMAGE INSTEAD
    //Inferno (41) (sor)
    //Blaze (46) (sor)
    //Fire Wall (51) (sor)
    //Firestorm (225) (dru)
    if ([41, 46, 51, 225].includes(id)) {
      edmg = null;
    }

    //Fire Mastery (61) (sor)
    //Ltng Mastery (63) (sor)
    //Cold Mastery (65) (sor)
    const elemMasteryType = {
      61: 'fire',
      63: 'ltng',
      65: 'cold'
    }
    if ([61, 63, 65].includes(id)) {
      edmg = {
        code: `extra-${s.id}`,
        params: [s.param1, s.param2]
      }
    }

    //Vengeance (111) (pal)
    if ([111].includes(id)) {
      edmg = [
        {
          code: `plus-fire%`,
          params: [s.param1, s.param2],
          calc: convCalc(s, s.calc1)
        },
        {
          code: `plus-cold%`,
          params: [s.param1, s.param2],
          calc: convCalc(s, s.calc2)
        },
        {
          code: `plus-ltng%`,
          params: [s.param1, s.param2],
          calc: convCalc(s, s.calc3)
        }
      ]
    }

    //Holy Shock (118) (pal)
    if ([118].includes(id)) {
      edmg.params = [[1, 0], eMaxLev]
    }

    //Berserk (152) (bar)
    if ([152].includes(id)) {
      edmg = [
        {
          code: `phys-to-mag%`,
          params: [100, 0]
        },
        {
          code: `plus-mag%`,
          params: [s.param1, s.param2],
          calc: convCalc(s, s.calc1)
        }
      ]
    }


    //Concentrate (144) (bar)
    //Frenzy (147) (bar)
    if ([144, 147].includes(id)) {
      edmg = {
        code: `phy-to-mag%`,
        calc: convCalc(s, s.calc4)
      }
      delete edmg.params;
    }

    /* 
    KICK DAMAGE EQUATION
    MinDamage= (str + dex – 20) / 4 * (100 + skill_bonus) / 100 + BootMinDam * (100 + (str * StrBonus / 100) + skill_bonus + non_weapon ED + Aura_bonus) / 100
    MaxDamage=(str + dex – 20) / 3 * (100 + skill_bonus) / 100 + BootMaxDam * (100 + (str * StrBonus / 100) + skill_bonus + non_weapon ED + Aura_bonus) / 100
    */

    //Dragon Tail (270) (ass)
    if ([270].includes(id)) {
      edmg = {
        code: `plus-${s.etype}%`,
        params: [s.param1, s.param2]
      }
    }

    //Push/Concat to attrs
    if (edmg instanceof Array) {
      //attributes = attributes.concat(edmg);
    }

    else {
      //!!edmg && attributes.push(edmg);
    }
  }

  
  //AVERAGE FIRE DAMAGE PER SECOND  ================================================ //
  //CALC = avrgFactor * Math.floor((ln << 2) * (skBonnus/100 + 1)) * 25 >> 8
  if ([27, 56, 229, 249, 259, 280].includes(id) || [41, 46, 51, 225].includes(id)/* these were dmg-fire before */) {
    let avrgFactor = 3;
    let hitShift = s.hitshift;

    let avrElemDmg = {
      //name,
      code: `avrg-fire-dmg`
    }

    const missileProps = getMissileProps(id === 280 ? 'royalstrikemeteorfire' : skDescProps.descmissile1) || null;

    if (missileProps && ![46, 51].includes(id)) {
      const afdMin = [missileProps.emin || 0, missileProps.minelev1 || 0, missileProps.minelev2 || 0, missileProps.minelev3 || 0, missileProps.minelev4 || 0, missileProps.minelev5 || 0];
      const afdMax = [missileProps.emax || 0, missileProps.maxelev1 || 0, missileProps.maxelev2 || 0, missileProps.maxelev3 || 0, missileProps.maxelev4 || 0, missileProps.maxelev5 || 0];
      hitShift = missileProps?.hitshift;
      avrElemDmg = {
        ...avrElemDmg,
        params: [afdMin, afdMax],
        calc: convCalc(missileProps, missileProps.edmgsympercalc || s.edmgsympercalc)
      }
    } else {
      avrElemDmg = {
        ...avrElemDmg,
        params: [eMinLev, eMaxLev],
        calc: convCalc(s, s.edmgsympercalc)
      }
    }

    //Inferno (41) (sor)
    if ([41].includes(id)) {
      avrgFactor = 1;
    }

    //Fists of Fire (259)
    if ([259].includes(id)) {
      avrgFactor = 2;
    }

    avrElemDmg.calc = `${avrgFactor} * ({ln} << ${hitShift}) * 25 >> 8`;

    //attributes.push(avrElemDmg);
  }

  //SKILL TIME DURATION  ================================================ //
  //freeze duration
  //curse duration
  //fire duration
  //duration reduced
  if (attrStrings.join(' ').includes(`duration:`) && !['freeze duration', 'curse duration', 'fire duration', `duration reduced`].some(p => attrStrings.join(' ').includes(p)) && ![139].includes(id)) {
    let len = {
      name,
      code: 'len',
      params: s.auralencalc ? getParamsFromCalcStr(s, s.auralencalc) : 'nonononononononononononon'
    }

    //Decoy (28) (ama)
    if ([28].includes(id)) {
      len.params = getParamsFromCalcStr(s, s.calc2);
    }

    //Hydra (62) (sor)
    if ([62].includes(id)) {
      len.params = getParamsFromCalcStr(s, skDescProps.desccalca3);
    }

    //Bone Wall (78) (nec)
    //Bone Prison (88) (nec)
    if ([78, 88].includes(id)) {
      len.params = getParamsFromCalcStr(s, skDescProps.desccalca2);
    }

    //Blizzard (59) (sor)
    if ([59].includes(id)) {
      len.params = [s.elen, 0];
    }

    //Stun (139) (bar) STUN-LENGTH
    // if ([139].includes(id)) {
    //   len.params = eLen;
    // }

    //Lycanthropy (224) (dru)
    if ([224].includes(id)) {
      len.params = getParamsFromCalcStr(s, skDescProps.desccalca1);
    }

    //Fissure (234) (dru)
    if ([234].includes(id)) {
      len.params = [getMissileProps(skDescProps.descmissile1).range, 0];
    }

    //Shock Web (256) (ass)
    if ([256].includes(id)) {
      len.params = [getMissileProps(`shock field on ground`).range, 0];
    }

    //Blade Sentinel (257) (ass)
    if ([257].includes(id)) {
      len.params = getParamsFromCalcStr(s, s.calc4);
    }

    //Grim Ward (150) (bar)
    if ([150].includes(id)) {
      len.params = getParamsFromCalcStr(s, s.calc1);
    }

    //Berserk (152) (bar)
    //Math.round((75-Math.min(((110*lvl)/(lvl+6)*(75-25)/100),(75-25))) * 10 / 25) / 10
    if ([152].includes(id)) {
      len.calc = convCalc(s, s.auralencalc);
      delete len.params;
    }

    //attributes.push(len);
  }

  //RADIUS  ================================================ //
  if (s.aurarangecalc && attrStrings.some(s => s.match(/^radius:/g))) {
    let radius = {
      //name,
      code: 'radius',
      params: getParamsFromCalcStr(s, s.aurarangecalc)
    }

    if (!!s.aurarangecalc.match(/dm\d\d/)) {
      radius.fn = 'dm';
    }

    //attributes.push(radius);
  }

  //RANGE  ================================================ //
  //calc = ln*2/3
  if ((s.aurarangecalc && attrStrings.some(s => s.match(/^range:/g)))) {
    let range = {
      //name,
      code: 'range',
      params: getParamsFromCalcStr(s, s.aurarangecalc)
    }

    if (![264].includes(id)) {
      range.calc = '{ln}/4';
    }

    if (!!s.aurarangecalc.match(/dm\d\d/)) {
      range.fn = 'dm';
    }

    //attributes.push(range);
  }

  //MANA COST  ===================================================== //
  if (s.mana) {
    const mana = {
      //name,
      code: 'mana-cost',
      params: [s.mana, s.lvlmana],
      manaShift: s.manashift
    }

    //Inferno (41) (sor)
    //Arctic Blast (230) (dru)
    if ([41, 230].includes(id)) {
      mana.code = 'mana-cost/sec';
    }

    //Double Swing (133) (bar)
    //Double Throw (140) (bar)
    //Frenzy (147) (bar)
    if ([133, 140, 147].includes(id)) {
      mana.params = [s.mana * 2, s.lvlmana];
    }

    //attributes.push(mana);
  }

  


  let synergies = Object.keys(skDescProps).filter(p => p.match(/^dsc3texta[2-7]/g)).map(p => {
    let synId = parseInt(skDescProps[p].match(/\d+/g)[0]);
    let synPropIdx = p.replace('dsc3texta', '');
    let synBonus = convStrings[skDescProps['dsc3textb' + synPropIdx]];
    let synBonusFuncId = skDescProps['dsc3line' + synPropIdx];
    let synAdds = skDescProps['dsc3calca' + synPropIdx];//.match(/\d/g)
    let synSign = 0; //0: no sign, 1: floats (+-), 2: (+), 3: (-)
    let synUnit = 0; //0: no unit, 1: adds unit (%)


    if (['dru', 'ass'].includes(cls)) {
      synId = synId - 1;
    }

    let synSkName = convStrings[skillDesc[classSkills.find(s => s.id === synId).skilldesc].strname];
    let synCompleteDescr = synSkName;

    switch (synAdds) {
      case 'par6': {
        synAdds = parseInt(s['param6']); break;
      }
      case 'par7': {
        synAdds = parseInt(s['param7']); break;
      }
      case '(par7 + 12)/25': {
        synAdds = Math.floor((parseInt(s['param7']) + 12) / 25); break;
      }
      case 'par8': {
        synAdds = parseInt(s['param8']); break;
      }
      case 'par8/25': {
        synAdds = Math.floor(parseInt(s['param8']) / 25); break;
      }
      case 'skill(\'BloodGolem\'.par8)': {
        synAdds = parseInt(classSkills.find(s => s.skill === 'BloodGolem')['param8']); break;
      }
      case 'skill(\'IronGolem\'.par8)': {
        synAdds = parseInt(classSkills.find(s => s.skill === 'IronGolem')['param8']); break;
      }
      case 'skill(\'FireGolem\'.par8)': {
        synAdds = parseInt(classSkills.find(s => s.skill === 'FireGolem')['param8']); break;
      }
      case 'skill(\'Clay Golem\'.par8)': {
        synAdds = parseInt(classSkills.find(s => s.skill === 'Clay Golem')['param8']); break;
      }
      default: {
        synAdds = parseInt(synAdds); break;
      }
    }

    switch (synBonusFuncId) {
      case 42: {
        synAdds = parseInt(skDescProps['dsc3calcb' + synPropIdx]) / 10;
        synCompleteDescr = `${synSkName}: ${synAdds} ${synBonus}`; break;
      }
      case 63: {
        synSign = 2;
        synUnit = 1;
        synCompleteDescr = `${synSkName}: +${synAdds}% ${synBonus}`; break;
      }
      case 67: {
        synSign = 2;
        synCompleteDescr = `${synSkName}: +${synAdds} ${synBonus}`; break;
      }
      case 71: {
        synSign = 2;
        synCompleteDescr = `${synSkName}: ${synBonus.replace('%d', synAdds)}`; break;
      }
    }

    //18, 25, 42, 63, 67, 71 = skDescProps['dsc3line' + synPropIdx]

    let syn = {
      id: synId
    }

    if (synAdds) {
      syn.adds = synAdds;
    }

    if (synBonus) {
      syn.bonus = synBonus;
      syn.bonusDescr = synCompleteDescr;
    }

    return syn;
  });

  const skill = {
    //id,
    //cls: charClasses[cls],
    name,
    //reqLvl: s.reqlevel,
    //descr,
    //preReq,
    //postReq,
    par1: s.param1 || 0,
    par2: s.param1 || 0,
    par3: s.param1 || 0,
    par4: s.param1 || 0,
    par5: s.param1 || 0,
    par6: s.param1 || 0,
    par7: s.param1 || 0,
    par8: s.param1 || 0,
    attributes,
    synergies
  }

  if (s.hitshift) {
    skill.hitShift = s.hitshift;
  }

  if (s.srcdam) {
    skill.wFactor = s.srcdam / 128;
  }

  if (s.prgdam) {
    skill.charged = s.prgdam;
  }

  return skill;
})
  //[146]//berserk
  //[35].attributes//Inferno
  //[45]//fire wall
  //[40]//blaze
  //[105]//vengeance
  //[120].attributes //bash
  //[133].attributes //stun
  //[90]//sacrifice
  //[106]//blessed hammer
  //[114]//meditation
  //[26]//Valkyrie
  .filter(s => !!s)
  //.slice(200, 210)
  //.filter(s => [41, 46, 51, 225, 27, 56, 229, 249, 259, 280].includes(s.id))
  //.filter((s, i) => [185, 190, 205].includes(i))
  /// .filter(s => s.synergies.length)
  //.map(s => s.synergies)
  //.filter(s => convStrings[skillDesc[s.skilldesc].strname] !== s.skill).map(s => `${convStrings[skillDesc[s.skilldesc].strname]}, ${s.skill}`)
  //.filter(s => s.attributes.some(a => a.code === 'ERROR'))
  //.filter(s => !!s.attributes.length /* && !!s.synergies.length */)//.filter((s, i) => [0,2,12,29,33].includes(i))
  //.map(s => s.attributes[0])//[6]
//.slice(0, 10)
// .flat()

console.log(convSkills);

const modsExample = [
  {
    "code": "light",
    "min": 7,
    "max": 7
  },
  {
    "code": "cast-skill",
    "chance": 5,
    "lvl": 0,
    "id": 53,
    "event": 0
  },
  {
    "code": "ignore-ac",
    "min": 1,
    "max": 1
  },
  {
    "code": "abs-ltng%",
    "min": 25,
    "max": 25
  },
  {
    "code": "swing",
    "min": 20,
    "max": 20
  },
  {
    "code": "dmg-mag",
    "min": 60,
    "max": 120
  },
  {
    "code": "dmg-ltng",
    "min": 1,
    "max": 200
  },
  {
    "code": "mana-steal",
    "min": 5,
    "max": 7
  },
  {
    "code": "dmg%",
    "min": 150,
    "max": 200
  },
  {
    "code": "dmg-norm",
    "min": 10,
    "max": 30
  }
]

function getSkName(oldName) {
  let skDesc = classSkills.find(s => s.skill === oldName).skilldesc;
  return convStrings[skillDesc[skDesc].strname]
}

function getMissileProps(prop) {
  return Object.values(missiles).find(m => m.missile === prop)
}

function getParamsFromCalcStr(s, calcStr) {
  let params = null;

  if (!!calcStr?.match(/(dm|ln)12/g)) {
    params = [s.param1, s.param2]
  }

  if (!!calcStr?.match(/(dm|ln)34/g)) {
    params = [s.param3, s.param4]
  }

  if (!!calcStr?.match(/(dm|ln)56/g)) {
    params = [s.param5, s.param6]
  }

  if (!!calcStr?.match(/(dm|ln)78/g)) {
    params = [s.param7, s.param8]
  }

  return params;
}
function convCalc(s, calc) {
  let calcStr = calc
    .replaceAll('.lvl)', ').lvl')
    .replaceAll('.blvl)', ').lvl')
    .replaceAll('skill(', 'getSkill(')
    .replaceAll('.par1)', ').par1')
    .replaceAll('.par2)', ').par2')
    .replaceAll('.par3)', ').par3')
    .replaceAll('.par4)', ').par4')
    .replaceAll('.par5)', ').par5')
    .replaceAll('.par6)', ').par6')
    .replaceAll('.par7)', ').par7')
    .replaceAll('.par8)', ').par8')
    .replaceAll(/(?<!\.)lvl/g, '{lvl}')
    .replaceAll(/(?<!\.)par1/g, '{par1}')
    .replaceAll(/(?<!\.)par2/g, '{par2}')
    .replaceAll(/(?<!\.)par3/g, '{par3}')
    .replaceAll(/(?<!\.)par4/g, '{par4}')
    .replaceAll(/(?<!\.)par5/g, '{par5}')
    .replaceAll(/(?<!\.)par6/g, '{par6}')
    .replaceAll(/(?<!\.)par7/g, '{par7}')
    .replaceAll(/(?<!\.)par8/g, '{par8}')
    .replaceAll(/(?<!\.)ln12/g, '{ln12}')
    .replaceAll(/(?<!\.)ln34/g, '{ln34}')
    .replaceAll(/(?<!\.)ln56/g, '{ln56}')
    .replaceAll(/(?<!\.)ln78/g, '{ln78}')
    .replaceAll(/(?<!\.)dm12/g, '{dm12}')
    .replaceAll(/(?<!\.)dm34/g, '{dm34}')
    .replaceAll(/(?<!\.)dm56/g, '{dm56}')
    .replaceAll(/(?<!\.)dm78/g, '{dm78}')
    //.replaceAll(/ln\d\d/g, '{ln}')
    //.replaceAll(/dm\d\d/g, '{dm}')

  calcStr.match(/(?!getSkill\()\'.+?\'(?=\))/g)?.forEach(n => {
    let matchStr = n.replaceAll('\'', '');
    calcStr = calcStr.replaceAll(matchStr, getSkName(matchStr));
  });

  return calcStr;
}

function convertGemsMods(gem, prefix) {
  let newMods = [];

  for (var i = 1; i <= 3; i++) {
    if (gem[`${prefix}${i}code`]) {
      let mod = {
        code: gem[`${prefix}${i}code`],
        val: convMinMaxToArr(gem[`${prefix}${i}min`], gem[`${prefix}${i}max`])
      }

      newMods.push(mod);
    }
  }

  newMods = handleRangeDmgMods(newMods);

  return newMods;
}

function convMinMaxToArr(min, max) {
  return min !== max ? [min, max] : (min || max)
}

function convertItemMods(item, prefix) {
  let newMods = [];
  let getProps;

  /* 
  prop: uniques and set items
  t1code: runewords
  aprop: set items
  pcode: sets (partial bonus)
  fcode: sets (full bonus)
  */

  switch (prefix) {
    case 'prop': {
      getProps = Object.keys(item).filter(p => p.match(/^prop\d/g)); break;
    }

    case 't1code': {
      getProps = Object.keys(item).filter(p => p.match(/^t1code\d/g)); break;
    }

    case 'pcode': {
      getProps = Object.keys(item).filter(p => p.match(/^pcode\da/g)); break;
    }

    case 'fcode': {
      getProps = Object.keys(item).filter(p => p.match(/^fcode\d/g)); break;
    }

    case 'aprop': {
      getProps = Object.keys(item).filter(p => p.match(/^aprop\da/g)); break;
    }
  }

  getProps?.forEach(prop => {
    let code = item[prop].replaceAll('*', '');
    let i, par, min, max;

    switch (prefix) {
      case 'prop': {
        i = prop.match(/\d/g)[0];
        par = item[`par${i}`];
        min = item[`min${i}`];
        max = item[`max${i}`];
        break;
      }

      case 't1code': {
        i = prop.replace('t1', '').match(/\d/g)[0];
        par = item[`t1param${i}`]
        min = item[`t1min${i}`];
        max = item[`t1max${i}`];
        break;
      }

      case 'pcode': {
        i = prop.match(/\d/g)[0];
        par = item[`pparam${i}a`]
        min = item[`pmin${i}a`];
        max = item[`pmax${i}a`];
        break;
      }

      case 'fcode': {
        i = prop.match(/\d/g)[0];
        par = item[`fparam${i}`]
        min = item[`fmin${i}`];
        max = item[`fmax${i}`];
        break;
      }

      case 'aprop': {
        i = prop.match(/\d/g)[0];
        par = item[`apar${i}a`];
        min = item[`amin${i}a`];
        max = item[`amax${i}a`];
        break;
      }
    }

    let mod = {
      code: modCodeRename[code] || code,
      val: convMinMaxToArr(min, max)
    }

    //SKILLS ID
    if (['tab-skill', 'single-skill', 'o-skill', 'aura'].includes(mod.code)) {
      mod.param = par;
    }

    //CLASS SKILLS ID
    if (['class-skills'].includes(mod.code)) {
      mod.param = charClasses[code];
    }

    //CHARGED SKILLS
    if (['charged-skill'].includes(mod.code)) {
      mod.slvl = max;
      mod.param = par;
      mod.val = min;
    }

    //CAST SKILLS
    if (['cast-skill'].includes(mod.code)) {
      mod.val = min;
      mod.slvl = max;
      mod.param = par;
      mod.event = chanceSkillEvents[code];

      // IF SLVL IS ZERO, THEN...
      // (ilvl-(rqlvl-1))/3.9=slvl
      // ilvl = item level
      // rqlvl = player level required to use skill
      // slvl = skill level
      // Rouded up after 0.5, with a min and max of 1 and 20.

      // Example: ilvl99 stormspire,
      // (99-(1-1))/3.9=slvl
      // (99-0)/3.9
      // 99/3.9 = 25.384 ==> Math.round(25.384) = 25

      // Example: ilvl99 Boneslayer Blade,
      // (99-(6-1))/3.9
      // (99-5)/3.9
      // 94/3.9 = Math.round(24.102) = 24

      //max possible val is 25
    }

    //ARROW SKILLS
    if (['magic-arrow', 'explosive-arrow'].includes(mod.code)) {
      mod.slvl = (min || max);
      delete mod.val;
    }

    //ELEM DMG
    if (['dmg-elem', 'dmg-cold', 'dmg-pois'].includes(mod.code) && par) {
      mod.len = par;
    }

    //PARAM AS MIN/MAX
    if (mod.code.includes('/lvl') || ['sock', 'rep-quant', 'rep-dur'].includes(mod.code)) {
      mod.val = convMinMaxToArr(par || min, par || max);

      // MODS/LVL CALC
      // att mods = val/5
      // other mods = val/8

      //REP-DUR CALC
      //Repair 1 Qnt per 100/val seconds
    }

    newMods.push(mod);
  });


  let resAllMaxMod = newMods.find(m => m.code === 'res-all-max');
  if (!!resAllMaxMod) {
    ['res-fire-max', 'res-cold-max', 'res-ltng-max', 'res-pois-max'].forEach(code => {
      newMods.push({
        code,
        val: resAllMaxMod.val
      })
    });
    newMods = newMods.filter(m => m.code !== 'res-all-max');
  }


  let elemDmgMod = newMods.find(m => m.code === 'dmg-elem');
  if (!!elemDmgMod) {
    ['dmg-fire', 'dmg-cold', 'dmg-ltng'].forEach(code => {
      let elemMod = {
        code,
        val: [elemDmgMod.val[0], elemDmgMod.val[1]]
      };

      if (code === 'dmg-cold' && !!elemDmgMod.len) {
        elemMod.len = elemDmgMod.len;
      }

      newMods.push(elemMod);
    });

    newMods = newMods.filter(m => m.code !== 'dmg-elem');
  }

  newMods = sortModsByOrder(handleRangeDmgMods(newMods));

  return newMods;
}

function sortModsByOrder(mods) {
  return mods.sort((a, b) => {
    return (modsRef[b.code]?.order || 0) - (modsRef[a.code]?.order || 0)
  });
}

function handleRangeDmgMods(mods) {
  const dmgTypes = ['dmg', 'fire', 'cold', 'ltng', 'pois'];
  let newMods = [...mods];

  dmgTypes.forEach(d => {
    if (mods.filter(m => m.code === `${d}-min` || m.code === `${d}-max`).length === 2) {
      let minMod = mods.find(m => m.code === `${d}-min`);
      let maxMod = mods.find(m => m.code === `${d}-max`);
      let lenMod = mods.find(m => m.code === `${d}-len`)?.val || null;
      let code = d === 'dmg' ? 'dmg-norm' : `dmg-${d}`;

      let mergedMod = {
        code,
        val: convMinMaxToArr(minMod.val, maxMod.val)
      }

      if (lenMod) {
        mergedMod.len = lenMod;
        // if (code === 'dmg-pois') {
        //   let calcMin = Math.round(minMod.val / 256 * lenMod);
        //   let calcMax = Math.round(maxMod.val / 256 * lenMod);
        //   mergedMod.val = convMinMaxToArr(calcMin, calcMax);
        //   //154 / 256 * 125 = 75[.1953125]
        //   //mergedMod.teste = `+${calc} Poison Damage over ${Math.round(lenMod / 25)} Seconds`;
        // }
      }

      newMods = mods.filter(m => !([`${d}-min`, `${d}-max`, `${d}-len`].includes(m.code)))
      newMods.push(mergedMod);
      newMods = sortModsByOrder(newMods);
    }
  });

  return newMods;
}

//console.log(handleRangeDmgMods(modsExample));

function getPropValues(mod) {
  const values = Object.values(allItems)
    .filter(u => {
      return Object.values(u).includes(mod);
    })
    .map(o => {
      let prop = Object.entries(o).filter(([k, v]) => v === mod)[0]; //['prop1','ac/lvl']
      let propName = prop[0]; //'prop1'
      let propDigit;
      let param = Object.entries(o)
        .filter(([k, v]) => {
          //^prop ==> ^par OR ^max
          if (propName.match(/^prop/g)) {
            propDigit = propName.match(/\d{1,2}$/g)[0];
            let max = k === 'max' + propDigit;
            let par = ('max' + propDigit in o) ? false : k === 'par' + propDigit;
            return max || par;
          }

          //^aprop ==> ^apar OR ^amax
          if (propName.match(/^aprop/g)) {
            propDigit = propName.match(/\d{1,2}(?=\w)/g)[0];
            let max = k === 'amax' + propDigit + 'a';
            let par = ('amax' + propDigit + 'a' in o) ? false : k === 'apar' + propDigit + 'a';
            return max || par;
          }

          //^t1code ==> ^t1param OR ^t1max
          if (propName.match(/^t1code/g)) {
            propDigit = propName.match(/\d{1,2}$/g)[0];
            let max = k === 't1max' + propDigit;
            let par = ('t1max' + propDigit in o) ? false : k === 't1param' + propDigit;
            return max || par;
          }
        })[0];
      //return [o.name || o.index, param[0], param[1]]; //for a complete obj table
      //return Object.fromEntries([[o.code || o.set, o.name || o.index], prop, param]); //for a complete obj table
      //return Object.fromEntries([prop, param]); //for a complete obj table
      return param instanceof Array ? param[1] : 0;
    })
  //.sort((a, b) => a - b)
  //.sort((a, b) => a[2] - b[2])

  return values.filter((v, i) => i === values.indexOf(v))
}



//MISC ===================================================== //

  //weapon damage [multiple shot, strafe]
  //Chance of loosing durability [impale]
  //releases charged bolts [charged strike]
  //releases bolts [ltng fury]
  //hits [ltng strike, chain ltng, zeal]
  //enemy def [inner sight]

  //duration [LOTS] 
  //radius [LOTS] OK
  //range OK

  //ranged attacks slowed [slow missiles]
  //life (pet) [decoy, valkyrie, bone wall, bone prison]
  //att (pet) [valkyrie]
  //percent chance [dodge, avoid, evade, critical strike, pierce]
  //freezes for X seconds [ice arrow, freezing arrow, ice blast, glacial spike, frozen armor]
  //arrows (count) [multiple shot]
  //attacks up to X targets [strafe]
  //fire expl. dmg [immolation arrow]
  //fire duration [immolation arrow, blaze, fire wall]
  //avr. fire dmg per second [immolation arrow, inferno, blaze, fire wall, meteor]
  //cold-dmg% [cold mastery]
  //def% [frozen armor, shiver armor, chilling armor, defiance, holy shield, Berserk (-100%), concentrate (ln34)]
  //weakens enemies by X% [static field]
  //bolts (count) [charged bolt]
  //ltng-dmg% [ltng mastery]
  //absorb % [energy shield]
  //range [inferno]
  //length 4 yards [fire wall]
  //fire-dmg% [fire mastery]
  //regen-mana [warmth, meditation]
  //dmg-fire (pet) [hydra]
  //teeth (count) [teeth]
  //percent dmg of corpse life [corpse explosion, death sentry]
  //absorbs dmg [bone armor]
  //dmg taken % [amplify damage]
  //dmg returned % [iron maiden, thorns]
  //pierce (resist all negative) [lower resist, convinction]
  //heals % of attack damage [life tap]
  //target`s damage % [weaken]
  //heals [prayer, cleansing, meditation, holy bolt]
  //duration reduced by % [cleansing]
  //move-speed % [vigor]
  //stam [vigor]
  //regen-stam [vigor]
  //chance redeem soul % [redemption]
  //life/mana recovered [redemption]
  //res-fire [resist fire]
  //res-cold [resist cold]
  //res-ltng [resist ltng]
  //res-all [salvation]
  //chance uninterruptable % [concentration]
  //party dmg% [fanaticism]
  //your dmg% [fanaticism]
  //att-speed [fanaticism]
  //enemies slowed [holy freeze]
  //dmg-undead [sanctuary]
  //red-def [convinction]
  //cold-dmg-eff [vengeance]
  //fire-dmg-eff [vengeance]
  //ltng-dmg-eff [vengeance]
  //chance to convert [conversion]
  //holy bolt dmg [FOH]
  //stun length [smite]
  //smite dmg [holy shield]
  //block-chance [holy shield]