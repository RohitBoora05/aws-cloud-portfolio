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

### 1.1.6 Install Python 3.11

Python is needed for writing the Lambda visitor counter function and the FastAPI AI chatbot backend. We install version 3.11 specifically because that's what AWS Lambda supports and what the project is built for. We also install `venv` for isolated environments and `pip` for package management.

```bash
sudo apt install python3.11 python3.11-venv python3-pip -y
```

**Verify:**
```bash
python3.11 --version
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

Docker packages the FastAPI app and all its Pyton dependencies into a container that runs identically on your local machine and on the EC2 instance. No more "works on my machine" problems.

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
