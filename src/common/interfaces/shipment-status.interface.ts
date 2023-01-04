export type ShipmentStatusConfig = {
  [key: string]: {
    status: string;
    color: string;
    next: number[];
    index: number;
  };
};
