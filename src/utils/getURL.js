export function getBaseUrl() {
  return window.location.pathname.includes("~scarhatt")
    ? "/~scarhatt/"
    : import.meta.env.BASE_URL || "/";
}
