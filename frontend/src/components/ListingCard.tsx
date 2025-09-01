// src/components/ListingCard.tsx
import { Button } from "./ui/button";

type ListingCardProps = {
  title: string;
  location: string;
  price: string;
  imageUrl: string;
  onView?: () => void;
};

export default function ListingCard({
  title,
  location,
  price,
  imageUrl,
  onView,
}: ListingCardProps) {
  return (
    <div className="group rounded-xl overflow-hidden border bg-card text-card-foreground shadow transition-shadow duration-200 hover:shadow-md flex flex-col">
      {/* Top image, perfectly flush */}
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <p className="text-muted-foreground">{location}</p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold">{price}</span>
          <Button size="sm" onClick={onView}>View</Button>
        </div>
      </div>
    </div>
  );
}
