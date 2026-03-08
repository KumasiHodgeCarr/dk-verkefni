# Conflict Lens

Verkefni sem greinir bandarískar árasir
gegnum Reddit umræður og gervigreind.

Hýst á: [vercel.usainnsyni](https://vercel.usainnsyni.vercel.app)

## Tækni

- **Next.js 16** — App Router, Server Components, ISR
- **TypeScript** — Fullur týpuöryggur
- **Tailwind CSS + shadcn/ui** — Þema og UI
- **Recharts** — Gagnvirki
- **Reddit API** — Rauntíma gögn með 5 mín cache
- **SHADCN** - Útlit

## Uppbygging

```
app/
  page.tsx           → Forsíða með Reddit færslur
  post/[slug]/       → Færslusíða með endurkvæmt athugasemdatré
  innsyni/           → AI greining með kort og gröf
components/
  insights/          → Gröf og heimskort (settu músina yfir)
  posts/             → PostCard, PostStats
  comments/          → Endurkvæmt CommentNode
lib/
  reddit.ts          → Reddit API fetch með cache
  mock-insights.ts   → Gögn fyrir greiningarsíðu
  brand-colors.ts    → Litapaletta — ein uppspretta
```

## Keyrsla

```bash
npm install
npm run dev
```

---

Þakka ykkurfyrir skemmtilegt og spennandi verkefni DK! 🙏
