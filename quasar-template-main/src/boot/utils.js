Date.prototype.timeDiff = function (date) {
  if (!date) {
    date = new Date();
  }
  let diffInMilliSeconds = Math.abs(this.getTime() - date) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  let difference = '';
  if (days > 0) {
    difference += `${days}d, `;
  }

  if (hours > 0) {
    difference += `${hours}h, `;
  }

  if (minutes >= 1) {
    difference += `${minutes}m`;
    // if (diffInMilliSeconds > 0) {
    //   difference += `, ${Math.floor(diffInMilliSeconds)}s`;
    // } 
  } else {
    // if (diffInMilliSeconds > 30) {
    //   difference += `${Math.floor(diffInMilliSeconds)}s`;
    // } else {
      return 'Recently';
    // }
  }

  return difference.trim();
}

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

Date.prototype.toTZ = function (tzString = 'Asia/Jakarta') {
  return timeZone === tzString ? this : new Date(this.toLocaleString("en-US", { timeZone: tzString }));
}

Date.prototype.toTZString = function (tzString = 'Asia/Jakarta') {
  return this.toLocaleString("sv", { timeZone: tzString }) //.replace(' ', 'T');
}

Date.tryToTZString = function (date, tzString = 'Asia/Jakarta') {
  // try {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? date : parsedDate.toLocaleString("sv", { timeZone: tzString }) //.replace(' ', 'T');
  // } catch (e) {
  //   return date;
  // }
}
