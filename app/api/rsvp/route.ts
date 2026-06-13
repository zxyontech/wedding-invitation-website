import { supabase } from "@/lib/supabase"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { name, guests, attendance, message } = await req.json()

    // Validasi data
    if (!name || !attendance || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Insert ke Supabase
    const { data, error } = await supabase
      .from("rsvp_submissions")
      .insert([
        {
          name: name.trim(),
          guests: parseInt(guests),
          attendance,
          message: message.trim(),
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to submit RSVP" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
