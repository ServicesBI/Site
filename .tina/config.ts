import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: "00a60696-1501-4b35-aff9-4641ffc7ccd9",
  branch: "main",

  media: {
    tina: {
      mediaRoot: "static/img/uploads",
      publicFolder: "static",
    },
  },

  build: {
    publicFolder: "/",
    outputFolder: "admin",
  },

  schema: {
    collections: [
      {
        name: "pages",
        label: "Páginas",
        path: "content/cms/pages",
        format: "yaml",

        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") return "/";
            return `/${document._sys.filename}`;
          },
        },

        fields: [
          {
            type: "string",
            name: "title",
            label: "Título",
            required: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtítulo",
          },
          {
            type: "image",
            name: "banner",
            label: "Banner",
          },

          {
            type: "object",
            name: "services",
            label: "Cartões de Serviços",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Título",
              },
              {
                type: "string",
                name: "description",
                label: "Descrição",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },

          {
            type: "object",
            name: "projects",
            label: "Cartões de Projetos",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Título",
              },
              {
                type: "string",
                name: "description",
                label: "Descrição",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },

          {
            type: "rich-text",
            name: "page1",
            label: "Texto – Folha 1",
          },
          {
            type: "rich-text",
            name: "page2",
            label: "Texto – Folha 2",
          },
        ],
      },
    ],
  },
});
