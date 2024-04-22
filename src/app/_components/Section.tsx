import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const Section = (
  props: PropsWithChildren<{
    className?: string;
    isLargeScreen?: boolean | undefined;
  }>
) => {
  return (
    <section className={cn("m-auto max-w-[1200px] px-4", props.className)}>
      {props.children}
    </section>
  );
};
