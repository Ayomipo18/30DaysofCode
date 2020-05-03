const packaging = (length, number) => {
	let result = '' + number;
	while(result.length < length) result = '0' + result;
	return result;
}

packaging(5, 22); //'00022'