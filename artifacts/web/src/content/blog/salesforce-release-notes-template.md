---
title: "A Salesforce release notes template for admins"
description: "A copy-and-paste release notes template written for users rather than admins, with the short in-app version, and notes on what to cut from each release."
date: "2026-08-02"
author: "andre"
product: "/products/splash-announcements"
cluster: "communication"
---

Most Salesforce release notes are written from the deployment's point of view and read like a changelog. Users skip them. The version below is organised by who is affected and what they need to do, with the action first.

Copy it, delete the sections that do not apply, and keep it to one screen.

## The template

```
Salesforce release: [date]

WHAT CHANGES FOR YOU
[One sentence per audience. Lead with the verb.]
- Sales: Close Date is now required before you can move an
  Opportunity to Negotiation.
- Support: the Priority field has moved to the top of the Case
  layout.
- Everyone else: no change.

WHEN
[Date and time, with the timezone. Say whether there is downtime.]
Live from Tuesday 14 October, 6pm UTC. No downtime expected.

WHAT YOU NEED TO DO
[Only list things requiring user action. If nothing, say "Nothing".]
- Nothing before the release.
- After: clear any saved Opportunity list views that filter on
  Close Date being blank, since they will return no records.

WHY
[Two sentences maximum. This is the section users skip, so it goes
near the bottom.]
Deals were reaching Negotiation without a forecastable date, which
made the pipeline report unreliable.

IF SOMETHING LOOKS WRONG
[Named person or channel, not a generic inbox.]
Message #salesforce-help or contact [name].

NOT CHANGING
[Optional. Useful when rumour has outrun the release.]
Nothing about how quotes are approved has changed.
```

## The short version

The template above is the email or wiki version. The in-app version has to survive a much smaller space, and users read roughly the first line of anything.

```
Close Date is now required at Negotiation.
Live Tuesday 6pm. Clear any list views filtering on blank Close Dates.
```

Two lines, the action first. If your channel truncates, as Chatter announcements do at roughly 137 visible characters, the first line still carries the message.

## Why the order matters

Users read the first sentence and stop. Everything after it is for the minority who want detail, so putting the rationale first spends the only attention you have on the part nobody needed.

The section that gets cut most often and should not is "what you need to do". Admins tend to assume the implication is obvious. It is obvious to the person who built the change, and to nobody else.

"Not changing" is worth keeping when a release has been discussed in advance. Rumour fills gaps, and a release that touches Opportunity often gets read as touching everything nearby.

## What to cut

Internal identifiers. Ticket numbers, sprint names, and deployment IDs mean nothing to users and make the note look like it was written for somebody else, which it was.

Anything that did not change for a user. Backend refactors, permission cleanups, and automation rewrites belong in your internal record, not in the announcement.

Screenshots of Setup. Show the user's view, not the admin's.

Praise for the team. It reads as filler to the audience being asked to change their workflow, and it belongs somewhere else.

## Running it

Write the note before you deploy, not after. If you cannot describe the user impact in one sentence, that is worth knowing while there is still time to reconsider the change.

Send it more than once through more than one channel: advance notice by email, the short version in-app on the day. Repetition is not clutter when the alternative is a support queue.

Keep an archive. "When did Close Date become required" is a question that arrives months later, and a dated set of notes answers it in seconds.

Do not activate an update in production before the metadata, the permissions, and the user communication are all ready. The communication is the part that slips, because it is the only one that does not throw an error when it is missing.

## Getting it in front of people

The template solves the writing. The delivery is a separate problem, and covered in [how to notify all Salesforce users of a change](/blog/notify-all-salesforce-users) and [Salesforce release communication](/blog/salesforce-release-communication).

For release day specifically, [Splash Announcements](/products/splash-announcements) shows the short version at login, targeted to the affected profiles or permission sets, and tracks who acknowledged it. That last part is useful when a release changes a required field and you want to know whether the sales team saw it before the first deal stalls.

## Sources

- [Manage and Release Changes with DevOps Center](https://help.salesforce.com/s/articleView?id=platform.devops_center_overview.htm&language=en_US&type=5), Salesforce Help
- [Top 7 Salesforce Release Management Best Practices](https://www.flosum.com/blog/top-7-salesforce-release-management-best-practices), Flosum
