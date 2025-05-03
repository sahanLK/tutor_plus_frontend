'use client';

type PropTypes = {
    open: boolean,
    title: string,
    children: React.ReactNode,
    onClose: (stat: boolean) => void,
    closeBtnText: string,
    submitBtnText: string,
    onSubmit: () => void,
}

export default function Modal({ open = false, title, children, onClose, closeBtnText = 'Close', submitBtnText = 'Submit', onSubmit }: PropTypes) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative w-full max-w-[1200px] bg-white p-6 rounded shadow-lg z-10">
                <h2 className="text-xl absolute top-0 left-0 px-5 py-5">{title}</h2>
                <div className="h-3/4 max-h-[500px] overflow overflow-y-scroll mt-10 mb-20">
                    {children}
                </div>
                <div className="flex items-center w-full border-t-1 border-stone-200 pt-5 absolute bottom-0 right-0 px-5 py-5 bg-white">
                    <div className="ml-auto space-x-7">
                        <button className="px-4 py-2 cursor-pointer" onClick={() => onClose(false)}>{closeBtnText}</button>
                        <button className="px-4 py-2 bg-blue-700 text-white rounded cursor-pointer" onClick={onSubmit}>{submitBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}