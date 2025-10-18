import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IParcel } from "@/types";
import { useUpdateStatusMutation } from "@/redux/features/parcel/parcelApi";
import type z from "zod";
import { updateStatusSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { DialogDescription } from "@radix-ui/react-dialog";

interface IProps {
  item: IParcel;
}

export function UpdateStatusModal({ item }: IProps) {
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();

  const statuses = [
    "REQUESTED",
    "APPROVED",
    "DISPATCHED",
    "IN_TRANSIT",
    "DELIVERED",
  ];

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof updateStatusSchema>>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: { status: "", location: "", notes: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {


    try {
      const result = await updateStatus({  parcelId: item._id,  data,}).unwrap();

      toast.success(result.message);
      form.reset();
      setIsOpen(false);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="text-xs">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Parcel Status</DialogTitle>
          <DialogDescription><span className="font-thin text-muted-foreground">{item.type} of </span> {(item.sender as { name: string }).name}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="add-tour-type" className="space-y-5 mt-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Updatable Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Dynamically show next status to update */}
                      {statuses.map(
                        (status) =>
                          status === item.currentStatus && (
                            <SelectItem
                              value={statuses[statuses.indexOf(status) + 1]}
                            >
                              {statuses[statuses.indexOf(status) + 1]}
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Location" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes <span className="text-xs text-muted-foreground font-normal">(Optional)</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Notes..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="add-tour-type" type="submit" disabled={isLoading}>
            {isLoading && <Spinner />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
