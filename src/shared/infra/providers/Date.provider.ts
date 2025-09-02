import { addDays, addHours, compareAsc, addMinutes, parse } from 'date-fns';
import { DateProviderInterface } from '../../domain/providers/Date.provider';
import {
  DateAddDaysDTO,
  DateAddHoursDTO,
  DateAddMinutesDTO,
  DateIsDateGreaterThanDTO,
  IsDateInIntervalDTO,
} from '../../domain/dtos/providers/Date.provider.dto';

export class DateProvider implements DateProviderInterface {
  addDays({ date, days }: DateAddDaysDTO): Date {
    const updatedDate = addDays(date, days);

    return updatedDate;
  }

  isDateGreaterThan({
    dateLeft,
    dateRight,
  }: DateIsDateGreaterThanDTO): boolean {
    const resultCompareAsc = compareAsc(dateLeft, dateRight);

    const resultComparedDates = resultCompareAsc !== -1;

    return resultComparedDates;
  }

  addHours({ date, hours }: DateAddHoursDTO): Date {
    const updatedDate = addHours(date, hours);

    return updatedDate;
  }

  addMinutes({ date, minutes }: DateAddMinutesDTO): Date {
    const updatedDate = addMinutes(date, minutes);

    return updatedDate;
  }

  isWithin15Minutes(date: Date): boolean {
    const THREE_HOURS = 3 * 60 * 60 * 1000;
    // const ONE_HOUR = 1 * 60 * 60 * 1000
    const FIFTEEN_MINUTES = 15 * 60 * 1000;

    const fixedTimezoneDateToPTBR = date.getTime() - THREE_HOURS;
    const fixesTimezoneCurrentDateToPTBR = Date.now() - THREE_HOURS;

    const minutesDiff =
      fixesTimezoneCurrentDateToPTBR - fixedTimezoneDateToPTBR;

    return minutesDiff <= FIFTEEN_MINUTES;
  }

  parsePtbrDateStringToDate(dateString: string): Date {
    return parse(dateString, 'dd/MM/yyyy', new Date());
  }

  isDateInInterval({ date, startDate, endDate }: IsDateInIntervalDTO): boolean {
    return (
      this.isDateGreaterThan({
        dateLeft: date,
        dateRight: startDate,
      }) &&
      this.isDateGreaterThan({
        dateLeft: endDate,
        dateRight: date,
      })
    );
  }
}
