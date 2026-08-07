---
title: "Field Audit Trail vs standard field history tracking"
description: "Field Audit Trail gives 60 tracked fields and 10 years of archive but requires Shield. A side by side look at what changes, what does not, and who should buy it."
date: "2026-06-13"
author: "andre"
product: "/products/unlimited-field-tracking"
cluster: "field-history"
---

Standard field history tracking gives you 20 fields per object and 18 months of retention, included with the platform. Field Audit Trail gives you 60 fields per object and 10 years of archived history, and requires Salesforce Shield. Everything else about how tracking behaves stays the same.

That last sentence is the one people miss when they scope the purchase.

## Side by side

| | Standard field history | Field Audit Trail |
|---|---|---|
| Tracked fields per object | 20 | 60 |
| Retention in org | 18 months | 18 months by default, then archived |
| Archive retention | None | 10 years by default |
| Sandbox behaviour | Same as production | Archives after 1 month by default |
| Retention configurable | No | Yes, via `HistoryRetentionPolicy` |
| Licensing | Included | Requires Shield |

## What Field Audit Trail changes

Two things, and they are the two limits.

The field ceiling goes from 20 to 60 per object. For most orgs that is the difference between rationing slots and not thinking about it.

Retention becomes a policy you control rather than a fixed 18 months. The default archives production data after 18 months and keeps the archive for 10 years. You override it through the `HistoryRetentionPolicy` metadata, which takes `archiveAfterMonths`, `archiveRetentionYears`, and `gracePeriodDays`, deployed with the Salesforce CLI or another Metadata API client.

Sandboxes default to archiving after one month, which surprises people testing an implementation. If your sandbox history disappears faster than expected, that is why.

## What it does not change

The field type exclusions are identical. Formula fields, roll-up summary fields, auto number fields, rich text areas, and long text areas still cannot be tracked. Paying for Shield does not make a formula field trackable.

Long text and multi-select picklist behaviour is unchanged too. You still get the who and the when without the before and after values.

Tracking is still not retroactive. Field Audit Trail starts recording when you enable it, on the fields you select. It does not recover history you never captured.

And reporting is still object by object. There is no cross object field history report, with or without Shield. If your problem is that you cannot easily answer "what did this user change last month," Field Audit Trail stores more of the data you cannot easily query. It does not give you a better way to ask.

That distinction decides a lot of purchases. Field Audit Trail is a capacity and retention product. It is not a reporting product.

## Who should buy it

Buy it if you already have Shield. There is no reason to leave it off.

Buy it if you have a documented retention requirement measured in years. Regulated industries, contract and pricing history on long lived agreements, anything where an auditor will ask for records from four years ago. Nothing else on this list solves retention, and building your own archive is a bigger commitment than it looks.

Buy it if you need more than 20 fields and Shield's other capabilities are on your roadmap anyway. Encryption and event monitoring are the usual companions, and if those are coming, the field limit stops being the deciding factor.

## Who should not

Do not buy it if your only problem is the field count and you have no other use for Shield. You are buying a platform add on to move a single number from 20 to 60, and 60 is still a ceiling you can hit.

Do not buy it if your real complaint is that history is hard to read. More retention on data you cannot query does not help. What you want is a searchable view over the history, and that is a different tool.

Do not buy it expecting it to fill in the past. If the fields were not tracked, the history does not exist.

## The third option

Between "live with 20 fields" and "buy Shield" there is a managed package that records history in its own objects, outside the native mechanism.

That route removes the field ceiling and can add the searchable layer that neither native option provides, without Shield licensing. What it generally does not give you is a decade of archived history under a formal retention policy, because that is genuinely what Field Audit Trail is for.

[Unlimited Field Tracking](/products/unlimited-field-tracking) sits in this middle space: native, no field ceiling, searchable by object, field, user, or date, running inside your own org under your existing access model. If your requirement is a ten year retention mandate, Field Audit Trail is the correct purchase and we would rather say so.

[How to track more than 20 fields](/blog/track-more-than-20-fields-salesforce) covers all four routes including the build it yourself option, and [the complete guide](/blog/salesforce-field-history-tracking) covers how the native feature works underneath both.

## Sources

- [Field Audit Trail Implementation Guide](https://resources.docs.salesforce.com/210/latest/en-us/sfdc/pdf/field_history_retention.pdf), Salesforce
- [Field History Tracking Overview](https://help.salesforce.com/s/articleView?id=xcloud.tracking_field_history.htm&language=en_US), Salesforce Help
