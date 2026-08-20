const dateConverter = (dateStr) => {
  const monthArray = [
    { id: "۱", value: "فروردین" },
    { id: "۲", value: "اردیبهشت" },
    { id: "۳", value: "خرداد" },
    { id: "۴", value: "تیر" },
    { id: "۵", value: "مرداد" },
    { id: "۶", value: "شهریور" },
    { id: "۷", value: "مهر" },
    { id: "۸", value: "آبان" },
    { id: "۹", value: "آذر" },
    { id: "۱۰", value: "دی" },
    { id: "۱۱", value: "بهمن" },
    { id: "۱۲", value: "اسفند" },
  ];

  const tourDate = new Date(dateStr).toLocaleString("fa-IR");
  // console.log("ddddaaaattttteeee", tourDate);

  const [date, time] = tourDate.split(",");
  const parts = date.split("/");
  const day = parts[2];
  const month = monthArray.find((item) => item.id == parts[1]).value;
  const year = parts[0];

  const shamsiDate = [year, month, day];

  return shamsiDate;
};

export const tourDays = (endDate, startDate) => {
  const second = new Date(endDate);
  const first = new Date(startDate);

  const diffInMs = second - first;
  const differenceInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  return differenceInDays;
};

export default dateConverter;
