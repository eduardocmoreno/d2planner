type GearSlot = 'head' | 'torso' | 'belt' | 'gloves' | 'boots' | 'left-hand' | 'right-hand' | 'amulet' | 'left-ring' | 'right-ring' | 'torch' | 'annihilus' | 'small-charms' | 'large-charms' | 'grand-charms';

type ItemRarity = 'normal' | 'magic' | 'rare' | 'unique' | 'set' | 'runeword';
type ItemWeaponClass = '1hs' | '2hs' | 'stf' | '1ht' | '2ht' | 'bow' | 'xbw' | 'ht1';
type ItemVisibleProps = 'minDef' | 'block' | 'minDmg' | 'twoHandMinDmg' | 'throwMinDmg' | 'levelReq' | 'strReq' | 'dexReq' | 'sockets' | 'speed';
type ItemWeaponType = 'axe' | 'taxe' | 'swor' | 'knif' | 'tkni' | 'spea' | 'aspe' | 'jave' | 'ajav' | 'pole' | 'club' | 'hamm' | 'mace' | 'scep' | 'wand' | 'staf' | 'orb' | 'h2h' | 'h2h2' | 'bow' | 'abow' | 'xbow' | 'tpot';
type ItemType = ItemWeaponType | 'helm' | 'tors' | 'shie' | 'glov' | 'boot' | 'belt' | 'pelt' | 'phlm' | 'ashd' | 'head' | 'circ' | 'ring' | 'amul' | 'scha' | 'lcha' | 'gcha' | 'torc';

interface Gear {
  slot: GearSlot;
  icon: string;
  base: Partial<Item>;
  mods: ItemMod[];
}

interface Item {
  name: string;
  code: string;
  id?: string;
  uberCode?: string;
  ultraCode?: string;
  type?: ItemType;
  minDef?: number;
  maxDef?: number;
  block?: number;
  strReq?: number;
  strBonus?: number;
  dexReq?: number;
  dexBonus?: number;
  durability?: number;
  nodurability?: number;
  lvl?: number;
  lvlReq?: number;
  sockets?: number;
  weaponClass?: ItemWeaponClass;
  twoHandWeaponClass?: ItemWeaponClass;
  minDmg?: number;
  maxDmg?: number;
  twoHandMinDmg?: number;
  twoHandMaxDmg?: number;
  throwMinDmg?: number;
  throwMaxDmg?: number;
  missileType?: number;
  speed?: number;
  twoHanded?: 1 | 0;
  oneOrTwoHanded?: 1 | 0;
  missiletype?: number;
  magicLvl?: number;
  rarity?: ItemRarity;
  costMult?: number;
  image?: string;
  mods?: ItemMod[];
}

interface GearSlotSelected {
  name: GearSlot;
  position: number;
}

type ItemModPartialClassSkill = Subset<ItemModName, 'tab-skill' | 'single-skill'>;
type ItemModRange = Subset<ItemModName, 'dmg' | 'dmg-fire' | 'dmg-cold' | 'dmg-ltng'>;
type ItemModBocl = Subset<ItemModName, 'str/lvl' | 'dex/lvl' | 'vit/lvl' | 'att/lvl' | 'deadly/lvl' | 'mag%/lvl' | 'ac/lvl' | 'res-ltng/lvl' | 'dmg/lvl' | 'dmg%/lvl' | 'dmg-dem/lvl' | 'dmg-und/lvl' | 'hp/lvl' | 'mana/lvl'>;
type ItemModBoolean = Subset<ItemModName, 'ethereal' | 'no-heal' | 'ignore-ac' | 'knock' | 'stupidity' | 'indestructible' | 'no-freeze' | 'half-freeze' | 'rip'>;

interface GearContext {
  armorData: Item[];
  weaponsData: Item[];
  modsData: ItemModsData;
  boclMods: ItemModBocl[];
  rangeMods: ItemModRange[];
  booleanMods: ItemModBoolean[];
  partialClassSkillMods: ItemModPartialClassSkill[];
  selectedSlot: GearSlotSelected;
  setSelectedSlot: React.Dispatch<React.SetStateAction<GearSlotSelected>>;
}

interface GearReducer {
  type: 'BASE' | 'ADD_MOD' | 'UPDATE_MOD' | 'DELETE_MOD' | 'RESET';
  payload: {
    slot: Gear['slot'];
    base?: Partial<Item>;
    newMod?: ItemMod;
    targetMod?: ItemMod;
    charLevel?: number;
    initialState?: Gear[];
  }
}

interface ItemsReducer {
  type: 'CREATE_ITEM' | 'UPDATE_ITEM' | 'DELETE_ITEM' | 'ADD_MOD' | 'UPDATE_MOD' | 'DELETE_MOD' | 'CLEAR_MODS';
  payload: {
    id: string;
    code?: string;
    rarity?: ItemRarity;
    mod?: ItemMod;
  };
}

