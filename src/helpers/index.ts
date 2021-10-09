export const capitalize = (str: string) => {
  return str.replaceAll('-', ' ').split(' ').map(w => {
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}