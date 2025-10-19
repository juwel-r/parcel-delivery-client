interface IItem {
  value: string;
  label: string;
}

export interface IPropsNativeSelect {
  items: IItem[];
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo({ items }: IPropsNativeSelect) {
  const handleOnChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <Select onValueChange={(v)=>handleOnChange(v)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Types</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
