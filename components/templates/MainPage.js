import Image from "next/image";
import styles from "./MainPage.module.css";
import Tours from "../organisms/Tours";
import SearchTicket from "../molecules/SearchTourComponents/SearchTicket";
import CallPurchasing from "../molecules/CallPurchasing";
import WhyTorino from "../molecules/WhyTorino";
import TorinoServices from "../molecules/TorinoServices";
import { translateCityName } from "../../utils/translateCityName";

const MainPage = async ({ tours }) => {
  const originSet = new Set();
  const destinationSet = new Set();

  const originCities = tours
    .map((tour) => {
      if (!originSet.has(tour.origin.id)) {
        originSet.add(tour.origin.id);
        return {
          value: tour.origin.id,
          label: translateCityName(tour.origin.name),
        };
      }
      return null;
    })
    .filter((city) => city !== null);

  const destinationCities = tours
    .map((tour) => {
      if (!destinationSet.has(tour.destination.id)) {
        destinationSet.add(tour.destination.id);
        return {
          value: tour.destination.id,
          label: translateCityName(tour.destination.name),
        };
      }
      return null;
    })
    .filter((city) => city !== null);

  return (
    <div className={styles.totalPage}>
      <Image
        className={styles.image}
        src="/images/cover.png"
        width={1440}
        height={350}
        alt="cover page"
      />
      <div className={styles.container}>
        <h1 className={styles.torino}>
          <span>تورینو </span>برگزار کننده بهترین تور های داخلی و خارجی
        </h1>

        <SearchTicket
          destinationCities={destinationCities}
          originCities={originCities}
        />

        <Tours tours={tours} />
        <CallPurchasing />
        <WhyTorino />
      </div>
      <TorinoServices />
    </div>
  );
};

export default MainPage;
