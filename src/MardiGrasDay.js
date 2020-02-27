import React, {Component} from 'react';

import {valiDate, VernalEquinox, FullMoons} from './themoon.js';

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

class MardiGrasDay extends Component {
    constructor() {
        super();
        
        let today = new Date();
        
        this.state = {
            mgYear: today.getFullYear(),
            bd: {
                mo: today.getMonth(),
                da: today.getDate()
            }
        }
    }
    render() {
        return (<div>
            <h2>What day is Mardi&nbsp;Gras&nbsp;in</h2>
            <div id="MGwhatday" className="MGinput">
                <div className="incDec" onClick={this.subYear.bind(this)}>[-]</div>
                <input name="mgYear" ref="mgYear" placeholder={this.state.mgYear} onChange={this.UpdateYear.bind(this)}/>
                <div className="incDec" onClick={this.addYear.bind(this)}>[+]</div>
            </div>
            { this.GetMardiGras( this.state.mgYear ) }
            
            <h2>When is my birthday Mardi Gras?</h2>
            <p>Note that Mardi Gras can only occur between February 3 and March 9 (inclusive).</p>
            <div id="MGbirthday" className="MGinput">
                <div className="incDec" onClick={this.subDay.bind(this)}>[-]</div>
                <select name="bdMonth" ref="bdMonth" onChange={this.UpdateBD.bind(this)} value={this.state.bd.mo}>
                    <option value="0">Jan</option><option value="1">Feb</option><option value="2">Mar</option><option value="3">Apr</option><option value="4">May</option><option value="5">Jun</option><option value="6">Jul</option><option value="7">Aug</option><option value="8">Sep</option><option value="9">Oct</option><option value="10">Nov</option><option value="11">Dec</option>
                </select>
                <input name="bdDate" ref="bdDate" placeholder={this.state.bd.da} onChange={this.UpdateBD.bind(this)}/>
                <div className="incDec" onClick={this.addDay.bind(this)}>[+]</div>
            </div>
            { this.GetMyBD( this.state.bd ) }
        </div>);
    }
    
    GetMardiGras(year) {
        return (<div className="results">
            <div className="calculator">
                <ul id="TrueMardiGras">
                    <li>
                        <h4>The Equinox (always) occurs: </h4>
                        <div className="mgresult result_vernalequinox">{ this.EccMG( year, 've') }</div>
                    </li>
                    <li>
                        <h4>The Pascal Moon is:</h4>
                        <div className="mgresult result_fullmoon">{ this.EccMG( year, 'nextfullmoon') }</div>
                    </li>
                    <li>
                        <h4>Easter is:</h4>
                        <div className="mgresult result_eastersunday">{ this.EccMG( year, 'easter') }</div>
                    </li>
                    <li>
                        <h4>Ash Wednesday is:</h4>
                        <div className="mgresult result_ashwednesday">{ this.EccMG( year, 'ashwednesday') }</div>
                    </li>
                    <li class="fattuesday">
                        <h4>Mardi Gras is: </h4>
                        <div className="mgresult result_happymardigras">{ this.theDate(this.EccMG( year, 'fattuesday')) }</div>
                    </li>
                </ul>
            </div>
            <div className="calculator">
                <p>However, astronomically speaking the actual dates of full moons and equinoxes may be different from those determined above. So, for fun, here are some "as technically correct as possible" dates.</p>
                <ul id="AstronomicalMardiGras">
                    <li>
                        <h4>The Vernal Equinox occurs: </h4>
                        <div className="mgresult result_vernalequinox">{ this.AstroMG( year, 've' ) }</div>
                    </li>
                    <li>
                        <h4>The Full Moon after that is: </h4>
                        <div className="mgresult result_fullmoon">{ this.AstroMG( year, 'nextfullmoon' ) }</div>
                    </li>
                    <li>
                        <h4>Easter is:</h4>
                        <div className="mgresult result_eastersunday">{ this.AstroMG( year, 'easter' ) }</div>
                    </li>
                    <li>
                        <h4>Ash Wednesday is:</h4>
                        <div className="mgresult result_ashwednesday">{ this.AstroMG( year, 'ashwednesday' ) }</div>
                    </li>
                    <li class="fattuesday">
                        <h4>Mardi Gras would be: </h4>
                        <div className="mgresult result_happymardigras">{ this.theDate(this.AstroMG( year, 'fattuesday' )) }</div>
                    </li>
                </ul>
            </div>
        </div>);
    }
    
