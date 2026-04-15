import { NextResponse } from "next/server";

const MOCK_USER_ID = "test-user-1";

export function validateMockUser(request: Request) {
  const userId = request.headers.get("x-user-id");

  if (!userId || userId !== MOCK_USER_ID) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized request",
      },
      { status: 401 },
    );
  }

  return null;
}

export const mockUser = {
  id: MOCK_USER_ID,
  name: "Seeded Test User",
};
