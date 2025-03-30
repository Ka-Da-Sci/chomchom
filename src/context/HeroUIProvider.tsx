
import { HeroUIProvider as Provider } from "@heroui/system";
import React from "react";
import { useHref, useNavigate } from "react-router-dom";

// declare module "@react-types/shared" {
//   interface RouterConfig {
//     routerOptions: NavigateOptions;
//   }
// }

export const HeroUIProvider = React.memo(({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <Provider navigate={navigate} useHref={useHref}>
      {children}
    </Provider>
  );
});
