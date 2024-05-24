export type CreateDecksProps = {
  title: string;
  description: string;
  ownerId?: string;
  id?: string;
};

export type EditProps = {
  title?: string;
  description?: string;
};

export type createQuestionProps = {
  question: string;
  answer: string;
  deckId?: string;
  id?: string;
};

export type EditQuestionProps = {
  question?:string;
  answer?:string;
}