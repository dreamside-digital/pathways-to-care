# Pathways to Care

## Tech stack

- [Firebase](https://firebase.google.com/) for authentication, database, file storage, and hosting
- [Gatsby.js](https://www.gatsbyjs.com/) as the static site builder
- [react-easy-editables](https://github.com/nomadic-labs/react-easy-editables) for editing interface
- [less-cms](https://github.com/nomadic-labs/less-cms) for remote deployment


## Local development

- clone the repo
- create `.env.development` file and populate the variables
```
GATSBY_FIREBASE_ENVIRONMENT="staging"
```
- create `/config/firebase-config.staging.json` file and populate with firebase credentials
- install the firebase cli locally and log in
```
npm install -g firebase-tools
firebase login
```
- ensure you have access to the Firebase project
```
firebase projects:list
```
- install the dependencies
```
yarn
```
- start the development server
```
yarn develop
```

## Deploy to staging
```
yarn deploy:staging
```

## Content editing
- create an account at http://localhost:8000/admin
- on Firebase, ensure your account is set as an Editor in the users table
- on the page you want to edit, click on the account button and select "Start editing"
- click on the editable fields to update the content
- click on the checkmark icon to save your changes
- from the account button, select "Done editing" to preview the page


