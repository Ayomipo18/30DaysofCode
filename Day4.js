
const optimusPrime = (limit) => {
	const isPrime = (num) => {
	for (let i = 2; i < num; i++) if (num % i === 0) return false;
	return true 
	};
	const arr = [2];
	for (let i =3; i <= limit; i+=2) if(isPrime(i)) arr.push(i);
	return arr;
};

optimusPrime(11); //[2,3,5,7,11]