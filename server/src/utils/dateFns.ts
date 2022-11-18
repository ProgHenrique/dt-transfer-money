import addDays from 'date-fns/addDays'


export const addOneDay = (date: Date) => {
  return addDays(date, 1)
}
