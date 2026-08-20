const cityMap = {
  Tehran: "تهران",
  Isfahan: "اصفهان",
  Shiraz: "شیراز",
  Mashhad: "مشهد",
  Tabriz: "تبریز",
  Sanandaj: "سنندج",
  Madrid: "مادرید",
  sulaymaniyahTour: "سلیمانیه",
  Hewler: "هولر",
  Mazandaran: "مازندران",
  "OffRoad Center": "تور آفرود",
  Italy: "ایتالیا",
  Sulaymaniyah: "سلیمانیه",
  Italy: "ایتالیا",
  Kish: "کیش",
  Cappadocia: "کاپادوکیه",
  Dubai: "دوبی",
  Paris: "پاریس",
  Yazd: "یزد",
  Rome: "رم",
};

export const translateCityName = (cityName) => {
  return cityMap[cityName] || cityName;
};
