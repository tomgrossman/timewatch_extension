const allAttendedHours = document.getElementsByClassName('cb_attHours');
let totalDays = 0;
let totalMinutes = 0;

for (const currHour of allAttendedHours) {
    const currMinutes = hoursToMinutes(currHour.textContent.trim());
    if (currMinutes && 1440 > currMinutes && 5 < currMinutes) {
        totalMinutes += currMinutes;
        totalDays++;
    }
}

const avgHours = minutesToHours(totalMinutes/totalDays);

const table = document.querySelector('body > div > span > p:nth-child(2) > table:nth-child(2)');
const row = table.insertRow(table.rows.length - 3);

const cells = {};
for (let i = 0; i < 13; i++) {
    cells[i] = row.insertCell(i);
}

cells[0].innerHTML = '<td colspan="2" nowrap=""><span style="font-size: 11pt" font-family="Arial"><b>AVG Hours of working days</b></span></td>';
cells[10].innerHTML = `<td colspan="2" nowrap=""><span style="font-size: 11pt" font-family="Arial"><b>${avgHours}</b></span></td>`;


function hoursToMinutes(value) {
    const a = value.split(':');

    return (Number(a[0])) * 60 + (Number(a[1]));
}

function minutesToHours(value) {
    const hours = Math.floor(value / 60);
    const minutes = Math.ceil(value % 60);

    return hours + ':' + minutes;
}