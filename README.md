# Task Management App

-   Lightning Web Component (LWC)
-   Apex
-   Salesforce DX

## Setup

Clone this repository.

```
git@github.com:k2-mat/task-management-sf.git
```

or

```
https://github.com/k2-mat/task-management-sf.git
```

Open the directory.

```
cd task-management-sf
```

Authorize to your Developer Hub (Dev Hub) org.

```
sfdx org:web:login -d -a "Hub Org"
```

Create a scratch org, push sources, and set a permission set.

```
npm run setup -org="Scratch Org"
```

Open the scratch org.

```
sfdx org:open -o "Scratch Org"
```
