export interface Screen {
  id: number;
  name: string;
  rows: number;
  colu: number;
  specialSeats: string[];
}

export interface ScreenGrid {
  rows: string[];
  cols: number[];
  specialSeats: string[];
}
