import mixpanel from "mixpanel-browser";

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? "";

export const initMixpanel = () => {
  if (!token) return;
  mixpanel.init(token, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: true,
    persistence: "localStorage",
  });
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    mixpanel.track(eventName, properties);
  };

export default mixpanel;
