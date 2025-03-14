import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { use_mcp_tool } from '../../../lib/mcpUtils';

export async function POST(request: NextRequest) {
  try {
    const { place_id } = await request.json();
    
    if (!place_id) {
      return NextResponse.json(
        { error: 'place_id parameter is required' },
        { status: 400 }
      );
    }

    // Call the MCP tool
    const result = await use_mcp_tool(
      'github.com/modelcontextprotocol/servers/tree/main/src/google-maps',
      'maps_place_details',
      { place_id }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in maps_place_details API route:', error);
    return NextResponse.json(
      { error: 'Failed to get place details' },
      { status: 500 }
    );
  }
}
