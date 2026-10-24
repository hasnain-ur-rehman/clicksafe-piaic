<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- ClickSafe is a single client-side page: sections live in src/components/clicksafe, content data in src/data, URL heuristics as a pure function in src/lib/url-analyzer.ts (tested). Why: no backend; keeps logic testable.
