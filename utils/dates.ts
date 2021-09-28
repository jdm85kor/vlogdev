const dateYYYYMMDD = (value: number | string) => {
  if (!value) return '';
  const date = new Date(value);
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDay();

  return `${y}.${m}.${d}`;
};

export {
  dateYYYYMMDD,
};
