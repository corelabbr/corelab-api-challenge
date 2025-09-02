export interface DateAddDaysDTO {
  date: Date;
  days: number;
}

export interface DateAddHoursDTO {
  date: Date;
  hours: number;
}

export interface DateAddMinutesDTO {
  date: Date;
  minutes: number;
}

export interface DateIsDateGreaterThanDTO {
  dateLeft: Date;
  dateRight: Date;
}

export interface IsDateInIntervalDTO {
  date: Date;
  startDate: Date;
  endDate: Date;
}
