import moment from "moment/moment.js";

export function formatFromNow(props) {
  return moment(props).fromNow();
}

export function formatDate(props) {
  return moment(props).format("DD.MM.YYYY");
}
