export interface Get {
  items: Item[];
  meta: Meta;
}

export interface Item {
  createdDate: string;
  updateDate: string;
  status: boolean;
  id: string;
  text: string;
  isGreen: boolean;
  question: Question;
  votes: any[];
  user: null;
  botUser: BotUser;
}

export interface BotUser {
  firstname: string;
  lastname: string;
  username: string;
  level: number;
}

export interface Question {
  createdDate: string;
  updateDate: string;
  status: boolean;
  id: string;
  title: string;
  text: string;
  botUser: {
    firstname: string;
    lastname: string
  },
  topic: {
    title: string
  },
  country: {
    name: string
  },
  votes: {
    type: 'up' | 'down'
  }[]
}

export interface Meta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export namespace AnswerNamespace {
  export type GET = Get;
}
