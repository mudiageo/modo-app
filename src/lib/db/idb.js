import { openDB } from 'idb';

const DB_NAME = 'studyai_db';
const DB_VERSION = 4;

export async function initDB() {
	return openDB(DB_NAME, DB_VERSION, {
		upgrade(db) {
			// Tasks store
			if (!db.objectStoreNames.contains('tasks')) {
				const taskStore = db.createObjectStore('tasks', { keyPath: 'id' });
				taskStore.createIndex('dueDate', 'dueDate');
				taskStore.createIndex('priority', 'priority');
			}
			// Courses store
			if (!db.objectStoreNames.contains('courses')) {
				const coursesStore = db.createObjectStore('courses', { keyPath: 'name' });
				coursesStore.createIndex('strength', 'strength');
			}

			// Schedule store
			if (!db.objectStoreNames.contains('schedule')) {
				const scheduleStore = db.createObjectStore('schedule', { keyPath: 'id' });
				scheduleStore.createIndex('date', 'date');
			}
			
			// Study sessions store
			if (!db.objectStoreNames.contains('studySessions')) {
				const sessionStore = db.createObjectStore('studySessions', { keyPath: 'id' });
				sessionStore.createIndex('date', 'date');
			}
			
			if (!db.objectStoreNames.contains('notes')) {
				db.createObjectStore('notes', { keyPath: 'id' });
			}

			// Progress store
			if (!db.objectStoreNames.contains('progress')) {
				db.createObjectStore('progress', { keyPath: 'date' });
			}

			// Settings store
			if (!db.objectStoreNames.contains('settings')) {
				db.createObjectStore('settings');
			}

			// Profile store
			if (!db.objectStoreNames.contains('profile')) {
				db.createObjectStore('profile');
			}

			// Quotes store
			if (!db.objectStoreNames.contains('quotes')) {
				db.createObjectStore('quotes', { keyPath: 'id' });
			}

			// Recommendations store
			if (!db.objectStoreNames.contains('recommendations')) {
				db.createObjectStore('recommendations', { keyPath: 'id' });
			}

			// Game state and elements store
			if (!db.objectStoreNames.contains('gamification')) {
				db.createObjectStore('gamification');
			}

			// achievements store
			if (!db.objectStoreNames.contains('achievements')) {
				db.createObjectStore('achievements');
			}

			// resources store
			if (!db.objectStoreNames.contains('resources')) {
				db.createObjectStore('resources', { keyPath: 'id' });
			}

			// Subscriptions store
			if (!db.objectStoreNames.contains('subscriptions')) {
				db.createObjectStore('subscriptions', { keyPath: 'id' });
			}
		}
	});
}

export async function getStudySessions(date) {
	const db = await initDB();
	const index = db.transaction('studySessions').store.index('date');
	return index.getAll(date);
}
