// components/LoadingSpinner.tsx

export default function Spinner() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
