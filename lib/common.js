
// export const calculateProductPriceByAttributes = (basePrice, attributes = []) => {
//   let total = Number(basePrice);
//   if (Number.isNaN(total)) total = 0;

//   for (const attr of attributes) {
//     if (!attr || !attr.calculateOnPrice) continue;
//     const op = attr.operator || 'none';
//     // Attempt numeric value
//     const n = Number(attr.value);
//     if (op === '+' && !Number.isNaN(n)) total = total + n;
//     else if (op === '-' && !Number.isNaN(n)) total = total - n;
//     else if (op === '*' && !Number.isNaN(n)) total = total * n;
//     else if (op === '/' && !Number.isNaN(n) && n !== 0) total = total / n;
//     // if 'none' or invalid value -> ignore
//   }

//   // avoid NaN
//   if (Number.isNaN(total)) total = basePrice;
//   return total;
// }

export const calculateProductPriceByAttributes = (basePrice, attributes = []) => {
  let total = Number(basePrice);
  if (Number.isNaN(total)) total = 0;

  for (const attr of attributes) {
    if (!attr || !attr.calculateOnPrice) continue;

    const op = attr.operator || 'none';
    const n = Number(attr.value);
    if (Number.isNaN(n) || n <= 0) continue;

    switch (op) {
      case '+':
        total += n;
        break;
      case '-':
        total -= n;
        break;
      case '*':
        total *= n;
        break;
      case '/':
        total /= n;
        break;
      default:
        break;
    }
  }

  if (Number.isNaN(total)) total = Number(basePrice) || 0;
  return Math.max(0, total);
};
