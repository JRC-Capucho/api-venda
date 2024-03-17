import { profileRouter } from "./profile.routes";

profileRouter.use(isAuthenticated);

