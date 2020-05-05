const noSeven = (input) => {
	const arr = [];
	const randomNo = () => {
		let random = Math.floor(Math.random()*input);
		while(random.toString().includes('7')) random = Math.floor(Math.random()*input);
		return random;
	}
	let remainder = input - randomNo();
	while(remainder.toString().includes('7')) remainder = input - randomNo();
	arr.push(input - remainder);
	arr.push(remainder);
	return arr;
};

console.log(noSeven(70));
console.log(noSeven(717));