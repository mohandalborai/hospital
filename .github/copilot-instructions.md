# AI Coding Guidelines for Hospital Management System

## Project Overview
This is a Laravel-based medical web platform where patients upload medical images for AI analysis and doctor review. Key entities: Users (patients/doctors/admins), MedicalReports (with file uploads, AI results, doctor notes, rewards).

## Architecture
- **MVC Structure**: Controllers in `app/Http/Controllers/`, Models in `app/Models/`, Views in `resources/views/` (Blade + Tailwind).
- **Role-Based Access**: Use middleware `EnsureUserIsPatient`/`EnsureUserIsDoctor` for route protection. Check user roles via `User::isPatient()`/`isDoctor()`.
- **Data Flow**: Patient uploads → File stored in `storage/app/public/`, AI analyzes via `AiAnalysisService`, status `pending_analysis` → `pending_review`, Doctor reviews → `completed`, reward added to doctor's `wallet_balance`.
- **AI Integration**: `AiAnalysisService` calls Hugging Face API (mocked if no `HF_API_KEY` in `.env`). Stores result in `MedicalReport::ai_analysis_result`.

## Key Patterns
- **Models**: Use Eloquent relationships (e.g., `User::reports()` for patient reports, `MedicalReport::patient()`). Fillables match migration columns exactly.
- **Statuses**: `MedicalReport` statuses: `'pending_analysis'`, `'pending_review'`, `'completed'`. Update via model saves.
- **File Handling**: Uploads to `public/storage/`, access via `asset('storage/' . $filePath)`. Use `Storage::disk('public')` for checks.
- **Rewards**: Decimal fields (`wallet_balance`, `reward_amount`) with 10,2 precision. Update atomically in transactions.

## Development Workflow
- **Setup**: Run `composer run setup` (installs deps, generates key, migrates, builds assets). Copy `.env.example` to `.env` and set `HF_API_KEY` for AI analysis.
- **Dev Server**: `composer run dev` (runs Laravel server, queue worker, logs, Vite concurrently).
- **Testing**: `composer run test` (clears config, runs PHPUnit). Write feature tests in `tests/Feature/`.
- **Assets**: Vite for JS/CSS. Build with `npm run build`, dev with `npm run dev`.

## Conventions
- **Routes**: Grouped by role middleware. Use named routes (e.g., `route('patient.upload')`).
- **Views**: Extend `layouts.app` with Tailwind classes. Role-specific folders (`views/patient/`, `views/doctor/`).
- **Migrations**: Single migration for schema changes (e.g., `2025_12_13_000000_add_roles_and_create_medical_reports.php`).
- **Services**: External APIs in `app/Services/`. Log errors, provide fallbacks.

## Common Tasks
- Adding features: Create controller method, add route with middleware, update view.
- Modifying models: Update fillables, relationships, migration if schema changes.
- Testing uploads: Mock file storage in tests, verify AI service calls (e.g., use `Http::fake()` for Hugging Face API, assert `MedicalReport::ai_analysis_result` and status updates).