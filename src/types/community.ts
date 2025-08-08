// src/types/community.ts

import { Country } from "./country";
import { User } from "./user";

export interface CommunityQuestion {
  id: number;
  title: string;
  content: string;
  user: User;
  text: string;
  country: Country;
  answers: CommunityAnswer[];
  topic: CommunityTopic;
  createdDate: string;
  updateDate: string;
}

export interface CommunityAnswer {
  id: number;
  text: string;
  user: User;
  createdDate: string;
  updateDate: string;
}

export interface CommunityTopic {
  id: number;
  title: string;
  description: string;
  slug: string;
}

export interface CommunityQuestionsResponse {
  items: CommunityQuestion[];
  meta: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    itemsPerPage: number;
  };
}
