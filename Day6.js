const Atongue = (str) => {
	const akinWords = []; //array to store akin's langauge
	const spacesAndCommas = []; //array to store spaces and commas gotten from the input english sentence
	const saverArray = []; //array to save positions of comma and spaces from the input english sentence
	let vowels = ['a', 'i', 'y', 'e', 'o', 'u']; //akin's vowels
	let consonants = ['b', 'k', 'x', 'z', 'n', 'h', 'd', 'c', 'w', 'g', 'p', 'v', 'j', 'q', 't', 's', 'r', 'l', 'm', 'f']; // akin's consonants
	let splitted = str.split(''); //an array containing already split input english sentence
	let splitted2 = str.split(''); // a second array containing already split input english sentence

	//the entire for loop generate akin's words from the input english sentence 
	for( let i=0; i<splitted.length; i++){
		// this block of code checks for and removes any commas,spaces or fullstops in the split english sentence
		switch(splitted[i]){
			case  ',':
				splitted.splice(splitted.indexOf(splitted[i]), 1);
				break;
			case  ' ':
				splitted.splice(splitted.indexOf(splitted[i]), 1);
				break;
			case  '.':
				splitted.splice(splitted.indexOf(splitted[i]), 1);
				break;
		};
		//it double checks, incase of spaces,commas or fullstops occuring twice(which is the max it can occur)
		switch(splitted[i]){
			case  ',':
				splitted.splice(splitted.indexOf(splitted[i]), 1);
				break;
			case  ' ':
				splitted.splice(splitted.indexOf(splitted[i]), 1);
				break;
			case  '.':
				splitted.splice(splitted.indexOf(splitted[i]), 1);
				break;
		};

		//the check function is used to handle uppercase letters and it stores it in the checked variable
		const check = () => {
		if(splitted[i] === splitted[i].toUpperCase()) return true
		};
		let checked = check();
		//this block of code handles the vowels
		if(vowels.includes(splitted[i].toLowerCase())){
			if(vowels[vowels.indexOf(splitted[i].toLowerCase())-3] === undefined){
				if(checked) {
					vowels.unshift('e', 'o', 'u');
					akinWords.push(vowels[vowels.indexOf(splitted[i].toLowerCase())-3].toUpperCase());
					vowels = vowels.slice(3);
				};
				vowels.unshift('e', 'o', 'u');
				akinWords.push(vowels[vowels.indexOf(splitted[i])-3]);
				vowels = vowels.slice(3);
			} 
			else if(vowels[vowels.indexOf(splitted[i].toLowerCase())-3]) {
				if(checked) akinWords.push(vowels[vowels.indexOf(splitted[i].toLowerCase())-3].toUpperCase());
				akinWords.push(vowels[vowels.indexOf(splitted[i])-3]);
			};
		}
		//this handles for consonants
		else {
			if(consonants[consonants.indexOf(splitted[i].toLowerCase())-10] === undefined){
				if(checked) {
					consonants.unshift('p', 'v', 'j', 'q', 't', 's', 'r', 'l', 'm', 'f');
					akinWords.push(consonants[consonants.indexOf(splitted[i].toLowerCase())-10].toUpperCase());
					consonants = consonants.slice(10);
				};
				consonants.unshift('p', 'v', 'j', 'q', 't', 's', 'r', 'l', 'm', 'f');
				akinWords.push(consonants[consonants.indexOf(splitted[i])-10]);
				consonants = consonants.slice(10);
			} 
			else if(consonants[consonants.indexOf(splitted[i].toLowerCase())-10]) {
				if(checked) akinWords.push(consonants[consonants.indexOf(splitted[i].toLowerCase())-10].toUpperCase());
				akinWords.push(consonants[consonants.indexOf(splitted[i])-10]);
			};
		}
	};
	//this for loop is used for generating the sequence of the spaces and commas and also their positions in the input english sentence
	for( let i=0; i<splitted2.length; i++){
		if(splitted2[i] === ',' ||( splitted2[i] === ' ' || splitted2[i] === '.')) {
			spacesAndCommas.push(splitted2[i]);
			saverArray.push(splitted2.indexOf(splitted2[i], i));
		}
	};

	for(i=0; i<akinWords.length; i++) if(akinWords[i]===undefined) akinWords.splice(i, 1);//this for loop is used for removing every undefined returned in akinWord array
	for(i=0; i<saverArray.length; i++) akinWords.splice(saverArray[i], 0, spacesAndCommas[i]);//this for loop gives final akinWords in his language
	return akinWords.join('');
};

console.log(Atongue('As a boss, I refuse to speak the tongue of Mortal Men. Haaa'));
console.log(Atongue('Eh e pihh, O dagyha ni hbaev nsa nitfya ig Widnec Wat. Seee'));