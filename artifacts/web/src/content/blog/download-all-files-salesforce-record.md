---
title: "How to download all files from a Salesforce record at once"
description: "Salesforce downloads files one at a time. The Flow, Data Loader, and app-based routes to getting every file on a record in a single action, and what each costs."
date: "2026-04-23"
author: "andre"
product: "/products/enhanced-files"
cluster: "files"
---

Salesforce has no native way to download every file on a record at once. The standard interface downloads one file at a time. To get all of them in a single action you need Data Loader with a ContentDocumentLink query, a Flow that packages them, or an app that adds the button.

Fifteen attachments on a case means fifteen clicks. That is the whole problem, and it is why this question keeps getting asked.

## Why there is no button

Files are stored across `ContentVersion`, `ContentDocument`, and `ContentDocumentLink` rather than as a folder attached to a record. A record does not own its files; it is linked to them, and the same file can be linked to several records at once.

That design is good for storage, because one contract linked to five opportunities uses one file's worth of space. It also means there is no folder to zip, which is part of why a download-all action never shipped.

## Option 1: Data Loader

The route that works today with no build.

Query `ContentDocumentLink` for the record to get the linked document IDs, then query `ContentVersion` for those documents and export the `VersionData` field. Data Loader will write the binaries out.

```sql
SELECT ContentDocumentId, LinkedEntityId
FROM ContentDocumentLink
WHERE LinkedEntityId = '500XXXXXXXXXXXXXXX'
```

This is fine for a one off extraction, a migration, or a legal request. It is not something you can hand to the person who actually wants the files, because it needs Data Loader installed, credentials, and someone who can chain two queries. By the time you have explained it, the fifteen clicks would have been finished.

## Option 2: build it with Flow

A screen Flow or a button that gathers `ContentDocumentLink` records for the current record and does something useful with the collection.

The honest limitation: Flow on its own cannot produce a zip file. Salesforce has no native zip action, so a genuine download-all needs Apex to assemble the archive, or you settle for a Flow that lists the files with links and lets the user click through them faster.

If you have Apex capacity, a zip is achievable. Budget for heap size limits on large files, because a record with several hundred megabytes of attachments will hit them, and the failure mode is an unhandled exception rather than a graceful message.

## Option 3: an app

The AppExchange has several tools for this, and they split into two shapes worth telling apart.

Some run natively and download through the browser using the permissions the user already has. Some route files through an external service, which means your documents leave the org, and you should know that before it happens rather than after.

Check three things: whether files leave your org, whether the tool respects existing file permissions and sharing rules rather than applying its own, and whether it works on the record page where people actually are, rather than in a separate tab.

[Enhanced Files](/products/enhanced-files) adds a download-all action to the files related list on the record page. It runs natively, so files do not leave your org, and it follows the file permissions and sharing rules already in place. It is free on the AppExchange. For a bulk migration of every file in the org, Data Loader is still the correct tool and this is not trying to replace it.

## Which to use

A single record, right now, by a non-admin: an app. Every other route puts a technical step in front of a routine task.

A migration or a legal export across many records: Data Loader. This is exactly what it is for.

A specific workflow with custom packaging rules: build it, and plan for the zip and heap limits.

## The related list problem underneath

Downloading is the symptom people report. The related list itself is the cause.

It shows a few files with a link to see the rest, has no search box, and gives no count until you open it. On a record with sixty files, the download question is really a finding question, and any fix that only addresses downloading leaves the harder half in place.

More on the storage model in [managing files in Salesforce](/blog/salesforce-file-management), and on the object differences in [files vs attachments vs documents](/blog/salesforce-files-vs-attachments).

## Sources

- [Differences Between Files, Salesforce CRM Content, Salesforce Knowledge, Documents, and Attachments](https://help.salesforce.com/s/articleView?id=experience.collab_files_differences.htm&language=en_US&type=5), Salesforce Help
- [File Limits in Chatter](https://help.salesforce.com/s/articleView?id=experience.collab_files_limitations.htm&language=en_US&type=5), Salesforce Help
