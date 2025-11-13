export interface TelegramUser {
  allows_write_to_pm?: boolean;
  first_name: string;
  id: number;
  last_name?: string;
  language_code?: string;
  photo_url?: string;
  username?: string;
}

export interface TelegramInitData {
  auth_date: Date;
  hash: string;
  query_id?: string;
  signature?: string;
  user?: TelegramUser;
  can_send_after?: number;
  chat?: any;
  chat_type?: string;
  chat_instance?: string;
}