const ENCELADUS_DAY = 33; // in Earth hours
const DIONE_DAY = 66.7; // in Earth hours

function isLeapYear(year) {
    return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
}

function calculateTotalMinutes(year, month, day, hour, minute) {
    const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let totalDays = MONTH_DAYS.slice(0, month - 1).reduce((acc, val) => acc + val, 0);

    if (isLeapYear(year) && month > 2) {
        totalDays += 1;
    }

    totalDays += day - 1;
    return (totalDays * 24 + hour) * 60 + minute;
}

function convertToEnceladusOrDioneTime(earthDate, earthTime, destination) {
    const [year, month, day] = earthDate.split('-').map(Number);
    const [hour, minute] = earthTime.split(':').map(Number);
    const monthNames = [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[month];
    const totalEarthMinutesSinceYearStart = calculateTotalMinutes(year, month, day, hour, minute);

    // Precompute the number of minutes in an Enceladus and Dione day
    const enceladusDayLengthInMinutes = ENCELADUS_DAY * 60;
    const dioneDayLengthInMinutes = Math.floor(DIONE_DAY * 60);

    let dayNumber, minutesPast, convertedHour, convertedMinute;

    if (destination === "Enceladus") {
        dayNumber = Math.floor(totalEarthMinutesSinceYearStart / enceladusDayLengthInMinutes);
        minutesPast = totalEarthMinutesSinceYearStart % enceladusDayLengthInMinutes;
    } else if (destination === "Dione") {
        dayNumber = Math.floor(totalEarthMinutesSinceYearStart / dioneDayLengthInMinutes);
        minutesPast = totalEarthMinutesSinceYearStart % dioneDayLengthInMinutes;
    }

    convertedHour = Math.floor(minutesPast / 60);
    convertedMinute = minutesPast % 60;

    // Time string with zero-padded minutes
    const timeStr = `${convertedHour}:${convertedMinute.toString().padStart(2, '0')}`;

    // Generate the output string
    let output = `Local ${destination} Earth Time (L${destination.charAt(0)}ET):\n`;
    output += `Date: ${destination} Day ${dayNumber}, Earth Date: ${monthName} ${day}, ${year}\n`;
    output += `Time: ${timeStr} ${destination.charAt(0)}-Time, Earth Time: ${hour}:${minute.toString().padStart(2, '0')} UTC`;

    return output;
}

// Sample usage with the provided date and time:
const earthDate = "2182-09-05";
const earthTime = "19:32";

// Convert the time for both Enceladus and Dione
const resultEnceladus = convertToEnceladusOrDioneTime(earthDate, earthTime, "Enceladus");
const resultDione = convertToEnceladusOrDioneTime(earthDate, earthTime, "Dione");

console.log(resultEnceladus);
console.log(resultDione);