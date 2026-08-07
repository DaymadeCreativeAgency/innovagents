---
title: "Salesforce report export limits and how to work around them"
description: "Reports show 2,000 rows and export 100,000. The export truncates silently at the cap, so here is how to spot it and which tool to move to when you hit it."
date: "2026-05-07"
author: "andre"
product: "/products/list-view-export"
cluster: "exports"
---

Salesforce reports display up to 2,000 rows in the browser and export up to 100,000 rows in `.xlsx`. When a report exceeds the export cap, Salesforce produces a file containing the first 100,000 rows without warning you that the rest were dropped.

The silent part is what makes this worth writing about. Everything else is just a number to plan around.

## The two limits are different

The 2,000 row browser limit is a display constraint. Your report still runs against the full result set, so totals, subtotals, and grand totals are calculated on everything. You are only seeing the first 2,000 rows of detail.

This trips people up in the opposite direction to how you would expect. Admins see 2,000 rows on screen, assume the report is capped there, and go looking for a workaround they do not need. If you only want the summary numbers, the display limit is irrelevant.

The 100,000 row export limit is a real ceiling on the data you get out.

## The silent truncation

There is no error, no banner, and no note in the file. You get 100,000 rows and no indication that the report matched 143,000.

The habit that prevents this: check the record count on the report itself before exporting, and check the row count in the file afterwards. If the file has exactly 100,000 data rows, treat that as a failure rather than a result. Exactly hitting a round cap is almost never a coincidence.

Anyone building a recurring export near that ceiling should assume they will cross it eventually, because record volumes go up.

## Formatted Report vs Details Only

Two export formats, and picking wrong wastes cleanup time.

Formatted Report preserves the report's structure: column groupings, subtotals, grand totals, and the report header. Use it when a person is going to read the file.

Details Only gives raw rows with a single header row and nothing else. Use it when the file feeds a pivot table, another system, or any kind of processing. Grouping headers and subtotal rows interleaved with data are a problem to strip out afterwards.

For matrix reports, Details Only is how you see the underlying rows at all.

## Working around the 100,000 row cap

Split the report. Filter by date range, region, owner, or record type and run several exports, then join them. Free, works today, and tedious enough that nobody wants to do it monthly.

Use Data Loader. It handles up to 5 million records per export and has a command line interface, so a recurring large pull can be scripted rather than clicked. This is the right answer for genuinely large volumes.

Use the Bulk API directly, through Workbench or your own tooling. Same ceiling as Data Loader in practice, more control, more setup.

Question whether you need all the rows. A surprising share of 150,000 row exports exist because somebody wanted a number that a summary report would have produced in a second. Ask what happens to the file after it is downloaded before you build the pipeline.

## The limit people meet more often

In practice, most admins hit a different wall long before 100,000 rows: the fact that building the report at all means recreating filters that already exist on a list view.

Reports are the right tool when you need grouping, subtotals, or a chart. When you just need the records currently displayed in a list view as a CSV, a report is a rebuild of work you already did, and the two definitions then drift apart. That is covered in [exporting a list view to CSV](/blog/list-view-export-to-csv).

[List View Export](/products/list-view-export) exports straight from the list view with a record count shown before it runs, which also means you see how many rows you are about to get rather than finding out afterwards. For volumes past what reports handle, Data Loader remains the better tool and we would point you there.

The full comparison of every export route is in [how to export data from Salesforce](/blog/export-data-from-salesforce).

## Sources

- [Reports and Dashboards Limits and Allocations](https://help.salesforce.com/s/articleView?id=analytics.rd_reports_dashboards_limits.htm&language=en_US), Salesforce Help
- [Salesforce Report Row Limits](https://www.gigasheet.com/post/salesforce-report-row-limits), Gigasheet
