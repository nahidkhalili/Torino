import MainPage from "../../components/templates/MainPage";

import "./globals.css";
import { serverFetch } from "../../services/http";

export default async function Home({ searchParams }) {
  const allTours = await serverFetch(
    "tour",
    {},
    {
      cache: "no-store",
    },
  );

  const filteredTours = await serverFetch("tour", searchParams, {
    cache: "no-store",
  });
  console.log("TOURS LENGTH:", allTours?.length);
  console.log("TOURS:", allTours);
  return (
    <>
      <MainPage tours={filteredTours} allTours={allTours} />
    </>
  );
}
