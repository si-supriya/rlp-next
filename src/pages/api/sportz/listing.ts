import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const page = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 12);
  const entities = String(req.query.entities ?? '1,4');
  const inum = String(req.query.inum ?? '10');

  const url = new URL('https://stg-washington-freedom.sportz.io/apiv3/listing');
  url.searchParams.set('entities', entities);
  url.searchParams.set('otherent', '');
  url.searchParams.set('exclent', '');
  url.searchParams.set('pgnum', String(Number.isFinite(page) && page > 0 ? page : 1));
  url.searchParams.set('inum', inum);
  url.searchParams.set(
    'pgsize',
    String(Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 12)
  );

  try {
    const upstream = await fetch(url.toString(), { method: 'GET' });
    const text = await upstream.text();

    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    return res.send(text);
  } catch (e) {
    return res.status(500).json({
      message: 'Failed to fetch Sportz listing',
      error: e instanceof Error ? e.message : 'Unknown error',
    });
  }
}


