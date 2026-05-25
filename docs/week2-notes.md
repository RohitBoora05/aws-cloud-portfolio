# AWS Cloud Portfolio — Week 2 Notes

## Overview

Week 2 covers two things that run in parallel:

1. **AWS Infrastructure** — creating an S3 bucket, enabling static website hosting, and putting CloudFront in front of it for HTTPS
2. **Portfolio Frontend** — building the actual React portfolio page with real content, animations, and a proper design before deploying it publicly

The guide's original Week 2 deploys a near-empty React page with just a name and title. We did not do that. The reasoning: Week 2 puts your portfolio at a live public HTTPS URL. What goes up is what the world sees. So we built the full portfolio first, then deployed it.

---

## Region Decision

The guide uses `eu-west-1` (Ireland) throughout. We switched to `ap-south-1` (Mumbai) from Week 2 onwards because it is the closest AWS region to India and reduces latency for visitors.

> **Important:** All AWS CLI commands from this point use `ap-south-1`. If you copy commands from the original guide, replace `eu-west-1` with `ap-south-1` everywhere.

---

## Part A — Building the Portfolio Frontend

Before touching AWS, we spent time building the actual portfolio page. This was done iteratively through conversation — collecting real content first, then building the component, then refining it.

---

### 2.A.1 — Content Collection

We collected all portfolio content before writing a single line of code. The order was:

1. Name and role — Rohit Boora, Cloud Engineer & AI Developer
2. About section — written in own words, polished into professional copy
3. What I Do — two specializations with honest student framing
4. Experience timeline — 8 milestones from Q4 2024 to Q2 2026
5. Projects — 4 projects with GitHub links and status
6. Tech Stack — 9 categories covering all tools
7. Connect section — GitHub, LinkedIn, email

> **Why collect content first:** Every portfolio that skips this step ends up with placeholder text that never gets replaced. Real content also shapes the design — you cannot design a layout without knowing how much text goes in it.

---

### 2.A.2 — Replacing index.css

The Vite scaffold generates a default `index.css` with opinionated styles. The problem was the `#root` selector had a fixed `width: 1126px` with `border-inline` which was constraining the entire app to a narrow column on a wide screen. It also had light/dark mode variables that conflicted with our custom dark theme.

We replaced the entire file with a clean reset:

```bash
cat > ~/aws-cloud-portfolio/frontend/src/index.css << 'EOF'
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  width: 100%;
  min-height: 100vh;
  background: #0A0A0F;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  font-size: 20px;
}
EOF
```

**Verify:**

```bash
cat ~/aws-cloud-portfolio/frontend/src/index.css
```

> **Gotcha:** If the portfolio looks narrow or has a thin border running down the sides, the old `index.css` is still active. Replace it completely — do not try to patch individual rules on top of the old file.

---

### 2.A.3 — Writing Home.jsx

The entire portfolio lives in a single `Home.jsx` file at `frontend/src/pages/Home.jsx`. It is a self-contained React component with all styles written inline — no external CSS library, no Tailwind, no component library. This keeps it portable and avoids dependency issues during the AWS build step.

**What the component includes:**

- Fixed navbar with active section tracking and always-on purple glow on active tab
- Hero section with name, role, staggered load animations, and photo slot
- About section with the full written bio
- What I Do — two cards for AI Developer and Cloud Engineer
- Experience — animated timeline where each entry slides in from the left as you scroll
- Projects — 4 cards with status badges, tags, GitHub links, hover lift and glow
- Tech Stack — 4 infinite auto-scrolling carousels, alternating direction, pauses on hover
- Connect section — GitHub, LinkedIn, email link cards
- Scroll reveal animations on every section using IntersectionObserver

**Design decisions:**

- Dark background `#0A0A0F`
- Blue/purple accent `#7C6FD4` and `#A78BFA`
- Fonts: Syne (headings) + DM Sans (body) via Google Fonts
- Max content width: `1280px`
- Section padding: `4rem` horizontal

**To write the file from terminal without syntax errors:**

```bash
nano ~/aws-cloud-portfolio/frontend/src/pages/Home.jsx
```

Open nano, paste the full component code, then:
- `Ctrl + O` to save
- `Enter` to confirm filename
- `Ctrl + X` to exit

