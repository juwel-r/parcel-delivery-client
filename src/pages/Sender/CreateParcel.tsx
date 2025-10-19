import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { useGetReceiversQuery } from "@/redux/features/user/userApi";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { createParcelSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcelApi";
import { calculateParcelFee } from "@/utils/calculateParcelFee";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function CreateParcel() {
  const { data: receivers, isLoading: isLoadingReceivers } =
    useGetReceiversQuery();
  const [createParcel, { isLoading }] = useCreateParcelMutation();
  const [fee, setFee] = useState("");

  const form = useForm<z.infer<typeof createParcelSchema>>({
    resolver: zodResolver(createParcelSchema),
    defaultValues: {
      receiver: "",
      type: "",
      weight: "",
      fee: "",
      pickupAddress: "",
      deliveryAddress: "",
      deliveryDate: new Date(),
      details: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof createParcelSchema>) => {
    if (Number(value.weight) < 0) {
      form.setError("weight", {
        type: "min",
        message: "Weight must be a positive number",
      });
    }

    try {
      const parcelData = {
        ...value,
        weight: Number(value.weight),
        fee: Number(value.fee),
        deliveryDate: formatISO(value.deliveryDate),
      };

      const res = await createParcel(parcelData).unwrap();
      form.reset();
      form.setValue("receiver", "");
      form.setValue("type", "");
      setFee("");
      console.log(res);
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);

      const errorMessage =
        error?.data?.message?.errorSources?.[0]?.message ||
        error?.message ||
        "Something went wrong!";

      toast.error(errorMessage);
    }
  };

  const calculateFee = (weight: string) => {
    setFee("");
    const fee = calculateParcelFee(weight);
    setFee(String(fee!));
  };

  return (
    <Card className="w-full mx-auto max-w-4xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create A Parcel</CardTitle>
        <CardDescription>
          Enter your parcel details for send to destination.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="create-parcel"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="md:flex gap-6 space-y-6 md:space-y-0">
              <FormField
                control={form.control}
                name="receiver"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Receiver Name</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                      disabled={isLoadingReceivers}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Division" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {!isLoadingReceivers && receivers?.length && receivers?.map(
                          (item: { _id: string; name: string }) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Parcel Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoadingReceivers}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Parcel Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Parcel">Parcel</SelectItem>
                        <SelectItem value="Document">Document</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:flex gap-6 space-y-6 md:space-y-0">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Parcel Weight <p className="h-6"></p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Weight"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value); // update RHF state
                          calculateFee(value); // update fee
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex gap-2">
                      <FormLabel>Parcel Fee (BDT)</FormLabel>
                      <Tooltip>
                        <TooltipTrigger type="button">
                          <Info className="w-4 text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div>
                            <strong>Fee Calculation:</strong>
                            <ul>
                              <li>Up to 0.5 kg: 120</li>
                              <li>From 0.5 kg to 1 kg: 150</li>
                              <li>
                                Above 1 kg: 150 plus 15 for each kilogram over 1
                              </li>
                            </ul>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Fee"
                        type="number"
                        {...field}
                        value={fee}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:flex gap-6 space-y-6 md:space-y-0">
              <FormField
                control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Pickup Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Pickup Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Delivery Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Estimate Delivery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="w-full h32">
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-32"
                      placeholder="Parcel Details..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          disabled={isLoading}
          form="create-parcel"
          type="submit"
          className="w-1/4 ml-auto"
        >
          Submit {isLoading && <Spinner className="size-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
