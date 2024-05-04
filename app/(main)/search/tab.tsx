import type { ReactNode } from "react"

export function Tab({ current }: { current: string }) {
    const tab:Array<ReactNode>=[]
    const list = [["人気", "/search"], ["最新", "/search/latest"]]
    list.map((value)=>{
        if(current===value[0]){
            tab.push(<span>{value[0]}</span>)
        }else{
            tab.push(<a href={value[1]}>{value[0]}</a>)
        }
    })
    return <div className="flex gap-5">{tab}</div>
}