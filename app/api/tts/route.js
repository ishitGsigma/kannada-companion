import { NextResponse } from 'next/server';

const key = process.env.SARVAM_API_KEY;
const languageCode = process.env.SARVAM_LANGUAGE || 'kn-IN';
const speaker = process.env.SARVAM_SPEAKER || 'shubh';

export async function POST(req) {
  try {
    const { text } = await req.json();
    const input = String(text || '').trim();
    if (!input) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }
    if (input.length > 1000) {
      return NextResponse.json({ error: 'Keep the phrase under 1,000 characters' }, { status: 400 });
    }

    if (!key) {
      return NextResponse.json({ error: 'Sarvam API key is not configured' }, { status: 503 });
    }

    const response = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'api-subscription-key': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: input,
        language_code: languageCode,
        speaker,
        output_audio_codec: 'wav'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `Sarvam TTS error: ${errorText}` }, { status: 500 });
    }

    const data = await response.json();
    const audios = data?.audios;

    if (!Array.isArray(audios) || !audios[0]) {
      return NextResponse.json({ error: 'No audio returned from Sarvam TTS' }, { status: 500 });
    }

    const buffer = Buffer.from(audios[0], 'base64');

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Could not generate speech' }, { status: 500 });
  }
}
