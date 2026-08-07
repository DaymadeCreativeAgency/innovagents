---
title: "Salesforce field history tracking: the complete guide"
description: "How Salesforce field history tracking works, the 20 field and 18 month limits, which field types it ignores, and what to do when the native version runs out."
date: "2026-05-12"
author: "pedro"
product: "/products/unlimited-field-tracking"
cluster: "field-history"
pillar: true
---

Salesforce field history tracking records who changed a field, when they changed it, and what the value was before and after. You switch it on per object and pick which fields to watch. You get 20 fields per object, and the rows stay in your org for 18 months. Those two numbers are where most admins eventually hit a wall.

This covers what the feature does, where it stops, and which of the usual workarounds are worth the effort.

## What it stores

When you enable tracking on a field, Salesforce writes a row to that object's history table every time the value changes. Each row holds the record, the field, the old value, the new value, the user who made the change, and a timestamp.

Standard objects have their own history tables, like `AccountHistory` and `OpportunityHistory`. Custom objects get one named after the object, so `Invoice__c` produces `Invoice__History`.

Two things about these rows that catch people out. They are read only, so you cannot edit or backfill them. And they do not count against your data storage allocation, which means the 20 field ceiling is not there to protect your storage bill. It is a platform limit, and it applies whether you are tracking one field or twenty.

## Turning it on

Tracking is a two step process, and skipping the second step is the most common reason admins think the feature is broken.

First, enable history tracking on the object. In Setup, open Object Manager, pick the object, go to Fields and Relationships, and choose Set History Tracking. For custom objects there is a checkbox on the object definition itself to allow history tracking before the field list appears.

Second, select the individual fields. Enabling the object does nothing on its own. Salesforce only starts writing rows for fields you tick.

Tracking is not retroactive. Changes made before you ticked the box are gone, and no amount of configuration afterwards will bring them back. If you are standing up a new org, or you know a field is going to matter for audit later, turn it on early even if nobody is asking for the data yet.

## The 20 field ceiling

Each object allows 20 tracked fields. Not 20 per profile, not 20 per record type: 20 for the object, org wide.

On a small custom object that is plenty. On Opportunity, where finance wants stage and amount and close date, sales ops wants owner and forecast category, and someone in RevOps has added six custom fields that feed a dashboard, twenty goes quickly. The moment you cross it, tracking becomes a negotiation about whose audit requirement matters less.

Field Audit Trail raises the ceiling to 60 fields per object, which is a real increase, though it needs Salesforce Shield. There is more detail on that tradeoff in [Field Audit Trail vs standard field history tracking](/blog/field-audit-trail-vs-field-history), and the practical options for staying under the limit are in [how to track more than 20 fields in Salesforce](/blog/track-more-than-20-fields-salesforce).

## What you cannot track at all

Some field types are excluded, and Salesforce will not offer them in the field picker:

- Formula fields
- Roll-up summary fields
- Auto number fields
- Rich text area fields
- Long text area fields

Formula and roll-up summary fields are recalculated from other data, so a history row would record a derived value rather than an action a person took. If you need history on a formula result, track the fields that feed it instead.

There is also a partial case worth knowing about. For long text fields and multi-select picklists, Salesforce can record that a change happened and who made it, but it does not store the before and after values. You get the who and the when without the what. For a compliance conversation about a contract terms field, that gap is usually the whole question.

## How long the data lasts

With Field Audit Trail switched off, Salesforce keeps field history for 18 months in the org and up to 24 months through the API. Data Loader or a `queryAll()` call can pull rows in that 18 to 24 month window, but Salesforce does not guarantee that data past 18 months is complete.

That is a shorter horizon than most people assume. Annual audits, multi year contract disputes, and any question that starts with "when did this account actually change owner" tend to land outside it. By the time somebody asks, the rows are gone.

With Field Audit Trail enabled, the default policy archives data after 18 months in production and after one month in a sandbox, then keeps the archive for 10 years. You can override those defaults through the `HistoryRetentionPolicy` metadata, which takes `archiveAfterMonths`, `archiveRetentionYears`, and `gracePeriodDays`, deployed with the Salesforce CLI or another Metadata API client.

## Reading the history

The History related list on the record page is the built in view, and for a single record it is fine. Beyond that it gets awkward fast.

Reporting works through report types built on the history objects, one object at a time. There is no supported way to write a single report that spans Account history and Opportunity history together. If your question is "show me every field change this user made last quarter," you are building several reports and reconciling them by hand, or you are querying the history objects directly through SOQL.

The related list is also per record. Nothing in the standard UI answers "which records had this field changed in the last 30 days" without a report or a query behind it. [Finding out who changed a field](/blog/who-changed-a-field-salesforce) walks through the options for that specific question, including the case where tracking was never turned on.

## Field Audit Trail

Field Audit Trail is the Salesforce answer to both limits. It moves you to 60 fields per object and 10 years of archived history, and it requires Shield.

For orgs in regulated industries that already own Shield, turning it on is straightforward and the right call. For everyone else, the calculation is different, because Shield is priced as a platform add on and field history is usually not the reason anybody was considering it. Buying Shield to solve a 20 field problem is a large purchase aimed at a small target.

## When the native version stops working

The native feature is well built for what it covers. It falls down in three specific situations, and they are worth naming because each has a different answer.

You need more than 20 fields on one object. This is the most common, and the honest options are Field Audit Trail, a managed package, or cutting fields you actually wanted.

You need history older than 18 months. Retention is the constraint here, not field count, and Field Audit Trail or an archiving tool addresses it.

You need to search across the history rather than read it one record at a time. This is a reporting problem rather than a limits problem, and it usually gets solved with report types, SOQL, or a package that puts a searchable view on top.

[Unlimited Field Tracking](/products/unlimited-field-tracking) covers the first and third of those without Shield. It runs inside your org and follows the access model you already have, so history is visible to the people who can already see the record. Whether that is the right answer depends on which of the three problems you actually have, and if yours is a retention question, an archiving tool is a better fit than we are.

## Sources

- [Field History Tracking Overview](https://help.salesforce.com/s/articleView?id=xcloud.tracking_field_history.htm&language=en_US), Salesforce Help
- [Field Audit Trail Implementation Guide](https://resources.docs.salesforce.com/210/latest/en-us/sfdc/pdf/field_history_retention.pdf), Salesforce
- [Salesforce Field History Tracking](https://www.salesforceben.com/salesforce-field-history-tracking/), Salesforce Ben
