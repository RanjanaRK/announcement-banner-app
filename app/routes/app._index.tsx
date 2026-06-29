import { boundary } from "@shopify/shopify-app-react-router/server";
import connectDB from "app/lib/dbMongo";
import Announcement from "app/models/Announcement.model";
import { useState } from "react";
import {
  Form,
  useLoaderData,
  type ActionFunctionArgs,
  type HeadersFunction,
  type LoaderFunctionArgs,
} from "react-router";
import { authenticate } from "../shopify.server";
("app/models/Announcement.model");

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  await connectDB();

  const latestAnnouncement = await Announcement.findOne().sort({
    createdAt: -1,
  });

  return {
    announcement: latestAnnouncement?.text ?? "",
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const formData = await request.formData();

  const announcement = formData.get("announcement");

  console.log("announcement:", announcement);

  await connectDB();

  await Announcement.findOneAndUpdate(
    {},
    { text: announcement?.toString() },
    {
      upsert: true,
      new: true,
    },
  );

  const response = await admin.graphql(`
    query {
      shop {
        id
      }
    }
  `);

  const data = await response.json();

  const shopId = data.data.shop.id;

  console.log("Shop ID:", shopId);

  // Save to Shopify Metafield
  const metafieldResponse = await admin.graphql(
    `#graphql
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            namespace
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      variables: {
        metafields: [
          {
            ownerId: shopId,
            namespace: "custom",
            key: "announcement",
            type: "single_line_text_field",
            value: announcement,
          },
        ],
      },
    },
  );

  const result = await metafieldResponse.json();

  console.log(result);

  return Response.json({
    success: true,
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [announcement, setAnnouncement] = useState(data?.announcement);

  return (
    <Form method="post">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "500px",
        }}
      >
        <label htmlFor="announcement">Announcement Text</label>

        <input
          id="announcement"
          name="announcement"
          type="text"
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
