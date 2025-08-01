export function useTopSheetImageStyle(expanded: boolean, type: "post" | "wifi") {
  if (type === "post") {
    return expanded
      ? {
          top: 19,
          left: "50%",
          x: "-50%",
          width: 200,
          height: 200,
          rotate: 0,
        }
      : {
          top: 30,
          right: -37,
          width: 240,
          height: 240,
          rotate: 19.66,
          x: 0,
        };
  }

  return {};
}
