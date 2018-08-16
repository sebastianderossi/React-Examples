class Palindrome {

	checkPalindome (value) {
		this.str = value;
		return this.str == this.str.split('').reverse().join('');
	}

	getAllPalindromes (value) {
		let arr = [];
		this.str = value;
		let currentStr = "";
		//SD:Value length will change as check happens
		for(let i=0;i<=value.length;i++) {
			for(let j=0;j<value.length-i;j++) {
				//SD: j start position, j+i endposition
				currentStr = value.substring(j,j+i+1);
				//SD:Testing result string
				//console.log("currentStr", currentStr)
				if (currentStr.length > 1) {
					if (this.checkPalindome(currentStr)){
						arr.push(currentStr)
					}
				}
			}
		}

		return this._getUniqueItems(arr).sort((a,b)=> {
			return a>b;
		});
	}

	_getUniqueItems(arr) {
		let l = arr.length;
		let a = [];
		let hash = {};
		for(let i=0;i<l;i++) {
			var item = arr[i];
			if(hash[item] !== true) {
				hash[item] = true;
				a.push(item);
			}
		}
		return a;
	}
}
export default Palindrome;
