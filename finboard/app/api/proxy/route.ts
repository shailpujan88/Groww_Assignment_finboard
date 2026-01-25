import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

/**
 * API Proxy Route
 * 
 * This route handles API requests from the frontend to avoid CORS issues.
 * 
 * Usage:
 * GET /api/proxy?url=https://api.example.com/endpoint
 * 
 * Parameters:
 * - url: The full URL to proxy to (required)
 * - timeout: Request timeout in milliseconds (optional, default: 10000)
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');
    const timeout = parseInt(searchParams.get('timeout') || '10000');

    // Validate URL parameter
    if (!targetUrl) {
      return NextResponse.json(
        { error: 'Missing required parameter: url' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(targetUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Make the proxy request
    const response = await axios.get(targetUrl, {
      timeout,
      headers: {
        'User-Agent': 'FinBoard-Dashboard/1.0',
      },
    });

    // Return the data
    return NextResponse.json(response.data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    // Silently handle errors from placeholder APIs (api.example.com)
    if (axios.isAxiosError(error) && error.config?.url?.includes('api.example.com')) {
      return NextResponse.json(
        { error: 'Demo API - using fallback data' },
        { status: 404 }
      );
    }

    console.error('Proxy error:', error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        return NextResponse.json(
          { error: 'API rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }

      if (error.code === 'ECONNABORTED') {
        return NextResponse.json(
          { error: 'API request timeout. Please check your connection.' },
          { status: 504 }
        );
      }

      if (error.code === 'ENOTFOUND') {
        return NextResponse.json(
          { error: 'API endpoint not found. Please check the URL.' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          error: error.response?.statusText || 'Failed to fetch from API',
          status: error.response?.status,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
