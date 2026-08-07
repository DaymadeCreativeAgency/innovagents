---
title: "How to export data from Salesforce: every method compared"
description: "Reports, list views, Data Loader, the Data Export Service, and the API. What each one exports, the row limits on each, and how to pick without guessing."
date: "2026-05-18"
author: "andre"
product: "/products/list-view-export"
cluster: "exports"
pillar: true
---

Salesforce has five ways to get data out: report exports, list views, Data Loader, the scheduled Data Export Service, and the API. They differ on row limits, whether you can filter, and how much setup each one needs before it produces a file.

Most people learn one of them and force every request through it. That is where the wasted afternoons come from.

## The five options

| Method | Best for | Row ceiling |
|---|---|---|
| Report export | Filtered, grouped, recurring reporting | 100,000 rows (.xlsx) |
| List view | Data you are already looking at | No native export |
| Data Loader | Bulk one off pulls, scriptable | 5 million records per export |
| Data Export Service | Scheduled full org backups | Whole org |
| API / SOQL | Integrations and custom tooling | Governed by API limits |

## Report export

The default answer for most people, and correct when the question is genuinely a reporting question.

Reports display a maximum of 2,000 rows in the browser. Exporting gets you past that, up to 100,000 rows in `.xlsx`. Two export formats are offered: Formatted Report keeps column groupings, subtotals, and grand totals, and Details Only gives raw rows with a header and nothing else. Details Only is what you want if the file is going into a pivot table or another system.

The catch that costs people the most time is the silent truncation. If your report exceeds 100,000 rows, Salesforce gives you a file with 100,000 rows in it and does not tell you the rest were dropped. Check the row count against the report total every time you are anywhere near the ceiling.

Report exports are also slow to set up when the filters already exist somewhere else, which is the specific problem list views create.

## List views

There is no native export button on a Salesforce list view. In Classic you could use Printable View, which is not available in Lightning Experience, and which exports what is displayed rather than the full result set.

So the standard workflow becomes: look at a list view that already has exactly the records you want, then go and rebuild those same filters as a report so you can export them. The filter logic exists twice, in two places, and they drift.

For a one off this is annoying. For a weekly export of the same list it is a recurring tax, and it is the reason [exporting a list view to CSV](/blog/list-view-export-to-csv) is one of the most searched Salesforce admin questions.

## Data Loader

The free desktop client, for Windows and Mac. It runs a SOQL query you write and writes the results to a local CSV, handling up to 5 million records per export.

Two operations worth distinguishing. Export pulls active records. Export All also retrieves soft deleted records from the Recycle Bin, which is what you want for reconciliation or recovery work.

Data Loader has a command line interface, so exports can be scripted and scheduled on your own machine or a server. That makes it the right tool for repeatable bulk work.

What it is not is an end user tool. It needs installing, it needs credentials, and it needs somebody comfortable writing SOQL. Handing it to a sales ops coordinator who wants this week's opportunities is not a plan.

## Data Export Service

The scheduled backup export in Setup. It produces zipped CSV files of your org's data on a weekly or monthly schedule depending on edition.

This is a backup mechanism, not a reporting one. You cannot filter it to the records you care about, the files arrive as a zip you then have to unpack and search, and the schedule means the data is as fresh as the last run. For disaster recovery and compliance archives it is the right tool. For "I need the West region accounts by lunchtime" it is not.

## The API

SOQL through the REST or Bulk API, either directly or through a tool like Workbench. Maximum flexibility, and the route every integration ends up using.

Workbench is worth knowing about even if you never write code. It is a free browser based tool where you can run a SOQL query, choose Bulk CSV under the view options, and get a file. For an admin who can write a `SELECT`, it skips the Data Loader install.

The limit here is your org's API allocation rather than a row count, and heavy exports do consume it.

## Picking one

Start from what you already have rather than from the tool.

If the filters already exist as a list view, you want a list view export. Rebuilding them as a report is the workaround, not the answer.

If the question needs grouping, subtotals, or a chart, build a report. That is what reports are for, and exporting is a side effect.

If you need more than 100,000 rows, reports cannot do it. Go to Data Loader or the Bulk API.

If it is a backup rather than an analysis, use the Data Export Service and stop trying to make reports do a job they were not designed for.

If it runs on a schedule and feeds another system, use the API.

[Data Loader vs reports vs list view export](/blog/data-loader-vs-reports-vs-list-view-export) goes deeper on the three that admins actually choose between day to day, and [report export limits](/blog/salesforce-report-export-limits) covers the ceilings in detail.

## Where this leaves list views

Four of the five methods work as designed. The list view gap is the odd one, because the filtering work is already done and the platform simply does not offer a way to act on it.

[List View Export](/products/list-view-export) adds the export directly to the list view toolbar, so the CSV matches what the list view shows and follows list view visibility and field level security. It does not replace Data Loader for five million row pulls, and it is not a backup tool. It closes the specific gap where you are staring at the right records and cannot get them out.

## Sources

- [Reports and Dashboards Limits and Allocations](https://help.salesforce.com/s/articleView?id=analytics.rd_reports_dashboards_limits.htm&language=en_US), Salesforce Help
- [Salesforce Bulk Export: Methods, Limits and How to Choose](https://www.xappex.com/blog/salesforce-bulk-export/), Xappex
