export function compareDates(d1: any, d2: any) {
  return new Date(d1.toString().slice(0, 10)).getTime() === new Date(d2.toString().slice(0, 10)).getTime();
}