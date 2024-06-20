export const dayAndMonth = (date: Date) => {
  const month = date.toLocaleString('default', {month: 'long'});
  return `${month}, ${date.getDate()}`;
};

export const dateAndTime = (date: Date) => {
  const month = date.toLocaleString('default', {month: 'long'});
  const time = date.toLocaleTimeString('en-US', {
    hour12: true, formatMatcher: 'basic',
  }).replace(/(.*)\D\d+/, '$1');

  return `${month}, ${date.getDate()} at ${time}`;
};
