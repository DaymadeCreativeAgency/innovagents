---
title: "Salesforce release communication: telling users what changed"
description: "Every channel for announcing a Salesforce change, what each one reaches, which ones can prove people saw it, and how to run release comms that users act on."
date: "2026-05-30"
author: "andre"
product: "/products/splash-announcements"
cluster: "communication"
pillar: true
---

Salesforce gives you five ways to tell users something changed: email, Chatter announcements, Custom Notifications, in-app guidance, and login-time announcements. They differ on reach, on whether the message interrupts or waits to be found, and on whether you can show afterwards who saw it.

Most orgs use email because it is familiar, then wonder why nobody knew about the change.

## The channels

| Channel | Reach | Interrupts | Acknowledgement |
|---|---|---|---|
| Email | Everyone | No | Open tracking at best |
| Chatter announcement | Group members who visit | No | No |
| Custom Notification | Addressable by user, group, queue, team | Bell only | No |
| In-app guidance | Users on the relevant page | Yes | No |
| Login announcement | Everyone targeted | Yes | Yes, if the tool tracks it |

## Email

Reaches everybody and is ignored at volume. The message competes with everything else in an inbox, arrives when the user is not in Salesforce, and is unfindable a week later when someone needs it.

Email works for advance notice: a heads up a week before a change, where the goal is awareness rather than action. It does not work as the thing standing between a user and a workflow that no longer behaves as they expect.

## Chatter announcements

Pinned to the top of a single Chatter group. Up to 5,000 characters, of which roughly 137 display before a click, no rich text, and posting is limited to group owners, group managers, and users with Modify All Data.

The scope is the issue. A user has to be in the group and has to visit it. That is fine for a team update and wrong for anything mandatory. [The full set of constraints is here](/blog/chatter-announcements-limitations).

## Custom Notifications

Notification Builder, in Setup, defines a notification type; a Flow sends it with the Send Custom Notification action. Recipients can be a user, a group, a queue, an Account Team, or an Opportunity Team. The message lands in the notification bell on desktop and in the mobile app.

Limits worth planning around: an org can run up to 10,000 notification actions per hour, and a single notification can address up to 10,000 users.

Better reach than Chatter, and it goes to people rather than to places they might visit. It is still transient. A notification dismissed is gone, and there is no record of who read it.

## In-app guidance

Prompts and floating panels shown inside the app on specific pages. Well suited to "this field moved, here is where it went" because it appears in context at the moment of confusion.

It is built for feature adoption and onboarding rather than announcements, so it is a good fit for a small number of durable messages and an awkward one for a weekly release note.

## Login announcements

A message shown when the user logs in, before they get on with their work. This is the only pattern that reliably reaches people who do not read email and do not visit Chatter groups, because it does not depend on the user going anywhere.

Salesforce has no native version of this. It comes from AppExchange packages, [Splash Announcements](/products/splash-announcements) among them.

## Picking a channel

Match the channel to what happens if the message is missed.

Nothing happens: email or Chatter. Awareness is enough, and interrupting people has a cost.

Someone is confused for a few minutes: Custom Notification or in-app guidance. Present at the right moment, no ceremony.

Someone does the wrong thing, or you need to prove they were told: a login announcement with acknowledgement tracking. This is the compliance and release day case, and the other four channels cannot answer the question an auditor will ask.

## Running release comms that work

Send it more than once, through more than one channel. An email a week out, a login announcement on the day, and an in-app prompt on the page that changed. Repetition is not clutter when the alternative is a support queue.

Write the instruction first. Users read the first sentence. Put what they need to do at the front and the reasoning after it, which is the opposite of how most change announcements are drafted.

Say what changed for the user, not what changed in the org. "The Close Date field is now required on Stage 4" is actionable. "We deployed the Q3 pipeline enhancement" is not.

Separate the announcements by audience. A change affecting twelve people in finance does not need to interrupt the whole org, and interrupting everyone for everything is how people learn to dismiss without reading. Targeting by profile, permission set, queue, or public group keeps that credibility intact.

Track acknowledgement where it matters. Not for everything, because that is exhausting, but for the changes with a compliance or process consequence. Knowing that 60 percent of the affected users have seen a message changes what you do next.

[A release notes template](/blog/salesforce-release-notes-template) covers the writing itself, and [how to notify all Salesforce users](/blog/notify-all-salesforce-users) goes into the mechanics of each channel.

## Where this lands

Most release communication problems are not tooling problems. They are a message written for the person who built the change rather than the person affected by it, sent once, through a channel people were never going to read.

Fix the writing first, because it is free. Then match the channel to the consequence. [Splash Announcements](/products/splash-announcements) covers the login-time case with audience targeting and acknowledgement tracking, running natively inside your org. For a heads up nobody needs to act on, an email is still the right tool and costs nothing.

## Sources

- [Send Custom Notifications with Notification Builder](https://help.salesforce.com/s/articleView?id=sf.connected_app_notifications_custom.htm&language=en_US), Salesforce Help
- [Post an Announcement to a Chatter Group](https://help.salesforce.com/s/articleView?id=experience.collab_group_announcement.htm&language=en_US&type=5), Salesforce Help
- [Send a Custom Notification with a Flow](https://help.salesforce.com/s/articleView?id=platform.automate_flow_build_example_send_custom_notification.htm&language=en_US&type=5), Salesforce Help
