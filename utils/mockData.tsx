//Mock data to be used in the unit tests

export const exampleTimes = [
  '00:00', '01:00', '02:00',
  '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00',
  '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00'
]

export const exampleSchedule = [
  { airtime: "07:00", id: 1 },
  { airtime: "09:00", id: 2 },
  { airtime: "09:30", id: 3 },
  { airtime: "10:00", id: 4 },
  { airtime: "10:45", id: 5 },
  { airtime: "10:30", id: 6 },
  { airtime: "11:30", id: 7 },
  { airtime: "11:00", id: 8 },
  { airtime: "11:15", id: 9 },
  { airtime: "11:30", id: 10 },
  { airtime: "13:15", id: 11 },
  { airtime: "14:00", id: 12 },
  { airtime: "14:45", id: 13 },
  { airtime: "14:30", id: 14 },
  { airtime: "06:00", id: 15 },
];

export const exampleGuideObj = {
  '07:00': [{ airtime: "07:00", id: 1 }],
  '09:00': [{ airtime: "09:00", id: 2 }, { airtime: "09:30", id: 3 }],
  '10:00': [{ airtime: "10:00", id: 4 }, { airtime: "10:45", id: 5 }, { airtime: "10:30", id: 6 }],
  '11:00': [{ airtime: "11:30", id: 7 }, { airtime: "11:00", id: 8 }, { airtime: "11:15", id: 9 }, { airtime: "11:30", id: 10 },],
  '13:00': [{ airtime: "13:15", id: 11 }],
  '14:00': [{ airtime: "14:00", id: 12 }, { airtime: "14:45", id: 13 }, { airtime: "14:30", id: 14 },],
  '06:00': [{ airtime: "06:00", id: 15 }],
}

export const exampleGuide = [
  { time: '07:00', shows: [{ airtime: "07:00", id: 1 }] },
  { time: '09:00', shows: [{ airtime: "09:00", id: 2 }, { airtime: "09:30", id: 3 }] },
  { time: '10:00', shows: [{ airtime: "10:00", id: 4 }, { airtime: "10:45", id: 5 }, { airtime: "10:30", id: 6 }] },
  { time: '11:00', shows: [{ airtime: "11:30", id: 7 }, { airtime: "11:00", id: 8 }, { airtime: "11:15", id: 9 }, { airtime: "11:30", id: 10 }] },
  { time: '13:00', shows: [{ airtime: "13:15", id: 11 }] },
  { time: '14:00', shows: [{ airtime: "14:00", id: 12 }, { airtime: "14:45", id: 13 }, { airtime: "14:30", id: 14 },] },
  { time: '06:00', shows: [{ airtime: "06:00", id: 15 }] }
]

export const exampleSortedGuide = [
  { time: '06:00', shows: [{ airtime: "06:00", id: 15 }] },
  { time: '07:00', shows: [{ airtime: "07:00", id: 1 }] },
  { time: '09:00', shows: [{ airtime: "09:00", id: 2 }, { airtime: "09:30", id: 3 }] },
  { time: '10:00', shows: [{ airtime: "10:00", id: 4 }, { airtime: "10:30", id: 6 }, { airtime: "10:45", id: 5 }] },
  { time: '11:00', shows: [{ airtime: "11:00", id: 8 }, { airtime: "11:15", id: 9 }, { airtime: "11:30", id: 7 }, { airtime: "11:30", id: 10 },] },
  { time: '13:00', shows: [{ airtime: "13:15", id: 11 }] },
  { time: '14:00', shows: [{ airtime: "14:00", id: 12 }, { airtime: "14:30", id: 14 }, { airtime: "14:45", id: 13 }] }
]

export const exampleDuplicateSchedule = [
  { show: { id: 1 } },
  { show: { id: 2 } },
  { show: { id: 4 } },
  { show: { id: 4 } },
  { show: { id: 5 } },
  { show: { id: 6 } },
  { show: { id: 6 } },
  { show: { id: 8 } },
  { show: { id: 9 } },
  { show: { id: 10 } },
  { show: { id: 12 } },
  { show: { id: 12 } },
  { show: { id: 13 } },
  { show: { id: 13 } },
  { show: { id: 14 } },
];

export const exampleDuplicatesRemoved = [
  { id: 1 },
  { id: 2 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
];