/**
 * @jest-environment node
 */
import { POST } from '../app/api/run-test/route';

describe('POST /api/run-test', () => {
  it('should return success and correct message for type: api', async () => {
    const req = new Request('http://localhost:3000/api/run-test', {
      method: 'POST',
      body: JSON.stringify({ type: 'api' }),
    });

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.message).toContain('API check complete');
  });
});
