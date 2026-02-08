# prisma-nextjs

Este archivo resume, en formato más directo, cómo recreé el Job Board siguiendo el tutorial de **machadop1407** y qué comandos usé para publicarlo en mi propio repositorio.

## Contexto
- Repo y video base: <https://github.com/machadop1407/job-posting-website/>
- El objetivo fue practicar Next.js 15 + Prisma + PostgreSQL replicando las pantallas: Home, Jobs, Jobs/[id], Jobs/Post y Dashboard.
- Se agregó autenticación con NextAuth (GitHub) y base de datos Postgres (Neon/Supabase).

## Stack y dependencias principales
- Next.js 15 (App Router, Server/Client Components, Turbopack)
- Prisma ORM 7 + @prisma/adapter-pg + pg
- NextAuth v5 beta + @auth/prisma-adapter
- TailwindCSS 4 + @tailwindcss/forms
- date-fns para formatear fechas
- TypeScript 5, ESLint 9

## Setup rápido
```bash
npm install

# Variables en .env.local
database_url="postgresql://USER:PASSWORD@HOST/DB"
auth_github_id="..."
auth_github_secret="..."
auth_secret="..."

# Prisma	npx prisma migrate dev
npx prisma generate

npm run dev
```
Visitar <http://localhost:3000>.

> `/dashboard` y otras páginas server declaran `export const runtime = "nodejs"` para evitar el error del runtime Edge con el módulo `crypto`. El middleware (auth) quedó desactivado temporalmente para no disparar Prisma desde Edge.

## Comandos Git solicitados
```bash
echo "# prisma-nextjs" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Francisrjs/prisma-nextjs.git
git push -u origin main
```
Si ya existía un remoto previo (el repo original), se corrigió con:
```bash
git remote set-url origin https://github.com/Francisrjs/prisma-nextjs.git
```

## Notas finales
- Todas las vistas y flujos siguen el tutorial de Machado; este README2 es solo un resumen propio para recordar cómo levantar el proyecto y qué comandos ejecutar.
- Para más detalles (pantallas, features, etc.) revisar el README principal o el repo original.
