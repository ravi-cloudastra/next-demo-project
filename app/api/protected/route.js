import admin from "../../lib/firebaseAdmin";

export async function GET(request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    return new Response(
      JSON.stringify({ message: "Not authorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return new Response(
      JSON.stringify({ userId: decodedToken.uid, authToken: token }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return new Response(
      JSON.stringify({ message: "Not authorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
