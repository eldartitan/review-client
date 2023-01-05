import moment from "moment/moment.js";

export function formatDate(props) {
  return moment(props).fromNow();
}
export function average(arr) {
  if (arr) return arr?.reduce((p, c) => p + c, 0) / arr?.length;
}
