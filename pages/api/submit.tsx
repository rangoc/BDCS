import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

interface ISheetForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST request is allowed!" });
  }

  const body = req.body as ISheetForm;

  try {
    // prepare auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheet = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheet.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
      range: "A1:D1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[body.name, body.email, body.subject, body.message]],
      },
    });

    return res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    const e = error as { message: string };
    return res
      .status(500)
      .send({ message: e?.message || "Something went wrong" });
  }
}
