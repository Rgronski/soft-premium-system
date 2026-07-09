# 14_GIT_WORKFLOW

---

# Purpose

This document defines the Git workflow rules used for SPS repository validation.

It exists to ensure that validation is performed against the active development branch rather than an assumed default branch.

---

# Active Branch Rule

Repository validation must use the active development branch.

Validation must reflect the branch where current SPS work actually exists.

---

# Do Not Assume Main

Never assume that `main` is the current Single Source of Truth branch for active work.

If active SPS work is happening on another branch, that branch is the correct validation target for the session.

---

# Branch Verification Commands

Before repository validation, determine the active branch using:

```powershell
git branch --show-current
git status
git log --oneline --decorate -n 10
```

If the active branch cannot be determined, ask the Product Owner for the correct branch before continuing validation.

---

# Repository Validation Rule

Repository validation must begin only after active branch verification is complete.

All repository-state reasoning, continuity checks, and validation conclusions must use the verified active branch context.

---

# Product Owner Git Authority

The Product Owner performs:

* commit decisions,
* push decisions,
* branch changes,
* merge decisions,

unless these actions are explicitly delegated.

---

# Future Evolution

This workflow may evolve if SPS introduces more formal branch policies, release branches, or repository automation.

Any future change must preserve the rule that validation follows the active branch rather than an assumed branch.
