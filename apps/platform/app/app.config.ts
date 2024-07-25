export default defineAppConfig({
  ui: {
    primary: "edulon",

    breadcrumb: {
      base: "h-6 bg-gray-50 rounded-full px-2 py-1 border border-gray-300 box-border",
      active: "bg-primary text-white border-primary",
      inactive: "text-gray-500 hover:text-primary",
      default: {
        divider: "/",
      },
    },

    container: {
      base: "mx-0",
      padding: "px-6 lg:px-6",
      constrained: "max-w-full",
    },

    horizontalNavigation: {
      after: "after:left-0 after:w-full",
    },
  },
});
