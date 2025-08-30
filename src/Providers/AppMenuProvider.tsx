import { swrKeys } from "@/hooks/swr/swrKeys";
import { SWRConfig, unstable_serialize } from "swr";
import { fetchCountriesServer } from "@/sdk/countries.server";

export const AppMenuProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const key = swrKeys.countries();
  const initial = await fetchCountriesServer();

  return (
    <SWRConfig value={{ fallback: { [unstable_serialize(key)]: initial } }}>
      <main>
        {children}
        <AppMenu />
      </main>
    </SWRConfig>
  );
};

import { AppMenu } from "@/components/index";
