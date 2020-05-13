const numToWords = (num) => {
  const lowest = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  const tens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  const highest = ['', 'thousand', 'million', 'billion'];
  let word = '';

  if(num.toString().length > 12) return 'Converts only a maximum of a Billion units';
  for (let i = 0; i < highest.length; i++) {
    let tempNum = num%(100*Math.pow(1000,i));
    if (Math.floor(tempNum/Math.pow(1000,i)) !== 0) {	
      if (Math.floor(tempNum/Math.pow(1000,i)) < 20) {
        word = lowest[Math.floor(tempNum/Math.pow(1000,i))] + highest[i] + ' ' + word;
      } else {
        word = tens[Math.floor(tempNum/(10*Math.pow(1000,i)))] + '-' + lowest[Math.floor(tempNum/Math.pow(1000,i))%10] + highest[i] + ' ' + word;
      }
    }

    tempNum = num%(Math.pow(1000,i+1));
    if (Math.floor(tempNum/(100*Math.pow(1000,i))) !== 0) word = lowest[Math.floor(tempNum/(100*Math.pow(1000,i)))] + 'hundred ' + word;
  }
    return word;
}

console.log(numToWords(2032));
console.log(numToWords(1234567899));