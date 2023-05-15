export const FormatDate = (date) => {
  const realTime = new Date(date)

  const correctDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }
  const resultDate = realTime.toLocaleString('ru', correctDate)

  return resultDate;
}