const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = { projectId: "gen-lang-client-0147398956" };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-applicationpwa-bac1e573-2b66-4e6d-9241-be8c81b34c80");
console.log(db._databaseId.database);
