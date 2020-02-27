// computus for the date of easter
// https://en.wikipedia.org/wiki/Computus#Algorithms

//a = year mod 19 	a = 10
//b = year mod 4 	b = 1
//c = year mod 7 	c = 6
//k = ⌊year/100⌋ 	k = 17 (floor)
//p = ⌊13 + 8k/25⌋ 	p = 5 (floor)
//q = ⌊k/4⌋ 	q = 4
//M = (15 − p + k − q) mod 30 	M = 23
//N = (4 + k − q) mod 7 	N = 3
//d = (19a + M) mod 30 	d = 3 // number of days for the closest full moon counting from March 21
//e = (2b + 4c + 6d + N) mod 7 	e = 5
//Gregorian Easter is 22 + d + e March or d + e − 9 April 	30 March
//if d = 29 and e = 6, replace 26 April with 19 April
//if d = 28, e = 6, and (11M + 11) mod 30 < 19, replace 25 April with 18 April







