---
title: "How to track more than 20 fields in Salesforce"
description: "Four ways past the 20 field history limit: Field Audit Trail, a Flow that writes its own records, a managed package, or pruning what you already track."
date: "2026-07-07"
author: "andre"
product: "/products/unlimited-field-tracking"
cluster: "field-history"
---

There are four ways past the 20 field per object history limit: buy Field Audit Trail, build your own tracking with Flow, install a managed package, or free up slots by pruning fields you no longer need. Nothing in Setup will raise the number on its own.

Which one fits depends on whether you also need longer retention, and on how much you want to maintain.

## Start by pruning

Before adding anything, look at what is already tracked. This costs nothing and often solves the problem outright.

Open Set History Tracking on the object and read the list. In most orgs that has been running a few years, some of those twenty came from a one off request that nobody revisited. A field that fed a dashboard that got retired. A field tracked "just in case" during an implementation. A picklist that has not changed on any record since 2023.

You can check the last one directly. Query the history object for a given field and see whether anything has been written recently:

```sql
SELECT Field, COUNT(Id)
FROM OpportunityFieldHistory
WHERE CreatedDate = LAST_N_DAYS:365
GROUP BY Field
```

Fields with no rows in a year are candidates. Untick two of those and you have room for the request that prompted this.

The catch is that untracking a field does not delete the history already recorded, but it does stop new rows. If you might want that field later, you will have a gap for the period it was off.

## Field Audit Trail

Field Audit Trail moves the limit to 60 fields per object and archives history for 10 years by default. It requires Salesforce Shield.

If your org already has Shield, this is the answer and the rest of this post is academic. Enable it, set your `HistoryRetentionPolicy` if the defaults do not suit, and move on.

If you do not have Shield, the question is whether you have a Shield shaped problem. Shield covers platform encryption and event monitoring as well as audit. Companies buy it for regulatory reasons that go well beyond field history. Buying it purely to get from 20 fields to 60 is an expensive route to a narrow outcome, and 60 is still a ceiling.

## Build it with Flow

You can write your own history records. A record triggered Flow on update, with the fields you care about compared against their prior values, writing rows to a custom object.

This works, and for two or three fields on one object it is reasonable. Before you commit to it across an org, the parts that get expensive:

You are writing DML on every qualifying update, which counts against governor limits and adds to save time on objects with heavy automation. On a high volume object during a data load, that matters.

You have to handle every path that changes data. Flows, Apex, the API, Data Loader, and integrations all bypass anything you build at the wrong layer. Record triggered Flow covers most of it, but you should confirm rather than assume.

You are maintaining field level comparison logic that has to be updated whenever someone adds a field to the list. That is a small task that never ends, and it tends to fall to whoever is least able to refuse it.

You also own the reporting layer, the storage growth, and the access model on your custom object. That last one is easy to get wrong in a way nobody notices until an audit.

For a narrow requirement, build it. For "we need proper history across our main objects," this becomes a small internal product.

## Install a managed package

A package moves history into its own objects, outside the 20 field mechanism, without Shield.

The things worth checking before you pick one: whether it runs entirely inside your org or sends data to an external service, whether it respects your existing sharing rules or exposes history more broadly than the records themselves, and whether the history is searchable or just stored.

That last point decides whether the tool actually helps day to day. Storing history is the easy half. Being able to answer "who changed the amount on this account in March" without writing SOQL is the half people care about.

[Unlimited Field Tracking](/products/unlimited-field-tracking) is our take on this. It runs natively, keeps history inside your org, follows the access model you already have, and gives you a searchable timeline by object, field, user, or date. It removes the field count ceiling. It does not archive to external storage, so if your real problem is a ten year retention mandate rather than field count, Field Audit Trail or a dedicated archiving tool is a better match.

## Choosing

If you are under the limit and want to stay there, prune first.

If you have Shield, use Field Audit Trail.

If you need history on a handful of fields and have Flow capacity, build it.

If you need broad coverage without Shield, use a package.

If your constraint is retention rather than field count, none of the first three options help and you should be looking at archiving.

More on where each limit comes from in [Salesforce field history limits](/blog/salesforce-field-history-limits), and the full picture in [the complete guide to field history tracking](/blog/salesforce-field-history-tracking).

## Sources

- [Field History Tracking Overview](https://help.salesforce.com/s/articleView?id=xcloud.tracking_field_history.htm&language=en_US), Salesforce Help
- [Field Audit Trail Implementation Guide](https://resources.docs.salesforce.com/210/latest/en-us/sfdc/pdf/field_history_retention.pdf), Salesforce
