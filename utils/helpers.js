module.exports = {
  format_date: (date) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date(date).toLocaleString('en-CA', options);
  },
};
