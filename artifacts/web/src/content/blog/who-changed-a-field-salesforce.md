---
title: "How to find out who changed a field in Salesforce"
description: "Four ways to find who changed a Salesforce field: the History related list, a history report, SOQL, and Setup Audit Trail. Plus what to do when nothing was tracked."
date: "2026-07-12"
author: "pedro"
product: "/products/unlimited-field-tracking"
cluster: "field-history"
---

If the field was tracked, open the record and read the History related list. It shows the user, the timestamp, and the old and new values. If it was not tracked, that change was never recorded and no tool will recover it.

That second sentence is the answer for a good share of the people who ask this question, so it is worth establishing early which situation you are in.

## Check whether the field is tracked

Setup, Object Manager, pick the object, Fields and Relationships, Set History Tracking. If the field is not ticked there, no history rows exist for it.

Tracking is not retroactive. Ticking the box now starts recording from now. It will not surface the change somebody made last Tuesday.

## The History related list

For a single record, this is the fastest route and usually the only one you need. It lives on the record page and lists each tracked change with user, date, old value, and new value.

If it is missing from the page, it is a layout problem rather than a data problem. Add the History related list to the page layout for that object.

Long text fields and multi-select picklists behave differently here. Salesforce records that the field changed and who changed it, but not the values. The row will tell you Priya edited the description on 3 March without telling you what it said before.

## A history report

When the question spans records, build a report on the object's history report type. "Accounts with Account History" and the equivalents for other objects let you filter by field, by user, and by date.

Two constraints to plan around. Report types are per object, so there is no single report covering Account history and Opportunity history together. And the report types have to exist, which for custom objects may mean creating one first.

For "which opportunities had Amount changed in the last 30 days, and by whom," this works well. For "everything this user touched last quarter," you are building several reports and stitching the results together.

## SOQL

Querying the history object directly is the most flexible option and the least pleasant to use casually.

```sql
SELECT Field, OldValue, NewValue, CreatedBy.Name, CreatedDate
FROM AccountHistory
WHERE AccountId = '001XXXXXXXXXXXXXXX'
ORDER BY CreatedDate DESC
```

Standard objects use `ObjectHistory` naming, so `AccountHistory` and `CaseHistory`. Custom objects use the object name with a `__History` suffix, so `Invoice__c` becomes `Invoice__History`.

To reach rows in the 18 to 24 month band you need `queryAll()` rather than a standard query, and Salesforce does not guarantee that data past 18 months is complete. Anything older than that is gone unless you have Field Audit Trail.

## When the change was not to a field

If nobody changed a record but something about the org changed, you want Setup Audit Trail instead. It records configuration changes: who edited a validation rule, changed a profile, modified a field definition, deployed metadata.

The two get confused often enough to be worth stating plainly. Field history answers "who changed the data on this record." Setup Audit Trail answers "who changed how the org works." A value that suddenly looks wrong across many records is more often the second than the first.

## When nothing was tracked

This is the uncomfortable case, and there is no clean recovery. Some partial routes, in rough order of how often they help:

Check whether the record has related activity, a Chatter feed entry, or a case comment from around the time. People frequently narrate changes they made, even when the system did not record them.

Check Setup Audit Trail for a metadata or automation change that could have altered the value indirectly. An updated validation rule or a modified Flow can move data without any single user editing the record.

Check whether a data load ran. If the change hit many records at once, it was probably an integration or a Data Loader job rather than a person, and the job's own logs may have what you need.

If none of that lands, the honest answer is that the change is not recoverable, and the useful thing to do is turn tracking on so the next occurrence is.

## Making the next one easier

Two habits prevent most repeats of this problem.

Turn tracking on before anyone asks. It is free, the rows do not count against data storage, and it only helps going forward, so waiting has no upside. The main thing standing in the way is the 20 field per object ceiling, which is covered in [Salesforce field history limits](/blog/salesforce-field-history-limits).

Make the history searchable. Storing history and being able to interrogate it are different problems, and Salesforce solves the first well and the second poorly. [Unlimited Field Tracking](/products/unlimited-field-tracking) puts a filterable timeline over field changes by object, field, user, or date period, which turns most of the questions above into one lookup instead of a report build.

For how the underlying feature works, see [the complete guide to Salesforce field history tracking](/blog/salesforce-field-history-tracking).

## Sources

- [Field History Tracking Overview](https://help.salesforce.com/s/articleView?id=xcloud.tracking_field_history.htm&language=en_US), Salesforce Help
- [Field Audit Trail Implementation Guide](https://resources.docs.salesforce.com/210/latest/en-us/sfdc/pdf/field_history_retention.pdf), Salesforce