> **Gotcha:** Do not try to paste JSX directly into the terminal as a bash command — bash will try to execute it and throw syntax errors immediately. Always use nano or a text editor. Learned this from Week 1.

> **Gotcha:** After pasting into nano, always verify the first and last lines look correct before saving. A partial paste is the most common failure here.

**Verify the file exists and has content:**

```bash
wc -l ~/aws-cloud-portfolio/frontend/src/pages/Home.jsx
```

Should print a number above 300. If it prints a small number, the paste was incomplete.

---

### 2.A.4 — Update App.jsx

Make sure `App.jsx` imports and renders the Home component:

```bash
cat > ~/aws-cloud-portfolio/frontend/src/App.jsx << 'EOF'
import Home from "./pages/Home";

function App() {
  return <Home />;
}

export default App;
EOF
```

---

### 2.A.5 — Add the Profile Photo

The hero section has a photo slot that shows a placeholder "RB" badge until `profile.jpg` is present in `frontend/public/`. Once the file exists, it renders automatically — no code change needed.

The photo was cropped to portrait orientation (400×600px) centered on the face before placing it.

**On WSL, Windows Downloads are accessible at `/mnt/c/Users/`:**

```bash
cp /mnt/c/Users/rohit/Downloads/profile.jpg \
  ~/aws-cloud-portfolio/frontend/public/profile.jpg
```

**Verify:**

```bash
ls -lh ~/aws-cloud-portfolio/frontend/public/profile.jpg
```

Expected output: file exists, size around 50–100KB.

> **Gotcha:** The first attempt used `~/Downloads/profile.jpg` which does not exist in WSL — Downloads lives under `/mnt/c/Users/rohit/Downloads/` because it is a Windows folder. WSL mounts the Windows filesystem under `/mnt/c/`.

---

### 2.A.6 — Layout and Font Size Adjustments

After loading the portfolio locally at `http://localhost:5173`, several visual adjustments were made:

**Increase content width** — the default `900px` max-width felt narrow on a laptop:

```bash
sed -i 's/900px/1280px/g' \
  ~/aws-cloud-portfolio/frontend/src/pages/Home.jsx
```

**Increase nav and section padding:**

```bash
sed -i 's/padding: "0 2rem"/padding: "0 4rem"/g' \
  ~/aws-cloud-portfolio/frontend/src/pages/Home.jsx
sed -i 's/padding: "5rem 2rem"/padding: "5rem 4rem"/g' \
  ~/aws-cloud-portfolio/frontend/src/pages/Home.jsx
```

**Increase photo size:**

```bash
sed -i 's/width: "200px", height: "240px"/width: "320px", height: "380px"/g' \
  ~/aws-cloud-portfolio/frontend/src/pages/Home.jsx
```

**Increase body text size:**

```bash
sed -i 's/fontSize: "15px", color: MUTED/fontSize: "17px", color: MUTED/g' \
  ~/aws-cloud-portfolio/frontend/src/pages/Home.jsx
sed -i 's/fontSize: "15px", color: "#B0B0C8"/fontSize: "17px", color: "#B0B0C8"/g' \
  ~/aws-cloud-portfolio/frontend/src/pages/Home.jsx
sed -i 's/fontSize: "16px", color: MUTED/fontSize: "18px", color: MUTED/g' \
  ~/aws-cloud-portfolio/frontend/src/pages/Home.jsx
```

> **Note:** These were done iteratively — run the dev server, check the browser, adjust, repeat. There is no single right answer for font sizes and widths. The goal was to feel natural on a 15-inch laptop screen.

---

### 2.A.7 — Test Locally

```bash
cd ~/aws-cloud-portfolio/frontend
npm run dev
```

Open `http://localhost:5173` in your browser. Hard refresh with `Ctrl + Shift + R` after any CSS changes.

**Check these things before deploying:**
- Portfolio loads full width — no narrow column
- Photo appears in hero section
- Nav tabs highlight correctly as you scroll
- Timeline entries animate in on scroll
- Tech stack carousels scroll automatically
- All 4 project cards show with correct GitHub links
- Connect section shows GitHub, LinkedIn, email

Press `Ctrl + C` to stop the dev server when done.

---

## Part B — AWS Infrastructure

