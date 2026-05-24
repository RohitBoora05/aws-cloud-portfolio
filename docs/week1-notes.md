# AWS Cloud Portfolio — Week 1 Notes

## Step 1.1 — Install Required Tools

---

### 1.1.1 Update APT

This is a crucial step at the start of every session. Before installing any dependencies or packages, you want to make sure apt knows about the latest versions available. If you skip this, apt works off a stale list and you might install outdated packages or hit version conflicts.

```bash
sudo apt update && sudo apt upgrade -y
```

> **Rule:** Run this once every time you open a fresh terminal session before installing anything.

---

### 1.1.2 Install git, curl, unzip

Three small utilities that everything else depends on.

- **git** — lets you perform actions on GitHub through the Ubuntu CLI. Used to store and version control the project as a public repo.
- **curl** — downloads files directly using URLs in the CLI. Used to fetch installers in the steps ahead.
- **unzip** — extracts `.zip` files. Needed for the AWS CLI installer.

```bash
sudo apt install git curl unzip -y
```

**Verify:**
```bash
git --version
```

---

### 1.1.3 Install AWS CLI

We install the AWS CLI so we can control AWS tasks directly from the terminal — creating buckets, deploying Lambdas, managing IAM — without having to log into the console every time.

We use `curl` to download the installer zip, `unzip` to extract it, then run the install script.

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

**Verify:**
```bash
aws --version
```

---

### 1.1.4 Install NVM (Node Version Manager)

We install NVM using `curl` because we need Node.js for the React frontend. NVM is the cleanest way to do it — it lets you easily switch between Node versions without breaking anything, unlike installing Node directly through apt which often gives you an outdated version.

