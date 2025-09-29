import dotenv from 'dotenv';
dotenv.config(); 

interface EnvConfig {
  baseUrl: string;
  adminEmail: string;
  adminPassword: string;
  memberEmail: string;
  memberPassword: string;
}

export const config: EnvConfig = {
  baseUrl: process.env.BASE_URL || 'https://trello.com/',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@test.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin123',
  memberEmail: process.env.MEMBER_EMAIL || 'member@test.com',
  memberPassword: process.env.MEMBER_PASSWORD || 'Member123',
};
