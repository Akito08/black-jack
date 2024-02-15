import { Action } from "../types";

export const hardHandStrategy: {
  [dealerUpCard: number]: { [action in Action]: number[] };
} = {
  2: {
    Hit: [5, 6, 7, 8, 12, 13, 14, 15, 16],
    Stand: [17, 18, 19, 20],
    Double: [9, 10, 11],
  },
  3: {
    Hit: [5, 6, 7, 8, 12, 13, 14, 15, 16],
    Stand: [17, 18, 19, 20],
    Double: [9, 10, 11],
  },
  4: {
    Hit: [5, 6, 7, 8, 12, 13, 14, 15],
    Stand: [17, 18, 19, 20],
    Double: [9, 10, 11],
  },
  5: {
    Hit: [5, 6, 7, 8, 12, 13, 14],
    Stand: [17, 18, 19, 20],
    Double: [9, 10, 11],
  },
  6: {
    Hit: [5, 6, 7, 8, 12, 13, 14],
    Stand: [17, 18, 19, 20],
    Double: [9, 10, 11],
  },
  7: {
    Hit: [5, 6, 7, 8, 9, 12, 13, 14, 15, 16],
    Stand: [17, 18, 19, 20],
    Double: [10, 11],
  },
  8: {
    Hit: [5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16],
    Stand: [17, 18, 19, 20],
    Double: [11],
  },
  9: {
    Hit: [5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16],
    Stand: [17, 18, 19, 20],
    Double: [11],
  },
  10: {
    Hit: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    Stand: [17, 18, 19, 20],
    Double: [],
  },
  11: {
    Hit: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    Stand: [17, 18, 19, 20],
    Double: [],
  },
};

export const softHandStrategy: {
  [dealerUpCard: number]: { [action in Action]: number[] };
} = {
  2: { Hit: [13, 14, 15, 16, 17], Stand: [18, 19, 20], Double: [] },
  3: { Hit: [13, 14, 15, 16, 17], Stand: [18, 19, 20], Double: [18] },
  4: { Hit: [13, 14, 15, 16], Stand: [18, 19, 20], Double: [17, 18] },
  5: { Hit: [13, 14, 15, 16], Stand: [19, 20], Double: [17, 18] },
  6: { Hit: [13, 14, 15, 16], Stand: [19, 20], Double: [17, 18] },
  7: { Hit: [13, 14, 15, 16, 17], Stand: [19, 20], Double: [18] },
  8: { Hit: [13, 14, 15, 16, 17], Stand: [18, 19, 20], Double: [] },
  9: { Hit: [13, 14, 15, 16, 17, 18], Stand: [19, 20], Double: [] },
  10: { Hit: [13, 14, 15, 16, 17, 18], Stand: [19, 20], Double: [] },
  11: { Hit: [13, 14, 15, 16, 17, 18], Stand: [19, 20], Double: [] },
};
