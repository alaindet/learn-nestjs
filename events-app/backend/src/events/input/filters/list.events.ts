export enum WhenEventFilter {
  All = 'all',
  Today = 'today',
  Tomorrow = 'tomorrow',
  ThisWeek = 'this-week',
  NextWeek = 'next-week',
}

export class ListEvents {
  when?: WhenEventFilter = WhenEventFilter.All;
}