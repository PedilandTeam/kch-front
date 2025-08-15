// src/app/api/community/questions/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { z } from "zod";
import { QuestionsResponseSchema } from "@/lib/schemas/community";

const API_URL = process.env.API_URL!;
if (!API_URL) throw new Error("Missing API_URL");

const InputSchema = z.object({
  countryCode: z.string().min(2),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(30),
});

export async function GET(req: NextRequest) {
  try {
    const q = Object.fromEntries(new URL(req.url).searchParams.entries());
    const { countryCode, page, limit } = InputSchema.parse(q);

    const cookie = req.headers.get("cookie") ?? "";

    // axios defaults: no Next cache involved (SWR handles client caching)
    const { data, headers, status } = await axios.get(
      `${API_URL}/forum/questions`,
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          ...(cookie ? { cookie } : {}),
        },
        params: { countryCode, page, limit },
        // validateStatus: () => true, // optional: handle non-2xx manually
      },
    );

    if (status < 200 || status >= 300) {
      return NextResponse.json(
        { message: "Upstream error", status },
        { status: 502 },
      );
    }

    // If upstream sometimes returns HTML mistakenly, this will throw:
    const parsed = QuestionsResponseSchema.parse(data);
    return NextResponse.json(parsed, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Proxy error" }, { status: 500 });
  }
}
