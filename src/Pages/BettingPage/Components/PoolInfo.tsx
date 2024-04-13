
const PoolInfo = () => {


    return (

            <div className="flex flex-wrap gap-4 justify-center pt-32">

                <div
                    className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 max-w-[240px] bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                    <div className="font-semibold text-lg">Today</div>
                    <div className="font-semibold text-5xl tracking-tight">$12.921</div>
                    <div className="font-normal">Gross volume</div>
                </div>

                <div
                    className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 max-w-[240px] bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                    <div className="font-semibold text-lg">Yesterday</div>
                    <div className="font-semibold text-5xl tracking-tight">$9.524</div>
                    <div className="font-normal">Gross volume</div>
                </div>

                <div
                    className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 max-w-[240px] bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                    <div className="font-semibold text-lg">Yesterday</div>
                    <div className="font-semibold text-5xl tracking-tight">$9.524</div>
                    <div className="font-normal">Gross volume</div>
                </div>

            </div>

    )
}

export default PoolInfo;