// this library is adapted from Moon Phase and Equinox scripts fount at:
// https://stellafane.org/observing/moon_phase.html
// https://stellafane.org/misc/equinox.html

// -[O_o]- //

export function valiDate(d){
    // Validates that the input year is a valid integer between -4712 to +3500 (for equinoxes)
    // Validates that the input year is a valid integer between -4712 to +3500 (for moon phases)
    // Returns true if valid, false if not
    if ( !Number(d) ) {
        alert("Please enter a number for the \"Year\" field.");
        return false;
    }

    if ( ( d < 1000 ) || ( d > 3000 ) ) {
        alert("Please enter a value greater than or equal to \"1000\" and less than or equal to \"3000\" in the \"Year\" field.");
        return false;
    }

    if ( ( d < -4712 ) || ( d > 3500 ) ) {
        alert("Please enter a value greater than or equal to \"-4712\" and less than or equal to \"+3500\" in the \"Year\" field.");
        return false;
    }
    return true;
}

