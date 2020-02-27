import React from 'react';
import ReactDOM from 'react-dom';

import MardiGrasDay from './MardiGrasDay';

// Mardi Gras is calculated based off the date of Easter
//- Easter = the first Sunday _after_ the first Full Moon _after_ the Vernal Equinox
//- Ash Wednesday = Easter - 40 Days - nSundays
//- Mardi Gras = Ash Wednesday - 1 Day
ReactDOM.render(<MardiGrasDay />, document.getElementById('mardigrasday'));
