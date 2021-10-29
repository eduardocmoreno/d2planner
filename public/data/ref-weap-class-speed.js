const classWeaponSpeedMap = {
  "ht1": [
    [-99, -99, -99, -99], //ama
    [-99, -99, -99, -99], //sorc
    [-99, -99, -99, -99], //nec
    [-99, -99, -99, -99], //pal
    [-99, -99, -99, -99], //barb
    [-99, -99, -99, -99], //dru
    [3, 21, 33, 39]       //ass
  ],

  "1hs": [
    [-10, 7, 18, 34], //ama
    [-20, 0, 15, 26], //sorc
    [-18, 1, 18, 27], //nec
    [-7, 12, 21, 35], //pal
    [-14, 6, 16, 31], //barb
    [-18, 5, 14, 24], //dru
    [-7, 12, 26, 32]  //ass
  ],

  "1ht": [
    [1, 14, 24, 38],  //ama
    [-13, 6, 19, 29], //sorc
    [-18, 1, 18, 27], //nec
    [-21, 0, 11, 26], //pal
    [-14, 6, 16, 31], //barb
    [-18, 5, 14, 24], //dru
    [-7, 12, 26, 32]  //ass
  ],

  "2ht": [
    [-23, -7, 6, 24],   //ama
    [-40, -16, 1, 13],  //sorc
    [-49, -26, -4, 8],  //nec
    [-42, -17, -5, 13], //pal
    [-35, -12, 1, 18],  //barb
    [-43, -15, -4, 8],  //dru
    [-64, -35, -15, -4] //ass
  ],

  "stf": [
    [-38, -20, 1, 15], //ama
    [-12, 7, 24, 34],  //sorc
    [-24, -5, 13, 24], //nec
    [-28, 1, 8, 22],   //pal
    [-35, -12, 1, 18], //barb
    [-6, 15, 23, 32],  //dru
    [-35, -12, 5, 14]  //ass
  ],

  "bow": [
    [-7, 7, 18, 34],  //ama
    [-13, 6, 19, 29], //sorc
    [-12, 6, 22, 31], //nec
    [-14, 6, 16, 31], //pal
    [-7, 12, 21, 35], //barb
    [1, 20, 27, 36],  //dru
    [-14, 6, 20, 27]  //ass
  ],

  "xbw": [
    [-53, -33, -17, 5], //ama
    [-33, -11, 5, 17],  //sorc
    [-24, -5, 13, 24],  //nec
    [-42, -17, -5, 13], //pal
    [-42, -17, -5, 13], //barb
    [-24, 1, 9, 20],    //dru
    [-49, -23, -5, 5]   //ass
  ]
};

/* 
wType = weapon type => [ht1, 1hs, 1ht, 2ht, stf, bow, xbw]
bs = base speed => math(WSM - wIAS);
classIdx = class index [0: ama, 1: sorc, and so on...]

if(bs >= classWeaponSpeedMap[wType][classIdx === 3]) {
  return "very slow attack speed";
}

if(bs >= classWeaponSpeedMap[wType][classIdx === 2]) {
  return "slow attack speed";
}

if(bs >= classWeaponSpeedMap[wType][classIdx === 1]) {
  return "normal attack speed";
}

if(bs >= classWeaponSpeedMap[wType][classIdx === 0]) {
  return "fast attack speed";
}

return "very fast attack speed";

*/