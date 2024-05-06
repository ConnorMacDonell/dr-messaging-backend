export interface PutMountainDto {
  name: string;
  description: string;
  rating: number; //rating between 1-10
  lat: number; //latitude
  long: number; //longitude
  photos: string[]; //array of src strings for images
}