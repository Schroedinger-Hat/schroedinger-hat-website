import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)

export const getWeekState = (day: string) => {
  const today = dayjs()
  const parseDay = dayjs(day)

  if (parseDay.year() === today.year()) {
    if (parseDay.week() < today.week())
      return 'passed'

    if (parseDay.week() === today.week())
      return 'thisWeek'

    if (parseDay.week() > today.week())
      return 'coming'
  }
  else if (parseDay.year() < today.year()) {
    return 'passed'
  }
  else {
    return 'coming'
  }
}
