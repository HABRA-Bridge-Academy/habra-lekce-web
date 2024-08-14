import { CollectionConfig } from "payload/types";

const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
    group: {
      en: "Teaching",
      cs: "Výuka",
    }
  },
  labels: {
    singular: {
      cs: 'Lekce',
      en: 'Lesson',
    },
    plural: {
      cs: 'Lekce',
      en: 'Lessons',
    },
  },

  fields: [
    { name: "title", type: "text", required: true },
    { name: "content", type: "richText", required: true },
    { name: "public", type: "checkbox", defaultValue: false },
    { name: "created", type: "date", required: true, defaultValue: Date.now },
    { name: "meta", type: "json" },
  ],
};

export default Articles;
