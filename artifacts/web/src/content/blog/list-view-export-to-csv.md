---
title: "How to export a Salesforce list view to CSV without building a report"
description: "Salesforce has no export button on list views. The four workarounds, what each one costs you in time, and why the filters end up defined twice."
date: "2026-04-16"
author: "pedro"
product: "/products/list-view-export"
cluster: "exports"
---

Salesforce does not give list views an export button. To get a list view into a CSV you either rebuild the same filters as a report and export that, run the equivalent query through Data Loader or Workbench, or install something that adds the button.

That is the whole answer. The rest of this is which workaround costs least, and why the gap exists in the first place.

## What Classic had, and Lightning does not

Salesforce Classic had Printable View on list views. It exported what was on screen, which meant the displayed rows rather than the full result set, and it produced something formatted for printing rather than for a spreadsheet.

Printable View is not available in Lightning Experience. For orgs that migrated, this reads as a feature that was removed, which is why it still comes up in community threads years later.

## Workaround 1: rebuild it as a report

The route Salesforce documentation points you at, and the one most admins use.

Create a report on the same object, recreate the list view's filters, add the same columns, run it, then export. Reports display 2,000 rows in the browser but export up to 100,000 in `.xlsx`, so the ceiling is usually not the problem.

The problem is that you now maintain the same filter logic in two places. Someone edits the list view to add a status, nobody updates the report, and next month's export quietly covers a different population than the list everyone is looking at. Nothing errors. The numbers just stop matching, and it takes a while for anyone to notice.

For a genuinely one off request this is fine. As a recurring process it is a slow leak.

## Workaround 2: Data Loader

Install Data Loader, write a SOQL query matching the list view's filters, export to CSV. It handles up to 5 million records, so volume is not a constraint, and the command line interface means you can script it.

This is a good tool badly matched to the request. It needs installing on each person's machine, it needs credentials, and it needs somebody who can translate a set of point and click filters into a `WHERE` clause. When the person who wants the export is in sales ops rather than IT, that translation becomes a ticket.

## Workaround 3: Workbench

Workbench is a free browser based tool for running queries against your org. No install. Write the SOQL, pick Bulk CSV under the view options, download the file.

For an admin comfortable with SOQL this is the fastest of the manual routes, and it is my usual answer when someone needs something once and does not want to install anything. It is still a query rather than a list view, so the filter duplication problem is unchanged.

## Workaround 4: add the button

Managed packages exist that put an export action directly on the list view. The list view stays the single definition of the filter, and the export follows it.

Things worth checking before picking one. Whether the export respects field level security and list view visibility, or whether it pulls fields the user cannot normally see. Whether data leaves your org to a vendor service. Whether it works on custom objects without per object configuration.

[List View Export](/products/list-view-export) is ours. It exports from the list view toolbar, on any standard or custom object, following list view visibility and field level security, with a record count shown before the export runs.

## Which to use

Once, and you can write SOQL: Workbench.

Once, and you cannot: rebuild as a report.

Recurring, high volume, and scriptable: Data Loader.

Recurring, and run by people who are not admins: add the button. Every other route puts a technical step between a business user and a file they can already see on screen.

## Why the filters ending up in two places matters

This is the part that gets underrated. The cost of the report workaround is not the fifteen minutes to build it. It is that the export and the list view are now two independent definitions of the same question, maintained by different people at different times, and they will diverge.

When the sales director's list view says 340 accounts and the exported report says 328, somebody spends an afternoon on it. That afternoon is the real price, and it recurs.

More on the full set of export options in [how to export data from Salesforce](/blog/export-data-from-salesforce), and on the ceilings in [Salesforce report export limits](/blog/salesforce-report-export-limits).

## Sources

- [Reports and Dashboards Limits and Allocations](https://help.salesforce.com/s/articleView?id=analytics.rd_reports_dashboards_limits.htm&language=en_US), Salesforce Help
- [Salesforce Export List View: Methods and Workarounds](https://www.xappex.com/blog/salesforce-export-list-view/), Xappex
