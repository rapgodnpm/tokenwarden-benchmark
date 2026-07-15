# API route validation fix

**In short:** The model must make an API route reject bad requests without breaking successful ones.

## What happens

The fixture adds a `POST` route that parses JSON and creates a user. It already rejects an invalid email, but malformed JSON throws and a request without `name` is accepted.

The model must keep the route's existing shape and response format while handling both cases correctly.

## What it measures

Targeted API debugging, defensive JSON parsing, input validation, and preserving existing success behavior.

## How it passes

`node --test bench-targets/next-api/route.test.mjs` must show that malformed JSON and missing required fields return `400`, while a valid user returns the unchanged `201` response.

Primary file: `bench-targets/next-api/app/api/users/route.mjs`.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
