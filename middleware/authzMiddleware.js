// middleware/authzMiddleware.js
import { checkPermission } from "../fga/authz.js";

export const authorize = (action) => {
  return async (req, res, next) => {
    const user = req.headers["x-user-id"];
    if (!user)
      return res.status(401).json({ message: "User ID missing in headers" });

    const objectId = `${process.env.FGA_OBJECT_ID}`;

    try {
      const allowed = await checkPermission({
        user,
        action,
        object: objectId,
      });

      if (!allowed) return res.status(403).json({ message: "Access denied" });
      next();
    } catch (error) {
      console.error("[FGA Error]", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
