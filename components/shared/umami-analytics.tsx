"use client";

import { useEffect } from "react";

const PROD_HOSTNAME = "zentaichi.me";
const SCRIPT_SRC = "https://cloud.umami.is/script.js";
const WEBSITE_ID = "744bdfc7-0f49-4ef3-9032-27fd57ab37ab";

export function UmamiAnalytics() {
  useEffect(() => {
    if (window.location.hostname !== PROD_HOSTNAME) return;

    const script = document.createElement("script");
    script.defer = true;
    script.src = SCRIPT_SRC;
    script.setAttribute("data-website-id", WEBSITE_ID);
    document.head.appendChild(script);
  }, []);

  return null;
}
