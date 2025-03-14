import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { use_mcp_tool } from '../../../lib/mcpUtils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origins, destinations, mode = 'driving' } = body;
    
    if (!origins || !destinations) {
      return NextResponse.json(
        { error: 'Origins and destinations parameters are required' },
        { status: 400 }
      );
    }

    // Validate arrays
    if (!Array.isArray(origins) || !Array.isArray(destinations) || origins.length === 0 || destinations.length === 0) {
      return NextResponse.json(
        { error: 'Origins and destinations must be non-empty arrays' },
        { status: 400 }
      );
    }

    // Validate mode
    const validModes = ['driving', 'walking', 'bicycling', 'transit'];
    if (!validModes.includes(mode)) {
      return NextResponse.json(
        { error: `Mode must be one of: ${validModes.join(', ')}` },
        { status: 400 }
      );
    }

    // Call the MCP tool
    const result = await use_mcp_tool(
      'github.com/modelcontextprotocol/servers/tree/main/src/google-maps',
      'maps_distance_matrix',
      { origins, destinations, mode }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in maps_distance_matrix API route:', error);
    return NextResponse.json(
      { error: 'Failed to calculate distances' },
      { status: 500 }
    );
  }
}
