import {
  DateAddDaysDTO,
  DateAddHoursDTO,
  DateAddMinutesDTO,
  DateIsDateGreaterThanDTO,
  IsDateInIntervalDTO,
} from '../dtos/providers/Date.provider.dto';

export interface DateProviderInterface {
  addDays(data: DateAddDaysDTO): Date;
  isDateGreaterThan(data: DateIsDateGreaterThanDTO): boolean;
  addHours(data: DateAddHoursDTO): Date;
  addMinutes(data: DateAddMinutesDTO): Date;
  isWithin15Minutes(dateString: Date): boolean;
  parsePtbrDateStringToDate(dateString: string): Date;
  isDateInInterval(data: IsDateInIntervalDTO): boolean;
}
