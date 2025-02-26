const Card = () => {
    return (
        <div className="flex flex-col shadow-100 bg-white p-4 rounded-xl text-black text-left">
            {/* Card Header */}
            <div className="flex flex-col gap-2">
                <div className="w-[900px] leading-[24px] font-semibold">Title</div>
                <div className="text-sm leading-[20px]">SubHeading</div>
                <hr className="h-[1px]" />
            </div>
            {/* Card Body */}
            <div>

            </div>
        </div>
    )
}

export default Card