    GetMyBD() {
        let alldates = [];
        let currYear = 1583;
        
        let bd = new Date();
        bd.setMonth(this.state.bd.mo);
        bd.setDate(this.state.bd.da);
        
        while ( currYear <= 5000 ) {
            let currMG = this.EccMG( currYear, 'fattuesday')
            if ( currMG.getMonth() === bd.getMonth() && currMG.getDate() === bd.getDate() ) {
                alldates.push(currMG);
            }
            
            currYear += 1
        }
        
        let displaydates = alldates.length > 0 ? (<div className="results myBD">
            <h4>Your day is Fat on these years:</h4>
            {
                alldates.map(d => {
                    return (<div className="BDyear" id={ 'mgyear' + d.getFullYear() } key={ 'mgyear' + d.getFullYear() }>
                        {
                            d.getFullYear()
                        }
                    </div>);
                })
            }
            </div>) : (<div className="results myBD">Mardi Gras does not occur on this date</div>);

        return displaydates;
    }
    
    EccMG( year, event ) {
        let date = new Date('Mar 21 ' + year);
        if ( event === 've' ) {
            return this.theDate(date);
        }
        
        // the computus
        let a = year % 19;
        let b = year % 4;
        let c = year % 7;
        
        let k = Math.floor( year / 100 );
        let p = Math.floor( (13 + (8*k)) / 25 );
        let q = Math.floor(k/4);
        
        let M = (15 - p + k - q) % 30;
        let N = (4 + k - q) % 7;
        
        let nextfullmoon = ((19 * a) + M) % 30;
        date.setTime( date.getTime() + oneDay * nextfullmoon );
        
        if ( event === 'nextfullmoon' ) {
            return this.theDate( date );
        }

        //Gregorian Easter is 22 + d + e March or d + e - 9 April
        let e = ((2 * b) + (4 * c) + (6 * nextfullmoon) + N) % 7;
        let easter = 22 + nextfullmoon + e;
        
        if ( easter > 31 ) {
            easter = nextfullmoon + e - 9;
            date.setDate(easter);
            date.setMonth(3);
        } else {
            date.setDate(easter);
            date.setMonth(2);            
        }
        if ( nextfullmoon === 29 && e === 6 ) {
            date.setDate(19)
        }
        if ( nextfullmoon === 28 && e === 6 && ((11*M) + 11)%30 < 19 ) {
            date.setDate(18);
        }
        if ( event === 'easter' ) {
            return this.theDate( date );
        }

        let ashwednesday = new Date(date);
        let lent = 40;
        while ( lent > 0 ) {
            ashwednesday = new Date(ashwednesday.setTime( ashwednesday.getTime() - oneDay ));
            if ( ashwednesday.getDay() !== 0 ) { // dont count sundays!
                 lent -= 1;
            }
        }
        if ( event === 'ashwednesday' ) {
            return this.theDate(ashwednesday);
        }
        
        let fattuesday = new Date(ashwednesday.getTime() - oneDay);
        return fattuesday;
    }
    
