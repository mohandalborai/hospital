# Medical Web Platform - Implementation Plan

## 1. Database Schema Design (Migrations)

-   [ ] **Modify `users` table**:
    -   Add `role` (enum: 'patient', 'doctor', 'admin').
    -   Add `specialization` (string, nullable, for doctors).
    -   Add `wallet_balance` (decimal, default 0).
-   [ ] **Create `medical_reports` table**:
    -   `id`
    -   `patient_id` (foreign key to users)
    -   `doctor_id` (foreign key to users, nullable)
    -   `file_path` (string)
    -   `ai_analysis` (text/json, nullable)
    -   `doctor_notes` (text, nullable)
    -   `status` (enum: 'pending', 'analyzed', 'reviewed')
    -   `reward` (decimal, default 0)
    -   Timestamps

## 2. Models & Logic

-   [ ] **User Model**: Add relationships (reports, reviews).
-   [ ] **MedicalReport Model**: Define fillables and relationships.
-   [ ] **AI Service Integration**: Create a Service class (`App\Services\AiAnalysisService`) to handle file analysis (mocked for now).

## 3. Controllers

-   [ ] **AuthController**: Handle registration (with role selection) and login.
-   [ ] **PatientController**:
    -   Dashboard: View my uploads and results.
    -   Upload: Form to upload image.
-   [ ] **DoctorController**:
    -   Dashboard: View pending reports.
    -   Review: Form to add notes/prescription and mark reviewed.
    -   Earnings: View calculated rewards.

## 4. Views (Blade + Tailwind)

-   [ ] **Layouts**: Main layout with navigation.
-   [ ] **Welcome**: Landing page.
-   [ ] **Auth**: Login/Register pages with Role selection.
-   [ ] **Patient Dashboard**: Upload form + History list.
-   [ ] **Doctor Dashboard**: List of pending/reviewed cases + Review interface.

## 5. Routes

-   [ ] Define web routes for dashboards, uploads, and reviews.
