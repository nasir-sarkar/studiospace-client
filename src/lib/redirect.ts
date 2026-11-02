export const safeRedirect = (value: string | null | undefined) => {
  if (value && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/";
};
