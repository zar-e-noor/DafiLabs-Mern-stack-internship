import { config } from 'dotenv';
config({ path: '.env' });
config({ path: '.env.local', override: true });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { createClient } from '@supabase/supabase-js';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is missing — check .env / .env.local');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Supabase Service Role key initialization taake directly Auth user create ho sake
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function main() {
    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@portfolio.com';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeThisPassword123';

  console.log('🚀 Seeding Admin User started...');

  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
  });

  if (authError) {
    console.error('❌ Supabase Auth seeding error:', authError.message);
    return;
  }

  if (authUser?.user) {
    const profile = await prisma.profile.create({
      data: {
        userId: authUser.user.id,
        email: adminEmail,
        name: 'Admin User',
        role: 'Admin',
      },
    });

    console.log('✅ Admin successfully seeded!');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log(`🆔 Profile Entry Created:`, profile.id);
  }
}

main()
  .catch((e) => {
    console.error('❌ Unexpected error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });