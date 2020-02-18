import React, {Component} from 'react';

import {valiDate, VernalEquinox, FullMoons} from './themoon.js';

class MardiGrasDay extends Component {
    constructor() {
        super();
        this.state = {
            mgYear: 2020
        }
    }
    render() {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

        let ve = VernalEquinox(this.state.mgYear);
        let moonlist = FullMoons(this.state.mgYear);
        
        let nextfullmoon = moonlist.filter( m => m > ve )[0]
        
        let easter = new Date(nextfullmoon);
        let easterday = easter.getDay();
        while ( easterday !== 0 ) {
            easter = new Date(easter.setTime( easter.getTime() + oneDay));
            easterday = easter.getDay();
        }
        
        let ashwednesday = new Date(easter);
        let lent = 40;
        while ( lent > 0 ) {
            ashwednesday = new Date(ashwednesday.setTime( ashwednesday.getTime() - oneDay ));
            if ( ashwednesday.getDay() !== 0 ) { // dont count sundays!
                 lent -= 1;
            }
        }
        
        let fattuesday = new Date(ashwednesday.getTime() - oneDay);
        
        return (<div>
            <h2>What day is Mardi Gras in <input name="mgYear" ref="mgYear" placeholder={ this.state.mgYear } onChange={this.UpdateYear.bind(this)} /> ?</h2>
            <ul>
                <li>
                    <h4>The Vernal Equinox occurs: </h4>
                    <div id="vernalequinox">{ ve.toString() }</div>
                </li>
                <li>
                    <h4>The Full Moon after that is: </h4>
                    <div id="fullmoon">{ nextfullmoon.toString() }</div>
                </li>
                <li>
                    <h4>Easter is:</h4>
                    <div id="eastersunday">{ easter.toString() }</div>
                </li>
                <li>
                    <h4>Ash Wednesday is:</h4>
                    <div id="ashwednesday">{ ashwednesday.toString() }</div>
                </li>
                <li>
                    <h4>Mardi Gras is: </h4>
                    <div id="happymardigras">{ fattuesday.toString() }</div>
                </li>
            </ul>
        </div>);
    }
    
    UpdateYear() {
        if ( this.refs.mgYear.value.length === 4 && valiDate(this.refs.mgYear.value) ) {
            this.setState({mgYear: Number(this.refs.mgYear.value)})
        }
    }
}

export default MardiGrasDay;