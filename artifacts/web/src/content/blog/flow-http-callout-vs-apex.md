---
title: "Flow HTTP Callout vs Apex vs middleware"
description: "The three ways to call an external system from Salesforce, the limits on each, and the point where a Flow callout stops being the cheaper option."
date: "2026-08-07"
author: "pedro"
product: "/products/edge-connect"
cluster: "integrations"
---

Flow HTTP Callout makes REST calls from a Flow with no code and no deployment. Apex handles anything Flow cannot express, within a limit of 100 callouts per transaction and a maximum timeout of 120 seconds. Middleware moves the orchestration outside Salesforce entirely, which is worth its cost once several systems are involved.

The interesting question is where the boundaries sit, because teams tend to discover them halfway through a build.

## Side by side

| | Flow HTTP Callout | Apex | Middleware |
|---|---|---|---|
| Who builds it | Admin | Developer | Integration team |
| Deployment | Flow activation | Code deploy with tests | Platform config |
| Callouts per transaction | Governed by Apex limits | 100 | Not applicable |
| Timeout | Platform default | 10s default, up to 120s | Platform dependent |
| Complex JSON | Struggles with deep nesting | Full control | Full control |
| Retry and error handling | Basic | Whatever you build | Built in |
| Runs when Salesforce is the trigger | Yes | Yes | Yes, plus other triggers |

## Flow HTTP Callout

Configure an external service call in Flow Builder, with Named Credentials handling authentication including the OAuth handshake. No code, no deployment beyond activating the Flow.

For a simple request with a predictable response, this is the right tool and it is still underused. Sending a record to a webhook, checking an address against a validation service, fetching a status from a partner API: all straightforward.

Two things push people off it.

Response complexity. Flow struggles to model large nested JSON schemas of the kind returned by Jira, GitHub, and most modern APIs. When the useful value is four levels down inside an array of objects, you spend longer fighting the schema than the integration is worth.

Per-user Named Credentials. Each external tool needs its own Auth Provider with granular scopes, and that setup does not scale gracefully across many integrations and many users.

## Apex

Full control, and the answer whenever the declarative route runs out.

The limits to design against: a single transaction can make at most 100 callouts, the default timeout is 10 seconds, and a custom timeout can be set between 1 millisecond and 120 seconds. Anything long running belongs in an asynchronous context, and anything bulk needs batching rather than one callout per record.

The 100 callout ceiling catches people building record-by-record integrations. A trigger that fires a callout per record works in testing with three records and fails on a data load of two hundred. Batch the requests or move to an async pattern before that happens rather than after.

The durable cost is maintenance. The integration now has tests, a deployment path, and a dependency on somebody understanding it later. That is fine when the logic genuinely needs code and expensive when it did not.

## Middleware

An external platform doing the orchestration: Boomi, Workato, Jitterbit, MuleSoft, and others.

What you get that the native options do not provide: retry logic, dead letter handling, transformation between formats, monitoring across integrations, and the ability to connect systems where Salesforce is not involved at all.

What you pay: licensing, a platform to operate, and usually a specialist. [The alternatives and their costs are here](/blog/mulesoft-alternatives-salesforce).

Middleware earns this when the integration is genuinely multi-system. For Salesforce plus one other endpoint it is a large amount of machinery around a small problem.

## Where the boundary sits

Start with Flow HTTP Callout. Move when you hit one of these:

The response JSON is nested deeply enough that mapping it in Flow is painful. Go to Apex.

You need more than 100 callouts in a transaction, or per-record calls at bulk volume. Redesign for async or batch, in Apex.

You need retry, alerting, and error handling you would otherwise have to build. Consider middleware or a native integration app with logging built in.

A system that is not Salesforce needs to talk to another system that is not Salesforce. Middleware. Nothing inside Salesforce can do this.

## The middle ground

Between "build each one by hand" and "buy an integration platform" sits tooling that runs inside Salesforce and provides the parts admins keep rebuilding: a visual designer, prebuilt connectors, and request logging.

[Edge Connect](/products/edge-connect) works this way, with over 200 prebuilt connectors, a drag-and-drop designer, custom connectors written in JavaScript when nothing prebuilt fits, and full request logs so failures are traceable. It runs in your org, so there is no platform to host or secure separately.

It is scoped to integrations where Salesforce is one end. For anything else, middleware is the correct answer and this is not a substitute.

The wider comparison is in [Salesforce integration options](/blog/salesforce-integration-options).

## Sources

- [HTTP Callout Considerations and Limits](https://help.salesforce.com/s/articleView?id=platform.flow_http_callout_considerations.htm&language=en_US&type=5), Salesforce Help
- [Callout Limits and Limitations](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_callouts_timeouts.htm), Apex Developer Guide
