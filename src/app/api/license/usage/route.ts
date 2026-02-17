import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const FREE_DAILY_LIMIT = 3;

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  try {
    const { machine_id, action } = await request.json();

    if (!machine_id) {
      return NextResponse.json({ error: "Missing machine_id" }, { status: 400 });
    }

    if (typeof machine_id !== "string" || machine_id.length > 100) {
      return NextResponse.json({ error: "Invalid machine ID format" }, { status: 400 });
    }

    const today = new Date().toISOString().split("T")[0];

    if (action === "check") {
      const { data } = await supabase
        .from("usage_tracking")
        .select("transcription_count")
        .eq("machine_id", machine_id)
        .eq("usage_date", today)
        .single();

      const count = data?.transcription_count || 0;
      return NextResponse.json({
        used: count,
        remaining: Math.max(0, FREE_DAILY_LIMIT - count),
        limit: FREE_DAILY_LIMIT,
      });
    }

    if (action === "increment") {
      const { data: existing } = await supabase
        .from("usage_tracking")
        .select("*")
        .eq("machine_id", machine_id)
        .eq("usage_date", today)
        .single();

      if (existing) {
        if (existing.transcription_count >= FREE_DAILY_LIMIT) {
          return NextResponse.json(
            { error: "Daily limit reached", limit_reached: true },
            { status: 429 }
          );
        }
        await supabase
          .from("usage_tracking")
          .update({ transcription_count: existing.transcription_count + 1 })
          .eq("id", existing.id);
      } else {
        await supabase
          .from("usage_tracking")
          .insert({ machine_id, transcription_count: 1 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Usage tracking error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
