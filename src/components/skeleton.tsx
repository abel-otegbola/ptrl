type SkeletonProps = {
    type: "circle" | "text" | "paragraph" | "square" | "rectangle" | "card" 
}

export default function Skeleton({ type }: SkeletonProps) {
    return (
        <div className="flex flex-col gap-2 w-full min-h-[20px]">
            {
                type === "text" ?
                <span className="animate-pulse w-full h-[20px] bg-gray-500/[0.3] p-2 rounded-lg"></span>
                : 
                type === "paragraph" ?
                <>
                    <span className="animate-pulse w-full h-[20px] bg-gray-500/[0.3] p-2 rounded-lg"></span>
                    <span className="animate-pulse w-full h-[20px] bg-gray-500/[0.3] p-2 rounded-lg"></span>
                    <span className="animate-pulse w-[75%] h-[20px] bg-gray-500/[0.3] p-2 rounded-lg"></span>
                </> 
                :
                type === "circle" ?
                <>
                    <span className="animate-pulse w-[200px] h-[200px] bg-gray-500/[0.3] rounded-full p-2"></span>
                </> 
                :
                type === "square" ?
                <>
                    <span className="animate-pulse w-[200px] h-[200px] bg-gray-500/[0.3] rounded-lg p-2"></span>
                </>
                :
                type === "rectangle" ?
                <>
                    <span className="animate-pulse w-full h-[200px] bg-gray-500/[0.3] rounded-lg p-2"></span>
                </>
                :
                ""
            }
        </div>
    )
}