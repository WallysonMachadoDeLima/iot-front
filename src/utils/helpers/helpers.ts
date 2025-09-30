interface findTabWithErrorProps {
  tabSchemas: { name: string; keys: any }[];
  formState: any;
  setCurrentTab: (value: any) => void;
}

export const findTabWithError = <T>({
  tabSchemas,
  formState,
  setCurrentTab,
}: findTabWithErrorProps) => {
  const allErrorKeys = Object.keys(formState?.errors);

  for (const tab of tabSchemas) {
    if (allErrorKeys.some((key) => Object.keys(tab?.keys?.fields).includes(key as string))) {
      setCurrentTab(tab?.name as T);
      break;
    }
  }
};
