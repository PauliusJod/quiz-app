"use client";
import React from "react";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import { Platform, View } from "react-native";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { MonoText } from "@/components/[default_components]/StyledText";

const dividerStyle = tva({
  base: "bg-background-200",
  variants: {
    orientation: {
      vertical: "w-px h-full",
      horizontal: "h-px w-full",
    },
  },
});

type typeText = {
  label: string;
};
type IUIDividerProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof dividerStyle> & typeText;
const Divider = React.forwardRef<React.ComponentRef<typeof View>, IUIDividerProps>(function Divider({ className, orientation = "horizontal", label, ...props }, ref) {
  return (
    <View
      className='flex-row items-center w-full'
      aria-orientation={orientation}
      role={Platform.OS === "web" ? "separator" : undefined}
      ref={ref}>
      <View
        className={dividerStyle({
          orientation,
          class: "flex-1",
        })}
      />
      <MonoText className='px-3 text-lg text-foreground-500'>{label}</MonoText>
      <View
        className={dividerStyle({
          orientation,
          class: "flex-1",
        })}
      />
    </View>
  );
});

Divider.displayName = "Divider";

export { Divider };

// <View
//   ref={ref}
//   {...props}
//   aria-orientation={orientation}
//   role={Platform.OS === "web" ? "separator" : undefined}
//   className={dividerStyle({
//     orientation,
//     class: className,
//   })}
// />
