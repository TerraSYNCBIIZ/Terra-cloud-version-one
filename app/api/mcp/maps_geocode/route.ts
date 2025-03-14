import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { use_mcp_tool } from '../../../lib/mcpUtils';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();
    
    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    // Call the MCP tool
    const result = await use_mcp_tool(
      'github.com/modelcontextprotocol/servers/tree/main/src/google-maps',
      'maps_geocode',
      { address }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in maps_geocode API route:', error);
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
}
