module.exports = {
  format_date: (date) => {
    if (date) {
      return date.toLocaleDateString();
    } else {
      return '';
    }
  }
};
