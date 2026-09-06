# Week 1 — Requirements & Sizing
**System: Dropbox (file storage & sync)**

## BA Track: Functional & Non-Functional Requirements

### Functional Requirements
The user can:
- Upload file
- Download file
- Sync file from multiple devices
- Share files via link (general access — anyone with the link can access)
- Delete file
- View file version history
- Restore a previous version

**Out of scope:**
- Edit file
- Fine-grained access rights (e.g. view-only vs edit, or restricting access to specific users)

### Non-Functional Requirements
- **Availability > Consistency**: system prioritizes availability, with eventual consistency achieved within 5 seconds.
- **Large file uploads**: uploads up to 50GB are supported via resumable/chunked transfer, so a transfer can complete despite network interruption. No fixed completion-time SLA, since duration depends on client bandwidth outside the system's control.
- **Durability**: a successfully uploaded file must not be lost or corrupted, even under single-node/replica failure.
- **Security**: by default, a user's file list is scoped to files they own — private unless explicitly shared via link.

---

## DA Track: Capacity Estimation & Entity Identification

### Capacity / Data-Volume Estimate

**Assumptions:**
- Total users: 500M
- Daily active users (DAU): 100M
- Average files per user: 100
- Average file size: 10MB

**Calculation:**
```
Total storage = Total users × avg files/user × avg file size
              = 500,000,000 × 100 × 10MB
              = 500,000,000,000 MB
              ≈ 500 PB
```

**Does this number drive a design decision?**
- Storing blobs in a relational database is ruled out regardless of scale (500GB or 500PB) — this is a *fit* decision (blobs need object storage, not row-based storage), not a *scale* decision. The large number doesn't change this call.
- However, at this scale, **hot/cold storage tiering** becomes justified: a large proportion of stored data is old, rarely-accessed files, and offloading them to cheaper cold storage (e.g. Glacier-style) trades retrieval latency for meaningful cost savings — a trade-off not worth making at small scale.
- **Conclusion**: the estimate confirms the "it's a lot, but doesn't change the core architecture" outcome for storage backend choice, while still surfacing one real decision it does influence (tiering).

*(Request-rate estimation was intentionally not pursued for this deliverable.)*

### Entity List

| Entity | Description |
|---|---|
| **User** | Represents an account holder; owns files and devices. |
| **File** | The actual blob/byte content of an uploaded file, stored in object storage. |
| **Metadata** | The structured, queryable record describing a file (name, size, owner, upload date, storage pointer). |
| **Device** | Represents a device used to sync the app; a user can own multiple devices. |
| **File Version** | Represents a historical version of a file, enabling version history and restore. |
| **Share Link** | Represents a generated link granting access to a shared file. |

---

## Reflections
- Distinguished **durability** (the guarantee) from **versioning/replication** (the mechanism) — requirements should state the promise to the user, not the implementation.
- Distinguished **fine-grained access** (permissions between multiple users on shared content) from **ownership-scoped visibility** (default privacy baseline) — surfaced a missing security NFR.
- Practiced Fermi estimation: the goal isn't a "correct" number, but reasoning from explicit assumptions to an order of magnitude, then testing whether that magnitude actually changes a design decision.