---

### 2.B.1 — Set Variables

These variables are used in every command that follows. Set them at the start of every terminal session — they do not persist after you close the terminal.

```bash
BUCKET_NAME="rohit-cloud-portfolio-2026"
REGION="ap-south-1"
ACCOUNT_ID="604775478253"
```

**Verify:**

```bash
echo $BUCKET_NAME
echo $REGION
echo $ACCOUNT_ID
```

All three should print their values. If any are blank, run that line again.

> **Gotcha:** Variables are session-scoped in bash. If you close the terminal and open a new one, you must re-run these three lines before any AWS command will work correctly. If a command fails with a missing bucket name or wrong region, check your variables first.

---

### 2.B.2 — Build the React App

The build command compiles all React source files into static HTML, CSS, and JS inside a `dist/` folder. This is what gets uploaded to S3 — not the source files.

```bash
cd ~/aws-cloud-portfolio/frontend
npm run build
```

**Expected output:**

```
vite v8.x.x building client environment for production...
✓ 17 modules transformed.
dist/index.html       0.45 kB
dist/assets/index.css 0.21 kB
dist/assets/index.js  218.89 kB
✓ built in 212ms
```

**Verify the output folder:**

```bash
ls dist/
```

You should see: `assets/  favicon.svg  icons.svg  index.html  profile.jpg`

> **Gotcha:** The first build attempt said `dist/` does not exist even after `npm run build` appeared to complete. Running `npm run build` again immediately fixed it — the first run may have had a timing issue. If `ls dist/` shows nothing, just run the build again.

> **Note:** `profile.jpg` appears in `dist/` because it was placed in `frontend/public/`. Vite copies everything from `public/` into `dist/` automatically during build. No extra step needed.

---

### 2.B.3 — Create the S3 Bucket

S3 bucket names are globally unique across all AWS accounts worldwide. If your chosen name is taken, you get an error and must pick another.

```bash
aws s3api create-bucket \
  --bucket $BUCKET_NAME \
  --region $REGION \
  --create-bucket-configuration LocationConstraint=$REGION
```

**Expected output:**

```json
{
    "Location": "http://rohit-cloud-portfolio-2026.s3.amazonaws.com/",
    "BucketArn": "arn:aws:s3:::rohit-cloud-portfolio-2026"
}
```

> **Note:** The `--create-bucket-configuration LocationConstraint=$REGION` flag is required for every region except `us-east-1`. If you omit it when using `ap-south-1`, the command fails with an `IllegalLocationConstraintException`.

---

### 2.B.4 — Disable Block Public Access

By default, AWS blocks all public access to every new S3 bucket. This is a good default for data buckets. For a static website bucket it needs to be disabled so the bucket policy in the next step can take effect.

```bash
aws s3api put-public-access-block \
  --bucket $BUCKET_NAME \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

No output means success.

> **Why all four flags:** Each flag blocks a different type of public access. Setting all four to false gives the bucket policy full control. If even one stays true, the bucket policy granting public read will be silently overridden and your site will return 403 errors.

---

### 2.B.5 — Enable Static Website Hosting

This tells S3 to behave like a web server — returning `index.html` when someone visits the bucket URL instead of returning an XML object listing.

Both index and error documents are set to `index.html` because React is a single-page app. All routing happens client-side in the browser. If someone refreshes on a deep URL like `/projects`, S3 would normally return a 404 — setting the error document to `index.html` sends them back to React which handles the route correctly.

```bash
aws s3 website s3://$BUCKET_NAME/ \
  --index-document index.html \
  --error-document index.html
