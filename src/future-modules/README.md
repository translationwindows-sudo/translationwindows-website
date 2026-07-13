# Future Modules

Reserved architecture space. Each module below becomes a folder with its
own `features/`, `services/`, and route group when its milestone begins.
Nothing here ships in V1; the service factory in `src/services/index.ts`
and the env-driven provider pattern are the integration points.

| Module            | Route group (planned) | Backing services (planned)     |
| ----------------- | --------------------- | ------------------------------ |
| AI Quote Engine   | `(platform)/quote`    | AI provider adapter            |
| Customer Portal   | `(platform)/portal`   | Auth, DB, Storage              |
| Translator Portal | `(platform)/translate`| Auth, DB, Storage              |
| CRM               | `(admin)/crm`         | DB, Email                      |
| Admin Dashboard   | `(admin)/dashboard`   | Auth (role-based), DB          |
| Analytics         | `(admin)/analytics`   | DB, event pipeline             |
| Invoicing         | `(admin)/invoices`    | DB, payments provider          |
| Knowledge Center  | `resources/*`         | MDX/CMS adapter                |

Rules:
1. No feature imports a concrete provider — always the interface.
2. New providers register in the service factory, selected by env var.
3. Route groups keep marketing and platform bundles separate.
