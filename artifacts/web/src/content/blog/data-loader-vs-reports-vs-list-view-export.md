---
title: "Data Loader vs reports vs list view export"
description: "The three tools Salesforce admins actually choose between for exports, what each one costs in setup and volume, and which to hand to a non-admin."
date: "2026-06-19"
author: "pedro"
product: "/products/list-view-export"
cluster: "exports"
---

Reports handle up to 100,000 rows and are the right tool when you need grouping or subtotals. Data Loader handles up to 5 million records and is the right tool for bulk or scripted pulls. List view export is the right tool when the records you want are already on screen and you do not want to rebuild the filters.

They are not competing for the same job, though they get treated as if they are.

## Side by side

| | Report export | Data Loader | List view export |
|---|---|---|---|
| Row ceiling | 100,000 (.xlsx) | 5 million per export | List view result set |
| Setup per export | Build report and filters | Write SOQL | None, uses the list view |
| Install needed | No | Yes, desktop app | No |
| Filter defined where | In the report | In the query | In the list view |
| Grouping and subtotals | Yes | No | No |
| Scriptable | No | Yes, CLI | No |
| Usable by non-admins | Yes, with training | Rarely | Yes |
| Soft deleted records | No | Yes, via Export All | No |

## Report export

Reports are a reporting tool that happens to export. When the question involves grouping, subtotals, comparisons across periods, or a chart, build a report. The export is then a convenience.

Reports display 2,000 rows in the browser and export up to 100,000 in `.xlsx`. Choose Details Only rather than Formatted Report when the file feeds another system, or you will spend time stripping subtotal rows out.

Where reports get misused is as a general export mechanism. Building a report purely to get records you were already looking at means defining the same filter twice, in two objects that then drift apart.

## Data Loader

The bulk tool. Up to 5 million records per export, driven by a SOQL query, with a command line interface for scheduling and scripting.

Export All is the option people forget. Standard Export pulls active records; Export All also returns soft deleted records from the Recycle Bin, which matters for reconciliation and recovery.

The cost is access. It is a desktop install requiring credentials and someone who can write SOQL. That is fine for an admin or a data team. Handing it to the person who wants this quarter's renewals is not realistic, and the request comes back as a ticket instead.

Use it when volume is genuinely large, when the export runs on a schedule, or when you need deleted records.

## List view export

Narrow by design. The filters already exist, defined by whoever built the list view, and the export follows them.

There is no native version of this. Salesforce Classic had Printable View, which is gone in Lightning, and Lightning has no export action on list views at all. Getting one means a managed package.

What it is good at is the everyday case: a sales manager looking at their pipeline list view who needs it in a spreadsheet, without a report build and without a ticket. What it is not is a bulk tool or a backup mechanism.

[List View Export](/products/list-view-export) covers this case on any standard or custom object, respecting list view visibility and field level security, with a record count shown before the export runs.

## Choosing

Ask three questions in order.

Does the output need grouping, subtotals, or a chart? Use a report. Nothing else does this.

Is it more than 100,000 rows, scheduled, or does it need deleted records? Use Data Loader. Reports cannot reach past the cap and list views are not built for volume.

Is the person asking able to build a report, and will this request recur? If the answer is no and yes, the filters already exist on a list view and you should be exporting from there rather than recreating them every time.

## The pattern underneath

Most export frustration in Salesforce comes from using a tool one step too heavy for the job. A report gets built for a five second question. Data Loader gets installed for a hundred rows. The extra step becomes routine, and the routine hides the fact that the work is unnecessary.

Matching the tool to the size of the question is most of the fix, and it is free.

For the full set of options including the Data Export Service and the API, see [how to export data from Salesforce](/blog/export-data-from-salesforce). For the specific ceilings, see [Salesforce report export limits](/blog/salesforce-report-export-limits). For the list view gap, see [exporting a list view to CSV](/blog/list-view-export-to-csv).

## Sources

- [Reports and Dashboards Limits and Allocations](https://help.salesforce.com/s/articleView?id=analytics.rd_reports_dashboards_limits.htm&language=en_US), Salesforce Help
- [Salesforce Bulk Export: Methods, Limits and How to Choose](https://www.xappex.com/blog/salesforce-bulk-export/), Xappex
