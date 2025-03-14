import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { use_mcp_tool } from '../../../lib/mcpUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, location, radius = 5000 } = body;
    
    if (!query || !location) {
      return NextResponse.json(
        { error: 'Query and location parameters are required' },
        { status: 400 }
      );
    }

    // Validate location object
    if (typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      return NextResponse.json(
        { error: 'Location must include valid lat and lng coordinates' },
        { status: 400 }
      );
    }

    // Call the MCP tool
    const result = await use_mcp_tool(
      'github.com/modelcontextprotocol/servers/tree/main/src/google-maps',
      'maps_search_places',
      { query, location, radius }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in maps_search_places API route:', error);
    return NextResponse.json(
      { error: 'Failed to search places' },
      { status: 500 }
    );
  }
}
