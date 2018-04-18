let currSpan = document.querySelector('body > div > span');

do {
    if (!currSpan) {
        break;
    }

    const table = currSpan.querySelector('p:nth-child(2) > table:nth-child(2)');
    handleCurrTable(table);

} while(hasNextSpan(currSpan));

function hasNextSpan (currNode) {
    if (6 >= currNode.children.length) {
        currSpan = currNode.children[5];

        return true;
    }

    return false;
}

function handleCurrTable (currTable) {
    const allAttendedHours = currTable.getElementsByClassName('cb_attHours');
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
    const row = currTable.insertRow(currTable.rows.length - 3);

    const cells = {};
    for (let i = 0; i < 13; i++) {
        cells[i] = row.insertCell(i);
    }

    cells[0].innerHTML = '<b>AVG Hours of working days</b>';
    cells[10].innerHTML = `<b>${avgHours}</b>`;

}

function hoursToMinutes(value) {
    const a = value.split(':');

    return (Number(a[0])) * 60 + (Number(a[1]));
}

function minutesToHours(value) {
    const hours = Math.floor(value / 60);
    const minutes = Math.ceil(value % 60);

    return hours + ':' + minutes;
}