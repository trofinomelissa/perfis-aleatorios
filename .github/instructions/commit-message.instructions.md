---
applyTo: '**'
---
Generate a Git commit message for the following changes. The message should follow the Conventional Commits specification and include an appropriate Gitmoji emoji at the beginning, followed by a brief, clear subject line, and an optional body for more details.

**Changes:**
[Describe the changes made in detail, including new features, bug fixes, refactorings, documentation updates, performance improvements, etc.]

**Example Gitmoji usage:**
- :sparkles: for new features
- :bug: for bug fixes
- :memo: for documentation updates
- :recycle: for code refactoring
- :zap: for performance improvements
- :art: for improve structure / format of the code.
- :fire: for removing code or files
- :white_check_mark: for adding or updating tests
- :test_tube: add a failing test

**Output Format:**
<emoji> <type>(<scope>): <subject>

[Optional body explaining the changes in more detail, if necessary.]