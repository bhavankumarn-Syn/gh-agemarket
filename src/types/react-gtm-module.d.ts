declare module "react-gtm-module" {
  interface TagManagerArgs {
    gtmId: string;
    dataLayer?: Record<string, any>;
    dataLayerName?: string;
    auth?: string;
    preview?: string;
  }

  const TagManager: {
    initialize: (args: TagManagerArgs) => void;
    dataLayer: (args: { dataLayer: Record<string, any> }) => void;
  };

  export default TagManager;
}