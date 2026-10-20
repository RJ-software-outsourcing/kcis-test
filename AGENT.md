# AGENT.md — 專案通用規則

> 給所有 AI agent（Claude Code 等）的專案說明。`CLAUDE.md` 只是指向本檔。

## ⚠️ 每次任務結束前
**檢查本檔是否需要更新**（新增慣例、目錄結構、指令、踩過的坑）。需要就在同一個 commit 一起更新。

## 專案目的
用日常教材（`test-raw-material/`）產生考前練習題。教材裡的題目通常已附答案、難以重複練習，所以要由教材**重新出題**，而不是照抄既有題目與答案。

## 技術棧
Vite + React 19 + TypeScript + Tailwind CSS v4 + TanStack Router（file-based routing）。

## 指令
- `npm run dev` — 本機開發（網址含 base：`http://localhost:5173/kcis-test/`）
- `npm run build` — `vite build`（同時產生 `src/routeTree.gen.ts`）→ `tsc -b` → 複製 `index.html` 為 `404.html`
- 注意：型別檢查依賴 `routeTree.gen.ts`，所以 build 順序是先 vite 後 tsc。

## 目錄結構
```
src/
  main.tsx              Router 設定（basepath 取自 BASE_URL）
  routes/               TanStack Router 檔案路由（薄薄一層）
    __root.tsx
    index.tsx           "/" 列出所有考試（讀 src/exams/*/meta.ts）
    <slug>.tsx          每個考試一個 route，載入 src/exams/<slug>/ExamPage
  exams/
    types.ts            ExamMeta 型別
    index.ts            以 import.meta.glob 收集所有 meta
    <slug>/
      meta.ts           slug / title / description
      ExamPage.tsx      考試頁面
      README.md         該考試專用規則
test-raw-material/<slug>/   該考試的教材來源（只讀素材）
```
`src/routeTree.gen.ts` 為自動產生檔，需 commit，不要手改。

## 新增考試的步驟
1. `src/exams/<slug>/` 建立 `meta.ts`、`ExamPage.tsx`、`README.md`
2. `src/routes/<slug>.tsx` 用 `createFileRoute('/<slug>')` 指向 `ExamPage`（autoCodeSplitting 會自動動態載入，不要在 root 或 index 靜態 import 考試頁面）
3. 教材放 `test-raw-material/<slug>/`
4. `/` 列表自動出現（來自 `meta.ts`），不需另外註冊
5. 先讀該考試的 README.md 再動工

## 規則
- **動態載入**：每個考試頁面必須是獨立 chunk，`/` 只能載入 `meta.ts`。
- **個別考試規則**寫在 `src/exams/<slug>/README.md`，通用規則才寫在本檔。
- **教材**（`test-raw-material/`）視為唯讀來源，不修改、不在網站上直接曝露既有答案。
- 語言：介面與題目以繁體中文為主，程式碼識別字用英文。
- 樣式只用 Tailwind utility classes。

## 部署
- GitHub Pages，base path `/kcis-test/`（`vite.config.ts` 的 `base`）。
- 由 `.github/workflows/deploy.yml` 在 push 到 `main` 時自動 build 並部署。
- SPA fallback：build 時複製 `index.html` → `404.html`，讓直接開子路由（如 `/kcis-test/formative-test-3`）可用。
- repo 的 Settings → Pages → Source 必須設為 **GitHub Actions**。

## Git 流程
任務完成後直接 push 到 `main`，在 GitHub Pages 上驗證即可（不開 PR）。

## 本機 push 注意
此 repo 需用 `~/.ssh/id_ed25519`（身分 RJ-software-outsourcing）push；預設的 gravitysketch key 無寫入權限。已在本機 repo 設定 `core.sshCommand`（`git config core.sshCommand "ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes"`），若 push 被拒先檢查這項。
