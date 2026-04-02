import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { contactNotificationEmail } from "../../lib/email-template";

interface IContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const isDev = process.env.NODE_ENV !== "production";
const resend = new Resend(
  isDev ? process.env.DEV_RESEND_API_KEY : process.env.PROD_RESEND_API_KEY
);
const FROM_ADDRESS = isDev
  ? "Dev Contact Form <onboarding@resend.dev>"
  : "BDCS Contact Form <noreply@bdcs.me>";
const TO_ADDRESS = isDev ? "cabarkapa.goran@gmail.com" : "info@bdcs.me";

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Simple in-memory rate limiting (per IP, 5 requests per 15 minutes)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function sanitizeString(str: unknown, maxLength: number): string | null {
  if (typeof str !== "string") return null;
  const trimmed = str.trim();
  if (trimmed.length === 0 || trimmed.length > maxLength) return null;
  return trimmed;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST request is allowed!" });
  }

  // Rate limiting
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .send({ message: "Too many requests. Please try again later." });
  }

  // Validate and sanitize inputs
  const name = sanitizeString(req.body?.name, MAX_NAME_LENGTH);
  const email = sanitizeString(req.body?.email, MAX_EMAIL_LENGTH);
  const subject = sanitizeString(req.body?.subject, MAX_SUBJECT_LENGTH);
  const message = sanitizeString(req.body?.message, MAX_MESSAGE_LENGTH);

  if (!name || !email || !subject || !message) {
    return res.status(400).send({
      message:
        "All fields are required. Name max 200, subject max 500, message max 5000 characters.",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).send({ message: "Invalid email address." });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: email,
      subject: `New inquiry: ${subject}`,
      html: contactNotificationEmail({ name, email, subject, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).send({ message: error.message });
    }

    return res.status(200).json({
      data: { emailId: data?.id },
    });
  } catch (error) {
    const e = error as { message: string };
    console.error("Submit error:", e);
    return res
      .status(500)
      .send({ message: e?.message || "Something went wrong" });
  }
}