After installing, `source ~/.bashrc` reloads your shell config so NVM is recognised immediately without needing to restart the terminal.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
```

**Verify:**
```bash
nvm --version
```

> **Gotcha:** If you get `nvm: command not found` after running the installer, close and reopen your terminal, then try again.

---

### 1.1.5 Install Node.js 20

Now that NVM is set up, we use it to install Node.js version 20 — the current LTS (Long Term Support) version. This is what the React build tool Vite and all the npm packages in this project expect.

```bash
nvm install 20
```

**Verify:**
```bash
node --version   # should print v20.x.x
npm --version    # should print 10.x.x
```

---

### 1.1.6 Install Python 3.12

Python is needed for writing the Lambda visitor counter function and the FastAPI AI chatbot backend. We also install `venv` for isolated environments and `pip` for package management.

> **Note:** The guide specifies 3.11 but 3.12 was installed instead. The only change this causes is in Week 4 when creating the Lambda function — use `--runtime python3.12` instead of `--runtime python3.11`. Everything else is unaffected.

```bash
sudo apt install python3.12 python3.12-venv python3-pip -y
```

**Verify:**
```bash
python3.12 --version
```

---

### 1.1.7 Add HashiCorp GPG Key + Repo

We want to use Terraform, but Ubuntu's default repositories don't include it — HashiCorp hosts it on their own servers. Before apt can find and install Terraform, we need to do two things: tell Ubuntu where to look, and tell it to trust that source.

**Command 1** — Download HashiCorp's public signing key, convert it from text to binary format (so apt can understand it), and save it to a file:

```bash
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o \
/usr/share/keyrings/hashicorp-archive-keyring.gpg
```

**Command 2** — Print the HashiCorp repo address and save it into Ubuntu's list of package sources, linked to the key above, so apt knows where to find Terraform and can verify it's genuine:

```bash
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee \
/etc/apt/sources.list.d/hashicorp.list
```

> `$(lsb_release -cs)` automatically inserts your Ubuntu version codename (e.g. `jammy` for 22.04) so you don't have to hardcode it.

---

### 1.1.8 Install Terraform

Now that the HashiCorp repo is added and trusted, apt can find Terraform. We install it to manage the entire AWS infrastructure as code — creating, updating, or tearing down the whole setup using `.tf` files instead of clicking through the console.

```bash
sudo apt update && sudo apt install terraform -y
```

**Verify:**
```bash
terraform --version
```

---

### 1.1.9 Install Docker

Docker packages the FastAPI app and all its Python dependencies into a container that runs identically on your local machine and on the EC2 instance. No more "works on my machine" problems.

The `usermod` command adds your user to the docker group so you don't need `sudo` every time you run a docker command. `newgrp docker` applies that change immediately without needing to log out.

```bash
sudo apt install docker.io -y
sudo systemctl start docker
sudo usermod -aG docker $USER
newgrp docker
```

**Verify:**
```bash
docker --version
docker ps   # should show an empty table, not a permission error
```

> **Gotcha:** If `docker ps` still gives a permission error after `newgrp docker`, log out and back in to fully apply the group change.

---

## Step 1.1 Checkpoint

All tools installed and verified:

| Tool | Command | Expected output |
|------|---------|----------------|
| AWS CLI | `aws --version` | `aws-cli/2.x.x` |
| Node.js | `node --version` | `v20.x.x` |
| Python | `python3.12 --version` | `Python 3.12.x` |
| Terraform | `terraform --version` | `Terraform v1.x.x` |
| Docker | `docker --version` | `Docker version 24.x.x` |
| git | `git --version` | `git version 2.x.x` |

---

## Step 1.2 — Create IAM Admin User

Why not use the root account for daily work? Simple — if root gets compromised, everything is gone. No restrictions, no recovery. An IAM user gives you the same power but with protection — it can be audited, locked, and rotated safely without touching the root account.

**Steps (AWS Console):**

1. Log in as root → go to IAM
2. Click Users → Create user
3. Username: `rohit-admin`
4. Check: Provide user access to the AWS Management Console
5. Attach policy: `AdministratorAccess`
6. Create user → download the `.csv` with credentials
7. Enable MFA for this user (Security credentials tab)
8. Log out of root — log in as `rohit-admin` from now on

> **Rule:** Root account is only ever used once — to create this user. After that, it stays locked away.

---

## Step 1.3 — Configure AWS CLI

Now we connect the AWS CLI to our account so terminal commands talk to AWS as `rohit-admin`.

---

### 1.3.1 Get the Access Keys

The CLI authenticates using access keys — not your console password. To get them:

1. Log into the AWS Console as `rohit-admin`
2. Go to IAM → Users → `rohit-admin`
3. Security credentials tab → Access keys → Create access key
4. Use case: select CLI
5. Click Create — you now have an Access Key ID and a Secret Access Key

> **Critical:** This is the only time AWS shows you the Secret Access Key. Copy both values or download the `.csv` before closing the page. If you close it, the secret is gone — you'd have to create a new key.

---

### 1.3.2 Run `aws configure`

```bash
aws configure
```

It will ask four things — answer each one:

| Prompt | Value |
|--------|-------|
| AWS Access Key ID | paste your `AKIA...` key |
| AWS Secret Access Key | paste your secret key |
| Default region name | `eu-west-1` |
| Default output format | `json` |

> **Region:** `eu-west-1` is Ireland — closest AWS region to the Netherlands. All project resources will live here.

---

### 1.3.3 Verify Credentials are Saved

```bash
cat ~/.aws/credentials
```

**Expected output:**
```
[default]
aws_access_key_id = AKIA...
aws_secret_access_key = ...
```

Match the values against what you created in the console.

---

### 1.3.4 Verify Region and Output Format

```bash
cat ~/.aws/config
```

**Expected output:**
```
[default]
region = eu-west-1
output = json
```

---

### 1.3.5 Test the Connection

```bash
aws sts get-caller-identity
```

**Expected output:**
```json
{
    "UserId": "AIDA...",
    "Account": "604775478253",
    "Arn": "arn:aws:iam::604775478253:user/rohit-admin"
}
```

The `Arn` ending in `user/rohit-admin` confirms you're authenticated as the IAM user, not root.

> **If you see an error:** `InvalidClientTokenId` or `The security token is invalid` means the Access Key ID or Secret was mistyped. Run `aws configure` again and re-paste carefully.

---

### 1.3.6 Protect the Credentials Files

On a shared or multi-user system, other users could read your credentials if file permissions are too open. This locks the folder down to your user only.

```bash
chmod 700 ~/.aws
chmod 600 ~/.aws/credentials
chmod 600 ~/.aws/config
```

**Verify:**
```bash
ls -la ~/.aws/
```

You should see `drwx------` on the folder and `-rw-------` on both files.

> **Gotcha:** After running `newgrp docker` in Step 1.1, the group on these files showed `docker` instead of `rohit`. Since permissions were already `600`/`700` it was harmless, but fixed it cleanly with:
> ```bash
> chown rohit:rohit ~/.aws ~/.aws/credentials ~/.aws/config
> ```

---

## Step 1.3 Checkpoint

| Check | Command | Expected |
|-------|---------|----------|
| Credentials saved | `cat ~/.aws/credentials` | Shows `[default]` block with your key |
| Region set | `cat ~/.aws/config` | `region = eu-west-1` |
| Connection works | `aws sts get-caller-identity` | Returns your account ID and `user/rohit-admin` |
| Files locked | `ls -la ~/.aws/` | `drwx------` and `-rw-------` |

---

## Step 1.4 — Create GitHub Repository

---

### 1.4.1 Create the Repo on GitHub

Go to github.com and create a new **public** repository called `aws-cloud-portfolio`. Leave everything unchecked — no README, no .gitignore. Copy the HTTPS URL from the empty repo page once it's created.

---

### 1.4.2 Git Configuration

Before doing anything in git, we attach our identity to it. Every commit records a name and email — this is separate from your GitHub account, it's just metadata embedded in each commit.

```bash
git config --global user.name "RohitBoora05"
git config --global user.email "rohitboora2005@gmail.com"
```

**Verify:**
```bash
git config --global --list
```

You should see `user.name` and `user.email` in the output.

---

### 1.4.3 Initialise Git

We're already inside `~/aws-cloud-portfolio` so we just initialise git here — no need to create a new folder.

```bash
git init
```

**Verify:**
```bash
ls -la
```

You should see a `.git` folder listed — that's git tracking this directory.

---

### 1.4.4 Create `.gitignore`

We do not want to accidentally push secrets, keys, or large auto-generated folders to GitHub. The `.gitignore` file tells git to completely ignore anything listed in it. This is committed first — before any other file — so protection is in place from the start.

```bash
cat > .gitignore << 'EOF'
.env
*.pem
*.key
__pycache__/
node_modules/
.terraform/
*.tfstate
*.tfstate.backup
.DS_Store
dist/
build/

