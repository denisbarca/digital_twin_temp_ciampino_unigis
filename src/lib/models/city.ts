export type City = {
  name: string;
  coords: CityCoords;
  minCoords: CityCoords;
  maxCoords: CityCoords;
};

type CityCoords = {
  longitude: number;
  latitude: number;
};
