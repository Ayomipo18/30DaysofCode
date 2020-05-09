function Bcalculator(str){
	let arr = [];
	let decimal = 0;
	let splitted;
	let power;
	let returned;
	for(x=0; x<arguments.length; x++){
		splitted = arguments[x].split('');
		power = arguments[x].length-1;
		returned = 0;
		for(i=0; i<splitted.length; i++){
		returned += Number(splitted[i])*Math.pow(2, power); 
		power-= 1;
		};
		arr.push(returned);
		splitted = 0;
		power = 0;
		returned = 0;
	};
	for(j=0; j<arr.length; j++){
		decimal += Number(arr[j]);
	};
	return decimal;
};

console.log(Bcalculator('10','10'));//4
console.log(Bcalculator('101','10')); //7
console.log(Bcalculator('1011','1011010101')); //736