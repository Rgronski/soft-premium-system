# SPS UI Inventory

## 1. Purpose

This document is the first UI inventory for Soft Premium System.

Its purpose is to describe the current user interface structure based on the repository state during MS-001.2B.

It is an inventory of what exists now, not a target-state design document.

## 2. Scope

This inventory covers:

- application routes implemented in `src/app`,
- active layouts,
- shared UI components,
- workspace-related UI,
- project-facing screens,
- Conductor UI.

This inventory does not define future UI architecture.

## 3. Application Routes

| Route | Screen | Status | Notes |
| --- | --- | --- | --- |
| `/` | Home | Active | Landing workspace with continue/recent projects sections. |
| `/workspace` | Workspace | Active | Static workspace-style screen. |
| `/projects` | Projects | Active | Project creation and project list. |
| `/projects/[id]` | Project Dashboard | Active | KPI, Conductor panel, quick actions. |
| `/projects/[id]/tasks` | Tasks | Active | Simple task form and task list. |
| `/projects/[id]/clients` | Clients | Active | Client list. |
| `/projects/[id]/clients/new` | New Client | Active | Client creation form. |
| `/projects/[id]/clients/[clientId]` | Client Details | Active | Single client details view. |
| `/projects/[id]/calendar` | Calendar | Active | Month View with navigation, day selection and day details. |
| `/projects/[id]/services` | Services | Active | Service list. |
| `/projects/[id]/services/new` | New Service | Active | Service creation form. |
| `/projects/[id]/services/[serviceId]` | Service Details | Active | Single service details view. |
| `/projects/[id]/visits` | Visits | Active | Visit list. |
| `/projects/[id]/visits/new` | New Visit | Active | Visit scheduling form. |
| `/projects/[id]/visits/[visitId]` | Visit Details | Active | Single visit details view. |
| `/projects/[id]/invoices` | Invoices | Placeholder | Screen exists, feature not implemented. |
| `/projects/[id]/settings` | Settings | Placeholder | Screen exists, feature not implemented. |

## 4. Layouts

### Root Layout

File:
`src/app/layout.tsx`

Current role:

- provides global HTML shell,
- loads global styles,
- applies Geist font classes,
- wraps the full application.

### Project Layout

File:
`src/app/projects/[id]/layout.tsx`

Current role:

- renders project workspace shell,
- provides project title area,
- provides left sidebar navigation,
- hosts project child screens.

No additional dedicated layout files were identified for Home, Workspace or Calendar.

## 5. Shared UI Components

### SectionCard

File:
`src/components/ui/SectionCard.tsx`

Status:
Active

Role:

- shared section container,
- renders a `<section>`,
- centralizes the primary bordered card wrapper used on selected screens.

### Workspace Components

Files:

- `src/components/workspace/WorkspaceLayout.tsx`
- `src/components/workspace/WorkspaceHeader.tsx`
- `src/components/workspace/WorkspaceContent.tsx`
- `src/components/workspace/WorkspacePanels.tsx`

Status:
Active

Role:

- structure the project dashboard workspace,
- keep dashboard layout split into header, content wrapper and panel area,
- preserve existing dashboard UI without changing data logic.

Current note:

- `WorkspaceLayout` now composes `SectionCard` internally,
- `SectionCard` adoption increased indirectly through workspace composition.
- `WorkspacePanels` Quick Actions now render from a local configuration array,
- no new shared UI component was created for Quick Actions.
- `WorkspacePanels` KPI cards now render from a local configuration array,
- no new shared UI component was created for KPI cards.

## 6. Workspace UI

### General Workspace Screen

File:
`src/app/workspace/page.tsx`

Status:
Active

Current state:

- standalone workspace-style screen,
- contains static cards and status sections,
- not based on shared workspace components.

### Project Workspace Dashboard

Files:

- `src/app/projects/[id]/page.tsx`
- `src/components/workspace/*`

Status:
Active

Current state:

- uses Workspace components,
- shows KPI tiles,
- shows Conductor panel,
- shows quick actions,
- acts as the main project workspace screen.

## 7. Project UI

### Project Entry Screens

- `src/app/page.tsx` provides project entry/continuation surface.
- `src/app/projects/page.tsx` provides project creation and project listing.

### Project Dashboard

- `src/app/projects/[id]/page.tsx` is the current project overview workspace.

### Project Modules

Implemented:

- Tasks
- Clients
- Calendar
- Services
- Visits

Placeholder:

- Invoices
- Settings

Not identified as UI routes in current scope:

- Knowledge screen

## 8. Conductor UI

File:
`src/components/conductor/ConductorPanel.tsx`

Supporting files:

- `src/lib/conductor/types.ts`
- `src/lib/conductor/conductor.ts`

Status:
Active

Current state:

- rendered on the Project Dashboard,
- displays static Conductor state,
- shows current milestone, phase, task, next action and health,
- does not include AI, automation, workflow engine or external integrations.

## 9. Design Tokens

Status:
Placeholder

Current state:

- no dedicated design tokens document or token source was identified in current scope,
- recurring styling is currently expressed directly in Tailwind utility classes,
- tokenization remains Missing / Planned.

## 10. Component Status Matrix

| Component / UI Unit | Type | Status | Used In | Notes |
| --- | --- | --- | --- | --- |
| `RootLayout` | Layout | Active | Full app | Global shell and fonts. |
| `ProjectLayout` | Layout | Active | `/projects/[id]/*` | Sidebar project workspace shell. |
| `SectionCard` | Shared UI | Active | Selected simple screens and WorkspaceLayout | First extracted UI foundation component with indirect workspace adoption. |
| `WorkspaceLayout` | Workspace UI | Active | Project Dashboard | Workspace wrapper now composed through SectionCard. |
| `WorkspaceHeader` | Workspace UI | Active | Project Dashboard | Dashboard title/subtitle area. |
| `WorkspaceContent` | Workspace UI | Active | Project Dashboard | Dashboard content wrapper. |
| `WorkspacePanels` | Workspace UI | Active | Project Dashboard | KPI, Conductor and quick actions area with KPI cards and Quick Actions rendered from local configuration arrays. |
| `ConductorPanel` | Conductor UI | Active | Project Dashboard | Static conductor summary panel. |
| `Calendar Month View` | Screen UI | Active | `/projects/[id]/calendar` | Month grid, navigation, selection, day details. |
| `Invoices Screen` | Screen UI | Placeholder | `/projects/[id]/invoices` | Route exists, feature not implemented. |
| `Settings Screen` | Screen UI | Placeholder | `/projects/[id]/settings` | Route exists, feature not implemented. |

## 11. Missing / Planned Elements

Missing / Planned based on current repository snapshot:

- dedicated design tokens source,
- shared button component,
- shared input component,
- shared empty-state component,
- shared action tile component,
- shared KPI/stat card component,
- shared form field primitives,
- Knowledge UI route and screen,
- explicit UI catalog for states and variants.

## 12. Maintenance Rules

- This document must describe only implemented UI.
- Missing elements must stay marked as Missing / Planned until added to code.
- New routes, layouts or shared UI components must be reflected here after implementation.
- This file should be reviewed whenever `src/app` structure or shared UI component structure changes.

## 13. Review Notes

- Generated during MS-001.2B.
- Based on repository snapshot, not on assumptions.
- Must be updated whenever UI structure changes.
- Updated after Minimal Patch 2: `WorkspaceLayout` composes `SectionCard` internally.
- Updated after Minimal Patch 3: `WorkspacePanels` renders Quick Actions from a local configuration array.
- Updated after Minimal Patch 4: `WorkspacePanels` renders KPI cards from a local configuration array.