---

## Step 1.4 — Create GitHub Repository

---

### 1.4.1 Create the Repo on GitHub

Go to github.com and create a new **public** repository called `aws-cloud-portfolio`. Leave everything unchecked — no README, no .gitignore. Copy the HTTPS URL from the empty repo page once it's created.

---

### 1.4.2 Git Configuration

Before doing anything in git, we attach our identity to it. Every commit records a name and email — this is separate from your GitHub account, just metadata embedded in each commit.

```bash
git config --global user.name "RohitBoora05"
git config --global user.email "rohitboora2005@gmail.com"
```

**Verify:**
```bash
git config --global --list
```

You should see `user.name` and `user.email` in the output.

---

### 1.4.3 Initialise Git

We're already inside `~/aws-cloud-portfolio` so we just initialise git here — no need to create a new folder.

```bash
git init
```

**Verify:**
```bash
ls -la
```

You should see a `.git` folder listed — that's git now tracking this directory.

---

### 1.4.4 Create `.gitignore`

We do not want to accidentally push secrets, keys, or large auto-generated folders to GitHub. The `.gitignore` file tells git to completely ignore anything listed in it. This is committed first — before any other file — so protection is in place from the very start.

```bash
cat > .gitignore << 'GITEOF'
.env
*.pem
*.key
__pycache__/
node_modules/
.terraform/
*.tfstate
*.tfstate.backup
.DS_Store
dist/
build/
GITEOF
```

> The heredoc syntax lets you write a multi-line block and feed it all into the command at once. Everything between the two markers gets written to the file.

**Verify:**
```bash
cat .gitignore
```

You should see all the entries listed back.

---

### 1.4.5 Link to GitHub Remote

Now we tell our local git folder where to push — the GitHub repo we created in 1.4.1. `origin` is just the conventional name for your main remote.

```bash
git remote add origin https://github.com/RohitBoora05/aws-cloud-portfolio.git
```

**Verify:**
```bash
git remote -v
```

You should see two lines — `origin` fetch and `origin` push — both pointing to your GitHub URL.

---

