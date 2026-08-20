import { translateCityName } from "./translateCityName";

export const createOriginCities = (tours) => {
  const originSet = new Set();

  return tours
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
    .filter(Boolean);
};

export const createDestinationCities = (tours) => {
  const destinationSet = new Set();

  return tours
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
    .filter(Boolean);
};