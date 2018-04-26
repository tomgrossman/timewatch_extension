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
    const allStandardHours = currTable.getElementsByClassName('cb_stdHours');
    const allAttendedHours = currTable.getElementsByClassName('cb_attHours');
    const allAbsences = currTable.getElementsByClassName('cb_absence');

    let totalDays = 0;
    let totalRatio = 0;

    for (let i = 0; i < allStandardHours.length; i++) {
        if (allAbsences[i] && '' !== allAbsences[i].textContent.trim()) { //vacation
            continue;
        }

        const currStdMinutes = hoursToMinutes(allStandardHours[i].textContent.trim());
        if ('number' === typeof currStdMinutes && 550 > currStdMinutes && 100 < currStdMinutes) {
            const currAttendedMinutes = hoursToMinutes(allAttendedHours[i].textContent.trim());
            if ('number' === typeof currAttendedMinutes && 0 < currAttendedMinutes) {
                totalRatio += currAttendedMinutes/currStdMinutes;
                totalDays++;
            }
        }
    }

    const avgRatio = totalRatio/totalDays;
    const avgMinutesDaily = 540 * avgRatio;
    const avgHours = minutesToHours(avgMinutesDaily);

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
    if (0 === a.length) {
        return null;
    }

    return (Number(a[0])) * 60 + (Number(a[1]));
}

function minutesToHours(value) {
    const hours = Math.floor(value / 60);
    const minutes = Math.ceil(value % 60);

    return hours + ':' + ('0' + minutes).slice(-2);
}