module.exports = {
  format_date: (date) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'America/Toronto',
    };
    return new Date(date).toLocaleString('en-CA', options);
  },
};
