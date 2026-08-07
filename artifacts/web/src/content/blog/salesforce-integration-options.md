---
title: "Salesforce integration options: native, middleware, and everything between"
description: "Flow HTTP Callout, External Services, Apex, middleware, and native integration apps. What each one handles, where each one breaks, and how to choose."
date: "2026-06-05"
author: "pedro"
product: "/products/edge-connect"
cluster: "integrations"
pillar: true
---

Salesforce has five routes to an external system: Flow HTTP Callout for no-code calls, External Services for registering an API from its OpenAPI spec, Apex for anything custom, middleware platforms for orchestration across many systems, and native integration apps that run the whole thing inside your org.

The choice is usually made by whoever is available rather than by what the integration needs, which is how orgs end up with three of them running at once.

## The five routes

| Route | Who builds it | Good for | Main constraint |
|---|---|---|---|
| Flow HTTP Callout | Admin | Simple REST calls | Struggles with large nested JSON |
| External Services | Admin | APIs with an OpenAPI spec | Needs a clean spec |
| Apex | Developer | Anything | Developer time, 100 callouts per transaction |
| Middleware | Integration team | Many systems, orchestration | Cost and a platform to run |
| Native integration app | Admin | Salesforce-centred integrations | Scoped to Salesforce |

## Flow HTTP Callout

Calls an external REST API from a Flow without code. Named Credentials handle authentication, including the OAuth handshake, so credentials are not sitting in the Flow.

This is genuinely useful and underused. For "post this record to a webhook when it closes," it is the right amount of tool.

Where it gets uncomfortable is response shape. Modern APIs return deeply nested JSON, and Flow HTTP Callout struggles to model large nested schemas from services like Jira or GitHub. You end up flattening responses upstream or dropping into Apex to parse them, which defeats the point.

Per-user Named Credentials are the other rough edge. Each external tool needs its own Auth Provider with its own scopes, and the setup burden grows with every integration and every user.

## External Services

Register an OpenAPI-compliant specification for an external web service, and Salesforce generates invocable actions you can drop into Flow. Point and click, no code.

When the target API publishes a clean, current OpenAPI spec, this is the fastest route to a supported integration. When the spec is out of date, partial, or absent, you are back to Flow HTTP Callout or Apex.

That dependency is the whole story with External Services. It is excellent with cooperative APIs and unavailable with everything else.

## Apex

The escape hatch. Anything the declarative tools cannot express.

The limits to design around: a single transaction can make at most 100 callouts, the default timeout is 10 seconds, and a custom timeout can be set anywhere from 1 millisecond to 120 seconds. Long running work needs to be asynchronous, and bulk operations need batching rather than a callout per record.

The real cost is not the code. It is that the integration now lives in a codebase, needs tests, needs a deployment path, and needs someone who understands it still working there in two years. Plenty of Salesforce orgs are carrying integrations nobody can safely modify.

## Middleware

Boomi, Workato, Jitterbit, SnapLogic, Celigo, MuleSoft. A platform outside Salesforce that connects many systems and orchestrates between them.

Correct when the integration is genuinely multi-system: ERP to warehouse to Salesforce to finance, with transformation and error handling in the middle. That is what these platforms are for and they do it well.

Frequently wrong when the integration is Salesforce and one other system. You are hosting, securing, licensing, and staffing a platform to move data between two endpoints. MuleSoft in particular prices on vCores in a way that makes scaling costs hard to predict, and [the alternatives](/blog/mulesoft-alternatives-salesforce) are worth knowing before defaulting to it because it shares a logo with Salesforce.

## Native integration apps

Integration tooling that runs inside Salesforce: a designer, connectors, logging, and monitoring, without a separate platform to operate.

The tradeoff is scope. A native app is built around Salesforce being one end of every integration. If you need to move data between two systems that are not Salesforce, this is the wrong shape.

Within that scope it removes the parts that make middleware expensive: nothing to host, nothing to secure separately, and admins can build without waiting on a developer.

[Edge Connect](/products/edge-connect) is ours: a drag-and-drop designer, over 200 prebuilt connectors, custom connectors in JavaScript when a prebuilt one does not exist, templates, and request logging, all inside your org. It is not a general purpose iPaaS and does not pretend to be. If Salesforce is not on one end, use middleware.

## Choosing

Work from the shape of the problem.

One API call triggered by a record change, simple response: Flow HTTP Callout.

The target publishes a good OpenAPI spec: External Services.

Complex logic, bulk volumes, or something the declarative tools cannot express: Apex, with the callout limits in mind.

Three or more systems with orchestration and transformation between them: middleware. This is the case it earns its cost on.

Several Salesforce-centred integrations, built and maintained by admins: a native integration app.

## The pattern worth avoiding

The common failure is not picking the wrong tool once. It is picking a different tool each time, so the org accumulates a Flow calling one API, an Apex class calling another, a middleware tenant for a third, and no single place to look when something stops working at 6am.

Deciding on a default and a documented reason to deviate is worth more than getting any individual choice exactly right.

[Flow HTTP Callout vs Apex vs middleware](/blog/flow-http-callout-vs-apex) goes deeper on the three that come up most.

## Sources

- [HTTP Callout Considerations and Limits](https://help.salesforce.com/s/articleView?id=platform.flow_http_callout_considerations.htm&language=en_US&type=5), Salesforce Help
- [Callout Limits and Limitations](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_callouts_timeouts.htm), Apex Developer Guide
- [Connecting with External Systems and Data](https://help.salesforce.com/s/articleView?id=platform.flow_build_data_integrate.htm&language=en_US&type=5), Salesforce Help
