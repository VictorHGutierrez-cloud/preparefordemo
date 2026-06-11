/**
 * Pre-demo client profile.
 * Replace placeholders after reading transcricao/reuniao.txt and cliente.config.json.
 */

export const DEFAULT_VALUES = {
  empresa: "[CLIENT NAME]",
  clientSlug: "[client-slug]",
  industry: "[Industry · operating model]",
  employeeCount: "[N employees]",
  location: "[Location · regions]",

  demoGoal: "Prepare and run a discovery-led Factorial demo",
  focusModules: ["recruitment", "time-tracking", "time-off", "documents"] as string[],

  vendedor: "Victor Gutierrez",
  cargoVendedor: "Expansion Manager · US/Africa · Factorial",
  emailVendedor: "victor.gutierrez@factorial.co",
} as const;

export const CLIENT_PARTICLE_WORDS = [DEFAULT_VALUES.empresa.toUpperCase(), "FACTORIAL HR"];
