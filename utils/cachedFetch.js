export async function cachedFetch(url, opts = {}) {
  const cache = await caches.open("scryfall-cards-v1");

  // 1. Try cache
  let res = await cache.match(url);
  if (res) return res;

  // 2. Fetch from network (respects abort signal)
  res = await fetch(url, { cache: "force-cache", ...opts });
  if (res.ok) cache.put(url, res.clone()); // save for next time

  return res;
}
