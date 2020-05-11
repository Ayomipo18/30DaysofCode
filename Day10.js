function validate(email, password){
	let arr=[];
	function validateEmail(){
		if(email.length <= 2) return false;
		if(email.indexOf("@") === -1) return false;
		let parts = email.split("@");
		let dot = parts[1].indexOf('.');
		let length = parts[1].length;
		let dotSplits = parts[1].split(".");
		let dotCount = dotSplits.length-1;
		if(dot === -1 || dot <2 || dotCount >2) return false;
		for(i=0; i<dotSplits.length; i++){
		  if(dotSplits[i].length === 0) return false;
		}
		return true;
	}

	function validatePassword(){
	  let x =0;
	  let character;
	  if(password.length>=8) arr.push('true');
	  while(x<password.length){
	  	character=password.charAt(x);
	  	for(j=32;j<=64;j++){
      		if(character === String.fromCharCode(j)) arr.push('true');
      	};
	  	if(!isNaN(character*1)) arr.push('true');
	  	if(character === character.toUpperCase()) arr.push('true');
      	if(character === character.toLowerCase()) arr.push('true');
      	x++;
	  	}
	  return '';
	  };

	validatePassword();

	if(validateEmail() && arr.length>=14) return {
		email: true,
		password: true
	};

	else if(!validateEmail() && arr.length<14) return {
		email: false,
		password: false
	};

	else if(validateEmail() && arr.length<14) return {
		email: true,
		password: false
	};
	else if(!validateEmail() && arr.length>=14) return {
		email: false,
		password: true
	};

};

console.log(validate('ayomiposolaja@gmail.com', 'Heywatw/2'));
console.log(validate('ayomiposolaja@gmail.com', 'Heywatw'));
console.log(validate('ayomiposolaja@gmailcom', 'Heywatw/2'));
console.log(validate('ayomiposolaja@gmailcom', 'Heywatw'));