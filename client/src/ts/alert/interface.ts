export interface Alert {
  msg: string;
  type: string;
  id: number | string;
}

export type AlertState = Alert[];
