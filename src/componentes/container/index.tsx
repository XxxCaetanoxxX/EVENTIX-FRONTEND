export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-7xl mx-auto bg-red-300">
            {children}
        </div>
    )
}