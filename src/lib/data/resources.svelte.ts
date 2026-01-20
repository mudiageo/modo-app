import { browser } from '$app/environment';

import { dbStoreData } from '$lib/data/index.svelte.ts';

import type { Resource, Annotation, Flashcard } from '$lib/types';

export const resourcesStore = dbStoreData('resources');

export function addResource(resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) {
	const newResource: Resource = {
		...resource,
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	};

	resourcesStore.add(newResource)
	return newResource;
}

export function addAnnotation(annotation: Omit<Annotation, 'id' | 'createdAt'>) {
	const newAnnotation: Annotation = {
		...annotation,
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString()
	};

	const resource = resourcesStore.select(annotation.resourceId)
	
	resource.annotations?.push(newAnnotation)
	
	resourcesStore.update(resource)
	return newAnnotation;
}

export function addFlashcard(flashcard: Omit<Flashcard, 'id'>) {
	const newFlashcard: Flashcard = {
		...flashcard,
		id: crypto.randomUUID()
	};

	flashcards = [...flashcards, newFlashcard];
	saveToDb();
	return newFlashcard;
}
