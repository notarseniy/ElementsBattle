/**
 * Perfoms declination of number in russian
 * @param {number} number Number which we bow
 * @param {string[]} titles Array of three words
 * @example
 * // returns 'строк'
 * numberDeclination(5, ['строка', 'строк', 'строки']);
 **/
export function numberDeclination(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
