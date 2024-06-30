export const dayAndMonth = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleString('default', {month: 'long'});
  return `${month}, ${d.getDate()}`;
};

export const dateAndTime = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleString('default', {month: 'long'});
  const time = d.toLocaleTimeString('en-US', {
    hour12: true, formatMatcher: 'basic',
  }).replace(/(.*)\D\d+/, '$1');

  return `${month}, ${d.getDate()} at ${time}`;
};
