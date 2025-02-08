import { type StructureBuilder } from 'sanity/desk';

export const structure = (S: StructureBuilder) => {
  return S.list().title('Content').items([
    // Your structure items here
  ]);
};
