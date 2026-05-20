import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const config = {
  databaseUrl: process.env.DATABASE_URL || '',
  supabaseUrl,
  supabaseKey,
  jwtSecret: process.env.JWT_SECRET || 'default-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  stellarNetwork: process.env.STELLAR_NETWORK || 'testnet',
  governanceContractId: process.env.GOVERNANCE_CONTRACT_ID || '',
  voterSecretKey: process.env.VOTER_SECRET_KEY || '',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || '',
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
};
