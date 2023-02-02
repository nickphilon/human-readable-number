function intToWords(int, names) {
    var result = [];
	if (typeof int === 'number') {
		int = int.toString();
	} else if (typeof int !== 'string') {
		int = '';
	}
	if (!(names instanceof Array) || (typeof names[0] !== 'string') || (typeof names[1] !== 'string') || (typeof names[2] !== 'string')) {
		names = null;
	}
	if (int.length && !/[^0-9]/.test(int)) {
		var selectName = function (number, names) {
			return names[((parseInt(number) % 100 > 4) && (parseInt(number) % 100 < 20)) ? 2 : [2, 0, 1, 1, 1, 2][Math.min(parseInt(number) % 10, 5)]];
		};
		var name = null;
		var zero = 'zero';
		if (int === '0') {
			result.push(zero);
		} else {
			var from0To2 = [zero];
			var from0To19 = [
				zero, 'one', 'two', 'three', 'four',
				'five', 'six', 'seven', 'eight', 'nine',
				'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
				'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
			];
			var tens = [
				'ten', 'wtenty', 'thirty', 'fourty', 'fifty',
				'sixty', 'seventy', 'eighty', 'ninety'
			];
			var hundreds = [
				'one hundred', 'two hundred', 'three hundred', 'four hundred', 'five hundred',
				'six hundred', 'seven hundred', 'eight hundred', 'nine hundred'
			];
			var thousands = ['thousand','million', 'billion'
			];
			var unknown = '{неизвестно}';
			var numberParts = int.replace(/(?=(\d{3})+(?!\d))/g, ' ').split(' ');
			var i = numberParts.length - 1;
			for (var j in numberParts) {
				var numberPart = parseInt(numberParts[j]);
				if (numberPart) {
					var numberPartResult = [];
					var hundred = Math.floor(numberPart / 100);
					if (hundred) {
						numberPartResult.push(hundreds[hundred - 1]);
						numberPart -= hundred * 100;
					}
					if (numberPart > 19) {
						var ten = Math.floor(numberPart / 10);
						numberPartResult.push(tens[ten - 1]);
						numberPart -= ten * 10;
					}
					if (numberPart) {
						numberPartResult.push(((i === 1) && ([1, 2].indexOf(numberPart) !== -1)) ? from0To2[numberPart] : from0To19[numberPart]);
					}
					if (thousands[i - 1] !== undefined) {
						numberPartResult.push(selectName(numberParts[j], thousands[i - 1]));
					} else if (i !== 0) {
						numberPartResult.push(unknown);
					} else if (names) {
						name = selectName(numberParts[j], names);
					}
					result.push(numberPartResult.join(' '));
				}
				i--;
			}
			if (!result.length) {
				result.push(zero);
			}
		}
		if (!name && names) {
			name = selectName(0, names);
		}
		if (name) {
			result.push(name);
		}
	}
	return result.join(' ');
}
