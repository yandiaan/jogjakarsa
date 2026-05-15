import { create } from 'zustand';

const clampProgress = (value) => Math.max(0, Math.min(100, value));

const addVisitedSection = (sections, nextSection) => {
	if (!nextSection || sections.includes(nextSection)) {
		return sections;
	}

	return [...sections, nextSection];
};

export const useProgressStore = create((set) => ({
	lenisInstance: null,
	setLenisInstance: (instance) => set({ lenisInstance: instance }),
	progress: 0,
	visitedSections: [],
	awanVisible: false,
	awanMessage: '',
	awanPlacement: 'right',
	awanCtaLabel: '',
	interactionCompleted: false,
	markSectionVisited: (section, nextProgress = 0) =>
		set((state) => ({
			progress: Math.max(state.progress, clampProgress(nextProgress)),
			visitedSections: addVisitedSection(state.visitedSections, section),
		})),
	openAwanDialog: ({ message, placement = 'right', ctaLabel = '' }) =>
		set((state) => ({
			awanVisible: true,
			awanMessage: message,
			awanPlacement: placement,
			awanCtaLabel: ctaLabel,
			visitedSections: addVisitedSection(state.visitedSections, 'awan'),
		})),
	closeAwanDialog: () =>
		set((state) => ({
			awanVisible: false,
			awanCtaLabel: '',
			awanMessage: state.interactionCompleted ? state.awanMessage : '',
		})),
	completeNpcInteraction: () =>
		set((state) => ({
			progress: 100,
			visitedSections: addVisitedSection(addVisitedSection(state.visitedSections, 'npc'), 'interaction'),
			awanVisible: true,
			awanPlacement: state.awanPlacement,
			awanCtaLabel: '',
			interactionCompleted: true,
			awanMessage:
				'Matur nuwun. Sejarah sudah terbuka sebagai jejak pertamamu. Pilar lain akan menunggu perjalanan berikutnya.',
		})),
}));