import moment from "moment";

import "moment/locale/vi";

export function formatVietnameseDate(inputDate) {
  return moment(inputDate).locale("vi").format("DD/MM/YYYY HH:mm:ss");
}

export function formatDateDefault(inputDate) {
  return moment(inputDate).locale("vi").format("DD/MM/YYYY");
}

export function formantDateNoti(inputDate) {
  const now = moment();
  const inputMoment = moment(inputDate).locale("vi");

  const diffDays = now.diff(inputMoment, "days");

  if (diffDays === 0) {
    return "Hôm nay";
  } else if (diffDays === 1) {
    return "Hôm qua";
  } else if (diffDays <= 7) {
    return `${diffDays - 1} ngày trước`;
  } else {
    return inputMoment.format("DD/MM");
  }
}
