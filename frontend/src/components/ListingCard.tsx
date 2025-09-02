import { Button } from "./ui/button";
import { IoIosBed } from "react-icons/io";
import { BsRulers } from "react-icons/bs";
import { MdBalcony } from "react-icons/md";

type ListingCardProps = {
  title: string;
  location: string;
  price: string;
  imageUrl: string;
  bedrooms?: number;
  sqm?: number;
  balcony?: boolean;
  onView?: () => void;
};

export default function ListingCard({
  title,
  location,
  price,
  imageUrl,
  bedrooms,
  sqm,
  balcony,
  onView,
}: ListingCardProps) {
  return (
    <div className="group rounded-xl overflow-hidden border bg-card text-card-foreground shadow transition-shadow duration-200 hover:shadow-md flex flex-col">
      {/* Top image */}
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <p className="text-muted-foreground">{location}</p>
        </div>

        {/* Extra details */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {bedrooms !== undefined && (
            <div className="flex items-center gap-1">
              <IoIosBed className="text-gray-600" />
              <span>{bedrooms}</span>
            </div>
          )}
          {sqm !== undefined && (
            <div className="flex items-center gap-1">
              <BsRulers className="text-gray-600" />
              <span>{sqm}m²</span>
            </div>
          )}
          {balcony !== undefined && (
            <div className="flex items-center gap-1">
              <MdBalcony className="text-gray-600" />
              <span>{balcony ? "Yes" : "No"}</span>
            </div>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold">{price}</span>
          <Button size="sm" onClick={onView}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
}
