---
title: "Managing files in Salesforce: a practical guide for admins"
description: "How Salesforce stores files, the size and storage limits that apply, why the related list is awkward, and what to fix first when file handling gets in the way."
date: "2026-05-25"
author: "pedro"
product: "/products/enhanced-files"
cluster: "files"
pillar: true
---

Salesforce stores files through three objects: `ContentVersion` holds the binary and its versions, `ContentDocument` represents the file itself, and `ContentDocumentLink` connects it to records. A single file can be linked to many records without being copied. Uploads cap at 2 GB, and file storage is pooled across the org.

That model is a real improvement on the legacy Attachment object. The gaps are in what sits on top of it.

## The three objects

`ContentVersion` is a version of a file, including the binary data. Every upload creates one, and editing a file adds another version rather than replacing it.

`ContentDocument` is the file as a concept, pointing at its latest version. This is what you delete when you delete a file.

`ContentDocumentLink` joins a `ContentDocument` to a record, a user, or a library. Because linking is separate from storage, the same contract can appear on an Account, an Opportunity, and a Case while occupying one file's worth of storage.

The legacy `Attachment` object works differently: one file, bolted to one parent record, no versioning. Anything created that way stays that way until it is migrated. [Files vs attachments vs documents](/blog/salesforce-files-vs-attachments) covers what that means for orgs carrying both.

## Size limits

The caps depend on how the file arrives, which is why answers to "what is the Salesforce file size limit" disagree.

| Where | Maximum |
|---|---|
| Files home | 2 GB |
| Chatter feed attachment | 2 GB |
| Attachments related list (legacy object) | 25 MB |
| Salesforce CRM Content via SOAP API | 38 MB |
| Salesforce CRM Content via Bulk API | 10 MB |
| Documents tab | 5 MB |
| Knowledge article file field | 5 MB Classic, 2 MB Lightning |

The two numbers worth remembering are 2 GB for modern Files and 25 MB for legacy Attachments. Several third party guides claim 10 GB for Files, which does not match the Salesforce documentation.

## Storage allocation

File storage is a pool: a base allocation by edition plus a per user amount, multiplied by standard licences and shared across the whole org.

Most editions start at 10 GB base file storage. Enterprise, Performance, and Unlimited add 2 GB per user licence. An Enterprise org with 10 users has 10 GB plus 20 GB, so 30 GB shared.

What counts against it is broader than people expect: attachments, files in Files home, Salesforce CRM Content, Chatter files including user profile photos, the Documents tab, the file field on Knowledge articles, and Site.com assets. Field history rows do not count, but files certainly do.

[Salesforce file storage limits](/blog/salesforce-file-storage-limits) goes through the calculation and what to do when the pool fills up.

## Where the daily friction is

The storage model is sound. The interface on top of it is where admins lose time.

Downloading is one file at a time. There is no native way to take every file on a record in one action, so a support case with fifteen attachments is fifteen clicks and fifteen trips to the downloads folder. This is the single most common complaint, and it has [its own set of workarounds](/blog/download-all-files-salesforce-record).

The related list is short and unsearchable. It shows a handful of files with a link to see more, and there is no filter box. On a record with sixty files, finding the signed version of one document means paging until you spot it.

There is no count at a glance. You cannot tell whether a record has two files or two hundred without opening the list.

None of these are data problems. The files are stored correctly and the permissions work. They are interface problems, and they cost minutes many times a day rather than hours once.

## Permissions

File access follows sharing on the linked record for files shared to a record, and library permissions for CRM Content. A user who can see the Account can generally see files linked to it.

The thing to check when evaluating any file tool is whether it preserves this. Some external file managers surface files through their own permission layer, which can quietly widen access beyond what the record sharing model allows. That is the kind of gap nobody notices until an audit asks who could see a document.

## What to fix first

Look at where files actually live before changing anything. An org running both legacy Attachments and modern Files has two experiences on the same page and users who do not know which is which. Migrating to Files is the higher value project even though it is less visible than adding a tool.

Then check storage. If you are near the pool limit, no interface change matters as much as understanding what is consuming it, and user photos and old email attachments are usually a bigger share than anyone guesses.

Then fix the related list, because that is where the daily minutes go. [Enhanced Files](/products/enhanced-files) replaces it with a scrollable, searchable list that shows a file count and downloads every file on a record in one click, running natively and honouring the file permissions and sharing rules you already have. It is free on the AppExchange. It does not migrate legacy attachments and it does not create storage, so if either of those is your problem, solve that first.

## Sources

- [Differences Between Files, Salesforce CRM Content, Salesforce Knowledge, Documents, and Attachments](https://help.salesforce.com/s/articleView?id=experience.collab_files_differences.htm&language=en_US&type=5), Salesforce Help
- [Data and File Storage Allocations](https://help.salesforce.com/s/articleView?id=xcloud.overview_storage.htm&language=en_US), Salesforce Help
- [File Limits in Chatter](https://help.salesforce.com/s/articleView?id=experience.collab_files_limitations.htm&language=en_US&type=5), Salesforce Help
