import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Info, Truck, Eye } from "lucide-react";

export function ParcelDetailsModal({ parcel }: { parcel: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "REQUESTED":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
         <Eye/>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          sm:max-w-[600px] max-h-[85vh] overflow-y-auto rounded-2xl
          backdrop-blur-md border border-border shadow-lg
          scrollbar-hide
        "
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* Header */}
        <DialogHeader className="space-y-2 text-center pb-2">
          <DialogTitle className="text-2xl font-bold flex justify-center items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Parcel Details
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Tracking ID:{" "}
            <span className="font-medium text-foreground">
              {parcel.trackingId}
            </span>
          </DialogDescription>
          <Badge
            className={`mt-2 px-3 py-1 text-sm font-semibold ${getStatusColor(
              parcel.currentStatus
            )}`}
          >
            {parcel.currentStatus}
          </Badge>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6 pt-2 pb-4">
          {/* --- BASIC INFO --- */}
          <section className="bg-muted/40 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-base uppercase tracking-wide">
                Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium text-foreground">{parcel.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium text-foreground">{parcel.weight} g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fee</p>
                <p className="font-medium text-foreground">৳ {parcel.fee}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blocked</p>
                <p className="font-medium text-foreground">
                  {parcel.isBlock ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </section>

          {/* --- ADDRESS INFO --- */}
          <section className="bg-muted/40 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-base uppercase tracking-wide">
                Address Information
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Pickup Address</p>
                <p className="font-medium text-foreground break-words">
                  {parcel.pickupAddress}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Delivery Address
                </p>
                <p className="font-medium text-foreground break-words">
                  {parcel.deliveryAddress}
                </p>
              </div>
            </div>
          </section>

          {/* --- OTHER DETAILS --- */}
          <section className="bg-muted/40 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-base uppercase tracking-wide">
                Additional Details
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Details</p>
                <p className="font-medium text-foreground break-words leading-relaxed">
                  {parcel.details}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivery Date</p>
                <p className="font-medium text-foreground">
                  {new Date(parcel.deliveryDate).toLocaleString()}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <Separator />
        <DialogFooter className="pt-3 flex justify-center">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto transition-all duration-200 hover:scale-[1.02]"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
