# Rate Limiting with Prisma

This project uses Prisma with PostgreSQL to implement rate limiting. The system is designed to:

1. Limit job creation to 3 jobs per day per IP address
2. Limit job verification to 10 verification requests per hour per IP address
3. Limit overall API usage to 100 API calls per day per IP address

## Implementation Details

### Database Model

The system uses a `RateLimit` model in the Prisma schema:

```prisma
model RateLimit {
  id        String   @id @default(cuid())
  ipAddress String
  action    String
  timestamp DateTime @default(now())
  userId    String?
  metadata  String?

  @@index([ipAddress, action])
  @@index([timestamp])
}
```

### Rate Limit Service

The rate limiting logic is implemented in `src/backend/rate-limit/rate-limit.service.ts`, which provides:

- `checkRateLimit`: Checks if a request should be rate limited
- `recordRateLimitedAction`: Records a rate-limited action
- `checkAndRecordRateLimit`: Combines the above in a single operation
- `cleanupRateLimits`: Cleans up old rate limit records

### Usage

The rate limiting is applied to:

1. Job creation in `src/app/[locale]/(jobs)/_actions/mutations/createJob.ts`
2. Job verification in `src/app/[locale]/(jobs)/_services/job-security.service.ts`
3. API endpoints in `src/app/api/llm/route.ts`

## Setting Up Cron Jobs for Cleanup

To prevent the rate limit table from growing indefinitely, we need to set up a cron job to clean up old records.

### Vercel Configuration

Add a `vercel.json` file at the root of your project with the following configuration:

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup-rate-limits",
      "schedule": "0 0 * * *"
    }
  ]
}
```

This will run the cleanup job daily at midnight (UTC).

### Security

For securing the cron endpoint:

1. Set a `CRON_SECRET` environment variable in your Vercel project settings
2. Vercel will automatically include this secret when invoking the cron job
3. For manual testing, include this header in your requests:

```
Authorization: Bearer your-cron-secret
```

### Testing

To manually test the cron endpoint, make a GET request to:

```
https://your-domain.com/api/cron/cleanup-rate-limits
```

If you've set up the `CRON_SECRET`, include the Authorization header shown above. 