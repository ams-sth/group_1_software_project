# DB Naming Conventions

Conventions already in use across the data dictionary and ERD, written down so new tables/columns stay consistent.

- **Tables**: PascalCase, plural (`Users`, `Groups`, `ExpenseParticipants`)
- **Columns**: PascalCase (`Name`, `IsDeleted`, `NotificationsEnabled`)
- **Primary keys**: `ID` (uuid) on entity tables. Junction/link tables have no surrogate `ID` — their PK is the combination of FK columns instead (e.g. `GroupMembers` = `GroupID` + `UserID`)
- **Foreign keys**: `<Entity>ID` (`GroupID`, `UserID`). When a table relates to the same entity more than once, use a role name instead of a generic one so the columns stay distinguishable (`PayerID`, `RecipientID`, `ActorID`, `CreatorID`)
- **Booleans**: `Is`/`Has` prefix (`IsDeleted`) or a plain descriptive flag (`NotificationsEnabled`)
- **Dates**: `Date` suffix for date-only (`ExpenseDate`, `StartDate`), `At` suffix for a timestamp (`OccurredAt`)
- **Enums**: PascalCase type and values (`SplitType: Equal, Unequal, Percentage`)
- **Money**: always `decimal(10,2)`