    AstroMG( year, event ) {
        // known wrong years nutrias.org/facts/mgdates.htm
        // 1974 ve: wed mar 20 fm: sat apr 06 easter: sun apr 07
        // 1981 ve: fri mar 20 fm: sun apr 19 easter: sun apr 26
        // 2001 ve: tue mar 20 fm: sat apr 07 easter: sun apr 08 SHOULD BE apr 15
        // 2019 ve: wed mar 20 fm: wed mar 20 easter: sun mar 24 SHOULD BE apr 21
        // 2025 ve: tue mar 20 fm: sat apr 12 easter: sun apr 13 SHOULD BE apr 20
        // 2035 ve: tue mar 20 fm: fri mar 23 easter: sun mar 25 SHOULD BE mar 25
        // 2038 ve: sat mar 20 fm: sat mar 20 easter: sun mar 21 SHOULD BE apr 25
        // 2045 ve: mon mar 20 fm: sat apr 01 easter: sun apr 02
        let ve = VernalEquinox( year );
        if ( event === 've' ) {
            return this.theDate(ve);
        }

        let moonlist = FullMoons( year );
        let nextfullmoon = moonlist.filter( m => m > ve )[0];
        if ( event === 'nextfullmoon' ) {
            return this.theDate(nextfullmoon);
        }
        
        let easter = new Date(nextfullmoon);
        let easterday = easter.getDay();
        if ( easterday === 0 ) { // if the fullmoon is on sunday, gotta go ahead to the next sunday
            easter = new Date(easter.setTime( easter.getTime() + oneDay * 7));
        }
        while ( easterday !== 0 ) {
            easter = new Date(easter.setTime( easter.getTime() + oneDay));
            easterday = easter.getDay();
        }
        if ( event === 'easter' ) {
            return this.theDate(easter);
        }
        
        let ashwednesday = new Date(easter);
        let lent = 40;
        while ( lent > 0 ) {
            ashwednesday = new Date(ashwednesday.setTime( ashwednesday.getTime() - oneDay ));
            if ( ashwednesday.getDay() !== 0 ) { // dont count sundays!
                 lent -= 1;
            }
        }
        if ( event === 'ashwednesday' ) {
            return this.theDate(ashwednesday);
        }
        
        let fattuesday = new Date(ashwednesday.getTime() - oneDay);
        return fattuesday;
    }
    
    theDate(d) {
        let options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        };
        d = d.toLocaleDateString('en-US', options);

        return d;
    }
    
    addYear() {
        this.setState({ mgYear: Number(this.state.mgYear) + 1});
    }
    subYear() {
        this.setState({ mgYear: Number(this.state.mgYear) - 1});
    }
    UpdateYear() {
        if ( this.refs.mgYear.value.length === 4 && valiDate(this.refs.mgYear.value) ) {
            this.setState({mgYear: Number(this.refs.mgYear.value)});
            this.refs.mgYear.value = '';
        }
    }
    
    addDay() {
        let date = new Date(months[this.state.bd.mo] + ' ' + this.state.bd.da + ' 2000'); //using a known leap year so all dates are available
        date.setTime( date.getTime() + oneDay );
        this.setState({
            bd: {
                mo: date.getMonth(),
                da: date.getDate()
            }
        });
        this.refs.bdDate.value = '';
    }
    subDay() {
        let date = new Date(months[this.state.bd.mo] + ' ' + this.state.bd.da + ' 2000'); //using a known leap year so all dates are available
        date.setTime( date.getTime() - oneDay );
        this.setState({
            bd: {
                mo: date.getMonth(),
                da: date.getDate()
            }
        });
        this.refs.bdDate.value = '';
    }

    UpdateBD() {
        let month = Number(this.refs.bdMonth.value);
        if ( month !== this.state.bd.mo ) {
            this.setState({
                bd: {
                    mo: month,
                    da: this.state.bd.da
                }
            });
            
        }
        
        let date = Number(this.refs.bdDate.value);
        if ( date !== this.state.bd.da && date > 0 ) {
            if ( date < 31 ) {
                 this.setState({
                    bd: {
                        mo: this.state.bd.mo,
                        da: date
                    }
                });       
    
            }
        }
    }
}

export default MardiGrasDay;