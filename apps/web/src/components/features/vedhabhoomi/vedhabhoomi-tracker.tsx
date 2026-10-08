"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/meta-pixel";

export function VedhaBhoomiTracker() {
  useEffect(() => {
    trackEvent("ViewContent", {
      content_name: "Vedha Bhoomi",
      content_category: "Project",
    });
  }, []);

  return null;
}
