import { redirect } from "next/navigation";
import { FIRST_TOPIC_WITH_PAGE, topicHref } from "@/lib/technology";

/** No category index page is designed yet — the representative topic page is the Technology entry point. */
export default function TechnologyIndex() {
  redirect(topicHref(FIRST_TOPIC_WITH_PAGE));
}
