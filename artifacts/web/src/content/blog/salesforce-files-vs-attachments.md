---
title: "Salesforce Files vs Attachments vs Documents"
description: "Three ways Salesforce stores files, with different objects, size caps, and behaviour. What each one is, why orgs end up with all three, and how to consolidate."
date: "2026-06-24"
author: "andre"
product: "/products/enhanced-files"
cluster: "files"
---

Files is the modern system, storing content across `ContentVersion`, `ContentDocument`, and `ContentDocumentLink`, with versioning, sharing to multiple records, and a 2 GB cap. Attachments is the legacy object: one file bolted to one parent record, no versioning, 25 MB. Documents is an older tab for web assets like logos, capped at 5 MB.

Plenty of orgs have all three in use at once, usually without having decided to.

## Side by side

| | Files | Attachments | Documents |
|---|---|---|---|
| Objects | ContentVersion, ContentDocument, ContentDocumentLink | Attachment | Document |
| Max size | 2 GB | 25 MB | 5 MB |
| Versioning | Yes | No | No |
| Link to multiple records | Yes | No | No |
| Lightning support | Full | Legacy related list | Legacy tab |
| Intended use | Everyday record files | Superseded | Web assets, logos, Visualforce resources |

Feed attachments posted through Chatter allow up to 2 GB. Salesforce CRM Content allows 2 GB through the interface but 38 MB through the SOAP API and 10 MB through the Bulk API, which matters if you are loading content programmatically.

## Files

The current system, and where new work should go.

Because linking is separate from storage, one file can be attached to many records without duplicating the binary. A signed master agreement can appear on the Account, every related Opportunity, and the Case that referenced it, using one file's worth of storage.

Versioning is built in. Uploading a revision creates a new `ContentVersion` rather than replacing the old one, so the history is there when someone asks which version was sent.

## Attachments

The legacy object, and the reason for a lot of confusion on record pages.

An Attachment belongs to exactly one parent record. No versioning, no sharing, 25 MB per file. Salesforce has moved on, but attachments created years ago are still there and still render in a related list that looks broadly similar to the Files one.

The result is two related lists on the same page, holding different things, with different limits, and users who reasonably assume they are the same feature. Someone uploads to the wrong one and the file is not where the next person looks.

## Documents

The oldest of the three, a tab holding files in folders rather than against records. It is for web resources: logos, DOT files, assets referenced from Visualforce. Custom app logos are capped at 20 KB, which tells you how old this feature is.

It is not a place for business documents, though some orgs still use it that way because it predates the alternatives.

## Why orgs end up with all three

Nobody chooses this. It accumulates.

The org was implemented when Attachments was current. Files arrived and new uploads went there, but nothing migrated the old ones. A consultant used the Documents tab for something in 2019. Then Lightning landed and surfaced two related lists side by side, making visible a split that had been quietly there all along.

The result is that "where are the files on this record" has three possible answers, and the person searching does not know which applies.

## Consolidating

Migrate Attachments to Files. Salesforce provides a Magic Mover tool for notes and attachments, and there are AppExchange options. Either way, run it in a sandbox first and check what the linkage looks like afterwards, because a migration that converts files but loses the association to the right record has made things worse.

Leave the Documents tab alone unless it holds business documents. For logos and Visualforce assets it is doing its job.

Then decide where new files go and say so somewhere people will read. Most of the confusion is a documentation problem wearing a technical costume.

## After consolidating

Getting everything into Files fixes the split. It does not fix the related list, which still shows a short unsearchable slice of what is on the record and still downloads one file at a time.

[Enhanced Files](/products/enhanced-files) addresses that layer: a scrollable searchable list, a file count on the record page, and a download-all action, running natively under the permissions you already have. It works on Files. It does not migrate legacy Attachments, so do the migration first if you have one pending.

More on the storage model in [managing files in Salesforce](/blog/salesforce-file-management), and on the allocation maths in [Salesforce file storage limits](/blog/salesforce-file-storage-limits).

## Sources

- [Differences Between Files, Salesforce CRM Content, Salesforce Knowledge, Documents, and Attachments](https://help.salesforce.com/s/articleView?id=experience.collab_files_differences.htm&language=en_US&type=5), Salesforce Help
- [File Limits in Chatter](https://help.salesforce.com/s/articleView?id=experience.collab_files_limitations.htm&language=en_US&type=5), Salesforce Help
