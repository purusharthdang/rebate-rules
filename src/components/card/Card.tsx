type CardProps = {
    title: string;
    subTitle: string;
    children: React.ReactNode;
    hasDivider?: boolean
}

const Card = ({ children, title, subTitle, hasDivider }: CardProps) => {
    return (
        <div className="flex md:min-w-[600px] lg:min-w-[1000px] flex-col gap-2 shadow-100 bg-white p-4 rounded-xl text-black text-left">
            {/* Card Header */}
            <div className="flex flex-col gap-2">
                <div className="leading-[24px] font-semibold">{title}</div>
                <div className="text-sm leading-[20px]">{subTitle}</div>
            </div>
            {/* Divider */}
            {hasDivider && <hr color="#EBEBEB" className="h-[1px] border-0" />}
            {/* Card Body */}
            {children}
        </div>
    )
}

export default Card