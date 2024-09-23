import { Collection } from "tinacms";

export const PagesSchema: Collection = {
  label: "Product Pages",
  name: "pages",
  path: "content/pages/",
  format: "json",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    // THis is where my templates will go
  ],
};
