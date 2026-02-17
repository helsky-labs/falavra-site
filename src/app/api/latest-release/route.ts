import { NextResponse } from "next/server";
import { CURRENT_VERSION, DOWNLOAD_DMG, GITHUB_RELEASE } from "@/lib/version";

export async function GET() {
  return NextResponse.json({
    version: CURRENT_VERSION,
    tagName: `v${CURRENT_VERSION}`,
    releaseUrl: GITHUB_RELEASE,
    macos: {
      downloadUrl: DOWNLOAD_DMG,
      fileName: `falavra-${CURRENT_VERSION}.dmg`,
    },
  });
}
