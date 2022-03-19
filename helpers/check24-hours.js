function isDateWithin24Hours(dateString) {
    const then = new Date(dateString);
    const now = new Date();

    const msBetweenDates = Math.abs(then.getTime() - now.getTime());
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    console.log(hoursBetweenDates);

    if (hoursBetweenDates < 24 || hoursBetweenDates - 24 > 5) {
        return true
    } else {
        return false
    }
}
module.exports = isDateWithin24Hours