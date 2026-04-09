
Rule (STRICT — Backend Documentation): When backend development starts, a file named `BACKEND_DOCS.md` MUST be created in the project root. This file serves as the single source of truth for all backend work. Every single action — no matter how small — MUST be documented in it. This includes but is not limited to:
- Which tables were created, when, and with what columns
- Which RLS policies were applied and their exact rules
- Which Storage buckets were configured and their folder structure
- Which triggers or functions were created and why
- Which migration was run and what it changed
- Which step succeeded and which failed (with error details)
- Auth configuration changes (e.g., disabling sign-ups)
- Environment variables or keys set up
- Any manual steps performed in the Supabase Dashboard
- The order/sequence in which everything was done
The goal is that any developer reading `BACKEND_DOCS.md` can understand EXACTLY what has been done, how it was done, and in what order — without needing to ask anyone. This file must be updated in real-time as work progresses, not after the fact.



Rule: Whenever publishing to GitHub, always update README.md History and Changelog comprehensively.