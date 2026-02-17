import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  const resend = getResend();
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!email.includes("@") || email.length > 254) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { data: licenses, error: dbError } = await supabase
      .from("licenses")
      .select("license_key, major_version, created_at")
      .eq("email", normalizedEmail);

    if (dbError) {
      console.error("Restore DB error:", dbError);
    }

    console.log(`Restore request for ${normalizedEmail}: found ${licenses?.length ?? 0} license(s)`);

    if (licenses && licenses.length > 0) {
      const licenseList = licenses
        .map(
          (l) =>
            `<div style="background: #f5f5f5; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 20px; text-align: center; margin: 12px 0;">
              ${l.license_key}
            </div>
            <p style="text-align: center; color: #666; font-size: 14px; margin-top: 4px;">
              Purchased: ${new Date(l.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>`
        )
        .join("");

      const { error: emailError } = await resend.emails.send({
        from: "falavra <noreply@falavra.com>",
        to: normalizedEmail,
        subject: "Your falavra License Key(s)",
        html: `
          <h1>Your falavra License(s)</h1>
          <p>Here are the license keys associated with your email:</p>
          ${licenseList}
          <p>To activate:</p>
          <ol>
            <li>Open falavra</li>
            <li>Click Settings &rarr; Enter License Key</li>
            <li>Paste your key and click Activate</li>
          </ol>
          <p>Each license is valid for falavra on up to 3 devices.</p>
          <p>Questions? Reply to this email.</p>
        `,
      });

      if (emailError) {
        console.error("Resend error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Restore error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
