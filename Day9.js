const naruto = (num) => {
	const arr = [];
	let tempArr = [];
	let final = '';
	let numSize = num;
	for(i=0; i<numSize; i++){
		if(num%2 === 0) tempArr.push('Na');
		if(num%3 === 0) tempArr.push('Ru');
		if(num%5 === 0) tempArr.push('To');
		if(num%2 !==0 && (num%3 !==0 && num%5 !==0)) tempArr.push('' + num);
		if(tempArr.length > 1){
			for(j=1; j<tempArr.length; j+=2) tempArr.splice(j,0,'-');
		}
		for(x=0; x<tempArr.length; x++) final +=tempArr[x];
		arr.unshift(final);
		final = '';
		tempArr = [];
		num -= 1;
	}
	return arr;
}

console.log(naruto(10));
console.log(naruto(30));