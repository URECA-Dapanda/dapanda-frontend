import mixpanel from "mixpanel-browser";

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? "";

export let isInitialized = false;

export const initMixpanel = () => {
  if (!token) return;
  if (isInitialized) return;

  mixpanel.init(token, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: false,
    persistence: "localStorage",
  });

  isInitialized = true;
};

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (!isInitialized) {
    console.warn("❗️Mixpanel is not initialized yet. Event skipped:", eventName);
    return;
  }

  mixpanel.track(eventName, properties);
};