### 1.4.6 First Commit and Push

```bash
git add .gitignore
git commit -m "initial commit: add gitignore"
git push -u origin main
```

**About the password prompt:**

When git asks for a password, do not use your GitHub account password — GitHub disabled that in 2021. You need a **Personal Access Token (PAT)** instead. Think of it as a dedicated key to your repo.

To generate one:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click Generate new token (classic)
3. Tick `repo` only — nothing else needed
4. Click Generate — copy it immediately, you will never see it again
5. Paste it as the password when git asks

---

### 1.4.7 Save Credentials with Helper

We do not want to paste the token every time we push. The credential helper stores it after the first use so every future push is silent.

```bash
git config --global credential.helper store
git push
```

Fill in your username and paste the token once. Done — never asked again.

**Verify:**
```bash
git push
```

If it completes without asking for anything, the helper is working.

---

## Step 1.5 — Create React Frontend

---

### 1.5.1 Scaffold with Vite

Vite is a modern build tool for React — much faster than the old `create-react-app`. It generates a complete project structure with a dev server, hot reload, and a build pipeline ready to go. The `--template react` flag gives you plain React without TypeScript.

```bash
npm create vite@latest frontend -- --template react
```

When prompted `Ok to proceed? (y)` — type `y` and press Enter. A `frontend/` folder now exists inside your project.

---

### 1.5.2 Install Dependencies

Move into the frontend folder and install all the packages the project depends on. This creates `node_modules/` — which is in your `.gitignore` because it's large and can always be regenerated from `package.json`.

```bash
cd frontend
npm install
```

**Verify:**
```bash
ls
```

You should see a `node_modules/` folder now exists.

---

### 1.5.3 Run the Dev Server and Preview

Always verify the scaffold works before touching any code. If something is broken at this point it's a Vite or Node issue — easy to diagnose. If you discover it after editing files, you won't know what caused it.

```bash
npm run dev
```

Terminal will show:
```
VITE v8.x  ready in Xms
Local: http://localhost:5173/
```

Open `http://localhost:5173` in your browser — you see the default Vite + React page. That means everything is working.

Press `Ctrl+C` to stop the server and return to the terminal.

> **Note:** When the terminal locks up after `npm run dev` it is not broken — the server is just running. `Ctrl+C` always brings you back. First time this happened it looked like something went wrong but it was running perfectly fine.

---

### 1.5.4 Create the Folder Structure

```bash
mkdir -p src/pages src/components
```

**Verify:**
```bash
ls src/
```

You should see `pages/` and `components/` alongside the existing `App.jsx`, `main.jsx` etc.

> `src/pages/` holds full-page components. `src/components/` holds reusable pieces. Separating them now keeps the project clean as it grows through the remaining weeks.

---

### 1.5.5 Create the Home Page

```bash
cat > src/pages/Home.jsx << 'JSXEOF'
export default function Home() {
  return (
    <div>
      <h1>Hi, I'm Rohit</h1>
      <p>Cloud Engineer | AWS | Python | Docker</p>
    </div>
  );
}
JSXEOF
```

**Verify:**
```bash
cat src/pages/Home.jsx
```

> **Gotcha:** Do not paste the JSX code directly into the terminal — bash will try to run it as a command and throw syntax errors. The `cat >` heredoc command above is the correct way to write the file from the terminal. Learned this the hard way.

---

### 1.5.6 Update App.jsx

Replace Vite's default `App.jsx` with your own version that imports the Home component.

```bash
cat > src/App.jsx << 'APPEOF'
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
APPEOF
```

Restart the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` — you should see your name and tagline instead of the Vite default page. Week 1 frontend is live.

---

## Week 1 — Final Checkpoint

| Step | What was done | Verified |
|------|--------------|---------|
| 1.1 | All tools installed | `aws`, `node`, `python3.12`, `terraform`, `docker`, `git` all return versions |
| 1.2 | IAM admin user created with MFA | Logged in as `rohit-admin`, root never used again |
| 1.3 | AWS CLI configured | `aws sts get-caller-identity` returns account ID and `user/rohit-admin` |
| 1.4 | GitHub repo live | `.gitignore` pushed, credential helper saves token silently |
| 1.5 | React app running | `http://localhost:5173` shows name and tagline |
