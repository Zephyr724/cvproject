import { z } from "zod";

const schema = z.object({
  id: z.string().min(3),
});

export default schema;
