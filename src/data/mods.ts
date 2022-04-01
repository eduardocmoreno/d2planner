/* 
prop/lvl values
"inputMin": 0.25,
"inputMax": 5,
"step": 0.025
*/

export const mods: Record<ItemModName, ItemMod> = {
  "all-stats": {
    "name": "all-stats",
    "descr": "+{a} To All Attributes",
    "shortDescr": "All Attributes"
  },
  "str": {
    "name": "str",
    "descr": "+{a} to Strength",
    "shortDescr": "Strength"
  },
  "str/lvl": {
    "name": "str/lvl",
    "descr": "+{a} to Strength ({a}/lvl)",
    "shortDescr": "Strength / lvl"
  },
  "dex": {
    "name": "dex",
    "descr": "+{a} to Dexterity",
    "shortDescr": "Dexterity"
  },
  "dex/lvl": {
    "name": "dex/lvl",
    "descr": "+{a} to Dexterity ({a}/lvl)",
    "shortDescr": "Dexterity / lvl"
  },
  "vit": {
    "name": "vit",
    "descr": "+{a} to Vitality",
    "shortDescr": "Vitality"
  },
  "vit/lvl": {
    "name": "vit/lvl",
    "descr": "+{a} to Vitality ({a}/lvl)",
    "shortDescr": "Vitality / lvl"
  },
  "enr": {
    "name": "enr",
    "descr": "+{a} to Energy",
    "shortDescr": "Energy"
  },
  "hp": {
    "name": "hp",
    "descr": "+{a} to Life",
    "shortDescr": "Life"
  },
  "hp%": {
    "name": "hp%",
    "descr": "Increase Maximum Life {a}%",
    "shortDescr": "Increase Maximum Life"
  },
  "hp/lvl": {
    "name": "hp/lvl",
    "descr": "+{a} to Life ({a}/lvl)",
    "shortDescr": "Life / lvl"
  },
  "regen": {
    "name": "regen",
    "descr": "Replenish Life +{a}",
    "shortDescr": "Replenish Life"
  },
  "mana": {
    "name": "mana",
    "descr": "+{a} to Mana",
    "shortDescr": "Mana"
  },
  "mana%": {
    "name": "mana%",
    "descr": "Increase Maximum Mana {a}%",
    "shortDescr": "Increase Maximum Mana"
  },
  "mana/lvl": {
    "name": "mana/lvl",
    "descr": "+{a} to Mana ({a}/lvl)",
    "shortDescr": "Mana / lvl"
  },
  "regen-mana": {
    "name": "regen-mana",
    "descr": "Regenerate Mana {a}%",
    "shortDescr": "Regenerate Mana"
  },
  "stam": {
    "name": "stam",
    "descr": "+{a} Maximum Stamina",
    "shortDescr": "Maximum Stamina"
  },
  "stam/lvl": {
    "name": "stam/lvl",
    "descr": "+{a} Maximum Stamina ({a}/lvl)",
    "shortDescr": "Maximum Stamina / lvl"
  },
  "regen-stam": {
    "name": "regen-stam",
    "descr": "Heal Stamina Plus {a}%",
    "shortDescr": "Heal Stamina Plus"
  },
  "regen-stam/lvl": {
    "name": "regen-stam/lvl",
    "descr": "Heal Stamina Plus +{a}% ({a}/lvl)",
    "shortDescr": "Heal Stamina Plus / lvl"
  },
  "stam-drain": {
    "name": "stam-drain",
    "descr": "{a}% Stamina Drain",
    "shortDescr": "Stamina Drain"
  },
  "ac": {
    "name": "ac",
    "descr": "+{a} Defense",
    "shortDescr": "Defense"
  },
  "ac/lvl": {
    "name": "ac/lvl",
    "descr": "+{a} Defense ({a}/lvl)",
    "shortDescr": "Defense / lvl"
  },
  "ac%": {
    "name": "ac%",
    "descr": "+{a}% Enhanced Defense",
    "shortDescr": "Enhanced Defense"
  },
  "ac-miss": {
    "name": "ac-miss",
    "descr": "+{a} Defense vs. Missile",
    "shortDescr": "Defense vs. Missile"
  },
  "ac-hth": {
    "name": "ac-hth",
    "descr": "+{a} Defense vs. Melee",
    "shortDescr": "Defense vs. Melee"
  },
  "red-dmg": {
    "name": "red-dmg",
    "descr": "Damage Reduced by {a}",
    "shortDescr": "Damage Reduced"
  },
  "red-dmg%": {
    "name": "red-dmg%",
    "descr": "Damage Reduced by {a}%",
    "shortDescr": "Damage Reduced"
  },
  "red-mag": {
    "name": "red-mag",
    "descr": "Magic Damage Reduced by {a}",
    "shortDescr": "Magic Damage Reduced"
  },
  "block": {
    "name": "block",
    "descr": "{a}% Increased Chance of Blocking",
    "shortDescr": "Increased Chance of Blocking"
  },
  "balance": {
    "name": "balance",
    "descr": "+{a}% Faster Hit Recovery",
    "shortDescr": "Faster Hit Recovery"
  },
  "block-rate": {
    "name": "block-rate",
    "descr": "+{a}% Faster Block Rate",
    "shortDescr": "Faster Block Rate"
  },
  "res-all": {
    "name": "res-all",
    "descr": "Fire Resist +{a}%",
    "shortDescr": "Fire Resist"
  },
  "res-fire": {
    "name": "res-fire",
    "descr": "Fire Resist +{a}%",
    "shortDescr": "Fire Resist"
  },
  "res-cold": {
    "name": "res-cold",
    "descr": "Cold Resist +{a}%",
    "shortDescr": "Cold Resist"
  },
  "res-ltng": {
    "name": "res-ltng",
    "descr": "Lightning Resist +{a}%",
    "shortDescr": "Lightning Resist"
  },
  "res-ltng/lvl": {
    "name": "res-ltng/lvl",
    "descr": "Lightning Resist {a}% ({a}/lvl)",
    "shortDescr": "Lightning Resist / lvl"
  },
  "res-pois": {
    "name": "res-pois",
    "descr": "Poison Resist +{a}%",
    "shortDescr": "Poison Resist"
  },
  "res-mag": {
    "name": "res-mag",
    "descr": "Magic Resist +{a}%",
    "shortDescr": "Magic Resist"
  },
  "res-fire-max": {
    "name": "res-fire-max",
    "descr": "+{a}% to Maximum Fire Resist",
    "shortDescr": "Maximum Fire Resist"
  },
  "res-cold-max": {
    "name": "res-cold-max",
    "descr": "+{a}% to Maximum Cold Resist",
    "shortDescr": "Maximum Cold Resist"
  },
  "res-ltng-max": {
    "name": "res-ltng-max",
    "descr": "+{a}% to Maximum Lightning Resist",
    "shortDescr": "Maximum Lightning Resist"
  },
  "res-pois-max": {
    "name": "res-pois-max",
    "descr": "+{a}% to Maximum Poison Resist",
    "shortDescr": "Maximum Poison Resist"
  },
  "abs-fire": {
    "name": "abs-fire",
    "descr": "+{a} Fire Absorb",
    "shortDescr": "Fire Absorb"
  },
  "abs-fire/lvl": {
    "name": "abs-fire/lvl",
    "descr": "+{a} Absorbs Fire Damage ({a}/lvl)",
    "shortDescr": "Absorbs Fire Damage / lvl"
  },
  "abs-fire%": {
    "name": "abs-fire%",
    "descr": "Fire Absorb {a}%",
    "shortDescr": "Fire Absorb"
  },
  "abs-cold": {
    "name": "abs-cold",
    "descr": "+{a} Cold Absorb",
    "shortDescr": "Cold Absorb"
  },
  "abs-cold/lvl": {
    "name": "abs-cold/lvl",
    "descr": "+{a} Absorbs Cold Damage ({a}/lvl)",
    "shortDescr": "Absorbs Cold Damage / lvl"
  },
  "abs-cold%": {
    "name": "abs-cold%",
    "descr": "Cold Absorb {a}%",
    "shortDescr": "Cold Absorb"
  },
  "abs-ltng": {
    "name": "abs-ltng",
    "descr": "+{a} Lightning Absorb",
    "shortDescr": "Lightning Absorb"
  },
  "abs-ltng%": {
    "name": "abs-ltng%",
    "descr": "Lightning Absorb {a}%",
    "shortDescr": "Lightning Absorb"
  },
  "abs-mag": {
    "name": "abs-mag",
    "descr": "+{a} Magic Absorb",
    "shortDescr": "Magic Absorb"
  },
  "res-pois-len": {
    "name": "res-pois-len",
    "descr": "Poison Length Reduced by {a}%",
    "shortDescr": "Poison Length Reduced"
  },
  "half-freeze": {
    "name": "half-freeze",
    "descr": "Half Freeze Duration",
    "shortDescr": "Half Freeze Duration"
  },
  "no-freeze": {
    "name": "no-freeze",
    "descr": "Cannot Be Frozen",
    "shortDescr": "Cannot Be Frozen"
  },
  "dmg-to-mana": {
    "name": "dmg-to-mana",
    "descr": "{a}% Damage Taken Goes To Mana",
    "shortDescr": "Damage Taken Goes To Mana"
  },
  "dmg": {
    "name": "dmg",
    "descr": "Damage +{a}",
    "shortDescr": "Damage"
  },
  "dmg-norm": {
    "name": "dmg-norm",
    "descr": "Adds +{a}-{b} Damage",
    "shortDescr": "Adds Damage"
  },
  "dmg/lvl": {
    "name": "dmg/lvl",
    "descr": "+{a} to Maximum Damage ({a}/lvl)",
    "shortDescr": "Maximum Damage / lvl"
  },
  "dmg%": {
    "name": "dmg%",
    "descr": "+{a}% Enhanced Damage",
    "shortDescr": "Enhanced Damage"
  },
  "dmg%/lvl": {
    "name": "dmg%/lvl",
    "descr": "+{a}% Enhanced Maximum Damage ({a}/lvl)",
    "shortDescr": "Enhanced Maximum Damage / lvl"
  },
  "dmg-min": {
    "name": "dmg-min",
    "descr": "+{a} to Minimum Damage",
    "shortDescr": "Minimum Damage"
  },
  "dmg-max": {
    "name": "dmg-max",
    "descr": "+{a} to Maximum Damage",
    "shortDescr": "Maximum Damage"
  },
  "dmg-demon": {
    "name": "dmg-demon",
    "descr": "+{a}% Damage to Demons",
    "shortDescr": "Damage to Demons"
  },
  "dmg-dem/lvl": {
    "name": "dmg-dem/lvl",
    "descr": "+{a}% Damage to Demons ({a}/lvl)",
    "shortDescr": "Damage to Demons / lvl"
  },
  "dmg-undead": {
    "name": "dmg-undead",
    "descr": "+{a}% Damage to Undead",
    "shortDescr": "Damage to Undead"
  },
  "dmg-und/lvl": {
    "name": "dmg-und/lvl",
    "descr": "+{a}% Damage to Undead ({a}/lvl)",
    "shortDescr": "Damage to Undead / lvl"
  },
  "dmg-fire": {
    "name": "dmg-fire",
    "descr": "Adds +{a}-{b} Fire Damage",
    "shortDescr": "Fire Damage"
  },
  "dmg-cold": {
    "name": "dmg-cold",
    "descr": "Adds +{a}-{b} Cold Damage",
    "shortDescr": "Cold Damage"
  },
  "dmg-ltng": {
    "name": "dmg-ltng",
    "descr": "Adds +{a}-{b} Lightning Damage",
    "shortDescr": "Lightning Damage"
  },
  "dmg-pois": {
    "name": "dmg-pois",
    "descr": "+{a} Poison Damage Over {b} Seconds",
    "shortDescr": "Poison Damage"
  },
  "dmg-mag": {
    "name": "dmg-mag",
    "descr": "Adds +{a}-{b} Magic Damage",
    "shortDescr": "Magic Damage"
  },
  "thorns": {
    "name": "thorns",
    "descr": "Attacker Takes Damage of {a}",
    "shortDescr": "Attacker Takes Damage"
  },
  "thorns/lvl": {
    "name": "thorns/lvl",
    "descr": "Attacker Takes Damage of {a} ({a}/lvl)",
    "shortDescr": "Attacker Takes Damage / lvl"
  },
  "light-thorns": {
    "name": "light-thorns",
    "descr": "Attacker Takes Lightning Damage of {a}",
    "shortDescr": "Attacker Takes Lightning Damage"
  },
  "extra-fire": {
    "name": "extra-fire",
    "descr": "+{a}% to Fire Skill Damage",
    "shortDescr": "Fire Skill Damage"
  },
  "extra-ltng": {
    "name": "extra-ltng",
    "descr": "+{a}% to Lightning Skill Damage",
    "shortDescr": "Lightning Skill Damage"
  },
  "extra-cold": {
    "name": "extra-cold",
    "descr": "+{a}% to Cold Skill Damage",
    "shortDescr": "Cold Skill Damage"
  },
  "extra-pois": {
    "name": "extra-pois",
    "descr": "+{a}% to Poison Skill Damage",
    "shortDescr": "Poison Skill Damage"
  },
  "att": {
    "name": "att",
    "descr": "+{a} to Attack Rating",
    "shortDescr": "Attack Rating"
  },
  "att/lvl": {
    "name": "att/lvl",
    "descr": "+{a} to Attack Rating ({a}/lvl)",
    "shortDescr": "Attack Rating / lvl"
  },
  "att%": {
    "name": "att%",
    "descr": "{a}% bonus to Attack Rating",
    "shortDescr": "bonus to Attack Rating"
  },
  "att-demon": {
    "name": "att-demon",
    "descr": "+{a} to Attack Rating against Demons",
    "shortDescr": "Attack Rating against Demons"
  },
  "att-dem/lvl": {
    "name": "att-dem/lvl",
    "descr": "+{a} to Attack Rating against Demons ({a}/lvl)",
    "shortDescr": "Attack Rating against Demons / lvl"
  },
  "att-undead": {
    "name": "att-undead",
    "descr": "+{a} to Attack Rating against Undead",
    "shortDescr": "Attack Rating against Undead"
  },
  "att-und/lvl": {
    "name": "att-und/lvl",
    "descr": "+{a} to Attack Rating against Undead ({a}/lvl)",
    "shortDescr": "Attack Rating against Undead / lvl"
  },
  "swing": {
    "name": "swing",
    "descr": "+{a}% Increased Attack Speed",
    "shortDescr": "Increased Attack Speed"
  },
  "knock": {
    "name": "knock",
    "descr": "Knockback",
    "shortDescr": "Knockback"
  },
  "life-steal": {
    "name": "life-steal",
    "descr": "{a}% Life stolen per hit",
    "shortDescr": "Life stolen per hit"
  },
  "mana-steal": {
    "name": "mana-steal",
    "descr": "{a}% Mana stolen per hit",
    "shortDescr": "Mana stolen per hit"
  },
  "heal-kill": {
    "name": "heal-kill",
    "descr": "+{a} Life after each Kill",
    "shortDescr": "Life after each Kill"
  },
  "demon-heal": {
    "name": "demon-heal",
    "descr": "+{a} Life after each Demon Kill",
    "shortDescr": "Life after each Demon Kill"
  },
  "mana-kill": {
    "name": "mana-kill",
    "descr": "+{a} to Mana after each Kill",
    "shortDescr": "Mana after each Kill"
  },
  "move": {
    "name": "move",
    "descr": "+{a}% Faster Run/Walk",
    "shortDescr": "Faster Run/Walk"
  },
  "cast": {
    "name": "cast",
    "descr": "+{a}% Faster Cast Rate",
    "shortDescr": "Faster Cast Rate"
  },
  "howl": {
    "name": "howl",
    "descr": "Hit Causes Monster To Flee {a}%",
    "shortDescr": "Hit Causes Monster To Flee"
  },
  "stupidity": {
    "name": "stupidity",
    "descr": "Hit blinds target",
    "shortDescr": "Hit blinds target"
  },
  "ignore-ac": {
    "name": "ignore-ac",
    "descr": "Ignore Target's Defense",
    "shortDescr": "Ignore Target's Defense"
  },
  "reduce-ac": {
    "name": "reduce-ac",
    "descr": "-{a}% Target Defense",
    "shortDescr": "Target Defense"
  },
  "dmg-ac": {
    "name": "dmg-ac",
    "descr": "+{a} to Monster Defense Per Hit",
    "shortDescr": "Monster Defense Per Hit"
  },
  "no-heal": {
    "name": "no-heal",
    "descr": "Prevent Monster Heal",
    "shortDescr": "Prevent Monster Heal"
  },
  "slow": {
    "name": "slow",
    "descr": "Slows target by {a}%",
    "shortDescr": "Slows target"
  },
  "freeze": {
    "name": "freeze",
    "descr": "Freezes target (VAL > 1 && +VAL)",
    "shortDescr": "Freezes target"
  },
  "crush": {
    "name": "crush",
    "descr": "{a}% Chance of Crushing Blow",
    "shortDescr": "Chance of Crushing Blow"
  },
  "open-wounds": {
    "name": "open-wounds",
    "descr": "{a}% Chance of Open Wounds",
    "shortDescr": "Chance of Open Wounds"
  },
  "deadly": {
    "name": "deadly",
    "descr": "{a}% Deadly Strike",
    "shortDescr": "Deadly Strike"
  },
  "deadly/lvl": {
    "name": "deadly/lvl",
    "descr": "{a}% Deadly Strike ({a}/lvl)",
    "shortDescr": "Deadly Strike / lvl"
  },
  "pierce": {
    "name": "pierce",
    "descr": "Piercing Attack",
    "shortDescr": "Piercing Attack"
  },
  "pierce-fire": {
    "name": "pierce-fire",
    "descr": "-{a}% to Enemy Fire Resistance",
    "shortDescr": "Enemy Fire Resistance"
  },
  "pierce-ltng": {
    "name": "pierce-ltng",
    "descr": "-{a}% to Enemy Lightning Resistance",
    "shortDescr": "Enemy Lightning Resistance"
  },
  "pierce-cold": {
    "name": "pierce-cold",
    "descr": "-{a}% to Enemy Cold Resistance",
    "shortDescr": "Enemy Cold Resistance"
  },
  "pierce-pois": {
    "name": "pierce-pois",
    "descr": "-{a}% to Enemy Poison Resistance",
    "shortDescr": "Enemy Poison Resistance"
  },
  "reanimate": {
    "name": "reanimate",
    "descr": "{a}% Reanimate as:",
    "shortDescr": "Reanimate"
  },
  "rip": {
    "name": "rip",
    "descr": "Slain Monsters Rest in Peace",
    "shortDescr": "Slain Monsters Rest in Peace"
  },
  "mag%": {
    "name": "mag%",
    "descr": "{a}% better chance of getting magic item",
    "shortDescr": "better chance of getting magic item"
  },
  "mag%/lvl": {
    "name": "mag%/lvl",
    "descr": "{a}% better chance of getting magic item ({a}/lvl)",
    "shortDescr": "better chance of getting magic item / lvl"
  },
  "gold%": {
    "name": "gold%",
    "descr": "{a}% extra gold from monsters",
    "shortDescr": "extra gold from monsters"
  },
  "gold%/lvl": {
    "name": "gold%/lvl",
    "descr": "{a}% extra gold from monsters ({a}/lvl)",
    "shortDescr": "extra gold from monsters / lvl"
  },
  "ease": {
    "name": "ease",
    "descr": "Requirements +{a}%",
    "shortDescr": "Requirements"
  },
  "light": {
    "name": "light",
    "descr": "+{a} to Light Radius",
    "shortDescr": "Light Radius"
  },
  "ethereal": {
    "name": "ethereal",
    "descr": "Ethereal (Cannot Be Repaired)",
    "shortDescr": "Ethereal"
  },
  "indestructible": {
    "name": "indestructible",
    "descr": "Indestructible",
    "shortDescr": "Indestructible"
  },
  "sock": {
    "name": "sock",
    "descr": "Socketed ({a})",
    "shortDescr": "Add Sockets"
  },
  "dur": {
    "name": "dur",
    "descr": "+{a} Durability",
    "shortDescr": "Durability"
  },
  "dur%": {
    "name": "dur%",
    "descr": "Increase Maximum Durability {a}%",
    "shortDescr": "Increase Maximum Durability"
  },
  "rep-dur": {
    "name": "rep-dur",
    "descr": "Repairs {a} Durability In {b} Seconds",
    "shortDescr": "Repairs Durability"
  },
  "rep-quant": {
    "name": "rep-quant",
    "descr": "Replenishes quantity",
    "shortDescr": "Replenishes quantity"
  },
  "stack": {
    "name": "stack",
    "descr": "Increased Stack Size",
    "shortDescr": "Increased Stack Size"
  },
  "add-xp": {
    "name": "add-xp",
    "descr": "+{a}% to Experience Gained",
    "shortDescr": "Experience Gained"
  },
  "cheap": {
    "name": "cheap",
    "descr": "Reduces all Vendor Prices {a}%",
    "shortDescr": "Reduces all Vendor Prices"
  },
  "class-skills": {
    "name": "class-skills",
    "descr": "{a} To {b} Skill Levels",
    "shortDescr": "All Class Skills"
  },
  "fire-skill": {
    "name": "fire-skill",
    "descr": "+{a} to Fire Skills",
    "shortDescr": "Fire Skills"
  },
  "all-skills": {
    "name": "all-skills",
    "descr": "+{a} to All Skills",
    "shortDescr": "All Skills"
  },
  "magic-arrow": {
    "name": "magic-arrow",
    "descr": "Fires Magic Arrows",
    "shortDescr": "Fires Magic Arrows"
  },
  "explosive-arrow": {
    "name": "explosive-arrow",
    "descr": "Fires Explosive Arrows or Bolts",
    "shortDescr": "Fires Explosive Arrows or Bolts"
  },
  "single-skill": {
    "name": "single-skill",
    "descr": "{a} To {b} ({c} Only)",
    "shortDescr": "Class Single Skill"
  },
  "tab-skill": {
    "name": "tab-skill",
    "descr": "{a} To {b} ({c} Only)",
    "shortDescr": "Tree/Tab Skills"
  },
  "aura": {
    "name": "aura",
    "descr": "Level {a} {b} Aura When Equipped",
    "shortDescr": "Aura"
  },
  "charged-skill": {
    "name": "charged-skill",
    "descr": "Level {a} {b} ({c}/{c} Charges)",
    "shortDescr": "Charged Skill"
  },
  "cast-skill": {
    "name": "cast-skill",
    "descr": "{a}% Chance To Cast Level {b} {c}",
    "shortDescr": "Chance To Cast Skill"
  },
  "o-skill": {
    "name": "o-skill",
    "descr": "{a} To {b}",
    "shortDescr": "Non-Class Skill"
  }
}