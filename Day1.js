const scrabble = (str1, str2) => {
    const [arr1, arr2] = [str1.split(''), str2.split('')];
    return arr2.every( x => arr1.indexOf(x)===-1 ? false: arr1.splice(arr1.indexOf(x),1));
};

console.log(scrabble('jigokuhen','jigen')); //true
console.log(scrabble('i am rain','raining')); //false