```

No output means success.

---

### 2.B.6 — Create and Apply Bucket Policy

The bucket policy grants public read access to all objects. Without this, even with public access blocks disabled, S3 will still return 403 on every request.

**Create the policy file:**

```bash
cat > ~/aws-cloud-portfolio/bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF
```

**Verify the bucket name is correctly embedded:**

```bash
cat ~/aws-cloud-portfolio/bucket-policy.json
```

The `Resource` line should end with `:::rohit-cloud-portfolio-2026/*` — not a variable name.

**Apply the policy:**

```bash
aws s3api put-bucket-policy \
  --bucket $BUCKET_NAME \
  --policy file://~/aws-cloud-portfolio/bucket-policy.json
```

No output means success.

> **What this policy does:** `Principal: "*"` means anyone. `Action: s3:GetObject` means read files only. Nobody can list the bucket contents, upload files, or delete anything — only read individual files they know the path to. Minimum required permission for a public website.

---

### 2.B.7 — Upload Files to S3

`aws s3 sync` compares your local `dist/` folder against the bucket and uploads only what is new or changed. The `--delete` flag removes any files in the bucket that no longer exist locally — keeps the bucket in sync with exactly what you built.

```bash
aws s3 sync dist/ s3://$BUCKET_NAME/ --delete
```

**Expected output:**

```
upload: dist/favicon.svg to s3://rohit-cloud-portfolio-2026/favicon.svg
upload: dist/icons.svg to s3://rohit-cloud-portfolio-2026/icons.svg
upload: dist/index.html to s3://rohit-cloud-portfolio-2026/index.html
upload: dist/assets/index-DmuZjLRP.css to s3://rohit-cloud-portfolio-2026/assets/...
upload: dist/profile.jpg to s3://rohit-cloud-portfolio-2026/profile.jpg
upload: dist/assets/index-B0Jb-ujt.js to s3://rohit-cloud-portfolio-2026/assets/...
```

6 files uploaded including `profile.jpg`.

---

### 2.B.8 — Test S3 HTTP URL

Print your S3 website URL:

```bash
echo "http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
```

Open that URL in your browser. Your portfolio should load over HTTP.

**Actual URL:**

```
http://rohit-cloud-portfolio-2026.s3-website.ap-south-1.amazonaws.com
```

> **This is HTTP only** — no HTTPS, no CDN, no caching. This is the S3 direct URL. CloudFront in the next step wraps this with HTTPS and edge caching. Do not share this URL publicly — use the CloudFront URL instead.

---

### 2.B.9 — Create CloudFront Distribution

CloudFront is AWS's CDN. It sits in front of S3 and:
- Serves your files from edge locations close to the visitor
- Handles HTTPS — S3 static hosting is HTTP only
- Caches files so S3 gets fewer direct requests
- Redirects all HTTP to HTTPS automatically

**Create the config file:**

```bash
cat > ~/aws-cloud-portfolio/cloudfront-config.json << EOF
{
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "S3Origin",
      "DomainName": "$BUCKET_NAME.s3-website.$REGION.amazonaws.com",
      "CustomOriginConfig": {
        "HTTPPort": 80,
        "HTTPSPort": 443,
        "OriginProtocolPolicy": "http-only"
      }
    }]
  },
  "DefaultCacheBehavior": {
    "ViewerProtocolPolicy": "redirect-to-https",
    "TargetOriginId": "S3Origin",
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {"Forward": "none"}
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  },
  "Comment": "Cloud Portfolio CDN",
  "Enabled": true,
  "DefaultRootObject": "index.html"
}
EOF
```

**Verify:**

```bash
cat ~/aws-cloud-portfolio/cloudfront-config.json
```

The `DomainName` should show your full S3 website URL — not a variable name.

**Deploy the distribution:**

```bash
aws cloudfront create-distribution \
  --distribution-config file://~/aws-cloud-portfolio/cloudfront-config.json
```

**Expected output** — a large JSON block. The important fields:

```json
{
  "Distribution": {
    "Id": "EXXXXXXXXXXXXX",
    "DomainName": "abc123def456.cloudfront.net",
    "Status": "InProgress"
  }
}
```

**Save the Distribution ID and DomainName immediately:**

```bash
# Run this to extract and print them clearly
aws cloudfront list-distributions \
  --query "DistributionList.Items[0].{ID:Id,Domain:DomainName,Status:Status}" \
  --output table
```

> **Critical:** Save the Distribution ID — you need it every time you deploy new code to invalidate the CloudFront cache. Without it you cannot force CloudFront to serve updated files.

> **Wait 5–15 minutes** — CloudFront deploys globally across all edge locations. Status starts as `InProgress` and changes to `Deployed` when ready. You can check status with:

```bash
aws cloudfront list-distributions \
  --query "DistributionList.Items[0].Status" \
  --output text
```

When it prints `Deployed`, your HTTPS URL is live.

---

### 2.B.10 — Test CloudFront HTTPS URL

Open your CloudFront domain in the browser:

```
https://abc123def456.cloudfront.net
```

Replace `abc123def456` with your actual distribution domain from step 2.B.9.

**Check these things:**
- Loads over HTTPS — padlock in browser address bar
- Visiting the HTTP S3 URL now redirects to HTTPS
- Portfolio looks identical to what you tested locally

---

### 2.B.11 — Set Up API Config for Future Weeks

This file tells the frontend where to find the backend API. In development it falls back to localhost. In production it reads from an environment variable set during the build.

```bash
cat > ~/aws-cloud-portfolio/frontend/src/config.js << 'EOF'
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
EOF
```

**Verify:**

```bash
cat ~/aws-cloud-portfolio/frontend/src/config.js
```

> **Note:** This file is used in Week 3 when the visitor counter Lambda is connected. Nothing calls it yet — creating it now means no code changes are needed in Week 3, just setting the environment variable.

---

### 2.B.12 — Future Deployments

Every time you make changes to the frontend, the deploy process is three commands:

```bash
# 1. Build
cd ~/aws-cloud-portfolio/frontend
npm run build

# 2. Upload to S3
aws s3 sync dist/ s3://$BUCKET_NAME/ --delete

# 3. Invalidate CloudFront cache so it serves new files
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

Replace `YOUR_DISTRIBUTION_ID` with your actual ID from step 2.B.9.

> **Why the invalidation step:** CloudFront caches your files at edge locations for up to 24 hours (the `DefaultTTL` set in the config). Without an invalidation, visitors will keep seeing the old version for up to a day even after you upload new files. The invalidation forces all edge locations to fetch fresh copies from S3 immediately.

---

## Week 2 — Final Checkpoint

| Step | What was done | Verified |
|---|---|---|
| A.1 | All portfolio content collected | Name, about, experience, projects, stack, connect |
| A.2 | `index.css` replaced with clean reset | Full width, no border constraint |
| A.3 | `Home.jsx` written — full portfolio component | All sections render correctly |
| A.4 | `App.jsx` updated to render Home | Portfolio shows at localhost:5173 |
| A.5 | Profile photo added to `public/` | Photo appears in hero section |
| A.6 | Layout and font size adjusted | Feels natural on laptop screen |
| A.7 | Portfolio tested locally | All sections, animations, links working |
| B.1 | Variables set | `BUCKET_NAME`, `REGION`, `ACCOUNT_ID` all print correctly |
| B.2 | React app built | `dist/` folder exists with 6 files |
| B.3 | S3 bucket created | `rohit-cloud-portfolio-2026` in `ap-south-1` |
| B.4 | Public access blocks disabled | No output = success |
| B.5 | Static website hosting enabled | No output = success |
| B.6 | Bucket policy applied | Public `GetObject` on all objects |
| B.7 | Files uploaded to S3 | All 6 files including `profile.jpg` |
| B.8 | S3 HTTP URL works | Portfolio loads at S3 website URL |
| B.9 | CloudFront distribution created | Distribution ID and domain saved |
| B.10 | CloudFront HTTPS URL works | Portfolio loads with padlock |
| B.11 | `config.js` created | Ready for Week 3 API connection |

---

## Key Things Learned in Week 2

**S3 is not a filesystem** — there are no real folders, just keys that look like paths. When you upload `assets/index.js`, the key is literally the string `assets/index.js`. S3 static hosting serves these keys as if they were file paths.

**The public access block and bucket policy are two separate layers** — disabling the block does not make anything public, it just stops AWS from overriding your policy. The policy itself is what grants access. Both steps are required.

**CloudFront cache invalidation is not optional** — if you skip it after an update, visitors see old files for up to 24 hours. Always run the invalidation after every S3 sync.

**WSL accesses Windows files at `/mnt/c/`** — `~/Downloads` in WSL is a Linux Downloads folder that is usually empty. Your actual Windows Downloads folder is at `/mnt/c/Users/rohit/Downloads/`.

**Variables reset every terminal session** — `BUCKET_NAME`, `REGION`, and `ACCOUNT_ID` must be re-set every time you open a new terminal. Put them at the top of a notes file so you can paste them quickly.
