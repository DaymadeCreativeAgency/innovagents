---
title: "Salesforce file storage limits explained"
description: "How Salesforce calculates file storage: a base allocation plus per user licences, pooled org wide. What counts against it, and what to do when the pool fills."
date: "2026-07-19"
author: "andre"
product: "/products/enhanced-files"
cluster: "files"
---

Salesforce file storage is a pool. You get a base allocation set by your edition, plus a per user amount multiplied by your standard licences, and everyone shares the total. Most editions start at 10 GB base, and Enterprise, Performance, and Unlimited add 2 GB per user licence.

An Enterprise org with 10 users therefore has 10 GB plus 20 GB, so 30 GB in total. Not 2 GB each.

## The pool is the part people miss

File storage is not allocated per user in practice. The per user figure is only an input to the org wide total, and once calculated, any user can consume any amount of it.

That has a consequence worth planning for. One team uploading video files can exhaust the allocation for everybody, and there is no per user quota in the platform to stop them. The first sign is usually an upload failure for somebody unrelated.

Storage is also not the same as data storage, which is a separate allocation covering records. Filling one does not affect the other, and the fixes are different.

## What counts against file storage

Broader than most people assume:

- Attachments on records
- Files in Files home
- Salesforce CRM Content
- Chatter files, including user profile photos
- The Documents tab
- The file field on Knowledge articles
- Site.com assets

User profile photos are the entry on that list that surprises people. In a large org they add up quietly, and nobody thinks of them as files.

Field history rows do not count against storage, which is a different limit with a different cause.

## Checking where you are

Setup, then Storage Usage. It shows the split between data and file storage, current usage against the allocation, and the largest consumers.

Worth doing before any conversation about buying more. The usual finding is that a small number of old, large files account for a disproportionate share, and that nobody has looked in years.

## When the pool fills

Delete what nobody needs. Old email attachments and superseded document versions are the usual candidates. Versioning means every revision of a file is stored, so a document revised twenty times is twenty stored versions.

Deduplicate through linking rather than copying. Because `ContentDocumentLink` separates the file from the records it appears on, the same file linked to five records uses one file's worth of storage. A file uploaded five times uses five. If your team uploads rather than links, you are paying for the same document repeatedly.

Move large media out. Video and high resolution imagery are poor uses of Salesforce storage. External storage with links back into the record is cheaper and usually faster for the people opening them.

Buy more. Salesforce sells additional file storage. It is a legitimate answer once the cheaper ones are exhausted, and a poor first move before anyone has looked at what is actually in there.

## The size limits, separately

Storage allocation is how much you can hold in total. File size limits are how large any single file can be, and they depend on the upload path.

| Where | Maximum |
|---|---|
| Files home | 2 GB |
| Chatter feed attachment | 2 GB |
| Attachments related list (legacy) | 25 MB |
| CRM Content via SOAP API | 38 MB |
| CRM Content via Bulk API | 10 MB |
| Documents tab | 5 MB |

Several third party guides put the Files limit at 10 GB. The Salesforce documentation says 2 GB, and that is the number to plan against.

## Finding the files in the first place

Storage cleanup runs into the same interface problem as everything else with Salesforce files. The related list on a record shows a short slice, has no search, and gives no count, so working out which records are carrying heavy attachments means queries rather than browsing.

[Enhanced Files](/products/enhanced-files) puts a file count and a search filter on the record page, which makes the per record picture visible without a query. It is free on the AppExchange. It is not a storage analysis tool, so for an org wide audit, Setup's Storage Usage page and a few SOQL queries against `ContentVersion` remain the right approach.

More on the underlying model in [managing files in Salesforce](/blog/salesforce-file-management), and on why some files behave differently in [Files vs Attachments vs Documents](/blog/salesforce-files-vs-attachments).

## Sources

- [Data and File Storage Allocations](https://help.salesforce.com/s/articleView?id=xcloud.overview_storage.htm&language=en_US), Salesforce Help
- [Differences Between Files, Salesforce CRM Content, Salesforce Knowledge, Documents, and Attachments](https://help.salesforce.com/s/articleView?id=experience.collab_files_differences.htm&language=en_US&type=5), Salesforce Help
