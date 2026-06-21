import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { type } = await req.json();

    if (type === 'api') {
      const start = Date.now();
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      const durationMs = Date.now() - start;

      return NextResponse.json({
        success: true,
        durationMs,
        message: 'API check complete',
        details: response.data
      });
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
