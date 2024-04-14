export type generatetype = "fixed" | "random";
export type generateparams = { template: string; list: string[][] ,id:number};
export type DBdata = { id: number;description:string; template: string; type: generatetype; random: string[][]; title: string };
