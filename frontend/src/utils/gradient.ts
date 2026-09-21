// 같은 시드는 항상 같은 색
function hashSeed(seed: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 16;
  h = Math.imul(h, 2246822507);
  h ^= h >>> 13;
  h = Math.imul(h, 3266489909);
  h ^= h >>> 16;
  return h >>> 0;
}

export type ProfileColors = {
  cover: string;
  avatar: string;
};

export function profileColors(seed: string | number): ProfileColors {
  const h = hashSeed(String(seed));

  const h1 = h % 360;
  const h2 = (Math.floor(h / 360) % 360);
  const h3 = (Math.floor(h / 129600) % 360);
  const angle = Math.floor(h / 7) % 360;

  const cover = `linear-gradient(${angle}deg, hsl(${h1} 85% 76%) 0%, hsl(${h2} 78% 70%) 50%, hsl(${h3} 80% 58%) 100%)`;
  const avatar = `linear-gradient(160deg, hsl(${h1} 48% 58%) 0%, hsl(${h3} 50% 46%) 100%)`;

  return { cover, avatar };
}
