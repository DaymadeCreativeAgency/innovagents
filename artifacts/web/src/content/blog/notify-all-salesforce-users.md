---
title: "How to notify all Salesforce users of a change"
description: "Five ways to reach every user in your org, from mass email to Custom Notifications to login announcements, with the reach and limits of each one."
date: "2026-07-25"
author: "pedro"
product: "/products/splash-announcements"
cluster: "communication"
---

To reach every user in a Salesforce org you have five options: mass email, a Chatter announcement in a group everyone belongs to, a Custom Notification sent from Flow, in-app guidance, or a login announcement from an AppExchange package. Only the last of those reliably reaches people who ignore email and never open Chatter.

Here is what each one actually does.

## Mass email

Reaches every address you hold. Costs nothing and requires no build.

It also arrives outside Salesforce, competes with the rest of an inbox, and is gone from view within a day. Open tracking, where you have it, tells you a message was rendered rather than read.

Use it for advance notice. Do not use it as the only warning before a change that will confuse people.

## Chatter announcement

Pin a post to the top of a Chatter group. Reaches group members who visit the group.

To use this org wide you need a group everybody is in, and you need people to go there. Both are unreliable. Membership drifts as people join and leave, and Chatter adoption in most orgs is partial at best.

The display limit compounds it: about 137 characters show before a click, with no rich text. [More on the constraints](/blog/chatter-announcements-limitations).

## Custom Notifications from Flow

The strongest native option.

Define a notification type under Setup, Notification Builder, Custom Notifications. Then send it from a Flow using the Send Custom Notification action. Recipients can be specified by user ID, group ID, queue ID, Account Team, or Opportunity Team. It arrives in the notification bell on desktop and in the mobile app.

The limits: 10,000 notification actions per hour for the org, and up to 10,000 recipients per notification. For most orgs neither binds, but a large org sending per user notifications in a loop can hit the hourly figure.

To reach everyone, send to a public group containing all users, and keep that group maintained. This is genuinely good for time sensitive messages. What it does not do is persist or record acknowledgement. A dismissed notification leaves no trace, and there is no report of who saw it.

## In-app guidance

Prompts shown inside the app, targeted to specific pages and audiences. It appears where the change is, which makes it the best option for "this field moved" messages.

It is scoped to the pages you configure, so it is not a general broadcast tool, and there is no acknowledgement record.

## Login announcements

A message presented when the user logs in. It reaches everyone targeted because it does not rely on the user going anywhere or reading anything outside Salesforce.

There is no native Salesforce feature for this; it comes from AppExchange packages. The useful ones let you target by profile, permission set, queue, or public group so that a change affecting one team does not interrupt the whole org, and they record acknowledgement so you can tell who has seen it.

[Splash Announcements](/products/splash-announcements) is our version, running natively with real time acknowledgement tracking. It is the heaviest option on this list, and that is the point: it is for messages where being missed has a consequence. For a routine heads up, an email is fine.

## Choosing quickly

Advance notice, nobody needs to act: email.

Time sensitive, users are working in Salesforce now: Custom Notification from Flow.

A specific page or field changed: in-app guidance.

Mandatory, or you need to prove it was seen: login announcement with acknowledgement.

Team level information, low stakes: Chatter announcement.

## The mistake worth avoiding

Sending everything through the loudest channel available.

If every change interrupts everybody, users learn to dismiss the interruption without reading, and the one message that mattered goes the same way as the rest. Targeting is what keeps the channel worth anything. A change affecting twelve people in finance should reach twelve people in finance.

That is also the argument for having more than one channel configured. Not every message deserves the same treatment, and picking per message is the difference between people reading your announcements and people learning to close them.

More on running this properly in [Salesforce release communication](/blog/salesforce-release-communication), and on the writing itself in [a Salesforce release notes template](/blog/salesforce-release-notes-template).

## Sources

- [Send Custom Notifications with Notification Builder](https://help.salesforce.com/s/articleView?id=sf.connected_app_notifications_custom.htm&language=en_US), Salesforce Help
- [Send Custom Notification Action](https://help.salesforce.com/s/articleView?language=en_US&id=flow_ref_elements_actions_sendcustomnotification.htm&type=0), Salesforce Help
