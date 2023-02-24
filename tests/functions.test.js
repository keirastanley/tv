const functions = require('../utils/functions');
const mockData = require('../utils/mockData');

describe("compareDates correctly determines equality between 2 date objects", () => {
  it("Two new date objects return true", () => {
    expect(functions.compareDates(new Date(), new Date())).toEqual(true);
  });

  it("Two different date objects return false", () => {
    expect(functions.compareDates(new Date(), new Date('2023-02-01'))).toEqual(false);
  });
});

describe("getTimes", () => {
  it("Returns an array of times in HH:MM format, one for every hour", () => {
    expect(functions.getTimes()).toEqual(mockData.exampleTimes);
  });
});

describe("createGuideObj", () => {
  it("Correctly reformats the schedule array into an object with the show's times as the properties and the correct schedule objects as the values", () => {
    expect(functions.createGuideObj(mockData.exampleSchedule, mockData.exampleTimes)).toStrictEqual(mockData.exampleGuideObj);
  });
});

describe("createGuide and sortGuideByTime", () => {
  it("sortGuideByTime takes in a guide array and returns it sorted by airtime", () => {
    expect(functions.sortGuideByTime(mockData.exampleGuide)).toEqual(mockData.exampleSortedGuide);
  });
  it("createGuide returns a guide array with the shows array sorted by airtime", () => {
    expect(functions.createGuide(mockData.exampleSchedule)).toEqual(mockData.exampleSortedGuide);
  });
});

describe("getCurrentTimeString", () => {
  it("Returns the time as a string formatted as MM:HH", () => {
    const time = new Date("1995-01-14T03:24:00");
    expect(functions.getCurrentTimeString(time)).toEqual('03:24');
  })
})

describe("getIndex", () => {
  it("Returns the index of the guide array that corresponds with a given hour", () => {
    const time9am = functions.getCurrentTimeString(new Date("2023-01-14T09:24:00"));
    const time10am = functions.getCurrentTimeString(new Date("2023-01-14T10:44:00"));
    const time1pm = functions.getCurrentTimeString(new Date("2023-01-14T13:03:00"));
    expect(functions.getIndex(time9am, mockData.exampleSortedGuide)).toEqual(2);
    expect(functions.getIndex(time10am, mockData.exampleSortedGuide)).toEqual(3);
    expect(functions.getIndex(time1pm, mockData.exampleSortedGuide)).toEqual(5);
  });
  it("Returns the nearest index if exact time doesn't exist in the array", () => {
    const time12pm = functions.getCurrentTimeString(new Date("2023-01-14T12:00:00"));
    expect(functions.getIndex(time12pm, mockData.exampleSortedGuide)).toEqual(5);
  });
});

describe("getHomepageIndexes", () => {
  it("Returns the indexes of an array split into quarters", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const indexes = [{ ind1: 0, ind2: 2 }, { ind1: 2, ind2: 4 }, { ind1: 4, ind2: 6 }, { ind1: 6, ind2: 8 }];
    expect(functions.getHomepageIndexes(arr.length)).toEqual(indexes);
  });
  it("Can handle odd numbered array lengths", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const indexes = [{ ind1: 0, ind2: 2 }, { ind1: 2, ind2: 4 }, { ind1: 4, ind2: 6 }, { ind1: 6, ind2: 9 }];
    expect(functions.getHomepageIndexes(arr.length)).toEqual(indexes);
  });
});

describe("removeDuplicateShows", () => {
  it("Returns an array with duplicated shows removed", () => {
    expect(functions.removeDuplicateShows(mockData.exampleDuplicateSchedule)).toEqual(mockData.exampleDuplicatesRemoved);
  });
});