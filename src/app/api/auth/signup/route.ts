import { NextResponse } from 'next/server';
import { validateSignup } from '@/lib/auth-logic';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize the Supabase Client using your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 2. Run our Jasmine-tested logic (Client-side validation)
    const validation = validateSignup(email, password);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // 3. ACTUAL Supabase Call (No longer a placeholder)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // This ensures the user is redirected back to your app after clicking the email link
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/login`,
      },
    });

    // 4. Handle Supabase errors (e.g., email already exists, password too weak)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      message: "Success! Rutgers verification email sent.",
      user: data.user 
    });

  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}