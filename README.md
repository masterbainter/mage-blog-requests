# Midwest Mage - Blog Requests

This repository stores blog topic requests for the **Midwest Mage Blog** featuring Grand Magus Alistair.

🌐 **Blog:** https://midwestmage.blog
📝 **Admin Panel:** https://admin.midwestmage.blog

---

## Purpose

This public repository serves as the source of truth for blog topic requests submitted via the admin panel. The main automation system reads from this file daily to generate blog content that incorporates your requested topics.

---

## Files

### BLOG_REQUESTS.md
The main file containing active and completed blog topic requests.

**Format:**
```markdown
## Your Requests:
- [ ] [PRIORITY:HIGH] Cover the upcoming ice fishing season
- [ ] [TODAY-ONLY] Mention my pheasant hunt success on Oct 20th
- [ ] [EXPIRES:2025-10-31] Talk about Rosebud elk hunt
```

**Tags:**
- `[PRIORITY:HIGH/NORMAL/LOW]` - Request priority
- `[TODAY-ONLY]` - Only for today's post
- `[THIS-WEEK]` - Active for this week
- `[RECURRING]` - Ongoing theme
- `[EXPIRES:YYYY-MM-DD]` - Request expires on date

---

## How It Works

1. **Submit via Admin Panel:** https://admin.midwestmage.blog
2. **Cloudflare Worker** receives request and triggers this repo's workflow
3. **GitHub Actions** adds request to BLOG_REQUESTS.md (~30 seconds)
4. **Daily Blog Generation** (12 PM Central) reads this file
5. **Claude AI** generates blog post considering active requests
6. **Published** to midwestmage.blog

---

## Why This Repo is Public

- Admin panel fetches from `raw.githubusercontent.com` (requires public access)
- No sensitive information stored here (only blog topic suggestions)
- Main automation repo remains private (contains API keys)

---

## Manual Editing

You can manually edit [BLOG_REQUESTS.md](BLOG_REQUESTS.md) directly on GitHub if needed.

**Recommended:** Use the admin panel for easier formatting and validation.

---

## Related Repositories

- **mageblog-automation** (private) - Main blog generation system
- **mageblog** (public) - Production website
- **mageblog-backups** (private) - Daily backups

Full architecture documentation: [BLOG_SYSTEM_ARCHITECTURE.md](https://github.com/masterbainter/theyearis1337/blob/master/BLOG_SYSTEM_ARCHITECTURE.md)

---

## Workflow

This repo uses GitHub Actions to automatically add requests:

- **Trigger:** `repository_dispatch` event from Cloudflare Worker
- **Action:** Run `add-request-from-webhook.js` to append to BLOG_REQUESTS.md
- **Commit:** Automated commit with request details

---

## License

This is a personal project for the Midwest Mage blog. All requests and content are for generating humorous blog posts about a fictional medieval wizard living in modern-day South Dakota.
