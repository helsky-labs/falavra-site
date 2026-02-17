import { NextResponse } from "next/server";
import { CURRENT_VERSION, DOWNLOAD_MACOS, DOWNLOAD_WINDOWS } from "@/lib/version";

export async function GET() {
  return NextResponse.json({
    version: CURRENT_VERSION,
    tagName: `v${CURRENT_VERSION}`,
    macos: {
      downloadUrl: DOWNLOAD_MACOS,
      fileName: `falavra-${CURRENT_VERSION}-macos.dmg`,
    },
    windows: {
      downloadUrl: DOWNLOAD_WINDOWS,
      fileName: `falavra-${CURRENT_VERSION}-windows-x64.exe`,
    },
  });
}
