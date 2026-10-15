import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { text } = await req.json();
    const input = String(text || '').trim();
    if (!input) return NextResponse.json({ error: 'Enter the Kannada reply first.' }, { status: 400 });
    if (input.length > 1000) return NextResponse.json({ error: 'Keep the reply under 1,000 characters.' }, { status: 400 });

    const key = process.env.SARVAM_API_KEY;
    if (!key) return NextResponse.json({ error: 'Sarvam is not configured to interpret Kannada replies.' }, { status: 503 });

    const response = await fetch('https://api.sarvam.ai/translate', {
      method: 'POST',
      headers: { 'api-subscription-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
        source_language_code: 'kn-IN',
        target_language_code: 'en-IN',
        model: 'mayura:v1',
        mode: 'modern-colloquial',
      }),
      signal: AbortSignal.timeout(12000),
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data?.error?.message || 'Sarvam could not interpret that reply.';
      return NextResponse.json({ error: message }, { status: response.status });
    }
    if (!data.translated_text) return NextResponse.json({ error: 'Sarvam returned an empty translation.' }, { status: 502 });

    return NextResponse.json({ english: data.translated_text });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Could not interpret that reply.' }, { status: 502 });
  }
}