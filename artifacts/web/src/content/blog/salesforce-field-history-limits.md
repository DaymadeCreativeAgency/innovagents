---
title: "Salesforce field history limits: 20 fields and 18 months"
description: "Salesforce tracks 20 fields per object and keeps history for 18 months. Here is where each limit comes from, what it excludes, and what raising it costs."
date: "2026-04-11"
author: "andre"
product: "/products/unlimited-field-tracking"
cluster: "field-history"
---

Salesforce field history tracking has two hard limits. You can track 20 fields per object, and history rows stay in your org for 18 months (24 months through the API). Field Audit Trail raises those to 60 fields and 10 years of archive, but it requires Salesforce Shield.

Most admins meet the first limit long before they think about the second.

## The 20 field limit

Twenty tracked fields per object, org wide. It is not per profile, per record type, or per page layout, and there is no setting that adjusts it.

The limit applies identically to standard and custom objects, which is what makes it bite. A custom object with 12 fields will never reach it. Opportunity, Account, and Case will, because those are the objects where several teams each have a few fields they consider non negotiable.

What usually happens is not a decision. Someone ticks the twentieth box, the next person to ask finds the picker will not let them add anything, and tracking coverage gets frozen wherever it happened to be that day. Nobody chose which fields matter most. The ordering was accidental.

Field history rows do not count against your data storage allocation, so this is not a limit protecting your storage bill. It is a platform constraint on the tracking mechanism itself.

## The 18 month limit

With Field Audit Trail off, Salesforce retains field history for 18 months in the org and up to 24 months through the API. You can pull rows in the 18 to 24 month band with Data Loader or a `queryAll()` call, but Salesforce does not guarantee that data older than 18 months is complete, so you cannot treat it as a reliable archive.

Eighteen months is shorter than the questions people ask of it. A dispute over a contract signed two years ago, a year over year audit, a customer asking when their renewal date last moved: all of those routinely fall outside the window. The rows are not archived somewhere else. They are gone.

If retention is your actual problem, note that adding tracked fields does nothing for it. These are two separate limits, and buying your way past one does not move the other unless you go to Field Audit Trail, which moves both.

## Fields the limit does not even apply to

Several field types cannot be tracked at all, and they never appear in the picker:

- Formula fields
- Roll-up summary fields
- Auto number fields
- Rich text area fields
- Long text area fields

Formula and roll-up summary fields recalculate from other data, so there is no user action to record. The workaround is to track the source fields that feed the formula.

Long text fields and multi-select picklists sit in an odd middle ground. Salesforce records that the field changed and who changed it, but not the old and new values. You learn that someone edited the terms, without learning what the terms used to say. If your audit requirement is about content rather than activity, that row will not answer it.

## What raising the limits costs

Field Audit Trail takes you to 60 fields per object and, by default, archives history after 18 months in production and keeps the archive for 10 years. Sandboxes archive after one month. You can change those numbers through the `HistoryRetentionPolicy` metadata using `archiveAfterMonths`, `archiveRetentionYears`, and `gracePeriodDays`.

It requires Shield. That is the part worth sitting with. Shield is a platform add on covering encryption and monitoring alongside audit, priced accordingly, and field history is rarely the reason a company evaluates it. If you already have Shield, enable Field Audit Trail today. If you do not, you are looking at a large purchase to fix a specific problem, and it is worth checking whether that problem is really about field count, retention, or reporting before you scope it.

[The full comparison](/blog/field-audit-trail-vs-field-history) goes through where each one actually fits.

## Working inside the limits

If you are not buying Shield, the honest options are to prioritise ruthlessly or to move tracking off the native mechanism.

Prioritising means auditing what is currently tracked, which is worth doing regardless. Tracked fields accumulate. Plenty of orgs are spending slots on fields nobody has queried in years, which came from a request in 2021 that nobody revisited.

Moving off the native mechanism means a managed package that records history in its own objects. [Unlimited Field Tracking](/products/unlimited-field-tracking) does this without Shield and without the per object ceiling. [The practical options for going past 20 fields](/blog/track-more-than-20-fields-salesforce) covers both routes, including the Flow based approach if you would rather build it yourself.

## Sources

- [Field History Tracking Overview](https://help.salesforce.com/s/articleView?id=xcloud.tracking_field_history.htm&language=en_US), Salesforce Help
- [Field Audit Trail Implementation Guide](https://resources.docs.salesforce.com/210/latest/en-us/sfdc/pdf/field_history_retention.pdf), Salesforce
