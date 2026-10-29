export const projectCategories = ['Client work', 'Personal product', 'Developer tool', 'Game', 'Experiment'] as const;
export type ProjectCategory = typeof projectCategories[number];
