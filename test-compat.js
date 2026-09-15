const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');
const app = firebase.initializeApp({ projectId: "gen-lang-client-0147398956" });
const db = firebase.firestore()._getProvider('firestore').getImmediate({ identifier: 'ai-studio-applicationpwa-bac1e573-2b66-4e6d-9241-be8c81b34c80' });
console.log(db._databaseId ? db._databaseId.database : "unknown");
