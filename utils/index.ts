export function objectToQueryString(
  params: Record<string, string | number | boolean | undefined>
) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      query.append(key, String(value));
    }
  });

  return query.toString();
}
