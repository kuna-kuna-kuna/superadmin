export default function formatDate(inputDate) {
  const dateParts = inputDate.split(/[-T:.]/);
  const year = dateParts[0].substr(-2);
  const month = getMonthAbbreviation(parseInt(dateParts[1]));
  const day = String(parseInt(dateParts[2])).padStart(2, "0");
  const hours = String(parseInt(dateParts[3])).padStart(2, "0");
  const minutes = String(parseInt(dateParts[4])).padStart(2, "0");
  return ` ${day}-${month}-${year} ${hours}:${minutes}`;
}

function getMonthAbbreviation(monthNumber) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthNumber - 1] || "";
}
