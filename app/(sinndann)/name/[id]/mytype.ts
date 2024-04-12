export type generatetype = "fixed" | "random";
export type generateparams = { template: string; list: string[][] ,id:number};
export type DBdata = { id: number; template: string; type: generatetype; random: string[][]; title: string };
