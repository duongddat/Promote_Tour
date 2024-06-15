import moment from "moment";

import "moment/locale/vi";

export function formatVietnameseDate(inputDate) {
  return moment(inputDate).locale("vi").format("DD/MM/YYYY HH:mm:ss");
}

export function formatDateDefault(inputDate) {
  return moment(inputDate).locale("vi").format("DD/MM/YYYY");
}
