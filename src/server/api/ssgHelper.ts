import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "./root";
import superjson from "superjson";
import { createInnerTRPCContext } from "./trpc";

const ssgHelper = () => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
};

export default ssgHelper;