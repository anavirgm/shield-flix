# ShieldFlix

> Plataforma web de streaming híbrida profesional, minimalista y cinematográfica. Desarrollada como pieza central de un **portafolio de ingeniería de software de nivel senior**.

## 1. Visión General

**ShieldFlix** es una aplicación web que combina catálogo de **TMDB**, reproducción con **vidsrc.to** (película completa) y **YouTube** (tráiler), autenticación con **Supabase**, favoritos, historial con reanudación ("Continuar Viendo") y un **Admin Dashboard** en tiempo real.

**Stack principal:**
- **Frontend:** [Next.js 15+](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/) (strict)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + glassmorphism + paleta oscura cinematográfica
- **Backend/DB:** [Supabase](https://supabase.com/) (Auth + PostgreSQL + RLS + Realtime)
- **APIs:** [TMDB API](https://developer.themoviedb.org/) (metadatos, búsqueda, géneros, videos)
- **Reproductores:** [vidsrc.to](https://vidsrc.to/) (embed película completa) + [YouTube](https://www.youtube.com/) (trailer)

## 2. Características Clave

- 🎬 **Catálogo TMDB**: Trending, Popular, Top Rated, por géneros, búsqueda con debounce
- 🖼️ **Hero dinámico + carruseles** tipo Netflix/Disney+/HBO Max
- ♾️ **Infinite Scroll Grid** para exploración masiva
- 🎥 **Multi-servidor**: selector dinámico (vidsrc.to principal + YouTube trailer + fuentes admin)
- ⏯️ **Reanudación inteligente**: guarda posición con throttle, rail "Continuar Viendo"
- ❤️ **Favoritos** con optimistic UI
- 🔐 **Auth Supabase**: email/password + magic link, guards server-side
- 🛡️ **RLS estricto**: lectura pública catálogo/fuentes activas; escritura propia (favoritos/historial); CRUD admin exclusivo
- 👑 **Admin Dashboard**: CRUD películas/fuentes + Realtime
- ⚡ **Rendimiento**: SSR/ISR, skeletons, lazy loading player
- 🎨 **UI "Showstopper"**: dark cinematic, glassmorphism, microinteracciones fluidas

## 3. Documentación

| Documento | Descripción |
|---|---|
| [`supabase/schema.sql`](./supabase/schema.sql) | Esquema completo, RLS, índices, triggers, seeds. Listo para pegar en Supabase SQL Editor. |
| [`docs/ROADMAP.md`](./docs/ROADMAP.md) | 4 Sprints con Issues detallados, estrategia Git/commits semánticos, DoD, checklist. |
| [`docs/ENGINEERING_GUIDE.md`](./docs/ENGINEERING_GUIDE.md) | Seguridad web (XSS/SQLi/CSP), SOLID, Server/Client, SSR/ISR, CI, checklist calidad. |

## 4. Arquitectura (resumen)

```text
Frontend (Next.js App Router, Vercel)
  ├─ Server Components: TMDB fetch, SSR/ISR, SEO
  ├─ Client Components: sliders, player, forms, realtime
  ├─ Server Actions: favoritos, watch-history, admin CRUD
  └─ Rutas protegidas: /account, /favorites, /admin (role=admin)

Backend/DB (Supabase)
  ├─ Auth (email+magic link)
  ├─ PostgreSQL + RLS (deny by default)
  ├─ Realtime (Postgres Changes) para admin
  └─ Triggers: auto-profile, updated_at, role protection
```

**Componentes clave:** `<MovieCard/>`, `<MovieSlider/>`, `<VideoPlayer/>`, `<ServerSelector/>`, `<InfiniteScrollGrid/>`, `<AdminTable/>`.

## 5. Configuración Rápida

### 5.1 Clonar repositorio
```bash
git clone <repo-url>
cd shield-flix
```

### 5.2 Instalar dependencias
```bash
pnpm install
# o npm install / yarn install
```

### 5.3 Variables de entorno
Crear `.env.local` (no commitear). Copiar estructura desde intención:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# TMDB
TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
```

> `SUPABASE_SERVICE_ROLE_KEY` y `TMDB_API_KEY` **solo** uso servidor. Nunca exponer con `NEXT_PUBLIC_*`.

### 5.4 Base de datos
1. Abrir [Supabase Dashboard](https://app.supabase.com/) → Proyecto → SQL Editor
2. Copiar y ejecutar **completo** `supabase/schema.sql`
3. Promocionar admin: ver sección 10.1 del SQL (usar UUID desde Auth > Users)

### 5.5 Desarrollo local
```bash
pnpm dev
# http://localhost:3000
```

### 5.6 Verificaciones
```bash
pnpm lint
pnpm typecheck  # tsc --noEmit
pnpm build
```

## 6. Roadmap (estado)

| Sprint | Enfoque | Estado |
|---|---|---|
| **Sprint 1** | Core Architecture & Database Setup | ⏳ Pendiente |
| **Sprint 2** | TMDB Catalog, Search & Infinite Scroll | ⏳ Pendiente |
| **Sprint 3** | Multi-Server Player (vidsrc.to + YouTube), Auth & Watch History | ⏳ Pendiente |
| **Sprint 4** | Admin Dashboard & Security Hardening | ⏳ Pendiente |

Ver detalle completo en [`docs/ROADMAP.md`](./docs/ROADMAP.md).

## 7. Seguridad & Buenas Prácticas

- **RLS por defecto:** todas las tablas con políticas estrictas.
- **Guards server-side:** validación en layouts/pages + middleware + `is_admin()`.
- **CSP + headers:** configurados para permitir embeds requeridos (YouTube + vidsrc.to/vidsrc.xyz).
- **Sin secretos cliente:** `SERVICE_ROLE_KEY`/`TMDB_API_KEY` server-only.
- **Type-safe:** tipado estricto + Zod runtime validation.
- **Commits semánticos:** trazabilidad impecable (Conventional Commits).

## 8. Créditos

- [TMDB](https://www.themoviedb.org/) — metadatos cinematográficos
- [vidsrc.to](https://vidsrc.to/) — embed para reproducción híbrida
- [Supabase](https://supabase.com/) — plataforma backend moderna
- [Next.js](https://nextjs.org/) — framework React fullstack

## 9. Licencia

Proyecto con fines educativos y demostrativos (portafolio). Revisar términos de uso de APIs externas al desplegar.

**Desarrollado con enfoque senior: arquitectura limpia, UX cinematográfica, seguridad por diseño.**
