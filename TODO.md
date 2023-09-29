# Learning day plan

Build a team picker using React and Next.js.

## Basic requirements

- Create teams
- Add and remove members from teams
- Pick a team member and prompt whether they should accept
- Keep track of how many times a person has been picked and use this as probability for next pick
- A user cannot be picked twice in a row
- Must be a RES authenticated user
- Deploy using a CI/CD pipeline

## Stretch goals

- Connect to a basic backend with a database to store state

## Blob store database?

```json
{
  "LastPick": "Kieran",
  "Team": {
    "Kieran": 2,
    "Juan": 4,
    "Eddie": 5,
    "Callum": 3
  }
}
```
