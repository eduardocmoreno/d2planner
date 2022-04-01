const itemStatCost = {
  "strength": {
    "descstrpos": "ModStr1a",
    "descstrneg": "ModStr1a",
    "id": 0,
    "add": 125,
    "multiply": 55,
    "descpriority": 67,
    "descfunc": 1,
    "descval": 1,
    "savebits": 8,
    "saveadd": 32,
    "csvbits": 10
  },
  "energy": {
    "opstat1": "maxmana",
    "descstrpos": "ModStr1d",
    "descstrneg": "ModStr1d",
    "id": 1,
    "add": 100,
    "multiply": 55,
    "op": 8,
    "descpriority": 61,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 32,
    "csvbits": 10
  },
  "dexterity": {
    "descstrpos": "ModStr1b",
    "descstrneg": "ModStr1b",
    "id": 2,
    "add": 125,
    "multiply": 55,
    "descpriority": 65,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 32,
    "csvbits": 10
  },
  "vitality": {
    "opstat1": "maxhp",
    "opstat2": "maxstamina",
    "descstrpos": "ModStr1c",
    "descstrneg": "ModStr1c",
    "id": 3,
    "add": 100,
    "multiply": 55,
    "op": 9,
    "descpriority": 63,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 32,
    "csvbits": 10
  },
  "statpts": {
    "id": 4,
    "csvbits": 10
  },
  "newskills": {
    "id": 5,
    "csvbits": 8
  },
  "hitpoints": {
    "id": 6,
    "csvbits": 21
  },
  "maxhp": {
    "descstrpos": "ModStr1u",
    "descstrneg": "ModStr1u",
    "id": 7,
    "add": 56,
    "multiply": 20,
    "descpriority": 59,
    "descfunc": 1,
    "descval": 1,
    "savebits": 9,
    "saveadd": 32,
    "csvbits": 21
  },
  "mana": {
    "id": 8,
    "csvbits": 21
  },
  "maxmana": {
    "descstrpos": "ModStr1e",
    "descstrneg": "ModStr1e",
    "id": 9,
    "add": 81,
    "multiply": 20,
    "descpriority": 55,
    "descfunc": 1,
    "descval": 1,
    "savebits": 8,
    "saveadd": 32,
    "csvbits": 21
  },
  "stamina": {
    "id": 10,
    "csvbits": 21
  },
  "maxstamina": {
    "descstrpos": "ModStr5d",
    "descstrneg": "ModStr5d",
    "id": 11,
    "add": 75,
    "multiply": 20,
    "descpriority": 51,
    "descfunc": 1,
    "descval": 1,
    "savebits": 8,
    "saveadd": 32,
    "csvbits": 21
  },
  "level": {
    "id": 12,
    "csvbits": 7
  },
  "experience": {
    "id": 13,
    "csvbits": 32
  },
  "gold": {
    "id": 14,
    "csvbits": 25
  },
  "goldbank": {
    "id": 15,
    "csvbits": 25
  },
  "item_armor_percent": {
    "opstat1": "armorclass",
    "descstrpos": "Modstr2v",
    "descstrneg": "Modstr2v",
    "id": 16,
    "add": 47,
    "multiply": 20,
    "op": 13,
    "descpriority": 74,
    "descfunc": 4,
    "descval": 1,
    "savebits": 9,
    "saveadd": 0
  },
  "item_maxdamage_percent": {
    "opstat1": "maxdamage",
    "opstat2": "secondary_maxdamage",
    "opstat3": "item_throw_maxdamage",
    "descstrpos": "ModStr2j",
    "descstrneg": "ModStr2j",
    "id": 17,
    "add": 45,
    "multiply": 20,
    "op": 13,
    "descpriority": 129,
    "descfunc": 3,
    "descval": 0,
    "damagerelated": 1,
    "savebits": 9,
    "saveadd": 0
  },
  "item_mindamage_percent": {
    "opstat1": "mindamage",
    "opstat2": "secondary_mindamage",
    "opstat3": "item_throw_mindamage",
    "descstrpos": "ModStr2k",
    "descstrneg": "ModStr2k",
    "id": 18,
    "add": 45,
    "multiply": 20,
    "op": 13,
    "descpriority": 130,
    "descfunc": 3,
    "descval": 0,
    "damagerelated": 1,
    "savebits": 9,
    "saveadd": 0
  },
  "tohit": {
    "descstrpos": "ModStr1h",
    "descstrneg": "ModStr1h",
    "id": 19,
    "add": 15,
    "multiply": 10,
    "descpriority": 115,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 10
  },
  "toblock": {
    "descstrpos": "ModStr3g",
    "descstrneg": "ModStr3g",
    "id": 20,
    "add": 89,
    "multiply": 204,
    "descpriority": 134,
    "descfunc": 2,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "mindamage": {
    "descstrpos": "ModStr1g",
    "descstrneg": "ModStr1g",
    "id": 21,
    "add": 122,
    "multiply": 25,
    "descpriority": 127,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "maxdamage": {
    "descstrpos": "ModStr1f",
    "descstrneg": "ModStr1f",
    "id": 22,
    "add": 94,
    "multiply": 16,
    "descpriority": 126,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "secondary_mindamage": {
    "descstrpos": "ModStr1g",
    "descstrneg": "ModStr1g",
    "id": 23,
    "add": 97,
    "multiply": 15,
    "descpriority": 124,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "secondary_maxdamage": {
    "descstrpos": "ModStr1f",
    "descstrneg": "ModStr1f",
    "id": 24,
    "add": 85,
    "multiply": 11,
    "descpriority": 123,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "damagepercent": {
    "id": 25,
    "add": 45,
    "multiply": 40,
    "damagerelated": 1,
    "savebits": 8,
    "saveadd": 0
  },
  "manarecovery": {
    "id": 26,
    "savebits": 8,
    "saveadd": 0
  },
  "manarecoverybonus": {
    "descstrpos": "ModStr4g",
    "descstrneg": "ModStr4g",
    "id": 27,
    "descpriority": 52,
    "descfunc": 2,
    "descval": 2,
    "savebits": 8,
    "saveadd": 0
  },
  "staminarecoverybonus": {
    "descstrpos": "ModStr3v",
    "descstrneg": "ModStr3v",
    "id": 28,
    "descpriority": 48,
    "descfunc": 2,
    "descval": 2,
    "savebits": 8,
    "saveadd": 0
  },
  "lastexp": {
    "id": 29
  },
  "nextexp": {
    "id": 30
  },
  "armorclass": {
    "descstrpos": "ModStr1i",
    "descstrneg": "ModStr1i",
    "id": 31,
    "add": 17,
    "multiply": 10,
    "descpriority": 71,
    "descfunc": 1,
    "descval": 1,
    "savebits": 11,
    "saveadd": 10
  },
  "armorclass_vs_missile": {
    "descstrpos": "ModStr6a",
    "descstrneg": "ModStr6a",
    "id": 32,
    "add": 11,
    "multiply": 5,
    "descpriority": 69,
    "descfunc": 1,
    "descval": 1,
    "savebits": 9,
    "saveadd": 0
  },
  "armorclass_vs_hth": {
    "descstrpos": "ModStr6b",
    "descstrneg": "ModStr6b",
    "id": 33,
    "add": 13,
    "multiply": 7,
    "descpriority": 70,
    "descfunc": 1,
    "descval": 1,
    "savebits": 8,
    "saveadd": 0
  },
  "normal_damage_reduction": {
    "descstrpos": "ModStr2u",
    "descstrneg": "ModStr2u",
    "id": 34,
    "add": 188,
    "multiply": 200,
    "descpriority": 22,
    "descfunc": 3,
    "descval": 2,
    "savebits": 6,
    "saveadd": 0
  },
  "magic_damage_reduction": {
    "descstrpos": "ModStr2t",
    "descstrneg": "ModStr2t",
    "id": 35,
    "add": 397,
    "multiply": 340,
    "descpriority": 21,
    "descfunc": 3,
    "descval": 2,
    "savebits": 6,
    "saveadd": 0
  },
  "damageresist": {
    "descstrpos": "ModStr2u",
    "descstrneg": "ModStr2u",
    "id": 36,
    "add": 152,
    "multiply": 68,
    "descpriority": 22,
    "descfunc": 2,
    "descval": 2,
    "savebits": 8,
    "saveadd": 0
  },
  "magicresist": {
    "descstrpos": "ModStr1m",
    "descstrneg": "ModStr1m",
    "id": 37,
    "add": 164,
    "multiply": 68,
    "descpriority": 41,
    "descfunc": 4,
    "descval": 2,
    "savebits": 8,
    "saveadd": 0
  },
  "maxmagicresist": {
    "descstrpos": "ModStr5x",
    "descstrneg": "ModStr5x",
    "id": 38,
    "add": 1091,
    "multiply": 409,
    "descpriority": 46,
    "descfunc": 4,
    "descval": 1,
    "savebits": 5,
    "saveadd": 0
  },
  "fireresist": {
    "descstrpos": "ModStr1j",
    "descstrneg": "ModStr1j",
    "id": 39,
    "add": 43,
    "multiply": 20,
    "descpriority": 36,
    "descfunc": 4,
    "descval": 2,
    "savebits": 8,
    "saveadd": 50
  },
  "maxfireresist": {
    "descstrpos": "ModStr5u",
    "descstrneg": "ModStr5u",
    "id": 40,
    "add": 584,
    "multiply": 256,
    "descpriority": 42,
    "descfunc": 4,
    "descval": 1,
    "savebits": 5,
    "saveadd": 0
  },
  "lightresist": {
    "descstrpos": "ModStr1l",
    "descstrneg": "ModStr1l",
    "id": 41,
    "add": 43,
    "multiply": 20,
    "descpriority": 38,
    "descfunc": 4,
    "descval": 2,
    "savebits": 8,
    "saveadd": 50
  },
  "maxlightresist": {
    "descstrpos": "ModStr5w",
    "descstrneg": "ModStr5w",
    "id": 42,
    "add": 584,
    "multiply": 256,
    "descpriority": 43,
    "descfunc": 4,
    "descval": 1,
    "savebits": 5,
    "saveadd": 0
  },
  "coldresist": {
    "descstrpos": "ModStr1k",
    "descstrneg": "ModStr1k",
    "id": 43,
    "add": 43,
    "multiply": 20,
    "descpriority": 40,
    "descfunc": 4,
    "descval": 2,
    "savebits": 8,
    "saveadd": 50
  },
  "maxcoldresist": {
    "descstrpos": "ModStr5v",
    "descstrneg": "ModStr5v",
    "id": 44,
    "add": 584,
    "multiply": 256,
    "descpriority": 44,
    "descfunc": 4,
    "descval": 1,
    "savebits": 5,
    "saveadd": 0
  },
  "poisonresist": {
    "descstrpos": "ModStr1n",
    "descstrneg": "ModStr1n",
    "id": 45,
    "add": 43,
    "multiply": 20,
    "descpriority": 34,
    "descfunc": 4,
    "descval": 2,
    "savebits": 8,
    "saveadd": 50
  },
  "maxpoisonresist": {
    "descstrpos": "ModStr5y",
    "descstrneg": "ModStr5y",
    "id": 46,
    "add": 526,
    "multiply": 256,
    "descpriority": 45,
    "descfunc": 4,
    "descval": 1,
    "savebits": 5,
    "saveadd": 0
  },
  "damageaura": {
    "id": 47
  },
  "firemindam": {
    "descstrpos": "ModStr1p",
    "descstrneg": "ModStr1p",
    "id": 48,
    "add": 11,
    "multiply": 10,
    "descpriority": 102,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 8,
    "saveadd": 0
  },
  "firemaxdam": {
    "descstrpos": "ModStr1o",
    "descstrneg": "ModStr1o",
    "id": 49,
    "add": 19,
    "multiply": 10,
    "descpriority": 101,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 9,
    "saveadd": 0
  },
  "lightmindam": {
    "descstrpos": "ModStr1r",
    "descstrneg": "ModStr1r",
    "id": 50,
    "add": 12,
    "multiply": 10,
    "descpriority": 99,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "lightmaxdam": {
    "descstrpos": "ModStr1q",
    "descstrneg": "ModStr1q",
    "id": 51,
    "add": 17,
    "multiply": 10,
    "descpriority": 98,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 10,
    "saveadd": 0
  },
  "magicmindam": {
    "descstrpos": "strModMagicDamage",
    "descstrneg": "strModMagicDamage",
    "id": 52,
    "add": 196,
    "multiply": 20,
    "descpriority": 104,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 8,
    "saveadd": 0
  },
  "magicmaxdam": {
    "descstrpos": "strModMagicDamage",
    "descstrneg": "strModMagicDamage",
    "id": 53,
    "add": 183,
    "multiply": 20,
    "descpriority": 103,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 9,
    "saveadd": 0
  },
  "coldmindam": {
    "descstrpos": "ModStr1t",
    "descstrneg": "ModStr1t",
    "id": 54,
    "add": 451,
    "multiply": 512,
    "descpriority": 96,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 8,
    "saveadd": 0
  },
  "coldmaxdam": {
    "descstrpos": "ModStr1s",
    "descstrneg": "ModStr1s",
    "id": 55,
    "add": 128,
    "multiply": 340,
    "descpriority": 95,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 9,
    "saveadd": 0
  },
  "coldlength": {
    "id": 56,
    "add": 77,
    "multiply": 4,
    "damagerelated": 1,
    "savebits": 8,
    "saveadd": 0
  },
  "poisonmindam": {
    "descstrpos": "ModStr4i",
    "descstrneg": "ModStr4i",
    "id": 57,
    "add": 12,
    "multiply": 28,
    "descpriority": 92,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 10,
    "saveadd": 0
  },
  "poisonmaxdam": {
    "descstrpos": "ModStr4h",
    "descstrneg": "ModStr4h",
    "id": 58,
    "add": 11,
    "multiply": 34,
    "descpriority": 91,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 10,
    "saveadd": 0
  },
  "poisonlength": {
    "id": 59,
    "add": 0,
    "multiply": 4,
    "damagerelated": 1,
    "savebits": 9,
    "saveadd": 0
  },
  "lifedrainmindam": {
    "descstrpos": "ModStr2z",
    "descstrneg": "ModStr2z",
    "id": 60,
    "add": 1044,
    "multiply": 341,
    "descpriority": 88,
    "descfunc": 2,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "lifedrainmaxdam": {
    "id": 61,
    "damagerelated": 1
  },
  "manadrainmindam": {
    "descstrpos": "ModStr2y",
    "descstrneg": "ModStr2y",
    "id": 62,
    "add": 1179,
    "multiply": 341,
    "descpriority": 89,
    "descfunc": 2,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "manadrainmaxdam": {
    "id": 63,
    "damagerelated": 1
  },
  "stamdrainmindam": {
    "id": 64,
    "damagerelated": 1
  },
  "stamdrainmaxdam": {
    "id": 65,
    "damagerelated": 1
  },
  "stunlength": {
    "id": 66,
    "damagerelated": 1
  },
  "velocitypercent": {
    "id": 67,
    "savebits": 7,
    "saveadd": 30
  },
  "attackrate": {
    "id": 68,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 30
  },
  "other_animrate": {
    "id": 69
  },
  "quantity": {
    "id": 70,
    "damagerelated": 1
  },
  "value": {
    "id": 71,
    "savebits": 8,
    "saveadd": 100
  },
  "durability": {
    "id": 72,
    "savebits": 9,
    "saveadd": 0
  },
  "maxdurability": {
    "id": 73,
    "add": 9,
    "multiply": 4,
    "savebits": 8,
    "saveadd": 0
  },
  "hpregen": {
    "descstrpos": "ModStr2l",
    "descstrneg": "ModStr2w",
    "id": 74,
    "add": 451,
    "multiply": 410,
    "descpriority": 56,
    "descfunc": 1,
    "descval": 2,
    "savebits": 6,
    "saveadd": 30
  },
  "item_maxdurability_percent": {
    "opstat1": "maxdurability",
    "descstrpos": "ModStr2i",
    "descstrneg": "ModStr2i",
    "id": 75,
    "add": 117,
    "multiply": 10,
    "op": 13,
    "descpriority": 3,
    "descfunc": 2,
    "descval": 2,
    "savebits": 7,
    "saveadd": 20
  },
  "item_maxhp_percent": {
    "opstat1": "maxhp",
    "descstrpos": "ModStr2g",
    "descstrneg": "ModStr2g",
    "id": 76,
    "add": 32093,
    "multiply": 204,
    "op": 11,
    "descpriority": 58,
    "descfunc": 2,
    "descval": 2,
    "savebits": 6,
    "saveadd": 10
  },
  "item_maxmana_percent": {
    "opstat1": "maxmana",
    "descstrpos": "ModStr2h",
    "descstrneg": "ModStr2h",
    "id": 77,
    "add": 56452,
    "multiply": 204,
    "op": 11,
    "descpriority": 54,
    "descfunc": 2,
    "descval": 2,
    "savebits": 6,
    "saveadd": 10
  },
  "item_attackertakesdamage": {
    "descstrpos": "ModStr1v",
    "descstrneg": "ModStr1v",
    "id": 78,
    "add": 112,
    "multiply": 128,
    "descpriority": 13,
    "descfunc": 3,
    "descval": 2,
    "savebits": 7,
    "saveadd": 0
  },
  "item_goldbonus": {
    "descstrpos": "ModStr1w",
    "descstrneg": "ModStr1w",
    "id": 79,
    "add": 187,
    "multiply": 34,
    "descpriority": 10,
    "descfunc": 2,
    "descval": 1,
    "savebits": 9,
    "saveadd": 100
  },
  "item_magicbonus": {
    "descstrpos": "ModStr1x",
    "descstrneg": "ModStr1x",
    "id": 80,
    "add": 577,
    "multiply": 102,
    "descpriority": 8,
    "descfunc": 2,
    "descval": 1,
    "savebits": 8,
    "saveadd": 100
  },
  "item_knockback": {
    "descstrpos": "ModStr1y",
    "descstrneg": "ModStr1y",
    "id": 81,
    "add": 105,
    "multiply": 0,
    "descpriority": 76,
    "descfunc": 3,
    "descval": 0,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_timeduration": {
    "id": 82,
    "savebits": 9,
    "saveadd": 20
  },
  "item_addclassskills": {
    "descstrpos": "ModStr3a",
    "descstrneg": "ModStr3a",
    "id": 83,
    "add": 49523,
    "multiply": 1560,
    "descpriority": 150,
    "descfunc": 13,
    "descval": 1,
    "savebits": 3,
    "saveadd": 0,
    "saveparambits": 3
  },
  "unsentparam1": {
    "id": 84
  },
  "item_addexperience": {
    "descstrpos": "Moditem2ExpG",
    "descstrneg": "Moditem2ExpG",
    "id": 85,
    "add": 36015,
    "multiply": 519,
    "descpriority": 11,
    "descfunc": 4,
    "descval": 1,
    "savebits": 9,
    "saveadd": 50
  },
  "item_healafterkill": {
    "descstrpos": "ModitemHPaK",
    "descstrneg": "ModitemHPaK",
    "id": 86,
    "add": 30,
    "multiply": 101,
    "descpriority": 16,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_reducedprices": {
    "descstrpos": "ModitemRedVendP",
    "descstrneg": "ModitemRedVendP",
    "id": 87,
    "add": 18957,
    "multiply": 203,
    "descpriority": 8,
    "descfunc": 2,
    "descval": 2,
    "savebits": 7,
    "saveadd": 0
  },
  "item_doubleherbduration": {
    "id": 88,
    "savebits": 1,
    "saveadd": 0
  },
  "item_lightradius": {
    "descstrpos": "ModStr3f",
    "descstrneg": "ModStr3f",
    "id": 89,
    "add": 15,
    "multiply": 51,
    "descpriority": 6,
    "descfunc": 1,
    "descval": 1,
    "savebits": 4,
    "saveadd": 4
  },
  "item_lightcolor": {
    "id": 90,
    "add": 155,
    "multiply": 0,
    "savebits": 24,
    "saveadd": 0
  },
  "item_req_percent": {
    "descstrpos": "ModStr3h",
    "descstrneg": "ModStr3h",
    "id": 91,
    "add": 26,
    "multiply": -34,
    "descpriority": 0,
    "descfunc": 4,
    "descval": 2,
    "savebits": 8,
    "saveadd": 100
  },
  "item_levelreq": {
    "id": 92,
    "savebits": 7
  },
  "item_fasterattackrate": {
    "descstrpos": "ModStr4m",
    "descstrneg": "ModStr4m",
    "id": 93,
    "add": 1042,
    "multiply": 156,
    "descpriority": 145,
    "descfunc": 4,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 20
  },
  "item_levelreqpct": {
    "opstat1": "item_levelreq",
    "id": 94,
    "op": 13,
    "savebits": 7,
    "saveadd": 64
  },
  "lastblockframe": {
    "id": 95
  },
  "item_fastermovevelocity": {
    "descstrpos": "ModStr4s",
    "descstrneg": "ModStr4s",
    "id": 96,
    "add": 4083,
    "multiply": 156,
    "descpriority": 148,
    "descfunc": 4,
    "descval": 1,
    "savebits": 7,
    "saveadd": 20
  },
  "item_nonclassskill": {
    "id": 97,
    "add": 181,
    "multiply": 327,
    "descpriority": 81,
    "descfunc": 28,
    "savebits": 6,
    "saveadd": 0,
    "saveparambits": 9
  },
  "state": {
    "id": 98,
    "add": 415,
    "multiply": 64,
    "savebits": 1,
    "saveparambits": 8
  },
  "item_fastergethitrate": {
    "descstrpos": "ModStr4p",
    "descstrneg": "ModStr4p",
    "id": 99,
    "add": 1065,
    "multiply": 72,
    "descpriority": 139,
    "descfunc": 4,
    "descval": 1,
    "savebits": 7,
    "saveadd": 20
  },
  "monster_playercount": {
    "id": 100
  },
  "skill_poison_override_length": {
    "id": 101
  },
  "item_fasterblockrate": {
    "descstrpos": "ModStr4y",
    "descstrneg": "ModStr4y",
    "id": 102,
    "add": 1484,
    "multiply": 72,
    "descpriority": 136,
    "descfunc": 4,
    "descval": 1,
    "savebits": 7,
    "saveadd": 20
  },
  "skill_bypass_undead": {
    "id": 103
  },
  "skill_bypass_demons": {
    "id": 104
  },
  "item_fastercastrate": {
    "descstrpos": "ModStr4v",
    "descstrneg": "ModStr4v",
    "id": 105,
    "add": 3876,
    "multiply": 156,
    "descpriority": 142,
    "descfunc": 4,
    "descval": 1,
    "savebits": 7,
    "saveadd": 20
  },
  "skill_bypass_beasts": {
    "id": 106
  },
  "item_singleskill": {
    "id": 107,
    "add": 181,
    "multiply": 256,
    "descpriority": 81,
    "descfunc": 27,
    "savebits": 3,
    "saveadd": 0,
    "saveparambits": 9
  },
  "item_restinpeace": {
    "descstrpos": "ModitemSMRIP",
    "descstrneg": "ModitemSMRIP",
    "id": 108,
    "add": 1987,
    "multiply": 0,
    "descpriority": 81,
    "descfunc": 3,
    "descval": 0,
    "damagerelated": 1,
    "savebits": 1,
    "saveadd": 0
  },
  "curse_resistance": {
    "id": 109,
    "add": 159,
    "multiply": 33,
    "savebits": 9,
    "saveadd": 0
  },
  "item_poisonlengthresist": {
    "descstrpos": "ModStr3r",
    "descstrneg": "ModStr3r",
    "id": 110,
    "add": 27,
    "multiply": 10,
    "descpriority": 18,
    "descfunc": 2,
    "descval": 2,
    "savebits": 8,
    "saveadd": 20
  },
  "item_normaldamage": {
    "descstrpos": "ModStr5b",
    "descstrneg": "ModStr5b",
    "id": 111,
    "add": 94,
    "multiply": 100,
    "descpriority": 122,
    "descfunc": 1,
    "descval": 2,
    "damagerelated": 1,
    "savebits": 9,
    "saveadd": 20
  },
  "item_howl": {
    "descstrpos": "ModStr3u",
    "descstrneg": "ModStr3u",
    "id": 112,
    "add": 55,
    "multiply": 10,
    "descpriority": 79,
    "descfunc": 5,
    "descval": 2,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": -1
  },
  "item_stupidity": {
    "descstrpos": "ModStr6d",
    "descstrneg": "ModStr6d",
    "id": 113,
    "add": 332,
    "multiply": 1024,
    "descpriority": 80,
    "descfunc": 12,
    "descval": 2,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_damagetomana": {
    "descstrpos": "ModStr3w",
    "descstrneg": "ModStr3w",
    "id": 114,
    "add": 43,
    "multiply": 20,
    "descpriority": 11,
    "descfunc": 2,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_ignoretargetac": {
    "descstrpos": "ModStr3y",
    "descstrneg": "ModStr3y",
    "id": 115,
    "add": 1088,
    "multiply": 1024,
    "descpriority": 119,
    "descfunc": 3,
    "descval": 0,
    "damagerelated": 1,
    "savebits": 1,
    "saveadd": 0
  },
  "item_fractionaltargetac": {
    "descstrpos": "ModStr5o",
    "descstrneg": "ModStr5o",
    "id": 116,
    "add": 67,
    "multiply": 20,
    "descpriority": 118,
    "descfunc": 20,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_preventheal": {
    "descstrpos": "ModStr4a",
    "descstrneg": "ModStr4a",
    "id": 117,
    "add": 48,
    "multiply": 50,
    "descpriority": 81,
    "descfunc": 3,
    "descval": 0,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_halffreezeduration": {
    "descstrpos": "ModStr4b",
    "descstrneg": "ModStr4b",
    "id": 118,
    "add": 5096,
    "multiply": 988,
    "descpriority": 19,
    "descfunc": 3,
    "descval": 0,
    "savebits": 1,
    "saveadd": 0
  },
  "item_tohit_percent": {
    "descstrpos": "ModStr4c",
    "descstrneg": "ModStr4c",
    "id": 119,
    "add": 981,
    "multiply": 40,
    "descpriority": 117,
    "descfunc": 2,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 9,
    "saveadd": 20
  },
  "item_damagetargetac": {
    "descstrpos": "ModStr4d",
    "descstrneg": "ModStr4d",
    "id": 120,
    "add": 24,
    "multiply": -20,
    "descpriority": 75,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 128
  },
  "item_demondamage_percent": {
    "descstrpos": "ModStr4e",
    "descstrneg": "ModStr4e",
    "id": 121,
    "add": 19,
    "multiply": 12,
    "descpriority": 112,
    "descfunc": 4,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 9,
    "saveadd": 20
  },
  "item_undeaddamage_percent": {
    "descstrpos": "ModStr4f",
    "descstrneg": "ModStr4f",
    "id": 122,
    "add": 13,
    "multiply": 12,
    "descpriority": 108,
    "descfunc": 4,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 9,
    "saveadd": 20
  },
  "item_demon_tohit": {
    "descstrpos": "ModStr4j",
    "descstrneg": "ModStr4j",
    "id": 123,
    "add": 15,
    "multiply": 7,
    "descpriority": 110,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 10,
    "saveadd": 128
  },
  "item_undead_tohit": {
    "descstrpos": "ModStr4k",
    "descstrneg": "ModStr4k",
    "id": 124,
    "add": 11,
    "multiply": 7,
    "descpriority": 106,
    "descfunc": 1,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 10,
    "saveadd": 128
  },
  "item_throwable": {
    "descstrpos": "ModStr5a",
    "descstrneg": "ModStr5a",
    "id": 125,
    "add": 82,
    "multiply": 1024,
    "descpriority": 5,
    "descfunc": 3,
    "descval": 0,
    "savebits": 1,
    "saveadd": 0
  },
  "item_elemskill": {
    "descstrpos": "ModStr3i",
    "descstrneg": "ModStr3i",
    "id": 126,
    "add": 76,
    "multiply": 1024,
    "descpriority": 157,
    "descfunc": 1,
    "descval": 1,
    "savebits": 3,
    "saveadd": 0,
    "saveparambits": 3
  },
  "item_allskills": {
    "descstrpos": "ModStr3k",
    "descstrneg": "ModStr3k",
    "id": 127,
    "add": 15123,
    "multiply": 4096,
    "descpriority": 158,
    "descfunc": 1,
    "descval": 1,
    "savebits": 3,
    "saveadd": 0
  },
  "item_attackertakeslightdamage": {
    "descstrpos": "ModStr3j",
    "descstrneg": "ModStr3j",
    "id": 128,
    "add": 4,
    "multiply": 102,
    "descpriority": 14,
    "descfunc": 3,
    "descval": 2,
    "savebits": 5,
    "saveadd": 0
  },
  "ironmaiden_level": {
    "id": 129
  },
  "lifetap_level": {
    "id": 130
  },
  "thorns_percent": {
    "id": 131
  },
  "bonearmor": {
    "id": 132
  },
  "bonearmormax": {
    "id": 133
  },
  "item_freeze": {
    "descstrpos": "ModStr3l",
    "descstrneg": "ModStr3l",
    "id": 134,
    "add": 666,
    "multiply": 12,
    "descpriority": 78,
    "descfunc": 12,
    "descval": 2,
    "damagerelated": 1,
    "savebits": 5,
    "saveadd": 0
  },
  "item_openwounds": {
    "descstrpos": "ModStr3m",
    "descstrneg": "ModStr3m",
    "id": 135,
    "add": 23,
    "multiply": 10,
    "descpriority": 83,
    "descfunc": 2,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_crushingblow": {
    "descstrpos": "ModStr5c",
    "descstrneg": "ModStr5c",
    "id": 136,
    "add": 98,
    "multiply": 40,
    "descpriority": 87,
    "descfunc": 2,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_kickdamage": {
    "descstrpos": "ModStr5e",
    "descstrneg": "ModStr5e",
    "id": 137,
    "add": 77,
    "multiply": 51,
    "descpriority": 121,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_manaafterkill": {
    "descstrpos": "ModStr5f",
    "descstrneg": "ModStr5f",
    "id": 138,
    "add": 17,
    "multiply": 102,
    "descpriority": 16,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_healafterdemonkill": {
    "descstrpos": "ModStr6c",
    "descstrneg": "ModStr6c",
    "id": 139,
    "add": 18,
    "multiply": 102,
    "descpriority": 15,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_extrablood": {
    "id": 140,
    "add": 15,
    "multiply": 10,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_deadlystrike": {
    "descstrpos": "ModStr5q",
    "descstrneg": "ModStr5q",
    "id": 141,
    "add": 31,
    "multiply": 25,
    "descpriority": 85,
    "descfunc": 2,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_absorbfire_percent": {
    "descstrpos": "ModStr5g",
    "descstrneg": "ModStr5g",
    "id": 142,
    "add": 5486,
    "multiply": 102,
    "descpriority": 23,
    "descfunc": 2,
    "descval": 2,
    "savebits": 7,
    "saveadd": 0
  },
  "item_absorbfire": {
    "descstrpos": "ModStr5h",
    "descstrneg": "ModStr5h",
    "id": 143,
    "add": 1739,
    "multiply": 204,
    "descpriority": 27,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_absorblight_percent": {
    "descstrpos": "ModStr5i",
    "descstrneg": "ModStr5i",
    "id": 144,
    "add": 5486,
    "multiply": 102,
    "descpriority": 24,
    "descfunc": 2,
    "descval": 2,
    "savebits": 7,
    "saveadd": 0
  },
  "item_absorblight": {
    "descstrpos": "ModStr5j",
    "descstrneg": "ModStr5j",
    "id": 145,
    "add": 1739,
    "multiply": 204,
    "descpriority": 29,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_absorbmagic_percent": {
    "descstrpos": "ModStr5k",
    "descstrneg": "ModStr5k",
    "id": 146,
    "add": 5486,
    "multiply": 102,
    "descpriority": 26,
    "descfunc": 2,
    "descval": 2,
    "savebits": 7,
    "saveadd": 0
  },
  "item_absorbmagic": {
    "descstrpos": "ModStr5l",
    "descstrneg": "ModStr5l",
    "id": 147,
    "add": 1739,
    "multiply": 204,
    "descpriority": 33,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_absorbcold_percent": {
    "descstrpos": "ModStr5m",
    "descstrneg": "ModStr5m",
    "id": 148,
    "add": 5486,
    "multiply": 102,
    "descpriority": 25,
    "descfunc": 2,
    "descval": 2,
    "savebits": 7,
    "saveadd": 0
  },
  "item_absorbcold": {
    "descstrpos": "ModStr5n",
    "descstrneg": "ModStr5n",
    "id": 149,
    "add": 1739,
    "multiply": 204,
    "descpriority": 31,
    "descfunc": 1,
    "descval": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_slow": {
    "descstrpos": "ModStr5r",
    "descstrneg": "ModStr5r",
    "id": 150,
    "add": 101,
    "multiply": 40,
    "descpriority": 77,
    "descfunc": 2,
    "descval": 2,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_aura": {
    "descstrpos": "ModitemAura",
    "descstrneg": "ModitemAura",
    "id": 151,
    "descpriority": 159,
    "descfunc": 16,
    "descval": 0,
    "savebits": 5,
    "saveadd": 0,
    "saveparambits": 9
  },
  "item_indesctructible": {
    "descstrpos": "ModStre9s",
    "descstrneg": "ModStre9s",
    "id": 152,
    "descpriority": 160,
    "descfunc": 3,
    "descval": 0,
    "savebits": 1
  },
  "item_cannotbefrozen": {
    "descstrpos": "ModStr5z",
    "descstrneg": "ModStr5z",
    "id": 153,
    "add": 15011,
    "multiply": 2048,
    "descpriority": 20,
    "descfunc": 3,
    "descval": 0,
    "savebits": 1
  },
  "item_staminadrainpct": {
    "descstrpos": "ModStr6e",
    "descstrneg": "ModStr6e",
    "id": 154,
    "add": 102,
    "multiply": 20,
    "descpriority": 49,
    "descfunc": 2,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 20
  },
  "item_reanimate": {
    "descstrpos": "Moditemreanimas",
    "descstrneg": "Moditemreanimas",
    "id": 155,
    "descpriority": 17,
    "descfunc": 23,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0,
    "saveparambits": 10
  },
  "item_pierce": {
    "descstrpos": "ModStr6g",
    "descstrneg": "ModStr6g",
    "id": 156,
    "add": 1924,
    "multiply": 2048,
    "descpriority": 132,
    "descfunc": 3,
    "descval": 0,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "item_magicarrow": {
    "descstrpos": "ModStr6h",
    "descstrneg": "ModStr6h",
    "id": 157,
    "add": 511,
    "multiply": 1024,
    "descpriority": 131,
    "descfunc": 3,
    "descval": 0,
    "savebits": 7,
    "saveadd": 0
  },
  "item_explosivearrow": {
    "descstrpos": "ModStr6i",
    "descstrneg": "ModStr6i",
    "id": 158,
    "add": 492,
    "multiply": 1536,
    "descpriority": 133,
    "descfunc": 3,
    "descval": 0,
    "savebits": 7,
    "saveadd": 0
  },
  "item_throw_mindamage": {
    "id": 159,
    "add": 76,
    "multiply": 128,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_throw_maxdamage": {
    "id": 160,
    "add": 88,
    "multiply": 128,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0
  },
  "skill_handofathena": {
    "id": 161
  },
  "skill_staminapercent": {
    "opstat1": "maxstamina",
    "id": 162,
    "op": 1
  },
  "skill_passive_staminapercent": {
    "opstat1": "maxstamina",
    "id": 163,
    "op": 1
  },
  "skill_concentration": {
    "id": 164
  },
  "skill_enchant": {
    "id": 165
  },
  "skill_pierce": {
    "id": 166
  },
  "skill_conviction": {
    "id": 167
  },
  "skill_chillingarmor": {
    "id": 168
  },
  "skill_frenzy": {
    "id": 169
  },
  "skill_decrepify": {
    "id": 170
  },
  "skill_armor_percent": {
    "id": 171
  },
  "alignment": {
    "id": 172
  },
  "target0": {
    "id": 173
  },
  "target1": {
    "id": 174
  },
  "goldlost": {
    "id": 175
  },
  "conversion_level": {
    "id": 176
  },
  "conversion_maxhp": {
    "id": 177
  },
  "unit_dooverlay": {
    "id": 178
  },
  "attack_vs_montype": {
    "descstrpos": "ModitemAttratvsM",
    "descstrneg": "ModitemAttratvsM",
    "id": 179,
    "add": 19,
    "multiply": 14,
    "descpriority": 108,
    "descfunc": 22,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 9,
    "saveparambits": 10
  },
  "damage_vs_montype": {
    "descstrpos": "Moditemdamvsm",
    "descstrneg": "Moditemdamvsm",
    "id": 180,
    "add": 27,
    "multiply": 17,
    "descpriority": 106,
    "descfunc": 22,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 9,
    "saveparambits": 10
  },
  "fade": {
    "id": 181,
    "savebits": 3
  },
  "armor_override_percent": {
    "id": 182
  },
  "unused183": {
    "id": 183
  },
  "unused184": {
    "id": 184
  },
  "unused185": {
    "id": 185
  },
  "unused186": {
    "id": 186
  },
  "unused187": {
    "id": 187
  },
  "item_addskill_tab": {
    "descstrpos": "StrSklTabItem1",
    "descstrneg": "StrSklTabItem1",
    "id": 188,
    "add": 11042,
    "multiply": 768,
    "descpriority": 151,
    "descfunc": 14,
    "savebits": 3,
    "saveadd": 0,
    "saveparambits": 16
  },
  "unused189": {
    "id": 189
  },
  "unused190": {
    "id": 190
  },
  "unused191": {
    "id": 191
  },
  "unused192": {
    "id": 192
  },
  "unused193": {
    "id": 193
  },
  "item_numsockets": {
    "id": 194,
    "add": 38,
    "multiply": 170,
    "savebits": 4,
    "saveadd": 0
  },
  "item_skillonattack": {
    "descstrpos": "ItemExpansiveChancX",
    "descstrneg": "ItemExpansiveChancX",
    "id": 195,
    "add": 190,
    "multiply": 256,
    "descpriority": 160,
    "descfunc": 15,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0,
    "saveparambits": 16
  },
  "item_skillonkill": {
    "descstrpos": "ModitemskonKill",
    "descstrneg": "ModitemskonKill",
    "id": 196,
    "add": 85,
    "multiply": 19,
    "descpriority": 160,
    "descfunc": 15,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0,
    "saveparambits": 16
  },
  "item_skillondeath": {
    "descstrpos": "Moditemskondeath",
    "descstrneg": "Moditemskondeath",
    "id": 197,
    "add": 11,
    "multiply": 9,
    "descpriority": 160,
    "descfunc": 15,
    "savebits": 7,
    "saveadd": 0,
    "saveparambits": 16
  },
  "item_skillonhit": {
    "descstrpos": "ItemExpansiveChanc1",
    "descstrneg": "ItemExpansiveChanc1",
    "id": 198,
    "add": 190,
    "multiply": 256,
    "descpriority": 160,
    "descfunc": 15,
    "damagerelated": 1,
    "savebits": 7,
    "saveadd": 0,
    "saveparambits": 16
  },
  "item_skillonlevelup": {
    "descstrpos": "ModitemskonLevel",
    "descstrneg": "ModitemskonLevel",
    "id": 199,
    "add": 7,
    "multiply": 6,
    "descpriority": 160,
    "descfunc": 15,
    "savebits": 7,
    "saveadd": 0,
    "saveparambits": 16
  },
  "unused200": {
    "id": 200
  },
  "item_skillongethit": {
    "descstrpos": "ItemExpansiveChanc2",
    "descstrneg": "ItemExpansiveChanc2",
    "id": 201,
    "add": 190,
    "multiply": 256,
    "descpriority": 160,
    "descfunc": 15,
    "savebits": 7,
    "saveadd": 0,
    "saveparambits": 16
  },
  "unused202": {
    "id": 202
  },
  "unused203": {
    "id": 203
  },
  "item_charged_skill": {
    "descstrpos": "ModStre10d",
    "descstrneg": "ModStre10d",
    "id": 204,
    "add": 401,
    "multiply": 256,
    "descpriority": 1,
    "descfunc": 24,
    "savebits": 16,
    "saveadd": 0,
    "saveparambits": 16
  },
  "unused204": {
    "id": 205,
    "add": 401,
    "multiply": 256
  },
  "unused205": {
    "id": 206,
    "add": 401,
    "multiply": 256
  },
  "unused206": {
    "id": 207,
    "add": 401,
    "multiply": 256
  },
  "unused207": {
    "id": 208,
    "add": 401,
    "multiply": 256
  },
  "unused208": {
    "id": 209,
    "add": 401,
    "multiply": 256
  },
  "unused209": {
    "id": 210,
    "add": 401,
    "multiply": 256
  },
  "unused210": {
    "id": 211,
    "add": 401,
    "multiply": 256
  },
  "unused211": {
    "id": 212,
    "add": 401,
    "multiply": 256
  },
  "unused212": {
    "id": 213,
    "add": 401,
    "multiply": 256
  },
  "item_armor_perlevel": {
    "opbase": "level",
    "opstat1": "armorclass",
    "descstrpos": "ModStr1i",
    "descstrneg": "ModStr1i",
    "descstr2": "increaseswithplaylevelX",
    "id": 214,
    "add": 43,
    "multiply": 42,
    "op": 4,
    "opparam": 3,
    "descpriority": 72,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_armorpercent_perlevel": {
    "opbase": "level",
    "opstat1": "armorclass",
    "descstrpos": "Modstr2v",
    "descstrneg": "Modstr2v",
    "descstr2": "increaseswithplaylevelX",
    "id": 215,
    "add": 87,
    "multiply": 100,
    "op": 5,
    "opparam": 3,
    "descpriority": 73,
    "descfunc": 8,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_hp_perlevel": {
    "opbase": "level",
    "opstat1": "maxhp",
    "descstrpos": "ModStr1u",
    "descstrneg": "ModStr1u",
    "descstr2": "increaseswithplaylevelX",
    "id": 216,
    "add": 92,
    "multiply": 64,
    "op": 2,
    "opparam": 3,
    "descpriority": 57,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_mana_perlevel": {
    "opbase": "level",
    "opstat1": "maxmana",
    "descstrpos": "ModStr1e",
    "descstrneg": "ModStr1e",
    "descstr2": "increaseswithplaylevelX",
    "id": 217,
    "add": 90,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 53,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_maxdamage_perlevel": {
    "opbase": "level",
    "opstat1": "maxdamage",
    "opstat2": "secondary_maxdamage",
    "opstat3": "item_throw_maxdamage",
    "descstrpos": "ModStr1f",
    "descstrneg": "ModStr1f",
    "descstr2": "increaseswithplaylevelX",
    "id": 218,
    "add": 54,
    "multiply": 204,
    "op": 4,
    "opparam": 3,
    "descpriority": 125,
    "descfunc": 6,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_maxdamage_percent_perlevel": {
    "opbase": "level",
    "opstat1": "maxdamage",
    "opstat2": "secondary_maxdamage",
    "opstat3": "item_throw_maxdamage",
    "descstrpos": "ModStr2j",
    "descstrneg": "ModStr2j",
    "descstr2": "increaseswithplaylevelX",
    "id": 219,
    "add": 86,
    "multiply": 100,
    "op": 5,
    "opparam": 3,
    "descpriority": 128,
    "descfunc": 8,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_strength_perlevel": {
    "opbase": "level",
    "opstat1": "strength",
    "descstrpos": "ModStr1a",
    "descstrneg": "ModStr1a",
    "descstr2": "increaseswithplaylevelX",
    "id": 220,
    "add": 132,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 66,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_dexterity_perlevel": {
    "opbase": "level",
    "opstat1": "dexterity",
    "descstrpos": "ModStr1b",
    "descstrneg": "ModStr1b",
    "descstr2": "increaseswithplaylevelX",
    "id": 221,
    "add": 132,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 64,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_energy_perlevel": {
    "opbase": "level",
    "opstat1": "energy",
    "descstrpos": "ModStr1d",
    "descstrneg": "ModStr1d",
    "descstr2": "increaseswithplaylevelX",
    "id": 222,
    "add": 105,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 60,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_vitality_perlevel": {
    "opbase": "level",
    "opstat1": "vitality",
    "descstrpos": "ModStr1c",
    "descstrneg": "ModStr1c",
    "descstr2": "increaseswithplaylevelX",
    "id": 223,
    "add": 105,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 62,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_tohit_perlevel": {
    "opbase": "level",
    "opstat1": "tohit",
    "descstrpos": "ModStr1h",
    "descstrneg": "ModStr1h",
    "descstr2": "increaseswithplaylevelX",
    "id": 224,
    "add": 53,
    "multiply": 20,
    "op": 2,
    "opparam": 1,
    "descpriority": 114,
    "descfunc": 6,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_tohitpercent_perlevel": {
    "opbase": "level",
    "opstat1": "item_tohit_percent",
    "descstrpos": "ModStr4c",
    "descstrneg": "ModStr4c",
    "descstr2": "increaseswithplaylevelX",
    "id": 225,
    "add": 10,
    "multiply": 256,
    "op": 2,
    "opparam": 1,
    "descpriority": 116,
    "descfunc": 7,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_cold_damagemax_perlevel": {
    "opbase": "level",
    "opstat1": "coldmaxdam",
    "descstrpos": "ModStr1s",
    "descstrneg": "ModStr1s",
    "descstr2": "increaseswithplaylevelX",
    "id": 226,
    "add": 1058,
    "multiply": 340,
    "op": 2,
    "opparam": 3,
    "descpriority": 94,
    "descfunc": 6,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_fire_damagemax_perlevel": {
    "opbase": "level",
    "opstat1": "firemaxdam",
    "descstrpos": "ModStr1o",
    "descstrneg": "ModStr1o",
    "descstr2": "increaseswithplaylevelX",
    "id": 227,
    "add": 49,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 100,
    "descfunc": 6,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_ltng_damagemax_perlevel": {
    "opbase": "level",
    "opstat1": "lightmaxdam",
    "descstrpos": "ModStr1q",
    "descstrneg": "ModStr1q",
    "descstr2": "increaseswithplaylevelX",
    "id": 228,
    "add": 49,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 97,
    "descfunc": 6,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_pois_damagemax_perlevel": {
    "opbase": "level",
    "opstat1": "poisonmaxdam",
    "descstrpos": "ModStr4h",
    "descstrneg": "ModStr4h",
    "descstr2": "increaseswithplaylevelX",
    "id": 229,
    "add": 49,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 90,
    "descfunc": 6,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_resist_cold_perlevel": {
    "opbase": "level",
    "opstat1": "coldresist",
    "descstrpos": "ModStr1k",
    "descstrneg": "ModStr1k",
    "descstr2": "increaseswithplaylevelX",
    "id": 230,
    "add": 101,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 39,
    "descfunc": 7,
    "descval": 2,
    "savebits": 6,
    "saveadd": 0
  },
  "item_resist_fire_perlevel": {
    "opbase": "level",
    "opstat1": "fireresist",
    "descstrpos": "ModStr1j",
    "descstrneg": "ModStr1j",
    "descstr2": "increaseswithplaylevelX",
    "id": 231,
    "add": 101,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 35,
    "descfunc": 7,
    "descval": 2,
    "savebits": 6,
    "saveadd": 0
  },
  "item_resist_ltng_perlevel": {
    "opbase": "level",
    "opstat1": "lightresist",
    "descstrpos": "ModStr1l",
    "descstrneg": "ModStr1l",
    "descstr2": "increaseswithplaylevelX",
    "id": 232,
    "add": 101,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 37,
    "descfunc": 7,
    "descval": 2,
    "savebits": 6,
    "saveadd": 0
  },
  "item_resist_pois_perlevel": {
    "opbase": "level",
    "opstat1": "poisonresist",
    "descstrpos": "ModStr1n",
    "descstrneg": "ModStr1n",
    "descstr2": "increaseswithplaylevelX",
    "id": 233,
    "add": 101,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 33,
    "descfunc": 7,
    "descval": 2,
    "savebits": 6,
    "saveadd": 0
  },
  "item_absorb_cold_perlevel": {
    "opbase": "level",
    "opstat1": "item_absorbcold",
    "descstrpos": "ModStre9p",
    "descstrneg": "ModStre9p",
    "descstr2": "increaseswithplaylevelX",
    "id": 234,
    "add": 207,
    "multiply": 340,
    "op": 2,
    "opparam": 3,
    "descpriority": 32,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_absorb_fire_perlevel": {
    "opbase": "level",
    "opstat1": "item_absorbfire",
    "descstrpos": "ModStre9o",
    "descstrneg": "ModStre9o",
    "descstr2": "increaseswithplaylevelX",
    "id": 235,
    "add": 207,
    "multiply": 340,
    "op": 2,
    "opparam": 3,
    "descpriority": 28,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_absorb_ltng_perlevel": {
    "opbase": "level",
    "opstat1": "item_absorblight",
    "descstrpos": "ModStre9q",
    "descstrneg": "ModStre9q",
    "descstr2": "increaseswithplaylevelX",
    "id": 236,
    "add": 207,
    "multiply": 340,
    "op": 2,
    "opparam": 3,
    "descpriority": 30,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_absorb_pois_perlevel": {
    "opbase": "level",
    "opstat1": "item_absorbmagic",
    "id": 237,
    "add": 207,
    "multiply": 340,
    "op": 2,
    "opparam": 3,
    "savebits": 6,
    "saveadd": 0
  },
  "item_thorns_perlevel": {
    "opbase": "level",
    "opstat1": "item_attackertakesdamage",
    "descstrpos": "ModStr1v",
    "descstrneg": "ModStr1v",
    "descstr2": "increaseswithplaylevelX",
    "id": 238,
    "add": 55,
    "multiply": 256,
    "op": 2,
    "opparam": 3,
    "descpriority": 12,
    "descfunc": 9,
    "descval": 2,
    "savebits": 5,
    "saveadd": 0
  },
  "item_find_gold_perlevel": {
    "opbase": "level",
    "opstat1": "item_goldbonus",
    "descstrpos": "ModStr1w",
    "descstrneg": "ModStr1w",
    "descstr2": "increaseswithplaylevelX",
    "id": 239,
    "add": 42,
    "multiply": 256,
    "op": 2,
    "opparam": 3,
    "descpriority": 9,
    "descfunc": 7,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_find_magic_perlevel": {
    "opbase": "level",
    "opstat1": "item_magicbonus",
    "descstrpos": "ModStr1x",
    "descstrneg": "ModStr1x",
    "descstr2": "increaseswithplaylevelX",
    "id": 240,
    "add": 814,
    "multiply": 1024,
    "op": 2,
    "opparam": 3,
    "descpriority": 7,
    "descfunc": 7,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_regenstamina_perlevel": {
    "opbase": "level",
    "opstat1": "staminarecoverybonus",
    "descstrpos": "ModStr3v",
    "descstrneg": "ModStr3v",
    "descstr2": "increaseswithplaylevelX",
    "id": 241,
    "add": 79,
    "multiply": 256,
    "op": 2,
    "opparam": 3,
    "descpriority": 47,
    "descfunc": 8,
    "descval": 2,
    "savebits": 6,
    "saveadd": 0
  },
  "item_stamina_perlevel": {
    "opbase": "level",
    "opstat1": "maxstamina",
    "descstrpos": "ModStr5d",
    "descstrneg": "ModStr5d",
    "descstr2": "increaseswithplaylevelX",
    "id": 242,
    "add": 104,
    "multiply": 64,
    "op": 2,
    "opparam": 3,
    "descpriority": 50,
    "descfunc": 6,
    "descval": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_damage_demon_perlevel": {
    "opbase": "level",
    "opstat1": "item_demondamage_percent",
    "descstrpos": "ModStr4e",
    "descstrneg": "ModStr4e",
    "descstr2": "increaseswithplaylevelX",
    "id": 243,
    "add": 56,
    "multiply": 10,
    "op": 2,
    "opparam": 3,
    "descpriority": 111,
    "descfunc": 8,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_damage_undead_perlevel": {
    "opbase": "level",
    "opstat1": "item_undeaddamage_percent",
    "descstrpos": "ModStr4f",
    "descstrneg": "ModStr4f",
    "descstr2": "increaseswithplaylevelX",
    "id": 244,
    "add": 91,
    "multiply": 10,
    "op": 2,
    "opparam": 3,
    "descpriority": 107,
    "descfunc": 8,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_tohit_demon_perlevel": {
    "opbase": "level",
    "opstat1": "item_demon_tohit",
    "descstrpos": "ModStr4j",
    "descstrneg": "ModStr4j",
    "descstr2": "increaseswithplaylevelX",
    "id": 245,
    "add": 55,
    "multiply": 10,
    "op": 2,
    "opparam": 1,
    "descpriority": 109,
    "descfunc": 6,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_tohit_undead_perlevel": {
    "opbase": "level",
    "opstat1": "item_undead_tohit",
    "descstrpos": "ModStr4k",
    "descstrneg": "ModStr4k",
    "descstr2": "increaseswithplaylevelX",
    "id": 246,
    "add": 12,
    "multiply": 10,
    "op": 2,
    "opparam": 1,
    "descpriority": 105,
    "descfunc": 6,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_crushingblow_perlevel": {
    "opbase": "level",
    "opstat1": "item_crushingblow",
    "descstrpos": "ModStr5c",
    "descstrneg": "ModStr5c",
    "descstr2": "increaseswithplaylevelX",
    "id": 247,
    "add": 213,
    "multiply": 1024,
    "op": 2,
    "opparam": 3,
    "descpriority": 86,
    "descfunc": 7,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_openwounds_perlevel": {
    "opbase": "level",
    "opstat1": "item_openwounds",
    "descstrpos": "ModStr3m",
    "descstrneg": "ModStr3m",
    "descstr2": "increaseswithplaylevelX",
    "id": 248,
    "add": 181,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 82,
    "descfunc": 7,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_kick_damage_perlevel": {
    "opbase": "level",
    "opstat1": "item_kickdamage",
    "descstrpos": "ModStr5e",
    "descstrneg": "ModStr5e",
    "descstr2": "increaseswithplaylevelX",
    "id": 249,
    "add": 104,
    "multiply": 128,
    "op": 2,
    "opparam": 3,
    "descpriority": 120,
    "descfunc": 6,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_deadlystrike_perlevel": {
    "opbase": "level",
    "opstat1": "item_deadlystrike",
    "descstrpos": "ModStr5q",
    "descstrneg": "ModStr5q",
    "descstr2": "increaseswithplaylevelX",
    "id": 250,
    "add": 118,
    "multiply": 512,
    "op": 2,
    "opparam": 3,
    "descpriority": 84,
    "descfunc": 7,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "item_find_gems_perlevel": {
    "id": 251
  },
  "item_replenish_durability": {
    "descstrpos": "ModStre9t",
    "descstrneg": "ModStre9t",
    "id": 252,
    "add": 106,
    "multiply": 256,
    "descpriority": 1,
    "descfunc": 11,
    "descval": 0,
    "savebits": 6,
    "saveadd": 0
  },
  "item_replenish_quantity": {
    "descstrpos": "ModStre9v",
    "descstrneg": "ModStre9v",
    "id": 253,
    "add": 106,
    "multiply": 256,
    "descpriority": 2,
    "descfunc": 3,
    "descval": 0,
    "savebits": 6,
    "saveadd": 0
  },
  "item_extra_stack": {
    "descstrpos": "ModStre9i",
    "descstrneg": "ModStre9i",
    "id": 254,
    "add": 99,
    "multiply": 10,
    "descpriority": 4,
    "descfunc": 3,
    "descval": 0,
    "savebits": 8,
    "saveadd": 0
  },
  "item_find_item": {
    "id": 255
  },
  "item_slash_damage": {
    "id": 256,
    "damagerelated": 1
  },
  "item_slash_damage_percent": {
    "id": 257,
    "damagerelated": 1
  },
  "item_crush_damage": {
    "id": 258,
    "damagerelated": 1
  },
  "item_crush_damage_percent": {
    "id": 259,
    "damagerelated": 1
  },
  "item_thrust_damage": {
    "id": 260,
    "damagerelated": 1
  },
  "item_thrust_damage_percent": {
    "id": 261,
    "damagerelated": 1
  },
  "item_absorb_slash": {
    "id": 262
  },
  "item_absorb_crush": {
    "id": 263
  },
  "item_absorb_thrust": {
    "id": 264
  },
  "item_absorb_slash_percent": {
    "id": 265
  },
  "item_absorb_crush_percent": {
    "id": 266
  },
  "item_absorb_thrust_percent": {
    "id": 267
  },
  "item_armor_bytime": {
    "opstat1": "armorclass",
    "descstrpos": "ModStr1i",
    "descstrneg": "ModStr1i",
    "id": 268,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_armorpercent_bytime": {
    "opstat1": "armorclass",
    "descstrpos": "Modstr2v",
    "descstrneg": "Modstr2v",
    "id": 269,
    "multiply": 0,
    "op": 7,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_hp_bytime": {
    "opstat1": "maxhp",
    "descstrpos": "ModStr1u",
    "descstrneg": "ModStr1u",
    "id": 270,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_mana_bytime": {
    "opstat1": "maxmana",
    "descstrpos": "ModStr1e",
    "descstrneg": "ModStr1e",
    "id": 271,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_maxdamage_bytime": {
    "opstat1": "maxdamage",
    "opstat2": "secondary_maxdamage",
    "opstat3": "item_throw_maxdamage",
    "descstrpos": "ModStr1f",
    "descstrneg": "ModStr1f",
    "id": 272,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_maxdamage_percent_bytime": {
    "opstat1": "maxdamage",
    "opstat2": "secondary_mindamage",
    "opstat3": "item_throw_mindamage",
    "descstrpos": "ModStr2j",
    "descstrneg": "ModStr2j",
    "id": 273,
    "multiply": 0,
    "op": 7,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_strength_bytime": {
    "opstat1": "strength",
    "descstrpos": "ModStr1a",
    "descstrneg": "ModStr1a",
    "id": 274,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_dexterity_bytime": {
    "opstat1": "dexterity",
    "descstrpos": "ModStr1b",
    "descstrneg": "ModStr1b",
    "id": 275,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_energy_bytime": {
    "opstat1": "energy",
    "descstrpos": "ModStr1d",
    "descstrneg": "ModStr1d",
    "id": 276,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_vitality_bytime": {
    "opstat1": "vitality",
    "descstrpos": "ModStr1c",
    "descstrneg": "ModStr1c",
    "id": 277,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_tohit_bytime": {
    "opstat1": "tohit",
    "descstrpos": "ModStr1h",
    "descstrneg": "ModStr1h",
    "id": 278,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_tohitpercent_bytime": {
    "opstat1": "item_tohit_percent",
    "descstrpos": "ModStr4c",
    "descstrneg": "ModStr4c",
    "id": 279,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_cold_damagemax_bytime": {
    "opstat1": "coldmaxdam",
    "descstrpos": "ModStr1s",
    "descstrneg": "ModStr1s",
    "id": 280,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_fire_damagemax_bytime": {
    "opstat1": "firemaxdam",
    "descstrpos": "ModStr1o",
    "descstrneg": "ModStr1o",
    "id": 281,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_ltng_damagemax_bytime": {
    "opstat1": "lightmaxdam",
    "descstrpos": "ModStr1q",
    "descstrneg": "ModStr1q",
    "id": 282,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_pois_damagemax_bytime": {
    "opstat1": "poisonmaxdam",
    "descstrpos": "ModStr4h",
    "descstrneg": "ModStr4h",
    "id": 283,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_resist_cold_bytime": {
    "opstat1": "coldresist",
    "descstrpos": "ModStr1k",
    "descstrneg": "ModStr1k",
    "id": 284,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 2,
    "savebits": 22,
    "saveadd": 0
  },
  "item_resist_fire_bytime": {
    "opstat1": "fireresist",
    "descstrpos": "ModStr1j",
    "descstrneg": "ModStr1j",
    "id": 285,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 2,
    "savebits": 22,
    "saveadd": 0
  },
  "item_resist_ltng_bytime": {
    "opstat1": "lightresist",
    "descstrpos": "ModStr1l",
    "descstrneg": "ModStr1l",
    "id": 286,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 2,
    "savebits": 22,
    "saveadd": 0
  },
  "item_resist_pois_bytime": {
    "opstat1": "poisonresist",
    "descstrpos": "ModStr1n",
    "descstrneg": "ModStr1n",
    "id": 287,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 2,
    "savebits": 22,
    "saveadd": 0
  },
  "item_absorb_cold_bytime": {
    "opstat1": "item_absorbcold",
    "descstrpos": "ModStre9p",
    "descstrneg": "ModStre9p",
    "id": 288,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_absorb_fire_bytime": {
    "opstat1": "item_absorbfire",
    "descstrpos": "ModStre9o",
    "descstrneg": "ModStre9o",
    "id": 289,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_absorb_ltng_bytime": {
    "opstat1": "item_absorblight",
    "descstrpos": "ModStre9q",
    "descstrneg": "ModStre9q",
    "id": 290,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_absorb_pois_bytime": {
    "opstat1": "item_absorbmagic",
    "id": 291,
    "multiply": 0,
    "op": 6,
    "savebits": 22,
    "saveadd": 0
  },
  "item_find_gold_bytime": {
    "opstat1": "item_goldbonus",
    "descstrpos": "ModStr1w",
    "descstrneg": "ModStr1w",
    "id": 292,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 2,
    "savebits": 22,
    "saveadd": 0
  },
  "item_find_magic_bytime": {
    "opstat1": "item_magicbonus",
    "descstrpos": "ModStr1x",
    "descstrneg": "ModStr1x",
    "id": 293,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_regenstamina_bytime": {
    "opstat1": "staminarecoverybonus",
    "descstrpos": "ModStr3v",
    "descstrneg": "ModStr3v",
    "id": 294,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 2,
    "savebits": 22,
    "saveadd": 0
  },
  "item_stamina_bytime": {
    "opstat1": "maxstamina",
    "descstrpos": "ModStr5d",
    "descstrneg": "ModStr5d",
    "id": 295,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_damage_demon_bytime": {
    "opstat1": "item_demondamage_percent",
    "descstrpos": "ModStr4e",
    "descstrneg": "ModStr4e",
    "id": 296,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_damage_undead_bytime": {
    "opstat1": "item_undeaddamage_percent",
    "descstrpos": "ModStr4f",
    "descstrneg": "ModStr4f",
    "id": 297,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_tohit_demon_bytime": {
    "opstat1": "item_demon_tohit",
    "descstrpos": "ModStr4j",
    "descstrneg": "ModStr4j",
    "id": 298,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_tohit_undead_bytime": {
    "opstat1": "item_undead_tohit",
    "descstrpos": "ModStr4k",
    "descstrneg": "ModStr4k",
    "id": 299,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_crushingblow_bytime": {
    "opstat1": "item_crushingblow",
    "descstrpos": "ModStr5c",
    "descstrneg": "ModStr5c",
    "id": 300,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_openwounds_bytime": {
    "opstat1": "item_openwounds",
    "descstrpos": "ModStr3m",
    "descstrneg": "ModStr3m",
    "id": 301,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_kick_damage_bytime": {
    "opstat1": "item_kickdamage",
    "descstrpos": "ModStr5e",
    "descstrneg": "ModStr5e",
    "id": 302,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 17,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_deadlystrike_bytime": {
    "opstat1": "item_deadlystrike",
    "descstrpos": "ModStr5q",
    "descstrneg": "ModStr5q",
    "id": 303,
    "multiply": 0,
    "op": 6,
    "descpriority": 180,
    "descfunc": 18,
    "descval": 1,
    "damagerelated": 1,
    "savebits": 22,
    "saveadd": 0
  },
  "item_find_gems_bytime": {
    "id": 304,
    "multiply": 0
  },
  "item_pierce_cold": {
    "descstrpos": "Moditemenrescoldsk",
    "descstrneg": "Moditemenrescoldsk",
    "id": 305,
    "add": 1432,
    "multiply": 513,
    "descpriority": 88,
    "descfunc": 20,
    "descval": 1,
    "savebits": 8,
    "saveadd": 50
  },
  "item_pierce_fire": {
    "descstrpos": "Moditemenresfiresk",
    "descstrneg": "Moditemenresfiresk",
    "id": 306,
    "add": 1240,
    "multiply": 497,
    "descpriority": 88,
    "descfunc": 20,
    "descval": 1,
    "savebits": 8,
    "saveadd": 50
  },
  "item_pierce_ltng": {
    "descstrpos": "Moditemenresltngsk",
    "descstrneg": "Moditemenresltngsk",
    "id": 307,
    "add": 1187,
    "multiply": 481,
    "descpriority": 88,
    "descfunc": 20,
    "descval": 1,
    "savebits": 8,
    "saveadd": 50
  },
  "item_pierce_pois": {
    "descstrpos": "Moditemenrespoissk",
    "descstrneg": "Moditemenrespoissk",
    "id": 308,
    "add": 1322,
    "multiply": 506,
    "descpriority": 88,
    "descfunc": 20,
    "descval": 1,
    "savebits": 8,
    "saveadd": 50
  },
  "item_damage_vs_monster": {
    "id": 309,
    "damagerelated": 1
  },
  "item_damage_percent_vs_monster": {
    "id": 310,
    "damagerelated": 1
  },
  "item_tohit_vs_monster": {
    "id": 311,
    "damagerelated": 1
  },
  "item_tohit_percent_vs_monster": {
    "id": 312,
    "damagerelated": 1
  },
  "item_ac_vs_monster": {
    "id": 313
  },
  "item_ac_percent_vs_monster": {
    "id": 314
  },
  "firelength": {
    "id": 315
  },
  "burningmin": {
    "id": 316
  },
  "burningmax": {
    "id": 317
  },
  "progressive_damage": {
    "id": 318
  },
  "progressive_steal": {
    "id": 319
  },
  "progressive_other": {
    "id": 320
  },
  "progressive_fire": {
    "id": 321
  },
  "progressive_cold": {
    "id": 322
  },
  "progressive_lightning": {
    "id": 323
  },
  "item_extra_charges": {
    "id": 324,
    "damagerelated": 1,
    "savebits": 6,
    "saveadd": 0
  },
  "progressive_tohit": {
    "id": 325
  },
  "poison_count": {
    "id": 326,
    "damagerelated": 1
  },
  "damage_framerate": {
    "id": 327
  },
  "pierce_idx": {
    "id": 328
  },
  "passive_fire_mastery": {
    "descstrpos": "ModitemdamFiresk",
    "descstrneg": "ModitemdamFiresk",
    "id": 329,
    "add": 1117,
    "multiply": 415,
    "descpriority": 88,
    "descfunc": 4,
    "descval": 1,
    "savebits": 9,
    "saveadd": 50
  },
  "passive_ltng_mastery": {
    "descstrpos": "ModitemdamLtngsk",
    "descstrneg": "ModitemdamLtngsk",
    "id": 330,
    "add": 1054,
    "multiply": 408,
    "descpriority": 88,
    "descfunc": 4,
    "descval": 1,
    "savebits": 9,
    "saveadd": 50
  },
  "passive_cold_mastery": {
    "descstrpos": "ModitemdamColdsk",
    "descstrneg": "ModitemdamColdsk",
    "id": 331,
    "add": 1295,
    "multiply": 379,
    "descpriority": 88,
    "descfunc": 4,
    "descval": 1,
    "savebits": 9,
    "saveadd": 50
  },
  "passive_pois_mastery": {
    "descstrpos": "ModitemdamPoissk",
    "descstrneg": "ModitemdamPoissk",
    "id": 332,
    "add": 978,
    "multiply": 394,
    "descpriority": 88,
    "descfunc": 4,
    "descval": 1,
    "savebits": 9,
    "saveadd": 50
  },
  "passive_fire_pierce": {
    "descstrpos": "Moditemenresfiresk",
    "descstrneg": "Moditemenresfiresk",
    "id": 333,
    "multiply": 2578,
    "descpriority": 88,
    "descfunc": 20,
    "descval": 1,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_ltng_pierce": {
    "descstrpos": "Moditemenresltngsk",
    "descstrneg": "Moditemenresltngsk",
    "id": 334,
    "multiply": 2493,
    "descpriority": 88,
    "descfunc": 20,
    "descval": 1,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_cold_pierce": {
    "descstrpos": "Moditemenrescoldsk",
    "descstrneg": "Moditemenrescoldsk",
    "id": 335,
    "multiply": 1984,
    "descpriority": 88,
    "descfunc": 20,
    "descval": 1,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_pois_pierce": {
    "descstrpos": "Moditemenrespoissk",
    "descstrneg": "Moditemenrespoissk",
    "id": 336,
    "multiply": 2345,
    "descpriority": 88,
    "descfunc": 20,
    "descval": 1,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_critical_strike": {
    "id": 337,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_dodge": {
    "id": 338,
    "savebits": 7,
    "saveadd": 0
  },
  "passive_avoid": {
    "id": 339,
    "savebits": 7,
    "saveadd": 0
  },
  "passive_evade": {
    "id": 340,
    "savebits": 7,
    "saveadd": 0
  },
  "passive_warmth": {
    "id": 341,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_mastery_melee_th": {
    "id": 342,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_mastery_melee_dmg": {
    "id": 343,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_mastery_melee_crit": {
    "id": 344,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_mastery_throw_th": {
    "id": 345,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_mastery_throw_dmg": {
    "id": 346,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_mastery_throw_crit": {
    "id": 347,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_weaponblock": {
    "id": 348,
    "savebits": 8,
    "saveadd": 0
  },
  "passive_summon_resist": {
    "id": 349,
    "savebits": 8,
    "saveadd": 0
  },
  "modifierlist_skill": {
    "id": 350
  },
  "modifierlist_level": {
    "id": 351
  },
  "last_sent_hp_pct": {
    "id": 352
  },
  "source_unit_type": {
    "id": 353
  },
  "source_unit_id": {
    "id": 354
  },
  "shortparam1": {
    "id": 355
  },
  "questitemdifficulty": {
    "id": 356,
    "savebits": 2,
    "saveadd": 0
  },
  "passive_mag_mastery": {
    "id": 357,
    "add": 1211,
    "multiply": 431,
    "savebits": 9,
    "saveadd": 50
  },
  "passive_mag_pierce": {
    "id": 358,
    "multiply": 2812,
    "savebits": 8,
    "saveadd": 0
  }
}

export default itemStatCost;