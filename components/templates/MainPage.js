import Image from "next/image";
import styles from "./MainPage.module.css";
import Tours from "../organisms/Tours";
import SearchTicket from "../molecules/SearchTourComponents/SearchTicket";
import CallPurchasing from "../molecules/CallPurchasing";
import WhyTorino from "../molecules/WhyTorino";
import TorinoServices from "../molecules/TorinoServices";
import {
  createDestinationCities,
  createOriginCities,
} from "../../utils/createCityList";

const MainPage = async ({ tours, allTours }) => {
  const originCities = createOriginCities(allTours);
  const destinationCities = createDestinationCities(allTours);
  console.log("MAIN allTours:", allTours?.length);
  console.log("MAIN tours:", tours?.length);

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