type ItemModName =
  "all-stats" |
  "str" |
  "str/lvl" |
  "dex" |
  "dex/lvl" |
  "vit" |
  "vit/lvl" |
  "enr" |
  "hp" |
  "hp%" |
  "hp/lvl" |
  "regen" |
  "mana" |
  "mana%" |
  "mana/lvl" |
  "regen-mana" |
  "stam" |
  "stam/lvl" |
  "regen-stam" |
  "regen-stam/lvl" |
  "stam-drain" |


  "ac" |
  "ac/lvl" |
  "ac%" |
  "ac-miss" |
  "ac-hth" |
  "red-dmg" |
  "red-dmg%" |
  "red-mag" |
  "block" |
  "balance" |
  "block-rate" |


  "res-all" |
  "res-fire" |
  "res-cold" |
  "res-ltng" |
  "res-ltng/lvl" |
  "res-pois" |
  "res-mag" |
  "res-fire-max" |
  "res-cold-max" |
  "res-ltng-max" |
  "res-pois-max" |
  "abs-fire" |
  "abs-fire/lvl" |
  "abs-fire%" |
  "abs-cold" |
  "abs-cold/lvl" |
  "abs-cold%" |
  "abs-ltng" |
  "abs-ltng%" |
  "abs-mag" |
  "res-pois-len" |
  "half-freeze" |
  "no-freeze" |
  "dmg-to-mana" |


  "dmg" |
  "dmg-norm" |
  "dmg/lvl" |
  "dmg%" |
  "dmg%/lvl" |
  "dmg-min" |
  "dmg-max" |
  "dmg-demon" |
  "dmg-dem/lvl" |
  "dmg-undead" |
  "dmg-und/lvl" |
  "dmg-fire" |
  "dmg-cold" |
  "dmg-ltng" |
  "dmg-pois" |
  "dmg-mag" |
  "thorns" |
  "thorns/lvl" |
  "light-thorns" |
  "extra-fire" |
  "extra-ltng" |
  "extra-cold" |
  "extra-pois" |


  "att" |
  "att/lvl" |
  "att%" |
  "att-demon" |
  "att-dem/lvl" |
  "att-undead" |
  "att-und/lvl" |
  "swing" |
  "knock" |
  "life-steal" |
  "mana-steal" |
  "heal-kill" |
  "demon-heal" |
  "mana-kill" |
  "move" |
  "cast" |
  "howl" |
  "stupidity" |
  "ignore-ac" |
  "reduce-ac" |
  "dmg-ac" |
  "no-heal" |
  "slow" |
  "freeze" |
  "crush" |
  "open-wounds" |
  "deadly" |
  "deadly/lvl" |
  "pierce" |
  "pierce-fire" |
  "pierce-ltng" |
  "pierce-cold" |
  "pierce-pois" |
  "reanimate" |
  "rip" |


  "mag%" |
  "mag%/lvl" |
  "gold%" |
  "gold%/lvl" |
  "ease" |
  "light" |
  "ethereal" |
  "indestructible" |
  "sock" |
  "dur" |
  "dur%" |
  "rep-dur" |
  "rep-quant" |
  "stack" |
  "add-xp" |
  "cheap" |


  "all-skills" |
  "class-skills" |
  "tab-skill" |
  "single-skill" |
  "aura" |
  "fire-skill" |
  "magic-arrow" |
  "explosive-arrow" |
  "charged-skill" |
  "cast-skill" |
  "o-skill";

type ItemModCategoryName = 'damage' | 'defenses' | 'offenses' | 'attributes' | 'resists' | 'skills' | 'misc';
type ItemModsData = Record<ItemModName, ItemMod>;

interface ItemMod {
  name: ItemModName;
  id?: number;
  //subName?: string;
  descr?: string;
  shortDescr?: string;
  inputMin?: number;
  inputMax?: number;
  step?: number;
  duration?: number;
  tree?: number;
  skill?: number;
  lvl?: number;
  value?: number;
  //maxVal?: number;
  //minVal?: number;
  //class?: CharClass;
  charges?: number;
  chance?: number;
  event?: 'On Attack' | 'On Striking' | 'When Struck' | 'When You Kill an Enemy' | 'When You Level-up' | 'When You Die';
}

interface ItemSubOptions {
  str: string;
  all: Partial<Record<number, string>>;
  available: Partial<Record<number, string>>;
}

/* 
[ 
  {
    id: 'allSkills',
    value: 1
  },
  {
    id: 'strength',
    value: 30
  },
  {
    id: 'treeSkills',
    subId: 1, //combat skills for example
    value: 1 //+1 skill for example
  },
  {
    id: 'treeSkills',
    subId: 3, //DEFENSIVE AURAS for example
    value: 2 //+2 skills for example
  },
  {
    id: 'singleSkill',
    subId: 19, //fanaticism for example
    value: 1
  },
  {
    id: 'fireDmg',
    min: 5,
    max: 20 //Adds 5-20 Fire Damage
  },
  {
    id: 'ncSkill',
    class: 'barbarian',
    subId: 27 //battle orders
    value: 6
  },
  {
    id: 'chargedSkill',
    class: 'sorceress',
    subId: 7 //enchant,
    value: 10,
    charges: 11
  },
  {
    id: 'castSkill',
    class: 'assassin',
    subId: 19 //venom,
    value: 15,
    chance: 10,
    event: striking
  }
]
*/