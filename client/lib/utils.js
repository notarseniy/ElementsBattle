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

/**
 * Performs declination of number in russian for getting number ending (ex. '-ый' for 21)
 * @param {number} number Number
 * @example
 * // returns '-ый'
 * numberEnding(21);
 * // returns '-ой'
 * numberEnding(2);
 * // returns '-ий'
 * numberEnding(43);
 **/
export function numberEnding(number) {
  const sNumber = number.toString();

  if (number === 0) {
    return '-ой';
  }

  if (
    number >= 10 &&
    number <= 20
  ) {
    return '-ый';
  }

  switch (sNumber[sNumber.length - 1]) {
    case '1':
      return '-ый';

    case '2':
    case '6':
    case '7':
    case '8':
      return '-ой';

    case '3':
      return '-ий';

    default:
      return '-ый';
  }
}
