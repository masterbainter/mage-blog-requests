#!/usr/bin/env node

/**
 * Adds a blog request from GitHub Actions webhook
 * Usage: node add-request-from-webhook.js "formatted request string"
 */

const fs = require('fs');
const path = require('path');

const REQUESTS_FILE = path.join(__dirname, 'BLOG_REQUESTS.md');

function addRequest(formattedRequest) {
    // Read current file
    let content = fs.readFileSync(REQUESTS_FILE, 'utf8');

    // Find the "Your Requests:" section and "Completed Requests" section
    const yourRequestsMarker = '## Your Requests:';
    const completedRequestsMarker = '## Completed Requests';

    const yourRequestsIndex = content.indexOf(yourRequestsMarker);
    const completedRequestsIndex = content.indexOf(completedRequestsMarker);

    if (yourRequestsIndex === -1 || completedRequestsIndex === -1) {
        console.error('❌ Could not find markers in BLOG_REQUESTS.md');
        process.exit(1);
    }

    // Find where to insert (before "---" that precedes Completed Requests)
    const insertPoint = content.lastIndexOf('---', completedRequestsIndex);

    if (insertPoint === -1) {
        console.error('❌ Could not find insertion point');
        process.exit(1);
    }

    // Insert the new request
    const before = content.substring(0, insertPoint);
    const after = content.substring(insertPoint);

    const newContent = before + formattedRequest + '\n\n' + after;

    // Write back to file
    fs.writeFileSync(REQUESTS_FILE, newContent, 'utf8');

    console.log('✅ Added request successfully!');
    console.log(`📝 ${formattedRequest}`);
}

// Get request from command line
const request = process.argv[2];

if (!request) {
    console.error('❌ No request provided');
    console.error('Usage: node add-request-from-webhook.js "- [ ] Your request"');
    process.exit(1);
}

addRequest(request);
