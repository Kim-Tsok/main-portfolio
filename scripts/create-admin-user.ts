/**
 * Script to create an admin user in Supabase
 * 
 * Usage:
 * 1. Make sure you have SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local
 * 2. Run: npx tsx scripts/create-admin-user.ts <email> <password>
 * 
 * Example:
 * npx tsx scripts/create-admin-user.ts admin@example.com your-secure-password
 */

import { config } from "dotenv"
import { resolve } from "path"
import { createClient } from "@supabase/supabase-js"

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL is not set in .env.local")
  process.exit(1)
}

if (!supabaseServiceRoleKey) {
  console.error("❌ SUPABASE_SERVICE_ROLE_KEY is not set in .env.local")
  console.error("   You can find this in your Supabase Dashboard → Settings → API")
  process.exit(1)
}

const email = process.argv[2]
const password = process.argv[3]

if (!email || !password) {
  console.error("❌ Usage: npx tsx scripts/create-admin-user.ts <email> <password>")
  console.error("   Example: npx tsx scripts/create-admin-user.ts admin@example.com mypassword123")
  process.exit(1)
}

// Create Supabase admin client (uses service role key for admin operations)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser() {
  try {
    console.log(`\n🔐 Creating admin user: ${email}...`)

    // Create the user
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      app_metadata: {
        is_admin: true,
      },
    })

    if (createError) {
      // If user already exists, try to update their metadata
      if (createError.message.includes("already registered")) {
        console.log("⚠️  User already exists. Updating metadata to grant admin access...")
        
        // Get the user by email
        const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers()
        if (listError) throw listError

        const existingUser = users.find((u) => u.email === email)
        if (!existingUser) {
          throw new Error("User exists but could not be found")
        }

        // Update user metadata
        const { data: updateData, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
          existingUser.id,
          {
            app_metadata: {
              ...existingUser.app_metadata,
              is_admin: true,
            },
          }
        )

        if (updateError) throw updateError

        console.log("✅ Admin access granted to existing user!")
        console.log(`   User ID: ${updateData.user.id}`)
        console.log(`   Email: ${updateData.user.email}`)
        console.log(`   Admin status: ${updateData.user.app_metadata?.is_admin === true ? "✅ Yes" : "❌ No"}`)
        return
      }
      throw createError
    }

    if (!userData.user) {
      throw new Error("User was not created")
    }

    console.log("✅ Admin user created successfully!")
    console.log(`   User ID: ${userData.user.id}`)
    console.log(`   Email: ${userData.user.email}`)
    console.log(`   Admin status: ${userData.user.app_metadata?.is_admin === true ? "✅ Yes" : "❌ No"}`)
    console.log(`\n📝 You can now login at: http://localhost:3000/admin/login`)
    console.log(`   Email: ${email}`)

  } catch (error) {
    console.error("❌ Error creating admin user:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

createAdminUser()

