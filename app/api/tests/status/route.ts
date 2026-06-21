import { NextResponse } from 'next/server';

interface GitHubStep {
  name: string;
  status: string;
  conclusion: string | null;
}

// We disable caching to ensure we get live polling results
export const dynamic = 'force-dynamic';

export async function GET() {
  const token = process.env.GITHUB_PAT;
  const owner = 'josemejias11';
  const repo = 'cv-portfolio';
  const workflowId = 'automation-lab.yml';

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_PAT is not set' }, { status: 500 });
  }

  try {
    // 1. Find the latest run
    const runsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs?per_page=1`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store'
    });

    if (!runsResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch runs' }, { status: 500 });
    }

    const runsData = await runsResponse.json();
    if (!runsData.workflow_runs || runsData.workflow_runs.length === 0) {
      return NextResponse.json({ status: 'no_runs' });
    }

    const latestRun = runsData.workflow_runs[0];
    const runId = latestRun.id;
    const runStatus = latestRun.status; // queued, in_progress, completed
    const runConclusion = latestRun.conclusion; // success, failure

    // 2. Fetch the jobs/steps for this run
    const jobsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/jobs`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store'
    });

    const jobsData = await jobsResponse.json();
    let steps = [];
    if (jobsData.jobs && jobsData.jobs.length > 0) {
      // Map steps to a safe format for the frontend
      steps = jobsData.jobs[0].steps.map((step: GitHubStep) => ({
        name: step.name,
        status: step.status,
        conclusion: step.conclusion
      }));
    }

    return NextResponse.json({
      runId,
      status: runStatus,
      conclusion: runConclusion,
      url: latestRun.html_url,
      steps
    });

  } catch {
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}
