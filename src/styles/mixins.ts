type TPseudo = 'before' | 'after';

interface IPseudo {
  (p1: TPseudo, p2?: TPseudo): string;
}

export const pseudo:IPseudo = (p1, p2) => {
  let args = [p1];

  p2 && !args.includes(p2) && args.push(p2);

  let pseudos = args.map(a => `
    &::${a} {
      display: block;
      position: absolute;
      content: "";
    }
  `).join('');

  return (`
    position: relative;
    ${pseudos}
  `)
}