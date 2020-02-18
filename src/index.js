import React from 'react';
import ReactDOM from 'react-dom';

import MardiGrasDay from './MardiGrasDay';


// Mardi Gras is calculated based off the date of Easter
//- Easter = the first Sunday _after_ the first Full Moon _after_ the Vernal Equinox
//- Ash Wednesday = Easter - 40 Days - nSundays
//- Mardi Gras = Ash Wednesday - 1 Day

// The approximate age of the Moon, and hence the approximate phase, can be calculated for any date by calculating the number of days since a known new moon (such as January 1, 1900 or August 11, 1999) and reducing this modulo 29.530588853 (the length of a synodic month). The difference between two dates can be calculated by subtracting the Julian day number of one from that of the other, or there are simpler formulae giving (for instance) the number of days since December 31, 1899.
// https://en.wikipedia.org/wiki/Lunar_phase
const knownNewMoon = new Date('Jan 6 2000, 18:14:57 GMT');
const synodicMonth = 29.530588853;
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

// next moon on sun feb 23 2020 15:33:44 GMT

let anydate = new Date('sun feb 23 2020 15:33:44 GMT');

const diffDays = Math.round(Math.abs((knownNewMoon - anydate) / oneDay));
let moonage = diffDays % synodicMonth;
console.log(moonage);





ReactDOM.render(<MardiGrasDay />, document.getElementById('mardigrasday'));



