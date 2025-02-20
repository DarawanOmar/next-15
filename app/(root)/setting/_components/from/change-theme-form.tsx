"use client";
import { useTheme } from "next-themes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import light from "@/public/light.svg";
import dark from "@/public/dark.svg";
import { Label } from "@/components/ui/label";

function ChangeTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="my-5">
      <RadioGroup
        onValueChange={(value) => setTheme(value)}
        defaultValue={theme}
        className="flex flex-col sm:flex-row gap-10 justify-end items-end  "
      >
        {themeSelect.map((item, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Label htmlFor={`theme-${index}`} className="cursor-pointer">
              <Image
                src={item.image}
                alt={item.label}
                className="h-24 w-full rounded-md object-cover"
              />
            </Label>
            <RadioGroupItem id={`theme-${index}`} value={item.value} />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default ChangeTheme;

export const themeSelect = [
  {
    value: "light",
    label: "Light",
    image: light,
  },
  {
    value: "dark",
    label: "Dark",
    image: dark,
  },
];
