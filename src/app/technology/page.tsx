import { redirect } from "next/navigation";
import { TECH, categoryHref } from "@/lib/technology";

/** Technology entry point: the first category's overview. */
export default function TechnologyIndex() {
  redirect(categoryHref(TECH[0]));
}
