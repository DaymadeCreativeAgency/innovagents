---
title: "Chatter announcements: what they can and cannot do"
description: "Chatter announcements are scoped to a group, allow 5,000 characters, show about 137 of them, and support no rich text. Where that works and where it does not."
date: "2026-04-29"
author: "pedro"
product: "/products/splash-announcements"
cluster: "communication"
---

A Chatter announcement is a post pinned to the top of a single Chatter group. It allows up to 5,000 characters, displays roughly 137 of them on the group page, supports links and mentions but not rich text, and can only be posted by group owners, group managers, or users with Modify All Data.

That set of constraints decides what it is good for, which is narrower than most admins expect when they first reach for it.

## The group scope

An announcement lives in a group. To see it, a user has to be a member of that group and has to visit it.

That is the constraint everything else follows from. There is no org wide Chatter announcement. If you need every user to see something, you need every user in a group, and you need them to go and look at it.

Group membership is rarely complete and never current. New joiners are not added, leavers are not removed, and the people who most need a message about a process change are frequently the ones who never joined the group in the first place.

## The 137 characters

The 5,000 character limit sounds generous. The display limit matters more: roughly 137 characters appear on the group page, with the rest behind a click.

So the effective message is about a sentence. Anything longer depends on a user choosing to expand it, and most do not. If your announcement needs three sentences of context before the instruction makes sense, the instruction is the part nobody reads.

## No rich text

Announcements do not support rich text. Links and mentions work, formatting does not.

There is a specific trap here worth knowing. If you edit the underlying feed post to add rich text, the edits do not apply to the announcement card. You end up with a formatted post and an unformatted announcement showing different things, and no error to tell you.

For a message that needs a numbered sequence of steps, or emphasis on the one field that changed, plain text at 137 visible characters is a poor container.

## Who can post

Group owners, group managers, and users with Modify All Data.

Modify All Data is a broad permission that most admins are right to keep tightly held. In practice that means announcements come from whoever happens to own the group, which is often not the person who owns the change being announced.

## Where announcements work well

They are a good fit for a message aimed at a team that already uses its group, where seeing it is useful but not required, and where nothing breaks if some people miss it.

A sales team group where the manager posts the quarter's focus. A project group flagging a deadline. Community and engagement work generally, which is what Chatter was built for.

The pattern is that Chatter is opt in, and announcements inherit that. Opt in is fine for information and wrong for instruction.

## Where they do not

Anything you need to be able to prove people saw.

Release day changes, where users need to know a field moved before they go looking for it. Compliance messages requiring acknowledgement. Outage and maintenance windows. Policy changes with a date attached.

For those, the questions are whether the message reached everyone and whether you can show who read it, and Chatter announcements answer neither. There is no acknowledgement tracking, no delivery guarantee beyond group membership, and no report of who saw what.

## The alternatives

Custom Notifications through Notification Builder send to the notification bell on desktop and mobile, triggered from Flow, addressed by user, group, queue, or team. Better reach than a group post. Still transient, and still no acknowledgement record.

Email reaches everyone and gets ignored at scale, which is the problem most admins are trying to escape when they start looking at Chatter.

In-app guidance can put a prompt in front of users inside the app, which is closer to the right shape, though it is built for feature adoption rather than announcements.

[How to notify all Salesforce users of a change](/blog/notify-all-salesforce-users) compares these properly.

[Splash Announcements](/products/splash-announcements) takes the other approach: announcements shown at login rather than waiting to be found, targeted by profile, permission set, queue, or public group, with acknowledgement tracked in real time. It is a heavier tool than a Chatter post, and for a message to one team that already uses its group, a Chatter announcement is genuinely the simpler answer.

More on the wider problem in [Salesforce release communication](/blog/salesforce-release-communication).

## Sources

- [Post an Announcement to a Chatter Group](https://help.salesforce.com/s/articleView?id=experience.collab_group_announcement.htm&language=en_US&type=5), Salesforce Help
- [Make Announcements for Your Salesforce Org (That Won't Be Ignored!)](https://www.salesforceben.com/how-to-make-important-salesforce-announcements-for-your-org-that-wont-be-ignored/), Salesforce Ben
