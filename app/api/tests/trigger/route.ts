import { NextResponse } from 'next/server';

export async function POST() {
  const token = process.env.GITHUB_PAT;
  const owner = 'josemejias11';
  const repo = 'cv-portfolio';
  const workflowId = 'automation-lab.yml';

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_PAT is not set. Please add it to your environment variables.' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: 'main', // Must match your default branch
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `GitHub API responded with ${response.status}: ${errorText}` }, { status: response.status });
    }

    return NextResponse.json({ success: true, message: 'Workflow triggered successfully' });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to trigger workflow' }, { status: 500 });
  }
}
