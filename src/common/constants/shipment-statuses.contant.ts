import { ShipmentStatusConfig } from '../interfaces/shipment-status.interface';

const SHIPMENT_STATUS: ShipmentStatusConfig = {
  '2001': {
    status: 'Đơn mới',
    color: '#a0a0a0',
    next: [1000, 3000, 1003, 4001, 2002, 4001],
    index: 1,
  },
  '1000': {
    status: 'Chờ lấy hàng',
    color: '#54300e',
    next: [3000, 1003, 2002, 4001],
    index: 2,
  },
  '3000': {
    status: 'Đang lấy hàng',
    color: '#d46b08',
    next: [2002, 1003, 4001],
    index: 3,
  },
  '1003': {
    status: 'Chưa lấy được hàng',
    color: '#eb2f96',
    next: [1000, 3000, 2002, 4001],
    index: 4,
  },
  '2002': {
    status: 'Đã lấy hàng',
    color: '#95de64',
    next: [3001, 1001, 3002, 4000, 3004, 2000, 1002, 3006, 3005, 2003],
    index: 5,
  },
  '3001': {
    status: 'Đang trong kho',
    color: '#fa8c16',
    next: [1001, 3002, 3004, 1002, 3006, 3005, 2003],
    index: 6,
  },
  '1001': {
    status: 'Chờ trung chuyển',
    color: '#54300e',
    next: [3004, 1002, 3002, 4000, 3006, 3005],
    index: 7,
  },
  '3002': {
    status: 'Đang giao hàng',
    color: '#ffa940',
    next: [4000, 2000, 1002, 3006],
    index: 8,
  },
  '4000': {
    status: 'Giao thất bại',
    color: '#8c8c8c',
    next: [3002, 3004, 2000, 1002, 3006, 3005],
    index: 9,
  },
  '3004': {
    status: 'Đang trung chuyển',
    color: '#ffc069',
    next: [3001, 1001, 3002, 4000, 2000, 1002, 3005, 2003],
    index: 10,
  },
  '2000': {
    status: 'Giao thành công',
    color: '#52c41a',
    next: [3001, 1001, 3002, 3004, 3006, 3005, 2003],
    index: 11,
  },
  '1002': {
    status: 'Chờ hoàn',
    color: '#54300e',
    next: [3001, 1001, 3002, 4000, 3004, 3006, 3005, 2003],
    index: 12,
  },
  '3006': {
    status: 'Trung chuyển hoàn',
    color: '#722ed1',
    next: [3001, 1002, 3005, 2003],
    index: 13,
  },
  '3005': {
    status: 'Đang hoàn',
    color: '#13c2c2',
    next: [3001, 2003],
    index: 14,
  },
  '2003': { status: 'Đã hoàn', color: '#95de64', next: [], index: 15 },
  '4001': { status: 'Đã hủy', color: '#f5222d', next: [], index: 16 },
};

export const CM_DISABLED_DELETE_STATUS = [];
export default SHIPMENT_STATUS;
