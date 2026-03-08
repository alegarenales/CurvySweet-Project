// import type { APIContext } from "astro";
// import { appendFileSync } from "node:fs";

// export const onRequest = async (
//   context: APIContext,
//   next: () => Promise<Response>
// ) => {
//   const start = Date.now();

//   const response = await next(); // procesa la petición

//   const duration = Date.now() - start;

//   // Datos que queremos guardar
//   const method = context.request.method;
//   const path = context.url.pathname;
//   const status = response.status;
//   const ip =
//     context.request.headers.get("x-forwarded-for") ||
//     context.request.headers.get("x-real-ip") ||
//     "local";
//   const now = new Date().toISOString();

//   const log = `[${now}] [${ip}] [${method}] [${status}] ${path} ${duration}ms\n`;

//   try {
//     appendFileSync("access.log", log);
//   } catch (error) {
//     console.error("No se pudo escribir access.log:", error);
//   }

//   console.log(log); // opcional: ver en consola

//   return response;
// };
